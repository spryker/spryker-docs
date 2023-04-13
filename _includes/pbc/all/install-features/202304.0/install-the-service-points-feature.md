This document describes how to integrate the Service Points feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points feature.
To start feature integration, integrate the required features:

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME         | VERSION          | INTEGRATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |  |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/service-points: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                        |
|-------------------------|-------------------------------------------|
| ServicePoint            | vendor/spryker/service-point              |
| ServicePointDataImport  | vendor/spryker/service-point-data-import  |
| ServicePointsBackendApi | vendor/spryker/service-points-backend-api |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY         | TYPE  | EVENT   |
|-------------------------|-------|---------|
| spy_service_point       | table | created |
| spy_service_point_store | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that propel entities have been generated successfully by checking their existence. Also, make generated entity classes extending respective Spryker core classes.

| CLASS NAMESPACE                                             | EXTENDS                                                                        |
|-------------------------------------------------------------|--------------------------------------------------------------------------------|
| \Orm\Zed\ServicePoint\Persistence\SpyServicePoint           | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePoint           |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointQuery      | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointQuery      |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointStore      | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointStore      |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointStoreQuery | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointStoreQuery |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                       | TYPE  | EVENT   | PATH                                                         |
|--------------------------------|-------|---------|--------------------------------------------------------------|
| ServicePoint                   | class | created | src/Generated/Shared/Transfer/ServicePoint                   |
| ServicePointCollection         | class | created | src/Generated/Shared/Transfer/ServicePointCollection         |
| ServicePointCollectionRequest  | class | created | src/Generated/Shared/Transfer/ServicePointCollectionRequest  |
| ServicePointCollectionResponse | class | created | src/Generated/Shared/Transfer/ServicePointCollectionResponse |
| ServicePointCriteria           | class | created | src/Generated/Shared/Transfer/ServicePointCriteria           |
| ServicePointConditions         | class | created | src/Generated/Shared/Transfer/ServicePointConditions         |
| ApiServicePointsAttributes     | class | created | src/Generated/Shared/Transfer/ApiServicePointsAttributes     |
| StoreRelation                  | class | created | src/Generated/Shared/Transfer/StoreRelation                  |
| Store                          | class | created | Generated/Shared/Transfer/Store                              |
| Error                          | class | created | Generated/Shared/Transfer/Error                              |
| Sort                           | class | created | Generated/Shared/Transfer/Sort                               |
| Pagination                     | class | created | Generated/Shared/Transfer/Pagination                         |
| ErrorCollection                | class | created | Generated/Shared/Transfer/ErrorCollection                    |
| DataImporterConfiguration      | class | created | Generated/Shared/Transfer/DataImporterConfiguration          |
| DataImporterReport             | class | created | Generated/Shared/Transfer/DataImporterReport                 |

{% endinfo_block %}

### 3) Set up configuration

1. To make the `service-points` resource protected, adjust the protected paths configuration:

**src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php**

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
    {
        return [
            // ...
            '/\/service-points(?:\/[^\/]+)?\/?$/' => [
                'isRegularExpression' => true,
            ],
        ];
    }
}
```

### 4) Import service points

1. Prepare your data according to your requirements using our demo data:

**data/import/common/common/service_point.csv**

```csv
key,name,is_active
sp1,Spryker Main Store,1
sp2,Spryker Berlin Store,1
```

| COLUMN    | REQUIRED? | DATA TYPE | DATA EXAMPLE       | DATA EXPLANATION                        |
|-----------|-----------|-----------|--------------------|-----------------------------------------|
| key       | mandatory | string    | sp1                | Unique key of the service point.        |
| name      | mandatory | string    | Spryker Main Store | Name of the service point.              |
| is_active | mandatory | bool      | 0                  | Defines if the service point is active. |

**data/import/common/{{store}}/service_point_store.csv**

```csv
service_point_key,store_name
sp1,DE
sp2,DE
```

| COLUMN            | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                        |
|-------------------|-----------|-----------|--------------|-----------------------------------------|
| service_point_key | mandatory | string    | sp1          | Unique key of the service point.        |
| store_name        | mandatory | string    | DE           | Name of the store to make relation for. |

2. Enable data imports at your configuration file, e.g.:

**data/import/local/full_EU.yml**

```yml
    - data_entity: service-point
      source: data/import/common/common/service_point.csv
    - data_entity: service-point-store
      source: data/import/common/{{store}}/service_point_store.csv
