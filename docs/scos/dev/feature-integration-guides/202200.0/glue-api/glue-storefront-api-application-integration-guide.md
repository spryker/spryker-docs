---
title: Glue Storefront API application integration
description: Integrate Glue Storefront API application into your project
template: feature-integration-guide-template
---

This document describes how to integrate the Glue Storefront API application into a Spryker project.

## Install feature core

Follow the steps below to install the Glue Storefront API application core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME              | VERSION           | INTEGRATION GUIDE                                                                                                                                               |
|-------------------| ----------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue Application  | {{page.version}}  | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html)  |


### 1) Install the required modules using Composer
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules:

```bash
composer require spryker/glue-storefront-api-application:"^0.1.0" spryker/glue-http:"^0.2.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                     | EXPECTED DIRECTORY                                                                |
|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| GlueApplication                                            | vendor/spryker/glue-application                                                   |
| GlueHttp                                                   | vendor/spryker/glue-http                                                          |
| GlueStorefrontApiApplication                               | vendor/spryker/glue-storefront-api-application                                    |

{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConstants;

// ----------------------------------------------------------------------------
// ------------------------------ Glue Storefront API -------------------------------
// ----------------------------------------------------------------------------
$sprykerGlueStorefrontHost = getenv('SPRYKER_GLUE_STOREFRONT_HOST');
$config[GlueStorefrontApiApplicationConstants::GLUE_STOREFRONT_API_HOST] = $sprykerGlueStorefrontHost;
```

### 3) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                        | TYPE  | EVENT   | PATH                                                                      |
|---------------------------------|-------|---------|---------------------------------------------------------------------------|
| GlueApiContext                  | class | created | src/Generated/Shared/Transfer/GlueApiContextTransfer.php                  |
| GlueResponse                    | class | created | src/Generated/Shared/Transfer/GlueResponseTransfer.php                    |
| GlueRequest                     | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php                     |
| GlueRequestValidation           | class | created | src/Generated/Shared/Transfer/GlueRequestValidationTransfer.php           |
| GlueError                       | class | created | src/Generated/Shared/Transfer/GlueErrorTransfer.php                       |
| GlueResource                    | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php                    |
| GlueResourceMethodCollection    | class | created | src/Generated/Shared/Transfer/GlueResourceMethodCollectionTransfer.php    |
| GlueResourceMethodConfiguration | class | created | src/Generated/Shared/Transfer/GlueResourceMethodConfigurationTransfer.php |
| Store                           | class | created | src/Generated/Shared/Transfer/StoreTransfer.php                           |

{% endinfo_block %}

### 4) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                              | NAMESPACE                                                                     |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| HttpCommunicationProtocolPlugin                       | Wraps HTTP protocol.                                                                       | Spryker\Glue\GlueHttp\Plugin\GlueApplication                                  |
| CorsHeaderExistenceRequestAfterRoutingValidatorPlugin | Checks the pre-flight request headers are valid.                                           | Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication                     |
| ResourceRouteMatcherPlugin                            | Routes API requests using the `ResourceInterface`.                                         | Spryker\Glue\GlueApplication\Plugin\GlueApplication                           |
| RequestResourceFilterPlugin                           | Filters resources by `GlueRequestTransfer` resource name.                                  | Spryker\Glue\GlueApplication\Plugin\GlueApplication                           |
| LocaleRequestBuilderPlugin                            | Builds `GlueRequestTransfer.locale` from the `accept-language` header.                     | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication |
| SecurityHeaderResponseFormatterPlugin                 | Extends `GlueResponseTransfer` with security headers.                                      | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication |
| CustomRouteRouterPlugin                               | Routes API request based on `RouteProviderPluginInterface`.                                | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication |
| CustomRouteRouteMatcherPlugin                         | Routes the API request using the custom routes.                                            | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication |
| RequestCorsValidatorPlugin                            | Validates cors headers.                                                                    | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueHttp\Plugin\GlueApplication\HttpCommunicationProtocolPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\CommunicationProtocolPluginInterface>
     */
    protected function getCommunicationProtocolPlugins(): array
    {
        return [
            new HttpCommunicationProtocolPlugin(),
        ];
    }
}

```

**src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueApplication\Plugin\GlueApplication\RequestResourceFilterPlugin;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ResourceRouteMatcherPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestResourceFilterPluginInterface;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\CustomRouteRouteMatcherPlugin;
use Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication\CorsHeaderExistenceRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\CustomRouteRouterPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\LocaleRequestBuilderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\RequestCorsValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\SecurityHeaderResponseFormatterPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new LocaleRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestAfterRoutingValidatorPluginInterface>
     */
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new CorsHeaderExistenceRequestAfterRoutingValidatorPlugin(),
            new RequestCorsValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [
            new SecurityHeaderResponseFormatterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RouterPluginInterface>
     */
    protected function getRouterPlugins(): array
    {
        return [
            new CustomRouteRouterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RouteMatcherPluginInterface>
     */
    protected function getRouteMatcherPlugins(): array
    {
        return [
            new CustomRouteRouteMatcherPlugin(),
            new ResourceRouteMatcherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestResourceFilterPluginInterface
     */
    public function getRequestResourceFilterPlugin(): RequestResourceFilterPluginInterface
    {
        return new RequestResourceFilterPlugin();
    }
}

```

{% info_block warningBox “Verification” %}

If everything is set up correctly, you should be able to access `http://glue.mysprykershop.com`.

{% endinfo_block %}
