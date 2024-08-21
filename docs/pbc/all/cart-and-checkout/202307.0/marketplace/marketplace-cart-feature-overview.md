---
title: Marketplace Cart feature overview
description: This document contains concept information for the Marketplace Cart feature.
template: concept-topic-template
last_updated: Aug 21, 2023
redirect_from:
  - docs/marketplace/user/features/page.version/marketplace-cart-notes-feature-overview.html
---

The *Marketplace Cart* feature lets you include a "Notes" field on the cart page. Buyers can add notes to a particular item or the whole cart, for example, some special instructions about preparing and delivering an order.

Cart and item notes on the Storefront:

![Marketplace Cart Notes on the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Cart+Notes/mp-cart-notes-on-the-storefront.png)

Item notes in the Merchant Portal:

![Items notes in the Merchant Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Cart+Notes/mp-item-notes-merchant-portal.png)

The Marketplace administrator can see the special request in the [order details section of the Back Office](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-main-merchant-orders.html#merchant-order-overview-page):

![Cart Notes in Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart+Notes/cart-notes-admin.png)

## Current constraints

In a situation where the same product variants are added to the cart with different notes, the variants get merged with the same note.

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |
|---------|---------|---------|--------|
| [Install the Marketplace Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/install/install-features/install-the-marketplace-cart-feature.html)          | [Manage carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html)          |
|  | [Managing items in carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html) |
|   |  [Manage guest carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/guest-carts/manage-guest-carts.html) |
|   |  [Manage guest cart items](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/guest-carts/manage-guest-cart-items.html) |
