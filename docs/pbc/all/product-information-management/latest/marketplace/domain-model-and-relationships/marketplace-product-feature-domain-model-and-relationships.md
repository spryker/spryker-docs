---
title: "Marketplace Product feature: Domain model and relationships"
description: A Marketplace Product feature adds merchant information to the product that a merchant sells.
template: feature-walkthrough-template
last_updated: Nov 21, 2023
---

The *Marketplace Product* feature provides a relation between Products and Merchants.
`MerchantProductAbstract` is a database table used to store data with the Product and Merchant relations. The [Product features work as in the Spryker Commerce OS](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html).
However, on the Storefront, there are additional plugins and widgets to support the relation between Products and Merchants.
Products are extended with the merchant's data and, when purchased, are assigned to the appropriate `MerchantOrder`.


## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Product* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/15402fef-7a49-4ff6-bdc7-9e82f2f92011.png?utm_medium=live&utm_source=confluence)
<div class="width-100">

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantProduct](https://github.com/spryker/merchant-product) | Provides connection between the product and merchant entities.  |
| [MerchantProductDataImport](https://github.com/spryker/merchant-product-data-import) | Imports relations between the products and the merchants from the CSV file.  |
| [ProductMerchantPortalGui](https://github.com/spryker/product-merchant-portal-gui) | Provides components for merchant product management.  |
| [ProductMerchantPortalGuiExtension](https://github.com/spryker/product-merchant-portal-gui-extension) | Provides extension interfaces for the  `ProductMerchantPortalGui` module.  |
| [MerchantProductStorage](https://github.com/spryker/merchant-product-storage) | Manages the storage for the merchant product abstract.  |
| [MerchantProductWidget](https://github.com/spryker-shop/merchant-product-widget) | Provides the merchant product abstract information.  |
| [Product](https://github.com/spryker/product) | Provides the base infrastructure and CRUD operations to handle the abstract and concrete products.  |
| [MerchantProductsRestApi](https://github.com/spryker/merchant-products-rest-api) | Provides REST API endpoints to manage the marketplace products.  |
| [CartsRestApiExtension](https://github.com/spryker/carts-rest-api-extension) | Provides plugin interfaces used by the `CartsRestApi` module.  |

</div>

## Domain model

The following schema illustrates the Marketplace Product domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/80809f75-1f94-4f19-9cfd-e39235026e89.png?utm_medium=live&utm_source=confluence)

                                                             |                                                              ||
