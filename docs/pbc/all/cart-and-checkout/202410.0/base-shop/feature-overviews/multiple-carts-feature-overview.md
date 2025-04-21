---
title: Multiple Carts feature overview
description: Shopping Cart is where the record of the items a buyer has picked up from the online store is kept. Select products, review them and add more with ease.
last_updated: Jul 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-carts-feature-overview
originalArticleId: d5aad6be-5c2c-4e27-806e-7091a6db3d0d
redirect_from:
  - /docs/scos/user/features/202311.0/multiple-carts-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/multiple-carts-feature-walkthrough.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/multiple-carts-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/feature-overviews/multiple-carts-feature-overview.html
---

Sometimes customers need more than one shopping cart, such as one for daily purchases and another one for monthly expenses. The *Multiple Carts* feature lets you create and manage multiple shopping carts in one customer account.

## Creating and managing multiple shopping carts

There are two ways to create a shopping cart:

* Through a shopping cart widget in the header of the shop.
* From the **Shopping Cart** page in the **My Account** menu.

New items are added to the shopping cart by clicking **Add to Cart** on the product details page.

Customers can create not just one but multiple shopping carts to be used for different needs.

{% info_block infoBox %}

For example, these can be a shopping cart for daily purchases or a shopping cart for goods that you purchase once a month.

{% endinfo_block %}

After a shopping cart has been created, it appears in the shopping carts table on the **Shopping Cart** page in **My Account**.

The table with shopping carts shows details for each of the carts, including the following:

* Name of the shopping cart
* Access level (Owner, Read-only, or Full access)
* Number of products added to cart
* Price mode (Net or Gross)
* Cart Total
* Possible actions to manage shopping carts: edit name, duplicate, [share](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/shared-carts-feature-overview.html), dismiss, delete, switch cart to the shopping list (see the **Actions** table for details)

![Multiple carts list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Multiple+Carts+per+User+Feature+Overview/multiple-cart-list.png)

The following table provides detailed information about the possible actions to manage shopping carts.

| ACTION | DESCRIPTION |
| --- | --- |
| Edit Name | Lets a customer edit the name of the shopping cart. |
| Duplicate | Creates a copy of the chosen shopping cart including the items added to the cart.<br>The duplicate copy of the cart is named according to the template: `<Name of the original cart> Copied At <Mo. dd, yyyy hh:mm>` <br>A cart can be converted into shopping list on the **Shopping Cart** page by clicking on **To shopping list**.|
| Dismiss | Lets a customer dismiss a shared shopping cart. |
| Delete | Deletes the shopping cart. <br>Deleting a shopping cart also deletes the items added to it. |

{% info_block infoBox %}

To view how to create, edit, duplicate, and delete a cart and how to dismiss shared carts, see the [Multiple Carts on the storefront](#multiple-carts-per-user-on-the-storefront) section.

{% endinfo_block %}

To learn more about sharing the shopping cart, see [Shared Cart documentation](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/shared-carts-feature-overview.html).

An active shopping cart is highlighted in bold.

{% info_block infoBox %}

Only one shopping cart can be set as active in the customer account.

{% endinfo_block %}

There are two ways to set a shopping cart as active:
* Clicking on the cart name in the shopping cart widget in the header of the shop.
* Clicking on the cart name on the **Shopping Cart** page in the **My Account** menu.

After the shopping cart is set to active, the user is redirected to the respective cart page where a table with the following information is available:

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
On the storefront, company users can perform the following actions by using the Multiple Carts feature:
<a name="multiple-carts-per-user-on-the-storefront"></a>

<details>
<summary>Create a cart</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/cart-and-checkout/base-shop/feature-overviews/multiple-carts-feature-overview.md/create-a-cart.mp4" type="video/mp4">
  </video>
</figure>

</details>

<details>
<summary>Edit and delete a cart</summary>


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/cart-and-checkout/base-shop/feature-overviews/multiple-carts-feature-overview.md/manage-a-shopping-cart.mp4" type="video/mp4">
  </video>
</figure>


</details>


<details>
<summary>Dismiss and duplicate a cart</summary>



<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/cart-and-checkout/base-shop/feature-overviews/multiple-carts-feature-overview.md/dismiss-and-duplicate-a-shopping-cart.mp4" type="video/mp4">
  </video>
</figure>


</details>

* To share a cart with external and internal users by a link, see [Unique URL per Cart for Easy Sharing feature overview](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/persistent-cart-sharing-feature-overview.html).
* To share a cart with users within one business unit, see [Shared Cart feature overview](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/shared-carts-feature-overview.html#shared-cart-on-the-storefront).
* To add a custom order reference to a cart, see [Custom Order Reference feature overview](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/order-management-feature-overview/custom-order-reference-overview.html).
* To add comments to a cart, see [Comments feature overview](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/comments-feature-overview.html#comments-on-the-storefront).
* To add a customer order reference to an order, see [Custom Order Reference feature overview](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/order-management-feature-overview/custom-order-reference-overview.html).


This video explains how to use shopping carts in the Spryker [B2B Demo Shop](/docs/about/all/b2b-suite.html).

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/cart-and-checkout/base-shop/feature-overviews/multiple-carts-feature-overview.md/How+to+Use+Shopping+Carts+in+Spryker+B2B-s776wlo9ds.mp4" type="video/mp4">
  </video>
</figure>


https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/cart-and-checkout/base-shop/feature-overviews/multiple-carts-feature-overview.md/How+to+Use+Shopping+Carts+in+Spryker+B2B-s776wlo9ds.mp4

## Related Developer documents

|INSTALLATION GUIDES  |
|---------|
| [Install the Multiple Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html)  |
| [Install Multiple Carts + Quick Order feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-quick-order-feature.html)  |
| [Install Multiple Carts + Quotation Process feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-quotation-process-feature.html)  |
| [Install the Multiple Carts + Reorder feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-reorder-feature.html)   |
