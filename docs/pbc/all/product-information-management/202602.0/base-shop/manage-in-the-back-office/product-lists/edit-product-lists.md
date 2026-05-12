---
title: Edit product lists
description: Learn how to edit product lists directly in the Spryker Cloud Commerce OS Back Office.
last_updated: June 22, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-lists
originalArticleId: 18628b05-d26f-469a-a201-d74c1a235cf8
redirect_from:
  - /docs/scos/user/back-office-user-guides/202108.0/catalog/product-lists/managing-product-lists.html
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/product-lists/managing-product-lists.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/product-lists/managing-product-lists.html 
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/product-lists/edit-product-lists.html 
---

This doc describes how to edit product lists in the Back Office.

## Prerequisites

- If you want to assign categories to a product list, [create the categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/create-categories.html).
- If you want to assign or import products for a product list, [create the products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html).
- To start editing product lists, follow the steps:
    1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Product Lists**.
    2. Next to the product list you want to edit, click **Edit List**.


## Edit general settings of a product list

1. On the **Edit Product List: {product list ID}** page, click the **General Information** tab.
2. Enter a **TITLE**
3. Select a **TYPE**.
4. Click **Save**.
    The page refreshes with the success message displayed.

{% info_block warningBox "Blacklists in configurable bundles" %}

If a product list is used by a [configurable bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) and its type is changed to **Blacklist**, it stops being displayed for the [configurable bundle slot](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html#configurable-bundle-slot) on the Storefront. To check if a product list is used by a configurable bundle, on the *Edit Product List: {product list ID}* page, switch to the *Used by* tab.

{% endinfo_block %}

### Reference information: Edit general settings of a product list

| ATTRIBUTE | DESCRIPTION |
|-|-|
| TITLE | Name that you will use for identifying the list in the Back Office. |
| TYPE | Defines whether a company will be able to see the products in the list. |

## Assign and deassign categories from a product list

1. On the **Edit Product List: {product list ID}**  page, click the **Assign Categories** tab.
2. For **CATEGORIES** do any of the following:
    - Enter and select one or more categories.
    - Next to the categories you want to deassign, click **x**.
3. Select **Save**.
    The page refreshes with the success message displayed.

## Assign and deassign products from a product list

1. On the **Edit Product List: {product list ID}**  page, click the **Assign Products** tab.
2. On the **Select Products to assign** subtab, select the products you want to assign.
3. On the **Products in the list** subtab, select the products you want to deassign.
4. Select **Save**.
    The page refreshes with the success message displayed.


**Tips and tricks**
<br> When assigning or deassigning a lot of products at a time, it might be useful to double-check your selection in the **Products to be assigned** and **Products to be deassigned** tabs respectively.

## Import products for a product list

{% info_block warningBox "" %}

If products are already assigned to a list, and you import products, the existing ones will be overwritten with the imported ones.

{% endinfo_block %}

1. On the **Edit Product List: {product list ID}**  page, click the **Assign Products** tab.
2. Click **Choose File**.
3. Select the file with the list you want to import.
    To learn about the format of the file, see ["Import file details: content_product_abstract_list.csv"](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-abstract-list.csv.html).
4. Click **Save**.
    The page refreshes with a success message displayed. The list is displayed in the **Products in the list** subtab.



## Export a product list

On the **Edit Product List: {product list ID}** page, click **Export**.
    The list is exported as a CSV file.
