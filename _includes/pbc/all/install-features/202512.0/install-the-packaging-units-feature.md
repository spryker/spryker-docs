


This document describes how to install the [Packaging Units](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/packaging-units-feature-overview.html) feature.

## Install feature core

Follow the steps to install the Packaging Units feature core.

### Prerequisites

Install the required features:

| NAME                 | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                |
|----------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core         | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                      |
| Order Management     | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)                                                     |
| Inventory Management | 202507.0 | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html)     |
| Product              | 202507.0 | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                                                       |
| Measurement Units    | 202507.0 | [Install the Measurement Units feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/packaging-units:"202507.0" --update-with-dependencies`
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                           | EXPECTED DIRECTORY                                 |
|----------------------------------|----------------------------------------------------|
| ProductPackagingUnit             | vendor/spryker/product-packaging-unit              |
| ProductPackagingUnitDataImport   | vendor/spryker/product-packaging-unit-data-import  |
| ProductPackagingUnitStorage      | vendor/spryker/product-packaging-unit-storage      |
| ProductPackagingUnitsBackendApi  | vendor/spryker/product-packaging-units-backend-api |

{% endinfo_block %}

### 2) Set up configuration

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
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

### 3) Set up the database schema and transfer objects

1. Adjust the schema definition so entity changes can trigger events.

| AFFECTED ENTITY                 | TRIGGERED EVENTS                                                                                                                                |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| spy_product_packaging_unit      | Entity.spy_product_packaging_unit.create<br>Entity.spy_product_packaging_unit.update<br>Entity.spy_product_packaging_unit.delete                |
| spy_product_packaging_unit_type | Entity.spy_product_packaging_unit_type.create<br>Entity.spy_product_packaging_unit_type.update<br>Entity.spy_product_packaging_unit_type.delete |


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

2. Set up synchronization queue pools so non-multi-store entities (not store-specific entities) can be synchronized among stores:

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

3. Apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                        | TYPE   | EVENT   |
|----------------------------------------|--------|---------|
| spy_product_packaging_unit             | table  | created |
| spy_product_packaging_unit_type        | table  | created |
| spy_product_abstract_packaging_storage | table  | created |
| spy_sales_order_item.amount            | column | created |
| spy_sales_order_item.amount_sku        | column | created |

Make sure that the following changes in transfer objects have been applied:

| TRANSFER                                         | TYPE     | EVENT   | PATH                                                                                   |
|--------------------------------------------------|----------|---------|----------------------------------------------------------------------------------------|
| ProductPackagingUnit                             | class    | created | src/Generated/Shared/Transfer/ProductPackagingUnitTransfer                             |
| ProductPackagingUnitAmount                       | class    | created | src/Generated/Shared/Transfer/ProductPackagingUnitAmountTransfer                       |
| ProductPackagingUnitStorage                      | class    | created | src/Generated/Shared/Transfer/ProductPackagingUnitStorageTransfer                      |
| ProductConcretePackagingStorage                  | class    | created | src/Generated/Shared/Transfer/ProductConcretePackagingStorageTransfer                  |
| ProductPackagingUnitType                         | class    | created | src/Generated/Shared/Transfer/ProductPackagingUnitTypeTransfer                         |
| ProductPackagingUnitTypeTranslation              | class    | created | src/Generated/Shared/Transfer/ProductPackagingUnitTypeTranslationTransfer              |
| ProductConcreteAvailability                      | class    | created | src/Generated/Shared/Transfer/ProductConcreteAvailabilityTransfer                      |
| OmsState                                         | class    | created | src/Generated/Shared/Transfer/OmsStateTransfer                                         |
| OmsStateCollection                               | class    | created | src/Generated/Shared/Transfer/OmsStateCollectionTransfer                               |
| OmsProcess                                       | class    | created | src/Generated/Shared/Transfer/OmsProcessTransfer                                       |
| SalesOrderItemStateAggregation                   | class    | created | src/Generated/Shared/Transfer/SalesOrderItemStateAggregationTransfer                   |
| CartChange                                       | class    | created | src/Generated/Shared/Transfer/CartChangeTransfer                                       |
| CartPreCheckResponse                             | class    | created | src/Generated/Shared/Transfer/CartPreCheckResponseTransfer                             |
| Quote                                            | class    | created | src/Generated/Shared/Transfer/QuoteTransfer                                            |
| PersistentCartChange                             | class    | created | src/Generated/Shared/Transfer/PersistentCartChangeTransfer                             |
| ProductConcrete                                  | class    | created | src/Generated/Shared/Transfer/ProductConcreteTransfer                                  |
| Message                                          | class    | created | src/Generated/Shared/Transfer/MessageTransfer                                          |
| CheckoutResponse                                 | class    | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer                                 |
| CheckoutError                                    | class    | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer                                    |
| Store                                            | class    | created | src/Generated/Shared/Transfer/StoreTransfer                                            |
| Order                                            | class    | created | src/Generated/Shared/Transfer/OrderTransfer                                            |
| ProductMeasurementBaseUnit                       | class    | created | src/Generated/Shared/Transfer/ProductMeasurementBaseUnitTransfer                       |
| ItemCollection                                   | class    | created | src/Generated/Shared/Transfer/ItemCollectionTransfer                                   |
| ProductOption                                    | class    | created | src/Generated/Shared/Transfer/ProductOptionTransfer                                    |
| Locale                                           | class    | created | src/Generated/Shared/Transfer/LocaleTransfer                                           |
| Translation                                      | class    | created | src/Generated/Shared/Transfer/TranslationTransfer                                      |
| ReservationRequest                               | class    | created | src/Generated/Shared/Transfer/ReservationRequestTransfer                               |
| PickingListCollection                            | class    | created | src/Generated/Shared/Transfer/PickingListCollectionTransfer                            |
| PickingListItem                                  | class    | created | src/Generated/Shared/Transfer/PickingListItemTransfer                                  |
| OrderItemsBackendApiAttributes                   | class    | created | src/Generated/Shared/Transfer/OrderItemsBackendApiAttributesTransfer                   |
| ProductMeasurementSalesUnitsBackendApiAttributes | class    | created | src/Generated/Shared/Transfer/ProductMeasurementSalesUnitsBackendApiAttributesTransfer |
| ProductMeasurementUnitsBackendApiAttributes      | class    | created | src/Generated/Shared/Transfer/ProductMeasurementUnitsBackendApiAttributesTransfer      |
| PickingListItemsBackendApiAttributes             | class    | created | src/Generated/Shared/Transfer/PickingListItemsBackendApiAttributesTransfer             |
| ProductMeasurementUnit                           | class    | created | src/Generated/Shared/Transfer/ProductMeasurementUnitTransfer                           |
| ProductMeasurementSalesUnit                      | class    | created | src/Generated/Shared/Transfer/ProductMeasurementSalesUnitTransfer                      |
| ItemTransfer.amount                              | property | created | src/Generated/Shared/Transfer/ItemTransfer                                             |
| ItemTransfer.amountLeadProduct                   | property | created | src/Generated/Shared/Transfer/ItemTransfer                                             |

Make sure that the changes have been implemented successfully. To do it, trigger the following methods and make sure that the preceding events have been triggered:

| PATH                                                                                        | METHOD NAME                                                                  |
|---------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnit.php               | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnitType.php           | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductPackagingUnitStorage/Persistence/Base/SpyProductPackagingUnitStorage.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnitType.php           | sendToQueue()                                                                |


{% endinfo_block %}

### 4) Add translations

1. Append the glossary according to your language configuration:

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

All packaging unit types need to have glossary entities for the configured locales.

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

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data in the database has been added to the `spy_glossary` table.

{% endinfo_block %}


### 5) Configure export to the key-value store (Redis or Valkey)

This step publishes tables on change (create, edit, delete) to `spy_product_packaging_unit_storage` and synchronizes the data to Storage.

#### Set up event listeners

| PLUGIN                                     | SPECIFICATION                                                                                                                                             | PREREQUISITES | NAMESPACE                                                                     |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| ProductPackagingUnitStorageEventSubscriber | Registers listeners that are responsible for publishing product abstract packaging unit storage entity changes when a related entity change event occurs. |               | Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\Subscriber\ProductPackagingUnitStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection(): EventSubscriberCollectionInterface
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductPackagingUnitStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

#### Set up publish feature

| PLUGIN                                        | SPECIFICATION                                                      | PREREQUISITES | NAMESPACE                                                          |
|-----------------------------------------------|--------------------------------------------------------------------|---------------|--------------------------------------------------------------------|
| ProductPackagingUnitSynchronizationDataPlugin | Registers a publisher for manually triggering the publish command. |               | Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event |

**src/Pyz/Zed/Event/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\ProductPackagingUnitEventResourceBulkRepositoryPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface>
     */
    protected function getEventTriggerResourcePlugins(): array
    {
        return [
            new ProductPackagingUnitEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

#### Set up sync feature

| PLUGIN                                        | SPECIFICATION                                                      | PREREQUISITES | NAMESPACE                                                                    |
|-----------------------------------------------|--------------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| ProductPackagingUnitSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. |               | Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization\ProductPackagingUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductPackagingUnitSynchronizationDataBulkPlugin(),
        ];
    }
}
```

### 6) Add infrastructural data

1. Add the following data.

| PLUGIN                                  | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                                       |
|-----------------------------------------|---------------------------------------------------------------|---------------|-----------------------------------------------------------------|
| ProductPackagingUnitTypeInstallerPlugin | Installs the configured infrastructural packaging unit types. |               | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Installer |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Installer\ProductPackagingUnitTypeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface>
     */
    public function getInstallerPlugins()
    {
        return [
            new ProductPackagingUnitTypeInstallerPlugin(),
        ];
    }
}
```

2. Execute the registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that the configured infrastructural packaging unit types of the database are added to the `spy_product_packaging_unit_type` table.

{% endinfo_block %}

### 7) Import product packaging unit types

1. Prepare your data according to your requirements using our demo data:

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

| COLUMN | REQUIRED  | DATA TYPE | DATA EXAMPLE                      | DATA EXPLANATION                                                                                                                       |
|--------|-----------|-----------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| name   | ✓ | string    | packaging_unit_type.ring_500.name | Glossary key that will be used to display a packaging unit type. Each name needs a glossary key definition for all configured locales. |

2. Register the following plugin to enable data import:

| PLUGIN                                   | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                                                  |
|------------------------------------------|-----------------------------------------------------|---------------|----------------------------------------------------------------------------|
| ProductPackagingUnitTypeDataImportPlugin | Imports packaging unit type data into the database. |               | Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport |		

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductPackagingUnitTypeDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import product-packaging-unit-type
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_product_packaging_unit_type` table.

