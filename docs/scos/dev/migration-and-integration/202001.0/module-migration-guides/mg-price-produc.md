---
title: Migration Guide - PriceProductSchedule
originalLink: https://documentation.spryker.com/v4/docs/mg-price-product-schedule
redirect_from:
  - /v4/docs/mg-price-product-schedule
  - /v4/docs/en/mg-price-product-schedule
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
