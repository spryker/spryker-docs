---
title: Synchronization behavior - enabling multiple mappings
description: Use mappings to get data of any resource without specifying the resource's ID
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/synchronization-behavior-enabling-multiple-mappings
originalArticleId: 2a708a7b-40a0-43ec-bcbd-939b8453aee7
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
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
  - title: Publish and synchronize and multi-store shop systems
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
---

During the [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html) process, a unique key is generated for each resource published. Resource's denormalized data is then saved with this key to storage for later use. To enforce keys' uniqueness for each resource entity, by default, Spryker uses database IDs of the corresponding records during the key generation.

 Let's take abstract products as an example. A typical key, with which abstract product data is saved to the storage, would look something like this:

 ```php
 kv:product_abstract:de:de_de:123
 ```

 where *123* is the product ID from the database. Now, we can get that product's data straight away by querying storage for this particular key. But what if we don't know ID of a product, but know its SKU? What if we don't want to expose database IDs to the outer world? In these cases, we could make some heavy changes to the Publish & Synchronize mechanism on the project level, or we could use *mappings*.

## What are mappings

You can instruct Publish & Synchronize facilities to create mappings for any resource. Mapping is a relation between a resource's database ID and some other unique piece of information about that resource. In terms of storage, it's an extra-record, related to some resource entity, which stores its ID, and is saved with its own key. This key, of course, does not have database ID as its part. To understand the mappings better, read on how mappings are [defined](#defining) and [used](#using).

<a name="defining"></a>

## Defining mappings

Mappings are defined in Propel schema files.

To illustrate the process, we'll stick to our example abstract product and create a mapping between its ID and SKU.

Suppose we have an abstract product with ID *123* and SKU *xyz*. To create a mapping between SKU and ID for abstract products, we must add an extra parameter called **mappings** to the **synchronization** behavior of the resource schema definition:

```xml
<table name="spy_product_abstract_storage">
  <behavior name="synchronization">
      <parameter name="mappings" value="sku:id_product_abstract"/>
      ...
  </behavior>
</table>
```

The value of this parameter is a string composer of the source (SKU in our example), and the destination (abstract product ID) separated by a colon. Source (SKU) and destination (ID) data is eventually taken from the entity's payload, that is, the data that is saved to storage. Therefore, the source's and destination's names in a schema definition must match the keys in the payload.

After rebuilding the abstract product Propel entity class and synchronizing data to storage, a new storage record is created:

```php
{"id":123,"_timestamp":1599741494.2676899}
```

The key with which this record is stored, looks like this:

```php
kv:product_abstract:de:de_de:sku:xyz
```

where *`xyz`* is the SKU of the particular product.

After that, the product's SKU is mapped to the product's ID.

<a name="using"></a>

## Using mappings

Once you have the mappings, to get the actual product data, you need to make some extra steps:

1. Get the product's ID from the mapping record.
2. Construct the final storage key using the ID obtained from the mapping record.
3. Make another request to the storage.

However, overall, this is pretty reasonable and doesn't bring any notable performance penalties (of course, if you're using some fast storage like Redis).

## Multiple mappings

Because of the way Propel schema files are parsed and merged, previously you could not define several mappings for the same resource. Now you can. For this, multiple source-destination pairs have to be defined as a value of the same `mappings` parameter, separated by a configurable delimiter (`;` by default):

```xml
<table name="spy_product_abstract_storage">
<behavior name="synchronization">
    <parameter name="mappings" value="sku:id_product_abstract;foo:bar"/>
    ...
</behavior>
```

{% info_block infoBox "Delimeter" %}

You can configure the delimiter to separate mappings by overriding `\Spryker\Zed\SynchronizationBehavior\SynchronizationBehaviorConfig::MAPPINGS_DELIMITER`.

{% endinfo_block %}

For each mapping, a separate storage key is generated.

After this adjustment, Propel entity classes have to be rebuilt.

{% info_block warningBox "Note" %}

There's one limitation about the multiple mappings: you cannot define several mappings with the same source portion for the same resource. The last defined mapping with a non-unique source wins.

{% endinfo_block %}
