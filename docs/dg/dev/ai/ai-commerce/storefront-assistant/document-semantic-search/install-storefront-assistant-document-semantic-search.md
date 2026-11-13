---
title: Install Storefront Assistant document semantic search
description: Learn how to install document semantic search, so that Storefront Assistant answers questions from product documents with an Amazon Bedrock knowledge base.
last_updated: Nov 13, 2026
template: feature-integration-guide-template
label: early-access
related:
  - title: Storefront Assistant document semantic search
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html
  - title: Add a knowledge document source
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/add-a-knowledge-document-source.html
  - title: Use another knowledge store provider
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/use-another-knowledge-store-provider.html
  - title: Install Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

This document describes how to install document semantic search for Storefront Assistant. With this feature, the assistant answers questions from the documents that are attached to products, such as manuals and data sheets. The documents are stored and searched in an Amazon Bedrock knowledge base. For details about how the feature and the knowledge base work, see [Storefront Assistant document semantic search](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html).

{% info_block warningBox "Early access preview" %}

Document semantic search is part of the Storefront Assistant early-access preview. It is not part of any Spryker product release, and it can change or be discontinued before general availability. For more information, see [Early Access Program](/docs/about/all/releases/early-access-program.html).

{% endinfo_block %}

## Prerequisites

Install or prepare the following before you start:

- [Storefront Assistant](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html).
- Product attachments, with the publish of the product attachments to the storage. The shipped document source reads the documents from product attachments.
- An AWS account with Amazon Bedrock in the region of the knowledge base, for example `eu-central-1`.
- A current version of AWS CLI v2. AWS CLI 2.27 and earlier versions do not know the knowledge base type `MANAGED`. You can also create the resources in the AWS console.
- A scheduler that runs console commands, such as Symfony Scheduler or Jenkins.

## 1) Install the required modules

```bash
composer require spryker-feature/ai-commerce:^0.14.0 --update-with-dependencies
```

The package requires the following modules in addition to the modules of Storefront Assistant:

- `aws/aws-sdk-php` version `^3.403.0` or higher. The AWS SDK provides the clients of the Bedrock knowledge base APIs.
- `spryker/http` version `^1.15.0` or higher. Zed downloads the documents with it.
- `spryker/product-attachment` version `^1.2.0` or higher, and `spryker/product-attachment-storage` version `^1.0.0` or higher.
- `spryker/queue` and `spryker/publisher-extension`.

{% info_block warningBox "Verification" %}

Make sure the following modules are installed:

| MODULE | EXPECTED DIRECTORY |
|--------|--------------------|
| AiCommerce | vendor/spryker-feature/ai-commerce |
| AWS SDK for PHP | vendor/aws/aws-sdk-php |
| ProductAttachment | vendor/spryker/product-attachment |
| ProductAttachmentStorage | vendor/spryker/product-attachment-storage |

{% endinfo_block %}

## 2) Create the AWS resources

The knowledge base stores the passages of the documents and their vectors, and answers the search requests. The application does not create AWS resources: you create the knowledge base, its custom data source, and its service role one time for each environment. Use one knowledge base for each environment, because the search reads all data sources of a knowledge base.

In the following commands, replace `<region>`, `<account>`, and `<env>` with your values.

1. Create the service role of the knowledge base. The knowledge base assumes this role to use the managed embedding model. The application never uses it.

    **trust-policy.json**

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": { "Service": "bedrock.amazonaws.com" },
          "Action": "sts:AssumeRole"
        }
      ]
    }
    ```

    **service-role-policy.json**

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": ["bedrock:ListFoundationModels", "bedrock:ListCustomModels"],
          "Resource": "*"
        }
      ]
    }
    ```

    ```bash
    aws iam create-role --role-name <env>-bedrock-knowledge-base-role \
      --assume-role-policy-document file://trust-policy.json
    aws iam put-role-policy --role-name <env>-bedrock-knowledge-base-role \
      --policy-name <env>-bedrock-knowledge-base \
      --policy-document file://service-role-policy.json
    ```

