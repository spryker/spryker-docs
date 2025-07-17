---
title: Edit abstract products
last_updated: Jul 27, 2021
description: This guide explains how to edit abstract products in your Spryker Marketplace based projects.
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products/editing-abstract-products.html
related:
  - title: Creating abstract products
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-back-office/products/abstract-products/create-abstract-products.html
  - title: Managing products
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-back-office/products/manage-products.html
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html

---

This document describes how to edit abstract products.

## Prerequisites

To start working with abstract products, go to  **Catalog&nbsp;<span aria-label="and then">></span> Products**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Editing general settings of an abstract product

To edit general settings of an abstract product:

1. Next to the product you want to edit, select **Edit**.
    This takes you to the **Edit Product Abstract [SKU]** page.
2. On the **General** tab, update **Store relations**.
3. Update **Name** and **Description** for the desired locales.
4. Update **New from** and **New to** dates.
5. Select **Save**.

### Reference information: Editing general settings of an abstract product

The following table describes the attributes you enter and select when editing general settings of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Store relation  | Defines the [stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the product is available in.<br>You can select multiple values. |
| SKU Prefix | Unique product identifier that helps to track unique information related to the product. |
| Name | Name that's displayed for the product on the Storefront. |
| Description | Description that's displayed for the product on the Storefront. |
| New from<br>New to  | Defines the period of time for which: <br><ul><li>A [dynamic product label](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html) *New* is assigned to the product.</li><li>The product is assigned to the *New* [category](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/category-management-feature-overview.html).</li></ul><br> You can either select no dates or both. |

## Editing prices of an abstract product

To edit prices of an abstract product:

1. Next to the product you want to edit, select **Edit**.
2. On the **Edit Product Abstract [SKU]** page, click on the **Prices & Tax** tab.
3. B2B Shop: Select a **Merchant Price Dimension**.
4. Enter **DEFAULT** prices for the desired available locales and currencies.
5. Optional:  Enter **ORIGINAL** prices for the desired available locales and currencies.
6. Select the **Tax Set**.
7. Select **Save**.

### Reference information: Editing prices of an abstract product

The following table describes the attributes you enter and select when editing prices of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
|Merchant Price Dimension| B2B only<br>Defines the [merchant](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) the prices apply to.<br>If **Default prices** is selected, the prices apply to all customers.<br>To [manage merchant relations](/docs/pbc/all/merchant-management/latest/base-shop/manage-in-the-back-office/edit-merchant-relations.html) go to **Marketplace&nbsp;<span aria-label="and then">></span> Merchant Relations**. |
| Gross price<br>Net price | Gross and net value of the product. A gross prices is a price after tax. A net price is a price  before tax.<br>If a product variant of the abstract product does not have a price, it [inherits](/docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-feature-overview.html) the price you enter here. |
|Default<br>Original| A default price is the price a customer pays for the product. An original price is a price displayed as a strikethrough beside the default price on the Storefront. The original price is optional and is usually used to indicate a price change. |
|Add Product Volume Price<br>Edit Product Volume Price| This option lets you define the prices that are based on the quantity of products that a customer selects. Works only with the default prices.<br>Add Product Volume Price appears only when the price for a currency was set up and saved.<br>Edit Product Volume Price appears only what the volume price was already set up for a currency.|
|Tax Set|The conditions under which a product is going to be taxed.<br>The values available for selection derive from **Taxes&nbsp;<span aria-label="and then">></span> Tax Sets** <br>Only one value can be selected.|

## Editing volume prices of an abstract product

To edit volume prices of an abstract product:

1. Next to the product you want to edit add volume prices of, select **Edit**.
2. On the **Edit Product Abstract [SKU]** page, switch to the **Price & Tax** tab.
3. Next to the store you want to edit volume prices for, select **> Edit Product Volume Price**.
4. On the **Add volume prices** page, enter a **Quantity**.
5. Enter a **Gross price**.
6. Optional: Enter a **Net price**.
7. Optional: To add more volume prices than the number of the rows displayed on the page, select **Save and add more rows**.
8. Repeat steps 4 to 7 until you edit all the desired volume prices.
9. Select **Save and exit**. This opens the **Edit Product Abstract [SKU]** page with the success message displayed.

<!--
### Reference information: Editing volume pirces of an abstract product

The following table describes the attributes you enter and select when editing volume pirces of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Quantity | Defines the quantity of the product to which the prices from **Gross price** and **Net price** fields apply. |
| Gross price | Gross price of the product with the quantity equal or bigger than defined in the **Quantity** field. A gross prices is a price after tax. |
| Net price | Net price of the product with the quantity equal or bigger than defined in the **Quantity** field.  A net price is a price before tax. |
-->

## Editing product variants of an abstract product

To edit a product variant, see [Editing product variants](/docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html#editing-product-variants-of-an-abstract-product).
To create a product variant, see [Creating product variants](/docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-back-office/products/create-product-variants.html).

## Editing meta information of an abstract product

To edit meta information, do the following:

1. Next to the product you want to edit, select **Edit**.
2. On the **Edit Product Abstract [SKU]** page, switch to the **SEO** tab.
3. Update the following for the desired locales:
    - **Title**
    - **Keywords**
    - **Description**
4. Select **Save**. The page refreshes with the success message displayed.

### Reference information: Editing meta information of an abstract product

The following table describes the attributes you enter and select when editing meta information of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
|Title|Meta title for your product.|
|Keywords|Meta keywords for your product.|
|Description|Meta description for your product.|

## Editing product images of an abstract product

To edit product images, do the following:

1. Next to the product you want to edit, select **Edit**.
2. On the **Edit Product Abstract [SKU]** page, switch to the **Image** tab.
3. Select a locale you want to update images for.
4. Update images:
    - To add a new image set, select **Add image set**
    - To add a new image, select **Add image**.
    - To update an image, update the following:
        - **Small Image URL**
        - **Large Image URL**
        - **Sort order**
    - To delete large and small images, select **Delete image**.
    - To delete an image set with its images, select **Delete image set**.
5. Repeat step *4* until you update images for all the desired locales.
6. Select **Save**. The page refreshes with the success message displayed.

### Reference information: Editing product images of an abstract product

The following table describes the attributes you enter and select when editing product images of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
|Image Set Name |Name of your image set.|
|Small |Link of the image that is going to be used in the product catalogs.|
|Large |Link to the image that is going to be used on the product details page.|
|Sort Order |If you add several images to an active image set, specify the order in which they are to be shown in the frontend and backend using **Sort Order** fields. The order of images is defined by the order of entered numbers where the image set with sort order "0" is the first to be shown.|
