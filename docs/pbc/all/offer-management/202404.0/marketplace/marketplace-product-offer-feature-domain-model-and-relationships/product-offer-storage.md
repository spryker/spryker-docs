---
title: "Product Offer storage: Domain model and relationships"
description: This document provides reference information about Marketplace Product Offer storage.
template: concept-topic-template
last_updated: Nov 21, 2023
---

Product Offer and data related to it is cached to enhance performance.

{% info_block infoBox "" %}

For details about how to use and configure Redis as a key-value storage, see [Using and configuring Redis as a key-value storage](/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html).

{% endinfo_block %}

The following modules are used for the Product Offer storage:

| MODULE  | DESCRIPTION |
|---------------|----------------|
| [ProductOfferStorage](https://github.com/spryker/product-offer-storage)                                     | Provides publisher plugins and operates data caching according to the entity changes.                        |
| [ProductOfferStorageExtension](https://github.com/spryker/product-offer-storage-extension)                  | Provides interfaces for extending the data caching.                                                          |
| [MerchantProductOfferStorage](https://github.com/spryker/merchant-product-offer-storage)                    | Provides publisher plugins and operates product offer data caching according to the merchant entity changes. |


{% info_block infoBox "" %}

For details about how to use Client, use `Client` of the `ProductOfferStorage` module for getting the cached data, see [Client](/docs/dg/dev/backend-development/client/client.html).

{% endinfo_block %}

## Module relations

The following schema illustrates module relations in the Product Offer storage entity:

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/143ce2da-e590-4a06-994e-f969ef342cea.png?utm_medium=live&utm_source=confluence)
