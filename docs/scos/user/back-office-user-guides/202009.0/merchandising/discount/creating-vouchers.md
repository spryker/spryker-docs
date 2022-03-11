---
title: Creating vouchers
description: Use the procedure to create discount vouchers your customer can redeem during checkout.
last_updated: Aug 27, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/creating-a-voucher
originalArticleId: 168137d3-659d-426f-99ea-4e685c316d4c
redirect_from:
  - /v6/docs/creating-a-voucher
  - /v6/docs/en/creating-a-voucher
related:
  - title: Token Description Tables
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/references/token-description-tables.html
  - title: Creating cart rules
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/creating-cart-rules.html
---

This topic describes how to create a Voucher.
***
To start working with discounts, navigate to the **Merchandising > Discounts** section.
***
Vouchers are codes that customers can redeem during checkout. Voucher codes are grouped into pools to apply logic to multiple vouchers at once. You can generate a single voucher to be used by multiple customers or a pool of dedicated one-time per-customer voucher codes.
***
**To create a discount voucher:**
1. On the **Discount** page, click **Create new discount** in the top-right corner.
2. On the **Create Discount page > General tab**, do the following:
  1. In **Store relation**, check the stores you wish the discount to be active in.
  2. In **Discount Type** drop-down, select **Voucher codes**.
  3. In the **Name** field, specify the name for the voucher.
  4. _Optional_: Enter the description for the voucher in the **Description** field.
  5. Specify if the voucher is exclusive. See [Discount: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/reference-information-discount.html) for more details.
  6. Specify the validity interval (lifetime) of the voucher.
 3. Click **Next** or select the **Discount calculation** tab to proceed.
 4. On the **Create Discount page >Discount calculation** tab, do the following:
  1.  Select either Calculator percentage, or Calculator fixed in the **Calculator type** drop-down. See [Discount Calculation: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/reference-information-discount-calculation.html) for more details.
  {% info_block warningBox "Note" %}
  The next step varies based on the selected calculator type.
  {% endinfo_block %}
    a. **Calculator fixed**: Enter the prices to be discounted
    b.  **Calculator percentage**: Enter the values (percentage) to be discounted
  2. Select the **Discount application type** and define what products the voucher will be applied to. See [Discount Calculation: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/reference-information-discount-calculation.html) for more details.
 5. Click **Next**, or select the **Conditions** tab to proceed.
 6. On the **Create Discount page >Conditions** tab, do the following:
  1. Select the **Apply when** conditions or click **Plain query** and enter the  query manually. See [Discount Conditions: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/reference-information-discount-conditions.html) for more details.
  2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
7. Click **Save** to create the new voucher.
***
When you click **Save**, an additional tab named **Voucher Codes** appear. Here, you can generate, view and export voucher codes (if they were already created).
The list is empty until codes are generated.
***
On the **Voucher code** tab, do the following:
1. Enter the **Quantity** for voucher codes you want to generate.
2. _Optional_: Enter a **Custom code**.
3. Set the **Add Random Generated Code Length** by selecting the value from a drop-down list.
4. Set the **Maximum number** of uses.
5. Click **Generate** to complete the process.
  The voucher codes will be generated according to your specifications. The codes will be displayed in the table at the bottom of the page.
6. Click **Activate** in the top right corner to activate the voucher.
Even if a voucher is valid and the decision rules are satisfied, a voucher can only be redeemed if it’s currently active.
{% info_block infoBox %}

See [Voucher Codes: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/references/reference-information-voucher-codes.html)

{% endinfo_block %} for more details.
***
**Tips and tricks**
Once you generated voucher codes, you can export them as a **.csv** file.
To do that, click **Export** below **Generate**.
***
**What's next?**
See [Managing Discounts](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/managing-discounts.html) to know more about the actions you can do once the discount is created.
