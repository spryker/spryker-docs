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
| VALID FROM and VALID TO | This discount can be Valid From and Valid To dates, inclusive. E.g., a voucher can be redeemed/discount applies to the cart starting from 1/1/2018 until 31/12/2019.|

## Reference information: Define discount calculation and the products to apply the discount to

This section contains information for defining discount calculation and the product to apply the discount to.

### CALCULATOR TYPE

The discount can be calculated in two ways:
* **Percentage**: The discount is calculated as a percentage of the discounted items.
* **Fixed amount**: A fixed amount is discounted.

Example:

| PRODUCT PRICE | CALCULATOR PLUGIN | AMOUNT | DISCOUNT APPLIED | PRICE TO PAY |
| --- | --- | --- | --- | --- |
| 50 € | Calculator Percentage | 10 |5 € | 45 € |
| 50 € | Calculator Amount | 10 €| 10 €| 40 €|

### DISCOUNT APPLICATION TYPE: QUERY STRING

You can use a query to define discount conditions. Only products that satisfy the query's conditions are discountable. Queries also define if the discount is applied to one or several products. Discount conditions are set by using either the *query builder* or by specifying a *Plain query*.

Use the query builder to construct queries (guided) or the **Plain query** field to enter them (free text). You can switch between both modes by clicking the corresponding button (note that incomplete queries cannot be transferred between the two modes).
**Query builder**
![Discount_Calculation_Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/query-string.png)

**Plain query**
![Discount_Calculation_Plain Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/discount-calculation-plain-query.png)

The query builder lets you combine different conditions with connectors (**AND** and **OR**). Multiple conditions (rules) can be added and grouped in this way. Each condition (rule) consists of:
* field (e.g., attribute.color)
* operator (e.g., equal(=))
* value tokens (e.g., blue)

{% info_block infoBox "Info" %}

The fields and values are defined by your shop data.

{% endinfo_block %}

These tokens are used to build plain queries too. The pattern of the plain query is as follows:
![Plain Query Pattern](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/plain-query-pattern.png)

You can find plain query examples in the following table.
|PLAIN QUERY|EXPLANATION|
|---|---|
|day-of-week = '1'|Discount applies if the order is placed on Monday.|
|shipment-carrier != '1' AND price-mode = 'GROSS_MODE'|Discount applies if the shipment carrier with the attribute "1" is not chosen and gross pricing is selected.|
|currency != 'EUR' OR price-mode = 'GROSS_MODE'|Discount applies if the selected currency is not Euro or the pricing mode is gross.|

{% info_block infoBox "Info" %}

See [Token description tables](#token-description-tables) for more information.

{% endinfo_block %}

### DISCOUNT APPLICATION TYPE: PROMOTIONAL PRODUCT

Sometimes, it is more profitable to give away free products or provide a discount for the products that are not yet in the cart instead of the ones that are already there. This discount application type enables you to do just that. When a customer fulfills the discount conditions, the promotional product appears below other items. The SKU of the promotional product you wish to be available for adding to cart is entered in the **Abstract product sku** field. Then, you enter the **Quantity** of the chosen promotional product to be available for adding to cart.
![Application type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/Application+type.png)

You can either give away the promotional product completely for free or provide a discount for this product by specifying the percentage value or a fixed amount to be discounted from the promotional product's price (when giving the product for free, the percentage value should be 100%, while the fixed-price value should be equal to the product's price).

## Reference information: Define under which conditions the discount can be applied

Conditions are also called decision rules.

* A cart rule can have one or more conditions linked to it. The cart rule is redeemed only if every condition linked to it is satisfied.
* Vouchers can be linked to one or more conditions. Vouchers are only redeemed if all linked conditions are satisfied.

The conditions are created in the form of a query and may be entered as a plain query or via the query builder. (See the [Discount calculation tab](#discount-calculation-tab) section for more details.)

{% info_block infoBox "Info" %}

If you do not need to add a condition, you can leave the query builder empty.

{% endinfo_block %}

Example: Discount is applied if five or more items are in the cart and it is Tuesday or Wednesday.
![Discount Condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/discount-condition.png)

The minimum order amount value specifies the threshold which should be reached for the products in a cart with a certain attribute to be discounted. When added to cart, products with the attribute specified by a query are measured against the threshold. By default, the minimum order amount value is 1. It means that any discount is applied if the number of items (that meet the rules) inside the cart is superior or equal to 1.

Example: Discount is applied if 4 or more items with the Intel Core processor are in the cart.
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/threshold.png)

**More advanced example**

To create a discount that will have an extensive number of conditions, you use the condition **groups**. Meaning you collect different rules under different groups and split them into separate chunks.
Let's say you have received a task to create a discount with the following conditions:

**B2B Scenario**
The discount is going to be applied if one of the following is fulfilled:
* The price mode is **Gross**, and the subtotal amount is greater or equal: 100 € (Euro) **OR** 115 CHF (Swiss Franc)

**OR**

* The price mode is **Net**, and the subtotal amount is greater or equal: 80 € (Euro) **OR** 95 CHF (Swiss Franc)

The setup will look like the following:
![B2B scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2b-scenario.png)

**B2C Scenario**
The discount is going to be applied if one of the following is fulfilled:
* On **Tuesday**, and the item color is red, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart

**OR**

* On **Thursday**, and the item color is white, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart

The setup will look like the following:
![B2C scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2c-scenario.png)

#### <a name="voucher-code"></a>Voucher code tab

This section describes the information that you need to know when working with voucher codes in the *Voucher code* tab.

You enter and select the following attributes in **Edit Discount** > **Voucher code**:

| ATTRIBUTE | DESCRIPTION |  
| --- | --- |
| Quantity | Number of vouchers you need to generate. |  
| Custom code | When generating a single voucher code, you can enter it manually. If you want to create multiple codes at once, add a "Random Generated Code Length" to the custom code.|  
| Add Random Generated Code Length | This value defines the number of random characters to be added to the custom code. If you do not add any custom value, you can just select this value. The system will generate the codes with the length you select. |  
| Max number of uses (0 = Infinite usage) | Defines the maximum number of times a voucher code can be redeemed in a cart. |  

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
