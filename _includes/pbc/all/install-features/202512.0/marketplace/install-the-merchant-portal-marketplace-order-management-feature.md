
This document describes how to install the Merchant Portal - Marketplace Order Management feature.

## Prerequisites

Install the required features:

| NAME  | VERSION | INSTALLATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Merchant Portal Core | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Marketplace Order Management | 202507.0 | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

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

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE  | EVENT   | PATH |
| ------------- | ---- | ------ |---------------- |
| MerchantOrderTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantOrderTableCriteriaTransfer |
| MerchantOrderItemTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantOrderItemTableCriteriaTransfer |
| MerchantOrderCounts | class | Created | src/Generated/Shared/Transfer/MerchantOrderCountsTransfer |
| MerchantOrderCollection.pagination | property | Created | src/Generated/Shared/Transfer/MerchantOrderCollectionTransfer |
| MerchantOrder.merchantOrderItemCount | property | Created | src/Generated/Shared/Transfer/MerchantOrderTransfer |
| MerchantOrderItem.product | property | Created | src/Generated/Shared/Transfer/MerchantOrderItemTransfer |
| MerchantOrderItemCollection.pagination | property | Created | src/Generated/Shared/Transfer/MerchantOrderItemCollectionTransfer |

{% endinfo_block %}


### 3) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES   | NAMESPACE   |
| --------------- | -------------- | ------ | -------------- |
| OrdersMerchantDashboardCardPlugin | Adds Merchant orders card to MerchantDashboard |  | Spryker\Zed\SalesMerchantPortalGui\Communication\Plugin |

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

Make sure that the `OrdersMerchantDashboardCardPlugin` plugin is set up by opening `http://mp.mysprykershop.com/dashboard-portal-gui`. The Merchant Orders card should be presented on the page.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE |INTEGRATION GUIDE |
| --- | --- | --- |
| Merchant Portal - Marketplace Merchant Portal Product Offer Management + Merchant Portal Order Management |  |[Install the Merchant Portal -  Marketplace Merchant Portal Product Offer Management + Marketplace Order Management feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-merchant-portal-product-offer-management-merchant-portal-order-management-feature.html) |
