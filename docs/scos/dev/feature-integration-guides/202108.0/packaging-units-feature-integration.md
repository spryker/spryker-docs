---
title: Packaging Units feature integration
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-packaging-unit-feature-integration
originalArticleId: 2603fbfb-bc14-462a-b412-1d715c57e779
redirect_from:
  - /2021080/docs/product-packaging-unit-feature-integration
  - /2021080/docs/en/product-packaging-unit-feature-integration
  - /docs/product-packaging-unit-feature-integration
  - /docs/en/product-packaging-unit-feature-integration
---

## Install feature core
Follow the steps to install Packaging Units feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Inventory Management | {{page.version}} |
|Spryker Core  | {{page.version}} |
|Order Management  | {{page.version}} |
| Product | {{page.version}} |
| Measurement Units | {{page.version}} |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/packaging-units:"{{page.version}}" --update-with-dependencies`
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductPackagingUnit | vendor/spryker/product-packaging-unit |
| ProductPackagingUnitDataImport | vendor/spryker/product-packaging-unit-data-import |
| ProductPackagingUnitStorage | vendor/spryker/product-packaging-unit-storage |

{% endinfo_block %}

### 2) Set up Configuration
Adjust synchronization queue pools in `src/Pyz/Zed/ProductPackagingUnitStorage/ProductPackagingUnitStorageConfig.php`:

```php
<?php

namespace Pyz\Zed\ProductPackagingUnitStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ProductPackagingUnitStorage\ProductPackagingUnitStorageConfig as SprykerProductPackagingUnitStorageConfig;

class ProductPackagingUnitStorageConfig extends SprykerProductPackagingUnitStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductPackagingUnitSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME; // "synchronizationPool"
    }
}
```

### 3) Set up the database schema and transfer objects

Adjust the schema definition, so entity changes can trigger events.

<div>
| AFFECTED ENTITY | TRIGGERED EVENTS |
| --- | --- |
| spy_product_packaging_unit | Entity.spy_product_packaging_unit.create<br>Entity.spy_product_packaging_unit.update<br>Entity.spy_product_packaging_unit.delete |
| spy_product_packaging_unit_type | Entity.spy_product_packaging_unit_type.create<br>Entity.spy_product_packaging_unit_type.update<br>Entity.spy_product_packaging_unit_type.delete |
</div>

**src/Pyz/Zed/ProductPackagingUnit/Persistence/Propel/Schema/spy_product_packaging_unit.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductPackagingUnit\Persistence" package="src.Orm.Zed.ProductPackagingUnit.Persistence">

    <table name="spy_product_packaging_unit" phpName="SpyProductPackagingUnit">
        <behavior name="event">
            <parameter name="spy_product_packaging_unit_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_product_packaging_unit_type" phpName="SpyProductPackagingUnitType">
        <behavior name="event">
            <parameter name="spy_product_packaging_unit_type_all" column="*"/>
        </behavior>
    </table>
</database>
```

Set up synchronization queue pools, so non-multistore entities (not store-specific entities) can be synchronized among stores:

**src/Pyz/Zed/ProductPackagingUnitStorage/Persistence/Propel/Schema/spy_product_packaging_unit_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductPackagingUnitStorage\Persistence"
          package="src.Orm.Zed.ProductPackagingUnitStorage.Persistence">

    <table name="spy_product_packaging_unit_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool" />
        </behavior>
    </table>

