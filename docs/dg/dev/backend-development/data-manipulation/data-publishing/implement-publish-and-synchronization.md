---
title: Implement Publish and Synchronization
description: To implement Publish and Synchronize in your code, you need to perform the following steps
last_updated: June 22, 2025
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization-reference
originalArticleId: cdb95c33-1519-4323-9d27-7cba32a8ac82
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/implementing-publish-and-synchronization.html
related:
  - title: Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Adding publish events
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/add-publish-events.html
  - title: Implement event trigger publisher plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - title: Implement synchronization plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Debug listeners
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/debug-listeners.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
---

Usually in order to implement a module that will publish data to the frontend, you need to create a module that will handle those actions. We wecommend creating a separate module for the *Storage* and *Search* data.
All required steps are described in this article.

## 1. Create a base module

We recommend to put a `Publish & Synchromization` related code in a separate module. A module usually represents one database or domain entity. E.g. `StoreStorage` module will populate storage with `Store` data and also with data from related tables like `StoreContext`. 

You can create a module with a few options:
- Create a module manually. For details, see [Create a module](/docs/dg/dev/backend-development/extend-spryker/create-modules).
- Use Spryks for creating a module. For details, see [Spryks](/docs/dg/dev/sdks/sdk/spryks/spryks).
- Or you can try to use AI coding assistants [AI coding assistants](/docs/dg/dev/ai-coding-assistants) to create a module. You can ask the AI agent to use this document as a reference.

{% info_block infoBox "Naming convention"%}

In the Spryker packages, you can find modules that sync data to the *Storage* or *Search* database. The module name is usually suffixed with `Storage` or `Search`. For example, `GlossaryStorage` or `CmsPageSearch`.
This is not a hard requirement, but we recommend following this convention to make it easier to understand the purpose of the module.

{% endinfo_block %}

At least a basic files structure of the module should be ready after this step.

## 2. Enable required behaviors

To automatically trigger events for the *Publish* and *Synchronize* processes, you need to enable the *Event* behavior in your Propel model. This behavior is used to trigger events when an entity is created, updated, or deleted.
Without this behavior, you will have to trigger events manually.

You can check how it can be done in the example below:

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

Now create, update and delete events will be triggered automatically when you do those actions with Propel entities.

{% info_block infoBox "Info"%}

```php
$productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
$productAbstractEntity->setColorCode("#FFFFFF");
$productAbstractEntity->save();
```

{% endinfo_block %}

This actions will trigger the `Entity.spy_product_abstract.update` event, which can be used to publish data.

`Entity.{table_name}.{action}` is a naming convention for the Publish events. The `{table_name}` part is the name of the Propel table that triggers the event, and `{action}` is one of the following actions: create, update, or delete.

In the Spryker packages you can find that such events are defined in the shared `Config` class of the module. For example, the `GlossaryStorageConfig` class defines the events for the `spy_glossary_translation` table.

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

This is not a mandatory step, but it is a good idea to define event names in the code once and use it later.

## 3. Create a new storage or search table

The next step is to create a database table, that is used as a mirror for the corresponding *Storage* or *Search* data.
This table is used to store records that will be later synced into Storage or Search database.

{% info_block infoBox "Naming convention"%}

As a naming convention, it's recommended to append `_storage` to the end of the table name if it's synchronized with storage database (e.g. Redis), and `_search` if it's synchronized with search database (e.g. Elasticsearch).

{% endinfo_block %}

All mirror tables must implement the *Synchronization* behavior, that is used to synchronize data to *Storage* or *Search*. Also, the table must populate foreign keys necessary to backtrack the Propel entities.

Sample Storage synchronization table:

```xml
    <table name="spy_store_storage" identifierQuoting="true">
         <column name="id_spy_store_storage" type="INTEGER" autoIncrement="true" primaryKey="true"/>
         <column name="fk_store" type="INTEGER" required="true"/>
         <column name="data" type="CLOB" required="false"/>
         <column name="store_name" type="VARCHAR" size="255" required="true"/>
         <index name="spy_store_storage-fk_store">
            <index-column name="fk_store"/>
         </index>
         <id-method-parameter value="id_spy_store_storage_pk_seq"/>
         <behavior name="synchronization">
            <parameter name="resource" value="store"/>
            <parameter name="key_suffix_column" value="store_name"/>
            <parameter name="queue_group" value="sync.storage.store"/>
            <parameter name="queue_pool" value="synchronizationPool"/>
         </behavior>
         <behavior name="timestampable"/>
      </table>
```