2. Create the managed knowledge base. The type `MANAGED` with the embedding model type `MANAGED` lets the knowledge base select the embedding model and keep the vectors, so you do not need a vector database:

    ```bash
    aws bedrock-agent create-knowledge-base --region <region> \
      --name <env>-knowledge-documents \
      --role-arn arn:aws:iam::<account>:role/<env>-bedrock-knowledge-base-role \
      --knowledge-base-configuration '{"type":"MANAGED","managedKnowledgeBaseConfiguration":{"embeddingModelType":"MANAGED"}}'
    ```

    Note the `knowledgeBaseId` of the output. Wait until the status is `ACTIVE`:

    ```bash
    aws bedrock-agent get-knowledge-base --region <region> --knowledge-base-id <knowledge base ID> --query knowledgeBase.status
    ```

3. Create the custom data source. The connector type `CUSTOM` lets the application send each document directly with an API call, so you do not need an S3 bucket. The image extraction turns the images in the documents into text:

    ```bash
    aws bedrock-agent create-data-source --region <region> --knowledge-base-id <knowledge base ID> \
      --name knowledge-documents \
      --data-source-configuration '{"type":"MANAGED_KNOWLEDGE_BASE_CONNECTOR","managedKnowledgeBaseConnectorConfiguration":{"connectorParameters":{"type":"CUSTOM","version":"1","aclEnabled":false},"mediaExtractionConfiguration":{"imageExtractionConfiguration":{"imageExtractionStatus":"ENABLED"}}}}' \
      --data-deletion-policy DELETE
    ```

    Note the `dataSourceId` of the output.

Consider the following rules for the data source:

- Do not set a `vectorIngestionConfiguration` with a chunking strategy. The managed embedding model rejects it.
- Bedrock does not change the chunking of an existing data source. To change the chunking, create a new data source and index all documents again.
- Do not add a data source that the configuration does not use. The search reads all data sources of the knowledge base, so a second copy of the documents returns duplicate passages.
- Use generic names. The application reads only the IDs. One data source can hold the documents of several source types.

## 3) Grant the IAM permissions

The application calls the knowledge base APIs with the IAM role of each service. Zed writes the documents, and Yves and Glue search them. Grant each role only the actions that it needs.

1. Add the following policy to the IAM role of Zed. Zed runs the setup command, the queue worker, and the status refresh:

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "bedrock:GetKnowledgeBase",
            "bedrock:GetDataSource",
            "bedrock:UpdateDataSource",
            "bedrock:IngestKnowledgeBaseDocuments",
            "bedrock:GetKnowledgeBaseDocuments",
            "bedrock:DeleteKnowledgeBaseDocuments"
          ],
          "Resource": "arn:aws:bedrock:<region>:<account>:knowledge-base/<knowledge base ID>"
        }
      ]
    }
    ```

2. Add the following policy to the IAM roles of Yves and Glue. They only search:

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "bedrock:Retrieve",
          "Resource": "arn:aws:bedrock:<region>:<account>:knowledge-base/<knowledge base ID>"
        }
      ]
    }
    ```

The application creates no AWS resources, so it needs no `Create*` or `List*` permission and no `iam:PassRole`. If you use the rerank type `CUSTOM`, also grant `bedrock:Rerank` and `bedrock:InvokeModel` on the rerank model to the roles of Yves and Glue.

## 4) Set up database schema and transfer objects

Apply the database changes and generate the transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the `spy_knowledge_document` table exists in the database.

Make sure the following transfers exist in `src/Generated/Shared/Transfer/`: `KnowledgeDocumentTransfer`, `KnowledgeDocumentSourceTransfer`, `KnowledgeDocumentContentTransfer`, `KnowledgeStoreSetupRequestTransfer`, `KnowledgeSearchCriteriaTransfer`, and `KnowledgePassageCollectionTransfer`.

{% endinfo_block %}

## 5) Set up configuration

1. Add the knowledge base configuration to `config/Shared/config_ai.php`. The values come from environment variables, so you can use one configuration file for all environments:

    **config/Shared/config_ai.php**

    ```php
    <?php

    use Pyz\Shared\AiCommerce\AiCommerceConstants;
    use SprykerFeature\Shared\AiCommerce\AiCommerceConfig;

    // ...

    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_AWS_REGION] = getenv('SPRYKER_AI_KNOWLEDGE_BASE_AWS_REGION') ?: (getenv('AWS_REGION') ?: '');
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_ID] = getenv('SPRYKER_AI_KNOWLEDGE_BASE_ID') ?: '';
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS] = [
        AiCommerceConfig::KNOWLEDGE_DOCUMENT_SOURCE_TYPE_PRODUCT_ATTACHMENT => getenv('SPRYKER_AI_KNOWLEDGE_BASE_DATA_SOURCE_ID') ?: '',
    ];
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_RERANKING_MODEL_TYPE] = getenv('SPRYKER_AI_KNOWLEDGE_BASE_RERANKING_MODEL_TYPE') ?: '';
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_RERANKING_MODEL_ARN] = getenv('SPRYKER_AI_KNOWLEDGE_BASE_RERANKING_MODEL_ARN') ?: '';
    ```

