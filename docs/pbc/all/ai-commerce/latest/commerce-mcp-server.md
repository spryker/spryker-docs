---
title: Commerce MCP Server
description: Expose your Spryker storefront to AI assistants through the Model Context Protocol, so AI agents can search products, manage carts, and complete checkout on behalf of customers.
last_updated: Jun 22, 2026
template: concept-topic-template
label: early-access
keywords: ai, mcp, model context protocol, agentic commerce, conversational commerce, storefront, checkout
---

The Commerce MCP Server connects AI assistants to your Spryker storefront through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro), an open standard for connecting AI applications to external systems. It turns core commerce operations — product discovery, cart management, and checkout — into a set of standardized tools that any MCP-compatible AI agent, such as Claude, ChatGPT, or Perplexity, can call directly.

The result is *agentic commerce*: a shopper describes what they want in natural language, and the AI assistant searches the catalog, builds a cart, and completes the order using your existing Spryker Storefront API — without a person navigating the storefront manually.

{% info_block warningBox "Preview capability" %}

The Commerce MCP Server is an early-access preview that demonstrates how Spryker commerce can be exposed to AI agents. It is intended for demonstration, evaluation, and prototyping. For a production rollout, engage Spryker professional services.

{% endinfo_block %}

## Problems it solves

Shoppers and buyers increasingly start tasks inside AI assistants rather than on a website. Traditional storefronts are built for human clicks and are not reachable by an AI agent, which creates several challenges:

| CHALLENGE | HOW THE COMMERCE MCP SERVER HELPS |
|-----------|-----------------------------------|
| AI assistants cannot transact against a standard storefront. | Exposes commerce operations as MCP tools that any MCP-compatible assistant can discover and call. |
| Connecting each new AI assistant requires custom, one-off API integration. | Uses a single open protocol (MCP), so one integration works across every MCP-compatible client instead of a separate adapter per assistant. |
| Catalog search, cart, and checkout each expose different APIs that an agent must learn. | Provides a consistent, documented set of tools with input validation, so the assistant calls clear actions instead of orchestrating raw API calls. |
| Building an agentic shopping experience usually means replatforming. | Runs on top of your existing Spryker Storefront API — no changes to the underlying commerce platform. |

## What the Commerce MCP Server covers

The server exposes the core path from discovery to order. The following commerce capabilities are available to connected AI assistants:

| AREA | CAPABILITIES |
|------|--------------|
| Product discovery | Natural-language catalog search with filtering by facets (for example, brand or price range), sorting, and pagination. Retrieval of detailed product information by SKU. |
| Shopping cart | Add items to a cart, view cart contents and totals, update item quantities, and remove items. Supported for both guest and authenticated shoppers. |
| Checkout | Retrieve available payment methods, shipment methods, and addresses, then place an order with customer, billing, shipping, payment, and shipment details. Supported for both guest and authenticated shoppers. |
| Orders | Retrieve order details and order history for authenticated customers. |
| Customer access | Authenticate a customer to obtain an access token, or start an anonymous guest session for shopping without an account. |

In addition to these actions, the server ships with built-in guidance for common scenarios — product search, cart management, customer service, order fulfillment, and product recommendations — that help the AI assistant choose and combine the right operations for a shopper's request.

## Current scope

As a preview, the server focuses on the most common storefront journey. Be aware of the following boundaries when evaluating it:

- **Simple products.** The flow targets standard catalog products added by their SKU. Configurable products, bundles, gift cards, and complex product-option selection are not specifically handled.
- **Demonstration payment.** Checkout defaults to a demonstration payment method (invoice). Integration with a live payment service provider is outside the preview scope.
- **Order history for authenticated customers.** Retrieving past orders requires an authenticated customer session.
- **Core journey only.** Capabilities such as promotions and vouchers, wishlists, returns, and marketplace or merchant operations are not part of the current preview.

## Who benefits

| ROLE | BENEFIT |
|------|---------|
| Shoppers and B2B buyers | Search, build a cart, and complete an order through a conversational AI assistant, without navigating the storefront manually. |
| Merchants and business teams | Reach customers on emerging AI-driven channels and offer guided, conversational buying experiences on top of the existing catalog and checkout. |
| Developers and integrators | Connect AI assistants through one open protocol instead of building a custom integration per assistant, reusing the existing Spryker Storefront API. |

## Developer resources

| RESOURCE | DESCRIPTION |
|----------|-------------|
| [Commerce MCP Server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/commerce-mcp-server.html) | Technical overview: architecture, transports, available tools and prompts, and configuration. |
