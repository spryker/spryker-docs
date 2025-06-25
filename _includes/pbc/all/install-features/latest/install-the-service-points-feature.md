

This document describes how to install the Service Points feature.

## Install feature core

Follow the steps below to install the Service Points feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                           |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/service-points: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                             |
|-------------------------|------------------------------------------------|
| ServicePoint            | vendor/spryker/service-point                   |
| ServicePointDataImport  | vendor/spryker/service-point-data-import       |
| ServicePointsBackendApi | vendor/spryker/service-points-backend-api      |
| ServicePointSearch      | vendor/spryker/service-point-search            |
| ServicePointsRestApi    | vendor/spryker/service-points-rest-api         |
| ServicePointStorage     | vendor/spryker/service-point-storage           |
| ServicePointWidget      | vendor/spryker/service-point-widget            |
| SalesServicePoint       | vendor/spryker/sales-service-point             |
| SalesServicePointGui    | vendor/spryker/sales-service-point-gui         |
| SalesServicePointWidget | vendor/spryker-shop/sales-service-point-widget |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events.

| AFFECTED ENTITY           | TRIGGERED EVENTS                                                                                                              |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| spy_service_point         | Entity.spy_service_point.create<br>Entity.spy_service_point.update<br>Entity.spy_service_point.delete                         |
| spy_service_point_address | Entity.spy_service_point_address.create<br>Entity.spy_service_point_address.update<br>Entity.spy_service_point_address.delete |
| spy_service_point_store   | Entity.spy_service_point_store.create<br>Entity.spy_service_point_store.update<br>Entity.spy_service_point_store.delete       |
| spy_service_type          | Entity.spy_service_type.create<br>Entity.spy_service_type.update<br>Entity.spy_service_type.delete                            |

**src/Pyz/Zed/ServicePoint/Persistence/Propel/Schema/spy_service_point.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ServicePoint\Persistence" package="src.Orm.Zed.ServicePoint.Persistence">

   <table name="spy_service_point">
      <behavior name="event">
         <parameter name="spy_service_point_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_service_point_address">
      <behavior name="event">
         <parameter name="spy_service_point_address_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_service_point_store">
      <behavior name="event">
         <parameter name="spy_service_point_store_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_service">
      <behavior name="event">
         <parameter name="spy_service_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_service_type">
      <behavior name="event">
         <parameter name="spy_service_type_all" column="*"/>
      </behavior>
   </table>

