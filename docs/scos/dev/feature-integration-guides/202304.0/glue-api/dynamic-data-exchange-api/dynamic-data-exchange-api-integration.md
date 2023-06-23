---
title: Dynamic Data Exchange API integration
description: Integrate the Dynamic Data Exchange API into a Spryker project.
last_updated: June 22, 2023
template: feature-integration-guide-template
---

This document describes how to integrate the Dynamic Data Exchange API into a Spryker project.

---

The Dynamic Data Exchange (DDE) API is a powerful tool that allows seamless interaction with your database.

You can easily access your data by sending requests to the API endpoint. 

It enables you to retrieve, create, update, and manage data in a flexible and efficient manner.

## Install feature core

Follow the steps below to install the Dynamic Data Exchange API core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Glue Backend Api Application | {{page.version}} | [Glue API - Glue Storefront and Backend API applications integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-storefront-and-backend-api-applications-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/dynamic-entity-backend-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| DynamicEntity | vendor/spryker/dynamic-entity |
| DynamicEntityBackendApi | vendor/spryker/dynamic-entity-backend-api |

{% endinfo_block %}

### 2) Set up the configuration

1. Move the following commands into `demodata` section after the data import step:

**config/install/docker.yml**

```yaml
demodata:

    ...
    
    controller-cache-warmup:
        command: 'vendor/bin/glue glue-api:controller:cache:warm-up'

    api-generate-documentation:
        command: 'vendor/bin/glue api:generate:documentation'
```

2. By default, Dynamic Data Exchange API sends a request to `/dynamic-entity/{entity-alias}`. 
   Adjust `DynamicEntityBackendApiConfig` in order to replace `dynamic-entity` part with another one:

**src/Pyz/Glue/DynamicEntityBackendApi/DynamicEntityBackendApiConfig.php**

```php
<?php

namespace Pyz\Glue\DynamicEntityBackendApi;

use Spryker\Glue\DynamicEntityBackendApiDynamicEntityBackendApiConfig as SprykerDynamicEntityBackendApiConfig;

class DynamicEntityBackendApiConfig extends SprykerDynamicEntityBackendApiConfig
{
    /**
     * Specification:
     * - Returns a route prefix value for a dynamic entity.
     *
     * @api
     *
     * @return string
     */
    public function getRoutePrefix(): string
    {
        return 'your-route-prefix';
    }
}
```

3. The Data Exchange API provides a logging mechanism to capture important information about requests and any thrown exceptions. 
   The logging is enabled by default. Adjust `DynamicEntityBackendApiConfig` in order to disable this option or change a path for the log file.

**src/Pyz/Glue/DynamicEntityBackendApi/DynamicEntityBackendApiConfig.php**

```php
<?php

namespace Pyz\Glue\DynamicEntityBackendApi;

use Spryker\Glue\DynamicEntityBackendApiDynamicEntityBackendApiConfig as SprykerDynamicEntityBackendApiConfig;

class DynamicEntityBackendApiConfig extends SprykerDynamicEntityBackendApiConfig
{
    /**
     * Specification:
     * - Returns absolute file path for dynamic entities logs.
     *
     * @api
     *
     * @return string
     */
    public function getLogFilepath(): string
    {
        return 'your-log-filepath.log';
    }

    /**
     * Specification:
     * - Defines whether logging for dynamic entities is enabled.
     *
     * @api
     *
     * @return bool
     */
    public function isLoggingEnabled(): bool
    {
        return true;
    }
}
```

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

Append the following Propel classes:

```php
<?php

namespace Orm\Zed\DynamicEntity\Persistence;

use Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfiguration as BaseSpyDynamicEntityConfiguration;

/**
 * Skeleton subclass for representing a row from the 'spy_dynamic_entity_configuration' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements. This class will only be generated as
 * long as it does not already exist in the output directory.
 */
class SpyDynamicEntityConfiguration extends BaseSpyDynamicEntityConfiguration
{
}
```

```php
<?php

namespace Orm\Zed\DynamicEntity\Persistence;

use Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfigurationQuery as BaseSpyDynamicEntityConfigurationQuery;

/**
 * Skeleton subclass for performing query and update operations on the 'spy_dynamic_entity_configuration' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements. This class will only be generated as
 * long as it does not already exist in the output directory.
 */
class SpyDynamicEntityConfigurationQuery extends BaseSpyDynamicEntityConfigurationQuery
{
}
```

{% info_block warningBox "Verification" %}

Ensure that you've triggered the following changes by checking the database:

| DATABASE ENTITY | TYPE |
| --- | --- |
| spy_dynamic_entity_configuration | table |

Add configurations for dynamic entities. In order to do that follow the link [How to configure Dynamic Data Exchange API](/docs/scos/dev/glue-api-guides/{{page.version}}/dynamic-data-exchange-api/how-to-guides/how-to-configure-dynamic-data-exchange-api.html)  

Ensure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ApiApplicationSchemaContext | class | created | src/Generated/Shared/Transfer/ApiApplicationSchemaContextTransfer.php | 
| DynamicApiDefinition | class | created | src/Generated/Shared/Transfer/DynamicApiDefinitionTransfer.php |
| DynamicEntity | class | created | src/Generated/Shared/Transfer/DynamicEntityTransfer.php |
| DynamicEntityCollection | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionTransfer.php |
| DynamicEntityCollectionDeleteCriteria | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionDeleteCriteriaTransfer.php |
| DynamicEntityCollectionRequest | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionRequestTransfer.php |
| DynamicEntityCollectionResponse | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionResponseTransfer.php |
| DynamicEntityConfiguration | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationTransfer.php |
| DynamicEntityConfigurationCollection | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationCollectionTransfer.php |
| DynamicEntityConfigurationConditions | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationConditionsTransfer.php |
| DynamicEntityConfigurationCriteria | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationCriteriaTransfer.php |
| DynamicEntityConditions | class | created | src/Generated/Shared/Transfer/DynamicEntityConditionsTransfer.php |
| DynamicEntityCriteria | class | created | src/Generated/Shared/Transfer/DynamicEntityCriteriaTransfer.php |
| DynamicEntityDefinition | class | created | src/Generated/Shared/Transfer/DynamicEntityDefinitionTransfer.php |
| DynamicEntityFieldCondition | class | created | src/Generated/Shared/Transfer/DynamicEntityFieldConditionTransfer.php |
| DynamicEntityFieldDefinition | class | created | src/Generated/Shared/Transfer/DynamicEntityFieldDefinitionTransfer.php |
| DynamicEntityFieldValidation | class | created | src/Generated/Shared/Transfer/DynamicEntityFieldValidationTransfer.php |
| Error | class | created | src/Generated/Shared/Transfer/ErrorTransfer.php |
| GlueError | class | created | src/Generated/Shared/Transfer/GlueErrorTransfer.php |
| GlueFilter | class | created | src/Generated/Shared/Transfer/GlueFilterTransfer.php |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| GlueResource | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php |
| GlueResponse | class | created | src/Generated/Shared/Transfer/GlueResponseTransfer.php |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer.php |

{% endinfo_block %}

### 4) Add translations

Append glossary according to your language configuration:

**src/data/import/glossary.csv**

```yaml
dynamic_entity.validation.invalid_data_format,"Invalid or missing data format. Please ensure that the data is provided in the correct format. Example request body: {'data':[{...},{...},..]}",en_US
dynamic_entity.validation.invalid_data_format,"Ungültiges oder fehlendes Datenformat. Stellen Sie bitte sicher, dass die Daten im richtigen Format bereitgestellt werden. Beispiel Anforderungskörper: {'data':[{...},{...}]}",de_DE
dynamic_entity.validation.persistence_failed,"Failed to persist the data. Please verify the provided data and try again.",en_US
dynamic_entity.validation.persistence_failed,"Das Speichern der Daten ist fehlgeschlagen. Bitte überprüfen Sie die bereitgestellten Daten und versuchen Sie es erneut.",de_DE
dynamic_entity.validation.model_does_not_exist,"The model does not exist. Check if the requested table alias is correct or run `console propel:model:build`.",en_US
dynamic_entity.validation.model_does_not_exist,"Das Modell existiert nicht. Überprüfen Sie, ob der angeforderte Tabellenalias korrekt ist oder führen Sie `console propel:model:build` aus.",de_DE
dynamic_entity.validation.entity_does_not_exist,"The entity could not be found in the database.",en_US
dynamic_entity.validation.entity_does_not_exist,"Die Entität konnte in der Datenbank nicht gefunden werden.",de_DE
dynamic_entity.validation.required_data_is_missing_or_forbidden,"Some required data is missing or provided data cannot be modified. Please verify the request and try again.",en_US
dynamic_entity.validation.required_data_is_missing_or_forbidden,"Einige erforderliche Daten fehlen oder die bereitgestellten Daten können nicht geändert werden. Bitte überprüfen Sie die Anfrage und versuchen Sie es erneut.",de_DE
dynamic_entity.validation.config_is_not_found,"Configuration was not found in the database.",en_US
dynamic_entity.validation.config_is_not_found,"Die Konfiguration wurde in der Datenbank nicht gefunden.",de_DE
dynamic_entity.validation.invalid_field_type,"Invalid data type for field: %fieldName%",en_US
dynamic_entity.validation.invalid_field_type,"Ungültiger Datentyp: %fieldName%",de_DE
dynamic_entity.validation.invalid_field_value,"Invalid data value for field. Field rules: %validationRules%",en_US
dynamic_entity.validation.invalid_field_value,"Ungültiger Datenwert für das Feld. Feldregeln: %validationRules%",de_DE
dynamic_entity.validation.required_field_is_missing,"The required field must not be empty. Field: '%fieldName%'",en_US
dynamic_entity.validation.required_field_is_missing,"Das erforderlich Feld darf nicht leer sein. Feld: '%fieldName%'",de_DE
```

{% info_block infoBox "Info" %}

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data in the database has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| PropelApplicationPlugin | Initializes `PropelOrm` to be used within Zed. | Spryker\Zed\Propel\Communication\Plugin\Application |
| DynamicEntityApiSchemaContextExpanderPlugin | Adds dynamic entities to the documentation generation context. | Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorOpenApi |
| DynamicEntityOpenApiSchemaFormatterPlugin | Formats dynamic entities of the Open API 3 schema: info, components, paths, tags. | Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorOpenApi |
| DynamicEntityRouteProviderPlugin | Adds routes for the provided dynamic entity to the RouteCollection. | Spryker\Glue\DynamicEntityBackendApi\Plugin |
| DynamicEntityProtectedPathCollectionExpanderPlugin | Expands a list of protected endpoints with dynamic entity endpoints. | Spryker\Glue\DynamicEntityBackendApi\Plugin\GlueBackendApiApplicationAuthorizationConnector |

<details open>
<summary markdown='span'>src/Pyz/Glue/Console/ConsoleDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\Console;

use Spryker\Glue\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Glue\Kernel\Container;
use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        $applicationPlugins[] = new PropelApplicationPlugin();

        return $applicationPlugins;
    }
}
```
</details>

<details open>
<summary markdown='span'>src/Pyz/Glue/DocumentationGeneratorApi/DocumentationGeneratorApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorApi;

use Spryker\Glue\DocumentationGeneratorApi\DocumentationGeneratorApiDependencyProvider as SprykerDocumentationGeneratorApiDependencyProvider;
use Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface;
use Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorOpenApi\DynamicEntityApiSchemaContextExpanderPlugin;

class DocumentationGeneratorApiDependencyProvider extends SprykerDocumentationGeneratorApiDependencyProvider
{
    /**
     * @var string
     */
    protected const GLUE_BACKEND_API_APPLICATION_NAME = 'backend';	    
    
    /**
     * @param \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface $contextExpanderCollection	     
     *	     
     * @return \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface	     
     */
    protected function getContextExpanderPlugins(ContextExpanderCollectionInterface $contextExpanderCollection): ContextExpanderCollectionInterface	    
    {	    
        ...
        
        $contextExpanderCollection->addExpander(new DynamicEntityApiSchemaContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);
    }
}
```
</details>

