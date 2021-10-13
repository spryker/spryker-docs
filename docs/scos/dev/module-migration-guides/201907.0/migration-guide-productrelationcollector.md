---
title: Migration Guide - Product Relation Collector
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/mg-product-relation-collector
originalArticleId: 267e23f9-4fbd-4d66-af62-1778c4aaa7e6
redirect_from:
  - /v3/docs/mg-product-relation-collector
  - /v3/docs/en/mg-product-relation-collector
related:
  - title: Migration Guide - Product Relation
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-product-relation.html
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core.

<!-- 
* [Learn more about Products in multi-store environment](https://documentation.spryker.com/v3/docs/product-store-relation-under-the-hood)-->

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
