---
title: CRUD Scheduled Prices migration concept
description: The article provides instructions on how to install CRUD Scheduled Prices on all modules affected in bulk and them individually.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/updating-a-spryker-based-project
originalArticleId: 864ebca6-3170-4057-9a6b-df4affad73a7
redirect_from:
  - /2021080/docs/updating-a-spryker-based-project
  - /2021080/docs/en/updating-a-spryker-based-project
  - /docs/updating-a-spryker-based-project
  - /docs/en/updating-a-spryker-based-project
  - /v6/docs/updating-a-spryker-based-project
  - /v6/docs/en/updating-a-spryker-based-project
  - /v5/docs/updating-a-spryker-based-project
  - /v5/docs/en/updating-a-spryker-based-project
  - /v4/docs/updating-a-spryker-based-project
  - /v4/docs/en/updating-a-spryker-based-project
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
* [PriceProductSchedule](/docs/scos/dev/module-migration-guides/migration-guide-priceproductschedule.html#upgrading-from-version-1-to-version-200)
* [PriceProductScheduleGui](/docs/scos/dev/module-migration-guides/migration-guide-priceproductschedulegui.html)

You can find the affected modules of the CRUD scheduled prices update in the following table.

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/price-product-schedule	` | 	2.0.0 | [Migration Guide - PriceProductSchedule](/docs/scos/dev/module-migration-guides/migration-guide-priceproductschedule.html#upgrading-from-version-1-to-version-200) |
| `spryker/price-product-schedule-gui` | 	2.0.0 | [Migration Guide - PriceProductScheduleGui](/docs/scos/dev/module-migration-guides/migration-guide-priceproductschedulegui.html) |
