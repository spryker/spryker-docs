---
title: Implementing Publish and Synchronization
description: To implement Publish and Synchronize in your code, you need to perform the following steps
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization-reference
originalArticleId: cdb95c33-1519-4323-9d27-7cba32a8ac82
redirect_from:
  - /2021080/docs/publish-and-synchronization-reference
  - /2021080/docs/en/publish-and-synchronization-reference
  - /docs/publish-and-synchronization-reference
  - /docs/en/publish-and-synchronization-reference
  - /v6/docs/publish-and-synchronization-reference
  - /v6/docs/en/publish-and-synchronization-reference
  - /v5/docs/publish-and-synchronization-reference
  - /v5/docs/en/publish-and-synchronization-reference
  - /v4/docs/publish-and-synchronization-reference
  - /v4/docs/en/publish-and-synchronization-reference
  - /v3/docs/publish-and-synchronization-reference
  - /v3/docs/en/publish-and-synchronization-reference
  - /v2/docs/publish-and-synchronization-reference
  - /v2/docs/en/publish-and-synchronization-reference
  - /v1/docs/publish-and-synchronization-reference
  - /v1/docs/en/publish-and-synchronization-reference
---

To implement *Publish and Synchronize* in your code, you need to perform the following steps:

## 1. Add Publish Events
*Publish* and *Synchronize* are event-driven. To start publishing data to the frontend, an event must be triggered. For this purpose, you need to add events for all changes you want to synchronize. For information on how to add events to your module, see [Adding Events](/docs/scos/dev/back-end-development/data-manipulation/event/adding-events.html).

For example, the following code creates an event once an entity is created, updated or deleted in the spy_product_abstract table (see `data/shop/development/current/vendor/spryker/product/src/Spryker/Zed/Product/Dependency/ProductEvents.php`):

```php
/**
 * Specification:
 * - Represents spy_product_abstract entity creation.
 *
 * @api
 */
const ENTITY_SPY_PRODUCT_ABSTRACT_CREATE = "Entity.spy_product_abstract.create";

/**
 * Specification:
 * - Represents spy_product_abstract entity changes.
 *
 * @api
 */
const ENTITY_SPY_PRODUCT_ABSTRACT_UPDATE = "Entity.spy_product_abstract.update";

/**
 * Specification:
 * - Represents spy_product_abstract entity deletion.
 *
 * @api
 */
const ENTITY_SPY_PRODUCT_ABSTRACT_DELETE = "Entity.spy_product_abstract.delete";
```

The events will be posted to queue **event** in RabbitMq.

## 2. Create Publication Queue
Now, you need to create a publication queue. It will be used to synchronize published data to the frontend. It is recommended to have a separate queue for each *Redis* or *Elasticsearch* entity. For information on how to create a queue, see [Set Up a "Hello World" Queue](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/handling-data-with-publish-and-synchronization.html), section **Creating a Simple Queue**.

{% info_block infoBox %}

As a naming convention, names of queues that synchronize data to Redis start with **sync.storage**, and names of queues that synchronize data to Elasticsearch start with **sync.search**.

{% endinfo_block %}

We implemented 2 message processor plugins for synchronizing data to the frontend:

* `SynchronizationStorageQueueMessageProcessorPlugin` - for synchronizing data to Redis, and
* `SynchronizationSearchQueueMessageProcessorPlugin` - for synchronizing data to Elasticsearch.

You need to map your new queue to one of the plugins depending on which storage you want to use it for. The queues must be mapped in `QueueDependencyProvider::getProcessorMessagePlugins()`. For details, see section **Queue Message Processor Plugin** in the *Set Up a "Hello World" Queue* document.

{% info_block infoBox %}

It is also good practice to create an error queue for your publication queue, where errors will be posted. The error queue must be registered in `RabbitMqConfig::getQueueOptions()`. For example:

```php
protected function getQueueOptions()
{
    $queueOptionCollection = new ArrayObject();
    $queueOptionCollection->append($this->createQueueOption(EventConstants::EVENT_QUEUE, EventConstants::EVENT_QUEUE_ERROR));
    $queueOptionCollection->append($this->createQueueOption(GlossaryStorageConstants::SYNC_STORAGE_QUEUE, GlossaryStorageConstants::SYNC_STORAGE_ERROR_QUEUE));
    $queueOptionCollection->append($this->createQueueOption(UrlStorageConstants::URL_SYNC_STORAGE_QUEUE, UrlStorageConstants::URL_SYNC_STORAGE_ERROR_QUEUE));
    ...
```

{% endinfo_block %}

## 3. Create Publication Table
The next step is to create a database table that will be used as a mirror for the corresponding *Redis* or *Elasticsearch* store. For details, see [Extending the Database Schema](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/extending-the-database-schema.html).

{% info_block infoBox %}

