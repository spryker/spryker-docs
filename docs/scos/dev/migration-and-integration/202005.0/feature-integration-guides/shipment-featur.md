---
title: Shipment Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/shipment-feature-integration
redirect_from:
  - /v5/docs/shipment-feature-integration
  - /v5/docs/en/shipment-feature-integration
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place.</br>The current Feature Integration guide only adds the following functionalities:<ul><li>Shipment Back Office UI;</li><li>Delivery method per store;</li><li>Shipment data import.</li></ul>
{% endinfo_block %}

## Install Feature Core
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/shipment:"^master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`ShipmentDataImport`</td><td>`vendor/spryker/shipment-data-import`</td></tr><tr><td>`ShipmentGui`</td><td>`vendor/spryker/ShipmentGui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_shipment_method_store`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`ShipmentTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ShipmentTransfer`</td></tr><tr><td>`StoreTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreTransfer`</td></tr><tr><td>`DataImporterConfigurationTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterConfigurationTransfer`</td></tr><tr><td>`DataImporterReaderConfigurationTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer`</td></tr><tr><td>`DataImporterReportTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterReportTransfer`</td></tr><tr><td>`DataImporterReportMessageTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterReportMessageTransfer`</td></tr><tr><td>`TotalsTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/TotalsTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Import Data
#### Import Shipment Methods

{% info_block infoBox "Info" %}
The following imported entities will be used as shipment methods in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ShipmentDataImport/data/import**
    
```yaml
shipment_method_key,store
spryker_dummy_shipment-standard,AT
spryker_dummy_shipment-standard,DE
spryker_dummy_shipment-standard,US
spryker_dummy_shipment-express,AT
spryker_dummy_shipment-express,DE
spryker_dummy_shipment-express,US
spryker_drone_shipment-air_standard,AT
spryker_drone_shipment-air_standard,DE
spryker_drone_shipment-air_standard,US
spryker_drone_shipment-air_sonic,AT
spryker_drone_shipment-air_sonic,DE
spryker_drone_shipment-air_sonic,US
spryker_drone_shipment-air_light,AT
spryker_drone_shipment-air_light,DE
spryker_drone_shipment-air_light,US
spryker_no_shipment,AT
spryker_no_shipment,DE
spryker_no_shipment,US
```

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `shipment_method_key` | mandatory | string | spryker_dummy_shipment-standard | Key of an existing shipping method. |
| `store` | mandatory | string | DE | Name of an existing store. |

Register the following data import plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ShipmentDataImportPlugin` | Imports shipment method data into the database. | None | `\Spryker\Zed\ShipmentDataImport\Communication\Plugin` |
| `ShipmentMethodPriceDataImportPlugin` | Imports shipment method price data into the database. | None | `\Spryker\Zed\ShipmentDataImport\Communication\Plugin` |
| `ShipmentMethodStoreDataImportPlugin` | Imports shipment method store data into the database. | None | `\Spryker\Zed\ShipmentDataImport\Communication\Plugin` |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentMethodPriceDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentMethodStoreDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ShipmentDataImportPlugin(),
            new ShipmentMethodPriceDataImportPlugin(),
            new ShipmentMethodStoreDataImportPlugin(),
        ];
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
use Spryker\Zed\ShipmentDataImport\ShipmentDataImportConfig;
 
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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentDataImportConfig::IMPORT_TYPE_SHIPMENT),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentDataImportConfig::IMPORT_TYPE_SHIPMENT_PRICE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentDataImportConfig::IMPORT_TYPE_SHIPMENT_METHOD_STORE),
        ];
 
        return $commands;
    }
}
```

Run the following console command to import data:

```bash
console data:import:shipment
console data:import:shipment-price
console data:import:shipment-method-store
```

{% info_block warningBox "Verification" %}
Make sure that the configured data has been added to the `spy_shipment_method`, `spy_shipment_method_price`, and `spy_shipment_method_store` tables in the database.
{% endinfo_block %}

### 4) Set up Behavior
Configure the data import to use your data on the project level.

**src/Pyz/Zed/ShipmentDataImport/ShipmentDataImportConfig**
    
```php
<?php
 
namespace Pyz\Zed\ShipmentDataImport;
 
use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\ShipmentDataImport\ShipmentDataImportConfig as SprykerShipmentDataImportConfig;
 
class ShipmentDataImportConfig extends SprykerShipmentDataImportConfig
{
    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment.csv', static::IMPORT_TYPE_SHIPMENT);
    }
 
    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentMethodPriceDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment_price.csv', static::IMPORT_TYPE_SHIPMENT_PRICE);
    }
}
```

Configure shipment GUI module with money and store plugins.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MoneyCollectionFormTypePlugin` | Represents the money collection fields based on stores, currencies, and price types defined in the system. | None | `Spryker\Zed\Money\Communication\Plugin\Form` |
| `StoreRelationToggleFormTypePlugin` | Represents a store relation toggle form based on stores registered in the system. | None | `Spryker\Zed\Store\Communication\Plugin\Form` |
|`ShipmentTotalCalculatorPlugin`|Calculates shipment total using expenses.|None|`Spryker\Zed\Shipment\Communication\Plugin\Calculation`|

**src/Pyz/Zed/ShipmentGui/ShipmentGuiDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\ShipmentGui;
 
use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Money\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\ShipmentGui\ShipmentGuiDependencyProvider as SprykerShipmentGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;
 
class ShipmentGuiDependencyProvider extends SprykerShipmentGuiDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getMoneyCollectionFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyCollectionFormTypePlugin();
    }
 
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
Make sure that:<ul><li>You can see the list of shipment methods in the **Back Office > Administration >  Shipments > Delivery Methods** section.</li><li>You can see information about the shipment method in the **Back Office > Administration >  Shipments > Delivery Methods > View** section.</li><li>You can create the shipment method in the **Back Office > Administration >  Shipments > Delivery Methods > Create** section.</li><li>You can edit the shipment method in the **Back Office > Administration >  Shipments > Delivery Methods > Edit** section.</li><li>You can delete the shipment method in the **Back Office > Administration > Shipments > Delivery Methods > Delete** section.</li></ul>
{% endinfo_block %}

**src/Pyz/Zed/Calculation/CalculationDependencyProvider.php**
```php
<?php
 
namespace Pyz\Zed\Calculation;
 
use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Shipment\Communication\Plugin\Calculation\ShipmentTotalCalculatorPlugin;
 
class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
    protected function getQuoteCalculatorPluginStack(Container $container)
    {
        return [
            new ShipmentTotalCalculatorPlugin(),
        ];
    }
}
```

