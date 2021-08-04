---
title: Reference information- abstract product
originalLink: https://documentation.spryker.com/v6/docs/abstract-product-reference-information
redirect_from:
  - /v6/docs/abstract-product-reference-information
  - /v6/docs/en/abstract-product-reference-information
---

The topic describes the reference information for working with abstract products.

The attributes for Create and Edit pages, as well as for abstract and concrete products, are different. We added additional columns to identify what case an attribute is relevant for.

## General tab
| Attribute | Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
| Store relation  | Defines the [stores](https://documentation.spryker.com/docs/multiple-stores) the product is available in.</br>You can select multiple values. | ✓ | ✓ |
| SKU Prefix | Unique product identifier that helps to track unique information related to the product. | ✓ | Display only |
| Name | The name that's displayed for the product on the Storefront. | ✓ |✓  |
| Description | The description that's displayed for the product on the Storefront. | ✓ | ✓ |
| New from</br>New to  | Defines the period of time for which: </br><ul><li>A [dynamic product label](https://documentation.spryker.com/docs/product-labels-feature-overview) *New* is assigned to the product.</li><li>The product is assigned to the *New* [category](https://documentation.spryker.com/docs/category-management-feature-overview0</li></ul></br> You can either select no dates or both. | ✓ | ✓ |


## Price & Stock tab
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|Merchant Price Dimension| B2B only</br>The drop-down list that allows selecting a merchant relation to set up a [price for a selected merchant](https://documentation.spryker.com/docs/price-per-merchant-relation-feature-overview).</br>If you select **Default prices**, the prices apply to all customers.</br>To [manage merchant relations](https://documentation.spryker.com/docs/managing-merchant-relations) got to **Marketplace** > **Merchant Relations**.</br>You can select only one merchant relation. |✓|✓|
| Gross price</br>Net price | Gross and net value of the product. A gross prices is a price after tax. A net price is a price  before tax.</br>If a product variant of the abstract product does not have a price, it [inherits](https://documentation.spryker.com/docs/product-feature-overview#product-information-inheritance) the price you enter here. | ✓ | ✓ |
|Default</br>Original| A default price is the prices a customer pays for the product. An original price is a price displayed as a strikethrough on the Storefront. The original price is optional. |✓|✓|
|Add Product Volume Price</br>Edit Product Volume Price| This option allows you to define the prices that are based on the quantity of products that a customer selects. Works only with the default prices.</br>Add Product Volume Price appears only when the price for a currency was set up and saved.</br>Edit Product Volume Price appears only what the volume price was already set up for a currency.||✓|
|Tax Set|The conditions under which a product is going to be taxed.</br>The values available for selection derive from Taxes > Tax Sets</br>Only one value can be selected.|✓|✓|


## Variants tab
{% info_block warningBox "Product bundles" %}
When you create a product bundle, a single product variant is created automatically. Skip the configuration in this tab
{% endinfo_block %}
* In the **Variants** tab, you can see [super attributes](https://documentation.spryker.com/docs/product-feature-overview#super-attributes) that derive from **Catalog** > **Attributes**. See [Creating product attributes](https://documentation.spryker.com/docs/creating-product-attributes) to learn how to create them.
* You can select as many super attributes as you need and define one or more values for them. For each product attribute value you select, a product variant is created. After creating the abstract product, you can create new product variants based on the super attributes you select when creating the abstract product. 
* While editing the abstract product/product bundle, you will see a table that displays the product variants that exist for this abstract product. From this page, you can View, Edit, and Manage Attributes for the product variant.

## SEO tab
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|Title|The meta title for your product.|✓|✓|
|Keywords|The meta keywords for your product.|✓|✓|
|Description|Meta description for your product.|✓|✓|


## Image tab
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|Image Set Name|The name of your image set.|✓|✓|
|Small|The link of the image that is going to be used in the product catalogs.|✓|✓|
|Large|The link to the image that is going to be used on the product details page.|✓|✓|
|Sort Order|If you add several images to an active image set, specify the order in which they are to be shown in the front end and back end using Sort Order fields. The order of images is defined by the order of entered numbers where the image set with sort order "0" is the first to be shown.|✓|✓|


## Scheduled Prices tab
On this tab, you see a table with the scheduled prices imported via a CSV file. The following information is available:
* Currency, store, net, and gross price values
* Start from (included) and Finish at (included) values that identify a period of time when a specific price is going to be set for a product automatically.