{% endinfo_block %}

#### Import product packaging units

1. Prepare your data according to your requirements using our demo data:

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

| COLUMN                   | REQUIRED  | DATA TYPE        | DATA EXAMPLE                      | DATA EXPLANATION                                                                                                                                                                                                                                                                         |
|--------------------------|-----------|------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| concrete_sku             | ✓ | string           | 218_123                           | Concrete product SKU of packaging unit.                                                                                                                                                                                                                                                  |
| lead_product_sku         | ✓ | string           | 1                                 | Lead product concrete SKU.                                                                                                                                                                                                                                                               |
| packaging_unit_type_name | ✓ | string           | packaging_unit_type.ring_500.name | Type a name of the current concrete product.                                                                                                                                                                                                                                             |
| default_amount           | optional  | positive integer | 5                                 | <ul><li>Defines how many lead products should be sold together with each quantity of the current product concrete.</li><li>Effective only if the current concrete product `has_lead_product = 1`.</li></ul>                                                                              |
| is_amount_variable       | ✓ | bool integer     | 1                                 | <ul><li>Allows customers to override the `default_amount` and decide how many lead products will be ordered for each quantity of this product concrete.</li></ul>                                                                                                                        |
| amount_min               | optional  | positive integer | 3                                 | <ul><li>Restricts a customer to buy at least this amount of lead products.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value is 1 when not provided.</li></ul>                                                                                                   |
| amount_max               | optional  | positive integer | 5                                 | <ul><li>Restricts a customer not to buy more than this value.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value remains empty (unlimited) when not provided.</li></ul>                                                                                           |
| amount_interval          | optional  | positive integer | 2                                 | <ul><li>Restricts customers to buy the amount that fits into the interval beginning with `amount_min`.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value is `amount_min` when not provided.</li></ul> Min = 3; Max = 10; Interval = 2 <br> Choosable: 3, 5, 7, 9 |


