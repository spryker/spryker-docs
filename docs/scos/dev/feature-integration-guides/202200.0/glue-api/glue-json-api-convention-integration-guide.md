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
composer require spryker/glue-json-api-convention:"^0.1.0" spryker/glue-storefront-api-application-glue-json-api-convention-connector:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                     | EXPECTED DIRECTORY                                                                |
|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| GlueJsonApiConvention                                      | vendor/spryker/glue-json-api-convention                                           |
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

### 4) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                                            | NAMESPACE                                                                                                   |
|-------------------------------------------------------|----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| ConventionResourceFilterPlugin                        | Filters out resources that do not implement the convention is used by the current request.               | Spryker\Glue\GlueApplication\Plugin\GlueApplication                                                         |
| JsonApiApiConventionPlugin                            | Defines the JSON:API convention and adds steps it requires for the request flow.                         | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication                                                   |
| SparseFieldRequestBuilderPlugin                       | Builds `GlueRequestTransfer.sparseResources` used to limit the attributes returned by the resource.      | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| AttributesRequestBuilderPlugin                        | Parses request content `data.attributes` to the `GlueRequestTransfer.attributes`.                        | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| RelationshipRequestBuilderPlugin                      | Builds `GlueRequestTransfer.includedRelationships` from the `?include=resource-type` request parameters. | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| PaginationRequestBuilderPlugin                        | Builds `GlueRequestTransfer.pagination` from raw request data.                                           | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| SortRequestBuilderPlugin                              | Builds `GlueRequestTransfer.sorting` from raw request data.                                              | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| FilterFieldRequestBuilderPlugin                       | Builds `GlueRequestTransfer.filter` from raw request data.                                               | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| RelationshipResponseFormatterPlugin                   | Loads resource relationships dependencies and adds included relationships.                               | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| JsonApiResponseFormatterPlugin                        | Builds response for the JSON API convention.                                                             | Spryker\Glue\GlueJsonApiConvention\Plugin\GlueJsonApiConvention                                             |
| StorefrontApiRelationshipProviderPlugin               | Provides a collection of resource relationships for the storefront API application.                      | Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\Plugin\GlueStorefrontApiApplication |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\ConventionResourceFilterPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication\JsonApiApiConventionPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
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
            new DummyResource(),
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

### 5) Set up Glue API module resource and route provider plugins

{% info_block warningBox “Verification” %}

The following plugins are used as examples, they are not required for the feature to work and should be removed once the feature is set up correctly.

{% endinfo_block %}

**src/Pyz/Glue/DummyModuleApi/Plugin/GlueJsonApiConvention/DummyResource.php**
```php
<?php

namespace Spryker\Glue\DummyModuleApi\Plugin;

use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface;
use Spryker\Glue\Kernel\Controller\AbstractStorefrontApiController;

class DummyResource extends AbstractResourcePlugin implements JsonApiResourceInterface
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

**src/Pyz/Glue/DummyModuleApi/Plugin/GlueJsonApiConvention/DummyResourceRelationshipPlugin.php**
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
    protected const RESOURCE_TYPE_DUMMY_RELATIONSHIPS = 'dummy-relationships-type';

    /**
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
     * @return string
     */
    public function getRelationshipResourceType(): string
    {
        return static::RESOURCE_TYPE_DUMMY_RELATIONSHIPS;
    }
}
```

{% info_block warningBox “Verification” %}

If everything is set up correctly, you should be able to access `http://glue.mysprykershop.com/dummy-resource-type?fields[items]=att1,att2,att3&page[limit]=1&page[offset]=10&sort=-att1&include=dummy-relationships-type&sort=-att1`
and `http://glue.mysprykershop.com/dummy?fields[items]=att1,att2,att3&page[limit]=1&page[offset]=10&sort=-att1&include=dummy-relationships-type&sort=-att1`.

{% endinfo_block %}
