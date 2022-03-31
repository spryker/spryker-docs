---
title: Marketplace upcoming major module releases
description: Find out when and what modules will be updated in the next major version.
last_updated: Nov 27, 2021
template: concept-topic-template
---

{% info_block infoBox "Info" %}

To learn about the SCOS related upcoming major releases, see [Upcoming major module releases](/docs/scos/user/intro-to-spryker/whats-new/upcoming-major-module-releases.html).

{% endinfo_block %}

[Major module releases](/docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) might require some development efforts from projects. To help you plan in advance, check out the following table for information on modules for which we plan major releases.


| MODULE | DATE | REASON FOR THE MAJOR VERSION |
| --- | --- | --- |
| [MerchantProductOfferStorage](https://github.com/spryker/merchant-product-offer-storage) | Q1 2022 | Based on refactoring. `MerchantProductOfferStorage` will be decomposed into `ProductOfferStorage` and `MerchantProductOfferStorage` modules. The following modules will receive a cascading major release: `ProductOfferPricesRestApi`, `MerchantProductOfferWidget`, `MerchantProductOffersRestApi` |
| [ProductMerchantPortalGui](https://github.com/spryker/product-merchant-portal-gui) | Q1 2022 | Adding product approval status capability to the UI. |
