---
title: Promotions & Discounts feature overview
description: The feature lets you create different types of discounts and apply multiple in-built discount settings suitable for any business requirements.
last_updated: Oct 13, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/promotions-discounts-feature-overview
originalArticleId: bdb56333-569c-42ac-9a12-2f8ecc84c6b5
redirect_from:
  - /docs/scos/user/features/201903.0/promotions-discounts-feature-overview.html
  - /docs/scos/user/features/202108.0/promotions-discounts-feature-overview.html
  - /docs/scos/user/features/202200.0/promotions-discounts-feature-overview.html
  - /docs/scos/user/features/202307.0/promotions-discounts-feature-overview.html  
---

The *Discount Management* feature lets shop owners provide free value to their customers by discounting the percentage or fixed sum of an order's subtotal, or an item's price on predefined conditions.

## Discount types

There are two discount types:
* Voucher
* Cart rule

A Back Office user selects a discount type when [creating a discount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html).

## Voucher

A *voucher* is a discount that applies when a customer enters an active voucher code on the **Cart** page.

![Cart voucher](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/cart_voucher.png)

Once the customer clicks **Redeem code**, the page refreshes to show the discount name, discount value, and available actions: **Remove** and **Clear all**. The **Clear all** action disables all the applied discounts. The **Remove** action disables a single discount.
![Cart voucher applied](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/cart_voucher_applied.png)

You can generate multiple voucher codes for a single voucher. The code has a **Max number of uses** value which defines how many times the code can be redeemed.

You can enter codes manually or use the code generator in the Back Office.

![Generate codes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/generate_codes.png)

To learn how a Back Office user can create a voucher in the Back Office, see [Create discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)

## Cart rule

