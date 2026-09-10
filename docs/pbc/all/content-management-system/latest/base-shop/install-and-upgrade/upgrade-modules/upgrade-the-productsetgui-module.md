---
title: Upgrade the ProductSetGui module
description: Use the guide to learn how to update the ProductSetGui module to a newer version.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-set-gui
originalArticleId: c83c362a-22f0-4805-9a54-a28393dd55b9
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productsetgui.html
  - /docs/scos/dev/module-migration-guides/migration-guide-productsetgui.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productsetgui-module.html
related:
  - title: Upgrade the Price module
    link: docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html
---
## Upgrading from version 1.* to version 2.*

From version 2 we have supported multi-currency. First of all make sure you have migrated the `Price` module. We have changed a collector dependency to use the `PriceProduct` module instead of a price. So,  update your code accordingly if you overwrote the core. If you modified the `ProductAbstractTableHelper` table class, it now receives a different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.
