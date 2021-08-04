---
title: Product Options
originalLink: https://documentation.spryker.com/2021080/docs/product-options
redirect_from:
  - /2021080/docs/product-options
  - /2021080/docs/en/product-options
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

See [Creating a Product Option](https://documentation.spryker.com/docs/creating-a-product-option#creating-a-product-option) and [Managing Product Options](https://documentation.spryker.com/v4/docs/managing-product-options#managing-product-options) to learn more about how to work with product options in the Back Office.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product-option-back-office.png){height="" width=""}

{% info_block infoBox %}

Each product option group may contain as many product options as you need. For example, you can offer insurance services (**product option group**) for the product with several **product options**: 
* One-year coverage insurance $100
* Two-yer coverage insurance $150
* Three-year coverage insurance $200 etc.

{% endinfo_block %}

## Product Options in the Storefront
On the product detail page, the new product option group (1) will be displayed as a drop-down list with the option values (2). 

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product-option-yves.png){height="" width=""}

For more information about what other actions customers can perform on the product detail page, see [Shop Guide - Managing Products](https://documentation.spryker.com/docs/shop-guide-managing-products). 

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



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/file-details-product-optioncsv" class="mr-link">Import product options</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-product-option-pricecsv" class="mr-link">Import product option prices</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-product-options-feature-integration" class="mr-link">Integrate the Product Options Glue API</a></li> 
                <li><a href="https://documentation.spryker.com/docs/mg-product-option" class="mr-link">Migrate to a newer version of Product Option module</a></li> 
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/creating-a-product-option" class="mr-link">Create a product option</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-options" class="mr-link">Manage Product Options</a></li>
            </ul>
        </div>
    </div>
</div>