</database>
```

2. Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY                     | TYPE   | EVENT   |
|-------------------------------------|--------|---------|
| spy_service_point                   | table  | created |
| spy_service_point_address           | table  | created |
| spy_service                         | table  | created |
| spy_service_point_store             | table  | created |
| spy_service_point_search            | table  | created |
| spy_service_point_storage           | table  | created |
| spy_service_type                    | table  | created |
| spy_region.uuid                     | column | created |
| spy_sales_order_item_service_point  | table  | created |

- Make sure propel entities have been generated successfully by checking their existence.
- Make sure the existing Propel classes have been extended to include the new added columns.

| CLASS NAMESPACE                                                           | EXTENDS                                                                                      |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| \Orm\Zed\ServicePoint\Persistence\SpyServicePoint                         | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePoint                         |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointAddress                  | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointAddress                  |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointAddressQuery             | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointAddressQuery             |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointQuery                    | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointQuery                    |
| \Orm\Zed\ServicePoint\Persistence\SpyService                              | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyService                              |
| \Orm\Zed\ServicePoint\Persistence\SpyServiceQuery                         | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServiceQuery                         |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointAddressQuery             | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointAddressQuery             |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointStore                    | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointStore                    |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointStoreQuery               | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointStoreQuery               |
| \Orm\Zed\ServicePoint\Persistence\SpyServiceType                          | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServiceType                          |
| \Orm\Zed\ServicePoint\Persistence\SpyServiceTypeQuery                     | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServiceTypeQuery                     |
| \Orm\Zed\ServicePointSearch\Persistence\SpyServicePointSearch             | \Spryker\Zed\ServicePointSearch\Persistence\Propel\AbstractSpyServicePointSearch             |
| \Orm\Zed\ServicePointSearch\Persistence\SpyServicePointSearchQuery        | \Spryker\Zed\ServicePointSearch\Persistence\Propel\AbstractSpyServicePointSearchQuery        |
| \Orm\Zed\ServicePointStorage\Persistence\SpyServicePointStorage           | \Spryker\Zed\ServicePointStorage\Persistence\Propel\AbstractSpyServicePointStorage           |
| \Orm\Zed\ServicePointStorage\Persistence\SpyServicePointStorageQuery      | \Spryker\Zed\ServicePointStorage\Persistence\Propel\AbstractSpyServicePointStorageQuery      |
| \Orm\Zed\ServicePointStorage\Persistence\SpyServiceTypeStorage            | \Spryker\Zed\ServicePointStorage\Persistence\Propel\AbstractSpyServiceTypeStorage            |
| \Orm\Zed\ServicePointStorage\Persistence\SpyServiceTypeStorageQuery       | \Spryker\Zed\ServicePointStorage\Persistence\Propel\AbstractSpyServiceTypeStorageQuery       |
| \Orm\Zed\SalesServicePoint\Persistence\SpySalesOrderItemServicePoint      | \Spryker\Zed\SalesServicePoint\Persistence\Propel\AbstractSpySalesOrderItemServicePoint      |
| \Orm\Zed\SalesServicePoint\Persistence\SpySalesOrderItemServicePointQuery | \Spryker\Zed\SalesServicePoint\Persistence\Propel\AbstractSpySalesOrderItemServicePointQuery |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                  | TYPE  | EVENT   | PATH                                                                            |
|-------------------------------------------|-------|---------|---------------------------------------------------------------------------------|
| ServicePoint                              | class | created | src/Generated/Shared/Transfer/ServicePointTransfer                              |
| ServicePointCollection                    | class | created | src/Generated/Shared/Transfer/ServicePointCollectionTransfer                    |
| ServicePointCollectionRequest             | class | created | src/Generated/Shared/Transfer/ServicePointCollectionRequestTransfer             |
| ServicePointCollectionResponse            | class | created | src/Generated/Shared/Transfer/ServicePointCollectionResponseTransfer            |
| ServicePointCriteria                      | class | created | src/Generated/Shared/Transfer/ServicePointCriteriaTransfer                      |
| ServicePointConditions                    | class | created | src/Generated/Shared/Transfer/ServicePointConditionsTransfer                    |
| ServicePointSearchConditions              | class | created | src/Generated/Shared/Transfer/ServicePointSearchConditions                      |
| ServicePointsBackendApiAttributes         | class | created | src/Generated/Shared/Transfer/ServicePointsBackendApiAttributesTransfer         |
| ServiceTypesBackendApiAttributes          | class | created | src/Generated/Shared/Transfer/ServiceTypesBackendApiAttributesTransfer          |
| ServicesBackendApiAttributes              | class | created | src/Generated/Shared/Transfer/ServicesBackendApiAttributesTransfer              |
| ServicesRequestBackendApiAttributes       | class | created | src/Generated/Shared/Transfer/ServicesRequestBackendApiAttributesTransfer       |
| ServicePointAddressesBackendApiAttributes | class | created | src/Generated/Shared/Transfer/ServicePointAddressesBackendApiAttributesTransfer |
| StoreRelation                             | class | created | src/Generated/Shared/Transfer/StoreRelationTransfer                             |
| Store                                     | class | created | src/Generated/Shared/Transfer/StoreTransfer                                     |
| Error                                     | class | created | src/Generated/Shared/Transfer/ErrorTransfer                                     |
| Sort                                      | class | created | src/Generated/Shared/Transfer/SortTransfer                                      |
| Pagination                                | class | created | src/Generated/Shared/Transfer/PaginationTransfer                                |
| ErrorCollection                           | class | created | src/Generated/Shared/Transfer/ErrorCollectionTransfer                           |
| DataImporterConfiguration                 | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer                 |
| DataImporterReport                        | class | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                        |
| CountryCriteria                           | class | created | src/Generated/Shared/Transfer/CountryCriteriaTransfer                           |
| CountryConditions                         | class | created | src/Generated/Shared/Transfer/CountryConditionsTransfer                         |
| Country                                   | class | created | src/Generated/Shared/Transfer/CountryTransfer                                   |
| CountryCollection                         | class | created | src/Generated/Shared/Transfer/CountryCollectionTransfer                         |
| Region                                    | class | created | src/Generated/Shared/Transfer/RegionTransfer                                    |
| ServicePointAddressCollection             | class | created | src/Generated/Shared/Transfer/ServicePointAddressCollectionTransfer             |
| ServicePointAddressCollectionRequest      | class | created | src/Generated/Shared/Transfer/ServicePointAddressCollectionRequestTransfer      |
| ServicePointAddressCollectionResponse     | class | created | src/Generated/Shared/Transfer/ServicePointAddressCollectionResponseTransfer     |
| ServicePointAddressCriteria               | class | created | src/Generated/Shared/Transfer/ServicePointAddressCriteriaTransfer               |
| ServicePointAddressConditions             | class | created | src/Generated/Shared/Transfer/ServicePointAddressConditionsTransfer             |
| ServicePointAddress                       | class | created | src/Generated/Shared/Transfer/ServicePointAddressTransfer                       |
| GlueRelationship                          | class | created | src/Generated/Shared/Transfer/GlueRelationshipTransfer                          |
| ServicePointSearchCollection              | class | created | src/Generated/Shared/Transfer/ServicePointSearchCollectionTransfer              |
| ServicePointSearch                        | class | created | src/Generated/Shared/Transfer/ServicePointSearchTransfer                        |
| ServicePointSearchRequest                 | class | created | src/Generated/Shared/Transfer/ServicePointSearchRequestTransfer                 |
| ServiceCollectionRequest                  | class | created | src/Generated/Shared/Transfer/ServiceCollectionRequestTransfer                  |
| ServiceCollectionResponse                 | class | created | src/Generated/Shared/Transfer/ServiceCollectionResponseTransfer                 |
| ServiceCollection                         | class | created | src/Generated/Shared/Transfer/ServiceCollectionTransfer                         |
| ServiceConditions                         | class | created | src/Generated/Shared/Transfer/ServiceConditionsTransfer                         |
| ServiceCriteria                           | class | created | src/Generated/Shared/Transfer/ServiceCriteriaTransfer                           |
| Service                                   | class | created | src/Generated/Shared/Transfer/ServiceTransfer                                   |
| ServiceTypeCollectionRequest              | class | created | src/Generated/Shared/Transfer/ServiceTypeCollectionRequestTransfer              |
| ServiceTypeCollectionResponse             | class | created | src/Generated/Shared/Transfer/ServiceTypeCollectionResponseTransfer             |
| ServiceTypeCollection                     | class | created | src/Generated/Shared/Transfer/ServiceTypeCollectionTransfer                     |
| ServiceTypeConditions                     | class | created | src/Generated/Shared/Transfer/ServiceTypeConditionsTransfer                     |
| ServiceTypeCriteria                       | class | created | src/Generated/Shared/Transfer/ServiceTypeCriteriaTransfer                       |
| ServiceType                               | class | created | src/Generated/Shared/Transfer/ServiceTypeTransfer                               |
| ServicePointStorage                       | class | created | src/Generated/Shared/Transfer/ServicePointStorageTransfer                       |
| ServicePointAddressStorage                | class | created | src/Generated/Shared/Transfer/ServicePointAddressStorageTransfer                |
| ServiceStorage                            | class | created | src/Generated/Shared/Transfer/ServiceStorageTransfer                            |
| CountryStorage                            | class | created | src/Generated/Shared/Transfer/CountryStorageTransfer                            |
| RegionStorage                             | class | created | src/Generated/Shared/Transfer/RegionStorageTransfer                             |
| ServicePointStorageCollection             | class | created | src/Generated/Shared/Transfer/ServicePointStorageCollectionTransfer             |
| ServicePointStorageCriteria               | class | created | src/Generated/Shared/Transfer/ServicePointStorageCriteriaTransfer               |
| ServicePointStorageConditions             | class | created | src/Generated/Shared/Transfer/ServicePointStorageConditionsTransfer             |
| SynchronizationData                       | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer                       |
| Filter                                    | class | created | src/Generated/Shared/Transfer/FilterTransfer                                    |
| SalesOrderItemServicePoint                | class | created | src/Generated/Shared/Transfer/FilterTransfer                                    |
| Item                                      | class | created | src/Generated/Shared/Transfer/FilterTransfer                                    |
| SalesOrderItemServicePointCriteria        | class | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointCriteria                |
| SalesOrderItemServicePointConditions      | class | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointConditions              |
| SalesOrderItemServicePointCollection      | class | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointCollection              |
| Quote                                     | class | created | src/Generated/Shared/Transfer/QuoteTransfer                                     |
| SaveOrder                                 | class | created | src/Generated/Shared/Transfer/SaveOrderTransfer                                 |
| ShipmentGroup                             | class | created | src/Generated/Shared/Transfer/ShipmentGroupTransfer                             |
| RestServicePointsAttributes               | class | created | src/Generated/Shared/Transfer/RestServicePointsAttributesTransfer               |
| RestServicePointAddressesAttributes       | class | created | src/Generated/Shared/Transfer/RestServicePointAddressesAttributesTransfer       |
| RestErrorMessage                          | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer                          |

{% endinfo_block %}

### 3) Set up configuration

To make the `service-points`, `service-point-addresses`, `services`, and `service-types` resources protected, adjust the protected paths configuration:

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
            '/\/service-points.*/' => [
                'isRegularExpression' => true,
            ],
            '/\/services.*/' => [
                'isRegularExpression' => true,
            ],
            '/\/service-types.*/' => [
                'isRegularExpression' => true,
            ],     
        ];
    }
}
```

