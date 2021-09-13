---
title: Marketplace Return Management feature walkthrough
last_updated: Aug 09, 2021
description: This article provides technical details on the Marketplace Return Management feature.
template: concept-topic-template
---

With the *Marketplace Return Management* feature, marketplace merchants can manage their returns.

To learn more about the feature and to find out how end users use it, see [Marketplace Return Management](/docs/marketplace/user/features/{{page.version}}/marketplace-return-management-feature-overview.html) feature overview for business users.

## Related Developer articles

| INTEGRATION GUIDES      | GLUE API GUIDES     |
| -------------------- | -------------- |
| [Marketplace Return Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-return-management-feature-integration.html) | [Managing the returns](/docs/marketplace/dev/glue-api-guides/{{page.version}}/managing-the-returns.html) |
| [Glue API: Marketplace Return Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-return-management-feature-integration.html) |                                                              |

## Marketplace Return Management - Module dependency graph
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/e12bcdcb-8510-4ebf-80c3-0ee1c3054002.png?utm_medium=live&utm_source=confluence)

**MerchantSalesReturn** - Provides functionality to link merchant to sales returns.

**MerchantSalesReturnGui** - Provides Zed UI interface for merchant sales returns.

**MerchantSalesReturnMerchantUserGui** - Provides Zed UI interface for merchant user sales return management.

**MerchantSalesReturnWidget** - Provides merchant information for sales returns.

**SalesReturn** - Handling order returns.

**SalesReturnDataImport** - Importing data about returns.

**SalesReturnPage** - Provides functionality to manage order returns.

**SalesReturnSearch** - Managing Elasticsearch documents for Return entities.

## Marketplace Return Management - Domain model
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/9f01ed2f-2be0-4e59-afa3-e56fd8390b51.png?utm_medium=live&utm_source=confluence)
