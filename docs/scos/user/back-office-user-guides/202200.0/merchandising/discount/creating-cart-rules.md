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

To start working with discounts, go to **Merchandising** > **Discount**.

## Creating a cart rule discount

To create a cart rule discount:
1. On the **Discount** page, in the top right corner, click **Create new discount**.
2. On the **Create Discount** page, on the **General information** tab, do the following:
    1. In **STORE RELATION**, check the stores you wish the discount to be active in.
    2. From the **DISCOUNT TYPE** drop-down list, select a cart rule.
    3. In the **NAME** field, specify the name for the discount. <br>It is displayed in the **Cart calculation** section.
    4. _Optional_: in the **DESCRIPTION** field, enter the description of the discount. <br>The description is displayed in the cart, in the **Promotional products** section for products eligible for the discount.
    5. _Optional_: in the **PRIORITY** field, enter an integer value from `1` to `9999` for the discount priority. <br>For reference information, in the **Create vouchers** guide, see [General information tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#general-information-tab).
    6. Specify if the discount is exclusive. For reference information, in the **Create vouchers** guide, see [General information tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#general-information-tab).
    7. Specify the validity interval (lifetime) of the discount.
* Click **Next** or select the **Discount calculation** tab to proceed.

* On the **Discount calculation** tab, do the following:
    1.  In the **CALCULATOR TYPE** drop-down, select either **Percentage** or **Fixed amount**. For reference information, in the **Create vouchers** guide, see the [Discount calculation tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-calculation-tab) section.

        {% info_block warningBox "Note" %}

        The next step varies based on the selected calculator type:

          a. *Fixed amount*: Enter the amounts (per currency and price mode, if applicable) to be discounted.

          b. *Percentage*: Enter the percent value to be discounted.

        {% endinfo_block %}

    2. Select the **DISCOUNT APPLICATION TYPE** and define which products are eligible for the discount. For reference information, in the **Create vouchers** guide, see the [Discount calculation tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-calculation-tab) section.
 * Click **Next**, or select the **Conditions** tab to proceed.
 * On the **Conditions** tab, do the following:
    1. Select the **APPLY WHEN** conditions or click **Plain query** and enter the query manually. For reference information, see [Conditions](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#conditions).
    2. Enter the value for **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).** field.
* To create the new discount, click **Save**.


**What's next?**
<br>See [Managing discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to learn more about the actions you can do once the discount is created.
