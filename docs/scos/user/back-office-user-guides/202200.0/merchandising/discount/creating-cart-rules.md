---
title: Creating cart rules
description: Use the procedure to create a cart-based discount rule along with its conditions in the Back Office.
last_updated: Jul 14, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-cart-rule
originalArticleId: 3cf6e07b-9b13-42df-8129-d1d423ddb348
redirect_from:
  - /2021080/docs/creating-a-cart-rule
  - /2021080/docs/en/creating-a-cart-rule
  - /docs/creating-a-cart-rule
  - /docs/en/creating-a-cart-rule
related:
  - title: Managing Discounts
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/managing-discounts.html
---

This guide describes how to create a *cart rule*.

A cart rule is a discount that is applied automatically when all attached discount conditions are fulfilled and if the cart rule is active. Unlike a voucher code, it does not require any input from the customer.

## Prerequisites

To start working with discounts, go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.

Review the [reference information](#reference-information-creating-cart-rule-discounts) before you start, or just look up the necessary information as you go through the process.

## Creating cart rule discounts

To create a cart rule discount:
1. On the **Discount** page, in the top right corner, click **Create new discount**.
2. On the **Create new discount** page, in the **General Information** tab, do the following:
   1. In **STORE RELATION**, select the stores you want the discount to be active in.
   2. For **DISCOUNT TYPE**, select **Cart rule**.
   3. In the **NAME** field, specify the name for the discount.
   4. Optional: In the **DESCRIPTION** field, enter a summary that explains the discount.
   5. Optional: In the **PRIORITY** field, enter an integer value from `1` to `9999` for the discount priority.
   6. Specify if the discount is **NON-EXCLUSIVE** or **EXCLUSIVE**.
   7. Select **VALID FROM** and **VALID TO** dates.
   8. To proceed to the **Discount calculation** tab, click **Next**.
3. On the **Discount calculation** tab, do the following:
   1. Select a **CALCULATOR TYPE**.
   2. Based on the calculator type you've selected, do the following:
    * **Fixed amount**: Enter the amounts per currency and price mode, if applicable, to be discounted.
    * **Percentage**: Enter the percent value to be discounted.
   3. Select a **DISCOUNT APPLICATION TYPE**.
   4. Define which products are eligible for the discount.
   5. To proceed to the **Conditions** tab, click **Next**.
4. On the **Conditions** tab, do the following:
    1. Select the **APPLY WHEN** conditions or click **Plain query** and enter the query manually.
    2. For **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).**, enter a numeric value.
5. To create the new discount, click **Save**.

### Reference information: Creating cart rule discounts

This section contains reference information you select and enter when creating cart rule discounts.

#### General information tab

The following table describes the attributes you enter and select on the **General information** tab:

<div class="width-100">

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| STORE RELATION | Stores that your cart rule will be active in. You can select multiple stores.|
| DISCOUNT TYPE | Drop-down list where you select one of the following discount types:<ul><li>**[Voucher codes](/docs/scos/user/features/{{page.version}}/promotions-discounts-feature-overview.html#voucher)**: A discount that applies when a customer enters an active voucher code on the *Cart* page.**</li><li>[Cart rule](docs/scos/user/features/{{page.version}}/promotions-discounts-feature-overview.html#cart-rule)**: A discount that applies to a cart once all conditions assigned to a discount are fulfilled.</li></ul>. |
| NAME | Unique name that will be displayed in the cart, in the **Available discounts** section on the Storefront, if the cart rule is valid. Should be short, but descriptive. |
| DESCRIPTION | Describes the discount and helps a customer understand why they are eligible for the discount and what they can receive. The description will be displayed in the **Cart calculation** section along with the applied discount amount if the discount is applicable to a product in the cart.|
| PRIORITY | Defines the order in which the discounts are applied.[The discount priority](/docs/scos/user/features/{{page.version}}/promotions-discounts-feature-overview.html#discount-priority) is represented as an integer value from `1` to `9999`, `1` being the highest priority and `9999` the lowest. |
| NON-EXCLUSIVE | Defines the discount exclusivity. Customers can redeem non-exclusive discounts in conjunction with other non-exclusive discounts.|
| EXCLUSIVE | Defines the discount exclusivity. When a discount is exclusive, no other discounts may be applied in conjunction. When a cart is eligible for multiple exclusive discounts, the discount with the highest value to the customer is applied. The exception to this is promotional product discounts. Query string discounts and promotional product discounts exclude only among each other. Promotional product discounts are not affected by exclusive query string discounts and conversely.|
| VALID FROM and VALID TO | Cart rule will be active between **VALID FROM** and **VALID TO** dates and times (in UTC), inclusive. For example, a discount applies to the cart starting from 01.12.2021 23:00 until 31.01.2022 22:59, UTC. |

</div>

{% info_block infoBox "Info" %}

Name and describe discounts in a way that is meaningful for other Back Office users. A discount name is displayed in a customer's cart and must be unique.

{% endinfo_block %}

#### Discount calculation tab

This section contains information you need to know when working with discount calculations on the **Discount calculation** tab.

**CALCULATOR TYPE**
A discount can be calculated in two ways:
* **Percentage**: A discount is calculated as a percentage of the discounted items' prices. If selected, in the **VALUE** field, set the percentage value—for example, `25`.
* **Fixed amount**: A fixed amount is discounted. If you select this type, for each currency used in your store, specify the amount: **Gross price**, **Net price**, or both.

Example:

| PRODUCT PRICE | CALCULATOR PLUGIN | AMOUNT | DISCOUNT APPLIED | PRICE TO PAY |
| --- | --- | --- | --- | --- |
| 50 € | Percentage | 10 |5 € | 45 € |
| 50 €| Fixed amount | 10 €| 10 €| 40 €|

**DISCOUNT APPLICATION TYPE**
<br>You can select one of the following options:
* QUERY STRING
* PROMOTIONAL PRODUCT

**QUERY STRING**
<br>You can use a query to define discount conditions. Only products that satisfy the query's conditions are discountable. Queries also define if the discount is applied to one or several products. Discount conditions are set by using either the *query builder* or by specifying a **Plain query**.

Use the query builder to construct queries or the **Plain query** field to enter them. You can switch between both modes by clicking the corresponding button, but note that incomplete queries cannot be transferred between the two modes.

**Query builder**

![Discount_Calculation_Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/query-string.png)

**Plain query**

![Discount_Calculation_Plain Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/discount-calculation-plain-query.png)

The query builder lets you combine different conditions with connectors **AND** and **OR**. Multiple conditions, also known as rules, can be added and grouped in this way. Each condition consists of:
* Field—for example, `attribute.color`
* Operator—for example, `equal(=)`
* Value tokens—for example, `blue`

{% info_block infoBox "Info" %}

The fields and values are defined by your shop data.

{% endinfo_block %}

These tokens are used to build plain queries too. The pattern of the plain query is as follows:

![Plain Query Pattern](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/plain-query-pattern.png)

You can find plain query examples in the following table.

|PLAIN QUERY|EXPLANATION|
|---|---|
|`day-of-week = '1'`|Discount applies if the order is placed on Monday.|
|`shipment-carrier != '1' AND price-mode = 'GROSS_MODE'` | Discount applies if the shipment carrier with the attribute `1` is not chosen, and gross pricing is selected.|
|`currency != 'EUR' OR price-mode = 'GROSS_MODE'` | Discount applies if the selected currency is not Euro, or the pricing mode is gross.|

{% info_block infoBox "Info" %}

For more information about tokens, on this page, see [Token description tables](#token-description-tables).

{% endinfo_block %}

**PROMOTIONAL PRODUCT**
<br>The **PROMOTIONAL PRODUCT** discount type lets you discount specific products at a fixed quantity when the discount conditions are met. A common use case is a "buy x, get y" discount, where a customer gets an item for free when they buy a certain product or spend a certain amount.

The following table describes attributes you enter if, for **DISCOUNT APPLICATION TYPE**, you select **PROMOTIONAL PRODUCT**:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ABSTRACT PRODUCT SKU(S) | Comma-separated abstract product SKUs—products that will be offered with a discount. |
| MAXIMUM QUANTITY | Maximum number of product units that can be discounted. |

![Application type](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/discount/creating-vouchers.md/202200.0/application-type.png)

#### Conditions tab

This section provides information that you need to know when working with discount conditions on the **Conditions** tab.

Conditions, also called *decision rules*, are created in the form of a query and may be entered as a plain query or by the Query builder. A cart rule can have one or more conditions linked to it. The cart rule is redeemed only if every condition linked to it is satisfied. For more details, see the [Discount calculation tab](#discount-calculation-tab) section.

{% info_block infoBox "Info" %}

If you do not need to add a condition, leave the query builder empty.

{% endinfo_block %}

**Example:**
<br>Discount is applied if five or more items are in the cart, and it is Tuesday or Wednesday.

![Discount Condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/discount-condition.png)

The minimum order amount value specifies the threshold which should be reached for the products in a cart with a certain attribute to be discounted. When added to cart, products with the attribute specified by a query are measured against the threshold. By default, the minimum order amount value is `1`. It means that any discount is applied if the number of items that meet the rules inside the cart is superior or equal to `1`.

**Example**:
<br>Discount is applied if 4 or more items with the Intel Core processor are in the cart.

![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/threshold.png)

**More advanced example**:
<br>To create a discount that has an extensive number of conditions, use the condition **groups**. Meaning you collect different rules under different groups and split them into separate chunks.
Let's say you have received a task to create a discount with the following conditions:

**B2B scenario**:
<br>The discount is going to be applied if one of the following is fulfilled:
* The `price-mode` is `Gross mode`, and the subtotal amount is greater or equal to `100` Euro `OR` `115` Swiss Franc.
* The price mode is `Net Mode`, and the subtotal amount is greater or equal: `80` Euro `OR` `95` Swiss Franc.

The setup looks like the following:
![B2B scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2b-scenario.png)

**B2C scenario**
<br>The discount is going to be applied if one of the following is fulfilled:
* On **Tuesday**, and the item `color` is `red`, this item does not have the label `NEW`, and the customer adds at least two items or more to a cart.
* On **Thursday**, and the item `color` is `white`, this item does not have the label `NEW`, and the customer adds at least two items or more to a cart.

The setup should be as follows:
![B2C scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2c-scenario.png)

#### Token description tables

This section contains a set of tables that describe fields, value types, and operators you use when building a plain query.

**Tokens**

![Token](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Token+Description+Tables/tokens.png)

| VALUE | DESCRIPTION |
| --- | --- |
| Fields | Available fields may include `SKU`, `item-price`, `item-quantity`, or a variety of attributes—for example, `currency` on the preceding image. |
| Operator | Operator compares the value of a field on the left with the values on the right—for example, equals (`=`), greater than (`>`). If the expression evaluates to true, the discount can be applied—operator is `equal` on the previous image). |
| Value | Value types must match the selected field. The asterisk (*) matches all possible values. On the preceding image, the value is `Swiss Franc`.|
| Combine Conditions | `AND` and `OR` operators are used to combine conditions —`AND` on the preceding image. |
|Grouping | When building more complex queries, conditions may be grouped inside parentheses. Because discount calculations and conditions are applied per item, you can not use groups with `AND` where each group contains at least one SKU-based rule. |

**Fields and value types—plain query**

|FIELD|PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Calendar week|calender-week|Number|Week number in a year—from 1 to 52.|
|Day of week|day-of-week|Number|Day of week—from 1 to 7.|
|Grand total|grand-total|Number (Decimal)|Sum of all totals.|
|Subtotal|sub-total|Number (Decimal)|Sum of item prices w/o shipment expenses and discounts.|
|Item price|item-price|Number (Decimal)|Price of one item.|
|Item quantity|item-quantity|Number|Number of items.|
|Month|month|Number|Month of the year—from 1 to 12.|
|SKU|sku|String|Any value depends on how SKUs are stored.|
|Time|time|hour:minute|Time of the day.|
|Total quantity|total-quantity|Number|Total cart quantity.|
|Attribute|attribute.*|String, number|Any value.|
|Customer Group|customer-group|String|Any value, use a customer group name for an exact match.|
| Category | category | String | Any product category or sub-category. Includes any sub-categories that fall within its navigation tree. |

**Operators (Plain Query)**

|OPERATOR|OPERATOR FOR PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Contains|CONTAINS|String, Number|Checks if the value is contained in the field.|
|Doesn't contain|DOES NOT CONTAIN|String, Number | Checks if the value is not contained in the field.|
|Equal|=|String, Number|Checks if the value is equal to the value of the right operand.|
|Not Equal|!=|String, Number|Checks if the value is not equal to the value of the right operand.|
|In|IS IN|List|Values need to be semicolon-separated.|
|Not In|IS NOT IN|List|Values need to be semicolon-separated.|
|Less|<|Number|Checks if the value is less than the value of the right operand.|
|Less or equal|<=|Number|Checks if the value is less than or equal to the value of the right operand.|
|Greater|>|Number|Checks if the value is greater than the value of the right operand.|
|Greater or equal|>=|Number|Checks if the value is greater than or equal to the value of the right operand.|
