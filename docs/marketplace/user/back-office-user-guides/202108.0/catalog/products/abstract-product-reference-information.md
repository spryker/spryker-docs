---
title: "Abstract product: reference information"
last_updated: Apr 19, 2021
description: This document contains reference information for creating and editing concrete and abstract products.
template: back-office-user-guide-template
---

## Create/edit abstract product

The following tables describe the attributes that you use when creating and editing concrete and abstract products.

{% info_block infoBox "Info" %}

The set of tabs for the **Create** and **Edit** pages, as well as for abstract and concrete products, is different. Hence, the additional columns with identifiers are added for your convenience.

{% endinfo_block %}

### General tab

| ATTRIBUTE | DESCRIPTION | CREATE ABSTRACT PRODUCT | UPDATE ABSTRACT PRODUCT |
|-|-|-|-|
| Store relation | Defines the store for which the product can be available. You can select multiple values. | Yes | Yes |
| SKU Prefix | Number that you assign to the product will help track unique information related to that product. | Yes | Display Only |
| Name | Name of your product that is displayed in the online store for your customers. | Yes | Yes |
| Description | Description of the product that your customer sees in the online store. | Yes | Yes |
| New from New to | Defines the period of time for which a dynamic label New will be assigned to the product. Either no dates can be selected, or both. | Yes | Yes |

### Price & Stock tab

| ATTRIBUTE | DESCRIPTION | CREATE ABSTRACT PRODUCT | UPDATE ABSTRACT PRODUCT |
|-|-|-|-|
| Merchant Price Dimension | **B2B Only** <br>Allows selecting a merchant relation and setting up a specific price for a specific merchant. If the Default value is selected, the prices will be the same for everyone. The values available for selection derive from [Marketplace > Merchant Relations](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html). Only one value can be selected. | Yes | Yes |
| Gross price Net price | Price value for gross and net mode. The price you populate is inherited by all product variants you add during the abstract product creation. | Yes | Yes |
| Default Original | Default prices are prices your customers will pay, whereas original prices are the "previous price" in case you want to display promotions. If you specify only a default price, it will be displayed just like a normal product price. However, if both prices are specified, the original one will appear crossed out in the shop. | Yes | Yes |
| Add Product Volume Price <br>Edit Product Volume Price | Once selected, the *Add volume price* (*Edit volume price*) page opens. This option lets you define specific prices for a specific quantity of products that a customer selects. It works only in the case of Default prices. The **Add Product Volume Price** button appears only when the gross and/or net prices for a store are set up beforehand and saved. *Edit Product Volume Price* appears only if the volume price has already been set up for a currency. | No | Yes |
| Tax Set | Conditions under which a product is going to be taxed. The values available for selection derive from [Taxes > Tax Sets]/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-sets/managing-tax-sets.html). Only one value can be selected. | Yes | Yes |

### Variants tab

{% info_block infoBox "Info" %}

No values are available for selection when you create a product bundle. When you create a bundle, one product variant will be added by default.

{% endinfo_block %}

* *While creating* an abstract product, you see a list of super attributes that derive from [Catalog > Attributes](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/managing-product-attributes.html). You can select as many super attributes as you need and define from one to many values for them (those values will define the difference between the product variants). Please keep in mind that moving forward, you will be able to create product variants only based on the selected super attributes. To add more product variants in the future, add at least one super attribute and define at least one value for it.

* *While editing the abstract product/product bundle*, you see a table that displays the product variants that exist for this abstract product. From this page, you can view, edit, and manage attributes [for the product variant](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/managing-product-attributes.html).

### SEO tab

| ATTRIBUTE | DESCRIPTION | CREATE ABSTRACT PRODUCT | UPDATE ABSTRACT PRODUCT |
|-|-|-|-|
| Title | Meta title for your product. | Yes | Yes |
| Keywords | Meta keywords for your product. | Yes | Yes |
| Description | Meta description for your product. | Yes | Yes |

### Image tab

| ATTRIBUTE | DESCRIPTION | CREATE ABSTRACT PRODUCT | UPDATE ABSTRACT PRODUCT |
|-|-|-|-|
| Image Set Name | Name of your image set. | Yes | Yes |
| Small | Link of the image that is going to be used in the product catalogs. | Yes | Yes |
| Large | Link to the image that is going to be used on the product details page. | Yes | Yes |
| Sort Order | If you add several images to an active image set, specify the order in which they are to be shown in the front end and back end using the *Sort Order* fields. The order of the images is defined by order of entered numbers where the image set with the sort order "0" is the first to be shown. | Yes | Yes |

## Scheduled Prices tab

On this tab, there is a table with the scheduled prices imported via a CSV file. The following information is available:

* Currency, store, net, and gross price values.

* *Start from* (included) and *Finish at* (included) values that identify a period of time when a specific price is going to be set for a product automatically.

## View Abstract Product page
On this page, you can view all the information entered while creating or editing an abstract product.

{% info_block infoBox "Info" %}

For the [Marketplace](/docs/marketplace/user/intro-to-the-spryker-marketplace/marketplace-concept.html) projects, you can check what merchant owns the product on this page.

{% endinfo_block %}
