---
title: Migration guide - ProductSetGui
description: Use the guide to learn how to update the ProductSetGui module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-set-gui
originalArticleId: c83c362a-22f0-4805-9a54-a28393dd55b9
redirect_from:
  - /2021080/docs/mg-product-set-gui
  - /2021080/docs/en/mg-product-set-gui
  - /docs/mg-product-set-gui
  - /docs/en/mg-product-set-gui
  - /v1/docs/mg-product-set-gui
  - /v1/docs/en/mg-product-set-gui
  - /v2/docs/mg-product-set-gui
  - /v2/docs/en/mg-product-set-gui
  - /v3/docs/mg-product-set-gui
  - /v3/docs/en/mg-product-set-gui
  - /v4/docs/mg-product-set-gui
  - /v4/docs/en/mg-product-set-gui
  - /v5/docs/mg-product-set-gui
  - /v5/docs/en/mg-product-set-gui
  - /v6/docs/mg-product-set-gui
  - /v6/docs/en/mg-product-set-gui
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productsetgui.html
related:
  - title: Migration guide - Price
    link: docs/scos/dev/module-migration-guides/migration-guide-price.html
---

## Upgrading from version 1.* to version 2.*

From version 2 we have supported multi-currency. First of all make sure you have migrated the `Price` module. We have changed a collector dependency to use the `PriceProduct` module instead of a price. So, please update your code accordingly if you overwrote the core. If you modified the `ProductAbstractTableHelper` table class, it now receives a different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.
