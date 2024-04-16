---
title: Publish and synchronize and multi-store shop systems
description: This document describes a way to synchronize data between multiple stores.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/p-s-and-multi-store-shop-systems
originalArticleId: 06d70e00-611d-4d96-835e-70a6490066f7
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
related:
  - title: Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
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
  - title: Publish and Synchronize repeated export
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
---

## Introduction

As Spryker supports multi-store shop systems, there should be a way to synchronize data between all stores. P&S ([Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html)) is a process of handling data transfer from backend to frontend stores. This process can be configured to support multi-store shop systems.

## Configuration

P&S works very closely with queue systems. Queue configuration has to be adjusted to support the routing of P&S messages, so it necessary is to understand the queue configuration shipped with Spryker.

### Queue Configuration

Spryker `Queue Module` has a very simple and standard API, so every queue system can create its own adapter to implement this API. The default queue system adapter shipped with Spryker is RabbitMQ.

{% info_block infoBox %}
Each queue system has a different configuration, but all of them can be adjusted to support the basic needs of the P&S messages routing functionality.
{% endinfo_block %}

The RabbitMq default configuration in Spryker VM looks like this:

* RabbitMq groups queues into virtual hosts.
* RabbitMq provides users/permissions to these virtual hosts.
* Each virtual host belongs to one Store\Environment—for example, DE_development_zed, AT_staging_zed, US_production_zed.
* Messages can be sent to several virtual hosts.

### Spryker entities and multi-store

Entities in Spryker can be global or store-aware. Global entities, like Glossary or URL, don't belong to any specific store. Other entities, like ProductAbstract, belong to a specific store.

The following diagrams show:

* Two different multi-store configurations: the first one is a database with multiple stores while the second one is a database with one store.
* Store aware and global entities: ProductAbstract and URL.
* Routing sync messages based on Store or QueuePool.
* Updating Redis based on Store\Enviorment.
![Spryker entities and multi-store](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Publish+and+Synchronization/Publish+and+Synchronize+and+Multi-Store+Shop+Systems/P%26S+with+multistore.png)

## How it Works

The first diagram shows how P&S works with a multi-store shop system with one database. When the event is triggered, Publisher checks if the entity has information about a store. Depending on the result, it sends a message to the sync queue or the store. Since `spy_product_abstract_storage` has a store column, which defines entity and store relation, ProductAbstract goes to two different store sync queues. URL doesn't have any store, so Publisher sends it only to the default store (the store which Zed is running). To send a URL to other stores, you need to define a **QueuePool**. The [Queue Pool](/docs/dg/dev/backend-development/data-manipulation/queue/queue-pool.html) is designed to allow messages to be sent to several queues. The synchronization process is using SynchronizationPool to get the list of the queues for sending the messages. In this example, URL will be sent to DE and AT as these queues are defined in the `SynchronizationPool` in `store.php`.

{% info_block errorBox %}

An entity cannot have a store relation and SynchronizationPool defined for it simultaneously.

{% endinfo_block %}

The second diagram shows the same thing for a shop with one store per database. Everything is processed in an isolated store environment and nothing is shared among the stores.

## Examples

### Multi-Store Product Abstract Within AT + DE

Let's say that a product abstract is a multi-store entity and URL is a global entity (URL does not contain any store-specific part). In this case, Publisher can specify the stores in which the abstract product will appear, however, its URL will be the same for all the specified stores.

Setting up a multi-store entity:

```xml
<table name="spy_product_abstract_storage">
    ...
    <behavior name="synchronization>
        ...
        <parameter name="store" required="true"/>
    </behavior>
</table>
```

The store attribute in the synchronization behavior marks this entity as a multi-store one. So, when there is an event or ProductAbstract is received by Publisher, it will create as many rows as needed for each store in the `spy_product_abstract_storage` table. Then, the synchronization message will be broadcasted based on the store name.

Setting up a global entity (global stands for AT + DE in this scenario):

```php
<table name="spy_url_storage">
    ...
    <behavior name="synchronization">
        ...
        <parameter name="queue_pool" value="synchronizationPool" />
    </behavior>
</table>
```

This entity has to be synchronized to all related stores (each store which uses the same database). Make sure to use `queue_pool` value to define other environments which you need to notify about the changes of this entity. Pool names are defined in the store's settings.

{% info_block infoBox %}

`queue_pool` argument does not work with store flag, since it would be unclear where to send the message. If you set both, you will get this exception: Spryker\Zed\Synchronization\Business\Exception\SynchronizationQueuePoolNotFoundException - Exception: You must either have store column or \`SynchronizationQueuePoolName\` in your schema.xml file

{% endinfo_block %}
