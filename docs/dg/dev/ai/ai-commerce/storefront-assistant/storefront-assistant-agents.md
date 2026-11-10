---
title: Storefront Assistant agents
description: Learn which agents and tools Storefront Assistant ships with, how they are registered, and how the assistant selects an agent for each chat turn.
last_updated: Nov 10, 2026
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
| `search_documents` | `SearchDocumentsToolPlugin` | No | Searches the documents of the products that the assistant names, such as manuals, and returns the best matching passages. For details, see [Storefront Assistant document knowledge](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant-document-knowledge.html). |
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

`SspAssetDetailsToolPlugin` and `SspAssetCompatibleProductsToolPlugin` come from the `spryker-feature/self-service-portal` package, namespace `SprykerFeature\Client\SelfServicePortal\Plugin\AiFoundation`. They need the `spryker/ai-foundation` module. On the asset details page, the assistant uses them to answer questions about the asset and to find compatible spare parts and services. The assistant reads the asset reference from the page context of the `asset` page type.

Both tools check that the current company user can see the asset, and return no data otherwise. `ssp_asset_compatible_products` accepts the following arguments:

<div class="width-100">

| ARGUMENT | REQUIRED | DESCRIPTION |
|----------|----------|-------------|
| `asset_reference` | Yes | The asset reference, for example `AST--3`. |
| `product_kind` | Yes | `spare_parts` or `services`. |
| `query` | No | The part or the service in two to four words, for example `ink cartridge`. When you omit it, the tool lists all compatible products of the kind. |
| `page` | No | The page number, starting with `1`. |
| `limit` | No | The number of products, from `1` to `12`. The default is `5`. |

</div>

To enable the tools, register them in the Client `AiFoundationDependencyProvider::getAiToolPlugins()`, and add `SspAssetDetailsToolPlugin::TOOL_NAME` and `SspAssetCompatibleProductsToolPlugin::TOOL_NAME` to `AiCommerceConfig::getProductDiscoveryAgentToolNames()`.
