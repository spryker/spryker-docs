---
title: "Glue API: Manage discounts via Glue API"
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-promotional-items
originalArticleId: d086d38c-dd6b-4419-a299-589c73a97f24
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/retrieving-promotional-items.html
  - /docs/scos/dev/glue-api-guides/201903.0/retrieving-promotional-items.html
  - /docs/scos/dev/glue-api-guides/201907.0/retrieving-promotional-items.html
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-promotional-items.html  
  - /docs/pbc/all/discount-management/202311.0/manage-via-glue-api/manage-discounts-via-glue-api.html
  - /docs/pbc/all/discount-management/202311.0/base-shop/manage-via-glue-api/manage-discounts-via-glue-api.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-using-glue-api/glue-api-manage-discounts.html
related:
  - title: Promotions and Discounts feature overview
    link: docs/pbc/all/discount-management/page.version/base-shop/promotions-discounts-feature-overview.html
---

The [Promotions](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html) functionality lets sellers provide a promotional item that the customers can add to their carts at a discounted price or even for free. To be eligible for promotions, the purchase must fulfill certain discount conditions—for example, the purchase amount exceeding a certain threshold.

{% info_block infoBox "" %}

For more details about how to create the discount conditions, see [Create discounts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html).

{% endinfo_block %}

In your development, the Promotions API helps you to allow customers to redeem the benefits provided by promotions and check the correct order amount with the discount included.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html).

## Managing promotional items

You can do the following actions on the promotional items via API:

* Retrieve the promotional items available for a cart.
* Add any applicable promotional items to cart.
* Remove the added promotional items from cart.

## Retrieving promotional items available for cart

For customers to be able to benefit from promotional offers, they first need to know about them. For this purpose, you can fetch the promotions available for products in a cart and display the possible benefits to the customer. To do so, you can query the cart information and include the `promotional-items` resource relationship. The response provides the abstract SKU of the promoted product and how many of the promotional items customers can add. To present detailed information on promotional products to the customer, you can include the `abstract-products` and `concrete-products` resource relationships.

For details about how to retrieve promotional items for a registered user's cart, see [Manage carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html).

 For details about how to retrieve promotional items for a guest user's cart, see [Manage guest carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html).

## Adding applicable promotional items to cart

Once you know what promotional items you can make use of, you can apply the discounts by adding the promotional items to cart. To retrieve details on cart rules of the promotional items you add, include the cart-rule resource relationship in your request.

For details about how to retrieve promotional items for a registered user's cart, see [Retrieve discounts in carts of registered users](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-carts-of-registered-users.html).

For details about how to retrieve promotional items for a guest user's cart, see [Retrieve discounts in guest carts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-guest-carts.html).

## Removing promotional items from cart

To remove a discount applied to a promotional product, remove the promotional product(s) from the cart. For details, see Removing Items in [Manage items in carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html#remove-items-from-a-registered-users-cart) and [Manage guest cart items](/docs/pbc/all/cart-and-checkout/{{site.version}}/marketplace/manage-using-glue-api/guest-carts/manage-guest-cart-items.html#remove-an-item-from-a-guest-cart). If a cart no longer fulfills the conditions of the promotion, all promotional products are removed automatically.
