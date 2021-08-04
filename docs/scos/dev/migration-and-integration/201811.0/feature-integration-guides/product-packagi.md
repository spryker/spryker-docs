---
title: Product Packaging Unit Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/product-packaging-unit-feature-integration-201811
redirect_from:
  - /v1/docs/product-packaging-unit-feature-integration-201811
  - /v1/docs/en/product-packaging-unit-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Inventory Management | 2018.11.0 |
|Spryker Core|2018.11.0|
|Order Management|2018.11.0|
|Product|2018.11.0|
|Measurement Units|2018.11.0|

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:
```
composer require spryker-feature/packaging-units: "^2018.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected directory</th></tr></thead><tbody><tr><td>`ProductPackagingUnit`</td><td>`vendor/spryker/product-packaging-unit`</td></tr><tr><td>`ProductPackagingUnitDataImport`</td><td>`vendor/spryker/product-packaging-unit-data-import`</td></tr><tr><td>`ProductPackagingUnitStorage`</td><td>`vendor/spryker/product-packaging-unit-storage`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration
Adjust synchronization queue pools in configuration:

<details open>
<summary>src/Pyz/Zed/ProductPackagingUnitStorage/ProductPackagingUnitStorageConfig.php</summary>

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
<br>
</details>

### 3) Set up Database Schema and Transfer Objects

Adjust the schema definition so that entity changes can trigger events.

|Affected entity  | Triggered events |
| --- | --- |
| `spy_product_packaging_unit` | <ul><li>`Entity.spy_product_packaging_unit.create`</li><li>`Entity.spy_product_packaging_unit.update`</li><li>`Entity.spy_product_packaging_unit.delete`</li></ul> |
| `spy_product_packaging_unit_type` | <ul><li>`Entity.spy_product_packaging_unit_type.creat`</li><li>`Entity.spy_product_packaging_unit_type.update`</li><li>`Entity.spy_product_packaging_unit_type.delete`</li></ul> |
| `spy_product_packaging_unit_amount` | <ul><li>`Entity.spy_product_packaging_unit_amount.create`</li><li>`Entity.spy_product_packaging_unit_amount.update`</li><li>`Entity.spy_product_packaging_unit_amount.delete`</li></ul> |
| `spy_product_packaging_lead_product` | <ul><li>`Entity.spy_product_packaging_lead_product.create`</li><li>`Entity.spy_product_packaging_lead_product.update`</li><li>`Entity.spy_product_packaging_lead_product.delete`</li></ul> |

<details open>
<summary>src/Pyz/Zed/ProductPackagingUnit/Persistence/Propel/Schema/spy_product_packaging_unit.schema.xml</summary>

```html
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

	<table name="spy_product_packaging_unit_amount" phpName="SpyProductPackagingUnitAmount">
		<behavior name="event">
			<parameter name="spy_product_packaging_unit_amount_all" column="*"/>
		</behavior>
	</table>

	<table name="spy_product_packaging_lead_product" phpName="SpyProductPackagingLeadProduct">
		<behavior name="event">
			<parameter name="spy_product_packaging_lead_product_all" column="*"/>
		</behavior>
		</table>
