---
title: Publish and Synchronization
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization
redirect_from:
  - /2021080/docs/publish-and-synchronization
  - /2021080/docs/en/publish-and-synchronization
---

To access data rapidly, a client (Shop App) uses a key-value storage, *Redis*, and a search engine, *Elasticsearch*, as data sources. The client does not have direct access to the [SQL database](https://documentation.spryker.com/docs/persistence-layer) used by the back end. To keep the client data sources always up to date, all the changes made on the back end should be propagated to the front-end data sources. To do this, Spryker implements a two-step process, called Publish and Synchronize:

1.  Publish:

    1.  An event that describes a change is generated.

    2.  All the data related to the change is collected.

    3.  The data is published in the form suitable for the client.

2.  Synchronize:

    1.  The data is synchronized(synced) to Redis and Elasticsearch.


The advantages of the approach are as follows:

*   High performance and fast (semi-real-time) sync. By default, changes are synced every second.

*   Possibility to stack and optimize SQL queries while publishing data .

*   Possibility to trigger updates automatically by manipulating Propel Entities and without triggering the sync manually.

*   Easy data transformation into the format that can be consumed by a front-end application.

*   Updates can be done incrementally without doing full exports.

*   Data is always available in the SQL database, even if Redis or Elasticsearch storage is corrupted or outdated. You can re-sync it at any time.

*   Data can be localized and target a particular store.


Both Publish and Synchronize implement the queue pattern. See [Spryker Queue Module](https://documentation.spryker.com/docs/queue) to learn more.

The process relies heavily on Propel Behaviors. Propel Behaviors are used to trigger actions automatically on updating the database. This way, you don’t need to trigger any step of the process manually in code. See [Boostrapping a Behavior](http://propelorm.org/documentation/cookbook/writing-behavior.html) to learn more.

### Triggering the publish process

There are 2 ways to start the Publish process:

1.  Trigger the publish event manually using the [Event Facade](https://documentation.spryker.com/docs/event-adding):

```php
$this->eventFacade->trigger(CmsStorageConfig::CMS_KEY_PUBLISH_WRITE, (new EventEntityTransfer())->setId($id));
```

Triggering the publish event manually is preferable when a certain entity passes several stages before becoming available to the customer. A typical use case for this method is content management. In most cases, a page does not become available once you create it. Usually, it exists as a draft to be published later. For example, when a new product is released to the market. In this case, the manual publish is preferable.

2. Manipulate the Propel entities that implement Event Behavior. Any changes done to such an entity in the database trigger the publish event immediately. For example, manipulating an abstract product as follows triggers a _create abstract product_ event:

```php
$productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
$productAbstractEntity->setColorCode("#FFFFFF");
$productAbstractEntity->save();
```

Implementing Event Behaviors is recommended to keep the shop app data up to date. For example, behaviors are widely used in the `Availability` module to inform customers whether a certain product is available for purchase.

### How Publish and Synchronize works


Publish and Synchronize Process schema:
![How Publish and Synchronize works](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Publish+and+Synchronization/how-it-works.png){height="" width=""}

### Publish

On triggering the publish process, an event or events are posted to a queue. Each event message posted to the queue contains the following information on the event that triggered it:

*   Event name

*   ID

*   Names of the corresponding publisher and transfer classes

*   The list of modified columns

*   The foreign keys used to backtrack the updated Propel entities


However, it will not contain the actual data that has changed. Find an example below:
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

Each event is consumed by a publisher plugin mapped to it. The number of events depends on how many publisher plugins are configured for a specific update. For example, when the last product item is sold, its availability status should be changed to _not available_. The availability status of the product bundle it belongs to should be changed as well. Two publishers are required for this purpose: for product availability and product bundle availability. This results into two events posted into the queue.

To consume an event, the queue adapter calls the publisher plugin specified in the `listenerClassName` field of the event message. The publisher is a plugin class implemented in one of the modules. It queries the data affected by an event and transforms it into the format suitable for the front-end data storage (Redis or Elasticsearch).

The transformed data is stored in a dedicated database table. It serves as a _mirror table_ for the respective Redis or Elasticsearch storage. The `data` column of the table contains the data to be synced to the front end, defining [the storage and the key](https://documentation.spryker.com/handling-data-with-publish-and-synchronization#6-storage-table). It is stored in JSON for easy and fast sync. The table also contains the foreign keys used to backtrack data and the timestamp of the last change for each row. The timestamp is used to track changes rapidly.

### Synchronize

When a change happens in the mirror table, its **Synchronization Behavior** sends the updated rows as messages to one of the Sync Queues. After consuming a message, the data is pushed to Redis or Elastisearch.

```json
{
	"write":{
		"key":"url:de:\/de\/mypage",
		"value":{
			"fk_resource_categorynode":null,
			"fk_resource_page":7,
			"fk_resource_product_set":null,
			"fk_resource_product_abstract":null,
			"id_url":488,
			"fk_locale":46,
			"url":"\/de\/mypage",
			"fk_resource_redirect":null,
			"locale_urls":[
				{
					"fk_resource_categorynode":null,
					"fk_resource_page":7,
					"fk_resource_product_set":null,
					"fk_resource_product_abstract":null,
					"id_url":488,
					"fk_locale":46,
					"url":"\/de\/mypage",
					"fk_resource_redirect":null,
					"localeName":"de_DE"
				},
				{
					"fk_resource_categorynode":null,
					"fk_resource_page":7,
					"fk_resource_product_set":null,
					"fk_resource_product_abstract":null,
					"id_url":487,
					"fk_locale":66,
					"url":"\/en\/mypage",
					"fk_resource_redirect":null,
					"localeName":"en_US"
				}
			],
			"_timestamp":1526033491.2159581
			},
		"resource":"url",
		"params":[
		]
	}
}
```

