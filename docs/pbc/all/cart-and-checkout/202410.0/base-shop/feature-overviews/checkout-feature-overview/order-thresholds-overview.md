---
title: Order thresholds overview
description: Spryker Cloud Commerce OS Order threshold feature lets you configure minimum and maximum values for the orders that your customers place.
last_updated: Jul 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/order-thresholds
originalArticleId: b6d4ac1a-fd06-420a-a4bf-9db638e20447
redirect_from:
  - /docs/scos/user/features/202311.0/checkout-feature-overview/order-thresholds-overview.html
  - /docs/pbc/all/cart-and-checkout/checkout-feature-overview/order-thresholds-overview.html
  - /docs/pbc/all/cart-and-checkout/202311.0/checkout-feature-overview/order-thresholds-overview.html  
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/checkout-feature-overview/order-thresholds-overview.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html
  - /docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html

---

*Order thresholds* let you control the values of the orders that your customers place. You can define a maximum or minimum monetary value for customers to reach to place an order. Apart from just disallowing a customer to place an order if a threshold condition is not fulfilled, you can request them to pay different types of fees.


## Hard maximum threshold

A *hard maximum threshold* is a monetary value that can't be surpassed for an order to be placed.

For example, if the hard maximum threshold is €3000, and a customer adds items for €3001 to their cart, they can't place the order.

A Back Office user can enter a message that is displayed in the cart when the hard maximum threshold is reached.

To learn how a Back Office user can configure the maximum hard threshold, see [Define a maximum hard threshold](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/manage-in-the-back-office/define-global-thresholds.html#define-a-maximum-hard-threshold).


## Minimum thresholds

A *minimum threshold* is a monetary value that must be reached for an order to be placed. If the order subtotal is below the minimum order value, the customer cannot place the order or can instead place it under conditions defined by the shop owner. For example, the customer can be requested to pay a fee.


### Hard minimum threshold

A *hard minimum* threshold is a minimum threshold that under no conditions lets a customer place an order if its subtotal is below the defined value.

For example, if the hard minimum threshold value is €400, and a customer adds products for €195 to their cart, they cannot place the order. If the customer adds more products and the order subtotal becomes equal to or greater than €400, they can place the order.

To learn how a Back Office user configures the minimum hard threshold, see [Define a minimum hard threshold](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/manage-in-the-back-office/define-global-thresholds.html#define-a-minimum-hard-threshold).


### Soft minimum threshold

A *soft minimum threshold* is a minimum threshold that, under the conditions defined by the shop owner, lets a customer place an order even if its subtotal is below the minimum soft threshold.

The following soft minimum thresholds are shipped by default:

- Soft minimum threshold with a message.
- Soft minimum threshold with a fixed fee.
- Soft minimum threshold with a flexible fee.

Fees for the soft thresholds are based on subtotal order values. Fixed and flexible fees are added in a separate line as expenses for orders.

To learn how a Back Office user configures the minimum soft threshold, see [Define a minimum soft threshold](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/manage-in-the-back-office/define-global-thresholds.html#define-a-minimum-soft-threshold).


#### Soft minimum threshold with a message

The *soft minimum threshold with a message* lets you place an order with the value below the threshold and displays a message.


#### Soft minimum threshold with a fixed fee

The *soft threshold with a fixed fee* lets you place an order with a value below the threshold and adds a defined fee to the order subtotal. If a customer with a fee adds more products to their cart to reach the threshold value, the fee is removed from the cart.

For example, a shop owner sets a soft minimum threshold of €400 with a fixed fee of €40. If a customer adds products to their cart for €195, they can still place the order, but the fixed fee of €40 is added to their cart. If the customer adds more products and the order subtotal becomes equal to or greater than €400, the fee is removed from the cart.


#### Soft minimum threshold with a flexible fee

The *soft threshold with a flexible fee* lets you place an order with the value below the threshold and adds a percentage of the order value to the order subtotal. If a customer with a fee adds more products to their cart to reach the threshold value, the fee is removed from the cart.

For example, a shop owner sets a soft minimum threshold of €400 with a flexible fee of 10%. If a customer adds products to their cart for €195, they can still place the order, but the flexible fee of 10% (€19.5) is added to their cart. If the customer adds more products and the order subtotal becomes equal to or greater than €400, the fee is removed from the cart.


The following diagram shows how orders are checked against defined thresholds.

![minimum-order-value-schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Order+Thresholds/minimum-order-value-schema.jpg)

## Thresholds and discounts

When an order is checked against the defined thresholds, discounts are not taken into account.

Example with a hard *minimum* threshold:

1. The hard minimum threshold value is €400.
2. A customer adds products for €450 to the cart.
3. The customer applies a discount voucher, which decreases the order subtotal to €385.
4. The customer *can* place the order.

Example with a hard *maximum* threshold:

1. The hard maximum threshold value is €50.
2. The customer adds products for €55 to the cart.
3. The customer applies a discount voucher, which decreases the order subtotal to €45.
4. The customer *cannot* place the order.


## Store relation

All the thresholds have a store relation. If you have a multi-store and multi-currency project, you need to define thresholds per store and currency.


## Merchant order thresholds

A *merchant order threshold* is a threshold that is applied to the customers belonging to the [merchant relation](/docs/pbc/all/merchant-management/{{site.version}}/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html) for which it's defined.

If global and merchant order thresholds are defined, both are applied to the customers' orders belonging to the merchant relation.

{% info_block infoBox "Example 1" %}

If the global minimum threshold is €400 and the minimum threshold per merchant relation is €100, the minimum subtotal is €400.

{% endinfo_block %}

{% info_block infoBox "Example 2" %}

If the global minimum threshold is €400, and the minimum threshold per merchant relation is €700, the minimum subtotal is €700.

{% endinfo_block %}

{% info_block infoBox "Example 3" %}


- Conditions:
  - Global hard maximum threshold is €100.
  - Soft minimum merchant order threshold with a fee is €200.
  - Order subtotal is €150.

- Result: The fee of the merchant order threshold is added to the cart, but the customer can't place the order because the global threshold is reached.

{% endinfo_block %}

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Define global thresholds](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/manage-in-the-back-office/define-global-thresholds.html) |
| [Define merchant order thresholds](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-in-the-back-office/define-merchant-order-thresholds.html) |
| [Manage threshold settings](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/manage-in-the-back-office/manage-threshold-settings.html) |
