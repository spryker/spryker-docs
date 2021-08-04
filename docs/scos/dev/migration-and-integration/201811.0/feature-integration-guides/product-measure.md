---
title: Product Measurement Units Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/product-measurement-units-feature-integration-201811
redirect_from:
  - /v1/docs/product-measurement-units-feature-integration-201811
  - /v1/docs/en/product-measurement-units-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 2018.11.0 |
|Product|2018.11.0|
|Order Management|2018.11.0|
|Spryker Core|2018.11.0|

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:
```
composer require spryker-feature/measurement-units: "^2018.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`ProductMeasurementUnit`</td><td>`vendor/spryker/product-measurement-unit`</td></tr><tr><td>`ProductMeasurementUnitDataImport`</td><td>`vendor/spryker/product-measurement-unit-data-import`</td></tr><tr><td>`ProductMeasurementUnitStorage`</td><td>`vendor/spryker/product-measurement-unit-storage`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer objects
Adjust the schema definition so entity changes will trigger events.

|Module  |Triggered events  |
| --- | --- |
| `spy_product_measurement_unit` |  <ul><li>`Entity.spy_product_measurement_unit.create`</li><li>`Entity.spy_product_measurement_unit.update`</li><li>`Entity.spy_product_measurement_unit.delete`</li></ul> |
| `spy_product_measurement_base_unit` | <ul><li>`Entity.spy_product_measurement_base_unit.create`</li><li>`Entity.spy_product_measurement_base_unit.update`</li><li>`Entity.spy_product_measurement_base_unit.delete`</li></ul> |
| `spy_product_measurement_sales_unit` | <ul><li>`Entity.spy_product_measurement_sales_unit.create`</li><li>`Entity.spy_product_measurement_sales_unit.update`</li><li>`Entity.spy_product_measurement_sales_unit.delete`</li></ul> |
| `spy_product_measurement_sales_unit_store` | <ul><li>`Entity.spy_product_measurement_sales_unit_store.create`</li><li>`Entity.spy_product_measurement_sales_unit_store.update`</li><li>`Entity.spy_product_measurement_sales_unit_store.delete`</li></ul> |

<details open>
<summary>src/Pyz/Zed/ProductMeasurementUnit/Persistence/Propel/Schema/spy_product_measurement_unit.schema.xml</summary>

```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="OrmZedProductMeasurementUnitPersistence"
          package="src.Orm.Zed.ProductMeasurementUnit.Persistence">
     
    <table name="spy_product_measurement_unit">
        <behavior name="event">
            <parameter name="spy_product_measurement_unit_all" column="*"/>
        </behavior>
    </table>
     
    <table name="spy_product_measurement_base_unit">
        <behavior name="event">
            <parameter name="spy_product_measurement_base_unit_all" column="*"/>
        </behavior>
    </table>
  
    <table name="spy_product_measurement_sales_unit">
        <behavior name="event">
            <parameter name="spy_product_measurement_sales_unit_all" column="*"/>
        </behavior>
    </table>
 
    <table name="spy_product_measurement_sales_unit_store">
        <behavior name="event">
            <parameter name="spy_product_measurement_sales_unit_store_all" column="*"/>
        </behavior>
    </table>
 </database>
