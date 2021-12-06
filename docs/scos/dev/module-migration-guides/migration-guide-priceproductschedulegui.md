---
title: Migration guide - PriceProductScheduleGui
description: Use the guide to update the PriceProductScheduleGui module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-price-product-schedule-gui
originalArticleId: 859d0238-d7e4-4f94-ac71-7c1543547364
redirect_from:
  - /2021080/docs/mg-price-product-schedule-gui
  - /2021080/docs/en/mg-price-product-schedule-gui
  - /docs/mg-price-product-schedule-gui
  - /docs/en/mg-price-product-schedule-gui
  - /v4/docs/mg-price-product-schedule-gui
  - /v4/docs/en/mg-price-product-schedule-gui
  - /v5/docs/mg-price-product-schedule-gui
  - /v5/docs/en/mg-price-product-schedule-gui
  - /v6/docs/mg-price-product-schedule-gui
  - /v6/docs/en/mg-price-product-schedule-gui
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-priceproductschedulegui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-priceproductschedulegui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-priceproductschedulegui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-priceproductschedulegui.html
---

## Upgrading from Version 1.* to Version 2.0.0

1. Upgrade the **PriceProductScheduleGui** module to version 2.0.0:

```bash
composer require spryker/price-product-schedule-gui: "^2.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```

*Estimated migration time: 5 minutes*
