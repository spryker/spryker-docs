---
title: Edit product sets
description: Learn how to edit product sets in the Back Office.
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-sets
originalArticleId: eaa91090-6e3e-4af1-bc98-f9bae069939a
redirect_from:
  - /2021080/docs/managing-product-sets
  - /2021080/docs/en/managing-product-sets
  - /docs/managing-product-sets
  - /docs/en/managing-product-sets
  - /docs/scos/user/back-office-user-guides/202108.0/merchandising/product-sets/managing-product-sets.html
---

This document describes how to edit product sets in the Back Office.

## Prerequisites

To start editing a product set, do the following:
1. Go to **Merchandising** > **Product Sets**.
2. Next to the product set you want to edit, click **Edit**.

Some section below contain reference information. Review it before you start or look up the necessary information as you go through the process.

## Edit general information of a product set

1. Click the **General** tab.
2. Update any of the following for the needed locales:
    * **NAME**
    * **URL**
    * **DESCRIPTION**
3. Update **PRODUCT SET KEY**.
4. Update **WEIGHT**.
5. To activate the product set, select the **ACTIVE** checkbox.
6. To deactivate the product set, clear the **ACTIVE** checkbox.
7. Click **Save**.
    This opens the **View Product Set** page with a success message displayed.

## Reference information: Edit general information of a product set

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| NAME | Unique identifier of the product set that is displayed on the Storefront. |
| URL | A relative URL address of the product set. When entering multi-word URLs, use hyphens and dashes.|
| DESCRIPTION | This description is displayed on the Storefront for the product set. |
| PRODUCT SET KEY | Unique identifier of the product set for adding to [CMS pages](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-overview.html). When entering a multi-word key, use underscores and dashes instead of spaces. |
| WEIGHT | Defines the position of the product set on a page relatively to the weight value of the other product sets. A product set with a bigger weight is displayed higher on a page. |
| ACTIVE | Defines if the product set is displayed on the Storefront. |    

## Assign products to a product set

1. Click the **Products** tab.
2. In the **Select Products to assign** sub-tab, select the products you want to assign.
3. Click **Save**.
    This opens the **View Product Set** page with a success message displayed. The products you've assigned are displayed in the **Products** pane.

## Deassign products from a product set

1. Click the **Products** tab.
2. In the **Products in this Set** sub-tab, clear the checkboxes next to the products you want to deassign.
3. Click **Save**.
    This opens the **View Product Set** page with a success message displayed. The products you've deassigned are not displayed in the **Products** pane.

## Edit SEO information of a product set

1. Click the **SEO** tab.
2. Update any of the following for the needed locales:
    * **TITLE**
    * **KEYWORDS**
    * **DESCRIPTION**
3. Click **Save**.
    This opens the **View Product Set** page with a success message displayed. The updated information is displayed in the **SEO** pane.      

## Reference information: Edit SEO information of a product set

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| TITLE | SEO title of the product set. |
| KEYWORDS| SEO keywords. |
| DESCRIPTION | SEO description.  |


## Edit images of a product set

Click the **Images** tab and do any of the following for the needed locales.

### Update existing images

* Update an **IMAGE SET NAME**.
* To update an image, update the following:
    * **SMALL IMAGE URL**
    * **LARGE IMAGE URL**
    * **SORT ORDER**
* To delete an image from an image set, below the image you want to delete, click **Delete image**.
    This removes the image and its fields from the page.

### Add images to an image set

1. In the page on the image set you want to add images to, click **Add image**.
    This adds a set of fields for the new image.
2. Enter a **SMALL IMAGE URL**.
3. Enter a **LARGE IMAGE URL**.
4. Enter a **SORT ORDER**.    
5. Repeat steps 1-4 until you add all the needed images.

### Add image sets


1. Click **Add image set**.
    This opens an **Image Set:** pane.
2. Enter an **IMAGE SET NAME**.
3. Enter a **SMALL IMAGE URL**.
4. Enter a **LARGE IMAGE URL**.
5. Optional: Enter a **SORT ORDER**.
6. Optional: To add one more image, click **Add image**.
7. Repeat steps 9-13 until you add all the needed images.
8. Optional: To add one more image set, click **Add image set**.
9. Repeat steps 9-15 until you add all the needed image sets.


## Reference information: Edit images of a product set

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| IMAGE SET NAME | Internal unique identifier of an image set. For a multi-word name, instead of spaces, use dashes and underscores. |
| SMALL IMAGE URL | A public URL to fetch a low-resolution image from. |
| LARGE IMAGE URL | A public URL to fetch a high-resolution image from. |
| SORT ORDER | A number that defines the position of the image on a page relatively to the sort order value of the other images. An image with a smaller sort order value is displayed higher on a page. |
