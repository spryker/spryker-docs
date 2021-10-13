---
title: Migration Guide - ProductRelationCollector
description: Use the guide to learn how to update the ProductRelationCollector module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/mg-product-relation-collector
originalArticleId: 5c66c303-8562-4731-bc8a-7ad869f8087c
redirect_from:
  - /v5/docs/mg-product-relation-collector
  - /v5/docs/en/mg-product-relation-collector
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core.

<!-- 
* [Learn more about Products in multi-store environment](https://documentation.spryker.com/v5/docs/en/product-store-relation-under-the-hood)-->

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
