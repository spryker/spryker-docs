---
title: Edit abstract products and product bundles
description: Learn how to edit abstract products and product bundles in the Back Office.
last_updated: June 27, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/editing-abstract-products
originalArticleId: 7fe58b05-5718-4851-8f90-4167d1df999d
redirect_from:
  - /2021080/docs/editing-abstract-products
  - /2021080/docs/en/editing-abstract-products
  - /docs/editing-abstract-products
  - /docs/en/editing-abstract-products
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/products/manage-abstract-products/editing-abstract-products.html
  - /docs/scos/user/back-office-user-guides/202204.0/catalog/products/manage-abstract-products/editing-abstract-products.html  
related:
  - title: Managing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/managing-products/managing-products.html
---

This document describes how to edit abstract products.

## Prerequisites

To start editing an abstract product, do the following:
1. Go to  **Catalog&nbsp;<span aria-label="and then">></span> Products**.
2. On the **Product** page, next to the product you want to edit, click **Edit**.

Each section contains reference information. Make sure to look up the necessary information as you go through the process.


## Editing general settings of an abstract product

1. On the **Edit Product Abstract: {SKU}** page, click the **General** tab.
2. For **STORE RELATION**, do the following:
    * Select the checkboxes next to the stores you want to start displaying this product in.
    * Clear the checkboxes next to the stores you want to stop displaying this product in.
3. Enter a **NAME** for needed locales.
4. Enter a **DESCRIPTION** for needed locales.
5. Select **NEW FROM** and **NEW TO** dates.
6. Click **Save**.
    This refreshes the page with a success message displayed.

### Reference information: Edit general settings of an abstract product

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Store relation  | Defines the [stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html) the product is available in.<br>You can select multiple values. |
| SKU Prefix | Unique product identifier that helps to track unique information related to the product. |
| NAME | Name that's displayed for the product on the Storefront. |
| Description | Description that's displayed for the product on the Storefront. |
| New from<br>New to  | Defines the period of time for which: <br><ul><li>A [dynamic product label](/docs/scos/user/features/{{page.version}}/product-labels-feature-overview.html) *New* is assigned to the product.</li><li>The product is assigned to the *New* [category](/docs/scos/user/features/{{page.version}}/category-management-feature-overview.html)</li></ul><br> You can either select no dates or both. |

## Edit prices of an abstract product

1. On the **Edit Product Abstract: {SKU}** page, click the **Price & Tax** tab.
2. B2B Shop: Select a **Merchant Price Dimension**.
3. Enter needed prices for needed locales and currencies.
4. Select the **TAX SET**.
5. Select **Save**.
    This refreshes the page with a success message displayed.


