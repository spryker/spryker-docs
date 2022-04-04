---
title: Create cart rules
description: Learn how to create cart rules in the Back Office.
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

This topic describes how to create cart rules in the Back Office.

A cart rule is a discount that is applied automatically when all attached discount conditions are fulfilled and if the cart rule is active. Unlike a voucher code, it does not require any input from the customer.

## Prerequisites

To start creating a discount, do the following:
1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. On the **Discount** page, click **Create new discount**.

## 1. Define general settings of a cart rule discount

1. On the **Create Discount** page, click the **General information** tab.
2. For **STORE RELATION**, select one or more stores you want the discount to be displayed in.
3. Select a **DISCOUNT TYPE**.
4. Enter a  **NAME**.
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
    * **QUERY STRING**: Add a query using the query build or by entering a plain query.
    * **PROMOTIONAL PRODUCT**:
        1. Enter **ABSTRACT PRODUCT SKU**.
        2. Enter a **QUANTITY**.
6. Click **Next**.



## 3. Define the conditions under which the cart rule is applied


4. In the **Conditions** tab, do the following:
   1. Select the **Apply when** conditions or click **Plain query** and enter the query manually. For reference information, in the **Creating vouchers** guide, see the [Conditions](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#conditions) section.
   2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
   3. To create the new discount, click **Save**.


**What's next?**
<br>See [Managing discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to know more about the actions you can do once the discount is created.
