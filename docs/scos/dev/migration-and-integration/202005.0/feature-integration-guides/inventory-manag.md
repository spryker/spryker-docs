---
title: Inventory Management Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/inventory-management-feature-integration
redirect_from:
  - /v5/docs/inventory-management-feature-integration
  - /v5/docs/en/inventory-management-feature-integration
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place.</br>The current Feature Integration guide only adds the **Warehouse Management** functionality.
{% endinfo_block %}

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Inventory Management | master |

### 1) Install the Required Modules Using Composer
Run the following command to install the required module:

```bash
composer require spryker-feature/inventory-management: "^master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`Stock`</td><td>`vendor/spryker/stock`</td></tr><tr><td>`StockDataImport`</td><td>`vendor/spryker/stock-data-import`</td></tr><tr><td>`StockGui`</td><td>`vendor/spryker/stock-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`StockTransfer`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/StockTransfer.php`</td></tr><tr><td>`StockCriteriaFilterTransfer`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/StockCriteriaFilterTransfer.php`</td></tr><tr><td>`StockResponseTransfer`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/StockResponseTransfer.php`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_stock_store`</td><td>table</td><td>added</td></tr><tr><td>`spy_stock.is_active`</td><td>column</td><td>added</td></tr></tbody></table>
{% endinfo_block %}

### 3) Import Data
#### Import Warehouses
Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/StockDataImport/data/import/warehouse.csv**

```yaml
name,is_active
Warehouse1,1
Warehouse2,1
Warehouse3,0
```
    
| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `name` | mandatory | string | Warehouse1 | Name of the warehouse. |
| `is_active` | mandatory | bool | 1 | Is the warehouse activated? |

**vendor/spryker/spryker/Bundles/StockDataImport/data/import/warehouse_store.csv**
    
```yaml
warehouse_name,store_name
Warehouse1,DE
Warehouse2,DE
Warehouse2,AT
Warehouse2,US
```

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `warehouse_name` | mandatory | string | Warehouse1 | Name of the warehouse. |
| `store_name` | mandatory | string | DE | Name of the store where the warehouse is available. |

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
 
...
 
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
 
...
 
        $dataImporterCollection->addDataImporterPlugins($this->getDataImporterPlugins());
 
        $dataImporterCollection
            ->addDataImporter($this->createProductStockImporter());
 
        return $dataImporterCollection;
    }
 
...
 
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

### 4) Set up Behavior 
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

