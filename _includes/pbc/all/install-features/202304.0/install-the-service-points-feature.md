This document describes how to integrate the Service Points feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points feature.
To start feature integration, integrate the required features:

### Prerequisites

To start feature integration, integrate the required features:

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
| ServicePointSearch      | vendor/spryker/service-point-search       |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events.

| AFFECTED ENTITY               | TRIGGERED EVENTS                                                                                                              |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| spy_service_point             | Entity.spy_service_point.create<br>Entity.spy_service_point.update<br>Entity.spy_service_point.delete                         |
| spy_service_point_address     | Entity.spy_service_point_address.create<br>Entity.spy_service_point_address.update<br>Entity.spy_service_point_address.delete |
| spy_service_point_store       | Entity.spy_service_point_store.create<br>Entity.spy_service_point_store.update<br>Entity.spy_service_point_store.delete       |

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

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY           | TYPE   | EVENT   |
|---------------------------|--------|---------|
| spy_service_point         | table  | created |
| spy_service_point_address | table  | created |
| spy_service_point_service | table  | created |
| spy_service_point_store   | table  | created |
| spy_service_point_search  | table  | created |
| spy_service_type          | table  | created |
| spy_region.uuid           | column | created |

Make sure that propel entities have been generated successfully by checking their existence. Also, make generated entity classes extending respective Spryker core classes.

| CLASS NAMESPACE                                                    | EXTENDS                                                                                |
|--------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| \Orm\Zed\ServicePoint\Persistence\SpyServicePoint                  | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePoint                   |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointAddress           | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointAddress            |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointAddressQuery      | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointAddressQuery       |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointQuery             | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointQuery              |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointService           | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointService            |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointServiceQuery      | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointServiceQuery       |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointAddressQuery      | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointAddressQuery       |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointStore             | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointStore              |
| \Orm\Zed\ServicePoint\Persistence\SpyServicePointStoreQuery        | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServicePointStoreQuery         |
| \Orm\Zed\ServicePoint\Persistence\SpyServiceType                   | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServiceType                    |
| \Orm\Zed\ServicePoint\Persistence\SpyServiceTypeQuery              | \Spryker\Zed\ServicePoint\Persistence\Propel\AbstractSpyServiceTypeQuery               |
| \Orm\Zed\ServicePointSearch\Persistence\SpyServicePointSearch      | \Spryker\Zed\ServicePointSearch\Persistence\Propel\AbstractSpyServicePointSearch       |
| \Orm\Zed\ServicePointSearch\Persistence\SpyServicePointSearchQuery | \Spryker\Zed\ServicePointSearch\Persistence\Propel\AbstractSpyServicePointSearchQuery  |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                                      | TYPE  | EVENT   | PATH                                                                    |
|-----------------------------------------------|-------|---------|-------------------------------------------------------------------------|
| ServicePoint                                  | class | created | src/Generated/Shared/Transfer/ServicePoint                              |
| ServicePointCollection                        | class | created | src/Generated/Shared/Transfer/ServicePointCollection                    |
| ServicePointCollectionRequest                 | class | created | src/Generated/Shared/Transfer/ServicePointCollectionRequest             |
| ServicePointCollectionResponse                | class | created | src/Generated/Shared/Transfer/ServicePointCollectionResponse            |
| ServicePointCriteria                          | class | created | src/Generated/Shared/Transfer/ServicePointCriteria                      |
| ServicePointConditions                        | class | created | src/Generated/Shared/Transfer/ServicePointConditions                    |
| ApiServicePointsAttributes                    | class | created | src/Generated/Shared/Transfer/ApiServicePointsAttributes                |
| ApiServicePointAddressesAttributes            | class | created | src/Generated/Shared/Transfer/ApiServicePointAddressesAttributes        |
| StoreRelation                                 | class | created | src/Generated/Shared/Transfer/StoreRelation                             |
| Store                                         | class | created | Generated/Shared/Transfer/Store                                         |
| Error                                         | class | created | Generated/Shared/Transfer/Error                                         |
| Sort                                          | class | created | Generated/Shared/Transfer/Sort                                          |
| Pagination                                    | class | created | Generated/Shared/Transfer/Pagination                                    |
| ErrorCollection                               | class | created | Generated/Shared/Transfer/ErrorCollection                               |
| DataImporterConfiguration                     | class | created | Generated/Shared/Transfer/DataImporterConfiguration                     |
| DataImporterReport                            | class | created | Generated/Shared/Transfer/DataImporterReport                            |
| CountryCriteria                               | class | created | Generated/Shared/Transfer/CountryCriteria                               |
| CountryConditions                             | class | created | Generated/Shared/Transfer/CountryConditions                             |
| Country                                       | class | created | Generated/Shared/Transfer/Country                                       |
| CountryCollection                             | class | created | Generated/Shared/Transfer/CountryCollection                             |
| Region                                        | class | created | Generated/Shared/Transfer/Region                                        |
| ServicePointAddressCollection                 | class | created | Generated/Shared/Transfer/ServicePointAddressCollection                 |
| ServicePointAddressCollectionRequest          | class | created | Generated/Shared/Transfer/ServicePointAddressCollectionRequest          |
| ServicePointAddressCollectionResponse         | class | created | Generated/Shared/Transfer/ServicePointAddressCollectionResponse         |
| ServicePointAddressCriteria                   | class | created | Generated/Shared/Transfer/ServicePointAddressCriteria                   |
| ServicePointAddressConditions                 | class | created | Generated/Shared/Transfer/ServicePointAddressConditions                 |
| ServicePointAddress                           | class | created | Generated/Shared/Transfer/ServicePointAddress                           |
| GlueRelationship                              | class | created | Generated/Shared/Transfer/GlueRelationship                              |
| ServicePointSearchCollection                  | class | created | Generated/Shared/Transfer/ServicePointSearchCollection                  |
| ServicePointSearch                            | class | created | Generated/Shared/Transfer/ServicePointSearch                            |
| ServicePointSearchRequest                     | class | created | Generated/Shared/Transfer/ServicePointSearchRequest                     |
| ServicePointServiceCollectionRequestTransfer  | class | created | Generated/Shared/Transfer/ServicePointServiceCollectionRequestTransfer  |
| ServicePointServiceCollectionResponseTransfer | class | created | Generated/Shared/Transfer/ServicePointServiceCollectionResponseTransfer |
| ServicePointServiceCollectionTransfer         | class | created | Generated/Shared/Transfer/ServicePointServiceCollectionTransfer         |
| ServicePointServiceConditionsTransfer         | class | created | Generated/Shared/Transfer/ServicePointServiceConditionsTransfer         |
| ServicePointServiceCriteriaTransfer           | class | created | Generated/Shared/Transfer/ServicePointServiceCriteriaTransfer           |
| ServicePointServiceTransfer                   | class | created | Generated/Shared/Transfer/ServicePointServiceTransfer                   |
| ServiceTypeCollectionRequestTransfer          | class | created | Generated/Shared/Transfer/ServiceTypeCollectionRequestTransfer          |
| ServiceTypeCollectionResponseTransfer         | class | created | Generated/Shared/Transfer/ServiceTypeCollectionResponseTransfer         |
| ServiceTypeCollectionTransfer                 | class | created | Generated/Shared/Transfer/ServiceTypeCollectionTransfer                 |
| ServiceTypeConditionsTransfer                 | class | created | Generated/Shared/Transfer/ServiceTypeConditionsTransfer                 |
| ServiceTypeCriteriaTransfer                   | class | created | Generated/Shared/Transfer/ServiceTypeCriteriaTransfer                   |
| ServiceTypeTransfer                           | class | created | Generated/Shared/Transfer/ServiceTypeTransfer                           |