2. Set the environment variables of each cloud environment. Use the IDs from step 2:

    | ENVIRONMENT VARIABLE | CONSTANT | DEFAULT | DESCRIPTION |
    |----------------------|----------|---------|-------------|
    | `SPRYKER_AI_KNOWLEDGE_BASE_ID` | `BEDROCK_KNOWLEDGE_BASE_ID` | Empty | The ID of the knowledge base. Without it, the setup skips the store, and the assistant says that the document search is not available. |
    | `SPRYKER_AI_KNOWLEDGE_BASE_DATA_SOURCE_ID` | `BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS`, key `product_attachment` | Empty | The ID of the data source of the product attachments. Without it, the setup fails, and every product attachment gets the status `failed`. The search does not need it. |
    | `SPRYKER_AI_KNOWLEDGE_BASE_AWS_REGION` | `BEDROCK_KNOWLEDGE_BASE_AWS_REGION` | `AWS_REGION`, then `eu-central-1` | The region of the knowledge base. |
    | `SPRYKER_AI_KNOWLEDGE_BASE_RERANKING_MODEL_TYPE` | `BEDROCK_KNOWLEDGE_BASE_RERANKING_MODEL_TYPE` | `MANAGED` | `MANAGED`, `CUSTOM`, or `NONE`. Keep `MANAGED`. |
    | `SPRYKER_AI_KNOWLEDGE_BASE_RERANKING_MODEL_ARN` | `BEDROCK_KNOWLEDGE_BASE_RERANKING_MODEL_ARN` | Empty | The ARN of the rerank model for the type `CUSTOM`. |

    In a cloud environment, do not set AWS credentials. The AWS SDK uses the IAM role of the container.

3. Add the `product_knowledge_search` tool to the tools of the **Product Discovery** agent:

    **src/Pyz/Client/AiCommerce/AiCommerceConfig.php**

    ```php
    <?php

    namespace Pyz\Client\AiCommerce;

    use SprykerFeature\Client\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;
    use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductKnowledgeSearchToolPlugin;

    class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
    {
        /**
         * @return list<string>
         */
        public function getProductDiscoveryAgentToolNames(): array
        {
            return [
                // ...
                ProductKnowledgeSearchToolPlugin::TOOL_NAME,
            ];
        }
    }
    ```

4. Register the `knowledge_document.index` queue and its error queue. Add the entry to the queue configuration of your message broker. The following example shows RabbitMQ. For Symfony Messenger, add the same entry to `Pyz\Client\SymfonyMessenger\SymfonyMessengerConfig::getQueueConfiguration()`.

    **src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

    ```php
    <?php

    namespace Pyz\Client\RabbitMq;

    use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
    use Spryker\Shared\Event\EventConfig;
    use SprykerFeature\Shared\AiCommerce\AiCommerceConfig as SharedAiCommerceConfig;

    class RabbitMqConfig extends SprykerRabbitMqConfig
    {
        /**
         * @return array<mixed>
         */
        protected function getQueueConfiguration(): array
        {
            return array_merge(
                [
                    // ...
                    SharedAiCommerceConfig::KNOWLEDGE_DOCUMENT_INDEX_QUEUE => [
                        EventConfig::EVENT_ROUTING_KEY_ERROR => SharedAiCommerceConfig::KNOWLEDGE_DOCUMENT_INDEX_ERROR_QUEUE,
                    ],
                ],
                // ...
            );
        }
    }
    ```

