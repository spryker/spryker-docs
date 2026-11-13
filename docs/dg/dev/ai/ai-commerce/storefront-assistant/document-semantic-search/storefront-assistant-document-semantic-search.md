---
title: Storefront Assistant document semantic search
description: Learn how Storefront Assistant answers questions from product documents, how Amazon Bedrock Knowledge Bases indexes and searches the documents, and which settings and extension points you can use.
last_updated: Nov 13, 2026
template: concept-topic-template
label: early-access
related:
  - title: Install Storefront Assistant document semantic search
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html
  - title: Add a knowledge document source
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/add-a-knowledge-document-source.html
  - title: Use another knowledge store provider
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/use-another-knowledge-store-provider.html
  - title: Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html
  - title: Storefront Assistant agents
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant-agents.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

Document semantic search lets Storefront Assistant answer questions that the product data does not answer, such as installation, maintenance, warranty, specification, or compliance questions. The assistant finds the answer in the documents that are attached to the products, such as manuals, data sheets, and certificates, and names the document that it used.

The search is semantic: it finds passages by meaning, not by exact words. A question such as "How much power does it use in standby?" finds a passage that says "Standby consumption: 0.5 W".

This document describes how the documents are indexed and searched, how the Amazon Bedrock knowledge base works, and which settings and extension points you can use. To install the feature, see [Install Storefront Assistant document semantic search](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html).

## How document semantic search works

Document semantic search has two sides. They share only the knowledge store and the document key.

- **Indexing side (Zed).** When a product attachment changes, Zed downloads the file and sends it to the knowledge store in the background.
- **Search side (Client, used by Yves and Glue).** The `product_knowledge_search` tool of the **Product Discovery** agent searches the knowledge store and returns the best matching passages to the AI model.

The knowledge store is the system that splits the documents into passages, turns each passage into a vector, and finds the passages that are closest to a question. By default, the knowledge store is an [Amazon Bedrock knowledge base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html). You can replace it with another vector database or managed search service. For details, see [Use another knowledge store provider](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/use-another-knowledge-store-provider.html).

Each document has a document key in the format `{sourceType}:{sourceIdentifier}`, for example `product_attachment:12`. The source type tells where the document comes from. The shipped source type is `product_attachment`. To add other documents, such as video transcripts, see [Add a knowledge document source](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/add-a-knowledge-document-source.html).

## How the Amazon Bedrock knowledge base works

Spryker does not parse, split, or embed the documents. Spryker sends the raw file to the knowledge base, and the knowledge base does the rest. This section describes the AWS resources, the division of work, and the AWS calls of each application layer.

### AWS resources

