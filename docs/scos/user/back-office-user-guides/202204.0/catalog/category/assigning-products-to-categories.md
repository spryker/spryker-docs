---
title: Assigning products to categories
description: The guide provides instructions on how to assign products to the category in the Back Office.
last_updated: June 15, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/assigning-products-to-categories
originalArticleId: 4c14098e-c5c1-4f63-9957-202bca4a638a
redirect_from:
  - /2021080/docs/assigning-products-to-categories
  - /2021080/docs/en/assigning-products-to-categories
  - /docs/assigning-products-to-categories
  - /docs/en/assigning-products-to-categories
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/category/assigning-products-to-categories.html
related:
  - title: Creating Categories
    link: docs/scos/user/back-office-user-guides/page.version/catalog/category/creating-categories.html
  - title: Managing Categories
    link: docs/scos/user/back-office-user-guides/page.version/catalog/category/managing-categories.html
  - title: Category Management feature overview
    link: docs/scos/user/features/page.version/category-management-feature-overview.html
---

This topic describes how to assign products to categories.

## Prerequisites:

To start creating categories,

Review the reference information before you start, or look up the necessary information as you go through the process.

## Assign and deassign products from categories


. Go to **Catalog&nbsp;<span aria-label="and then">></span> Category**.
    This opens the **Category** page.
. Next to the category you want to assign products to, click **Actions&nbsp;<span aria-label="and then">></span> Assign Products**.
    This opens the **Assign products to category** page.
. On the **Select Products to assign** tab, select the checkboxes next to the products you want to assign.
. On the **Products in this category** tab, clear the checkboxes next to the products you want to deassign.


2. Click **Save**.

**Tips and tricks**
When assigning or deassigning a lot of categories at a time, you can double-check your selection in **Products to be assigned** and **Products to be deassigned** tabs respectively.

## Reference information: Assigning products to categories

| TAB | ATTRIBUTE | DESCRIPTION |
|-|-|-|
| Select Products to assign |   | Stores products that can be assigned to the given category. |
|   | ID | Product ID. |
|   | SKU | Product SKU. |
|   | Name | Product name. |
|   | Selected | Select a checkbox next to a specific product you want to assign to the given category. It will be added to the *Selected products* table of the *Products to be assigned* tab. |
| Products to be assigned |   | Stores products added from the *Select Products to assign* tab, which will be assigned to the category upon clicking **Save**. |
|   | ID | ID of a product to be assigned to the category. |
|   | SKU | SKU of a product to be assigned to the category. |
|   | Name | Name of a product to be assigned to the category. |
|   | Selected | Allows removing products from the Selected products table by clicking **Remove** against a specific product. |
| Products in this category |   | Stores products assigned to the category. |
|   | ID | ID of a product assigned to the category. |
|   | SKU | SKU of a product assigned to the category. |
|   | Name | Name of a product assigned to the category. |
|   | Order | Defines the order in which the products are shown on the Storefront. The order starts from "0". |
|   | Selected | Deselect a checkbox against a specific product you want to exclude from the given category. It is added to the *Products to be deassigned* table of the *Products to be assigned* tab. |
| Products to be deassigned |   | Stores products deselected in Products in this category. Such products will be excluded from the category upon clicking **Save**. |
|   | ID | ID of a product that will be deassigned from the category |
|   | SKU | SKU of a product that will be deassigned from the category |
|   | Name | Name of a product that will be deassigned from the category |
|   | Selected | Allows removing products from the *Products to be deassigned* tab by clicking **Remove** next to products you want to remove. Such products are restored back to the *Products in this category* tab. |

## Next steps

You have assigned products to a category. Now, you can learn how to [manage categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/managing-categories.html).
