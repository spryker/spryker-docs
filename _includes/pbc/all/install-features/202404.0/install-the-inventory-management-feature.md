

This document describes how to install the [Inventory Management](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html) feature.

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.

The current feature integration guide adds the following functionality:
* [Warehouse Management](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html#warehouse-management)
* [Add to cart from catalog page](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/cart-feature-overview/quick-order-from-the-catalog-page-overview.html)
* [Warehouse address](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html#defining-a-warehouse-address)

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Inventory Management feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                           |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/inventory-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                            |
|------------------------------|-----------------------------------------------|
| Stock                        | vendor/spryker/stock                          |
| StockDataImport              | vendor/spryker/stock-data-import              |
| StockGui                     | vendor/spryker/stock-gui                      |
| StockAddress                 | vendor/spryker/stock-address                  |
| StockAddressDataImport       | vendor/spryker/stock-address-data-import      |
| WarehouseAllocation          | vendor/spryker/warehouse-allocation           |
| WarehouseAllocationExtension | vendor/spryker/warehouse-allocation-extension |
| WarehousesBackendApi         | vendor/spryker/warehouses-backend-api         |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Adjust the schema definition so `EventTransfer` has the additional columns for the Availability entity:

**src/Pyz/Zed/Availability/Persistence/Propel/Schema/spy_availability.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Availability\Persistence" package="src.Orm.Zed.Availability.Persistence">

    <table name="spy_availability_abstract">
        <behavior name="event">
            <parameter name="spy_availability_abstract_quantity" column="quantity" value="0" operator="==="/>
        </behavior>
    </table>

    <table name="spy_availability">
        <behavior name="event">
            <parameter name="spy_availability_is_never_out_of_stock" column="is_never_out_of_stock"/>
            <parameter name="spy_availability_quantity" column="quantity"/>
            <parameter name="spy_availability_sku" column="sku" keep-additional="true"/>
        </behavior>
    </table>

</database>
```

2. Configure the full import list:

**Zed/DataImport/DataImportConfig.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
use Spryker\Zed\StockAddressDataImport\StockAddressDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return list<string>
     */
    public function getFullImportTypes(): array
    {
        $customImportTypes = [
        	StockDataImportConfig::IMPORT_TYPE_STOCK,
            StockDataImportConfig::IMPORT_TYPE_STOCK_STORE,
            StockAddressDataImportConfig::IMPORT_TYPE_STOCK_ADDRESS,
        ];

        return array_merge(parent::getFullImportTypes(), $customImportTypes);
    }
}
```

3. Generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                       | TYPE  | EVENT | PATH                                                                 |
|--------------------------------|-------|-------|----------------------------------------------------------------------|
| Item                           | class | added | src/Generated/Shared/Transfer/ItemTransfer                           |
| Order                          | class | added | src/Generated/Shared/Transfer/OrderTransfer                          |
| Stock                          | class | added | src/Generated/Shared/Transfer/StockTransfer                          |
| StockCriteriaFilter            | class | added | src/Generated/Shared/Transfer/StockCriteriaFilterTransfer            |
| StockResponse                  | class | added | src/Generated/Shared/Transfer/StockResponseTransfer                  |
| StockAddress                   | class | added | src/Generated/Shared/Transfer/StockAddressTransfer                   |
| WarehouseAllocation            | class | added | src/Generated/Shared/Transfer/WarehouseAllocationTransfer            |
| WarehouseAllocationCriteria    | class | added | src/Generated/Shared/Transfer/WarehouseAllocationCriteriaTransfer    |
| WarehouseAllocationConditions  | class | added | src/Generated/Shared/Transfer/WarehouseAllocationConditionsTransfer  |
| WarehouseAllocationCollection  | class | added | src/Generated/Shared/Transfer/WarehouseAllocationCollectionTransfer  |
| WarehouseResourceCollection    | class | added | src/Generated/Shared/Transfer/WarehouseAllocationCollectionTransfer  |
| WarehousesBackendApiAttributes | class | added | src/Generated/Shared/Transfer/WarehousesBackendApiAttributesTransfer |

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY          | TYPE    | EVENT    |
|--------------------------|---------|----------|
| spy_stock_store          | table   | created  |
| spy_stock_address        | table   | created  |
| spy_warehouse_allocation | table   | created  |
| spy_stock.is_active      | column  | added    |
| spy_stock.uuid           | column  | added    |
| spy_stock_product.uuid   | column  | added    |

Make sure that propel entities have been generated:

| FILE PATH                                                                        | EXTENDS                                                                                    |
|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| src/Orm/Zed/Stock/Persistence/Base/SpyStockStore.php                             | Spryker/Zed/Stock/Persistence/Propel/AbstractSpyStockStore.php                             |
| src/Orm/Zed/Stock/Persistence/Base/SpyStockStoreQuery.php                        | Spryker/Zed/Stock/Persistence/Propel/AbstractSpyStockStoreQuery.php                        |
| src/Orm/Zed/StockAddress/Persistence/Base/SpyStockAddress.php                    | Spryker/Zed/StockAddress/Persistence/Propel/AbstractSpyStockAddress.php                    |
| src/Orm/Zed/StockAddress/Persistence/Base/SpyStockAddressQuery.php               | Spryker/Zed/StockAddress/Persistence/Propel/AbstractSpyStockAddressQuery.php               |
| src/Orm/Zed/WarehouseAllocation/Persistence/Base/SpyWarehouseAllocation.php      | Spryker/Zed/WarehouseAllocation/Persistence/Propel/AbstractSpyWarehouseAllocation.php      |
| src/Orm/Zed/WarehouseAllocation/Persistence/Base/SpyWarehouseAllocationQuery.php | Spryker/Zed/WarehouseAllocation/Persistence/Propel/AbstractSpyWarehouseAllocationQuery.php |

Make sure that `SpyAvailabilityTableMap::getBehaviors()` provides mapping for `spy_availability_is_never_out_of_stock`, `spy_availability_quantity`, and `spy_availability_sku`.

{% endinfo_block %}

### 3) Configure OMS

1. Create the OMS subprocess file:

**config/Zed/oms/WarehouseAllocationSubprocess/WarehouseAllocation01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="WarehouseAllocation">
        <states>
            <state name="warehouse allocated" reserved="true"/>
        </states>

        <events>
            <event name="allocate warehouse" onEnter="true" command="WarehouseAllocation/WarehouseAllocate"/>
        </events>
    </process>
</statemachine>
```

2. Using the `DummyPayment01.xml` process as an example, adjust your OMS state machine configuration according to your project's requirements.

**config/Zed/oms/DummyPayment01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>
    <process name="DummyPayment01" main="true">
        <transitions>

            <transition happy="true">
                <source>new</source>
                <target>warehouse allocated</target>
                <event>allocate warehouse</event>
            </transition>

        </transitions>

        <subprocesses>
            <process>WarehouseAllocation</process>
        </subprocesses>

    </process>

    <process name="WarehouseAllocation" file="WarehouseAllocationSubprocess/WarehouseAllocation01.xml"/>

</statemachine>
```

### 4) Configure export to Elasticsearch

{% info_block errorBox %}

This section is only related to the integration of the *Add to cart from catalog page* functionality.

{% endinfo_block %}

Install the following plugins:

| PLUGIN                                     | SPECIFICATION                                    | PREREQUISITES | NAMESPACE                                                       |
|--------------------------------------------|--------------------------------------------------|---------------|-----------------------------------------------------------------|
| AvailabilityProductAbstractAddToCartPlugin | Filters out the products that are not available. |               | Spryker\Zed\Availability\Communication\Plugin\ProductPageSearch |


**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\Availability\Communication\Plugin\ProductPageSearch\AvailabilityProductAbstractAddToCartPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractAddToCartPluginInterface[]
     */
    protected function getProductAbstractAddToCartPlugins(): array
    {
        return [
            new AvailabilityProductAbstractAddToCartPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that only abstract products with a single concrete product have the `add_to_cart_sku` field in the Elasticsearch document.

{% endinfo_block %}

### 5) Import warehouses and warehouse address data

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/StockDataImport/data/import/warehouse.csv**

```csv
name,is_active
Warehouse1,1
Warehouse2,1
Warehouse3,0
Roan Warehouse 1,1
Steenbok Warehouse 1,1
Spryker MER000001 Warehouse 1,1
Video King MER000002 Warehouse 1,1
Budget Cameras MER000005 Warehouse 1,1
Sony Experts MER000006 Warehouse 1,1
```


| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                    |
|-----------|-----------|-----------|--------------|-------------------------------------|
| name      | ✓ | string    | Warehouse1   | Name of the warehouse.              |
| is_active | ✓ | bool      | 1            | Defines if the warehouse is active. |

**vendor/spryker/spryker/Bundles/StockDataImport/data/import/warehouse_store.csv**

```csv
warehouse_name,store_name
Warehouse1,DE
Warehouse2,DE
Warehouse2,AT
Warehouse2,US
```


| COLUMN         | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                      |
|----------------|-----------|-----------|--------------|-------------------------------------------------------|
| warehouse_name | ✓ | string    | Warehouse1   | Name of the warehouse.                                |
| store_name     | ✓ | string    | DE           | Name of the store the warehouse will be available in. |

**data/import/common/common/warehouse_address.csv**

```csv
warehouse_name,address1,address2,address3,zip_code,city,region_name,country_iso2_code,phone,comment
Warehouse1,Hallesches Ufer 71,,,73271,Holzmaden,,DE,+49 7023 87 33 18,
Warehouse2,Leobnerstrasse 19,,,3107,Greiling,,AT,+43 699 173 76 39,
Warehouse3,641 Pursglove Court,,,97758,Riley,,US,+1 937-280-4973,
Spryker MER000001 Warehouse 1,Lietzenburger Strasse 73,,,52391,Vettweiß,,DE,+49 2252 53 42 48,
Video King MER000002 Warehouse 1,Los-Angeles-Platz 12,,,22826,Norderstedt,,DE,+49 40 44 63 66,
Budget Cameras MER000005 Warehouse 1,Kurfuerstendamm 96,,,89077,Ulm Weststadt,,DE,+49 73 52 52 98,
Sony Experts MER000006 Warehouse 1,Wallstrasse 58,,,53507,Dernau,,DE,+49 2643 48 41 25,
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE       | DATA EXPLANATION                          |
|-------------------|-----------|-----------|--------------------|-------------------------------------------|
| warehouse_name    | ✓ | string    | Warehouse1         | Warehouse name.                           |
| address1          | ✓ | string    | Hallesches Ufer 71 | The first line of the warehouse address.  |
| address2          | optional  | string    |                    | The second line of the warehouse address. |
| address3          | optional  | string    |                    | The third line of the warehouse address.  |
| zip_code          | ✓ | string    | 73271              | Zipcode.                                  |
| city              | ✓ | string    | Holzmaden          | City.                                     |
| region_name       | optional  | string    |                    | Region name from the `spy_region` table.  |
| country_iso2_code | ✓ | string    | DE                 | The ISO code of the country.              |
| phone             | optional  | string    | +49 7023 87 33 18  | Landline or any other contact phone.      |
| comment           | optional  | string    |                    | Any related comment.                      |


{% info_block warningBox “Verification” %}

Make sure the following:
* The CSV files have an empty line at the end.
* Each `warehouse_name` entry in `warehouse_address.csv` has a respective `name` entry in the `warehouse.csv`.

{% endinfo_block %}

2. Update the following import action files with the following action:
   * `data/import/common/commerce_setup_import_config_{SPRYKER_STORE}.yml`
   * `data/import/local/full\_{SPRYKER\_STORE}.yml`
   * `data/import/production/full\_{SPRYKER\_STORE}.yml`

```yaml
  - data_entity: stock-address
    source: data/import/common/common/warehouse_address.csv
```

{% info_block infoBox %}

Replace `{SPRYKER_STORE}` in the file paths with the desired stores—for example, `EU`, `US`, or `AT`.

{% endinfo_block %}


3. Register the following plugins to enable data import:

Add these plugins to the end of the plugins list but before `ProductOfferStockDataImportPlugin`.

| PLUGIN                       | SPECIFICATION                                                                        | PREREQUISITES | NAMESPACE                                                          |
|------------------------------|--------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------|
| StockDataImportPlugin        | Imports warehouse data into the database.                                            | None          | \Spryker\Zed\StockDataImport\Communication\Plugin                  |
| StockStoreDataImportPlugin   | Imports data about the relationship between warehouses and stores into the database. | None          | \Spryker\Zed\StockDataImport\Communication\Plugin                  |
| StockAddressDataImportPlugin | Imports warehouse addresses.                                                         | None          | Spryker\Zed\StockAddressDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\StockDataImport\Communication\Plugin\StockDataImportPlugin;
use Spryker\Zed\StockDataImport\Communication\Plugin\StockStoreDataImportPlugin;
use Spryker\Zed\StockAddressDataImport\Communication\Plugin\DataImport\StockAddressDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new StockDataImportPlugin(),
            new StockStoreDataImportPlugin(),
			new StockAddressDataImportPlugin(),
        ];
    }
}
```

4. In `Pyz\Zed\DataImport\Business\DataImportBusinessFactory::getImporter()`, move the existing product stock importer after the call of `addDataImporterPlugins()`:

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport\Business;

use Spryker\Zed\DataImport\Business\DataImportBusinessFactory as SprykerDataImportBusinessFactory;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 */
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterCollectionInterface
     */
    public function getImporter()
    {
        $dataImporterCollection = $this->createDataImporterCollection();
        $dataImporterCollection->addDataImporterPlugins($this->getDataImporterPlugins());
        $dataImporterCollection->addDataImporter($this->createProductStockImporter());

        return $dataImporterCollection;
    }

}
```

5. Enable behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\StockDataImport\StockDataImportConfig;
use Spryker\Zed\StockAddressDataImport\StockAddressDataImportConfig;

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
			new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . StockDataImportConfig::IMPORT_TYPE_STOCK),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . StockDataImportConfig::IMPORT_TYPE_STOCK_STORE),
 			new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . StockAddressDataImportConfig::IMPORT_TYPE_STOCK_ADDRESS),
		];

		return $commands;
    }
}
```

6. Import data:

```bash
console data:import stock
console data:import stock-store
console data:import stock-address
```

{% info_block warningBox "Verification" %}

Make sure that warehouse and warehouse address data have been added to the `spy_stock`, `spy_stock_store` and `spy_stock_address` tables.

{% endinfo_block %}

### 6) Set up behavior

1. Build a navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

2. Configure the stock GUI module with a store form plugin.


| PLUGIN                            | SPECIFICATION                                               | PREREQUISITES | NAMESPACE                                   |
|-----------------------------------|-------------------------------------------------------------|---------------|---------------------------------------------|
| StoreRelationToggleFormTypePlugin | Store relation checklist form based on the existing stores. |               | Spryker\Zed\Store\Communication\Plugin\Form |


**src/Pyz/Zed/StockGui/StockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\StockGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\StockGui\StockGuiDependencyProvider as SprykerStockGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class StockGuiDependencyProvider extends SprykerStockGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the navigation for Stock GUI has been successfully generated. Check that, in the navigation menu of the Back Office, the **Administration** menu with the **Warehouses** submenu is displayed.

{% endinfo_block %}

3. Register the following plugins for warehouse address management:

| PLUGIN                                    | SPECIFICATION                                                                                                                                                              | PREREQUISITES | NAMESPACE                                           |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------|
| StockAddressStockPostCreatePlugin         | Creates a warehouse address if it's attached to a warehouse create request.                                                                                                |               | Spryker\Zed\StockAddress\Communication\Plugin\Stock |
| StockAddressStockPostUpdatePlugin         | Creates a warehouse address if it's attached to a warehouse update request. <br> Removes an existing warehouse address if it's not attached to a warehouse update request. |               | Spryker\Zed\StockAddress\Communication\Plugin\Stock |
| StockAddressStockCollectionExpanderPlugin | Expands a warehouse collection with related addresses.                                                                                                                     |               | Spryker\Zed\StockAddress\Communication\Plugin\Stock |

<details open><summary markdown='span'>Zed/Stock/StockDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Stock;

use Spryker\Zed\StockAddress\Communication\Plugin\Stock\StockAddressStockCollectionExpanderPlugin;
use Spryker\Zed\StockAddress\Communication\Plugin\Stock\StockAddressStockPostCreatePlugin;
use Spryker\Zed\StockAddress\Communication\Plugin\Stock\StockAddressStockPostUpdatePlugin;

class StockDependencyProvider extends SprykerStockDependencyProvider
{
    /**
     * @return \Spryker\Zed\StockExtension\Dependency\Plugin\StockCollectionExpanderPluginInterface[]
     */
    protected function getStockCollectionExpanderPlugins(): array
    {
        return [
            new StockAddressStockCollectionExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\StockExtension\Dependency\Plugin\StockPostCreatePluginInterface[]
     */
    protected function getStockPostCreatePlugins(): array
    {
        return [
            new StockAddressStockPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\StockExtension\Dependency\Plugin\StockPostUpdatePluginInterface[]
     */
    protected function getStockPostUpdatePlugins(): array
    {
        return [
            new StockAddressStockPostUpdatePlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that the warehouse address management works:
1. In the Back Office, create a warehouse.
2. Import a warehouse address using a data import functionality.
3. Check if the imported warehouse address exists in the `spy_stock_address` database table.

{% endinfo_block %}

4. Register the following plugins for warehouse allocation:

| PLUGIN                                     | SPECIFICATION                             | PREREQUISITES | NAMESPACE                                                |
|--------------------------------------------|-------------------------------------------|---------------|----------------------------------------------------------|
| SalesOrderWarehouseAllocationCommandPlugin | Allocates warehouse for sales order item. |               | Spryker\Zed\WarehouseAllocation\Communication\Plugin\Oms |


**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\WarehouseAllocation\Communication\Plugin\Oms\SalesOrderWarehouseAllocationCommandPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
       $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new SalesOrderWarehouseAllocationCommandPlugin(), 'WarehouseAllocation/WarehouseAllocate');

            return $commandCollection;
        });

        return $container;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that after the order is created, order items gain the `warehouse allocated` status.

{% endinfo_block %}

## Implement and integrate the warehouse allocation process for product and product offer order items
This section describes an example of how to implement and integrate the warehouse allocation process for product and product offer order items and how this process work.

Follow the steps below to install an example for product and product offer warehouse allocations.

### Prerequisites

To start integration, integrate the required features:

| NAME                   | VERSION          | INSTALLATION GUIDE                                                 |
|------------------------|------------------|-------------------------------------------------------------------|
| Inventory Management   | {{page.version}} | [Inventory Mamagement feature integration](#install-feature-core) |

### 1) Install the required modules

```bash
composer require spryker/product-warehouse-allocation-example:"^0.3.0" --update-with-dependencies
composer require spryker/product-offer-warehouse-allocation-example:"^0.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                 | EXPECTED DIRECTORY                                         |
|----------------------------------------|------------------------------------------------------------|
| ProductWarehouseAllocationExample      | vendor/spryker/product-warehouse-allocation-example        |
| ProductOfferWarehouseAllocationExample | vendor/spryker/product-offer-warehouse-allocation-example  |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                              | TYPE  | EVENT | PATH                                                                    |
|---------------------------------------|-------|-------|-------------------------------------------------------------------------|
| ProductOfferTransfer                  | class | added | src/Generated/Shared/Transfer/ProductOfferTransfer.php                  |
| ProductOfferStockTransfer             | class | added | src/Generated/Shared/Transfer/ProductOfferStockTransfer.php             |
| ProductOfferWarehouseCriteriaTransfer | class | added | src/Generated/Shared/Transfer/ProductOfferWarehouseCriteriaTransfer.php |
| ProductWarehouseCriteriaTransfer      | class | added | src/Generated/Shared/Transfer/ProductWarehouseCriteriaTransfer.php      |
| StockProductTransfer                  | class | added | src/Generated/Shared/Transfer/StockProductTransfer.php                  |
| StoreRelationTransfer                 | class | added | src/Generated/Shared/Transfer/StoreRelationTransfer.php                 |
| StoreTransfer                         | class | added | src/Generated/Shared/Transfer/StoreTransfer.php                         |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                          | SPECIFICATION                                                                | PREREQUISITES | NAMESPACE                                                                                   |
|-------------------------------------------------|------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------|
| ProductSalesOrderWarehouseAllocationPlugin      | Associates warehouses to a sales order product item.                         |               | Spryker\Zed\ProductWarehouseAllocationExample\Communication\Plugin\WarehouseAllocation      |
| ProductOfferSalesOrderWarehouseAllocationPlugin | Associates warehouses to a sales order product offer item.                   |               | Spryker\Zed\ProductOfferWarehouseAllocationExample\Communication\Plugin\WarehouseAllocation |
| WarehouseOrderItemExpanderPlugin                | Expands order item with warehouse.                                           |               | Spryker\Zed\WarehouseAllocation\Communication\Plugin\Sales                                  |
| ProductConcreteAfterCreatePlugin                | Persists product stock data after product is created.                        |               | Spryker\Zed\Stock\Communication\Plugin                                                      |
| ProductConcreteAfterUpdatePlugin                | Persists product stock data after product is updated.                        |               | Spryker\Zed\Stock\Communication\Plugin                                                      |
| StockProductConcreteExpanderPlugin              | Expands product concrete transfers with stock information from the database. |               | Spryker\Zed\Stock\Communication\Plugin\Product                                              |

**src/Pyz/Zed/WarehouseAllocation/WarehouseAllocationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\WarehouseAllocation;

use Spryker\Zed\ProductOfferWarehouseAllocationExample\Communication\Plugin\WarehouseAllocation\ProductOfferSalesOrderWarehouseAllocationPlugin;
use Spryker\Zed\ProductWarehouseAllocationExample\Communication\Plugin\WarehouseAllocation\ProductSalesOrderWarehouseAllocationPlugin;
use Spryker\Zed\WarehouseAllocation\WarehouseAllocationDependencyProvider as SprykerWarehouseAllocationDependencyProvider;

class WarehouseAllocationDependencyProvider extends SprykerWarehouseAllocationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\WarehouseAllocationExtension\Dependency\Plugin\SalesOrderWarehouseAllocationPluginInterface>
     */
    protected function getSalesOrderWarehouseAllocationPlugins(): array
    {
        return [
            new ProductOfferSalesOrderWarehouseAllocationPlugin(),
            new ProductSalesOrderWarehouseAllocationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\WarehouseAllocation\Communication\Plugin\Sales\WarehouseOrderItemExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new WarehouseOrderItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Zed\Stock\Communication\Plugin\Product\StockProductConcreteExpanderPlugin;
use Spryker\Zed\Stock\Communication\Plugin\ProductConcreteAfterCreatePlugin as StockProductConcreteAfterCreatePlugin;
use Spryker\Zed\Stock\Communication\Plugin\ProductConcreteAfterUpdatePlugin as StockProductConcreteAfterUpdatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteCreatePluginInterface>
     */
    protected function getProductConcreteAfterCreatePlugins(Container $container): array
    {
        return [
            new StockProductConcreteAfterCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginUpdateInterface>
     */
    protected function getProductConcreteAfterUpdatePlugins(Container $container): array
    {
        return [
            new StockProductConcreteAfterUpdatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface>
     */
    protected function getProductConcreteExpanderPlugins(): array
    {
        return [
            new StockProductConcreteExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Make sure that after the order is created, the new row in the `warehouse_allocation` table is created with the appropriate `warehouseId` for the product and product offer in the order accordingly.
2. Make sure that when you retrieve an order each order item has warehouse property set.
3. Make sure that product stock data is persisted in `spy_stock_product` database table after creating/updating concrete product.

{% endinfo_block %}

## Install related features

| FEATURE                  | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                          |
|--------------------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Inventory Management API |                                  | [Install the Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-glue-api.html)                |
| Alternative Products     |                                  | [Install the Alternative Products + Inventory Management feature - ongoing](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-inventory-management-feature.html) |
