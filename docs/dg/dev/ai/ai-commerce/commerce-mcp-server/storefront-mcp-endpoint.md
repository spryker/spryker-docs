---
title: Storefront MCP endpoint
description: Technical overview of the MCP endpoint of the Storefront API — protocol versions, discovery documents, sessions, runtime configuration, installation, and how to add and protect MCP tools.
last_updated: Nov 3, 2026
template: concept-topic-template
keywords: ai, mcp, model context protocol, storefront api, glue storefront, api platform, tools, server card, api catalog
related:
  - title: Commerce MCP Server
    link: docs/dg/dev/ai/ai-commerce/commerce-mcp-server/commerce-mcp-server.html
---

The Storefront API (Glue Storefront based on API Platform) serves a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) endpoint at `/mcp`. AI agents and MCP clients connect to this endpoint and call tools. MCP tools are operations of API Platform resources, so feature modules declare them in `resource.yml` files with the `api-platform/mcp` package. The first tool is `health-check` from the `HealthCheck` module.

{% info_block infoBox "Related MCP server" %}

This endpoint runs inside the Storefront API application. The [Commerce MCP Server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/commerce-mcp-server.html) is a separate standalone server that calls the Storefront API.

{% endinfo_block %}

## Endpoints

The Storefront API application serves the following paths:

<div class="width-100">

| PATH | METHODS | CONTENT |
|---|---|---|
| `/mcp` | `POST`, `DELETE`, `GET`, `OPTIONS` | MCP Streamable HTTP endpoint, based on `symfony/mcp-bundle` and `mcp/sdk`. `GET` returns `405` because the server sends no stream. |
| `/.well-known/mcp/server-card.json` | `GET`, `HEAD` | MCP server card (SEP-2127) with the content type `application/mcp-server-card+json`. The path is outside `/mcp`, so a client reads it before it has a token. |
| `/.well-known/api-catalog` | `GET`, `HEAD` | RFC 9727 API catalog with the content type `application/linkset+json`. |

</div>

The discovery documents are public. They have the `Cache-Control: public, max-age=3600` and `Access-Control-Allow-Origin: *` headers, and an `ETag`. A request with the `If-None-Match` header gets a `304` response.

## Protocol versions

The endpoint supports two MCP protocol versions on one path:

- `2026-07-28`: stateless. Each request carries `_meta` and the `MCP-Protocol-Version` header. The server keeps no session.
- `2025-11-25`: handshake. The `initialize` request opens a session with the `Mcp-Session-Id` header. The server keeps the session in Redis. `symfony/mcp-bundle` 0.14 has no session lock.

`RedisMcpSessionStore` keeps the handshake sessions with the key prefix `mcp-storefront-` and a TTL of 3600 seconds. When a request has an authenticated token, the session key contains the SHA-256 hash of the user identifier. A request from another user, or a request without a token, does not find the session and gets `404`. When Redis fails, the store throws an exception. The client gets a JSON-RPC error instead of a `404` that makes the client initialize again.

The `MCP_SESSION_REDIS_*` constants of `GlueStorefrontApiApplicationConstants` select the Redis instance. If `SPRYKER_SESSION_FE_HOST` is set, `config_default.php` uses the Yves session Redis. Otherwise, it uses the storage Redis database.

## Runtime configuration

The `config/GlueStorefront/packages/mcp.php` file puts no environment value into the compiled container. The services call the following `GlueStorefrontApiApplicationConfig` methods at runtime. As a result, a container compiled during the image build works in every environment and for every host of a multi-host application.

<div class="width-100">

| METHOD | CONSTANT | USE |
|---|---|---|
| `getStorefrontApiBaseUrl()` | `GLUE_STOREFRONT_API_BASE_URL`. Falls back to `https://` followed by `GLUE_STOREFRONT_API_HOST`. | URLs in the server card and the API catalog. |
| `getMcpAllowedHosts()` | `GLUE_STOREFRONT_API_HOST` and the host of the base URL. | DNS rebinding protection of `/mcp`. |
| `getMcpSessionRedisDsn()` | `MCP_SESSION_REDIS_SCHEME`, `MCP_SESSION_REDIS_HOST`, `MCP_SESSION_REDIS_PORT`, `MCP_SESSION_REDIS_DATABASE`, `MCP_SESSION_REDIS_USER`, `MCP_SESSION_REDIS_PASSWORD`. | Redis DSN of the session store. Supported schemes: `tcp` and `tls`. |

