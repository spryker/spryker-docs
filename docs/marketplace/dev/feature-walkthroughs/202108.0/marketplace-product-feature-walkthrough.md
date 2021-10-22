---
title: Marketplace Product feature walkthrough
description: A Marketplace Product feature adds merchant information to the product that a merchant sells.
template: feature-walkthrough-template
---

The *Merchant Product* feature provides relation between Products and Merchants. 
To store data about relations has been created database table `MerchantProductAbstract`.
All the Product features are remain working as before. 
The additional plugins and widgets have been implemented to support relations between Products and Merchants, on the Storefront.
Products are extended with Merchant Data and when purchased are assigned to appropriate MerchantOrder.
For managing products in Merchant Portal has been introduced special feature, more details about you can find here [Marketplace Merchant Portal Product Management](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-portal-product-management-feature-walkthrough.html).

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-feature-overview.html) feature overview for business users.
{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/15402fef-7a49-4ff6-bdc7-9e82f2f92011.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantProduct | Provides the connection between product entities and merchant entities.  |
| MerchantProductDataImport | Imports relations between products and merchants from .csv file.  |
| ProductMerchantPortalGui | Provides components for merchant products management.  |
| ProductMerchantPortalGuiExtension | Provides extension interfaces for ProductMerchantPortalGui module.  |
| MerchantProductStorage | Manages storage for merchant product abstract.  |
| MerchantProductWidget | Provides merchant product abstract information.  |
| Product | Provides base infrastructure and CRUD operations to handle abstract product and concrete products.  |
| ProductAttribute | Managing product attributes defined in the JSON fields as well as attribute meta information.  |
| ProductPageSearch | Manages Elasticsearch documents for product entities.  |
| ProductSearch | Handles all the functionality needed to dynamically handle product attribute search and filter preferences.  |
| ProductStorage | Manages storage for products.   |
| ProductValidity | Provides validity dates for product concretes.  |
| MerchantProductsRestApi | Provides REST API endpoints to manage merchant products.  |
| CartsRestApiExtension | Provides plugin interfaces used by CartsRestApi module.  |

## Domain model
![Domain Model](https://confluence-connect.gliffy.net/embed/image/80809f75-1f94-4f19-9cfd-e39235026e89.png?utm_medium=live&utm_source=confluence)

## Related Developer articles
<!-- Usually filled by a technical writer. You can omit this part -->

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html) | [Retrieve abstract products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/abstract-products/retrieving-abstract-products.html) | [File details: merchant-product.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product.csv.html) |
| [Glue API: Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-feature-integration.html) | [Retrieve concrete products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-concrete-products.html) | [File details: product_price.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-price.csv.html) |
| [Marketplace Product + Cart feature integration](https://spryker-docs.herokuapp.com/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-cart-feature-integration.html) | [Retrieve abstract product lists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/content-items/retrieving-abstract-products-in-abstract-product-lists.html) |                                                              |
| [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-marketplace-product-offer-feature-integration.html) |                                                              |                                                              |
| [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html) |                                                              |                                                              |
| [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |                                                              |                                                              |
| [Merchant Portal - Marketplace Product + Tax feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-tax-feature-integration.html) |                                                              |                                                              |