### 4) Import service points

1. Prepare the data according to your requirements using our demo data:

**data/import/common/common/service_point.csv**

```csv
key,name,is_active
sp1,Spryker Main Store,1
sp2,Spryker Berlin Store,1
```

| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE       | DATA EXPLANATION                        |
|-----------|-----------|-----------|--------------------|-----------------------------------------|
| key       | ✓ | string    | sp1                | Unique key of the service point.        |
| name      | ✓ | string    | Spryker Main Store | Name of the service point.              |
| is_active | ✓ | bool      | 0                  | Defines if the service point is active. |

**data/import/common/{store}/service_point_store.csv**

```csv
service_point_key,store_name
sp1,DE
sp2,DE
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                        |
|-------------------|-----------|-----------|--------------|-----------------------------------------|
| service_point_key | ✓ | string    | sp1          | Unique key of the service point.        |
| store_name        | ✓ | string    | DE           | Store relation for the service point. |

**data/import/common/common/service_point_address.csv**

```csv
service_point_key,region_iso2_code,country_iso2_code,address1,address2,address3,city,zip_code
sp1,,DE,Caroline-Michaelis-Straße,8,,Berlin,10115
sp2,,DE,Julie-Wolfthorn-Straße,1,,Berlin,10115
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE              | DATA EXPLANATION                 |
|-------------------|-----------|-----------|---------------------------|----------------------------------|
| service_point_key | ✓ | string    | sp1                       | Unique key of the service point. |
| region_iso2_code  |   | string    | DE-BE                     | Region ISO2 code.               |
| country_iso2_code | ✓ | string    | DE                        | Country ISO2 code.                |
| address1          | ✓ | string    | Caroline-Michaelis-Straße | First line of address.            |
| address2          | ✓ | string    | 8a                        | Second line of address.           |
| address3          |   | string    | 12/1                      | Third line of address.            |
| city              | ✓ | string    | Berlin                    | City.                             |
| zip_code          | ✓ | string    | 10115                     | Zip code.                         |

**data/import/common/common/service_type.csv**

```csv
name,key
Pickup,pickup
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                  |
|--------|-----------|-----------|--------------|-----------------------------------|
| name   | ✓ | string    | Pickup       | Unique key of the service type.   |
| key    | ✓ | string    | pickup       | Unique name of the service type.  |

**data/import/common/common/service.csv**

```csv
key,service_point_key,service_type_key,is_active
s1,sp1,pickup,1
s2,sp2,pickup,1
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE      | DATA EXPLANATION                  |
|-------------------|-----------|-----------|-------------------|-----------------------------------|
| key               | ✓ | string    | sps1              | Unique key of the service.        |
| service_point_key | ✓ | string    | sp1               | Unique key of the service point.  |
| service_type_key  | ✓ | string    | pickup            | Unique key of the service type.   |
| is_active         | ✓ | bool      | 0                 | Defines if the service is active. |

2. Enable the data imports per your configuration file—for example:

**data/import/local/full_EU.yml**

```yml
    - data_entity: service-point
      source: data/import/common/common/service_point.csv
    - data_entity: service-point-store
      source: data/import/common/{store}/service_point_store.csv
    - data_entity: service-point-address
      source: data/import/common/common/service_point_address.csv
    - data_entity: service-type
      source: data/import/common/common/service_type.csv
    - data_entity: service
      source: data/import/common/common/service.csv
```

3. Register the following data import plugins:

| PLUGIN                              | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                                                       |
|-------------------------------------|---------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ServicePointDataImportPlugin        | Imports service points into the database.                |           | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport             |
| ServicePointStoreDataImportPlugin   | Imports service point store relations into the database. |           | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport             |
| ServicePointAddressDataImportPlugin | Imports service point addresses into the database.            |           | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport             |
| ServiceTypeDataImportPlugin         | Imports service types into the database.                      |           | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport             |
| ServiceDataImportPlugin             | Imports services into the database.                           |           | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport             |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointStoreDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointAddressDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServiceTypeDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServiceDataImportPlugin;

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
            new ServicePointAddressDataImportPlugin(),
            new ServiceTypeDataImportPlugin(),
            new ServiceDataImportPlugin(),
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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ServicePointDataImportConfig::IMPORT_TYPE_SERVICE_POINT_ADDRESS),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ServicePointDataImportConfig::IMPORT_TYPE_SERVICE_TYPE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ServicePointDataImportConfig::IMPORT_TYPE_SERVICE),
        ];

        return $commands;
    }
}
```

5. Import data:

```bash
console data:import service-point
console data:import service-point-address
console data:import:service
console data:import service-point-store
console data:import:service-type
```

{% info_block warningBox "Verification" %}

Make sure the entities have been imported to the following database tables:

- `spy_service_point`
- `spy_service_point_store`
- `spy_service_point_address`
- `spy_service_type`
- `spy_service`

{% endinfo_block %}

### 5) Add translations

1. Append the glossary according to your configuration:

<details>
  <summary>Glossary</summary>
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
service_point.validation.country_entity_not_found,Country with iso2 code '%iso2Code%' does not exist.,en_US
service_point.validation.country_entity_not_found,Das Land mit dem iso2-Code '%iso2Code%' existiert nicht.,de_DE
service_point.validation.region_entity_not_found,Region with uuid '%uuid%' does not exist for country with iso2 code '%countryIso2Code%'.,en_US
service_point.validation.region_entity_not_found,Region mit uuid '%uuid%' existiert nicht für Land mit iso2-Code '%countryIso2Code%',de_DE
service_point.validation.service_point_address_address1_wrong_length,Service Point Address Input address1 must have a length of %min% to %max% characters.,en_US
service_point.validation.service_point_address_address1_wrong_length,Service Point Adresse Input address1 muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_address_address2_wrong_length,Service Point Address Input address2 must have a length of %min% to %max% characters.,en_US
service_point.validation.service_point_address_address2_wrong_length,Service Point Adresse Input address2 muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_address_address3_wrong_length,Service Point Address Input address3 must have a length of %min% to %max% characters.,en_US
service_point.validation.service_point_address_address3_wrong_length,Service Point Adresse Input address3 muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_address_city_wrong_length,A service point address city must have length from %min% to %max% characters.,en_US
service_point.validation.service_point_address_city_wrong_length,Eine Service Point Adresse Stadt muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_address_entity_not_found,Service point address entity was not found.,en_US
service_point.validation.service_point_address_entity_not_found,Die Entität Service Point Adresse wurde nicht gefunden.,de_DE
service_point.validation.service_point_address_zip_code_wrong_length,A service point address zip code must have length from %min% to %max% characters.,en_US
service_point.validation.service_point_address_zip_code_wrong_length,Die Postleitzahl einer Service Point Adresse muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_address_already_exists,A service point address for the service point already exists.,en_US
service_point.validation.service_point_address_already_exists,Es existiert bereits eine Service Point Adresse für den Service Point.,de_DE
service_point.validation.service_point_uuid_is_not_unique,A service point with the same uuid already exists in request.,en_US
service_point.validation.service_point_uuid_is_not_unique,Ein Service Point mit der gleichen uuid existiert bereits in der Anfrage.,de_DE
service_point.validation.service_type_key_exists,A service type with the same key already exists.,en_US
service_point.validation.service_type_key_exists,Ein Service-Typ mit demselben Schlüssel existiert bereits.,de_DE
service_point.validation.service_type_key_wrong_length,A service type key must have length from %min% to %max% characters.,en_US
service_point.validation.service_type_key_wrong_length,Ein Service-Typ-Schlüssel muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_type_key_is_not_unique,A service type with the same key already exists in request.,en_US
service_point.validation.service_type_key_is_not_unique,Ein Service-Typ mit demselben Schlüssel existiert bereits in der Anfrage.,de_DE
service_point.validation.service_type_name_exists,A service type with the same name already exists.,en_US
service_point.validation.service_type_name_exists,Ein Service-Typ mit demselben Namen existiert bereits.,de_DE
service_point.validation.service_type_name_wrong_length,A service type name must have length from %min% to %max% characters.,en_US
service_point.validation.service_type_name_wrong_length,Ein Service-Typ-Name muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_type_name_is_not_unique,A service type with the same name already exists in request.,en_US
service_point.validation.service_type_name_is_not_unique,Ein Service-Typ mit demselben Namen existiert bereits in der Anfrage.,de_DE
service_point.validation.service_type_entity_not_found,The service type entity was not found.,en_US
service_point.validation.service_type_entity_not_found,Die Service-Typ-Entität wurde nicht gefunden.,de_DE
service_point.validation.service_poinst_service_key_exists,A service with the same key already exists.,en_US
service_point.validation.service_poinst_service_key_exists,Ein Service mit demselben Schlüssel existiert bereits.,de_DE
service_point.validation.service_key_wrong_length,A service key must have length from %min% to %max% characters.,en_US
service_point.validation.service_key_wrong_length,Ein Service-Schlüssel muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_key_is_not_unique,A service with the same key already exists in request.,en_US
service_point.validation.service_key_is_not_unique,Ein Service mit demselben Schlüssel existiert bereits in der Anfrage.,de_DE
service_point.validation.service_type_relation_already_exists,A service with defined relation of service point and service type already exists.,en_US
service_point.validation.service_type_relation_already_exists,Ein Service mit einer definierten Beziehung von Servicepunkt und Service-Typ existiert bereits.,de_DE
service_point.validation.service_type_relation_is_not_unique,A service with defined relation of service pint and service type already exists in request.,en_US
service_point.validation.service_type_relation_is_not_unique,Ein Service mit definierter Beziehung von Servicepunkt und Service-Typ existiert bereits in der Anfrage.,de_DE
service_point.validation.service_entity_not_found,The service entity was not found.,en_US
service_point.validation.service_entity_not_found,Die Service-Entität wurde nicht gefunden.,de_DE
service_point.validation.service_key_immutability,The service key is immutable.,en_US
service_point.validation.service_key_immutability,Der Service-Schlüssel ist unveränderlich.,de_DE
service_point.validation.service_type_key_immutability,The service type key is immutable.,en_US
service_point.validation.service_type_key_immutability,Der Service-Typ-Schlüssel ist unveränderlich.,de_DE
service_point.validation.service_key_exists,A service with the same key already exists.,en_US
service_point.validation.service_key_exists,Ein Service mit demselben Schlüssel existiert bereits.,de_DE
service_points_rest_api.error.endpoint_not_found,The endpoint is not found.,en_US
service_points_rest_api.error.endpoint_not_found,Der Endpunkt wurde nicht gefunden.,de_DE
service_points_rest_api.error.service_point_identifier_is_not_specified,The service point identifier is not specified.,en_US
service_points_rest_api.error.service_point_identifier_is_not_specified,Der Servicestellen-Identifikator ist ungültig.,de_DE
```

</details>

2. Import data:

```bash
console data:import glossary
```