</div>

Set `GLUE_STOREFRONT_API_BASE_URL` to the public URL of the Storefront API host. Include the port if it is not 80 or 443. For example, `https://glue-storefront.example.com`.

## Tools

<div class="width-100">

| TOOL | MODULE | DECLARED IN | RESULT |
|---|---|---|---|
| `health-check` | `HealthCheck` | The `mcp:` section of `resources/api/storefront/health-check.resource.yml`, `HealthCheckMcpInput`, and `HealthCheckMcpProcessor`. | The same body as `GET /health-check`. `isError` is `true` for `400` (unknown service) and `403` (health check disabled). A `503` report is a valid result. |

</div>

The `health-check` tool needs no authentication. A tool with `security` is visible in `tools/list` and callable only for a caller that the security expression grants access to.

## Install the MCP endpoint

To enable the MCP endpoint in a project, do the following:

1. Require the packages:

   ```bash
   composer require api-platform/mcp:^4.4.6 mcp/sdk:^0.8.1 symfony/mcp-bundle:^0.14.1 symfony/object-mapper:^7.4
   ```

   The project needs `ext-redis` and `spryker-sdk/ai-dev` 0.9.0 or later. `spryker-sdk/ai-dev` 0.8.0 requires `mcp/sdk` ^0.9.

2. In `config/GlueStorefront/packages/api_platform.php`, enable MCP with `$apiPlatform->mcp()->enabled(true)`. In `config/GlueBackend/packages/api_platform.php`, disable MCP with `$apiPlatform->mcp()->enabled(false)`.
3. Register `Symfony\AI\McpBundle\McpBundle` in `config/GlueStorefront/bundles.php`.
4. Add `config/GlueStorefront/packages/mcp.php`. It defines the server, the transport, the session store, the tools registry, and the discovery services.
5. Add `config/GlueStorefront/routes/mcp.php`. It imports the MCP route and adds the two discovery routes, the server card and the API catalog.
6. In `config/Shared/config_default.php`, set `GlueStorefrontApiApplicationConstants::GLUE_STOREFRONT_API_BASE_URL` and the `GlueStorefrontApiApplicationConstants::MCP_SESSION_REDIS_*` constants.
7. Add `if-none-match` to the CORS allowed headers. Override `getCorsAllowedHeaders()` in the project-level `GlueApplicationConfig` and `GlueStorefrontApiApplicationConfig`. Without this header, browser clients cannot send conditional requests for the discovery documents.
8. Generate the resources and clear the cache:

   ```bash
   vendor/bin/glue api:generate storefront
   GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue cache:clear
   ```

## Add a tool

A tool belongs to the feature module that owns the functionality. Do not add tool classes to a project namespace like `Pyz` or to the `GlueStorefrontApiApplication` module.

To add a tool, do the following:

1. In the resource schema of the feature module (`resources/api/storefront/*.resource.yml`), add an entry to the `mcp:` section:

   ```yaml
   resource:
       mcp:
           health-check:
               title: 'Health check'
               description: 'What the tool does and what it returns.'
               input: Spryker\Glue\HealthCheck\Api\Mcp\HealthCheckMcpInput
               provider: ApiPlatform\Mcp\State\ToolProvider
               processor: Spryker\Glue\HealthCheck\Api\Mcp\HealthCheckMcpProcessor
               structuredContent: false
               annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false }
   ```

2. In the `Glue` layer of the module, create the input class. Its public properties are the tool arguments. Describe them with `#[ApiProperty(description: '...')]`.
3. Create the processor that implements `ApiPlatform\State\ProcessorInterface`. To control `isError` and `structuredContent`, return `Mcp\Schema\Result\CallToolResult`.
4. Set `provider: ApiPlatform\Mcp\State\ToolProvider`. Otherwise, the tool inherits the provider of the resource.
5. In the `composer.json` of the module, add `mcp/sdk` to the `require` section and `api-platform/mcp` to the `suggest` section.
6. Run `vendor/bin/glue api:generate storefront`.

