---
title: Merchant Custom Prices Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/merchant-custom-prices-feature-integration-201811
redirect_from:
  - /v1/docs/merchant-custom-prices-feature-integration-201811
  - /v1/docs/en/merchant-custom-prices-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core  | 2018.11.0 |
|Merchant  |  2018.11.0|
|Merchant Contracts  | 2018.11.0 |
| Prices | 2018.11.0 |
| Product |2018.11.0  |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker-feature/merchant-custom-prices:"^2018.11.0" spryker/price-product-merchant-relationship-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected directory</th></tr></thead><tbody><tr><td>`PriceProductMerchantRelationship`</td><td>`vendor/spryker/price-product-merchant-relationship`</td></tr><tr><td>`PriceProductMerchantRelationshipDataImport`</td><td>`vendor/spryker/price-product-merchant-relationship-data-import`</td></tr><tr><td>`PriceProductMerchantRelationshipGui`</td><td>`vendor/spryker/price-product-merchant-relationship-gui`</td></tr><tr><td>`PriceProductMerchantRelationshipStorage`</td><td>`vendor/spryker/price-product-merchant-relationship-storage`</td></tr></tbody></table>
{% endinfo_block %}


### 2) Set up Database Schema

Adjust the schema definition so that entity changes can trigger events:

| Affected entity | Triggered events |
| --- | --- |
| `spy_price_product_merchant_relationship` | `Entity.spy_price_product_merchant_relationship.create` `Entity.spy_price_product_merchant_relationship.update` `Entity.spy_price_product_merchant_relationship.delete`  |

<details open>
<summary>src/Pyz/Zed/PriceProductMerchantRelationship/Persistence/Propel/Schema/spy_price_product_merchant_relationship.schema.xml</summary>
    
```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		name="zed"
		xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
		namespace="Orm\Zed\PriceProductMerchantRelationship\Persistence"
		package="src.Orm.Zed.PriceProductMerchantRelationship.Persistence">

	<table name="spy_price_product_merchant_relationship">
		<behavior name="event">
			<parameter name="spy_price_product_merchant_relationship_all" column="*"/>
        </behavior>
    </table>

    </database>
```
<br>
</details>

Run the following commands:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects have been applied:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`PriceProductMerchantRelationshipStorageTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PriceProductMerchantRelationshipStorageTransfer.php`</td></tr><tr><td>`PriceProductDimensionTransfer.idMerchantRelationship`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/PriceProductDimensionTransfer.php`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_price_product_merchant_relationship`</td><td>table</td><td>created</td></tr><tr><td>`spy_price_product_concrete_merchant_relationship_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_price_product_abstract_merchant_relationship_storage`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and check that the above events have been triggered as well:<table><thead><tr><th>Class path</th><th>Method name</th></tr></thead><tbody><tr><td>`src/Orm/Zed/PriceProductMerchantRelationship/Persistence/Base/SpyPriceProductMerchantRelationship.php`</td><td>`prepareSaveEventName(
{% endinfo_block %}`<br />`addSaveEventToMemory()`<br />`addDeleteEventToMemory()`</td></tr></tbody></table>)

### 3) Configure Export to Redis
With this step you will be able to publish prices on change (create, edit, delete) to `spy_price_product_abstract_merchant_relationship_storage`, `spy_price_product_concrete_merchant_relationship_storage` and synchronize the data to Storage.	

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PriceProductMerchantRelationshipStorageEventSubscriber` | Registers listeners that are responsible to publish merchant prices to storage when a related entity changes. | None |`Spryker\Zed\ProductListStorage\Communication\Plugin\Event\Subscriber` |

<details open>
<summary>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Event\Subscriber\PriceProductMerchantRelationshipStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
	public function getEventSubscriberCollection()
		{
			$eventSubscriberCollection = parent::getEventSubscriberCollection();
			$eventSubscriberCollection-&gt;add(new PriceProductMerchantRelationshipStorageEventSubscriber());

			return $eventSubscriberCollection;
		}
}
```
<br>
</details>