5. Add the scheduler job of the status refresh. The knowledge base indexes each document some minutes after it receives it, and this job saves the result:

    **src/Pyz/Client/SymfonyScheduler/SymfonySchedulerConfig.php**

    ```php
    <?php

    namespace Pyz\Client\SymfonyScheduler;

    use Spryker\Client\SymfonyScheduler\SymfonySchedulerConfig as SprykerSymfonySchedulerConfig;

    class SymfonySchedulerConfig extends SprykerSymfonySchedulerConfig
    {
        public function getCronJobs(): array
        {
            $logger = $this->getLoggerCommand();

            $jobs = [
                // ...
                'knowledge-document-status-refresh' => [
                    'command' => $logger . '$PHP_BIN vendor/bin/console knowledge-document:status:refresh',
                    'schedule' => '*/5 * * * *',
                    'priority' => 150,
                ],
            ];

            // ...
        }
    }
    ```

    If your project uses Jenkins instead, add the job to `config/Zed/cronjobs/jenkins.php`:

    ```php
    $jobs[] = [
        'name' => 'knowledge-document-status-refresh',
        'command' => '$PHP_BIN vendor/bin/console knowledge-document:status:refresh',
        'schedule' => '*/5 * * * *',
        'enable' => true,
    ];
    ```

6. Optional: Update the Product Discovery system prompt. The default prompt of the module tells the agent to answer document questions from the documents and to end the answer with `Source: **documentName**`. If your project sets its own prompt in `data/configuration/ai_commerce.configuration.yml` or in the Back Office, add the same instructions to it. To use the default prompt of the module, leave the **Product Discovery System Prompt** field empty.

{% info_block warningBox "Verification" %}

Make sure that `console queue:setup` creates the `knowledge_document.index` and `knowledge_document.index.error` queues.

{% endinfo_block %}

### Configure a local environment

A local environment has no IAM role, so the AWS SDK needs temporary credentials. The local application calls the real AWS service. There is no local emulator.

1. Sign in to AWS IAM Identity Center:

    ```bash
    aws sso login --profile <profile>
    ```

2. Export the temporary credentials:

    ```bash
    aws configure export-credentials --profile <profile> --format env
    ```

3. Add the credentials and the IDs to `config/Shared/config_local.php`. This file is not in Git. Do not put credentials in any other file:

    **config/Shared/config_local.php**

    ```php
    <?php

    use Pyz\Shared\AiCommerce\AiCommerceConstants;

    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_AWS_ACCESS_KEY_ID] = '<AWS_ACCESS_KEY_ID>';
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_AWS_SECRET_ACCESS_KEY] = '<AWS_SECRET_ACCESS_KEY>';
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_AWS_SESSION_TOKEN] = '<AWS_SESSION_TOKEN>';

    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_AWS_REGION] = '<region>';
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_ID] = '<knowledge base ID>';
    $config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS] = ['product_attachment' => '<data source ID>'];
    ```

The temporary credentials expire after some hours. When the log shows `ExpiredTokenException`, repeat steps 1–3. You do not need to clear a cache.

#### Share one knowledge base in a team

Several developers can use one development knowledge base. Each developer who sets `BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS` writes to the shared data source: every data import and every `docker/sdk reset` sends all documents to Bedrock again. To prevent this, use one of these modes:

<div class="width-100">

| MODE | CONFIGURATION | AWS CALLS | EFFECT ON THE TEAM |
|------|---------------|-----------|--------------------|
| Read only | Set `BEDROCK_KNOWLEDGE_BASE_ID`. Do not set `BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS`. Do not run the setup and the re-index. | `Retrieve` only. The IAM role needs only `bedrock:Retrieve`. | None |
| Write | Set `BEDROCK_KNOWLEDGE_BASE_ID` and `BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS`. Run step 7. | Setup, ingest, delete, and status | Changes the documents of all developers. Agree on it with the team. |

</div>

In the read-only mode, the queue worker cannot index the documents, because the configuration has no data source. It saves the status `failed` with the message `No Amazon Bedrock data source is configured for the source type product_attachment` for each document and sends nothing to AWS. This is expected: the search does not read the `spy_knowledge_document` table, so these rows do not change the answers.

## 6) Set up behavior

