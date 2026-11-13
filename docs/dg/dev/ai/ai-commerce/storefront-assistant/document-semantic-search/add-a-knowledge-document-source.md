---
title: Add a knowledge document source
description: Learn how to add a new document source, such as product video transcripts, to the Storefront Assistant document semantic search without changes to the core modules.
last_updated: Nov 13, 2026
template: howto-guide-template
label: early-access
related:
  - title: Storefront Assistant document semantic search
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html
  - title: Install Storefront Assistant document semantic search
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html
  - title: Use another knowledge store provider
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/use-another-knowledge-store-provider.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

By default, Storefront Assistant searches only the product attachments, with the source type `product_attachment`. If your project has other documents that answer customer questions, such as the transcripts of product videos, you can add them as a new document source. The assistant then finds them with the same `product_knowledge_search` tool.

You change no core module. You add two plugins, register them, and add one configuration entry. The example in this document adds the source type `product_video` for product video transcripts.

## Prerequisites

[Install Storefront Assistant document semantic search](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html).

## How a document source fits in

One knowledge base holds the documents of all source types. The core handles the events, the queue, the content hash, the retries, the status, and the deletion of removed sources. A document source adds only the parts that are specific to its documents:

<div class="width-100">

| PART | CORE, NO CHANGE | YOUR DOCUMENT SOURCE |
|------|-----------------|----------------------|
| Events and tracking | `KnowledgeDocumentWritePublisherPlugin`, the `spy_knowledge_document` table, the `knowledge_document.index` queue | The event names and the source identifiers: the Zed source plugin |
| Content | The content hash, the retries, the status, the deletion of removed sources | The list of sources and the raw content: the Zed source plugin |
| Storage | `BedrockKnowledgeBaseKnowledgeStorePlugin` | The data source ID of the source type: the configuration |
| Search | `KnowledgeDocumentSearcher`, `BedrockKnowledgeBaseKnowledgeSearchPlugin` | The document keys that the customer can see: the Client scope resolver plugin |
| Assistant | The `product_knowledge_search` tool | Nothing, when the documents belong to products |

</div>

The document key is `{sourceType}:{sourceIdentifier}`, for example `product_video:42`. It must be unique in the knowledge base.

## 1) Define the source type

Define the source type in one constant and use this constant in all plugins and in the configuration:

```php
<?php

namespace Pyz\Shared\ProductVideo;

class ProductVideoConfig
{
    public const string KNOWLEDGE_DOCUMENT_SOURCE_TYPE_PRODUCT_VIDEO = 'product_video';
}
```

The entity of the source must send entity events. Add the event behavior to its Propel schema. A script that changes the data outside a console command or a Zed request must also send the events.

## 2) Implement the Zed source plugin

The source plugin tells the core which documents exist and how to read them. Implement `SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentSourcePluginInterface`. Put the plugin in the module that owns the entity.

The core calls the methods of the source plugin in these cases:

<div class="width-100">

| METHOD | CALLED BY | MUST DO |
|--------|-----------|---------|
| `getSourceType()` | All parts | Return the source type, for example `product_video`. |
| `getSubscribedEvents()` | `KnowledgeDocumentWritePublisherPlugin` | Return the entity events that create, change, or delete a source. The publisher subscribes to them automatically. |
| `extractSourceIdentifiers()` | The publisher | Return the source identifiers of the event entities. |
| `getDocumentSourceCollection()` | The publisher, the index queue, `knowledge-document:reindex` | With `sourceIdentifiers`, return the sources that exist. A missing identifier means that the source was deleted, and the core deletes the document. Without `sourceIdentifiers`, return one page of all sources by `pagination`. |
| `readDocumentContent()` | The index queue | Return the raw content and the MIME type. On failure, return `isSuccessful = false` with errors, and set `isTemporaryFailure = true` when a retry can succeed. |

</div>

Set these fields on each `KnowledgeDocumentSourceTransfer`:

<div class="width-100">

| FIELD | VALUE |
|-------|-------|
| `sourceType` | The source type. |
| `sourceIdentifier` | The ID of the source as a string. |
| `documentName` | The name that the assistant shows as the source, for example the video title. |
| `localeName` | The locale of the document, or `null` for all locales. |
| `url` | The URL of the content, when the content is a file on a server. |
| `metadata` | Optional scalar values. The knowledge store adds them as metadata, up to a total of 50 attributes. |

