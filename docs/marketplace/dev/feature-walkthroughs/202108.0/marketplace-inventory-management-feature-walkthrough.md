---
title: Marketplace Inventory Management feature walkthrough
description: Merchants are product and service sellers in the Marketplace.
template: feature-walkthrough-template
---

The _Marketplace Inventory Management_ implies stock & availability management as well as multiple warehouse stock management for product offers and marketplace products.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Inventory Management feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-inventory-management-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/72767452-8b31-46fd-9c23-8d5416fd02e6.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION |
|---|---|
| Availability |  Product availability is calculated based on the current stock and amount of reserved items (items in the current open orders). The `Availability` module calculates the `ProductAbstract` and `ProductConcrete` availability, and the calculated availability is persisted. This calculations is crucial to prevent overselling.|
| AvailabilityGui | User interface module to manage the stock and availability information in the Zed Administration Interface. |
| AvailabilityStorage | Manages storage for merchant product offer. |
| AvailabilityWidget | Provides widgets that can determine a product's availability status.|
| MerchantStock | Provides data structure, facade methods and plugins for extending merchant by merchant stock data. |
| MerchantStockDataImport | Data importer for `MerchantStock`. |
| MerchantStockGui | Provides Zed UI interface for merchant stock management. |
| ProductOfferAvailability | Provides the core functionality for product offer availability features. |
| ProductOfferAvailabilityStorage | Manages storage for product offer availability data. |
| ProductOfferStock | Allows connecting product offers and their stocks. |
| ProductOfferStockDataImport | Data importer for `ProductOfferStock`. |
| ProductOfferStockGui | Zed Administrative Interface component for managing stocks for product offers. |
| Stock | Manages products stocks. It is possible to define several storage locations in which products are stored. A product can have multiple stock entries associated with it, and each of these is associated to a storage location. Stocks can be attached only to concrete products. It is also possible to define a product as never out of stock by using a corresponding flag. |
| StockDataImport | This module has demo data and importer for stock. |
| StockGui | Zed Gui for the `Stock` module. |

## Domain model

![Domain Model](https://confluence-connect.gliffy.net/embed/image/7be7c0cf-b4d5-41c5-bfc3-e30b76efce31.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES |DATA IMPORT |
|---------|---------|
| [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-feature-integration.html) | [File details: merchant_stock.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-stock.csv.html) |
| [Glue API: Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-inventory-management-feature-integration.html)  | [File details: product_offer_stock.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-stock.csv.html) |
| [Marketplace Inventory Management + Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-order-management-feature-integration.html) | [File details: combined_merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-combined-merchant-product-offer.csv.html) |
| [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html) ||
| [Marketplace Inventory Management + Packaging Units feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-packaging-units-feature-integration.html) ||
