---
title: Install Storefront Assistant document knowledge
description: Learn how to install document knowledge, so that Storefront Assistant answers questions from product documents such as manuals and data sheets.
last_updated: Nov 10, 2026
template: feature-integration-guide-template
label: early-access
related:
  - title: Storefront Assistant document knowledge
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant-document-knowledge.html
  - title: Install Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html
  - title: Store and search documents with the AiFoundation module
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-vector-store.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

This document describes how to install document knowledge for Storefront Assistant. With this feature, the assistant answers questions from the documents that are attached to products, such as manuals and data sheets. For details about how the feature works, see [Storefront Assistant document knowledge](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant-document-knowledge.html).

{% info_block warningBox "Early access preview" %}

Document knowledge is part of the Storefront Assistant early-access preview. It is not part of any Spryker product release, and it can change or be discontinued before general availability. For more information, see [Early Access Program](/docs/about/all/releases/early-access-program.html).

{% endinfo_block %}

## Prerequisites

Install the following features and services before you start:

- [Storefront Assistant](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html).
- The `spryker/product-attachment` and `spryker/product-attachment-storage` modules. The shipped document source reads the documents from product attachments.
- OpenSearch 2.19 or later, or 3.x, with the ML Commons plugin. The vector store of the feature, `OpenSearchMlVectorStorePlugin`, splits the text and makes the vectors in OpenSearch. You need a text embedding model that is registered in ML Commons, for example through a connector to Amazon Bedrock.

## 1) Install the required modules

```bash
composer require spryker-feature/ai-commerce:^0.12.0 --update-with-dependencies
```

The version `0.12.0` is the first version with document knowledge. The package requires the following modules in addition to the modules of Storefront Assistant:

- `spryker/ai-foundation` version `^0.10.0` or higher. This version provides the vector store.
- `spryker/elastica`, `spryker/search`, and `spryker/store-storage`.
- `spryker/queue` and `spryker/publisher-extension`.
- `spryker/product-attachment` and `spryker/product-attachment-storage`.

## 2) Prepare the OpenSearch index

The plugin reads and writes the index through the Search client, with the search source identifier `ai_document`. The Search client resolves the identifier to one index name for each store, for example `spryker_de_ai_document`.

Create the following objects in OpenSearch. Replace `<model_id>` with the ID of your embedding model and `<dimension>` with the number of dimensions that the model returns.

1. Create the ingest pipeline. It splits the `content` field into passages and makes one vector for each passage:

```json
{
  "description": "Splits the document text into passages and makes one vector for each passage",
  "processors": [
    {
      "text_chunking": {
        "algorithm": {
          "fixed_token_length": {
            "token_limit": 200,
            "overlap_rate": 0.15,
            "tokenizer": "standard",
            "max_chunk_limit": -1
          }
        },
        "field_map": { "content": "passage_chunks" }
      }
    },
    {
      "text_embedding": {
        "model_id": "<model_id>",
        "field_map": { "passage_chunks": "passage_embeddings" },
        "skip_existing": true
      }
    }
  ]
}
```

1. Create the search pipeline. It makes the query vector with the same model as the passages:

```json
{
  "description": "Makes the query vector with the same model as the passages",
  "request_processors": [
    { "neural_query_enricher": { "default_model_id": "<model_id>" } }
  ]
}
```

1. Create the index and set both pipelines as default pipelines. The fields `passage_chunks` and `passage_embeddings` are required:

```json
{
  "settings": {
    "index": {
      "knn": true,
      "default_pipeline": "<ingest_pipeline_name>",
      "search.default_pipeline": "<search_pipeline_name>"
    }
  },
  "mappings": {
    "dynamic": "strict",
    "properties": {
      "document_key": { "type": "keyword" },
      "source_type": { "type": "keyword" },
      "locale": { "type": "keyword" },
      "document_name": { "type": "keyword" },
      "metadata": { "type": "object", "enabled": false },
      "content": { "type": "text" },
      "passage_chunks": { "type": "text" },
      "passage_embeddings": {
        "type": "nested",
        "properties": {
          "knn": {
            "type": "knn_vector",
            "dimension": "<dimension>",
            "method": { "name": "hnsw", "engine": "faiss", "space_type": "innerproduct" }
          }
        }
      }
    }
  }
}
```

1. Create one alias for each store that points to the index, for example `spryker_de_ai_document` for the `DE` store.

