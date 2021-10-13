---
title: Migration Guide - ProductSetGui
description: Use the guide to learn how to update the ProductSetGui module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/mg-product-set-gui
originalArticleId: 0070d03a-0d1f-49a3-892e-a186c5862ccf
redirect_from:
  - /v5/docs/mg-product-set-gui
  - /v5/docs/en/mg-product-set-gui
related:
  - title: Migration Guide - Price
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-price.html
---

## Upgrading from Version 1.* to Version 2.*

From version 2 we have supported multi-currency. First of all make sure you have migrated the `Price` module. We have changed a collector dependency to use the `PriceProduct` module instead of a price. So, please update your code accordingly if you overwrote the core. If you modified the `ProductAbstractTableHelper` table class, it now receives a different bridge `ProductSetGuiToPriceProductFacadeInterface` instead of `ProductSetGuiToPriceProductInterface`.
