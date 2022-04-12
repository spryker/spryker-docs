---
title: Edit discounts
description: Use these procedures to view and update discounts, activate/deactivate discounts, and add voucher codes in the Back Office.
last_updated: Jul 12, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-discounts
originalArticleId: 6d463da9-6259-4ad5-8c28-46081f008600
redirect_from:
  - /2021080/docs/managing-discounts
  - /2021080/docs/en/managing-discounts
  - /docs/managing-discounts
  - /docs/en/managing-discounts
  - /docs/scos/user/back-office-user-guides/202108.0/merchandising/discount/managing-discounts.html
---

This topic describes how to edit discounts in the Back Office.

## Prerequisites

To edit a discount, do the following:
1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
    This opens the **Discount** page.
2. Next to the discount you want to edit, click **Edit**.

Review the [reference information](#reference-information-edit-discounts) before you start, or look up the necessary information as you go through the process.


## Edit general settings of a discount

1. On the **Edit Discount** page, click the **General information** tab.
2. For **STORE RELATION**, clear or select stores.
3. Select a **DISCOUNT TYPE**.
4. Update **NAME**.
5. Update **DESCRIPTION**.
6. Update exclusivity by selecting **EXCLUSIVE** or **NON-EXCLUSIVE**.
7. Select a **VALID FROM** date.
8. Select a **VALID TO** date.
9. Click **Save**.
  This refreshes the page with a success message displayed.

## Edit discount calculation and the products to apply the discount to

1. Click the **Discount calculation** tab.
2. Select a **CALCULATOR TYPE**.
3. Based on the selected calculator type, do one of the following:
    * **Fixed amount**: Update the discounted prices.
    * **Percentage**: For **VALUE**, update the percentage to be discounted.
4. Select a **DISCOUNT APPLICATION TYPE**.
5. Depending on the discount application type you've selected, do the following:
    * **QUERY STRING**: Update the query using the query builder or by entering a plain query.
    * **PROMOTIONAL PRODUCT**:
        1. Enter **ABSTRACT PRODUCT SKU**.
        2. Enter a **QUANTITY**.
6. Click **Save**.
  This refreshes the page with a success message displayed.


## Update the conditions on which the discount can be applied


1. Click the **Conditions** tab.
2. For **APPLY WHEN**, update the query using the query builder or by entering a plain query.
3. Update **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).**.
4. Click **Save**.
  This refreshes the page with a success message displayed.  

## Voucher discount: Generate voucher codes

1. Click the **Voucher codes** tab.
2. Enter a **QUANTITY**.
2. Optional: Enter a **CUSTOM CODE**.
3. For **ADD RANDOM GENERATED CODE LENGTH**, select a number.
4. Enter a **MAX NUMBER OF USES**.
5. Click **Generate**.
    This refreshes the page with a success message displayed. The created voucher codes are displayed in the **Generated Discount Codes** section.


**Tips and tricks**
To download voucher codes, click **Export**.

## Reference information: Edit discounts