{% endinfo_block %}

### 3) Set up configuration

To make the `service-points` and `service-point-addresses` resources protected, adjust the protected paths configuration:

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

**data/import/common/common/service_point_address.csv**

```csv
service_point_key,region_iso2_code,country_iso2_code,address1,address2,address3,city,zip_code
sp1,,DE,Caroline-Michaelis-Straße,8,,Berlin,10115
sp2,,DE,Julie-Wolfthorn-Straße,1,,Berlin,10115
```

| COLUMN            | REQUIRED? | DATA TYPE | DATA EXAMPLE              | DATA EXPLANATION                 |
|-------------------|-----------|-----------|---------------------------|----------------------------------|
| service_point_key | mandatory | string    | sp1                       | Unique key of the service point. |
| region_iso2_code  | optional  | string    | DE-BE                     | Region ISO2 code                 |
| country_iso2_code | mandatory | string    | DE                        | Country ISO2 code                |
| address1          | mandatory | string    | Caroline-Michaelis-Straße | First line of address            |
| address2          | mandatory | string    | 8a                        | Second line of address           |
| address3          | optional  | string    | 12/1                      | Third line of address            |
| city              | mandatory | string    | Berlin                    | City                             |
| zip_code          | mandatory | string    | 10115                     | Zip code                         |


**data/import/common/common/service_type.csv**

