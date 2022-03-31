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

To start working with discounts, go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.

## Create a cart rule discount

1. On the **Discount** page, click **Create new discount**.
2. On the **Create Discount** page, on the **General information** tab, do the following:
   1. For **STORE RELATION**, select one or more stores you want the discount to be displayed in.
   2. Select a **DISCOUNT TYPE**.
   3. Enter a  **NAME**.
   4. Optional: Enter a **Description**.
   5. Optional: To make the discount exclusive, select **EXCLUSIVE**.
   6. Select a **VALID FROM** date.
   7. Select a **VALID TO** date.
   8. Click **Next**.
3. In the **Discount calculation** tab, do the following:
   1. Select a **CALCULATOR TYPE**.
   2. Based on the calculator type you've selected, do one of the following:
      * **Fixed amount**: Enter the needed discounted prices.
      * **Percentage**: For **VALUE**, enter a percentage to be discounted.
   3. Select a **DISCOUNT APPLICATION TYPE**. 
   4. Click **Next**.
4. On the **Create Discount** page, in the **Conditions** tab, do the following:
   1. Select the **Apply when** conditions or click **Plain query** and enter the query manually. For reference information, in the **Creating vouchers** guide, see the [Conditions](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#conditions) section.
   2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
   3. To create the new discount, click **Save**.


**What's next?**
<br>See [Managing discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to know more about the actions you can do once the discount is created.
