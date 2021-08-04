---
title: Migration Guide - ProductLabelGUI
originalLink: https://documentation.spryker.com/v5/docs/mg-product-label-gui
redirect_from:
  - /v5/docs/mg-product-label-gui
  - /v5/docs/en/mg-product-label-gui
---

## Upgrading from Version 1.* to Version 2.*
In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](https://documentation.spryker.com/docs/en/mg-price). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.

<!--Last review date: Nov 23, 2017 by Aurimas Ličkus  -->
