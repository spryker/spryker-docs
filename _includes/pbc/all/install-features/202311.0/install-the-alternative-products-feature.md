


This document describes how to install the [Alternative Products feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/alternative-products-feature-overview.html).

## Install feature core

Follow the steps below to install the Alternative Products feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
| Spryker Core | {{site.version}}  | [Spryker Сore feature integration](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{site.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/alternative-products: "{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductAlternative | vendor/spryker/product-alternative |
| ProductAlternativeDataImport | vendor/spryker/product-alternative-data-import |
| ProductAlternativeGui | vendor/spryker/product-alternative-gui |
| ProductAlternativeStorage | vendor/spryker/product-alternative-storage |
{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Adjust the schema definition so that entity changes trigger the events.

| AFFECTED ENTITY | TRIGGERED EVENTS |
|---|---|
| spy_product_alternative |  Entity.spy_product_alternative.create<br>Entity.spy_product_alternative.update<br>Entity.spy_product_alternative.delete |

**src/Pyz/Zed/ProductAlternative/Persistence/Propel/Schema/spy_product_alternative.schema.xml**

```xml
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

2. Set up synchronization queue pools so that non-multi-store entities (not store-specific entities) get synchronized among stores:

**src/Pyz/Zed/ProductAlternativeStorage/Persistence/Propel/Schema/spy_product_alternative_storage.schema.xml**

```xml
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

3. Apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_product_alternative | table | created |
| spy_product_alternative_storage | table | created |
| spy_product_replacement_for_storage | table | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH                                                                        |
| --- | --- | --- |-----------------------------------------------------------------------------|
| SpyProductAlternativeEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductAlternativeEntityTransfer           |
| SpyProductAlternativeStorageEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductAlternativeStorageEntityTransfer    |
| SpyProductReplacementForStorageEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyProductReplacementForStorageEntityTransfer |
| ProductAlternative | class | created | src/Generated/Shared/Transfer/ProductAlternative                            |
| ProductAlternativeResponse | class | created | src/Generated/Shared/Transfer/ProductAlternativeResponse                    |
| ResponseMessage | class | created | src/Generated/Shared/Transfer/ResponseMessage                               |
| ProductAlternativeCollection | class | created | src/Generated/Shared/Transfer/ProductAlternativeCollection                  |
| ProductAlternativeCreateRequest | class | created | src/Generated/Shared/Transfer/ProductAlternativeCreateRequest               |
| ProductAlternativeListItem | class | created | src/Generated/Shared/Transfer/ProductAlternativeListItem                    |
| ProductAlternativeList | class | created | src/Generated/Shared/Transfer/ProductAlternativeList                        |
| ProductAlternativeStorage | class | created | src/Generated/Shared/Transfer/ProductAlternativeStorage                     |
| ProductReplacementStorage | class | created | src/Generated/Shared/Transfer/ProductReplacementStorage                     |
| ProductAlternativeCriteria | class | created | src/Generated/Shared/Transfer/ProductAlternativeCriteriaTransfer            |
| ProductAlternative | class | created | src/Generated/Shared/Transfer/ProductAlternativeTransfer            |
| ProductAlternativeCollection | class | created | src/Generated/Shared/Transfer/ProductAlternativeCollectionTransfer            |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer            |

Make sure that the changes have been implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:

| PATH | METHOD NAME |
| --- | --- |
| src/Orm/Zed/ProductAlternative/Persistence/Base/SpyProductAlternative.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |

{% endinfo_block %}

### 3) Configure export to Redis

{% info_block infoBox "Info" %}

This step publishes tables on change—create, edit, and delete to the `spy_product_alternative_storage`, `spy_product_replacement_for_storage` and synchronize the data to Storage.

{% endinfo_block %}

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|  ProductAlternativeStorageEventSubscriber | Registers listeners that are responsible to publish alternative products storage entity changes when a related entity change event occurs. | None |  Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

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

#### Set up publisher trigger plugins

Add the following plugins to your project:

| PLUGIN                              | SPECIFICATION                                                         | PREREQUISITES | NAMESPACE                                                       |
|-------------------------------------|-----------------------------------------------------------------------|---------------|-----------------------------------------------------------------|
| ProductAlternativePublisherTriggerPlugin | Allows publishing or re-publishing product alternative data manually. | None          | Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Publisher |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Publisher\ProductAlternativePublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductAlternativePublisherTriggerPlugin(),
        ];
    }
}
```

#### Set up, regenerate, and resync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| ProductAlternativeSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. | None |  Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization |
| ProductReplacementForSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. | None |  Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/ProductAlternativeStorage/ProductAlternativeStorageConfig.php**

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

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

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

### 4) Import product alternatives

{% info_block infoBox "Info" %}

The following imported entities are used as alternative products in the Spryker OS.

{% endinfo_block %}

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ProductAlternativeDataImport/data/import/product_alternative.csv**

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

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|---|---|---|---|---|
|  concrete_sku | &check; | string | 420566 | SKU of concrete product which will have alternative products. |
|  alternative_product_concrete_sku |  | string | 420565 | SKU of the concrete alternative product. |
|  alternative_product_abstract_sku |  | string | M1000785 | SKU of the abstract alternative product. |

2. Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| ProductAlternativeDataImportPlugin | Imports alternative product data into the database. | None | Spryker\Zed\ProductAlternativeDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

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

3. Import data:

```bash
console data:import product-alternative
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_product_alternative` table.

{% endinfo_block %}

### 5) Set up alternative products workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| ProductConcretePluginUpdate | Saves product alternatives on product concrete save. | None |  Spryker\Zed\ProductAlternativeGui\Communication\Plugin\Product |
| ProductConcreteFormEditTabsExpanderPlugin | Expands form tabs for `ProductConcreteEditForm` with `Product Alternatives` section. | None |  Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement |
| ProductConcreteEditFormExpanderPlugin | Expands `ProductConcreteEditForm` with `AddProductAlternativeForm` form. | None |  Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement |
| ProductConcreteFormEditDataProviderExpanderPlugin | Adds alternative product information to `ProductConcreteEditForm` data. | Expected `idProductConcrete` set for `ProductConcreteTransfer`. | Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement |
| ProductFormTransferMapperExpanderPlugin` | Adds product alternative create requests to product concrete transfer. | None |  Spryker\Zed\ProductAlternativeGui\Communication\Plugin\ProductManagement |