{% info_block warningBox "Verification" %}
Make sure when prices are exported, created, updated, or deleted manually in Zed UI, they are exported (or removed
{% endinfo_block %} to Redis accordingly.<table><thead><tr><th>Storage type</th><th>Target entity</th><th>Example expected data fragment</th></tr></thead><tbody><tr><td>Redis</td><td>Product Abstract Price</td><td>`kv:price_product_concrete_merchant_relationship:de:1:1`</td><td></td></tr><tr><td>Redis</td><td>Product Concrete Price</td><td>`kv:price_product_abstract_merchant_relationship:de:1:1`</td><td></td></tr></tbody></table>)

<details open>
<summary>Example expected data fragment: Product Abstract Price</summary>

```php
{
	"prices": {
		"2": {
			"EUR": {
				"priceData": null,
				"GROSS_MODE": {
					"DEFAULT": 9922
				},
				"NET_MODE": {
					"DEFAULT": 8922
				}
			},
			"CHF": {
				"priceData": null,
				"GROSS_MODE": {
						"DEFAULT": 11422
				},
				"NET_MODE": {
					"DEFAULT": 10322
				}
			}
		}
	}
}
```
<br>
</details>

<details open>
<summary>Example expected data fragment: Product Concrete Price</summary>

```php
{
"prices": {
		"2": {
			"EUR": {
				"priceData": null,
				"GROSS_MODE": {
					"DEFAULT": 12322
				},
				"NET_MODE": {
					"DEFAULT": 11222
				}
			},
			"CHF": {
				"priceData": null,
				"GROSS_MODE": {
					"DEFAULT": 10122
				},
				"NET_MODE": {
					"DEFAULT": 12522
				}
			}
		}
	}
}
```
<br>
</details>

Add synchronization plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PriceProductAbstractMerchantRelationSynchronizationDataPlugin` | Can be executed to synchronize all price_product_abstract_merchant_relationship entries from the database to Redis. | None |`Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization` |
|`PriceProductConcreteMerchantRelationSynchronizationDataPlugin`  | Can be executed to synchronize all `price_product_concrete_merchant_relationship` entries from the database to Redis. | None | `Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization` |

<details open>
    <summary>src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php</summary>
 
```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization\PriceProductAbstractMerchantRelationSynchronizationDataPlugin;
use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization\PriceProductConcreteMerchantRelationSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	 */
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new PriceProductAbstractMerchantRelationSynchronizationDataPlugin(),
			new PriceProductConcreteMerchantRelationSynchronizationDataPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Verify if "console sync:data --help" has `price_product_abstract_merchant_relationship` and `price_product_concrete_merchant_relationship` as an available resource in the list.
{% endinfo_block %}

### 4) Import data
#### Import Price Product Merchant Relationships
Prepare your prices data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/price-product-merchant-relationship-data-import/data/import/price_product_merchant_relationship.csv</summary>

