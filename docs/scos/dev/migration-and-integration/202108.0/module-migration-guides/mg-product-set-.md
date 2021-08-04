---
title: Migration Guide - ProductSetGui
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-set-gui
redirect_from:
  - /2021080/docs/mg-product-set-gui
  - /2021080/docs/en/mg-product-set-gui
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we have supported multi-currency. First of all make sure you have migrated the `Price` module. We have changed a collector dependency to use the `PriceProduct` module instead of a price. So, please update your code accordingly if you overwrote the core. If you modified the `ProductAbstractTableHelper` table class, it now receives a different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.
