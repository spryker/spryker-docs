---
title: Marketplace Product feature walkthrough
description: A Marketplace Product feature adds merchant information to the product that a merchant sells.
template: feature-walkthrough-template
---

The *Marketplace Product* feature provides a relation between Products and Merchants. 
`MerchantProductAbstract` is a database table used to store data with the Product and Merchant relations. The [Product features work as in the Spryker Commerce OS](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html).
However, on the Storefront, there are additional plugins and widgets to support the relation between Products and Merchants.
Products are extended with the merchant's data and, when purchased, are assigned to the appropriate `MerchantOrder`.
See [Marketplace Merchant Portal product management](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-portal-product-management-feature-walkthrough.html) to learn more about managing products in the Merchant Portal.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-feature-overview.html) feature overview for business users.
{% endinfo_block %}

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

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html) | [Retrieve abstract products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/abstract-products/retrieving-abstract-products.html) | [File details: merchant-product.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product.csv.html) |
| [Glue API: Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-feature-integration.html) | [Retrieve concrete products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-concrete-products.html) | [File details: product_price.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-price.csv.html) |
| [Marketplace Product + Cart feature integration](https://spryker-docs.herokuapp.com/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-cart-feature-integration.html) | [Retrieve abstract product lists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/content-items/retrieving-abstract-products-in-abstract-product-lists.html) |                                                              |
| [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-marketplace-product-offer-feature-integration.html) |                                                              |                                                              |
| [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html) |                                                              |                                                              |
| [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |                                                              |                                                              |
| [Merchant Portal - Marketplace Product + Tax feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-tax-feature-integration.html) |                                                              |                                                              |