Sample Elasticsearch synchronization table:

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

The *Synchronization* behavior added by the above schema files adds a column that stores the actual data to synchronize to Storage or Search (in JSON format). The column name is *data*.

Synchronization behavior parameters:
- `resource`—specifies the Storage or Search namespace to synchronize with.
- `store`—specifies whether it's necessary to specify a store for an entity.
- `locale`—specifies whether it's necessary to specify a locale for an entity.
- `key_suffix_column`—specifies the name of the column that will be appended to the Redis or Elasticsearch key to make the key unique. If this parameter is omitted, then all entities will be stored under the same key.
- `queue_group`—specifies the queue group for synchronization.
- `params`—specifies search parameters (Search only).
- `queue_pool`—specifies the queue pool name for synchronization. If store is not required for the entity, then this parameter must be set to a string with the pool name. If store is required, then this parameter must be omitted.

## 4. Create required plugins

In order to implement the *Publish* and *Synchronize* process, you need to create a few plugins. The plugins are used to handle events, prepare data, and synchronize it to the frontend.
You need at least two plugins: one for handling the *Publish* events and another one for synchronizing data to the frontend.

### 4.1 Create a Publisher plugin

A Publisher plugin is used to handle the *Publish* events. It is a plugin that implements the `Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface` interface and contains the `handleBulk` method. The method accepts an array of event transfers and an event name.
The `handleBulk` method is meant to be called in order to prepare the data for the storage or search tables and save it in the *Storage* or *Search* database tables.
The `getSubscribedEvents` defines the events that the plugin listens to.

```php
class StoreWritePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * {@inheritDoc}
     * - Gets Store ids from event transfers.
     * - Publishes store data to storage table.
     *
     * @api
     *
     * @param array<\Generated\Shared\Transfer\EventEntityTransfer> $transfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $transfers, $eventName): void
    {
        $this->getFacade()->writeCollectionByStoreEvents($transfers);
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
            StoreStorageConfig::ENTITY_SPY_STORE_UPDATE,
            StoreStorageConfig::ENTITY_SPY_STORE_CREATE,
        ];
    }
}
```

This plugin must be registered in the `Pyz\Zed\Publisher\PublisherDependencyProvider::getPublisherPlugins()` method. The plugins are listening to the default publish queue, which is defined in the `Pyz\Zed\Publisher\PublisherDependencyProvider::getDefaultQueueName()` method. Custom queue names can be set by providing a key as a queue name in the `Pyz\Zed\Publisher\PublisherDependencyProvider::getPublisherPlugins()` method.

E.g.
```php
protected function getPublishAndSynchronizeHealthCheckPlugins(): array
    {
        return [
            PublishAndSynchronizeHealthCheckConfig::PUBLISH_PUBLISH_AND_SYNCHRONIZE_HEALTH_CHECK => [
                new PublishAndSynchronizeHealthCheckStorageWritePublisherPlugin(),
                new PublishAndSynchronizeHealthCheckSearchWritePublisherPlugin(),
            ],
        ];
    }
```

### 4.2 Create a Synchronization plugin
A Synchronization plugin is used to synchronize data to the frontend. It is a plugin that implements the `\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataBulkRepositoryPluginInterface` interface and contains the `getData` method. The method accepts an offset, limit, and an array of IDs and returns an array of `SynchronizationDataTransfer` objects. Those objects will be used to synchronize data to the frontend as they contain data from _storage or _search tables.

