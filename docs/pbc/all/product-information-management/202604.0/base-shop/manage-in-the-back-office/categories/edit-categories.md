---
title: Edit categories
description: Learn how to edit categories directly in the Spryker Cloud Commerce OS Back Office.
last_updated: June 15, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-categories
originalArticleId: 93beba2a-596a-46ca-8933-c88ad105d1c7
redirect_from:
  - /docs/scos/user/back-office-user-guides/202108.0/catalog/category/managing-categories.html
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/category/managing-categories.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/category/managing-categories.html  
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/categories/edit-categories.html
related:
  - title: Category Management feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/category-management-feature-overview.html
---

This doc describes how to edit categories in the Back Office.

## Prerequisites

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Categories**.
    This opens the **Category** page.
2. Next to the category you want to edit, click **Actions&nbsp;<span aria-label="and then">></span> Edit**.

## Edit general settings of a category

1. On the **Edit category** page, click the **Settings** tab.
2. Enter a **CATEGORY KEY**.
3. For **PARENT**, select a parent category.
4. For **ADDITIONAL PARENTS**, do any of the following:
    - Select one or more additional parent categories.
    - Next to the parent categories you want to deassign this category from, click **x**.
5. For **STORES**, do any of the following:
    - Select one or more stores.
    - Next to the stores you want to remove this category from, click **x**.  
6. Select a **TEMPLATE**.
7. Select or clear the following checkboxes:
    - ACTIVE
    - VISIBLE IN THE CATEGORY TREE
    - ALLOW TO SEARCH FOR THIS CATEGORY
8. In the **Translations** section, enter a **NAME** for needed locales.
9. Enter any of the following for needed locales:
    - **META TITLE**
    - **META DESCRIPTION**
    - **META KEYWORDS**
10. Click **Save**.

This refreshes the page with a success message displayed.

### Reference information: Define general settings of a category

| ATTRIBUTE | DESCRIPTION |
|-|-|
| CATEGORY KEY | Unique identifier of the category that is used for assigning products and CMS blocks to the categories through the import. |
| PARENT | Defines under which category this category is displayed on the Storefront. |
| ADDITIONAL PARENTS | Defines under which categories, apart from the category defined in **PARENT**, the category is displayed on the Storefront.  |
| STORES | Stores which the category is displayed in.  |
| TEMPLATE | Defines how the category's page looks on the Storefront. For more information, see [Reference information: TEMPLATE](#reference-information-template) |
| ACTIVE | Defines if the category is displayed on the Storefront. |
| VISIBLE IN THE CATEGORY TREE | Defines if the category is displayed in the category tree on the Storefront. |
| ALLOW TO SEARCH FOR THIS CATEGORY | Defines if customers can find the category on the Storefront using search. |
| NAME | Name that is displayed on the Storefront. |
| META TITLE | SEO title. |
| META DESCRIPTION | SEO description. |
| META KEYWORDS | SEO keywords. |

## Update images of a category

On the **Edit category** page, click the **Images** tab and do any of the following for needed locales.

{% include scos/user/back-office-user-guides/update-images.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/update-images.md -->

### Reference information: Update images of a category

| ATTRIBUTE | DESCRIPTION |
|-|-|
| IMAGE SET NAME | Name of the image set that is displayed only in the Back Office. |
| SMALL IMAGE URL | URL to the small version of the image. This image is displayed when categories are sorted as a list. |
| LARGE IMAGE URL | URL to the large version of the image. This image is displayed when categories are sorted as a grid. |
| SORT ORDER | When displayed together with other images, defines the order of images in an ascending order. The minimum value is `0`. |


## Reference information: TEMPLATE

{% include scos/user/back-office-user-guides/catalog/category/reference-information-template.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/catalog/category/reference-information-template.md -->
