---
title: Marketplace Shopping Lists feature walkthrough
description: The Marketplace Shopping Lists feature allows customers to create and share multiple lists of merchant products and product offers between company business units or single users.
template: feature-walkthrough-template
---

The *Marketplace Shopping Lists* feature allows customers to create and share multiple lists of merchant products and product offers between company business units or single users. Shopping lists can be shared between users with different sets of permissions.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Shopping List feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-shopping-list-feature-overview.html) for business users.

{% endinfo_block %}

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

## Related Developer documents

| INTEGRATION GUIDES  | GLUE API GUIDES  | DATA IMPORT   |
|-----------------|-------------|-----------------|
| [Marketplace Shopping Lists feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shopping-lists-feature-integration.html) | [Managing shopping lists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/shopping-lists/managing-shopping-lists.html) | [File details: file-details-product-offer-shopping-list.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-shopping-list.csv.html) |
| [Glue API: Marketplace Shopping Lists feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-shopping-lists-feature-integration.html)   | [Managing shopping list items](/docs/marketplace/dev/glue-api-guides/{{page.version}}/shopping-lists/managing-shopping-list-items.html) | | | |