```php
class StoreSynchronizationDataPlugin extends AbstractPlugin implements SynchronizationDataBulkRepositoryPluginInterface
{
    /**
     * Specification:
     *  - Returns the resource name of the storage or search module
     *
     * @api
     *
     * @return string
     */
    public function getResourceName(): string
    {
        return StoreStorageConfig::STORE_RESOURCE_NAME;
    }

    /**
     * Specification:
     *  - Returns true if this entity has multi-store concept
     *
     * @api
     *
     * @return bool
     */
    public function hasStore(): bool
    {
        return false;
    }

    /**
     * Specification:
     *  - Returns SynchronizationDataTransfer[] according to provided offset, limit and ids.
     *
     * @api
     *
     * @param int $offset
     * @param int $limit
     * @param array<int> $ids
     *
     * @return array<\Generated\Shared\Transfer\SynchronizationDataTransfer>
     */
    public function getData(int $offset, int $limit, array $ids = []): array
    {
        return $this->getFacade()->getStoreStorageSynchronizationDataTransfers(
            $this->createStoreStorageCriteriaTransfer($offset, $limit, $ids),
        );
    }

    /**
     * Specification:
     *  - Returns array of configuration parameter which needed for Redis or Elasticsearch
     *
     * @api
     *
     * @return array<mixed>
     */
    public function getParams(): array
    {
        return [];
    }

    /**
     * Specification:
     *  - Returns synchronization queue name
     *
     * @api
     *
     * @return string
     */
    public function getQueueName(): string
    {
        return StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE;
    }

    /**
     * Specification:
     *  - Returns synchronization queue pool name for broadcasting messages
     *
     * @api
     *
     * @return string|null
     */
    public function getSynchronizationQueuePoolName(): ?string
    {
        return $this->getFactory()
            ->getConfig()
            ->getStoreSynchronizationPoolName();
    }
}
```
If the entity is store related - `hasStore()` method must return `true`, otherwise `getSynchronizationQueuePoolName()` need to return a string with the pool name. It should be the same as is provided in table definition `queue_pool` of Synchronization behavior.

## 5. Configure Publish & Synchronization queues

If you want to use separate queues for your entity you need to configure it by providing a key as a queue name in `Pyz\Zed\Publisher\PublisherDependencyProvider::getPublisherPlugins()` as mentioned before and also in the `Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins()` by setting message and sync processors.

To deliver the prepared data to the frontend, you need to configure synchronization queues in order. This can be also done in `Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins()`.
Spryker implemented two generic synchronization message processor plugins for synchronizing data to the frontend:

- `Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin` for synchronizing data to Redis, and
- `Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin` for synchronizing data to Elasticsearch.

{% info_block infoBox "Naming convention"%}

As a naming convention, names of queues that synchronize data to Redis start with *sync.storage.*, and names of queues that synchronize data to Elasticsearch start with *sync.search.*.

{% endinfo_block %}

Error queue is created automatically by adding error suffix to the queue name. For example, if the queue name is `sync.storage.product`, then the error queue name is `sync.storage.product.error`.

```php
class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            EventConstants::EVENT_QUEUE => new EventQueueMessageProcessorPlugin(),
            EventConstants::EVENT_QUEUE_RETRY => new EventRetryQueueMessageProcessorPlugin(),
            PublisherConfig::PUBLISH_QUEUE => new EventQueueMessageProcessorPlugin(),
            PublisherConfig::PUBLISH_RETRY_QUEUE => new EventRetryQueueMessageProcessorPlugin(),
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

As you can see, for the Store entity, the `Spryker\Shared\StoreStorage\StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE` queue is used for synchronizing data to Redis. The queue name is defined in the `Spryker\Shared\StoreStorage\StoreStorageConfig` class.
For the publishing we are using the default publish queue, which is defined in the `Spryker\Shared\Publisher\PublisherConfig::PUBLISH_QUEUE` constant. But it also can use a separate queue for publishing data, if you provide a key as a queue name in the `Pyz\Zed\Publisher\PublisherDependencyProvider::getPublisherPlugins()` method.

## 6. Validate the implementation

To validate the implementation, you can update a Propel entity in the backoffice and check if the data is published to the *Storage* or *Search* databases. If any errors occur during the process, you can check the error queue in the RabbitMQ management UI. The error queue is created automatically by adding an `error` suffix to the queue name.