### 5) Configure export to Elasticsearch

1. In `SearchElasticsearchConfig`, adjust the Elasicsearch config:

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'service_point',
    ];
}
```

2. Set up a source for service points:

```bash
console search:setup:source-map
```


3. In `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`, adjust the `RabbitMq` module's configuration:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ServicePointSearch\ServicePointSearchConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getQueueConfiguration(): array
    {
        return [
            ServicePointSearchConfig::QUEUE_NAME_SYNC_SEARCH_SERVICE_POINT,
        ];
    }
}
```

4. Register the new queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ServicePointSearch\ServicePointSearchConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ServicePointSearchConfig::QUEUE_NAME_SYNC_SEARCH_SERVICE_POINT => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

5. Configure the synchronization pool:

**src/Pyz/Zed/ServicePointSearch/ServicePointSearchConfig.php**

```php
<?php

namespace Pyz\Zed\ServicePointSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ServicePointSearch\ServicePointSearchConfig as SprykerServicePointSearchConfig;

class ServicePointSearchConfig extends SprykerServicePointSearchConfig
{
    /**
     * @return string|null
     */
    public function getServicePointSearchSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

#### Set up, regenerate, and resync features

| PLUGIN                                              | SPECIFICATION                                                                                          | PREREQUISITES | NAMESPACE                                                           |
|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| ServicePointSynchronizationDataBulkRepositoryPlugin | Synchronizes the content of the service point search table into Elasticsearch.                        |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Synchronization |
| ServicePointPublisherTriggerPlugin                  | Populates the service point search table with data and triggers the export to Elasticsearch. |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher       |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ServicePointSearch\Communication\Plugin\Synchronization\ServicePointSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ServicePointSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointPublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ServicePointPublisherTriggerPlugin(),
        ];
    }
}
```

#### Register publisher plugins

| PLUGIN                                  | SPECIFICATION                                             | PREREQUISITES | NAMESPACE                                                                         |
|-----------------------------------------|-----------------------------------------------------------|---------------|-----------------------------------------------------------------------------------|
| ServicePointWritePublisherPlugin        | Listens for events and publishes respective data.         |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePoint        |
| ServicePointDeletePublisherPlugin       | Listens for events and unpublishes respective data.       |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePoint        |
| ServicePointAddressWritePublisherPlugin | Listens for events and publishes respective data.         |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointAddress |
| ServicePointStoreWritePublisherPlugin   | Listens for events and publishes respective data.         |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointStore   |
| ServiceWritePublisherPlugin             | Listens for service events and publishes respective data. |           | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\Service             |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\Service\ServiceWritePublisherPlugin;
use Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePoint\ServicePointDeletePublisherPlugin;
use Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePoint\ServicePointWritePublisherPlugin;
use Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointAddress\ServicePointAddressWritePublisherPlugin;
use Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointStore\ServicePointStoreWritePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new ServicePointWritePublisherPlugin(),
            new ServicePointDeletePublisherPlugin(),
            new ServicePointAddressWritePublisherPlugin(),
            new ServicePointStoreWritePublisherPlugin(),
            new ServiceWritePublisherPlugin(),
        ];
    }
}
```

#### Register query expander and result formatter plugins

| PLUGIN                                                            | SPECIFICATION                                                                                                 | PREREQUISITES | NAMESPACE                                                              |
|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| ServicePointSearchResultFormatterPlugin                           | Maps raw Elasticsearch results to a transfer.                                                                 |           | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\ResultFormatter |
| SortedServicePointSearchQueryExpanderPlugin                       | Adds sorting to a search query.                                                                               |           | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |
| PaginatedServicePointSearchQueryExpanderPlugin                    | Adds pagination to a search query.                                                                            |           | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |
| StoreServicePointSearchQueryExpanderPlugin                        | Adds filtering by locale to a search query.                                                                   |           | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |
| ServiceTypesServicePointSearchQueryExpanderPlugin                 | Adds filtering by service types to a search query.                                                            |           | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |
| ServicePointAddressRelationExcludeServicePointQueryExpanderPlugin | Excludes the service point address relation from a query if the `excludeAddressRelation` request parameter is provided. |           | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |

**src/Pyz/Client/ServicePointSearch/ServicePointSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ServicePointSearch;

use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\PaginatedServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\SortedServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\StoreServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\ServiceTypesServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\ResultFormatter\ServicePointSearchResultFormatterPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\ResultFormatter\ServicePointAddressRelationExcludeServicePointQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\ServicePointSearchDependencyProvider as SprykerServicePointSearchDependencyProvider;

class ServicePointSearchDependencyProvider extends SprykerServicePointSearchDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>
     */
    protected function getServicePointSearchResultFormatterPlugins(): array
    {
        return [
            new ServicePointSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getServicePointSearchQueryExpanderPlugins(): array
    {
        return [
            new StoreServicePointSearchQueryExpanderPlugin(),
            new SortedServicePointSearchQueryExpanderPlugin(),
            new PaginatedServicePointSearchQueryExpanderPlugin(),
            new ServiceTypesServicePointSearchQueryExpanderPlugin(),
            new ServicePointAddressRelationExcludeServicePointQueryExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Fill the `spy_service_point` table with some data and run `console publish:trigger-events -r service_point`.
    - Make sure the `spy_service_point_search` table is filled with respective data per store.
    - Make sure, in Elasticearch documents, data is structured in the following format:

```yaml
{
   "store":"DE",
   "type":"service_point",
   "search-result-data":{
      "idServicePoint":123,
      "uuid":"40320bdf-c2af-4dd8-8d09-4550ece4287d",
      "name":"Service Point Name #1",
      "key":"service-point-name-1",
      "address":{
         "idServicePointAddress":44,
         "uuid":"2f02b327-0165-46ea-88df-0190d9a1c242",
         "address1":"Seeburger Str.",
         "address2":"270",
         "address3":"Block B",
         "city":"Berlin",
         "zipCode":"10115",
         "country":{
            "iso2Code":"DE",
            "name":"Germany"
         },
         "region":{
            "name":"Saxony"
         }
      }
   },
   "full-text-boosted":[
      "Service Point Name #1"
   ],
   "full-text":[
      "Service Point Name #1",
      "Seeburger Str. 270 Block B",
      "Berlin",
      "10115",
      "Germany",
      "Saxony"
   ],
   "suggestion-terms":[
      "Service Point Name #1"
   ],
   "completion-terms":[
      "Service Point Name #1"
   ],
   "string-sort":{
      "city":"Berlin"
   }
}
```

1. In the `spy_service_point_search` table, change some records and run `console sync:data service_point`.
    Make sure your changes have been synced to the respective Elasticsearch document.

{% endinfo_block %}

### 6) Configure export to Redis

Configure tables to be published and synced to the Storage on create, edit, and delete changes:

1. In `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`, adjust the `RabbitMq` module's configuration:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ServicePointStorage\ServicePointStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ServicePointStorageConfig::QUEUE_NAME_SYNC_STORAGE_SERVICE_POINT,
        ];
    }
}
```

