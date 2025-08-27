---
title: Implement Publish and Synchronization
description: To implement Publish and Synchronize in your code, you need to perform the following steps
last_updated: April 22, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization-reference
originalArticleId: cdb95c33-1519-4323-9d27-7cba32a8ac82
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/implementing-publish-and-synchronization.html
related:
  - title: Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Adding publish events
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/add-publish-events.html
  - title: Implement event trigger publisher plugins
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - title: Implement synchronization plugins
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Debug listeners
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/debug-listeners.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/mapping-configuration.html
---

To implement *Publish and Synchronize* in your code, follow these steps:

## 1. Create Publish module

We recommend creating a separate module for the publish & synchronize purpose. To create an empty module, execute the following commands:

```bash
console code:generate:module:zed MyModuleStorage
console code:generate:module:client MyModuleStorage
console code:generate:module:shared MyModuleStorage
```

{% info_block infoBox "Naming convention"%}

As a naming convention, names of modules that publish data to Redis end with Storage (for example, `MyModuleStorage`, and names of modules that publish to Elasticsearch end with Search (for example, `MyModuleSearch`).

{% endinfo_block %}

## 2. Define Publish events

The *Publish* and *Synchronize* are event-driven processes. To start publishing data to the frontend, the Publish event must be triggered. After the publish process successfully prepares the data for the frontend, the Synchronization event must be triggered to deliver the prepared data to the frontend.

For this purpose, you need to define events for all changes you want to publish and synchronize. For information about adding events to your module, see [Add events](/docs/dg/dev/backend-development/data-manipulation/event/add-events.html).

For example, the following code defines events for publishing for the cases when an entity is created, updated, or deleted in the `spy_glossary_translation` table (see `data/shop/development/current/vendor/spryker/product/src/Spryker/Shared/GlossaryStorage/GlossaryStorageConfig.php`):

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

The synchronization events are auto-generated and linked by the synchronization process. Therefore, no explicit event declaration is necessary for the default behavior.

## 3. Configure Publish & Synchronization queues

Configure the publish queues where all publish events are exchanged. The default generic publish queue is `event`. You can define the queue in `data/shop/development/current/vendor/spryker/product/src/Spryker/Zed/Publisher/PublisherConfig::getPublishQueueName()`. Also, you can use separate publish queue per listener class (see [Listen to Publish Events](#listen-to-publish-events)).

{% info_block infoBox "Creating a queue"%}

For information about creating a queue, see [Set Up a "Hello World" Queue](/docs/dg/dev/backend-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html#queue).

{% endinfo_block %}

To deliver the prepared data to the frontend, you need to configure synchronization queues in order. We recommended having a separate synchronization queue for each *Redis* or *Elasticsearch* entity.

{% info_block infoBox "Naming convention"%}

As a naming convention, names of queues that synchronize data to Redis start with *sync.storage*, and names of queues that synchronize data to Elasticsearch start with *sync.search*.

{% endinfo_block %}

It is also a good practice to create an error queue for your synchronization queues, where errors are posted. The error queue must be registered in `RabbitMqConfig::getQueueOptions()`.

**Example**:

```php
protected function getQueueOptions()
{
    $queueOptionCollection = new ArrayObject();
    $queueOptionCollection->append($this->createQueueOption(GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION, GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION_ERROR));
    // ...
```


## 4. Create Publish table

The next step is to create a database table that is used as a mirror for the corresponding *Redis* or *Elasticsearch* store. For details, see [Extend the database schema](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/extend-the-database-schema.html).

{% info_block infoBox "Naming convention"%}

As a naming convention, it's recommended to append `_storage` to the end of the table name if it's synchronized with Redis, and `_search` if it's synchronized with Elasticsearch.

{% endinfo_block %}

All mirror tables must implement the *Synchronization* behavior that is used to synchronize data to *Redis* or *Elasticsearch*. Also, the table must populate foreign keys necessary to backtrack the Propel entities.

Sample Redis synchronization table (see `data/shop/development/current/src/Orm/Propel/DE/Schema/spy_product_storage.schema.xml`):

```xml
    <table name="spy_product_abstract_storage" identifierQuoting="true">
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
    <table name="spy_cms_page_search" identifierQuoting="true">
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

The *Synchronization* behavior added by the above schema files adds a column that stores the actual data to synchronize to Redis or Elasticsearch (in JSON format). The column name is *data*.

Synchronization behavior parameters:
- `resource`—specifies the Redis or Elasticsearch namespace to synchronize with.
- `store`—specifies whether it's necessary to specify a store for an entity.
- `locale`—specifies whether it's necessary to specify a locale for an entity.
- `key_suffix_column`—specifies the name of the column that will be appended to the Redis or Elasticsearch key to make the key unique. If this parameter is omitted, then all entities will be stored under the same key.
- `queue_group`—specifies the queue group for synchronization.
- `params`—specifies search parameters (Elasticsearch only).


## 5. Trigger Publish events

To implement the first step of the *Publish* process, you need to trigger the corresponding Publish events.

You need to trigger the events manually by calling the `EventFacade::trigger()` method:

```php
$this->eventFacade->trigger(CmsEvents::CMS_VERSION_PUBLISH, (new EventEntityTransfer())->setId($id));
```

Alternatively, you can enable event triggering automatically. In this case, an event is triggered once a certain Propel entity is created, updated, or deleted. For this purpose, you need to enable *Event behavior* in your modules.

To implement Event Behavior, add the behavior called *event* to your Propel model. For example, the following code in the schema of the Product module enables the triggering of events each time the `spy_product_abstract` table is updated:

**data/shop/development/current/src/Pyz/Zed/Product/Persistence/Propel/Schema/spy_product.schema.xml**

```xml
<table name="spy_product_abstract">
    <behavior name="event">
        <parameter name="spy_product_abstract_all" column="*"/>
    </behavior>
</table>
```

The `parameter` element specifies when events should be triggered. It has four attributes:

- `name`: the parameter name. It must be unique in your Propel model.
- `column`: the column that needs to be updated to trigger an event. To track all columns, use the *** (asterisk) symbol.
- `value`: a value to compare.
- `operator`: the comparison operator. You can use any PHP comparison operators (===, ==, !=, !==, <, >, <=, >=, <>) for this purpose.

The *value* and *operator* attributes are optional. You can use them to filter changes based on certain criteria. The following example triggers an event only if the value of the `quantity` column is `0`:

```php
<parameter name="spy_mymodule_quantity" column="quantity" value="0" operator="==="/>
```

The following example triggers an event when the value of any column is less than or equals 10:

```php
<parameter name="spy_mymodule_all" column="*" value="10" operator="<="/>
```

Initializes the Propel ORM database layer:

```bash
console propel:install
```

Now, you can trigger publish events by manipulating any entry in the table:

```php
$productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
$productAbstractEntity->setColorCode("#FFFFFF");
$productAbstractEntity->save();
```

### Delete entries

Event triggering works only with Propel Entities, but not Propel queries. For this reason, deleting multiple entities does not trigger the *Publish and Synchronize* process. Thus, for example, the following code does not trigger anything: `$query→filterByFkProduct(1)→delete();`. To work this around, you need to trigger the events manually or iterate through objects and delete them one by one:

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


## 6. Listen to Publish events

To implement the next step of the *Publish* process, you need to consume the Publish events. For this purpose, create an event listener. A listener is a plugin class to your storage or search module. See the sample implementation in the [GlossaryStorage](https://github.com/spryker/glossary-storage) module.

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

A listener class must implement `PublisherPluginInterface` and contain the `handleBulk` method.

The `handleBulk` method is called by the event queue for the defined events in the `getSubscribedEvents` method. The method accepts two parameters:
- `$eventEntityTransfers`: specifies an array of event transfers that represent the events to consume;
- `eventName`: specifies the event name.

{% info_block infoBox "Info"%}

For performance considerations, events are passed to the listener in bulk. Even if a single event must be handled, it's passed as an array of a single element.

{% endinfo_block %}

Also, you need to configure listener classes in `PublisherDependencyProvider::getPublisherPlugins()` to enable them. The listeners are listening to the default publish queue. Alternatively, the mapping of the listener class can adjust the listened queue in its key. For details, see the full code in `data/shop/development/current/vendor/spryker/publisher/src/Spryker/Zed/Publisher/PublisherDependencyProvider::getPublisherPlugins()`:

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

{% info_block infoBox "Generic listener classes" %}

For details about creating your non-publish and synchronize listener classes, see [Listening to Events](/docs/dg/dev/backend-development/data-manipulation/event/listen-to-events.html).

{% endinfo_block %}

## 7. Publish data

After consuming a publish event, you must prepare the frontend data. For this purpose, your code needs to query the data relevant to the update and make changes to the corresponding `storage` or `search` database table. For this purpose, you need to implement the following methods: w`riteCollectionBy{TriggeredEvent}Events` for publishing an entity, and `deleteCollectionBy{TriggeredEvent}Events` for removing it.

For the sample implementation see the [GlossaryStorage](https://github.com/spryker/glossary-storage) module.

For the full code, see `data/shop/development/current/vendor/spryker/glossary-storage/src/Spryker/Zed/GlossaryStorage/Communication/Plugin/Publisher/GlossaryTranslation/GlossaryWritePublisherPlugin.php`:

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

{% info_block infoBox "Recommended naming"%}

Recommended naming for the `write{targetEntityName}CollectionBy{triggeredEvent}Events` and `delete{targetEntityName}CollectionBy{triggeredEvent}Events` methods:

- `$targetEntityName`: a unique name of the entity in Redis or Elasticsearch. We recommend leaving this placeholder empty if this publish and synchronize module is responsible for handling exactly one entity.
- `$triggeredEvent`: a logical name for the group of events that makes it easy to identify the origin of the trigger. We recommend using the name of the entity in persistence that triggered the publish and synchronize process.

{% endinfo_block %}

The changes over the *storage* or *search* database tables trigger the corresponding synchronization events.

## 8. Listen to Synchronization events

Spryker implemented two generic synchronization message processor plugins for synchronizing data to the frontend:

- `SynchronizationStorageQueueMessageProcessorPlugin` for synchronizing data to Redis, and
- `SynchronizationSearchQueueMessageProcessorPlugin` for synchronizing data to Elasticsearch.

You need to map your synchronization queue names to one of the plugins depending on which storage you want to use it for. You must map the queues in `QueueDependencyProvider::getProcessorMessagePlugins()`. For details, see [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#queue-message-processor-plugin).

After implementing the preceding steps, the data storage of your frontend app synchronizes with the backend data storage.

## 9. Recommended module structure

The recommended module structure for the Publish and Synchronize module is as follows:

```text
+ src/
  + Spryker/
    + Shared/
      + GlossaryStorageConfig.php                   // module-related event and queue constants
    + Zed/
      + GlossaryStorage/
        + Business/
          + GlossaryStorageFacade.php
        + Communiation/
          + Plugin/
            + Publisher/
              + GlossaryKey/                        // "glossary key" storage entity related listeners
                + GlossaryDeletePublisherPlugin.php
                + GlossaryWriterPublisherPlugin.php
              + GlossaryTranslation/                // "glossary translation" storage entity related listeners
                + GlossaryWriterPublisherPlugin.php //
              + GlossaryKeyPublisherTriggerPlugin.php  // triggers a publish event for all database entities using the "publish:trigger-events" console command
            + Synchronization/
              + GlossaryTranslationSynchrozniationDataRepositoryPlugin.php // triggers a synchronization event for all database entities in the corresponding publish table using the "sync:data" console command
```


## Perform additional tasks

There are some additional tasks for the Publish and Synchronize that you can perform:
- Viewing the event mapping.
- Debugging Publish and Synchronize.
-

### View event mapping

To see all listeners mapped for a certain event, press <kbd>Control</kbd> and click it in PhpStorm. The following example shows that the `SPY_URL_CREATE` event has six listeners mapped to it, which means that there are six messages for this event in the *event* queue.
![Lookup listener](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Resources+and+Developer+Tools/Publish+and+Synchronization+Reference/lookup-listener.png)

### Debug Publish and Synchronize

1. To stop processing all queues, turn off [Jenkins](/docs/scos/dev/sdk/cronjob-scheduling.html). Use the following command:

   ```bash
   console setup:jenkins:disable
   ```

2. Trigger your Publish event. You can see the messages in the corresponding publish queue of the RabbitMQ management UI. To open it, use the following URL: `https://mysprykershop.com:15672/#/queues`.

3. Set a breakpoint inside a listener mapped to the publish event and enable the PhpStorm debugging mode.

4. Run the following command:

   ```bash
   XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=~^zed\.de\..+\.local$" console queue:task:start event --no-ack
   ```

5. If you want to view the events stacked in the Publish queues, you can do this in the RabbitMQ management UI.

6. Re-enable the queues after debugging:

   ```bash
   console setup:jenkins:enable
   ```

## Re-synchronize Storage and Search data to Redis or Elasticsearch

There is no functionality for this purpose, but you can use the queue client to send data to sync queues.

**Example:**

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

## Re-trigger the Publish and Synchronize process

Use the Event facade to trigger Publish events for specific entities:

```php
$productAbstracts = SpyProductAbstractQuery::create()->find();
foreach ($productAbstracts as $productAbstract) {
    $this->eventFacade->trigger(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, (new EventEntityTransfer())->setId($productAbstract->getIdProductAbstract()));
}
```

{% info_block infoBox "Info"%}

This process only updates the target entities that exist in persistence. You must clean up obsolete entities in Redis or Elasticsearch separately.

{% endinfo_block %}


### Disable events

To disable all events, call `EventBehaviorConfig::disableEvent()`.

To disable events of a specific entity, call `$glossaryTranslationEntity->disableEvent()`.
