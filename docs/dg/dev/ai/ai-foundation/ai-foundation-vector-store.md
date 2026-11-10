---
title: Store and search documents with the AiFoundation module
description: Learn how to save text documents in a vector store, search them by meaning, and implement a vector store plugin with the AiFoundation module.
last_updated: Nov 10, 2026
keywords: foundation, ai, vector store, vector document, embeddings, semantic search, plugin, documents
template: howto-guide-template
label: early-access
related:
  - title: AiFoundation module Overview
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use AI tools with the AiFoundation module
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
  - title: Install Storefront Assistant document knowledge
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant-document-knowledge.html
---

This document describes how to save text documents in a vector store and search them with the AiFoundation module.

A vector store keeps a numeric representation of each text passage, called a vector. A search compares the vector of a question with the vectors of the passages. This way, the search finds passages that answer the question even when they do not contain the same words. Use a vector store to base AI answers on your own documents, such as manuals or data sheets.

## How the vector store works

The AiFoundation module does not store or search documents itself. The Client methods delegate each call to the vector store plugin that you register in `AiFoundationDependencyProvider::getVectorStorePlugin()`. The plugin splits the text into passages, makes the vectors, and talks to the store.

The module does not ship a vector store plugin. The `spryker-feature/ai-commerce` package ships `OpenSearchMlVectorStorePlugin`, a vector store for OpenSearch. For details, see [Install Storefront Assistant document knowledge](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant-document-knowledge.html).

## Prerequisites

- The AiFoundation module version `0.10.0` or higher. For details, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- A vector store plugin that implements `Spryker\Client\AiFoundation\Dependency\Plugin\VectorStorePluginInterface`.

## Register the vector store plugin

Without a registered plugin, every vector store call returns an unsuccessful response with an error. To register a plugin, override `getVectorStorePlugin()` in the project Client dependency provider:

**src/Pyz/Client/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AiFoundation;

use Spryker\Client\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use Spryker\Client\AiFoundation\Dependency\Plugin\VectorStorePluginInterface;
use SprykerFeature\Client\AiCommerce\Plugin\AiFoundation\OpenSearchMlVectorStorePlugin;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    protected function getVectorStorePlugin(): ?VectorStorePluginInterface
    {
        return new OpenSearchMlVectorStorePlugin();
    }
}
```

The method returns `null` by default.

## Vector document

A vector document is one document in the vector store. It is a strict transfer object, `VectorDocument`, with the following fields:

<div class="width-100">

| FIELD | TYPE | DESCRIPTION |
|-------|------|-------------|
| `id` | string | The unique identifier of the document in the vector store. Saving a document with an existing `id` replaces the document. Required to save. |
| `documentKey` | string | The key of the source document. Use the same key for all parts of one source document. Required to save. |
| `content` | string | The full text of the document. The vector store makes the vectors from this text. Required to save. In a search result, it contains the text of the matching passage. |
| `sourceType` | string | The kind of the source, for example `product_attachment`. |
| `locale` | string | The locale of the document. |
| `documentName` | string | The display name of the document. |
| `chunkIndex` | int | The position of the passage in the document. Set in search results. |
| `metadata` | array | Additional data of the document. |
| `score` | float | The similarity of the passage to the query. Set in search results only. |

</div>

## Save documents

`AiFoundationClientInterface::saveVectorDocumentCollection()` saves the documents through the registered plugin. A document with an existing `id` is replaced.

```php
use Generated\Shared\Transfer\VectorDocumentCollectionRequestTransfer;
use Generated\Shared\Transfer\VectorDocumentTransfer;

$vectorDocumentCollectionRequestTransfer = (new VectorDocumentCollectionRequestTransfer())
    ->addVectorDocument(
        (new VectorDocumentTransfer())
            ->setId('product_attachment:12')
            ->setDocumentKey('product_attachment:12')
            ->setSourceType('product_attachment')
            ->setDocumentName('Installation manual')
            ->setContent($fullText),
    );

$vectorDocumentCollectionResponseTransfer = $this->getFactory()
    ->getAiFoundationClient()
    ->saveVectorDocumentCollection($vectorDocumentCollectionRequestTransfer);

