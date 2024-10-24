---
title: "Marketplace Shopping Lists feature: Domain model and relationships"
description: The Marketplace Shopping Lists feature allows customers to create and share multiple lists of merchant products and product offers between company business units or single users.
template: feature-walkthrough-template
last_updated: Nov 21, 2023
---

The *Marketplace Shopping Lists* feature allows customers to create and share multiple lists of merchant products and product offers between company business units or single users. Shopping lists can be shared between users with different sets of permissions.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Shopping Lists* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/b9b242da-b56f-452d-b44f-7eb740adf1da.png?utm_medium=live&utm_source=custom)

| MODULE    | DESCRIPTION   |
|----------------|--------------|
| ProductOfferShoppingListWidget           | Provides widgets for product offer integration into a shopping list.                                                                      |
| ProductOfferShoppingListDataImport       | Provides data import for shopping lists with product offers.                                                                              |
| ProductOfferShoppingList                 | Provides product offer functionality for shopping list.                                                                                   |
| MerchantProductShoppingListsRestApi      | Provides REST API endpoints to manage marketplace product shopping lists.                                                                    |
| MerchantProductOfferShoppingListsRestApi | Provides REST API endpoints to manage merchant product offer shopping list.                                                               |
| ProductOfferShoppingListsRestApi         | Provides REST API endpoints to manage product offer shopping list.                                                                        |
| ShoppingList                             | Provides infrastructure and functionality to manage shopping lists as well as the items in shopping lists. |

## Domain model

The following schema illustrates the *Marketplace Shopping Lists* domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/40d25819-b12d-45ac-938d-c1ee0b68ac44.png?utm_medium=live&utm_source=custom)
