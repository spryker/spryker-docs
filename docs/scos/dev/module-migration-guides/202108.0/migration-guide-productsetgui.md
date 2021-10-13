---
title: Migration Guide - ProductSetGui
description: Use the guide to learn how to update the ProductSetGui module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-set-gui
originalArticleId: c83c362a-22f0-4805-9a54-a28393dd55b9
redirect_from:
  - /2021080/docs/mg-product-set-gui
  - /2021080/docs/en/mg-product-set-gui
  - /docs/mg-product-set-gui
  - /docs/en/mg-product-set-gui
related:
  - title: Migration Guide - Price
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-price.html
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we have supported multi-currency. First of all make sure you have migrated the `Price` module. We have changed a collector dependency to use the `PriceProduct` module instead of a price. So, please update your code accordingly if you overwrote the core. If you modified the `ProductAbstractTableHelper` table class, it now receives a different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.
