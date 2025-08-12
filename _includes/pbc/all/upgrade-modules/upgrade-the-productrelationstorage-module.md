

## Upgrading from version 1.* to 2.0.0

From version 1.* we have changed the storage data structure to contain store related records.

*Estimated migration time: 1 hour.*

To upgrade to the new version of the module, do the following:

1. Upgrade the ProductRelationStorage module to version 2.0.0:

```bash
composer require spryker/product-relation-storage:"^2.0.0" --update-with-dependencies
```

2. Clear storage:

    1. Truncate the `spy_product_abstract_relation_storage` database table:

    ```bash
    TRUNCATE TABLE spy_product_abstract_relation_storage
    ```

    2. Remove all keys from key-value storage (Redis or Valkey):

    ```bash
    redis-cli --scan --pattern kv:product_abstract_relation:'*' | xargs redis-cli unlink
    ```

3. Update the database schema and generated classes:

    1. Run the database migration:

    ```bash
    console propel:install
    ```

    2. Generate transfer objects:

    ```bash
    console transfer:generate
    ```

4. Add Publisher plugins to `Pyz/Zed/Published/PublisherDependencyProvider.php`:

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryPublisherTriggerPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWriteForPublishingPublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWritePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationProductAbstract\ProductRelationProductAbstractWritePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationPublisherTriggerPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationStore\ProductRelationStoreWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            ...
            $this->getProductRelationStoragePlugins()
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            ...
            new ProductRelationPublisherTriggerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductRelationStoragePlugins(): array
    {
        return [
            new ProductRelationWritePublisherPlugin(),
            new ProductRelationWriteForPublishingPublisherPlugin(),
            new ProductRelationProductAbstractWritePublisherPlugin(),
            new ProductRelationStoreWritePublisherPlugin(),
        ];
    }
}
```

5. In `Pyz/Zed/Synchronization/SynchronizationDependencyProvider`, replace  `ProductRelationSynchronizationDataPlugin` with `ProductRelationSynchronizationDataRepositoryPlugin`:

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductGroupStorage\Communication\Plugin\Synchronization\ProductGroupSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductRelationSynchronizationDataRepositoryPlugin(),
        ];
    }
}
```

6. Populate storage with the new version:

    1. Assign product relations to the stores to publish it to the storage.
    2. Get all the data about product relations from the database and publish it into key-value storage (Redis or Valkey):

    ```bash
    console event:trigger -r product_abstract_relation
    ```

    {% info_block infoBox %}

    Make sure that the worker picks up all events. You can start the worker manually if needed:

    ```bash
    console queue:worker:start
    ```

    {% endinfo_block %}
