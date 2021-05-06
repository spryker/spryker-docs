---
title: Merchant Portal - Product Offer feature integration
last_updated: Jan 05, 2021
description: This integration guide provides steps on how to integrate the Merchant Portal - Product Offer feature into a Spryker project.
template: feature-integration-guide-template
---

## Install feature core
Follow the steps below to install the Merchant Portal - Product Offer feature core.

## Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| ---------------- | ---------- | -----------|
| Marketplace Product Offer        | dev-master  | [Product Offer feature integration](docs/marketplace/dev/feature-integration-guides/product-offer-feature-integration.html) |
| Marketplace Merchant Portal Core | dev-master  | [Merchant Portal Core feature integration](docs/marketplace/dev/feature-integration-guides/merchant-portal-core-feature-integration.html) |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/product-offer-merchant-portal-gui:"dev-master" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY|
| ----------- | --------------- |
| ProductOfferMerchantPortalGui | spryker/product-offer-merchant-portal-gui |

---

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```


Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| ----------------- | ---- | ------ | ----------------------- |
| MerchantDashboardCard      | class | Created | src/Generated/Shared/Transfer/MerchantDashboardCard      |
| MerchantProductOfferCounts | class | Created | src/Generated/Shared/Transfer/MerchantProductOfferCounts |

### 3) Set up behavior
To set up behavior, take the following steps

#### Extend OrderItemsTable in SalesMerchantPortalGui

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ----------------------- | -------------- | -------------- | ----------------------- |
| ProductOfferMerchantOrderItemTableExpanderPlugin | Adds merchantReference and ProductOfferSku to Sales tables in MerchantPortal | Marketplace Sales Merchant Portal integrated | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

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

---
**Verification**

Make sure that the `ProductOfferMerchantOrderItemTableExpanderPlugin` plugin is set up by opening http://zed.mysprykershop.com/sales-merchant-portal-gui/orders. Click on any of the orders and check that columns “Merchant Reference” and “Product Offer SKU” are present.

---

#### Add the Offer widget to MerchantDashobard

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ---------------- | --------------- | ------------- | ----------------- |
| OffersMerchantDashboardCardPlugin | Adds Offers widget on MerchantDashobard |               | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin |

**src/Pyz/Zed/DashboardMerchantPortalGui/DashboardMerchantPortalGuiDependencyProvider.php**

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

---
**Verification**

Make sure that the `OffersMerchantDashboardCardPlugin` plugin is set up by opening http://zed.mysprykershop.com/dashboard-portal-gui. The Offers widget should show up at the page.

---