1. Register the knowledge store plugin and the document source plugin in Zed:

    | PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
    |--------|---------------|---------------|-----------|
    | BedrockKnowledgeBaseKnowledgeStorePlugin | Checks the knowledge base, sends the documents to it, deletes them, and reads their status. | Use it together with `BedrockKnowledgeBaseKnowledgeSearchPlugin`. | SprykerFeature\Zed\AiCommerce\Communication\Plugin\KnowledgeStore |
    | ProductAttachmentKnowledgeDocumentSourcePlugin | Provides the product attachments as knowledge documents of the source type `product_attachment`. | | SprykerFeature\Zed\AiCommerce\Communication\Plugin\KnowledgeDocument |

    **src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

    ```php
    <?php

    namespace Pyz\Zed\AiCommerce;

    use SprykerFeature\Zed\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
    use SprykerFeature\Zed\AiCommerce\Communication\Plugin\KnowledgeDocument\ProductAttachmentKnowledgeDocumentSourcePlugin;
    use SprykerFeature\Zed\AiCommerce\Communication\Plugin\KnowledgeStore\BedrockKnowledgeBaseKnowledgeStorePlugin;
    use SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeStore\KnowledgeStorePluginInterface;

    class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
    {
        /**
         * @return list<\SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentSourcePluginInterface>
         */
        protected function getKnowledgeDocumentSourcePlugins(): array
        {
            return [
                new ProductAttachmentKnowledgeDocumentSourcePlugin(),
            ];
        }

        protected function getKnowledgeStorePlugin(): KnowledgeStorePluginInterface
        {
            return new BedrockKnowledgeBaseKnowledgeStorePlugin();
        }
    }
    ```

2. Register the knowledge search plugin and the scope resolver plugin in the Client:

    | PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
    |--------|---------------|---------------|-----------|
    | BedrockKnowledgeBaseKnowledgeSearchPlugin | Searches the knowledge base with one `Retrieve` request with a metadata filter and reranking. | Use it together with `BedrockKnowledgeBaseKnowledgeStorePlugin`. | SprykerFeature\Client\AiCommerce\Plugin\KnowledgeSearch |
    | ProductAttachmentKnowledgeDocumentScopeResolverPlugin | Turns the products of a search into the product attachments that the customer can see in the current store and locale. | | SprykerFeature\Client\AiCommerce\Plugin\KnowledgeDocument |

    **src/Pyz/Client/AiCommerce/AiCommerceDependencyProvider.php**

    ```php
    <?php

    namespace Pyz\Client\AiCommerce;

    use SprykerFeature\Client\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
    use SprykerFeature\Client\AiCommerce\Dependency\KnowledgeSearch\KnowledgeSearchPluginInterface;
    use SprykerFeature\Client\AiCommerce\Plugin\KnowledgeDocument\ProductAttachmentKnowledgeDocumentScopeResolverPlugin;
    use SprykerFeature\Client\AiCommerce\Plugin\KnowledgeSearch\BedrockKnowledgeBaseKnowledgeSearchPlugin;

    class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
    {
        /**
         * @return list<\SprykerFeature\Client\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentScopeResolverPluginInterface>
         */
        protected function getKnowledgeDocumentScopeResolverPlugins(): array
        {
            return [
                new ProductAttachmentKnowledgeDocumentScopeResolverPlugin(),
            ];
        }

        protected function getKnowledgeSearchPlugin(): KnowledgeSearchPluginInterface
        {
            return new BedrockKnowledgeBaseKnowledgeSearchPlugin();
        }
    }
    ```

3. Register the tool plugin in the Client `AiFoundationDependencyProvider`:

    | PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
    |--------|---------------|---------------|-----------|
    | ProductKnowledgeSearchToolPlugin | Provides the `product_knowledge_search` tool, which searches the documents of products. | The tool name is in `AiCommerceConfig::getProductDiscoveryAgentToolNames()`. | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |

    **src/Pyz/Client/AiFoundation/AiFoundationDependencyProvider.php**

    ```php
    <?php

    namespace Pyz\Client\AiFoundation;

    use Spryker\Client\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
    use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductKnowledgeSearchToolPlugin;

    class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
    {
        /**
         * @return array<\Spryker\Client\AiFoundationExtension\Dependency\Tools\ToolPluginInterface>
         */
        protected function getAiToolPlugins(): array
        {
            return [
                // ...
                new ProductKnowledgeSearchToolPlugin(),
            ];
        }
    }
    ```

