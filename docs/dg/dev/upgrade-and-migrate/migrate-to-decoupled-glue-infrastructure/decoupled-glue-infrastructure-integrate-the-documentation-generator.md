---
title: "Decoupled Glue infrastructure: Integrate the documentation generator"
description: Learn how to integrate the Glue documentation generation into your Spryker based project
template: feature-integration-guide-template
last_updated: Oct 30, 2023
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-documentation-generation.html
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/decoupled-glue-infrastructure/glue-api-documentation-generation.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-documentation-generator.html
---

This document describes how to integrate the Glue documentation generation into a Spryker project.

## Install feature core

Follow the steps below to install the Glue documentation generation.

### Prerequisites

To start the integration of the feature, overview and install the necessary features:

| NAME                                         | VERSION           | INSTALLATION GUIDE                                                                                                                                                                                           |
|----------------------------------------------| ----------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue Storefront and Backend API Applications | {{page.version}}  | [Glue Storefront and Backend API Applications feature integration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html)  |


### 1) Install the required modules
<!--Provide one or more console commands with the exact, latest version numbers of all required modules. If the Composer command contains modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->
Install the required modules using Composer:

```bash
composer require spryker/documentation-generator-api:"^1.0.0" spryker/documentation-generator-open-api:"^1.0.0" composer require spryker/glue-storefront-api-application-glue-json-api-convention-connector:"1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                     | EXPECTED DIRECTORY                                                                |
|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| DocumentationGeneratorApi                                  | vendor/spryker/documentation-generator-api                                           |
| DocumentationGeneratorOpenApi                              | vendor/spryker/documentation-generator-open-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfers:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER              | TYPE  | EVENT   | PATH                                                            |
|-----------------------|-------|---------|-----------------------------------------------------------------|
| ApiApplicationSchemaContext        | class | created | src/Generated/Shared/Transfer/ApiApplicationSchemaContextTransfer.php        |
| PathAnnotation          | class | created | src/Generated/Shared/Transfer/PathAnnotationTransfer.php          |
| RelationshipPluginAnnotationsContext           | class | created | src/Generated/Shared/Transfer/RelationshipPluginAnnotationsContextTransfer.php           |
| ResourceContext | class | created | src/Generated/Shared/Transfer/ResourceContextTransfer.php |
| Annotation             | class | created | src/Generated/Shared/Transfer/AnnotationTransfer.php             |
| RelationshipPluginsContext          | class | created | src/Generated/Shared/Transfer/RelationshipPluginsContextTransfer.php          |
| CustomRoutesContext      | class | created | src/Generated/Shared/Transfer/CustomRoutesContextTransfer.php      |
| Parameter    | class | created | src/Generated/Shared/Transfer/ParameterTransfer.php    |
| ParameterSchema            | class | created | src/Generated/Shared/Transfer/ParameterSchemaTransfer.php            |
| SchemaComponent              | class | created | src/Generated/Shared/Transfer/SchemaComponentTransfer.php              |
| SchemaItemsComponent            | class | created | src/Generated/Shared/Transfer/SchemaItemsComponentTransfer.php            |
| ParameterComponent                  | class | created | src/Generated/Shared/Transfer/ParameterComponentTransfer.php                  |
| SchemaPropertyComponent                  | class | created | src/Generated/Shared/Transfer/SchemaPropertyComponentTransfer.php                  |
| SchemaData                  | class | created | src/Generated/Shared/Transfer/SchemaDataTransfer.php                  |
| SchemaProperty                  | class | created | src/Generated/Shared/Transfer/SchemaPropertyTransfer.php                  |
| SchemaItems                  | class | created | src/Generated/Shared/Transfer/SchemaItemsTransfer.php                  |
| RestErrorMessage                  | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php                         |
| PathMethodComponentData                  | class | created | src/Generated/Shared/Transfer/PathMethodComponentDataTransfer.php                  |
| GlueResourceMethodCollection                  | class | created | src/Generated/Shared/Transfer/GlueResourceMethodCollectionTransfer.php                  |
| GlueResourceMethodConfiguration                  | class | created | src/Generated/Shared/Transfer/GlueResourceMethodConfigurationTransfer.php                  |

{% endinfo_block %}

### 4) Set up behaviors
Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                                                                                             | NAMESPACE                                                                                                   |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| ApiGenerateDocumentationConsole                       | Adds a Glue console command that will generate the documentation for the configured applications.                                                         | Spryker\Glue\DocumentationGeneratorApi\Plugin\Console                                                         |
| StorefrontApiApplicationProviderPlugin                | Defines the `storefront` application that the documentation will be generated for.                                                                        | Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi                                                   |
| BackendApiApplicationProviderPlugin                   | Defines the `backend` application that the documentation will be generated for.                                                                           | Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi                                             |
| DocumentationGeneratorOpenApiSchemaFormatterPlugin    | Responsible for the formatting of several parts of the Open API 3 schema: info, components, paths, tags.                                                  | Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi                                             |
| JsonApiSchemaFormatterPlugin                          | Responsible for the formatting of JSON:API-specific parameters (e.g. `include`), and wrapping the request and response attributes into a JSON:API format. | Spryker\Glue\GlueJsonApiConvention\Plugin\DocumentationGeneratorApi                                             |
| RestApiSchemaFormatterPlugin                          | Formats API parameters that are getting processed by the REST convention.                                                                                 | Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorApi                                             |
| StorefrontResourcesContextExpanderPlugin              | Adds storefront API resources to the documentation generation context.                                                                                    | Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi                                             |
| StorefrontCustomRoutesContextExpanderPlugin           | Adds storefront API custom routes to the documentation generation context.                                                                                | Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi                                             |
| RelationshipPluginsContextExpanderPlugin              | Adds resource relationships to the documentation generation context.                                                                                      | Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\Plugin\GlueStorefrontApiApplication                                             |
| BackendResourcesContextExpanderPlugin                 | Adds backend API resources to the documentation generation context.                                                                                       | Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi                                             |
| BackendCustomRoutesContextExpanderPlugin              | Adds backend API custom routes to the documentation generation context.                                                                                   | Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi |
| ControllerAnnotationsContextExpanderPlugin            | Analyzes and adds the information contained in the resource controller annotations to the documentation generation.                                       | Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi |
| CustomRouteControllerAnnotationsContextExpanderPlugin | Analyzes and adds the information contained in the custom route controller annotations to the documentation generation context.                           | Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi |
| RelationshipPluginAnnotationsContextExpanderPlugin    | Analyzes and adds the information contained in the relationship plugins annotations  to the documentation generation context.                                                                     | Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi |
| BackendHostContextExpanderPlugin                      | Adds backend host information to the documentation generation context.                                                                                    | Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi |
| StorefrontHostContextExpanderPlugin                   | Adds storefront host information to the documentation generation context.                                                                                 | Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi |
| DocumentationGeneratorOpenApiContentGeneratorStrategyPlugin | Converts the documentation array into a YAML string. Replace this plugin in order to generate other formats like JSON.                                   | Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi |



**src/Pyz/Glue/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\Console;

use Spryker\Glue\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Glue\DocumentationGeneratorApi\Plugin\Console\ApiGenerateDocumentationConsole;
use Spryker\Glue\Kernel\Container;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new ApiGenerateDocumentationConsole(),
        ];
    }
}

```