2. Register the queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ServicePointStorage\ServicePointStorageConfig;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ServicePointStorageConfig::QUEUE_NAME_SYNC_STORAGE_SERVICE_POINT => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

3. Configure the synchronization pool and event queue name:

**src/Pyz/Zed/ServicePointStorage/ServicePointStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ServicePointStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ServicePointStorage\ServicePointStorageConfig as SprykerServicePointStorageConfig;

class ServicePointStorageConfig extends SprykerServicePointStorageConfig
{
    /**
     * @return string|null
     */
    public function getServicePointStorageSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getServiceTypeStorageSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

4. Set up the publisher plugins:

| PLUGIN                                  | SPECIFICATION                                                                                 | PREREQUISITES | NAMESPACE                                                                          |
|-----------------------------------------|-----------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------|
| ServicePointWritePublisherPlugin        | Publishes service point data by `SpyServicePoint` entity events.                              |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePoint        |
| ServicePointAddressWritePublisherPlugin | Publishes service point data by `SpyServicePointAddress` entity events.                       |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePointAddress |
| ServicePointStoreWritePublisherPlugin   | Publishes service point data by service point store entity events.                            |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePointStore   |
| ServiceWritePublisherPlugin             | Publishes service point data by `SpyService` entity events.                                   |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\Service             |
| ServiceTypeWritePublisherPlugin         | Publishes service type data by `SpyType` entity events.                                       |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServiceType         |
| ServicePointPublisherTriggerPlugin      | Populates the service point storage table with data and triggers the export to Redis. |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher                     |
| ServiceTypePublisherTriggerPlugin       | Populates the service type storage table with data and triggers the export to Redis.  |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher                     |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePoint\ServicePointWritePublisherPlugin as ServicePointStorageWritePublisherPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePointAddress\ServicePointAddressWritePublisherPlugin as ServicePointStorageAddressWritePublisherPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePointPublisherTriggerPlugin as ServicePointStoragePublisherTriggerPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServicePointStore\ServicePointStoreWritePublisherPlugin as ServicePointStorageStoreWritePublisherPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServiceType\ServiceTypeWritePublisherPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\ServiceTypePublisherTriggerPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Publisher\Service\ServiceWritePublisherPlugin as ServicePointStorageServiceWritePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getServicePointStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ServicePointStoragePublisherTriggerPlugin(),
            new ServiceTypePublisherTriggerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getServicePointStoragePlugins(): array
    {
        return [
            new ServicePointStorageWritePublisherPlugin(),
            new ServicePointStorageAddressWritePublisherPlugin(),
            new ServicePointStorageStoreWritePublisherPlugin(),
            new ServicePointStorageServiceWritePublisherPlugin(),
            new ServiceTypeWritePublisherPlugin(),
        ];
    }
}
```

5. Set up the synchronization plugins:

| PLUGIN                                                    | SPECIFICATION                                                            | PREREQUISITES | NAMESPACE                                                            |
|-----------------------------------------------------------|--------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| ServicePointSynchronizationDataBulkRepositoryPlugin       | Synchronizes the content of the service point storage table into Redis. |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Synchronization |
| ServiceTypeSynchronizationDataBulkRepositoryPlugin        | Synchronizes the content of the service type storage table into Redis.  |               | Spryker\Zed\ServicePointStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ServicePointStorage\Communication\Plugin\Synchronization\ServicePointSynchronizationDataBulkRepositoryPlugin as ServicePointStorageSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\ServicePointStorage\Communication\Plugin\Synchronization\ServiceTypeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ServicePointStorageSynchronizationDataBulkRepositoryPlugin(),
            new ServiceTypeSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the `service-point` trigger plugin works correctly:

1. Fill the `spy_service_point`, `spy_service_point_store`, and `spy_servoce_point_address` tables with data.
2. Run the `console publish:trigger-events -r service_point` command.
- Make sure the `spy_service_point_storage` table has been filled with respective data.
- Make sure storage entries are now displayed with the `kv:service_point:{store}:{service_point_id}` mask.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify the `service-point` synchronization plugin works correctly:

1. Fill the `spy_service_point_storage` table with some data.
2. Run the `console sync:data -r service_point` command.
    Make sure storage entries are now displayed with the `kv:service_point:{store}:{service_point_id}` mask.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

- Make sure that, when a service point is created or edited through BAPI, it's exported to Redis accordingly.

- Make sure that, in Redis, data is displayed in the following format:

```yaml
{
   "id_service_point": 1,
   "uuid": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
   "name": "Spryker Main Store",
   "key": "sp1",
   "is_active": true,
   "address": {
      "id_service_point_address": 1,
      "uuid": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
      "address1": "Caroline-Michaelis-Stra\u00dfe",
      "address2": "8",
      "address3": null,
      "zip_code": "10115",
      "city": "Berlin",
      "country": {
         "iso2_code": "DE",
         "id_country": 60
      },
      "region": {
         "uuid": "2f02b327-0165-46ea-88df-0190d9a1c242",
         "id_region": 1,
         "name": "Berlin"
      }
   },
   "services": {[
     {
       "idService": 1,
       "uuid": "f34c6ee7-8c73-4542-a621-846d91fafa56",
       "key": "s1",
       "serviceType": "pickup"
     },
     {
       "idService": 2,
       "uuid": "b516a972-59cf-41d5-9f91-ef1011179b60",
       "key": "s2",
       "serviceType": "delivery"
     }
   ]},
   "_timestamp": 1683216744.8334839
}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify the `service-type` trigger plugin works correctly:

