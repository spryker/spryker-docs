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
  - /docs/scos/user/back-office-user-guides/202108.0/merchandising/product-sets/creating-product-sets.html
related:
  - title: Product Sets feature overview
    link: docs/scos/user/features/page.version/product-sets-feature-overview.html
---

This document describes how to create product sets in the Back Office.

You create a product set to improve the customer's shopping experience. You collect similar products into a logical chunk that can be bought with a single click. Let's say you have a pen. The logically connected items to this product can be a pencil, notebook, and sticky notes. You can collect these products under a set named _Basic office supplies_. Instead of searching for each item, your customer will add this set to cart.

## Prerequisites

To start working with product sets, go to **Merchandising** > **Product Sets**.

Review the [reference information](#reference-information-create-product-sets) before you start, or look up the necessary information as you go through the process.

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

1. In the **Images** tab, do the following for the needed locales:
    1. click **Add image set**.
    2. Enter an **IMAGE SET NAME**.
    3. Enter a **SMALL IMAGE URL**.
    4. Enter a **LARGE IMAGE URL**.
    5. Optional: Enter a **SORT ORDER**.
    6. Optional: To add one more image, click **Add image**.
    7. Repeat steps 9-13 until you add all the needed images.
    8. Optional: To add one more image set, click **Add image set**.
    9. Repeat steps 9-15 until you add all the needed image sets.
2. Click **Save**.    

## Reference information: Enter general information for the product set

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| Name | Unique identifier of the product set that will be displayed on the Storefront. |
| Url | A relative URL address of the product set. When entering multi-word URLs, use hyphens and dashes.|
| Description | This description will be displayed on the Storefront for the product set. |
| Product Set Key | Unique identifier of the product set for adding to [CMS pages](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-overview.html). It is important to note when creating your product set key to not include spaces. Please use an underscore or dash instead of spaces; otherwise, the content widget cannot read it. |
| WeighT | Number that represents the importance of your product set. Product sets with a higher weight will be shown first or on top.|
| Active | Checkbox that defines if the product set is displayed anywhere in the online store. |

**SEO tab**

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| Title | SEO-friendly title for the product set. |
| Keywords| Any SEO relevant keywords for an added boost in search ranking. |
| Description | SEO-friendly product set description.  |

**Images tab**

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| Image Set Name | Name of your image set. No spaces are allowed, please use an underscore or dash. |
| Small Image URL<br>Large Image URL | Allows adding images via a URL. Make sure the image you are adding is available from a public URL. This means any images in a private Dropbox or Google folder will not work. |
| Sort OrderIf you add several images to an active image set, specify the order in which they are to be shown in the front end and back end using Sort Order fields. The order of images is defined by order of entered numbers where the image set with the sort order "0" is the first to be shown. |  

If you do not specify different images for your different stores, the system will use the photos displayed in the **Default** drop-down

#### Product set example

This is how the product set looks like in the online store:
![Product set example](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Sets/Product+Sets%3A+Reference+Information/product-set-example.png)

The Back Office set up for this product set looks the following way:
![Product set in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Sets/Product+Sets%3A+Reference+Information/product-set-in-back-office.png)

![Product set in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Sets/Product+Sets%3A+Reference+Information/product-set-example-in-back-office.png)

**What's next?**
<br>To know how the product sets are managed, see [Managing product sets](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-sets/managing-product-sets.html).
