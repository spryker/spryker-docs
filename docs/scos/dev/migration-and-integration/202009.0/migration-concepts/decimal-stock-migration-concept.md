---
title: Decimal Stock migration concept
description: The article provides instructions on how to install Decimal Stock on all modules affected in bulk and then individually.
originalLink: https://documentation.spryker.com/v6/docs/decimal-stock-concept
originalArticleId: 52b2f366-5479-4715-ae59-5d12a04ad3a4
redirect_from:
  - /v6/docs/decimal-stock-concept
  - /v6/docs/en/decimal-stock-concept
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

2. Follow the steps in the individual migration guide for [ProductPackagingUnit](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productpackagingunit.html#upgrading-from-version-3---to-version-4-0-0). 
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

5. Follow the steps in the individual migration guide for [ProductPackagingUnitStorage](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productpackagingunitstorage.html#upgrading-from-version-4---to-version-5-0-0). 

6. Follow the steps in the individual migration guide for [Availability](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-availability.html#upgrading-from-version-8---to-version-9-0-0).

{% info_block errorBox %}

Care should be taken on the project level code to handle the availability and stock values as decimal objects. Due to the PHP floating-point precision issues, all decimal numbers in Spryker are wrapped in `decimal-object` that handles the calculations performed on them to allow exact precision. For more informatkion about the`decimal-object` library, see [HowTo - Integrate and use precise decimal numbers](/docs/scos/dev/tutorials-and-howtos/202009.0/howtos/howto-integrate-and-use-precise-decimal-numbers.html).

{% endinfo_block %}

The following table lists the modules affected by the Decimal Stock update and will be released as a major or a semantic major.

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/availability` | 9.0.0 | [Migration Guide - Availability](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-availability.html#upgrading-from-version-8---to-version-9-0-0) |
| `spryker/oms` | 11.0.0 | [Migration Guide - OMS](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-oms.html#upgrading-from-version-10---to-version-11-0-0) |
| `spryker/stock` | 8.0.0 | [Migration Guide - Stock](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-stock.html#upgrading-from-version-7---to-version-8-0-0) |
| `spryker/availability-storage` | 2.0.0 | [Migration Guide - AvailabilityStorage](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-availabilitystorage.html#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/availability-gui` | 6.0.0 | [Migration Guide - AvailabilityGui](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-availabilitygui.html#upgrading-from-version-5---to-version-6-0-0) |
| `spryker/availability-cart-connector` | 7.0.0 | [Migration Guide - AvailabilityCartConnector](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-availabilitycartconnector.html#upgrading-from-version-6---to-version-7-0-0) |
| `spryker/availability-offer-connector` | 4.0.0 | [Migration Guide - AvailabilityOfferConnector](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-availabilityofferconnector.html#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/cart-variant` | 2.0.0 | [Migration Guide - CartVariant](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-cartvariant.html#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/product-availabilities-rest-api` | 4.0.0 | [Migration Guide - ProductAvailabilitiesRestApi](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/glue-api/migration-guide-productavailabilitiesrestapi.html#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/product-bundle` | 7.0.0 | [Migration Guide - ProductBundle](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productbundle.html#upgrading-from-version-6---to-version-7-0-0) |
| `spryker/discount-promotion` | 4.0.0 | [Migration Guide - DiscountPromotion](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-discountpromotion.html#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/product-packaging-unit` | 4.0.0 | [Migration Guide - ProductPackagingUnit](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productpackagingunit.html#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/product-measurement-unit` | 5.0.0 | [Migration Guide - ProductMeasurementUnit](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productmeasurementunit.html#upgrading-from-version-4---to-version-5-0-0) |
| `spryker/product-packaging-unit-data-import` | 2.0.0 | [Migration Guide - ProductPackagingUnitDataImport](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productpackagingunitdataimport.html#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/product-packaging-unit-storage` | 5.0.0 | [Migration Guide - ProductPackagingUnitStorage](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productpackagingunitstorage.html#upgrading-from-version-4---to-version-5-0-0) |
| `spryker/product-management` | 0.19.0 | [Migration Guide - ProductManagement](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productmanagement.html#upgrading-from-version-0-18---to-0-19-0) |
| `spryker-shop/product-packaging-unit-widget` | 0.5.0 | [Migration Guide - ProductPackagingUnitWidget](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-productpackagingunitwidget.html#upgrading-from-version-0-4---to-version-0-5-0) |

