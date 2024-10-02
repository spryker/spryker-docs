---
title: Wishlist feature overview
description: Help your customers track and save items for later purchase through multiple Wish Lists, which are connected to the customer' accounts.
last_updated: Aug 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/wishlist-feature-overview
originalArticleId: 6af20838-1a7d-4112-9f8b-802995363403
redirect_from:
  - /docs/scos/user/features/202108.0/wishlist-feature-overview.html
  - /docs/scos/user/features/202200.0/wishlist-feature-overview.html
  - /docs/scos/user/features/202307.0/wishlist-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/wishlist-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/wishlist-feature-walkthrough.html
---

With the *Wishlist* feature, you can help your customers track and save items for later purchase through multiple wishlists, which are connected to the customers' accounts.

<!--- Customers can create one or multiple wishlists with different names, add products to them and transfer wishlists to carts (either the entire list, or a specific item from the list) --->

Customers can manage their wishlists in the **Wishlist** section of the customer account. In there, they can see the list of wishlists that they have, the number of items inside each one, the date of creation, and **Edit** and **Delete** options.

<!---Your customers can add items from different lists to the cart.--->

{% info_block warningBox "Warning" %}

* Only logged-in customers can use the Wishlist functionality.
* If the same item is added to the cart from multiple wishlists, then in the cart, this item will have the quantity value updated based on the number of times this specific item was added.
* Each wishlist is an independent entity.

{% endinfo_block %}

## Naming a wishlist

Customers can easily keep track of their wishlists by naming each one individually.

When the customer selects **Add to Wishlist** for the first time, and there are no wishlists in the system yet, one is created automatically with the name `My Wishlist`.

In the **Wishlist** section, the customer can rename the existing wishlists' names and create new wishlists.

## Converting a wishlist to cart

The direct-to-cart function lets your customers simply add items from their wishlist to a shopping cart with a single click.

Specifically, the customer can do the following:
* Add all the products from the wishlist to the cart by clicking **Add all available products to the cart**.
* Add selected items from the wishlist to the cart by selecting the **Add to Cart** option for a specific item.

<!--- ![Multiple wishlists](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/multiple_wishlists.gif)-->

## The Wishlist feature on the Storefront

Buyers can do the following actions using the Wishlists feature:
<details>
<summary>Create, rename, and edit a wishlist </summary>

![create-rename-delete-wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/create-rename-delete-wishlist.gif)

</details>

<details>
<summary>Add a product from the product details page to a wishlist</summary>

![add-product-from-product-details-page-to-wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/add-product-from-product-details-page-to-wishlist.gif)

</details>

<details>
<summary>View a wishlist's details, remove products from the wishlist, and add all products from the wishlist to the cart</summary>

![view-details-remove-products-and-add-all-products-from-wishlist-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/view-details-remove-products-and-add-all-products-from-wishlist-to-cart.gif)

</details>

<details>
<summary>Add selected products from the wishlist to the cart</summary>

![add-selected-products-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/add-selected-items-to-cart.gif)

</details>

## Video tutorial

For more details about wishlists, check the video:

{% wistia g7hzsa9xw7 720 480 %}


## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES  |
|---------|---------|---------|
| [Install the Wishlist + Alternative Products feature](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-wishlist-alternative-products-feature.html)  | [Upgrade the Wishlist module](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-wishlist-module.html) | [Manage wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html)  |
| [Integrate the Wishlist Glue API](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-wishlist-glue-api.html)  |   |[ Manage wishlist items](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlist-items.html)  |
