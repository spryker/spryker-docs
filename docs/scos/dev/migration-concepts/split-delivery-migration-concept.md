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
---

## General Information
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

* [Shipment](/docs/scos/dev/module-migration-guides/migration-guide-shipment.html#upgrading-from-version-6-to-version-7)
* [CustomerPage](/docs/scos/dev/module-migration-guides/migration-guide-customerpage.html#upgrading-from-version-1-to-version-200)

The following table lists the modules affected by the Split Delivery update:

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/sales` | 11.0.0 | [Migration Guide - Sales](/docs/scos/dev/module-migration-guides/migration-guide-sales.html#upgrading-from-version-10-to-version-1100) |
| `spryker/shipment` | 7.0.0 | [Migration Guide - Shipment](/docs/scos/dev/module-migration-guides/migration-guide-shipment.html#upgrading-from-version-6-to-version-7) |
| `spryker-shop/checkout-page` | 3.0.0 | [Migration Guide - CheckoutPage](/docs/scos/dev/module-migration-guides/migration-guide-checkoutpage.html#upgrading-from-version-2-to-version-3) |
| `spryker-shop/customer-page` | 2.0.0 | [Migration Guide - CustomerPage](/docs/scos/dev/module-migration-guides/migration-guide-customerpage.html#upgrading-from-version-1-to-version-200) |
| `spryker/checkout-rest-api` | 2.0.0 | [Migration Guide - CheckoutRestApi](/docs/scos/dev/module-migration-guides/glue-api/migration-guide-checkoutrestapi.html#upgrading-from-version-1-to-version-200) |
| `spryker/manual-order-entry-gui` | 0.8.0 | [Migration Guide - ManualOrderEntryGui](/docs/scos/dev/module-migration-guides/migration-guide-manualorderentrygui.html#upgrading-from-version-07-to-version-080) |
| `spryker/shipment-cart-connector` | 2.0.0 | [Migration Guide - ShipmentCartConnector](/docs/scos/dev/module-migration-guides/migration-guide-shipmentcartconnector.html#upgrading-from-version-10-to-version-200) |
| `spryker/shipment-сheckout-сonnector` | 2.0.0 | [Migration Guide - ShipmentCheckoutConnector](/docs/scos/dev/module-migration-guides/migration-guide-shipmentcheckoutconnector.html#upgrading-from-version-10-to-version-200) |
| `spryker/shipment-discount-connector` | 4.0.0 | [Migration Guide - ShipmentDiscountConnector](/docs/scos/dev/module-migration-guides/migration-guide-shipmentdiscountconnector.html#upgrading-from-version-30-version-to-400) |
| `spryker/orders-rest-api` | 4.0.0 | [Migration Guide - OrdersRestApi](/docs/scos/dev/module-migration-guides/glue-api/migration-guide-ordersrestapi.html#upgrading-from-version-30-to-version-400) |
