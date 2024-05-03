

This document describes how to install the [Product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) + [Category](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/category-management-feature-overview.html#root-parent-and-child-categories) feature.

## Install feature core

Follow the steps below to install the Product + Category feature core.

### Prerequisites

Install the required features:

| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                                    |
|---------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core        | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)               |
| Category Management | {{site.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |
| Product             | {{site.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                         |

### 1) Install the required modules

```bash
composer require spryker-feature/product:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| ProductCategory              | vendor/spryker/product-category                |
| ProductCategorySearch        | vendor/spryker/product-category-search         |
| ProductCategoryStorage       | vendor/spryker/product-category-storage        |
| ProductCategoryFilterStorage | vendor/spryker/product-category-filter-storage |

{% endinfo_block %}

### 2) Set up configuration

Set up the following configuration:

**src/Pyz/Zed/ProductCategoryStorage/ProductCategoryStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ProductCategoryStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductCategoryStorage\ProductCategoryStorageConfig as SprykerProductCategoryStorageConfig;

class ProductCategoryStorageConfig extends SprykerProductCategoryStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductCategorySynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

**src/Pyz/Zed/ProductCategoryFilterStorage/ProductCategoryFilterStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ProductCategoryFilterStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductCategoryFilterStorage\ProductCategoryFilterStorageConfig as SprykerProductCategoryFilterStorageConfig;

class ProductCategoryFilterStorageConfig extends SprykerProductCategoryFilterStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductCategoryFilterSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```


### 3) Set up database schema and transfer objects

1. Set up synchronization queue pools so the entities without store relations are synchronized among stores:

**src/Pyz/Zed/ProductCategoryFilterStorage/Persistence/Propel/Schema/spy_product_category_filter_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database
    xmlns="spryker:schema-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    name="zed"
    xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\ProductCategoryFilterStorage\Persistence"
    package="src.Orm.Zed.ProductCategoryFilterStorage.Persistence"
>

    <table name="spy_product_category_filter_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>
</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database.

{% endinfo_block %}

### 4) Configure export to Redis

Configure tables to be published to the `spy_product_abstract_category_storage` and `spy_product_category_filter_storage` and synchronized to the Storage on create, edit, and delete changes:

1. Set up publisher plugins:

| PLUGIN                                                 | SPECIFICATION                                                                                 | PREREQUISITES | NAMESPACE                                                                           |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------|
| CategoryIsActiveAndCategoryKeyWritePublisherPlugin     | Publishes product category data by the `SpyCategory` entity events with modified columns.     |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category          |
| CategoryStoreDeletePublisherPlugin                     | Publishes product category data by the `CategoryStore` un-publish event.                      |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category          |
| CategoryStoreWriteForPublishingPublisherPlugin         | Publishes product category data by the `CategoryStore` publish event.                         |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category          |
| CategoryStoreWritePublisherPlugin                      | Publishes product category data by the`SpyCategoryStore` entity events.                       |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category          |
| CategoryWritePublisherPlugin                           | Publishes product category data by the `SpyCategory` entity events.                           |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category          |
| CategoryAttributeNameWritePublisherPlugin              | Publishes product category data by the`SpyCategoryAttribute` entity events.                   |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryAttribute |
| CategoryAttributeWritePublisherPlugin                  | Publishes product category data by the`SpyCategoryAttribute` entity events.                   |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryAttribute |
| CategoryNodeWritePublisherPlugin                       | Publishes product category data by the `SpyCategoryNode` entity events with modified columns. |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryNode      |
| CategoryUrlAndResourceCategorynodeWritePublisherPlugin | Publishes product category data by the `SpyUrl` entity events.                                |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryUrl       |
| CategoryUrlWritePublisherPlugin                        | Publishes product category data by the `SpyUrl` entity events.                                |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryUrl       |
| ProductCategoryWriteForPublishingPublisherPlugin       | Publishes product category data by the `ProductCategory` publishing events.                   |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\ProductCategory   |
| ProductCategoryWritePublisherPlugin                    | Publishes product category data by the`SpyProductCategory` entity events.                     |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\ProductCategory   |

<details>
<summary markdown='span'>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category\CategoryIsActiveAndCategoryKeyWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category\CategoryStoreDeletePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category\CategoryStoreWriteForPublishingPublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category\CategoryStoreWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\Category\CategoryWritePublisherPlugin as ProductCategoryStorageCategoryWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeNameWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeWritePublisherPlugin as ProductCategoryAttributeWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryNode\CategoryNodeWritePublisherPlugin as ProductCategoryNodeWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryUrl\CategoryUrlAndResourceCategorynodeWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\CategoryUrl\CategoryUrlWritePublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\ProductCategory\ProductCategoryWriteForPublishingPublisherPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\ProductCategory\ProductCategoryWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getProductCategoryStoragePlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductCategoryStoragePlugins(): array
    {
        return [
            new CategoryStoreWritePublisherPlugin(),
            new CategoryStoreWriteForPublishingPublisherPlugin(),
            new CategoryStoreDeletePublisherPlugin(),
            new ProductCategoryStorageCategoryWritePublisherPlugin(),
            new CategoryIsActiveAndCategoryKeyWritePublisherPlugin(),
            new ProductCategoryAttributeWritePublisherPlugin(),
            new CategoryAttributeNameWritePublisherPlugin(),
            new ProductCategoryNodeWritePublisherPlugin(),
            new CategoryUrlWritePublisherPlugin(),
            new CategoryUrlAndResourceCategorynodeWritePublisherPlugin(),
            new ProductCategoryWriteForPublishingPublisherPlugin(),
            new ProductCategoryWritePublisherPlugin(),
        ];
    }
}
```
</details>

2. Set up event listeners:

| PLUGIN                                      | SPECIFICATION                                                                                       | PREREQUISITES | NAMESPACE                                                                      |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------|
| ProductCategoryFilterStorageEventSubscriber | Registers listeners that publish category information to the storage when a related entity changes. |               | Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Event\Subscriber\ProductCategoryFilterStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductCategoryFilterStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

3. Set up trigger plugins:

| PLUGIN                                | SPECIFICATION                                                        | PREREQUISITES | NAMESPACE                                                         |
|---------------------------------------|----------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| ProductCategoryPublisherTriggerPlugin | Retrieves product categories based on the provided limit and offset. |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Publisher\ProductCategoryPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductCategoryPublisherTriggerPlugin(),
        ];
    }
}
```

4. Set up synchronization plugins:

| PLUGIN                                                 | SPECIFICATION                                                                                              | PREREQUISITES | NAMESPACE                                                                     |
|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| ProductCategorySynchronizationDataBulkRepositoryPlugin | Retrieves a product abstract category storage collection according to the provided offset, limit, and IDs. |               | Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Synchronization       |
| ProductCategoryFilterSynchronizationDataPlugin         | Retrieves a product category filter storage collection according to the provided offset, limit, and IDs.   |               | Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Synchronization\ProductCategorySynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Synchronization\ProductCategoryFilterSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductCategorySynchronizationDataBulkRepositoryPlugin(),
            new ProductCategoryFilterSynchronizationDataPlugin(),
        ];
    }
}
```

5. Set up, regenerate, and resync features:

| PLUGIN                                                 | SPECIFICATION                                      | PREREQUISITES | NAMESPACE                                                           |
|--------------------------------------------------------|----------------------------------------------------|---------------|---------------------------------------------------------------------|
| ProductCategoryFilterEventResourceQueryContainerPlugin | Allows populating an empty search table with data. |               | Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Event |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Event\ProductCategoryFilterEventResourceQueryContainerPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface[]
     */
    protected function getEventTriggerResourcePlugins()
    {
        return [
            new ProductCategoryFilterEventResourceQueryContainerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When a category product assignment is changed through ORM, make sure it is exported to Redis.

| STORAGE TYPE | TARGET ENTITY           | EXAMPLE EXPECTED DATA IDENTIFIER     |
|--------------|-------------------------|--------------------------------------|
| Redis        | ProductAbstractCategory | product_abstract_category:de:de_de:1 |
| Redis        | ProductCategoryFilter   | product_category_filter:8            |


**An expected data fragment example: `product_abstract_category:de:de_de:1`**

```json
{
    "id_product_abstract": 1,
    "categories": [
        {
            "category_id": 4,
            "category_node_id": 4,
            "name": "Digitale Kameras",
            "url": "/de/kameras-&-camcorders/digitale-kameras"
        },
        {
            "category_id": 2,
            "category_node_id": 2,
            "name": "Kameras & Camcorders",
            "url": "/de/kameras-&-camcorders"
        }
    ],
    "_timestamp": 1622146779.587637
}
```

<details open>
<summary markdown='span'>An expected data fragment example: `product_category_filter:8`</summary>

```json
{
   "id_category":8,
   "filter_data":{
      "filters":[
         {
            "isActive":true,
            "label":"label",
            "key":"label"
         },
         {
            "isActive":false,
            "label":"color",
            "key":"color"
         },
         {
            "isActive":false,
            "label":"storage_capacity",
            "key":"storage_capacity"
         },
         {
            "isActive":false,
            "label":"brand",
            "key":"brand"
         },
         {
            "isActive":false,
            "label":"touchscreen",
            "key":"touchscreen"
         },
         {
            "isActive":false,
            "label":"weight",
            "key":"weight"
         },
         {
            "isActive":false,
            "label":"merchant_name",
            "key":"merchant_name"
         },
         {
            "isActive":false,
            "label":"category",
            "key":"category"
         },
         {
            "isActive":false,
            "label":"price",
            "key":"price-DEFAULT-EUR-GROSS_MODE"
         },
         {
            "isActive":false,
            "label":"rating",
            "key":"rating"
         }
      ]
   }
}
```
</details>

{% endinfo_block %}


### 5) Set up behavior

Add the following plugins to your project:

| PLUGIN                                                                  | SPECIFICATION                                                                                                 | PREREQUISITES | NAMESPACE                                                                              |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------|
| ProductCategoryMapExpanderPlugin                                        | Expands `PageMapTransfer` with category map data.                                                               |               | Spryker\Zed\ProductCategorySearch\Communication\Plugin\ProductPageSearch\Elasticsearch |
| ProductCategoryPageDataExpanderPlugin                                   | Expands `ProductPageSearchTransfer` with category related data.                                               |               | Spryker\Zed\ProductCategorySearch\Communication\Plugin\ProductPageSearch               |
| ProductCategoryPageDataLoaderPlugin                                     | Expands `ProductPayloadTransfer.categories` with product category entities.                                   |               | Spryker\Zed\ProductCategorySearch\Communication\Plugin\ProductPageSearch               |
| ProductCategoryRelationReadPlugin                                       | Gets localized products abstract names by category.                                                           |               | Spryker\Zed\ProductCategory\Communication\Plugin\CategoryGui                           |
| RemoveProductCategoryRelationPlugin                                     | Removes relations between category and products.                                                              |               | Spryker\Zed\ProductCategory\Communication\Plugin                                       |
| ProductUpdateEventTriggerCategoryRelationUpdatePlugin                   | Triggers product update events for products that are assigned to the given category and its child categories. |               | Spryker\Zed\ProductCategory\Communication\Plugin\Category                              |
| ParentCategoryIdsProductAbstractCategoryStorageCollectionExpanderPlugin | Expands product categories with their parent category IDs.                                                    |               | Spryker\Client\CategoryStorage\Plugin\ProductCategoryStorage                           |

<details open>
<summary markdown='span'>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductCategorySearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductCategoryMapExpanderPlugin;
use Spryker\Zed\ProductCategorySearch\Communication\Plugin\ProductPageSearch\ProductCategoryPageDataExpanderPlugin;
use Spryker\Zed\ProductCategorySearch\Communication\Plugin\ProductPageSearch\ProductCategoryPageDataLoaderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new ProductCategoryMapExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
     */
    protected function getDataExpanderPlugins()
    {
        $dataExpanderPlugins = [];
        $dataExpanderPlugins[ProductPageSearchConfig::PLUGIN_PRODUCT_CATEGORY_PAGE_DATA] = new ProductCategoryPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
     */
    protected function getDataLoaderPlugins()
    {
        return [
            new ProductCategoryPageDataLoaderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that the product abstract contains the category property in Elasticsearch:

**Data fragment**

```json
{
   "_id":"product_abstract:at:de_de:42",
   "_source":{
      "store":"AT",
      "locale":"de_DE",
      "type":"product_abstract",
      "is-active":true,
      "search-result-data":{
         "id_product_abstract":42,
         "abstract_sku":"042",
         "abstract_name":"Samsung Galaxy S7",
         "url":"/de/samsung-galaxy-s7-42",
         "type":"product_abstract",
         "add_to_cart_sku":"042_31040075",
      },
      "category":{
         "all-parents":[
            11,
            12,
            1
         ],
         "direct-parents":[
            "12"
         ]
      },
   }
}
```

{% endinfo_block %}

**src/Pyz/Zed/CategoryGui/CategoryGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CategoryGui;

use Spryker\Zed\CategoryGui\CategoryGuiDependencyProvider as SpykerCategoryGuiDependencyProvider;
use Spryker\Zed\ProductCategory\Communication\Plugin\CategoryGui\ProductCategoryRelationReadPlugin;

/**
 * @method \Spryker\Zed\CategoryGui\CategoryGuiConfig getConfig()
 */
class CategoryGuiDependencyProvider extends SpykerCategoryGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryRelationReadPluginInterface[]
     */
    protected function getCategoryRelationReadPlugins(): array
    {
        return [
            new ProductCategoryRelationReadPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

1. In the Back Office, navigate to **Catalog&nbsp;<span aria-label="and then">></span> Category**.
2. For any category of your choice, in **Actions**, select **Delete**.
3. On the **DELETE CATEGORY: `{CATEGORY_NAME}`** page that opens, make sure the **Products to be de-assigned** field is present. The `{CATEGORY_NAME}` placeholder stands for the name of the category that you choose in step 2.

**src/Pyz/Zed/Category/CategoryDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Category;

use Spryker\Zed\Category\CategoryDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\ProductCategory\Communication\Plugin\Category\ProductUpdateEventTriggerCategoryRelationUpdatePlugin;
use Spryker\Zed\ProductCategory\Communication\Plugin\RemoveProductCategoryRelationPlugin;

class CategoryDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryRelationDeletePluginInterface[]
     */
    protected function getRelationDeletePluginStack(): array
    {
        $deletePlugins = array_merge(
            [
                new RemoveProductCategoryRelationPlugin(),
            ],
            parent::getRelationDeletePluginStack()
        );

        return $deletePlugins;
    }

    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryRelationUpdatePluginInterface[]
     */
    protected function getRelationUpdatePluginStack(): array
    {
        return array_merge(
            [
                new ProductUpdateEventTriggerCategoryRelationUpdatePlugin(),
            ],
            parent::getRelationUpdatePluginStack()
        );
    }
}
```

