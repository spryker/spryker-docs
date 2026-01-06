---
title: Split delivery migration concept
description: The article provides instructions on how to install Split Delivery on all modules affected in bulk and then individually.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/split-delivery-concept
originalArticleId: 6b5f2740-8a4a-405b-bf72-2849ce60c2a8
redirect_from:
  - /2021080/docs/split-delivery-concept
  - /2021080/docs/en/split-delivery-concept
  - /docs/split-delivery-concept
  - /docs/en/split-delivery-concept
  - /v6/docs/split-delivery-concept
  - /v6/docs/en/split-delivery-concept
  - /v5/docs/split-delivery-concept
  - /v5/docs/en/split-delivery-concept
  - /v4/docs/split-delivery-concept
  - /v4/docs/en/split-delivery-concept
  - /docs/scos/dev/migration-concepts/split-delivery-migration-concept.html
  - /docs/pbc/all/order-management-system/202311.0/base-shop/install-and-update/split-delivery-migration-concept.html
  - /docs/pbc/all/order-management-system/202204.0/base-shop/install-and-upgrade/split-delivery-migration-concept.html
  - /docs/pbc/all/order-management-system/202204.0/base-shop/install-and-upgrade/split-delivery-migration-concept.html
related:
  - title: CRUD Scheduled Prices migration concept
    link: docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-to-crud-scheduled-prices.html
  - title: Migrating from Twig v1 to Twig v3
    link: docs/scos/dev/migration-concepts/migrating-from-twig-v1-to-twig-v3.html
  - title: Silex Replacement migration concept
    link: docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html
---

## General information

Split Delivery splits order items into different shipments according to a delivery address, a shipment method, and a delivery date. The feature also provides an ability to edit a shipment or create a new one for the existing order in the Back Office.

## Migration process

You can upgrade all affected modules by the feature in bulk.

**To update all the modules affected by feature in bulk, do the following:**

1. Run the following composer command, but make sure **to remove the modules that are irrelevant for your project from the command**:

```bash
composer update "spryker/*" "spryker-shop/*"
composer require spryker/sales: "^11.0.0" spryker/shipment: "^7.0.0" spryker-shop/checkout-page: "^3.0.0" spryker-shop/customer-page: "^2.0.0" spryker/checkout-rest-api: "^2.0.0" spryker/manual-order-entry-gui:"^0.8.0" spryker/shipment-cart-connector:"^2.0.0" spryker/shipment-checkout-connector:"^2.0.0" spryker/shipment-discount-connector:"^4.0.0" spryker/orders-rest-api: "^4.0.0" --update-with-dependencies
```

2. Clean up the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```

3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

4. Follow individual migration guides of the modules listed below:

- [Shipment](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html#upgrading-from-version-6-to-version-7)
- [CustomerPage](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-customerpage-module.html#upgrading-from-version-1-to-version-200)

The following table lists the modules affected by the Split Delivery update:

| MODULE | VERSION | MIGRATION GUIDE |
| --- | --- | --- |
| `spryker/sales` | 11.0.0 | [Upgrade the Sales module](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-sales-module.html#upgrading-from-version-10-to-version-1100) |
| `spryker/shipment` | 7.0.0 | [Upgrade the Shipment module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html#upgrading-from-version-6-to-version-7) |
| `spryker-shop/checkout-page` | 3.0.0 | [Upgrade the CheckoutPage module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-checkoutpage-module.html#upgrading-from-version-2-to-version-3) |
| `spryker-shop/customer-page` | 2.0.0 | [Upgrade the CustomerPage module](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-customerpage-module.html#upgrading-from-version-1-to-version-200) |
| `spryker/checkout-rest-api` | 2.0.0 | [Upgrade the CheckoutRestApi module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-checkoutrestapi-module.html#upgrading-from-version-1-to-version-200) |
| `spryker/manual-order-entry-gui` | 0.8.0 | [Migration Guide - ManualOrderEntryGui](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-manualorderentrygui-module.html#upgrading-from-version-07-to-version-080) |
| `spryker/shipment-cart-connector` | 2.0.0 | [Upgrade the ShipmentCartConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcartconnector-module.html#upgrading-from-version-10-to-version-200) |
| `spryker/shipment-checkout-connector` | 2.0.0 | [Upgrade the ShipmentCheckoutConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcheckoutconnector-module.html#upgrading-from-version-10-to-version-200) |
| `spryker/shipment-discount-connector` | 4.0.0 | [Upgrade the ShipmentDiscountConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentdiscountconnector-module.html#upgrading-from-version-30-version-to-400) |
| `spryker/orders-rest-api` | 4.0.0 | [Upgrade the OrdersRestApi module](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-ordersrestapi-module.html) |