```
<br>
</details>

Run the following commands to apply database changes and generate entity and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes by checking your database:<table><thead><tr><th>Database entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_product_measurement_unit`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_measurement_base_unit`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_measurement_sales_unit`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_measurement_sales_unit_store`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_measurement_unit_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_concrete_measurement_unit_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_sales_order_item.quantity_base_measurement_unit_name`</td><td>column</td><td>created</td></tr><tr><td>`spy_sales_order_item.quantity_measurement_unit_name`</td><td>column</td><td>created</td></tr><tr><td>`spy_sales_order_item.quantity_measurement_unit_precision`</td><td>column</td><td>created</td></tr><tr><td>`spy_sales_order_item.quantity_measurement_unit_conversion`</td><td>column</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changeshave been apllied in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`ProductMeasurementUnit`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductMeasurementUnitTransfer`</td></tr><tr><td>`ProductMeasurementBaseUnit`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductMeasurementBaseUnitTransfer`</td></tr><tr><td>`ProductMeasurementSalesUnit`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductMeasurementSalesUnitTransfer`</td></tr><tr><td>`SpyProductMeasurementUnitEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductMeasurementUnitEntityTransfer`</td></tr><tr><td>`SpyProductMeasurementBaseUnitEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductMeasurementBaseUnitEntityTransfer`</td></tr><tr><td>`SpyProductMeasurementSalesUnitEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductMeasurementSalesUnitEntityTransfer`</td></tr><tr><td>`SpyProductMeasurementSalesUnitStoreEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductMeasurementSalesUnitStoreEntityTransfer`</td></tr><tr><td>`ProductMeasurementUnitStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductMeasurementUnitStorageTransfer`</td></tr><tr><td>`ProductConcreteMeasurementBaseUnit`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductConcreteMeasurementBaseUnitTransfer`</td></tr><tr><td>`ProductConcreteMeasurementSalesUnit`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductConcreteMeasurementSalesUnitTransfer`</td></tr><tr><td>`ProductConcreteMeasurementUnitStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductConcreteMeasurementUnitStorageTransfer`</td></tr><tr><td>`SpyProductMeasurementUnitStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductMeasurementUnitStorageEntityTransfer`</td></tr><tr><td>`SpyProductConcreteMeasurementUnitStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductConcreteMeasurementUnitStorageEntityTransfer`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:<table><thead><tr><th>Path</th><th>Method name</th></tr></thead><tbody><tr><td>`src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementUnit.php`</td><td><ul><li>`prepareSaveEventName(
{% endinfo_block %}`</li><li>`addSaveEventToMemory()`</li><li>`addDeleteEventToMemory()`</li></ul><td></tr><tr><td>`src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementBaseUnit.php`</td><td><ul><li>`prepareSaveEventName()`</li><li>`addSaveEventToMemory()`</li><li>`addDeleteEventToMemory()`</li></ul></td></tr><tr><td>`src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementSalesUnit.php`</td><td><ul><li>`prepareSaveEventName()`</li><li>`addSaveEventToMemory()`</li><li>`addDeleteEventToMemory()`</li></ul></td></tr><tr><td>`src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementSalesUnitStore.php`</td><td><ul><li>`prepareSaveEventName()`</li><li>`addSaveEventToMemory()`</li><li>`addDeleteEventToMemory()`</li></ul></td></tr></tbody></table>)

### 3) Add Translations

{% info_block infoBox "Info" %}
All measurement units need to have glossary entities for the configured locales.
{% endinfo_block %}
Infrastructural record's glossary keys:
<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
measurement_units.item.name,Item,en_US
measurement_units.item.name,Stück,de_DE
```
<br>
</details>

Demo data glossary keys:
<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
measurement_units.standard.weight.kilo.name,Kilo,en_US
measurement_units.standard.weight.gram.name,Gram,en_US
measurement_units.standard.length.metre.name,Meter,en_US
measurement_units.standard.length.centimetre.name,Centimeter,en_US
measurement_units.standard.length.feet.name,Feet,en_US
measurement_units.standard.weight.kilo.name,Kilo,de_DE
measurement_units.standard.weight.gram.name,Gramm,de_DE
measurement_units.standard.length.metre.name,Meter,de_DE
measurement_units.standard.length.centimetre.name,Centimeter,de_DE
measurement_units.standard.length.feet.name,Fuß,de_DE
```
<br>
</details>

Run the following console command to import data:
```
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 4) Configure Export to Redis
This step will publish tables on change (create, edit, delete) to the `spy_product_measurement_unit_storage` and `spy_product_concrete_measurement_unit_storage` and synchronise the data to Storage.

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductMeasurementUnitStorageEventSubscriber` | Registers listeners that are responsible to publish product measurement unit storage entity changes when a related entity change event occurs. | None | `Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\Subscriber` |
 
 <details open>
<summary>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>

```php
 <?php
 
namespace Pyz\Zed\Event;
 
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\Subscriber\ProductMeasurementUnitStorageEventSubscriber;
 
class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductMeasurementUnitStorageEventSubscriber());
 
        return $eventSubscriberCollection;
    }
}
```
<br>
</details>

#### Set up Re-Generate and Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductConcreteMeasurementUnitEventResourceRepositoryPlugin` | Allows populating empty storage table with data. | None | `Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event` |
| `ProductMeasurementUnitEventResourceRepositoryPlugin` | Allows populating empty storage table with data. | None | `Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event` |
| `ProductConcreteMeasurementUnitSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None | `Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization` |
| `ProductMeasurementUnitSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None | `Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization` |

