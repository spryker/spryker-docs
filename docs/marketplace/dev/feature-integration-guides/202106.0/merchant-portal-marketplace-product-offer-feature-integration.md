---
title: Merchant Portal - Marketplace Product Offer feature integration
last_updated: Jan 05, 2021
description: This integration guide provides steps on how to integrate the Merchant Portal - Marketplace Product Offer feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Product Offer feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product Offer feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Product Offer        | dev-master  | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-offer-feature-integration.html)
| Marketplace Merchant Portal Core | dev-master  | [Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-merchant-portal-core-feature-integration.html)

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-merchant-portal-gui:"dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY  |
| ------------- | --------------- |
| ProductOfferMerchantPortalGui | spryker/product-offer-merchant-portal-gui |
| PriceProductOfferVolume | spryker/price-product-offer-volume |

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
| MerchantDashboardCard      | class | Created | src/Generated/Shared/Transfer/MerchantDashboardCard      |
| MerchantProductOfferCounts | class | Created | src/Generated/Shared/Transfer/MerchantProductOfferCounts |

{% endinfo_block %}

### 3) Set up behavior

To set up behavior, take the following steps.

#### Extend OrderItemsTable in SalesMerchantPortalGui

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
    
#### Extend and validate PriceProducts with volume quantity for Offers

Activate the following plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE |
| --------------- | ------------ | ----------- | ------------ |
| PriceProductOfferVolumeExpanderPlugin | Expands `PriceProductTransfer` with `volumeQuantity`. | | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |
| PriceProductOfferVolumeValidatorPlugin | Validates volume prices. | | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |

**src/Pyz/Zed/PriceProductOffer/PriceProductOfferDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PriceProductOffer;

use Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer\PriceProductOfferVolumeExpanderPlugin;
use Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer\PriceProductOfferVolumeValidatorPlugin;

class PriceProductOfferDependencyProvider extends SprykerPriceProductOfferDependencyProvider
{
    /**
     * @return \Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferExpanderPluginInterface[]
     */
    protected function getPriceProductOfferExpanderPlugins(): array
    {
        return [
            new PriceProductOfferVolumeExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferValidatorPluginInterface[]
     */
    protected function getPriceProductOfferValidatorPlugins(): array
    {
        return [
            new PriceProductOfferVolumeValidatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

* Make sure the `PriceProductOfferVolumeExpanderPlugin` plugin is set up by checking if the volume quantity field is filled in the PriceProductTable when editing a product offer in the Merchant Portal.
* Make sure the `PriceProductOfferVolumeValidatorPlugin` plugin is set up by submitting a price with a higher quantity than 1.

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

### 4) Configure export to Redis

To configure the export of product offer prices to Redis, take the following steps:

#### Set up publishers

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE |
| --------------- | ------------ | ----------- | ------------ |
| PriceProductStoreWritePublisherPlugin | Publishes product offer prices data by update events from spy_price_product_store table. | | Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Publisher\PriceProductOffer |

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Publisher\PriceProductOffer\PriceProductStoreWritePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getPriceProductOfferStoragePlugins()
        );
    }
    
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPriceProductOfferStoragePlugins(): array
    {
        return [
            new PriceProductStoreWritePublisherPlugin(),
        ];
    }
}
```
