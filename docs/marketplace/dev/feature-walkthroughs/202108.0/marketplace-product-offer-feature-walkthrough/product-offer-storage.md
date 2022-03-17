---
title: Product Offer storage
description: This document provides reference information about Marketplace Product Offer storage.
template: concept-topic-template
---

Product Offer and data related to it is cached to enhance performance.

{% info_block infoBox "" %}

For details about how to use and configure Redis as a key-value storage, see [Using and configuring Redis as a key-value storage](/docs/scos/dev/back-end-development/client/using-and-configuring-redis-as-a-key-value-storage.html).

{% endinfo_block %}

The following modules are used for the Product Offer storage:

| MODULE | DESCRIPTION |
| -------------------- | ---------- |
| [MerchantProductOfferStorage](https://github.com/spryker/merchant-product-offer-storage) | Provides entity listeners and operates data  caching according to the entity changes |
| [MerchantProductOfferStorageExtension](https://github.com/spryker/merchant-product-offer-storage-extension) | Provides interfaces for extending the data caching. |


{% info_block infoBox "" %}

For details about how to use Client, use `Client` of the `MerchantProductOfferStorage` module for getting the cached data.  See [Client](/docs/scos/dev/back-end-development/client/client.html).

{% endinfo_block %}

## Module relations

The following schema illustrates module relations in the Product Offer storage entity:

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/088f0f24-b61d-40e0-a402-876fb48915b6.png?utm_medium=live&utm_source=custom)