<details open>
<summary>src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php</summary

```php
<?php
 
namespace Pyz\Zed\EventBehavior;
 
use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\ProductConcreteMeasurementUnitEventResourceRepositoryPlugin;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\ProductMeasurementUnitEventResourceRepositoryPlugin;
 
class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceQueryContainerPluginInterface[]
     */
    protected function getEventTriggerResourcePlugins()
    {
        return [
            new ProductMeasurementUnitEventResourceRepositoryPlugin(),
            new ProductConcreteMeasurementUnitEventResourceRepositoryPlugin(),
        ];
    }
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.ph</summary>

```php
<?php
 
namespace Pyz\Zed\Synchronization;
 
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization\ProductConcreteMeasurementUnitSynchronizationDataPlugin;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization\ProductMeasurementUnitSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;
 
class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductMeasurementUnitSynchronizationDataPlugin(),
            new ProductConcreteMeasurementUnitSynchronizationDataPlugin(),
        ];
    }
}
```
<br>
</details>

### 5) Import Data
#### Add Infrastructural Data

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductMeasurementUnitInstallerPlugin` | Installs the configured infrastructural measurement units. | None | `Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Installer` |

<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Installer;
 
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Installer\ProductMeasurementUnitInstallerPlugin;
 
class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new ProductMeasurementUnitInstallerPlugin(),
        ];
    }
}
```
<br>
</details>

Run the following console command to execute registered installer plugins and install infrastructural data:
```
console setup:init-db
```

{% info_block warningBox "Verification" %}
Make sure that in the database that the configured infrastructural measurement units are added to the `spy_product_measurement_unit` table.
{% endinfo_block %}

#### Import Product Measurement Unit

{% info_block infoBox "Info" %}
The following imported entities will be used as measurement units in the Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/product-measurement-unit-data-import/data/import/product_measurement_unit.csv</summary>

```yaml
name,code,default_precision
measurement_units.standard.weight.kilo.name,KILO,1
measurement_units.standard.weight.gram.name,GRAM,1
measurement_units.standard.weight.tone.name,TONE,1000
measurement_units.standard.weight.gbou.name,GBOU,10
measurement_units.standard.weight.usou.name,USOU,10
measurement_units.standard.weight.pund.name,PUND,100
measurement_units.standard.weight.huwg.name,HUWG,1000
measurement_units.standard.weight.gbtn.name,GBTN,1000
measurement_units.standard.weight.ustn.name,USTN,1000
measurement_units.standard.weight.oztr.name,OZTR,10
measurement_units.standard.weight.ucwt.name,UCWT,1000
measurement_units.standard.length.metr.name,METR,100
measurement_units.standard.length.cmet.name,CMET,10
measurement_units.standard.length.mmet.name,MMET,1
measurement_units.standard.length.kmet.name,KMET,1000
measurement_units.standard.length.inch.name,INCH,10
measurement_units.standard.length.yard.name,YARD,100
measurement_units.standard.length.foot.name,FOOT,100
measurement_units.standard.length.mile.name,MILE,1000
measurement_units.standard.area.smet.name,SMET,100
measurement_units.standard.area.sqki.name,SQKI,100
measurement_units.standard.area.smil.name,SMIL,100
measurement_units.standard.area.scmt.name,SCMT,100
measurement_units.standard.area.sqin.name,SQIN,100
measurement_units.standard.area.sqfo.name,SQFO,100
measurement_units.standard.area.sqmi.name,SQMI,100
measurement_units.standard.area.sqya.name,SQYA,100
measurement_units.standard.area.acre.name,ACRE,100
measurement_units.standard.area.ares.name,ARES,100
measurement_units.standard.area.hect.name,HECT,100
measurement_units.standard.litr.name,LITR,100
measurement_units.standard.celi.name,CELI,10
measurement_units.standard.mili.name,MILI,1
measurement_units.standard.gbga.name,GBGA,10
measurement_units.standard.gbpi.name,GBPI,10
measurement_units.standard.uspi.name,USPI,10
measurement_units.standard.gbqa.name,GBQA,10
measurement_units.standard.usqa.name,USQA,10
measurement_units.standard.usga.name,USGA,10
measurement_units.standard.barl.name,BARL,100
measurement_units.standard.bcuf.name,BCUF,100
measurement_units.standard.bdft.name,BDFT,100
measurement_units.standard.cbme.name,CBME,100
measurement_units.standard.miba.name,MIBA,100
measurement_units.standard.dgeu.name,DGEU,100
measurement_units.standard.ggeu.name,GGEU,100
measurement_units.standard.busl.name,BUSL,100
measurement_units.standard.box.name,BOX,1
```
<br>
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
|  name|  mandatory|string  |measurement_units.standard.cbme.name  | The glossary key that will be used for displaying. Each name needs glossary key definition for all configured locales. |
|code|mandatory|unique, string|CBME|A unique identifier used by the Spryker OS to identify measurement units.|
|default_precision|mandatory|integer, power of ten|100|A property that affects how detailed to render a float measurement unit. Affects visual only, not used in calculations.|

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementUnitDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductMeasurementUnitDataImportPlugin(),
        ];
    }
}
```
<br>
</details>

