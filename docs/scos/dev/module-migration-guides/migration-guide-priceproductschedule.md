---
title: Migration guide - PriceProductSchedule
description: Use the guide to update the PriceProductSchedule module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-price-product-schedule
originalArticleId: f5314ef7-b1aa-4309-8f02-6815e4202415
redirect_from:
  - /2021080/docs/mg-price-product-schedule
  - /2021080/docs/en/mg-price-product-schedule
  - /docs/mg-price-product-schedule
  - /docs/en/mg-price-product-schedule
  - /v4/docs/mg-price-product-schedule
  - /v4/docs/en/mg-price-product-schedule
  - /v5/docs/mg-price-product-schedule
  - /v5/docs/en/mg-price-product-schedule
  - /v6/docs/mg-price-product-schedule
  - /v6/docs/en/mg-price-product-schedule
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-priceproductschedule.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-priceproductschedule.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-priceproductschedule.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-priceproductschedule.html
---

## Upgrading from Version 1.* to Version 2.0.0

1. Upgrade the **PriceProductSchedule** module to version 2.0.0:

```bash
composer require spryker/price-product-schedule: "^2.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```

*Estimated migration time: 5 minutes*
