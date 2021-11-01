---
title: Migration Guide - ProductRelationCollector
description: Use the guide to learn how to update the ProductRelationCollector module to a newer version.
last_updated: Aug 27, 2020
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/mg-product-relation-collector
originalArticleId: 2f8426e8-de47-4380-b5e2-c62c68256e18
redirect_from:
  - /v6/docs/mg-product-relation-collector
  - /v6/docs/en/mg-product-relation-collector
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core.

<!-- 
* [Learn more about Products in multi-store environment](https://documentation.spryker.com/v6/docs/product-store-relation-under-the-hood)-->

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
