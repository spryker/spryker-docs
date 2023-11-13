---
title: "Sales module: reference information"
last_updated: Aug 18, 2021
description: The Sales module provides order management functionality obtained through the ZED UI that renders orders with details and the Client API to get customer orders
template: concept-topic-template
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
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-02-09T10:10:02.130Z\&quot; agent=\&quot;5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36\&quot; etag=\&quot;8oR_utA-5zoiaaFh7EJ0\&quot; version=\&quot;20.8.10\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;C5RBs43oDa-KdzZeNtuy\&quot; name=\&quot;Page-1\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
## Extension points

HydrateOrderPluginInterface—this is an action which happens when the `SalesFacade::getOrderByIdSalesOrder()` method is called. This can be done when you wish to populate `OrderTransfer` with additional data. This plugins accepts passes `OrderTransfer` for additional population.

There are already few plugins provided:

* `DiscountOrderHydratePlugin`—populates `OrderTransfer` with discount related data as it was stored when order is placed.
* `ProductOptionOrderHydratePlugin`—populates `OrderTransfer` with product option related data.
* `ProductBundleOrderHydratePlugin`—populates `OrderTransfer` with product bundle related data.
* `ShipmentOrderHydratePlugin`—populates `OrderTransfer` with shipment related data.
