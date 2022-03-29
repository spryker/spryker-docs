---
title: Creating warehouses
description: Use the procedure to create warehouses and define warehouses per specific stores in the Back Office.
last_updated: Aug 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-warehouse
originalArticleId: 4c157a54-6b6e-43d1-abb9-23b8a88fed8c
redirect_from:
  - /2021080/docs/creating-a-warehouse
  - /2021080/docs/en/creating-a-warehouse
  - /docs/creating-a-warehouse
  - /docs/en/creating-a-warehouse
---

The topic describes how to create warehouses in the Back Office.

## Prerequisites

To start working with warehouses, go to **Administration** > **Warehouses**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating warehouses

To create a warehouse:

1. On the *Warehouses* page, in the top right corner, click **Create Warehouse**.
The *Create warehouse* page with two tabs opens: *Configuration* and *Store relation*.
2. In the *Configuration* tab, do the following:
    * **Name**: Enter the name of the warehouse you want to create.
    * **Is this warehouse available?**: Select *Yes* if you want to make your warehouse available (active) or *No* if you want to make your warehouse unavailable (inactive).
3. (optional) Switch to the *Store relation* tab. By default, the warehouse you are creating will be available for all the stores you have.
To make your warehouse unavailable for specific store, clear the checkbox for those stores.

{% info_block warningBox "Note" %}

If you clear all checkboxes for stores assigned to a specific warehouse, this warehouse won't appear on the *Edit Stock* page.

{% endinfo_block %}

4. To keep the changes, click **Save**. This redirects you to the *Warehouses* page where you can see the new warehouse in the table and the following message: '*Warehouse has been successfully saved*'.

## Reference information: Creating warehouses

The following table describes the attributes you see and enter when creating, viewing, or editing a warehouse.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of the warehouse. |
| Is this warehouse available? | *Yes*—the warehouse is active.<br>*No*—the warehouse is inactive. |
| Store relation | Stores in which the warehouse is available. |

## What's next?

The warehouse has been created. You can start working with it when creating or editing a concrete product. For more details, see [Creating a product variant](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html).

Additionally, you can edit any warehouse. For more details, see the [Editing warehouse details](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/managing-warehouses.html#editing-warehouse-details) section in *Managing Warehouses*.

To learn how to manage stock per specific warehouse, see [Managing product availability](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html).
