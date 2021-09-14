---
title: Marketplace Merchant Portal Sales Management feature integration
last_updated: Sep 13, 2021
description: This integration guide provides steps on how to integrate the Marketplace Merchant Portal Sales Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Portal Sales Management feature into a Spryker project.

## Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Merchant Portal Core | {{page.version}} | [Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-core-feature-integration.html)
| Marketplace Order Management | {{page.version}} | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html)

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/sales-merchant-portal-gui:"^1.2.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY  |
| ------------- | --------------- |
| SalesMerchantPortalGui | vendor/spryker/sales-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE  | EVENT   | PATH |
| ------------- | ---- | ------ |---------------- |
| MerchantOrderTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantOrderTableCriteriaTransfer |
| MerchantOrderCollection.pagination | property | Created | src/Generated/Shared/Transfer/MerchantOrderCollectionTransfer |
| MerchantOrder.merchantOrderItemCount | property | Created | src/Generated/Shared/Transfer/MerchantOrderTransfer |
| MerchantOrderItem.product | property | Created | src/Generated/Shared/Transfer/MerchantOrderItemTransfer |
| MerchantOrderItemTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantOrderItemTableCriteriaTransfer |
| MerchantOrderItemCollection.pagination | property | Created | src/Generated/Shared/Transfer/MerchantOrderItemCollectionTransfer |
| MerchantOrderCounts | class | Created | src/Generated/Shared/Transfer/MerchantOrderCountsTransfer |

{% endinfo_block %}

### 3) Set up behavior

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES   | NAMESPACE   |
| --------------- | -------------- | ------ | -------------- |
| OrdersMerchantDashboardCardPlugin | Adds the Sales widget to MerchantDashboard |  | Spryker\Zed\SalesMerchantPortalGui\Communication\Plugin |

**src/Pyz/Zed/DashboardMerchantPortalGui/DashboardMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DashboardMerchantPortalGui;

use Spryker\Zed\DashboardMerchantPortalGui\DashboardMerchantPortalGuiDependencyProvider as SprykerDashboardMerchantPortalGuiDependencyProvider;
use Spryker\Zed\SalesMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui\OrdersMerchantDashboardCardPlugin;

class DashboardMerchantPortalGuiDependencyProvider extends SprykerDashboardMerchantPortalGuiDependencyProvider
{
    protected function getDashboardCardPlugins(): array
    {
        return [
            new OrdersMerchantDashboardCardPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET | VERIFICATION |
| ----------- | ---------- |
| SalesMerchantPortalGui| Open MerchantDashboard at `http://mysprykershop.com/dashboard-merchant-portal-gui` and check that the Sales widget is available. |

{% endinfo_block %}

## Related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE |INTEGRATION GUIDE |
| --- | --- | --- |
| Marketplace Merchant Portal Product Offer Management + Merchant Portal Sales Management |  |[Marketplace Merchant Portal Product Offer Management + Merchant Portal Sales Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-product-offer-management-merchant-portal-sales-management-feature-integration.html) |
