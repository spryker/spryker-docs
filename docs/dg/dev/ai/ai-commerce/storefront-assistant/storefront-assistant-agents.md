---
title: Storefront Assistant agents
description: Learn which agents and tools Storefront Assistant ships with, how they are registered, and how the assistant selects an agent for each chat turn.
last_updated: Nov 13, 2026
template: concept-topic-template
label: early-access
related:
  - title: Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html
  - title: Add a custom Storefront Assistant agent
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/add-custom-storefront-assistant-agent.html
  - title: Install Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html
---

An agent is a plugin that has its own system prompt, tool list, and Back Office toggle. Storefront Assistant ships with one agent:

<div class="width-100">

| AGENT | PLUGIN | DESCRIPTION |
|-------|--------|-------------|
| Product Discovery | `ProductDiscoveryAgentPlugin` | Answers shopping questions only from the shop catalog. It searches products, categories, product relations, product sets, and CMS pages. |

</div>

Agents are registered in the Client `AiCommerceDependencyProvider::getStorefrontAssistantAgentPlugins()`. To add an agent, see [Add a custom Storefront Assistant agent](/docs/dg/dev/ai/ai-commerce/storefront-assistant/add-custom-storefront-assistant-agent.html).

## Agent selection

`AgentSelector` selects one agent for each chat turn:

1. It skips each agent whose Back Office toggle is off.
2. If the customer selected an agent in the chat, the enabled agent with this name handles the turn.
3. If the customer selected **Auto**, the first enabled agent in the plugin stack whose `isApplicable()` method returns `true` handles the turn.
4. If no agent is found, the turn ends with the `ai_commerce.storefront_assistant.error.no_agent_available` error.

The `data-agent` stream event tells the browser which agent answered. The chat shows this agent in the agent badge.

## Tools

Each agent can call the tools that are in its tool list. Some tools are research for the agent, and their results stay on the server. Other tools are *customer-facing*: their results go to the browser and render as UI blocks.

<div class="width-100">

| TOOL | PLUGIN | CUSTOMER-FACING | DESCRIPTION |
|------|--------|-----------------|-------------|
| `catalog_search` | `CatalogSearchToolPlugin` | No | Searches the catalog with a query, filters, and a price range. Returns facets for refinement chips. |
| `catalog_suggest` | `CatalogSuggestToolPlugin` | No | Looks up terms, categories, CMS pages, and product sets that the shop publishes. |
| `category_tree` | `CategoryTreeToolPlugin` | No | Returns the category tree of the shop. |
| `product_details` | `ProductDetailsToolPlugin` | No | Returns the details of a product, including offers and options. |
| `product_relations` | `ProductRelationsToolPlugin` | No | Returns related products, such as alternatives and accessories. |
| `product_sets` | `ProductSetsToolPlugin` | No | Returns product sets. |
| `read_shop_page` | `ReadShopPageToolPlugin` | No | Reads the text of a CMS page, such as returns or delivery information. |
| `product_knowledge_search` | `ProductKnowledgeSearchToolPlugin` | No | Searches the documents of products, such as manuals and data sheets, and returns the best matching passages with the document name. For details, see [Storefront Assistant document semantic search](/docs/dg/dev/ai/ai-commerce/storefront-assistant/document-semantic-search/storefront-assistant-document-semantic-search.html). |
| `ssp_asset_search` | `SspAssetSearchToolPlugin` | No | Finds the Self-Service Portal assets of the company user by name, part of the name, serial number, or reference. |
| `ssp_asset_details` | `SspAssetDetailsToolPlugin` | No | Returns the data of a Self-Service Portal asset that the asset details page shows: reference, name, serial number, status, note, owner, assigned business units, asset models, and booked services. |
| `ssp_asset_compatible_products` | `SspAssetCompatibleProductsToolPlugin` | No | Searches the catalog for the spare parts or services that are compatible with a Self-Service Portal asset. Returns the same products as the **Shop Spare Parts** and **Search services** actions of the asset details page. |
| `display_products` | `DisplayProductsToolPlugin` | Yes | Shows product cards. |
| `compare_products` | `CompareProductsToolPlugin` | Yes | Shows a comparison table. |
| `offer_choices` | `OfferChoicesToolPlugin` | Yes | Shows a clarifying question with answer chips. |
| `display_setup` | `DisplaySetupToolPlugin` | Yes | Shows two to four products that work together, with their total against a budget. |

</div>

The tool plugins are registered in the Client `AiFoundationDependencyProvider::getAiToolPlugins()`. Three lists in the project must stay aligned:

- The tool plugins in `AiFoundationDependencyProvider::getAiToolPlugins()`.
- The tool names of the agent in `AiCommerceConfig::getProductDiscoveryAgentToolNames()`.
- The customer-facing tool names in `AiCommerceConfig::getStorefrontAssistantCustomerFacingToolNames()`.

A customer-facing tool must also be an agent tool.

### Self-Service Portal asset tools

The asset tools come from the `spryker-feature/self-service-portal` package, namespace `SprykerFeature\Client\SelfServicePortal\Plugin\AiFoundation`. They implement `Spryker\Client\AiFoundationExtension\Dependency\Tools\ToolPluginInterface`, so the package requires `spryker/ai-foundation-extension`. With these tools, the assistant answers questions about the assets of a company user, such as "Show me spare parts for my printer", and finds compatible spare parts and services.

On an asset page, the assistant gets the asset reference from the page context of the `asset` page type. On other pages, the assistant finds the asset with `ssp_asset_search` when the customer names it. For a document question about an asset, the assistant gets the compatible products with `ssp_asset_compatible_products` and then searches their documents with `product_knowledge_search`.

All asset tools check the asset permissions on the server, with the same rules and statuses as the **My Assets** page. The browser never decides which assets the customer can see. The tools accept the following arguments:

<div class="width-100">

| TOOL | ARGUMENT | REQUIRED | DESCRIPTION |
|------|----------|----------|-------------|
| `ssp_asset_search` | `query` | Yes | The asset name or a part of it, the serial number, or the reference. When the whole query matches no asset, the tool searches each word of the query. |
| `ssp_asset_search` | `limit` | No | The maximum number of assets, up to `10`. The default is `5`. |
| `ssp_asset_details` | `assetReference` | Yes | The asset reference, for example `AST--3`. |
| `ssp_asset_compatible_products` | `assetReference` | Yes | The asset reference, for example `AST--3`. |
| `ssp_asset_compatible_products` | `productKind` | Yes | `spare_parts` or `services`. |
| `ssp_asset_compatible_products` | `query` | No | The part or the service in two to four words, for example `ink cartridge`. When you omit it, the tool lists all compatible products of the kind. |
| `ssp_asset_compatible_products` | `page` | No | The page number, starting with `1`. |
| `ssp_asset_compatible_products` | `limit` | No | The number of products, up to `12`. The default is `5`. |

</div>

To install the tools, see [Install the Self-Service Portal asset support](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html#install-the-self-service-portal-asset-support).
