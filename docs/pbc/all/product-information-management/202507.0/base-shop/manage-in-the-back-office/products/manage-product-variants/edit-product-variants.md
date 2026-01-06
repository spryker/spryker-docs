---
title: Editing product variants
description: The guide describes how to update and edit product variants direct in the Spryker Cloud Commerce OS Back Office.
last_updated: Jul 7, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/editing-a-product-variant
originalArticleId: b9119173-d733-4ffa-b93d-1f19d88a364c
redirect_from:
  - /2021080/docs/editing-a-product-variant
  - /2021080/docs/en/editing-a-product-variant
  - /docs/editing-a-product-variant
  - /docs/en/editing-a-product-variant
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/products/manage-concrete-products/editing-product-variants.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-concrete-products/editing-product-variants.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html
related:
  - title: Managing Products
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-products.html
  - title: Discontinuing Products
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html
  - title: Adding Product Alternatives
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html
  - title: Product feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html
---

This article describes how to update the product variant added during the abstract product setup.
The described procedure is also valid for an existing product variant.

## Prerequisites

To start working with product variants, go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.

The procedure you are going to perform is very similar to the procedure described in the Creating a product variant article. For details, see  [Creating a product variant](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html).

Review the reference information before you start, or look up the necessary information as you go through the process.

## Editing a product variant

To edit a product variant:

1. Navigate to the *Edit Concrete Product* page using one of the following paths:
    - **Products&nbsp;<span aria-label="and then">></span> View** in the *Actions* column for a specific abstract product **>** scroll down to the **Variants tab&nbsp;<span aria-label="and then">></span> Edit** in the *Actions* column for a specific product variant.
    - **Products&nbsp;<span aria-label="and then">></span> Edit** in the *Actions* column for a specific abstract product **Variants tab&nbsp;<span aria-label="and then">></span> Edit** in the *Actions* column for a specific product variant.
2. On the *Edit Concrete Product* page, update the following tabs:
    1. *General* tab: populate name and description, valid from and to dates, make the product searchable by selecting the Searchable checkbox for the appropriate locale (or all locales).
    2. *Price & Stock* tab: define the default/original, gross/net prices, and stock.

    {% info_block warningBox "Note" %}

    The prices for the variant are inherited from the abstract product so you will see the same values as you have entered while creating the abstract product. **B2B:** The merchant relation prices are inherited by Product Variants as well.

    {% endinfo_block %}

    3. *Image* tab: define one or more images, image sets, and the image order for you product variant.
    4. *Assign bundled products* tab: this tab is used in case you need to create a product bundle. See [Creating Product Bundles](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) for details.
    5. *Discontinue* tab: This tab is used in case you want to discontinue the product. See [Discontinuing a Product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html) to know more.
    6. *Product Alternatives* tab: This tab is used to define the product alternatives for the product. See [Adding Product Alternatives](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html) to know more.
    7. *Scheduled Prices* tab: here you can only review scheduled prices imported via a CSV file if any. The actual import is done in **Prices&nbsp;<span aria-label="and then">></span> Scheduled Prices**.
3. Click **Save**.

### Reference information: Editing a product variant

This section describes the attributes you enter and select when  creating a product variant.

#### General tab

| ATTRIBUTE |DESCRIPTION | CREATE CONCRETE PRODUCT | UPDATE CONCRETE PRODUCT|
| --- | --- | --- | --- |
|Store relation  | Defines the store for which the product can be available.<br>You can select multiple values. | **No**|**No**|
| SKU Prefix | A number that you assign to the product will help to track unique information related to that product. | **Yes**|**Display Only**|
| Autogenerate SKU | Allows the system to autogenerate the SKU once you click **Save**. | **Yes**|**No**|
| Super Attributes | This section is only available if you have added more than one super attribute and defined more than one value for it.<br>For example, if you selected the **color** to be a super attribute and defined **green**, **white**, and **black**, you will see "**color**" in this section and a drop-down with the colors you defined.<br>Only one value can be selected. |**Yes**|**No**|
| Name | The name of your product that will be displayed in the online store for your customers. | **Yes** | **Yes** |
| Description | The description of the product that your customer sees in the online store. | **Yes** |**Yes** |
| Searchable | A checkbox that defines if the concrete product can be searched via the Search function in the online store. If not selected, no values will be displayed when searching for this product. | **Yes** | **Yes**|
| Valid from<br>Valid to  | Defines the period of time when the product is in active state. The **Valid from** date triggers the activation, while the **Valid to** date triggers the deactivation. Either no dates can be selected, or both. |**Yes** |**Yes** |

