---
title: Product Options feature overview
description: The document describes the creation process of product options and how it is managed in the Back Office
last_updated: Jul 26, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-options-feature-overview
originalArticleId: bb06c0c0-3cdb-46de-bf29-37606bd1646b
redirect_from:
  - /docs/scos/user/features/202200.0/product-options-feature-overview.html
  - /docs/scos/user/features/202108.0/product-options-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-options-feature-walkthrough.html  
  - /docs/scos/user/features/202311.0/product-options-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/product-options-feature-walkthrough.html  
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/product-options-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/product-options-feature-overview.html
---

The *Product Options* feature lets a Back Office user create and assign product options to abstract products. Product options are product additions that a customer can select on the product detail page before adding the product to the cart. For example, the product options can be gift wrappings for products, insurance, or warranty. Product options do not have stock but an SKU linked to product abstracts. Thus, you cannot purchase them without buying a corresponding product.

Each product option is defined by:
* Product option group name
* Tax set assigned on the product option group
* Option value
* Translation

*Product option group* holds all available options or *option values* that buyers select. For example, you can have the "Warranty" product option group and create the `1-year warranty` and `2-year warranty` values for it.

With the feature in the Back Office, you can create, update, activate, deactivate, and view all product options available in the system. You also can define a price for product options and select products to which they will be added.

In the Storefront, customers can select and add options to products on the product detail page.

## Product Options in the Back Office

In the Back Office, you can perform the following actions on product options:
* Create a product option.
* Update, view, activate, or deactivate product options.
* Create multiple option values in one option group.
* Specify gross and net prices for options values.
* Assign product option groups to products.
* Activate product options to make them visible in the Storefront.

To learn more about how to work with product options in the Back Office, see [Create product options](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-options/create-product-options.html) and [Edit product options](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-options/edit-product-options.html).

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product-option-back-office.png)

{% info_block infoBox %}

Each product option group may contain as many product options as you need. For example, you can offer insurance services (*product option group*) for the product with several *product options*:
* One-year coverage insurance $100.
* Two-year coverage insurance $150.
* Three-year coverage insurance $200.

{% endinfo_block %}

## Product Options on the Storefront

On the product detail page, the new product option group (1) will be displayed as a drop-down list with the option values (2).

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Options/Product+Options+Overview/product-option-yves.png)

## Current constraints

{% info_block infoBox %}

The feature has the following functional constraints, which are going to be resolved in the future.

{% endinfo_block %}

* Product options are available in all the stores where the corresponding concrete product is available.
* Unlike [Cart](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/shared-carts-feature-overview.html), [Shopping Lists](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) does not support product options.
* If you add a product with an option to a shopping list, the product option gets discarded.
* You cannot define product option prices in a per-merchant manner.
* If you create a product option, the price remains the same for all merchants.
* Unlike other prices in Spryker, the product option price is not bound to any of the available price types. (DEFAULT or ORIGINAL)

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create product options](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-options/create-product-options.html)  |
| [Edit product options](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-options/edit-product-options.html)  |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | DATA IMPORT |
|---------|---------|---------|
| [Shopping Lists + Product Options feature integration](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shopping-lists-product-options-feature.html)  | [ProductOption migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoption-module.html)  |[File details: product_option.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html) |
| [Install the Product options + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-options-order-management-feature.html)  | | [File details: product_option_price.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option-price.csv.html) |
| [Glue API: Product Options feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)  | | |
