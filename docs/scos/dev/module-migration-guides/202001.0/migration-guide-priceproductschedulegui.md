---
title: Migration Guide - PriceProductScheduleGui
description: Use the guide to update the PriceProductScheduleGui module to a newer version.
last_updated: Nov 27, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/mg-price-product-schedule-gui
originalArticleId: 89679f55-772f-467b-8a61-cca93101d224
redirect_from:
  - /v4/docs/mg-price-product-schedule-gui
  - /v4/docs/en/mg-price-product-schedule-gui
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
