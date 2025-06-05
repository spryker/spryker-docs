---
title: Install the Measurement Units feature
description: The Measurement Units feature allows defining specific units of measure for products. The guide describes how to integrate the feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-measurement-unit-feature-integration
originalArticleId: a8fd28fc-83ac-4eda-ac81-81ec492970c1
redirect_from:
  - /2021080/docs/product-measurement-unit-feature-integration
  - /2021080/docs/en/product-measurement-unit-feature-integration
  - /docs/product-measurement-unit-feature-integration
  - /docs/en/product-measurement-unit-feature-integration
  - /docs/scos/dev/feature-integration-guides/201811.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202212.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202009.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202005.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202001.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201907.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201903.0/product-measurement-unit-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201811.0/product-measurement-units-feature-integration.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html
related:
  - title: Install the Measurement Units Glue API
    link: docs/pbc/all/product-information-management/page.version/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html
---

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Cart | {{page.version}} |
| Product | {{page.version}} |
| Order Management | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/measurement-units:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductMeasurementUnit | vendor/spryker/product-measurement-unit |
| ProductMeasurementUnitDataImport | vendor/spryker/product-measurement-unit-data-import |
| ProductMeasurementUnitStorage | vendor/spryker/product-measurement-unit-storage |

{% endinfo_block %}


### 2) Set up database schema and transfer objects

Adjust the schema definition so entity changes will trigger events.

| MODULE | TRIGGERED EVENTS |
| --- | --- |
| spy_product_measurement_unit |  <ul><li>Entity.spy_product_measurement_unit.create</li><li>Entity.spy_product_measurement_unit.update</li><li>Entity.spy_product_measurement_unit.delete</li></ul> |
| spy_product_measurement_base_unit | <ul><li>Entity.spy_product_measurement_base_unit.create</li><li>Entity.spy_product_measurement_base_unit.update</li><li>Entity.spy_product_measurement_base_unit.delete</li></ul> |
| spy_product_measurement_sales_unit | <ul><li>Entity.spy_product_measurement_sales_unit.create</li><li>Entity.spy_product_measurement_sales_unit.update</li><li>Entity.spy_product_measurement_sales_unit.delete</li></ul> |
| spy_product_measurement_sales_unit_store | <ul><li>Entity.spy_product_measurement_sales_unit_store.create</li><li>Entity.spy_product_measurement_sales_unit_store.update</li><li>Entity.spy_product_measurement_sales_unit_store.delete</li></ul> |

**src/Pyz/Zed/ProductMeasurementUnit/Persistence/Propel/Schema/spy_product_measurement_unit.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductMeasurementUnit\Persistence"
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

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_product_measurement_unit | table | created |
| spy_product_measurement_base_unit | table | created |
| spy_product_measurement_sales_unit | table | created |
| spy_product_measurement_sales_unit_store | table | created |
| spy_product_measurement_unit_storage | table | created |
| spy_product_concrete_measurement_unit_storage | table | created |
| spy_sales_order_item.quantity_base_measurement_unit_name | column | created |
| spy_sales_order_item.quantity_measurement_unit_name | column | created |
| spy_sales_order_item.quantity_measurement_unit_precision | column | created |
| spy_sales_order_item.quantity_measurement_unit_conversion | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductMeasurementUnit | class | created | src/Generated/Shared/Transfer/ProductMeasurementUnitTransfer |
| ProductMeasurementBaseUnit | class | created | src/Generated/Shared/Transfer/ProductMeasurementBaseUnitTransfer |
| ProductMeasurementSalesUnit | class | created | src/Generated/Shared/Transfer/ProductMeasurementSalesUnitTransfer |
| SpyProductMeasurementUnitEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductMeasurementUnitEntityTransfer |
| SpyProductMeasurementBaseUnitEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductMeasurementBaseUnitEntityTransfer |
| SpyProductMeasurementSalesUnitEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductMeasurementSalesUnitEntityTransfer |
| SpyProductMeasurementSalesUnitStoreEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductMeasurementSalesUnitStoreEntityTransfer |
| ProductMeasurementUnitStorage | class | created | src/Generated/Shared/Transfer/ProductMeasurementUnitStorageTransfer |
| ProductConcreteMeasurementBaseUnit | class | created | src/Generated/Shared/Transfer/ProductConcreteMeasurementBaseUnitTransfer |
| ProductConcreteMeasurementSalesUnit | class | created | src/Generated/Shared/Transfer/ProductConcreteMeasurementSalesUnitTransfer |
| ProductConcreteMeasurementUnitStorage | class | created | src/Generated/Shared/Transfer/ProductConcreteMeasurementUnitStorageTransfer |
| SpyProductMeasurementUnitStorageEntity | class | created | src/Generated/Shared/Transfer/SpyProductMeasurementUnitStorageEntityTransfer |
| SpyProductConcreteMeasurementUnitStorageEntity | class | created | src/Generated/Shared/Transfer/SpyProductConcreteMeasurementUnitStorageEntityTransfer |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:

| PATH | METHOD NAME |
| --- | --- |
| src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementUnit.php |  prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementBaseUnit.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementSalesUnit.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductMeasurementUnit/Persistence/Base/SpyProductMeasurementSalesUnitStore.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |

{% endinfo_block %}

### 3) Add translations

{% info_block infoBox "Info" %}

All measurement units need to have glossary entities for the configured locales.

{% endinfo_block %}

Infrastructural record's glossary keys:

**data/import/common/common/glossary.csv**

```yaml
measurement_units.item.name,Item,en_US
measurement_units.item.name,Stück,de_DE
```

Demo data glossary keys:

**data/import/common/common/glossary.csv**

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

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}


### 4) Configure export to Redis

This step will publish tables on change (create, edit, delete) to the `spy_product_measurement_unit_storage` and `spy_product_concrete_measurement_unit_storage` and synchronise the data to Storage.

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductMeasurementUnitStorageEventSubscriber | Registers listeners that are responsible to publish product measurement unit storage entity changes when a related entity change event occurs. | None | Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

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

#### Setup re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConcreteMeasurementUnitEventResourceRepositoryPlugin | Allows populating empty storage table with data. | None | Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event |
| ProductMeasurementUnitEventResourceRepositoryPlugin | Allows populating empty storage table with data. | None | Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event |
| ProductConcreteMeasurementUnitSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. | None | Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization |
| ProductMeasurementUnitSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. | None | Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\ProductConcreteMeasurementUnitEventResourceBulkRepositoryPlugin;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Event\ProductMeasurementUnitEventResourceBulkRepositoryPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceQueryContainerPluginInterface[]
     */
    protected function getEventTriggerResourcePlugins()
    {
        return [
            new ProductMeasurementUnitEventResourceBulkRepositoryPlugin(),
            new ProductConcreteMeasurementUnitEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization\ProductConcreteMeasurementUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization\ProductMeasurementUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductMeasurementUnitSynchronizationDataBulkPlugin(),
            new ProductConcreteMeasurementUnitSynchronizationDataBulkPlugin(),
        ];
    }
}
```

### 5) Import data

#### Add infrastructural data

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductMeasurementUnitInstallerPlugin | Installs the configured infrastructural measurement units. | None | Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Installer |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

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

Run the following console command to execute registered installer plugins and install infrastructural data:

```
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured infrastructural measurement units are added to the `spy_product_measurement_unit` table.

{% endinfo_block %}

#### Import product measurement unit

{% info_block infoBox "Info" %}

The following imported entities will be used as measurement units in the Spryker OS.

