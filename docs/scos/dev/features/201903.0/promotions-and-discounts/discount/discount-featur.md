---
title: Discount Feature Overview
originalLink: https://documentation.spryker.com/v2/docs/discount-feature-overview-201903
redirect_from:
  - /v2/docs/discount-feature-overview-201903
  - /v2/docs/en/discount-feature-overview-201903
---

The Discount feature enables shop administrators to provide free value to their customers by discounting a percentage or a fixed sum of an order's subtotal or an item's price on predefined conditions. With the multiple configuration options described below, it is possible to find a suitable solution for any business requirements.

The Discount feature enables shop administrators to provide free value to their customers by discounting a percentage or a fixed sum of an order's subtotal or an item's price on predefined conditions. With the multiple configuration options described below, it is possible to find a suitable solution for any business requirements.

## Discount types

There are two discount types:

* Voucher
* Cart rule

Discount type is specified in the Back Office > *Discount* section > *Edit discount* page > **General information** tab.
![Discount type](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/discount-type.png){height="" width=""}

A **Voucher** is a discount which applies when a customer enters an active **voucher code** on the *Cart* page.
![Cart voucher](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/cart_voucher.png){height="" width=""}

Once the customer clicks **Redeem code**, the page refreshes to show the discount name, discount value and available actions - **Remove** and **Clear all**.
![Cart voucher applied](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/cart_voucher_applied.png){height="" width=""}

The **Clear all** action disables all the applied discounts while the **Remove** action disables a single discount.