4. Register the publisher plugin and the queue message processor plugin:

    | PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
    |--------|---------------|---------------|-----------|
    | KnowledgeDocumentWritePublisherPlugin | Saves the changed documents as `pending` and queues them. It subscribes to the events of all registered document source plugins. | | SprykerFeature\Zed\AiCommerce\Communication\Plugin\Publisher |
    | KnowledgeDocumentIndexQueueMessageProcessorPlugin | Indexes the documents of the `knowledge_document.index` queue. | | SprykerFeature\Zed\AiCommerce\Communication\Plugin\Queue |

    **src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

    ```php
    <?php

    namespace Pyz\Zed\Publisher;

    use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
    use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Publisher\KnowledgeDocumentWritePublisherPlugin;

    class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
    {
        /**
         * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
         */
        protected function getPublisherPlugins(): array
        {
            return array_merge(
                // ...
                $this->getAiCommercePlugins(),
            );
        }

        /**
         * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
         */
        protected function getAiCommercePlugins(): array
        {
            return [
                new KnowledgeDocumentWritePublisherPlugin(),
            ];
        }
    }
    ```

    **src/Pyz/Zed/Queue/QueueDependencyProvider.php**

    ```php
    <?php

    namespace Pyz\Zed\Queue;

    use Spryker\Zed\Kernel\Container;
    use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
    use SprykerFeature\Shared\AiCommerce\AiCommerceConfig as SharedAiCommerceConfig;
    use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Queue\KnowledgeDocumentIndexQueueMessageProcessorPlugin;

    class QueueDependencyProvider extends SprykerDependencyProvider
    {
        /**
         * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
         */
        protected function getProcessorMessagePlugins(Container $container): array
        {
            return [
                // ...
                SharedAiCommerceConfig::KNOWLEDGE_DOCUMENT_INDEX_QUEUE => new KnowledgeDocumentIndexQueueMessageProcessorPlugin(),
            ];
        }
    }
    ```

5. Register the console commands:

    | COMMAND | SPECIFICATION | PREREQUISITES | NAMESPACE |
    |---------|---------------|---------------|-----------|
    | KnowledgeDocumentSetupConsole | Checks and configures the knowledge base: `knowledge-document:setup`. | | SprykerFeature\Zed\AiCommerce\Communication\Console |
    | KnowledgeDocumentReindexConsole | Queues all documents for indexing: `knowledge-document:reindex`. | | SprykerFeature\Zed\AiCommerce\Communication\Console |
    | KnowledgeDocumentStatusRefreshConsole | Saves the knowledge base status of the `processing` documents: `knowledge-document:status:refresh`. | | SprykerFeature\Zed\AiCommerce\Communication\Console |

    **src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

    ```php
    <?php

    namespace Pyz\Zed\Console;

    use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
    use Spryker\Zed\Kernel\Container;
    use SprykerFeature\Zed\AiCommerce\Communication\Console\KnowledgeDocumentReindexConsole;
    use SprykerFeature\Zed\AiCommerce\Communication\Console\KnowledgeDocumentSetupConsole;
    use SprykerFeature\Zed\AiCommerce\Communication\Console\KnowledgeDocumentStatusRefreshConsole;

    class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
    {
        /**
         * @return array<\Symfony\Component\Console\Command\Command>
         */
        protected function getConsoleCommands(Container $container): array
        {
            $commands = [
                // ...
                new KnowledgeDocumentSetupConsole(),
                new KnowledgeDocumentReindexConsole(),
                new KnowledgeDocumentStatusRefreshConsole(),
            ];

            // ...

            return $commands;
        }
    }
    ```

6. Build the class resolver cache and clear the application caches:

    ```bash
    console cache:class-resolver:build
    console cache:empty-all
    ```

{% info_block warningBox "Verification" %}

Make sure that `console list knowledge-document` shows the commands `knowledge-document:setup`, `knowledge-document:reindex`, and `knowledge-document:status:refresh`.

{% endinfo_block %}

## 7) Set up the knowledge base and index the documents

No installation recipe runs the following commands. Run them one time for each environment, and after you change the knowledge base, the data sources, or the source types. After that, the publisher keeps the documents up to date: each change of a product attachment indexes or deletes its document.

1. Check the knowledge base and the data source:

    ```bash
    console knowledge-document:setup -v
    ```

    The command waits until the knowledge base is `ACTIVE` and the data source is `AVAILABLE`, and enables the image extraction of the data source when it is off. It creates nothing and stores nothing. When the command says that it skips the store, `BEDROCK_KNOWLEDGE_BASE_ID` is not set. When it fails with `Add the source type product_attachment to BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS`, the data source ID is not set.