</database>
```
<br>
</details>

Set up synchronization queue pools so that non-multistore entities (not store specific entities) can be synchronized among stores:
<details open>
<summary>src/Pyz/Zed/ProductPackagingUnitStorage/Persistence/Propel/Schema/spy_product_abstract_packaging_storage.schema.xml</summary>

```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				name="zed"
				xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
				namespace="Orm\Zed\ProductPackagingUnitStorage\Persistence"
				package="src.Orm.Zed.ProductPackagingUnitStorage.Persistence">

		<table name="spy_product_abstract_packaging_storage">
			<behavior name="synchronization">
				<parameter name="queue_pool" value="synchronizationPool" />
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
console transfer:generat
```
{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><th>Database entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_product_packaging_unit`</td><td>table</td><td >created</td></tr><tr><td>`spy_product_packaging_unit_type`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_packaging_unit_amount`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_packaging_lead_product`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_abstract_packaging_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_sales_order_item.amount`</td><td>column</td><td>created</td></tr><tr><td>`spy_sales_order_item.amount_sku`</td><td>column</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects have been applied:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`ProductPackagingUnitType`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductPackagingUnitTypeTransfer`</td></tr><tr><td>`ProductPackagingUnitTypeTranslation`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductPackagingUnitTypeTranslationTransfer`</td></tr><tr><td>`ProductPackagingUnit`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductPackagingUnitTransfer`</td></tr><tr><td>`ProductPackagingUnitAmount`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductPackagingUnitAmountTransfer`</td></tr><tr><td>`ProductPackagingLeadProduct`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductPackagingLeadProductTransfer`</td></tr><tr><td>`Item`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ItemTransfer`</td></tr><tr><td>`ProductConcretePackagingStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductConcretePackagingStorageTransfer`</td></tr><tr><td>`ProductAbstractPackagingStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAbstractPackagingStorageTransfer`</td></tr><tr><td>`SpyProductPackagingLeadProductEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductPackagingLeadProductEntityTransfer`</td></tr><tr><td>`SpyProductPackagingUnitAmountEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductPackagingUnitAmountEntityTransfer`</td></tr><tr><td>`SpyProductPackagingUnitEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductPackagingUnitEntityTransfer`</td></tr><tr><td>`SpyProductPackagingUnitTypeEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductPackagingUnitTypeEntityTransfer`</td></tr><tr><td>`SpyProductAbstractPackagingStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductAbstractPackagingStorageEntityTransfer`</td></tr><tr><td>`SpySalesOrderItemEntityTransfer.amount`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/SpySalesOrderItemEntityTransfer`</td></tr><tr><td>`SpySalesOrderItemEntityTransfer.amountSku`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/SpySalesOrderItemEntityTransfer`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification(Make sure that the changes have been implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:<table><thead><tr><th>Path</th><th>Method name</th></tr></thead><tbody><tr><td>`src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingLeadProduct.php`</td><td><ul><li>`prepareSaveEventName()`</li><li>`addSaveEventToMemory()`</li><li>`addDeleteEventToMemory()`</li></ul></td></tr><tr><td>`src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnit.php`</td><td><ul><li>`prepareSaveEventName()`</li><li>`addSaveEventToMemory()`</li><li>`addDeleteEventToMemory()`</li></ul></td></tr><tr><td>`src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnitAmount.php`</td><td><ul><li>`prepareSaveEventName()`</li><li>`addSaveEventToMemory()`<br /></li><li>`addDeleteEventToMemory()`</li></ul></td></tr><tr><td>`src/Orm/Zed/ProductPackagingUnit/Persistence/Base/SpyProductPackagingUnitType.php`</td><td><ul><li>`prepareSaveEventName()`<br /></li><li>`addSaveEventToMemory()`<br /></li><li>`addDeleteEventToMemory()`</li></ul></td></tr><tr><td>`src/Orm/Zed/ProductPackagingUnitStorage/Persistence/Base/SpyProductAbstractPackagingStorage.php`</td><td>`sendToQueue()`</td></tr></tbody></table>)


### 4) Add Translations
Append glossary according to your language configuration:
<details open>
<summary>src/data/import/glossary.csv</summary>

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
```
<br>
</details>

