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
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products/editing-abstract-products.html  
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html
related:
  - title: Managing Products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-products.html
---

This doc describes how to edit abstract products and product bundles.

## Prerequisites

1. Go to  **Catalog&nbsp;<span aria-label="and then">></span> Products**.
2. On the **Product** page, next to the product you want to edit, click **Edit**.

Each section contains reference information. Make sure to look up the necessary information as you go through the process.


## Edit general settings of an abstract product or product bundle

1. On the **Edit Product Abstract: {SKU}** page, click the **General** tab.
2. For **STORE RELATION**, do the following:
    - Select the checkboxes next to the stores you want to start displaying this product in.
    - Clear the checkboxes next to the stores you want to stop displaying this product in.
3. Enter a **NAME** for needed locales.
4. Enter a **DESCRIPTION** for needed locales.
5. Select **NEW FROM** and **NEW TO** dates.
6. Click **Save**.
    This refreshes the page with a success message displayed.

### Reference information: Edit general settings of an abstract product or product bundle

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| STORE RELATION  | [Stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the product is available in. |
| SKU PREFIX | Unique product identifier that helps to track unique information related to the product. |
| NAME | Name that's displayed for the product on the Storefront. |
| DESCRIPTION | Description that's displayed for the product on the Storefront. |
| NEW FROM<br>NEW TO  | Define the period of time for which: <br><ul><li>A [dynamic product label](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html) *New* is assigned to the product.</li><li>The product is assigned to the *New* [category](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/category-management-feature-overview.html)</li></ul>|

## Edit prices of an abstract product or product bundle

1. On the **Edit Product Abstract: {SKU}** page, click the **Price & Tax** tab.
2. B2B Shop: Select a **MERCHANT PRICE DIMENSION**.
3. Enter needed prices for needed locales and currencies.
4. Select a **TAX SET**.
5. Click **Save**.
    This refreshes the page with a success message displayed.


### Reference information: Edit prices of an abstract product or product bundle

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| MERCHANT PRICE DIMENSION | [Merchant relation](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) the prices apply to. <br>To create one, see [Create merchant relations](/docs/pbc/all/merchant-management/latest/base-shop/manage-in-the-back-office/create-merchant-relations.html). <br>If you select **Default prices**, the prices will apply to all customers. |
| Gross price<br>Net price | Gross and net value of the product. A gross prices is a price after tax. A net price is a price before tax.<br>If a product variant of the abstract product does not have a price, it [inherits](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html#product-information-inheritance) the price you enter for the abstract product. |
| DEFAULT price | Default price is the price a customer pays for the product. |
| ORIGINAL price | An original price is a price displayed as a strikethrough beside the default price on the Storefront. The original price is optional and is usually used to indicate a price change. |
| TAX SET | Conditions under which the product is taxed.<br>For instructions on creating tax sets, see [Create tax sets](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/create-tax-rates.html). |

## Edit volume prices of an abstract product or product bundle

1. On the **Edit Product Abstract: {SKU}** page, click the **Price & Tax** tab.
2. Next to the store you want to edit volume prices for, select **Edit Volume Price: DEFAULT**.
3. On the **Edit volume prices for product: {SKU}** page, enter a **Quantity**.
4. Enter a **Gross price**.
5. Enter a **Net price**.
6. To add more volume prices than the number of the rows displayed on the page, select **Save and add more rows**.
7. Repeat steps 3 to 6 until you edit all the desired volume prices.
8. Click **Save and exit**.
    This opens the **Edit Product Abstract: {SKU}** page with a success message displayed.

### Reference information: Edit volume prices of an abstract product

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Quantity | Quantity of the product to which the prices from **Gross price** and **Net price** fields apply. |
| Gross price | Gross price of the product with the quantity equal or bigger than defined in the **Quantity** field. A gross prices is a price after tax. |
| Net price | Net price of the product with the quantity equal or bigger than defined in the **Quantity** field. A net price is a price before tax. |

## Edit product variants of an abstract product

To edit a product variant, see [Edit product variants](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html).
To create a product variant, see [Create product variants](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html).

## Edit meta information of an abstract product or product bundle

1. On the **Edit Product Abstract: {SKU}** page, click the **SEO** tab.
2. Enter any of the following for needed locales:
    - **TITLE**
    - **KEYWORDS**
    - **DESCRIPTION**
4. Select **Save**.
    The page refreshes with the success message displayed.

### Reference information: Editing meta information of an abstract product


| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| TITLE | Meta title that is displayed on search pages and browser tabs.|
| KEYWORDS | Meta keywords that are used by some search engines to match search results to search queries.|
| DESCRIPTION | Meta description that is displayed on search pages. |

## Edit images of an abstract product or product bundle

Click the **Images** tab and do any of the following for needed locales.

{% include scos/user/back-office-user-guides/update-images.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/update-images.md -->

    The page refreshes with the success message displayed.

### Reference information: Edit images of an abstract product or product bundle

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| IMAGE SET NAME | Image set name.|
| SMALL IMAGE URL | Link to the image that is used on product catalog pages.|
| LARGE IMAGE URL | Link to the image that is used on the product details page.|
| SORT ORDER | A number that defines the position of the image on a page relatively to the sort order value of the other images. An image with a smaller sort order value is displayed higher on a page. |

## Edit scheduled prices of an abstract product or product bundle


1. On the **Edit Product Abstract: {SKU}** page, click the **Scheduled Prices** tab.
2. Next to the scheduled price you want to edit, select **Edit**.
4. Select a **STORE**.
5. Select a **CURRENCY**.
6. Enter a **NET PRICE**.
7. Optional: Enter a **GROSS PRICE**.
8. Select a **PRICE TYPE**.
9. Select a **START FROM (INCLUDED)** date and time.
10. Select a **FINISH AT (INCLUDED)** date and time.
11. Click **Save**.
    This opens the **Edit Product Abstract [SKU]** page with the success message displayed. The changes are reflected in the table with scheduled prices.

### Reference information: Edit scheduled prices of an abstract product or product bundle

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ABSTRACT SKU | Unique identifier of an abstract product the scheduled price belongs to |
| CONCRETE SKU | Unique identifier of a concrete product the scheduled price belongs to. The field is blank because you are editing the scheduled price of an abstract product. |
| STORE | [Store](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) in which the scheduled price is displayed. |
| CURRENCY | Currency in which the scheduled price is defined. |
| NET PRICE | Net value of the product defined by the scheduled price. |
| NET PRICE | Net value of the product during the time period defined in **START FROM (INCLUDED)** and **FINISH AT (INCLUDED)**. |
| GROSS PRICE |Gross value of product during the time period defined in **START FROM (INCLUDED)** and **FINISH AT (INCLUDED)**.  |
| START FROM (INCLUDED) | Date and time on which the scheduled price applies. |
| FINISH AT (INCLUDED) | Date and time on which the product price reverts to the regular price. |
