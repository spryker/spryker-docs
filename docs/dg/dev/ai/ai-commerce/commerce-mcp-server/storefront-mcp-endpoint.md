---
title: Storefront MCP server
description: Technical overview of the MCP server of the Storefront API — official MCP packages, protocol version, discovery documents, and runtime configuration.
last_updated: Nov 5, 2026
template: concept-topic-template
label: early-access
keywords: ai, mcp, model context protocol, storefront api, glue storefront, api platform, tools, server card, api catalog
related:
  - title: Install the Storefront MCP server
    link: docs/dg/dev/ai/ai-commerce/commerce-mcp-server/install-storefront-mcp-endpoint.html
  - title: Add tools to the Storefront MCP server
    link: docs/dg/dev/ai/ai-commerce/commerce-mcp-server/add-tools-to-storefront-mcp-endpoint.html
  - title: Commerce MCP Server
    link: docs/dg/dev/ai/ai-commerce/commerce-mcp-server/commerce-mcp-server.html
---

The Storefront API (Glue Storefront based on API Platform) serves a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server at `/mcp`. AI agents and MCP clients connect to this server and call tools. A tool is an existing `Get` or `GetCollection` operation of an API Platform resource. Feature modules turn an operation into a tool with the `mcp:` key in the `resource.yml` file.

The server is built on official MCP packages, not on custom protocol code:

- [`mcp/sdk`](https://php.sdk.modelcontextprotocol.io/): the official PHP SDK of the Model Context Protocol.
- [`symfony/mcp-bundle`](https://github.com/symfony/mcp-bundle): the Symfony integration of `mcp/sdk`.
- [`api-platform/mcp`](https://api-platform.com/docs/core/mcp/): the API Platform MCP integration, which turns resource operations into MCP tools.

{% info_block warningBox "Early access" %}

This is an early-access preview for evaluation and prototyping. The interface, the configuration, and the package versions can change before the general release.

{% endinfo_block %}

{% info_block infoBox "Related MCP server" %}

The Storefront MCP server runs inside the Storefront API application. The [Commerce MCP Server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/commerce-mcp-server.html) is an outdated, separate standalone server that calls the Storefront API. Use the Storefront MCP server instead.

{% endinfo_block %}

To get started, see the following pages:

- [Install the Storefront MCP server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/install-storefront-mcp-endpoint.html)
- [Add tools to the Storefront MCP server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/add-tools-to-storefront-mcp-endpoint.html)

## Endpoints

The Storefront API application serves the following paths:

<div class="width-100">

| PATH | METHODS | CONTENT |
|---|---|---|
| `/mcp` | `POST`, `OPTIONS` | MCP Streamable HTTP endpoint, based on `symfony/mcp-bundle` and `mcp/sdk`. Protocol version `2026-07-28` only. `GET` and `DELETE` belong to the older handshake protocol and get `400`. |
| `/.well-known/mcp/server-card.json` | `GET`, `HEAD` | MCP server card (SEP-2127) of the first MCP server, with the content type `application/mcp-server-card+json`. The path is outside `/mcp`, so a client reads it before it has a token. |
| `/.well-known/mcp/{serverKey}/server-card.json` | `GET`, `HEAD` | Server card of the MCP server with this configuration key. `404` for an unknown key. |
| `/.well-known/api-catalog` | `GET`, `HEAD` | RFC 9727 API catalog with the content type `application/linkset+json`. It has one link context for each MCP server. |

</div>

The discovery documents are public. A request without a token gets them. A request with an invalid bearer token gets `401`, as on every Storefront API resource. The documents have the `Cache-Control: public, max-age=3600` and `Access-Control-Allow-Origin: *` headers, and an `ETag`. A request with the `If-None-Match` header gets a `304` response. Without an MCP configuration, both documents return `404`.

`McpServerCardBuilder` builds one card for each server in the `servers` configuration of `symfony/mcp-bundle`. A server without the HTTP transport has no card.

## Protocol version

The server supports only the stateless MCP protocol version `2026-07-28`. Each request carries `_meta` and the `MCP-Protocol-Version` header. The server keeps no session.

`symfony/mcp-bundle` 0.14 also serves the older handshake protocol (`2025-11-25` and earlier) when only `2026-07-28` is configured. To prevent this, `McpHandshakeEraRefusalSubscriber` refuses handshake requests on the MCP paths. These requests are `initialize`, requests with `Mcp-Session-Id`, `GET`, and `DELETE`. The server responds with HTTP `400` and the JSON-RPC error `-32022` "Unsupported protocol version". The `data.supported` field of the error contains `["2026-07-28"]`.

An `OPTIONS` preflight request passes. A `POST` body that is not a JSON object or array gets HTTP `400` and the JSON-RPC parse error `-32700`. A client that supports only the handshake protocol cannot connect.

## Runtime configuration

The `config/GlueStorefront/packages/mcp.php` file puts no environment value into the compiled container. The services call the following `GlueStorefrontApiApplicationConfig` methods at runtime. As a result, a container compiled during the image build works in every environment and for every host of a multi-host application.

<div class="width-100">

| METHOD | CONSTANT | USE |
|---|---|---|
| `getStorefrontApiBaseUrl()` | `GLUE_STOREFRONT_API_BASE_URL`. Falls back to `https://` followed by `GLUE_STOREFRONT_API_HOST`. | URLs in the server card and the API catalog. |
| `getMcpAllowedHosts()` | `GLUE_STOREFRONT_API_HOST` and the host of the base URL. | DNS rebinding protection of `/mcp`. |

</div>

Set `GLUE_STOREFRONT_API_BASE_URL` to the public URL of the Storefront API host. Include the port if it is not 80 or 443. For example, `https://glue-storefront.example.com`.

## Change the server identity

To change the name, version, title, or description of the MCP server, edit the `$mcpServers` configuration in `config/GlueStorefront/packages/mcp.php`. `symfony/mcp-bundle` and `McpServerCardBuilder` read the same array. A second server gets its server card and its API catalog entry without a change to the discovery code.

## Limitations

- The server itself needs no token. Only tools with `security` need one.
- The server supports only the `2026-07-28` protocol version. A client that supports only `2025-11-25` or earlier gets `400`.
- The server has no rate limit. Put a rate limit in front of `/mcp`, for example in a gateway or a WAF.
- `api-platform/mcp` requires `mcp/sdk` ^0.8, so the server runs `mcp/sdk` 0.8.1 and `symfony/mcp-bundle` 0.14.1. Compared with `mcp/sdk` 0.9, this combination has no argument validation. For example, `{"services":42}` is mapped to `"42"` and gives a `400` tool result instead of the JSON-RPC error `-32602`.
- Only `Get` and `GetCollection` operations can be tools. Write operations need request body deserialization and validation in the tool call, which this version does not provide.
- A tool has no `outputSchema` by default. The API Platform MCP schema does not describe the plain `json` result. The result still carries `structuredContent`.
