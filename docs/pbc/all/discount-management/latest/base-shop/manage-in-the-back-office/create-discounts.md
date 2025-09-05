---
title: Create discounts
description: Learn how to create discounts using the discounts module in the back office of Spryker Cloud Commerce OS.
last_updated: Aug 27, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-voucher
originalArticleId: 5d9e5e07-5260-4f0a-8118-aaa324af6fbc
redirect_from:
  - /2021080/docs/creating-a-voucher
  - /2021080/docs/en/creating-a-voucher
  - /docs/creating-a-voucher
  - /docs/en/creating-a-voucher
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/discount/creating-vouchers.html
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/discount/create-discounts.html
  - /docs/pbc/all/discount-management/manage-in-the-back-office/create-discounts.html
  - /docs/pbc/all/discount-management/202311.0/manage-in-the-back-office/create-discounts.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-in-the-back-office/create-discounts.html  
  - /docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html
---

This document describes how to create discounts in the Back Office.

## Prerequisites

If you are new to discounts, you might want to start with [Best practices: Promote products with discounts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/best-practices-promote-products-with-discounts.html).

There is a [reference information](#reference-information-define-general-settings-of-the-discount) for each section. Review it before you start, or look up the necessary information as you go through the process.

To create a discount, do the following:
1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. On the **Discount** page, click **Create new discount**.

## 1. Define general settings of the discount

1. On the **Create Discount** page, click the **General information** tab.
2. For **STORE RELATION**, select one or more stores you want the discount to be displayed in.
3. Select a **DISCOUNT TYPE**.
4. Enter a **NAME**.
5. Optional: Enter a **DESCRIPTION**.
6. Optional: Enter a **PRIORITY**.
7. Optional: To make the discount exclusive, select **EXCLUSIVE**.
8. Select a **VALID FROM** date.
9. Select a **VALID TO** date.
10. Click **Next**.

## 2. Define discount calculation and the products to apply the discount to

1. Click the **Discount calculation** tab.
2. Select a **CALCULATOR TYPE**.
3. Based on the calculator type you've selected, do one of the following:
    - **Fixed amount**: Enter the needed discounted prices.
    - **Percentage**: For **VALUE**, enter a percentage to be discounted.
4. Select a **DISCOUNT APPLICATION TYPE**.
5. Depending on the discount application type you've selected, do the following:
    - **QUERY STRING**: Add a query using the query builder or by entering a plain query.
    - **PROMOTIONAL PRODUCT**:
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

If you are creating a cart rule, proceed to step [5. Activate the discount](#activate-the-discount)

1. Click the **Voucher codes** tab.
2. Enter a **QUANTITY**.
2. Optional: Enter a **CUSTOM CODE**.
3. Optional: For **ADD RANDOM GENERATED CODE LENGTH**, select a number.
4. Enter a **MAX NUMBER OF USES**.
5. Click **Generate**.
    This refreshes the page with a success message displayed. The created voucher codes are displayed in the **Generated Discount Codes** section.

## 5. Activate the discount

Optional: To make the discount redeemable on the Storefront, click **Activate** in the top-right corner.

This refreshes the page with a success message displayed.

## Reference information: Define general settings of the discount

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| STORE RELATION | The stores to display the discount in. |
| DISCOUNT TYPE | Defines how the discount is applied: <ul><li>**Cart rule**: the discount is applied automatically to the products defined in [Define discount calculation and the products to apply the discount to](#define-discount-calculation-and-the-products-to-apply-the-discount-to).</li><li>**Voucher codes**: the discount is applied to the products defined in [Define discount calculation and the products to apply the discount to](#define-discount-calculation-and-the-products-to-apply-the-discount-to) when a customer enters a voucher code generated in [Generate voucher codes](#generate-voucher-codes).</li></ul> |
| NAME | The unique ID of the discount that is displayed in the Back Office and on the Storefront. |
| DESCRIPTION | The description is displayed only in the Back Office.  |
| PRIORITY | Defines the order of discounts being applied. Accepts integers from `1` to `9999` with `1` being the highest priority. |
| NON-EXCLUSIVE | Defines that this discount can be applied to a cart together with other non-exclusive discounts. |
| EXCLUSIVE | Defines that this discount, when applied to a cart, discards all non-exclusive discounts. If multiple exclusive discounts are applied to a cart, only the discount with the bigger discount value is applied.   |
| VALID FROM and VALID TO | Inclusively, define the dates between which the discount can be applied.|

## Reference information: Define discount calculation and the products to apply the discount to

This section contains information for defining discount calculation and the product to apply the discount to.

### CALCULATOR TYPE

The discount can be calculated in two ways:
- **Percentage**: The discount is calculated as a percentage of the discounted items.
- **Fixed amount**: A fixed amount is discounted.

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
- Attribute. For example, *attribute.color*.
- Relation operator. For example, *equal*.
- Value. For example, *black*.


You can find query examples in the following table.

|PLAIN QUERY|EXPLANATION|
|---|---|
|day-of-week = '1'| Discount applies to any orders that are placed on Monday.|
|shipment-carrier != '1' AND price-mode = 'GROSS_MODE'| Discount applies if the shipment carrier with the identifier `1` is not chosen, and if gross pricing is selected.|
|currency != 'EUR' OR price-mode = 'GROSS_MODE'| Discount applies if the selected currency is not the Euro, or if the pricing mode is gross.|


### DISCOUNT APPLICATION TYPE: PROMOTIONAL PRODUCT

The promotional product lets you select a product that is to be displayed in a customer's cart with a discount. The **ABSTRACT PRODUCT SKU** defines the discounted product, and **QUANTITY** defines how many products a customer can buy with a discount.
![Application type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/Application+type.png)

To give away a promotional product for free, select percentage calculator type and enter 100 percents.

## Reference information: Define on what conditions the discount can be applied

Similarly to [defining discounted products](#discount-application-type-query-string), the conditions on which a discount is a applied are defined using a query string.

Example: The discount is applied if five or more items are in the cart, and if it's Tuesday or Wednesday.
![Discount Condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/discount-condition.png)

The **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).** defines a minimum number of items that must fulfill the query for the discount to be applies. By default, the minimum order amount value is 1. It means that the discount is applied if there is one item in a cart the fulfills the query.

Example: The discount is applied if 4 or more items with an  Intel Core processor are in the cart.
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/threshold.png)



## Reference information: Generate voucher codes

| ATTRIBUTE | DESCRIPTION |  
| --- | --- |
| QUANTITY | The number of vouchers to generate. |  
| CUSTOM CODE | Any custom symbols you want the voucher codes to contain. If you are adding a single custom code, for **ADD RANDOM GENERATED CODE LENGTH**, select **No additional random characters**. If you add random characters, they are by default appended to the end of the custom code. To specify where to place the random characters, add `[code]` to the custom code. For example, `black[code]friday`. |  
| ADD RANDOM GENERATED CODE LENGTH | A number of random alphanumeric symbols to add to the code. If you entered a **CUSTOM CODE**, the random characters are appended to the end of it. If you are generating more than one code, you must select **3** or more. |  
| MAX NUMBER OF USES | Defines the maximum number of times a voucher code can be redeemed. |  

{% info_block infoBox "Voucher code collections" %}

The voucher codes of a discount belong to a voucher code collection. One customer may only redeem one voucher code per collection per cart. At the same time, a customer can redeem two vouchers in one cart if they belong to different voucher code collections.

{% endinfo_block %}


## Decision rules: Attributes and operators

This section contains additional information for defining decision rules.


| ATTRIBUTE | VALUE TYPE | DESCRIPTION |
|-|-|-|
|calendar-week|Number| The number of a week in a year: 1-52. |
|day-of-week|Number| The day of week: 1-7. |
|grand-total| Decimal number | The sum of all totals. |
|sub-total| Decimal number | The sum of item prices without shipment expenses and discounts. |
|item-price| Decimal number | The price of one item. |
|item-quantity|Number| The number of items. |
|month|Number| The month of the year: 1-12. |
|sku|String| The SKU of a product. |
|time| hour:minute | The time of the day. |
|total-quantity|Number| The total cart quantity. |
|attribute.*|String, number| Any value. |
|customer-group|String| Any value, use a customer group name for an exact match. |
| customer-order-count | Number | Any value. Checked against the number of placed orders in a customer account. |


|RELATION OPERATOR|IN PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Contains|CONTAINS|String, Number| Checks if the value is contained in the field. |
|Doesn't contain|DOES NOT CONTAIN|String, Number| Checks if the value is not contained in the field. |
|Equal | = | String, Number | Checks if the value is equal to the value of the right operand|
|Not Equal|!=|String, Number| Checks if the value is not equal to the value of the right operand|
|In|IS IN|List| Values need to be semicolon-separated|
|Not In|IS NOT IN|List| Values need to be semicolon-separated|
|Less|<|Number| Checks if the value is less than the value of the right operand|
|Less or equal|<=|Number| Checks if the value is less than or equal to the value of the right operand|
|Greater|>|Number| Checks if the value is greater than the value of the right operand|
|Greater or equal|>=|Number| Checks if the value is greater than or equal to the value of the right operand |

## Next steps

[Edit discounts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/edit-discounts.html)
