---
title: Merchant Portal - Product Offer feature integration
last_updated: Jan 05, 2021
summary: This integration guide provides steps on how to integrate the Merchant Portal - Product Offer feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Merchant Portal - Product Offer feature core.

## Prerequisites

To start feature integration, overview, and install the necessary features:

| Name                         | Version |
| --------------------------- | ---------- |
| Marketplace Product Offer        | dev-master  |
| Marketplace Merchant Portal Core | dev-master  |

### 1) Install the required modules using composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/product-offer-merchant-portal-gui:"dev-master" --update-with-dependencies
```

Make sure that the following modules have been installed:

| Module                    | Expected Directory                  |
| ----------------------- | ----------------------------------- |
| ProductOfferMerchantPortalGui | spryker/product-offer-merchant-portal-gui |

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```


Make sure that the following changes have been applied in transfer objects:

| Transfer  | Type  | Event   | Path    |
| ----------------- | ---- | ------ | ----------------------- |
| MerchantDashboardCard      | class | Created | src/Generated/Shared/Transfer/MerchantDashboardCard      |
| MerchantProductOfferCounts | class | Created | src/Generated/Shared/Transfer/MerchantProductOfferCounts |

### 3) Set up behavior

### Extend OrderItemsTable in SalesMerchantPortalGui 

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| ----------------------- | -------------- | -------------- | ----------------------- |
| ProductOfferMerchantOrderItemTableExpanderPlugin | Adds merchantReference and ProductOfferSku to Sales tables in MerchantPortal | Marketplace Sales Merchant Portal integrated | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin |

src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php

```php
<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\ProductOfferMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesMerchantPortalGuiExtension\Dependency\Plugin\MerchantOrderItemTableExpanderPluginInterface[]
     */
    protected function getMerchantOrderItemTableExpanderPlugins(): array
    {
        return [
            new ProductOfferMerchantOrderItemTableExpanderPlugin(),
        ];
    }
}
```

Make sure that the `ProductOfferMerchantOrderItemTableExpanderPlugin` plugin is set up by opening ` http://zed.mysprykershop.com/sales-merchant-portal-gui/orders`. Click on any of the orders and check that columns “Merchant Reference” and “Product Offer SKU” are present. 

### Add Offer widget to MerchantDashobard

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace  |
| ---------------- | --------------- | ------------- | ----------------- |
| OffersMerchantDashboardCardPlugin | Adds Offers widget on MerchantDashobard | None              | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin |

src/Pyz/Zed/DashboardMerchantPortalGui/DashboardMerchantPortalGuiDependencyProvider.php

```php
<?php

namespace Pyz\Zed\DashboardMerchantPortalGui;

use Spryker\Zed\DashboardMerchantPortalGui\DashboardMerchantPortalGuiDependencyProvider as SprykerDashboardMerchantPortalGuiDependencyProvider;
use Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui\OffersMerchantDashboardCardPlugin;
class DashboardMerchantPortalGuiDependencyProvider extends SprykerDashboardMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\DashboardMerchantPortalGuiExtension\Dependency\Plugin\MerchantDashboardCardPluginInterface[]
     */
    protected function getDashboardCardPlugins(): array
    {
        return [
            new OffersMerchantDashboardCardPlugin(),
        ];
    }
}
```

Make sure that the `OffersMerchantDashboardCardPlugin` plugin is set up by opening `http://zed.mysprykershop.com/dashboard-portal-gui`. The Offers widget should show up at the page. 