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

| NAME                          | VERSION           | INTEGRATION GUIDE                                                                                                                                                                  |
|-------------------------------| ----------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue StorefrontApiApplication | {{page.version}}  | [Glue Storefront API Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-storefront-api-application-integration-guide.html)  |

Or

| NAME                       | VERSION           | INTEGRATION GUIDE                                                                                                                                                            |
|----------------------------| ----------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue BackendApiApplication | {{page.version}}  | [Glue Backend API Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-backend-api-application-integration-guide.html)  |

### 1) Install the required modules using Composer
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules:

```bash
composer require spryker/glue-rest-api-convention:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                     | EXPECTED DIRECTORY                                                                |
|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| GlueRestApiConvention                                      | vendor/spryker/glue-rest-api-convention                                           |

{% endinfo_block %}

### 2) Set up transfer objects

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

### 3) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                                       | NAMESPACE                                                                                                   |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| CorsHeaderExistenceRequestAfterRoutingValidatorPlugin | Checks the pre-flight request headers are valid.                                                    | Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication                                                   |
| ConventionResourceFilterPlugin                        | Filters out resources that do not implement the convention is used by the current request.          | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| RestApiConventionPlugin                               | Defines the Rest API convention and adds steps it requires for the request flow.                    | Spryker\Glue\GlurRestApiConventionPlugin\Plugin\GlueApplication                                             |
| SparseFieldRequestBuilderPlugin                       | Builds `GlueRequestTransfer.sparseResources` used to limit the attributes returned by the resource. | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| AttributesRequestBuilderPlugin                        | Parses request content `data.attributes` to the `GlueRequestTransfer.attributes`.                   | Spryker\Glue\GlueRestApiConvention\Plugin\GlueJsonApiConvention                                             |
| PaginationRequestBuilderPlugin                        | Builds `GlueRequestTransfer.pagination` from raw request data.                                      | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| SortRequestBuilderPlugin                              | Builds `GlueRequestTransfer.sorting` from raw request data.                                         | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| FilterFieldRequestBuilderPlugin                       | Builds `GlueRequestTransfer.filter` from raw request data.                                          | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| RestApiResponseFormatterPlugin                        | Builds response for the Rest API convention.                                                        | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| AcceptFormatRequestValidatorPlugin                    | Validates if  `GlueRequestTransfer.acceptedFormats` can be served by Rest API.                      | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| FormatRequestBuilderPlugin                            | Extends `GlueRequestTransfer` with `content-type` and `accept` headers.                             | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |
| JsonResponseEncoderPlugin                             | Gets accepted formats and transform content to JSON.                                                | Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention                                             |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ConventionResourceFilterPlugin;
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueApplication\RestApiConventionPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
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
use Spryker\Glue\GlueRestApiConvention\Plugin\GlueRestApiConvention\AttributesRequestBuilderPlugin;
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
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
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

### 4) Set up Glue API module resource and route provider plugins

{% info_block warningBox “Verification” %}

The following plugins are used as examples, they are not required for the feature to work and should be removed once the feature is set up correctly.

{% endinfo_block %}

**src/Pyz/Glue/DummyModuleApi/Plugin/GlueRestApiConvention/DummyResource.php**
```php
<?php

namespace Spryker\Glue\DummyModuleApi\Plugin;

use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueRestApiConventionExtension\Dependency\Plugin\RestResourceInterface;
use Spryker\Glue\Kernel\Controller\AbstractStorefrontApiController;

class DummyResource extends AbstractResourcePlugin implements RestResourceInterface
{
    /**
     * @return string
     */
    public function getType(): string
    {
        return 'dummy-resource-type';
    }

    /**
     * @uses \Spryker\Glue\DummyModuleApi\Controller\ResourceController
     *
     * @return string
     */
    public function getController(): string
    {
        $resourceController = new class extends AbstractStorefrontApiController {
            /**
             * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
             *
             * @return \Generated\Shared\Transfer\GlueResponseTransfer
            */
            public function getCollectionAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer
            {
                return new GlueResponseTransfer();
            }
        };
        
        return $resourceController::class;
    }
}
```

**src/Pyz/Glue/DummyModuleApi/Plugin/GlueStorefrontApiApplication/DummyRouteProviderPlugin.php**
```php
<?php

namespace Spryker\Glue\DummyModuleApi\Plugin;

use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Router\Route\RouteCollection;
use Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;

class DummyRouteProviderPlugin extends AbstractRouteProviderPlugin implements RouteProviderPluginInterface
{
    /**
     * @param \Spryker\Glue\GlueStorefrontApiApplication\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Glue\GlueStorefrontApiApplication\Router\Route\RouteCollection
     */
    public function addRoutes(StorefrontRouteCollection $routeCollection): RouteCollection
    {
        $collectionRoute = $this->createGetCollectionRoute('/dummy', 'dummyResourceType');
        $routeCollection->add('storesCollection', $collectionRoute);

        $route = $this->createGetRoute('/dummy/{id}', 'dummyResourceType');
        $routeCollection->add('stores', $route);

        return $routeCollection;
    }
}
```

{% info_block warningBox “Verification” %}

If everything is set up correctly, you should be able to access `http://glue.mysprykershop.com/dummy-resource-type?fields[items]=att1,att2,att3&page[limit]=1&page[offset]=10&sort=-att1`
and `http://glue.mysprykershop.com/dummy?fields[items]=att1,att2,att3&page[limit]=1&page[offset]=10&sort=-att1`.

{% endinfo_block %}
