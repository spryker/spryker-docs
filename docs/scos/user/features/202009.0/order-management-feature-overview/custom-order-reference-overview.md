---
title: Custom Order Reference overview
last_updated: Jun 13, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/custom-order-reference-overview
originalArticleId: 774e1a0e-0fc1-48c6-9cb6-82f81bff7c17
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
<summary markdown='span'>Cart page</summary>

![add-custom-order-reference](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/add-custom-order-reference.gif)

</details>

<details open>
<summary markdown='span'>Summary page</summary>

![custom-order-reference-summary-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/custom-order-reference-summary-page.png)

</details>

<details open>

<summary markdown='span'>Order Details page </summary>

![custom-order-reference-order-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/custom-order-reference-order-details-page.gif)

</details>

When working with the order in the Back Office, you, as a Back Office user, can view, edit, or remove the custom order reference on the order details page.

![zed-custom-order-ref-new](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/zed-change-custom-order-reference.gif)

## Custom Order Reference with the RFQ, approval process, and share cart via a link
If you submit a [quote request](/docs/scos/user/features/{{page.version}}/quotation-process-feature-overview.html) and then convert it to the shopping cart, the cart gets locked. However, adding and updating the customer order reference for the locked cart is still possible.

In the [Approval Process](/docs/scos/user/features/{{page.version}}/approval-process-feature-overview.html) scenarios, both an approver and buyer can add or edit the custom order reference during the checkout.

When [sharing a cart via a link with external users](/docs/scos/user/features/{{page.version}}/persistent-cart-sharing-feature-overview.html), they can only view the custom order reference. However, when [sharing a cart via a link with internal users](/docs/scos/dev/feature-integration-guides/{{page.version}}/order-management-feature-integration.html), they can update the custom order reference for the shopping cart with the read-only and full-access permissions.


## Current constraints
If you added a custom order reference to the cart, submitted a request for quote, and then converted the RFQ to the cart, the custom order reference will be removed. Thus, you will need to add the reference once the RFQ has been converted to the cart.