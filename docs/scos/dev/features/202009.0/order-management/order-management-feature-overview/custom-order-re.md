---
title: Custom Order Reference overview
originalLink: https://documentation.spryker.com/v6/docs/custom-order-reference-overview
redirect_from:
  - /v6/docs/custom-order-reference-overview
  - /v6/docs/en/custom-order-reference-overview
---

*Custom Order Reference* helps you to control purchases and link the internal orders to external systems from your company using your external order reference. With the feature in place, you can add a custom order reference, such as an invoice, to the order on Yves. 

{% info_block infoBox "Info" %}

Keep in mind that the custom order references are available only for logged-in users.

{% endinfo_block %}


In the Storefront, you, as a buyer, can add a custom order reference to the order or edit it (if needed) on the *Cart* page and then view it on the *Summary* page. Once the order has been placed, the reference becomes non-editable and is displayed on the *Order Details* page in your customer account. 

<details open>
<summary>Cart page</summary>

![add-custom-order-reference](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/add-custom-order-reference.gif){height="" width=""}

</details>

<details open>
<summary>Summary page</summary>

![custom-order-reference-summary-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/custom-order-reference-summary-page.png){height="" width=""}

</details>

<details open>

<summary>Order Details page </summary>

![custom-order-reference-order-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/custom-order-reference-order-details-page.gif){height="" width=""}

</details>

When working with the order in the Back Office, you, as a Back Office user, can view, edit, or remove the custom order reference on the order details page.

![zed-custom-order-ref-new](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/zed-change-custom-order-reference.gif){height="" width=""}

## Custom Order Reference with the RFQ, approval process, and share cart via a link
If you submit a [quote request](https://documentation.spryker.com/docs/quotation-process-rfq-feature-overview-201907) and then convert it to the shopping cart, the cart gets locked. However, adding and updating the customer order reference for the locked cart is still possible. 

In the [Approval Process](https://documentation.spryker.com/docs/approval-process) scenarios, both an approver and buyer can add or edit the custom order reference during the checkout.

When [sharing a cart via a link with external users](https://documentation.spryker.com/docs/unique-url-per-cart-for-easy-sharing-overview-201907), they can only view the custom order reference. However, when [sharing a cart via a link with internal users](https://documentation.spryker.com/docs/unique-url-per-cart-for-easy-sharing-overview-201907), they can update the custom order reference for the shopping cart with the read-only and full-access permissions. 


## Current constraints
If you added a custom order reference to the cart, submitted a request for quote, and then converted the RFQ to the cart, the custom order reference will be removed. Thus, you will need to add the reference once the RFQ has been converted to the cart.


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/custom-order-reference-module-relations" class="mr-link">See the module relations for Custom Order Reference</a></li>
              <li><a href="https://documentation.spryker.com/docs/custom-order-reference-feature-integration" class="mr-link">Enable Custom Order Reference by integrating the Order Management feature into your project</a></li>
            </ul>
        </div>
      <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title">Back Office User</li>
                 <li><a href="https://documentation.spryker.com/docs/managing-orders">Manage orders</a></li>
            </ul>
        </div>  
</div>
</div>