</div>

**src/Pyz/Zed/ProductVideo/Communication/Plugin/AiCommerce/ProductVideoKnowledgeDocumentSourcePlugin.php**

```php
<?php

namespace Pyz\Zed\ProductVideo\Communication\Plugin\AiCommerce;

use Generated\Shared\Transfer\KnowledgeDocumentContentTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentSourceCollectionTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentSourceCriteriaTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentSourceTransfer;
use Pyz\Shared\ProductVideo\ProductVideoConfig;
use Pyz\Shared\ProductVideo\ProductVideoEvents;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentSourcePluginInterface;

/**
 * @method \Pyz\Zed\ProductVideo\Business\ProductVideoFacadeInterface getFacade()
 */
class ProductVideoKnowledgeDocumentSourcePlugin extends AbstractPlugin implements KnowledgeDocumentSourcePluginInterface
{
    public function getSourceType(): string
    {
        return ProductVideoConfig::KNOWLEDGE_DOCUMENT_SOURCE_TYPE_PRODUCT_VIDEO;
    }

    /**
     * @return list<string>
     */
    public function getSubscribedEvents(): array
    {
        return [
            ProductVideoEvents::ENTITY_PYZ_PRODUCT_VIDEO_CREATE,
            ProductVideoEvents::ENTITY_PYZ_PRODUCT_VIDEO_UPDATE,
            ProductVideoEvents::ENTITY_PYZ_PRODUCT_VIDEO_DELETE,
        ];
    }

    /**
     * @param list<\Generated\Shared\Transfer\EventEntityTransfer> $eventEntityTransfers
     *
     * @return list<string>
     */
    public function extractSourceIdentifiers(array $eventEntityTransfers, string $eventName): array
    {
        return $this->getFacade()->extractProductVideoIds($eventEntityTransfers);
    }

    public function getDocumentSourceCollection(
        KnowledgeDocumentSourceCriteriaTransfer $knowledgeDocumentSourceCriteriaTransfer
    ): KnowledgeDocumentSourceCollectionTransfer {
        return $this->getFacade()->getProductVideoDocumentSourceCollection($knowledgeDocumentSourceCriteriaTransfer);
    }

    public function readDocumentContent(
        KnowledgeDocumentSourceTransfer $knowledgeDocumentSourceTransfer
    ): KnowledgeDocumentContentTransfer {
        return $this->getFacade()->readProductVideoTranscript($knowledgeDocumentSourceTransfer);
    }
}
```

The facade methods in the example belong to your module. The core needs only the five plugin methods.

Consider the following rules for the content:

- The core compares the content hash. When the content did not change, the core does not send the document to the knowledge store again.
- The Bedrock knowledge base parses PDF, Office, HTML, Markdown, CSV, text, and image files. Send text with a text MIME type: `text/plain`, `text/markdown`, or `text/csv`.
- A document can have a maximum of 5&nbsp;MB. A larger document gets the status `failed`.
- If your content is a file on a server, you can reuse the download of the product attachments. The URL reader downloads only from public addresses and follows no redirect.

## 3) Implement the Client scope resolver plugin

The search sends to the knowledge store only the document keys that the scope resolver plugins return. Without document keys, the search returns no documents. The scope resolver is therefore also the access check: return only the documents that the customer can see in the store and locale of the request. Implement `SprykerFeature\Client\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentScopeResolverPluginInterface`.

The scope comes from `KnowledgeDocumentScopeRequestTransfer`:

<div class="width-100">

| FIELD | CONTENT |
|-------|---------|
| `scopeReferences` | Lists of entity references, keyed by scope reference type. |
| `sourceIdentifiers` | Optional: keep only these source identifiers. |
| `localeName`, `storeName` | The locale and the store of the customer. The search sets them. |

</div>

The scope reference types of products are the constants `KNOWLEDGE_DOCUMENT_SCOPE_REFERENCE_TYPE_PRODUCT_ABSTRACT_ID`, `KNOWLEDGE_DOCUMENT_SCOPE_REFERENCE_TYPE_ABSTRACT_SKU`, and `KNOWLEDGE_DOCUMENT_SCOPE_REFERENCE_TYPE_CONCRETE_SKU` of `SprykerFeature\Shared\AiCommerce\AiCommerceConfig`. Their values are `product_abstract_id`, `abstract_sku`, and `concrete_sku`.