1. Fill the `spy_service_type` table with data.
2. Run the `console publish:trigger-events -r service_type` command.
- Make sure the `spy_service_type_storage` table has been filled with respective data.
- Make sure storage entries are now displayed with the `kv:service_type:{service_type_id}` mask.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Verify the `service-type` synchronization plugin works correctly:

1. Fill the `spy_service_type_storage` table with some data.
2. Run the `console sync:data -r service_type` command.
    Make sure storage entries are now displayed with the `kv:service_type:{service_type_id}` mask.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

- Make sure that when a service type is created or edited through BAPI, it's exported to Redis accordingly.

- Make sure that, in Redis, data is displayed in the following format:

```json
{
    "id_service_type": 1,
    "uuid": "2370ad95-4e9f-5ac3-913e-300c5805b181",
    "name": "Pickup",
    "key": "pickup",
    "_timestamp": 1692352890.0729749
}
```

{% endinfo_block %}

### 7) Set up behavior

1. To enable the Backend API, register the plugins:

| PLUGIN                                     | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                                                              |
|--------------------------------------------|---------------------------------------------------|---------------|------------------------------------------------------------------------|
| ServicePointsBackendResourcePlugin         | Registers the `service-points` resource.          |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplication |
| ServicePointAddressesBackendResourcePlugin | Registers the `service-point-addresses` resource. |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplication |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplication\ServicePointsBackendResourcePlugin;
use \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplication\ServicePointAddressesBackendResourcePlugin;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplication\ServicesBackendResourcePlugin;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplication\ServiceTypesBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new ServicePointsBackendResourcePlugin(),
            new ServicePointAddressesBackendResourcePlugin(),
            new ServiceTypesBackendResourcePlugin(),
            new ServicesBackendResourcePlugin(),
        ];
    }
}

```

2. To enable the Backend API relationships, register the plugins:

| PLUGIN                                                                | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                                                            |
|-----------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| ServicePointAddressesByServicePointsBackendResourceRelationshipPlugin | Adds the `service-point-addresses` relationship to the `service-points` resource. |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |
| ServicesByServicePointsBackendResourceRelationshipPlugin              | Adds the `services` relationship to the `service-points` resource.                |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |
| ServicePointsByServicesBackendResourceRelationshipPlugin              | Adds the `service-points` relationship to the `services` resource.                |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |
| ServiceTypesByServicesBackendResourceRelationshipPlugin               | Adds the `service-types` relationship to the `services` resource.                 |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |

**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicePointAddressesByServicePointsBackendResourceRelationshipPlugin;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicePointsByServicesBackendResourceRelationshipPlugin;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicesByServicePointsBackendResourceRelationshipPlugin;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServiceTypesByServicesBackendResourceRelationshipPlugin;
use Spryker\Glue\ServicePointsBackendApi\ServicePointsBackendApiConfig;

class GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        ...

        $resourceRelationshipCollection->addRelationship(
            ServicePointsBackendApiConfig::RESOURCE_SERVICE_POINTS,
            new ServicePointAddressesByServicePointsBackendResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ServicePointsBackendApiConfig::RESOURCE_SERVICE_POINTS,
            new ServicesByServicePointsBackendResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ServicePointsBackendApiConfig::RESOURCE_SERVICES,
            new ServicePointsByServicesBackendResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ServicePointsBackendApiConfig::RESOURCE_SERVICES,
            new ServiceTypesByServicesBackendResourceRelationshipPlugin(),
        );

        ...
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can send the following requests:

- `POST https://glue-backend.mysprykershop.com/service-points`

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

- `PATCH https://glue-backend.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}`

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

- `GET https://glue-backend.mysprykershop.com/service-points/`
- `GET https://glue-backend.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}`
- `POST https://glue-backend.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}/service-point-addresses`

   ```json
      {
          "data": {
              "type": "service-point-address",
              "attributes": {
                  "address1": "address1",
                  "address2": "address2",
                  "address3": "address3",
                  "city": "city",
                  "zipCode": "10115",
                  "countryIso2Code": "DE"
              }
          }
      }
   ```

- `PATCH https://glue-backend.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}/service-point-addresses/{% raw %}{{service-point-address-uuid}}{% endraw %}`

  ```json
     {
         "data": {
             "type": "service-point-address",
             "attributes": {
                 "address1": "another address1",
                 "address2": "another address2",
                 "address3": "another address3",
                 "city": "another city",
                 "zipCode": "20115",
                 "countryIso2Code": "AT"
             }
         }
     }
  ```

- `GET https://glue-backend.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}/service-point-addresses`

- `GET https://glue-backend.mysprykershop.com/service-types/`
- `GET https://glue-backend.mysprykershop.com/service-types/{% raw %}{{service-type-uuid}}{% endraw %}`
- `POST https://glue-backend.mysprykershop.com/service-types/`

   ```json
      {
          "data": {
              "type": "service-types",
              "attributes": {
                  "name": "ServiceType",
                  "key": "st-4"
              }
          }
      }
   ```

- `PATCH https://glue-backend.mysprykershop.com/service-types/{% raw %}{{service-type-uuid}}{% endraw %}`

  ```json
      {
          "data": {
              "type": "service-types",
              "attributes": {
                  "name": "ServiceType"
              }
          }
      }
  ```

- `GET https://glue-backend.mysprykershop.com/services/`
- `GET https://glue-backend.mysprykershop.com/services/{% raw %}{{service-uuid}}{% endraw %}`
- `POST https://glue-backend.mysprykershop.com/services/`

   ```json
      {
          "data": {
              "type": "services",
              "attributes": {
                  "isActive": false,
                  "key": 123,
                  "servicePointUuid": "{% raw %}{{service-point-uuid}}{% endraw %}",
                  "serviceTypeUuid": "{% raw %}{{service-type-uuid}}{% endraw %}"
              }
          }
      }
   ```

- `PATCH https://glue-backend.mysprykershop.com/services/{% raw %}{{service-uuid}}{% endraw %}`

  ```json
      {
          "data": {
              "type": "services",
              "attributes": {
                  "isActive": true
              }
          }
      }
  ```

{% endinfo_block %}

3. To enable the Storefront API, register the following plugins:

