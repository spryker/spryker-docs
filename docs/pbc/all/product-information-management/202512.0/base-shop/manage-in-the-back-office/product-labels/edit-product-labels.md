---
title: Edit product labels
description: Learn how to edit product labels directly in the Spryker Cloud Commerce OS Back Office
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/product-labels/edit-product-labels.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/product-labels/edit-product-labels.html
related:
  - title: Create product labels
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html
  - title: View product labels
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/product-labels/view-product-labels.html
  - title: Product Labels feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html
---

## Prerequisites

To start editing product labels, do the following:

1. Go to **Merchandising** > **Product Labels**.
    This opens the **Product Labels** page.
2. Next to the product label you want to edit, click **Edit**.

## Edit the general settings of a product label

1. Click the **Settings** tab.
2. Update any of the following:
    - **NAME**
    - **FRONT-END REFERENCE**
    - **PRIORITY**
3. Select or clear the **IS ACTIVE** checkbox.
4. In the **BEHAVIOR** pane, update any of the following:
    - **VALID FROM**
    - **VALID TO**
5. Select or clear the **IS EXCLUSIVE** checkbox.
6. In the **STORE RELATION** pane, do any of the following:
    - Clear the checkboxes next to the stores you want to stop displaying the label in.
    - Select the checkboxes next to the stores you want to start displaying the label in.
7. In the **TRANSLATIONS** pane, update the **NAME** for the needed locales.
8. Click **Save**.
    This refreshes the page with a success message displayed.

## Assign and deassign a product label from products

1. Click the **Products** tab.
2. In the **Available products** subtab, select the checkboxes next to the products you want to assign the label to.
3. In the **Assigned products** subtab, clear the checkboxes next to the products you want to deassign the label from.
4. Click **Save**

    The page refreshes with a success message displayed. The products you've assigned are displayed in the **Assigned products** subtab. The products you've deassigned are not displayed there.

**Tips and tricks**

- When assigning a label to multiple products, it might be useful to switch to the **Selected products to assign** subtab to double-check your selection.
- When deassigning a label from multiple products, it might be useful to switch to the **Selected products to de-assign** subtab to double-check your selection.


## Reference information: Edit product labels

The following table describes the attributes you see, select, or enter while editing product labels.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the product label for the Back Office and Storefront. If you don't specify a locale specific name, this name is used by default on the Storefront.  |
| FRONT-END REFERENCE | Defines the location and design of the product label. By default, the following designs are available: *alternative*, *discontinued*, *top*, *new*, *sale*. |
| PRIORITY | Defines the order in which labels appear on a product card and product details page. The product label with the lowest number has the highest priority. |
| IS DYNAMIC | Defines if this label is [dynamic](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html#dynamic-product-label). Only developers can create dynamic product labels. |
| IS ACTIVE |  Defines if the label is displayed on the Storefront.  |
| VALID FROM and VALID TO | Inclusively defines the time period when the product label is  displayed on the Storefront. If no dates are selected, the label is always displayed. |
| IS EXCLUSIVE | Defines if this product label is to be exclusive. If an exclusive product label is applied to a product, all the other non-exclusive labels assigned to the product are  not displayed on the product card. |
| STORE RELATION | Stores in which a product label is displayed on the Storefront. |
| NAME in the **TRANSLATIONS** pane | Locale specific names that are displayed on the Storefront in respective stores. If you don't specify a locale specific name, the **NAME** from the **GENERAL** pane will be displayed. |
