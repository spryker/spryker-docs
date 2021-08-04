---
title: Alternative Products Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/alternative-products-feature-integration
redirect_from:
  - /v3/docs/alternative-products-feature-integration
  - /v3/docs/en/alternative-products-feature-integration
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
|---|---|
| Product | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/alternative-products: "^201903.0" --update-with-dependencies 
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`ProductAlternative`</td><td>`vendor/spryker/product-alternative`</td></tr><tr><td>`ProductAlternativeDataImport`</td><td>`vendor/spryker/product-alternative-data-import`</td></tr><tr><td>`ProductAlternativeGui`</td><td>`vendor/spryker/product-alternative-gui`</td></tr><tr><td>`ProductAlternativeStorage`</td><td>`vendor/spryker/product-alternative-storage`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects

Adjust the schema definition so that entity changes trigger the events.

| Affected Entity | Triggered Events |
|---|---|
|  `spy_product_alternative` |  `Entity.spy_product_alternative.create` `Entity.spy_product_alternative.update` `Entity.spy_product_alternative.delete` |

<details open>
<summary>src/Pyz/Zed/ProductAlternative/Persistence/Propel/Schema/spy_product_alternative.schema.xml</summary>
    
```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 name="zed"
 xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
 namespace="Orm\Zed\ProductAlternative\Persistence"
 package="src.Orm.Zed.ProductAlternative.Persistence">

<table name="spy_product_alternative" idMethod="native" allowPkInsert="true" phpName="SpyProductAlternative">
 <behavior name="event">
 <parameter name="spy_product_alternative_all" column="*"/>
 </behavior>
 </table>
 </database>
 ```
< /br>
</details>
    
Set up synchronization queue pools so that non-multistore entities (not store specific entities) get synchronized among stores:

<details open><summary>src/Pyz/Zed/ProductAlternativeStorage/Persistence/Propel/Schema/spy_product_alternative_storage.schema.xml</summary>

```html
 <?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 name="zed"
 xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
 namespace="Orm\Zed\ProductAlternativeStorage\Persistence"
 package="src.Orm.Zed.ProductAlternativeStorage.Persistence">

 <table name="spy_product_alternative_storage">
 <behavior name="synchronization">
 <parameter name="queue_pool" value="synchronizationPool" />
 </behavior>
 </table>

 <table name="spy_product_replacement_for_storage">
 <behavior name="synchronization">
 <parameter name="queue_pool" value="synchronizationPool" />
 </behavior>
 </table>

</database> 
```
<br>   
</details>

Run the following commands to apply the database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_product_alternative`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_alternative_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_product_replacement_for_storage`</td>`<td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`SpyProductAlternativeEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductAlternativeEntityTransfer`</td></tr><tr><td>`SpyProductAlternativeStorageEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductAlternativeStorageEntityTransfer`</td></tr><tr><td>`SpyProductReplacementForStorageEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyProductReplacementForStorageEntityTransfer`</td></tr><tr><td>`ProductAlternative`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternative`</td></tr><tr><td>`ProductAlternativeResponse`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternativeResponse`</td></tr><tr><td>`ResponseMessage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ResponseMessage`</td></tr><tr><td>`ProductAlternativeCollection`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternativeCollection`</td></tr><tr><td>`ProductAlternativeCreateRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternativeCreateRequest`</td></tr><tr><td>`ProductAlternativeListItem`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternativeListItem`</td></tr><tr><td>`ProductAlternativeList`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternativeList`</td></tr><tr><td>`ProductAlternativeStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductAlternativeStorage`</td></tr><tr><td>`ProductReplacementStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ProductReplacementStorage`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes have been implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:<table><thead><tr><td>Path</td><td>Method Name</td></tr></thead><tbody><tr><td>`src/Orm/Zed/ProductAlternative/Persistence/Base/SpyProductAlternative.php`</td><td>`prepareSaveEventName(
{% endinfo_block %}`<br />`addSaveEventToMemory()`<br />`addDeleteEventToMemory()`</td></tr></tbody></table>)

### 3) Configure Export to Redis
    
{% info_block infoBox "Info" %}
This step will publish tables on change (create, edit, delete
{% endinfo_block %} to the `spy_product_alternative_storage`, `spy_product_replacement_for_storage`  and synchronize the data to Storage.)

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `ProductAlternativeStorageEventSubscriber` | Registers listeners that are responsible to publish alternative products storage entity changes when a related entity change event occurs. | None |  `Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Event\Subscriber` |