The plugin writes and deletes through the index of the first store only. The index names of all stores must therefore be aliases of one index. The plugin searches through the index of the current store.

{% info_block infoBox "Static index setting" %}

`index.knn` is a static index setting. You cannot add it to an existing index, so use a separate index for the documents. Do not change the Spryker search indexes.

{% endinfo_block %}

## 3) Set up the database schema and transfer objects

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied:

<div class="width-100">

| ENTITY | TYPE | EVENT |
|--------|------|-------|
| spy_storefront_assistant_document | table | created |
| VectorDocumentTransfer | class | created |
| StorefrontAssistantDocumentSourceTransfer | class | created |

</div>

{% endinfo_block %}

## 4) Set up configuration

1. Register the `ai_document` search source in the project Search Elasticsearch config:

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
protected const SUPPORTED_SOURCE_IDENTIFIERS = [
    // ...
    'ai_document',
];
```

1. Add the queue `storefront_assistant.document.index` and its error queue. If your project uses RabbitMQ, add them to `RabbitMqConfig::getQueueConfiguration()`:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
use SprykerFeature\Shared\AiCommerce\AiCommerceConfig as SharedAiCommerceConfig;

// In getQueueConfiguration(), next to the other queues:
SharedAiCommerceConfig::STOREFRONT_ASSISTANT_DOCUMENT_INDEX_QUEUE => [
    EventConfig::EVENT_ROUTING_KEY_ERROR => SharedAiCommerceConfig::STOREFRONT_ASSISTANT_DOCUMENT_INDEX_ERROR_QUEUE,
],
```

If your project uses Symfony Messenger, add the same entry to `SymfonyMessengerConfig::getQueueConfiguration()` in `src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php`.

{% info_block warningBox "Verification" %}

Run `console queue:setup`. Make sure that the `storefront_assistant.document.index` and `storefront_assistant.document.index.error` queues exist in your message broker.

{% endinfo_block %}

## 5) Set up behavior

Register the following plugins:

<div class="width-100">

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `OpenSearchMlVectorStorePlugin` | Saves, deletes, and searches the documents in the OpenSearch index. | None | `SprykerFeature\Client\AiCommerce\Plugin\AiFoundation` |
| `SearchDocumentsToolPlugin` | Provides the `search_documents` tool. | None | `SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool` |
| `ProductAttachmentStorefrontAssistantDocumentScopeResolverPlugin` | Resolves the product SKUs of a search to the visible product attachment documents. | None | `SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant` |
| `ProductAttachmentStorefrontAssistantDocumentSourcePlugin` | Reads the product attachments as documents. | None | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\StorefrontAssistant` |
| `PlainTextStorefrontAssistantDocumentTextExtractorPlugin` | Extracts the text of `text/plain`, `text/markdown`, and `text/csv` documents. | None | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\StorefrontAssistant` |
| `StorefrontAssistantDocumentWritePublisherPlugin` | Queues the documents for indexing when a document source changes. | None | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Publisher` |
| `StorefrontAssistantDocumentIndexQueueMessageProcessorPlugin` | Indexes the documents of the `storefront_assistant.document.index` queue. | None | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Queue` |
| `StorefrontAssistantDocumentReindexConsole` | Provides the `storefront-assistant:document:reindex` command. | None | `SprykerFeature\Zed\AiCommerce\Communication\Console` |

</div>

**src/Pyz/Client/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AiFoundation;

use Spryker\Client\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use Spryker\Client\AiFoundation\Dependency\Plugin\VectorStorePluginInterface;
use SprykerFeature\Client\AiCommerce\Plugin\AiFoundation\OpenSearchMlVectorStorePlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\SearchDocumentsToolPlugin;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    protected function getAiToolPlugins(): array
    {
        return [
            // ...
            new SearchDocumentsToolPlugin(),
        ];
    }

    protected function getVectorStorePlugin(): ?VectorStorePluginInterface
    {
        return new OpenSearchMlVectorStorePlugin();
    }
}
```

**src/Pyz/Client/AiCommerce/AiCommerceConfig.php**

```php
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\SearchDocumentsToolPlugin;

public function getProductDiscoveryAgentToolNames(): array
{
    return [
        // ...
        SearchDocumentsToolPlugin::TOOL_NAME,
    ];
}
```

**src/Pyz/Client/AiCommerce/AiCommerceDependencyProvider.php**

```php
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\ProductAttachmentStorefrontAssistantDocumentScopeResolverPlugin;

