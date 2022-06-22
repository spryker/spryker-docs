---
title: Creating product lists
description: Use the procedure to create a product list by assigning products and selecting the category in the Back Office.
last_updated: Aug 11, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-product-list
originalArticleId: e7682701-b572-4934-9422-2a95d31610a1
redirect_from:
  - /2021080/docs/creating-a-product-list
  - /2021080/docs/en/creating-a-product-list
  - /docs/creating-a-product-list
  - /docs/en/creating-a-product-list
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/product-lists/creating-product-lists.html
---

This article describes how to create a product list.

You can consider product lists as conditions under which companies see products in a store. Let's say you want to hide some products, or even a category, from a company you've signed a contract with. You create a blacklist of those products and assign it to the company.

## Create a product list

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Product Lists**.
2. On the **Overview of Product Lists** page, click **Create a Product List**.
3. On the **Create a Product List** page, enter a **TITLE**.
4. Select a **TYPE**.
5. Click **Save**.
    The page refreshes with a success message displayed.


## Reference information: Create product lists

| ATTRIBUTE | DESCRIPTION |
|-|-|
| TITLE | Name that you will use for identifying the list in the Back Office. |
| TYPE | Defines whether a company will be able to see the products in the list. |

## Next steps












Click the **Assign Categories** tab.
6. Enter and select one or more **CATEGORIES**.
7.
    1. In **Title**, enter a product list title.
    2. Select a type of the product list.
3. Optional: In the *Assign Categories* tab, assign categories:
    1. In the **Categories** field, type the name of a category to see the list of matching results and select the desired category.
    2. Repeat the previous step until you assign all the desired categories.
4. Optional: In the *Assign Products* tab, assign products in one of the following ways:
    *  Import a product list:
        1. Select **Choose File**.
        2. Select the product list file to be uploaded. The file should contain the `product_list_key` and `concrete_sku` fields.
    *  Assign products to the list manually: in the *Selected* column of the *Select Products to assign* table, select the products to add to the list.
 5. Select **Save**. The page refreshes with the success message displayed.

**Tips and tricks**

* To double-check the list of products that are to be assigned, switch to the **Products to be assigned** table.



### Reference information: Creating product lists

TITLE




**What's next?**

* To learn how to manage existing product lists, see the [Managing product lists](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/managing-product-lists.html).
