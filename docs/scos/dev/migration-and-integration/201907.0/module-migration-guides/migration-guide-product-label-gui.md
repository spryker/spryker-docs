---
title: Migration Guide - Product Label GUI
originalLink: https://documentation.spryker.com/v3/docs/mg-product-label-gui
originalArticleId: 56ebd185-412b-4754-84b7-63be0d9b87ea
redirect_from:
  - /v3/docs/mg-product-label-gui
  - /v3/docs/en/mg-product-label-gui
---

## Upgrading from Version 1.* to Version 2.*
In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](/docs/scos/dev/migration-and-integration/201907.0/module-migration-guides/migration-guide-price.html). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.

<!--Last review date: Nov 23, 2017 by Aurimas Ličkus  -->
