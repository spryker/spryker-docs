---
title: Edit marketplace concrete products
last_updated: Sep 24, 2024
description: Learn how to edit concrete products in the Merchant Portal.
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/product-information-management/202404.0/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products.html
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Inventory Management feature overview
    link: docs/pbc/all/warehouse-management-system/page.version/marketplace/marketplace-inventory-management-feature-overview.html
---

This document describes how to edit concrete products in the Merchant Portal.


## Edit a concrete product

1. In the Merchant Portal, go to **Products**.
2. On the **Products** page, select the abstract product that owns the concrete product you want to edit.
  This opens the pane with the abstract product's details.
3. Click the **Concrete Products** tab.
  In this tab, you can search, filter, and sort concrete products.
4. Select the concrete product to edit.
  This opens the pane with the concrete product's details.
5. Update the needed fields.
  For information on the fields, see [Reference information: Edit concrete products](#reference-information-edit-concrete-products).
6. To save the changes, click **Save**.
  This closes the pane and shows a success message.

## Edit multiple concrete products in bulk

Editing concrete products in bulk lets you change the status and validity period for multiple products simultaneously. To edit in bulk follow the steps:

1. In the Merchant Portal, go to **Products**.
2. On the **Products** page, select the abstract product that owns the concrete product you want to edit.
  This opens the pane with the abstract product's details.
3. Click the **Concrete Products** tab.
  In this tab, you can search, filter, and sort concrete products.
4. Select the checkboxes next to the concrete products to edit.
  This shows the number of products selected and the bulk edit button.
5. Click **Bulk edit**.
  This opens the bulk editing pane.
6. Select the checkboxes next to the fields you want to update for the products.
7. Update the needed fields.
8. To save the changes, click **Save**.
  This closes the pane and shows a success message with the number of products updated.

## Reference information: Edit concrete products

| SECTION    | ATTRIBUTE     | DESCRIPTION | REQUIRED |
| -------------- | ---------------- | ----------- | --------- |
| Status         |                  | Defines if the product is available on the Storefront. |           |
| Stock          |                  | Number of items available for purchase. |           |
|                 |   Reserved Stock           | Number of items that are reserved according to **Orders**. |               |
|                  |  Quantity                 | Number of items available in the warehouse. The default is 0. | ✓ |
|                  |  Always in Stock           | Makes the product always available for purchase. |               |
| Name                  |  | This name is displayed on the Storefront. | ✓ |
|               |  Use Abstract Product name for all locales   | Inherits the name of the abstract product for all locales of the concrete product. Unselect to define names for the concrete product per locale. |              |
| Description           |  | This description is displayed on the Storefront. |           |
|              |  Use Abstract Product description for all locales.    | Inherits the description of the abstract product for all locales of the concrete product. Unselect to define descriptions for the concrete product per locale. |       |
| Validity Dates & Time |  | Time period during which the product is active. |           |
| Price                 |  | To define prices, see [Managing marketplace concrete product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage marketplace-concrete-product-prices.html) for more details. |           |
| Images                |  | To add images, see [Managing concrete product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products-image-sets.html) for more details. |           |
| Attributes            |  | To add attributes, see [Managing concrete product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-attributes.html) for more details. |           |
| Searchability         |  | Defines if the product is displayed in the search results on the Storefront. |           |



## Next steps

- [Manage concrete product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-prices.html)
- [Manage concrete product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products-image-sets.html)
- [Manage concrete product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-attributes.html)
