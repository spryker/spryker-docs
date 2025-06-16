

This document describes how to update the `ProductCategoryStorage` module.

## Upgrading from version 1.* to 2.*

Version `2.*` of the `ProductCategoryStorage` module changes the storage data structure to maintain the relation of categories to stores.

*Estimated migration time: 1 hour.*

To upgrade the `ProductCategoryStorage` module from version `1.*` to `2.*`:

1. Upgrade the `ProductCategoryStorage` module to version `2.0.0`:

```bash
composer require spryker/product-category-storage:"^2.0.0" --update-with-dependencies
```

2. On the project level in `Pyz/Zed/ProductCategoryStorage/Persistence/Propel/Schema/spy_product_category_storage.schema.xml`, remove the synchronization behavior setup from the `spy_product_abstract_category_storage` table.

3. Update the database schema and the generated classes:

```bash
console propel:install
console transfer:generate
```

4. From `Pyz\Zed\Event\EventDependencyProvider`, remove the deprecated subscriber: `ProductCategoryStorageEventSubscriber`.
5. From `Pyz\EventBehavior\EventBehaviorDependencyProvider`, remove the deprecated plugin:`ProductCategoryEventResourceQueryContainerPlugin` .
6. Add the new plugins:

<details><summary>Pyz\Zed\Publisher\PublisherDependencyProvider</summary>

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

7. Add the trigger plugin to `Pyz\Zed\Publisher\PublisherDependencyProvider`:

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

8. From `Pyz\Zed\Synchronization\SynchronizationDependencyProvider`, remove the deprecated plugin: `ProductCategorySynchronizationDataPlugin`.

9. Add the new synchronization plugin to `Pyz\Zed\Synchronization\SynchronizationDependencyProvider`:

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Synchronization\ProductCategorySynchronizationDataBulkRepositoryPlugin;
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
        ];
    }
}
```

10. Refill storage:

    1. Truncate the `spy_product_abstract_category_storage` database table:

    ```sql
    TRUNCATE TABLE spy_product_abstract_category_storage;
    ```
    2. Remove all the data:

    ```bash
    console sync:data product_abstract_category
    ```
    3. Trigger the event:

    ```bash
    console publish:trigger-events -r product_abstract_category
    ```
    4. Sync all table storage data to the storage:

    ```bash
    console sync:data product_abstract_category
    ```

{% info_block warningBox "Verification" %}

Ensure that the data in the `spy_product_abstract_category_storage` database table is divided by stores.

{% endinfo_block %}
