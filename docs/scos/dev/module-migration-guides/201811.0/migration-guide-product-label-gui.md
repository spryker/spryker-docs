---
title: Migration Guide - Product Label GUI
originalLink: https://documentation.spryker.com/v1/docs/mg-product-label-gui
originalArticleId: 5c3c268e-180f-4de4-8ec6-a53a41752fe6
redirect_from:
  - /v1/docs/mg-product-label-gui
  - /v1/docs/en/mg-product-label-gui
---

## Upgrading from Version 1.* to Version 2.*
In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.

<!--Last review date: Nov 23, 2017 by Aurimas Ličkus  -->