</database>
```

Run the following commands to apply the database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_product_packaging_unit | table | created |
| spy_product_packaging_unit_type | table | created |
| spy_product_abstract_packaging_storage | table | created |
| spy_sales_order_item.amount | column | created |
| spy_sales_order_item.amount_sku | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects have been applied:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductPackagingUnitTransfer | class | created | src/Generated/Shared/Transfer/ProductPackagingUnitTransfer |
| ProductPackagingUnitAmountTransfer | class | created | src/Generated/Shared/Transfer/ProductPackagingUnitAmountTransfer |
| ProductPackagingUnitStorageTransfer | class | created | src/Generated/Shared/Transfer/ProductPackagingUnitStorageTransfer |
| SpyProductPackagingUnitEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductPackagingUnitEntityTransfer |
| ProductConcretePackagingStorage | class | created | src/Generated/Shared/Transfer/ProductConcretePackagingStorageTransfer |
| SpyProductPackagingUnitTypeEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductPackagingUnitTypeEntityTransfer |
| SpyProductPackagingUnitStorageEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductPackagingUnitStorageEntityTransfer |
| SpySalesOrderItemEntityTransfer.amount | property | created | src/Generated/Shared/Transfer/SpySalesOrderItemEntityTransfer |
| SpySalesOrderItemEntityTransfer.amountSku | property | created | src/Generated/Shared/Transfer/SpySalesOrderItemEntityTransfer |
| ItemTransfer.amount | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| ItemTransfer.amountLeadProduct | property | created | src/Generated/Shared/Transfer/ItemTransfer |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the changes have been implemented successfully. To do it, trigger the following methods and make sure that the above events have been triggered:

<div>
| PATH | METHOD NAME |
| --- | --- |
| src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnit.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnitType.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductPackagingUnitStorage/Persistence/Base/SpyProductPackagingUnitStorage.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnitType.php | sendToQueue() |
</div>

{% endinfo_block %}

### 4) Add translations

Append glossary according to your language configuration:

**src/data/import/glossary.csv**

```yaml
cart.pre.check.availability.failed.lead.product,Products inside the item 'sku' are not available at the moment.,en_US
cart.pre.check.availability.failed.lead.product,Produkte im Artikel 'sku' sind momentan nicht verfügbar.,de_DE
product.unavailable,Product '%sku%' is not available at the moment,en_US
product.unavailable,Das Produkt '%sku%' ist momentan nicht verfügbar,de_DE
cart.pre.check.amount.min.failed,Die minimale Mengenanforderung für Produkt SKU '%sku%' ist nicht erreicht.,de_DE
cart.pre.check.amount.min.failed,Minimum amount requirements for product SKU '%sku%' are not fulfilled.,en_US
cart.pre.check.amount.max.failed,Die maximale Mengenanforderung für Produkt SKU '%sku%' ist überschritten.,de_DE
cart.pre.check.amount.max.failed,Maximum amount for product SKU '%sku%' is exceeded.,en_US
cart.pre.check.amount.interval.failed,Die Anzahl für Produkt SKU '%sku%' liegt nicht innerhalb des vorgegebenen Intervals.,de_DE
cart.pre.check.amount.interval.failed,Amount interval requirements for product SKU '%sku%' are not fulfilled.,en_US
cart.pre.check.amount.is_not_variable.failed,Standardbetrag für Produkt SKU '%sku%' ist überschritten.,de_DE
cart.pre.check.amount.is_not_variable.failed,Default amount requirements for product SKU '%sku%' are not fulfilled.,en_US
cart.item.packaging_unit.not_found,Packaging unit not found for product with SKU '%sku%'.,en_US
cart.item.packaging_unit.not_found,Verpackungseinheit für Produkt mit SKU '% sku%' nicht gefunden.,de_DE
```

{% info_block infoBox "Info" %}

All packaging unit types need to have glossary entities for the configured locales

{% endinfo_block %}

Infrastructural record's glossary keys:

**src/data/import/glossary.csv**

```yaml
packaging_unit_type.item.name,Item,en_US
packaging_unit_type.item.name,Stück,de_DE
```

Demo data glossary keys:

**src/data/import/glossary.csv**

```yaml
packaging_unit_type.ring_500.name,"Ring (500m)",en_US
packaging_unit_type.ring_500.name,"Ring (500m)",de_DE
packaging_unit_type.box.name,Box,en_US
packaging_unit_type.box.name,Box,de_DE
packaging_unit_type.palette.name,Palette,en_US
packaging_unit_type.palette.name,Palette,de_DE
packaging_unit_type.giftbox.name,Giftbox,en_US
packaging_unit_type.giftbox.name,Geschenkbox,de_DE
packaging_unit_type.valentines_special.name,"Valentine's special",en_US
packaging_unit_type.valentines_special.name,Valentinstag Geschenkbox,de_DE
packaging_unit_type.pack_20.name,Pack 20,en_US
packaging_unit_type.pack_20.name,Pack 20,de_DE
packaging_unit_type.pack_500.name,Pack 500,en_US
packaging_unit_type.pack_500.name,Pack 500,de_DE
packaging_unit_type.pack_100.name,Pack 100,en_US
packaging_unit_type.pack_100.name,Pack 100,de_DE
packaging_unit_type.pack_mixed.name,Mixed Screws boxes,en_US
packaging_unit_type.pack_mixed.name,Gemischte Schraubenkästen,de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that  the configured data in the database has been added to the `spy_glossary` table.

