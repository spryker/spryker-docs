---
title: "Marketplace Inventory Management feature: Domain model"
description: Merchants are product and service sellers in the Marketplace.
template: feature-walkthrough-template
last_updated: Nov 21, 2023
---

The _Marketplace Inventory Management_ implies stock & availability management as well as multiple warehouse stock management for product offers and marketplace products.

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