As a naming convention, it is recommended to append `_storage` to the end of the table name, if it is synchronized with Redis, and `_search`, if it is synchronized with Elasticsearch.

{% endinfo_block %}

All mirror tables must implement the **Synchronization** Behavior that will be used to synchronize data to *Redis* or *Elasticsearch*. Also, the table must populate foreign keys necessary to backtrack the Propel entities.

Sample Redis synchronization table (see `data/shop/development/current/src/Orm/Propel/DE/Schema/spy_product_storage.schema.xml`):

```xml
    <table name="spy_product_abstract_storage">
        <column name="id_product_abstract_storage" type="integer" autoIncrement="true" primaryKey="true"/>
        <column name="fk_product_abstract" type="INTEGER" required="true"/>
        <id-method-parameter value="spy_product_abstract_storage_pk_seq"/>
        <behavior name="synchronization">
            <parameter name="resource" value="product_abstract"/>
            <parameter name="store" required="true"/>
            <parameter name="locale" required="true"/>
            <parameter name="key_suffix_column" value="fk_product_abstract"/>
            <parameter name="queue_group" value="sync.storage.product"/>
        </behavior>
        <behavior name="timestampable"/>
    </table>
```

Sample Elasticsearch synchronization table (see `data/shop/development/current/src/Orm/Propel/DE/Schema/spy_cms_page_search.schema.xml`):

```xml
    <table name="spy_cms_page_search">
        <column name="id_cms_page_search" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="fk_cms_page" type="INTEGER" required="true"/>
        <!-- "structured_data" column contains the result from database query while "data" column contains mapped data for the search engine -->
        <column name="structured_data" type="LONGVARCHAR" required="true"/>
        <id-method-parameter value="spy_cms_page_search_pk_seq"/>
        <behavior name="synchronization">
            <parameter name="resource" value="cms_page"/>
            <parameter name="store" required="true"/>
            <parameter name="locale" required="true"/>
            <parameter name="key_suffix_column" value="fk_cms_page"/>
            <parameter name="queue_group" value="sync.search.cms"/>
            <parameter name="params" value="{"type":"page"}"/>
        </behavior>
        <behavior name="timestampable"/>
    </table>
```

The *Synchronization* behavior added by the above schema files adds a column that will contain the actual data to synchronize to Redis or Elasticsearch (in JSON format). The column name is **data**.

Synchronization Behavior Parameters:
* **resource** - specifies the Redis or Elasticsearch namespace to synchronize with.
* **store** - specifies whether it is necessary to specify a store for an entity.
* **locale** - specifies whether it is necessary to specify a locale for an entity.
* **key_suffix_column** - specifies the name of the column that will be appended to the Redis or Elasticsearch key to make the key unique. If this parameter is omitted, then all entities will be stored under the same key.
* **queue_group** - specifies the queue group used for synchronization.
* **params** - specifies search parameters (Elasticsearch only).

## 4. Create Publish Module

Now, you are ready to implement the **Publish** step. It is recommended practice to create a separate module for this purpose. To create an empty module, execute the following commands:

```
console code:generate:module:zed MyModuleStorage
console code:generate:module:client MyModuleStorage
console code:generate:module:shared MyModuleStorage
```

{% info_block infoBox %}

