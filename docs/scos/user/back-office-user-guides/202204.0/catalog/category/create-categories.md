---
title: Create categories
description: Learn how to create categories in the Back Office.
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
  - /docs/scos/user/back-office-user-guides/202204.0/catalog/category/creating-categories.html

related:
  - title: Assigning Products to Categories
    link: docs/scos/user/back-office-user-guides/page.version/catalog/category/assigning-products-to-categories.html
  - title: Managing Categories
    link: docs/scos/user/back-office-user-guides/page.version/catalog/category/managing-categories.html
  - title: Category Management feature overview
    link: docs/scos/user/features/page.version/category-management-feature-overview.html
---

This topic describes how to create categories.

## Prerequisites

Review the [reference information] before you start, or look up the necessary information as you go through the process.


## Define general settings of a category

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Categories**
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
    * **META TITLE**
    * **META DESCRIPTION**
    * **META KEYWORDS**

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

1. On the **Images** tab, do the following for the needed locales:
    1. click **Add image set**.
    2. Enter an **IMAGE SET NAME**.
    3. Enter a **SMALL IMAGE URL**.
    4. Enter a **LARGE IMAGE URL**.
    5. Optional: Enter a **SORT ORDER**.
    6. Optional: To add one more image, click **Add image**.
    7. Repeat steps 3-6 until you add all the needed images.
    8. Optional: To add one more image set, click **Add image set**.
    9. Repeat steps 2-8 until you add all the needed image sets.
2. Click **Save**.   
    This opens the **Edit category** page with a success message displayed.


{% info_block infoBox "Adding multiple images" %}

You can add multiple image sets and multiple images to an image set. However, by default, in the Back Office and on the Storefront, multiple images are not displayed for categories. If there are multiple image sets or images for a category, the image displayed is defined as follows:
  * The image set going first or named `default` is displayed.
  * The image with the lowest **SORT ORDER** is displayed. If several images have the same **SORT ORDER**, the image going first is displayed.

{% endinfo_block %}



## Reference information: Add images to a category

| ATTRIBUTE | DESCRIPTION |
|-|-|
| IMAGE SET NAME | Name of the image set for you to use in the Back Office. |
| SMALL IMAGE URL | URL to the small version of the image. This image will be displayed when categories are sorted as a grid. |
| LARGE IMAGE URL | URL to the large version of the image. This image will be displayed when categories are sorted as a grid. |
| SORT ORDER | When displayed together with other images, defines the order Numeric identifier of the image in the order of other images of an image set. This defines the order in which the images are shown in the back end and front end. The order starts from "0". |


## Reference information: TEMPLATE

The following category templates are available by default:

**Catalog (default)**
Displays the products in the category.

<details><summary markdown='span'>The Catalog(default) template on the Storefront</summary>

![Catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/Catalog.gif)

</details>

**Catalog + CMS Slot**
Displays the products in the category and the content of the template's CMS slots. To learn how to add content to the slots, see [Best practices: Adding content to the Storefront pages using templates and slots](/docs/scos/user/back-office-user-guides/{{page.version}}/content/best-practices-adding-content-to-the-storefront-pages-using-templates-and-slots.html).

<details><summary markdown='span'>The Catalog+CMS Block template on the Storefront</summary>

![Catalog + Slots](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/Catalog%2BCms+Block.gif)

</details>

**Sub Categories grid**
Displays the subcategories of the category.

<details><summary markdown='span'>The Sub Category grid template on the Storefront</summary>

![Sub Category grid](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category:+Reference+Information/sub+category.gif)

</details>

## Next Steps

[Assign product to categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/assigning-products-to-categories.html)