{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**vendor/spryker/product-measurement-unit-data-import/data/import/product_measurement_unit.csv**

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

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
|  name|  mandatory|string  |measurement_units.standard.cbme.name  | The glossary key that will be used for displaying. Each name needs glossary key definition for all configured locales. |
|code|mandatory|unique, string|CBME|A unique identifier used by the Spryker OS to identify measurement units.|
|default_precision|mandatory|integer, power of ten|100|A property that affects how detailed to render a float measurement unit. Affects visual only, not used in calculations.|

Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductMeasurementUnitDataImportPlugin | Imports measurement unit data into the database. | None | Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

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

Import data:

```bash
console data:import product-measurement-unit
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data are added to the `spy_product_measurement_unit` table.

{% endinfo_block %}

#### Import product measurement base units

{% info_block infoBox "Info" %}

Imports data that defines the base measurement unit of each product abstract.

{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**vendor/spryker/product-measurement-unit-data-import/data/import/product_measurement_base_unit.csv**

```yaml
code,abstract_sku
METR,215
KILO,216
ITEM,217
ITEM,218
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| code | ✓ | string | METR |  An existing measurement unit code that will be the base of measurement unit calculations for this product abstract. |
|abstract_sku|mandatory|virtual-unique, string|215|An existing product abstract SKU. 1 product abstract can have only 1 base unit; multiple occurrences will override older ones.|

Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductMeasurementBaseUnitDataImportPlugin |Imports base measurement unit definitions into the database.  | <ul><li>Referred product abstracts to be imported</li><li>Referred measurement units to be imported</li></ul> |Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin|

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

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

Import data:

```bash
console data:import product-measurement-base-unit
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data are added to the `spy_product_measurement_base_unit` table.

{% endinfo_block %}

#### Import product measurement sales units

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

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| sales_unit_key | ✓ | unique, string | sales_unit_1 | A unique identifier that allows referring to this record from other data importers. |
|concrete_sku|mandatory|string|215_123|An already existing product concrete SKU.|
|code|mandatory|string|METR	|An already existing measurement unit code that will be used to convert back and forth with the base unit defined in product abstract.|
|conversion|mandatory|float, empty|5|<p>A custom multiplier that is used to calculate base unit. This field can be empty if both base and sales unit code is defined in the general [conversion ratios](https://github.com/spryker/util-measurement-unit-conversion/blob/1ae26cf8e629d25157e273097941bde438a24ddc/src/Spryker/Service/UtilMeasurementUnitConversion/UtilMeasurementUnitConversionConfig.php).</p><p>Example: 5 means that 1 quantity of this sales unit represents 5 of the base unit.</p>|
|precision|mandatory|integer, power of ten, empty|100|A property that affects how detailed to render a float measurement unit. Affects visual only, not used in calculations. <br>When left empty, the precision of the measurement unit is used.|
|is_displayed|mandatory|integer|0|Controls if the sales unit can be displayed for customers.|
|is_default|mandatory|integer|1|Controls if this sales unit is preferred as the default sales unit when offered for customers.<br>Takes no effect if is_displayed set as 0.<br>1 product concrete can have up to 1 default sales unit.|

Register the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductMeasurementSalesUnitDataImportPlugin | Imports sales measurement unit definitions into the database. | <ul><li>Referred product concretes to be imported</li><li>Related product abstracts to be imported</li><li>Related product abstracts' base units to be imported</li><li>Referred measurement units to be imported</li></ul> | Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

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

Import data:

```bash
console data:import product-measurement-sales-unit
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data are added to the `spy_product_measurement_sales_unit` table.

{% endinfo_block %}

#### Import product measurement sales unit stores

{% info_block infoBox "Info" %}

Contains the Store configuration for each defined sales unit.<br>Proceed with this step even if you have only 1 Store.

{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**vendor/spryker/product-measurement-unit-data-import/data/import/product_measurement_sales_unit_store.csv**

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

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| sales_unit_key |mandatory  | string | sales_unit_1 |A reference used for the product measurement sales unit data import.  |
|store_name|mandatory|string|DE|Contains the store name where the sales unit is available.|

Register the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductMeasurementSalesUnitStoreDataImportPlugin |Imports sales measurement units' Store configuration into the database.  | <ul><li>Referred sales units to be imported.</li><li>Referred Stores to be imported.</li></ul> | Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

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

Import data:

```bash
console data:import product-measurement-sales-unit-store
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data are added to the `spy_product_measurement_sales_unit_store` table.

{% endinfo_block %}

### 6) Set up behavior

#### Set up checkout workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SingleItemQuantitySalesUnitCartChangeRequestExpanderPlugin |Stores the sales unit ID of the selected measurement unit for the given product.  |None  | Spryker\Client\ProductMeasurementUnit\Plugin\Cart |
|QuantitySalesUnitGroupKeyItemExpanderPlugin|Appends group key with sales unit information if the product was added to the cart with a sales unit.|Expects sales unit ID to be set for the related products.|Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart|
| ProductMeasurementSalesUnitCartPreCheckPlugin | Checks if the sales units of product measurement units are found for items with `amountSalesUnit` in `CartChangeTransfer`. | Expects sales unit ID and quantity sales unit to be set for the related products. | Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart|
|QuantitySalesUnitItemExpanderPlugin|Expands cart item with general sales unit information when the product was added to the cart with a sales unit.|Expects sales unit ID to be set for the related products.|Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart|
|QuantitySalesUnitValuePostSavePlugin|Calculates sales unit value that was selected by the customer for later usage.|Expects general sales unit information to be set for the related products.|Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart|
|QuantitySalesUnitOrderItemExpanderPreSavePlugin|Prepares sales unit information to be saved to the database.|Expects general sales unit information to be set for the related products.|Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\SalesExtension|
|QuantitySalesUnitHydrateOrderPlugin|Adds quantity sales unit information when Order is retrieved from database.|Expects sales order ID and sales order item IDs to be set.|Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales|
|ProductMeasurementUnitProductAbstractAddToCartPlugin| Filters out products which have measurement unit available. | None | Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\ProductPageSearch |
|QuantitySalesUnitOrderItemExpanderPlugin| Expands order items with quantity sales unit if applicable. | None |Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales|

**src/Pyz/Client/Cart/CartDependencyProvider.php**

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

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\ProductMeasurementSalesUnitCartPreCheckPlugin;
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

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container)
    {
        return [
            new ProductMeasurementSalesUnitCartPreCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\SalesExtension\QuantitySalesUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales\QuantitySalesUnitHydrateOrderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales\QuantitySalesUnitOrderItemExpanderPlugin;

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

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new QuantitySalesUnitOrderItemExpanderPlugin(),
        ];
    }
}
```

**ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\ProductPageSearch\ProductMeasurementUnitProductAbstractAddToCartPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractAddToCartPluginInterface[]
     */
    protected function getProductAbstractAddToCartPlugins(): array
    {
        return [
            new ProductMeasurementUnitProductAbstractAddToCartPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `<add to cart>` action works with measurement units by adding an item to cart with sales unit and checking if `QuoteTransfer.items[].quantitySalesUnit` record gets populated.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that checkout workflow works with measurement unit by ordering item with sales unit and checking the `spy_sales_order_item` contains `quantity_base_measurement_unit_name`, `quantity_measurement_unit_name`, `quantity_measurement_unit_code`, `quantity_measurement_unit_precision` and `quantity_measurement_unit_conversion` fields populated.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that abstract products which have measurement units don't have `add_to_cart_sku` field at Elasticsearch document.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that every order item from the `SalesFacade::getOrderItems()` results contains quantity sales unit data.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Install the following required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core E-commerce | {{page.version}} |
|Checkout| {{page.version}} |
|   |   |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/measurement-units: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductMeasurementUnitWidget | vendor/spryker-shop/product-measurement-unit-widget |

{% endinfo_block %}


### 2) Add translations

Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

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
cart.item.sales_unit.not_found,Sales unit is not found for product with SKU '%sku%'.,en_US
cart.item.sales_unit.not_found,Verkaufseinheit wird für Produkt mit SKU '%sku%' nicht gefunden.,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductMeasurementUnitWidgetPlugin | Allows customers to select sales units for the product when adding to cart. |None  | SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\ProductDetailPage |
|QuantitySalesUnitWidgetPlugin|Displays selected sales unit information for products on the cart overview page.|None|SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\CartPage|


**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductMeasurementUnitWidget\Widget\ManageProductMeasurementUnitWidget;
use SprykerShop\Yves\ProductMeasurementUnitWidget\Widget\CartProductMeasurementUnitQuantitySelectorWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            CartProductMeasurementUnitQuantitySelectorWidget::class,
            ManageProductMeasurementUnitWidget::class,
        ];
    }
}
```

`ProductMeasurementUnitWidget` uses Javascript for some functionality:

|FUNCTIONALITY  | PATH |
| --- | --- |
|Controls base unit => sales unit calculations. Applies product quantity restrictions on sales unit level. Offers recommendation when invalid quantity is selected. Maintains stock-based quantity and sales unit information for posting  |vendor/spryker-shop/product-measurement-unit-widget/src/SprykerShop/Yves/ProductMeasurementUnitWidget/Theme/default/components/molecules/measurement-quantity-selector/measurement-quantity-selector.ts  |

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE | TEST |
| --- | --- |
| ProductMeasurementUnitWidgetPlugin | Go to the product detail page where the product has sales units and add a product to the cart with a sales unit. |
| QuantitySalesUnitWidgetPlugin | Go to the cart overview page and see if the sales unit information appears for a product. |

{% endinfo_block %}
