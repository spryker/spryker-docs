---
title: Create vouchers
description: Use the procedure to create discount vouchers your customer can redeem during checkout.
last_updated: Aug 27, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-voucher
originalArticleId: 5d9e5e07-5260-4f0a-8118-aaa324af6fbc
redirect_from:
  - /2021080/docs/creating-a-voucher
  - /2021080/docs/en/creating-a-voucher
  - /docs/creating-a-voucher
  - /docs/en/creating-a-voucher
related:
  - title: Creating cart rules
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/creating-cart-rules.html
---

This guide describes how to create vouchers.

Vouchers are codes that customers can redeem during checkout. Voucher codes are grouped into pools to apply logic to multiple vouchers at once. You can generate a single voucher to be used by multiple customers or a pool of dedicated one-time per-customer voucher codes.

## Prerequisites

To start creating a voucher, do the following:
1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. On the **Discount** page, click **Create new discount**.

## 1. Define general settings of a voucher discount


1. On the **Create Discount** page, click the **General information** tab.
2. For **STORE RELATION**, select one or more stores you want the discount to be displayed in.
3. For **DISCOUNT TYPE**, select **Voucher codes**.
4. Enter a **NAME**.
5. Optional: Enter a **Description**.
6. Optional: To make the discount exclusive, select **EXCLUSIVE**.
7. Select a **VALID FROM** date.
8. Select a **VALID TO** date.
9. Click **Next**.

## 2. Define discount calculation and the products to apply the discount to

1. Click the **Discount calculation** tab.
2. Select a **CALCULATOR TYPE**.
3. Based on the calculator type you've selected, do one of the following:
    * **Fixed amount**: Enter the needed discounted prices.
    * **Percentage**: For **VALUE**, enter a percentage to be discounted.
4. Select a **DISCOUNT APPLICATION TYPE**.
5. Depending on the discount application type you've selected, do the following:
    * **QUERY STRING**: Add a query using the query builder or by entering a plain query.
    * **PROMOTIONAL PRODUCT**:
        1. Enter **ABSTRACT PRODUCT SKU**.
        2. Enter a **QUANTITY**.
6. Click **Next**.

## 3. Define on what conditions the discount can be applied


1. Click the **Conditions** tab.
2. For **APPLY WHEN**, add a query using the query builder or by entering a plain query.
3. For **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).**, enter a number.
4. Click **Save**.

This refreshes the page with a success message displayed.

## 4. Generate voucher codes

1. Click the **Voucher codes** tab.
2. Enter a **QUANTITY**.
2. Optional: Enter a **CUSTOM CODE**.
3. For **ADD RANDOM GENERATED CODE LENGTH**, select a number.
4. Enter a **MAX NUMBER OF USES**.
5. Click **Generate**.
    This refreshes the page with a success message displayed. The created voucher codes are displayed in the **Generated Discount Codes** section.


**Tips and tricks**
To download voucher codes, click **Export**.

## 5. Activate the discount

Optional: To make the discount voucher redeemable on the Storefront, click **Activate** in the top-right corner.

This refreshes the page with a success message displayed.




## Reference information: Define general settings of a voucher discount

This section describes attributes you enter and select when creating or editing a voucher.

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| STORE RELATION | The stores to display the discount in. |
| DISCOUNT TYPE | Defines how the discount will be applied: <ul><li>**Cart rule**: the discount will be applied automatically to the products defined in [Define discount calculation and the products to apply the discount to](#define-discount-calculation-and-the-products-to-apply-the-discount-to).</li><li>**Voucher codes**: the discount will be applied to the products defined in [Define discount calculation and the products to apply the discount to](#define-discount-calculation-and-the-products-to-apply-the-discount-to) when a customer enters a voucher code generated in [Generate voucher codes](#generate-voucher-codes).</li></ul> |
| NAME | Unique identifier of the discount that will be displayed in the Back Office and on the Storefront. |
| DESCRIPTION | The description will be displayed on the Storefront.  |
| NON-EXCLUSIVE | Defines that this discount can be applied to a cart together with other non-exclusive discounts. |
| EXCLUSIVE | Defines that this discount, when applied to a cart, discards all the other non-exclusive discounts. If multiple exclusive discounts are applied to a cart, only the discount with the bigger discount value is applied.   |
| VALID FROM and VALID TO | Inclusively, define the dates between which the discount can be applied.|

## Reference information: Define discount calculation and the products to apply the discount to

This section contains information for defining discount calculation and the product to apply the discount to.

### CALCULATOR TYPE

The discount can be calculated in two ways:
* **Percentage**: The discount is calculated as a percentage of the discounted items.
* **Fixed amount**: A fixed amount is discounted.

Example:

| PRODUCT PRICE | CALCULATOR TYPE | AMOUNT | DISCOUNT APPLIED | PRICE TO PAY |
| --- | --- | --- | --- | --- |
| 50 € | Percentage | 10 |5 € | 45 € |
| 50 € | Fixed amount | 10 €| 10 €| 40 €|

### DISCOUNT APPLICATION TYPE: QUERY STRING

A query string defines what products a discount applies to. A query string consists of decision rules. Only the products that fulfill all the decision rules are discountable. You can define a query string by entering a plain query or by using a query builder.

Query builder:
![Discount_Calculation_Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/query-string.png)

Plain query:
![Discount_Calculation_Plain Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/discount-calculation-plain-query.png)

A decision rule consists of the following:
* Attribute. For example, *attribute.color*.
* Relation operator. For example, *equal*.
* Value. For example, *black*.


You can find query examples in the following table.

|PLAIN QUERY|EXPLANATION|
|---|---|
|day-of-week = '1'| Discount applies to the orders that are placed on Monday.|
|shipment-carrier != '1' AND price-mode = 'GROSS_MODE'| Discount applies if the shipment carrier with the identifier `1` is not chosen and gross pricing is selected.|
|currency != 'EUR' OR price-mode = 'GROSS_MODE'|Discount applies if the selected currency is not Euro or the pricing mode is gross.|


### DISCOUNT APPLICATION TYPE: PROMOTIONAL PRODUCT

The promotional product lets you select a product that is to be displayed in a customer's cart with a discount. The **ABSTRACT PRODUCT SKU** defines the discounted product, and **QUANTITY** defines how many products a customer can buy with a discount.
![Application type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/Application+type.png)

To give away a promotional product for free, select percentage calculator type and enter 100 percents.

## Reference information: Define under which conditions the discount can be applied

Similarly do [defining discounted products](#discount-application-type-query-string), the conditions on which a discount is a applied are defined using a query string.

Example: Discount is applied if five or more items are in the cart and it is Tuesday or Wednesday.
![Discount Condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/discount-condition.png)

The **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).** defines a minimum number of items that must fulfill the query for the discount to be applies. By default, the minimum order amount value is 1. It means that the discount is applied if there is one item in a cart the fulfills the query.

Example: Discount is applied if 4 or more items with the Intel Core processor are in the cart.
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/threshold.png)



