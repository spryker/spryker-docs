---
title: Product Options feature overview
description: The article describes the creation process of product options and how it is managed in the Back Office
last_updated: Sep 11, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/product-options-overview
originalArticleId: 27e96e71-ae70-4cd7-af81-8c9fcc6abc13
redirect_from:
  - /v6/docs/product-options-overview
  - /v6/docs/en/product-options-overview
  - /v6/docs/product-options
  - /v6/docs/en/product-options

---

The **Product Options** feature allows a Back Office user to create and assign product options to abstract products. Product options are product additions that a customer can select on the product detail page before adding the product to the cart. For example, the product options can be gift wrappings for products, insurance, warranty, etc. Product options do not have stock, but a SKU linked to product abstracts. Thus, you cannot purchase them without buying a corresponding product.

Each product option is defined by:

* product option group name
* tax set assigned on the product option group
* option value
* translation

*Product option group* holds all available options, or *option values* that buyers select. For example, you can have the "Warranty" product option group and create "1-year warranty" and "2-year warranty" values for it.

With the feature in the Back Office, you can create, update, activate or deactivate, and view all product options available in the system, define a price for product options and select products to which they will be added.

In the Storefront, customers can select and add options to products on the product detail page.

## Product Options in the Back Office

In the Back Office, you can perform the following actions on product options:

* create a product option
* update, view or activate/deactivate product options
* create multiple option values in one option group
* specify gross and net prices for options values
* assign product option groups to products
* activate product options to make them visible in the Storefront

See [Creating a Product Option](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html#creating-a-product-option) and [Managing Product Options](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-options/managing-product-options.html) to learn more about how to work with product options in the Back Office.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product-option-back-office.png)

{% info_block infoBox %}

Each product option group may contain as many product options as you need. For example, you can offer insurance services (**product option group**) for the product with several **product options**:
* One-year coverage insurance $100
* Two-yer coverage insurance $150
* Three-year coverage insurance $200 etc.

{% endinfo_block %}

## Product Options on the Storefront

On the product detail page, the new product option group (1) will be displayed as a drop-down list with the option values (2).

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product-option-yves.png)

## Current constraints

{% info_block infoBox %}

Currently, the feature has the following functional constraints which are going to be resolved in the future.

{% endinfo_block %}

* Product options are available in all the stores where the corresponding concrete product is available
* Unlike cart, shopping list does not support product options
* If you add a product with an option to shopping list, the product option gets discarded
* You cannot define product option prices in a per-merchant manner
* If you create a product option, the price will be the same for all merchants
* Unlike other prices in Spryker, product option price is not bound to any of the available price types (DEFAULT or ORIGINAL)

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create a product option](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html)  |
| [Manage product options](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-options/managing-product-options.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Options feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-options-feature-walkthrough.html) for developers.

{% endinfo_block %}
