---
title: Order Thresholds feature overview
description: Order thresholds allow you to control the values of the orders your customers place. You can define a maximum or a minimum value that should be reached for an order to be placed.
last_updated: Jul 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/order-thresholds
originalArticleId: b6d4ac1a-fd06-420a-a4bf-9db638e20447
redirect_from:
  - /2021080/docs/order-thresholds
  - /2021080/docs/en/order-thresholds
  - /docs/order-thresholds
  - /docs/en/order-thresholds
---

Order thresholds allow you to control the values of the orders your customers place. You can define a maximum or a minimum value that should be reached for an order to be placed. Apart from just disallowing a customer to place an order if a threshold condition is not fulfilled, you can request them to pay different types of fees.


## Hard maximum threshold
A hard *maximum* threshold is a monetary value that should not be surpassed for an order to be placed.

For example, if the hard maximum threshold is €3000, and a customer adds items for €3001 to cart, they cannot place the order.

A Back Office user can enter a message that is displayed in cart when the hard maximum threshold is reached.

See [Setting up a maximum hard threshold](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html#setting-up-maximum-hard-threshold) to learn how a Back Office user configures the maximum hard threshold.


## Minimum thresholds
A *minimum* threshold is a monetary value that should be reached for an order to be placed. If the order subtotal is below the minimum order value, the customer cannot place the order or place it under the conditions defined by the shop owner. For example, a customer can be requested to pay a fee.


### Hard minimum threshold
A *hard minimum* threshold is a minimum threshold that under no conditions allows a customer to place an order if its subtotal is below the defined value.

For example, if the hard minimum threshold value is €400, and a customer adds products for €195 to cart, they cannot place the order. If the customer adds more products and the order subtotal becomes equal to or greater than €400, they can place the order.

See [Setting up a minimum hard threshold](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html#setting-up-minimum-hard-threshold) to learn how a Back Office user configures the minimum hard threshold.


### Soft minimum threshold
A *soft minimum* threshold is a minimum threshold that, under the conditions defined by the shop owner, allows a customer to place an order even if its subtotal is below the minimum soft threshold.

The following soft minimum thresholds are shipped by default:

* Soft minimum threshold with a message
* Soft minimum threshold with a fixed fee
* Soft minimum threshold with a flexible fee

Fees for the soft thresholds are based on sub-total order values. Fixed and flexible fees are added in a separate line as expenses for orders.

See [Setting up a minimum soft threshold](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html#setting-up-minimum-soft-threshold) to learn how a Back Office user configures the minimum soft threshold.


#### Soft minimum threshold with a message
The* soft minimum threshold with a message* allows placing an order with the value below the threshold and displays a message.


#### Soft minimum threshold with a fixed fee
The *soft threshold with a fixed fee* allows placing an order with the value below the threshold and adds a defined fee to the order subtotal. If a customer with a fee adds more products to cart to reach the threshold value, the fee is removed from the cart.

For example, a shop owner sets a soft minimum threshold €400 with a fixed fee of €40. If a customer adds products to cart for 195 Euro, they can still place the order, but the fixed fee of €40 is added to their cart. If the customer adds more products and the order subtotal becomes equal to or greater than €400, the fee is removed from the cart.


#### Soft minimum threshold with a flexible fee
The soft threshold with a flexible fee allows placing an order with the value below the threshold and adds a percentage of the order value to the order subtotal. If a customer with a fee adds more products to cart to reach the threshold value, the fee is removed from the cart.

For example, a shop owner sets a soft minimum threshold €400 with a flexible fee of 10%. If a customer adds products to cart for 195 Euro, they can still place the order, but the flexible fee of €19.5 is added to their cart. If the customer adds more products and the order subtotal becomes equal to or greater than €400, the fee is removed from the cart.


The diagram below shows how orders are checked against defined thresholds.

![minimum-order-value-schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Order+Thresholds/minimum-order-value-schema.jpg)

## Thresholds and discounts
When an order is checked against the defined thresholds, discounts are not taken into account.

Example with the hard *minimum* threshold:

1. The hard minimum threshold value is €400.
2. Customer adds products for €450 to cart.
3. Customer applies a discount voucher, which decreases the order sub-total to €385.
4. Customer *can* place the order.

Example with the hard *maximum* threshold:

1. The hard maximum threshold value is €50.
2. Customer adds products for €55 to cart.
3. Customer applies a discount voucher, which decreases the order sub-total to €45.
4. Customer *cannot* place the order.


## Store relation
All the thresholds have a store relation. If you have a multi-store and multi-currency project, you need to define thresholds per each store and currency.


## Merchant order thresholds
A *merchant order threshold* is a threshold that is applied to the customers belonging to the [merchant relation](/docs/scos/user/features/{{page.version}}/merchant-b2b-contracts-feature-overview.html) for which it is defined.   

If a global and a merchant order thresholds are defined, both of them are applied to the orders of the customers belonging to the merchant relation.

{% info_block infoBox "Example 1" %}

If the global minimum threshold is €400, and the minimum threshold per merchant relation is €100, the minimum sub-total is €400.

{% endinfo_block %}
{% info_block infoBox "Example 2" %}

If the global minimum threshold is €400, and the minimum threshold per merchant relation is €700, the minimum sub-total is €700.

{% endinfo_block %}

 {% info_block infoBox "Example 3" %}


* Conditions:

    * Global hard maximum threshold is €100.

    * Soft minimum merchant order threshold with a fee is €200.

    * Order sub-total is €150.

* Result: The fee of the merchant order threshold is added to cart, but the customer cannot place the order because the global threshold is reached.

{% endinfo_block %}

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage global thresholds](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html) |
| [Manage merchant order thresholds](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-merchant-order-thresholds.html) |
| [Manage threshold settings](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-threshold-settings.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Checkout feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/checkout-feature-walkthrough.html) for developers.

{% endinfo_block %}
