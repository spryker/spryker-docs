---
title: Decimal Stock migration concept
originalLink: https://documentation.spryker.com/2021080/docs/decimal-stock-concept
redirect_from:
  - /2021080/docs/decimal-stock-concept
  - /2021080/docs/en/decimal-stock-concept
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

2. Follow the steps in the individual migration guide for [ProductPackagingUnit](https://documentation.spryker.com/v4/docs/mg-product-packaging-unit#upgrading-from-version-3---to-version-4-0-0). 
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

5. Follow the steps in the individual migration guide for [ProductPackagingUnitStorage](https://documentation.spryker.com/v4/docs/mg-product-packaging-unit-storage#upgrading-from-version-4---to-version-5-0-0). 

6. Follow the steps in the individual migration guide for [Availability](https://documentation.spryker.com/v4/docs/mg-availability#upgrading-from-version-8---to-version-9-0-0).

{% info_block errorBox %}

Care should be taken on the project level code to handle the availability and stock values as decimal objects. Due to the PHP floating-point precision issues, all decimal numbers in Spryker are wrapped in `decimal-object` that handles the calculations performed on them to allow exact precision. For more informatkion about the`decimal-object` library, see [HowTo - Integrate and use precise decimal numbers](https://documentation.spryker.com/docs/ht-integrate-and-use-precise-decimal-numbers).

{% endinfo_block %}

The following table lists the modules affected by the Decimal Stock update and will be released as a major or a semantic major.

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/availability` | 9.0.0 | [Migration Guide - Availability](https://documentation.spryker.com/v4/docs/mg-availability#upgrading-from-version-8---to-version-9-0-0) |
| `spryker/oms` | 11.0.0 | [Migration Guide - OMS](https://documentation.spryker.com/v4/docs/mg-oms#upgrading-from-version-10---to-version-11-0-0) |
| `spryker/stock` | 8.0.0 | [Migration Guide - Stock](https://documentation.spryker.com/v4/docs/mg-stock#upgrading-from-version-7---to-version-8-0-0) |
| `spryker/availability-storage` | 2.0.0 | [Migration Guide - AvailabilityStorage](https://documentation.spryker.com/v4/docs/mg-availabilitystorage#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/availability-gui` | 6.0.0 | [Migration Guide - AvailabilityGui](https://documentation.spryker.com/v4/docs/mg-availability-gui#upgrading-from-version-5---to-version-6-0-0) |
| `spryker/availability-cart-connector` | 7.0.0 | [Migration Guide - AvailabilityCartConnector](https://documentation.spryker.com/v4/docs/mg-availability-cart-connector#upgrading-from-version-6---to-version-7-0-0) |
| `spryker/availability-offer-connector` | 4.0.0 | [Migration Guide - AvailabilityOfferConnector](https://documentation.spryker.com/v4/docs/mg-availability-offer-connector#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/cart-variant` | 2.0.0 | [Migration Guide - CartVariant](https://documentation.spryker.com/v4/docs/mg-cart-variant#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/product-availabilities-rest-api` | 4.0.0 | [Migration Guide - ProductAvailabilitiesRestApi](https://documentation.spryker.com/v4/docs/productavailabilitiesrestapi-migration-guide#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/product-bundle` | 7.0.0 | [Migration Guide - ProductBundle](https://documentation.spryker.com/v4/docs/mg-product-bundle#upgrading-from-version-6---to-version-7-0-0) |
| `spryker/discount-promotion` | 4.0.0 | [Migration Guide - DiscountPromotion](https://documentation.spryker.com/v4/docs/mg-discount-promotion#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/product-packaging-unit` | 4.0.0 | [Migration Guide - ProductPackagingUnit](https://documentation.spryker.com/v4/docs/mg-product-packaging-unit#upgrading-from-version-3---to-version-4-0-0) |
| `spryker/product-measurement-unit` | 5.0.0 | [Migration Guide - ProductMeasurementUnit](https://documentation.spryker.com/v4/docs/mg-product-measurement-unit#upgrading-from-version-4---to-version-5-0-0) |
| `spryker/product-packaging-unit-data-import` | 2.0.0 | [Migration Guide - ProductPackagingUnitDataImport](https://documentation.spryker.com/v4/docs/mg-product-packaging-unit-data-import#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/product-packaging-unit-storage` | 5.0.0 | [Migration Guide - ProductPackagingUnitStorage](https://documentation.spryker.com/v4/docs/mg-product-packaging-unit-storage#upgrading-from-version-4---to-version-5-0-0) |
| `spryker/product-management` | 0.19.0 | [Migration Guide - ProductManagement](https://documentation.spryker.com/v4/docs/mg-product-management#upgrading-from-version-0-18---to-0-19-0) |
| `spryker-shop/product-packaging-unit-widget` | 0.5.0 | [Migration Guide - ProductPackagingUnitWidget](https://documentation.spryker.com/v4/docs/mg-product-packaging-unit-widget#upgrading-from-version-0-4---to-version-0-5-0) |

