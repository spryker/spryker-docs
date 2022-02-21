---
title: Glue JSON API convention integration
description: Integrate the Glue JSON API convention into your project
template: feature-integration-guide-template
---

This document describes how to integrate the Glue JSON API convention for Storefront API application into a Spryker project.

## Install feature core

Follow the steps below to install the Glue JSON API convention core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME              | VERSION           | INTEGRATION GUIDE                                                                                                                                               |
|-------------------| ----------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue Application  | {{page.version}}  | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html)  |


### 1) Install the required modules using Composer
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules:

```bash
composer require spryker/glue-json-api-convention:"^0.1.0" spryker/glue-http:"^0.2.0" spryker/glue-storefront-api-application-glue-json-api-convention-connector:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                     | EXPECTED DIRECTORY                                                                |
|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| GlueApplication                                            | vendor/spryker/glue-application                                                   |
| GlueApplicationExtension                                   | vendor/spryker/glue-application-extension                                         |
| GlueHttp                                                   | vendor/spryker/glue-http                                                          |
| GlueJsonApiConvention                                      | vendor/spryker/glue-json-api-convention                                           |
| GlueJsonApiConventionExtension                             | vendor/spryker/glue-json-api-convention-extension                                 |
| GlueStorefrontApiApplication                               | vendor/spryker/glue-storefront-api-application                                    |
| GlueStorefrontApiApplicationExtension                      | vendor/spryker/glue-storefront-api-application-extension                          |
| GlueStorefrontApiApplicationGlueJsonApiConventionConnector | vendor/spryker/glue-storefront-api-application-glue-json-api-convention-connector |

{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\GlueJsonApiConvention\GlueJsonApiConventionConstants;
use Spryker\Shared\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConstants;

// ----------------------------------------------------------------------------
// ------------------------------ Glue Storefront API -------------------------------
// ----------------------------------------------------------------------------
$sprykerGlueStorefrontHost = getenv('SPRYKER_GLUE_STOREFRONT_HOST');
$config[GlueStorefrontApiApplicationConstants::GLUE_STOREFRONT_API_HOST] = $sprykerGlueStorefrontHost;

$config[GlueJsonApiConventionConstants::GLUE_DOMAIN]
    = sprintf(
        'https://%s',
        $sprykerGlueStorefrontHost ?: 'localhost',
    );
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
| GlueRelationship      | class | created | src/Generated/Shared/Transfer/GlueRelationshipTransfer.php      |
| GlueSparseResource    | class | created | src/Generated/Shared/Transfer/GlueSparseResourceTransfer.php    |
| GlueFilter            | class | created | src/Generated/Shared/Transfer/GlueFilterTransfer.php            |
| GlueLink              | class | created | src/Generated/Shared/Transfer/GlueLinkTransfer.php              |
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
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface;

class DummyResource extends AbstractResourcePlugin implements JsonApiResourceInterface
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

**src/Pyz/Glue/DummyModuleApi/Plugin/DummyResourceRelationshipPlugin.php**
```php
<?php

namespace Spryker\Glue\DummyModuleApi\Plugin;

