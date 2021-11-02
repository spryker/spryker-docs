---
title: Retrieving Promotional Items
last_updated: Oct 21, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/retrieving-promotional-items
originalArticleId: 5fc82c18-743b-4de9-bed3-17153448b25a
redirect_from:
  - /v5/docs/retrieving-promotional-items
  - /v5/docs/en/retrieving-promotional-items
---

The [Promotions](/docs/scos/user/features/{{page.version}}/promotions-and-discounts/discount/discount-feature-overview.html#promotional-product) functionality enables sellers to provide a promotional item that the customers can add to their carts at a discounted price or even for free. To be eligible for promotions, the purchase needs to fulfill certain discount conditions, for example, the purchase amount should exceed a certain threshold.

{% info_block infoBox "Info" %}

For more details on how to create the discount conditions, see [Creating a Cart Rule Discount](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html).

{% endinfo_block %}

In your development, the Promotions API will help you to enable customers to redeem the benefits provided by promotions and check the correct order amount, discount included.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Promotions & Discounts Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-promotions-and-discounts-feature-integration.html).

## Managing Promotional Items
You can do the following actions on the promotional items via API:

*     Retrieve promotional items available for a cart.
*     Add applicable promotional items to cart.
*     Remove the added promotional items from cart.

## Retrieving Promotional Items Available for a Cart
For customers to be able to benefit from promotional offers, first, they need to know about them. For this purpose, you can fetch the promotions available for products in a cart and display the possible benefits to the customer. To do so, you can query the cart information and include the `promotional-items` resource relationship. The response provides the abstract SKU of the promoted product and how many of the promotional items customers can add. To present detailed information on promotional products to the customer, you can include the `abstract-products` and `concrete-products` resource relationships.

See [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html) for details on how to retrieve promotional items for a registered user’s cart.

See [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html) for details on how to retrieve promotional items for a guest user’s cart.

## Adding Applicable Promotional Items to Cart
Once you know what promotional items you can make use of, you can apply the discounts by adding the promotional items to cart. To retrieve details on cart rules of the promotional items you add, include the cart-rule resource relationship into your request.

See [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html) for details on how you can add promotional items to a registered user’s cart.
See [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html) for details on how you can add promotional items to a guest user’s cart.

## Removing Promotional Items from Cart
To remove a discount applied to a promotional product, remove the promotional product(s) from the cart. For details, see Removing Items in [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html#removing-items) and [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html##remove-an-item-from-a-guest-cart). Also, if a cart no longer fulfills the conditions of the promotion, all promotional products are removed automatically.
