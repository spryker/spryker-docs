---
title: Migration guide - ProductLabelStorage
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productlabelstorage
originalArticleId: 2ef8ed0a-3efe-4244-9724-1addccd72226
redirect_from:
  - /2021080/docs/migration-guide-productlabelstorage
  - /2021080/docs/en/migration-guide-productlabelstorage
  - /docs/migration-guide-productlabelstorage
  - /docs/en/migration-guide-productlabelstorage
  - /v6/docs/migration-guide-productlabelstorage
  - /v6/docs/en/migration-guide-productlabelstorage
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productlabelstorage.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productlabelstorage.html
---

## Upgrading from Version 1.* to Version 2.*

Version 2.* of the ProductLabelStorage module changes the storage data structure to maintain relations of product labels to stores.

To upgrade to the new version of the module, do the following:
1. Upgrade the ProductLabelStorage module to a new version:
```bash
composer require spryker/product-label-storage:"^2.0.0" --update-with-dependencies
```
2. Prepare the project for changes:
    2.1. Remove synchronization behavior setup from the `spy_product_label_dictionary_storage` table on the project level in `src/Pyz/Zed/ProductLabelStorage/Persistence/Propel/Schema/spy_product_label_storage.schema.xml`
    2.2. Add the configuration on the project level in `src/Pyz/Zed/ProductLabelStorage/ProductLabelStorageConfig.php`:

```php
 <?php

namespace Pyz\Zed\ProductLabelStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductLabelStorage\ProductLabelStorageConfig as SprykerProductLabelStorageConfig;

class ProductLabelStorageConfig extends SprykerProductLabelStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductAbstractLabelSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getProductLabelDictionarySynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getProductAbstractLabelEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }

    /**
     * @return string|null
     */
    public function getProductLabelDictionaryEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```
    2.3. Update the database schema and the generated data transfer classes:
```bash
console propel:install
console transfer:generate
```
    2.4. Stop the scheduler:
```bash
console scheduler:suspend
```
3. Remove the deprecated plugins from:
   a `Pyz\Zed\Event\EventDependencyProvider`
```php
Spryker\Zed\ProductLabelStorage\Communication\Plugin\Event\Subscriber\ProductLabelStorageEventSubscriber
```
   b. `Pyz\Zed\EventBehavior\EventBehaviorDependencyProvider`
```php
 Spryker\Zed\ProductLabelStorage\Communication\Plugin\Event\ProductAbstractLabelEventResourceQueryContainerPlugin
Spryker\Zed\ProductLabelStorage\Communication\Plugin\Event\ProductLabelDictionaryEventResourceQueryContainerPlugin
```
   c. `Pyz/Zed/Synchronization/SynchronizationDependencyProvider`
```php
Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductAbstractLabelSynchronizationDataPlugin
Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductLabelDictionarySynchronizationDataPlugin
```
4. Add the new plugins to:
    a. `Pyz\Zed\Publisher\PublisherDependencyProvider`
 ```php
<?php

namespace Pyz\Zed\Publisher;

...
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductAbstractLabel\ProductAbstractLabelWritePublisherPlugin as ProductAbstractLabelStorageWritePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductAbstractLabelPublisherTriggerPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionary\ProductLabelDictionaryDeletePublisherPlugin as ProductLabelDictionaryStorageDeletePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionary\ProductLabelDictionaryWritePublisherPlugin as ProductLabelDictionaryStorageWritePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionaryPublisherTriggerPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelProductAbstract\ProductLabelProductAbstractWritePublisherPlugin as ProductLabelProductAbstractStorageWritePublisherPlugin;
...
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
            $this->getProductLabelStoragePlugins(),
            ...
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            ...
            new ProductAbstractLabelPublisherTriggerPlugin(),
            new ProductLabelDictionaryPublisherTriggerPlugin(),
            ...
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductLabelStoragePlugins(): array
    {
        return [
            new ProductAbstractLabelStorageWritePublisherPlugin(),
            new ProductLabelProductAbstractStorageWritePublisherPlugin(),
            new ProductLabelDictionaryStorageWritePublisherPlugin(),
            new ProductLabelDictionaryStorageDeletePublisherPlugin(),
        ];
    }
}
```
b. `Pyz\Zed\Synchronization\SynchronizationDependencyProvider`
```php
<?php

namespace Pyz\Zed\Synchronization;

...
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductAbstractLabelSynchronizationDataRepositoryPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductLabelDictionarySynchronizationDataRepositoryPlugin;
...
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            ...
            new ProductAbstractLabelSynchronizationDataRepositoryPlugin(),
            new ProductLabelDictionarySynchronizationDataRepositoryPlugin(),
            ...
        ];
    }
}
```
5. Refill storage:
    5.1. Truncate the `spy_product_label_dictionary_storage` database table:
```
TRUNCATE TABLE spy_product_label_dictionary_storage;
```
    5.2. Start the scheduler:
 ```bash
console scheduler:resume
```
    5.3. Remove all the stored data:

```bash
console sync:data product_label_dictionary
 ```

5.4. Trigger the product label events to create new dictionary data:

```bash
console publish:trigger-events -r product_label_dictionary -i=all
```
5.5. Sync all the dictionary data to the storage:
```bash
console sync:data product_label_dictionary
```

*Estimated migration time: 1 hour.*
