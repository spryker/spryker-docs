---
title: Storefront Assistant document knowledge
description: Learn how Storefront Assistant answers questions from product documents, such as manuals and data sheets, how the documents are indexed, and which extension points and settings you can use.
last_updated: Nov 10, 2026
template: concept-topic-template
label: early-access
related:
  - title: Install Storefront Assistant document knowledge
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant-document-knowledge.html
  - title: Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html
  - title: Storefront Assistant agents
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant-agents.html
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

Document knowledge lets Storefront Assistant answer questions that the product data does not answer, such as installation, maintenance, specification, or compliance questions. The assistant finds the answer in the documents that are attached to the products, for example manuals, data sheets, and certificates, and names the document that it used.

This document describes how the documents are indexed and searched, and which extension points and settings you can use. To install the feature, see [Install Storefront Assistant document knowledge](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant-document-knowledge.html).

## How document knowledge works

Document knowledge has two sides that share only the vector store index and the document key. A document key has the format `{sourceType}:{sourceIdentifier}`, for example `product_attachment:12`.

- **Indexing side (Zed).** Zed reads the documents, extracts their text, and saves the text in the vector store.
- **Answering side (Client).** The `search_documents` tool of the agent searches the vector store and returns the matching passages to the model.

The vector store is the AiFoundation vector store. For details, see [Store and search documents with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-vector-store.html). The `OpenSearchMlVectorStorePlugin` plugin of the `AiCommerce` module implements it for OpenSearch.

## Index documents

Documents are indexed in the background, so that a change of an attachment does not slow down the Back Office. The indexing runs through the following steps:

1. A change of a document source, such as a product attachment, triggers an event.
2. `StorefrontAssistantDocumentWritePublisherPlugin` handles the event. It saves a row with the status `pending` for each affected document in the `spy_storefront_assistant_document` table and sends one message for each document to the `storefront_assistant.document.index` queue.
3. `StorefrontAssistantDocumentIndexQueueMessageProcessorPlugin` handles each message:
   1. It reads the source through the source plugin of the document source type. If the source no longer exists, the document is deleted from the vector store and from the table.
   2. It reads the content and checks the size.
   3. It extracts the text with the first text extractor plugin that supports the MIME type of the content.
   4. It replaces the document in the vector store. The vector store splits the text into passages and makes the vectors.
   5. It sets the status of the document to `indexed`.

The indexing skips a document when the content did not change since the last indexing. It compares the stored content hash with the hash of the content.

### Document status

The `spy_storefront_assistant_document` table tracks each document:

<div class="width-100">

| STATUS | DESCRIPTION |
|--------|-------------|
| `pending` | The document waits in the queue for the indexing. |
| `indexed` | The document is in the vector store. The row has the content hash and the time of the indexing. |
| `failed` | The indexing failed. The `error_message` column has the reason. |

</div>

When the download of a document or the vector store fails temporarily, the document is queued again until the number of attempts reaches the value of `AiCommerceConfig::getDocumentIndexMaxAttempts()`, which is `3` by default. After the last attempt, or after a permanent failure, such as a document that is too large or has no text, the status is `failed`. Each failure is written to the log with the source type, the source identifier, and the reason.

### Supported documents

The shipped product attachment source reads the documents that are attached to products in the Back Office. By default, `PlainTextStorefrontAssistantDocumentTextExtractorPlugin` is the only text extractor. It supports the following MIME types:

- `text/plain`
- `text/markdown`
- `text/csv`

