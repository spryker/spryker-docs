---
title: View product labels
description: The Managing Product Labels section describes the procedures you can use to view, edit, activate and/or deactivate product labels in the Back Office.
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-labels
originalArticleId: 98118a18-5268-42d0-91f0-7b86da390d67
redirect_from:
  - /2021080/docs/managing-product-labels
  - /2021080/docs/en/managing-product-labels
  - /docs/managing-product-labels
  - /docs/en/managing-product-labels
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/product-labels/view-product-labels.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/product-labels/view-product-labels.html
related:
  - title: Create product labels
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html
  - title: Edit product labels
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/product-labels/edit-product-labels.html
  - title: Product Labels feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-labels-feature-overview.html
---

To view a product label, do the following:

1. Go to **Merchandising** > **Product Labels**.
    This opens the **Product Labels** page.
2. Next to the product label you want to view, click **View**.
    This opens the **View Product Label** page.

## Reference information: View product labels

The following table describes the attributes you see, select, or enter while viewing product labels.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Unique identifier of the product label for the Back Office and Storefront. If you don't specify a locale specific name, this name is used by default on the Storefront.  |
| Front-end Reference | Defines the location and design of the product label. |
| Priority | Defines the order in which labels appear on a product card and product details page. The product label with the lowest number has the highest priority. |
| Status |  Defines if the label is displayed on the Storefront.  |
| Valid from and Valid to | Inclusively defines the time period when the product label is displayed on the Storefront. If no dates are selected, the label is always displayed. |
| Is Dynamic | Defines if this label is [dynamic](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-labels-feature-overview.html#dynamic-product-label). |
| Is Exclusive | Defines if this product label is exclusive. If an exclusive product label is applied to a product, all the other non-exclusive labels assigned to the product are not displayed on the product card. |
| Stores | Stores in which a product label is displayed on the Storefront. |
| **Name** in the **TRANSLATIONS** pane | Locale specific names that are displayed on the Storefront in respective stores. If you don't specify a locale specific name, the **NAME** from the **GENERAL** pane will be displayed. |
| APPLIED PRODUCTS | The products to which this product labels is applied. |
