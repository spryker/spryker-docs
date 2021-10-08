---
title: Marketplace Product feature walkthrough
description: A Marketplace Product feature adds merchant information to the product that a merchant sells.
template: feature-walkthrough-template
---

<!--- Feature summary. Short and precise explanation of what the feature brings in terms of functionality.
-->

Product is a central entity of a shop. The Product feature allows shop administrators to create a rich product catalog. Product configuration is highly customizable, so they can create different types of products.
A Marketplace Product feature adds merchant information to the product that a Merchant sells. Product Restrictions from Merchant to Buyer give merchants another layer of control over the information, a customer can see in the shop application. Based on product restrictions, you can:
create a list of products, hide the product information for the products (pricing, appearance in the search/filters), and limit access to a product details page.
There are two options for the Merchants to start selling in Marketplace: Either through creation of a completely new product to sell them without offers, or complement marketplace products with new offer. 
A Merchant can assign attributes and custom labels to products, add product attributes, use limited offers and pricing.
Customers can filter products and offers by Merchants right in the catalog or find them through the search function.

<!--- Feel free to drop the following part if the User doc is not yet published-->
{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-feature-overview.html) feature overview for business users.
{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/15402fef-7a49-4ff6-bdc7-9e82f2f92011.png?utm_medium=live&utm_source=confluence)
<!--
Diagram content:
    -The module dependency graph SHOULD contain all the modules that are specified in the feature  (don't confuse with the module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide the role each module plays in this feature
-->

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantProduct | Provides the connection between product entities and merchant entities.  |
| MerchantProductDataImport | Imports relations between products and merchants from .csv file.  |
| ProductMerchantPortalGui | Provides components for merchant products management.  |
| ProductMerchantPortalGuiExtension | Provides extension interfaces for ProductMerchantPortalGui module.  |
| MerchantProductSearch | Manages Elasticsearch documents for merchant product entities.  |

## Domain model
<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD also be shown and highlighted properly 
- Make sure to follow the same style as in the example
-->
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
