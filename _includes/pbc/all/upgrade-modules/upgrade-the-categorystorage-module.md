

This document describes how to update the `CategoryStorage` module.

## Upgrading from version 1.* to 2.*


Version `2.*` of the `CategoryStorage` module changes the storage data structure to maintain the relation of categories to stores.

_Estimated migration time: 1 hour._ 

To upgrade the module from version `1.*` to `2.*`:

1. Upgrade the `CategoryStorage` module to version `2.0.0`:

```bash
composer require spryker/category-storage:"^2.0.0" --update-with-dependencies
```

2. On the project level in `Pyz/Zed/CategoryStorage/Persistence/Propel/Schema/spy_category_storage.schema.xml`, remove the synchronization behavior setup from the `spy_category_tree_storage` and `spy_category_node_storage` tables.

3. Update the database schema and the generated data transfer classes:

```bash    
console propel:install
console transfer:generate
```

4. From `Pyz\Zed\Event\EventDependencyProvider`, remove the deprecated subscriber: `CategoryStorageEventSubscriber`.

5. From `Pyz\EventBehavior\EventBehaviorDependencyProvider`, remove the deprecated plugins:

   - `CategoryTreeEventResourceQueryContainerPlugin`
   - `CategoryNodeEventResourceQueryContainerPlugin`

6. Add the new plugins:

<details><summary>Pyz\Zed\Publisher\PublisherDependencyProvider</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\Category\CategoryDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\Category\CategoryWritePublisherPlugin as CategoryStoreCategoryWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNode\CategoryNodeDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNode\CategoryNodeWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWriteForPublishingPublisherPlugin as CategoryStoreStorageWriteForPublishingPublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWritePublisherPlugin as CategoryStoreStorageWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTree\CategoryTreeDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTree\CategoryTreeWriteForPublishingPublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\ParentWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNodePublisherTriggerPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTreePublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getCategoryStoragePlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getCategoryStoragePlugins(): array
    {
        return [
            new CategoryStoreStorageWritePublisherPlugin(),
            new CategoryStoreStorageWriteForPublishingPublisherPlugin(),
            new CategoryTreeWriteForPublishingPublisherPlugin(),
            new CategoryDeletePublisherPlugin(),
            new CategoryStoreCategoryWritePublisherPlugin(),
            new CategoryAttributeDeletePublisherPlugin(),
            new CategoryAttributeWritePublisherPlugin(),
            new CategoryNodeDeletePublisherPlugin(),
            new CategoryNodeWritePublisherPlugin(),
            new CategoryTemplateDeletePublisherPlugin(),
            new CategoryTemplateWritePublisherPlugin(),
            new CategoryTreeDeletePublisherPlugin(),
            new ParentWritePublisherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new CategoryNodePublisherTriggerPlugin(),
            new CategoryTreePublisherTriggerPlugin(),
        ];
    }
}
```    
</details>

7. From `Pyz\Zed\Synchronization\SynchronizationDependencyProvider`, remove the deprecated plugins:
   - `CategoryNodeSynchronizationDataPlugin`
   - `CategoryTreeSynchronizationDataPlugin`

8. Add the new synchronization plugins:

<details><summary>Pyz\Zed\Synchronization\SynchronizationDependencyProvider</summary>

```php    
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization\CategoryNodeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization\CategoryTreeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CategoryTreeSynchronizationDataBulkRepositoryPlugin(),
            new CategoryNodeSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```
</details>

9. Refill storage:

    1. Truncate the `spy_category_node_storage` and `spy_category_tree_storage` database tables:

    ```sql    
    TRUNCATE TABLE APPROVED;
    TRUNCATE TABLE spy_category_tree_storage;
    ```

    2. Remove all the data:

    ```bash
    console sync:data category_node
    console sync:data category_tree
    ```

    3. Trigger the events:

    ```bash
    console publish:trigger-events -r category_node
    console publish:trigger-events -r category_tree
    ```

    4. Sync all table storage data to the storage:

    ```bash
    console sync:data category_node
    console sync:data category_tree
    ```

{% info_block warningBox "Verification" %}

Ensure that the data in the `spy_category_node_storage` and `spy_category_tree_storage` database tables is divided by stores.

{% endinfo_block %}