**src/Pyz/Zed/Product/ProductDependencyProvider**

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

<details open><summary markdown='span'>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

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
</details>

{% info_block warningBox "Verification" %}

Make sure that when you edit any product variant in the Back Office, you have the **Product Alternatives** tab, and you can add some product SKUs as alternatives.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Alternative Products feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
| Spryker Core | {{site.version}}  | [Spryker Сore feature integration](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{site.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/alternative-products: "^{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductAlternativeWidget | vendor/spryker-shop/product-alternative-widget |
| ProductReplacementForWidget | vendor/spryker-shop/product-replacement-for-widget |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

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

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| ProductAlternativeWidget | Displays alternative product. | None |  SprykerShop\Yves\ProductWidget\Widget |
| PdpProductReplacementForListWidget | Displays a list of products for replacement. | None |  SprykerShop\Yves\ProductWidget\Widget |
| ProductReplacementForListWidget | Displays a product for replacement. | None |  SprykerShop\Yves\ProductReplacementForWidget\Widget |
| ProductAlternativeListWidget | Display list of alternative products for the provided product. | None | SprykerShop\Yves\ProductAlternativeWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

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

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE | TEST |
| --- | --- |
| ProductAlternativeWidget | Assign some alternative products in the Back Office, and make sure that they are displayed on the product details page of the product to which they are assigned. |
| ProductReplacementForListWidget | Make that after you've assigned some product as an alternative for another you can see the **Replacement for** section on its product details page. |
| PdpProductReplacementForListWidget | Make that after you've assigned some product as an alternative for another you can see the **Replacement for** section on its product details page. |
| ProductAlternativeListWidget | Assign some alternative products in the Back Office, and make sure that they are displayed on the product details page of the product to which they are assigned. |

{% endinfo_block %}

{% info_block infoBox "Store relation" %}

If the [Product Labels feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-labels-feature-overview.html) is integrated into your project, define store relations for *Discontinued* and *Alternatives available* product labels by reimporting [`product_label_store.csv`](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-label-store.csv.html). Otherwise, the product labels are not displayed on the Storefront.

{% endinfo_block %}
