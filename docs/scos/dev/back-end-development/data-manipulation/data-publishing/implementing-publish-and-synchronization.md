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

## 1. Create Publish Module

It is recommended practice to create a separate module for publish & synchronize purpose. To create an empty module, execute the following commands:

```
console code:generate:module:zed MyModuleStorage
console code:generate:module:client MyModuleStorage
console code:generate:module:shared MyModuleStorage
```

{% info_block infoBox %}

As a naming convention, names of modules that publish data to Redis end with Storage (e.g. *MyModule**Storage***, and names of modules that publish to Elasticsearch end with Search (e.g. *MyModule**Search***).

{% endinfo_block %}

## 2. Define Publish Events
*Publish* and *Synchronize* are event-driven processes. To start publishing data to the frontend, an event must be triggered (publish event). After the publish process sucessfully prepared the data for the frontend, another event must be triggered (synchronization event) in order to deliver the prepared data to the frontend.

For this purpose, you need to define events for all changes you want to publish & synchronize. For information on how to add events to your module, see [Adding Events](/docs/scos/dev/back-end-development/data-manipulation/event/adding-events.html).

For example, the following code defines events for publish for the cases when an entity is created, updated or deleted in the spy_glossary_translation table (see `data/shop/development/current/vendor/spryker/product/src/Spryker/Shared/GlossaryStorage/GlossaryStorageConfig.php`):

```php
    /**
     * Specification:
     * - Represents spy_glossary_translation entity creation event.
     *
     * @api
     *
     * @var string
     */
    public const ENTITY_SPY_GLOSSARY_TRANSLATION_CREATE = 'Entity.spy_glossary_translation.create';

    /**
     * Specification:
     * - Represents spy_glossary_translation entity change event.
     *
     * @api
     *
     * @var string
     */
    public const ENTITY_SPY_GLOSSARY_TRANSLATION_UPDATE = 'Entity.spy_glossary_translation.update';

    /**
     * Specification:
     * - Represents spy_glossary_translation entity deletion event.
     *
     * @api
     *
     * @var string
     */
    public const ENTITY_SPY_GLOSSARY_TRANSLATION_DELETE = 'Entity.spy_glossary_translation.delete';
```

The synchronization events are auto-generated and linked by the synchroniziation process, therefore no explicit event declaration is necessary for default behaviour.

## 3. Configure Publish & Synchronization Queues
Now, you need to configure the publish queue(s) where all publish events will be exchanged. The default generic publish queue is **event** - this can be adjusted in `data/shop/development/current/vendor/spryker/product/src/Spryker/Zed/Publisher/PublisherConfig::getPublishQueueName()`. It is also possible to use separate publish queue per listener class (see **Listen to Publish Events**).

{% info_block infoBox %}

For information on how to create a queue, see [Set Up a "Hello World" Queue](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/handling-data-with-publish-and-synchronization.html), section **Creating a Simple Queue**.

{% endinfo_block %}

Now, you need to configure synchronization queues in order to deliver the prepared data to the frontend. It is recommended to have a separate synchronization queue for each *Redis* or *Elasticsearch* entity. 

{% info_block infoBox %}

As a naming convention, names of queues that synchronize data to Redis start with **sync.storage**, and names of queues that synchronize data to Elasticsearch start with **sync.search**.

{% endinfo_block %}

{% info_block infoBox %}

For information on how to create a queue, see [Set Up a "Hello World" Queue](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/handling-data-with-publish-and-synchronization.html), section **Creating a Simple Queue**.

{% endinfo_block %}

{% info_block infoBox %}

It is also good practice to create an error queue for your synchronization queues, where errors will be posted. The error queue must be registered in `RabbitMqConfig::getQueueOptions()`. For example:

```php
protected function getQueueOptions()
{
    $queueOptionCollection = new ArrayObject();
    $queueOptionCollection->append($this->createQueueOption(GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION, GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION_ERROR));
    // ...
```

{% endinfo_block %}

## 4. Create Publish Table
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


## 5. Trigger Publish Events
To implement the first step of the *Publish* process, you need to trigger the corresponding publish events. 

One way to do that is to trigger the events manually. This can be done by calling the `EventFacade::trigger()` method:
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


## 6. Listen to Publish Events
To implement the next step of the *Publish* process, you need to consume the *Publish Events*. For this purpose, you need to create an event listener. A listener is a plugin class to your storage or search module. Sample implementation can be found in the *GlossaryStorage* Module.

```php
class GlossaryWritePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param array<\Generated\Shared\Transfer\EventEntityTransfer> $eventEntityTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventEntityTransfers, $eventName)
    {
        $this->getFacade()->writeCollectionByGlossaryTranslationEvents($eventEntityTransfers);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<string>
     */
    public function getSubscribedEvents(): array
    {
        return [
            GlossaryStorageConfig::ENTITY_SPY_GLOSSARY_TRANSLATION_CREATE,
            GlossaryStorageConfig::ENTITY_SPY_GLOSSARY_TRANSLATION_UPDATE,
        ];
    }
}
```

A listener class must implement the **PublisherPluginInterface** and contain the handleBulk method that will be called by the event queue for the defined events in getSubscribedEvents method. The method accepts two parameters:

* **$eventEntityTransfers** - specifies an array of event transfers that represent the events to consume;
* **$eventName** - specifies an event name.

{% info_block infoBox %}

For performance considerations, events are passed to the listener in bulk. Even if a single event must be handled, it is passed as an array of a single element.

{% endinfo_block %}


Implementing a listener is detailed in [Listening to Events](/docs/scos/dev/back-end-development/data-manipulation/event/listening-to-events.html). Follow the guide to create your listener classes.

Also, you need to configure listener classes in PublisherDependencyProvider::getPublisherPlugins() to enable them. The listeners are listening on the default publish queue. Alternativly, the mapping of the listener class can adjust the listened queue in its key. (see full code in `data/shop/development/current/vendor/spryker/publisher/src/Spryker/Zed/Publisher/PublisherDependencyProvider::getPublisherPlugins()`):

```php
class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
          parent::getPublisherPlugins(),
          $this->getGlossaryStoragePlugins(),
          $this->getProductLabelStoragePlugins()
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            'publish.translation' => [
                new GlossaryTranslationWritePublisherPlugin(), // Listens to events in "publish.translation" queue
            ],
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductLabelStoragePlugins(): array
    {
        return [
            new ProductAbstractLabelStorageWritePublisherPlugin(), // Listens to events in default queue
        ];
    }

}
```

## 6. Publish Data
After consuming a publish event, you need to prepare the data for the frontend. For this purpose, your code needs to query the data relevant to the update and make changes to the corresponding *storage* or *search* database table. For this purpose, you need to implement the following methods: **writeCollectionBy{TriggeredEvent}Events** for publishing an entity, and **deleteCollectionBy{TriggeredEvent}Events** for removing it.

Sample implementation can be found in the *GlossaryStorage* module (see full code in `data/shop/development/current/vendor/spryker/glossary-storage/src/Spryker/Zed/GlossaryStorage/Communication/Plugin/Publisher/GlossaryTranslation/GlossaryWritePublisherPlugin.php`):

```php
    /**
     * @param array<\Generated\Shared\Transfer\EventEntityTransfer> $eventTransfers
     *
     * @return void
     */
    public function writeCollectionByGlossaryKeyEvents(array $eventTransfers)
    {
        $glossaryKeyIds = $this->eventBehaviorFacade->getEventTransferIds($eventTransfers);

        $this->writerGlossaryStorageCollection($glossaryKeyIds);
    }

    /**
     * @param array<\Generated\Shared\Transfer\EventEntityTransfer> $eventTransfers
     *
     * @return void
     */
    public function deleteCollectionByGlossaryKeyEvents(array $eventTransfers): void
    {
        $glossaryKeyIds = $this->eventBehaviorFacade->getEventTransferIds($eventTransfers);

        $this->deleteGlossaryStorageCollection($glossaryKeyIds);
    }
```

{% info_block infoBox %}

Recommended naming for **write{targetEntityName}CollectionBy{triggeredEvent}Events** and **delete{targetEntityName}CollectionBy{triggeredEvent}Events** methods

* **$targetEntityName** - The unique name of the entity in Redis or Elasticsearch. It is recommended to leave this placeholder empty if this publish and synchronize module is responsible for handling exactly 1 entity.
* **$triggeredEvent** - A logical name for the group of events that makes it easy to identify the origin of trigger. It is recommended to use the name of the entity in persistence that triggered the publish and synchronize process.

{% endinfo_block %}

## 7. Listen to Synchronization Events

Spryker implemented 2 generic synchronization message processor plugins for synchronizing data to the frontend:

* `SynchronizationStorageQueueMessageProcessorPlugin` - for synchronizing data to Redis, and
* `SynchronizationSearchQueueMessageProcessorPlugin` - for synchronizing data to Elasticsearch.

You need to map your synchronization queue names to one of the plugins depending on which storage you want to use it for. The queues must be mapped in `QueueDependencyProvider::getProcessorMessagePlugins()`. For details, see section **Queue Message Processor Plugin** in the *Set Up a "Hello World" Queue* document.

After implementing the above steps, you will have the data storage of your frontend app synchronized with the backend data storage.

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

2. Trigger your publish event. Now, you should be able to see the messages in the corresponding publish queue of RabbitMQ management UI. To open it, use the following URL: `https://mysprykershop.com:15672/#/queues`.

3. Set a breakpoint inside a listener mapped to the publish event and enable the PhpStorm debugging mode.

4. Run the following command:

   ```bash
   XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=~^zed\.de\..+\.local$" console queue:task:start event --no-ack
   ```

5. If you want to view the events stacked in the Publish Queues, they are also available in the RabbitMQ management UI.

6. To re-enable the queues after debugging, run the following command:

   ```bash
   console setup:jenkins:enable
   ```

## Re-Synchronize Storage and Search Data to Redis or Elasticsearch
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

## Re-Trigger Publish & Synchronize
Use the Event Facade to trigger publish events for specific entities:

```php
$productAbstracts = SpyProductAbstractQuery::create()->find();
foreach ($productAbstracts as $productAbstract) {
    $this->eventFacade->trigger(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, (new EventEntityTransfer())->setId($productAbstract->getIdProductAbstract()));
}
```

{% info_block infoBox %}

This process only makes sure the update the target entities that exist in persistence. Cleaning up obsolate entities in Redis or Elasticsearch needs to be handled separatly.

{% endinfo_block %}


### Disable Events

If you want to disable all events, call `EventBehaviorConfig::disableEvent()`. To disable events of a specific entity, call `$glossaryTranslationEntity->disableEvent()`.