{% endinfo_block %}


### 5) Configure export to Redis

This step publishes tables on change (create, edit, delete) to the `spy_product_packaging_unit_storage` and synchronizes the data to Storage.

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductPackagingUnitStorageEventSubscriber| Registers listeners that are responsible for publishing product abstract packaging unit storage entity changes when a related entity change event occurs. | None | Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\Subscriber|

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\Subscriber\ProductPackagingUnitStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductPackagingUnitStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

#### Set up publish feature

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductPackagingUnitSynchronizationDataPlugin | Registers a publisher for manually triggering the publish command. | None | Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event |

**src/Pyz/Zed/Event/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\ProductPackagingUnitEventResourceBulkRepositoryPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    public function getEventTriggerResourcePlugins()
    {
        return [
            new ProductPackagingUnitEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

#### Set up sync feature

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductPackagingUnitSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. | None | Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization\ProductPackagingUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductPackagingUnitSynchronizationDataBulkPlugin(),
        ];
    }
}
```

### 6) Import data

Import the following data.

#### Add infrastructural data

Add infrastructural data:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductPackagingUnitTypeInstallerPlugin|Installs the configured infrastructural packaging unit types.|None|Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Installer|

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Installer\ProductPackagingUnitTypeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new ProductPackagingUnitTypeInstallerPlugin(),
        ];
    }
}
```

Run the following console command to execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that  the configured infrastructural packaging unit types of the database are added to the `spy_product_packaging_unit_type` table.

{% endinfo_block %}

#### Import product packaging unit types

Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ProductPackagingUnitDataImport/data/import/product_packaging_unit_type.csv**

```yaml
name
packaging_unit_type.ring_500.name
packaging_unit_type.box.name
packaging_unit_type.palette.name
packaging_unit_type.giftbox.name
packaging_unit_type.valentines_special.name
packaging_unit_type.pack_mixed.name
packaging_unit_type.pack_20.name
packaging_unit_type.pack_100.name
packaging_unit_type.pack_500.name
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| name |  mandatory|string  | packaging_unit_type.ring_500.name |Glossary key that will be used to display a packaging unit type . Each name needs a glossary key definition for all configured locales.  |

Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductPackagingUnitTypeDataImportPlugin | Imports packaging unit type data into the database. | None | Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport |		

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductPackagingUnitTypeDataImportPlugin(),
        ];
    }
}
```

Run the following console command to import data:

```bash
console data:import product-packaging-unit-type
```    

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data has been added to the `spy_product_packaging_unit_type` table.

{% endinfo_block %}

#### Import product packaging units

Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ProductPackagingUnitDataImport/data/import/product_packaging_unit.csv**

```yaml
concrete_sku,lead_product_sku,packaging_unit_type_name,default_amount,is_amount_variable,amount_min,amount_max,amount_interval
218_1233,218_123,packaging_unit_type.pack_mixed.name,5,1,3,5,2
218_1234,218_123,packaging_unit_type.box.name,100,1,100,1000,10
218_1230,218_123,packaging_unit_type.pack_20.name,20,0,0,0,0
218_1231,218_123,packaging_unit_type.pack_100.name,100,0,0,0,0
218_1232,218_123,packaging_unit_type.pack_500.name,500,0,0,0,0
217_1231,217_123,packaging_unit_type.ring_500.name,1,0,,,
215_124,215_123,packaging_unit_type.ring_500.name,1,0,,,
```