<details open>
<summary>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>
 
 ```php
 <?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Event\Subscriber\ProductAlternativeStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
 public function getEventSubscriberCollection()
 {
 $eventSubscriberCollection = parent::getEventSubscriberCollection();
 $eventSubscriberCollection->add(new ProductAlternativeStorageEventSubscriber());

 return $eventSubscriberCollection;
 }
}
```
<br>
</details>

#### Set up Re-Generate and Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `ProductAlternativeSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None |  `Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization` |
|  `ProductReplacementForSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None |  `Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization` |

<details open>
<summary>src/Pyz/Zed/ProductAlternativeStorage/ProductAlternativeStorageConfig.php</summary>

```php
<?php

namespace Pyz\Zed\ProductAlternativeStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ProductAlternativeStorage\ProductAlternativeStorageConfig as SprykerProductAlternativeStorageConfig;

class ProductAlternativeStorageConfig extends SprykerProductAlternativeStorageConfig
{
 /**
 * @ return string|null
 */
 public function getProductAlternativeSynchronizationPoolName(): ?string
 {
 return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
 }

 /**
 * @return string|null
 */
 public function getProductReplacementForSynchronizationPoolName(): ?string
 {
 return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
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

use Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization\ProductAlternativeSynchronizationDataPlugin;
use Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization\ProductReplacementForSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
 /**
 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
 */
 protected function getSynchronizationDataPlugins(): array
 {
 return [
 new ProductAlternativeSynchronizationDataPlugin(),
 new ProductReplacementForSynchronizationDataPlugin(),
 ];
 }
}
```
<br>
</details>

### 4) Import Data

#### Import Product Alternatives

{% info_block infoBox "Info" %}
The following imported entities will be used as alternative products in the Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details>
<summary>vendor/spryker/spryker/Bundles/ProductAlternativeDataImport/data/import/product_alternative.csv</summary>

 ```yaml
concrete_sku,alternative_product_concrete_sku,alternative_product_abstract_sku
145_29885470,134_26145012,
145_29885471,134_29759322,
145_29885473,,134
138_30046855,142_30943081,
138_30046855,140_22766487,
138_30046855,,155
155_30149933,142_30943081,
155_30149933,140_22766487,
155_30149933,134_26145012,
```
<br>
</details>

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
|---|---|---|---|---|
|  `concrete_sku` | mandatory | string | 420566 | SKU of concrete product which will have alternative products. |
|  `alternative_product_concrete_sku` | optional | string | 420565 | SKU of the concrete alternative product. |
|  `alternative_product_abstract_sku` | optional | string | M1000785 | SKU of the abstract alternative product. |

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `ProductAlternativeDataImportPlugin` | Imports alternative product data into the database. | None |  `Spryker\Zed\ProductAlternativeDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductAlternativeDataImport\Communication\Plugin\ProductAlternativeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
 protected function getDataImporterPlugins(): array
 {
 return [
 new ProductAlternativeDataImportPlugin(),
 ];
 }
} 
```

</details>

Run the following console command to import data:
```bash
console data:import product-alternative
```

{% info_block warningBox "Verification" %}
Make sure that, in the database, the configured data has been added to the `spy_product_alternative` table.
{% endinfo_block %}

### 5) Set up Behavior

#### Set up Alternative Products Workflow

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `ProductConcretePluginUpdate` | Saves product alternatives on product concrete save. | None |  `Spryker\Zed\ProductAlternativeGui\Communication\Plugin\Product` |
|  `ProductConcreteFormEditTabsExpanderPlugin` | Expands form tabs for `ProductConcreteEditForm` with `Product Alternatives` section. | None |  `Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement` |
|  `ProductConcreteEditFormExpanderPlugin` | Expands `ProductConcreteEditForm` with `AddProductAlternativeForm` form. | None |  `Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement` |
|  `ProductConcreteFormEditDataProviderExpanderPlugin` | Adds alternative product information to `ProductConcreteEditForm` data. | Expected `idProductConcrete` set for `ProductConcreteTransfer`. |  `Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement` |
|  `ProductFormTransferMapperExpanderPlugin` | Adds product alternative create requests to product concrete transfer. | None |  `Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement` |

<details open>
<summary>src/Pyz/Zed/Product/ProductDependencyProvider</summary>

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Zed\ProductAlternativeGui\Communication\Plugin\Product\ProductConcretePluginUpdate as ProductAlternativeGuiProductConcretePluginUpdate;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginUpdateInterface[]
 */
 protected function getProductConcreteBeforeUpdatePlugins(Container $container)
 {
 return [
 new ProductAlternativeGuiProductConcretePluginUpdate(), #ProductAlternativeFeature
 ];
 }
} 
```

</details>

