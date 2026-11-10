---
title: Install the Storefront MCP server
description: Learn how to enable the MCP server of the Storefront API in a Spryker project.
last_updated: Nov 5, 2026
template: feature-integration-guide-template
label: early-access
keywords: ai, mcp, model context protocol, storefront api, glue storefront, api platform, install, claude code
related:
  - title: Storefront MCP server
    link: docs/dg/dev/ai/ai-commerce/storefront-mcp-server/storefront-mcp-server.html
  - title: Add tools to the Storefront MCP server
    link: docs/dg/dev/ai/ai-commerce/storefront-mcp-server/add-tools-to-storefront-mcp-server.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

This document describes how to enable the [Storefront MCP server](/docs/dg/dev/ai/ai-commerce/storefront-mcp-server/storefront-mcp-server.html) in a project. The server lets AI agents and MCP clients call tools of the Storefront API at `/mcp`.

{% info_block warningBox "Early access" %}

This is an early-access preview for evaluation and prototyping. The interface, the configuration, and the package versions can change before the general release.

{% endinfo_block %}

## Prerequisites

- The project uses Glue Storefront based on API Platform.
- `spryker/api-platform` 1.53.0 or later and `spryker/glue-storefront-api-application` 1.8.0 or later are installed. These releases contain the MCP tool generator, the discovery documents, and `McpHandshakeEraRefusalSubscriber`.
- `spryker-sdk/ai-dev` 0.9.0 or later is installed. `spryker-sdk/ai-dev` 0.8.0 requires `mcp/sdk` ^0.9, which does not match the `mcp/sdk` ^0.8 that `api-platform/mcp` requires.

## Install the server

The server needs the official MCP packages and a set of project configuration files. To enable the server, do the following:

1. Require the packages:

   ```bash
   composer require api-platform/mcp:^4.4.6 mcp/sdk:^0.8.1 symfony/mcp-bundle:^0.14.1 symfony/object-mapper:^7.4
   ```

2. In `config/GlueStorefront/packages/api_platform.php`, enable MCP with `$apiPlatform->mcp()->enabled(true)`. In `config/GlueBackend/packages/api_platform.php`, disable MCP with `$apiPlatform->mcp()->enabled(false)`.
3. Register `Symfony\AI\McpBundle\McpBundle` in `config/GlueStorefront/bundles.php`.
4. Add `config/GlueStorefront/packages/mcp.php` with the following content. It defines the `$mcpServers` configuration for `symfony/mcp-bundle`, the middleware factory, `McpHandshakeEraRefusalSubscriber`, and the discovery services:

   ```php
   <?php

   declare(strict_types = 1);

   use Mcp\Schema\Enum\ProtocolVersion;
   use Spryker\Glue\GlueStorefrontApiApplication\Discovery\ApiCatalogBuilder;
   use Spryker\Glue\GlueStorefrontApiApplication\Discovery\ApiCatalogBuilderInterface;
   use Spryker\Glue\GlueStorefrontApiApplication\Discovery\McpServerCardBuilder;
   use Spryker\Glue\GlueStorefrontApiApplication\Discovery\McpServerCardBuilderInterface;
   use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConfig;
   use Spryker\Glue\GlueStorefrontApiApplication\Mcp\EventSubscriber\McpHandshakeEraRefusalSubscriber;
   use Symfony\AI\McpBundle\Http\MiddlewareFactory;
   use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
   use function Symfony\Component\DependencyInjection\Loader\Configurator\expr;
   use function Symfony\Component\DependencyInjection\Loader\Configurator\param;
   use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

   return static function (ContainerConfigurator $container): void {
       $cacheTtlMilliseconds = 3600000;
       $protocolVersions = [ProtocolVersion::V2026_07_28->value];

       $mcpServers = [
           'storefront' => [
               'name' => 'com.spryker/storefront',
               'version' => '0.1.0',
               'description' => 'MCP server of the Spryker Storefront API.',
               'instructions' => 'MCP server of the Spryker Storefront API.',
               'protocol_versions' => $protocolVersions,
               'transports' => ['http' => true, 'stdio' => false],
               'http' => [
                   'path' => '/mcp',
               ],
               'registry' => ['tools' => ['*']],
               'session' => ['store' => 'memory'],
               'cache' => [
                   'methods' => [
                       'server/discover' => ['ttl_ms' => $cacheTtlMilliseconds, 'scope' => 'public'],
                       'tools/list' => ['ttl_ms' => $cacheTtlMilliseconds, 'scope' => 'private'],
                   ],
               ],
           ],
       ];

       $configServiceExpression = sprintf("service('%s')", addslashes(GlueStorefrontApiApplicationConfig::class));
       $apiBaseUrl = expr(sprintf('%s.getStorefrontApiBaseUrl()', $configServiceExpression));

       $container->extension('mcp', ['servers' => $mcpServers]);

       $services = $container->services();

       $services->set('mcp.storefront.middleware_factory', MiddlewareFactory::class)
           ->decorate('mcp.server.storefront.middleware_factory')
           ->args([expr(sprintf('%s.getMcpAllowedHosts()', $configServiceExpression))]);

       $services->set(McpHandshakeEraRefusalSubscriber::class)
           ->args([array_column(array_column($mcpServers, 'http'), 'path'), $protocolVersions])
           ->tag('kernel.event_subscriber');

       $services->set(McpServerCardBuilderInterface::class, McpServerCardBuilder::class)
           ->args([$mcpServers, $apiBaseUrl]);

       $services->set(ApiCatalogBuilderInterface::class, ApiCatalogBuilder::class)
           ->args([service(McpServerCardBuilderInterface::class), $apiBaseUrl, param('api_platform.enable_docs')]);
   };
   ```

