---
title: Creating Cart Rules
description: Use the procedure to create a cart-based discount rule along with its conditions in the Back Office.
last_updated: Jul 31, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v2/docs/creating-a-cart-rule-discount
originalArticleId: 93df3a54-85b6-4d1b-804a-a8272021dd22
redirect_from:
  - /v2/docs/creating-a-cart-rule-discount
  - /v2/docs/en/creating-a-cart-rule-discount
related:
  - title: Discount- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/references/discount-reference-information.html
  - title: Discount Calculation- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/references/discount-calculation-reference-information.html
  - title: Discount Conditions- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/references/discount-conditions-reference-information.html
  - title: Voucher Codes- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/references/voucher-codes-reference-information.html
  - title: Token Description Tables
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/references/token-description-tables.html
  - title: Creating Vouchers
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/creating-vouchers.html
  - title: Managing Discounts
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/managing-discounts.html
---

This topic describes how to create a Cart Rule discount.
***

To start working with discounts, navigate to the **Discounts** section.
***

A cart rule is a discount that is applied automatically when all attached discount conditions are fulfilled and if the cart rule is active. Unlike a voucher code, it does not require any input from the customer.
***

**To create a cart rule discount:**
1. On the **Discount** page, click **Create new discount** in the top right corner.
2. On the **Create Discount page > General tab**, do the following:
   1. In **Store relation**, check the stores you wish the discount to be active in.
   2. In **Discount Type** drop-down, select **Cart Rule**.
   3. In the **Name** field, specify the name for the discount.
   4. _Optional_: Enter the description of the discount in the **Description** field.
   5. Specify if the discount is exclusive. See [Discount: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/discount-reference-information.html) for more details.
   6. Specify the validity interval (lifetime) of the discount.
3. Click **Next** or select the **Discount calculation** tab to proceed.
4. On the **Create Discount page >Discount calculation** tab, do the following:
   1.  Select either Calculator percentage, or Calculator fixed in the **Calculator type** drop-down. See [Discount Calculation: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/discount-calculation-reference-information.html) for more details.
    {% info_block warningBox "Note" %}

    The next step varies based on the selected calculator type.
  
    {% endinfo_block %}
    
      a. **Calculator fixed**: Enter the prices to be discounted
      b.  **Calculator percentage**: Enter the values (percentage) to be discounted
   2. Select the **Discount application type** and define what products the discount will be applied to. See [Discount Calculation: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/discount-calculation-reference-information.html) for more information.
5. Click **Next**, or select the **Conditions** tab to proceed.
6. On the **Create Discount page >Conditions** tab, do the following:
   1. Select the **Apply when** conditions or click **Plain query** and enter the  query manually. See [Discount Conditions: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/discount-conditions-reference-information.html).
   2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
7. Click **Save** to create the new discount.
***

**What's next?**

See [Managing Discount](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to know more about the actions you can do once the discount is created.
