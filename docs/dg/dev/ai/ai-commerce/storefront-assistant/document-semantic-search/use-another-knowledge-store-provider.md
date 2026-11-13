---
title: Use another knowledge store provider
description: Learn how to replace the Amazon Bedrock knowledge base of the Storefront Assistant document semantic search with another vector database or managed search service.
last_updated: Nov 13, 2026
template: howto-guide-template
label: early-access
related:
  - title: Storefront Assistant document semantic search
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html
  - title: Install Storefront Assistant document semantic search
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html
  - title: Add a knowledge document source
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/add-a-knowledge-document-source.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

The knowledge store is the system that keeps the passages of the documents and their vectors and finds the passages that answer a question. By default, Storefront Assistant uses an Amazon Bedrock knowledge base. If your project cannot use AWS, or already runs another vector database or managed search service, you can replace the knowledge store with two plugins. You change no core module.

## Prerequisites

[Install Storefront Assistant document semantic search](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html). You can skip the AWS steps of the installation.

## What the core does and what the store does

The core keeps the parts that are the same for all knowledge stores. A knowledge store adds only the parts that are specific to it:

<div class="width-100">

| CORE, NO CHANGE | YOUR KNOWLEDGE STORE |
|-----------------|----------------------|
| The publisher, the `knowledge_document.index` queue, and the `spy_knowledge_document` table | Setup: check and configure the store |
| The document sources and the download of the files | Indexing: turn the raw file into passages and vectors, and save them |
| The size limit, the content hash, the retries, and the status | Deletion: delete the passages of a document |
| The deletion of the documents of removed sources | Status: tell if a document is ready for the search |
| The scope resolvers, the `product_knowledge_search` tool, and the passage filter | Search: find the passages that are closest to the question, inside the given document keys |

</div>

The core sends the raw file and its MIME type to the store. The core has no text extraction and no chunking. If your store needs text, your store plugin must extract the text from PDF and Office files, split the text into passages, and create the vectors with an embedding model. A managed service that parses and embeds the files itself needs less code.

## The two extension points

<div class="width-100">

| EXTENSION POINT | LAYER | METHODS | REGISTERED IN |
|-----------------|-------|---------|---------------|
| `SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeStore\KnowledgeStorePluginInterface` | Zed | `setupStore()`, `indexDocument()`, `deleteDocuments()`, `refreshDocumentStatuses()`, `getMaxDocumentSize()` | `Pyz\Zed\AiCommerce\AiCommerceDependencyProvider::getKnowledgeStorePlugin()` |
| `SprykerFeature\Client\AiCommerce\Dependency\KnowledgeSearch\KnowledgeSearchPluginInterface` | Client | `searchDocuments()` | `Pyz\Client\AiCommerce\AiCommerceDependencyProvider::getKnowledgeSearchPlugin()` |

</div>

Each stack takes one plugin. The two plugins must use the same store: Zed writes to it, and the Client reads from it in Yves and Glue. When the plugins use different stores, the search finds nothing, and no error shows it.

## 1) Implement the knowledge store plugin

Implement `KnowledgeStorePluginInterface` in Zed. The following table describes the contract of each method:

<div class="width-100">

| METHOD | CALLED BY | MUST DO |
|--------|-----------|---------|
| `setupStore()` | `knowledge-document:setup` | Check and configure the store, for example create an index. A second run must not change what is already correct. When the store is not configured, return `isSkipped = true` with the reason in `messages`. `KnowledgeStoreSetupRequestTransfer.sourceTypes` has the source types of all registered source plugins: return an error when the store cannot accept one of them. Return the steps that ran in `steps`, and set `knowledgeStoreName`. |
| `indexDocument()` | The queue worker | Replace the document `{sourceType}:{sourceIdentifier}` in the store with the content of `KnowledgeDocumentContentTransfer`. Return the status `indexed` when the store has the document, or `processing` when the store indexes it later. On failure, return `isSuccessful = false` with errors, and set `isTemporaryFailure = true` when a retry can succeed. |
| `deleteDocuments()` | The queue worker, for deleted sources | Delete the documents of `KnowledgeDocumentCollectionTransfer.knowledgeDocuments`. A document that the store does not have is not an error. |
| `refreshDocumentStatuses()` | `knowledge-document:status:refresh` | Read the store status of each `processing` document. Return each document with the status `indexed`, `processing`, or `failed`, and set `errorMessage` for a `failed` document. A store that indexes synchronously and always returns `indexed` from `indexDocument()` can return the documents unchanged. |
| `getMaxDocumentSize()` | The queue worker | Return the largest document in bytes that the store accepts. The core does not download more than this size, and a larger document gets the status `failed`. |

</div>

In the error response of `deleteDocuments()` and `refreshDocumentStatuses()`, set `isTemporaryFailure = false` when a retry cannot succeed, for example a configuration error. The core then does not send the document to the queue again.

`KnowledgeDocumentContentTransfer` has the following data for `indexDocument()`:

<div class="width-100">

| FIELD | CONTENT |
|-------|---------|
| `content` | The raw bytes of the file. |
| `mimeType` | The MIME type, for example `application/pdf` or `text/markdown`. |
| `knowledgeDocumentSource.sourceType`, `knowledgeDocumentSource.sourceIdentifier` | The parts of the document key. |
| `knowledgeDocumentSource.documentName` | The name that the assistant shows as the source. |
| `knowledgeDocumentSource.localeName` | The locale of the document, or `null` for all locales. Save `*` for all locales, so that the search can filter by locale. |
| `knowledgeDocumentSource.metadata` | Optional scalar metadata of the source. |

</div>

**src/Pyz/Zed/AcmeKnowledgeStore/Communication/Plugin/AiCommerce/AcmeKnowledgeStorePlugin.php**

```php
<?php

namespace Pyz\Zed\AcmeKnowledgeStore\Communication\Plugin\AiCommerce;

use Generated\Shared\Transfer\KnowledgeDocumentCollectionResponseTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentCollectionTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentContentTransfer;
use Generated\Shared\Transfer\KnowledgeDocumentIndexResponseTransfer;
use Generated\Shared\Transfer\KnowledgeStoreSetupRequestTransfer;
use Generated\Shared\Transfer\KnowledgeStoreSetupResponseTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeStore\KnowledgeStorePluginInterface;

/**
 * @method \Pyz\Zed\AcmeKnowledgeStore\Business\AcmeKnowledgeStoreFacadeInterface getFacade()
 * @method \Pyz\Zed\AcmeKnowledgeStore\AcmeKnowledgeStoreConfig getConfig()
 */
class AcmeKnowledgeStorePlugin extends AbstractPlugin implements KnowledgeStorePluginInterface
{
    public function setupStore(KnowledgeStoreSetupRequestTransfer $knowledgeStoreSetupRequestTransfer): KnowledgeStoreSetupResponseTransfer
    {
        return $this->getFacade()->setupStore($knowledgeStoreSetupRequestTransfer);
    }

    public function indexDocument(
        KnowledgeDocumentContentTransfer $knowledgeDocumentContentTransfer
    ): KnowledgeDocumentIndexResponseTransfer {
        return $this->getFacade()->indexDocument($knowledgeDocumentContentTransfer);
    }

    public function deleteDocuments(
        KnowledgeDocumentCollectionTransfer $knowledgeDocumentCollectionTransfer
    ): KnowledgeDocumentCollectionResponseTransfer {
        return $this->getFacade()->deleteDocuments($knowledgeDocumentCollectionTransfer);
    }

    public function refreshDocumentStatuses(
        KnowledgeDocumentCollectionTransfer $knowledgeDocumentCollectionTransfer
    ): KnowledgeDocumentCollectionResponseTransfer {
        return $this->getFacade()->refreshDocumentStatuses($knowledgeDocumentCollectionTransfer);
    }

    public function getMaxDocumentSize(): int
    {
        return $this->getConfig()->getMaxDocumentSize();
    }
}
```

The facade and the business models in the example belong to your module. Use the shipped `BedrockKnowledgeBaseKnowledgeStorePlugin` and its business models in `SprykerFeature\Zed\AiCommerce\Business\BedrockKnowledgeBase` as the reference.

### Save the passages with metadata

The search filters the passages by the metadata of their document. Save the following values with each passage:

<div class="width-100">

| VALUE | USED FOR |
|-------|----------|
| The document key, `{sourceType}:{sourceIdentifier}` | The filter by the document scope, the replacement of a document, and the deletion of a document. |
| The source type | The filter by `source_types`. |
| The locale, or `*` for all locales | The filter by the locale of the customer. |
| The document name | The filter by `document_name` and the source that the assistant names. |

</div>

Use the document key as the ID of the document in the store, so that a new version of a document replaces all passages of the old version.

## 2) Implement the knowledge search plugin

Implement `KnowledgeSearchPluginInterface::searchDocuments()` in the Client. The method gets `KnowledgeSearchCriteriaTransfer` and returns `KnowledgePassageCollectionTransfer`.

The conditions are in `KnowledgeSearchCriteriaTransfer.knowledgeSearchConditions`:

<div class="width-100">

| CONDITION | DESCRIPTION |
|-----------|-------------|
| `queryText` | The search phrase. Required. |
| `documentKeys` | The document keys of the scope. The search must return only passages of these documents. |
| `ids` | Optional passage IDs. |
| `sourceTypes` | Optional source types. |
| `locales` | The locale of the customer and `*`. |
| `documentName` | Optional name of one document. |

</div>