<div class="width-100">

| METHOD | MUST DO |
|--------|---------|
| `isApplicable()` | Return `true` when `scopeReferences` has values of a reference type that the plugin reads. |
| `resolveDocumentScope()` | Check that the customer can see each entity in the store and locale. Return the document keys of its documents. For each entity that you skip, add a message that is safe to show to the customer. When `sourceIdentifiers` is not empty, keep only these documents. |

</div>

**src/Pyz/Client/ProductVideo/Plugin/AiCommerce/ProductVideoKnowledgeDocumentScopeResolverPlugin.php**

```php
<?php

namespace Pyz\Client\ProductVideo\Plugin\AiCommerce;

use Generated\Shared\Transfer\KnowledgeDocumentScopeRequestTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentScopeTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use SprykerFeature\Client\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentScopeResolverPluginInterface;
use SprykerFeature\Shared\AiCommerce\AiCommerceConfig as SharedAiCommerceConfig;

/**
 * @method \Pyz\Client\ProductVideo\ProductVideoFactory getFactory()
 */
class ProductVideoKnowledgeDocumentScopeResolverPlugin extends AbstractPlugin implements KnowledgeDocumentScopeResolverPluginInterface
{
    protected const array SCOPE_REFERENCE_TYPES = [
        SharedAiCommerceConfig::KNOWLEDGE_DOCUMENT_SCOPE_REFERENCE_TYPE_PRODUCT_ABSTRACT_ID,
        SharedAiCommerceConfig::KNOWLEDGE_DOCUMENT_SCOPE_REFERENCE_TYPE_ABSTRACT_SKU,
        SharedAiCommerceConfig::KNOWLEDGE_DOCUMENT_SCOPE_REFERENCE_TYPE_CONCRETE_SKU,
    ];

    public function isApplicable(KnowledgeDocumentScopeRequestTransfer $knowledgeDocumentScopeRequestTransfer): bool
    {
        foreach (static::SCOPE_REFERENCE_TYPES as $scopeReferenceType) {
            if (($knowledgeDocumentScopeRequestTransfer->getScopeReferences()[$scopeReferenceType] ?? []) !== []) {
                return true;
            }
        }

        return false;
    }

    public function resolveDocumentScope(
        KnowledgeDocumentScopeRequestTransfer $knowledgeDocumentScopeRequestTransfer
    ): KnowledgeDocumentScopeTransfer {
        return $this->getFactory()
            ->createProductVideoDocumentScopeResolver()
            ->resolveDocumentScope($knowledgeDocumentScopeRequestTransfer);
    }
}
```

Read the entities from the key-value storage, not from Zed: the search runs in Yves and Glue on each tool call. Use `SprykerFeature\Client\AiCommerce\ProductAttachmentKnowledgeDocument\ProductAttachmentDocumentScopeResolver` as the reference for the product checks and the messages.

### Which tool finds the new documents

<div class="width-100">

| SCOPE OF THE NEW SOURCE | TOOL |
|-------------------------|------|
| Products: the plugin reads the product reference types | `product_knowledge_search` finds the new documents without changes. Its `source_types` argument selects the source types. An empty value means all source types. |
| Another entity, such as a merchant or a Self-Service Portal asset | A new tool is necessary. It builds `KnowledgeDocumentScopeRequestTransfer.scopeReferences` with your reference types. The AiCommerce Client has no public search method yet, so this case is not supported. |

</div>

Documents that belong to no entity, such as an FAQ or a return policy, are not supported, because the search needs document keys.

## 4) Register the plugins

Add the source plugin to the Zed `AiCommerceDependencyProvider`:

