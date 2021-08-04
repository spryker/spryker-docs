---
title: DocumentationGeneratorRestApi Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/documentationgeneratorrestapi-feature-integration
redirect_from:
  - /v2/docs/documentationgeneratorrestapi-feature-integration
  - /v2/docs/en/documentationgeneratorrestapi-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201903.0	 | Glue Application Feature Integration |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/documentation-generator-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox %}
Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected directory |
| --- | --- |
| `DocumentationGeneratorRestApi` | `vendor/spryker/documentation-generator-rest-api` |

### 2) Set Up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes have occurred:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `PathMethodDataTransfer` | class | created | `src/Generated/Shared/Transfer/PathMethodDataTransfer` |
| `PathParameterTransfer` | class | created | `src/Generated/Shared/Transfer/PathParameterTransfer` |
| `PathSchemaDataTransfer` | class | created | `src/Generated/Shared/Transfer/PathSchemaDataTransfer` |
| `SchemaDataTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaDataTransfer` |
| `SchemaPropertyTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaPropertyTransfer` |
| `SecuritySchemeTransfer` | class | created | `src/Generated/Shared/Transfer/SecuritySchemeTransfer` |
| `PathMethodComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathMethodComponentTransfer` |
| `PathParameterComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathParameterComponentTransfer` |
| `PathRequestComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathRequestComponentTransfer` |
| `PathRequestComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathRequestComponentTransfer` |
| `PathResponseComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathResponseComponentTransfer` |
| `SchemaComponentTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaComponentTransfer` |
| `SchemaPropertyComponentTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaPropertyComponentTransfer` |
| `SecuritySchemeComponentTransfer` | class | created | `src/Generated/Shared/Transfer/SecuritySchemeComponentTransfer` |
| `PathAnnotationsTransfer` | class | created | `src/Generated/Shared/Transfer/PathAnnotationsTransfer` |
| `AnnotationTransfer` | class | created | `src/Generated/Shared/Transfer/AnnotationTransfer` |

### 3) Set Up Behavior
#### Enable console command
Activate the console command provided by the module:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GenerateRestApiDocumentationConsole` | Registers the `rest-api:generate:documentation` console command. | None | `Spryker\Zed\DocumentationGeneratorRestApi\Communication\Console` |

<details open>
<summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>
    
```php
<?php
  
namespace Pyz\Zed\Console;
 
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DocumentationGeneratorRestApi\Communication\Console\GenerateRestApiDocumentationConsole;
use Spryker\Zed\Kernel\Container;
 
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new GenerateRestApiDocumentationConsole(),
        ];
 
        return $commands;
    }
}
```

</br>
</details>

{% info_block warningBox %}
To verify that `GenerateRestApiDocumentationConsole` is activated, make sure that the `vendor/bin/console rest-api:generate:documentation` console command exists by running  `vendor/bin/console | grep rest-api:generate`
{% endinfo_block %}

#### Enable documentation generator
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ResourceRoutePluginsProviderPlugin` | Registers the enabled `ResourceRoute` plugins. | None | `Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi` |
| `ResourceRelationshipCollectionProviderPlugin` | Registers the enabled `ResourceRelationship` plugin collections. | None | `Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi` |

<details open>
<summary>src/Pyz/Zed/DocumentationGeneratorRestApi/DocumentationGeneratorRestApiDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DocumentationGeneratorRestApi;
 
use Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi\ResourceRelationshipCollectionProviderPlugin;
use Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi\ResourceRoutePluginsProviderPlugin;
use Spryker\Zed\DocumentationGeneratorRestApi\DocumentationGeneratorRestApiDependencyProvider as SprykerDocumentationGeneratorRestApiDependencyProvider;
 
class DocumentationGeneratorRestApiDependencyProvider extends SprykerDocumentationGeneratorRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\DocumentationGeneratorRestApiExtension\Dependency\Plugin\ResourceRoutePluginsProviderPluginInterface[]
     */
    protected function getResourceRoutePluginProviderPlugins(): array
    {
        return [
            new ResourceRoutePluginsProviderPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\DocumentationGeneratorRestApiExtension\Dependency\Plugin\ResourceRelationshipCollectionProviderPluginInterface[]
     */
    protected function getResourceRelationshipCollectionProviderPlugins(): array
    {
        return [
            new ResourceRelationshipCollectionProviderPlugin(),
        ];
    }
}
```

</br>
</details>

{% info_block warningBox %}
To make sure that everything is set up correctly, run the command `vendor/bin/console rest-api:generate:documentation` and verify that a specification file was generated successfully. By default, generated files are located at `src/Generated/Glue/Specification/spryker_rest_api.schema.yml`.
{% endinfo_block %}

*Last review date: Jul 09, 2019*

<!--by Ahmed Saaba and Volodymyr Volkov-->
