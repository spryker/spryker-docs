---
title: Create product sets
description: Learn how to create product sets in the Back Office
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-product-sets
originalArticleId: 20263bb8-2952-4db2-bde6-1a17a8e76017
redirect_from:
  - /2021080/docs/creating-product-sets
  - /2021080/docs/en/creating-product-sets
  - /docs/creating-product-sets
  - /docs/en/creating-product-sets
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/product-sets/creating-product-sets.html
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/product-sets/create-product-sets.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/product-sets/create-product-sets.html
related:
  - title: Edit product sets
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/product-sets/edit-product-sets.html
  - title: Reorder product sets
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/product-sets/reorder-product-sets.html
  - title: View product sets
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/product-sets/view-product-sets.html
  - title: Delete product sets
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/product-sets/delete-product-sets.html
  - title: Product Sets feature overview
    link: docs/scos/user/features/page.version/product-sets-feature-overview.html
---

This document describes how to create product sets in the Back Office.

You create a product set to improve the customer's shopping experience. You collect similar products into a logical chunk that can be bought with a single click. Let's say you have a pen. The logically connected items to this product can be a pencil, notebook, and sticky notes. You can collect these products under a set named _Basic office supplies_. Instead of searching for each item, your customer will add this set to cart.

## Prerequisites

To start working with product sets, go to **Merchandising&nbsp;<span aria-label="and then">></span> Product Sets**.

Review the [reference information](#reference-information-enter-general-information-for-the-product-set) before you start, or look up the necessary information as you go through the process.

## Create a product set

On the **Product Sets** page, click **Create Product Set** and follow the instructions in the following sections.

### 1. Enter general information for the product set

1. In the **General** tab, enter a **NAME**.
2. Enter a **URL**.
3. Optional: Enter a **DESCRIPTION**.
4. Enter a **PRODUCT SET KEY**.
5. Optional: Enter a **WEIGHT**.
6. To activate the product set after creating it, select **ACTIVE**.
7. Click **Next**.

### 2. Select products to add to the product set

1. In the **Products** tab, select checkboxes next to the products you want to add to the product set. Select at least two products.
2. Select **Next**.

### 3. Enter SEO information for the product set

1. On the **SEO** tab, enter the following for needed locales:
    * **TITLE**
    * **KEYWORDS**
    * **DESCRIPTION**
2. Click **Next**.

### 4. Add images for the product set

{% include scos/user/back-office-user-guides/add-images.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/add-images.md -->

    This opens the **View Product Set** page with a success message displayed.

## Reference information: Enter general information for the product set

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| NAME | Unique identifier of the product set that will be displayed on the Storefront. |
| URL | A relative URL address of the product set. When entering multi-word URLs, use hyphens and dashes.|
| DESCRIPTION | This description will be displayed on the Storefront for the product set. |
| PRODUCT SET KEY | Unique identifier of the product set for adding to [CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-pages-overview.html). When entering a multi-word key, use underscores and dashes instead of spaces. |
| WEIGHT | A number that will define the position of the product set on a page relatively to the weight value of the other product sets. A product set with a bigger weight is displayed higher on a page. |
| ACTIVE | Defines if the product set is to be activated after you create it. You can activate it later any time. |

## Reference information: Enter SEO information for the product set

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| TITLE | SEO title for the product set. |
| KEYWORDS| SEO keywords. |
| DESCRIPTION | SEO description.  |

## Reference information: Add images for the product set

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| IMAGE SET NAME | Image set name. For a multi-word name, instead of spaces, use dashes and underscores. |
| Small Image URL | A public URL to fetch a low-resolution image from. |
| Large Image URL | A public URL to fetch a high-resolution image from. |
| SORT ORDER | A number that will define the position of the image on a page relatively to the sort order value of the other images. An image with a smaller sort order value is displayed higher on a page. |
