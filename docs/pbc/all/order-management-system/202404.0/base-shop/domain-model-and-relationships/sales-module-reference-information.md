---
title: "Sales module: reference information"
last_updated: Aug 18, 2021
description: The Sales module provides order management functionality obtained through the ZED UI that renders orders with details and the Client API to get customer orders
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202311.0/order-management-feature-walkthrough/sales-module-reference-information.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/order-management-feature-walkthrough/sales-module-reference-information.html
---

The Sales module provides the order management functionality. The functionality is obtained through the ZED UI that renders orders with orders details and the Client API to get customer orders.

## Getting totals for order

To get the Order with totals, the facade method `SalesFacade::getOrderByIdSalesOrder()` creates an order level which returns the OrderTransfer with a hydrated grandTotal, subtotal, expense, discounts, and more.

{% info_block warningBox "" %}

This is an improvement from the Sales 5.0 version where you had to use `SalesAggregatorFacade` to get totals. This version has been deprecated.

{% endinfo_block %}


## Persisting order calculated values

All calculated values are persisted now, when order are first placed. The values are stored by orderSaver plugins from checkout bundle. Check `/Pyz/Zed/Checkout/CheckoutDependencyProvider::getCheckoutOrderSavers` for currently available plugins.

Some values can change during time when order refunded or partially refunded, with `canceled_amount` and `refundable_amount` being recalculated and new values  persisted. At the same time, totals also change, but they do not overwrite old entry. Instead, it creates a new row in `spy_sales_order_total`. With this, you have a history of order totals from the time order was placed.

The following ER diagram shows persisted calculated values:
![ER diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Sales/sales_persisting_order_values.png)

## Extension points

HydrateOrderPluginInterface—this is an action which happens when the `SalesFacade::getOrderByIdSalesOrder()` method is called. This can be done when you wish to populate `OrderTransfer` with additional data. This plugins accepts passes `OrderTransfer` for additional population.

There are already few plugins provided:

* `DiscountOrderHydratePlugin`—populates `OrderTransfer` with discount related data as it was stored when order is placed.
* `ProductOptionOrderHydratePlugin`—populates `OrderTransfer` with product option related data.
* `ProductBundleOrderHydratePlugin`—populates `OrderTransfer` with product bundle related data.
* `ShipmentOrderHydratePlugin`—populates `OrderTransfer` with shipment related data.
