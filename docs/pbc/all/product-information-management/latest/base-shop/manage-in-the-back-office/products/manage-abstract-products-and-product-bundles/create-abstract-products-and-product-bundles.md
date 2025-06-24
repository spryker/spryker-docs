---
title: Create abstract products and product bundles
description: Learn how to create abstract products and product bundles in the Back Office.
last_updated: June 27, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-abstract-products-and-product-bundles
originalArticleId: 41920cd2-8fea-4194-9ed3-bf19c1791649
redirect_from:
  - /2021080/docs/creating-abstract-products-and-product-bundles
  - /2021080/docs/en/creating-abstract-products-and-product-bundles
  - /docs/creating-abstract-products-and-product-bundles
  - /docs/en/creating-abstract-products-and-product-bundles
  - /2021080/docs/creating-product-bundles
  - /2021080/docs/en/creating-product-bundles
  - /docs/creating-product-bundles
  - /docs/en/creating-product-bundles
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/products/manage-abstract-products/create-abstract-products-and-product-bundles.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products/create-abstract-products-and-product-bundles.html
  - /docs/scos/user/back-office-user-guides/202108.0/catalog/products/manage-abstract-products/create-abstract-products-and-product-bundles.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html  
  - /docs/scos/user/back-office-user-guides/202108.0/catalog/products/manage-abstract-products/create-abstract-products-and-product-bundles.html
  - /docs/marketplace/user/back-office-user-guides/202204.0/catalog/products/abstract-products/creating-abstract-products.html
related:
  - title: Creating Product Variants
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html
  - title: Editing Product Variants
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html
  - title: Managing Products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-products.html
  - title: Discontinuing Products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html
  - title: Adding Product Alternatives
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html
---