2. Register the following plugin to enable data import:

| PLUGIN                               | SPECIFICATION                                       | PREREQUISITES                                                                                                                                                                                         | NAMESPACE                                                                  |
|--------------------------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| ProductPackagingUnitDataImportPlugin | Imports packaging unit type data into the database. | <ul><li>Requires related product concretes and product abstract to be present in the database already.</li><li>Requires related packaging unit types to be present in the database already.</li></ul> | Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductPackagingUnitDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import product-packaging-unit
```

{% info_block warningBox "Verification" %}

Make sure that the configured data in the database has been added to the `spy_product_packaging_unit` and `spy_product_packaging_unit_type` tables.

{% endinfo_block %}

### 7) Set up behavior

Set up the following behaviors.

#### Set up checkout workflow

Enable the following behaviors by registering the plugins:

| PLUGIN       | SPECIFICATION | PREREQUISITES| NAMESPACE     |
|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| AmountAvailabilityCartPreCheckPlugin                                 | Validates if the given amount is available according to stock configuration during the cart change.                                                                     | Expects the `amount` field to be set in `ItemTransfers` with packaging units.                                                                                                                                   | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| AmountGroupKeyItemExpanderPlugin                                     | Expands a group key with the amount and its sales unit to granulate the item grouping in the cart for packaging unit items.                                             | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfers` with packaging units.                                                                                                            | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| AmountRestrictionCartPreCheckPlugin                                  | Validates the amount restrictions when Item has restrictions.                                                                                                           | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfer` with packaging units.                                                                                                             | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| AmountSalesUnitItemExpanderPlugin                                    | Sets the `amountSalesUnit` field for `ItemTransfers` with packaging units.                                                                                              | Expects the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` to be set in `ItemTransfers` with packaging units.                                                                                     | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| AmountSalesUnitValuePostSavePlugin                                   | Sets a normalized amount sales unit value field.                                                                                                                        | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfer` with packaging units.                                                                                                             | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| CustomAmountPriceItemExpanderPlugin                                  | Updates unit prices for variable amounted packaging units.                                                                                                              | Expects the `amount` and `productPackagingUnit` fields to be set in `ItemTransfers` with packaging units.                                                                                                       | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| ProductPackagingUnitCartAddItemStrategyPlugin                        | Merges the `quantity` and `amount` fields changes into the cart for `ItemTransfers` with packaging units on the cart add action.                                        | Expects the amount field to be set in `ItemTransfers` with packaging units.                                                                                                                                     | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| ProductPackagingUnitCartRemoveItemStrategyPlugin                     | Merges the `quantity` and `amount` fields changes into the cart for `ItemTransfers` with packaging units on the cart removal action.                                    | Expects the amount field to be set in `ItemTransfers` with packaging units.                                                                                                                                     | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| ProductPackagingUnitItemExpanderPlugin                               | Sets the `amountLeadProduct` and `productPackagingUnit` fields in the `ItemTransfer` properties .                                                                       | Expects the `amount` field to be set in `ItemTransfer` properties with packaging units.                                                                                                                         | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| ProductPackagingUnitCartPreCheckPlugin                               | Checks if packaging units are found for items in `CartChangeTransfer`.                                                                                                  | Expects the `amount` field to be set in the `ItemTransfer` properties with packaging units.                                                                                                                     | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart                 |
| AmountAvailabilityCheckoutPreConditionPlugin                         | Validates if the given amount is available according to stock configuration during checkout.                                                                            | Expects the `amount` and `amountLeadProduct` fields to be set in `ItemTransfers` with packaging units.                                                                                                          | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout             |
| PackagingUnitSplittableItemTransformerStrategyPlugin                 | Splitting order item if product packaging unit item is splittable                                                                                                       |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout             |
| ProductPackagingUnitCartAddItemStrategyPlugin                        | Merges the `quantity` and `amount` fields changes into the cart for `ItemTransfers` with packaging units on the persistent cart add action.                             | Expects the `amount` field to be set in `ItemTransfers` with packaging units.                                                                                                                                   | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\PersistentCart       |
| LeadProductReservationPostSaveTerminationAwareStrategyPlugin         | Updates the lead product's reservation for the provided product packaging unit SKU.                                                                                     |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Reservation          |
| AmountSalesUnitOrderItemExpanderPreSavePlugin                        | Sets the amount measurement related fields in the Order item for saving.                                                                                                | Expects the `amountSalesUnit` field to be set in `ItemTransfers` with packaging units.                                                                                                                          | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension       |
| ProductPackagingUnitOrderItemExpanderPreSavePlugin                   | Sets the `amount` and `amountSku` fields in the Order item for saving.                                                                                                  | Expects `amountLeadProduct` to be set in `ItemTransfers` with packaging units.                                                                                                                                  | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension       |
| LeadProductStockUpdateHandlerPlugin                                  | Updates availability and reservation of a lead product for a given product packaging unit for stock update handler.                                                     |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Stock                |
| ProductPackagingUnitAmountCartChangeRequestExpanderPlugin            | Sets the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` fields in `ItemTransfers` with packaging units for cart change.                                   | Expects a request to contain the to-be-used information.                                                                                                                                                        | Spryker\Client\ProductPackagingUnit\Plugin\CartExtension                   |
| ProductPackagingUnitAmountPersistentCartChangeExpanderPlugin         | Sets the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` fields in `ItemTransfers` with packaging units for persistent cart change.                        | Expects a request to contain the to-be-used information.                                                                                                                                                        | Spryker\Client\ProductPackagingUnit\Plugin\PersistentCartExtension         |
| ProductPackagingUnitOmsReservationAggregationPlugin                  | Aggregates reservations for provided SKU both with or without packaging unit.                                                                                           |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms                  |
| ProductPackagingUnitProductAbstractAddToCartPlugin                   | Filters out products which have packaging unit available.                                                                                                               |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\ProductPageSearch    |
| AmountLeadProductOrderItemExpanderPlugin                             | Expands order items with additional packaging unit amount lead product.                                                                                                 |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales                |
| AmountSalesUnitOrderItemExpanderPlugin                               | Expands order items with additional packaging unit sales unit.                                                                                                          |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales                |
| ProductPackagingUnitPickingListCollectionExpanderPlugin              | Expands `PickingListCollectionTransfer.pickingList.pickingListItem.orderItem` transfer objects with `amountSalesUnit` property.                                         |                                                                                                                                                                                                                 | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\PickingList          |
| ProductPackagingUnitPickingListItemsBackendApiAttributesMapperPlugin | Maps amount sales unit from `PickingListItemTransfer.orderItem.amountSalesUnit` to `ApiPickingListItemsAttributesTransfer.orderItem.amountSalesUnit` transfer property. | Expects the `uuid` and `orderItem.amountSalesUnit.productMeasurementUnit` fields to be set in `PickingListItemTransfer`. Expects the `uuid` field to be set in `ApiPickingListItemsAttributesTransfer` as well. | Spryker\Glue\ProductPackagingUnitsBackendApi\Plugin\PickingListsBackendApi |

<details>
<summary>src/Pyz/Client/Cart/CartDependencyProvider.php</summary>

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
     * @return list<\Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
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
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface>
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
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
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
     * @return list<\Spryker\Zed\Cart\Dependency\PostSavePluginInterface>
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
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface>
     */
    protected function getCartAddItemStrategyPlugins(Container $container): array
    {
        return [
            new ProductPackagingUnitCartAddItemStrategyPlugin(),
        ];
    }
}
```

