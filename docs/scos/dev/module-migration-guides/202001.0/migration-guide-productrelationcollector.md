---
title: Migration Guide - ProductRelationCollector
description: Use the guide to learn how to update the ProductRelationCollector module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/mg-product-relation-collector
originalArticleId: e2bc0572-8548-45c9-ab47-56ed11760465
redirect_from:
  - /v4/docs/mg-product-relation-collector
  - /v4/docs/en/mg-product-relation-collector
related:
  - title: Migration Guide - Product Relation
    link: docs/scos/dev/module-migration-guides/201811.0/migration-guide-product-relation.html
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core.

<!-- 
* [Learn more about Products in multi-store environment](https://documentation.spryker.com/v4/docs/product-store-relation-under-the-hood)-->

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
