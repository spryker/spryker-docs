---
title: Upgrade to CRUD Scheduled Prices
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
  - /docs/scos/dev/migration-concepts/crud-scheduled-prices-migration-concept.html
  - /docs/pbc/all/price-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-to-crud-scheduled-prices.html
related:
  - title: Decimal Stock migration concept
    link: docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html
  - title: Float Stock for Products
    link: docs/scos/dev/migration-concepts/float-stock-for-products-migration-concept.html
  - title: Migrating from Twig v1 to Twig v3
    link: docs/scos/dev/migration-concepts/migrating-from-twig-v1-to-twig-v3.html
  - title: Split Delivery migration concept
    link: docs/pbc/all/order-management-system/page.version/base-shop/install-and-upgrade/split-delivery-migration-concept.html
  - title: Silex Replacement migration concept
    link: docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html
---

## General information

CRUD Scheduled Prices adds UI for creating, reading, updating and deleting scheduled prices for concrete and abstract products.

## Migration process

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

- [PriceProductSchedule](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductschedule-module.html#upgrading-from-version-1-to-version-200)
- [PriceProductScheduleGui](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductschedulegui-module.html)

You can find the affected modules of the CRUD scheduled prices update in the following table.

| MODULE | VERSION | MIGRATION GUIDE |
| --- | --- | --- |
| `spryker/price-product-schedule` | 	2.0.0 | [Upgrade the PriceProductSchedule module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductschedule-module.html#upgrading-from-version-1-to-version-200) |
| `spryker/price-product-schedule-gui` | 	2.0.0 | [Upgrade the PriceProductScheduleGui module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductschedulegui-module.html) |
