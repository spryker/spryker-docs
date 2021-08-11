---
title: Order Cancellation Feature Overview
description: Allow your customer to cancel orders or cancel orders on their behalf.
originalLink: https://documentation.spryker.com/v5/docs/order-cancellation-feature-overview
redirect_from:
  - /v5/docs/order-cancellation-feature-overview
  - /v5/docs/en/order-cancellation-feature-overview
---

The *Order Cancellation* feature makes the shopping experience of B2B and B2C shoppers more flexible by allowing them to cancel their orders within a defined time period. Also, the feature optimizes the workflow of sales and customer service by allowing them to cancel orders on customers’ behalf in the Back Office.

For example, a customer changes their mind about an item in an order they have placed. Instead of contacting customer service, they can cancel the order and place a new one with the desired items. 

A customer can cancel orders on the *Order History* and *Order Details* pages.

<details open>
    <summary>Order cancellation representation - Order History Page</summary>
    

![order-history-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Order+Cancellation/Order+Cancellation+Feature+Overview/order-history-page.png){height="" width=""}


</details>

<details open>
    <summary>Order cancellation representation - Order Details Page</summary>
    
![order-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Order+Cancellation/Order+Cancellation+Feature+Overview/order-details-page.png){height="" width=""}


</details>


See [Shop Guide - Cancelling Orders](https://documentation.spryker.com/docs/en/shop-guide-cancelling-orders) to learn how B2B and B2C shoppers can cancel orders on the Storefront.

See [Changing Order Statuses](https://documentation.spryker.com/docs/en/managing-orders#changing-order-statuses) to learn how a Back Office user can cancel orders.

## Time Frames and Statuses

A customer can cancel an order only within a defined time period. By default, the time period is 30 minutes. After the time period has passed, the buttons to cancel the order are not available. A Back Office user can skip the cancellation time period.  

Also, they can cancel an order only if all the included items are in the states that are defined as cancellable. By default, the *payment pending* and *confirmed* states are cancellable. If at least one of the items in an order is in a different state, the buttons to cancel the order are not available. 

In the [state machine](https://documentation.spryker.com/docs/en/order-process-modelling-state-machines#order-process-modelling-via-state-machines), a developer can configure different order states to be cancellable and change the cancellation time period.

{% info_block warningBox "State machine" %}

Ensure that, in your state machine, the *refunded* state always goes before the *cancelled* state. Otherwise, you can't refund the money for a canceled order. You can check the order of the states in the Back Office > **Administration** > **OMS**.

{% endinfo_block %}


See [Managing Orders](https://documentation.spryker.com/docs/en/managing-orders#managing-orders) to learn how a Back Office user can skip timeout or cancel an order by changing order statuses.