2. Queue all documents. `--force` clears the stored content hash, so that every document is sent to the knowledge base:

    ```bash
    console knowledge-document:reindex --force -v
    ```

3. Process the queue. The `queue:task:start` command processes only one chunk, so use the queue worker:

    ```bash
    console queue:worker:start --stop-when-empty
    ```

4. Wait some minutes. Then save the result of the indexing. Repeat this command until no document stays `processing`, or wait for the scheduler job:

    ```bash
    console knowledge-document:status:refresh
    ```

    The command shows `Checked N document(s): X indexed, Y failed.`

Do not run a forced re-index often. A forced re-index sends all documents to Bedrock again, which uses time and request quota.

{% info_block warningBox "Verification" %}

1. Make sure that the documents are indexed:

    ```sql
    SELECT status, COUNT(*) FROM spy_knowledge_document GROUP BY status;
    ```

    All rows have the status `indexed`. For each `failed` row, the `error_message` column has the reason.

2. Make sure that the knowledge base returns a passage. This AWS CLI command only reads:

    ```bash
    aws bedrock-agent-runtime retrieve --region <region> --knowledge-base-id <knowledge base ID> \
      --retrieval-query '{"text":"standby power consumption"}' \
      --query 'retrievalResults[0].content.text'
    ```

    Give the query as JSON. The short form `text=...` fails when the text has a comma.

3. Log in to the Storefront as a customer and open a product that has a manual or a data sheet. Open the assistant and ask a question that only the document answers, such as a question about the installation or the standby power. The answer names the document as the source.

{% endinfo_block %}

## Troubleshooting

<div class="width-100">

| SYMPTOM | CAUSE | SOLUTION |
|---------|-------|----------|
| The assistant says that the document search is not available. | `BEDROCK_KNOWLEDGE_BASE_ID` is not set, the credentials are wrong, or the role of Yves or Glue has no `bedrock:Retrieve` permission. | Check steps 3 and 5. |
| The assistant never answers from documents. | `product_knowledge_search` is not in `getAiToolPlugins()` or in `getProductDiscoveryAgentToolNames()`. | Check steps 5 and 6. |
| The assistant answers that no documents are available for a product that has attachments. | The product attachments are not published to the storage, or the attachment has another locale. | Publish the product attachments, and check the locale of the attachment. |
| All documents are `failed` with `No Amazon Bedrock data source is configured for the source type product_attachment`. | `BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS` has no data source for `product_attachment`. In the read-only mode of a local environment, this is expected. | Set the data source ID, then run step 7. |
| `knowledge-document:setup` skips the store. | `BEDROCK_KNOWLEDGE_BASE_ID` is not set. | Check step 5. |
| `ExpiredTokenException` or `UnrecognizedClientException` in the log. | The temporary credentials of a local environment expired or are wrong. | Get new credentials. See [Configure a local environment](#configure-a-local-environment). |
| `AccessDeniedException` in the log. | The IAM role has no permission for the action. | Check step 3. |
| Many `ThrottlingException` messages during a re-index. | The account has low Bedrock request quotas. | The AWS SDK and the queue send the requests again. Run the status refresh later. Request higher quotas in AWS for large catalogs. |
| Documents stay `pending` after a script changed product attachments. | A script that runs outside a console command or a Zed request does not send the entity events. | Run `console event:trigger:timeout`, which sends the events that are older than five minutes, and then run the queue worker. |
| A document is `failed` with a size error. | The file is larger than 5&nbsp;MB. | Make the file smaller. Upload through S3 is not supported. |
| The assistant shows the same passage twice or passages of other documents. | The knowledge base has more than one data source with the same documents. | Keep one data source and delete the others in AWS. |
| The log has no line for a `Retrieve` request. | Only the Zed requests are logged. The Client logs a failed `Retrieve` request at the error level. | Find the Zed requests by `Amazon Bedrock knowledge base request`. In a Docker SDK environment, the log of the `cli` container goes to `/tmp/stdout`, not to the console output. |
| A message is in the `knowledge_document.index.error` queue. | The message is not valid, or its source type is not registered. | Check the source plugins in step 6. |

</div>