@(Info" %}
Info
{% endinfo_block %}(All packaging unit type needs to have glossary entities for the configured locales)
Infrastructural record's glossary keys:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
packaging_unit_type.item.name,Item,en_US
packaging_unit_type.item.name,Stück,de_DE
```
<br>
</details>

Demo data glossary keys:
<details open>
<summary>src/data/import/glossary.csv</summary>

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
packaging_unit_type.pack_mixed.name,Gemischte Schraubenkästen,de_D
```
<br>
</details>

Run the following console command to import data:
```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that  the configured data in the database has been added to the `spy_glossary` table.
{% endinfo_block %}

### 5) Configure Export to Redis
This step will publish tables on change (create, edit, delete) to `spy_product_abstract_packaging_storage` and synchronise the data to Storage.

#### Set up Event Listeners

|Plugin  |Specification  | Prerequisites |  Namespace|
| --- | --- | --- | --- |
| `ProductPackagingUnitStorageEventSubscriber` | Registers listeners that are responsible for publishing product abstract packaging unit storage entity changes when a related entity change event occurs. | None | `Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Event\Subscriber` |

<details open>
<summary>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>

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
<br>
</details>

#### Set up Re-Generate and Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductPackagingUnitSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None | `Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization` |

<details open>
<summary>src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization\ProductPackagingUnitSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	 */
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new ProductPackagingUnitSynchronizationDataPlugin(),
		];
	}
}
```
<br>
</details>

### 6)  Import Data

#### Add Infrastructural Data

| Plugin |Specification  | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductPackagingUnitTypeInstallerPlugin` | Installs the configured infrastructural packaging unit types. |None  | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Installer` |

<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to execute registered installer plugins and install infrastructural data:
```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}
Make sure that  the configured infrastructural packaging unit types of the database are added to the `spy_product_packaging_unit_type` table.
{% endinfo_block %}

#### Import Product Packaging Unit Types

Prepare your data according to your requirements using our demo data:
<details open>
<summary>vendor/spryker/spryker/Bundles/ProductPackagingUnitDataImport/data/import/product_packaging_unit_type.csv</summary>

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
<br>
</details>

| Column |Is obligatory?  |Data type  |Data example  | Data explanation |
| --- | --- | --- | --- | --- |
| `name` | mandatory |string  | `packaging_unit_type.ring_500.name` | Glossary key that will be used for display. Each name needs a glossary key definition for all configured locales. |

Register the following plugin to enable data import:

|Plugin  | Specification | Prerequisites |Namespace  |
| --- | --- | --- | --- |
| `ProductPackagingUnitTypeDataImportPlugin` | Imports packaging unit type data into the database. | None | `Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to import data:
```bash
console data:import product-packaging-unit-type
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data has been added to the `spy_product_packaging_unit_type` table.
{% endinfo_block %}

#### Import Product Packaging Units

Prepare your data according to your requirements using our demo data:
<details open>
<summary>vendor/spryker/spryker/Bundles/ProductPackagingUnitDataImport/data/import/product_packaging_unit.csv</summary>

```yaml
concrete_sku,is_lead_product,has_lead_product,packaging_unit_type_name,default_amount,is_variable,amount_min,amount_max,amount_interval
218_123,1,,packaging_unit_type.item.name,,,,,
217_123,1,,packaging_unit_type.item.name,,,,,
218_1233,0,0,packaging_unit_type.pack_mixed.name,5,1,3,5,2
218_1234,0,1,packaging_unit_type.box.name,100,1,100,1000,10
218_1230,0,1,packaging_unit_type.pack_20.name,20,0,0,0,0
218_1231,0,1,packaging_unit_type.pack_100.name,100,0,0,0,0
218_1232,0,1,packaging_unit_type.pack_500.name,500,0,0,0,0
217_1231,0,0,packaging_unit_type.ring_500.name,1,0,,,
215_123,1,,packaging_unit_type.item.name,,,,,
215_124,0,0,packaging_unit_type.ring_500.name,1,0,,,
216_123,1,,packaging_unit_type.item.name,,,,,
```
<br>
</details>

| Column |Is obligatory?  | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `concrete_sku` | mandatory | string |218_123  | Glossary key that will be used for display. Each name needs glossary key definition for all configured locales. |
|`is_lead_product`|mandatory|bool <br>integer|1|<ul><li>Decides if the current `concrete_sku` is the lead concrete product of the product abstract.</li><li>Important: Exactly 1 concrete product has to be a lead product in a packaging unit-based product abstract.</li></ul>|
|`has_lead_product`|optional|bool <br>integer|0|<ul><li>Relevant for non-lead product concretes only.</li><li>Decides if the current product concrete has "amount" options. (The amount represents the lead product.)</li><li>Default value is 0 when not provided.</li></ul>|
|`packaging_unit_type_name`|mandatory|string|`packaging_unit_type.ring_500.name`|Type name of the current concrete product.|
|`default_amount`|optional|positive integer|5|<ul><li></li><li></li><li></li></ul>|
|`is_variable`|optional|bool <br>integer|1|<ul><li>Allows customers to override the default_amount and decide how many lead products will be ordered for each quantity of this product concrete.</li><li>Effective only if current product concrete has_lead_product = 1.</li><li>Default value is 0 when not provided.</li></ul>|
|`amount_min`|optional|positive integer|3|<ul><li>Restricts a customer to buy at least this amount of lead products.</li><li>Effective only if is_variable = 1.</li><li>Default value is 1 when not provided.</li></ul>|
|`amount_max`|optional|positive integer|5|<ul><li>Restricts a customer not to not buy more than this value.</li><li>Effective only if is_variable = 1.</li><li>Default value remains empty (unlimited) when not provided.</li></ul>|
|`amount_interval`|optional|positive integer|2|<ul><li>Restricts customers to buy an amount that fits into the interval beginning with amount_min.</li><li>Effective only if is_variable = 1.</li><li>Default value is amount_min when not provided.</li></ul><p>Min = 3; Max = 10; Interval = 2<br>Choosable: 3, 5, 7, 9</p>|

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductPackagingUnitDataImportPlugin` | Imports packaging unit type data into the database. | <ul><li>Requires related product concretes and product abstract to be present in the database already.</li><li>Requires related packaging unit types to be present in the database already.</li></ul> | `Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitDataImportPlugin;

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
<br>
</details>

Run the following console command to import data:
```
console data:import product-packaging-unit
```
{% info_block warningBox "Verification" %}
Make sure that the configured data in the database has been added to the `spy_product_packaging_unit`, `spy_product_packaging_unit_amount`, and `spy_product_packaging_lead_product` tables.
{% endinfo_block %}

### 7) Set up Behavior
#### Setup Checkout Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AmountAvailabilityCartPreCheckPlugin` | Validates if the given amount is available according to stock configuration during the cart change. | Expects the amount field to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `AmountGroupKeyItemExpanderPlugin` | Expands a group key with the amount and its sales unit to granulate the item grouping in the cart for packaging unit items. | Expects the amount and `amountSalesUnit` fields to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `AmountRestrictionCartPreCheckPlugin` | Validates the amount restrictions when Item has restrictions. | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfer` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `AmountSalesUnitItemExpanderPlugin` | Sets the amountSalesUnit field for `ItemTransfers` with packaging units. | Expects the amount and `amountSalesUnit.IdProductMeasurementSalesUnit` to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `AmountSalesUnitValuePostSavePlugin` | Sets normalised amount sales unit value field. | Expects the `amount` and `amountSalesUnit` fields to be set in `ItemTransfer` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `CustomAmountPriceItemExpanderPlugin` | Updates unit prices for variable amounted packaging units. | Expects the `amount` and `productPackagingUnit` fields to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `ProductPackagingUnitCartAddItemStrategyPlugin` | Merges `quantity` and `amount` field changes into the cart for `ItemTransfers` with packaging units on the cart add action. | Expects the `amount` field to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `ProductPackagingUnitCartRemoveItemStrategyPlugin` | Merges the `quantity` and `amount` field changes into the cart for `ItemTransfers` with packaging units on the cart removal action. | Expects the amount field to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `ProductPackagingUnitItemExpanderPlugin` | Sets the `amountLeadProduct` and `productPackagingUnit` fields in `ItemTransfer`. | Expects the amount field to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart` |
| `AmountAvailabilityCheckoutPreConditionPlugin` | Validates if the given amount is available according to stock configuration during checkout. | Expects the `amount` and `amountLeadProduct` fields to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout` |
| `ProductPackagingUnitCartAddItemStrategyPlugin` | Merges the quantity and amount field changes into the cart for ItemTransfers with packaging units on the persistent cart add action. | Expects the `amount` field to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\PersistentCart` |
| `LeadProductReservationHandlerPlugin` | Updates availability and reservation of lead product for a given product packaging unit for reservation handler. | None | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Reservation` |
| `AmountLeadProductHydrateOrderPlugin` | Hydrates the leadProduct field for Order read. | Expects the `items`, `amount` and `amountSku` fields to be set in Order. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales` |
| `AmountSalesUnitHydrateOrderPlugin` | Hydrates the `amountSalesUnit` field for Order read. | Expects the items field to be set in Order. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales` |
| `AmountSalesUnitOrderItemExpanderPreSavePlugin` | Sets the amount measurement related fields in the Order item for saving. | Expects the `amountSalesUnit` field to be set in `ItemTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension` |
| `ProductPackagingUnitOrderItemExpanderPreSavePlugin` | Sets the amount and `amountSku` fields in the Order item for saving. | Expects `amountLeadProduct` to be set in `mTransfers` with packaging units. | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension` |
| `LeadProductStockUpdateHandlerPlugin` | Updates availability and reservation of lead product for a given product packaging unit for stock update handler. | None | `Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Stock` |
| `ProductPackagingUnitAmountCartChangeRequestExpanderPlugin` | Sets the amount and `amountSalesUnit.IdProductMeasurementSalesUnit` fields in `ItemTransfers` with packaging units for cart change. | Expects a request to contain the to-be-used information. | `Spryker\Client\ProductPackagingUnit\Plugin\CartExtension` |
| `ProductPackagingUnitAmountPersistentCartChangeExpanderPlugin` | Sets the `amount` and `amountSalesUnit.IdProductMeasurementSalesUnit` fields in `ItemTransfers` with packaging units for persistent cart change. | Expects a request to contain the to-be-used information. | `Spryker\Client\ProductPackagingUnit\Plugin\PersistentCartExtension` |

<details open>
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
	 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
	 */
	protected function getExpanderPlugins(Container $container)
	{
		return [
			new AmountGroupKeyItemExpanderPlugin(),
			new AmountSalesUnitItemExpanderPlugin(),
			new ProductPackagingUnitItemExpanderPlugin(),
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
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
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
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountLeadProductHydrateOrderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountSalesUnitHydrateOrderPlugin;
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
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Stock/StockDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Client/Cart/CartDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Client/Cart/CartDependencyProvider.php</summary>
src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php</

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
<br>
</details>

{% info_block warningBox "Verification" %}
Add an item with packaging units to the cart.<ul><li>Check if the `amount`, `amountSalesUnit`, `amountLeadProduct` and `productPackagingUnit` fields in `ItemTransfer` get fully populated.</li><li>Check if amount restriction works as expected.</li><li>Check if availability is validated respectfully according to your lead product's and packaging unit's configuration.</li><li>Check if item grouping in the cart works as expected.</li><li>Check if variable amount changes affect unit prices in `ItemTransfer`.</li><li>Check if quantity and amount are merged correctly when a group key matches.</li></ul>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Go through the checkout workflow and make an order.<ul><li>Check if the stock is modified respectfully according to your lead product's and packaging unit's configuration.</li><li>Check if the following fields in the `spy_sales_order_item` table are saved:<ul><li>`amount`</li><li>`amount_sku`</li><li>`amount_measurement_unit_name`</li><li>`amount_measurement_unit_code`</li><li>`amount_measurement_unit_precision`</li><li>`amount_measurement_unit_conversion`</li><li>`amount_base_measurement_unit_name`</li></ul></li></ul>
{% endinfo_block %}


{% info_block warningBox "Warning" %}
Go to the Zed UI Sales overview and check the order.<ul><li>Verify if the correct sales unit is displayed.</li><li>Verify if the correct amount is displayed per sales order item.</li></ul>
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core E-commerc | 2018.11.0 |
| Measurement Units | 2018.11.0 |
| Non-splittable Products | 2018.11.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:
```
composer require spryker-feature/packaging-units: "^2018.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected directory</th></tr></thead><tbody><tr><td>`ProductPackagingUnitWidget`</td><td>`vendor/spryker-shop/product-packaging-unit-widget`</td></tr></tbody></table>
{% endinfo_block %}


### 2) Add Translations

Append glossary according to your configuration:
<details open>
<summary>src/data/import/glossary.csv</summary>

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
<br>
</details>

Run the following console command to import data:
```
console data:import glossary
```
{% info_block warningBox "Verification" %}
Make sure that the configured data in the database has been added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Widgets
Enable the following global widget(s):

| Widget | Description | Namespace |
| --- | --- | --- |
| `ProductPackagingUnitWidget` | Displays product packaging options for quantity and amount. | `SprykerShop\Yves\ProductPackagingUnitWidget\Widget` |

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
<br>
</details>

`ProductPackagingUnitWidget` uses Javascript for some functionality:

| Functionality | Path |
| --- | --- |
| <ul><li>Controls base unit => sales unit calculations</li><li>Applies product quantity and amount restrictions on sales unit level</li><li>Offers recommendation when invalid quantity or amount is selected</li><li>Maintains stock-based quantity, amount and sales unit information for posting</li></ul> | `vendor/spryker-shop/product-packaging-unit-widget/src/SprykerShop/Yves/ProductPackagingUnitWidget/Theme/default/components/molecules/packaging-unit-quantity-selector/packaging-unit-quantity-selector.ts` |

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}
<ul><li>Check if the amount field appears on the Product Detail page for items with packaging units.</li><li>Check if the amount field appears correctly with measurement unit information on the Cart page.</li><li>Check if the amount field appears correctly with measurement unit information on the Checkout Summary page.</li><li>Check if the amount field appears correctly with measurement unit information on the previous Orders page.</li></ul>
{% endinfo_block %}