```

3. Register the following data import plugins:

| PLUGIN                            | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                                           |
|-----------------------------------|---------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| ServicePointDataImportPlugin      | Imports service points data into the database.                | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |
| ServicePointStoreDataImportPlugin | Imports service point store relations data into the database. | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ServicePointDataImportPlugin(),
            new ServicePointStoreDataImportPlugin(),
        ];
    }
}
```

4. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ServicePointDataImport\ServicePointDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ...
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ServicePointDataImportConfig::IMPORT_TYPE_SERVICE_POINT),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ServicePointDataImportConfig::IMPORT_TYPE_SERVICE_POINT_STORE),
        ];

        return $commands;
    }
}
```

5. Import data:

```bash
console data:import service-point
console data:import service-point-store
```

{% info_block warningBox “Verification” %}

Make sure that entities were imported to `spy_service_point` and `spy_service_point_store` database tables respectively.

{% endinfo_block %}

### 5) Add translations

1. Append glossary according to your configuration:

```csv
service_point.validation.service_point_key_exists,A service point with the same key already exists.,en_US
service_point.validation.service_point_key_exists,Es existiert bereits eine Servicestelle mit dem gleichen Schlüssel.,de_DE
service_point.validation.service_point_key_is_not_unique,A service point with the same key already exists in request.,en_US
service_point.validation.service_point_key_is_not_unique,Es existiert bereits eine Servicestelle mit dem gleichen Schlüssel in einer Abfrage.,de_DE
service_point.validation.service_point_key_wrong_length,A service point key must have length from %min% to %max% characters.,en_US
service_point.validation.service_point_key_wrong_length,Ein Servicestellen-Schlüssel muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_name_wrong_length,A service point name must have length from %min% to %max% characters.,en_US
service_point.validation.service_point_name_wrong_length,Ein Servicestellen-Name muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.store_does_not_exist,Store with name '%name%' does not exist.,en_US
service_point.validation.store_does_not_exist,Store mit dem Namen '%name%' existiert nicht.,de_DE
service_point.validation.service_point_entity_not_found,Service point entity was not found.,en_US
service_point.validation.service_point_entity_not_found,Servicestelle wurde nicht gefunden.,de_DE
service_point.validation.wrong_request_body,Wrong request body.,en_US
service_point.validation.wrong_request_body,Falscher Anforderungstext.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 6) Set up behavior

4. To enable the Backend API, register the plugin:

| PLUGIN                             | SPECIFICATION                            | PREREQUISITES | NAMESPACE                                                                                            |
|------------------------------------|------------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| ServicePointsBackendResourcePlugin | Registers the `service-points` resource. |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicePointsBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new ServicePointsBackendResourcePlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

1. Make sure that you can send the following requests:

    * `POST https://glue-backend.mysprykershop.com/service-points`
         ```json
            {
                "data": {
                    "type": "service-points",
                    "attributes": {
                        "name": "Some Service Point",
                        "key": "ssp",
                        "isActive": "true",
                        "stores": ["DE", "AT"]
                    }
                }
            }
         ```
    * `PATCH https://glue-backend.mysprykershop.com/service-points/{{service-point-uuid}}`
       ```json
          {
              "data": {
                  "type": "service-points",
                  "attributes": {
                      "name": "Another Name"
                  }
              }
          }
       ```
    * `GET https://glue-backend.mysprykershop.com/service-points/`
    * `GET https://glue-backend.mysprykershop.com/service-points/{{service-point-uuid}}`

{% endinfo_block %}
