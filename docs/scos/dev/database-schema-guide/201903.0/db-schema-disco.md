---
title: Discounts Schema
originalLink: https://documentation.spryker.com/v2/docs/db-schema-discounts
redirect_from:
  - /v2/docs/db-schema-discounts
  - /v2/docs/en/db-schema-discounts
---


## Discounts

### Overview

{% info_block infoBox %}
Discounts are applied during the checkout either manually by the customer via Voucher code or automatically as Cart Rule. In both cases, the discount can have a fixed or a percentage value which is applied for all items or a subset that can be defined with a query string (e.g. only products with a specific attribute
{% endinfo_block %}. Discounts can be toggled per store.)

The main process works like this:
| | | |
|---|---|---| 
| 1 |  **Find applicable discounts** | Find all active Discounts that can be used for the Quote by checking the entered **Code** and evaluation of the **Query String** (boolean condition). |
| 2 |  **Collection & Calculation** | **Collection** of discountable items from the Quote and then **Calculation** of the discounted amount for each applicable Discount.|
| 3 |  **Filter** | When more than one Discounts are applicable then there are two scenarios:<ol><li>If one of the Discounts is marked as **Exclusive** then only this one is used (If more then one are exclusive then the one with the highest Discount amount is used)</li><li>If none of the Discounts is exclusive, then all Discounts are used</li></ol> |
| 4 |  **Distribution** | The filtered Discounts are distributed on those items that have been collected. See [Sales Schema](db-schema-sales.htm)to understand the resulting data structure.|
{% info_block warningBox "Collection & Calculation example" %}
There is a Discount which says "10% on T-Shirts". So first we need to **collect** these items which can be discounted - T-Shirts in this case - and then the amount needs to be **calculated** (10% on the price of the T-Shirts; not the whole Quote
{% endinfo_block %}. )
{% info_block warningBox "Distribution example" %}
When more than one discount was calculated it's important to know that each discount was calculated based on the price of the collected items. So it does not matter in which order the Discounts are applied. 
{% endinfo_block %}

### Cart Rule

{% info_block infoBox %}
A cart rule is a discount that is automatically added to the quote if certain conditions are satisfied. These conditions can be entered as a query string. For instance, you can say that the cart rule is applied if the subtotal is higher than an amount and the day-of-the-week is Tuesday. Alternatively, you can also define an SKU and a quantity to promote specific products directly.
{% endinfo_block %}
![Cart rule](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Discounts+Schema/cart-rule.png){height="" width=""}

**Structure**:

* The table *spy_discount* contains the name, validity and other information:

  - *is_exclusive* - Flag that marks a Discount as exclusive.
  - *discount_type* - Cart Rule or Voucher.
  - *calculator_plugin* - A plugin that represents the calculation. We ship with a fix and a percentage calculator plugin.
  - *decision_rule_query_string* - A boolean expression that decides if a discount can be applied (e.g. sku="*" AND sub_total > 100).
  - *collector_query_string* - A boolean expression that defined which products can be discounted (e.g. attribute.color = "white").
  - *amount* - Percentage value (e.g. 10% Discount).
  - *fk_store* -  Not used.

* There is a many-to-many relation between Discounts and Stores.
* The money value of a Discount is saved as *gross_amount* and *net_amount* per currency.

### Voucher Codes

{% info_block infoBox %}
A Voucher Code is basically the same as a Cart Rule but with a code which needs to be entered by the user.
{% endinfo_block %}
![Voucher codes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Discounts+Schema/voucher-codes.png){height="" width=""}

**Structure**:

* Discounts are Vouchers if they have the *discount_type=voucher* and they are related to a Voucher Pool.
* A Voucher Pool has a name and a set of Vouchers.
* A Voucher is identified by its code.

  - *max_number_of_uses* - Defines how often the Voucher can be used. If set to null then the Voucher Code can be used unlimited.
  - *number_of_uses* - Counts how often the Voucher was used already.


{% info_block infoBox %}
There are two typical scenarios:
{% endinfo_block %}
1. A Voucher Pool with one Voucher Code that can be used unlimited times. This one is usually used for broadcast marketing (e.g. used in TV spots).
2. A Voucher Pool with a high number of Voucher Codes which be used once. This one is usually used for direct marketing (e.g. emails to customers).

### Discount Promotion

Discount Promotion extends the Discount feature with product promotion functionality. Discount promotions add the ability to give away discounted or even free products to create promotions like "buy one, get one for free", "buy product X, get product Y for free", "buy 10 of product X and get 1 of product X for a discounted price", etc.
![Discount promotion](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Discounts+Schema/discount-promotion.png){height="" width=""}

**Structure**:

* The Discount is related to the SKU of one Abstract Product and a required Quantity.