The maximum number of passages is `KnowledgeSearchCriteriaTransfer.pagination.limit`. The core asks for more passages than it returns, because its passage filter removes duplicates and short passages. For details, see `getKnowledgeDocumentCandidateMultiplier()` in [Search settings](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html#search-settings).

The method must do the following:

- Require `queryText` and `pagination.limit`.
- Require at least one value in `documentKeys` or `ids`. Never search the whole store: the document keys are the access check of the customer.
- Apply all set conditions with AND.
- Return at most `pagination.limit` passages, ordered by score, highest first.
- Set `documentKey`, `sourceType`, `documentName`, `content`, and `score` on each `KnowledgePassageTransfer`. The core removes passages whose `documentKey` is not in the scope, and reads the source identifier from the document key.
- Set `isSuccessful = true` on success, also when no passage matches.
- Return `isSuccessful = false` with errors when the criteria are not valid or the store fails. Do not throw an exception. The core then tells the AI model that the document search is not available.

**src/Pyz/Client/AcmeKnowledgeStore/Plugin/AiCommerce/AcmeKnowledgeSearchPlugin.php**

```php
<?php

namespace Pyz\Client\AcmeKnowledgeStore\Plugin\AiCommerce;

use Generated\Shared\Transfer\KnowledgePassageCollectionTransfer;
use Generated\Shared\Transfer\KnowledgeSearchCriteriaTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use SprykerFeature\Client\AiCommerce\Dependency\KnowledgeSearch\KnowledgeSearchPluginInterface;

/**
 * @method \Pyz\Client\AcmeKnowledgeStore\AcmeKnowledgeStoreFactory getFactory()
 */
class AcmeKnowledgeSearchPlugin extends AbstractPlugin implements KnowledgeSearchPluginInterface
{
    public function searchDocuments(KnowledgeSearchCriteriaTransfer $knowledgeSearchCriteriaTransfer): KnowledgePassageCollectionTransfer
    {
        return $this->getFactory()
            ->createAcmePassageReader()
            ->getKnowledgePassageCollection($knowledgeSearchCriteriaTransfer);
    }
}
```

The search runs on each tool call in Yves and Glue, so keep it fast. Use the shipped `BedrockKnowledgeBaseKnowledgeSearchPlugin` and its classes in `SprykerFeature\Client\AiCommerce\BedrockKnowledgeBase` as the reference.

## 3) Register the plugins

Replace the Bedrock plugins with your plugins in both dependency providers:

**src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use Pyz\Zed\AcmeKnowledgeStore\Communication\Plugin\AiCommerce\AcmeKnowledgeStorePlugin;
use SprykerFeature\Zed\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Dependency\KnowledgeStore\KnowledgeStorePluginInterface;

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    protected function getKnowledgeStorePlugin(): KnowledgeStorePluginInterface
    {
        return new AcmeKnowledgeStorePlugin();
    }
}
```

**src/Pyz/Client/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AiCommerce;

use Pyz\Client\AcmeKnowledgeStore\Plugin\AiCommerce\AcmeKnowledgeSearchPlugin;
use SprykerFeature\Client\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
use SprykerFeature\Client\AiCommerce\Dependency\KnowledgeSearch\KnowledgeSearchPluginInterface;

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    protected function getKnowledgeSearchPlugin(): KnowledgeSearchPluginInterface
    {
        return new AcmeKnowledgeSearchPlugin();
    }
}
```

The document source plugins, the scope resolver plugins, the `product_knowledge_search` tool, and the search settings do not change. You can remove the `BEDROCK_KNOWLEDGE_BASE_*` configuration.

Clear the caches:

```bash
console cache:class-resolver:build
console cache:empty-all
```

## 4) Set up the store and index the documents

1. Set up the store:

    ```bash
    console knowledge-document:setup -v
    ```

2. Queue all documents. `--force` clears the content hash, so that every document is sent to the new store:

    ```bash
    console knowledge-document:reindex --force
    ```

3. Process the queue:

    ```bash
    console queue:worker:start --stop-when-empty
    ```

4. If your store returns `processing`, save the final status. The scheduler job also runs this command every five minutes:

    ```bash
    console knowledge-document:status:refresh
    ```

{% info_block warningBox "Verification" %}

1. Make sure that all rows of `spy_knowledge_document` have the status `indexed`.
2. On a product page that has a manual, ask the assistant a question that only the manual answers. The answer names the manual as the source.
3. Ask the same question for a product that the customer cannot see in the current store. The assistant gets no passages.

{% endinfo_block %}

## Evaluate the search quality

A new store, a new embedding model, or a new chunking changes which passages the assistant gets. Evaluate the search before you use the new store in production:

1. Make a set of questions with the expected document keys and the expected answer strings. Check each answer string against the source document.
2. Include text facts, procedures, the second locale of your shop, facts that are only in images, paraphrases, near-identical documents of product variants, and questions without an answer in a document.
3. Send the questions through the same search as the tool, with the product scope. Without a product scope, the scope resolver returns no documents.
4. For each question, record if an expected answer string is in the result, its rank, the duplicate passages, and the latency.
5. Compare the new store with the old store: the answer at rank 1, the answer in the top 3, and the answer in the result.

Then tune the search settings of the Client `AiCommerceConfig`. For details, see [Search settings](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html#search-settings).
