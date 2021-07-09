---
title: Product offer in Back Office
description: This article provides details about product offer works in back office of the back-end project in the Spryker Marketplace.
template: concept-topic-template
---

This article provides details about product offer works in Back Office of the back-end project in the Spryker Marketplace.

To inject Product offer to [Back office](https://documentation.spryker.com/docs/spryker-core-back-office) the following modules have been provided:

| Module | Details |
| -------------------- | ---------- |
| [ProductOfferGui](https://github.com/spryker/product-offer-gui) | Main module, provides CRUD functionality for product offers in Back Office. Could be extended by implementing interfaces from ProductOfferGuiExtension module | 
| [ProductOfferGuiExtension](https://github.com/spryker/product-offer-gui-extension) | Provides interfaces for ProductOfferGui module extending | 
| [MerchantProductOfferGui](https://github.com/spryker/merchant-product-offer-gui) | Extends ProductOfferGui, adds merchant context for managing in Back office |
| [ProductOfferValidityGui](https://github.com/spryker/product-offer-validity-gui) | Extends ProductOfferGui, adds [validity](/docs/marketplace/dev/back-end/features/marketplace-product-offer-learn-more/validity-dates.html) context for managing in Back office | 

### Module dependency graph

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/5db1ea40-576c-4663-b53d-e37469be0f81.png?utm_medium=live&utm_source=custom)