#### Price & Stock tab

| ATTRIBUTE |DESCRIPTION | CREATE CONCRETE PRODUCT | UPDATE CONCRETE PRODUCT|
| --- | --- | --- | --- |
|Use prices from abstract product|Once the checkbox is selected, the prices from the abstract product are taken over.|**Yes**|**No**|
|Merchant Price Dimension|**B2B Only**<br>The drop-down list that allows you to select a merchant relation and set up a specific price for a specific merchant.<br>If the Default value is selected, the prices will be the same for everyone.<br>The values available for selection derive from **Merchants&nbsp;<span aria-label="and then">></span> Merchant Relations**.<br>Only one value can be selected.|**Yes**|**Yes**|
| Gross price<br>Net price | The price value for gross and net mode.<br>For concrete products, the prices are inherited from their abstract product and can be updated while editing the concrete product.|**Yes**  |**Yes**  |
|Default<br>Original|Default prices are the prices your customers will pay, whereas original prices are the "previous prices" in case you want to display promotions. If you specify only a default price, it will be displayed just like a normal product price. However, if both prices are specified, the original one will appear crossed out in the shop.|**Yes**|**Yes**|
|Add Product Volume Price<br>Edit Product Volume Price|Once selected, the Add volume price (Edit volume price) page opens. This option allows you to define specific prices for a specific quantity of products that a customer selects. Works only in case of Default prices.<br>**Add Product Volume Price** appears only when the price for a currency was set up and saved.<br>**Edit Product Volume Price** appears only what the volume price was already set up for a currency.|**No**|**Yes**|
|(Stock) Type|Display-only field that displays warehouses according to your store|**Yes**|**Yes**|
|(Stock) Quantity|The number of items available in the warehouse.|**Yes**|**Yes**|
|(Stock) Never out of stock|The check-box that once selected will make the product always available to be purchased.|**Yes**|**Yes**|

#### Image tab

| ATTRIBUTE |DESCRIPTION | CREATE CONCRETE PRODUCT | UPDATE CONCRETE PRODUCT|
| --- | --- | --- | --- |
|Image Set Name|The name of your image set.|**Yes**|**Yes**|
|Small|The link of the image that is going to be used in the product catalogs.|**Yes**|**Yes**|
|Large|The link to the image that is going to be used on the product details page.|**Yes**|**Yes**|
|Sort Order|If you add several images to an active image set, specify the order in which they are to be shown in the front end and back end using Sort Order fields. The order of images is defined by the order of entered numbers where the image set with sort order "0" is the first to be shown.|**Yes**|**Yes**|

#### Assign bundled products tab

On this tab, you see a table with the concrete products that you can select to be included in a bundle of a specific variant. If you do need to create a bundle, do not select the values and skip the tab.

#### Discontinue tab

Available on the Edit page only.
Once you select to discontinue the product, you can add a note about that on this tab.

#### Product Alternatives tab

The only field available is **Add Product Alternative by Name or SKU**. Here it's enough to enter three characters of a product name or SKU to see the autosuggested product list. From one to many values can be selected. If there is no need to set up an alternative product, you can skip this tab.

#### Scheduled Prices tab

On this tab, you see a table with the scheduled prices imported via a CSV file. The following information is available:
- Currency, store, net, and gross price values.
- Start from (included) and Finish at (included) values that identify a period of time when a specific price is going to be set for a product automatically.

**What's next?**
<br>Following the same steps, you will update all variants that you have added to your abstract product.

You may also want to add more product variants. Learn how you do that by navigating to [Creating a product variant](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html).