Run the following console command to import data
```
console data:import product-measurement-unit
```

{% info_block warningBox "Verification" %}
Make sure that in the database that the configured data are added to the `spy_product_measurement_unit` table.
{% endinfo_block %}

#### Import Product Measurement Base Units

{% info_block infoBox "Info" %}
Imports data that defines the base measurement unit of each product abstract.
{% endinfo_block %}
Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/product-measurement-unit-data-import/data/import/product_measurement_base_unit.csv</summary>

```yaml
code,abstract_sku
METR,215
KILO,216
ITEM,217
ITEM,218
```
<br>
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| code | mandatory | string | METR |  An existing measurement unit code that will be the base of measurement unit calculations for this product abstract. |
|abstract_sku|mandatory|virtual-unique, string|215|An existing product abstract SKU. 1 product abstract can have only 1 base unit; multiple occurrences will override older ones.|
Register the following plugin to enable data import:

| Plugin |Specification  | Prerequisites |Namespace  |
| --- | --- | --- | --- |
|`ProductMeasurementBaseUnitDataImportPlugin` |Imports base measurement unit definitions into the database.  | <ul><li>Referred product abstracts to be imported</li><li>Referred measurement units to be imported</li></ul> |`Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin`  |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementBaseUnitDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductMeasurementBaseUnitDataImportPlugin(),
        ];
    }
}
```
<br>
</details>

Run the following console command to import data:
```
console data:import product-measurement-base-unit
```

{% info_block warningBox "Verification" %}
Make sure that in the database that the configured data are added to the `spy_product_measurement_base_unit` table.
{% endinfo_block %}

#### Import Product Measurement Sales Units

{% info_block infoBox "Info" %}
Imports sales measurement unit definitions to product concretes.
{% endinfo_block %}

```yaml
sales_unit_key,concrete_sku,code,conversion,precision,is_displayed,is_default
sales_unit_1,215_123,METR,1,100,1,1
sales_unit_2,215_123,CMET,,,1,0
sales_unit_3,215_124,METR,1,100,1,0
sales_unit_4,215_124,CMET,0.01,1,1,0
sales_unit_5,215_124,FOOT,0.328084,100,1,1
sales_unit_6,216_123,ITEM,5,1,1,1
sales_unit_7,217_123,ITEM,1,1,1,1
sales_unit_8,217_123,KILO,2,100,1,0
sales_unit_9,217_123,GRAM,0.01,1,1,0
sales_unit_10,218_123,ITEM,1,1,1,1
sales_unit_11,218_123,KILO,10,1,1,0
sales_unit_12,218_123,GRAM,0.01,1,1,0
sales_unit_13,218_1231,ITEM,1,1,1,1
sales_unit_14,218_1231,KILO,2,1,1,0
sales_unit_15,218_1231,GRAM,0.01,1,1,0
sales_unit_16,218_1233,METR,1,100,1,1
sales_unit_17,218_1234,METR,1,100,1,1
sales_unit_18,217_1231,ITEM,1,1,1,1
sales_unit_19,218_1232,ITEM,1,1,1,1
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| sales_unit_key | mandatory | unique, string | sales_unit_1 | A unique identifier that allows referring to this record from other data importers. |
|concrete_sku|mandatory|string|215_123|An already existing product concrete SKU.|
|code|mandatory|string|METR	|An already existing measurement unit code that will be used to convert back and forth with the base unit defined in product abstract.|
|conversion|mandatory|float, empty|5|<p>A custom multiplier that is used to calculate base unit. This field can be empty if both base and sales unit code is defined in the general [conversion ratios](https://github.com/spryker/util-measurement-unit-conversion/blob/1ae26cf8e629d25157e273097941bde438a24ddc/src/Spryker/Service/UtilMeasurementUnitConversion/UtilMeasurementUnitConversionConfig.php).</p><p>Example: 5 means that 1 quantity of this sales unit represents 5 of the base unit.</p>|
|precision|mandatory|integer, power of ten, empty|100|A property that affects how detailed to render a float measurement unit. Affects visual only, not used in calculations. <br>When left empty, the precision of the measurement unit is used.|
|is_displayed|mandatory|integer|0|Controls if the sales unit can be displayed for customers.|
|is_default|mandatory|integer|1|Controls if this sales unit is preferred as the default sales unit when offered for customers.<br>Takes no effect if is_displayed set as 0.<br>1 product concrete can have up to 1 default sales unit.|
Register the following plugin:

| Plugin | Specification |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
| `ProductMeasurementSalesUnitDataImportPlugin` | Imports sales measurement unit definitions into the database. | <ul><li>Referred product concretes to be imported</li><li>Related product abstracts to be imported</li><li>Related product abstracts' base units to be imported</li><li>Referred measurement units to be imported</li></ul> | `Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementSalesUnitDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductMeasurementSalesUnitDataImportPlugin(),
        ];
    }
}
```
<br>
</details>

Run the following console command to import data:
```
console data:import product-measurement-sales-unit
```
{% info_block warningBox "Verification" %}
Make sure that in the database that the configured data are added to the `spy_product_measurement_sales_unit` table.
{% endinfo_block %}

#### Import Product Measurement Sales Unit Stores:
{% info_block infoBox "Info" %}
Contains the Store configuration for each defined sales unit.<br>Proceed with this step even if you have only 1 Store.
{% endinfo_block %}
Prepare your data according to your requirements using our demo data:
<details open>
<summary>vendor/spryker/product-measurement-unit-data-import/data/import/product_measurement_sales_unit_store.csv</summary>

```yaml
sales_unit_key,store_name
sales_unit_1,DE
sales_unit_1,US
sales_unit_1,AT
sales_unit_2,DE
sales_unit_2,US
sales_unit_2,AT
sales_unit_3,DE
sales_unit_3,US
sales_unit_3,AT
sales_unit_4,DE
sales_unit_4,AT
sales_unit_5,US
sales_unit_6,DE
sales_unit_6,US
sales_unit_6,AT
sales_unit_7,DE
sales_unit_7,US
sales_unit_7,AT
sales_unit_8,DE
sales_unit_8,US
sales_unit_8,AT
sales_unit_9,DE
sales_unit_9,US
sales_unit_9,AT
sales_unit_10,DE
sales_unit_10,US
sales_unit_10,AT
sales_unit_11,DE
sales_unit_11,US
sales_unit_11,AT
sales_unit_12,DE
sales_unit_12,AT
sales_unit_12,US
sales_unit_13,DE
sales_unit_13,US
sales_unit_13,AT
sales_unit_14,DE
sales_unit_14,US
sales_unit_14,AT
sales_unit_15,DE
sales_unit_15,US
sales_unit_15,AT
sales_unit_16,DE
sales_unit_16,US
sales_unit_16,AT
sales_unit_17,DE
sales_unit_17,US
sales_unit_17,AT
sales_unit_18,DE
sales_unit_18,US
sales_unit_18,AT
sales_unit_19,DE
sales_unit_19,US
sales_unit_19,AT
```
<br>
</details>

| Column |Is obligatory?  |Data type  | Data example |Data explanation  |
| --- | --- | --- | --- | --- |
| `sales_unit_key` |mandatory  | string | sales_unit_1 |A reference used for the product measurement sales unit data import.  |
|`store_name`|mandatory|string|DE|Contains the store name where the sales unit is available.|
Register the following plugin:

|Plugin  | Specification |  Prerequisites|Namespace  |
| --- | --- | --- | --- |
|`ProductMeasurementSalesUnitStoreDataImportPlugin`  |Imports sales measurement units' Store configuration into the database.  | <ul><li>Referred sales units to be imported.</li><li>Referred Stores to be imported.</li></ul> | `Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin` |
<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementSalesUnitStoreDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductMeasurementSalesUnitStoreDataImportPlugin(),
        ];
    }
}
```
<br>
</details>