```yaml
merchant_relation_key,abstract_sku,concrete_sku,price_type,store,currency,price_net,price_gross
	mr-002,205,,DEFAULT,DE,EUR,9022,10022
	mr-002,205,,DEFAULT,DE,CHF,11022,12522
	mr-002,001,,DEFAULT,DE,EUR,8922,9922
	mr-002,001,,DEFAULT,DE,CHF,10322,11422
	mr-002,,001_25904006,DEFAULT,DE,EUR,11222,12322
	mr-002,,001_25904006,DEFAULT,DE,CHF,12522,10122
	mr-002,051,,DEFAULT,DE,EUR,11022,12322
	mr-002,,051_29567823,DEFAULT,DE,EUR,10822,12022
	mr-002,,051_30107816,DEFAULT,DE,EUR,11222,12222
	mr-002,051,,DEFAULT,DE,CHF,12022,14022
	mr-002,,051_29567823,DEFAULT,DE,CHF,12422,13822
	mr-002,,051_30107816,DEFAULT,DE,CHF,12522,10322
	mr-003,205,,DEFAULT,DE,EUR,9033,10033
	mr-003,205,,DEFAULT,DE,CHF,11533,13033
	mr-003,001,,DEFAULT,DE,EUR,8933,9933
	mr-003,001,,DEFAULT,DE,CHF,10333,11433
	mr-003,,001_25904006,DEFAULT,DE,EUR,11233,12333
	mr-003,,001_25904006,DEFAULT,DE,CHF,12533,10133
	mr-003,051,,DEFAULT,DE,EUR,11033,12333
	mr-003,,051_29567823,DEFAULT,DE,EUR,10833,12033
	mr-003,,051_30107816,DEFAULT,DE,EUR,11233,12233
	mr-003,051,,DEFAULT,DE,CHF,12033,14033
	mr-003,,051_29567823,DEFAULT,DE,CHF,12433,13833
	mr-003,,051_30107816,DEFAULT,DE,CHF,12533,10333
```
<br>
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `merchant_relation_key` | mandatory | string | mr-001 | Unique identifier used to identify a merchant contract. |
| `abstract_sku` | mandatory (optional if `concrete_sku` provided) | string (unique) | 051 | Existing abstract product SKU to assign to the product list. |
| `concrete_sku` | mandatory (optional if abstract_sku provided) | string (unique) | 051_29567823 | Existing concrete product SKU to assign to the product list. |
| `price_type` | mandatory | string | DEFAULT | Name of the price type. By default it's 'DEFAULT', but could be project specific (strike, sale, ...). |
| `store` | mandatory | string | DE | Store name. |
| `currency` | mandatory | string | EUR | Currency ISO code. |
| `price_net` | optional | number | 100 | Net price in cents. |
| `price_gross` | optional | number | 120 | Gross price in cents. |

