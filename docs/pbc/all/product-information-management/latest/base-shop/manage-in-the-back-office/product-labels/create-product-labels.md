---
title: Create product labels
description: Learn how to create product labels directly in the Spryker Cloud Commerce OS Back Office
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-product-labels
originalArticleId: fddd9b4b-1aec-473d-922d-e56f7040ee2e
redirect_from:
  - /2021080/docs/creating-product-labels
  - /2021080/docs/en/creating-product-labels
  - /docs/creating-product-labels
  - /docs/en/creating-product-labels
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/product-labels/creating-product-labels.html
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/product-labels/create-product-labels.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html
related:
  - title: Edit product labels
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/product-labels/edit-product-labels.html
  - title: View product labels
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/product-labels/view-product-labels.html
  - title: Product Labels feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-labels-feature-overview.html
---

This topic describes how to create product labels in the Back Office.

## Prerequisites

To start working with product labels, go to **Merchandising** > **Product Labels**.

Review the [reference information](#reference-information-create-product-labels) before you start, or look up the necessary information as you go through the process.

## Create a product label

1. On the **Product Labels** page, click **Create Product Label**.
    This opens the **Create a Product Label** page.
2. In the **GENERAL** pane, enter a **NAME**.
3. Enter a **FRONT-END REFERENCE**.
4. Enter a **PRIORITY**.
5. To make the product label active after creating it, select the **IS ACTIVE** checkbox.
6. In the **BEHAVIOR** pane, select a **VALID FROM** date.
7. Select a **VALID TO** date.
8. Select the **IS EXCLUSIVE** checkbox.
9. In the **STORE RELATION** pane, select one or more stores.
10. In the **TRANSLATIONS** pane, enter a **NAME** for each locale.
11. Click **Next**.
    This opens the **Products** tab.

12. In the **Available** subtab, select one or more products to assign the label to.
13. Click **Save**.
    This opens the **Edit Product Label** page with a success message displayed.

**Tips and tricks**

When assigning a label to multiple products, it might be useful to switch to the **Selected products to assign** subtab to double-check your selection.

## Reference information: Create product labels

The following table describes the attributes you see, select, or enter while creating product labels.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the product label for the Back Office and Storefront. If you don't specify a locale specific name, this name is used by default on the Storefront.  |
| FRONT-END REFERENCE | Defines the location and design of the product label. By default, the following designs are available: *alternative*, *discontinued*, *top*, *new*, *sale*. |
| PRIORITY | Defines the order in which labels will appear on a product card and product details page. The product label with the lowest number will have the highest priority. |
| IS DYNAMIC | Only developers can create [dynamic product labels](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html#dynamic-product-label). This checkbox servers as an identifier for existing dynamic product labels. |
| IS ACTIVE |  Defines if the label is to be displayed on the Storefront after you create it. You can activate it any time later.  |
| VALID FROM and VALID TO | Inclusively defines the time period when the product label will be displayed on the Storefront. If no dates are selected, the label is always displayed. |
| IS EXCLUSIVE | Defines if this product label is to be exclusive. If an exclusive product label is applied to a product, all the other non-exclusive labels assigned to the product will not be displayed on the product card. |
| STORE RELATION | Stores in which a product label will be displayed on the Storefront. |
| NAME in the **TRANSLATIONS** pane | Locale specific names that will be displayed on the Storefront in respective stores. If there is no locale specific name, the **NAME** from the **GENERAL** pane is displayed. |
