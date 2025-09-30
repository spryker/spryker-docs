---
title: Publish and Synchronization
description: Publish and Synchronization process synchronizes all changes made on the backend need to be propagated to the client data stores.
last_updated: Aug 18, 2025
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization
originalArticleId: 58721bca-2881-4583-a9fa-59d698e8b9bb
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
related:
  - title: Implement Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
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


To serve data quickly, your shop application reads from Redis (key–value storage) and Elasticsearch (search and analytics). The client doesn't access the primary SQL database directly. Instead, Spryker uses the Publish and Synchronize (P&S) mechanism to move data from the relational database to Redis and Elasticsearch.

P&S denormalizes and distributes data to achieve the following:

- Reduce the load on the master database.

- Deliver localized data, such as pricing, availability, and product details, in a format prepared for the Storefront.

- Run queries run, which improves Storefront performance.

Benefits of P&S:

- Near real-time updates, since by default the empty queues ate checked every 1 second.

- Batched SQL queries during publishing for better performance.

- Incremental exports; full re-exports are unnecessary.

- Safe fallback: the SQL database always holds the source of truth. You can resync at any time.  

- Store- and locale-specific data support.

- Spryker relies on Propel behaviors to fire events automatically whenever you save, update, or delete an entity. So you don't need to call any P&S code manually.

## P&S process

P&S process schema:

![ps-process-overview](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.md/ps-process-overview.png)


{% raw %}
─────────▶ (solid): Synchronous call or direct write
- - - - -▶ (dashed): Asynchronous event, queue, or deferred processing
{% endraw %}

### 1. Publish 

You can start the publish process using automated or manual event triggering.

#### Automated event triggering

When an entity implements Propel Event behavior, every create, update, or delete operation automatically triggers a corresponding publish event. This behavior ensures that entity changes are immediately captured and propagated through the system.

For example, saving an abstract product triggers a `create abstract product` event:

```php
$productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
$productAbstractEntity->setColorCode("#FFFFFF");
$productAbstractEntity->save();
```

Calling `save()`, the entity invokes method `saveEventBehaviorEntityChange()`, which creates a `SpyEventBehaviorEntityChange` record. This record is saved into the database and remains pending until the `onTerminate` Symfony event is triggered. During the `onTerminate` event, all `SpyEventBehaviorEntityChange` entries, produced by the current process, are dispatched into the corresponding message queues.

The event dispatcher plugin responsible for this behavior is `Spryker\Zed\EventBehavior\Communication\Plugin\EventDispatcher\EventBehaviorEventDispatcherPlugin`

{% info_block infobox %}

If the process finishes early and events are not processed during runtime, they will still be handled automatically by the command `vendor/bin/console event:trigger:timeout` in Jenkins, which is executed by default every 5 minutes.

{% endinfo_block %}


#### Manual event triggering

You can trigger the publish event manually using the event facade:

```php
$this->eventFacade->trigger(CmsStorageConfig::CMS_KEY_PUBLISH_WRITE, (new EventEntityTransfer())->setId($id));
```

Manual event triggering works best when an entity passes several stages before it becomes available to customers. The typical use case is content management or data import. For example, when you create a page, it usually remains a draft until you decide to publish it, or when you release a new product to the market.

#### Event in the queue

When the publish process is triggered, one or more event messages are posted to queues. Each message includes metadata about the event that triggered it:

- Event name.

- The affected entity's ID.

- Names of the corresponding publisher and transfer classes.

- A list of modified columns.

- Foreign keys used to trace back the updated Propel entities.

The message doesn't include the actual changed data, since it might change before the event is being processed.

Example:

```json
{
	"listenerClassName":"Spryker\\Zed\\UrlStorage\\Communication\\Plugin\\Event\\Listener\\UrlStorageListener",
	"transferClassName":"Generated\\Shared\\Transfer\\EventEntityTransfer",
	"transferData":{
		"event":"Entity.spy_url.update",
		"name":"spy_url",
		"id":488,
		"foreign_keys":{
			"spy_url.fk_resource_page":7,
			"spy_url.fk_resource_product_abstract":null,
			"spy_url.fk_resource_redirect":null,
			"spy_url.fk_resource_product_set":null,
			"spy_url.fk_resource_categorynode":null,
			"spy_url.fk_locale":46
		},
	"modified_columns":[
		"spy_url.url"
	]
	},
	"eventName":"Entity.spy_url.update"
}
```

### 2. Synchronize

Synchronize is the process of transferring data from the database to a storage, i.e. Redis and Elasticsearch, making it accessible to fast customer-facing applications.

How it works:

After a publish event is triggered and a message is placed in a queue (RabbitMQ), the following process takes place:

1. The `vendor/bin/console queue:worker:start` command, typically exectured via Jenkins, scans for all non-empty queues.

2. For each non-empty queue, a subprocess is started using the following command:


```bash
vendor/bin/console queue:task:start {queueName}
```

where `{queueName}` is the name of the non-empty queue being processed.

3. This command identifies the appropriate listener responsible for the processing of the messages in this queue.

4. Based on the listener logic, storage or search entities are calculated.

5. These entities are persisted in the database.


## Synchronization types

P&S supports two types of synchronization: asynchronous and direct. Their differences are described in the following sections.

### Asynchronous synchronization

Asynchronous synchronization provides greater stability, although it may take slightly longer to complete. It works as follows:

1. When a storage or search entity is saved to the database, a new message is generated and placed into a dedicated synchronisation queue in RabbitMQ.

2. `vendor/bin/console queue:worker:start` command detects this non-empty queue and spawns a child process using the `vendor/bin/console queue:task:start {queueName}` command.

3. During execution, the message is processed, and the resulting data is stored in Redis or Elasticsearch.

Asynchronous sync is used by default when you implement P&S.


### Direct synchronize

Direct synchronize uses in-memory storage to temporarily hold synchronization messages and writes them at the end of the request lifecycle instead of using queues. To improve performance and flexibility, you can enable this method at the project level.

How it works:

1. When a storage or search entity is saved to the database, synchronization messages are stored in the memory of the current PHP process.

2. After the console command completes, Symfony triggers the `onTerminate` event.

3. All messages stored in memory are written directly to Redis and/or Elasticsearch.

![direct-ps-process](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.md/direct-ps-process.png)


{% raw %}
─────────▶ (solid): Synchronous call or direct write
- - - - -▶ (dashed): Asynchronous event, queue, or deferred processing
{% endraw %}

For instructions on configuring direct sync, see [Configure direct synchronize](/docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/configure-direct-synchronize).

### Key differences from asynchronous synchronization

| Aspect              | Asynchronous Sync                                      | Direct Sync                                                       |
|---------------------|--------------------------------------------------------|-------------------------------------------------------------------|
| Message queue       | Required                                              | Skipped                                                           |
| Processing delay    | Delays is caused by queuing and worker execution            | Processed after the command ends without a delay                |
| Performance impact  | Slower during command execution because of additional processing steps | Faster during command execution                                  |
| Use case            | Default; scalable for large data volumes            | Optimized for speed and reduced infrastructure overhead; performs better with low data volumes |


Asynchronous synchronization is more stable, easier to handle errors, and works with bigger amounts of data.

Direct synchronization provides faster results, and is particularly useful for the following use cases:

- Test environments.

- Small projects.

- Performance-critical operations where immediate consistency is preferred.

## P&S process example

The following walkthrough shows how the P&S mechanism moves product-abstract data from the Spryker backend to Redis and Elasticsearch. The example is based on `SpyProductAbstract` sync in the B2B Marketplace Demo Shop. 

### 1. Publish

When you save a `SpyProductAbstract` entity in the Back Office - such as clicking **Save** on a product page - Spryker immediately triggers the P&S workflow. In this example, the product is enabled in two stores:


![publish-stores](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.md/publish-stores.png)

During the save operation, Spryker generates multiple events called messages and places them in RabbitMQ.

### 2. Synchronize

RabbitMQ now contains several events that relate to the product abstract and its dependent entities–for example, product concrete, URL storage, and price.

#### Asynchronous synchronization

##### Storage events:


1. Queue: `publish.product_abstract` receives a storage event. 

2. Listener: `ProductAbstractStoragePublishListener` (registered in `ProductStorageEventSubscriber.php`) consumes the event. 
This message contains only metadata. The actual payload is constructed later by the storage or search listeners.


Event example:

```php
{
  "listenerClassName": "Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener",
  "transferClassName": "Generated\\Shared\\Transfer\\EventEntityTransfer",
  "transferData": {
    "additional_values": [],
    "id": 416,
    "foreign_keys": {
      "spy_product_abstract.fk_tax_set": 1
    },
    "modified_columns": [
      "spy_product_abstract.approval_status"
    ],
    "event": "Entity.spy_product_abstract.update",
    "name": "spy_product_abstract",
    "original_values": []
  },
  "eventName": "Entity.spy_product_abstract.update"
}
```


3. The listener does the following processing: 
   1. Creates a `SpyProductAbstractStorage` entity
   2. Populates the entity with the data that will be used on the frontend
   3. Saves the data to the `spy_product_abstract_storage` table, one row per store and locale 

![async-sync-processing](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.md/async-sync-processing.png)


4. Follow-up event: The listener sends a new message to the `sync.storage.product` queue. 


Message example:

```php
{
  "listenerClassName": "Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener",
  "transferClassName": "Generated\\Shared\\Transfer\\EventEntityTransfer",
  "transferData": {
    "additional_values": [],
    "id": 416,
    "foreign_keys": {
      "spy_product_abstract.fk_tax_set": 1
    },
    "modified_columns": [
      "spy_product_abstract.approval_status"
    ],
    "event": "Entity.spy_product_abstract.update",
    "name": "spy_product_abstract",
    "original_values": []
  },
  "eventName": "Entity.spy_product_abstract.update"
}
```

</details>

5. Worker: Jenkins launches `vendor/bin/console queue:worker:start`, which invokes `SynchronizationFacade::processStorageMessages()`. 

6. Result: All storage messages are written to Redis. 


Search event:


1. Queue: `publish.page_product_abstract` receives a search event. 

2. Listener: `ProductPageProductAbstractPublishListener` (registered in `ProductPageSearchEventSubscriber.php`) consumes the message. 


Message example:

```php
{
  "listenerClassName": "Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener",
  "transferClassName": "Generated\\Shared\\Transfer\\EventEntityTransfer",
  "transferData": {
    "additional_values": [],
    "id": 416,
    "foreign_keys": {
      "spy_product_abstract.fk_tax_set": 1
    },
    "modified_columns": [
      "spy_product_abstract.approval_status"
    ],
    "event": "Entity.spy_product_abstract.update",
    "name": "spy_product_abstract",
    "original_values": []
  },
  "eventName": "Entity.spy_product_abstract.update"
}
```

3. The listener does the following processing: 
    1. Creates a `SpyProductAbstractPageSearch` entity
    2. Populates the entity with data
    3. Saves the entity to the `spy_product_abstract_page_search` table, one row per store and locale 

![search-event-processing](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.md/search-event-processing.png)

4. Follow-up event: The listener sends a new message to the `sync.search.product` queue. 

5. Worker: Jenkins launches `vendor/bin/console queue:worker:start`, which invokes `SynchronizationFacade::processSearchMessages()`. 

6. Result: All search messages are indexed in Elasticsearch. 

By following this workflow, Spryker makes all product changes made in the Back Office becomes available in Redis and Elasticsearch with minimal delay, even across multiple stores and locales.

#### Direct synchronization

In direct synchronization mode, the behavior of entities such as `SpyProductAbstractPageSearch` and `SpyProductAbstractStorage`, changes. Instead of sending messages to the queue for later processing as described in steps 3–5 of the previous example, these entities are written directly to Redis or Elasticsearch during the same PHP process.

This approach uses `DirectSynchronizationConsolePlugin`, which leverages Symfony's `onTerminate` event to perform the final synchronization step after the console command completes execution.

For details on configuring direct sync, see See how to configure direct synchronization - [Configure direct synchronize](/docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/configure-direct-synchronize).

## Data architecture

P&S supports intelligent solutions and scalable architecture designs by handling data denormalization and distribution across Spryker Storefronts and APIs.

### Denormalization and distribution

- Denormalization prepares data in the format required by the consuming clients, such as storefronts or APIs.

- Distribution ensures that this data is moved closer to end users, enabling fast and responsive access that feels like interacting with a local store.

#### Project examples of data denormalization and distribution

Several Spryker partners leverage P&S to distribute product data to warehouse picking devices, such as barcode scanners. These devices access the product catalog as if it were local, allowing them to function even with poor or no network connectivity.

In other implementations, P&S enables businesses to centralize sensitive customer data - such as in Germany for compliance reasons - while distributing localized catalogs globally. For example, buyers in Brazil can browse the catalog with minimal latency, as if the data were hosted locally.


### Architectural considerations

When designing a solution that incorporates P&S, consider the following:

- Eventual consistency of data in storefronts and client applications  

- Horizontal scalability of the publish process (supported natively) and the synchronization process (may require custom development)  

- Data object limitations, including payload sizes and system constraints

### Data object limitations

To ensure system stability, it's critical to define and enforce appropriate non-functional requirements for P&S, such as the following:

- The maximum size of a storage synchronization message should not exceed 256 KB. This prevents processing issues and ensures that API consumers can reliably receive data without encountering failures because of large payloads.

- Avoid exceeding request limits for storage, such as Redis, and search systems, such as OpenSearch, during the synchronization process.

As with any non-functional requirements, you can adapt these constraints based on project needs. However, this may require a custom implementation or refactoring Spryker's default functionality.

For example, if your project must support sending API payloads larger than 10 MB - an uncommon scenario for e-commerce platforms - it's still achievable with Spryker. However, this requires a thorough review of the business logic tied to the relevant API endpoints and adjustments to support larger objects.
