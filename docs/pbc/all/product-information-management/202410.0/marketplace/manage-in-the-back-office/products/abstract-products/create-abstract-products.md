---
title: Create abstract products
last_updated: Jul 27, 2021
description: This guide explains how to create abstract products in your Spryker Marketplace based projects.
template: back-office-user-guide-template
related:
  - title: Editing abstract products
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html
  - title: Managing products
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-back-office/products/manage-products.html
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
redirect_from:
  - /docs/marketplace/user/back-office-user-guides/202108.0/catalog/products/abstract-product-reference-information.html
  - /docs/marketplace/user/back-office-user-guides/202311.0/catalog/products/abstract-products/creating-abstract-products.html
---

## Prerequisites

To start working with products:

1. To create product variants of abstract products, [create at least one super attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).
2. Go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

{% info_block warningBox "Warning" %}

You can add super attributes to product variants only when creating an abstract product.

{% endinfo_block %}

{% info_block errorBox "Create at least one product variant" %}

To be able to add product variants after creating an abstract product, add at least one product variant while creating the abstract product.

{% endinfo_block %}


## Defining general settings

To create an abstract product:

1. In the top right corner, click **+Create Product**.
The **Create a Product** page opens.
2. On the **General** tab, define general settings:

1. Select one or more **Store relations**.
2. In **SKU Prefix**, enter an SKU prefix.
3. In **Name** and **Description**, enter a name and description for all the locales.
4. Optional: Select **New from** and **New to** dates.
5. Click **Next >** and follow [Defining prices](#defining-prices).
  This opens the **Prices & Tax** tab.

### Reference information: Defining general settings

The following table describes the attributes you enter and select when defining general settings.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Store relation  | Defines the [stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the product will be available in.<br>You can select multiple values. |
| SKU Prefix | Unique product identifier that will be used to track unique information related to the product. |
| Name | Name that will be displayed for the product on the Storefront. |
| Description | Description that will be displayed for the product on the Storefront. |
| New from<br>New to  | Defines the period of time for which: <br><ul><li>A [dynamic product label](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-labels-feature-overview.html) *New* will be assigned to the product.</li><li>The product will be assigned to the *New* [category](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/category-management-feature-overview.html)</li></ul><br> You can either select no dates or both. |


## Defining prices

On the **Prices & Tax** tab, define prices:

 1. B2B Shop: Optional: To define prices for a merchant, select a **Merchant Price Dimension**.
 2. Enter **DEFAULT** prices for all the desired locales and currencies.
 3. Optional: To display promotions, enter **ORIGINAL** prices for the desired locales and currencies.
 4. Select a **Tax Set**.
 5. Select **Next >** and follow [Defining product variants](#defining-product-variants).
     This opens the **Variants** tab.


### Reference information: Defining prices

The following table describes the attributes you enter and select when defining prices.

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
|Merchant Price Dimension| B2B only<br>Defines the [merchant](/docs/pbc/all/price-management/{{page.version}}/base-shop/merchant-custom-prices-feature-overview.html) the prices will apply to.<br>If you select **Default prices**, the prices will apply to all customers.<br>To [manage merchant relations](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-merchant-relations.html) go to **Marketplace&nbsp;<span aria-label="and then">></span> Merchant Relations**. |
| Gross price<br>Net price | Gross and net value of the product. A gross prices is a price after tax. A net price is a price  before tax.<br>If a product variant of the abstract product does not have a price, it [inherits](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/marketplace-product-feature-overview.html) the price you enter here. |
|Default<br>Original | Default price is the price a customer pays for the product. An original price is a price displayed as a strikethrough beside the default price on the Storefront. The original price is optional and is usually used to indicate a price change. |
| Tax Set | Conditions under which the product will be taxed.<br> For instructions on creating tax sets, see [Create tax sets](/docs/pbc/all/tax-management/{{page.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html).|

## Defining product variants

On the **Variants** tab, define product variants:

1. Select one or more super attributes that define your product variants.
2. In the field next to the super attribute you've selected, select one or more product attribute values.
3. Repeat the previous step until you select at least one value for each selected super attribute.  
4. Select **Save** and follow [Defining meta information](#defining-meta-information).
  The page refreshes with the created product variants displayed in the table.


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/manage-in-the-back-office/products/abstract-products/create-abstract-products.md/defining-product-variants.mp4" type="video/mp4">
  </video>
</figure>

### Reference information: Defining product variants

On the **Variants** tab, you can see all the existing [super attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html#super-attributes). You can [create](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html) or [manage](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/edit-product-attributes.html) super attributes in **Catalog&nbsp;<span aria-label="and then">></span> Attributes**.

You can select as many super attributes as you need and define one or more values for them. For each product attribute value you select, a product variant will be created. After creating the abstract product, you will be able to create new product variants based on the super attributes you select when creating the abstract product.

## Defining meta information

Optional: Add meta information:

1. Switch to the **SEO** tab.
2. Enter the following for the desired locales:

- **Title**
- **Keywords**
- **Description**

3. Select **Save** and follow [Adding images](#adding-images).

### Reference information: Defining meta information

The following table describes the attributes you enter and select when defining meta information.

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
|Title| Meta title that will be used for the abstract product.|
|Keywords| Meta keywords that will be used for the abstract product. |
|Description| Meta description that will be used for the abstract product.|


## Adding images

Optional: Add images for the product:

1. Click on the **Image** tab.
2. Select a locale you want to add images for.
3. Select **Add image set**.
4. Enter an **Image Set Name**.
5. Repeat steps *2* and *3* until you add the desired number of image sets.
6. In the desired image set, enter the following:

- **Small Image URL**
- **Large Image URL**
- **Sort order**

7. Optional: Select **Add image** and repeat the previous step until you add all the desired images for this locale.
8. Repeat steps *1* to *6* until you add images for all the desired locales.
9. Select **Save**.
The page refreshes with the success message displayed.

### Reference information: Adding images

The following table describes the attributes you enter and select when adding images.

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
| *Default* locale | Images from this locale will be displayed for the product in the locales images are not added for. |
| Image Set Name | Name of image set.|
| Small | Link to the image that will be displayed for the product in product catalogs.|
|Large| Link to the image that will be displayed for the product on the *Product details* page. |
|Sort Order| Arranges the images displayed for the product in an ascending order. The smalles number is `0`. |

**Tips and tricks**
<br>To delete an image set with all its pictures, select **Delete image set**.

## Next steps

[Edit abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html)
