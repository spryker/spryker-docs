---
title: Marketplace Merchant feature walkthrough
description: Merchants are product and service sellers in the Marketplace.
last_updated: Nov 05, 2021
template: feature-walkthrough-template
---

The *Marketplace Merchant* feature lets you create, read, and update merchants in the Marketplace.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Merchant feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) for business users.

{% endinfo_block %}


## Module dependency graph

The following diagram illustrates the dependencies between the modules for the Marketplace Merchant feature:

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/42f7f5aa-2eee-4149-9b9e-50052e870946.png?utm_medium=live&utm_source=custom)


| MODULE | DESCRIPTION |
| --- | --- |
| [MerchantProfile](https://github.com/spryker/merchant-profile) | Provides data structure, facade methods, and plugins for extending merchant by merchant profile data. |
| [MerchantProfileDataImport](https://github.com/spryker/merchant-profile-data-import) | Importer for `MerchantProfile` data. |
| [MerchantProfileGui](https://github.com/spryker/merchant-profile-gui) | Provides Zed UI interface for merchant profile management. |
| [MerchantSearch](https://github.com/spryker/merchant-search) | Manages Elasticsearch documents for merchant entities. |
| [MerchantSearchExtension](https://github.com/spryker/merchant-search-extension) | Provides plugin interfaces to extend the `MerchantSearch` module from the other modules. |
| [MerchantStorage](https://github.com/spryker/merchant-storage) | Manages storage for merchant entities. |
| [MerchantUserGui](https://github.com/spryker/merchant-user-gui) | Provides Zed UI interface for merchant users management. |
| [MerchantPage](https://github.com/spryker-shop/merchant-page) | Contains the merchant page for the shop and its components. |
| [MerchantProfileWidget](https://github.com/spryker-shop/merchant-profile-widget) | Provides a merchant-profile molecule for introducing merchant profile information. |
| [MerchantWidget](https://github.com/spryker-shop/merchant-widget) | Provides widget to display merchant information. |
| [MerchantProfileMerchantPortalGui](https://github.com/spryker/merchant-profile-merchant-portal-gui) | Provides Zed UI interface for merchant profile management for the Merchant Portal. |
| [MerchantRestApi](https://github.com/spryker/merchants-rest-api) | Provides REST API endpoints to manage merchants. |
| [MerchantRestApiExtension](https://github.com/spryker/merchants-rest-api-extension) | Provides plugin interfaces to extend the `MerchantsRestApi` module from the other modules. |
| [Merchant](https://github.com/spryker/merchant) | Provides DB structure and facade methods to save, update, or remove merchants. |
| [MerchantUser](https://github.com/spryker/merchant-user) | Provides data structure, facade methods, and plugins for user relation to merchant. |


## Domain model

The following diagram illustrates the domain model of the Marketplace Merchant feature:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/73486462-e9d3-4eb2-93ef-a5cde49cce98.png?utm_medium=live&utm_source=custom)


## Related Developer articles

| INTEGRATION GUIDES | GLUE API GUIDES | DATA IMPORT |
| --- | --- | --- |
|[Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |[Retrieving merchants](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchants.html) | [File details: merchant.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant.csv.html) |
|[Glue API: Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-merchant-feature-integration.html) | [Searching the product catalog](/docs/marketplace/dev/glue-api-guides/{{page.version}}/searching-the-product-catalog.html) | [File details: merchant_profile.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-profile.csv.html) |
| [Merchant Portal - Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-merchant-feature-integration.html) | [Retrieving autocomplete and search suggestions](/docs/marketplace/dev/glue-api-guides/{{page.version}}/retrieving-autocomplete-and-search-suggestions.html) | [File details: merchant_profile_address.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-profile-address.csv.html) |
|     | [Resolving the URL of the merchant page](/docs/marketplace/dev/glue-api-guides/{{page.version}}/resolving-search-engine-friendly-urls.html) |[File details: merchant_stock.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-stock.csv.html) |
|   |   | [File details: merchant_store.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-store.csv.html)  |
