

This document describes how to integrate the Service Points Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points Cart feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME           | VERSION           | INTEGRATION GUIDE                                                                                                                                                |
|----------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points | {{page.version}}  | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-and-upgrade/install-the-service-points-feature.html) |
| Cart           | {{page.version}}  | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/cart-feature-overview/cart-feature-overview.html)                          |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/service-points-cart: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                          |
|-------------------------|---------------------------------------------|
| ServicePointCart        | vendor/spryker/service-point-cart           |
| ServicePointCartPage    | vendor/spryker-shop/service-point-cart-page |

{% endinfo_block %}

Also, we offer the example Click & Collect service point cart replacement strategies. To use them, install the following module:

```bash
composer require spryker/click-and-collect-example: "^0.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                 | EXPECTED DIRECTORY                       |
|------------------------|------------------------------------------|
| ClickAndCollectExample | vendor/spryker/click-and-collect-example |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```
| TRANSFER                         | TYPE  | EVENT   | PATH                                                                   |
|----------------------------------|-------|---------|------------------------------------------------------------------------|
| QuoteError                       | class | created | src/Generated/Shared/Transfer/QuoteErrorTransfer                       |
| QuoteResponse                    | class | created | src/Generated/Shared/Transfer/QuoteResponseTransfer                    |
| Quote                            | class | created | src/Generated/Shared/Transfer/QuoteTransfer                            |
| Currency                         | class | created | src/Generated/Shared/Transfer/CurrencyTransfer                         |
| Item                             | class | created | src/Generated/Shared/Transfer/ItemTransfer                             |
| ShipmentType                     | class | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                     |
| Shipment                         | class | created | src/Generated/Shared/Transfer/ShipmentTransfer                         |
| ProductOfferServicePoint         | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointTransfer         |
| ProductOfferPrice                | class | created | src/Generated/Shared/Transfer/ProductOfferPriceTransfer                |
| ProductOfferStock                | class | created | src/Generated/Shared/Transfer/ProductOfferStockTransfer                |
| ProductOfferServicePointCriteria | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointCriteriaTransfer | 
| ServicePointCollection           | class | created | src/Generated/Shared/Transfer/ServicePointCollectionTransfer           |
| ServicePointCriteria             | class | created | src/Generated/Shared/Transfer/ServicePointCriteriaTransfer             |
| ServicePointConditions           | class | created | src/Generated/Shared/Transfer/ServicePointConditionsTransfer           |
| ServicePoint                     | class | created | src/Generated/Shared/Transfer/ServicePointTransfer                     |
| CheckoutResponse                 | class | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer                 |
| CheckoutError                    | class | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer                    |
| Store                            | class | created | src/Generated/Shared/Transfer/StoreTransfer                            |
| StoreRelation                    | class | created | src/Generated/Shared/Transfer/StoreRelationTransfer                    |

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

### 3) Add translations

1. Append the glossary according to your configuration:

```csv
service_point_cart.checkout.validation.error,Selected service point "%uuid%" is not available for the store "%store_name%",en_US
service_point_cart.checkout.validation.error,Der ausgewählte Servicepunkt "%uuid%" ist für den Shop "%store_name%" nicht verfügbar,de_DE
```

### 4) Set up behavior

1. Register plugins:

| PLUGIN                                           | SPECIFICATION                                                                                    | PREREQUISITES | NAMESPACE                                                   |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| ServicePointCheckoutPreConditionPlugin           | Validates if `QuoteTransfer.items.servicePoint` are active and available for the current store.  | None          | Spryker\Zed\ServicePointCart\Communication\Plugin\Checkout  |

{% info_block warningBox "Verification" %}

* Make sure that if you deactivate service point selected during the checkout, you will receive the corresponding validation error on checkout summary page.

{% endinfo_block %}

2. Enable the demo Click & Collect replacement strategy plugins:

For the demo purpose, we propose the example of the Click & Collect replacement strategy.

| PLUGIN                                                                   | SPECIFICATION                                                                                                                   | PREREQUISITES | NAMESPACE                                                                |
|--------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| ClickAndCollectExampleDeliveryServicePointQuoteItemReplaceStrategyPlugin | Replaces product offers for `QuoteTransfer.items` that have `delivery` shipment type with suitable product offers replacements. |               | Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart |
| ClickAndCollectExamplePickupServicePointQuoteItemReplaceStrategyPlugin   | Replaces product offers for `QuoteTransfer.items` that have `pickup` shipment type with suitable product offers replacements.   |               | Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart |

**src/Pyz/Zed/ServicePointCart/ServicePointCartDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ServicePointCart;

use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleDeliveryServicePointQuoteItemReplaceStrategyPlugin;
use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExamplePickupServicePointQuoteItemReplaceStrategyPlugin;
use Spryker\Zed\ServicePointCart\ServicePointCartDependencyProvider as SprykerServicePointCartDependencyProvider;

class ServicePointCartDependencyProvider extends SprykerServicePointCartDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface>
     */
    protected function getServicePointQuoteItemReplaceStrategyPlugins(): array
    {
        return [
            new ClickAndCollectExampleDeliveryServicePointQuoteItemReplaceStrategyPlugin(),
            new ClickAndCollectExamplePickupServicePointQuoteItemReplaceStrategyPlugin(),
        ];
    }
}
```