<details open>
<summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement\ProductConcreteEditFormExpanderPlugin;
use Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement\ProductConcreteFormEditDataProviderExpanderPlugin;
use Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement\ProductConcreteFormEditTabsExpanderPlugin;
use Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement\ProductFormTransferMapperExpanderPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
 /**
 * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditTabsExpanderPluginInterface[]
 */
 protected function getProductConcreteFormEditTabsExpanderPlugins(): array
 {
 return [
 new ProductConcreteFormEditTabsExpanderPlugin(), #ProductAlternativeFeature
 ];
 }

 /**
 * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteEditFormExpanderPluginInterface[]
 */
 protected function getProductConcreteEditFormExpanderPlugins(): array
 {
 return [
 new ProductConcreteEditFormExpanderPlugin(), #ProductAlternativeFeature
 ];
 }

 /**
 * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditDataProviderExpanderPluginInterface[]
 */
 protected function getProductConcreteFormEditDataProviderExpanderPlugins(): array
 {
 return [
 new ProductConcreteFormEditDataProviderExpanderPlugin(), #ProductAlternativeFeature
 ];
 }

 /**
 * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditDataProviderExpanderPluginInterface[]
 */
 protected function getProductFormTransferMapperExpanderPlugins(): array
 {
 return [
 new ProductFormTransferMapperExpanderPlugin(), #ProductAlternativeFeature
 ];
 }
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that when you edit any product variant in Zed you have "Product Alternatives" tab, and you can add some product SKU's as alternatives.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
|---|---|
| Product | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/alternative-products: "^201903.0" --update-with-dependencies 
```
{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`ProductAlternativeWidget`</td><td>`vendor/spryker-shop/product-alternative-widget`</td></tr><tr><td>`ProductReplacementForWidget`</td><td>`vendor/spryker-shop/product-replacement-for-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations

Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
replacement_for_widget.replacement_for,Replacement for,en_US
replacement_for_widget.replacement_for,Ersatz für,de_DE
product_alternative_widget.product_alternative,Alternative products,en_US
product_alternative_widget.product_alternative,Alternative Produkte,de_DE
product_alternative_widget.add_to_shopping_list,Add to shopping list,en_USproduct_alternative_widget.add_to_shopping_list,Auf die Merkliste,de_DE
product_alternative_widget.alternative_for,Alternative for name,en_US
product_alternative_widget.alternative_for,Alternative für name,de_DE
product_alternative_widget.show_all,Show all,en_US
product_alternative_widget.show_all,Zeige alles,de_DE 
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
|---|---|---|---|
|  `ProductAlternativeWidget` | Displays alternative product. | None |  `SprykerShop\Yves\ProductWidget\Widget` |
|  `PdpProductReplacementForListWidget` | Displays list of products for replacement. | None |  `SprykerShop\Yves\ProductWidget\Widget` |
|  `ProductReplacementForListWidget` | Displays product for replacement. | None |  `SprykerShop\Yves\ProductReplacementForWidget\Widget` |
|  `ProductAlternativeListWidget` | Display list of alternative products for the provided product. | None |  `SprykerShop\Yves\ProductAlternativeWidget\Widget` |

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductWidget\Widget\ProductAlternativeWidget;
use SprykerShop\Yves\ProductWidget\Widget\PdpProductReplacementForListWidget;
use SprykerShop\Yves\ProductReplacementForWidget\Widget\ProductReplacementForListWidget;
use SprykerShop\Yves\ProductAlternativeWidget\Widget\ProductAlternativeListWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
 /**
 * @return string[]
 */
 protected function getGlobalWidgets(): array
 {
 return [
 ProductAlternativeWidget::class,
 PdpProductReplacementForListWidget::class,
 ProductReplacementForListWidget::class,
 ProductAlternativeListWidget::class,
 ];
 }
}
```
<br>
</details>

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build 
```

{% info_block warningBox "Verification" %}
Make sure that the following widgets were registered:<table><thead><tr><td>Module</td><td>Test</td></tr></thead><tbody><tr><td>`ProductAlternativeWidget`</td><td>Assign some alternative products in Zed, and make sure that they are displayed on the detail page of the product to which they were assigned.</td></tr><tr><td>`ProductReplacementForListWidget`</td><td>Make that after you've assigned some product as an alternative for another you can see "Replacement for" section on its product detail page.</td></tr><tr><td>`PdpProductReplacementForListWidget`</td><td>Make that after you've assigned some product as an alternative for another you can see "Replacement for" section on its product detail page.</td></tr><tr><td>`ProductAlternativeListWidget`</td><td>Assign some alternative products in Zed, and make sure that they are displayed on the PDP of the product to which they were assigned.</td></tr></tbody></table>
{% endinfo_block %}
