---
title: Decimal Stock migration concept
description: The article provides instructions on how to install Decimal Stock on all modules affected in bulk and then individually.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/decimal-stock-concept
originalArticleId: da336e52-e8e8-4849-9be3-e208cd42e273
redirect_from:
  - /2021080/docs/decimal-stock-concept
  - /2021080/docs/en/decimal-stock-concept
  - /docs/decimal-stock-concept
  - /docs/en/decimal-stock-concept
  - /v6/docs/decimal-stock-concept
  - /v6/docs/en/decimal-stock-concept
  - /v5/docs/decimal-stock-concept
  - /v5/docs/en/decimal-stock-concept
  - /v4/docs/decimal-stock-concept
  - /v4/docs/en/decimal-stock-concept
related:
  - title: Packaging Units feature overview
    link: docs/scos/user/features/page.version/packaging-units-feature-overview.html
---

## General information
The feature supports decimal inventory in terms of stock and availability, amount of reserved products, as well as amount values of a packaging unit.

## Migration process
You can upgrade all modules affected by the feature in bulk.

**To update all the modules affected by feature in bulk, do the following:**

1. Run the following composer command. Feel free **to remove the modules that are irrelevant to your project from the packages list.**

```bash
composer remove spryker/stock-sales-connector
composer update "spryker/*" "spryker-shop/*"

composer require "spryker/availability: ^9.0.0" "spryker/oms: ^11.0.0" "spryker/stock: ^8.0.0" "spryker/stock-gui: ^2.0.0" "spryker/availability-storage: ^2.0.0" "spryker/availability-gui: ^6.0.0" "spryker/availability-cart-connector: ^7.0.0" "spryker/availability-offer-connector: ^4.0.0" "spryker/cart-variant: ^2.0.0" "spryker/product-availabilities-rest-api: ^4.0.0" "spryker/product-bundle: ^7.0.0" "spryker/discount-promotion: ^4.0.0" "spryker/product-packaging-unit: ^4.0.0" "spryker/product-measurement-unit: ^5.0.0" "spryker/product-packaging-unit-data-import: ^2.0.0" "spryker/product-packaging-unit-storage: ^5.0.0" "spryker/product-management: ^0.19.0" "spryker-shop/product-packaging-unit-widget: ^0.5.0" --update-with-dependencies
```

2. Follow the steps in the individual migration guide for [ProductPackagingUnit](/docs/scos/dev/module-migration-guides/migration-guide-productpackagingunit.html#upgrading-from-version-3-to-version-400).
3. Update the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```

4. Run the database migration:

```bash
console propel:install
console transfer:generate
```

5. Follow the steps in the individual migration guide for [ProductPackagingUnitStorage](/docs/scos/dev/module-migration-guides/migration-guide-productpackagingunitstorage.html#upgrading-from-version-4-to-version-500).

6. Follow the steps in the individual migration guide for [Availability](/docs/scos/dev/module-migration-guides/migration-guide-availability.html#upgrading-from-version-8-to-version-900).

{% info_block errorBox %}

Care should be taken on the project level code to handle the availability and stock values as decimal objects. Due to the PHP floating-point precision issues, all decimal numbers in Spryker are wrapped in `decimal-object` that handles the calculations performed on them to allow exact precision. For more informatkion about the`decimal-object` library, see [HowTo - Integrate and use precise decimal numbers](/docs/scos/dev/tutorials-and-howtos/howtos/howto-integrate-and-use-precise-decimal-numbers.html).

{% endinfo_block %}

The following table lists the modules affected by the Decimal Stock update and will be released as a major or a semantic major.

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/availability` | 9.0.0 | [Migration Guide - Availability](/docs/scos/dev/module-migration-guides/migration-guide-availability.html#upgrading-from-version-8-to-version-900) |
| `spryker/oms` | 11.0.0 | [Migration Guide - OMS](/docs/scos/dev/module-migration-guides/migration-guide-oms.html#upgrading-from-version-10-to-version-1100) |
| `spryker/stock` | 8.0.0 | [Migration Guide - Stock](/docs/scos/dev/module-migration-guides/migration-guide-stock.html#upgrading-from-version-7-to-version-800) |
| `spryker/availability-storage` | 2.0.0 | [Migration Guide - AvailabilityStorage](/docs/scos/dev/module-migration-guides/migration-guide-availabilitystorage.html#upgrading-from-version-1-to-version-200) |
| `spryker/availability-gui` | 6.0.0 | [Migration Guide - AvailabilityGui](/docs/scos/dev/module-migration-guides/migration-guide-availabilitygui.html#upgrading-from-version-5-to-version-600) |
| `spryker/availability-cart-connector` | 7.0.0 | [Migration Guide - AvailabilityCartConnector](/docs/scos/dev/module-migration-guides/migration-guide-availabilitycartconnector.html#upgrading-from-version-6-to-version-700) |
| `spryker/availability-offer-connector` | 4.0.0 | [Migration Guide - AvailabilityOfferConnector](/docs/scos/dev/module-migration-guides/migration-guide-availabilityofferconnector.html#upgrading-from-version-3-to-version-400) |
| `spryker/cart-variant` | 2.0.0 | [Migration Guide - CartVariant](/docs/scos/dev/module-migration-guides/migration-guide-cartvariant.html#upgrading-from-version-1-to-version-200) |
| `spryker/product-availabilities-rest-api` | 4.0.0 | [Migration Guide - ProductAvailabilitiesRestApi](/docs/scos/dev/module-migration-guides/glue-api/migration-guide-productavailabilitiesrestapi.html#upgrading-from-version-3-to-version-4) |
| `spryker/product-bundle` | 7.0.0 | [Migration Guide - ProductBundle](/docs/scos/dev/module-migration-guides/migration-guide-productbundle.html#upgrading-from-version-6-to-version-700) |
| `spryker/discount-promotion` | 4.0.0 | [Migration Guide - DiscountPromotion](/docs/scos/dev/module-migration-guides/migration-guide-discountpromotion.html#upgrading-from-version-3-to-version-400) |
| `spryker/product-packaging-unit` | 4.0.0 | [Migration Guide - ProductPackagingUnit](/docs/scos/dev/module-migration-guides/migration-guide-productpackagingunit.html#upgrading-from-version-3-to-version-400) |
| `spryker/product-measurement-unit` | 5.0.0 | [Migration Guide - ProductMeasurementUnit](/docs/scos/dev/module-migration-guides/migration-guide-productmeasurementunit.html#upgrading-from-version-4-to-version-500) |
| `spryker/product-packaging-unit-data-import` | 2.0.0 | [Migration Guide - ProductPackagingUnitDataImport](/docs/scos/dev/module-migration-guides/migration-guide-productpackagingunitdataimport.html#upgrading-from-version-1-to-version-200) |
| `spryker/product-packaging-unit-storage` | 5.0.0 | [Migration Guide - ProductPackagingUnitStorage](/docs/scos/dev/module-migration-guides/migration-guide-productpackagingunitstorage.html#upgrading-from-version-4-to-version-500) |
| `spryker/product-management` | 0.19.0 | [Migration Guide - ProductManagement](/docs/scos/dev/module-migration-guides/migration-guide-productmanagement.html#upgrading-from-version-018-to-version-0190) |
| `spryker-shop/product-packaging-unit-widget` | 0.5.0 | [Migration Guide - ProductPackagingUnitWidget](/docs/scos/dev/module-migration-guides/migration-guide-productpackagingunitwidget.html#upgrading-from-version-04-to-version-050) |
