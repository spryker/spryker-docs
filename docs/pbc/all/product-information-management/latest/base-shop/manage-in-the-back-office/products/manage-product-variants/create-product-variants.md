---
title: Creating product variants
description: Use the guide to configure a product variant, set a price and validity period, make it searchable on the website, and more
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-product-variant
originalArticleId: cb558d64-c3df-4acf-a149-3eac51f413c2
redirect_from:
  - /2021080/docs/creating-a-product-variant
  - /2021080/docs/en/creating-a-product-variant
  - /docs/creating-a-product-variant
  - /docs/en/creating-a-product-variant
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-concrete-products/creating-product-variants.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html
related:
  - title: Managing Products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-products.html
  - title: Discontinuing Products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html
  - title: Adding Product Alternatives
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html
  - title: Product feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html
---

This topic describes how to add a product variant for an abstract product.

## Prerequisites

To create a product variant, navigate to **Catalog&nbsp;<span aria-label="and then">></span> Products** section.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating a product variant

To create a product variant:

1. Next to the abstract product you want to create a variant for, select **Edit**.
2. On the *Edit Abstract* page, select **Add Variant**.
3. In the *General* tab, do the following:
    1. Define a **SKU**:
        - Enter a **SKU**.<br>OR
        - Select **Autogenerate SKU**.
    2. Under *Super attributes*, define one or more super attributes:
        - Select a value.
        - Select **Use custom value** and, in the field the appears below, enter the value.
    3. Add product name and description and select **Searchable** if you want your product to be searchable by its name in the online store.
    4. **Optionally**: Enter **Valid From** and **Valid To** dates to specify when the product should go online in the web-shop.
    5. Go to the *Price & Stock* tab.
4. In the *Price & Tax* tab, set prices and taxes for products:
    1. To take the prices over from the abstract product, select **Use prices from abstract product**.

    {% info_block warningBox "Note" %}

    The merchant relation prices are inherited by Product Variants as well.

    {% endinfo_block %}

    2. Otherwise, enter Original and eventually Default prices for the product for Gross and Net price modes.
    3. **B2B only:** In **Merchant Price Dimension**, select the merchant relationship to define a special price per merchant relation. See [Merchants](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) for more information.
    4. Select **Quantity** for the product and then select **Never out of stock** if you want the product to never go out of stock.
5. **Optionally**: Click **Next** to go to the *Image* to add images for the product and define the image order.
6. **Optionally**: Click **Next** of select the *Assign bundled products* tab to create a bundles product. See [Creating and Managing Product Bundles](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) to know more.
7. Click **Save**.
The page is refreshed and you can see two additional tabs: *Discontinue* and*Product Alternatives*. See  [Discontinuing products](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html) and [Adding product alternatives](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html) to know more.

{% info_block errorBox "Important" %}

To make sure your product will be shown and searchable in your online store, we highly recommend you to go through the checklist in [HowTo - Make a Product Searchable and Shown on the Storefront](/docs/pbc/all/product-information-management/latest/base-shop/tutorials-and-howtos/make-products-searchable-and-shown-on-the-storefront.html).

{% endinfo_block %}

### Reference information: Creating a product variant

This section describes the attributes you enter and select when  creating a product variant.

#### General tab

| ATTRIBUTE |DESCRIPTION | CREATE CONCRETE PRODUCT | UPDATE CONCRETE PRODUCT|
| --- | --- | --- | --- |
|Store relation  | Defines the store for which the product can be available.<br>You can select multiple values. | **No**|**No**|
| SKU Prefix | A number that you assign to the product will help to track unique information related to that product. | **Yes**|**Display Only**|
| Autogenerate SKU | Allows the system to autogenerate the SKU once you click **Save**. | **Yes**|**No**|
| Super Attributes | This section is only available if you have added more than one super attribute and defined more than one value for it.<br>For example, if you selected the **color** to be a super attribute and defined **green**, **white**, and **black**, you will see "**color**" in this section and a drop-down with the colors you defined.<br>Only one value can be selected. |**Yes**|**No**|
| Name | The name of your product that will be displayed in the online store for your customers. | **Yes**|**Yes** |
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

The only field available is **Add Product Alternative by Name or SKU**. Here it's enough to enter three characters of a product name or SKU to see the auto-suggested product list. From one to many values can be selected. If there is no need to set up an alternative product, you can skip this tab.


#### Scheduled Prices tab

On this tab, you see a table with the scheduled prices imported via a CSV file. The following information is available:

- Currency, store, net, and gross price values
- Start from (included) and Finish at (included) values that identify a period of time when a specific price is going to be set for a product automatically.


**What's next?**
<br>Once you have set things up, you will most likely need to know what managing actions you can do with your products. See articles in the [Managing products](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-products.html) section.
