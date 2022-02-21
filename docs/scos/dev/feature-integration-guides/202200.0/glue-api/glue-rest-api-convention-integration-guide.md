---
title: Glue Rest API convention integration
description: Integrate the Glue Rest API convention into your project
template: feature-integration-guide-template
---

This document describes how to integrate the Glue Rest API convention for Storefront API application into a Spryker project.

## Install feature core

Follow the steps below to install the Glue Rest API convention core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME              | VERSION           | INTEGRATION GUIDE                                                                                                                                               |
|-------------------| ----------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue Application  | {{page.version}}  | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html)  |


### 1) Install the required modules using Composer
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules:

```bash
composer require spryker/glue-rest-api-convention:"^0.1.0" spryker/glue-http:"^0.2.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                     | EXPECTED DIRECTORY                                                                |
|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| GlueApplication                                            | vendor/spryker/glue-application                                                   |
| GlueApplicationExtension                                   | vendor/spryker/glue-application-extension                                         |
| GlueHttp                                                   | vendor/spryker/glue-http                                                          |
| GlueRestApiConvention                                      | vendor/spryker/glue-rest-api-convention                                           |
| GlueRestApiConventionExtension                             | vendor/spryker/glue-rest-api-convention-extension                                 |
| GlueStorefrontApiApplication                               | vendor/spryker/glue-storefront-api-application                                    |
| GlueStorefrontApiApplicationExtension                      | vendor/spryker/glue-storefront-api-application-extension                          |

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

| TRANSFER              | TYPE  | EVENT   | PATH                                                            |
|-----------------------|-------|---------|-----------------------------------------------------------------|
| GlueApiContext        | class | created | src/Generated/Shared/Transfer/GlueApiContextTransfer.php        |
| GlueResponse          | class | created | src/Generated/Shared/Transfer/GlueResponseTransfer.php          |
| GlueRequest           | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php           |
| GlueRequestValidation | class | created | src/Generated/Shared/Transfer/GlueRequestValidationTransfer.php |
| GlueError             | class | created | src/Generated/Shared/Transfer/GlueErrorTransfer.php             |
| GlueResource          | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php          |
| GlueSparseResource    | class | created | src/Generated/Shared/Transfer/GlueSparseResourceTransfer.php    |
| GlueFilter            | class | created | src/Generated/Shared/Transfer/GlueFilterTransfer.php            |
| GlueVersion           | class | created | src/Generated/Shared/Transfer/GlueVersionTransfer.php           |
| Pagination            | class | created | src/Generated/Shared/Transfer/PaginationTransfer.php            |
| Sort                  | class | created | src/Generated/Shared/Transfer/SortTransfer.php                  |

{% endinfo_block %}

### 4) Set up glue API module resource and route provider plugins

**src/Pyz/Glue/DummyModuleApi/Plugin/DummyResource.php**
```php
<?php

namespace Spryker\Glue\DummyModuleApi\Plugin;

use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Spryker\Glue\DummyModuleApi\Controller\ResourceController;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueRestApiConventionExtension\Dependency\Plugin\RestResourceInterface;

class DummyResource extends AbstractResourcePlugin implements RestResourceInterface
{
    /**
     * @return string
     */
    public function getType(): string
    {
        return 'dummyResourceType';
    }

    /**
     * @uses \Spryker\Glue\DummyModuleApi\Controller\ResourceController
     *
     * @return string
     */
    public function getController(): string
    {
        return ResourceController::class;
    }

    /**
     * @return \Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer
     */
    public function getDeclaredMethods(): GlueResourceMethodCollectionTransfer
    {
        return (new GlueResourceMethodCollectionTransfer())
            ->setGetCollection(new GlueResourceMethodConfigurationTransfer())
            ->setGet(new GlueResourceMethodConfigurationTransfer());
    }
}
```

**src/Pyz/Glue/DummyModuleApi/Plugin/DummyRouteProviderPlugin.php**
```php
<?php

namespace Spryker\Glue\DummyModuleApi\Plugin;

use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Router\Route\RouteCollection as StorefrontRouteCollection;
use Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface as StorefrontRouteProviderPluginInterface;
use Symfony\Component\HttpFoundation\Request;