<div>
| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| concrete_sku | mandatory | string | 218_123 |Concrete product SKU of packaging unit. |
| lead_product_sku | mandatory | string | 1 | Lead product concrete SKU. |
| packaging_unit_type_name | mandatory | string | packaging_unit_type.ring_500.name | Type a name of the current concrete product. |
| default_amount | optional | positive integer | 5 | <ul><li>Defines how many lead products should be sold together with each quantity of the current product concrete.</li><li>Effective only if the current concrete product `has_lead_product = 1`.</li></ul> |
| is_amount_variable | mandatory | bool integer | 1 | <ul><li>Allows customers to override the `default_amount` and decide how many lead products will be ordered for each quantity of this product concrete.</li></ul> |
| amount_min | optional | positive integer | 3 | <ul><li>Restricts a customer to buy at least this amount of lead products.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value is 1 when not provided.</li></ul> |
| amount_max | optional | positive integer | 5 | <ul><li>Restricts a customer not to buy more than this value.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value remains empty (unlimited) when not provided.</li></ul> |
| amount_interval | optional | positive integer | 2 | <ul><li>Restricts customers to buy the amount that fits into the interval beginning with `amount_min`.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value is `amount_min` when not provided.</li></ul> Min = 3; Max = 10; Interval = 2 <br> Choosable: 3, 5, 7, 9|
</div>

Register the following plugin to enable data import:

