

This document describes how to upgrade the `CategoryPageSearch` module.


## Upgrading from version 1.* to 2.*

This section describes how to upgrade the `CategoryPageSearch` from version `1.*` to `2.*`.

Version 2.* of the `CategoryPageSearch` module changes the storage data structure to maintain the relations of categories to stores.

_Estimated migration time: 1 hour._ 

To upgrade to the new version of the module, do the following:

1. Install the `ProductCategorySearch` module:

```bash    
composer require spryker/product-category-search
```

2. Upgrade the `CategoryPageSearch` module to version `2.0.0`:

```bash    
composer require spryker/category-page-search:"^2.0.0" --update-with-dependencies
```

3. From the `spy_category_node_page_search` table on the project level in `Pyz/Zed/CategoryPageSearch/Persistence/Propel/Schema/spy_category_page_search.schema.xml`, remove the synchronization behavior setup.

4. Update the database schema and the generated classes:

```bash    
console propel:install
console transfer:generate
```

5. In the `CategoryPageSearch` module, replace the deprecated plugins:

* `ProductCategoryPageDataLoaderExpanderPlugin`
* `CategoryPageDataLoaderPlugin`
* `ProductCategoryMapExpanderPlugin`

<details><summary>Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider</summary>

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
     * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
     */
    protected function getDataExpanderPlugins()
    {
        $dataExpanderPlugins = [];

        $dataExpanderPlugins[ProductPageSearchConfig::PLUGIN_PRODUCT_CATEGORY_PAGE_DATA] = new ProductCategoryPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }

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

6. From `Pyz\Zed\Event\EventDependencyProvider`, remove the deprecated subscriber: `CategoryPageSearchEventSubscriber`.

7. From `Pyz\EventBehavior\EventBehaviorDependencyProvider`, remove the deprecated plugin: `CategoryPageEventResourceQueryContainerPlugin`.

8. Add the new plugins:

<details><summary>Pyz\Zed\Publisher\PublisherDependencyProvider</summary>

```php    
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\Category\CategoryDeletePublisherPlugin as CategoryPageSearchCategoryDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\Category\CategoryWritePublisherPlugin as CategoryPageSearchCategoryWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeDeletePublisherPlugin as CategoryPageSearchCategoryAttributeDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeWritePublisherPlugin as CategoryPageSearchCategoryAttributeWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryNode\CategoryNodeDeletePublisherPlugin as CategoryPageSearchCategoryNodeDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryNode\CategoryNodeWritePublisherPlugin as CategoryPageSearchCategoryNodeWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWriteForPublishingPublisherPlugin as CategoryStoreSearchWriteForPublishingPublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWritePublisherPlugin as CategoryStoreSearchWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateDeletePublisherPlugin as CategoryPageSearchCategoryTemplateDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateWritePublisherPlugin as CategoryPageSearchCategoryTemplateWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryPagePublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getCategoryPageSearchPlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getCategoryPageSearchPlugins(): array
    {
        return [
            new CategoryStoreSearchWritePublisherPlugin(),
            new CategoryStoreSearchWriteForPublishingPublisherPlugin(),
            new CategoryPageSearchCategoryDeletePublisherPlugin(),
            new CategoryPageSearchCategoryWritePublisherPlugin(),
            new CategoryPageSearchCategoryAttributeDeletePublisherPlugin(),
            new CategoryPageSearchCategoryAttributeWritePublisherPlugin(),
            new CategoryPageSearchCategoryNodeDeletePublisherPlugin(),
            new CategoryPageSearchCategoryNodeWritePublisherPlugin(),
            new CategoryPageSearchCategoryTemplateDeletePublisherPlugin(),
            new CategoryPageSearchCategoryTemplateWritePublisherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new CategoryPagePublisherTriggerPlugin(),
        ];
    }
}
```
</details>

9. From `Pyz\Zed\Synchronization\SynchronizationDependencyProvider`, remove the deprecated plugin:`CategoryPageSynchronizationDataPlugin`.

10. Add the new synchronization plugin to `Pyz\Zed\Synchronization\SynchronizationDependencyProvider`:

```php    
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Synchronization\CategoryPageSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CategoryPageSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

11. Refill storage:

    1.  Truncate the `spy_category_node_page_search` database table:

    ```sql
    TRUNCATE TABLE spy_category_node_page_search;
    ```
     2.  Remove all the data:

    ```bash
    console sync:data category_node
    ```
    3.  Trigger the event:

    ```bash
    console publish:trigger-events -r category_node
    ```
    4.  Sync all table storage data to the storage:

    ```bash
    console sync:data category_node
    ```

{% info_block warningBox "Verification" %}

Ensure that the data in the `spy_category_node_page_search` database table is divided by stores.

{% endinfo_block %}

## Upgrading from Version 1.4.* to Version 1.5.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html#upgrading-from-version-89-to-version-810).

{% endinfo_block %}

To upgrade to the new version of the module, do the following:

1. Update the modules using Composer:

```bash
composer update spryker/category-page-search
```

2. Remove deprecated plugin usages listed below (in case it is used) from `Pyz\Zed\Search\SearchDependencyProvider`:

```bash
Spryker\Zed\CategoryPageSearch\Communication\Plugin\Search\CategoryNodeDataPageMapBuilder
```