As a naming convention, names of modules that publish data to Redis end with Storage (e.g. *MyModule**Storage***, and names of modules that publish to Elasticsearch end with Search (e.g. *MyModule**Search***).

{% endinfo_block %}

## 5. Listen to Publish Events
To implement the *Publish* step, first, you need is to consume the *Publish Events*. For this purpose, you need to create an event listener. A listener is a plugin class to your storage or search module. Sample implementation can be found in the *ProductStorage* Module.

```php
class ProductConcreteProductAbstractStorageListener extends AbstractProductConcreteStorageListener implements EventBulkHandlerInterface
{
    use DatabaseTransactionHandlerTrait;

    /**
     * @api
     *
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $this->preventTransaction();
        $productAbstractIds = $this->getFactory()->getEventBehaviorFacade()->getEventTransferIds($eventTransfers);
        if (empty($productAbstractIds)) {
            return;
        }

        $productIds = $this->getQueryContainer()->queryProductIdsByProductAbstractIds($productAbstractIds)->find()->getData();
        $this->publish($productIds);
    }
}
```

A listener class must implement the **EventBulkHandlerInterface** and contain only one method called handleBulk that will be called by the event queue. The method accepts two parameters:

* **$eventTransfers** - specifies an array of event transfers that represent the events to consume;
* **$eventName** - specifies an event name.

{% info_block infoBox %}

For performance considerations, events are passed to the listener in bulk. Even if a single event must be handled, it is passed as an array of a single element.

{% endinfo_block %}


Implementing a listener is detailed in [Listening to Events](/docs/scos/dev/back-end-development/data-manipulation/event/listening-to-events.html). Follow the guide to create your listener classes.

Also, you need to map listeners to the events. For this purpose, you need to add a plugin class that extends the **AbstractPlugin** and implements the **EventSubscriberInterface** interfaces. For example, this is how the *ProductStorage* module maps changes in abstract products to the respective listeners (see full code in data/shop/development/current/vendor/spryker/product-storage/src/Spryker/Zed/ProductStorage/Communication/Plugin/Event/Subscriber/ProductStorageEventSubscriber.php):

```php
class ProductStorageEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    /**
     * @api
     *
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        $eventCollection
            //...
            ->addListenerQueued(ProductEvents::ENTITY_SPY_PRODUCT_ABSTRACT_CREATE, new ProductAbstractStorageListener())
            ->addListenerQueued(ProductEvents::ENTITY_SPY_PRODUCT_ABSTRACT_UPDATE, new ProductAbstractStorageListener())
            ->addListenerQueued(ProductEvents::ENTITY_SPY_PRODUCT_ABSTRACT_UPDATE, new ProductConcreteProductAbstractStorageListener())
            ->addListenerQueued(ProductEvents::ENTITY_SPY_PRODUCT_ABSTRACT_DELETE, new ProductAbstractStorageListener())
            //...
        return $eventCollection;
    }
}
```

### Overriding Listeners

If necessary, you can also override listeners already configured in Spryker. For this purpose, you need to implement a class that extends the event subscriber of the corresponding module on your project level:

```php
/**
 * @method \Spryker\Zed\AvailabilityStorage\Communication\AvailabilityStorageCommunicationFactory getFactory()
 */
class AvailabilityStorageEventSubscriber extends Spryker\Zed\AvailabilityStorage\Communication\Plugin\Event\Subscriber\AvailabilityStorageEventSubscriber
{
    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return void
     */
    protected function addAvailabilityAbstractUpdateListener(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued(AvailabilityEvents::ENTITY_SPY_AVAILABILITY_ABSTRACT_UPDATE, new AvailabilityStorageListener());
    }
}
```

### Adding Listeners to Existing Modules

To add a listener to an existing module, you also need to extend the module's event subscriber on project level:

```php
class PyzUrlStorageEventSubscriber extends UrlStorageEventSubscriber implements EventSubscriberInterface
{
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued(UrlEvents::ENTITY_SPY_URL_CREATE, new UrlStorageListener());
        return $eventCollection;
    }
}
```

## 6. Publish Data
After consuming an event, you need to publish the data for the frontend. For this purpose, your code needs to query the data relevant to the update and make changes to the corresponding *storage* or *search* database table. For this purpose, you need to implement the following methods: **Publish** for publishing an entity, and **Unpublish** for removing it.

Sample implementation can be found in the *ProductStorage* module (see full code in `data/shop/development/current/vendor/spryker/product-storage/src/Spryker/Zed/ProductStorage/Communication/Plugin/Event/Listener/AbstractProductAbstractStorageListener.php`):

```php
/**
 * @param array $productAbstractIds
 *
 * @return void
 */
protected function publish(array $productAbstractIds)
{
    $spyProductAbstractLocalizedEntities = $this->findProductAbstractLocalizedEntities($productAbstractIds);
    $spyProductAbstractStorageEntities = $this->findProductStorageEntitiesByProductAbstractIds($productAbstractIds);

    if (!$spyProductAbstractLocalizedEntities) {
        $this->deleteStorageData($spyProductAbstractStorageEntities);
    }

    $this->storeData($spyProductAbstractLocalizedEntities, $spyProductAbstractStorageEntities);
}

/**
 * @param array $productAbstractIds
 *
 * @return void
 */
protected function unpublish(array $productAbstractIds)
{
    $spyProductStorageEntities = $this->findProductStorageEntitiesByProductAbstractIds($productAbstractIds);
    $this->deleteStorageData($spyProductStorageEntities);
}
```

## 7. Trigger Publish Events
All you need to do to synchronize data to the frontend data storage is trigger the corresponding events. One way to do that is to trigger the events manually. This can be done by calling the `EventFacade::trigger()` method:

```php
$this->eventFacade->trigger(CmsEvents::CMS_VERSION_PUBLISH, (new EventEntityTransfer())->setId($id));
```

Alternatively, you can enable event triggering automatically. In this case, an event will be triggered once a certain Propel entity is created, updated or deleted. For this purpose, you need to enable **Event Behavior** in your modules.

To implement Event Behavior, you need to add a behavior called **event** to your Propel model. For example, the following code in the schema of the *Product Module* enables triggering of events each time the spy_product_abstract table is updated (see `data/shop/development/current/src/Pyz/Zed/Product/Persistence/Propel/Schema/spy_product.schema.xml`):

```xml
<table name="spy_product_abstract">
    <behavior name="event">
        <parameter name="spy_product_abstract_all" column="*"/>
    </behavior>
</table>
```

The **parameter** element specifies when events should be triggered. It has 4 attributes:

* **name** - specifies the parameter name. It should be unique in your Propel model.
* **column** - specifies the column that needs to be updated to trigger an event. If you want to track all columns, use the asterisk (*****) character.
* **value** - specifies a value to compare.
* **operator** - specifies the comparison operator. You can use any PHP comparison operators for this purpose (===, ==, !=, !==, <, >, <=, >=, <>).

The *value* and *operator* attributes are optional. They can be used to filter changes based on certain criteria. In the following example, an event will be triggered only if the value of the **quantity** column equals **0**:

```php
<parameter name="spy_mymodule_quantity" column="quantity" value="0" operator="==="/>
```

The following example triggers an event when the value of any column is less than or equals **10**:

```php
<parameter name="spy_mymodule_all" column="*" value="10" operator="<="/>
```

After making changes to your Propel schema, run the following command:
```
console propel:install
```

Now, you can trigger publish events by simply manipulating any entry in the table:

```php
$productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
$productAbstractEntity->setColorCode("#FFFFFF");
$productAbstractEntity->save();
```

After implementing the above steps, you will have the data storage of your frontend app synchronized with the backend data storage.

### Deleting Entries
Currently, event triggering only works with Propel Entities, but not Propel Queries. For this reason, deleting multiple entities will not trigger *Publish and Synchronize*. Thus, for example, the following code will not trigger anything: `$query→filterByFkProduct(1)→delete();`. To work around this, you need to trigger the events manually or iterate through objects and delete them one-by-one.

#### How
```php
$productAbstractIds = [1,2,3];
$query->filterByFkProduct_In($productAbstractIds)->delete();
foreach ($productAbstractIds as $id) {
    $this->eventFacade->trigger(ProductEvents::PRODUCT_ABSTRACT_UNPUBLISH, (new EventEntityTransfer())->setId($id));
}
// -- OR --
$productAbstracts = SpyProductAbstractQuery::create()->find();
foreach ($productAbstracts as $productAbstract) {
    $productAbstract->delete();
}
```

## Additional Tasks

### View Event Mapping

To see all listeners mapped for a certain event, Ctrl+Click it in PhpStorm. The following example shows that the *SPY_URL_CREATE* event has **6** listeners mapped to it, which means that there will be **6** messages for this event in the **event** queue.
![Lookup listener](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Resources+and+Developer+Tools/Publish+and+Synchronization+Reference/lookup-listener.png)

### Debug Publish and Synchronize

To debug Publish and Synchronize:

1. Turn off [Jenkins](/docs/scos/dev/sdk/cronjob-scheduling.html) to stop processing all queues. This can be done using the following command:

   ```bash
   console setup:jenkins:disable
   ```

2. Trigger your event. Now, you should be able to see the messages in the **event** queue of RabbitMQ management UI. To open it, use the following URL: `https://mysprykershop.com:15672/#/queues`.

3. Set a breakpoint inside a listener mapped to the event and enable the PhpStorm debugging mode.

4. Run the following command:

   ```bash
   XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=~^zed\.de\..+\.local$" console queue:task:start event --no-ack
   ```

5. If you want to view the events stacked in the Publish Queues, they are also available in the RabbitMQ management UI.

6. To re-enable the queues after debugging, run the following command:

   ```bash
   console setup:jenkins:enable
   ```

## Re-Export Storage and Search Data to Redis or Elasticsearch
There is no functionality for this purpose, but you can use the queue client to send data to sync queues. Example:

```php
$data = $productAbstractStorage->getData();
$data["_timestamp"] = microtime(true); // Compare fresh copy of storage and search data
$message = [
    "write" => [
        "key" => $productAbstractStorage->getKey(),
        "value" => $data,
        "resource" => "product_abstract",
        "params" => [], // You can use this option to specify an Elasticsearch type, e.g. ["type" => "page"]
    ]
];

$queueSendTransfer = new \Generated\Shared\Transfer\QueueSendMessageTransfer();
$queueSendTransfer->setBody(json_encode($message));

$queueClient = $this->getFactory()->getQueueClient();
$queueClient->sendMessage("sync.storage.product", $queueSendTransfer);
```

## Re-Trigger Entities
Use the Event Facade to trigger publish events for specific entities:

```php
$productAbstracts = SpyProductAbstractQuery::create()->find();
foreach ($productAbstracts as $productAbstract) {
    $this->eventFacade->trigger(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, (new EventEntityTransfer())->setId($productAbstract->getIdProductAbstract()));
}
```

### Disable Events

If you want to disable all events, call `EventBehaviorConfig::disableEvent()`. To disable events of a specific entity, call `$glossaryTranslationEntity->disableEvent()`.
