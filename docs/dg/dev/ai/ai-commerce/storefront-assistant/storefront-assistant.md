---
title: Storefront Assistant
description: Technical overview of the Storefront Assistant feature — architecture, agents, tools, the streaming protocol, endpoints, and configuration options.
last_updated: Oct 9, 2026
template: concept-topic-template
related:
  - title: Install Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html
  - title: Add a custom Storefront Assistant agent
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/add-custom-storefront-assistant-agent.html
  - title: Stream AI responses with the AiFoundation module
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-stream-prompt.html
---

Storefront Assistant is an AI chat for logged-in Storefront customers. It answers shopping questions only from the shop catalog and streams each answer to the browser as Server-Sent Events (SSE).

For the business overview, see [Storefront Assistant](/docs/pbc/all/ai-commerce/latest/storefront-assistant.html).

## Architecture

Storefront Assistant runs in the Yves application. The chat logic, the agents, and the tools run in the Client layer, inside the Yves process. Zed resolves the AI configuration and calls the AI vendor through the `AiFoundation` gateway.

| PART | IMPLEMENTATION | LAYER |
|------|----------------|-------|
| Chat widget | `StorefrontAssistantWidget`, which renders the `storefront-assistant` organism (Twig, TypeScript, SCSS) | Yves |
| Header button | The `storefront-assistant-launcher` molecule, included by the project `header` organism | Yves |
| Endpoints | `StorefrontAssistantController`, registered by `StorefrontAssistantRouteProviderPlugin` | Yves |
| Agents, tools, and SSE plugins | `SprykerFeature\Client\AiCommerce\Plugin\...` | Client |
| Streaming, tool loop, and chat history | `AiFoundationClientInterface::streamPrompt()` | Client and Zed |
| Chat history storage | The `spy_ai_conversation_history` table of the `AiFoundation` module | Zed |
| Conversation list and index | Key-value storage (Redis) with a time to live (TTL) | Client |

For each chat turn, the following happens:

