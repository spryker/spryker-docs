---
title: Shop Guide - Order History
description: This guide provides instructions on managing Order History in your Customer Account in a Spryker-based shop.
last_updated: Sep 14, 2020
template: howto-guide-template
originalLink: https://documentation.spryker.com/v5/docs/shop-guide-order-history
originalArticleId: 25acfa39-f693-469e-8839-e6260365fdc1
redirect_from:
  - /v5/docs/shop-guide-order-history
  - /v5/docs/en/shop-guide-order-history
related:
  - title: Shop Guide - Customer Profile
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-customer-profile.html
  - title: Shop Guide - Customer Addresses
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-customer-addresses.html
  - title: Shop Guide - Customer Account Overview
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-customer-account-overview.html
  - title: Shop Guide - Newsletter
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-newsletter.html
  - title: Shop Guide - Wishlists
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-wishlists.html
  - title: Shop Guide - Shopping Lists
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-shopping-lists.html
  - title: Shop Guide - Managing a Shopping Cart
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-shopping-carts/shop-guide-managing-a-shopping-cart.html
  - title: Shop Guide - Managing Multiple Shopping Carts
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-shopping-carts/shop-guide-managing-multiple-shopping-carts.html
  - title: Shop Guide - Managing Requests for Quotes for a Sales Representative
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-quote-requests/shop-guide-managing-requests-for-quotes-for-a-sales-representative.html
  - title: Shop Guide - Managing Requests for Quotes for a Buyer
    link: docs/scos/user/shop-user-guides/page.version/shop-guide-customer-account/shop-guide-quote-requests/shop-guide-managing-requests-for-quotes-for-a-buyer.html
---

Order History is the page where you can check all the orders you have created in your Customer Account.
<details open>
<summary markdown='span'>B2B Shop</summary>

![b2b-order-history](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Customer+Account/Order+History/b2b-order-history.png) 
</details>


<details open>
<summary markdown='span'>B2C Shop</summary>

![b2c-order-history](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Customer+Account/Order+History/b2c-order-history.png) 
</details>

The article describes how you can manage orders in your Customer Account, and provides step-by-step instructions on how to:

* view the order details
* reorder the existing orders
* add comments to the cart
***
To start working with the orders, navigate to the Customer Account > Order History section.
***

## Managing Order Details

On the **Order Details** page, you can view the order details, add a comment, and/or reorder the order.

**To view the order details:**

1. In the *Actions* column, click **View Order** for the order you want to view.
2. On the **Order Details** page, you can see the following information:

* Order ID
* Date when the order was placed
* Custom order reference (if exists, only for B2B shop)
* Shipment details including a product name, the number of items, a price, a delivery address and a shipment method
* Payment details
* Subtotal, shipment costs, and grand total

**To add a comment**, in the **Comments to Cart** widget, add a comment, and click **Add**. For more information on how to manage comments, see [Shop Guide - Managing Comments](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-comments/shop-guide-managing-comments.html).
***
## Reordering the Orders
You can reorder the whole order or the selected items from the order.
![reorder-buttons-b2b](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Customer+Account/Order+History/reorder-buttons-b2b.png) 

**To reorder the whole order or the selected items:**

1. On the **Order History** page in the *Actions* column, click **View** for the specific order. The **Order Details** page opens.
2. On the **Order Details** page, do the following:
    * Click **Reorder All** to reorder the whole order.
    * Select the items you want to reorder and then click **Reorder selected items**. 

This will take you to the Cart page where you can proceed to the checkout. For information on how to place the order, see [Shop Guide - Checkout](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-checkout.html).

## Sorting and Filtering Orders (B2B Shop)
When there is a long list of orders in the Customer account, it is always a good idea to filter the orders using various parameters. To **filter the orders**:

1. In the **Search** drop-down menu select one of the provided filter parameters. See [Orders: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/references/orders-reference-information.html) to learn more about the filter parameters.

2. Depending on the selection from step #1, enter the search query in the next to the **Search** drop-down field.

    {% info_block infoBox "Example" %}

    You can select **Product Name** in the **Search** drop-down and enter the name of the Concrete Product in the search query in the following field.

{% endinfo_block %}

To narrow the filtered results and find a more specific order, you can proceed with filtering options:

3. [Optional] Select the date range in fields **From** and **To**.

4. [Optional] In the **Business Unit** drop-down field, select the Business Unit the orders of which you would like to check. See [Company Roles: Reference Information](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-company-roles/references/company-roles-reference-information.html) for the permissions needed to be assigned for viewing the Business Unit orders.

5. [Optional] Check **Show products in search results** checkmark if you wish to see the products matching your search parameters in the search results. Otherwise, only the order list appropriate to the search parameters will be displayed.

6. Click **Apply** to see the results.
***

**What’s next?**

To learn more about how to place the order, see [Shop Guide - Checkout](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-checkout.html).

To learn more about how to share the cart with external or internal users, see [Sharing a Shopping Cart via Link](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-customer-account/shop-guide-shopping-carts/shop-guide-managing-multiple-shopping-carts.html#sharing-a-shopping-cart-via-link).

To learn more about how to manage comments in the cart, see [Shop Guide - Managing Comments](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-comments/shop-guide-managing-comments.html).