Register the following plugin to enable data import:

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\PriceProductMerchantRelationshipDataImport\Communication\Plugin\PriceProductMerchantRelationshipDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	 * @return array
	 */
	protected function getDataImporterPlugins(): array
	{
		return [
			//...
			new PriceProductMerchantRelationshipDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to import data:
```bash
console data:import product-price-merchant-relationship
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data is added to the `spy_price_product_merchant_relationship` table.
{% endinfo_block %}

### 5) Set up Behavior
#### Set up Merchant Relationship Related Price Handling
Enable the following behaviors by registering the plugins:
		

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MerchantRelationshipPriceQueryCriteriaPlugin` | Extends `PriceProduct`  select prices SQL query for selecting prices from merchant relationship dimension if they are requested in `PriceProductCriteriaTransfer→priceDimension` or `PriceProductFilterTransfer→priceDimension` equals `PriceProductMerchantRelationshipConfig::PRICE_DIMENSION_MERCHANT_RELATIONSHIP` or `PriceProductFilterTransfer→priceDimension→idMerchantRelationship` is provided. |None  | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct`|
| `MerchantRelationshipPriceDimensionAbstractWriterPlugin` | Enables saving product abstract prices to the `spy_price_product_merchant_relationship` table. | Expects `PriceProductTransfer.priceDemnsion.idMerchantRelationshop`, otherwise skips element. | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceDimensionConcreteWriterPlugin` | Enables saving product concrete prices to the `spy_price_product_merchant_relationship` table. | Expects `PriceProductTransfer.priceDemnsion.idMerchantRelationshop`, otherwise skips element. | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceProductDimensionExpanderStrategyPlugin` | Sets `PriceProductTransfer.PriceDimension.idMerchantRelationship` and `PriceProductTransfer.PriceDimension.name`. | None | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceProductFilterPlugin` | Selects min prices from the MR prices available for the current customer (company business can be assigned for multiple MRs). | None | `Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProductExtension` |
| `PriceProductMerchantRelationshipStorageDimensionPlugin` |Adds MR prices to the list of available prices for the current customer when they are read from Redis.  | None |  `Spryker\Client\PriceProductMerchantRelationshipStorage\Plugin\PriceProductStorageExtension`|
| `MerchantRelationshipProductAbstractFormExpanderPlugin` | Adds select control to PIM (abstract products) where an admin can choose Merchant Relationship on the Prices tab to manage prices for a concrete Merchant Relationship. | None | `Spryker\Zed\PriceProductMerchantRelationshipGui\Communication\Plugin\ProductManagement` |
| `MerchantRelationshipProductConcreteFormExpanderPlugin` | Adds select control to PIM (product variants) where an admin can choose Merchant Relationship on the Prices tab to manage prices for a concrete Merchant Relationship. | None | `Spryker\Zed\PriceProductMerchantRelationshipGui\Communication\Plugin\ProductManagement` |

<details open>
<summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\PriceProductMerchantRelationshipGui\Communication\Plugin\ProductManagement\MerchantRelationshipProductAbstractFormExpanderPlugin;
use Spryker\Zed\PriceProductMerchantRelationshipGui\Communication\Plugin\ProductManagement\MerchantRelationshipProductConcreteFormExpanderPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
	/**
	 * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface[]
	 */
	protected function getProductAbstractFormExpanderPlugins(): array
	{
		return [
			new MerchantRelationshipProductAbstractFormExpanderPlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormExpanderPluginInterface[]
	 */
	protected function getProductConcreteFormExpanderPlugins(): array
	{
		return [
			new MerchantRelationshipProductConcreteFormExpanderPlugin(),
		];
	}
}
```
<br>
</details>


<details open>
<summary>src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceDimensionAbstractWriterPlugin;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceDimensionConcreteWriterPlugin;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceProductDimensionExpanderStrategyPlugin;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceQueryCriteriaPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
	/**
	 * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionQueryCriteriaPluginInterface[]
	 */
	protected function getPriceDimensionQueryCriteriaPlugins(): array
	{
		return array_merge(parent::getPriceDimensionQueryCriteriaPlugins(), [
			new MerchantRelationshipPriceQueryCriteriaPlugin(),
		]);
	}

	/**
	 * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionAbstractSaverPluginInterface[]
	 */
	protected function getPriceDimensionAbstractSaverPlugins(): array
	{
		return [
			new MerchantRelationshipPriceDimensionAbstractWriterPlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionConcreteSaverPluginInterface[]
	 */
	protected function getPriceDimensionConcreteSaverPlugins(): array
	{
		return [
			new MerchantRelationshipPriceDimensionConcreteWriterPlugin(),
		];
	}

	/**
	 * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductDimensionExpanderStrategyPluginInterface[]
	 */
	protected function getPriceProductDimensionExpanderStrategyPlugins(): array
	{
		return [
			new MerchantRelationshipPriceProductDimensionExpanderStrategyPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Service\PriceProduct;

use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProductExtension\MerchantRelationshipPriceProductFilterPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
	/**
	 * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface[]
	 */
	protected function getPriceProductDecisionPlugins(): array
	{
		return [
			new MerchantRelationshipPriceProductFilterPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductMerchantRelationshipStorage\Plugin\PriceProductStorageExtension\PriceProductMerchantRelationshipStorageDimensionPlugin;
use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
	/**
	 * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface[]
	 */
	public function getPriceDimensionStorageReaderPlugins(): array
	{
		return [
			new PriceProductMerchantRelationshipStorageDimensionPlugin(),
		];
	}
}
```
<br>
</details>

****
{% info_block warningBox "Verification" %}
Make sure that there is the **Merchant Price Dimension** drop-down in Zed UI on the Product Abstract and Concrete (variants
{% endinfo_block %} edit page (on the Price &amp; Tax tab). When you select some MR, the current page should be reloaded and prices table should display prices from the selected MR if they exist or an empty table is they do not exist. <br /><br />Make sure that when you added/changed prices for some MR, they appear after sending the submit form and reloading the page. <br /><br />Make sure that Redis keys are updated/created for this product and business units are assigned to the selected MR.)

{% info_block warningBox "Verification" %}
Make sure that a logged in user, who belongs to a company business unit and that business unit is assigned to some MR with specified prices, sees MR prices on the Catalog and on Product page. <br /><br />Make sure that this user sees MIN price if their business unit is assigned to multiple MRs with different prices for the same product.
{% endinfo_block %}
