---
title: "Marketplace Merchant feature: Domain model"
description: Merchants are product and service sellers in the Marketplace.
last_updated: Nov 05, 2021
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202307.0/marketplace-merchant-feature-walkthrough.html
---

The *Marketplace Merchant* feature lets you create, read, and update merchants in the Marketplace.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the Marketplace Merchant feature:

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/4f21e574-8d7e-45ac-a7da-d16a8eb709c1.png?utm_medium=live&utm_source=confluence)


| MODULE   | DESCRIPTION  |
|------------|-----------|
| [MerchantProfile](https://github.com/spryker/merchant-profile)   | Provides data structure, facade methods, and plugins for extending merchant by merchant profile data. |
| [MerchantProfileDataImport](https://github.com/spryker/merchant-profile-data-import)  | Importer for `MerchantProfile` data.    |
| [MerchantProfileGui](https://github.com/spryker/merchant-profile-gui)  | Provides Zed UI interface for merchant profile management.     |
| [MerchantSearch](https://github.com/spryker/merchant-search)   | Manages Elasticsearch documents for merchant entities.   |
| [MerchantSearchExtension](https://github.com/spryker/merchant-search-extension)    | Provides plugin interfaces to extend the `MerchantSearch` module from the other modules.         |
| [MerchantStorage](https://github.com/spryker/merchant-storage)   | Manages storage for merchant entities.                                                           |
| [MerchantUserGui](https://github.com/spryker/merchant-user-gui)   | Provides Zed UI interface for merchant users management.   |
| [MerchantPage](https://github.com/spryker-shop/merchant-page)   | Contains the merchant page for the shop and its components.                                      |
| [MerchantProfileWidget](https://github.com/spryker-shop/merchant-profile-widget)   | Provides a merchant-profile molecule for introducing merchant profile information.      |
| [MerchantWidget](https://github.com/spryker-shop/merchant-widget)     | Provides widget to display merchant information.     |
| [MerchantProfileMerchantPortalGui](https://github.com/spryker/merchant-profile-merchant-portal-gui) | Provides Zed UI interface for merchant profile management for the Merchant Portal.               |
| [MerchantRestApi](https://github.com/spryker/merchants-rest-api)  | Provides REST API endpoints to manage merchants.      |
| [MerchantRestApiExtension](https://github.com/spryker/merchants-rest-api-extension)   | Provides plugin interfaces to extend the `MerchantsRestApi` module from the other modules.       |
| [Merchant](https://github.com/spryker/merchant)    | Provides DB structure and facade methods to save, update, or remove merchants.   |
| [MerchantUser](https://github.com/spryker/merchant-user)     | Provides data structure, facade methods, and plugins for user relation to merchant.    |
| [MerchantSearchWidget](https://github.com/spryker-shop/merchant-search-widget)   | Provides a widget to render a merchants filter.    |


## Domain model

The following diagram illustrates the domain model of the Marketplace Merchant feature:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/73486462-e9d3-4eb2-93ef-a5cde49cce98.png?utm_medium=live&utm_source=custom)
