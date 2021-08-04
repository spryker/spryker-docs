---
title: Merchant Custom Prices Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/merchant-custom-prices-feature-integration
redirect_from:
  - /v4/docs/merchant-custom-prices-feature-integration
  - /v4/docs/en/merchant-custom-prices-feature-integration
---

## Install Feature Core
### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |
| Merchant | 201907.0 |
| Merchant Contracts | 201907.0 |
| Prices | 201907.0 |
| Product | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker-feature/merchant-custom-prices:"^201907.0" spryker/price-product-merchant-relationship-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><col  /><col  /><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`PriceProductMerchantRelationship`</td><td>`vendor/spryker/price-product-merchant-relationship`</td></tr><tr><td>`PriceProductMerchantRelationshipDataImport`</td><td>`vendor/spryker/price-product-merchant-relationship-data-import`</td></tr><tr><td>`PriceProductMerchantRelationshipGui`</td><td>`vendor/spryker/price-product-merchant-relationship-gui`</td></tr><tr><td>`PriceProductMerchantRelationshipStorage`</td><td>`vendor/spryker/price-product-merchant-relationship-storage`</td></tr></tbody></table>
{% endinfo_block %}
 
### 2) Set up Database Schema
Adjust the schema definition so that entity changes can trigger events:

| Affected Entity | Triggered Events |
| --- | --- |
| `spy_price_product_merchant_relationship` | `Entity.spy_price_product_merchant_relationship.create`</br>`Entity.spy_price_product_merchant_relationship.update`</br>`Entity.spy_price_product_merchant_relationship.delete` |

src/Pyz/Zed/PriceProductMerchantRelationship/Persistence/Propel/Schema/spy_price_product_merchant_relationship.schema.xml
    
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
Make sure that the following changes have been applied by checking your database.<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_price_product_merchant_relationship`</td><td>table</td><td>created</td></tr><tr><td>`spy_price_product_concrete_merchant_relationship_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_price_product_abstract_merchant_relationship_storage`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and check that the above events have been triggered as well:<table><thead><tr><th>Class Path</th><th>Method Name</th></tr></thead><tbody><tr><td>`src/Orm/Zed/PriceProductMerchantRelationship/Persistence/Base/SpyPriceProductMerchantRelationship.php`</td><td>`prepareSaveEventName(
{% endinfo_block %}`</br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr></tbody></table>)

### 3) Configure Export to Redis
{% info_block infoBox %}
With this step, you will be able to publish prices on change (create, edit, delete
{% endinfo_block %} to `spy_price_product_abstract_merchant_relationship_storage`, `spy_price_product_concrete_merchant_relationship_storage` and synchronize the data to Storage.)

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PriceProductMerchantRelationshipStorageEventSubscriber` | Registers listeners that are responsible for publishing merchant prices to storage when a related entity changes. | None | `Spryker\Zed\ProductListStorage\Communication\Plugin\Event\Subscriber` |

src/Pyz/Zed/Event/EventDependencyProvider.php
    
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
			$eventSubscriberCollection->add(new PriceProductMerchantRelationshipStorageEventSubscriber());

			return $eventSubscriberCollection;
		}
}
```

{% info_block warningBox "Verification" %}
Make sure when prices are exported, created, updated, or deleted manually in Zed UI, they are exported (or removed
{% endinfo_block %} to Redis accordingly.<table><thead><tr><th>Storage Type</th><th>Target Entity</th><th>Example Expected Data Identifier</th></tr></thead><tbody><tr><td>Redis</td><td>Product Abstract Price</td><td>`kv:price_product_abstract_merchant_relationship:de:1:1`</td></tr><tr class="TableStyle-PatternedRows2-Body-DarkerRows"><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows">Redis</td><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows">Product Concrete Price</td><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows">`kv:price_product_concrete_merchant_relationship:de:1:1`</td></tr></tbody></table>)

**Example Expected Data Fragment: Product Abstract Price**

```yaml
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

**Example Expected Data Fragment: Product Concrete Price**

```yaml
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

#### Add Synchronization Plugins

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PriceProductAbstractMerchantRelationSynchronizationDataPlugin` | Can be executed to synchronize all `price_product_abstract_merchant_relationship` entries from the database to Redis. | None | `Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization` |
| `PriceProductConcreteMerchantRelationSynchronizationDataPlugin` | Can be executed to synchronize all `price_product_concrete_merchant_relationship` entries from the database to Redis. | None | `Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization` |

src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php

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

{% info_block warningBox "Verification" %}
Verify if `console sync:data --help` has `price_product_abstract_merchant_relationship` and `price_product_concrete_merchant_relationship` as an available resource in the list.
{% endinfo_block %}

### 4) Import Data
#### Import Price Product Merchant Relationships
Prepare your prices data according to your requirements using our demo data:
		
