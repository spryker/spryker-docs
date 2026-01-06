---
title: Change the state of order items in reclamations
description: Learn how to change the state of order items in reclamations in the Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/sales/reclamations/changing-the-state-of-order-items-in-reclamations.html
  - /docs/scos/user/back-office-user-guides/202204.0/sales/reclamations/changing-the-state-of-order-items-in-reclamations.html
related:
  - title: Creating reclamations
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/reclamations/create-reclamations.html
  - title: Viewing reclamations
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/reclamations/view-reclamations.html
  - title: Reclamations feature overview
    link: docs/pbc/all/order-management-system/latest/base-shop/reclamations-feature-overview.html
---

This document describes how to change the state of order items in reclamations. Each reclamation is linked to the order it was created from. When you change the state of an order in a reclamation, you change it in the linked order.

## Prerequisites

The instructions assume that there is an existing order with the **Payment pending** status.

To start working with item states in reclamations, do the following:

1. Go to **Sales&nbsp;<span aria-label="and then">></span> Reclamations**.
    This opens the **Reclamations** page.
2. Next to the reclamation containing the items you want to change the state of, click **View**.
    This opens the **View reclamation** page.  

Review the [reference information](#reference-information-changing-the-state-of-order-items-in-reclamations) before you start, or look up the necessary information as you go through the process.

## Changing the state of all the items in a reclamation

1. In the **TRIGGER ALL MATCHING STATES** pane, click **Pay**.
    This refreshes the page with a success message displayed. The updated **State** is displayed for all the items.
2. Repeat step 1 until you get the needed state.

## Changing the state of an item in a reclamation

1. In the **ORDER {order reference} ITEMS:** pane, next to the item you want to change the state of, click **Pay**.
    This refreshes the page with a success message displayed. The updated **State** is displayed for the item.
2. Repeat step 1 until you get the needed state.

## Changing the state of multiple items in a reclamation

1. In the **ORDER {order reference} ITEMS:** pane, select the items you want to change the state of.
2. In the **TRIGGER ALL MATCHING STATES** pane, click **Pay**.
    This refreshes the page with a success message displayed. The updated **State** is displayed for the selected items.
3. Repeat steps 1-2 until you get the needed state.


## Reference information: Changing the state of order items in reclamations

The following table describes the states you can select for order items.

| ORDER STATUS | DESCRIPTION |
| --- | --- |
| Pay | Select this state once you receive the payment for the order from your customer. |
| Cancel | Select this state to cancel the order on the customer's behalf. |
| Skip Timeout | Select this status to end the time period during which the customer can cancel the order. |
| invoice-generate | Select this state to generate the invoice and send it to the customer. If invoice BCC is configured for your project, the copy of the invoice will be sent to the specified email address as well. You can trigger the invoice-generate only for the whole order. Even if you selected just some of the order items, the invoice is generated for the whole order.|
| Ship | Select this state once the order is shipped.|
| Stock-update | Select this state when you update the number of available products of products in **Products&nbsp;<span aria-label="and then">></span> Availability**. |
|  Close| Select this state when your customer has successfully received the ordered items and is satisfied with their quality.|
| Return | Select this state if the customer returns you either all or several items from the order.  |
| Refund | Select this state in case of a refund.|

States flow:

- **Payment pending**: the initial order status.
- **Canceled**: state  of the order after it's canceled by the customer on the Storefront or by the Back Office user.
- When you select **Pay**, the state becomes **Confirmed**.
- When you select **Skip Timeout**, the state becomes **Exported**.
- When you select **Cancel**, the state becomes **Cancelled**.
- When you select **invoice-generate**, the state becomes **Exported**.
- When you select **Ship**, the state becomes **Shipped**.
- When you select **Stock-update**, the state becomes **Delivered**.
- When you select **Close**, the state becomes closed.
- In case the customer returns the ordered items: when you select **Return**, the status becomes returned.
- In case of a return, when you select **Refund**, the status becomes refunded.

### State names

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display custom names for order item states on the Storefront](/docs/pbc/all/order-management-system/latest/base-shop/display-custom-names-for-order-item-states-on-the-storefront.html).