/**
 * @return list<\SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantDocumentScopeResolverPluginInterface>
 */
protected function getStorefrontAssistantDocumentScopeResolverPlugins(): array
{
    return [
        new ProductAttachmentStorefrontAssistantDocumentScopeResolverPlugin(),
    ];
}
```

**src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

```php
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\StorefrontAssistant\PlainTextStorefrontAssistantDocumentTextExtractorPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\StorefrontAssistant\ProductAttachmentStorefrontAssistantDocumentSourcePlugin;

/**
 * @return list<\SprykerFeature\Zed\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantDocumentSourcePluginInterface>
 */
protected function getStorefrontAssistantDocumentSourcePlugins(): array
{
    return [
        new ProductAttachmentStorefrontAssistantDocumentSourcePlugin(),
    ];
}

/**
 * @return list<\SprykerFeature\Zed\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantDocumentTextExtractorPluginInterface>
 */
protected function getStorefrontAssistantDocumentTextExtractorPlugins(): array
{
    return [
        new PlainTextStorefrontAssistantDocumentTextExtractorPlugin(),
    ];
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Publisher\StorefrontAssistantDocumentWritePublisherPlugin;

// Add the plugin to the array that getPublisherPlugins() returns:
new StorefrontAssistantDocumentWritePublisherPlugin(),
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
use SprykerFeature\Shared\AiCommerce\AiCommerceConfig as SharedAiCommerceConfig;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Queue\StorefrontAssistantDocumentIndexQueueMessageProcessorPlugin;

// Add the entry to the array that getProcessorMessagePlugins() returns:
SharedAiCommerceConfig::STOREFRONT_ASSISTANT_DOCUMENT_INDEX_QUEUE => new StorefrontAssistantDocumentIndexQueueMessageProcessorPlugin(),
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
use SprykerFeature\Zed\AiCommerce\Communication\Console\StorefrontAssistantDocumentReindexConsole;

// Add the command to the array that getConsoleCommands() returns:
new StorefrontAssistantDocumentReindexConsole(),
```

{% info_block warningBox "Verification" %}

Make sure that `console list storefront-assistant` shows the `storefront-assistant:document:reindex` command.

{% endinfo_block %}

## 6) Index the documents

1. Queue all existing documents for indexing:

```bash
console storefront-assistant:document:reindex --force
```

1. Process the queue:

```bash
console queue:worker:start --stop-when-empty
```

The documents that you attach to products later are indexed automatically by the queue worker.

{% info_block warningBox "Verification" %}

1. In the Back Office, attach a text file to a product, for example a `text/plain` manual.
2. Run `console queue:worker:start --stop-when-empty`.
3. In the database, make sure that the `status` of the document in `spy_storefront_assistant_document` is `indexed`.
4. In the Storefront, open the product page and ask the assistant a question that the manual answers. Make sure that the answer names the document.

{% endinfo_block %}

## 7) Add the re-index step to the installation recipe

To index the documents after each full installation of the project, add the following step to the `destructive` section of your installation recipes in `config/install/`:

```yaml
        reindex-storefront-assistant-documents:
            command: 'vendor/bin/console storefront-assistant:document:reindex -vvv --no-ansi'
            stores: true
```

If your recipe does not use the `stores` option, remove it.

## Troubleshooting

<div class="width-100">

| SYMPTOM | CAUSE | SOLUTION |
|---------|-------|----------|
| The assistant never calls `search_documents`. | The tool is not in `getAiToolPlugins()` or in `getProductDiscoveryAgentToolNames()`. | Check step 5. |
| The assistant says that the documents do not answer the question. | The product has no documents, or the documents are not indexed. | Check the `status` in `spy_storefront_assistant_document`, and re-index the documents. |
| Documents stay in the `pending` status. | No queue worker processes the `storefront_assistant.document.index` queue. | Run `console queue:worker:start --stop-when-empty`, and check the queue configuration in step 4. |
| A document has the status `failed`. | The document is larger than the maximum size, has no text, or has a MIME type that no text extractor supports. | Read the `error_message` column. Add a text extractor plugin for the MIME type. |
| Every search returns an error. | No vector store plugin is registered, or the OpenSearch pipelines or the embedding model are not available. | Check step 2 and step 5. |
| The search finds no passage, but the documents are `indexed`. | The index names of the stores are not aliases of the index, or the locale of the document does not match. | Check the aliases in step 2. |

</div>