vendor/spryker/price-product-merchant-relationship-data-import/data/import/price_product_merchant_relationship.csv

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

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|`merchant_relation_key` | mandatory | string | mr-001 | Unique identifier used to identify a merchant contract. |
| `abstract_sku` | mandatory (optional if `concrete_sku` provided) | string(unique) | 051 | Existing abstract product SKU to assign to the product list. |
| `concrete_sku` | mandatory (optional if `abstract_sku` provided) | string(unique) | 051_29567823 | Existing concrete product SKU to assign to the product list. |
| `price_type` | mandatory | string | DEFAULT | Name of the price type. By default it's 'DEFAULT', but could be project specific (strike, sale, ...). |
| `store` | mandatory | string | DE | Store name. |
| `currency` | mandatory | string | EUR | Currency ISO code. |
| `price_net` | optional | number | 100 | Net price in cents. |
| `price_gross` | optional | number | 120 | Gross price in cents. |

Register the following plugin to enable data import:

src/Pyz/Zed/DataImport/DataImportDependencyProvider.php

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
			new PriceProductMerchantRelationshipDataImportPlugin(),
		];
	}
}
```

Run the following console command to import data:

```bash
Run the following console command to import data:
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data is added to the `spy_price_product_merchant_relationship` table.
{% endinfo_block %}

### 5) Set up Behavior
#### Set up Merchant Relationship Related Price Handling

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MerchantRelationshipPriceQueryCriteriaPlugin` | Extends `PriceProduct` select prices SQL query for selecting prices from merchant relationship dimension if they are requested in `PriceProductCriteriaTransfer`→`priceDimension` or `PriceProductFilterTransfer`→`priceDimension` equals `PriceProductMerchantRelationshipConfig::PRICE_DIMENSION_MERCHANT_RELATIONSHIP` or `PriceProductFilterTransfer`→`priceDimension`→`idMerchantRelationship` is provided. | None | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceDimensionAbstractWriterPlugin` | Enables saving product abstract prices to the `spy_price_product_merchant_relationship` table. | Expects `PriceProductTransfer.priceDemnsion.idMerchantRelationshop`, otherwise skips element. | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceDimensionConcreteWriterPlugin` | Enables saving product concrete prices to the `spy_price_product_merchant_relationship` table. | Expects `PriceProductTransfer.priceDemnsion.idMerchantRelationshop`, otherwise skips element. | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceProductDimensionExpanderStrategyPlugin` | Sets `PriceProductTransfer.PriceDimension.idMerchantRelationship` and `PriceProductTransfer.PriceDimension.name`. | None | `Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct` |
| `MerchantRelationshipPriceProductFilterPlugin` | Selects min prices from the MR prices available for the current customer (company business can be assigned for multiple MRs). | None |  `Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProductExtension` |
| `PriceProductMerchantRelationshipStorageDimensionPlugin` | Adds MR prices to the list of available prices for the current customer when they are read from Redis. | None | `Spryker\Client\PriceProductMerchantRelationshipStorage\Plugin\PriceProductStorageExtension` |
| `MerchantRelationshipProductAbstractFormExpanderPlugin` | Adds select control to PIM (abstract products) where an admin can choose Merchant Relationship on the Prices tab to manage prices for a concrete Merchant Relationship. | None | `Spryker\Zed\PriceProductMerchantRelationshipGui\Communication\Plugin\ProductManagement` |
| `MerchantRelationshipProductConcreteFormExpanderPlugin` | Adds select control to PIM (product variants) where an admin can choose Merchant Relationship on the Prices tab to manage prices for a concrete Merchant Relationship. | None | `Spryker\Zed\PriceProductMerchantRelationshipGui\Communication\Plugin\ProductManagement` |

src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php

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

src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php

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

src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php

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

src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php

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

{% info_block warningBox "Verification" %}
Make sure that there is the "Merchant Price Dimension" drop-down in the Back Office on the Product Abstract and Concrete (variants
{% endinfo_block %} edit page (on the Price &amp; Tax tab). When you select some Merchant Relationship, the current page should be reloaded and the prices table should display prices from the selected Merchant Relationship if they exist or an empty table should be displayed when they do not exist.Make sure that when you added/changed prices for some Merchant Relationship, they appear after submitting the form and reloading the page.Make sure that Redis keys are updated/created for this product and business units are assigned to the selected MR.)

{% info_block warningBox "Verification" %}
Make sure that a logged in user, who belongs to a company business unit and that business unit is assigned to some Merchant Relationship with specified prices, sees Merchant Relationship prices on the Catalog and on the Product page.</br>Make sure that this user sees MIN price if their business unit is assigned to multiple Merchant Relationships with different prices for the same product.
{% endinfo_block %}

### Ensure Compatibility
Check the following compatibility issues:

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `PriceFacetConfigTransferBuilderPlugin` | This plugin displays price-range filter on the catalog page. It should be removed from plugin stack to avoid wrong displaying product with merchant prices. | `Spryker\Client\CatalogPriceProductConnector\Plugin\ConfigTransferBuilder` |

{% info_block warningBox "Verification" %}
Make sure that the price range filter is not displayed on the catalog page.
{% endinfo_block %}
