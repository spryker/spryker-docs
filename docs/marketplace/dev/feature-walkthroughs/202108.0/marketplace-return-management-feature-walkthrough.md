---
title: Marketplace Return Management feature walkthrough
description: This article provides technical details on the Marketplace Return Management feature.
template: feature-walkthrough-template
---

With the *Marketplace Return Management* feature, marketplace merchants can manage their returns.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Return Management](/docs/marketplace/user/features/{{page.version}}/marketplace-return-management-feature-overview.html) feature overview for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Return Management* feature.

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/e12bcdcb-8510-4ebf-80c3-0ee1c3054002.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantSalesReturn | Provides functionality to link merchant to sales returns   |
| MerchantSalesReturnGui | Provides Backoffice UI for merchant sales returns  |
| MerchantSalesReturnMerchantUserGui | Provides Backoffice UI for merchant user sales return management   |
| MerchantSalesReturnWidget | Provides merchant information for sales returns on Yves   |
| MerchantSalesReturnsRestApi | Provides REST API endpoints to manage merchant sales returns   |
| SalesReturn | Handles order returns  |
| SalesReturnExtension | Provides an interfaces of plugins to extend SalesReturn module from the other modules  |

## Domain model

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/9f01ed2f-2be0-4e59-afa3-e56fd8390b51.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

| INTEGRATION GUIDES      | GLUE API GUIDES     |
| -------------------- | -------------- |
| [Marketplace Return Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-return-management-feature-integration.html) | [Managing the returns](/docs/marketplace/dev/glue-api-guides/{{page.version}}/managing-the-returns.html) |
| [Glue API: Marketplace Return Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-return-management-feature-integration.html) |                                                              |
