---
title: Mapping configuration
description: Use mappings to get data of any resource without specifying the resource's ID
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/synchronization-behavior-enabling-multiple-mappings
originalArticleId: 2a708a7b-40a0-43ec-bcbd-939b8453aee7
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
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
  - title: Publish and synchronize and multi-store shop systems
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
---

During the Publish and Synchronization (P&S) process, a unique key is generated for each published resource. This key is used to store the resource's denormalized data in storage, enabling efficient data retrieval later. By default, Spryker generates these keys using the database ID of the corresponding record to ensure uniqueness.


## Example: Abstract product key

For an abstract product, the storage key might look like this:

```text
kv:product_abstract:de:de_de:100
```

| Parameter               | Meaning                               |
|--------------------|---------------------------------------|
| `kv`               | Standard prefix for key-value storage |
| `product_abstract` | Identifies the entity                 |
| `de`               | Store where the entity is available   |
| `de_de`            | Locale for the entity                 |
| `100`              | Product's unique database ID          |




You can query Redis using this key to retrieve the stored product data.

![redis-commander](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/mapping-configuration.md/redis-commander.png)
 

## Reasons to use mappings

The default key generation may not be suitable in cases such as the following:

- You only know the product SKU, not its ID

- Avoid exposing internal database IDs externally

- Your project needs a more flexible lookup strategy

## Mappings

Mappings enable you to associate a resource's internal ID with an alternative, unique identifier–for example, SKU. A mapping creates an additional storage record that links this identifier to the resource ID using a dedicated key. This key does not include the database ID.

Mappings are configured in the Propel schema and used during the P&S process.

 

## Defining mappings

Mappings are defined in the `synchronization` behavior of a Propel schema.

For example, `SKU` can be mapped to `ID` for abstract products in `spy_product_abstract_storage`:

```xml
<table name="spy_product_abstract_storage">
  <behavior name="synchronization">
      <parameter name="mappings" value="sku:id_product_abstract"/>
      ...
  </behavior>
</table>
```

`sku` is the source (alternative key), and `id_product_abstract` is the destination (resource ID).

These values must match keys in the resource payload.

After rebuilding the Propel entity and re-syncing, a new record is stored in Redis. Example:


```text
{"id":1,"_timestamp":1599741494.2676899} 
```

Key example:


```text
kv:product_abstract:de:de_de:sku:001
```

This enables Redis lookups using `sku:001` instead of the database ID.

![redis-sku-lookup](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/mapping-configuration.md/redis-sku-lookup.png)


## Retrieve data using a mapping

To retrieve data using a mapping, take the following steps:

1. To get the product ID, query the mapping key–for example, `sku:001`.

2. Construct the final storage key using the retrieved ID.

3. Query storage again using the full key–for example `kv:product_abstract:de:de_de:100`.

This adds one extra lookup step but has minimal performance impact, especially when using Redis.

## Multiple mappings

Spryker supports multiple mappings per resource. Define them using the same mappings parameter, separated by a configurable delimiter (`;` by default):

```xml
<table name="spy_product_abstract_storage">
<behavior name="synchronization">
    <parameter name="mappings" value="sku:id_product_abstract;foo:bar"/>
    ...
</behavior>
```

Each mapping results in a separate key in storage. After making changes, regenerate the Propel entity classes.

{% info_block warningBox "" %}

You can define only one mapping per source for each resource, and the last defined mapping takes precedence.

{% endinfo_block %}


To change the delimiter, override `\Spryker\Zed\SynchronizationBehavior\SynchronizationBehaviorConfig::MAPPINGS_DELIMITER`.












































