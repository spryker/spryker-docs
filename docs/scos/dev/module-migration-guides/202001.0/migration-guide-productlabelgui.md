---
title: Migration Guide - ProductLabelGUI
description: Use the guide to learn how to update the ProductLabelGui module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/mg-product-label-gui
originalArticleId: 411c0f26-abab-4401-ab32-fdaea032871e
redirect_from:
  - /v4/docs/mg-product-label-gui
  - /v4/docs/en/mg-product-label-gui
---

## Upgrading from Version 1.* to Version 2.*
In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.

<!--Last review date: Nov 23, 2017 by Aurimas Ličkus  -->