<div>
| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductPackagingUnitDataImportPlugin | Imports packaging unit type data into the database. | <ul><li>Requires related product concretes and product abstract to be present in the database already.</li><li>Requires related packaging unit types to be present in the database already.</li></ul> | Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport |
</div>

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitDataImportPlugin;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductPackagingUnitDataImportPlugin(),
        ];
    }
}
```

Run the following console command to import data:

```bash
console data:import product-packaging-unit
```

{% info_block warningBox "Verification" %}

Make sure that the configured data in the database has been added to the `spy_product_packaging_unit`  and `spy_product_packaging_unit_type` tables.

{% endinfo_block %}

### 7) Set up behavior

Set up the following behaviors.

#### Set up checkout workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AmountAvailabilityCartPreCheckPlugin | Validates if the given amount is available according to stock configuration during the cart change. | Expects the `amount` field to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| AmountGroupKeyItemExpanderPlugin | Expands a group key with the amount and its sales unit to granulate the item grouping in the cart for packaging unit items. | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| AmountRestrictionCartPreCheckPlugin | Validates the amount restrictions when Item has restrictions. | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfer` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| AmountSalesUnitItemExpanderPlugin | Sets the `amountSalesUnit` field for `ItemTransfers` with packaging units.  | Expects the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| AmountSalesUnitValuePostSavePlugin |Sets a normalized amount sales unit value field.  | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfer` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| CustomAmountPriceItemExpanderPlugin | Updates unit prices for variable amounted packaging units. | Expects the `amount` and `productPackagingUnit` fields to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| ProductPackagingUnitCartAddItemStrategyPlugin | Merges the `quantity` and `amount` fields changes into the cart for `ItemTransfers` with packaging units on the cart add action. | Expects the amount field to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| ProductPackagingUnitCartRemoveItemStrategyPlugin | Merges the `quantity` and `amount` fields changes into the cart for `ItemTransfers` with packaging units on the cart removal action. | Expects the amount field to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| ProductPackagingUnitItemExpanderPlugin | Sets the `amountLeadProduct` and `productPackagingUnit` fields in the `ItemTransfer` properties . | Expects the `amount` field to be set in `ItemTransfer` properties with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| ProductPackagingUnitCartPreCheckPlugin | Checks if packaging units are found for items in `CartChangeTransfer`. | Expects the `amount` field to be set in the `ItemTransfer` properties with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart |
| AmountAvailabilityCheckoutPreConditionPlugin | Validates if the given amount is available according to stock configuration during checkout. |Expects the `amount` and `amountLeadProduct` fields to be set in `ItemTransfers` with packaging units.  | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout |
| ProductPackagingUnitCartAddItemStrategyPlugin |Merges the `quantity` and `amount` fields changes into the cart for `ItemTransfers` with packaging units on the persistent cart add action.  | Expects the `amount` field to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\PersistentCart |
| LeadProductReservationHandlerPlugin | Updates availability and reservation of a lead product for a given product packaging unit for reservation handler. |None  | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Reservation |
| AmountLeadProductHydrateOrderPlugin | Hydrates the `leadProduct` field for Order read. | Expects the `items`, `amount`, and `amountSku` fields to be set in Order. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales |
| AmountSalesUnitHydrateOrderPlugin | Hydrates the `amountSalesUnit` field for Order read. | Expects the `items` field to be set in Order. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales |
| AmountSalesUnitOrderItemExpanderPreSavePlugin |Sets the amount measurement related fields in the Order item for saving.  | Expects the `amountSalesUnit` field to be set in `ItemTransfers` with packaging units. | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension |
| ProductPackagingUnitOrderItemExpanderPreSavePlugin |Sets the `amount` and `amountSku` fields in the Order item for saving.|Expects `amountLeadProduct` to be set in `ItemTransfers` with packaging units.  | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension |
| LeadProductStockUpdateHandlerPlugin |Updates availability and reservation of a lead product for a given product packaging unit for stock update handler.  | None | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Stock |
| ProductPackagingUnitAmountCartChangeRequestExpanderPlugin | Sets the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` fields in `ItemTransfers` with packaging units for cart change. |  Expects a request to contain the to-be-used information.| Spryker\Client\ProductPackagingUnit\Plugin\CartExtension |
| ProductPackagingUnitAmountPersistentCartChangeExpanderPlugin | Sets the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` fields in `ItemTransfers` with packaging units for persistent cart change. | Expects a request to contain the to-be-used information. | Spryker\Client\ProductPackagingUnit\Plugin\PersistentCartExtension |
| ProductPackagingUnitReservationAggregationStrategyPlugin | Aggregates the product reservation for packaging untis and lead product of packaging untis. | None | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms |
| ProductPackagingUnitProductAbstractAddToCartPlugin | Filters out products which have packaging unit available. | None | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\ProductPageSearch |
| AmountLeadProductOrderItemExpanderPlugin | Expands order items with additional packaging unit amount lead product. | None | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales |
| AmountSalesUnitOrderItemExpanderPlugin | Expands order items with additional packaging unit sales unit. | None | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales |

**src/Pyz/Client/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountAvailabilityCartPreCheckPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountGroupKeyItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountRestrictionCartPreCheckPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountSalesUnitItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountSalesUnitValuePostSavePlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\CustomAmountPriceItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitCartAddItemStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitCartRemoveItemStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitItemExpanderPlugin;
use Spryker\Zed\Kernel\Container;

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
            new ProductPackagingUnitItemExpanderPlugin(),
            new AmountGroupKeyItemExpanderPlugin(),
            new AmountSalesUnitItemExpanderPlugin(),
            new CustomAmountPriceItemExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface[]
     */
    protected function getCartRemoveItemStrategyPlugins(Container $container): array
    {
        return [
            new ProductPackagingUnitCartRemoveItemStrategyPlugin(),
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
            new AmountAvailabilityCartPreCheckPlugin(),
            new AmountRestrictionCartPreCheckPlugin(),
			new ProductPackagingUnitCartPreCheckPlugin(),
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
            new AmountSalesUnitValuePostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface[]
     */
    protected function getCartAddItemStrategyPlugins(Container $container): array
    {
        return [
            new ProductPackagingUnitCartAddItemStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout\AmountAvailabilityCheckoutPreConditionPlugin;
use Spryker\Zed\Kernel\Container;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container ’
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreConditionInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new AmountAvailabilityCheckoutPreConditionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PersistentCart;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\PersistentCart\ProductPackagingUnitCartAddItemStrategyPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface[]
     */
    protected function getCartAddItemStrategyPlugins(Container $container): array
    {
        return [
            new ProductPackagingUnitCartAddItemStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms\ProductPackagingUnitReservationAggregationStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Reservation\LeadProductReservationHandlerPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Oms\Dependency\Plugin\ReservationHandlerPluginInterface[]
     */
    protected function getReservationHandlerPlugins(Container $container)
    {
        return [
            new LeadProductReservationHandlerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationAggregationStrategyPluginInterface[]
     */
    protected function getReservationAggregationStrategyPlugins(): array
    {
        return [
            new ProductPackagingUnitReservationAggregationStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountLeadProductHydrateOrderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountLeadProductOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountSalesUnitHydrateOrderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountSalesUnitOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension\AmountSalesUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension\ProductPackagingUnitOrderItemExpanderPreSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\Sales\Dependency\Plugin\HydrateOrderPluginInterface[]
     */
    protected function getOrderHydrationPlugins()
    {
        return [
            new AmountLeadProductHydrateOrderPlugin(),
            new AmountSalesUnitHydrateOrderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface[]
     */
    protected function getOrderItemExpanderPreSavePlugins()
    {
        return [
            new ProductPackagingUnitOrderItemExpanderPreSavePlugin(),
            new AmountSalesUnitOrderItemExpanderPreSavePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new AmountLeadProductOrderItemExpanderPlugin(),
            new AmountSalesUnitOrderItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Stock/StockDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Stock;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Stock\LeadProductStockUpdateHandlerPlugin;
use Spryker\Zed\Stock\StockDependencyProvider as SprykerStockDependencyProvider;

class StockDependencyProvider extends SprykerStockDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Stock\Dependency\Plugin\StockUpdateHandlerPluginInterface[]
     */
    protected function getStockUpdateHandlerPlugins(Container $container)
    {
        return [
            new LeadProductStockUpdateHandlerPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Cart;

use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\ProductPackagingUnit\Plugin\CartExtension\ProductPackagingUnitAmountCartChangeRequestExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface[]
     */
    protected function getAddItemsRequestExpanderPlugins()
    {
        return [
            new ProductPackagingUnitAmountCartChangeRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Client\ProductPackagingUnit\Plugin\PersistentCartExtension\ProductPackagingUnitAmountPersistentCartChangeExpanderPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    /**
     * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface[]
     */
    protected function getChangeRequestExtendPlugins(): array
    {
        return [
            new ProductPackagingUnitAmountPersistentCartChangeExpanderPlugin(), #ProductPackagingUnit
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Add an item with packaging units to cart.

*     Check if a packaging unit can be found for an item.
*     Check if the `amount`, `amountSalesUnit`, `amountLeadProduct` and `ProductPackagingUnit` fields in the `ItemTransfer` properties get fully populated.
*     Check if the amount restriction works as expected.
*     Check if availability is validated respectfully according to your lead product's and packaging unit's configuration.
*     Check if item grouping in cart works as expected.
*     Check if variable amount changes affect unit prices in the `ItemTransfer` properties.
*     Check if quantity and amount are merged correctly when the group key matches.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Go through the checkout workflow and make an order>.
* Check if the stock is modified respectfully according to your lead product's and packaging unit's configuration.
* Check if the following fields in the `spy_sales_order_item` table are saved:
  * `amount`
  * `amount_sku`
  * `amount_measurement_unit_name`
  * `amount_measurement_unit_code`
  * `amount_measurement_unit_precision`
  * `amount_measurement_unit_conversion`
  * `amount_base_measurement_unit_name`
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Go to the Zed UI Sales overview and check the order.
- Verify if the correct sales unit is displayed.
- Verify if the correct amount is displayed per sales order item.
{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that abstract products which have packaging units available don’t have `add_to_cart_sku` field at Elasticsearch document.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::getOrderItems()` results contains packaging units data: `ItemTransfer.amountLeadProduct` and `ItemTransfer.amountSalesUnit` are set for the order items that have packaging units.

