---
title: Custom order Reference Overview
last_updated: Sep 14, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/custom-order-reference-feature-overview
originalArticleId: dda7fe3d-8ebc-4586-80c8-dc9d93250d6d
redirect_from:
  - /v5/docs/custom-order-reference-feature-overview
  - /v5/docs/en/custom-order-reference-feature-overview
  - /v5/docs/custom-order-reference
  - /v5/docs/en/custom-order-reference
---

**Custom Order Reference** is designed to help you control purchases and link the internal orders to external systems from your company using your external order reference. With the feature in place, you can add a custom order reference, such as invoice, to the order on Yves.

{% info_block infoBox "Info" %}

Keep in mind that the feature is available only for logged-in users.

{% endinfo_block %}

**In the Storefront**, you, as a Buyer, can add a custom order reference to the order or edit it (if needed) on the **Cart** page, and then view it on the **Summary** page. Once the order has been placed, the reference becomes non-editable and is displayed on the **Order Details** page in your customer account.

<details open>

<summary markdown='span'>Cart Page</summary>

![yves-custom-order-ref-cart-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/yves-custom-order-ref-cart-page.png)

</details>

<details open>

<summary markdown='span'>Summary Page</summary>

![yves-custom-order-ref-summary-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/yves-custom-order-ref-summary-page.png)

</details>

<details open>

<summary markdown='span'>Order Details Page </summary>

![yves-custom-order-ref-order-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/yves-custom-order-ref-order-details-page.png)

</details>

When working with the order in the Back Office, you, as a Back Office user, can view, edit, or remove the custom order reference on the order details page.

![zed-custom-order-ref-new](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Custom+Order+Reference/zed-custom-order-ref-new.gif)

## Interaction of the Custom Order Reference with the RFQ, Approval Process, and Share Cart via Link
If you submit a [quote request](/docs/scos/user/features/202108.0/quotation-process-feature-overview.html) and then convert it to the shopping cart, the cart gets locked. However, adding and updating the customer order reference for the locked cart is still possible.

In the [Approval Process](/docs/scos/user/features/{{page.version}}/approval-process-feature-overview.html) scenarios, both approver and buyer can add or edit the custom order reference during the checkout.

When [sharing a cart via a link with external users](/docs/scos/user/features/202108.0/persistent-cart-sharing-feature-overview.html), they can only view a custom order reference. However, when sharing a cart via a link with internal users, they can update a custom order reference for the shopping cart with the read-only and full-access permissions.


## Current Constraints
If you added a custom order reference to the cart, submitted a request for quote, and then converted the RFQ to the cart, the custom order reference will be removed. Thus, you will need to add the reference once the RFQ has been converted to the cart.
