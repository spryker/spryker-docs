---
title: Multiple Carts feature overview
description: Shopping Cart is where the record of the items a buyer has ‘picked up’ from the online store is kept. Select products, review them and add more with ease.
last_updated: Jul 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-carts-feature-overview
originalArticleId: d5aad6be-5c2c-4e27-806e-7091a6db3d0d
redirect_from:
  - /2021080/docs/multiple-carts-feature-overview
  - /2021080/docs/en/multiple-carts-feature-overview
  - /docs/multiple-carts-feature-overview
  - /docs/en/multiple-carts-feature-overview
---

Sometimes customers need more than one shopping cart, for example, one for daily purchases, the other one for monthly expenses. The *Multiple Carts* feature allows you to create and manage multiple shopping carts in one customer account.

## Creating and managing multiple shopping carts

There are two ways to create a shopping cart:

* Through a shopping cart widget in the header of shop.
* From the *Shopping Cart* page in the *My Account* menu.

New items are added to the shopping cart by clicking **Add to Cart** on the product details page.

Customers can create not just one but multiple shopping carts to be used for different needs.

{% info_block infoBox %}

These could be, for instance, a shopping cart for daily purchases or a shopping cart for goods that you purchase once in a month.

{% endinfo_block %}

After a shopping cart has been created, it appears in the shopping carts table on the *Shopping Cart* page in *My Account*.

The table with shopping carts shows details for each of the carts, including:

* Name of the shopping cart
* Access level (Owner, Read-only or Full access)
* Number of products added to cart
* Price mode (Net or Gross)
* Cart Total
* Possible actions to manage shopping carts: edit name, duplicate, [share](/docs/scos/user/features/{{page.version}}/shared-carts-feature-overview.html), dismiss, delete, switch cart to shopping list (see the *Actions* table for details)

![Multiple carts list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Multiple+Carts+per+User+Feature+Overview/multiple-cart-list.png)

The table bellow provides detailed information on the possible actions to manage shopping carts.

| ACTION | DESCRIPTION |
| --- | --- |
| Edit Name | Allows a customer to edit the name of the shopping cart. |
| Duplicate | Creates a copy of the chosen shopping cart including the items added to the cart.<br>The duplicate copy of the cart is named according to the template: `<Name of the original cart> Copied At <Mo. dd, yyyy hh:mm>` <br>A cart can be converted into shopping list on the *Shopping cart* page by clicking on **To shopping list**.|
| Dismiss | Allows a customer to dismiss a shared shopping cart. |
| Delete | Deletes the shopping cart. <br>Deleting a shopping cart also deletes the items added to it. |

{% info_block infoBox %}

To view how to create, edit, duplicate, and delete a cart and how to dissmiss shared carts, see the [Multiple Carts on the storefront](#multiple-carts-per-user-on-the-storefront) section.

{% endinfo_block %}

To learn more about sharing the shopping cart, check out [Shared Cart documentation](/docs/scos/user/features/{{page.version}}/shared-carts-feature-overview.html).

Active shopping cart is highlighted in bold.

{% info_block infoBox %}

Only one shopping cart can be set as active in the customer account.

{% endinfo_block %}

There are 2 ways to set a shopping cart as active:

* Clicking on the cart name in the shopping cart widget in the header of the shop.
* Clicking on the cart name on the *Shopping Cart* page in the *My Account* menu.

After the shopping cart is set to active, the user is redirected to a respective cart page where the table with the following information is available:

* Product image
* Product name
* SKU
* Product attributes
* Product options
* Quantity
* Note
* Price mode
* Item price
* Cat Note
* Discount
* Subtotal
* Tax
* Grand Total

![Shopping Cart Page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Multiple+Carts+per+User+Feature+Overview/a-shopping-cart-page.png)

## Multiple Carts on the Storefront
On the storefront, company users can perform the following actions using the Multiple Carts feature:
<a name="multiple-carts-per-user-on-the-storefront"></a>

<details>
<summary markdown='span'>Create a cart</summary>

![Create a cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Multiple+Carts+per+User+Feature+Overview/create-a-cart.gif)
</details>

<details>
<summary markdown='span'>Edit and delete a cart</summary>

![Edit and delete a cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Multiple+Carts+per+User+Feature+Overview/manage-a-shopping-cart.gif)
</details>
<details>
<summary markdown='span'>Dismiss and duplicate a cart</summary>

![Dismiss and duplicate a cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Multiple+Carts+per+User+Feature+Overview/dismiss-and-duplicate-a-shopping-cart.gif)
</details>

* To share a cart with external and internal users via a link, see [Unique URL per Cart for Easy Sharing feature overview](/docs/scos/user/features/{{page.version}}/persistent-cart-sharing-feature-overview.html).
* To share a cart with users within one business unit, see [Shared Cart feature overview](/docs/scos/user/features/{{page.version}}/shared-carts-feature-overview.html#shared-cart-on-the-storefront).
* To add a custom order reference to a cart, see [Custom Order Reference feature overview](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/custom-order-reference-overview.html).
* To add comments to a cart, see [Comments feature overview](/docs/scos/user/features/{{page.version}}/comments-feature-overview.html#comments-on-the-storefront).
* To add a customer order reference to an order, see [Custom Order Reference feature overview](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/custom-order-reference-overview.html).


In this video, we explain how to use shopping carts in the Spryker [B2B Demo Shop](/docs/scos/user/intro-to-spryker/b2b-suite.html).

{% wistia s776wlo9ds 960 720 %}

{% info_block warningBox %}

Are you a developer? See [Multiple Carts feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/multiple-carts-feature-walkthrough.html) for developers.

{% endinfo_block %}
