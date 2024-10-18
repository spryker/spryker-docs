---
title: Publish and Synchronization
description: Publish and Synchronization process synchronizes all changes made on the backend need to be propagated to the client data stores.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization
originalArticleId: 58721bca-2881-4583-a9fa-59d698e8b9bb
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
related:
  - title: Implement Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
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

To access data rapidly, the Shop App client uses Redis as a key-value storage and Elasticsearch as a search engine for data sources. The client does not have direct access to the [SQL database](/docs/dg/dev/backend-development/zed/persistence-layer/persistence-layer.html) used by the back end. Therefore, to ensure that client data sources are always up-to-date, all changes made in the back end must be propagated to the frontend data sources. To achieve this, Spryker implements a two-step process called Publish and Synchronize (aka P&S):

1. Publish:
   1. An event that describes a change is generated.
   2. All the data related to the change is collected.
   3. The data is published in a form suitable for the client.
2. Synchronize:
   1. The data is synced to Redis and Elasticsearch.


The advantages of the approach are:

* High performance and fast (semi-real-time) sync, with changes synced every second by default.
* Possibility to stack and optimize SQL queries while publishing data.
* Possibility to trigger updates automatically by manipulating Propel entities and without triggering the sync manually.
* Easy data transformation into the format that can be consumed by a frontend application.
* Updates can be done incrementally without doing full exports.
* Data is always available in the SQL database, even if Redis or Elasticsearch storage is corrupted or outdated. You can re-sync the data at any time.
* Data can be localized and targeted at a specific store.


Both Publish and Synchronize implement the queue pattern. See [Spryker Queue Module](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html) to learn more.

The process relies heavily on Propel behaviors, which are used to trigger actions automatically when updating the database. Thus, you don't need to trigger any step of the process in the code manually. See [Boostrapping a Behavior](http://propelorm.org/documentation/cookbook/writing-behavior.html) to learn more.

### Triggering the Publish process

There are 2 ways to start the Publish process: automated and manual.

#### Automated event emitting

Any changes done to an entity implementing the _event_ Propel behavior triggers a publish event immediately. CUD (create, update, delete) operations are covered by this Propel behavior. So you can expect these three types of events on creation, update, and deletion of DB entities managed by Propel ORM.

For example, saving an abstract product triggers the _create abstract product_ event:

```php
$productAbstractEntity = SpyProductAbstractQuery::create()->findOne();
$productAbstractEntity->setColorCode("#FFFFFF");
$productAbstractEntity->save();
```

Implementing event behaviors is recommended for your project features to keep the Shop App data up-to-date. For example, behaviors are widely used in the `Availability` module to inform customers whether a certain product is available for purchase.

#### Manual event emitting

You can trigger the publish event manually using the [Event Facade](/docs/dg/dev/backend-development/data-manipulation/event/add-events.html):

```php
$this->eventFacade->trigger(CmsStorageConfig::CMS_KEY_PUBLISH_WRITE, (new EventEntityTransfer())->setId($id));
```

Manual even emitting is best suited when an entity passes several stages before becoming available to a customer. A typical use case for this method is content management. In most cases, a page does not become available once you create it. Usually, it exists as a draft to be published later. For example, when a new product is released to the market.

### How Publish and Synchronize works

Publish and Synchronize Process schema:
![How Publish and Synchronize works](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Publish+and+Synchronization/how-it-works.png)

### Publish

When the publish process is triggered, an event or events are posted to a queue. Each event message posted to the queue contains the following information on the event that triggered it:
* Event name
* ID
* Names of the corresponding publisher and transfer classes
* The list of modified columns
* The foreign keys used to backtrack the updated Propel entities


However, it will not contain the actual data that has changed. See the following example:

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

Each event is consumed by a publisher plugin that is mapped to it. The number of events depends on how many publisher plugins are configured for a specific update. For example, when the last product item is sold, its availability status should be changed to _not available_. The availability status of the product bundle it belongs to should be changed as well. Two publishers are required for this purpose: one for product availability and another for product bundle availability. As a result, two events are posted into the queue.

To consume an event, the queue adapter calls the publisher plugin specified in the `listenerClassName` field of the event message. The publisher is a plugin class implemented in one of the modules. It queries the data affected by an event and transforms it into a format suitable for frontend data storage (Redis or Elasticsearch).

The transformed data is stored in a dedicated database table. It serves as a _mirror table_ for the respective Redis or Elasticsearch storage. The `data` column of the table contains the data to be synced to the front end, defining [the storage and the key](/docs/dg/dev/backend-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html). It is stored in JSON for easy and fast synchronization. The table also contains the foreign keys used to backtrack data and the timestamp of the last change for each row. The timestamp is used to track changes rapidly.