Voucher codes are generated in the Back Office > *Discount* section > *Edit discount* page > [Voucher codes](https://documentation.spryker.com/v2/docs/discount#voucher-codes-tab) tab. See [Creating a Discount Voucher](https://documentation.spryker.com/v2/docs/discount#creating-a-discount-voucher) for more information.

{% info_block warningBox %}
This tab is available when the **Voucher** discount type is selected in the [General information](https://documentation.spryker.com/v2/docs/discount#creating-a-discount-voucher
{% endinfo_block %} tab.)


Multiple voucher codes can be generated for a single voucher. Each code has a **Max number of uses** value which defines how many times the code can be used by different customers.

There is no need to create codes manually as there is an in-built code generator which does the job.
![Generate codes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/generate_codes.png){height="" width=""}

A **Cart rule** is a discount which applies to cart automatically once all discount decision rules linked to discount are fulfilled. It does not require any additional actions from customers. When there is a discount which can be applied to a customer's order, upon entering cart, they will see the name of the discount in the overview section. The **Clear all** and **Remove** actions won't be available though.
![Cart rule](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/cart-cart-rule.png){height="" width=""}

See [Creating a cart rule](https://documentation.spryker.com/v2/docs/discount#creating-a-cart-rule-discount) for information on how to create a cart rule discount in the Back Office.

## Decision Rules
A discount **decision rule** is a condition which needs to be fulfilled for the discount to which it is assigned to be applied. A discount can have one or more decision rules assigned to it.

A discount can have the following decision rules.

| Parameter | Value |
| --- | --- |
| Item-quantity | 3 |
|  Day-of-week|  Wednesday|

The discount can be redeemed only if both rules are satisfied: The cart contains at least 3 items and the purchase is made on Wednesday.

Decision rules are specified using queries which can be built by using an in-built **Query Builder** or by entering **Plain queries** in the **Back Office > Discount section > Edit discount page** > [Conditions](https://documentation.spryker.com/v2/docs/discount#conditions-tab) tab.

Following the example above, you can specify that:
{% info_block infoBox %}
cart is to contain at least 3 items via plain query:
{% endinfo_block %}
![Plain query](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/plain-query.png){height="" width=""}

{% info_block infoBox %}
the purchase is to be made on Wednesday via Query builder:
{% endinfo_block %}
![Query builder](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/query-builder.png){height="" width=""}

You can combine decision rules using **AND** and **OR** operators. When several decision rules are combined with the AND operator, all the rules have to be fulfilled for the discount to be applied. When several decision rules are combined using the OR operator, only one of them has to be fulfilled for the discount to be applied.

{% info_block infoBox %}
The previously used decision rules are combined with the **AND** operator which means that for the discount to be applied, cart has to contain at least 3 items and the purchase has to be made on Wednesday.
{% endinfo_block %}
![AND operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/and-operator.png){height="" width=""}

{% info_block infoBox %}
The same decision rules are combined with the **OR** operator which means that the discount is applied if either cart contains 3 items or the purchase is made on Wednesday.
{% endinfo_block %}
![OR operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/or-operator.png){height="" width=""}

## Threshold
Threshold is a functionality that compliments decision rules by allowing you to assign a **minimum order amount** value to all the decision rules of a discount. It specifies how many items in cart should fulfill the assigned decision rules for the discount to be applied. By default, the value is equal to 1 which means that only one fulfilled decision rule is sufficient for the discount to be applied. Threshold is specified in the Back Office > *Discount* section > *Edit discount* page > **Conditions** tab.

{% info_block infoBox %}
The discount is applied if there are 4 items with the Intel Core processor in cart.
{% endinfo_block %}
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/threshold.png){height="" width=""}

## Discount collection

The Discount feature allows you to specify what product(s) the discount is to be applied to if the assigned decision rules are fulfilled. There are two types of discount collection types:

* Query String
* Discount promotion to product

### Query String
Similarly to the decision rules, the products to which the discount is applied can be specified by building queries.

{% info_block infoBox %}
The discount is applied to the products with lithium batteries.
{% endinfo_block %}
![Query collection](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/collection-query.png){height="" width=""}

### Discount promotion to product

The **Discount promotion to product** discount collection type enables you to provide a discount for a particular product, regardless of whether the product is already added to cart or not. The product for which the discount is provided is specified by entering its abstract product sku. Also, you can specify how many products with the discount is to be available for adding to cart by entering a quantity.

The discount is provided for the product with the **Product abstract sku** 214 while the available **Quantity** of the product for adding to cart is 3.
![Collection - promotional product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/collection-promotional-product.png){height="" width=""}

When redeemed by a customer on the front end, instead of displaying the discount name in the overview section, the **Promotional products**section is displayed allowing to add the available quantity of the product to cart.
![Promotional product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/promotional-product-frontend.png){height="" width=""}

## Calculation
There are two types of discount calculation:

* Fixed amount discount
* Percentage discount

{% info_block infoBox %}
When the fixed amount discount calculation is applied, the currency of the respective shop is used for calculation.
{% endinfo_block %}

See examples in the table below.
| Product price | Calculation type | Amount | Discount applied | Price to pay |
| --- | --- | --- | --- | --- |
| €50 | Percentage | 10|€5|€45|
|€50|Fixed amount|10|€10|€40 |

Calculation is specified in the Back Office > *Discount* section > *Edit discount* page > [Discount calculation](https://documentation.spryker.com/v2/docs/discount#discount-calculation-tab) tab.
![Discount calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/discount_calculation.png){height="" width=""}

## Exclusiveness
Discounts can be:

* Exclusive
* Non-exclusive

Discount exclusiveness is specified in the Back Office > *Discount* section > *Edit discount* page > **General information** tab.
![Exclusive discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/exclusivity.png){height="" width=""}

### Exclusive Discount
An **exclusive discount** can only be applied on its own where the highest-value discount is applied if several discounts are provided.

A cart with the order total amount of €100 contains the following discounts.
|   | Calculation amount | Discount type | Exclusiveness | Discounted amount |
| --- | --- | --- | --- | --- |
| D1 | 15 | Percentage|Exclusive|€15|
|D2|5|Fixed amount|Exclusive|€5|
|D3|10|Percentage|Non-exclusive|€10 |

* The discounts D1 and D2 are exclusive, so the discount D3 is discarded.
* The discount D1 providers more free value than the discount D2
* Result: The discount D1 is applied


### Non-exclusive Discount
**Non-exclusive discounts** can be used together with other non-exclusive discounts.

A cart with the order total amount of €30 contains the following discounts.
|   | Calculation amount | Discount type | Exclusiveness | Discounted amount |
| --- | --- | --- | --- | --- |
| D1 | 15 | Percentage|Exclusive|€15|
|D2|5|Fixed amount|Exclusive|€5|
|D3|10|Percentage|Non-exclusive|€10 |

As all the discounts are non-exclusive, they are applied together.

## Validity Interval

You can assign each discount `Valid From` and `Valid To` dates which inclusively identify when the discount is active and can be applied. If a customer fulfills decision rules of a cart rule on a date that is not between or included into the `Valid From` and `Valid To`, the cart rule discount won't be applied, and the customer won't see any changes in cart. If a customer enters a voucher code on a date that is not between or included into the `Valid From` and `Valid To`, the customer will see a 'Your voucher code is invalid.' message.

Validity interval is specified in the Back Office > *Discount* section > *Edit discount* page > **General information** tab.

{% info_block infoBox %}
The discount is valid between 1/1/2016 and 12/31/2020 dates, inclusive.
{% endinfo_block %}
![Validity interval](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Promotions+&+Discounts/Discount/Discount+Feature+Overview/validity-interval.png){height="" width=""}

<!-- Last review date: Apr 5, 2019-- by Helen Kravchenko, Andrii Tserkovnyi -->