**src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use Pyz\Zed\ProductVideo\Communication\Plugin\AiCommerce\ProductVideoKnowledgeDocumentSourcePlugin;
use SprykerFeature\Zed\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\KnowledgeDocument\ProductAttachmentKnowledgeDocumentSourcePlugin;

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    /**
     * @return list<\SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentSourcePluginInterface>
     */
    protected function getKnowledgeDocumentSourcePlugins(): array
    {
        return [
            new ProductAttachmentKnowledgeDocumentSourcePlugin(),
            new ProductVideoKnowledgeDocumentSourcePlugin(),
        ];
    }
}
```

Add the scope resolver plugin to the Client `AiCommerceDependencyProvider`:

**src/Pyz/Client/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AiCommerce;

use Pyz\Client\ProductVideo\Plugin\AiCommerce\ProductVideoKnowledgeDocumentScopeResolverPlugin;
use SprykerFeature\Client\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
use SprykerFeature\Client\AiCommerce\Plugin\KnowledgeDocument\ProductAttachmentKnowledgeDocumentScopeResolverPlugin;

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    /**
     * @return list<\SprykerFeature\Client\AiCommerce\Dependency\KnowledgeDocument\KnowledgeDocumentScopeResolverPluginInterface>
     */
    protected function getKnowledgeDocumentScopeResolverPlugins(): array
    {
        return [
            new ProductAttachmentKnowledgeDocumentScopeResolverPlugin(),
            new ProductVideoKnowledgeDocumentScopeResolverPlugin(),
        ];
    }
}
```

You do not need to register the events. `KnowledgeDocumentWritePublisherPlugin` subscribes to the events of all registered source plugins. Clear the caches after you change a dependency provider:

```bash
console cache:class-resolver:build
console cache:empty-all
```

## 5) Configure the data source

Each source type writes its documents to a custom data source of the knowledge base. Add the source type to `BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS`:

**config/Shared/config_ai.php**

```php
$config[AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS] = [
    AiCommerceConfig::KNOWLEDGE_DOCUMENT_SOURCE_TYPE_PRODUCT_ATTACHMENT => getenv('SPRYKER_AI_KNOWLEDGE_BASE_DATA_SOURCE_ID') ?: '',
    ProductVideoConfig::KNOWLEDGE_DOCUMENT_SOURCE_TYPE_PRODUCT_VIDEO => getenv('SPRYKER_AI_KNOWLEDGE_BASE_PRODUCT_VIDEO_DATA_SOURCE_ID') ?: '',
];
```

Select the data source:

<div class="width-100">

| OPTION | WHEN TO USE |
|--------|-------------|
| The data source of another source type | Default. Use the same ID as for `product_attachment` when the same ingestion settings are correct for the new documents. One data source can hold the documents of several source types, because the document key keeps them apart. |
| A new custom data source | The new documents need other ingestion settings, such as no image extraction, or you must be able to delete all of them at one time. Create the data source as described in [Create the AWS resources](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html#2-create-the-aws-resources), step 3, and set its ID in the environment variable. |

</div>

The search does not use the data source. It searches the whole knowledge base and filters by document key, source type, and locale.

{% info_block warningBox "Changing the data source of a source type" %}

Do not change the data source of a source type that has indexed documents. The old documents stay in the old data source, and the search still finds them. Delete them from the old data source first, then run a forced re-index of the source type.

{% endinfo_block %}

## 6) Set up and index the documents

1. Check the knowledge base. The command reads the source types of all registered source plugins:

    ```bash
    console knowledge-document:setup -v
    ```

    When the configuration has no data source for the new source type, the command fails with `Add the source type product_video to BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS` and sends no request to AWS.

2. Queue the documents of the new source type only:

    ```bash
    console knowledge-document:reindex --source-type=product_video -v
    ```

3. Process the queue:

    ```bash
    console queue:worker:start --stop-when-empty
    ```

4. Some minutes later, save the result. The scheduler job also runs this command every five minutes:

    ```bash
    console knowledge-document:status:refresh
    ```

{% info_block warningBox "Verification" %}

1. Make sure that the documents of the new source type are indexed:

    ```sql
    SELECT status, COUNT(*) FROM spy_knowledge_document WHERE source_type = 'product_video' GROUP BY status;
    ```

2. On a product page, ask the assistant a question that only the new document answers. The answer names the new document as the source.

{% endinfo_block %}

## 7) Test the plugins

<div class="width-100">

| TEST | WHAT TO CHECK |
|------|---------------|
| Functional test of the source plugin | The events give the source identifiers. A deleted entity is missing in `getDocumentSourceCollection()`. The content and the MIME type are correct. |
| Functional test of the scope resolver plugin | A visible entity gives the document keys `product_video:{id}`. An entity that is not visible in the store or the locale gives no keys and a message. `sourceIdentifiers` keeps only the requested documents. |

</div>

The tests of the product attachment plugins in the `spryker-feature/ai-commerce` module are the reference: `ProductAttachmentKnowledgeDocumentScopeResolverPluginTest` and `ProductAttachmentKnowledgeDocumentSourcePluginTest`.