{% info_block warningBox “Verification” %}

If everything is set up correctly, a new console command will be available.
```
vendor/bin/glue api:generate:documentation
```

{% endinfo_block %}

**src/Pyz/Glue/DocumentationGeneratorApi/DocumentationGeneratorApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorApi;

use Spryker\Glue\DocumentationGeneratorApi\DocumentationGeneratorApiDependencyProvider as SprykerDocumentationGeneratorApiDependencyProvider;
use Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface;
use Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\ContentGeneratorStrategyPluginInterface;
use Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi\ControllerAnnotationsContextExpanderPlugin;
use Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi\CustomRouteControllerAnnotationsContextExpanderPlugin;
use Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi\DocumentationGeneratorOpenApiContentGeneratorStrategyPlugin;
use Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi\DocumentationGeneratorOpenApiSchemaFormatterPlugin;
use Spryker\Glue\DocumentationGeneratorOpenApi\Plugin\DocumentationGeneratorApi\RelationshipPluginAnnotationsContextExpanderPlugin;
use Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorApi\RestApiSchemaFormatterPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi\BackendApiApplicationProviderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi\BackendCustomRoutesContextExpanderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi\BackendHostContextExpanderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\DocumentationGeneratorApi\BackendResourcesContextExpanderPlugin;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\Plugin\DocumentationGeneratorApi\AuthorizationContextExpanderPlugin as BackendAuthorizationContextExpanderPlugin;
use Spryker\Glue\GlueJsonApiConvention\Plugin\DocumentationGeneratorApi\JsonApiSchemaFormatterPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi\StorefrontApiApplicationProviderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi\StorefrontCustomRoutesContextExpanderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi\StorefrontHostContextExpanderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\DocumentationGeneratorApi\StorefrontResourcesContextExpanderPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationAuthorizationConnector\Plugin\DocumentationGeneratorApi\AuthorizationContextExpanderPlugin as StorefrontAuthorizationContextExpanderPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\Plugin\GlueStorefrontApiApplication\RelationshipPluginsContextExpanderPlugin;

