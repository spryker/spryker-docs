---
title: Product Offer storage
description: This article provides reference information about Marketplace Product Offer storage.
template: concept-topic-template
---

Product Offer and data related to it is cached to enhance performance.

{% info_block infoBox "Note" %}

See [Using and configuring Redis as a key-value Storage](/docs/scos/dev/back-end-development/client/using-and-configuring-redis-as-a-key-value-storage.html) for details on how to use and configure Redis as a key-value storage.

{% endinfo_block %}

The following modules are used for the Product Offer storage:

| MODULE | DESCRIPTION |
| -------------------- | ---------- |
| [MerchantProductOfferStorage](https://github.com/spryker/merchant-product-offer-storage) | Provides entity listeners and operates data  caching according to the entity changes |
| [MerchantProductOfferStorageExtension](https://github.com/spryker/merchant-product-offer-storage-extension) | Provides interfaces for extending the data caching. |


{% info_block infoBox "" %}

Use `Client` of the `MerchantProductOfferStorage` module for getting the cached data.  See [Client](/docs/scos/dev/back-end-development/client/client.html) for details on how to use Client.

{% endinfo_block %}

## Module relations

The following schema illustrates module relations in the Product Offer storage entity:

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/088f0f24-b61d-40e0-a402-876fb48915b6.png?utm_medium=live&utm_source=custom)