```csv
name,key
Pickup,pickup
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                  |
|--------|-----------|-----------|--------------|-----------------------------------|
| name   | mandatory | string    | Pickup       | Unique key of the service type.   |
| key    | mandatory | string    | pickup       | Unique name of the service type.  |

**data/import/common/common/service_point_service.csv**

```csv
key,service_point_key,service_type_key,is_active
sps1,sp1,pickup,1
sps2,sp2,pickup,1
```

| COLUMN            | REQUIRED? | DATA TYPE | DATA EXAMPLE      | DATA EXPLANATION                                |
|-------------------|-----------|-----------|-------------------|-------------------------------------------------|
| key               | mandatory | string    | sps1              | Unique key of the service point service.        |
| service_point_key | mandatory | string    | sp1               | Unique key of the service point.                |
| service_type_key  | mandatory | string    | pickup            | Unique key of the service type.                 |
| is_active         | mandatory | bool      | 0                 | Defines if the service point service is active. |

2. Enable data imports at your configuration file—for example:

**data/import/local/full_EU.yml**

```yml
    - data_entity: service-point
      source: data/import/common/common/service_point.csv
    - data_entity: service-point-store
      source: data/import/common/{{store}}/service_point_store.csv
    - data_entity: service-point-address
      source: data/import/common/common/service_point_address.csv
    - data_entity: service-type
      source: data/import/common/common/service_type.csv
    - data_entity: service-point-service
      source: data/import/common/common/service_point_service.csv
```

3. Register the following data import plugins:

| PLUGIN                              | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                                           |
|-------------------------------------|---------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| ServicePointDataImportPlugin        | Imports service points data into the database.                | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |
| ServicePointStoreDataImportPlugin   | Imports service point store relations data into the database. | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |
| ServicePointAddressDataImportPlugin | Imports service point addresses into the database.            | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |
| ServiceTypeDataImportPlugin         | Imports service types into the database.                      | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |
| ServicePointServiceDataImportPlugin | Imports service point services into the database.             | None          | \Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointStoreDataImportPlugin;
use Spryker\Zed\ServicePointDataImport\Communication\Plugin\DataImport\ServicePointAddressDataImportPlugin;

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
            new ServicePointServiceDataImportPlugin(),
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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ServicePointDataImportConfig::IMPORT_TYPE_SERVICE_POINT_SERVICE),
        ];

        return $commands;
    }
}
```

5. Import data:

```bash
console data:import service-point
console data:import service-point-address
console data:import:service-point-service
console data:import service-point-store
console data:import:service-type
```

{% info_block warningBox “Verification” %}

Make sure that entities were imported to the following database tables respectively:

 - `spy_service_point`
 - `spy_service_point_store`
 - `spy_service_point_address`
 - `spy_service_type`
 - `spy_service_point_service`

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
service_point.validation.service_poinst_service_key_exists,A service point service with the same key already exists.,en_US
service_point.validation.service_poinst_service_key_exists,Ein Servicepunkt-Service mit demselben Schlüssel existiert bereits.,de_DE
service_point.validation.service_point_service_key_wrong_length,A service point service key must have length from %min% to %max% characters.,en_US
service_point.validation.service_point_service_key_wrong_length,Ein Servicepunkt-Service-Schlüssel muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
service_point.validation.service_point_service_key_is_not_unique,A service point service with the same key already exists in request.,en_US
service_point.validation.service_point_service_key_is_not_unique,Ein Servicepunkt-Service mit demselben Schlüssel existiert bereits in der Anfrage.,de_DE
service_point.validation.service_point_service_type_relation_already_exists,A service point service with defined relation of service point and service type already exists.,en_US
service_point.validation.service_point_service_type_relation_already_exists,Ein Servicepunkt-Service mit einer definierten Beziehung von Servicepunkt und Service-Typ existiert bereits.,de_DE
service_point.validation.service_point_service_type_relation_is_not_unique,A service point service with defined relation of service pint and service type already exists in request.,en_US
service_point.validation.service_point_service_type_relation_is_not_unique,Ein Servicepunkt-Service mit definierter Beziehung von Servicepunkt und Service-Typ existiert bereits in der Anfrage.,de_DE
service_point.validation.service_point_service_entity_not_found,The service point service entity was not found.,en_US
service_point.validation.service_point_service_entity_not_found,Die Servicepunkt-Service-Entität wurde nicht gefunden.,de_DE
service_point.validation.service_point_service_key_immutability,The service point service key is immutable.,en_US
service_point.validation.service_point_service_key_immutability,Der Servicepunkt-Service-Schlüssel ist unveränderlich.,de_DE
service_point.validation.service_type_key_immutability,The service type key is immutable.,en_US
service_point.validation.service_type_key_immutability,Der Service-Typ-Schlüssel ist unveränderlich.,de_DE
service_point.validation.service_point_service_key_exists,A service point service with the same key already exists.,en_US
service_point.validation.service_point_service_key_exists,Ein Servicepunkt-Service mit demselben Schlüssel existiert bereits.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 5) Configure export to Elasticsearch

