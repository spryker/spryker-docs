---
title: Wishlist feature overview
description: Help your customers track and save items for later purchase through multiple Wish Lists, which are connected to the users' accounts.
last_updated: Apr 14, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/wishlist-feature-overview
originalArticleId: 25c1bb12-0698-4c02-a2b7-04b0827920a8
redirect_from:
  - /v6/docs/wishlist-feature-overview
  - /v6/docs/en/wishlist-feature-overview
  - /v6/docs/wishlist
  - /v6/docs/en/wishlist
---

Help your customers track and save items for later purchase through multiple wishlists, which are connected to the users' accounts.

<!--- Customers can create one or multiple wishlists with different names, add products to them and transfer wishlists to carts (either the entire list, or a specific item from the list) --->

Customers can manage their wishlists in the *Wishlist* section of the customer account. In there, they can see the list of wishlists that they have, the number of items inside each one, the date of creation, **Edit** and **Delete** options.

<!---Your users can add items from different lists to the cart.--->
{% info_block warningBox %}
Note the following:
* Only logged-in customers can use the Wishlist functionality.
* If the same item is added to the cart from multiple wishlists, then in the cart, this item will have the quantity value updated based on the number of times this specific item was added.
* Each wishlist is an independent entity.
{% endinfo_block %}


## Naming a wishlist

Users can easily keep track of their wishlists by naming each one individually.

When the customer selects Add to Wishlist for the first time, and there are no wishlists in the system yet, one will be created automatically with name *My Wishlist*.

The wishlist name can be later changed in the *Wishlist* section as well as new wishlists added.

## Converting a wishlist to cart

The direct-to-cart function enables your customers to simply add items from their wishlist to a shopping cart with a single click.

Specifically, the customer can:

* Add all the products from the wishlist to the cart by selecting the Add all available products to cart
* Add selected items from the wishlist to the cart by using the **Add to Cart** option for a specific item.

<!--- ![Multiple wishlists](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/multiple_wishlists.gif)-->

## The Wishlist feature on the Storefront
Buyers can do the following actions using the Wishlists feature:
<details>
<summary markdown='span'>Create, rename, and edit a wishlist </summary>

![create-rename-delete-wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/create-rename-delete-wishlist.gif)

</details>

<details>
<summary markdown='span'>Add a product from the product deatils page to a wishlist</summary>

![add-product-from-product-details-page-to-wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/add-product-from-product-details-page-to-wishlist.gif)

</details>

<details>
<summary markdown='span'>View a wishlist's details, remove products from the wishlist, and add all products from the wishlist to cart</summary>

![view-details-remove-products-and-add-all-products-from-wishlist-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/view-details-remove-products-and-add-all-products-from-wishlist-to-cart.gif)

</details>

<details>
<summary markdown='span'>Add selected products from the wishlist to cart</summary>

![add-selected-products-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Wishlist/Multiple+Wishlists/add-selected-items-to-cart.gif)

</details>


## Video tutorial

For more details on wishlists, check the video:

{% wistia g7hzsa9xw7 960 720 %}

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Wishlist feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/wishlist-feature-walkthrough.html) for developers.

{% endinfo_block %}