1. The browser sends `POST /shopping-assistant/prompt` with the message, the conversation reference, and the page context.
2. The controller validates the request and opens an SSE stream.
3. The agent selector picks one agent for the turn. For details, see [Agent selection](#agent-selection).
4. The agent calls `AiFoundationClientInterface::streamPrompt()` with its system prompt and tool names.
5. While the model answers, the SSE plugins write the text, the reasoning, and the tool events to the stream.
6. `AiFoundation` saves the turn in the chat history.

For details on how `streamPrompt()` sends the model output, the tool calls, and the conversation history, see [Stream AI responses with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-stream-prompt.html).

The browser keeps only a small state in `localStorage` under the `storefront_assistant_state` key: `isOpen`, `isExpanded`, `conversationReference`, `userSelectedAgent`, and `activeAgent`. The browser does not keep the messages. It loads them from the server on each page load.

## Agents

An agent is a plugin that has its own system prompt, tool list, and Back Office toggle. Storefront Assistant ships with one agent:

| AGENT | PLUGIN | DESCRIPTION |
|-------|--------|-------------|
| Product Discovery | `ProductDiscoveryAgentPlugin` | Answers shopping questions only from the shop catalog. It searches products, categories, product relations, product sets, and CMS pages. |

Agents are registered in the Client `AiCommerceDependencyProvider::getStorefrontAssistantAgentPlugins()`. To add an agent, see [Add a custom Storefront Assistant agent](/docs/dg/dev/ai/ai-commerce/storefront-assistant/add-custom-storefront-assistant-agent.html).

### Agent selection

`AgentSelector` selects one agent for each chat turn:

1. It skips each agent whose Back Office toggle is off.
2. If the customer selected an agent in the chat, the enabled agent with this name handles the turn.
3. If the customer selected **Auto**, the first enabled agent in the plugin stack whose `isApplicable()` method returns `true` handles the turn.
4. If no agent is found, the turn ends with the `ai_commerce.storefront_assistant.error.no_agent_available` error.

The `data-agent` stream event tells the browser which agent answered. The chat shows this agent in the agent badge.

## Tools

Each agent can call the tools that are in its tool list. Some tools are research for the agent, and their results stay on the server. Other tools are *customer-facing*: their results go to the browser and render as UI blocks.

| TOOL | PLUGIN | CUSTOMER-FACING | DESCRIPTION |
|------|--------|-----------------|-------------|
| `catalog_search` | `CatalogSearchToolPlugin` | No | Searches the catalog with a query, filters, and a price range. Returns facets for refinement chips. |
| `catalog_suggest` | `CatalogSuggestToolPlugin` | No | Looks up terms, categories, CMS pages, and product sets that the shop publishes. |
| `category_tree` | `CategoryTreeToolPlugin` | No | Returns the category tree of the shop. |
| `product_details` | `ProductDetailsToolPlugin` | No | Returns the details of a product, including offers and options. |
| `product_relations` | `ProductRelationsToolPlugin` | No | Returns related products, such as alternatives and accessories. |
| `product_sets` | `ProductSetsToolPlugin` | No | Returns product sets. |
| `read_shop_page` | `ReadShopPageToolPlugin` | No | Reads the text of a CMS page, such as returns or delivery information. |
| `display_products` | `DisplayProductsToolPlugin` | Yes | Shows product cards. |
| `compare_products` | `CompareProductsToolPlugin` | Yes | Shows a comparison table. |
| `offer_choices` | `OfferChoicesToolPlugin` | Yes | Shows a clarifying question with answer chips. |
| `display_setup` | `DisplaySetupToolPlugin` | Yes | Shows two to four products that work together, with their total against a budget. |

The tool plugins are registered in the Client `AiFoundationDependencyProvider::getAiToolPlugins()`. Three lists in the project must stay aligned:

- The tool plugins in `AiFoundationDependencyProvider::getAiToolPlugins()`.
- The tool names of the agent in `AiCommerceConfig::getProductDiscoveryAgentToolNames()`.
- The customer-facing tool names in `AiCommerceConfig::getStorefrontAssistantCustomerFacingToolNames()`.

A customer-facing tool must also be an agent tool.

## SSE plugins

The following Client plugins write the stream events. They are registered in the Client `AiFoundationDependencyProvider`:

| PLUGIN | STACK | DESCRIPTION |
|--------|-------|-------------|
| `StorefrontAssistantSsePreToolCallPlugin` | `getPreToolCallPlugins()` | Sends `tool-input-start` and `tool-input-available` before each tool call. |
| `StorefrontAssistantSsePostToolCallPlugin` | `getPostToolCallPlugins()` | Sends `tool-output-available` or `tool-output-denied` after each customer-facing tool call. |
| `StorefrontAssistantSseStreamEventPlugin` | `getStreamEventPlugins()` | Sends the text and reasoning deltas of the model. |

These plugins implement the `AiFoundation` streaming plugin interfaces. For the plugin contract, see [Stream AI responses with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-stream-prompt.html#plugin-reference).

The SSE plugins send events only for the AI configurations that `AiCommerceConfig::getStorefrontAssistantSseAiConfigurationNames()` returns. A turn on any other AI configuration streams only `start`, `data-agent`, `finish`, and `[DONE]`.

## Endpoints

`StorefrontAssistantRouteProviderPlugin` adds the following routes:

| METHOD | PATH | ROUTE NAME | CSRF HEADER | RESPONSE |
|--------|------|------------|-------------|----------|
| `POST` | `/shopping-assistant/prompt` | `shopping-assistant/prompt` | Yes | SSE stream |
| `GET` | `/shopping-assistant/conversations` | `shopping-assistant/conversations` | No | JSON |
| `GET` | `/shopping-assistant/conversations/messages` | `shopping-assistant/conversations/messages` | No | JSON |
| `DELETE` | `/shopping-assistant/conversations` | `shopping-assistant/conversations/delete` | Yes | JSON |

Requests with a CSRF header must send the `X-CSRF-Token` header with a token for the `storefront_assistant` token ID. The widget reads the token from the page.

All endpoints require a logged-in customer. When the **Enable Storefront Assistant** setting is off, all endpoints return `404`.

### Prompt request

The body of `POST /shopping-assistant/prompt` is a JSON object:

```json
{
  "message": "Show me cameras under 500 euros",
  "conversationReference": "c_7f3a9b",
  "selectedAgent": "product_discovery",
  "pageContext": { "pageType": "category", "categoryName": "Cameras", "filters": ["Canon"] },
  "attachments": [{ "mediaType": "image/png", "content": "<base64>", "name": "photo.png" }]
}
```

| FIELD | REQUIRED | RULE |
|-------|----------|------|
| `message` | Yes | Must not be empty. The maximum length comes from `getStorefrontAssistantMaxMessageLengthCharacters()`, which is calculated from the conversation history context window of `AiFoundation`. |
| `conversationReference` | Yes | Generated by the browser. Must match `/\A[A-Za-z0-9_-]+\z/` and have a maximum of 64 characters. |
| `selectedAgent` | No | The agent name. An empty or missing value means **Auto**. |
| `pageContext` | No | `pageType` is `product`, `category`, or `search`. The server removes the context for other values. |
| `attachments` | No | A maximum of five files of 5&nbsp;MiB each. Allowed types: JPEG, PNG, WebP, GIF, and PDF. The server checks the binary signature of each file. |

### Errors before the stream starts

The controller validates the request before it opens the stream. If a check fails, the response is plain JSON, not SSE:

| STATUS | BODY | CAUSE |
|--------|------|-------|
| `404` | Empty | **Enable Storefront Assistant** is off. |
| `403` | `{"error": "<translated text>"}` | No customer is logged in, or the `X-CSRF-Token` header is not valid. |
| `400` | `{"error": "<translated text>"}` | The body is not valid JSON, is empty, or is too large, or the message, reference, or attachments fail validation. |

A client must read the `Content-Type` header of the response before it parses the body. Parse the body as SSE only when the type is `text/event-stream`.

## Stream protocol

The prompt endpoint follows the [AI SDK UI Message Stream Protocol](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol). This lets you replace the shipped widget with any client that understands this protocol.

| ELEMENT | VALUE |
|---------|-------|
| Transport | SSE over the HTTP response body of the `POST` request |
| Frame | `data: <JSON object>\n\n`, one JSON part for each frame, without `event:` or `id:` lines |
| Part type | The `type` field of the JSON object |
| End of stream | `data: [DONE]\n\n` |
| Writer | `SprykerFeature\Shared\AiCommerce\Stream\StreamEventEmitter`, which flushes the output after each frame |

A successful stream has the following response headers:

| HEADER | VALUE | PURPOSE |
|--------|-------|---------|
| `Content-Type` | `text/event-stream` | Marks the response as SSE. |
| `Cache-Control` | `no-cache` | Prevents caching of the stream. |
| `X-Accel-Buffering` | `no` | Disables nginx buffering, so each frame reaches the browser immediately. |

{% info_block infoBox "Protocol header" %}

The protocol recommends the `x-vercel-ai-ui-message-stream: v1` response header for custom backends. Storefront Assistant does not send this header, and the shipped widget does not need it. If you connect a client that checks this header, such as the AI SDK `useChat` hook, add the header in a project-level controller.

{% endinfo_block %}

### Part types

| PART TYPE | FIELDS | WHEN |
|-----------|--------|------|
| `start` | `messageId` | Always, as the first part. |
| `data-agent` | `data.name` | After the agent selection, before the model call. |
| `reasoning-start` | `id` | At the first reasoning chunk of a block. Sent only when `isStorefrontAssistantReasoningStreamed()` returns `true`. |
| `reasoning-delta` | `id`, `delta` | For each reasoning chunk of the model. |
| `reasoning-end` | `id` | When a text block, a tool call, an error, or the end of the turn follows. |
| `text-start` | `id` | At the first text chunk of a block. |
| `text-delta` | `id`, `delta` | For each answer text chunk. |
| `text-end` | `id` | When a reasoning block, a tool call, an error, or the end of the turn follows. |
| `tool-input-start` | `toolCallId`, `toolName` | Before each tool call, both research and customer-facing. |
| `tool-input-available` | `toolCallId`, `toolName`, `input` | Directly after `tool-input-start`. `input` contains the arguments that the model sent. |
| `tool-output-available` | `toolCallId`, `output.result` | After a customer-facing tool call. |
| `tool-output-denied` | `toolCallId` | When a customer-facing tool was not allowed to run. |
| `error` | `errorText` | On a validation error, when no agent is enabled, on a vendor failure, or on an exception. The server closes the open text or reasoning block first. |
| `finish` | — | Always, as the last part, also after an `error`. |

The server follows these rules:

- Each turn has exactly one `start` part and one `finish` part.
- Only one text or reasoning block is open at a time. A new block, a tool call, or an error closes the open block first.
- Each block `id` is unique in the turn, for example `text_1`, `reasoning_2`, `text_3`.
- The `tool-input-*` and `tool-output-*` parts of one call have the same `toolCallId`.
- A research tool, such as `catalog_search`, sends `tool-input-*` parts but no `tool-output-*` part. The widget uses the input parts only for the progress label.

The server does not send these protocol part types: `start-step`, `finish-step`, `tool-input-delta`, `source-url`, `file`, and `abort`.

### Example stream

The customer sends "Show me cameras under 500 euros":

```text
data: {"type":"start","messageId":"msg_6703a1f2b4c5d"}

data: {"type":"data-agent","data":{"name":"product_discovery"}}

data: {"type":"reasoning-start","id":"reasoning_1"}

data: {"type":"reasoning-delta","id":"reasoning_1","delta":"The customer wants cameras with a price limit of 500 EUR."}

data: {"type":"reasoning-end","id":"reasoning_1"}

data: {"type":"tool-input-start","toolCallId":"call_a1b2c3d4","toolName":"catalog_search"}

data: {"type":"tool-input-available","toolCallId":"call_a1b2c3d4","toolName":"catalog_search","input":{"query":"camera","priceMax":50000}}

data: {"type":"tool-input-start","toolCallId":"call_e5f6a7b8","toolName":"display_products"}

data: {"type":"tool-input-available","toolCallId":"call_e5f6a7b8","toolName":"display_products","input":{"idProductAbstracts":[201,204,210]}}

data: {"type":"tool-output-available","toolCallId":"call_e5f6a7b8","output":{"result":"{\"products\":[{\"idProductAbstract\":201,\"name\":\"Canon IXUS 160\",\"sku\":\"201\",\"url\":\"/en/canon-ixus-160-201\",\"priceFormatted\":\"€349.00\",\"rating\":4.5,\"reviewCount\":12}],\"displayedCount\":3,\"refinementChips\":[{\"label\":\"Canon\",\"filterArgument\":\"filters.brand\",\"value\":\"Canon\",\"matchCount\":5}],\"seeAll\":{\"totalResults\":18,\"queryString\":\"q=camera&price%5Bmax%5D=500\"}}"}}

data: {"type":"text-start","id":"text_2"}

data: {"type":"text-delta","id":"text_2","delta":"These three cameras fit your budget. "}

data: {"type":"text-delta","id":"text_2","delta":"Narrow by brand to see fewer models."}

data: {"type":"text-end","id":"text_2"}

data: {"type":"finish"}

data: [DONE]
```

The values in this example are illustrations. The field names are the real names.

A failed turn, for example without an API token, looks like this:

```text
data: {"type":"start","messageId":"msg_6703a1f2b4c5e"}

data: {"type":"data-agent","data":{"name":"product_discovery"}}

data: {"type":"error","errorText":"The shopping assistant is temporarily unavailable. Please try again."}

data: {"type":"finish"}

data: [DONE]
```

The `errorText` value is a glossary translation in the locale of the request. The server writes the vendor error to the log, not to the stream.

### Tool results

The `output.result` value is a JSON-encoded string, not a JSON object. Decode it a second time. The content depends on the tool:

| TOOL | KEYS OF THE DECODED RESULT |
|------|---------------------------|
| `display_products` | `products[]`, `displayedCount`, and optionally `unknownIdProductAbstracts[]` and `alreadyShown`. When the products come from a `catalog_search` call of the same turn, also `refinementChips[]`, `activeFilters[]`, and `seeAll`. |
| `compare_products` | `comparedProducts[]`, `attributeRows[]` with `attribute`, `values[]`, and `isDifferent`, and optionally `comparisonUrl`, `ignoredIdProductAbstracts[]`, and `unknownIdProductAbstracts[]`. On failure, `error` or `alreadyShown`. |
| `offer_choices` | `question`, `choices[]`, and `nextStep`. On failure, `error`. |
| `display_setup` | `products[]`, `totalFormatted`, and `budgetFormatted`. On failure, `error`, and `items[]` when the setup exceeds the budget. |

A product card has the following fields: `idProductAbstract`, `name`, `sku`, `url`, `imageUrl`, `description`, `price`, `priceFormatted`, `originalPrice`, `originalPriceFormatted`, `currencyIsoCode`, `priceMode`, `rating`, `reviewCount`, `labelIds`, `labels`, `attributes`, `variants`, `variantCount`, `reason`, and `isPriceOutlier`. Plugins in `getStorefrontAssistantProductCollectionExpanderPlugins()` can add more fields.

| OBJECT | FIELDS |
|--------|--------|
| Refinement chip in `refinementChips[]` and `activeFilters[]` | `label`, `filterArgument`, `value`, `matchCount` |
| `seeAll` | `totalResults`, `queryString`, and `categoryUrl` when the search had a category. Sent only when more products match than the chat shows. |

### Conversation history endpoints

The history endpoints return plain JSON:

| METHOD AND PATH | REQUEST | RESPONSE |
|-----------------|---------|----------|
| `GET /shopping-assistant/conversations` | Optional query parameter `conversationReference` or `conversationReferences[]` | `{"conversations":[{"conversationReference","name","updatedAt"}]}`, newest first |
| `GET /shopping-assistant/conversations/messages` | Query parameter `conversationReference` | `{"conversationReference","messages":[{"role","content","attachments":[{"name"}],"toolInvocations":[{"name","result"}]}]}` |
| `DELETE /shopping-assistant/conversations` | `X-CSRF-Token` header and a JSON body with `conversationReference` or `conversationReferences` | `{"deletedCount": N}` |

`toolInvocations[].result` has the same format as `output.result` in the stream, with two differences:

- The history returns only customer-facing tools.
- The product cards are refreshed with current data, but `refinementChips`, `activeFilters`, and `seeAll` are not included. They exist only in the live stream.

### Read the stream in a custom client

Use `fetch()` instead of `EventSource`. `EventSource` sends only `GET` requests and cannot send a request body or the CSRF header.

```ts
const response = await fetch('/shopping-assistant/prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ message, conversationReference }),
});

if (!response.headers.get('Content-Type')?.startsWith('text/event-stream')) {
    const { error } = await response.json().catch(() => ({ error: '' }));
    throw new Error(error || `HTTP ${response.status}`);
}

const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
let buffer = '';

for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;

    const frames = buffer.split('\n\n');
    buffer = frames.pop() ?? '';

    for (const frame of frames) {
        if (!frame.startsWith('data: ')) continue;
        const data = frame.slice('data: '.length);
        if (data === '[DONE]') return;

        const part = JSON.parse(data);
        switch (part.type) {
            case 'text-delta': appendText(part.id, part.delta); break;
            case 'reasoning-delta': appendReasoning(part.id, part.delta); break;
            case 'tool-input-available': showProgress(part.toolCallId, part.toolName); break;
            case 'tool-output-available': render(part.toolCallId, JSON.parse(part.output.result)); break;
            case 'data-agent': showAgent(part.data.name); break;
            case 'error': showError(part.errorText); break;
        }
    }
}
```

Follow these rules in a custom client:

- Keep a map of `toolCallId` to `toolName` from the `tool-input-available` parts. The `tool-output-*` parts do not contain the tool name.
- Ignore unknown part types. A later version can add new types.
- Do not close the stream on an `error` part. Wait for `finish` and `[DONE]`.
- If the browser disconnects, the server continues the turn and saves it. To get the answer, reload the conversation history.

## Configuration

### Back Office settings

Storefront Assistant reads its settings from the **Storefront Assistant** tab of the `ai_commerce` feature in Configuration Management. All values are read on each request, so changes apply without a deployment.

| SETTING KEY | TYPE | DESCRIPTION |
|-------------|------|-------------|
| `ai_commerce:storefront_assistant:general:is_enabled` | boolean | Enables the chat widget and the endpoints. |
| `ai_commerce:storefront_assistant:general:is_product_discovery_agent_enabled` | boolean | Enables the **Product Discovery** agent. |
| `ai_commerce:storefront_assistant:system_prompts:product_discovery_system_prompt` | text | The system prompt of the **Product Discovery** agent. A blank value uses the default prompt of the module. |
| `ai_commerce:storefront_assistant:ai_vendor:ai_configuration` | radio | The name of the AI configuration in `config_ai.php`. |
| `ai_commerce:storefront_assistant:ai_vendor:openai_model`, `aws_model`, `anthropic_model` | string | The model of each AI vendor. |
| `ai_commerce:storefront_assistant:suggested_prompts:*` | text | The suggested prompts for each page type and under the product cards. |

The Client runs in the Yves process and reads only Storefront settings. Every setting that the Client or Yves reads must have `storefront: true`. The model settings must have `storefront: false`, because Zed resolves them.

### Client configuration

You can override the following methods in the Client `AiCommerceConfig`:

| METHOD | DEFAULT | DESCRIPTION |
|--------|---------|-------------|
| `getStorefrontAssistantAiConfigurationName()` | `''` | The name of the AI configuration for the turn. The project must override it. |
| `getProductDiscoveryAgentToolNames()` | `[]` | The tool names of the **Product Discovery** agent. The project must override it. |
| `getStorefrontAssistantCustomerFacingToolNames()` | `[]` | The tool names whose results go to the browser. The project must override it. |
| `getStorefrontAssistantSseAiConfigurationNames()` | The value of `getStorefrontAssistantAiConfigurationName()` | The AI configurations for which the SSE plugins send events. |
| `isStorefrontAssistantReasoningStreamed()` | `true` | Streams the reasoning of the model to the chat. |
| `getStorefrontAssistantConversationTimeToLive()` | `2592000` (30 days) | The TTL of each conversation that the customer can see, in seconds. |
| `getStorefrontAssistantConversationListLimit()` | `50` | The maximum number of conversations that the history list returns. |
| `getStorefrontAssistantConversationIndexLimit()` | `100` | The maximum number of conversation references in the index of a customer. When a new conversation exceeds the limit, the oldest reference is removed. Do not set it lower than the list limit. |
| `getStorefrontAssistantCategoryTreeLimit()` | `200` | The maximum number of categories that `category_tree` returns. |
| `getStorefrontAssistantInlineCategoryTreeLimit()` | `200` | The maximum number of category lines that the system prompt of the **Product Discovery** agent contains. A larger category tree is not added to the prompt, and the agent uses `category_tree` instead. |
| `getStorefrontAssistantMaxRefinementChips()` | `6` | The maximum number of refinement chips under the product cards. |
| `getStorefrontAssistantPriceOutlierFactor()` | `5.0` | A product price that is this many times higher than the median price of the other products with the same name is marked as unusual. |

The attachment limits come from the Shared `AiCommerceConfig`: `getStorefrontAssistantSupportedAttachmentMimeTypes()`, `getStorefrontAssistantMaxAttachmentSizeBytes()`, and `getStorefrontAssistantMaxAttachmentCount()`.

### AI configuration

Storefront Assistant needs one AI configuration in `config/Shared/config_ai.php` for each AI vendor that you offer in the Back Office. The Client sends the name of the AI configuration to Zed with each turn. Zed accepts only the names that the Zed `AiFoundationConfig::getClientResolvableAiConfigurationNames()` returns.

For OpenAI, use the `AiFoundationConstants::PROVIDER_OPENAI_RESPONSES` provider. The OpenAI Responses API streams the reasoning summary that the chat shows.

Do not add a `system_prompt` entry to these AI configurations. The agent composes its own system prompt from the configured prompt, the search guidance, and the page context. A `system_prompt` entry adds a second system prompt.

## Frontend

The `storefront-assistant` organism and the `storefront-assistant-launcher` molecule are in the theme folder of the module: `vendor/spryker-feature/ai-commerce/src/SprykerFeature/Yves/AiCommerce/Theme/default/components/`. The Yves build finds them automatically.

The organism activates every element with the `js-storefront-assistant-trigger` class as a button that opens the chat. The `storefront-assistant-launcher` molecule is one such trigger. To add a trigger in another place, include the molecule there, or add the `js-storefront-assistant-trigger` class to any element.

The component README describes the frontend extension points, such as a new stream event type, a custom tool result renderer, and additional request data: `vendor/spryker-feature/ai-commerce/src/SprykerFeature/Yves/AiCommerce/Theme/default/components/organisms/storefront-assistant/README.md`.

### Page context

The frontend reads the page context from the DOM and sends it with each prompt. This lets the agent know the current product, category, or search query.

| CONTEXT | SELECTOR |
|---------|----------|
| Catalog or search page | `.js-catalog__form` |
| Product page | `.product-detail`, `[itemtype="https://schema.org/Product"]` |
| Product name and SKU | `meta[itemprop="name"]`, `meta[itemprop="abstractSku"]` |
| Search query | `input[name="q"]` |
| Category name | `h1` |
| Active filters | Checked checkboxes and radio buttons in `.js-catalog__form` |

If your theme changes this markup, the page context and the page-specific suggested prompts do not work. In this case, override `STOREFRONT_ASSISTANT_PAGE_CONTEXT_SELECTORS` in a project-level component. For details, see the component README.

### Theming

The chat uses the `ShopUi` theme of the shop. All colors come from the `$setting-color-*` variables and the `helper-color-light()` and `helper-color-dark()` functions, so the chat uses the brand color of the shop automatically.

To change the chat only, use one of these methods:

- Set a `!default` variable before the component styles load, for example `$storefront-assistant-panel-width`, `$storefront-assistant-accent`, `$storefront-assistant-z-index`, or `$storefront-assistant-launcher-bg`.
- Define a hook mixin. The component includes it if it exists: `ai-commerce-storefront-assistant-base-hook` for the organism, or `ai-commerce-storefront-assistant-launcher-base-hook` for the header button.

{% info_block warningBox "Brand color" %}

Do not use `rgba()` or `color.adjust()` on `$setting-color-main`. This value is a CSS custom property, not a Sass color. Use `helper-color-light()` or `helper-color-dark()` instead.

{% endinfo_block %}

The docked panel changes the page layout with these `body` classes:

| CLASS | EFFECT |
|-------|--------|
| `storefront-assistant-docked` | From the `md` breakpoint, adds `padding-right: var(--storefront-assistant-panel-width)` to the `body`, so the page moves to the left. The panel width is `clamp(400px, 28vw, 480px)`. |
| `storefront-assistant-expanded` | The panel uses the full screen, and the `body` gets `overflow: hidden`. |

The `body` padding does not move elements with `position: fixed` or `position: sticky`, such as a sticky header or a cookie banner. If such elements cover the panel, add `padding-right` or `right: var(--storefront-assistant-panel-width)` to them under `body.storefront-assistant-docked`.

## Extension points

| INTERFACE | STACK | PURPOSE |
|-----------|-------|---------|
| `SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantAgentPluginInterface` | Client `AiCommerceDependencyProvider::getStorefrontAssistantAgentPlugins()` | Adds an agent. The order of the stack sets the priority in **Auto** mode. |
| `SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantProductCollectionExpanderPluginInterface` | Client `AiCommerceDependencyProvider::getStorefrontAssistantProductCollectionExpanderPlugins()` | Adds data to the product cards. A plugin must not throw an exception, because an exception stops the turn. |
| `Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface` | Client `AiFoundationDependencyProvider::getAiToolPlugins()` | Adds a tool. Also add the tool name to the tool list of an agent. |
| `Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface` | Client `AiCommerceDependencyProvider::getSearchConfigExpanderPlugins()` | Adds facets to `catalog_search`. |

## Install

[Install Storefront Assistant](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html)