if (!$vectorDocumentCollectionResponseTransfer->getIsSuccessful()) {
    // Read $vectorDocumentCollectionResponseTransfer->getErrors().
}
```

## Search documents

`AiFoundationClientInterface::getVectorDocumentCollection()` returns the passages that best match a query text. The vector store makes the query vector from `VectorDocumentConditions.queryText`.

```php
use Generated\Shared\Transfer\PaginationTransfer;
use Generated\Shared\Transfer\VectorDocumentConditionsTransfer;
use Generated\Shared\Transfer\VectorDocumentCriteriaTransfer;

$vectorDocumentCriteriaTransfer = (new VectorDocumentCriteriaTransfer())
    ->setVectorDocumentConditions(
        (new VectorDocumentConditionsTransfer())
            ->setQueryText('How do I replace the filter?')
            ->addDocumentKey('product_attachment:12'),
    )
    ->setPagination((new PaginationTransfer())->setLimit(5));

$vectorDocumentCollectionTransfer = $this->getFactory()
    ->getAiFoundationClient()
    ->getVectorDocumentCollection($vectorDocumentCriteriaTransfer);

foreach ($vectorDocumentCollectionTransfer->getVectorDocuments() as $vectorDocumentTransfer) {
    // $vectorDocumentTransfer->getContent() is the passage text.
    // $vectorDocumentTransfer->getScore() is the similarity score.
}
```

The search follows these rules:

- `VectorDocumentConditions.queryText` and `Pagination.limit` are required.
- All set conditions apply together with AND. The available conditions are `ids`, `documentKeys`, `sourceTypes`, `locales`, and `documentName`.
- The result has at most `Pagination.limit` documents, ordered by similarity score from highest to lowest.
- `VectorDocumentCollection.isSuccessful` is `true` when the search succeeds, also when no document matches.

## Delete documents

`AiFoundationClientInterface::deleteVectorDocumentCollection()` deletes the documents that match `VectorDocumentConditions.ids` or `VectorDocumentConditions.documentKeys`. A document that does not exist is not an error.

```php
use Generated\Shared\Transfer\VectorDocumentCollectionDeleteCriteriaTransfer;
use Generated\Shared\Transfer\VectorDocumentConditionsTransfer;

$vectorDocumentCollectionResponseTransfer = $this->getFactory()
    ->getAiFoundationClient()
    ->deleteVectorDocumentCollection(
        (new VectorDocumentCollectionDeleteCriteriaTransfer())
            ->setVectorDocumentConditions(
                (new VectorDocumentConditionsTransfer())->addDocumentKey('product_attachment:12'),
            ),
    );
```

## Error handling

The following table lists the results when a call fails:

<div class="width-100">

| CASE | RESULT |
|------|--------|
| No vector store plugin is registered | `saveVectorDocumentCollection()` and `deleteVectorDocumentCollection()` return `isSuccessful = false` with an error. `getVectorDocumentCollection()` returns `isSuccessful = false` with an error and writes an error to the log. |
| The criteria are not valid | `getVectorDocumentCollection()` returns `isSuccessful = false` with errors. |
| The store fails | All methods return `isSuccessful = false` with errors. |

</div>

## Implement a vector store plugin

To connect another vector store, implement `Spryker\Client\AiFoundation\Dependency\Plugin\VectorStorePluginInterface`. The interface has the same three methods as the Client:

<div class="width-100">

| METHOD | WHAT THE PLUGIN MUST DO |
|--------|-------------------------|
| `saveVectorDocumentCollection()` | Make the vectors from `VectorDocument.content` and save the documents. Replace a document with an existing `id`. |
| `deleteVectorDocumentCollection()` | Delete the documents that match `VectorDocumentConditions.ids` or `VectorDocumentConditions.documentKeys`. Do not return an error for a missing document. |
| `getVectorDocumentCollection()` | Make the query vector from `VectorDocumentConditions.queryText`. Apply all set conditions with AND. Return at most `Pagination.limit` documents, ordered by similarity score from highest to lowest, with `VectorDocument.score` set. |

</div>

Each method returns `isSuccessful = false` with errors when the store fails.