The application uses three AWS resources. They are a precondition of the environment: the application does not create them. You create them one time for each environment. For the steps, see [Install Storefront Assistant document semantic search](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/install-storefront-assistant-document-semantic-search.html#2-create-the-aws-resources).

<div class="width-100">

| RESOURCE | WHAT IT IS | WHAT THE APPLICATION READS |
|----------|------------|----------------------------|
| Knowledge base | A managed knowledge base of the type `MANAGED` with a managed embedding model. It stores the passages and their vectors and answers the search requests. You do not need OpenSearch or another vector database. | The knowledge base ID from `AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_ID`. |
| Custom data source | A data source of the knowledge base of the type `MANAGED_KNOWLEDGE_BASE_CONNECTOR` with the connector type `CUSTOM`. A custom data source accepts documents that the application sends directly with an API call, so you do not need an S3 bucket. | The data source ID of each source type from `AiCommerceConstants::BEDROCK_KNOWLEDGE_BASE_DATA_SOURCE_IDS`. |
| Service role | An IAM role that the knowledge base itself assumes to use the embedding model. | Nothing. The application never uses this role. |

</div>

### Division of work

<div class="width-100">

| TASK | DONE BY |
|------|---------|
| Track which documents exist and which changed | Spryker: the `spy_knowledge_document` table and the content hash |
| Download the file of a product attachment | Spryker: Zed |
| Parse PDF, Office, HTML, Markdown, CSV, text, and image files | Bedrock |
| Turn the images in a document into text, such as type plates and charts | Bedrock: image extraction of the data source |
| Split the text into passages and make the vectors | Bedrock: managed chunking and managed embedding model |
| Check which documents the customer can see | Spryker: the scope resolver plugin in the Client |
| Find the passages that are closest to the question | Bedrock: the `Retrieve` API with a metadata filter |
| Sort the passages by relevance | Bedrock: managed reranking |
| Remove duplicate and too short passages, and limit the text size | Spryker: the Client passage filter |

</div>

### AWS calls and credentials

Each application layer uses its own AWS SDK client and needs its own IAM permissions:

<div class="width-100">

| LAYER | AWS SDK CLIENT | WHEN | AWS API CALLS |
|-------|----------------|------|---------------|
| Zed: the `knowledge-document:setup` console command | `Aws\BedrockAgent\BedrockAgentClient` | One time after installation and after a configuration change | `GetKnowledgeBase`, `GetDataSource`, `UpdateDataSource` |
| Zed: the queue worker of `knowledge_document.index` | `Aws\BedrockAgent\BedrockAgentClient` | For each changed or deleted document | `IngestKnowledgeBaseDocuments`, `GetKnowledgeBaseDocuments`, `DeleteKnowledgeBaseDocuments` |
| Zed: the `knowledge-document:status:refresh` console command | `Aws\BedrockAgent\BedrockAgentClient` | Every five minutes, through the scheduler | `GetKnowledgeBaseDocuments` |
| Client: Yves and Glue | `Aws\BedrockAgentRuntime\BedrockAgentRuntimeClient` | For each call of the `product_knowledge_search` tool | `Retrieve` |

</div>

The knowledge base APIs accept AWS Signature Version 4 only. A Bedrock API key does not work. The AWS SDK gets the credentials in one of these ways:

- **Cloud environment.** Do not set credentials in the configuration. The AWS SDK uses its [default credential provider chain](https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials_default_chain.html), which reads the IAM role of the container.
- **Local environment.** Set temporary credentials in `config/Shared/config_local.php`. When `BEDROCK_KNOWLEDGE_BASE_AWS_ACCESS_KEY_ID` is set, the SDK uses the explicit credentials instead of the provider chain.

Both clients use the region from `BEDROCK_KNOWLEDGE_BASE_AWS_REGION`, `eu-central-1` by default, and the AWS SDK retry mode `adaptive` with five attempts. After a throttling response, the SDK waits with an exponential backoff and lowers the request rate of the client.

### Indexing flow

Documents are indexed in the background, so a change of an attachment does not slow down the Back Office or the data import:

1. A product attachment is created, changed, or deleted in the Back Office or by a data import. The entity events of `spy_product_attachment` and the `ProductAttachment.product_abstract_attachment.publish` event are triggered.
2. `KnowledgeDocumentWritePublisherPlugin` handles the events. It saves one row with the status `pending` for each affected document in `spy_knowledge_document` and sends one message for each document to the `knowledge_document.index` queue.
3. `KnowledgeDocumentIndexQueueMessageProcessorPlugin` handles each message:
    1. It reads the source through the source plugin of the source type. If the source does not exist anymore, it deletes the document from the knowledge base with `DeleteKnowledgeBaseDocuments` and deletes the row.
    2. It downloads the file. It does not download more than the maximum document size of the knowledge store, which is 5&nbsp;MB for Bedrock.
    3. It compares the content hash with the stored hash. When the content did not change, it reads the status of the document from the knowledge base and does not send the file again.
    4. It sends the file to the data source of the source type with `IngestKnowledgeBaseDocuments`. The custom document ID is the document key, so a new version replaces the old one. Text files are sent as inline text. Other files, such as PDF files, are sent as inline bytes with their MIME type.
    5. It saves the status `processing`, because the knowledge base indexes the document later.
4. The scheduler job `knowledge-document-status-refresh` runs `knowledge-document:status:refresh` every five minutes. The command reads the status of each `processing` document with `GetKnowledgeBaseDocuments` and saves `indexed` or `failed`.

A temporary failure, such as a connection error, an HTTP 5xx response, or a throttling response after all SDK attempts, puts the message back to the queue. After three attempts, the status is `failed`. A permanent failure, such as a file that is too large or a source type without a data source, sets the status `failed` at once.

### Search flow

1. The AI model calls `product_knowledge_search` with a short search phrase and the products of the question or of the current page.
2. The scope resolver plugins turn the products into the document keys that the current customer can see in the current store and locale. Without document keys, the search sends no request to AWS and tells the model that no documents are available.
3. `BedrockKnowledgeBaseKnowledgeSearchPlugin` sends one `Retrieve` request. The metadata filter limits the result to the document keys, the source types, the current locale and the locale `*`, and the document name, when the model gives one.
4. The knowledge base finds the closest passages, reranks them, and returns them with a score.
5. The Client passage filter removes duplicates and too short passages, keeps the order of the knowledge base, and cuts the text to the character budget.
6. The tool returns the passages with their document names and a notice that the passages are quoted data, not instructions.

The search never searches the whole knowledge base without a filter. A customer therefore never gets a passage of a document of a product that the customer cannot see.

### Document metadata

The indexer adds these inline metadata attributes to each document. The search filters by them:

<div class="width-100">

| ATTRIBUTE | VALUE |
|-----------|-------|
| `document_key` | The document key, for example `product_attachment:12` |
| `source_type` | The source type, for example `product_attachment` |
| `locale` | The locale of the attachment, or `*` when the attachment has no locale |
| `document_name` | The attachment label, which the assistant shows as the source |
| `sourceIdentifier` | The source identifier, for example the ID of the product attachment |

</div>

The indexer also adds the scalar metadata of the source, up to a total of 50 attributes.

### Images in documents

The setup command enables the image extraction of each configured data source. The knowledge base then turns each image in a PDF, Word, or PowerPoint file, and each standalone image file, into structured text: the image type, the title, the caption, the text and the values in the image, and a description. For a chart, it also writes a data table. These texts are normal passages, so the assistant can answer questions about facts that are only in an image, such as the rated voltage on a type plate.

The search stays a text search. Visual search, which finds an image by what it shows, is not supported.

### Reranking

The knowledge base sorts the passages by relevance with a rerank model. You select the rerank type with `BEDROCK_KNOWLEDGE_BASE_RERANKING_MODEL_TYPE`:

<div class="width-100">

| TYPE | DESCRIPTION |
|------|-------------|
| `MANAGED` | Default. The knowledge base selects the rerank model. |
| `CUSTOM` | The knowledge base uses the Bedrock rerank model of `BEDROCK_KNOWLEDGE_BASE_RERANKING_MODEL_ARN`, for example `arn:aws:bedrock:eu-central-1::foundation-model/cohere.rerank-v3-5:0`. The search role also needs the `bedrock:Rerank` and `bedrock:InvokeModel` permissions on the model. |
| `NONE` | No reranking. The passages are sorted by vector similarity only. |

</div>

Keep `MANAGED`. In a test with the demo documents, `MANAGED` put the answer at rank 1 for 86% of the questions, and `NONE` for 76%. `MANAGED` adds about 300&nbsp;ms of latency. The `CUSTOM` type is not verified end to end: evaluate it with your own documents before you use it in production.

### Limits

- A document can have a maximum of 5&nbsp;MB, because the indexer sends the content inline. A larger document gets the status `failed`. Upload through S3 is not supported.
- `Retrieve` searches all data sources of the knowledge base. Use one knowledge base for each environment, and do not add data sources that the configuration does not use.
- Bedrock does not change the chunking of an existing data source. To change the chunking, create a new data source and index all documents again.
- The default request quotas of Bedrock are low. A full forced re-index of many documents can get throttled. The AWS SDK and the queue send throttled requests again.

## Document status

The `spy_knowledge_document` table tracks each document:

<div class="width-100">

| STATUS | DESCRIPTION |
|--------|-------------|
| `pending` | The document waits in the queue. |
| `processing` | The knowledge base received the document and indexes it. The status refresh reads the result. |
| `indexed` | The knowledge base has the document. The row has the content hash and the time of the indexing. |
| `failed` | The document cannot be indexed. The `error_message` column has the reason. |

</div>

The status refresh maps the document status of the knowledge base to the status of the table:

<div class="width-100">

| KNOWLEDGE BASE STATUS | TABLE STATUS |
|-----------------------|--------------|
| `INDEXED`, `PARTIALLY_INDEXED`, `METADATA_PARTIALLY_INDEXED` | `indexed` |
| `PENDING`, `STARTING`, `IN_PROGRESS`, `TEXT_INDEXED` | `processing` |
| `FAILED`, `METADATA_UPDATE_FAILED`, `IGNORED`, `NOT_FOUND`, `DELETING`, `DELETE_IN_PROGRESS` | `failed`, with the reason |

</div>

`TEXT_INDEXED` means that the text of the document is indexed and the image extraction continues. A few minutes later, the status changes to `INDEXED`.

## The product_knowledge_search tool

`ProductKnowledgeSearchToolPlugin` provides the `product_knowledge_search` tool for the **Product Discovery** agent. The tool searches only the documents of products: without a product, the tool searches nothing. The assistant must answer only from the returned passages and name the document that it used.

The tool accepts the following arguments:

<div class="width-100">

| ARGUMENT | REQUIRED | DESCRIPTION |
|----------|----------|-------------|
| `query` | Yes | The question of the customer, rewritten as a short search phrase. A maximum of 1,000 characters. |
| `abstract_skus` | No | The abstract SKUs of the products to search. On a product page, the SKU comes from the page context. |
| `concrete_skus` | No | The concrete SKUs of product variants. The tool searches the documents of their abstract products. |
| `product_abstract_ids` | No | The `idProductAbstract` values of the products. |
| `attachment_ids` | No | The `sourceIdentifier` values of earlier results. The tool searches only these documents of the given products. |
| `document_name` | No | The name of a document. The tool searches only this document. |
| `source_types` | No | The source types to search, for example `product_attachment`. The tool searches all source types when you omit it. |
| `limit` | No | The maximum number of passages, from `1` to `5`. |

</div>

Each identifier list can have a maximum of 10 values. The tool never throws an error for invalid arguments: it returns `isSuccessful = false` and the reason in `messages`. When the knowledge store fails, the tool tells the model that the document search is not available, and the assistant answers from the product data.

### Document scope

Before the search, the scope resolver plugins turn the products of the request into the document keys that the current customer may see. `ProductAttachmentKnowledgeDocumentScopeResolverPlugin` does the following:

- Resolves abstract and concrete SKUs to abstract products through the product storage.
- Skips products that are not available in the current store and locale. It adds a message that is safe to show to the customer.
- Reads the attachments of each product from the product attachment storage for the current locale.
- Returns only the attachments that are listed in `attachment_ids`, when the model passes them.

### Search settings

You can change the following settings in the Client `AiCommerceConfig`. A change applies to the next question. You do not need to index the documents again.

<div class="width-100">

| METHOD | DEFAULT | DESCRIPTION |
|--------|---------|-------------|
| `getKnowledgeDocumentMaxResults()` | `5` | The maximum number of passages that one search returns. A larger requested limit is lowered to this value. |
| `getKnowledgeDocumentMaxCharacters()` | `5000` | The maximum total number of characters of all returned passages. The content of the passages with the lowest score is cut first. |
| `getKnowledgeDocumentCandidateMultiplier()` | `2` | The search asks the knowledge store for this number multiplied by the limit, so that the passages that the filter removes are replaced. `1` asks for the limit only. |
| `getKnowledgeDocumentMinContentLength()` | `30` | The minimum number of characters of a passage after whitespace is collapsed. Shorter passages, such as a chunk with only a heading, are removed. |
| `getKnowledgeDocumentMaxIdentifiers()` | `10` | The maximum number of values in each identifier list. A search with a longer list is rejected. |
| `getKnowledgeDocumentMaxQueryLength()` | `1000` | The maximum number of characters of `query`. |
| `getKnowledgeDocumentMaxDocumentNameLength()` | `255` | The maximum number of characters of `document_name`. |

</div>

The search has no score threshold. The AI model decides from the content of the passages if they answer the question.

## Indexing settings

You can change the following settings in the Zed `AiCommerceConfig`:

<div class="width-100">

| METHOD | DEFAULT | DESCRIPTION |
|--------|---------|-------------|
| `getKnowledgeDocumentMaxFileSize()` | `52428800` (50&nbsp;MiB) | The maximum size of a downloaded document in bytes. The smaller maximum size of the knowledge store also applies: 5&nbsp;MB for Bedrock. |
| `getKnowledgeDocumentIndexMaxAttempts()` | `3` | The number of attempts to index a document after temporary failures. |
| `getKnowledgeDocumentDownloadTimeout()` | `30` | The timeout of a document download in seconds. |
| `getKnowledgeDocumentIndexQueueChunkSize()` | `10` | The number of messages that the queue worker of `knowledge_document.index` reads at one time. |
| `getKnowledgeDocumentReindexPageSize()` | `100` | The number of sources that a re-index reads in one page. |
| `getKnowledgeDocumentStatusRefreshPageSize()` | `100` | The number of `processing` documents that the status refresh reads in one page. |
| `getBedrockKnowledgeBaseMediaExtractionConfiguration()` | Image extraction enabled | The media extraction configuration that the setup adds to each data source that does not have it. An empty array keeps the data source unchanged. |
| `getBedrockKnowledgeBaseMaxInlineDocumentSize()` | `5242880` (5&nbsp;MB) | The maximum size of a document that is sent inline to the knowledge base. |
| `getBedrockKnowledgeBaseInlineTextMimeTypes()` | `text/plain`, `text/markdown`, `text/csv` | The MIME types that are sent as inline text. Other MIME types are sent as inline bytes. |
| `getBedrockKnowledgeBaseSetupStatusCheckAttempts()` | `60` | How many times the setup reads the status of the knowledge base or a data source before it fails. |
| `getBedrockKnowledgeBaseSetupStatusCheckInterval()` | `5` | The wait time in seconds between two status reads of the setup. |

</div>

## Console commands

<div class="width-100">

| COMMAND | OPTIONS | DESCRIPTION |
|---------|---------|-------------|
| `knowledge-document:setup` | `--recreate-index` | Checks the knowledge base and each configured data source, waits until they are ready, and enables the image extraction. It creates nothing and stores nothing. With `-v`, the command shows each step. The Bedrock store does not support `--recreate-index` and only reports this. |
| `knowledge-document:reindex` | `--source-type`, `--force` | Queues all documents for indexing, and queues the documents of deleted sources for deletion. `--source-type` limits the command to one source type. Repeat the option for several source types. `--force` clears the content hash, so that every document is sent to the knowledge base again. With `-v`, the command shows the number of queued documents for each source type. |
| `knowledge-document:status:refresh` | | Reads the knowledge base status of all `processing` documents and saves `indexed` or `failed`. The output is `Checked N document(s): X indexed, Y failed.` |

</div>

## Download security

The URL reader downloads a document only from a host that resolves to public IPv4 or IPv6 addresses. It connects only to the checked address and follows no redirect. This prevents a product attachment URL from reading internal services.

When the environment sets `HTTP_PROXY` or `HTTPS_PROXY`, the download goes through the proxy, and the proxy resolves the host itself. In this case, configure the proxy to block private, loopback, and link-local addresses.

## Extension points

<div class="width-100">

| INTERFACE | LAYER | REGISTERED IN | SHIPPED PLUGIN | GUIDE |
|-----------|-------|---------------|----------------|-------|
| `KnowledgeDocumentSourcePluginInterface` | Zed | `AiCommerceDependencyProvider::getKnowledgeDocumentSourcePlugins()` | `ProductAttachmentKnowledgeDocumentSourcePlugin` | [Add a knowledge document source](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/add-a-knowledge-document-source.html) |
| `KnowledgeDocumentScopeResolverPluginInterface` | Client | `AiCommerceDependencyProvider::getKnowledgeDocumentScopeResolverPlugins()` | `ProductAttachmentKnowledgeDocumentScopeResolverPlugin` | [Add a knowledge document source](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/add-a-knowledge-document-source.html) |
| `KnowledgeStorePluginInterface` | Zed | `AiCommerceDependencyProvider::getKnowledgeStorePlugin()` | `BedrockKnowledgeBaseKnowledgeStorePlugin` | [Use another knowledge store provider](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/use-another-knowledge-store-provider.html) |
| `KnowledgeSearchPluginInterface` | Client | `AiCommerceDependencyProvider::getKnowledgeSearchPlugin()` | `BedrockKnowledgeBaseKnowledgeSearchPlugin` | [Use another knowledge store provider](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/use-another-knowledge-store-provider.html) |

</div>
