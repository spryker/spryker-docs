---
title: Custom Order Reference overview
description: An overview of Sprykers Custom Order Reference feature to help companies manage their orders using their own custom reference.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/custom-order-reference-overview
originalArticleId: f2b2d82f-8854-446d-b8e9-63df552a5038
redirect_from:
  - /2021080/docs/custom-order-reference-overview
  - /2021080/docs/en/custom-order-reference-overview
  - /docs/custom-order-reference-overview
  - /docs/en/custom-order-reference-overview
  - /docs/scos/user/features/202311.0/order-management-feature-overview/custom-order-reference-overview.html
  - /docs/scos/user/features/202204.0/order-management-feature-overview/custom-order-reference-overview.html
---

*Custom Order Reference* helps you control purchases and link the internal orders to external systems from your company using your external order reference. With the feature in place, you can add a custom order reference, such as an invoice, to the order on Yves.

{% info_block infoBox "Info" %}

Keep in mind that the custom order references are available only for logged-in users.

{% endinfo_block %}


In the Storefront, you, as a buyer, can add a custom order reference to the order or edit it (if needed) on the **Cart** page and then view it on the **Summary** page. Once the order has been placed, the reference becomes non-editable and is displayed on the **Order Details** page in your customer account.

<details>
<summary>Cart page</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/order-management-feature-overview/custom-order-reference-overview.md/add-custom-order-reference.mp4" type="video/mp4">
  </video>
</figure>

</details>

<details>
<summary>Summary page</summary>


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/order-management-feature-overview/custom-order-reference-overview.md/custom-order-reference-summary-page.mp4" type="video/mp4">
  </video>
</figure>

</details>

<details>

<summary>Order Details page </summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/order-management-feature-overview/custom-order-reference-overview.md/custom-order-reference-order-details-page.mp4" type="video/mp4">
  </video>
</figure>

</details>

When working with the order in the Back Office, you, as a Back Office user, can view, edit, or remove the custom order reference on the order details page.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/order-management-feature-overview/custom-order-reference-overview.md/zed-change-custom-order-reference.mp4" type="video/mp4">
  </video>
</figure>



## Custom Order Reference with the RFQ, approval process, and share cart by a link

If you submit a [quote request](/docs/pbc/all/request-for-quote/latest/request-for-quote.html) and then convert it to the shopping cart, the cart gets locked. However, you still can add and update the customer order reference for the locked cart.

In the [Approval Process](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/approval-process-feature-overview.html) scenarios, both an approver and buyer can add or edit the custom order reference during the checkout.

When [sharing a cart by a link with external users](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/persistent-cart-sharing-feature-overview.html), they can only view the custom order reference. However, when [sharing a cart by a link with internal users](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/persistent-cart-sharing-feature-overview.html), they can update the custom order reference for the shopping cart with the read-only and full-access permissions.


## Current constraints

If you added a custom order reference to the cart, submitted a request for quote, and then converted the RFQ to the cart, the custom order reference will be removed. Thus, you will need to add the reference once the RFQ has been converted to the cart.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Adding and removing custom order references](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/add-and-remove-custom-order-references.html) |
