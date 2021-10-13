---
title: Migration Guide - PriceProductSchedule
description: Use the guide to update the PriceProductSchedule module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/mg-price-product-schedule
originalArticleId: 80b337e5-50b1-4902-9344-f71a6b459bec
redirect_from:
  - /v5/docs/mg-price-product-schedule
  - /v5/docs/en/mg-price-product-schedule
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
