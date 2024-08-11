

This document describes how to install the Marketplace Merchant Portal Product Offer Management feature.

## Prerequisites

Install the required features:

| NAME  | VERSION | INSTALLATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Product Offer        | {{page.version}}  | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html)
| Marketplace Merchant Portal Core | {{page.version}}  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)


### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-merchant-portal-product-offer-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY  |
| ------------- | --------------- |
| ProductOfferMerchantPortalGui | vendor/spryker/product-offer-merchant-portal-gui |

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
| MerchantProductOfferCounts | class | Created | src/Generated/Shared/Transfer/MerchantProductOfferCountsTransfer |
| MerchantStockCriteria.merchantReference | property | Created | src/Generated/Shared/Transfer/MerchantStockCriteriaTransfer |
| PriceProductOfferCriteria.volumeQuantities | property | Created | src/Generated/Shared/Transfer/PriceProductOfferCriteriaTransfer |
| PriceProductOfferTableCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductOfferTableCriteriaTransfer |
| PriceProductOfferTableView | class | Created | src/Generated/Shared/Transfer/PriceProductOfferTableViewTransfer |
| PriceProductOfferTableViewCollection | class | Created | src/Generated/Shared/Transfer/PriceProductOfferTableViewCollectionTransfer |
| ProductConcrete.numberOfOffers | property | Created | src/Generated/Shared/Transfer/ProductConcreteTransfer |
| ProductConcrete.productOfferStock | property | Created | src/Generated/Shared/Transfer/ProductConcreteTransfer |
| ProductOffer.createdAt | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOffer.productAttributes | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOffer.productImages | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOffer.productLocalizedAttributes | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOffer.updatedAt | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOfferCollection.pagination | property | Created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer |
| ProductOfferCriteria.merchantIds | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOfferTableCriteria | class | Created | src/Generated/Shared/Transfer/ProductOfferTableCriteriaTransfer |
| ProductTableCriteria | class | Created | src/Generated/Shared/Transfer/ProductTableCriteriaTransfer |
| Item.merchantSku | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

{% endinfo_block %}


### 3) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

To set up behavior:

1. Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE  |
| ---------------- | ------------- | --------- | ---------------- |
| OffersMerchantDashboardCardPlugin | Adds Product Offers card to `MerchantDashobard`. | | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui |

**src/Pyz/Zed/DashboardMerchantPortalGui/DashboardMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DashboardMerchantPortalGui;

use Spryker\Zed\DashboardMerchantPortalGui\DashboardMerchantPortalGuiDependencyProvider as SprykerDashboardMerchantPortalGuiDependencyProvider;
use Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui\OffersMerchantDashboardCardPlugin;
class DashboardMerchantPortalGuiDependencyProvider extends SprykerDashboardMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DashboardMerchantPortalGuiExtension\Dependency\Plugin\MerchantDashboardCardPluginInterface>
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

Make sure that the `OffersMerchantDashboardCardPlugin` plugin is set up by opening `http://mp.mysprykershop.com/dashboard-portal-gui`. The Product Offers card should be presented on the page.

{% endinfo_block %}


## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE |INTEGRATION GUIDE |
| --- | --- | --- |
| Merchant Portal - Marketplace Merchant Portal Product Offer Management + Merchant Portal Order Management |  |[Install the Merchant Portal - Marketplace Merchant Portal Product Offer Management + Marketplace Order Management feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-merchant-portal-product-offer-management-merchant-portal-order-management-feature.html) |