Attachments of other types, such as PDF files, are not indexed until you add a text extractor plugin for them. For details, see [Extension points](#extension-points). The maximum size of a document is 50&nbsp;MiB. An attachment without a locale applies to all locales.

### Re-index documents

To queue all documents for indexing, run the `storefront-assistant:document:reindex` console command. Then run a queue worker to process the messages:

```bash
console storefront-assistant:document:reindex
console queue:worker:start --stop-when-empty
```

The command has the following options:

<div class="width-100">

| OPTION | DESCRIPTION |
|--------|-------------|
| `--source-type` | The source type to re-index, for example `product_attachment`. Repeat the option for several source types. When you omit it, the command queues all registered source types. An unknown source type returns an error, and the command queues nothing. |
| `--force` | Clears the content hash, so that every document is indexed again, also when its content did not change. |

</div>

Re-index the documents after you install the feature, after you change the vector store, and after you add a text extractor.

## Answer questions from documents

The `search_documents` tool, `SearchDocumentsToolPlugin`, searches the documents of the products that the assistant names. The tool limits the search to documents of products: without a product, the tool searches nothing. The assistant must answer only from the returned passages and name the document that it used. The tool marks the passage text as quoted data, so that the model does not follow instructions that a document contains.

The tool accepts the following arguments:

<div class="width-100">

| ARGUMENT | REQUIRED | DESCRIPTION |
|----------|----------|-------------|
| `query` | Yes | The question of the customer, rewritten as a short search phrase. |
| `abstract_skus` | No | The abstract SKUs of the products to search. On a product page, the SKU comes from the page context. |
| `concrete_skus` | No | The concrete SKUs of product variants. The tool searches the documents of their abstract products. |
| `product_abstract_ids` | No | The `idProductAbstract` values of the products. |
| `attachment_ids` | No | The `sourceIdentifier` values of earlier results. The tool searches only these documents of the given products. |
| `document_name` | No | The name of a document. The tool searches only this document. |
| `source_types` | No | The source types to search, for example `product_attachment`. The tool searches all source types when you omit it. |
| `limit` | No | The maximum number of passages, from `1` to `5`. |

</div>

The tool never throws an error for invalid arguments. It returns `isSuccessful = false` and the reason in `messages`.

### Document scope

Before the search, the scope resolver plugins turn the identifiers of the request into the document keys that the current customer may see in the current store and locale. `ProductAttachmentStorefrontAssistantDocumentScopeResolverPlugin` does the following:

- Resolves abstract and concrete SKUs to abstract products.
- Skips products that are restricted or not available in the current store and locale. It adds a message that is safe to show to the customer.
- Reads the attachments of each product from the product attachment storage, for the current locale and for the default locale.
- Returns only the attachments that are listed in `attachment_ids`, when you pass them.

The search uses the document keys of the scope together with the current locale and the locale `*`. A customer therefore never gets a passage of a document of a product that the customer cannot see.

### Search limits

The following limits apply to each search. You can change them in the Client `AiCommerceConfig`:

<div class="width-100">

| METHOD | DEFAULT | DESCRIPTION |
|--------|---------|-------------|
| `getStorefrontAssistantDocumentMaxResults()` | `5` | The maximum number of passages that one search returns. A larger requested limit is lowered to this value. |
| `getStorefrontAssistantDocumentMaxCharacters()` | `4000` | The maximum total number of characters of all returned passages. The tool cuts the passages with the lowest score first. |
| `getStorefrontAssistantDocumentMaxIdentifiers()` | `10` | The maximum number of identifiers in each identifier list of a search, for example abstract SKUs. A search with a longer list is rejected. |

</div>

## Extension points

You can add more document sources, text extractors, and scope resolvers as plugins:

<div class="width-100">

| INTERFACE | LAYER | REGISTERED IN | SHIPPED PLUGIN |
|-----------|-------|---------------|----------------|
| `StorefrontAssistantDocumentSourcePluginInterface` | Zed | `AiCommerceDependencyProvider::getStorefrontAssistantDocumentSourcePlugins()` | `ProductAttachmentStorefrontAssistantDocumentSourcePlugin` |
| `StorefrontAssistantDocumentTextExtractorPluginInterface` | Zed | `AiCommerceDependencyProvider::getStorefrontAssistantDocumentTextExtractorPlugins()` | `PlainTextStorefrontAssistantDocumentTextExtractorPlugin` |
| `StorefrontAssistantDocumentScopeResolverPluginInterface` | Client | `AiCommerceDependencyProvider::getStorefrontAssistantDocumentScopeResolverPlugins()` | `ProductAttachmentStorefrontAssistantDocumentScopeResolverPlugin` |

</div>

### Document source plugin

A document source plugin tells the indexing where documents come from. It implements the following methods:

<div class="width-100">

| METHOD | DESCRIPTION |
|--------|-------------|
| `getSourceType()` | Returns the unique source type, for example `product_attachment`. |
| `getSubscribedEvents()` | Returns the event names that create, change, or delete documents of this source. |
| `extractSourceIdentifiers()` | Returns the source identifiers that the events affect. |
| `getDocumentSourceCollection()` | Returns the existing sources for the given source identifiers, or one page of all sources when no identifier is set. A requested identifier that is missing in the result means that the source was deleted. |
| `readDocumentContent()` | Returns the raw content and the MIME type of the source. On failure, returns `isSuccessful = false` with errors, and sets `isTemporaryFailure = true` when a retry can succeed. |

</div>

### Text extractor plugin

A text extractor plugin turns the content of a document into plain text. It implements the following methods:

<div class="width-100">

| METHOD | DESCRIPTION |
|--------|-------------|
| `isApplicable()` | Returns `true` when the plugin can read the MIME type of the content. The indexing uses the first applicable plugin of the stack. |
| `extractText()` | Returns the plain text of the content. Returns `isSuccessful = false` with errors when the content has no text or cannot be read. |

</div>

To index PDF files, add a text extractor plugin that supports `application/pdf`, and re-index the documents.

### Scope resolver plugin

A scope resolver plugin limits a search to the documents that the current customer may see. It implements the following methods:

<div class="width-100">

| METHOD | DESCRIPTION |
|--------|-------------|
| `isApplicable()` | Returns `true` when the request contains identifiers that the plugin resolves. |
| `resolveDocumentScope()` | Returns the document keys that the current customer may see in the current store and locale. When no document is visible, returns an empty scope with a message that is safe to show to the customer. |

</div>

## Indexing settings

You can change the following settings in the Zed `AiCommerceConfig`:

<div class="width-100">

| METHOD | DEFAULT | DESCRIPTION |
|--------|---------|-------------|
| `getStorefrontAssistantDocumentMaxFileSize()` | `52428800` (50&nbsp;MiB) | The maximum size of a document in bytes. A larger document fails permanently. |
| `getDocumentIndexMaxAttempts()` | `3` | The number of attempts to index a document after temporary failures. |
| `getStorefrontAssistantDocumentDownloadTimeout()` | `30` | The timeout of a document download, in seconds. |
| `getStorefrontAssistantDocumentIndexQueueChunkSize()` | `10` | The number of messages that the queue worker of `storefront_assistant.document.index` reads at one time. |
| `getStorefrontAssistantDocumentReindexPageSize()` | `100` | The number of sources that a re-index reads in one page. |

</div>
