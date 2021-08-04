---
title: Minimum Order Value Feature Overview
originalLink: https://documentation.spryker.com/v5/docs/order-thresholds-feature-overview
redirect_from:
  - /v5/docs/order-thresholds-feature-overview
  - /v5/docs/en/order-thresholds-feature-overview
---

To increase order values, sometimes merchants might want to define a minimum order value for orders placed by their buyers. The **minimum order value** is a monetary value stipulated by a shop owner. If the minimum order value is not reached, the order placement can either be blocked or made possible only under certain conditions, for example, after paying a fee. This minimum value itself is also referred to as a **threshold**. The threshold can either be hard or soft. The **hard threshold** implies that if the buyer's cart value is below the minimum order value, the buyer will not be allowed to proceed to order placement.

For example, if the shop owner set the hard threshold value as 400 Euro and customer added products for just 195 Euro to cart, he/she will not be able to buy the products. At the Summary checkout step, a customer will see a message saying that the minimum order values requirements are not met.

If the customer adds more products and the cart value becomes equal to or greater than 400 Euro, the order can be placed.

The **soft threshold** is represented by three types:

* a message
* an additional fee with a fixed amount of money
* an additional fee with a flexible amount of money (by percentage)

The **soft threshold with a message** means that, if the minimum order value is not reached, the customer sees a message saying that minimum order requirements are not fulfilled. However, the customer can still purchase the product(s). The soft **threshold with a fixed fee** means that, if the minimum order value is not reached, a certain amount of money (defined by a shop-owner), is added to the order sum.

![Threshold with fixed value](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Minimum+Order+Value/Minimum+Order+Value+Feature+Overview/threshold-with-fixed-fee.png){height="" width=""}

In this case, the buyer can either buy with the fee or increase the cart value to meet the minimum order value threshold and then proceed to checkout without having to pay the fee.

The **soft threshold with a flexible fee** means that, if the minimum order value is not reached, a specific percentage value (defined by a shop-owner) of the order value is added to the order sum. Like with the fixed fee, the buyer can also either buy with the fee or increase the cart value to meet the minimum order value threshold and then proceed to checkout without having to pay the fee.

The schema below illustrates the order placement workflow with minimum order value thresholds:

![Minimum Order Value schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Minimum+Order+Value/Minimum+Order+Value+Feature+Overview/minimum-order-value-schema.jpg){height="" width=""}

{% info_block infoBox %}
Keep in mind, that fees for the soft thresholds are based on sub-total and not grand-total values of orders. Fixed and flexible fees are added in a separate line as expenses for orders.
{% endinfo_block %}
The minimum order value is set per store. Therefore, if you have a multi-store and multi-currency project - then minimum order value must be defined per each store and each currency.

The thresholds for the minimum order values are set by individual merchants globally in the dedicated area of the Back Office. This means that threshold values set by them are applied to all of their customers.

However, if a merchant has several merchant relations (which are relations between merchant and business units, see more here), the minimum order values thresholds can be set for each relation individually. Regardless of any merchant thresholds, the **global threshold** is always applied. This means that in case there is a merchant threshold, as well as the global one, both global and specific merchant thresholds, are applied to the customer's cart. For example, suppose there is a value set for a global hard or soft threshold, and there is also a threshold for a specific merchant relation. In this case, as the merchant relation threshold so also the global threshold will be applied to orders of users with this relation. If in this case the global threshold is, say, 400, and merchant threshold is 100, the global threshold with value 400 must be met. If the merchant threshold is higher than the global one, say 700, the global one is met "automatically," once the merchant one is met.

The diagram below illustrates the relation of entities in the context of the Minimum Order Value feature

![Relation of entities](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Minimum+Order+Value/Minimum+Order+Value+Feature+Overview/context-of-the-minimum-order-value-module.png){height="" width=""}

