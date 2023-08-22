


This document describes how to integrate the [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) + Service Points feature into a Spryker project.

## Install feature core

Follow the steps below to install the Shipment + Service Points feature.

### Prerequisites

Install the required features:

| NAME           | VERSION          | INTEGRATION GUIDE                                                                                                                        |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Shipment       | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/enhanced-click-and-collect/install-and-upgrade/install-the-shipment-feature.html)  |
| Service Points | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/install-and-upgrade/install-the-service-points-feature.html) |

## 1) Install the required modules using Composer

```bash
composer require spryker-feature/shipment-service-points: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                                         | EXPECTED DIRECTORY                                                 |
|------------------------------------------------|--------------------------------------------------------------------|
| ShipmentTypeServicePoint                       | vendor/spryker/shipment-type-service-point                         |
| ShipmentTypeServicePointDataImport             | vendor/spryker/shipment-type-service-point-data-import             |
| ShipmentTypesServicePointsResourceRelationship | vendor/spryker/shipment-types-service-points-resource-relationship |

{% endinfo_block %}

## 2) Import data

1. Prepare your data according to your requirements using our demo data:

**data/import/common/common/shipment_type_service_type.csv**

```csv
shipment_type_key,service_type_key
pickup,pickup
```

| COLUMN            | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                 |
|-------------------|-----------|-----------|--------------|----------------------------------|
| shipment_type_key | mandatory | string    | pickup       | Unique key of the shipment type. |
| service_type_key  | mandatory | string    | pickup       | Unique key of the service type.  |

2. Enable data imports at your configuration file—for example:

**data/import/local/full_EU.yml**

```yml
    - data_entity: shipment-type-service-type
      source: data/import/common/common/shipment_type_service_type.csv
```

3. Register the following data import plugins:

| PLUGIN                                  | SPECIFICATION                                                        | PREREQUISITES | NAMESPACE                                                                       |
|-----------------------------------------|----------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ShipmentTypeServiceTypeDataImportPlugin | Imports shipment type service type relations data into the database. |               | \Spryker\Zed\ShipmentTypeServicePointDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShipmentTypeServicePointDataImport\Communication\Plugin\DataImport\ShipmentTypeServiceTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ShipmentTypeServiceTypeDataImportPlugin(),
        ];
    }
}
```

4. To enable the behaviors, register the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentTypeServicePointDataImport\ShipmentTypeServicePointDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ShipmentTypeServicePointDataImportConfig::IMPORT_TYPE_SHIPMENT_TYPE_SERVICE_TYPE),
        ];
    }
}
```

5. Import data:

```bash
console data:import:shipment-type-service-type
```

{% info_block warningBox “Verification” %}

Make sure that entities were imported to the `spy_shipment_type_service_type` database table.

{% endinfo_block %}

## 3) Set up behavior

1. Enable the expanding of shipment type storage data with service type by registering the following plugins:

| PLUGIN                                       | SPECIFICATION                                                                                                       | PREREQUISITES | NAMESPACE                                                                     |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| ServiceTypeShipmentTypeStorageExpanderPlugin | Expands `ShipmentTypeStorageTransfer` with the service type data by `ShipmentTypeStorageTransfer.servicetype.uuid`. |               | Spryker\Client\ShipmentTypeServicePoint\Plugin\ShipmentTypeStorage            |
| ServiceTypeShipmentTypeStorageExpanderPlugin | Expands `ShipmentTypeStorageTransfer.serviceType` with the service type UUID.                                       |               | Spryker\Zed\ShipmentTypeServicePoint\Communication\Plugin\ShipmentTypeStorage |

**src/Pyz/Client/ShipmentTypeStorage/ShipmentTypeStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ShipmentTypeStorage;

use Spryker\Client\ShipmentTypeServicePoint\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin;
use Spryker\Client\ShipmentTypeStorage\ShipmentTypeStorageDependencyProvider as SprykerShipmentTypeStorageDependencyProvider;

class ShipmentTypeStorageDependencyProvider extends SprykerShipmentTypeStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface>
     */
    protected function getShipmentTypeStorageExpanderPlugins(): array
    {
        return [
            new ServiceTypeShipmentTypeStorageExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ShipmentTypeStorage/ShipmentTypeStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShipmentTypeStorage;

use Spryker\Zed\ShipmentTypeServicePoint\Communication\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin;
use Spryker\Zed\ShipmentTypeStorage\ShipmentTypeStorageDependencyProvider as SprykerShipmentTypeStorageDependencyProvider;

class ShipmentTypeStorageDependencyProvider extends SprykerShipmentTypeStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface>
     */
    protected function getShipmentTypeStorageExpanderPlugins(): array
    {
        return [
            new ServiceTypeShipmentTypeStorageExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `shipment-type` storage data is expanded with the service type UUID:

1. Fill the `spy_shipment_type_service_point` tables with data.
2. Run the `console publish:trigger-events -r shipment_type` command.
3. Make sure that the `spy_shipment_type_storage.data` field includes `service_type.uuid` data.

{% endinfo_block %}

3. Enable relationship between `shipment-types` and `service-types` resources in the Storefront API by registering the following plugins:

| PLUGIN                                               | SPECIFICATION                                                      | PREREQUISITES | NAMESPACE                                                                          |
|------------------------------------------------------|--------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------|
| ServiceTypeByShipmentTypesResourceRelationshipPlugin | Adds `service-types` resource as relationship by `shipment-types`. |               | Spryker\Glue\ShipmentTypesServicePointsResourceRelationship\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ShipmentTypesRestApi\ShipmentTypesRestApiConfig;
use Spryker\Glue\ShipmentTypesServicePointsResourceRelationship\Plugin\GlueApplication\ServiceTypeByShipmentTypesResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ShipmentTypesRestApiConfig::RESOURCE_SHIPMENT_TYPES,
            new ServiceTypeByShipmentTypesResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can include the `service-types` relation in the `shipment-types` resource requests.
* `GET https://glue.mysprykershop.com/shipment-types?include=service-types`
* `GET https://glue.mysprykershop.com/shipment-types/{{shipment-type-uuid}}?include=service-types`

{% endinfo_block %}
