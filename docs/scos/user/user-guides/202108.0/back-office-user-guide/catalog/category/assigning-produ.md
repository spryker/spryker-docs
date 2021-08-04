---
title: Assigning products to categories
originalLink: https://documentation.spryker.com/2021080/docs/assigning-products-to-categories
redirect_from:
  - /2021080/docs/assigning-products-to-categories
  - /2021080/docs/en/assigning-products-to-categories
---

This topic describes how to assign products to categories.

## Prerequisites:

To start creating categories, go to Catalog > Category.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Assigning products to categories

There are three ways to assign products to your category:

* Select **Edit** for a specific category, and then on the Edit category page, select **Assign Products** in the top-right corner.
* On the *Categories* table view page, in the *Actions* column, select the **Assign Products** option for a specific category.
*  On the *View Category* page, select **Assign Products**.

There is no difference between how you initiate the flow. In any event, you are redirected to the same page.

To assign one or more products to a category:

1. In the *Select Products to assign* tab, select the checkbox next to the product you want to assign in the *Selected* column.

:::(Info)
 If you need to select all products displayed on the page, select **Select all** at the bottom of the table. If you do not see the needed product on the page, there is no need to navigate through the pages manually. Use the Search field to find your product. You can use either SKU or Name value to find the needed product.
:::
2. Click **Save**.

**Tips & tricks**
If you have assigned too many products to your category, you can remove some of them:

1. On the same *Assign Products* page, scroll down to view the *Products in this category* section.
2. Depending on the number of products you want to exclude from the category, either clear the checkbox in the Selected column for specific products or click **Deselect All** (this will clear all checkboxes for all products on the current page).
3. In the Products to be deassigned tab, review products that will be excluded from the category. To restore one or several products, in the Selected column, click **Remove** next to the products you want to restore.
4. Click **Save**.

### Reference information: Assigning products to categories

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

You have assigned products to a category. Now, you can learn how to [manage categories](https://documentation.spryker.com/docs/managing-categories).
