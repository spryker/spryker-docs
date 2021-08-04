---
title: Creating a cart rule
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-cart-rule
redirect_from:
  - /2021080/docs/creating-a-cart-rule
  - /2021080/docs/en/creating-a-cart-rule
---

This topic describes how to create a Cart Rule.

A cart rule is a discount that is applied automatically when all attached discount conditions are fulfilled and if the cart rule is active. Unlike a voucher code, it does not require any input from the customer.

## Prerequisistes

To start working with discounts, go to **Merchandising** > **Discount**.

## Creating a cart rule discount

To create a cart rule discount:

1. On the *Discount* page, in the top right corner, click **Create new discount**.
2. On the *Create Discount* page, in the *General information* tab, do the following:
    1. In **Store relation**, check the stores you wish the discount to be active in.
    2. From the **Discount Type** drop-down list, select a cart rule.
    3. In the **Name** field, specify the name for the discount.
    4. _Optional_: in the **Description** field, enter the description of the discount.
    5. Specify if the discount is exclusive. For reference information, in the Creating a voucher guide, see the [Discount Overview page](https://documentation.spryker.com/docs/creating-a-voucher#discount-overview-page) section.
    6. Specify the validity interval (lifetime) of the discount.
* Click **Next** or select the *Discount calculation* tab to proceed.
* On the *Create Discount* page, in the *Discount calculation* tab, do the following:
    1.  Select either Calculator percentage or Calculator fixed in the **Calculator type** drop-down. For reference information, in the Creating a voucher guide, see the [Discount calculation tab](https://documentation.spryker.com/docs/creating-a-voucher#discount-calculation-tab) section.
    {% info_block warningBox "Note" %}

    The next step varies based on the selected calculator type:
    a. **Calculator fixed**: Enter the prices to be discounted.
    b.  **Calculator percentage**: Enter the values (percentage) to be discounted.
    
{% endinfo_block %}
    2. Select the **Discount application type** and define what products the discount will be applied to. For reference information, in the Creating a voucher guide, see the [Discount calculation tab](https://documentation.spryker.com/docs/creating-a-voucher#discount-calculation-tab) section.
 * Click **Next**, or select the **Conditions** tab to proceed.
 * On the *Create Discount* page, in the *Conditions* tab, do the following:
    1. Select the **Apply when** conditions or click **Plain query** and enter the query manually. For reference information, in the Creating a voucher guide, see the [Conditions](https://documentation.spryker.com/docs/creating-a-voucher#conditions) section.
    2. Enter the value for **The discount can be applied if the query applies for at least X item(s).** field.
* Click **Save** to create the new discount. 


**What's next?**
See [Managing discounts](https://documentation.spryker.com/docs/managing-discounts) to know more about the actions you can do once the discount is created.

