---
title: Minimum Order Value Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/minimum-order-value-feature-overview
redirect_from:
  - /v3/docs/minimum-order-value-feature-overview
  - /v3/docs/en/minimum-order-value-feature-overview
---


To increase order values, sometimes merchants might want to define a minimum order value for orders placed by their buyers. The **minimum order value** is a monetary value stipulated by a shop owner. If the minimum order value is not reached, the order placement can either be blocked or made possible only under certain conditions, for example, after paying a fee. This minimum value itself is also referred to as **threshold**. The threshold can either be hard or soft. The **hard threshold** implies that if buyer's cart value is below the minimum order value, the buyer will not be allowed to proceed to order placement.

For example, if shop owner set the hard threshold value as 400 Euro and customer added products for just 195 Euro to cart, he/she will not be able to buy the products. At the Summary checkout step, customer will see a message saying that the minimum order values requirements are not met.

            ![](../../../../Spryker Capabilities/Content/Resources/Images/Minimum Order Value/hard-threshold-not-met.png)

If the customer adds more products and the cart value becomes equal to or greater than 400 Euro, the order can be placed.

The **soft threshold** can be represented by three types: message, additional fee with fixed amount of money and additional fee with flexible amount of money (by percentage). The **soft threshold with message** means that, if the minimum order value is not reached, the customer sees a message saying that minimum order requirements are not fulfilled, however the customer can still purchase the product(s). The **soft threshold with fixed fee** means that, if the minimum order value is not reached, a certain amount of money (defined by a shop-owner), is added to order sum.

            ![](../../../../Spryker Capabilities/Content/Resources/Images/Minimum Order Value/soft-threshold-surcharge-message.png)

In this case, the buyer can either buy with the fee, or increase the cart value to meet the minimum order value threshold and then proceed to checkout without having to pay the fee.

The **soft threshold with flexible fee** means that, if the minimum order value is not reached, a certain percentage value (defined by a shop-owner) of the order value is added to order sum. Like with the fixed fee, the buyer can also either buy with the fee, or increase the cart value to meet the minimum order value threshold and then proceed to checkout without having to pay the fee.

The schema below illustrates the order placement workflow with minimum order value thresholds:

            ![](../../../../Spryker Capabilities/Content/Resources/Images/Minimum Order Value/min-order-value.jpg)

It should be kept in mind, that fees for soft thresholds are based on sub-total, and not grand-total values of orders. Fixed and flexible fees are added in a separate line as expenses for orders.

            ![](../../../../Spryker Capabilities/Content/Resources/Images/Minimum Order Value/soft-threshold-surcharge-checkout.png)

The minimum order value is set per store. Therefore, if you have a multi-store and multi-currency project - then minimum order value must be defined per each store and each currency.

The thresholds for the minimum order values are set by individual merchants globally in the dedicated area of the Administration Interface. This means, that threshold values set by them will be applied to all their customers.

However if a merchant has several merchant relations (which are relations between merchant and business units, see more [here](../../../../Spryker Capabilities/Content/Capabilities/Company Account/Merchants and Merchant Relations/merchants-and-merchant-relations-overview.htm)), the minimum order values thresholds can be set for each relation individually. Here it should be kept in mind, that regardless of any merchant thresholds, the global threshold is always applied. This means that in case there is a merchant threshold, both global and specific merchant one will be applied to the customer's cart. For example, suppose there is a value set for global hard or soft threshold, and there is also a threshold for a specific merchant relation. In this case, as the merchant relation threshold so also the global threshold will be applied to orders of users with this relation. If in this case global threshold is say 400, and merchant threshold is 100, the global threshold with value 400 must be met. If the merchant threshold is greater than the global one, say 700, the global one will be met "automatically", once the merchant one is met.

The diagram below illustrates relation of entities in the context of the Minimum Order Value feature:

            ![](../../../../Spryker Capabilities/Content/Resources/Images/Minimum Order Value/context-of-the-minimum-order-value.PNG)

## Minimum Order Values Data Import

Besides setting global and merchant relation thresholds for minimum order values manually in the Administration Interface, they can also be imported in bulk from a .csv file.

### Importing Minimum Order Value Data

You can import minimum order value data from a .csv file having the following fields:

* **store**: Indicate the store you want to import the data for
* **currency**: Indicate the currency for the minimum order value threshold data
* **strategy**: Specify the threshold strategy and eventually its type (for soft threshold) as follows: hard-threshold, soft-threshold, soft-threshold-flexible-fee or soft-threshold-fixed-fee
* **fee** (only for hard-threshold or soft-threshold with fees)
* **message_en**: Message in English that will be displayed if the threshold requirements are not met
* **message_de**: Message in German that will be displayed if the threshold requirements are not met

To import minimum order value information from `MinimumOrderValueDataImport/data/import/minimum_order_value.csv `file, run the following command:

Or, if you want to import threshold data from your file, indicate a path to it:

```shell
console data:import minimum-order-value
```

Or, if you want to import threshold data from your file, indicate a path to it:

```shell
console data:import minimum-order-value [-f [path_to_csv_file]
```

### Importing Minimum Order Value Data for Merchant Relations

You can import minimum order value data for individual merchant relations from a .csv file having the following fields:

* **merchant relation**: Indicate the key of and existing merchant relation
* **store**: Indicate the store you want to import the data for
* **currency**: Indicate the currency for the minimum order value threshold data
* **strategy**: Specify the threshold strategy and eventually its type (for soft threshold) as follows: hard-threshold, soft-threshold, soft-threshold-flexible-fee or soft-threshold-fixed-fee
* **fee** (only for hard-threshold or soft-threshold with fees)
* **message_en**: Message in English that will be displayed if the threshold requirements are not met
* **message_de**: Message in German that will be displayed if the threshold requirements are not met

To import minimum order value information from `MinimumOrderValueDataImport/data/import/minimum_order_value.csv` file, run the following command:

```shell
console data:import merchant-relationship-minimum-order-value
```

Or, if you want to import threshold data for merchant relations from your file, indicate a path to it:

```shell
console data:import merchant-relationship-minimum-order-value [-f [path_to_csv_file]
```

*Last review date: September 24th, 2018*


