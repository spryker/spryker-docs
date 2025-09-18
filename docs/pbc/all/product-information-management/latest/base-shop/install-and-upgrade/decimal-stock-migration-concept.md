---
title: Decimal Stock migration concept
description: The article provides instructions on how to install Decimal Stock on all modules affected in bulk and then individually.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/decimal-stock-concept
originalArticleId: da336e52-e8e8-4849-9be3-e208cd42e273
redirect_from:
  - /docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/decimal-stock-migration-concept.html
related:
  - title: Packaging Units feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/packaging-units-feature-overview.html
  - title: CRUD Scheduled Prices migration concept
    link: docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-to-crud-scheduled-prices.html
  - title: Migrating from Twig v1 to Twig v3
    link: docs/scos/dev/migration-concepts/migrating-from-twig-v1-to-twig-v3.html
  - title: Split Delivery migration concept
    link: docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/split-delivery-migration-concept.html
  - title: Silex Replacement migration concept
    link: docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html
---

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

2. Follow the steps in the individual migration guide for [ProductPackagingUnit](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunit-module.html#upgrading-from-version-3-to-version-400).
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

5. Follow the steps in the individual migration guide for [ProductPackagingUnitStorage](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitstorage-module.html#upgrading-from-version-4-to-v--version-500).
6. Follow the steps in the individual migration guide for [Availability](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availability-module.html#upgrading-from-version-8-to-version-900).

{% info_block errorBox %}

Care should be taken on the project level code to handle the availability and stock values as decimal objects. Because of the PHP floating-point precision issues, all decimal numbers in Spryker are wrapped in `decimal-object` that handles the calculations performed on them to allow exact precision. For more information about the`decimal-object` library, see [HowTo: Integrate and use precise decimal numbers](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/tutorials-and-howtos/howto-integrate-and-use-precise-decimal-numbers.html).

{% endinfo_block %}

The following table lists the modules affected by the Decimal Stock update and will be released as a major or a semantic major.

| MODULE | VERSION | MIGRATION GUIDE |
| --- | --- | --- |
| `spryker/availability` | 9.0.0 | [Upgrade the Availability module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availability-module.html#upgrading-from-version-8-to-version-900) |
| `spryker/oms` | 11.0.0 | [Upgrade the OMS module](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-oms-module.html#upgrading-from-version-10-to-version-1100) |
| `spryker/stock` | 8.0.0 | [Upgrade the Stock module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-stock-module.html#upgrading-from-version-7-to-version-800) |
| `spryker/availability-storage` | 2.0.0 | [Upgrade the AvailabilityStorage module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitystorage-module.html#upgrading-from-version-1-to-version-200) |
| `spryker/availability-gui` | 6.0.0 | [Upgrade the AvailabilityGui module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitygui-module.html#upgrading-from-version-5-to-version-600) |
| `spryker/availability-cart-connector` | 7.0.0 | [Upgrade the AvailabilityCartConnector module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitycartconnector-module.html#upgrading-from-version-6-to-version-700) |
| `spryker/availability-offer-connector` | 4.0.0 | [Upgrade the AvailabilityOfferConnector module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilityofferconnector-module.html#upgrading-from-version-3-to-version-400) |
| `spryker/cart-variant` | 2.0.0 | [Upgrade the CartVariant module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartvariant-module.html#upgrading-from-version-1-to-version-200) |
| `spryker/product-availabilities-rest-api` | 4.0.0 | [MUpgrade the ProductAvailabilitiesRestApi module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productavailabilitiesrestapi-module.html#upgrading-from-version-3-to-version-4) |
| `spryker/product-bundle` | 7.0.0 | [Upgrade the ProductBundle module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productbundle-module.html#upgrading-from-version-6-to-version-700) |
| `spryker/discount-promotion` | 4.0.0 | [Upgrade the DiscountPromotion module](/docs/pbc/all/discount-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountpromotion-module.html#upgrading-from-version-3-to-version-400) |
| `spryker/product-packaging-unit` | 4.0.0 | [Upgrade the ProductPackagingUnit module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunit-module.html#upgrading-from-version-3-to-version-400) |
| `spryker/product-measurement-unit` | 5.0.0 | [Upgrade the ProductMeasurementUnit module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmeasurementunit-module.html#upgrading-from-version-4-to-version-500) |
| `spryker/product-packaging-unit-data-import` | 2.0.0 | [Upgrade the ProductPackagingUnitDataImport module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitdataimport-module.html#upgrading-from-version-1-to-version-200) |
| `spryker/product-packaging-unit-storage` | 5.0.0 | [Upgrade the ProductPackagingUnitStorage module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitstorage-module.html#upgrading-from-version-4-to-v--version-500) |
| `spryker/product-management` | 0.19.0 | [Upgrade the ProductManagement module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmanagement-module.html#upgrading-from-version-018-to-version-0190) |
| `spryker-shop/product-packaging-unit-widget` | 0.5.0 | [Upgrade the ProductPackagingUnitWidget module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitwidget-module.html#upgrading-from-version-04-to-version-050) |
