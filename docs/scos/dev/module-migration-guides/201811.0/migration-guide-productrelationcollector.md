---
title: Migration Guide - Product Relation Collector
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/mg-product-relation-collector
originalArticleId: 22d1124b-a8a2-4862-ad11-0a887c9bba28
redirect_from:
  - /v1/docs/mg-product-relation-collector
  - /v1/docs/en/mg-product-relation-collector
related:
  - title: Migration Guide - Product Relation
    link: docs/scos/dev/module-migration-guides/201811.0/migration-guide-product-relation.html
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core.

<!-- 
* [Learn more about Products in multi-store environment](https://documentation.spryker.com/v1/docs/product-store-relation-under-the-hood)-->

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
