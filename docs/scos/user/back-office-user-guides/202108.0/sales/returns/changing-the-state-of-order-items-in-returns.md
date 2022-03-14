---
title: Changing the state of order items in returns
description: Learn how to change the state of order items in returns in the Back Office.
template: back-office-user-guide-template
---

This document describes how to change the state of order items in returns. Each return is linked to the order it was created from. When you change the state of an order in a return, you change it in the linked order.

## Prerequisites

The instructions assume that there is an existing order with the **waiting for return** state.

To start working with item states in returns, do the following:
1. Go to **Sales** > **Returns**.
    This opens the **Returns** page.
2. Next to the return containing the items you want to change the state of, click **View**.
    This opens the **Return Overview** page.  



Review the [reference information](#reference-information-changing-the-state-of-order-items-in-returns) before you start, or look up the necessary information as you go through the process.

## Changing the state of all the items in a return

1. Next to **Trigger all matching states**, click **Execute return**.
    This refreshes the page with a success message displayed. The updated **State** is displayed for all the items.
2. Repeat step 1 until you get the needed state.

## Changing the state of an item in a return

1. Next to the item you want to change the state of, click **Execute return**.
    This refreshes the page with a success message displayed. The updated **State** is displayed for the item.
2. Repeat step 1 until you get the needed state.

## Changing the state of multiple items in a return

1. Select the items you want to change the state of.
2. Next to **Trigger all matching states of {number of selected items} selected items** pane, click **Execute return**.
    This refreshes the page with a success message displayed. The updated **State** is displayed for the selected items.
3. Repeat steps 1-2 until you get the needed state.         


## Reference information: Changing the state of order items in returns

The following table describes the states you can select for order items.

| ITEM STATE | DESCRIPTION |
| --- | --- |
| Execute return | Select this state after the customer returned an item.  |
| Refund | Select this state after you refunded a returned item.|

States flow:
* **waiting for return**: the initial order stated for returns.
* When you select **Return**, the state becomes **returned**.
* When you select **Refund**, the status becomes **refunded**.

### State names

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display custom names for order item states on the Storefront](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-display-custom-names-for-order-item-states-on-the-storefront.html).