### Reference information: Edit prices of an abstract product

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
|Merchant Price Dimension| B2B only<br>Defines the [merchant](/docs/scos/user/features/{{page.version}}/merchant-custom-prices-feature-overview.html) the prices apply to.<br>If **Default prices** is selected, the prices apply to all customers.<br>To [manage merchant relations](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html) go to **Marketplace&nbsp;<span aria-label="and then">></span> Merchant Relations**. |
| Gross price<br>Net price | Gross and net value of the product. A gross prices is a price after tax. A net price is a price  before tax.<br>If a product variant of the abstract product does not have a price, it [inherits](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html#product-information-inheritance) the price you enter here. |
|Default<br>Original| A default price is the price a customer pays for the product. An original price is a price displayed as a strikethrough beside the default price on the Storefront. The original price is optional and is usually used to indicate a price change. |
|Add Product Volume Price<br>Edit Product Volume Price| This option allows you to define the prices that are based on the quantity of products that a customer selects. Works only with the default prices.<br>Add Product Volume Price appears only when the price for a currency was set up and saved.<br>Edit Product Volume Price appears only what the volume price was already set up for a currency.||✓|
|Tax Set|The conditions under which a product is going to be taxed.<br>The values available for selection derive from **Taxes&nbsp;<span aria-label="and then">></span> Tax Sets**<br>Only one value can be selected.|

## Edit volume prices of an abstract product

1. On the **Edit Product Abstract: {SKU}** page, click the **Price & Tax** tab.
2. Next to the store you want to edit volume prices for, select **Edit Volume Price: DEFAULT**.
3. On the **Edit volume prices for product: {SKU}** page, enter a **Quantity**.
4. Enter a **Gross price**.
5. Enter a **Net price**.
6. To add more volume prices than the number of the rows displayed on the page, select **Save and add more rows**.
7. Repeat steps 4 to 7 until you edit all the desired volume prices.
8. Click **Save and exit**.
    This opens the **Edit Product Abstract: {SKU}** page with a success message displayed.

### Reference information: Edit volume prices of an abstract product

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Quantity | Defines the quantity of the product to which the prices from **Gross price** and **Net price** fields apply. |
| Gross price | Gross price of the product with the quantity equal or bigger than defined in the **Quantity** field. A gross prices is a price after tax. |
| Net price | Net price of the product with the quantity equal or bigger than defined in the **Quantity** field.  A net price is a price before tax. |

## Edit product variants of an abstract product

To edit a product variant, see [Editing product variants](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/editing-product-variants.html).
To create a product variant, see [Creating product variants](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html).

## Edit meta information of an abstract product

1. On the **Edit Product Abstract: {SKU}** page, click the **SEO** tab.
2. Enter any of the following for needed locales:
    * **TITLE**
    * **KEYWORDS**
    * **DESCRIPTION**
4. Select **Save**.
    The page refreshes with the success message displayed.

### Reference information: Editing meta information of an abstract product


| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| TITLE | Meta title that is displayed on search pages and browser tabs.|
| KEYWORDS | Meta keywords that are used by some search engines to match search results to search queries.|
| DESCRIPTION | Meta description that is displayed on search pages. |

## Edit product images of an abstract product

Click the **Images** tab and do any of the following for needed locales.

{% include scos/user/back-office-user-guides/update-images.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/update-images.md -->

    The page refreshes with the success message displayed.

### Reference information: Edit product images of an abstract product

The following table describes the attributes you enter and select when editing product images of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| IMAGE SET NAME |Name of your image set.|
| SMALL IMAGE URL | Link to the image that is used in product catalog pages.|
| LARGE IMAGE URL | Link to the image that is used on the product details page.|
| SORT ORDER | A number that defines the position of the image on a page relatively to the sort order value of the other images. An image with a smaller sort order value is displayed higher on a page. |

## Editing scheduled prices of an abstract product


1. On the **Edit Product Abstract: {SKU}** page, click the **Scheduled Prices** tab.
2. Next to the scheduled price you want to edit, select **Edit**.
4. Select a **Store**.
5. Select a **Currency**.
6. Enter a **Net price**.
7. Optional: Eneter a **Gross price**.
8. Select a **Price type**.
9. Select a **Start from (included)** date and time.
10. Select a **Finish at (included)** date and time.
11. Select **Save**.
    This opens the *Edit Product Abstract [SKU]* page with the success message displayed. The changes are reflected in the table with scheduled prices.

### Reference information: Editing scheduled prices of an abstract product

The following table describes the attributes you enter and select when editing scheduled prices of an abstract product.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Abstract SKU | Unique identifier of an abstract product. The field is disabled because you are editing a scheduled price of a particular abstract product. |
| Concrete SKU | Unique identifier of a concrete product. The field is disabled because you are editing a scheduled price of a particular abstract product. |
| Store | [Store](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html) in which the scheduled price is displayed. Unless you add the scheduled price to all the other stores, the regular price is displayed in them.  |
| Currency | Currency in which the scheduled price is defined. Unless you define the scheduled price for all the other currencies, the regular prices is displayed for them.  |
| Net price | Net value of the product defined by the scheduled price. |
| Gross price |Gross value of product defined by the scheduled price.  |
| Price type |  Price type in which price schedule is defined: DEFAULT or ORIGINAL.|
| Start from (included)  | Date and time on which the scheduled price is applied. |
| Finish at (included) | Date and time on which the product price is reverted to the regular price. |