Make sure that, after updating or removing a category in the Back Office, the product assignments are changed respectively.

{% endinfo_block %}

**src/Pyz/Client/ProductCategoryStorage/ProductCategoryStorageDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ProductCategoryStorage;

use Spryker\Client\CategoryStorage\Plugin\ProductCategoryStorage\ParentCategoryIdsProductAbstractCategoryStorageCollectionExpanderPlugin;
use Spryker\Client\ProductCategoryStorage\ProductCategoryStorageDependencyProvider as SprykerProductCategoryStorageDependencyProvider;

class ProductCategoryStorageDependencyProvider extends SprykerProductCategoryStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ProductCategoryStorageExtension\Dependency\Plugin\ProductAbstractCategoryStorageCollectionExpanderPluginInterface>
     */
    protected function getProductAbstractCategoryStorageCollectionExpanderPlugins(): array
    {
        return [
            new ParentCategoryIdsProductAbstractCategoryStorageCollectionExpanderPlugin(),
        ];
    }
}
```

## Install feature frontend

Follow the steps below to install the Product + Category feature frontend.

### Prerequisites

Install the required features:

| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                                    |
|---------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core        | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)               |
| Category Management | {{site.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |
| Product             | {{site.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                         |


### 1) Install the required modules

```bash
composer require spryker-feature/product:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                          |
|-----------------------|---------------------------------------------|
| ProductCategoryWidget | vendor/spryker-shop/product-category-widget |

{% endinfo_block %}

### 2) Set up widgets

Register the following global widgets:

| WIDGET                                 | DESCRIPTION                                                  | NAMESPACE                                     |
|----------------------------------------|--------------------------------------------------------------|-----------------------------------------------|
| ProductBreadcrumbsWithCategoriesWidget | Displays category breadcrumbs on the product details page. | SprykerShop\Yves\ProductCategoryWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php   

namespace Pyz\Yves\ShopApplication;   

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\ProductBundleWidget\Widget\ProductBundleItemsMultiCartItemsListWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	* @return string[]
	*/
	protected function getGlobalWidgets(): array
	{
		return [
			ProductBreadcrumbsWithCategoriesWidget::class,
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that category breadcrumbs are displayed on the *Product Details* page.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE                       | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                 |
|-------------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Category Management Feature   | &check;                                | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html)                                                |
| Product Management Feature    | &check;                                | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                                                        |
| Glue API: Category Management |                                  | [Glue API: Category management feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-category-management-glue-api.html)                    |
| Catalog + Category Management |                                  | [Install the Catalog + Category Management feature](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-category-management-feature.html) |
| CMS + Category Management     |                                  | [Install the CMS + Category Management feature](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-category-management-feature.html)   |
