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
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html
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
  - title: Publish and Synchronize repeated export
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/mapping-configuration.html
---


Spryker is designed for multi-store environments and supports seamless data synchronization across stores. The Publish and Synchronization (P&S) mechanism enables the transfer of data from the backend (database) to the frontend storage (Redis, Elasticsearch). By default, P&S is configured to support multi-store setups.

This article explains key concepts and configuration related to multi-store compatibility in Spryker. For a general overview of P&S, see [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html).

## Dynamic multi-store: enabled

For details on systems with dynamic multistore enabled, see [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/base-shop/dynamic-multistore-feature-overview).

## Dynamic multi-store: disabled

Spryker supports both global and store-aware entities:

- Global entities, such as `SpyGlossary` or `SpyUrl`, don't belong to a specific store.

- Store-aware entities, such as `SpyProductAbstract`, are associated with specific stores.

When an event is triggered, the publisher determines whether the related entity includes store information. Based on this, it sends a message either to a store-specific sync queue or to the default queue. For example, `spy_product_abstract_storage` includes a store column. This enables the `SpyProductAbstract` entity to be sent to separate queues for each store–for example, AT and DE. In contrast, URL doesn't include store information. By default, it is sent only to the store where Zed is running. For example, you have a Zed application running in the DE store, which means the message is sent only to the DE store sync.

To synchronize global entities, such as URLs, across multiple stores, use the QueuePool configuration. QueuePool defines a set of queues for synchronization. The SynchronizationPool service then uses this configuration to route messages appropriately.

⚠️ An entity cannot define both a store relation and a synchronization pool. This causes a conflict.

## Example

Using the previous example, you can observe the following:

- `SpyProductAbstract` is a multi-store entity. The product abstract appears in multiple stores–for example, AT and DE, each with store-specific data.

- `SpyUrl` is a global entity. The URL remains the same across stores because it's not store-specific.


### Defining a multi-store entity

In schema.xml:


```xml
<table name="spy_product_abstract_storage">
    ...
    <behavior name="synchronization>
        ...
        <parameter name="store" required="true"/>
    </behavior>
</table>
```

Setting the store parameter to true marks the entity as store-aware. When a SpyProductAbstract event occurs, the system creates a separate row in the storage table for each store. Messages are then sent to each store's synchronization queue.

Queue processing diagram:


### Defining a global entity


In schema.xml:


```xml
<table name="spy_url_storage">
    ...
    <behavior name="synchronization">
        ...
        <parameter name="queue_pool" value="synchronizationPool" />
    </behavior>
</table>
```


Here, the queue_pool parameter ensures that synchronization messages are sent to all relevant stores. The pool name must be defined in the store configuration (store.php).


{% info_block infoBox %}

- Use queue_pool only for global entities. Avoid using it alongside the store flag.

- If you define both queue_pool and store parameters in the same schema, Spryker cannot determine where to send the message. This results in the following error:
```
Spryker\Zed\Synchronization\Business\Exception\SynchronizationQueuePoolNotFoundException - Exception: You must either have store column or `SynchronizationQueuePoolName` in your schema.xml file
```

{% endinfo_block %}