class DocumentationGeneratorApiDependencyProvider extends SprykerDocumentationGeneratorApiDependencyProvider
{
    /**
     * @var string
     */
    protected const GLUE_BACKEND_API_APPLICATION_NAME = 'backend';

    /**
     * @var string
     */
    protected const GLUE_STOREFRONT_API_APPLICATION_NAME = 'storefront';

    /**
     * @return array<\Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\ApiApplicationProviderPluginInterface>
     */
    protected function getApiApplicationProviderPlugins(): array
    {
        return [
            new StorefrontApiApplicationProviderPlugin(),
            new BackendApiApplicationProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\SchemaFormatterPluginInterface>
     */
    protected function getSchemaFormatterPlugins(): array
    {
        return [
            new DocumentationGeneratorOpenApiSchemaFormatterPlugin(),
            new JsonApiSchemaFormatterPlugin(),
            new RestApiSchemaFormatterPlugin(),
        ];
    }

    /**
     * @param \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface $contextExpanderCollection
     *
     * @return \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface
     */
    protected function getContextExpanderPlugins(ContextExpanderCollectionInterface $contextExpanderCollection): ContextExpanderCollectionInterface
    {
        $apiApplications = [];
        foreach ($this->getApiApplicationProviderPlugins() as $apiApplicationProviderPlugin) {
            $apiApplications[] = $apiApplicationProviderPlugin->getName();
        }
        $contextExpanderCollection->addApplications($apiApplications);

        $contextExpanderCollection->addExpander(new StorefrontResourcesContextExpanderPlugin(), [static::GLUE_STOREFRONT_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new StorefrontCustomRoutesContextExpanderPlugin(), [static::GLUE_STOREFRONT_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new RelationshipPluginsContextExpanderPlugin(), [static::GLUE_STOREFRONT_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new BackendResourcesContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new BackendCustomRoutesContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new ControllerAnnotationsContextExpanderPlugin());
        $contextExpanderCollection->addExpander(new CustomRouteControllerAnnotationsContextExpanderPlugin());
        $contextExpanderCollection->addExpander(new RelationshipPluginAnnotationsContextExpanderPlugin(), [static::GLUE_STOREFRONT_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new BackendHostContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new StorefrontHostContextExpanderPlugin(), [static::GLUE_STOREFRONT_API_APPLICATION_NAME]);

        return $contextExpanderCollection;
    }

    /**
     * @return \Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\ContentGeneratorStrategyPluginInterface
     */
    protected function getContentGeneratorStrategyPlugin(): ContentGeneratorStrategyPluginInterface
    {
        return new DocumentationGeneratorOpenApiContentGeneratorStrategyPlugin();
    }
}

```

{% info_block infoBox %}

If the second parameter `array $apiApplications` for `$contextExpanderCollection->addExpander()` inside `DocumentationGeneratorApiDependencyProvider::getContextExpanderPlugins()` is not passed, the expander will apply for all existing applications.

{% endinfo_block %}

{% info_block warningBox “Verification” %}

In order to make sure that `StorefrontApiApplicationProviderPlugin` and `BackendApiApplicationProviderPlugin` are setup correctly,
attempt to generate the documentation for `storerfront` or `backend`. Do so by passing the optional `--application` parameter:
```
vendor/bin/glue api:generate:documentation --application storefront
```
Make sure only the "storefront" application documentation was generated.

***

Make sure `DocumentationGeneratorOpenApiSchemaFormatterPlugin` works by inspecting the content of the generated documentation.
It should contain relevant information in the following sections:
* info
* servers
* tags

***

A sure sign that `JsonApiSchemaFormatterPlugin` and `RestApiSchemaFormatterPlugin` are setup correctly are the content types on the responses of the paths being correct.

***

`ContextExpanderPlugin`s are responsible for adding parts of the API data into the documentation generation context.

{% endinfo_block %}
```

For more details, see [Document Glue API endpoints](/docs/dg/dev/glue-api/{{site.version}}/document-glue-api-endpoints.html).
