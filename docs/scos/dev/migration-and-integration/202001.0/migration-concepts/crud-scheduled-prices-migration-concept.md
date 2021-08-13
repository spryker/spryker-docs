---
title: CRUD Scheduled Prices Migration Concept
description: The article provides instructions on how to install CRUD Scheduled Prices on all modules affected in bulk and them individually.
originalLink: https://documentation.spryker.com/v4/docs/crud-scheduled-prices-migration-concept
originalArticleId: 012d7788-a4ac-4961-91ce-1695939e6d85
redirect_from:
  - /v4/docs/crud-scheduled-prices-migration-concept
  - /v4/docs/en/crud-scheduled-prices-migration-concept
---

## General Information
CRUD Scheduled Prices adds UI for creating, reading, updating and deleting scheduled prices for concrete and abstract products.

## Migration Process
Upgrade all the affected modules in bulk by following the steps below.

1. Run the following composer command, but **make sure to remove the modules that are irrelevant for your project from the command**.

```bash
composer update "spryker/*"
composer require spryker/price-product-schedule: "^2.0.0" spryker/price-product-schedule-gui: "^2.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```

3. Follow individual migration guides of the modules listed below:
* [PriceProductSchedule](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide-priceproductschedule.html#upgrading-from-version-1---to-version-2-0-0)
* [PriceProductScheduleGui](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide-priceproductschedulegui.html#upgrading-from-version-1---to-version-2-0-0)

You can find the affected modules of the CRUD scheduled prices update in the following table.

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/price-product-schedule	` | 	2.0.0 | [Migration Guide - PriceProductSchedule](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide-priceproductschedule.html#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/price-product-schedule-gui` | 	2.0.0 | [Migration Guide - PriceProductScheduleGui](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide-priceproductschedulegui.html#upgrading-from-version-1---to-version-2-0-0) |