class DummyRouteProviderPlugin extends AbstractRouteProviderPlugin implements StorefrontRouteProviderPluginInterface
{
    /**
     * @param \Spryker\Glue\GlueStorefrontApiApplication\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Glue\GlueStorefrontApiApplication\Router\Route\RouteCollection
     */
    public function addRoutes(StorefrontRouteCollection $routeCollection): StorefrontRouteCollection
    {
        $collectionRoute = $this->createGetCollectionRoute('/dummy', 'dummyResourceType');
        $routeCollection->add('storesCollection', $collectionRoute);

        $route = $this->createGetRoute('/dummy/{id}', 'dummyResourceType');
        $routeCollection->add('stores', $route);

        return $routeCollection;
    }
}
```

### 5) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                   | NAMESPACE                                                                                                   |
|-------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| HttpCommunicationProtocolPlugin                       | Defines applicability, accepts the request and sends the response.              | Spryker\Glue\GlueHttp\Plugin\GlueApplication                                                                |
| CorsHeaderExistenceRequestAfterRoutingValidatorPlugin | Executes validations that need to be aware of the resolved route.               | Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication                                                   |
| ConventionResourceFilterPlugin                        | Filters resources for Rest API convention.                                      | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| ResourceRouteMatcherPlugin                            | Routes API requests using the `ResourceInterface`.                              | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| RequestResourceFilterPlugin                           | Filters resources by `GlueRequestTransfer` resource name.                       | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| RestApiConventionPlugin                               | Allows the convention to follow the request flow.                               | Spryker\Glue\GlurRestApiConventionPlugin\Plugin\GlueApplication                                             |
| SparseFieldRequestBuilderPlugin                       | Extends `GlueRequestTransfer.sparseResources` with `GlueSparseResourceTransfer` | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| AttributesRequestBuilderPlugin                        | Extends `GlueRequestTransfer.attributes` with content attributes.               | Spryker\Glue\GlueRestApiConvention\Plugin\GlueJsonApiConvention                                             |
| PaginationRequestBuilderPlugin                        | Extends `GlueRequestTransfer.pagination` with `PaginationTransfer`.             | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| SortRequestBuilderPlugin                              | Extends `GlueRequestTransfer.sorting` with `SortTransfer`.                      | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| FilterFieldRequestBuilderPlugin                       | Extends `GlueRequestTransfer.filter` with `GlueFilterTransfer`.                 | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| RestApiResponseFormatterPlugin                        | Builds response for the Rest API convention.                                    | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| AcceptFormatRequestValidatorPlugin                    | Validates if  `GlueRequestTransfer.acceptedFormats` can be served by Rest API.  | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| FormatRequestBuilderPlugin                            | Extends `GlueRequestTransfer` with `content-type` and `accept` headers.         | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| JsonResponseEncoderPlugin                             | Gets accepted formats and transform content to JSON.                            | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| LocaleRequestBuilderPlugin                            | Extends `GlueRequestTransfer.locale` with `GlueRequestTransfer.meta`.           | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| SecurityHeaderResponseFormatterPlugin                 | Extends `GlueResponseTransfer` with security headers.                           | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| CustomRouteRouterPlugin                               | Routes API request based on `RouteProviderPluginInterface`.                     | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| CustomRouteRouteMatcherPlugin                         | Routes the API request using the custom routes.                                 | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| RequestCorsValidatorPlugin                            | Validates cors headers.                                                         | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ConventionResourceFilterPlugin;
use Spryker\Glue\GlueHttp\Plugin\GlueApplication\HttpCommunicationProtocolPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueApplication\RestApiConventionPlugin;

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

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ApiConventionPluginInterface>
     */
    protected function getApiConventionPlugins(): array
    {
        return [
            new RestApiConventionPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceFilterPluginInterface>
     */
    public function getResourceFilterPlugins(): array
    {
        return [
            new ConventionResourceFilterPlugin(),
        ];
    }
}

```

**src/Pyz/Glue/GlueRestApiConvention/GlueRestApiConventionDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueRestApiConvention;

use Spryker\Glue\GlueRestApiConvention\GlueRestApiConventionDependencyProvider as SprykerGlueRestApiConventionDependencyProvider;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueRestApiConvention\AttributesRequestBuilderPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\AcceptFormatRequestValidatorPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\FilterFieldRequestBuilderPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\FormatRequestBuilderPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\JsonResponseEncoderPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\PaginationRequestBuilderPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\RestApiResponseFormatterPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\SortRequestBuilderPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\SparseFieldRequestBuilderPlugin;

class GlueRestApiConventionDependencyProvider extends SprykerGlueRestApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueRestApiConventionExtension\Dependency\Plugin\ResponseEncoderPluginInterface>
     */
    protected function getResponseEncoderPlugins(): array
    {
        return [
            new JsonResponseEncoderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueRestApiConventionExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new FormatRequestBuilderPlugin(),
            new PaginationRequestBuilderPlugin(),
            new SortRequestBuilderPlugin(),
            new FilterFieldRequestBuilderPlugin(),
            new SparseFieldRequestBuilderPlugin(),
            new AttributesRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueRestApiConventionExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            new AcceptFormatRequestValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueRestApiConventionExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [
            new RestApiResponseFormatterPlugin(),
        ];
    }
}

```

**src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\DummyModuleApi\Plugin\DummyRouteProviderPlugin;
use Spryker\Glue\DummyModuleApi\Plugin\DummyResource;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\RequestResourceFilterPlugin;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ResourceRouteMatcherPlugin;
use Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication\CorsHeaderExistenceRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\CustomRouteRouteMatcherPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\CustomRouteRouterPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\LocaleRequestBuilderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueBackendApiApplication\RequestCorsValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\SecurityHeaderResponseFormatterPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestResourceFilterPluginInterface;

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
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new DummyRouteProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestResourceFilterPluginInterface
     */
    public function getRequestResourceFilterPlugin(): RequestResourceFilterPluginInterface
    {
        return new RequestResourceFilterPlugin();
    }

    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProviderPlugins(): array
    {
        return [
            new DummyRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox “Verification” %}

If everything is set up correctly, you should be able to access `http://glue-storefront.de.spryker.local/stores`.

{% endinfo_block %}
