---
title: Product Options Overview
description: The article describes the creation process of product options and how it is managed in the Back Office
originalLink: https://documentation.spryker.com/v2/docs/product-options-overview
originalArticleId: 042d850d-86e9-4c96-af78-25821538e5ad
redirect_from:
  - /v2/docs/product-options-overview
  - /v2/docs/en/product-options-overview
---

The Product Options feature allows a Back Office user to create and add product options assigned to abstract products.

**Product options** are product additions that can be purchased with the abstract product. To create a product option in the Back Office, first, you need to define option values including a translation key, its SKU and a price. Adding more than one option value will create a product option group. After that, select products you would like to assign a product option to and save the changes.

{% info_block warningBox %}
Each product abstract can have multiple product option groups assigned.
{% endinfo_block %}

## Option Group

The product option group name is a glossary key which translation is stored in the Glossary table. In the Back Office, it is possible to enable or disable a product option group through the active flag.

{% info_block warningBox %}
See [Activating or Deactivating a Product Option Group in the Back Office](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/catalog/product-options/creating-product-options.html
{% endinfo_block %} for more details.)

Also, each product option group has a [tax set](https://documentation.spryker.com/v2/docs/reference-information-tax-module) assigned which affects the final price calculation.

## Option Value

Each product option value consists of the following elements:

* **Option name translation key** that is used as a glossary key to have a customer locale specific translation.
* Unique **SKU** used for linking products.
* **Price** configuration that changes the total price of the selected product based on current price mode and currency.

{% info_block warningBox %}
Prices are **integer** values and stored in their normalized form. For example, 4EUR is stored as 400 in the database. <br>When a price is **not** defined, the product option value is considered as *inactive* for that specific currency and price mode. <br>When a price is set to **0**, it is considered as *free of charge*.
{% endinfo_block %}

Different SKU and glossary key are stored for each product option value.

The scheme below displays how the product options are stored in the database:
![Database scheme](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product_options_database_schema1.png) 

## Product Option Collector

Product options are exported to Yves by a separate collector. Each abstract product has all of its options exported to the client side storage.

## Option Storage When Order Is Placed

Each option is persisted into `sales_order_item_option` table when the order is placed.

In the diagram below you can see how the product options are stored when the order is placed:
![Product options storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product_options_storage.png) 

## Product Options Management in the Back Office
Say you want to sell a product that will have several options attached, for example, warranty period for 1, 2, and 3 years.

In the Back Office, a Back Office user can create an option group including all these three option values and then assign products to options.

{% info_block warningBox %}
See [Creating a New Product Option](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/catalog/product-options/creating-product-options.html
{% endinfo_block %} to learn more how to create a product option group and assign products in Admin UI.)

After you save the changes, a new product option group will appear on the product detail page. The option values will be displayed as a drop-down list. The product option price is added to the product price in the cart.
![Product option warranty](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/yves-product-option-warranty.png) 

##  Product Options Management in the Legacy Demoshop

For customers, the options are displayed on the product detail page of the abstract product.

You can [assign product labels](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/products/product-labels/creating-a-product-label.html) to highlight specific products in your shop. Customize the look and text of the labels as they appear in the shop. Any association can be a Label, such as "Sale" or "Christmas". Products that are new in your shop, can be automatically be marked with the Dynamic Product Label "New" for a pre-defined time range.

You can easily offer services on top of a customer's choice of products, such as gift wrapping, insurance, warranty or anything else that you may want to add that is not physically part of the product. The options can have their own price value and will be added to the total cart value.

Product options allow you to configure a product further. You can define option types and each option type can have 1 to n options values. Furthermore, multiple prices can be attached to an option value depending on current currency and price mode.

### Example

Suppose you want to sell a piece of artwork as a product abstract and you want to allow your customers to customize the frame they buy. You can define each frame type as a different option value for your product abstract. Each frame (product option value) can have different prices per currency and price mode (net/gross).

1. Option value 1 - Default frame: costs gross 10€ (only available in gross EUR)
2. Option value 2 - No frame: costs net 50€, gross 60€, net 20CHF, gross 30CHF
3. Option value 3 - Stylish frame: costs net 150€, gross 160€ (not available in CHF)
4. Option value 4 - Old style frame: costs net 100€, net 100CHF (not available in gross mode)

The concept is pretty close to the variants concept, however, if the number of possible combinations gets too big or if options have specific prices or exclude other options, the product option concept is better suited than the variant concept.

A product configuration is the set of option value selections for each option type. The set of all possible configurations is called the configuration space. For a concrete product one default configuration can be stored. This will be used on the product detail page for the initial configuration of the product.

In general an option does not have a stock.

Example:
![Product options example](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product_options.png) 

## Current Constraints
{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* product options are available in all the stores where the corresponding concrete product is available
* unlike cart, shopping list does not support product options
* if you add a product with an option to shopping list, the product option gets discarded
* you cannot define product option prices in a per-merchant manner
* if you create a product option, the price will be the same for all merchants
* unlike other prices in Spryker, product option price is not bound to any of the available price types (DEFAULT or ORIGINAL)

<!-- Last review date: Mar 20, 2019 --> 
