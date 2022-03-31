---
title: Marketplace Promotions and Discounts feature overview
description: This document contains concept information for the Marketplace Promotions and Discounts feature.
template: concept-topic-template
related:
    - title: Discount
      link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-promotions-and-discounts-feature-walkthrough.html
---

The *Marketplace Promotions and Discounts* feature ensures that the discounts are applied to orders.

There are two discount types:

* Voucher
* Cart rule

A product catalog manager selects a discount type when [creating a voucher](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html) or [creating a cart rule](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html).

{% info_block warningBox "Warning" %}

In current implementation, it is not possible to create cart rules or vouchers based on any merchant parameters, such as merchant or product offer. However, it is still possible to create cart rules and vouchers for the marketplace products. See [Creating a cart rule](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html) for more details.

{% endinfo_block %}

Based on the business logic, discounts can be applied in the following ways:

* The discount is applied to the whole Marketplace order. In such a scenario, the discount is distributed among all the merchant orders and calculated according to the total volume of each of the items.

![Merchant discount 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Order+Management/mp-discount-1.png)

* The discount is related to a single product item in the Marketplace order. In this case, the whole discount is assigned only to the merchant order that contains the discounted item.

![Merchant discount 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Order+Management/mp-discount-2.png)


## Voucher

A *Voucher* is a discount that applies when a customer enters an active voucher code on the *Cart* page.
![Cart voucher](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Promotions+and+Discounts+feature+overview/voucher-storefront.png)

Once the customer clicks **Redeem code**, the page refreshes to show the discount name, discount value and available actions: **Remove** and **Clear all**. The **Clear all** action disables all the applied discounts. The **Remove** action disables a single discount.
![Cart voucher applied](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Promotions+and+Discounts+feature+overview/voucher-cart.png)

Multiple voucher codes can be generated for a single voucher. The code has a **Max number of uses** value which defines how many times the code can be redeemed.

You can enter codes manually or use the code generator in the Back Office.
![Generate codes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/generate_codes.png)

See [Creating a Voucher](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html) to learn how a product catalog manager can create a voucher in the Back Office.

## Cart Rule

