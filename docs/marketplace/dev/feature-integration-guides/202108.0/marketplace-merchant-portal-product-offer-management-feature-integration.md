---
title: Marketplace Merchant Portal Product Offer Management feature integration
last_updated: Jan 05, 2021
description: This integration guide provides steps on how to integrate the Marketplace Merchant Portal Product Offer Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Portal Product Offer Management feature into a Spryker project.

## Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Product Offer        | {{page.version}}  | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)
| Marketplace Merchant Portal Core | {{page.version}}  | [Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-core-feature-integration.html)

## 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-merchant-portal-gui:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY  |
| ------------- | --------------- |
| ProductOfferMerchantPortalGui | spryker/product-offer-merchant-portal-gui |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE  | EVENT   | PATH |
| ------------- | ---- | ------ |---------------- |
| MerchantDashboardCard      | class | Created | src/Generated/Shared/Transfer/MerchantDashboardCard      |
| MerchantProductOfferCounts | class | Created | src/Generated/Shared/Transfer/MerchantProductOfferCounts |

{% endinfo_block %}

## 3) Set up behavior

To set up behavior, take the following steps.

### Extend OrderItemsTable in SalesMerchantPortalGui

Activate the following plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE |
| --------------- | ------------ | ----------- | ------------ |
| ProductOfferMerchantOrderItemTableExpanderPlugin | Adds `merchantReference` and `ProductOfferSku` to Sales tables in the `MerchantPortal`. | Marketplace Sales Merchant Portal integrated | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin |

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

{% info_block warningBox "Verification" %}

Make sure that the `ProductOfferMerchantOrderItemTableExpanderPlugin` is set up by opening `http://zed.mysprykershop.com/sales-merchant-portal-gui/orders`. Click on any of the orders and check that the *Merchant Reference* and *Product Offer SKU* are present.

{% endinfo_block %}


#### Add the Offer widget to MerchantDashboard

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE  |
| ---------------- | ------------- | --------- | ---------------- |
| OffersMerchantDashboardCardPlugin | Adds Offers widget to `MerchantDashboard`. | | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin |

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

{% info_block warningBox "Verification" %}

Make sure that the `OffersMerchantDashboardCardPlugin` plugin is set up by opening `http://zed.mysprykershop.com/dashboard-portal-gui`. The Offers widget should show up on the page.

{% endinfo_block %}
