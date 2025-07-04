---
title: Edit product relations
description: Learn how to edit product relations in the Spryker Cloud Commerce OS Back Office.
template: back-office-user-guide-template
last_updated: Nov 21, 2023
related:
  - title: Create product relations
    link: docs/pbc/all/product-relationship-management/page.version/manage-in-the-back-office/create-product-relations.html
  - title: View product relations
    link: docs/pbc/all/product-relationship-management/page.version/manage-in-the-back-office/view-product-relations.html
  - title: Product Relations feature overview
    link: docs/pbc/all/product-relationship-management/page.version/product-relationship-management.html
redirect_from:
- /docs/scos/user/back-office-user-guides/202204.0/merchandising/product-relations/edit-product-relations.html
---

This document describes how to edit product relations in the Back Office.

## Prerequisites

1. If you are new to product relations, you might want to start with [Best practices: Promote products with product relations](/docs/pbc/all/product-relationship-management/latest/manage-in-the-back-office/best-practices-promote-products-with-product-relations.html).
2. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Product Relations**.
    This opens the **Product Relations** page.
3. Next to the product relation you want to edit, click **Edit**.
    This opens the **Edit Product Relation** page.

Review the [reference information](#reference-information-edit-product-relations) before you start, or look up the necessary information as you go through the process.

## Edit general information of a product relation

1. Click the **Settings** tab and do any of the following:
    - Select a **RELATION TYPE**.
    - Select or clear the **UPDATE REGULARLY** checkbox.
    - Select or clear the **IS ACTIVE** checkbox.
    - In the **Product owning the relation** pane, next to the product you want to own the relation, click **Select**.
        This shows the product for **Selected product**.
    - In the **Store relation** pane, select or clear the checkboxes next to the stores you want to start or stop displaying the product relation in.
2. Click **Save**.
    This refreshes the page with a success message displayed.

## Edit condition rules of a product relation

1. Click the **Products** tab and do any of the following:
    - To add a rule, do the following:
        1. Click **Add rule**.
        2. Select a parameter.
        3. Select a relation operator.
        4. Select a value.
    - To delete a rule, next to the rule you want to delete, click **Delete**
    - To add a rule group, click **Add group**.
    - To delete a rule group, in the top-right corner of the group you want to delete, click **Delete**.
2. Click **Save**.
    This refreshes the page with a success message displayed.


## Reference information: Edit product relations

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| PRODUCT RELATION KEY | Unique product relation identifier. |
| RELATION TYPE | Defines how the product relation is displayed on the Storefront: <ul><li>**Related products**: related products are displayed on the product details page of the product owning the relation.</li><li>**Upselling**: when the product owning the relation is added to cart, related products are displayed on the cart page.</li></ul>|
| UPDATE REGULARLY  | Defines if the product catalog is checked against the specified rules regularly. New products fulfilling the rules are added to related products automatically. Existing related products that no longer fulfill the rules are removed automatically. |
| IS ACTIVE | Defines if the product relation is visible on the Storefront. |
| Select product | Table for selecting a product that owns the relation. |
| SELECT STORES | Defines the stores the product relation is displayed in. |
