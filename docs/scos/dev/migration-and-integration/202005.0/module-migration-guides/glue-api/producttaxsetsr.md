---
title: Migration guide - ProductTaxSetsRestApi
originalLink: https://documentation.spryker.com/v5/docs/producttaxsetsrestapi-migration-guide
redirect_from:
  - /v5/docs/producttaxsetsrestapi-migration-guide
  - /v5/docs/en/producttaxsetsrestapi-migration-guide
---

## Upgrading from Version 1.* to Version 2.*
ProductTaxSetsRestApi version 2 introduces performance improvements that allow getting tax set data from the Redis storage instead of multiple Zed calls.

These improvements do not change the request and response format.

Run the console command `vendor/bin/console propel:install` to migrate new tables and generate Propel models.

Run the console command `vendor/bin/console transfer:generate` to generate new transfer objects.

Find or create `RabbitMqConfig` in a project.

Find the `getQueueOptions` method and change it.

RabbitMqConfig.php

```php
<?php
  
namespace Pyz\Client\RabbitMq;
 
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\TaxProductStorage\TaxProductStorageConfig;
use Spryker\Shared\TaxStorage\TaxStorageConfig;
 
class RabbitMqConfig extends SprykerRabbitMqConfig
{
	/**
	* @return \ArrayObject
	*/
	protected function getQueueOptions(): array
	{
		...
		$queueOptionCollection->append($this->createQueueOption(TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE, TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_ERROR_QUEUE));
		$queueOptionCollection->append($this->createQueueOption(TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE, TaxStorageConfig::TAX_SET_SYNC_STORAGE_ERROR_QUEUE));
		...
	}
}
```

Find or create `GlueApplicationDependencyProvider` in a project.

Find the `getResourceRelationshipPlugins` method and change it.

GlueApplicationDependencyProvider.php

```php
<?php
  
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductTaxSetsRestApi\Plugin\GlueApplication\ProductTaxSetByProductAbstractSkuResourceRelationshipPlugin;
use Spryker\Glue\ProductTaxSetsRestApi\Plugin\GlueApplication\ProductTaxSetsResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* {@inheritdoc}
	*
	* @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
	*
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
	*/
	protected function getResourceRelationshipPlugins(
		ResourceRelationshipCollectionInterface $resourceRelationshipCollection
	): ResourceRelationshipCollectionInterface {
		$resourceRelationshipCollection->addRelationship(
			ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
			new ProductTaxSetByProductAbstractSkuResourceRelationshipPlugin()
		);
	}
}
```

Find and change `TaxWriterStep` in a project.

TaxWriterStep.php

```php
<?php
  
 use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
 use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
 use Spryker\Zed\Tax\Dependency\TaxEvents;
 
 class TaxWriterStep extends PublishAwareStep implements DataImportStepInterface
 {
    public const BULK_SIZE = 100;
    public function execute(DataSetInterface $dataSet)
    {
        ...
        $this->addShipmentTax($taxSetEntity);
        $this->addPublishEvents(TaxEvents::TAX_SET_PUBLISH, $taxSetEntity->getIdTaxSet());
    }
 }
```

Find or create `EventDependencyProvider` in a project.

Find the `getEventSubscriberCollection` method and change it.

EventDependencyProvider.php

```php
<?php
  
 namespace Pyz\Zed\Event;
 
 use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
 use Spryker\Zed\TaxProductStorage\Communication\Plugin\Event\Subscriber\TaxProductStorageSubscriber;
 use Spryker\Zed\TaxStorage\Communication\Plugin\Event\Subscriber\TaxStorageSubscriber;
 
 class EventDependencyProvider extends SprykerEventDependencyProvider
 {
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        ...
        $eventSubscriberCollection->add(new TaxStorageSubscriber());
        $eventSubscriberCollection->add(new TaxProductStorageSubscriber());
        ...
    }
 }
```

Find or create `QueueDependencyProvider` in a project.

Find the `getProcessorMessagePlugins` method and change it.

QueueDependencyProvider.php

```php
<?php
  
 namespace Pyz\Zed\Event;
 
 use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
 use Spryker\Shared\TaxProductStorage\TaxProductStorageConfig;
 use Spryker\Shared\TaxStorage\TaxStorageConfig;
 
 class QueueDependencyProvider extends SprykerDependencyProvider
 {
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ...
            TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

Find or create `QueueDependencyProvider` in a project.

Find the `getProcessorMessagePlugins` method and change it.

QueueDependencyProvider.php

```php
<?php
  
 namespace Pyz\Zed\Event;
 
 use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
 use Spryker\Shared\TaxProductStorage\TaxProductStorageConfig;
 use Spryker\Shared\TaxStorage\TaxStorageConfig;
 
 class QueueDependencyProvider extends SprykerDependencyProvider
 {
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ...
            TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

Find or create `SynchronizationDependencyProvider` in a project.

Find the `getProcessorMessagePlugins` method and change it.

SynchronizationDependencyProvider.php

```php
<?php
  
 namespace Pyz\Zed\Event;
 
 use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
 use Spryker\Zed\TaxProductStorage\Communication\Plugin\Synchronization\TaxProductSynchronizationDataPlugin;
 use Spryker\Zed\TaxStorage\Communication\Plugin\Synchronization\TaxSynchronizationDataPlugin;
 
 class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
 {
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ...
            TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

_Estimated migration time: 0.5 hour_