This doc describes how to create [abstract products](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html#abstract-products-and-product-variants) and [product bundles](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-bundles-feature-overview.html).

## Prerequisites

To be able to create [product variants](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html#abstract-products-and-product-variants) of the abstract product, [create at least one super attribute](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

Each section contains reference information. Make sure to look up the necessary information as you go through the process.

## Define general settings

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.
2. Depending on the type of the product you want to create, select one of the following:
    - Abstract product: click **Create Product**.
    - Product bundle: click **Create Product Bundle**.
    This opens the **Create a Product** page.
3. On the **General** tab, define general settings:
    1. For **STORE RELATION**, select one or more stores.
    2. Enter an **SKU PREFIX**.
    3. Enter a **NAME** for each locale.
    4. Optional: Enter a **DESCRIPTION** for needed locales.
    5. Optional: Select **NEW FROM** and **NEW TO** dates.
    6. Select **Next >** and follow [Define prices](#define-prices).


### Reference information: Defining general settings

| ATTRIBUTE           | DESCRIPTION                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| STORE RELATION      | Defines the [stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the product will be available in.                                                                                                                                                                                                                                                                                                                                                  |
| SKU PREFIX          | Unique product identifier that will be used to track unique information related to the product.                                                                                                                                                                                                                                                                                                                                                                                       |
| NAME                | Name that will be displayed for the product on the Storefront.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| DESCRIPTION         | Description that will be displayed for the product on the Storefront.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| NEW FROM <br>NEW TO | Defines the period of time for which the following applies: <br><ul><li>A [dynamic product label](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html) *New* will be assigned to the product.</li><li>The product will be assigned to the *New* [category](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/category-management-feature-overview.html)</li></ul>. |

## Define prices

On the **Price & Tax** tab, do the following:

1. B2B Shop: Optional: To define prices for a merchant, select a **MERCHANT PRICE DIMENSION**.
2. Enter one or more **DEFAULT** prices for needed locales and currencies.
3. Optional: To display promotions, enter **ORIGINAL** prices for needed locales and currencies.
4. Select a **TAX SET**.
5. Select **Next >** and follow [Define product variants](#define-product-variants).


### Reference information: Define prices

| ATTRIBUTE                | DESCRIPTION                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MERCHANT PRICE DIMENSION | [Merchant relation](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) to apply the prices to.<br>To create one, see [Create merchant relations](/docs/pbc/all/merchant-management/latest/base-shop/manage-in-the-back-office/create-merchant-relations.html)<br> If you select **Default prices**, the prices will apply to all customers.<br>.                  |
| Gross price<br>Net price | Gross and net value of the product. A gross prices is a price after tax. A net price is a price before tax.<br>If a product variant of the abstract product does not have a price, it [inherits](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html#product-information-inheritance) the price you enter for the abstract product. |
| DEFAULT price            | Default price is the price a customer pays for the product.                                                                                                                                                                                                                                                                                                                                                                      |
| ORIGINAL price           | An original price is a price displayed as a strikethrough beside the default price on the Storefront. The original price is optional and is usually used to indicate a price change.                                                                                                                                                                                                                                             |
| TAX SET                  | Conditions under which the product will be taxed.<br>For instructions on creating tax sets, see [Create tax sets](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/create-tax-rates.html).                                                                                                                                                                                                      |

#### Default and original prices on the Storefront

If you want to display the difference in price in order to show what the price was before and how it changed, you add both default and original prices.
The default prices are displayed in the online store as a current price, while the original one is displayed as a strikethrough.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.md/default-and-original-prices.mp4" type="video/mp4">
  </video>
</figure>

## Define product variants

{% info_block warningBox "Adding super attributes" %}

- You can add super attributes to product variants only when creating an abstract product.

- To be able to add product variants after creating an abstract product, add at least one super attribute.

{% endinfo_block %}  

On the **Variants** tab, depending on the product type, do one of the following:

- Product bundle: Click **Next >** and follow [Define meta information](#optional-define-meta-information).
- Abstract product: Define product variants as follows:
    1. Select one or more super attributes to create product variants from.
    2. In the field next to the super attribute you've selected, select one or more product attribute values.
    3. Repeat the previous step until you select at least one value for each selected super attribute.  
    4. Click **Next >** and follow [Define meta information](#optional-define-meta-information).

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.md/defining-product-variants.mp4" type="video/mp4">
  </video>
</figure>

### Reference information: Define product variants

{% info_block infoBox "Only for abstract products" %}

The reference information in this section is relevant only for abstract products. When you create a product bundle, a single product variant is created automatically.

{% endinfo_block %}

In the **Variants** tab, you can see all the existing [super attributes](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html#super-attributes). To create a super attribute, see [Create product attributes](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

You can select as many super attributes as you need and define one or more values for them. For each product attribute value you select, a product variant will be created. After creating the abstract product, you will be able to create new product variants based on the super attributes you select when creating the abstract product.

## Optional: Define meta information

1. Click the **SEO** tab.
2. Enter any of the following for needed locales:
    - **TITLE**
    - **KEYWORDS**
    - **DESCRIPTION**
3. Click **Next >** and follow [Add images](#optional-add-images).

### Reference information: Define meta information

| ATTRIBUTE   | DESCRIPTION                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| TITLE       | Meta title to display on search pages and browser tabs.                                           |
| KEYWORDS    | Meta keywords that will be used by some search engines to match search results to search queries. |
| DESCRIPTION | Meta description to be displayed on search pages.                                                 |

## Optional: Add images

{% include scos/user/back-office-user-guides/add-images.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/add-images.md -->

This opens the **Edit Product Abstract:{product SKU} page with a success message displayed.

### Reference information: Add images

| ATTRIBUTE        | DESCRIPTION                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *DEFAULT* locale | Images from this locale will be displayed for the product in the locales images are not added for.                                                                                            |
| IMAGE SET NAME   | Image set name. For a multi-word name, instead of spaces, use dashes and underscores.                                                                                                         |
| SMALL IMAGE URL  | A public URL to fetch a low-resolution image from. The image will be displayed on product catalog pages.                                                                                      |
| LARGE IMAGE URL  | A public URL to fetch a high-resolution image from. The image will be displayed on product details pages.                                                                                     |
| SORT ORDER       | A number that will define the position of the image on a page relatively to the sort order value of the other images. An image with a smaller sort order value is displayed higher on a page. |


## Next steps

- [Add volume prices](/docs/pbc/all/price-management/latest/base-shop/manage-in-the-back-office/add-volume-prices-to-abstract-products-and-product-bundles.html)
- [Add scheduled prices](/docs/pbc/all/price-management/latest/base-shop/manage-in-the-back-office/add-scheduled-prices-to-abstract-products-and-product-bundles.html)
- [Edit abstract products and product bundles](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html)