Run the following console command to import data:
```
console data:import product-measurement-sales-unit-store
```
{% info_block warningBox "Verification" %}
Make sure that in the database that the configured data are added to the `spy_product_measurement_sales_unit_store` table.
{% endinfo_block %}

### 6) Set up Behavior
#### Set up Checkout Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites |Namespace  |
| --- | --- | --- | --- |
| `SingleItemQuantitySalesUnitCartChangeRequestExpanderPlugin` |Stores the sales unit ID of the selected measurement unit for the given product.  |None  | `Spryker\Client\ProductMeasurementUnit\Plugin\Cart` |
|`QuantitySalesUnitGroupKeyItemExpanderPlugin`|Appends group key with sales unit information if the product was added to the cart with a sales unit.|Expects sales unit ID to be set for the related products.|`Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart`|
|`QuantitySalesUnitItemExpanderPlugin`|Expands cart item with general sales unit information when the product was added to the cart with a sales unit.|Expects sales unit ID to be set for the related products.|`Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart`|
|`QuantitySalesUnitValuePostSavePlugin`|Calculates sales unit value that was selected by the customer for later usage.|Expects general sales unit information to be set for the related products.|`Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart`|
|`QuantitySalesUnitOrderItemExpanderPreSavePlugin`|Prepares sales unit information to be saved to the database.|Expects general sales unit information to be set for the related products.|`Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\SalesExtension`|
|`QuantitySalesUnitHydrateOrderPlugin`|Adds quantity sales unit information when Order is retrieved from database.|Expects sales order ID and sales order item IDs to be set.|`Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales`|

