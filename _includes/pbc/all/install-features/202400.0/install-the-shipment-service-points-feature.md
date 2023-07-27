


This document describes how to integrate the [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) + Service Points feature into a Spryker project.

## Install feature core

Follow the steps below to install the Shipment + Service Points feature.
To start feature integration, integrate the required features:

### Prerequisites

To start feature integration, integrate the required features:

| NAME           | VERSION          | INTEGRATION GUIDE                                                                                                                        |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Shipment       | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/enhanced-click-and-collect/install-and-upgrade/install-the-shipment-feature.html)  |
| Service Points | {{page.version}} | [Service Points feature integration](/docs/pbc/all/service-points/{{page.version}}/install-and-upgrade/install-the-service-points-feature.html) |

## 1) Install the required modules using Composer

```bash
composer require spryker/shipment-type-service-point:"^0.1.0" spryker/shipment-type-service-point-data-import:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                             | EXPECTED DIRECTORY                                     |
|------------------------------------|--------------------------------------------------------|
| ShipmentTypeServicePoint           | vendor/spryker/shipment-type-service-point             |
| ShipmentTypeServicePointDataImport | vendor/spryker/shipment-type-service-point-data-import |

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

4. Enable the behaviors by registering the console commands:

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

## 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                       | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                        |
|----------------------------------------------|--------------------------------------------------------------|---------------|--------------------------------------------------|
| ServiceTypeShipmentTypeStorageExpanderPlugin | Expands `ShipmentTypeStorageTransfer` with service type key. |               | Spryker\Zed\PickingList\Communication\Plugin\Oms |

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

Make sure that `shipment-type` storage data is expanded with service type field:

1. Fill the `spy_shipment_type_service_point` tables with data.
2. Run the `console publish:trigger-events -r shipment_type` command.
3. Make sure that the `spy_shipment_type_storage.data` field includes `service_type` data.

{% endinfo_block %}
