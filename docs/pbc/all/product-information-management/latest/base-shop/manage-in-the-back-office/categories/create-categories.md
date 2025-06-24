---
title: Create categories
description: Learn how to create categories so you can organize products in the Spryker Cloud Commerce OS Back Office.
last_updated: June 15, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-categories
originalArticleId: b0f46c55-2786-4ab2-acee-594502fff3e1
redirect_from:
  - /2021080/docs/creating-categories
  - /2021080/docs/en/creating-categories
  - /docs/creating-categories
  - /docs/en/creating-categories
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/category/creating-categories.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/category/creating-categories.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/categories/create-categories.html

related:
  - title: Assigning Products to Categories
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/categories/assign-products-to-categories.html
  - title: Category Management feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/category-management-feature-overview.html
---

To create a category in the Back Office, follow the steps below.

## Define general settings of a category

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Categories**.
2. On the **Category** page, click **Create category**.
3. On the **Create category** page, enter a **CATEGORY KEY**.
4. For **PARENT**, select a parent category.
5. Select one or more **ADDITIONAL PARENTS**.
6. Select one or more **STORES**.
7. Select a **TEMPLATE**.
8. Optional: To activate the the category after creating, select **ACTIVE**.
9. Optional: To show the category on the Storefront, select **VISIBLE IN THE CATEGORY TREE**.
10. Optional: To make the category searchable on the Storefront, select **ALLOW TO SEARCH FOR THIS CATEGORY**.
11. In the **Translations** section, enter a **NAME** for each locale.
12. Optional: Enter any of the following for needed locales:
    - **META TITLE**
    - **META DESCRIPTION**
    - **META KEYWORDS**

13. Click **Next** and follow [Add images to a category](#add-images-to-a-category).

## Reference information: Define general settings of a category

| ATTRIBUTE | DESCRIPTION |
|-|-|
| CATEGORY KEY | Unique identifier of the category that is used for assigning products and CMS blocks to the categories through the import. |
| PARENT | Defines under which category this category will be displayed on the Storefront. |
| ADDITIONAL PARENTS | Defines under which categories, apart from the category defined in **PARENT**, the category will be displayed on the Storefront.  |
| STORES | Stores which the category will be displayed in.  |
| TEMPLATE | Defines how the category's page will look on the Storefront. For more information, see [Reference information: TEMPLATE](#reference-information-template) |
| ACTIVE | Defines if the category is to be displayed on the Storefront. |
| VISIBLE IN THE CATEGORY TREE | Defines if the category is to be displayed in the category tree on the Storefront. |
| ALLOW TO SEARCH FOR THIS CATEGORY | Defines if customers can find the category on the Storefront using search. |
| NAME | Name that is displayed on the Storefront. |
| META TITLE | SEO title. |
| META DESCRIPTION | SEO description. |
| META KEYWORDS | SEO keywords. |

## Add images to a category

{% include scos/user/back-office-user-guides/add-images.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/add-images.md -->

This opens the **Edit category** page with a success message displayed.


{% info_block infoBox "Adding multiple images" %}

You can add multiple image sets and multiple images to an image set. However, by default, in the Back Office and on the Storefront, multiple images are not displayed for categories. If there are multiple image sets or images for a category, the image displayed is defined as follows:
- The image set going first or named `default` is displayed.
- The image with the lowest **SORT ORDER** is displayed. If several images have the same **SORT ORDER**, the image going first is displayed.

{% endinfo_block %}



## Reference information: Add images to a category

| ATTRIBUTE | DESCRIPTION |
|-|-|
| IMAGE SET NAME | Name of the image set for you to use in the Back Office. |
| SMALL IMAGE URL | URL to the small version of the image. This image will be displayed when categories are sorted as a list. |
| LARGE IMAGE URL | URL to the large version of the image. This image will be displayed when categories are sorted as a grid. |
| SORT ORDER | When displayed together with other images, defines the order of images in an ascending order. The minimum value is `0`. |


## Reference information: TEMPLATE

{% include scos/user/back-office-user-guides/catalog/category/reference-information-template.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/catalog/category/reference-information-template.md -->


## Next Steps

[Assign product to categories](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/categories/assign-products-to-categories.html)