{% endinfo_block %}


## Install feature frontend

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core E-commerce | {{page.version}} |
| Measurement Units | {{page.version}} |
| Non-splittable Products | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/packaging-units: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductPackagingUnitWidget | vendor/spryker-shop/product-packaging-unit-widget |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
packaging-units.recommendation.amount-min-violation,Minimum amount requirements for product are not fulfilled,en_US
packaging-units.recommendation.amount-min-violation,Mindestmengenanforderungen für das Produkt sind nicht erfüllt,de_DE
packaging-units.recommendation.amount-max-violation,Maximum amount requirements for product are not fulfilled,en_US
packaging-units.recommendation.amount-max-violation,Maximale Mengenanforderungen für das Produkt sind nicht erfüllt,de_DE
packaging-units.recommendation.amount-interval-violation,Amount interval requirements for product are not fulfilled,en_US
packaging-units.recommendation.amount-interval-violation,Mengenintervallanforderungen für das Produkt sind nicht erfüllt,de_DE
packaging_units.recommendation.suggestion,Would you like to add:,en_US
packaging_units.recommendation.suggestion,Möchten Sie hinzufügen:,de_DE
packaging_units.recommendation.between-units-info,The amount you have chosen is in between 2 base units,en_US
packaging_units.recommendation.between-units-info,Ihre gewählte Anzahl liegt zwischen 2 basis Einheiten,de_DE
packaging_units.cart.quantity,Quantity,en_US
packaging_units.cart.quantity,Anzahl,de_DE
packaging_units.cart.amount,Amount,en_US
packaging_units.cart.amount,Betrag,de_DE
packaging_units.cart.item,Items,en_US
packaging_units.cart.item,Artikel,de_DE
page.detail.add-to-cart,In den Warenkorb,de_DE
page.detail.add-to-cart,Add to Cart,en_US
product.measurement.sales_unit,Sales Unit,en_US
product.measurement.sales_unit,Maßeinheit,de_DE
cart.item_quantity,Anzahl,de_DE
cart.item_quantity,Quantity,en_US
measurement_units.new-price,New price,en_US
measurement_units.new-price,Neuer Preis,de_DE
measurement_units.recommendation.between-units-info,The quantity you have chosen is in between 2 base units,en_US
measurement_units.recommendation.between-units-info,Ihre gewählte Anzahl liegt zwischen 2 basis Einheiten,de_DE
measurement_units.recommendation.min-violation,Minimum quantity requirements for product are not fulfilled,en_US
measurement_units.recommendation.min-violation,Minimale Mengenanforderungen für das Produkt sind nicht erfüllt,de_DE
measurement_units.recommendation.max-violation,Maximum quantity requirements for product are not fulfilled,en_US
measurement_units.recommendation.max-violation,Maximale Mengenanforderungen für das Produkt sind nicht erfüllt,de_DE
measurement_units.recommendation.suggestion,Would you like to add,en_US
measurement_units.recommendation.suggestion,Was würden Sie gerne hinzufügen? ,de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that the configured data in the database has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up widgets

Enable the following global widget(s):

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| ProductPackagingUnitWidget | Displays product packaging options for quantity and amount. | SprykerShop\Yves\ProductPackagingUnitWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductPackagingUnitWidget\Widget\ProductPackagingUnitWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductPackagingUnitWidget::class,
        ];
    }
}
```

`ProductPackagingUnitWidget` uses Javascript for some functionality:

|Functionality|Path|
|--- |--- |
|Controls base unit => sales unit calculationsApplies product quantity and amount restrictions on sales unit levelOffers recommendation when invalid quantity or amount is selectedMaintains stock-based quantity, amount and sales unit information for posting|`vendor/spryker-shop/product-packaging-unit-widget/src/SprykerShop/Yves/ProductPackagingUnitWidget/Theme/default/components/molecules/packaging-unit-quantity-selector/packaging-unit-quantity-selector.ts`|


Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}

- Check if the `amount` field appears on the Product Detail page for items with packaging units.
- Check if the `amount` field appears correctly with measurement unit information on the Cart page.
- Check if the `amount` field appears correctly with measurement unit information on the Checkout Summary page.
- Check if the `amount` field appears correctly with measurement unit information on the previous Orders page.

{% endinfo_block %}
