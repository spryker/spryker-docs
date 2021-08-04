---
title: Split Delivery Migration Concept
originalLink: https://documentation.spryker.com/v5/docs/split-delivery-concept
redirect_from:
  - /v5/docs/split-delivery-concept
  - /v5/docs/en/split-delivery-concept
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

* [Shipment](https://documentation.spryker.com/docs/en/mg-shipment#upgrading-from-version-6---to-version-7-0-0)
* [CustomerPage](https://documentation.spryker.com/docs/en/mg-customerpage#upgrading-from-version-1---to-version-2-0-0)

The following table lists the modules affected by the Split Delivery update:

| Module | Version | Migration guide |
| --- | --- | --- |
| `spryker/sales` | 11.0.0 | [Migration Guide - Sales](https://documentation.spryker.com/docs/en/mg-sales#upgrading-from-version-10---to-version-11-0-0) |
| `spryker/shipment` | 7.0.0 | [Migration Guide - Shipment](https://documentation.spryker.com/docs/en/mg-shipment#upgrading-from-version-6---to-version-7-0-0) |
| `spryker-shop/checkout-page` | 3.0.0 | [Migration Guide - CheckoutPage](https://documentation.spryker.com/docs/en/migration-guide-checkoutpage#upgrading-from-version-2---to-version-3--) |
| `spryker-shop/customer-page` | 2.0.0 | [Migration Guide - CustomerPage](https://documentation.spryker.com/docs/en/mg-customerpage#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/checkout-rest-api` | 2.0.0 | [Migration Guide - CheckoutRestApi](https://documentation.spryker.com/docs/en/mg-checkoutrestapi#upgrading-from-version-1---to-version-2-0-0) |
| `spryker/manual-order-entry-gui` | 0.8.0 | [Migration Guide - ManualOrderEntryGui](https://documentation.spryker.com/docs/en/mg-manual-order-entry-gui#upgrading-from-version-0-7---to-version-0-8-0) |
| `spryker/shipment-cart-connector` | 2.0.0 | [Migration Guide - ShipmentCartConnector](https://documentation.spryker.com/docs/en/mg-shipment-cart-connector#upgrading-from-version-1-0---to-version-2-0-0) |
| `spryker/shipment-сheckout-сonnector` | 2.0.0 | [Migration Guide - ShipmentCheckoutConnector](https://documentation.spryker.com/docs/en/mg-shipment-checkout-connector#upgrading-from-version-1-0---to-version-2-0-0) |
| `spryker/shipment-discount-connector` | 4.0.0 | [Migration Guide - ShipmentDiscountConnector](https://documentation.spryker.com/docs/en/mg-shipment-discount-connector#upgrading-from-version-3-0---version-to-4-0-0) |
| `spryker/orders-rest-api` | 4.0.0 | [Migration Guide - OrdersRestApi](https://documentation.spryker.com/docs/en/mg-ordersrestapi#upgrading-from-version-3-0---to-version-4-0-0) |