5. Add `config/GlueStorefront/routes/mcp.php` with only the following line. The discovery routes come from the resource schemas:

   ```php
   $routingConfigurator->import('.', 'mcp');
   ```

6. In `config/Shared/config_default.php`, set `GlueStorefrontApiApplicationConstants::GLUE_STOREFRONT_API_BASE_URL` to the public URL of the Storefront API host. For details, see [Runtime configuration](/docs/dg/dev/ai/ai-commerce/storefront-mcp-server/storefront-mcp-server.html#runtime-configuration).
7. Add `if-none-match` to the CORS allowed headers. Glue Storefront answers the `OPTIONS` preflight request with the `GlueApplicationConfig` headers. Without this header, browser clients cannot send conditional requests for the discovery documents. Override `getCorsAllowedHeaders()` in both project-level configuration classes:

   `src/Pyz/Glue/GlueApplication/GlueApplicationConfig.php`:

   ```php
   <?php

   namespace Pyz\Glue\GlueApplication;

   use Spryker\Glue\GlueApplication\GlueApplicationConfig as SprykerGlueApplicationConfig;

   class GlueApplicationConfig extends SprykerGlueApplicationConfig
   {
       protected const string HEADER_IF_NONE_MATCH = 'if-none-match';

       /**
        * @return array<string>
        */
       public function getCorsAllowedHeaders(): array
       {
           return array_merge(
               parent::getCorsAllowedHeaders(),
               [static::HEADER_IF_NONE_MATCH],
           );
       }
   }
   ```

   `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationConfig.php`:

   ```php
   <?php

   namespace Pyz\Glue\GlueStorefrontApiApplication;

   use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConfig as SprykerGlueStorefrontApiApplicationConfig;

   class GlueStorefrontApiApplicationConfig extends SprykerGlueStorefrontApiApplicationConfig
   {
       protected const string HEADER_IF_NONE_MATCH = 'if-none-match';

       /**
        * @return array<string>
        */
       public function getCorsAllowedHeaders(): array
       {
           return array_merge(
               parent::getCorsAllowedHeaders(),
               [static::HEADER_IF_NONE_MATCH],
           );
       }
   }
   ```

   If a class already overrides `getCorsAllowedHeaders()`, add `if-none-match` to the array that it returns.
8. Generate the resources and clear the cache:

   ```bash
   vendor/bin/glue api:generate storefront
   GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue cache:clear
   ```

## Verify the installation

To make sure the server works, do the following:

1. Send a `tools/list` request to the MCP server:

   ```bash
   curl -s https://glue-storefront.example.com/mcp \
     -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
     -H 'MCP-Protocol-Version: 2026-07-28' -H 'Mcp-Method: tools/list' \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientInfo":{"name":"curl","version":"1"},"io.modelcontextprotocol/clientCapabilities":{}}}}'
   ```

   Make sure the response is a valid JSON-RPC result. The `tools` list contains the tools that the installed feature modules declare.

2. Request the API catalog:

   ```bash
   curl -s https://glue-storefront.example.com/.well-known/api-catalog
   ```

   Make sure the response is similar to the following shortened example. It contains the URLs of the MCP server and of the server card:

   ```json
   {
     "linkset": [
       {
         "anchor": "https://glue-storefront.example.com/mcp",
         "service-meta": [
           {
             "href": "https://glue-storefront.example.com/.well-known/mcp/server-card.json",
             "type": "application/mcp-server-card+json"
           }
         ]
       },
       {
         "anchor": "https://glue-storefront.example.com/",
         "service-desc": [
           {
             "href": "https://glue-storefront.example.com/docs.jsonopenapi",
             "type": "application/vnd.openapi+json"
           }
         ],
         "service-doc": [
           {
             "href": "https://glue-storefront.example.com/docs",
             "type": "text/html"
           }
         ]
       }
     ]
   }
   ```

3. Request the server card. The server card describes the server to MCP clients, so a client reads it before it connects:

   ```bash
   curl -s https://glue-storefront.example.com/.well-known/mcp/server-card.json
   ```

   Make sure the response is similar to the following example. The `url` field contains the URL of the MCP server, and `supportedProtocolVersions` contains `2026-07-28`:

   ```json
   {
     "$schema": "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
     "name": "com.spryker/storefront",
     "version": "0.1.0",
     "description": "MCP server of the Spryker Storefront API.",
     "remotes": [
       {
         "type": "streamable-http",
         "url": "https://glue-storefront.example.com/mcp",
         "supportedProtocolVersions": ["2026-07-28"]
       }
     ]
   }
   ```

## Connect Claude Code to the server

To call the tools of the server from an AI agent, add the server to an MCP client. Claude Code supports the `2026-07-28` protocol version that the server requires.

To connect Claude Code, do the following:

1. Add the server:

   ```bash
   claude mcp add --transport http spryker-storefront https://glue-storefront.example.com/mcp
   ```

2. Start Claude Code and run the `/mcp` command.
3. Select `spryker-storefront`. Make sure the status is `connected` and the protocol is `2026-07-28`.

The following example shows the status of a connected server:

![Claude Code status of the connected Spryker Storefront MCP server with protocol 2026-07-28 and the list of actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/storefront-mcp-server-claude-code-status.png)
