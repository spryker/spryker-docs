---
title: Product Lists Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/product-lists-feature-integration-201811
redirect_from:
  - /v1/docs/product-lists-feature-integration-201811
  - /v1/docs/en/product-lists-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Product | 2018.11.0 |
| Category Management | 2018.11.0 |
### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
`composer require spryker/customer-catalog:"^1.0.0" spryker-feature/product-lists:"^2018.11.0" --update-with-dependencies`

{% info_block warningBox "Verification" %}
Make sure that the following modules are installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`CustomerCatalog`</td><td>`vendor/spryker/customer-catalog`</td></tr><tr><td>`ProductList`</td><td>`vendor/spryker/product-list`</td></tr><tr><td>`ProductListDataImport`</td><td>`vendor/spryker/product-list-data-import`</td></tr><tr><td>`ProductListGui`</td><td>`vendor/spryker/product-list-gui`</td></tr><tr><td>`ProductListGuiExtension`</td><td>`vendor/spryker/product-list-gui-extension`</td></tr><tr><td>`ProductListSearch`</td><td>`vendor/spryker/product-list-search`</td></tr><tr><td>`ProductListStorage`</td><td>`vendor/spryker/product-list-storage`</td></tr><tr><td>`ProductStorageExtension`</td><td>`vendor/spryker/product-storage-extension`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Adjust the schema definition so that entity changes trigger events.

| Affected entity | Triggered events |
| --- | --- |
| `spy_product_list` | `Entity.spy_product_list.create`<br>`Entity.spy_product_list.update`<br>`Entity.spy_product_list.delete` |
| `spy_product_list_product_concrete` | `Entity.spy_product_list_product_concrete.create`<br>`Entity.spy_product_list_product_concrete.update`<br>`Entity.spy_product_list_product_concrete.delete` |
| `spy_product_list_category` | `Entity.spy_product_list_category.create`<br>`Entity.spy_product_list_category.update`<br>`Entity.spy_product_list_category.delete` |

Make the following changes in `spy_product_list.schema.xml`.
<details open>
<summary>src/Pyz/Zed/ProductList/Persistence/Propel/Schema/spy_product_list.schema.xml</summary>

``` html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			name="zed"
			xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
			namespace="Orm\Zed\ProductList\Persistence"
			package="src.Orm.Zed.ProductList.Persistence">
		<table name="spy_product_list" identifierQuoting="true">
			<behavior name="event">
				<parameter name="spy_product_list_all" column="*"/>
			</behavior>
		</table>
		<table name="spy_product_list_product_concrete" isCrossRef="true">
			<behavior name="event">
				<parameter name="spy_product_list_product_concrete_all" column="*"/>
			</behavior>
		</table>
		<table name="spy_product_list_category" isCrossRef="true">
			<behavior name="event">
				<parameter name="spy_product_list_category_all" column="*"/>
			</behavior>
		</table>
</database>
```
<br>
</details>

Set up synchronization queue pools so that non-multistore entities (not store specific entities) can be synchronized among stores:

<details open>
<summary>src/Pyz/Zed/ProductList/Persistence/Propel/Schema/spy_product_list.schema.xml</summary>

``` html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			name="zed"
			xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
			namespace="Orm\Zed\ProductListStorage\Persistence"
			package="src.Orm.Zed.ProductListStorage.Persistence">
		<table name="spy_product_abstract_product_list_storage">
			<behavior name="synchronization">
					<parameter name="queue_pool" value="synchronizationPool"/>
			</behavior>
		</table>
		<table name="spy_product_concrete_product_list_storage">
			<behavior name="synchronization">
					<parameter name="queue_pool" value="synchronizationPool"/>
			</behavior>
		</table>
</database>
```
<br>
</details>