1. In `SearchElasticsearchConfig`, adjust Elasicsearch config:

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

2. Set up a new source for Service Points:

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

#### Set up regenerate and resync features

| PLUGIN                                              | SPECIFICATION                                                                                          | PREREQUISITES | NAMESPACE                                                           |
|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| ServicePointSynchronizationDataBulkRepositoryPlugin | Allows synchronizing the service point search table content into Elasticsearch.                        | None          | Spryker\Zed\ServicePointSearch\Communication\Plugin\Synchronization |
| ServicePointPublisherTriggerPlugin                  | Allows populating service point search table with data and triggering further export to Elasticsearch. | None          | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher       |

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

| PLUGIN                                  | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                                                         |
|-----------------------------------------|-----------------------------------------------------|---------------|-----------------------------------------------------------------------------------|
| ServicePointWritePublisherPlugin        | Listens for events and publishes respective data.   | None          | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePoint        |
| ServicePointDeletePublisherPlugin       | Listens for events and unpublishes respective data. | None          | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePoint        |
| ServicePointAddressWritePublisherPlugin | Listens for events and publishes respective data.   | None          | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointAddress |
| ServicePointStoreWritePublisherPlugin   | Listens for events and publishes respective data.   | None          | Spryker\Zed\ServicePointSearch\Communication\Plugin\Publisher\ServicePointStore   |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
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
        ];
    }
}
```

#### Register query expander and result formatter plugins

| PLUGIN                                         | SPECIFICATION                                 | PREREQUISITES | NAMESPACE                                                              |
|------------------------------------------------|-----------------------------------------------|---------------|------------------------------------------------------------------------|
| ServicePointSearchResultFormatterPlugin        | Maps raw Elasticsearch results to a transfer. | None          | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\ResultFormatter |
| SortedServicePointSearchQueryExpanderPlugin    | Adds sorting to a search query.               | None          | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |
| PaginatedServicePointSearchQueryExpanderPlugin | Adds pagination to a search query.            | None          | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |
| StoreServicePointSearchQueryExpanderPlugin     | Adds filtering by locale to a search query.   | None          | Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query           |

**src/Pyz/Client/ServicePointSearch/ServicePointSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ServicePointSearch;

use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\PaginatedServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\SortedServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\Query\StoreServicePointSearchQueryExpanderPlugin;
use Spryker\Client\ServicePointSearch\Plugin\Elasticsearch\ResultFormatter\ServicePointSearchResultFormatterPlugin;
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
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Fill the `spy_service_point` table with some data and run `console publish:trigger-events -r service_point`.
2. Make sure that the `spy_service_point_search` table is filled with respective data per store. 
3. Check Elasticearch documents and make sure data is structured in the following format:

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

4. In the `spy_service_point_search` table, change some records and run `console sync:data service_point`. 
5. Make sure that your changes have been synced to the respective Elasticsearch document.

{% endinfo_block %}

### 6) Set up behavior

1. To enable the Backend API, register the plugins:

| PLUGIN                                     | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                                                                                            |
|--------------------------------------------|---------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| ServicePointsBackendResourcePlugin         | Registers the `service-points` resource.          |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |
| ServicePointAddressesBackendResourcePlugin | Registers the `service-point-addresses` resource. |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicePointsBackendResourcePlugin;
use \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicePointAddressesBackendResourcePlugin;

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
        ];
    }
}

```

2. To enable the Backend API relationships, register the plugin:

| PLUGIN                                                                 | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                                                            |
|------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| ServicePointAddressesByServicePointsBackendResourceRelationshipPlugin  | Adds `service-point-addresses` relationship to `service-points` resource. |               | \Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |

**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\ServicePointsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ServicePointAddressesByServicePointsBackendResourceRelationshipPlugin;
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
        
        ...
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that you can send the following requests:

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
* `POST https://glue-backend.mysprykershop.com/service-points/{{service-point-uuid}}/service-point-addresses`
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

* `PATCH https://glue-backend.mysprykershop.com/service-points/{{service-point-uuid}}/service-point-addresses/{{service-point-address-uuid}}`
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

* `GET https://glue-backend.mysprykershop.com/service-points/{{service-point-uuid}}/service-point-addresses`

{% endinfo_block %}
