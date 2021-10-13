---
title: Migration Guide - PriceProductScheduleGui
description: Use the guide to update the PriceProductScheduleGui module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/mg-price-product-schedule-gui
originalArticleId: 125bb7b9-3950-4972-8488-3b3b1158da6c
redirect_from:
  - /v5/docs/mg-price-product-schedule-gui
  - /v5/docs/en/mg-price-product-schedule-gui
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
