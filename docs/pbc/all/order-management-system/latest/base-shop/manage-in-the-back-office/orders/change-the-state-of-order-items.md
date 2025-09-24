---
title: Change the state of order items
description: Learn how to change the state of an order items in the Spryker Cloud Commerce OS Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-orders
originalArticleId: 6d125a8a-63ca-4ddc-bb74-1526aa1fe44b
redirect_from:
  - /docs/scos/user/back-office-user-guides/202204.0/sales/orders/managing-orders.html
  - /docs/scos/user/back-office-user-guides/202311.0/sales/orders/changing-the-state-of-order-items.html
  - /docs/scos/user/back-office-user-guides/202204.0/sales/orders/changing-the-state-of-order-items.html
related:
  - title: Order Management feature overview
    link: docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-management-feature-overview.html
---

This article describes how to change the state of order items.

## Prerequisites

To start managing orders, go to **Sales&nbsp;<span aria-label="and then">></span> Orders**.

The instructions assume that there is an existing order with the **Payment pending** status.

Review the [reference information](#reference-information-changing-the-state-of-order-items) before you start, or look up the necessary information as you go through the process.

## Changing the state of all the items in an order

1. On the **Orders** page, click **View** next to the order containing the items you want to change the state of.
    This opens the **Order Overview** page.
2. In the **TRIGGER ALL MATCHING STATES INSIDE THIS ORDER** pane, click **Pay**.

    The page refreshes with the success message displayed. You can check the new state of the items in the order in the **ORDER ITEMS** pane.  
3. Repeat step 2 until the items are in the needed state.

## Changing the state of items in a shipment

1. On the **Orders** page, click **View** next to the order containing the shipment you want to change the state of.
    This opens the **Order Overview** page.
2. In the **ORDER ITEMS** pane, in the desired shipment, select the checkboxes next to the products you want to change the state of. If you want to change the state of all the items in the shipment, don't select any checkboxes.
3. In the **TRIGGER ALL MATCHING STATES OF ORDER INSIDE THIS SHIPMENT** pane, click **Pay**.
    The page refreshes with the success message displayed.
4. Repeat step 2-3 until you get the needed  status.


## Changing the state of an item

1. On the **Orders** page, click **View** next to the order containing the item you want to change the state of.
    This opens the **Order Overview** page.
2. In the **ORDER ITEMS** pane, next to the needed item, click **Pay**.
    The page refreshes with the success message displayed.
3. Repeat step 2 until you get the needed order state.

## Reference information: Changing the state of order items

The following table describes the states you can select for order items.

| ORDER STATUS | DESCRIPTION |
| --- | --- |
| Pay | Select this state once you receive the payment for the order from your customer. |
| Cancel | Select this state to cancel the order on the customer's behalf. |
| Skip Timeout | Select this status to end the time period during which the customer can cancel the order. |
| Generate invoice | Select this state to generate the invoice and send it to the customer. If invoice BCC is configured for your project, the copy of the invoice will be sent to the specified email address as well. You can trigger the invoice-generate only for the whole order. Even if you selected just some of the order items, the invoice is generated for the whole order.|
| Picking list generation schedule | Select this state to generate a picklist. Available with the [Fulfillment App](/docs/pbc/all/warehouse-management-system/latest/unified-commerce/fulfillment-app-overview.html). |
| Prepare for picking | Makes the picklist available in the Fulfillment App. Available with the [Fulfillment App](/docs/pbc/all/warehouse-management-system/latest/unified-commerce/fulfillment-app-overview.html). |
| Ship | Select this state once the order is shipped.|
| Stock-update | Select this state when you update the number of available products of products in **Products&nbsp;<span aria-label="and then">></span> Availability**. |
|  Close| Select this state when your customer has successfully received the ordered items and is satisfied with their quality.|
| Return | Select this state if the customer returns you either all or several items from the order.  |
| Refund | Select this state in case of a refund.|

### State names

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display custom names for order item states on the Storefront](/docs/pbc/all/order-management-system/latest/base-shop/display-custom-names-for-order-item-states-on-the-storefront.html).
