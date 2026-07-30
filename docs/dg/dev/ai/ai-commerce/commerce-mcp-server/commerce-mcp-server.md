---
title: Commerce MCP Server
description: Technical overview of the Commerce MCP Server — architecture, transports, available tools and prompts, and configuration for connecting AI assistants to the Spryker storefront.
last_updated: Jun 22, 2026
template: concept-topic-template
label: early-access
keywords: ai, mcp, model context protocol, agentic commerce, storefront, glue api, tools, prompts
---

The Commerce MCP Server is a standalone [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) server that exposes Spryker storefront operations as MCP tools and prompts. It enables AI assistants to search the catalog, manage carts, and complete checkout by calling the Spryker Storefront API on the shopper's behalf.

For the business overview, use cases, and capability scope, see [Commerce MCP Server](/docs/pbc/all/ai-commerce/latest/commerce-mcp-server.html).

{% info_block warningBox "Preview capability" %}

This is an early-access preview intended for demonstration, evaluation, and prototyping. It uses simplified security and error handling and is not hardened for production. For production implementations, engage Spryker professional services.

{% endinfo_block %}

{% info_block infoBox "Related MCP server" %}

The Commerce MCP Server connects AI assistants to the *storefront* (the Storefront API). It is distinct from the [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html), which exposes *developer* tooling such as transfer structures and OMS transitions to AI assistants working on a Spryker project.

{% endinfo_block %}

## Architecture

The server sits between an MCP client and the Spryker Storefront API. A request flows through the following layers:

```text
AI assistant (MCP client) -> transport (stdio | HTTP | SSE) -> tool and prompt registries -> Spryker API service -> Spryker Storefront API
```

- **Transports.** The server supports three transports, selectable at startup: `stdio` for desktop and CLI MCP clients, `HTTP` for request and response integrations, and `SSE` (Server-Sent Events) for real-time web applications.
- **Tools and prompts.** Each commerce operation is implemented as a tool with a validated input schema. Prompts provide context-aware guidance that helps the assistant choose and combine tools.
- **Spryker API service.** A central HTTP client handles communication with the Storefront API, including request timeouts, retries with exponential backoff, and structured error responses. Client errors (4xx) are not retried.
- **Authentication.** Tools accept a token. An authenticated customer token is sent as a bearer token, while a guest session token is sent as an anonymous customer identifier. This lets the same cart and checkout tools serve both authenticated and guest shoppers.

## Available tools

The server provides the following tools for storefront operations.

### Product discovery

| TOOL | DESCRIPTION |
|------|-------------|
| `product-search` | Searches the product catalog. Supports a query string, value facets (for example, brand), range facets (for example, price), sorting, and pagination. |
| `get-product` | Retrieves detailed information for a product by its abstract SKU. |

### Customer access

| TOOL | DESCRIPTION |
|------|-------------|
| `authenticate` | Authenticates a customer with a username and password to obtain an access token. If no credentials are provided, it creates an anonymous guest session token. |

### Shopping cart

| TOOL | DESCRIPTION |
|------|-------------|
| `add-to-cart` | Adds a product to an authenticated customer's cart by concrete SKU. Creates a cart if none exists. |
| `guest-add-to-cart` | Adds a product to a guest shopper's cart by concrete SKU. |
| `get-cart` | Retrieves cart contents and totals for an authenticated or guest shopper. |
| `update-cart-item` | Updates the quantity of an item in a cart. |
| `remove-from-cart` | Removes an item from a cart. |

### Checkout and orders

| TOOL | DESCRIPTION |
|------|-------------|
| `get-checkout-data` | Retrieves available payment methods, shipment methods, and addresses for a cart. |
| `checkout` | Places an order from a cart using customer data, billing and shipping addresses, a payment method, and a shipment method. |
| `get-order` | Retrieves order details and history for an authenticated customer. Returns a specific order when an order reference is provided, or all orders otherwise. |

## Available prompts

The server includes prompts that guide AI assistants through common scenarios. Each prompt explains which tools to use and how to combine them.

| PROMPT | DESCRIPTION |
|--------|-------------|
| `product-search` | Guides product discovery and search, including category, price range, and brand filtering. |
| `cart-management` | Assists with adding, removing, viewing, and updating cart items, and with checkout guidance. |
| `customer-service` | Supports authentication, order status, and account inquiries. |
| `order-fulfillment` | Guides the full flow from cart to completed order. |
| `product-recommendations` | Generates recommendations based on stated preferences and context. |

## Configuration

The server is configured through environment variables, which are validated at startup. The key settings are:

| VARIABLE | DESCRIPTION |
|----------|-------------|
| `SPRYKER_API_BASE_URL` | Base URL of the Spryker Storefront API the server connects to. |
| `SPRYKER_API_TIMEOUT` | Request timeout in milliseconds. |
| `SPRYKER_API_RETRY_ATTEMPTS` | Number of retry attempts for failed requests. |
| `SPRYKER_API_RETRY_DELAY` | Base delay between retries in milliseconds, used for exponential backoff. |
| `MCP_TRANSPORT` | Transport type: `stdio`, `http`, or `sse`. |
| `MCP_HTTP_PORT`, `MCP_HTTP_HOST`, `MCP_HTTP_ENDPOINT` | Network settings for the HTTP and SSE transports. |
| `LOG_LEVEL` | Logging verbosity. The level can also be changed at runtime through the MCP `logging/setLevel` request. |

## Connect an AI client

Most desktop and CLI AI assistants connect over the `stdio` transport. You register the server as an MCP server in the client's configuration, providing the command to start it and the `SPRYKER_API_BASE_URL` of your Storefront API.

For example, in a Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "spryker-commerce": {
      "command": "npx",
      "args": ["spryker-mcp-server"],
      "env": {
        "SPRYKER_API_BASE_URL": "https://your-storefront-api.com"
      }
    }
  }
}
```

After saving the configuration, restart the AI client. The assistant then discovers the available tools and prompts automatically and can start handling commerce requests. Web applications can instead connect over the `HTTP` or `SSE` transport by pointing the client at the configured host, port, and endpoint.

## Compatibility

The server is compatible with the Spryker Commerce OS Storefront API. It uses bearer-token authentication for registered customers and an anonymous customer identifier for guest sessions, and it expects responses in the JSON:API format.