A *Cart rule* is a discount that applies to cart once all the [decision rules](#decision-rule) linked to the cart rule are fulfilled.


The cart rule is applied automatically. If the decision rules of a discount are fulfilled, the customer can see the discount upon entering cart. Unlike with [voucher](#voucher), the **Clear all** and **Remove** actions are not displayed.
![Cart rule](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Promotions+and+Discounts+feature+overview/cart-rule-storefront.png)

See [Creating a Cart Rule](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html) to learn how a product catalog manager can create a cart rule in the Back Office.

### Decision rule
A decision rule is a condition assigned to a discount that should be fulfilled for the discount to be applied.

A discount can have one or more decision rules. Find an exemplary combination below:

| Parameter | RELATION OPERATOR | Value |
| --- | --- | --- |
| total-quantity | equal |  3 |
|  day-of-week| equal | 5  |

In this case, the discount is applied if the cart contains 3 items and the purchase is made on the fifth day of the week (Friday).

Multiple decision rules form a query. A query is a request for information based on the defined parameters. In the Discount feature, a query requests information from a cart to check if it is eligible for the discount. By specifying decision rules, you define the parameters of the query.

In the Back Office, a product catalog manager creates decision rules in a Query Builder. The decision rules created in the Query Builder are transformed into a single query.

The decision rules from the previous example look as follows in the Query Builder:

<div class="width-100">

![Query builder](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/query-builder.png)

</div>

A product catalog manager can enter the query manually as well.

The same decision rules look as follows as a plain query:

<div class="width-100">

![Plain query](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/plain-query.png)
</div>

You can switch between Query Builder and Plain query modes to see how the specified decision rules look in either of them.  


Decision rules are combined with *AND* and *OR*  combination operators. With the AND operator, all the rules should be fulfilled for the discount to be applied. With the OR operator, at least one of them should be fulfilled for the discount to be applied.


In the following example, for the discount to be applied, a cart should contain 3 items and the purchase should be made on Wednesday.
![AND operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/and-operator.png)

In the following example, for the discount to be applied, a cart should either contain 3 items or the purchase should be made on Wednesday.
![OR operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/or-operator.png)

{% info_block infoBox "Info" %}

When rules are combined by the OR operator, they do not exclude each other. If a cart fulfills both such rules, the discount is still applied.

{% endinfo_block %}


#### Decision rule group

A rule group is a separate set of rules with its own combination operator.

![Decision rule group](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/decision-rule-group.png)

With the rule groups, you can build multiple levels of rule hierarchy. When a cart is evaluated against the rules, it is evaluated on all the levels of the hierarchy. On each level, there can be both rules and rule groups.

![Decision rule hierarchy](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/decision-rule-hierarchy.png)

When a cart is evaluated on a level that has a rule and a rule group, the rule group is treated as a single rule. The following diagram shows how a cart is evaluated against the rules on the previous screenshot.

### Discount threshold
*Threshold* is a minimum number of items in cart that should fulfill all the specified decision rules for the discount to be applied.
The default value is *1* . It means that a discount is applied if at least one item fulfills the discount's decision rules.

In the following example, the discount is applied if there are four items with the Intel Core processor in cart.
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/threshold.png)


## Discount application

Discount application is a discount configuration option that defines the products to which a discount is applied.

The Marketplace discounts are applied based on the query string.

The *query string* is a discount application type that uses [decision rules](#decision-rule) to dynamically define what products a discount applies to.

The discount in the following example, applies to white products.
![Query collection](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/collection-query.png)
The product selection based on the query string is dynamic:
* If, at some point, the color attribute of a product changes from white to anything else, the product is no longer eligible to be discounted.
* If, at some point, a product receives the white color attribute, it becomes eligible for the discount.


## Discount calculation

Calculation defines the value to be deducted from a product's original price. There are two types of discount calculation:

* Calculator percentage
* Calculator fixed

{% info_block infoBox "Info" %}

With the calculator fixed type, the currency of the respective shop is used for calculation.

{% endinfo_block %}


See examples in the following table.
| Product price | Calculation type | Amount | Discount applied | Price to pay |
| --- | --- | --- | --- | --- |
| €50 |  Calculator percentage | 10 | €5 | €45 |
| €50 | Calculator fixed | 10 | €10 | €40 |

A product catalog manager defines calculation when [creating a voucher](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html) or [creating a cart rule](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html).
![Discount calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/discount_calculation.png)

## Discount exclusiveness

Discount exclusiveness defines if a discount value of a discount can be combined with the discount value of other discounts in a single order.

A product catalog manager defines calculation when [creating a voucher](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html) or [creating a cart rule](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html).
![Exclusive discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/exclusivity.png)

### Exclusive discount

An exclusive discount is a discount that, when applied to a cart, discards all the other discounts applied to it. If a cart is eligible for multiple exclusive discounts, the highest-value discount is applied.

In the following example, a cart with the order total amount of €100 contains the following discounts.

| Discount name  | Discount amount | Discount type | Exclusiveness | Discounted amount |
| --- | --- | --- | --- | --- |
| D1 | 15 | Calculator percentage | Exclusive | €15 |
|D2|5| Calculator fixed | Exclusive | €5 |
|D3|10| Calculator percentage | Non-exclusive | €10 |

The discount exclusivity is resolved as follows:
1. The discounts D1 and D2 are exclusive, so the non-exclusive discount D3 is discarded.
2. The discount D1 providers more free value than the discount D2.
3. As a result, the discount D1 is applied.


### Non-exclusive discount

A non-exclusive discount is a discount that can be combined with other non-exclusive discounts in a single order.

In the following example, a cart with the order total amount of €30 contains the following discounts.

| Discount name  | Discount amount | Discount type | Exclusiveness | Discounted amount |
| --- | --- | --- | --- | --- |
| D1 | 15 | Calculator percentage | Non-exclusive | €15 |
| D2 | 5 | Calculator fixed | Non-exclusive | €5 |
| D3 | 10 |Calculator percentage | Non-exclusive | €10 |

As all the discounts are non-exclusive, they are applied together.

## Discount validity interval

Validity interval is a time period during which a discount is active and can be applied.


If a cart is eligible for a discount outside of its validity interval, the cart rule is not applied. If a customer enters a voucher code outside of its validity interval, they get a "Your voucher code is invalid." message.


A product catalog manager defines calculation when [creating a voucher](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html) or [creating a cart rule](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html).
![Validity interval](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/validity-interval.png)

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Promotions and Discounts feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-promotions-and-discounts-feature-walkthrough.html) for developers.

{% endinfo_block %}
