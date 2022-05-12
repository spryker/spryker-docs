---
title: Marketplace Shopping Lists feature walkthrough
description: The Marketplace Shopping Lists feature lets you create and manage Marketplace Shopping Lists.
template: feature-walkthrough-template
---

By using the 'Marketplace Shopping Lists' feature, shoppers can add a Merchant Product or a Merchant Offer from PDP to Shopping Lists. Then shoppers can add a Merchant Product or a Merchant Offer from the Shopping List to the Cart so they can be bought.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the {Feature name} feature. 

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/b9b242da-b56f-452d-b44f-7eb740adf1da.png?utm_medium=live&utm_source=custom)

| MODULE                                   | DESCRIPTION                                                                 |
|------------------------------------------|-----------------------------------------------------------------------------|
| ProductOfferShoppingListWidget           | Provides widgets for product offer integration into a shopping list.        |
| ProductOfferShoppingListDataImport       | Provides Data Import for Shopping Lists with Product Offers.                |
| ProductOfferShoppingList                 | Provides product offer functionality for Shopping List.                     |
| MerchantProductShoppingListsRestApi      | Provides REST API endpoints to manage merchant product shopping lists.      |
| MerchantProductOfferShoppingListsRestApi | Provides REST API endpoints to manage merchant product offer shopping list. |
| ProductOfferShoppingListsRestApi         | Provides REST API endpoints to manage product offer shopping list.          |

## Domain model

The following schema illustrates the Marketplace Shipment domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/40d25819-b12d-45ac-938d-c1ee0b68ac44.png?utm_medium=live&utm_source=custom)
