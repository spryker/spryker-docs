---
title: "Best practices: Promote products with discounts"
description: Learn how to promote products using the discounts module in the back office of Spryker Cloud Commerce OS.
template: back-office-user-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/discount/best-practices-promote-products-with-discounts.html
  - /docs/pbc/all/discount-management/202311.0/manage-in-the-back-office/best-practices-promote-products-with-discounts.html 
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-in-the-back-office/best-practices-promote-products-with-discounts.html 
related:
  - title: Promotions & Discounts feature overview
    link: docs/pbc/all/discount-management/latest/base-shop/promotions-discounts-feature-overview.html
---

This document explains how to use discounts to promote products using a concrete example.

Let's say that today is January 19, 2017. Soon, your shop is going to receive ASUS laptops with a new Intel processor. You want to quickly sell the laptops with the old processor. To promote the old laptops, you are going to offer free standard delivery for all Intel-based Asus laptops.

To create the corresponding discount, follow the steps in the sections below.

## 1. Define the general settings of the discount

1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. On the **Discount** page, click **Create new discount**.
3. On the **Create Discount** page, for **STORE RELATION**, select **DE** and **AT**.
    The discount will be applicable in both shops.
4. Select a **Cart rule**.
    The discount will be applied automatically once a customer adds an Intel-based Asus laptop to cart.
6. For **NAME**, enter `Free delivery for Asus laptops`.
    This name will be displayed in cart when the discount is applied.
7. For **DESCRIPTION**, enter `Free standard delivery for Asus laptops with old Intel processors.` This description is only displayed in the Back Office.
8. Select the **EXCLUSIVE** checkmark.
    When this discount is applied to a cart, all the other discounts will be discarded.
9. For **VALID FROM**, select January 19, 2017.
    The discount will be active right after you create it.
10. For **VALID TO**. select January 26, 2017.
    After a week, you can reevaluate the discount based on sale results.
11. Click **Next**.

![Define general settings of the discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/discount/best-practices-promote-products-with-discounts.md/define-general-settings-of-the-discount.png)

## 2. Define the discount's calculation and the products to apply the discount to

1. Click the **Discount calculation** tab.
2. For **CALCULATOR TYPE**, select **Percentage**.
    The discount will be calculated as a percentage of the products' price.
3. For **Percentage**, enter `100`.
    100% of the products' price will be discounted. In other words, it will be free.
4. For **DISCOUNT APPLICATION TYPE**, select **QUERY STRING**.
5. For **APPLY TO**, select **shipment-method**.
    That's the attribute of the rule.
6. In the next field that appeared, select **equal**.
    That's the relation operator.
7. In the last field, select **Standard (DHL)**.
    That's the value. The discount will apply to the standard DHL delivery.
8. Click **+ Add rule**.
9. For the rule that appears, for attribute, select **shipment-method**.
10. Select the **equal** operator.
11. For the value, select **Standard (Hermes)**.
    The 100% discount will apply to the standard delivery of DHL and Hermes.
12. Click **Next**.

![Define discount calculation and the products to apply the discount to](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/discount/best-practices-promote-products-with-discounts.md/define-discount-calculation-and-the-products-to-apply-the-discount-to.png)

## 3. Define on what conditions the discount can be applied


1. Click the **Conditions** tab.
2. In the **APPLY WHEN** section, select the **attribute.brand** attribute.
3. For the rule value, enter `Asus`.
    The discount will be applied if an Asus product is added to cart.
4. Click **+ Add rule**.
5. For the attribute of the rule that appears, select **attribute.processor_model**.
6. For rule value, enter `i3`
    Since the current combination operator is **AND**, the discount will be applied if both rules are fulfilled: a cart contains an Asus product with an i3 Intel processor.
7. Click **+ Add group**.
    A separate section with a rule appears.
8. For the attribute of the new rule, select **product-label**.
9. Select the **not equal** relation operator.
10. For rule value, select **NEW**.
    The discount will apply if the product in cart is not new. This will make sure that no new laptops are sold with a discount.
11. Click **+Add rule**.
12. Select the **attribute.processor_model** attribute.
13. For relation operator, select **not equal**.
14. For rule value, enter `i7`.
    The discount will not be applied if a laptop with the new i7 processor is added to cart. This will make sure that no laptops with the new processor are sold with a discount.
15. For the current group, select the **OR** combination operator.
    The discount will not be applied if at least one of the group's rules applies.

The default value of **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).** is `1`. When a customer adds one or more products that fulfill the rules you've specified, the discount will be applied.

16. Click **Save**.

This refreshes the page with a success message displayed. You've created the discount.

![Define on what conditions the discount can be applied](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/discount/best-practices-promote-products-with-discounts.md/define-on-what-conditions-the-discount-can-be-applied.png)

## 5. Activate the discount

For your customers to be able to use the discount, click **Activate** in the top-right corner.

This refreshes the page with a success message displayed. Now you only need to advertise the discount in your shop.
