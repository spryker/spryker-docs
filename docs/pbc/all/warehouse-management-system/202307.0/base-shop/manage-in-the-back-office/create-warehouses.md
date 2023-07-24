---
title: Create warehouses
description: Learn how to create warehouses in the Back Office.
last_updated: May 28, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-warehouse
originalArticleId: 4c157a54-6b6e-43d1-abb9-23b8a88fed8c
redirect_from:
  - /2021080/docs/creating-a-warehouse
  - /2021080/docs/en/creating-a-warehouse
  - /docs/creating-a-warehouse
  - /docs/en/creating-a-warehouse
  - /docs/scos/user/back-office-user-guides/201811.0/administration/warehouses/creating-warehouses.html
  - /docs/scos/user/back-office-user-guides/201903.0/administration/warehouses/creating-warehouses.html
  - /docs/scos/user/user-guides/201811.0/back-office-user-guide/administration/warehouses/creating-warehouses.html
  - /docs/scos/user/user-guides/201903.0/back-office-user-guide/administration/warehouses/creating-warehouses.html
  - /docs/scos/user/user-guides/201907.0/back-office-user-guide/administration/warehouses/creating-warehouses.html
  - /docs/scos/user/back-office-user-guides/201907.0/administration/warehouses/creating-warehouses.html
  - /docs/scos/user/back-office-user-guides/202307.0/administration/warehouses/creating-warehouses.html
  - /docs/pbc/all/warehouse-management-system/manage-in-the-back-office/create-warehouses.html
related:
  - title: Inventory Management feature overview
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/inventory-management-feature-overview.html
---

The document describes how to create warehouses in the Back Office.

## Prerequisites

To start working with warehouses, go to **Administration&nbsp;<span aria-label="and then">></span> Warehouses**.

Review the [reference information](#reference-information-create-warehouses) before you start, or look up the necessary information as you go through the process.

## Create a warehouse

1. On the **Warehouses** page, click **Create Warehouse**.
    This opens the **Create Warehouse** page.
2. On the **Configuration** tab, enter a **NAME**.
3. To activate the warehouse after creating it, for **IS THIS WAREHOUSE AVAILABLE?**, select **Yes**.
4. Click the **Store Relation** tab.
5. Select the stores to make the warehouse available in.

{% info_block warningBox "Note" %}

If you clear all checkboxes for stores assigned to a specific warehouse, this warehouse won't appear on the *Edit Stock* page.

{% endinfo_block %}

6. Click **Save**.

    This opens the **Warehouses** page with a success message displayed. The create warehouse is displayed in the table.

## Reference information: Create warehouses

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Name. |
| IS THIS WAREHOUSE AVAILABLE? | Defines if customers will be able see and interact with the warehouse on the Storefront. |
| AVAILABLE IN THE FOLLOWING STORE(S) | Stores in which the warehouse will be available. |

## Next steps

The warehouse has been created. You can start working with it when creating or editing a concrete product. For more details, see [Creating a product variant](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html).

Additionally, you can [edit a warehouse](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/edit-warehouses.html). For more details, see the [Editing warehouse details]

To learn how to manage stock per specific warehouse, see [Edit stock of products and product bundles](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/edit-stock-of-products-and-product-bundles.html).
