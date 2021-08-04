---
title: Inventory management feature integration
originalLink: https://documentation.spryker.com/v6/docs/inventory-management-feature-integration
redirect_from:
  - /v6/docs/inventory-management-feature-integration
  - /v6/docs/en/inventory-management-feature-integration
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place.</br>The current Feature Integration guide only adds the **[Warehouse Management](https://documentation.spryker.com/docs/multiple-warehouse-stock
{% endinfo_block %}** and **[Add to cart from catalog page](https://documentation.spryker.com/docs/quick-order-from-the-catalog-page)** functionalities.)

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 202009.0 |

### 1) Install the Required Modules Using Composer
Run the following command to install the required module:

```bash
composer require spryker-feature/inventory-management 202009.0 --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`Stock`</td><td>`vendor/spryker/stock`</td></tr><tr><td>`StockDataImport`</td><td>`vendor/spryker/stock-data-import`</td></tr><tr><td>`StockGui`</td><td>`vendor/spryker/stock-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Adjust the schema definition so `EventTransfer` has the additional columns for Availability entity:
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

Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`StockTransfer`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/StockTransfer.php`</td></tr><tr><td>`StockCriteriaFilterTransfer`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/StockCriteriaFilterTransfer.php`</td></tr><tr><td>`StockResponseTransfer`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/StockResponseTransfer.php`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_stock_store`</td><td>table</td><td>added</td></tr><tr><td>`spy_stock.is_active`</td><td>column</td><td>added</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the `SpyAvailabilityTableMap::getBehaviors()` has mapping for `spy_availability_is_never_out_of_stock`, `spy_availability_quantity` and `spy_availability_sku`.

{% endinfo_block %}

### 3) Configure Export to Elasticsearch
{% info_block errorBox "Attention!" %}

This section only covers the **Add to cart from catalog page** related setup.

{% endinfo_block %}
Install the following plugins:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AvailabilityProductAbstractAddToCartPlugin` | Filters out products that are not available. | None | `Spryker\Zed\Availability\Communication\Plugin\ProductPageSearch` |
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

Make sure that only abstract products which have single concrete which is available have `add_to_cart_sku` field at Elasticsearch document.

{% endinfo_block %}

### 4) Import Data
#### Import Warehouses
Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/StockDataImport/data/import/warehouse.csv**

```yaml
name,is_active
Warehouse1,1
Warehouse2,1
Warehouse3,0
```
    
| Column | Is Mandatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `name` | yes | string | Warehouse1 | Name of the warehouse. |
| `is_active` | yes | bool | 1 | Is the warehouse activated? |

**vendor/spryker/spryker/Bundles/StockDataImport/data/import/warehouse_store.csv**
    
```yaml
warehouse_name,store_name
Warehouse1,DE
Warehouse2,DE
Warehouse2,AT
Warehouse2,US
```

| Column | Is Mandatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `warehouse_name` | yes | string | Warehouse1 | Name of the warehouse. |
| `store_name` | yes | string | DE | Name of the store where the warehouse is available. |

Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `StockDataImportPlugin` | Imports warehouses data into the database. | None | `\Spryker\Zed\StockDataImport\Communication\Plugin` |
| `StockStoreDataImportPlugin` | Imports data about the relationship between warehouses and stores into the database. | None | `\Spryker\Zed\StockDataImport\Communication\Plugin` |

{% info_block warningBox "Note" %}
Add these plugins to the end of the plugins list but before the `ProductOfferStockDataImportPlugin`.
{% endinfo_block %}

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
    
```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\StockDataImport\Communication\Plugin\StockDataImportPlugin;
use Spryker\Zed\StockDataImport\Communication\Plugin\StockStoreDataImportPlugin;
 
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
        ];
    }
}
```

Move the existing product stock importer after you call the `addDataImporterPlugins()` in the `Pyz\Zed\DataImport\Business\DataImportBusinessFactory::getImporter()` method:

**Pyz\Zed\DataImport\Business\DataImportBusinessFactory**

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

Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Console;
 
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\StockDataImport\StockDataImportConfig;
 
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
        ];
 
        return $commands;
    }
}
```

Run the following console command to import data:

```bash
console data:import stock
console data:import stock-store
```

{% info_block warningBox "Verification" %}
Make sure that warehouse data has been added to the `spy_stock` and `spy_stock_store`  tables in the database.
{% endinfo_block %}

### 5) Set up Behavior 
Run the following command to build navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

Configure the stock GUI module with a store form plugin.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `StoreRelationToggleFormTypePlugin` | Represents a store relation toggle form based on stores registered in the system. | None | `Spryker\Zed\Store\Communication\Plugin\Form` |

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
Make sure that the navigation for Stock GUI has been successfully generated by checking that in the Back Office, the Administration menu with the Warehouses submenu is present in the left-side navigation bar.
{% endinfo_block %}