| PLUGIN                                     | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                                                 |
|--------------------------------------------|---------------------------------------------------|---------------|-----------------------------------------------------------|
| ServicePointsResourceRoutePlugin           | Registers the `service-points` resource.          |               | \Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication |
| ServicePointAddressesResourceRoutePlugin   | Registers the `service-point-addresses` resource. |               | \Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication\ServicePointAddressesResourceRoutePlugin;
use Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication\ServicePointsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ServicePointsResourceRoutePlugin(),
            new ServicePointAddressesResourceRoutePlugin(),
        ];
    }
}
```

4. To enable the Storefront API relationships, register the plugin:

| PLUGIN                                                              | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                 |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------|-----------------------------------------------------------|
| ServicePointAddressesByServicePointUuidResourceRelationshipPlugin   | Adds the `service-point-addresses` relationship to the `service-points` resource. |               | \Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication\ServicePointAddressesByServicePointUuidResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ServicePointsRestApiConfig::RESOURCE_SERVICE_POINTS,
            new ServicePointAddressesByServicePointUuidResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you can send the following requests:

- `GET https://glue.mysprykershop.com/service-points`
- `GET https://glue.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}`
- `GET https://glue.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}/service-point-addresses`

Make sure that you can include the `service-point-addresses` resource in the `service-points` resource requests.
- `GET https://glue.mysprykershop.com/service-points?include=service-point-addresses`
- `GET https://glue.mysprykershop.com/service-points/{% raw %}{{service-point-uuid}}{% endraw %}?include=service-point-addresses`

{% endinfo_block %}

### 8) Set up the reorder process

1. To enable reorder to work with service points, register the following plugins:

| PLUGIN                                     | SPECIFICATION                                           | PREREQUISITES | NAMESPACE                                                              |
|--------------------------------------------|---------------------------------------------------------|---------------|------------------------------------------------------------------------|
| ServicePointReorderItemSanitizerPlugin         | Cleans up service point data during the reorder process.  |               | \SprykerShop\Yves\SalesServicePointWidget\Plugin\CustomerReorderWidget |

**src/Pyz/Yves/CustomerReorderWidget/CustomerReorderWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerReorderWidget;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use SprykerShop\Yves\SalesServicePointWidget\Plugin\CustomerReorderWidget\ServicePointReorderItemSanitizerPlugin;


class CustomerReorderWidgetDependencyProvider extends SprykerCustomerReorderWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerReorderWidgetExtension\Dependency\Plugin\ReorderItemSanitizerPluginInterface>
     */
    protected function getReorderItemSanitizerPlugins(): array
    {
        return [
            new ServicePointReorderItemSanitizerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure sales service points are empty for order items during the reorder process.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Service Points feature frontend.

### 1) Add translations

1. Append the glossary:

```csv
service_point_widget.search,"Search for Store, zip code or city...",en_US
service_point_widget.search,"Suche nach Store, PLZ oder Stadt...",de_DE
service_point_widget.select_store_action,Select store,en_US
service_point_widget.select_store_action,Store auswählen,de_DE
service_point_widget.no_results,"Nothing found...",en_US
service_point_widget.no_results,"Nichts gefunden...",de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 2) Set up configuration

Add the following configuration:

1. Disable service points to be selected for product bundles during checkout:

|CONFIGURATION     | SPECIFICATION   NAMESPACE                   |
|------------------------|----------------------------------------------------------|-----------------------------|
| ServicePointWidgetConfig::getNotApplicableServicePointAddressStepFormItemPropertiesForHydration() | Defines the list of properties in an `ItemTransfer` that are not intended for form hydration.   | Pyz\Yves\ServicePointWidget |
| ProductBundleConfig::getAllowedBundleItemFieldsToCopy()                                           | Defines the list of allowed fields to be copied from a source bundle item to destination bundled items. | Pyz\Zed\ProductBundle       |

**src/Pyz/Yves/ServicePointWidget/ServicePointWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\ServicePointWidget;

use Generated\Shared\Transfer\ItemTransfer;
use SprykerShop\Yves\ServicePointWidget\ServicePointWidgetConfig as SprykerServicePointWidgetConfig;

class ServicePointWidgetConfig extends SprykerServicePointWidgetConfig
{
    /**
     * @return list<string>
     */
    public function getNotApplicableServicePointAddressStepFormItemPropertiesForHydration(): array
    {
        return [
            ItemTransfer::BUNDLE_ITEM_IDENTIFIER,
            ItemTransfer::RELATED_BUNDLE_ITEM_IDENTIFIER,
        ];
    }
}
```

**src/Pyz/Zed/ProductBundle/ProductBundleConfig.php**

```php
<?php

namespace Pyz\Zed\ProductBundle;

use Generated\Shared\Transfer\ItemTransfer;
use Spryker\Zed\ProductBundle\ProductBundleConfig as SprykerProductBundleConfig;

class ProductBundleConfig extends SprykerProductBundleConfig
{
    /**
     * @return list<string>
     */
    public function getAllowedBundleItemFieldsToCopy(): array
    {
        return [
            ItemTransfer::SHIPMENT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure service points can't be selected for product bundles on the checkout address step.

{% endinfo_block %}

### 3) Enable controllers

Register the following route providers on the Storefront:

| PROVIDER                              | NAMESPACE                                         |
|---------------------------------------|---------------------------------------------------|
| ServicePointWidgetRouteProviderPlugin | SprykerShop\Yves\ServicePointWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ServicePointWidget\Plugin\Router\ServicePointWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            new ServicePointWidgetRouteProviderPlugin(),
        ];

        return $routeProviders;
    }
}
```

### 4) Set up widgets

1. To enable widgets, register the following plugins:

| PLUGIN                   | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                  |
|--------------------------|---------------------------------------------------------------|---------------|--------------------------------------------|
| ServicePointSearchWidget | Enables customers to search and sort service points. |               | SprykerShop\Yves\ServicePointWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ServicePointWidget\Widget\ServicePointSearchWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ServicePointSearchWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                   | VERIFICATION                              |
|--------------------------|-----------------------------------------------------------------|
| ServicePointSearchWidget | `{% raw %}{%{% endraw %} widget 'ServicePointSearchWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |

Make sure that, during checkout, you can select a service point for the order items.

{% endinfo_block %}

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```
