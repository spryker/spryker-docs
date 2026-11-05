---
title: Add tools to the Storefront MCP server
description: Learn how to turn an operation of a Storefront API resource into an MCP tool, and how to protect the tool.
last_updated: Nov 5, 2026
template: howto-guide-template
label: early-access
keywords: ai, mcp, model context protocol, storefront api, glue storefront, api platform, tools, security
related:
  - title: Storefront MCP server
    link: docs/dg/dev/ai/ai-commerce/commerce-mcp-server/storefront-mcp-endpoint.html
  - title: Install the Storefront MCP server
    link: docs/dg/dev/ai/ai-commerce/commerce-mcp-server/install-storefront-mcp-endpoint.html
---

This document describes how to add a tool to the [Storefront MCP server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/storefront-mcp-endpoint.html). A tool is an existing `Get` or `GetCollection` operation of an API Platform resource. The generator builds the tool and its input class from the operation, so a tool needs no extra PHP code.

Before you start, [install the Storefront MCP server](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/install-storefront-mcp-endpoint.html).

{% info_block warningBox "Early access" %}

This is an early-access preview for evaluation and prototyping. The interface, the configuration, and the package versions can change before the general release.

{% endinfo_block %}

## Add a tool

A tool belongs to the feature module that owns the operation. Do not add tools to the `GlueStorefrontApiApplication` module.

To add a tool, do the following:

1. In the resource schema of the feature module (`resources/api/storefront/*.resource.yml`), add `mcp:` to a `Get` or `GetCollection` operation:

   ```yaml
   operations:
       - type: GetCollection
         uriTemplate: '/example-items'
         mcp:
             name: example-items
             title: 'Example items'
             description: 'What the tool does and what it returns.'
             annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false }
   ```

   `mcp: true` is the short form. `mcp: false` removes the tool, for example in a project schema.

2. Generate the resources. `McpValidationRule` checks the `mcp` key during generation:

   ```bash
   vendor/bin/glue api:generate storefront
   ```

3. Send a `tools/list` request to the server. For the request, see [Verify the installation](/docs/dg/dev/ai/ai-commerce/commerce-mcp-server/install-storefront-mcp-endpoint.html#verify-the-installation). Make sure the response lists the new tool.

## What the generator builds

For each operation with `mcp:`, the generator builds the following:

- An `McpTool` in the `mcp` list of the generated resource. It uses `ToolProvider` as the provider and `McpOperationToolProcessor` as the processor. The source operation is kept in `extraProperties`.
- The input class `Generated\Api\Storefront\{Resource}\{ToolName}McpToolInput`. It has one required property for each URI variable of `uriTemplate`. For a `Get` operation without `uriTemplate`, the properties come from the properties marked `identifier: true`. It also has one property for each `openapiContext.parameters` entry with `in: query`.

The type of a query property comes from `schema.type`: `string`, `integer`, `number`, `boolean`, or `array`. Other types become `string`. A query parameter name that is not a valid PHP property name becomes a camel case argument name. For example, `page[limit]` becomes `pageLimit`, and `filter[company-roles][]` becomes `filterCompanyRoles`. `McpOperationToolProcessor` sends each argument back under its original query parameter name.

## Tool results

`McpOperationToolProcessor` runs the provider of the source operation on a copy of the current request. The arguments of the tool call are the query parameters and the URI variables. The copy keeps the request attributes of the firewall: customer, store, and locale. The REST response attributes of the operation do not reach the MCP response.

The result depends on the operation type:

- `Get`: the normalized item in `json` format. If there is no item, the result has `isError: true` and `statusCode: 404`.
- `GetCollection`: `{"items": [...]}`.

When the provider throws an HTTP exception, the result has `isError: true` with the `statusCode` and the `message` of the exception. When a provider answers an error status in the body, it sets `RequestAttribute::RESPONSE_STATUS_CODE` (`_spryker_response_status_code`) on the request. From status `400`, the result has `isError: true`.

## Tool schema keys

The `mcp` map supports the following keys:

<div class="width-100">

| KEY | TYPE | DESCRIPTION |
|---|---|---|
| `name` | string | Tool name. Default: the short name of the resource and the operation key in kebab case, for example `stores-get`. The name must be unique over all resources. |
| `title` | string | Human-readable name of the tool. |
| `description` | string | Description of the tool. Default: the operation description, then the resource description. |
| `structuredContent` | boolean | Defines if the tool has an `outputSchema`. Default: `false`. Set `true` only when the schema of the resource matches the plain `json` result. |
| `annotations` | map | `title` (string) and the `readOnlyHint`, `destructiveHint`, `idempotentHint`, and `openWorldHint` booleans. |

</div>

`McpValidationRule` rejects other keys, `mcp` on an operation type other than `Get` or `GetCollection`, and two operations of one resource with the same tool name. The generator stops on a duplicate tool name.

To change a tool that a module provides, declare the same operation again in the project schema of the resource with your own `mcp` values. Operations are replaced per operation key.

`api-platform/mcp` needs `api-platform/metadata` 4.3.5 or later and the `jsonld` format in `api_platform.formats` of the application that loads the resource.

## Protect a tool

A tool has the `security` and `securityMessage` of its operation. When the operation has none, the tool uses the ones of the resource, together with the anonymous customer header rule of `securityAnonymousAuthRequired`. As a result, the tool and the REST operation cannot have different permissions.

For a tool with a `security` expression, the server behaves as follows:

- `tools/list` does not show a tool that the expression denies. For this reason, the `tools/list` cache scope is `private`.
- `tools/call` of a denied tool does not reach the processor. `McpAccessDeniedSubscriber` passes the denial to the firewall. A caller without a token gets the answer of the firewall entry point. An authenticated caller gets `403`.
- A provider that throws `AccessDeniedException` (API Platform or Symfony Security) gets the same answer.

To answer `401` with `WWW-Authenticate: Bearer resource_metadata=...`, or `403` with `error="insufficient_scope"`, set the `entry_point` and the `access_denied_handler` of the firewall that covers `/mcp`.

`SprykerApiPlatformExtension` loads these services only when `McpBundle` is registered. As a result, Glue Backend does not have them.
