---
title: Synchronization behavior- enabling multiple mappings
originalLink: https://documentation.spryker.com/v6/docs/synchronization-behavior-enabling-multiple-mappings
redirect_from:
  - /v6/docs/synchronization-behavior-enabling-multiple-mappings
  - /v6/docs/en/synchronization-behavior-enabling-multiple-mappings
---

During the [Publish and Synchronization](https://documentation.spryker.com/docs/en/publish-and-synchronization) process, a unique key is generated for each resource published. Resource’s denormalized data is then saved with this key to storage for later use. To enforce keys' uniqueness for each resource entity, by default, Spryker uses database IDs of the corresponding records during the key generation.

 Let’s take abstract products as an example. A typical key, with which abstract product data is saved to the storage, would look something like this:
 
 ```PHP
 kv:product_abstract:de:de_de:123
 ```
 where *123* is the product ID from the database. Now, we can get that product's data straight away by querying storage for this particular key. But what if we don’t know ID of a product, but know its SKU? What if we don’t want to expose database IDs to the outer world? In these cases, we could make some heavy changes to the Publish & Synchronize mechanism on the project level, or we could use *mappings*.

##  What are mappings
You can instruct Publish & Synchronize facilities to create mappings for any resource. Mapping is a relation between a resource’s database ID and some other unique piece of information about that resource. In terms of storage, it is an extra-record, related to some resource entity, which stores its ID, and is saved with its own key. This key, of course, does not have database ID as its part. To understand the mappings better, read on how mappings are [defined](#defining) and [used](#using).

<a name="defining"></a>

## Defining mappings
Mappings are defined in Propel schema files. 

To illustrate the process, we’ll stick to our example abstract product and create a mapping between its ID and SKU. 

Suppose we have an abstract product with ID *123* and SKU *xyz*. To create a mapping between SKU and ID for abstract products, we must add an extra parameter called **mappings** to the **synchronization** behavior of the resource schema definition:

```XML
<table name="spy_product_abstract_storage">
  <behavior name="synchronization">
      <parameter name="mappings" value="sku:id_product_abstract"/>
      ...
  </behavior>
</table>
```
The value of this parameter is a string composer of the source (SKU in our example), and the destination (abstract product ID) separated by a colon. Source (SKU) and destination (ID) data is eventually taken from the entity’s payload, that is, the data that is saved to storage. Therefore, the source’s and destination’s names in a schema definition must match the keys in the payload.

After rebuilding the abstract product Propel entity class and synchronizing data to storage, a new storage record is created:

```PHP
{"id":123,"_timestamp":1599741494.2676899}
```
The key with which this record is stored, looks like this:
```PHP
kv:product_abstract:de:de_de:sku:xyz
```
where *xyz* is the SKU of the particular product. 

That being done, we have mapped the product’s SKU to the product’s ID.

<a name="using"></a>

## Using mappings

Once you have the mappings, to get the actual product data, you obviously need to make some extra steps:

1. Get product’s ID from the mapping record.
2. Construct the final storage key using the ID obtained from the mapping record.
3. Make another request to the storage.

However, overall, this is pretty reasonable and doesn’t bring any notable performance penalties (of course, if you’re using some fast storage like Redis).

## Multiple mappings
Because of the way Propel schema files are parsed and merged, previously it was not possible to define several mappings for the same resource. Now it is possible. For this, multiple source-destination pairs have to be defined as a value of the same `mappings` parameter, separated by a configurable delimiter (`;` by default):

```XML
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

There’s one limitation about the multiple mappings: you cannot define several mappings with the same source portion for the same resource - the last defined mapping with a non-unique source will win.

{% endinfo_block %}
