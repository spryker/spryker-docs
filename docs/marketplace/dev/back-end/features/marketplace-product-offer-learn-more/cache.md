---
title: Product offer storage
description: This article provides details about Marketplace Product Offer storage feature of the back-end project in the Spryker Marketplace.
template: concept-topic-template
---

This article provides details about Marketplace Product Offer storage feature of the back-end project in the Spryker Marketplace.

{% info_block infoBox "" %}

See Conceptual [Overview](https://documentation.spryker.com/docs/redis-as-kv) to learn more about Using and Configuring Redis as a Key-value Storage in Spryker

{% endinfo_block %}

Product offer and related to its data is cached to enhance perfomance and availability. 
For the details please see the following modules:

| Module | Details |
| -------------------- | ---------- | 
| [MerchantProductOfferStorage](https://github.com/spryker/merchant-product-offer-storage) | Provides entity listeners and operates over caching data according to entity changes | 
| [MerchantProductOfferStorageExtension](https://github.com/spryker/merchant-product-offer-storage-extension) | Implement interfaces from the module in order to extend cashing data | 

Use `Client` of `MerchantProductOfferStorage` module for getting cashed data 

{% info_block infoBox "" %}

See Conceptual [Overview](https://documentation.spryker.com/docs/client) to learn more about how to use Client

{% endinfo_block %}

### Module dependency graph

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/088f0f24-b61d-40e0-a402-876fb48915b6.png?utm_medium=live&utm_source=custom)

