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

This guide describes how to create a cart rule.

A cart rule is a discount that is applied automatically when all attached discount conditions are fulfilled and if the cart rule is active. Unlike a voucher code, it does not require any input from the customer.

## Prerequisites

To start working with discounts, go to **Merchandising&nbsp;> Discount**.

## Creating a cart rule discount

To create a cart rule discount:
1. On the **Discount** page, in the top right corner, click **Create new discount**.
2. On the **Create new discount** page, in the **General Information** tab, do the following:
   1. In **STORE RELATION**, select stores you wish the discount to be active in.
   1. For **DISCOUNT TYPE**, select **Cart rule**.
   1. In the **NAME** field, specify the name for the discount. <br>It is displayed in the **Cart calculation** section along with the applied discount amount.
   1. Optional: in the **DESCRIPTION** field, enter a summary that explains the discount and helps the customer understand why they are eligible for the discount and what they can receive.<br>The description is displayed in the cart, in the **Promotional products** section when the discount is applicable.
   1. Optional: in the **PRIORITY** field, enter an integer value from `1` to `9999` for the discount priority. <br>For reference information, in the **Create vouchers** guide, see [General information tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#general-information-tab).
   1. Specify if the discount is exclusive. For reference information, in the **Create vouchers** guide, see [General information tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#general-information-tab).
   1. Specify the validity interval (lifetime) of the discount.
   1. Click **Next** or select the **Discount calculation** tab to proceed.
3. On the **Discount calculation** tab, do the following:
   1. In the **CALCULATOR TYPE** drop-down, select either **Percentage** or **Fixed amount**. For reference information, in the **Create vouchers** guide, see the [Discount calculation tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-calculation-tab) section.

      {% info_block warningBox "Note" %}

      The next step varies based on the selected calculator type:
      * **Fixed amount**: Enter the amounts (per currency and price mode, if applicable) to be discounted.
      * **Percentage**: Enter the percent value to be discounted.

      {% endinfo_block %}

   2. Select the **DISCOUNT APPLICATION TYPE** and define which products are eligible for the discount. For reference information, in the **Create vouchers** guide, see the [Discount calculation tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-calculation-tab) section.
   3. Click **Next**, or select the **Conditions** tab to proceed.
4. On the **Conditions** tab, do the following:
    1. Select the **APPLY WHEN** conditions or click **Plain query** and enter the query manually. For reference information, see [Conditions](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#conditions).
    2. Enter the value for **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).** field.
5. To create the new discount, click **Save**.


**What's next?**
<br>See [Managing discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to learn more about the actions you can do once the discount is created.