<details open>
<summary>src/Pyz/Client/Cart/CartDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Client\Cart;
 
use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\ProductMeasurementUnit\Plugin\Cart\SingleItemQuantitySalesUnitCartChangeRequestExpanderPlugin;
 
class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface[]
     */
    protected function getAddItemsRequestExpanderPlugins()
    {
        return [
            new SingleItemQuantitySalesUnitCartChangeRequestExpanderPlugin(),
        ];
    }
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Cart;
 
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\QuantitySalesUnitGroupKeyItemExpanderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\QuantitySalesUnitItemExpanderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\QuantitySalesUnitValuePostSavePlugin;
 
class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new QuantitySalesUnitItemExpanderPlugin(),
            new QuantitySalesUnitGroupKeyItemExpanderPlugin(),
        ];
    }
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\PostSavePluginInterface[]
     */
    protected function getPostSavePlugins(Container $container)
    {
        return [
            new QuantitySalesUnitValuePostSavePlugin(),
        ];
    }
}
```
<br>
</details>


<details open>
<summary>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Sales;
 
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\SalesExtension\QuantitySalesUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales\QuantitySalesUnitHydrateOrderPlugin;
 
class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface[]
     */
    protected function getOrderItemExpanderPreSavePlugins()
    {
        return [
            new QuantitySalesUnitOrderItemExpanderPreSavePlugin(),
        ];
    }
 
 
    /**
     * @return \Spryker\Zed\Sales\Dependency\Plugin\HydrateOrderPluginInterface[]
     */
    protected function getOrderHydrationPlugins()
    {
        return [
            new QuantitySalesUnitHydrateOrderPlugin(),
        ];
    }
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that `<add to cart>` action works with measurement units by adding an item to cart with sales unit and checking if `QuoteTransfer.items[].quantitySalesUnit` record gets populated.
{% endinfo_block %}
{% info_block warningBox "Verification" %}
Make sure that checkout workflow works with measurement unit by ordering item with sales unit and checking the `spy_sales_order_item` contains `quantity_base_measurement_unit_name`, `quantity_measurement_unit_name`, `quantity_measurement_unit_code`, `quantity_measurement_unit_precision` and `quantity_measurement_unit_conversion` fields populated
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

|Name  | Version |
| --- | --- |
| Spryker Core E-commerce | 2018.11.0 |
|Checkout|2018.11.0|
### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/measurement-units: "^2018.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules are installed:<table><thead><tr><th>Module</th><th>Expected directory</th></tr></thead><tbody><tr><td>`ProductMeasurementUnitWidget`</td><td>`vendor/spryker-shop/product-measurement-unit-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations

Append glossary according to your configuration:
<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
cart.item_quantity,Quantity,en_US
product.measurement.sales_unit,Sales Unit,en_US
page.detail.add-to-cart,Add to Cart,en_US
measurement_units.recommendation.between-units-info,The quantity you have chosen is in between 2 base units,en_US
measurement_units.recommendation.min-violation,Minimum quantity requirements for product are not fulfilled,en_US
measurement_units.recommendation.max-violation,Maximum quantity requirements for product are not fulfilled,en_US
measurement_units.recommendation.suggestion,Would you like to add,en_US
cart.pre.check.quantity.min.failed,Minimum quantity requirements for product SKU '%sku%' are not fulfilled.,en_US
cart.pre.check.quantity.max.failed,Maximum quantity for product SKU '%sku%' is exceeded.,en_US
cart.pre.check.quantity.interval.failed,Quantity interval requirements for product SKU '%sku%' are not fulfilled.,en_US
cart.item_quantity,Anzahl,de_DE
product.measurement.sales_unit,Maßeinheit,de_DE
page.detail.add-to-cart,In den Warenkorb,de_DE
measurement_units.recommendation.between-units-info,Ihre gewählte Anzahl liegt zwischen 2 basis Einheiten,de_DE
measurement_units.recommendation.min-violation,Minimale Mengenanforderungen für das Produkt sind nicht erfüllt,de_DE
measurement_units.recommendation.max-violation,Maximale Mengenanforderungen für das Produkt sind nicht erfüllt,de_DE
measurement_units.recommendation.suggestion,Was würden Sie gerne hinzufügen? ,de_DE
cart.pre.check.quantity.min.failed,Die Mindestanzahl für Produkt SKU '%sku%' ist nicht erreicht.,de_DE
cart.pre.check.quantity.max.failed,Die Maximalanzahl für Produkt SKU '%sku%' ist überschritten.,de_DE
cart.pre.check.quantity.interval.failed,Die Anzahl für Produkt SKU '%sku%' liegt nicht innerhalb des vorgegebenen Intervals.,de_DE
```
<br>
</details>

Run the following console command to import data:
```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}


### 3) Set up Widgets

Register the following plugins to enable widgets:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductMeasurementUnitWidgetPlugin` | Allows customers to select sales units for the product when adding to cart. |None  | `SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\ProductDetailPage` |
|`QuantitySalesUnitWidgetPlugin`|Displays selected sales unit information for products on the cart overview page.|None|`SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\CartPage`|
<details open>
<summary>src/Pyz/Yves/ProductDetailPage/ProductDetailPageDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Yves\ProductDetailPage;
 
use SprykerShop\Yves\ProductDetailPage\ProductDetailPageDependencyProvider as SprykerShopProductDetailPageDependencyProvider;
use SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\ProductDetailPage\ProductMeasurementUnitWidgetPlugin;
 
class ProductDetailPageDependencyProvider extends SprykerShopProductDetailPageDependencyProvider
{
    /**
     * @return \Spryker\Yves\Kernel\Dependency\Plugin\WidgetPluginInterface[]
     */
    protected function getProductDetailPageWidgetPlugins(): array
    {
        return [
            ProductMeasurementUnitWidgetPlugin::class,
        ];
    }
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Yves/CartPage/CartPageDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Yves\CartPage;
 
use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\CartPage\QuantitySalesUnitWidgetPlugin;
 
class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array
     */
    protected function getCartPageWidgetPlugins(): array
    {
        return [
            QuantitySalesUnitWidgetPlugin::class,
        ];
    }
}
```
<br>
</details>

`ProductMeasurementUnitWidget` uses Javascript for some functionality:

|Functionality  | Path |
| --- | --- |
|Controls base unit => sales unit calculations. Applies product quantity restrictions on sales unit level. Offers recommendation when invalid quantity is selected. Maintains stock-based quantity and sales unit information for posting  |`vendor/spryker-shop/product-measurement-unit-widget/src/SprykerShop/Yves/ProductMeasurementUnitWidget/Theme/default/components/molecules/measurement-quantity-selector/measurement-quantity-selector.ts`  |

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}
Make sure that the following widgets were registered:<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`ProductMeasurementUnitWidgetPlugin`</td><td>Go to the product detail page where the product has sales units and add a product to the cart with a sales unit.</td></tr><tr><td>`QuantitySalesUnitWidgetPlugin`</td><td>Go to the cart overview page and see if the sales unit information appears for a product.</td></tr></tbody></table>
{% endinfo_block %}

