---
title: Managing product lists
description: Use these procedures to edit, export, remove a product list or remove products from the product list in the Back Office.
last_updated: Aug 11, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-lists
originalArticleId: 18628b05-d26f-469a-a201-d74c1a235cf8
redirect_from:
  - /2021080/docs/managing-product-lists
  - /2021080/docs/en/managing-product-lists
  - /docs/managing-product-lists
  - /docs/en/managing-product-lists
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/product-lists/managing-product-lists.html
---

This doc describes how to edit product lists in the Back Office.

## Prerequisistes

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Product Lists**.
2. Next to the product list you want to edit, click **Edit List**.


## Edit general settings of a product list

1. On the **Edit Product List: {product list ID}** page, click the **General Information** tab.
2. Enter a **TITLE**
3. Select a **TYPE**.
4. Click **Save**.
    The page refreshes with the success message displayed.

{% info_block warningBox "Blacklists in configurable bundles" %}

If a product list is used by a [configurable bundle](/docs/scos/user/features/{{page.version}}/configurable-bundle-feature-overview.html) and its type is changed to **Blacklist**, it stops being displayed for the [configurable bundle slot](/docs/scos/user/features/{{page.version}}/configurable-bundle-feature-overview.html#configurable-bundle-slot) on the Storefront. To check if a product list is used by a configurable bundle, on the *Edit Product List: {product list ID}* page, switch to the *Used by* tab.

{% endinfo_block %}

## Assign and deassign categories from a product list

1. On the **Edit Product List: {product list ID}**  page, click the **Assign Categories** tab.
2. For **CATEGORIES** do any of the following:
    * Enter and select one or more categories.
    * Next to the categories you want to deassign, click **x**.
3. Select **Save**.
    The page refreshes with the success message displayed.

## Assign and deassign products from a product list

1. On the **Edit Product List: {product list ID}**  page, click the **Assign Products** tab.
2. On the **Select Products to assign** subtab, select the products you want to assign.
3. On the **Products in the list** subtab, select the products you want to deassign.
4. Select **Save**.
    The page refreshes with the success message displayed.








**Tips and tricks**
<br>To double-check the list of products that are to be assigned, switch to the *Products to be assigned* tab.



**Tips and tricks**
<br>To double-check the list of products that are to be deassigned, switch to the *Products to be deassigned* tab.

## Exporting a product list

To export a product list:

1. Select **Edit List** next to the product list you want to export.
2. On the *Edit Product List: {product list ID}* page, select **► Export**.
    The list is exported as a CSV file.

## Removing a product list

To remove a product list:
1. Select **Remove List** next to the product list you want to remove.
    The *Product List was successfully removed* page opens.
2. To confirm the deletion, select **Remove List**.
    The *Overview of Product lists* page opens with the success message displayed.

**What's next?**
<br>See the reference information of the [Creating a product list](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/creating-product-lists.html) guide to learn about the attributes you see, select, and enter while managing a product list.