A *cart rule* is a discount that applies to a cart once all the [decision rules](#decision-rule) linked to the cart rule are fulfilled.

A cart rule is applied automatically once its conditions are met. If the decision rules of a discount are fulfilled, the customer can see the discount upon entering the cart. Unlike with [vouchers](#voucher), the **Clear all** and **Remove** actions are not displayed for cart rules.

![Cart rule](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/cart-cart-rule.png)

To learn how a Back Office user can create a cart rule in the Back Office, see [Create discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)

### Decision rule

A *decision rule* is a condition assigned to a discount that must be fulfilled for the discount to apply.

A discount can have one or more decision rules. Find an example combination below:

| PARAMETER | RELATION OPERATOR | VALUE |
| --- | --- | --- |
| total-quantity | equal |  3 |
| day-of-week | equal | 5  |

In this case, the discount is applied if the cart contains three items and the purchase is made on the fifth day of the week (Friday).

Multiple decision rules form a query. A query is a request for information based on the defined parameters. In the Discount Management capability, a query requests information from a cart to check if it is eligible for the discount. By specifying decision rules, you define the parameters of the query.

In the Back Office, you create decision rules in a Query Builder. Query Builder transforms the decision rules into a single query.

The decision rules from the previous example look as follows in the Query Builder:

![Query builder](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/query-builder.png)

A Back Office user can enter a query manually as well.

The same decision rules look as follows as a plain query:

`total-quantity = '3' AND day-of-week = '5'`

You can switch between Query Builder and Plain query modes to see how the specified decision rules look in either of them.  

Decision rules are combined with *AND* and *OR*  combination operators. With the AND operator, all the rules must be fulfilled for the discount to be applied. With the OR operator, at least one must be fulfilled for the discount to be applied.

In the following example, for the discount to apply the cart must contain three items, and the purchase must be made on Wednesday.

![AND operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/and-operator.png)

In the following example, for the discount to apply, either the cart must contain three items, or the purchase must be made on Wednesday.

![OR operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/or-operator.png)

{% info_block infoBox "Info" %}

When rules are combined by the OR operator, they do not exclude each other. If a cart fulfills both such rules, the discount is still applied.

{% endinfo_block %}

#### Decision rule group

A *rule group* is a separate set of rules with its own combination operator.

![Decision rule group](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/decision-rule-group.png)

With the rule groups, you can build multiple levels of rule hierarchy. When a cart is evaluated against the rules, it is evaluated on all levels of the hierarchy. At each level, there can be both rules and rule groups.

![Decision rule hierarchy](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+%26+Discounts/Discount/Discount+Feature+Overview/decision-rule-hierarchy.png)

When a cart is evaluated on a level that has both a rule and a rule group, the rule group is treated as a single rule. The following diagram shows how a cart is evaluated against the rules from the previous screenshot.

### Discount threshold

A *threshold* is the minimum number of items in a cart that must fulfill all the specified decision rules for the discount to apply.
The default value is *1*. This means that a discount is applied if at least one item fulfills the discount's decision rules.

In the following example, the discount is applied if there are four items with an Intel Core processor in the cart.

![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/threshold.png)

## Discount application

*Discount application* is a discount configuration option that defines the products to which a discount is applied.

There are two types of the discount application:
* Query string
* Promotional product

### Query string

A *query string* is a discount application type that uses [decision rules](#decision-rule) to dynamically determine which products qualify for discounts.

The discount in the example below applies to white color products.

![Query collection](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/collection-query.png)

The product selection based on the query string is dynamic:
* If at some point the color attribute of a product changes from white to anything else, the product is no longer eligible for a discount.
* If at some point a product receives the white color attribute, it becomes eligible for a discount.

### Promotional product

*Promotional product* is a discount application type that discounts particular products at a set quantity, enabling "buy X, get Y" promotions.

When a customer meets conditions for a promotional product discount, the **Promotional products** section is displayed in the cart and lets customers add the available quantity of the discounted products. The section consists of the product name, SKU, original and discounted price, and a description of the discount.

![Promotional product](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/promotions-discounts-feature-overview.md/202200.0/promotional-product-storefront.png)
<!--
old image: (https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/promotional-product-frontend.png)
-->

A Back Office user selects promotional products by entering comma-separated abstract product SKUs in the Back Office. They also define the maximum quantity of the products to be sold with a discount. For example, there are 10 SKUs in **ABSTRACT PRODUCT SKU(S)**, and **MAXIMUM QUANTITY** is set to `1`. If a customer fulfills the discount conditions, they are eligible for one unit of any of the 10 promotional products, not one of each. Likewise, if **MAXIMUM QUANTITY** is set to `3`, they can select 3 units of any of the promotional products in any combination. The promotional products are automatically merchandised below the items in a customer's cart. The customer can add one of these products to the cart from this widget, and the discount will apply.

{% info_block infoBox "Note" %}

The promotional product discount only applies if the product is added to the cart from the **Promotional Products cart** widget. If the product is already in the cart before the discount conditions are met, the customer needs to first remove it, then re-add it to the widget.

{% endinfo_block %}

A Back Office user can either give away promotional products for free or provide a discount for these products by specifying the percentage value, or a fixed amount, to be discounted from their price. When giving a product for free, the percentage value must be 100%. Using a fixed amount discount for a free product is also possible, where the amount is equal to a product's price, but it is not recommended due to the possibility of price fluctuations and differences across multiple products.

![Collection - promotional product](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/promotions-discounts-feature-overview.md/202200.0/collection-promotional-product.png)

## Discount calculation types

Calculation defines the value to be deducted from a product's default price. There are two types of discount calculations:
* Percentage
* Fixed amount

{% info_block infoBox %}

With the fixed amount type, the currency of the respective shop is used for calculation.

{% endinfo_block %}

See examples in the table below.

| PRODUCT PRICE | CALCULATION TYPE | AMOUNT | DISCOUNT APPLIED | PRICE TO PAY |
| --- | --- | --- | --- | --- |
| €50 | Percentage | 10 | €5 | €45 |
| €50 | Fixed amount | 10 | €10 | €40 |

A Back Office user defines calculation when [creating discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)

![Discount calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/discount_calculation.png)

## Discount exclusiveness

*Discount exclusiveness* defines if the discount value of a discount can be combined with the discount value of other discounts in a single order.

A Back Office user defines a calculation when [creating discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)

![Exclusive discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/promotions-discounts-feature-overview.md/exclusivity.png)


### Exclusive discount

An *exclusive discount* is a discount that when applied to a cart, discards all the other discounts applied to it.

{% info_block infoBox "Promotional products and query string" %}

[Promotional product](#promotional-product) discounts and [query string](#query-string) discounts are separate when it comes to exclusivity. These types of discounts exclude all other discounts only among each other. Promotional product discounts are not affected by exclusive query string discounts and vice versa.

{% endinfo_block %}

If a cart is eligible for multiple exclusive discounts, you can [prioritize](#discount-priority) the discounts to define which of the exclusive discounts prevail over the others. For details on how a Back Office user can set priorities for discounts, see [Create discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)

If the exclusive discounts are not prioritized or have the same priorities, the highest-value discount is applied. For details and examples on how the discounts are calculated, see [Discount calculation logic](#discount-calculation-logic).

### Non-exclusive discount

A *non-exclusive discount* is a discount that can be combined with other non-exclusive discounts in a single order. If all the discounts are non-exclusive, they are applied together. However, a Back Office user can [prioritize](#discount-priority) the non-exclusive discounts to set the order in which they apply. For details on how a Back Office user can prioritize a discount, see [Create discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html) For details and examples of how discounts are calculated based on their priorities, see [Discount calculation logic](#discount-calculation-logic).

## Discount validity interval

A *validity interval* is a period of time during which a discount is active and can be applied.

If a cart is eligible for a discount outside of its validity interval, the cart rule is not applied. If a customer enters a voucher code outside of its validity interval, they get a "Your voucher code is invalid." message.

A Back Office user defines calculation when [creating a discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)

![Validity interval](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/promotions-discounts-feature-overview.md/validity-interval.png)


## Discount priority

In cases when several discounts can apply to a customer's order, a Back Office user can set the discount priorities. A *discount priority* is an integer value that defines the order in which the discounts are applied. For details on how discounts are calculated based on their priorities, see [Discount calculation logic](#discount-calculation-logic).

Discount prioritization behavior does not depend on the [discount type](#discount-types). For example, you might have the following priorities for different types:

* Cart rule discount with priority 1
* Voucher code discount with priority 2
* Voucher code discount with priority 3
* Cart rule discount with priority 4

In this case, discounts are applied based on their priority, regardless of type.

{% info_block infoBox "Info" %}

If you have a voucher code and a cart rule with the same priority, both discounts apply and use the same cart subtotal. For an example, see [Scenario 5: Non-exclusive, fixed amount and percentage discounts with the same priority values](#scenario-4-non-exclusive-fixed-amount-and-percentage-discounts-with-the-same-priority-values).

{% endinfo_block %}

## Discount calculation logic

The discount calculation logic follows these rules:

* All discounts are calculated sequentially based on their [priority value](#discount-priority). Thus, discounts with the highest priority value are considered first.
* Discounts without priority values are treated with the last possible priority.
* Discounts with the same priority value are calculated independently of each other.
* If there is a set of discounts with [exclusive](#exclusive-discount) and [non-exclusive](#non-exclusive-discount) discounts, the non-exclusive discounts are ignored. The remaining exclusive discounts are handled according to their priority values as shown in the schema:

![discounts-calculation-logic](https://confluence-connect.gliffy.net/embed/image/ad6c6c4c-9ccb-42ae-a9dc-5944300bdf91.png?utm_medium=live&utm_source=custom)

<!---source: https://spryker.atlassian.net/wiki/spaces/DOCS/pages/3019079947/CC-14560+-+Enable+prioritization+for+discounts -->

### Example discount calculation scenarios

The following scenarios illustrate how the discount calculation logic works.

#### Scenario 1: Multiple non-exclusive discounts, the mix of fixed amount and percentage discount calculation types.

Cart subtotal: €500

| DISCOUNT NAME|  DESCRIPTION|  DISCOUNT TYPE| DISCOUNT AMOUNT| DISCOUNT PRIORITY| EXCLUSIVENESS|
| --- | --- | --- | --- | --- |--- |
| HOCKEY10| 10% off your order| Percentage| 10%|  300|  No|
| HELMET20| Save €20 on helmets| Fixed amount| €20|  200|  No|
| STICK50| €50 off all carbon sticks| Fixed amount| €50|  500|  No|

**Discounts applied in priority order:**

1. HELMET20 (200 priority): €500 - €20 = €480
2. HOCKEY10 (300 priority): €480 - €480*0.10 = €432
3. STICK50 (500 priority): €432 - €50 = €382

**Calculation as displayed in cart:**

Subtotal: €500.00
HELMET20: -€20.00
HOCKEY10: -€48.00
STICK50: -€50.00

Grand total: €382.00

{% info_block infoBox "Info" %}

As customers are not aware of the logic behind discount prioritization, they may be confused about the assigned priorities. For the scenario above, they might wonder why they get 10% off the pre-discount price of the hockey stick and not the helmet. In cases like this one, instead of creating prioritization logic for separate discount types, consider adjusting the discount priority accordingly to avoid customer confusion.

{% endinfo_block %}

#### Scenario 2: Multiple non-exclusive discounts, percentage discount calculation types.

Cart subtotal: $100

| DISCOUNT NAME| DESCRIPTION| DISCOUNT TYPE| DISCOUNT AMOUNT| DISCOUNT PRIORITY| EXCLUSIVENESS| NOTES|
| --- | --- | --- | --- | --- |--- |--- |
| BUY4GET1| Buy 4 baguettes, get one free| Percentage| 100%| 100|  No| One baguette costs $3|
| SPICE10| 10% off spices| Percentage| 10%| 100| No| Spices cost $30|
| MEMBER5| 5% off for members| Percentage| 5%| 5000| No| |
| STORE5| 5% off storewide if you spend $50 or more| Percentage| 5%| 5000|No| |

**Discounts applied in priority order:**

1. BUY4GET1 (100 priority): $100 - $3*1.00 or $3 = $97
2. SPICE10 (100 priority): $97 - $30*0.10 or $3.00 = $94
3. MEMBER5 (5000 priority): $94 - $94*0.05 or $4.70 = $89.30
4. STORE5 (5000 priority): $89.30 - $94*0.05 or $4.70 = $84.60

**Calculation as displayed in cart:**

Subtotal: $100.00

BUY5GET10: -$3.00
SPICE10: -$3.00
MEMBER5: -$4.70
STORE5: -$4.70

Grand total: $84.60

#### Scenario 3: Multiple discounts, both exclusive and non-exclusive.

Cart subtotal: $100

| DISCOUNT NAME|  DESCRIPTION|  DISCOUNT TYPE| DISCOUNT AMOUNT| DISCOUNT PRIORITY| EXCLUSIVENESS| NOTES|
| --- | --- | --- | --- | --- |--- |--- |
| BUY4GET1| Buy 4 baguettes, get one free|  Percentage| 100%| 100|  No| One baguette costs $3|
| SPICE10| 10% off spices| Percentage| 10%|  100|  No| $30 of spices|
| MEMBER5| 5% off for members| Percentage| 5%| 5000| Yes| |
| STORE5| 5% off storewide if you spend $50 or more|  Percentage| 5%| 9000| Yes| |

**Discounts applied in priority order:**

MEMBER5 (5000): $100 - $100*0.05 = $95

In the presence of exclusive discounts, all non-exclusive discounts are excluded.
Between the exclusive discounts, the discount with the higher priority is chosen.

#### Scenario 4: Non-exclusive, fixed amount and percentage discounts with the same priority values

Cart subtotal: €100

| DISCOUNT NAME|  DESCRIPTION|  DISCOUNT TYPE| DISCOUNT AMOUNT| DISCOUNT PRIORITY| EXCLUSIVENESS|
| --- | --- | --- | --- | --- |--- |
| 10SOCKS|  10% off Nike socks| Percentage| 10%|  100|  No| Nike socks cost €40|
| 20PANTS|  Save €20 on all white pants|  Fixed amount| €20|100|  No| White pants cost €60|

**Discounts applied in priority order:**

1. 10SOCKS (100 priority): €100 - €40*0.1 = €96
2. 20PANTS (100 priority): €96 - €20 = €76


**Calculation as displayed in cart:**

Subtotal: €100.00

10SOCKS: -€4
20PANTS: -€20.00

Grand total: €76.00

#### Scenario 5: Exclusive and non-exclusive discounts without the priorities

Cart subtotal: €100

| DISCOUNT NAME  | DESCRIPTION| DISCOUNT TYPE | DISCOUNT AMOUNT | DISCOUNT PRIORITY|  EXCLUSIVENESS | NOTES |
| --- | --- | --- | --- | --- |--- |--- |
|10SOCKS | 10% off Nike socks | Percentage | 10% | |Exclusive | Nike socks cost €40 |
|5PANTS|Save €5 on all pants| Fixed amount | €5 | | Exclusive |  |
|SITE10|10% off everything in the store| Percentage | €10 | |  Non-exclusive | €10 | |

In the presence of exclusive discounts, all non-exclusive discounts are excluded.
Since the remaining exclusive discounts do not have priorities and the discount 5PANTS provides more free value than the discount 10SOCKS, this discount is applied.

**Calculation as displayed in cart:**

Subtotal: €100.00

15PANTS: -€5

Grand total: €95.00

<!-- THIS SCENARIO IS NOT SUPPORTED YET. IT WILL BE SUPPORTED ONCE CC-15011 IS FIXED #### Scenario 6: Multiple non-exclusive, percentage discount calculation types. Executing discounts in priority order results in cart subtotal no longer satisfying conditions for one or more subsequent discounts.

Cart subtotal: €100

| DISCOUNT NAME|  DESCRIPTION|  DISCOUNT TYPE| DISCOUNT AMOUNT| DISCOUNT PRIORITY| EXCLUSIVENESS| NOTES|
| --- | --- | --- | --- | --- |--- |--- |
| 50SOCKS|  50% off Nike socks| Percentage| 50%|  100|  No| Nike socks cost €40|
| 15PANTS|  15% off all white pants|  Percentage| 15%|100|  No| White pants cost €60|
| SAVE20| 20% off purchases over €100|  Percentage| 20%|  300|  No| |
| SITE5|  5% off everything in the store| Percentage| 5%| 9999| No| |

**Discounts applied in priority order:**

1. 50SOCKS (100 priority): €100 - €40*0.5 = €80
2. 15PANTS (100 priority): €80 - €60*0.15 = €71
3. SAVE20 (300 priority): No longer applies, because discounts with higher priorities have reduced the subtotal below the discount condition threshold of €100.
4. SITE5: (9999 priority): €71 - €3.55 = €67.45
-->

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create a discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html)  |
| [Edit discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-discounts.html)  |

## Related Developer articles

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS |
|---|---|---|---|---|
| [Integrate the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) | [Upgrade the Discount module](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discount-module.html) | [Add items with discounts to carts of registered users](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-add-items-with-discounts-to-carts-of-registered-users.html) | [File details: discount.csv](/docs/pbc/all/discount-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-discount.csv.html) | [HowTo: Create discounts based on shipment](/docs/pbc/all/discount-management/{{site.version}}/base-shop/create-discounts-based-on-shipment.html) |
| [Integrate the Category Management + Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-category-management-feature.html) | [Upgrade the DiscountCalculatorConnector module](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountcalculatorconnector-module.html) |  [Retrieve discounts in carts of registered users](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-carts-of-registered-users.html)   | ["Import file details: discount_amount.csv"](/docs/pbc/all/discount-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-discount-amount.csv.html) | |
| [Integrate the Product labels + Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-product-labels-feature.html) | [Upgrade the DiscountPromotion module](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountpromotion-module.html) |  [Manage discount vouchers in carts of registered users](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-manage-discount-vouchers-in-carts-of-registered-users.html) | ["Import file details: discount_store.csv"](/docs/pbc/all/discount-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-discount-store.csv.html) | |
| [Integrate the Promotions & Discounts Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html) | [Upgrade the DiscountPromotionWidget module](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountpromotionwidget-module.html) | [Add items with discounts to guest carts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-add-items-with-discounts-to-guest-carts.html) | ["Import file details: discount_voucher.csv"](/docs/pbc/all/discount-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-discount-voucher.csv.html) |  |
|  | [Upgrade the DiscountSalesAggregatorConnector module](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountsalesaggregatorconnector-module.html) | [Retrieve discounts in guest carts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-guest-carts.html) | | |
|  |  |  [Manage discount vouchers in guest carts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-manage-discount-vouchers-in-guest-carts.html)   |  | |
|  |  | [Retrieve discounts in customer carts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-customer-carts.html) |  | |
