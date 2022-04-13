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

This topic describes how to create a Cart Rule.

A cart rule is a discount that is applied automatically when all attached discount conditions are fulfilled and if the cart rule is active. Unlike a voucher code, it does not require any input from the customer.

## Prerequisites

To start working with discounts, go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.

## Creating a cart rule discount

To create a cart rule discount:
1. On the **Discount** page, in the top right corner, click **Create new discount**.
2. On the **Create Discount** page, on the **General information** tab, do the following:
   1. In **Store relation**, check the stores you wish the discount to be active in.
   2. From the **Discount Type** drop-down list, select a cart rule.
   3. In the **Name** field, specify the name for the discount.
   4. Optional: in the **Description** field, enter the description of the discount.
   5. Specify if the discount is exclusive. For reference information, in the **Creating vouchers** guide, see the [Discount Overview page](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-overview-page) section.
   6. Specify the validity interval (lifetime) of the discount.
   7. To proceed to the **Discount calculation** tab, click **Next**.
3. On the **Create Discount** page, in the **Discount calculation** tab, do the following:
   1. Select either Calculator percentage or Calculator fixed in the **Calculator type** drop-down. For reference information, in the **Creating vouchers** guide, see the [Discount calculation tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-calculation-tab) section.

        {% info_block warningBox "Note" %}

        The next step varies based on the selected calculator type:
          * **Calculator fixed**: Enter the amount to be discounted.
          * **Calculator percentage**: Enter the value (percentage) to be discounted.

        {% endinfo_block %}

   2. Select the **Discount application type** and define what products the discount will be applied to. For reference information, in the **Creating vouchers** guide, see the [Discount calculation tab](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#discount-calculation-tab) section.
   3. To proceed to the **Conditions** tab, click **Next**.
4. On the **Create Discount** page, in the **Conditions** tab, do the following:
   1. Select the **Apply when** conditions or click **Plain query** and enter the query manually. For reference information, in the **Creating vouchers** guide, see the [Conditions](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html#conditions) section.
   2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
   3. To create the new discount, click **Save**.


**What's next?**
<br>See [Managing discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to know more about the actions you can do once the discount is created.
