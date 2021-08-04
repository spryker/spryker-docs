---
title: Creating a product list
originalLink: https://documentation.spryker.com/v6/docs/creating-a-product-list
redirect_from:
  - /v6/docs/creating-a-product-list
  - /v6/docs/en/creating-a-product-list
---

This article describes how to create a product list.

You can consider product lists as conditions under which companies see products in a store. Let's say you want to hide some products, or even a category, from a company you've signed a contract with. You create a blacklist of those products and assign it to the company.

To start working with product lists, go to **Catalog** > **Product Lists**.

***

**To create a product list:**
1. In the top right corner of the *Overview of Product Lists* page, select **+ Create a Product List** .
    The *Create a Product List* page opens.
2. In the *General Information* tab:
    1. For **Title**, enter a product list title.
    2. Select a **Type** of the product list.
3. Optional: In the *Assign Categories* tab, assign categories:
    1. In the **Categories** field, start typing the name of a category to see the list of matching results. Select the desired category.
    2. Repeat the previous step until you assign all the desired categories. 
4. Optional: In the *Assign Products* tab, assign products in one of the following ways:
    *  Import a product list:
        1. Select **Choose File**.
        2. Select the product list file to be uploaded. 
            The file should contain the `product_list_key` and `concrete_sku` fields.

    *  Assign products to the list manually: in the *Selected* column of the *Select Products to assign* table, select the products to add to the list.
 5. Select **Save**.
The page refreshes with the success message displayed. 

**Tips & Tricks**

* When assigning products, you can filter products by entering a product name or SKU in the search field.
* To double-check the list of products that are to be assigned, switch to the **Products to be assigned** table.

{% info_block warningBox "Concrete and abstract products" %}

If you select all the concrete products of an abstract product, the abstract product is selected too. 
If an abstract product is selected, all its concrete products are selected too.

{% endinfo_block %}


***
**What's next?**

* To learn how to manage existing product lists, see the [Managing product lists](https://documentation.spryker.com/docs/managing-product-lists).
* To learn more about the attributes you select and enter while creating a product list, see the [Product lists: reference information](https://documentation.spryker.com/docs/product-lists-reference-information).

