---
title: CRUD Scheduled Prices Migration Concept
originalLink: https://documentation.spryker.com/v5/docs/crud-scheduled-prices-migration-concept
redirect_from:
  - /v5/docs/crud-scheduled-prices-migration-concept
  - /v5/docs/en/crud-scheduled-prices-migration-concept
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
* [PriceProductSchedule](https://documentation.spryker.com/docs/en/mg-price-product-schedule#upgrading-from-version-1---to-version-2-0-0)
* [PriceProductScheduleGui](https://documentation.spryker.com/docs/en/mg-price-product-schedule-gui#upgrading-from-version-1---to-version-2-0-0)

You can find the affected modules of the CRUD scheduled prices update in the following table.

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/price-product-schedule	` | 	2.0.0 | [Migration Guide - PriceProductSchedule](https://documentation.spryker.com/docs/en/mg-price-product-schedule#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/price-product-schedule-gui` | 	2.0.0 | [Migration Guide - PriceProductScheduleGui](https://documentation.spryker.com/docs/en/mg-price-product-schedule-gui#upgrading-from-version-1---to-version-2-0-0) |