<details open>
<summary markdown='span'>src/Pyz/Glue/DocumentationGeneratorOpenApi/DocumentationGeneratorOpenApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorOpenApi;

use Spryker\Glue\DocumentationGeneratorOpenApi\DocumentationGeneratorOpenApiDependencyProvider as SprykerDocumentationGeneratorOpenApiDependencyProvider;
use Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorOpenApi\DynamicEntityOpenApiSchemaFormatterPlugin;

class DocumentationGeneratorOpenApiDependencyProvider extends SprykerDocumentationGeneratorOpenApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\DocumentationGeneratorOpenApiExtension\Dependency\Plugin\OpenApiSchemaFormatterPluginInterface>
     */
    protected function getOpenApiSchemaFormatterPlugins(): array
    {
        return [
            new DynamicEntityOpenApiSchemaFormatterPlugin(),
        ];
    }
}
```
</details>

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\DynamicEntityBackendApi\Plugin\DynamicEntityRouteProviderPlugin;
use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>	    
     */	    
    protected function getRouteProviderPlugins(): array	    
    {	    
        return [
            new DynamicEntityRouteProviderPlugin(),
        ];
    }	    
}
```
</details>

{% info_block warningBox "Verification" %}

If everything is set up correctly, you can operate with the data. Follow the link to discover how to perform it [x] TODO: Add How-to request API endpoints

{% endinfo_block %}
