---
title: Migration Guide - Product Set GUI
originalLink: https://documentation.spryker.com/v3/docs/mg-product-set-gui
redirect_from:
  - /v3/docs/mg-product-set-gui
  - /v3/docs/en/mg-product-set-gui
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we have support multi-currency. First of all make sure you have migrated the Price module. We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core. If you modified `ProductAbstractTableHelper` table class, then this class now receives different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
