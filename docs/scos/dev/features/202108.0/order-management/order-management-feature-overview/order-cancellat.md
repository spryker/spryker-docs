---
title: Order Cancellation overview
originalLink: https://documentation.spryker.com/2021080/docs/order-cancellation-overview
redirect_from:
  - /2021080/docs/order-cancellation-overview
  - /2021080/docs/en/order-cancellation-overview
---

Order cancellation makes the shopping experience of B2B and B2C shoppers more flexible by allowing them to cancel their orders within a defined time period. Also, it optimizes the workflow of sales and customer service by allowing them to cancel orders on customers’ behalf in the Back Office.

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


See [Order cancellation on the Storefront](#storefront) to learn how B2B and B2C shoppers can cancel orders on the Storefront.

See [Changing Order Statuses](https://documentation.spryker.com/docs/managing-orders#changing-order-statuses) to learn how a Back Office user can cancel orders.

## Time frames and statuses

A customer can cancel an order only within a defined time period. By default, the time period is 30 minutes. After the time period has passed, the buttons to cancel the order are not available. A Back Office user can skip the cancellation time period.  

Also, they can cancel an order only if all the included items are in the states that are defined as cancellable. By default, the *payment pending* and *confirmed* states are cancellable. If at least one of the items in an order is in a different state, the buttons to cancel the order are not available. 

In the [state machine](https://documentation.spryker.com/docs/order-process-modelling-state-machines#order-process-modelling-via-state-machines), a developer can configure different order states to be cancellable and change the cancellation time period.

{% info_block warningBox "State machine" %}

Ensure that, in your state machine, the *refunded* state always goes before the *cancelled* state. Otherwise, you can't refund the money for a canceled order. You can check the order of the states in the Back Office > **Administration** > **OMS**.

{% endinfo_block %}

See [Managing Orders](https://documentation.spryker.com/docs/managing-orders#managing-orders) to learn how a Back Office user can skip timeout or cancel an order by changing order statuses.

<a name="storefront"></a>

## Order cancellation on the Storefront
This is how the Order Cancellation feature works on the Spryker Demo Shop Storefront:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Order+Cancellation/Order+Cancellation+Feature+Overview/shop-guide-cancelling-orders.gif){height="" width=""}



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
               <li><a href="https://documentation.spryker.com/docs/order-management-feature-integration" class="mr-link">Enable order cancellation by integrating the Order Management feature into your project</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-customers-order-history" class="mr-link">Manage orders via Glue API</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-orders" class="mr-link">Manage Orders</a></li>
            </ul>
                </div>
                  <!-- col3 -->
        
</div>