</details>

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
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreConditionInterface>
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
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface>
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

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms\ProductPackagingUnitOmsReservationAggregationPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Reservation\LeadProductReservationPostSaveTerminationAwareStrategyPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationPostSaveTerminationAwareStrategyPluginInterface>
     */
    protected function getReservationPostSaveTerminationAwareStrategyPlugins(): array
    {
        return [
            new LeadProductReservationPostSaveTerminationAwareStrategyPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationPluginInterface>
     */
    protected function getOmsReservationAggregationPlugins(): array
    {
        return [
            new ProductPackagingUnitOmsReservationAggregationPlugin(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout\PackagingUnitSplittableItemTransformerStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountLeadProductOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountSalesUnitOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension\AmountSalesUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension\ProductPackagingUnitOrderItemExpanderPreSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface>
     */
    protected function getOrderItemExpanderPreSavePlugins(): array
    {
        return [
            new ProductPackagingUnitOrderItemExpanderPreSavePlugin(),
            new AmountSalesUnitOrderItemExpanderPreSavePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new AmountLeadProductOrderItemExpanderPlugin(),
            new AmountSalesUnitOrderItemExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\ItemTransformerStrategyPluginInterface>
     */
    public function getItemTransformerStrategyPlugins(): array
    {
        return [
            new PackagingUnitSplittableItemTransformerStrategyPlugin(),
        ];
    }
}
```

</details>

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
     * @return list<\Spryker\Zed\Stock\Dependency\Plugin\StockUpdateHandlerPluginInterface>
     */
    protected function getStockUpdateHandlerPlugins(Container $container): array
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
     * @return list<\Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface>
     */
    protected function getAddItemsRequestExpanderPlugins(): array
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
     * @return list<\Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface>
     */
    protected function getChangeRequestExtendPlugins(): array
    {
        return [
            new ProductPackagingUnitAmountPersistentCartChangeExpanderPlugin(), #ProductPackagingUnit
        ];
    }
}
```

**src/Pyz/Zed/PickingList/PickingListDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PickingList;

use Spryker\Zed\PickingList\PickingListDependencyProvider as SprykerPickingListDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\PickingList\ProductPackagingUnitPickingListCollectionExpanderPlugin;

class PickingListDependencyProvider extends SprykerPickingListDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\PickingListExtension\Dependency\Plugin\PickingListCollectionExpanderPluginInterface>
     */
    protected function getPickingListCollectionExpanderPlugins(): array
    {
        return [
            new ProductPackagingUnitPickingListCollectionExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/PickingListsBackendApi/PickingListsBackendApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\PickingListsBackendApi;

use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiDependencyProvider as SprykerPickingListsBackendApiDependencyProvider;
use Spryker\Glue\ProductPackagingUnitsBackendApi\Plugin\PickingListsBackendApi\ProductPackagingUnitPickingListItemsBackendApiAttributesMapperPlugin;

class PickingListsBackendApiDependencyProvider extends SprykerPickingListsBackendApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\PickingListsBackendApiExtension\Dependency\Plugin\ApiPickingListItemsAttributesMapperPluginInterface>
     */
    protected function getApiPickingListItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductPackagingUnitPickingListItemsBackendApiAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Add an item with packaging units to cart and check if the following statements are true:

- A packaging unit can be found for an item.
- The `amount`, `amountSalesUnit`, `amountLeadProduct` and `ProductPackagingUnit` fields in the `ItemTransfer` properties get fully populated.
- The amount restriction works as expected.
- Availability is validated respectfully according to your lead product's and packaging unit is configuration.
- Item grouping in the cart works as expected.
- Variable amount changes affect unit prices in the `ItemTransfer` properties.
- The quantity and amount are merged correctly when the group key matches.

Go through the checkout workflow, make an order and check if the following statements are true:
- Check if the stock is modified respectfully according to your lead product's and packaging unit is configuration.
- Check if the following fields in the `spy_sales_order_item` table are saved:
  - `amount`
  - `amount_sku`
  - `amount_measurement_unit_name`
  - `amount_measurement_unit_code`
  - `amount_measurement_unit_precision`
  - `amount_measurement_unit_conversion`
  - `amount_base_measurement_unit_name`

Go to the Zed UI Sales overview, check the order, and verify the following:
- The correct sales unit is displayed.
- The correct amount is displayed per sales order item.

Make sure the following:
- Abstract products that have packaging units available don't have `add_to_cart_sku` field in the Elasticsearch document.
- Every order item from `SalesFacade::getOrderItems()` results contains packaging units data: `ItemTransfer.amountLeadProduct` and `ItemTransfer.amountSalesUnit` are set for the order items that have packaging units.
- The results of picking lists from `PickingListFacade::getPickingListCollection()` contain packaging units data: `PickingListCollectionTransfer.pickingList.pickingListItem.orderItem.amountSalesUnit` are set for the order items that have packaging units.

{% endinfo_block %}


## Install feature frontend

Follow the steps below to install the {Feature Name} feature frontend.

### Prerequisites

Install the required features:

| NAME                    | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                |
|-------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core            | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                      |
| Measurement Units       | 202507.0 | [Install the Measurement Units feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html) |
| Non-splittable Products | 202507.0 |                                                                                                                                                                                                  |

### 1) Install the required modules

```bash
composer require spryker-feature/packaging-units: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                     | EXPECTED DIRECTORY                                |
|----------------------------|---------------------------------------------------|
| ProductPackagingUnitWidget | vendor/spryker-shop/product-packaging-unit-widget |

{% endinfo_block %}

### 2) Add translations

1. Append the glossary according to your configuration:

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

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data in the database has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up widgets

1. Enable the following global widgets:

| WIDGET                     | DESCRIPTION                                                 | NAMESPACE                                          |
|----------------------------|-------------------------------------------------------------|----------------------------------------------------|
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
     * @return list<string>
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

| Functionality                                                                                                                                                                                                                                                   | Path                                                                                                                                                                                                        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Controls base unit => sales unit calculationsApplies product quantity and amount restrictions on sales unit levelOffers recommendation when invalid quantity or amount is selectedMaintains stock-based quantity, amount and sales unit information for posting | `vendor/spryker-shop/product-packaging-unit-widget/src/SprykerShop/Yves/ProductPackagingUnitWidget/Theme/default/components/molecules/packaging-unit-quantity-selector/packaging-unit-quantity-selector.ts` |


2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Check if Check if the `amount` field meets the following criteria:

- It appears on the Product Detail page for items with packaging units.
- It is displayed correctly with measurement unit information on the Cart page.
- It is displayed correctly with measurement unit information on the Checkout Summary page.
- It is displayed correctly with measurement unit information on the previous Orders page.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                           | DESCRIPTION                                                                                                        | PREREQUISITES | NAMESPACE                                                     |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| QuickOrderItemDefaultPackagingUnitExpanderPlugin | Expands `ItemTransfer` with packaging unit data if available using product the abstract ID and product concrete ID |               | SprykerShop\Yves\ProductPackagingUnitWidget\Plugin\QuickOrder |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\ProductPackagingUnitWidget\Plugin\QuickOrder\QuickOrderItemDefaultPackagingUnitExpanderPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface>
     */
    protected function getQuickOrderItemTransferExpanderPlugins(): array
    {
        return [
            new QuickOrderItemDefaultPackagingUnitExpanderPlugin(),
        ];
    }
}
```