## Reference information: Generate voucher codes

This section describes the information that you need to know when working with voucher codes in the **Voucher code** tab.

| ATTRIBUTE | DESCRIPTION |  
| --- | --- |
| QUANTITY | Number of vouchers to generate. |  
| CUSTOM CODE | When generating a single voucher code, you can enter it manually. If you want to create multiple codes at once, add a "Random Generated Code Length" to the custom code. |  
| ADD RANDOM GENERATED CODE LENGTH | A number of random alphanumeric symbols to add to the code. If you entered  |  
| MAX NUMBER OF USES | Defines the maximum number of times a voucher code can be redeemed in a cart. |  

Use the placeholder **[code]** to indicate the position you want random characters to be added to.
<br>**For example:**
   * **123[code]** (the randomly generated code will be added right after the custom code);
   *  **[code]123** (the randomly generated code will be added in front of the custom code).

**Maximum number of uses**
| VALUE | BEHAVIOR |  
| --- | --- |
| 0 | Infinitely redeemable. |  
| 1 | Voucher can be redeemed once. |  
| n > 1 | Voucher can be redeemed _n_ times. |  

![Voucher code](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Voucher+Codes:+Reference+Information/voucher-code.png)

**Voucher Code Pool**
The voucher codes of a discount are all contained in the same voucher code pool. One customer may only redeem one voucher code per pool per cart.

#### <a name="token-description-tables"></a>Token description tables

This section contains a set of tables that describe fields, value types, and operators you use when building a plain query.

**Tokens**

![Token](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Token+Description+Tables/tokens.png)

| VALUE | DESCRIPTION |
| --- | --- |
| Fields | The available fields may include SKU, item-price, item-quantity, or a variety of attributes (e.g., **currency** on the image above). |
| Operator | Operator compares the value of a field on the left with the value(s) on the right (e.g., equals (=), greater than (>)). If the expression evaluates to true, the discount can be applied. (operator is **equal** on the image above) |
| Value | Value types must match the selected field. The asterisk (*) matches all possible values. (on the image above, the value is **Swiss Franc**)|
| Combine Conditions | ‘AND’ and ‘OR’ operators are used to combine conditions. (**AND** on the image above) |
|Grouping|When building more complex queries, conditions may be grouped inside parentheses ‘( )’.|

**Fields and value types (Plain Query)**

|FIELD|PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Calendar week|calendar-week|Number|Week number in a year (1-52)|
|Day of week|day-of-week|Number|Day of week (1-7)|
|Grand total|grand-total|Number (Decimal)|Sum of all totals|
|Subtotal|sub-total|Number (Decimal)|Sum of item prices w/o shipment expenses and discounts|
|Item price|item-price|Number (Decimal)|Price of one item|
|Item quantity|item-quantity|Number|Number of items|
|Month|month|Number|Month of the year (1-12)|
|SKU|sku|String|Any value depends on how SKUs are stored|
|Time|time|hour:minute|Time of the day|
|Total quantity|total-quantity|Number|Total cart quantity|
|Attribute|attribute.*|String, number|Any value|
|Customer Group|customer-group|String|Any value, use a customer group name for an exact match|

**Operators (Plain Query)**

|OPERATOR|OPERATOR FOR PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Contains|CONTAINS|String, Number|Checks if the value is contained in the field|
|Doesn’t contain|DOES NOT CONTAIN|String, Number|Checks if the value is not contained in the field
|Equal|=|String, Number|Checks if the value is equal to the value of the right operand|
|Not Equal|!=|String, Number|Checks if the value is not equal to the value of the right operand|
|In|IS IN|List|Values need to be semicolon-separated|
|Not In|IS NOT IN|List|Values need to be semicolon-separated|
|Less|<|Number|Checks if the value is less than the value of the right operand|
|Less or equal|<=|Number|Checks if the value is less than or equal to the value of the right operand|
|Greater|>|Number|Checks if the value is greater than the value of the right operand|
|Greater or equal|>=|Number|Checks if the value is greater than or equal to the value of the right operand|

**What's next?**
<br>See [Managing Discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to know more about the actions you can do once the discount is created.