use Generated\Shared\Transfer\GlueRelationshipTransfer;
use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResourceTransfer;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class DummyCountriesResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface
{
    /**
     * @var string
     */
    protected const RESOURCE_TYPE_DUMMY_RELATIONSHIPS = 'dummyRelationshipsType';

    /**
     * @api
     *
     * @param array<\Generated\Shared\Transfer\GlueResourceTransfer> $resources
     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
     *
     * @return void
     */
    public function addRelationships(array $resources, GlueRequestTransfer $glueRequestTransfer): void
    {
        foreach ($resources as $glueResourceTransfer) {
            $glueRelationshipTransfer = (new GlueRelationshipTransfer())
                ->addResource(new GlueResourceTransfer());
            $glueResourceTransfer->addRelationship($glueRelationshipTransfer);
        }
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getRelationshipResourceType(): string
    {
        return static::RESOURCE_TYPE_DUMMY_RELATIONSHIPS;
    }
}
```

### 5) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                   | NAMESPACE                                                                                                   |
|-------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| HttpCommunicationProtocolPlugin                       | Defines applicability, accepts the request and sends the response.              | Spryker\Glue\GlueHttp\Plugin\GlueApplication                                                                |
| CorsHeaderExistenceRequestAfterRoutingValidatorPlugin | Executes validations that need to be aware of the resolved route.               | Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication                                                   |
| ConventionResourceFilterPlugin                        | Filters resources for JSON API convention.                                      | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| ResourceRouteMatcherPlugin                            | Routes API requests using the `ResourceInterface`.                              | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| RequestResourceFilterPlugin                           | Filters resources by `GlueRequestTransfer` resource name.                       | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| JsonApiApiConventionPlugin                            | Allows the convention to follow the request flow.                               | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication                                                   |
| SparseFieldRequestBuilderPlugin                       | Extends `GlueRequestTransfer.sparseResources` with `GlueSparseResourceTransfer` | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| AttributesRequestBuilderPlugin                        | Extends `GlueRequestTransfer.attributes` with content attributes.               | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| RelationshipRequestBuilderPlugin                      | Extends `GlueRequestTransfer.included` with included fields.                    | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| PaginationRequestBuilderPlugin                        | Extends `GlueRequestTransfer.pagination` with `PaginationTransfer`.             | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| SortRequestBuilderPlugin                              | Extends `GlueRequestTransfer.sorting` with `SortTransfer`.                      | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| FilterFieldRequestBuilderPlugin                       | Extends `GlueRequestTransfer.filter` with `GlueFilterTransfer`.                 | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| RelationshipResponseFormatterPlugin                   | Loads resource relationships dependencies and adds included relationships.      | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| JsonApiResponseFormatterPlugin                        | Builds response for the JSON API convention.                                    | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| LocaleRequestBuilderPlugin                            | Extends `GlueRequestTransfer.locale` with `GlueRequestTransfer.meta`.           | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| SecurityHeaderResponseFormatterPlugin                 | Extends `GlueResponseTransfer` with security headers.                           | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| CustomRouteRouterPlugin                               | Routes API request based on `RouteProviderPluginInterface`.                     | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| CustomRouteRouteMatcherPlugin                         | Routes the API request using the custom routes.                                 | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| RequestCorsValidatorPlugin                            | Validates cors headers.                                                         | Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication                               |
| StorefrontApiRelationshipProviderPlugin               | Provides relationships provider plugins.                                        | Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\Plugin\GlueStorefrontApiApplication |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ConventionResourceFilterPlugin;
use Spryker\Glue\GlueHttp\Plugin\GlueApplication\HttpCommunicationProtocolPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication\JsonApiApiConventionPlugin;

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
            new JsonApiApiConventionPlugin(),
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

**src/Pyz/Glue/GlueJsonApiConvention/GlueJsonApiConventionDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueJsonApiConvention;

use Spryker\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider as SprykerGlueJsonApiConventionDependencyProvider;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\PaginationRequestBuilderPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\RelationshipResponseFormatterPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\FilterFieldRequestBuilderPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\SortRequestBuilderPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\Plugin\GlueStorefrontApiApplication\StorefrontApiRelationshipProviderPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\AttributesRequestBuilderPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\JsonApiResponseFormatterPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\RelationshipRequestBuilderPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention\SparseFieldRequestBuilderPlugin;

class GlueJsonApiConventionDependencyProvider extends SprykerGlueJsonApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\RelationshipProviderPluginInterface>
     */
    public function getRelationshipProviderPlugins(): array
    {
        return [
            new StorefrontApiRelationshipProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new SparseFieldRequestBuilderPlugin(),
            new AttributesRequestBuilderPlugin(),
            new RelationshipRequestBuilderPlugin(),
            new PaginationRequestBuilderPlugin(),
            new SortRequestBuilderPlugin(),
            new FilterFieldRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [
            new RelationshipResponseFormatterPlugin(),
            new JsonApiResponseFormatterPlugin(),
        ];
    }
}

```

**src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\DummyModuleApi\Plugin\DummyRouteProviderPlugin;
use Spryker\Glue\DummyStoresApi\Plugin\DummyResource;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\RequestResourceFilterPlugin;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ResourceRouteMatcherPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestResourceFilterPluginInterface;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\CustomRouteRouteMatcherPlugin;
use Spryker\Glue\GlueHttp\Plugin\GlueStorefrontApiApplication\CorsHeaderExistenceRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\CustomRouteRouterPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\LocaleRequestBuilderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueBackendApiApplication\RequestCorsValidatorPlugin;
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
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new DummyResource(),
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

**src/Pyz/Glue/GlueStorefrontApiApplicationGlueJsonApiConventionConnector/GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\DummyModuleApi\Plugin\DummyResourceRelationshipPlugin;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider;

class GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
          'dummyResourceType',
          new DummyResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox “Verification” %}

If everything is set up correctly, you should be able to access `http://glue-storefront.de.spryker.local/stores`.

{% endinfo_block %}