### Synchronize

When a change happens in the mirror table, its *synchronization behavior* sends the updated rows as messages to one of the Sync Queues. After consuming a message, the data is pushed to Redis or Elastisearch.

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

#### Direct synchronize

To optimize performance and flexibility, you can enable direct synchronization on the project level. This approach uses in-memory storage to retain all synchronization events instead of sending them to the queue. With this setup, you can control if entities are synchronized directly or through the traditional queue-based method.

To enable direct synchronization, do the following:
1. Add `DirectSynchronizationConsolePlugin` to `ConsoleDependencyProvider::getEventSubscriber()`.
2. Enable the `SynchronizationBehaviorConfig::isDirectSynchronizationEnabled()` configuration.

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Synchronization\Communication\Plugin\Console\DirectSynchronizationConsolePlugin;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\EventDispatcher\EventSubscriberInterface>
     */
    public function getEventSubscriber(Container $container): array
    {
        return [
            new DirectSynchronizationConsolePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SynchronizationBehavior;

use Spryker\Zed\SynchronizationBehavior\SynchronizationBehaviorConfig as SprykerSynchronizationBehaviorConfig;

class SynchronizationBehaviorConfig extends SprykerSynchronizationBehaviorConfig
{
    public function isDirectSynchronizationEnabled(): bool
    {
        return true;
    }
}
```

3. Optional: This configuration enables direct synchronization for all entities with synchronization behavior. If needed, you can disable direct synchronization for specific entities by adding an additional parameter in the Propel schema:

```xml
<table name="spy_table_storage" identifierQuoting="true">
    <behavior name="synchronization">
        <parameter name="direct_sync_disabled"/>
    </behavior>
</table>
```

**Environment Limitations**

**Disabled Dynamic Multi-Store (DMS) environment:**

When using the DMS-OFF behavior, the Direct Sync feature has the following limitations:  
- Single store configuration: The feature will only work for a single store configuration.
- Multi store configuration with namespace consistency: If you have more than one store, all Storage and Search namespaces must be the same across stores.

Example configuration for multiple stores:

```yaml
stores:
    DE:
        services:
            broker:
                namespace: de-docker
            key_value_store:
                namespace: 1
            search:
                namespace: search
    AT:
        services:
            broker:
                namespace: at-docker
            key_value_store:
                namespace: 1
            search:
                namespace: search
```

**Enabled Dynamic Multi-Store environment:**

There are no environment limitations for the Direct Sync feature when the Dynamic Multi-Store feature is enabled. 


### Data Architecture

P&S plays a major role in data denormalization and distribution to Spryker storefronts and API. Denormalization procedure aims for preparing data in the form it will be consumed by data clients. Distribution procedure aims to distribute the data closer to the end users, so that they feel like accessing a local storage.

{% info_block infoBox "Project Example"%}

Some of Spryker partners applied P&S features to distribute data over picking devices (barcode scanners) in a warehouse. The picking devices accessed the Spryker catalog as their local one, enabling them to properly function with low quality or missing network access.

In other cases, P&S enabled customer projects to keep their main backend systems with customer data in one region (eg Germany), while distributing local catalogs over the world. This enabled them on one hand to keep customer data under data privacy constraints, and on other hand their buyers in Brazil can browse their catalogs (as "local") with blazing fast response times.

P&S inspires intelligent solutions and smart architecture designs!
{% endinfo_block %}

When designing a solution using P&S we need to consider the following concerns in our applications
- eventual consistency for data available in storefronts
- horizontal scalability of publish process (native) and sync process (requires development)
- data object limitations

#### Data Object Limitations

In order to build a healthy commerce system, we need to make sure that P&S process is healthy at all times. And first we start with healthy NFRs for P&S.
- storage sync message size should not be over 256Kb - this prevents us from problems in data processing, but even more important in data comsumption, when an API consumer might experience failure when reviceing an aggregated object of a high size.
- do not exceed the request limitations for the storage (eg. Redis) and search (eg. OpenSearch) systems, while sending data in sync process

{% info_block infoBox "Are these really limitations?"%}

As every non-functional requirement (NFR) each of these limitations might be changed and adjusted to the project needs.
However that might require an additional implementation or refactorring of Spryker OOTB functionallities.

For examples if your business requirements include sending objects above 10MB via API, which is not typical for e-commerce projects, that is still possible with Spryker. However it might require a review of the business logic attached to the API endpoint, and be adjusted to the new requirements. In this case the default requirement of 256KB for a sync message size is not applicable anymore.

{% endinfo_block %}
