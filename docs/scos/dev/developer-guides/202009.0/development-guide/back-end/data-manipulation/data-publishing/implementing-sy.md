---
title: Implementing synchronization plugins
originalLink: https://documentation.spryker.com/v6/docs/implementing-synchronization-plugins
redirect_from:
  - /v6/docs/implementing-synchronization-plugins
  - /v6/docs/en/implementing-synchronization-plugins
---

Sometimes it’s needed to manually [synchronize or re-syncrhonize](https://documentation.spryker.com/docs/publish-and-synchronize-repeated-export#published-data-regeneration) the published model data with Redis or ElasticSearch. To do that, you need to implement a synchronization plugin.

Follow the steps below to implement and register a synchronization plugin.

1.  Implement the synchronization(sync) plugin:

<details open>
    <summary>Pyz\Zed\HelloWorldStorage\Communication\Plugin\Synchronization</summary>
    
```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Communication\Plugin\Synchronization;

use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataBulkRepositoryPluginInterface;

/**
 * @method \Spryker\Zed\HelloWorldStorage\Business\HelloWorldStorageFacadeInterface getFacade()
 * @method \Spryker\Zed\HelloWorldStorage\Communication\HelloWorldStorageCommunicationFactory getFactory()
 * @method \Spryker\Zed\HelloWorldStorage\HelloWorldStorageConfig getConfig()
 * @method \Spryker\Zed\HelloWorldStorage\Persistence\HelloWorldStorageRepositoryInterface getRepository()
 */
class HelloWorldSynchronizationDataRepositoryPlugin extends AbstractPlugin implements SynchronizationDataBulkRepositoryPluginInterface
{
    /**
     * @return string
     */
    public function getResourceName(): string
    {
        return HelloWorldStorageConfig::HELLO_WORLD_RESOURCE_NAME;
    }

    /**
     * @return bool
     */
    public function hasStore(): bool
    {
        return false;
    }

    /**
     * @param int $offset
     * @param int $limit
     * @param int[] $ids
     *
     * @return \Generated\Shared\Transfer\SynchronizationDataTransfer[]
     */
    public function getData(int $offset, int $limit, array $ids = []): array
    {
        return $this->getFacade()->findHelloWorldStorageDataTransferByIds($offset, $limit, $ids);
    }

    /**
     * @return array
     */
    public function getParams(): array
    {
        return [];
    }

    /**
     * @return string
     */
    public function getQueueName(): string
    {
        return HelloWorldStorageConfig::SYNC_STORAGE_HELLO_WORLD;
    }

    /**
     * @return string|null
     */
    public function getSynchronizationQueuePoolName(): ?string
    {
        return $this->getFactory()->getConfig()->getHelloWorldStorageSynchronizationPoolName();
    }
}
```

</details>


Find the method descriptions below:

*   `HelloWorldSynchronizationDataRepositoryPlugin::getResourceName()` - defines a resource name of the storage or search module for key generation.

*   `HelloWorldSynchronizationDataRepositoryPlugin::hasStore()` - defines if the entity implements a multi-store concept.

*   `HelloWorldSynchronizationDataRepositoryPlugin::getData()` - retrieves a collection of sync transfers based on the provided offset and limit.

*   `HelloWorldSynchronizationDataRepositoryPlugin::getParams()` - defines additional sync parameters for Redis or ElasticSearch.

*   `HelloWorldSynchronizationDataRepositoryPlugin::getQueueName()` - defines a queue name for synchonization.

*   `HelloWorldSynchronizationDataRepositoryPlugin::getSynchronizationQueuePoolName()` \- defines the name of the synchronization queue pool for broadcasting messages.

{% info_block infoBox %}

Make sure to fulfill the requirements:

1.  The resource name should be the same as in the Propel schema definition.

2.  The plugin has to implement`\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataBulkRepositoryPluginInterface`.

{% endinfo_block %}

2. Register the plugin in `\Pyz\Zed\Synchronization\SynchronizationDependencyProvider.`

```php
<?php


namespace Pyz\Zed\Synchronization;
 
...
use Pyz\Zed\HelloWorldStorage\Communication\Plugin\Synchronization\HelloWorldSynchronizationDataRepositoryPlugin;
...

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
        ...
            new HelloWorldSynchronizationDataRepositoryPlugin(),
        ...    
        ];
```
