---
title: Discount Conditions- Reference Information
originalLink: https://documentation.spryker.com/v4/docs/discount-conditions-reference-information
redirect_from:
  - /v4/docs/discount-conditions-reference-information
  - /v4/docs/en/discount-conditions-reference-information
---

This topic describes the information that you need to know when working with discount conditions in the **Conditions** tab.
***
Conditions are also called decision rules.
***
* A cart rule can have one or more conditions linked to it. The cart rule is redeemed only if every condition linked to it is satisfied. 
* Vouchers can be linked to one or more conditions. Vouchers are only redeemed if all linked conditions are satisfied.

The conditions are created in the form of a query and may be entered as a plain query or via the query builder. (See [Discount Calculation: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/references/discount-calcul) for more details.)

{% info_block infoBox "Info" %}
If you do not need to add a condition, you can leave the query builder empty.
{% endinfo_block %}

Example: Discount is applied if five or more items are in the cart and it is Tuesday or Wednesday.
![Discount Condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/discount-condition.png){height="" width=""}

The minimum order amount value specifies the threshold which should be reached for the products in a cart with a certain attribute to be discounted. When added to cart, products with the attribute specified by a query are measured against the threshold. By default, the minimum order amount value is 1. It means that any discount is applied if the number of items (that meet the rules) inside the cart is superior or equal to 1.

Example: Discount is applied if 4 or more items with the Intel Core processor are in the cart.
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/threshold.png){height="" width=""}
***
**More Advanced Example**

To create a discount that will have an extensive number of conditions, you use the condition **groups**. Meaning you collect different rules under different groups and split them into separate chunks.
Let's say you have received a task to create a discount with the following conditions:

**B2B Scenario**
The discount is going to be applied if one of the following is fulfilled:
1. The price mode is **Gross**, and:
    * the subtotal amount is greater or equal: 100 € (Euro) **OR** 115 CHF (Swiss Franc)

**OR**

2. The price mode is **Net**, and:
    * the subtotal amount is greater or equal: 80 € (Euro) **OR** 95 CHF (Swiss Franc)

The setup will look like the following:
![B2B scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2b-scenario.png){height="" width=""}
***
**B2C Scenario**
The discount is going to be applied if one of the following is fulfilled:
1. On **Tuesday**, and:
    * the item color is red, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart 

**OR**

2. On **Thursday**, and:
    * the item color is white, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart

The setup will look like the following:
![B2C scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2c-scenario.png){height="" width=""}