Run the following commands to apply database changes and generate entity and transfer changes:
```
console transfer:generate
console propel:install
console transfer:generate
```
{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>spy_product_list</td><td>table</td><td>created</td></tr><tr><td>spy_product_list_product_concrete</td><td>table</td><td>created</td></tr><tr><td>spy_product_list_category</td><td>table</td><td>created</td></tr><tr><td>spy_product_abstract_product_list_storage</td><td>table</td><td>created</td></tr><tr><td>spy_product_concrete_product_list_storage</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that propel entities were generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes:<table><thead><tr><th>Class path</th><th>Extends</th></tr></thead><tbody><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductList.php`</td><td>`Spryker\Zed\ProductList\Persistence\Propel\AbstractSpyProductList`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListQuery.php`</td><td>`Spryker\Zed\ProductList\Persistence\Propel\AbstractSpyProductListQuery`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListProductConcrete.php`</td><td>`Spryker\Zed\ProductList\Persistence\Propel\AbstractSpyProductListProductConcrete`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListProductConcreteQuery.php`</td><td>`Spryker\Zed\ProductList\Persistence\Propel\AbstractSpyProductListProductConcreteQuery`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListCategory.php`</td><td>`Spryker\Zed\ProductList\Persistence\Propel\AbstractSpyProductListCategory`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListCategoryQuery.php`</td><td>`Spryker\Zed\ProductList\Persistence\Propel\AbstractSpyProductListCategoryQuery`</td></tr><tr><td>`src/Orm/Zed/ProductListStorage/Persistence/Base/SpyProductAbstractProductListStorage`</td><td>`Spryker\Zed\ProductListStorage\Persistence\Propel\AbstractSpyProductAbstractProductListStorage`</td></tr><tr><td>`src/Orm/Zed/ProductListStorage/Persistence/Base/SpyProductAbstractProductListStorageQuery`</td><td>`Spryker\Zed\ProductListStorage\Persistence\Propel\AbstractSpyProductAbstractProductListStorageQuery`</td></tr><tr><td>`src/Orm/Zed/ProductListStorage/Persistence/Base/SpyProductConcreteProductListStorage`</td><td>`Spryker\Zed\ProductListStorage\Persistence\Propel\AbstractSpyProductConcreteProductListStorage`</td></tr><tr><td>`src/Orm/Zed/ProductListStorage/Persistence/Base/SpyProductConcreteProductListStorageQuery`</td><td>`Spryker\Zed\ProductListStorage\Persistence\Propel\AbstractSpyProductConcreteProductListStorageQuery`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:<table><thead><tr><th>Path</th><th>Method name</th></tr></thead><tbody><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductList.php`</td><td>`prepareSaveEventName(
{% endinfo_block %}`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListProductConcrete.php`</td><td>`prepareSaveEventName()`<br />`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr><tr><td>`src/Orm/Zed/ProductList/Persistence/Base/SpyProductListCategory.php`</td><td>`prepareSaveEventName()`<br />`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr><tr><td>`src/Orm/Zed/ProductListStorage/Persistence/Base/SpyProductAbstractProductListStorage.php`</td><td>`sendToQueue()`</td></tr><tr><td>`src/Orm/Zed/ProductListStorage/Persistence/Base/SpyProductConcreteProductListStorage.php`</td><td>`sendToQueue()`</td></tr></tbody></table>)

## 3) Add Translations

Append glossary according to your language configuration:
<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
product-cart.info.restricted-product.removed,"Unavailable item %sku% was removed from your shopping cart.",en_US
product-cart.info.restricted-product.removed,"Der nicht verfügbare Artikel% sku% wurde aus Ihrem Einkaufswagen entfernt.",de_DE
```
<br>
</details>

Run the following console command to import data:
```
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `spy_glossary` table  in the database.
{% endinfo_block %}

## 4) Configure Export to Redis and Elasticsearch
### Set up Event Listeners
With this step, you will be able to publish tables on change (create, edit, delete) to the `spy_product_abstract_product_list_storage`, `spy_product_concrete_product_list_storage` and synchronize the data to Storage and Search.

| Plugin | Specification |Prerequisites  | Namespace |
| --- | --- | --- | --- |
| `ProductListStorageEventSubscriber` | Registers listeners that are responsible for publishing product list information to storage when a related entity changes. | None | `Spryker\Zed\ProductListStorage\Communication\Plugin\Event\Subscriber` |
|`ProductListSearchEventSubscriber`|egisters listeners that are responsible for publishing product list information to search when a related entity changes.|None|`Spryker\Zed\ProductListSearch\Communication\Plugin\Event\Subscriber`|

<details open>
<summary>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductListSearch\Communication\Plugin\Event\Subscriber\ProductListSearchEventSubscriber;
use Spryker\Zed\ProductListStorage\Communication\Plugin\Event\Subscriber\ProductListStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
	public function getEventSubscriberCollection()
	{
		$eventSubscriberCollection = parent::getEventSubscriberCollection();
		$eventSubscriberCollection->add(new ProductListStorageEventSubscriber());
		$eventSubscriberCollection->add(new ProductListSearchEventSubscriber());

		return $eventSubscriberCollection;
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
your content goes hereMake sure when a product list is created, updated or deleted, they are exported (or removed
{% endinfo_block %} to Redis and Elasticsearch accordingly.<table><thead><tr><th>Storage type</th><th>Target entity</th><th>Example expected data identifier</th></tr></thead><tbody><tr ><td >Redis</td><td>Product Abstract Product List</td><td><var>kv:product_abstract_product_lists:1</var></td></tr><tr><td>Redis</td><td>Product Concrete Product List</td><td><var>kv:product_concrete_product_list:1</var></td></tr><tr><td>Elasticsearch</td><td>Product Abstract</td><td ><var>product_abstract:de:en_us:1</var></td></tr></tbody></table>)

<details open>
<summary>Example expected data fragment for Product Abstract Product List</summary>

```yaml
{
"id_product_abstract": 1,
"id_whitelists": [1,2],
"id_blacklists": [3]
}
```
<br>
</details>

<details open>
<summary>Example expected data fragment for Product Concrete Product List</summary>

```yaml
{
"id_product_concrete": 1,
"id_whitelists": [1,2],
"id_blacklists": [3]
}
```
<br>
</details>

<details open>
<summary>Example expected data fragment for Product Abstract</summary>

```yaml
{
"product-lists": {
"whitelists": [1,2],
"blacklists": [3]
}
}
```
<br>
</details>

### Prepare search data for export
With this step, we are extending Elasticsearch documents with product list data. Add the following plugins to your project:

| Plugin | Specification |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
| `ProductListDataLoaderPlugin` |Loads product list data as payload for the publishing process.  |  None|`Spryker\Zed\ProductListSearch\Communication\Plugin\ProductPageSearch\DataLoader`  |
|`ProductListDataLoadExpanderPlugin`|Expands product page data with all its product lists for publishing based on the previously collected product information.|Product list data should be available in the product payload. Suggestion: use `ProductListDataLoaderPlugin` (see above).|`Spryker\Zed\ProductListSearch\Communication\Plugin\ProductPageSearch\DataExpander`|
|`ProductListMapExpanderPlugin`|Maps product list data to Elasticsearch document structure.|Product list data should be available. Suggestion: use `ProductListDataLoadExpanderPlugin` (see above).|`Spryker\Zed\ProductListSearch\Communication\Plugin\ProductPageSearch`|
|`ProductAbstractProductListSynchronizationDataPlugin`|Can be executed to synchronize all product_abstract_product_list entries from database to Redis.|None|`Spryker\Zed\ProductListStorage\Communication\Plugin\Synchronization`|
|`ProductConcreteProductListSynchronizationDataPlugin`|Can be executed to synchronize all product_concrete_product_list entries from database to Redis.|None|`Spryker\Zed\ProductListStorage\Communication\Plugin\Synchronization`|

<details open>
<summary>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Shared\ProductListSearch\ProductListSearchConfig;
use Spryker\Zed\ProductListSearch\Communication\Plugin\ProductPageSearch\DataExpander\ProductListDataLoadExpanderPlugin;
use Spryker\Zed\ProductListSearch\Communication\Plugin\ProductPageSearch\DataLoader\ProductListDataLoaderPlugin;
use Spryker\Zed\ProductListSearch\Communication\Plugin\ProductPageSearch\ProductListMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
	public const PLUGIN_PRODUCT_LABEL_DATA = 'PLUGIN_PRODUCT_LABEL_DATA';

	/**
	 * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
	 */
	protected function getDataExpanderPlugins()
	{
		return [
			ProductListSearchConfig::PLUGIN_PRODUCT_LIST_DATA => new ProductListDataLoadExpanderPlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageMapExpanderInterface[]
	 */
	protected function getMapExpanderPlugins()
	{
		return [
			new ProductListMapExpanderPlugin(),
		];
	}

	/**
  	 * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
	 */
	protected function getDataLoaderPlugins()
	{
		return [
			new ProductListDataLoaderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductListStorage\Communication\Plugin\Synchronization\ProductAbstractProductListSynchronizationDataPlugin;
use Spryker\Zed\ProductListStorage\Communication\Plugin\Synchronization\ProductConcreteProductListSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	 */
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new ProductAbstractProductListSynchronizationDataPlugin(),
			new ProductConcreteProductListSynchronizationDataPlugin(),
		];
	}
}
```
<br>
</details>

### Prepare the Search Queries

Once the product list data is exported to Elasticsearch, make sure to extend your search queries to filter out restricted products by adding the following query expander plugin to your search queries where necessary.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListQueryExpanderPlugin` | <ul><li>Expands an Elasticsearch query with blacklist and whitelist filters based on the customer session.</li><li>The result of the query will contain only products that were on the given whitelists, but not on the given blacklists.</li></ul> | <ul><li>The Customer session must contain product list information.</li><li>Suggestion: See "Merchant Product Lists" integration guide, for example, implementation.</li></ul> | `Spryker\Client\CustomerCatalog\Plugin\Search` |

{% info_block infoBox "Note" %}
The order of the query expander plugins matters for the search result. Make sure that your query expanders are in the appropriate order. I.e. the `FacetQueryExpanderPlugin` needs to follow all other plugins that filter down the result, otherwise, it can't generate the proper query fragment for itself.
{% endinfo_block %}

<details open>
<summary>src/Pyz/Client/Catalog/CatalogDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\CustomerCatalog\Plugin\Search\ProductListQueryExpanderPlugin;
use Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\FacetQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
	/**
	 * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
	 */
	protected function createCatalogSearchQueryExpanderPlugins()
	{
		return [
			//...
			new ProductListQueryExpanderPlugin(),
			//...
		];
	}

	/**
	 * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
	 */
	protected function createSuggestionQueryExpanderPlugins()
	{
		return [
			//...
			new ProductListQueryExpanderPlugin(),
			//...
		];
	}
}
```
<br>
</details>
{% info_block warningBox "Verification" %}
Make sure that you haven't missed the expansion of any product search queries in your project where you need to consider product lists.
{% endinfo_block %}
{% info_block warningBox "Verification" %}
Once you are done with this step, you should only be able to see those products in your search results, which are on the product lists of your customer's session.
{% endinfo_block %}

## 5) Import Data
### Import Product Lists
Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/product-list-data-import/data/import/product_list.csv</summary>

```yaml
"product_list_key","name","type"
"pl-001","All computers","whitelist"
"pl-002","No ASUS","blacklist"
"pl-003","All tablets","blacklist"
"pl-004","Cameras, Wearables &amp; Phones","whitelist"
"pl-005","Camcorders over 400€","blacklist"
"pl-006","All cameras","whitelist"
"pl-007","Tablets with enough storage","whitelist"
"pl-008","No Smartwatches","blacklist"
```
<br>
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| product_list_key | mandatory | string (unique) | pl-001 | Unique identifier used to identify a product list. |
|name|mandatory|string|All computers|Custom product list name used to provide a readable title or sentence of what the list contains. Used only for internal representation.|
|type|mandatory|string ("blacklist"/"whitelist")|whitelist|Defines whether the list is a blacklist or a whitelist.|
Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListDataImportPlugin` | Imports basic product list data into the database. | None | `Spryker\Zed\ProductListDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductListDataImport\Communication\Plugin\ProductListDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	 * @return array
	 */
	protected function getDataImporterPlugins(): array
	{
		return [
			//...
			new ProductListDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to import data:
```
console data:import product-list
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the spy_product_list table.
{% endinfo_block %}

### Import Product List Category Assignments
Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/product-list-data-import/data/import/product_list_to_category.csv</summary>

```yaml
product_list_key,category_key
pl-001,computer
pl-003,tablets
pl-004,cameras-and-camcorder
pl-004,smart-wearables
pl-004,smartphones
pl-008,smartwatches
```
<br>
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `product_list_key` | mandatory | string | pl-001 | An existing product list identifier for the assignment. |
|`category_key`|mandatory|string|computer|An existing category identifier to be assigned to the product list.|
Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListCategoryDataImportPlugin` | Imports category assignments for product lists. | Product list data and category data must exist before this installer plugin runs. | `Spryker\Zed\ProductListDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductListDataImport\Communication\Plugin\ProductListCategoryDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	 * @return array
	 */
	protected function getDataImporterPlugins(): array
	{
		return [
			//...
			new ProductListCategoryDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to import data:
```
console data:import product-list-category
```
{% info_block warningBox "Verificaton" %}
Make sure that the configured data are added to the spy_product_list_category table in the database.
{% endinfo_block %}

### Import Product List Concrete Product Assignments

Prepare your data according to your requirements using our demo data:
<details open>
<summary>vendor/spryker/product-list-data-import/data/import/product_list_to_concrete_product.csv</summary>

```yaml
product_list_key,concrete_sku
pl-002,166_30230575
pl-002,166_29565389
pl-002,165_29879507
pl-002,165_29879528
pl-002,099_27207215
pl-002,114_29911081
pl-002,114_30580483
pl-002,139_24699831
pl-002,140_22766487
pl-002,141_29380410
pl-002,142_30943081
pl-002,143_31035196
pl-002,144_29804740
pl-002,144_30312874
pl-002,144_29804741
pl-002,157_29525342
pl-002,158_29885222
pl-002,159_29885260
pl-002,159_29885269
pl-002,160_29533301
pl-002,161_29533300
pl-002,162_29533299
pl-002,163_29728850
pl-002,164_29565390
pl-002,165_29879507
pl-002,165_29879528
pl-002,166_30230575
pl-002,166_29565389
pl-002,215_123
pl-002,215_124
pl-005,204_29851280
pl-005,187_26306352
pl-005,188_26306353
pl-005,194_25904145
pl-005,195_25904159
pl-007,161_29533300
pl-007,177_24867659
pl-007,177_25913296
```
<br>
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `product_list_key` | mandatory | string | pl-002 | An existing product list identifier for the assignment. |
|`concrete_sku`|mandatory|string|166_30230575|An existing concrete product SKU to assign to the product list.|

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListProductConcreteDataImportPlugin` | Imports concrete product assignments for product lists. | Product list data and concrete product data must exist before this importer plugin runs. | `vendor/spryker/product-list-data-import/src/Spryker/Zed/ProductListDataImport/Communication/Plugin/ProductListProductConcreteDataImportPlugin.php` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductListDataImport\Communication\Plugin\ProductListCategoryDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	 * @return array
	 */
	protected function getDataImporterPlugins(): array
	{
		return [
			//...
			new ProductListProductConcreteDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to import data:
```
console data:import product-list-product-concrete
```
{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `spy_product_list_product_concrete` table in the database.
{% endinfo_block %}

## 6) Set up Behavior
### Reading From Product Storage
Add the following plugins to your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductAbstractRestrictionPlugin` | Responsible for determining if an abstract product is restricted for the current customer or not. | None | `Spryker\Client\ProductListStorage\Plugin\ProductStorageExtension` |
|`ProductConcreteRestrictionPlugin`|Responsible for determining if a concrete product is restricted for the current customer or not.|None|`Spryker\Client\ProductListStorage\Plugin\ProductStorageExtension`|
|`ProductViewVariantRestrictionPlugin`|Responsible for filtering out product variants of a product view object.|The product view object should contain all available variant information.<br>Suggestion: use `ProductViewVariantExpanderPlugin`before, to collect variant data.|`Spryker\Client\ProductListStorage\Plugin\ProductStorageExtension`|

<details open>
<summary>src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\ProductListStorage\Plugin\ProductStorageExtension\ProductAbstractRestrictionPlugin;
use Spryker\Client\ProductListStorage\Plugin\ProductStorageExtension\ProductConcreteRestrictionPlugin;
use Spryker\Client\ProductListStorage\Plugin\ProductStorageExtension\ProductViewVariantRestrictionPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
	/**
	 * @return \Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface[]
	 */
	protected function getProductViewExpanderPlugins()
	{
		return [
			new ProductViewVariantRestrictionPlugin(),
		];
	}

	/**
	 * @return \Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductAbstractRestrictionPluginInterface[]
	 */
	protected function getProductAbstractRestrictionPlugins(): array
	{
		return [
			new ProductAbstractRestrictionPlugin(),
		];
	}

	/**
	 * @return \Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductConcreteRestrictionPluginInterface[]
	 */
	protected function getProductConcreteRestrictionPlugins(): array
	{
		return [
			new ProductConcreteRestrictionPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that features which use Redis to read product data (i.e. Product Details Page, Product relations, etc.
{% endinfo_block %} don't show it when a product is restricted for the customer.)

### Product Restrictions in the Cart
Add the following plugins to handle product restrictions for cart items:

| Plugin |Specification  |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
| `ProductListRestrictedItemsPreCheckPlugin` | Checks all cart items and adds violations to the cart precheck response when they are restricted for the current customer. | None | `Spryker\Zed\ProductList\Communication\Plugin\CartExtension` |
|`RemoveRestrictedItemsPreReloadPlugin`|Checks and removes restricted cart items from the quote and adds a message for each removed item.|None|`Spryker\Zed\ProductList\Communication\Plugin\CartExtension`|

<details open>
<summary>Spryker\Zed\ProductList\Communication\Plugin\CartExtension</summary>

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductList\Communication\Plugin\CartExtension\ProductListRestrictedItemsPreCheckPlugin;
use Spryker\Zed\ProductList\Communication\Plugin\CartExtension\RemoveRestrictedItemsPreReloadPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
	/**
	 * @param \Spryker\Zed\Kernel\Container $container
	 *
	 * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
	 */
	protected function getCartPreCheckPlugins(Container $container)
	{
		return [
			new ProductListRestrictedItemsPreCheckPlugin(),
		];
	}

	/**
	 * @param \Spryker\Zed\Kernel\Container $container
	 *
	 * @return \Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface[]
	 */
	protected function getPreReloadPlugins(Container $container)
	{
		return [
			new RemoveRestrictedItemsPreReloadPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that no restricted products can be added to a cart and if they were already in a cart, they get properly removed once a product became restricted for the customer.
{% endinfo_block %}
{% info_block warningBox "Verification" %}
After completing the integration of this feature, you need to further extend it to provide one or many owner types for product lists to be able to assign them. A product list can only be fully functional when a user who browses the catalog gets product lists assigned and this can be done by providing owners for product lists.Check out our Merchant Relationship Product Restrictions integration guide that adds this functionality for merchant relationships: [Merchant Product Restrictions Feature Integration](https://documentation.spryker.com/v1/docs/merchant-product-restrictions-feature-integration-201903
{% endinfo_block %}. )
