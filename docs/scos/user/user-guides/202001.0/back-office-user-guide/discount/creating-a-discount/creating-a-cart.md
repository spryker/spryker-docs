---
title: Creating a Cart Rule Discount
originalLink: https://documentation.spryker.com/v4/docs/creating-a-cart-rule-discount
redirect_from:
  - /v4/docs/creating-a-cart-rule-discount
  - /v4/docs/en/creating-a-cart-rule-discount
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
    5. Specify if the discount is exclusive. See [Discount: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/references/discount-refere) for more details.
    6. Specify the validity interval (lifetime) of the discount.
3. Click **Next** or select the **Discount calculation** tab to proceed.
4. On the **Create Discount page >Discount calculation** tab, do the following:
    1.  Select either Calculator percentage, or Calculator fixed in the **Calculator type** drop-down. See [Discount Calculation: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/references/discount-calcul) for more details.
    {% info_block warningBox "Note" %}
The next step varies based on the selected calculator type.
{% endinfo_block %}
    a. **Calculator fixed**: Enter the prices to be discounted
    b.  **Calculator percentage**: Enter the values (percentage) to be discounted
    2. Select the **Discount application type** and define what products the discount will be applied to. See [Discount Calculation: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/references/discount-calcul) for more information.
 5. Click **Next**, or select the **Conditions** tab to proceed.
 6. On the **Create Discount page >Conditions** tab, do the following:
    1. Select the **Apply when** conditions or click **Plain query** and enter the  query manually. See [Discount Conditions: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/references/discount-condit).
    2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
7. Click **Save** to create the new discount. 
***
**What's next?**
See [Managing Discount](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/managing-discou) to know more about the actions you can do once the discount is created.