The `mcp:` section supports the following keys:

<div class="width-100">

| KEY | TYPE | DESCRIPTION |
|---|---|---|
| `title`, `description` | string | Human-readable name and description of the tool. |
| `security`, `securityMessage` | string | Access expression and its denial message. See [Protect a tool](#protect-a-tool). |
| `input`, `provider`, `processor` | class name | Input class, state provider, and state processor of the tool. |
| `structuredContent` | boolean | Defines if the tool result contains structured content. |
| `annotations` | map | `title` (string) and the `readOnlyHint`, `destructiveHint`, `idempotentHint`, and `openWorldHint` booleans. |

</div>

`McpValidationRule` checks the `mcp:` section during generation and rejects other keys. A tool name must be unique over all resources. The generator stops on a duplicate name. `SchemaServiceRegistrationPass` registers the `provider` and the `processor` of each tool as autowired services.

API Platform MCP needs `api-platform/metadata` 4.3.5 or later and the `jsonld` format in `api_platform.formats` of the application that loads the resource.

## Protect a tool

To restrict a tool, set `security` and, optionally, `securityMessage` on the tool. Use the same expression language as for a REST operation. For example, `security: "is_granted('ROLE_CUSTOMER')"`. The `security` of the resource and of its REST operations does not protect the tool.

For a tool with a `security` expression, the endpoint behaves as follows:

- `tools/list` does not show a tool that the expression denies. For this reason, the `tools/list` cache scope is `private`.
- `tools/call` of a denied tool does not reach the processor. `McpAccessDeniedSubscriber` passes the denial to the firewall. A caller without a token gets the answer of the firewall entry point. An authenticated caller gets `403`.
- A processor that throws `AccessDeniedException` (API Platform or Symfony Security) gets the same answer.

To answer `401` with `WWW-Authenticate: Bearer resource_metadata=...`, or `403` with `error="insufficient_scope"`, set the `entry_point` and the `access_denied_handler` of the firewall that covers `/mcp`.

## Change the server identity

To change the name, version, title, or description of the MCP server, edit the `$server*` variables at the top of `config/GlueStorefront/packages/mcp.php`. The MCP server and the server card read the same variables.

## Verify the endpoint

1. Send a `tools/list` request to the MCP endpoint:

   ```bash
   curl -s https://glue-storefront.example.com/mcp \
     -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
     -H 'MCP-Protocol-Version: 2026-07-28' -H 'Mcp-Method: tools/list' \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientInfo":{"name":"curl","version":"1"},"io.modelcontextprotocol/clientCapabilities":{}}}}'
   ```

   Make sure the response lists the `health-check` tool.

2. Request the API catalog:

   ```bash
   curl -s https://glue-storefront.example.com/.well-known/api-catalog
   ```

   Make sure the response contains the URLs of the MCP endpoint and of the server card.

## Limitations

- The endpoint itself needs no token. Only tools with `security` need one.
- The Redis connection uses one host. Redis Sentinel, cluster DSNs, and a custom TLS CA file are not supported for the MCP sessions.
- The endpoint has no rate limit. Each anonymous `initialize` request of the `2025-11-25` protocol version writes one session key for one hour. When the sessions use the storage Redis, a flood of `initialize` requests can fill it. Put a rate limit in front of `/mcp`, for example in a gateway or a WAF, or configure a separate session Redis for Glue Storefront.
- When Redis fails, a handshake request gets the JSON-RPC error `-32603` with HTTP status `200`. The stateless `2026-07-28` protocol version does not use Redis.
- `api-platform/mcp` requires `mcp/sdk` ^0.8, so the endpoint runs `mcp/sdk` 0.8.1 and `symfony/mcp-bundle` 0.14.1. Compared with `mcp/sdk` 0.9, this combination has no session lock, no `503` response for an unavailable session store, and no argument validation. For example, `{"services":42}` is mapped to `"42"` and gives a `400` tool result instead of the JSON-RPC error `-32602`.
- The `health-check` tool has no `outputSchema` because it sets `structuredContent: false`. The API Platform MCP schema uses the JSON-LD envelope, where `@type` is required, and the tool result does not have it. The result still carries `structuredContent`.
