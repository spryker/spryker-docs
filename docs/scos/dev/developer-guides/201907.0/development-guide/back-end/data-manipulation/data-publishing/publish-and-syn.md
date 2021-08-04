---
title: Publish and Synchronization
originalLink: https://documentation.spryker.com/v3/docs/publish-and-synchronization
redirect_from:
  - /v3/docs/publish-and-synchronization
  - /v3/docs/en/publish-and-synchronization
---

For faster access to data, the client (Shop App) uses a key-value storage, *Redis*, and a search engine, *Elasticsearch*, as data sources. It does not have direct access to the [SQL database](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/persistence-lay) used by the backend. To have the client data sources always up to date, all changes made on the backend need to be propagated to the client data stores. For this purpose, Spryker implements a two-step process, called **Publish and Synchronize**. First, the data is *published*. This means generating an event that describes a change, collecting the related data and publishing it in a form suitable for the client. Then, the data is **synchronized** to *Redis* and *Elasticsearch*.

The advantages of the approach are:

* High performance and fast (semi-realtime) synchronization. By default, changes are synchronized every second.
* Possibility to stack and optimize SQL queries in the process of data publication.
* Possibility to trigger updates by simply manipulating Propel Entities without the need to trigger synchronization manually.
* Free data transformation to present it in a format that can be easily consumed by a front-end application.
* Updates can be done incrementally eliminating the need for full export every time.
* Data integrity and security. The data is always available in the SQL database, even if Redis or Elasticsearch storage becomes corrupted or outdated. You can re-sync it at any time.
* The data can be localized and even target a specific store.

Both *Publish and Synchronize* implement the queue pattern.

For detailed information on queue implementation, see [Spryker Queue Module](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/queue/queue).

Also, the process relies heavily on Propel Behaviors. Behaviors are used to trigger actions automatically upon updating the database. This eliminates the need to trigger any step of the process manually in your code.

For details, see [Boostrapping a Behavior](http://propelorm.org/documentation/cookbook/writing-behavior.html).

## Triggering the Publish Process

There are 2 ways to start the *Publish* process:

* Trigger the **publish** event manually using the [Event Facade](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/event/event-adding):

  ```php
  $this->eventFacade->trigger(CmsEvents::CMS_VERSION_PUBLISH, (new EventEntityTransfer())->setId($id));
  ```

* Manipulate Propel entities that implement **Event Behavior**. When an entity implements an *Event Behavior*, any changes to it in the SQL database generate an event immediately without the necessary to call the *Event Facade*. For example, manipulating an abstract product as follows will generate a *create abstract product* event:

  ```php
  $productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
  $productAbstractEntity->setColorCode("#FFFFFF");
  $productAbstractEntity->save();
  ```

Manual triggering is recommended for cases when a certain entity passes several stages before becoming available to the customer. A typical use case for this method is content management. In most cases, a page does not become available once you create it. Usually, it exists as a draft and published only at a certain moment when time is due (e.g. when a new product is released to the market). In this case, manual publishing using the *Event Facade* is preferable.

Implementing *Event Behaviors* is necessary when you need to always need to have up-to-date data in the shop app. For example, behaviors are widely used in the *Availability Module*, as it is important to inform customers whether a certain product is available for purchase or not.

## How Does Publish and Synchronize Work

Publish and Synchronize Process Schema:
![How Publish and Synchronize works](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Publish+and+Synchronization/how-it-works.png){height="" width=""}

### Publish

Upon triggering the publish process, an event or events will be posted to a queue called **event**. Each event message posted to the queue will contain the following information on the event that triggered it: event name, ID, names of the corresponding listener and transfer classes, list of modified columns, as well as foreign keys necessary to backtrack the updated Propel entities. However, it will not contain the actual data that has changed.

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

Each event is consumed by an [event listener](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/event/event-listen) mapped for it. The number of events depends on how many listeners are configured for a specific update. For instance, selling an item of certain product may require updating it's availability status (i.e. *available* or *not available*). In addition to that, it might be necessary to update the availability of a product bundle it belongs to. For this reason, there will be two listeners configured, one for product availability and one more for bundle availability, resulting in two events in the queue.

To consume an event, the queue adapter will call the listener specified in the *listenerClassName* field of the event message. A listener is a plugin class implemented in one of the modules. Its task is to query the data affected by an event and transform it into a format suitable for the frontend data storage (*Redis* or *Elasticsearch*).

The transformed data is stored in a dedicated database table. It serves as a **mirror table** for the respective *Redis* or *Elasticsearch* store. The table contains the data that needs to be synchronized to the frontend, the storage and the key where it needs to be put. The actual information that needs to be synchronized is stored in the **data** column of each row in the table. It is always kept in a format suitable for the frontend (JSON) for easy and fast synchronization. The table also contains foreign keys necessary to backtrack data and a timestamp of the last change for each row. The timestamp is necessary for faster change tracking.

### Synchronize

As soon as a change occurs in the mirror table stored in the database, its **Synchronization Behavior** sends the updated rows as messages to one of the *Sync Queue*. Upon consuming a message, the data is pushed to *Redis* or *Elastisearch*.

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

