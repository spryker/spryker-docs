---
title: Migration Guide - Product Set GUI
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/mg-product-set-gui
originalArticleId: 808b34c6-4d08-48e4-8819-398030b3f672
redirect_from:
  - /v1/docs/mg-product-set-gui
  - /v1/docs/en/mg-product-set-gui
related:
  - title: Migration Guide - Price
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-price.html
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we have support multi-currency. First of all make sure you have migrated the Price module. We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core. If you modified `ProductAbstractTableHelper` table class, then this class now receives different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
