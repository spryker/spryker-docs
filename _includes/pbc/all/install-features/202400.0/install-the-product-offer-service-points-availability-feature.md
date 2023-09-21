

This document describes how to integrate the Product Offer Service Points Availability feature into a Spryker project.

## Install feature core

Follow the steps below to install the Product Offer Service Points Availability feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                             | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                         |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer Service Points     | {{page.version}} | [Install the Product Offer Service Points feature](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-and-upgrade/install-the-product-offer-service-points-feature.html)            |
| Marketplace Inventory Management | {{page.version}} | [Marketplace Inventory Management feature integration](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html) |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/product-offer-service-points-availability: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                  | EXPECTED DIRECTORY                                                           |
|---------------------------------------------------------|------------------------------------------------------------------------------|
| ProductOfferServicePointAvailability                    | vendor/spryker/product-offer-service-point-availability                      |
| ProductOfferServicePointAvailabilityExtension           | vendor/spryker/product-offer-service-point-availability-extension            |
| ProductOfferServicePointAvailabilityCalculator          | vendor/spryker/product-offer-service-point-availability-calculator           |
| ProductOfferServicePointAvailabilityCalculatorExtension | vendor/spryker/product-offer-service-point-availability-calculator-extension |

{% endinfo_block %}

Also, we offer the example Click & Collect product offer service point availability calculator strategy. To use it, install the following module:

```bash
composer require spryker/click-and-collect-example: "^0.1.0" --update-with-dependencies
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

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                                         | TYPE  | EVENT   | PATH                                                                                   |
|--------------------------------------------------|-------|---------|----------------------------------------------------------------------------------------|
| ProductOfferCriteria                             | class | created | src/Generated/Shared/Transfer/ProductOfferCriteriaTransfer                             |
| ProductAvailabilityCriteria                      | class | created | src/Generated/Shared/Transfer/ProductAvailabilityCriteriaTransfer                      |
| ServicePoint                                     | class | created | src/Generated/Shared/Transfer/ServicePointTransfer                                     |
| SellableItemRequest                              | class | created | src/Generated/Shared/Transfer/SellableItemRequestTransfer                              |
| ProductOfferConditions                           | class | created | src/Generated/Shared/Transfer/ProductOfferConditionsTransfer                           |
| SellableItemsResponse                            | class | created | src/Generated/Shared/Transfer/SellableItemsResponseTransfer                            |
| SellableItemResponse                             | class | created | src/Generated/Shared/Transfer/SellableItemResponseTransfer                             |
| SellableItemsRequest                             | class | created | src/Generated/Shared/Transfer/SellableItemsRequestTransfer                             |
| ProductOfferCollection                           | class | created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer                           |
| ProductOfferServiceCollection                    | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCollectionTransfer                    |
| ProductOfferServiceCriteria                      | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCriteriaTransfer                      |
| ProductOfferServiceConditions                    | class | created | src/Generated/Shared/Transfer/ProductOfferServiceConditionsTransfer                    |
| ProductOffer                                     | class | created | src/Generated/Shared/Transfer/ProductOfferTransfer                                     |
| ProductOfferServices                             | class | created | src/Generated/Shared/Transfer/ProductOfferServicesTransfer                             |
| Service                                          | class | created | src/Generated/Shared/Transfer/ServiceTransfer                                          |
| ProductOfferServicePointAvailabilityRequestItem  | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityRequestItemTransfer  |
| ProductOfferServicePointAvailabilityConditions   | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityConditionsTransfer   |
| ProductOfferServicePointAvailabilityCriteria     | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityCriteriaTransfer     |
| ProductOfferServicePointAvailabilityResponseItem | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityResponseItemTransfer |
| ProductOfferServicePointAvailabilityCollection   | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityCollectionTransfer   |
| ProductOfferStorage                              | class | created | src/Generated/Shared/Transfer/ProductOfferStorageTransfer                              |
| ServiceStorage                                   | class | created | src/Generated/Shared/Transfer/ServiceStorageTransfer                                   |
| ServiceTypeStorage                               | class | created | src/Generated/Shared/Transfer/ServiceTypeStorageTransfer                               |
| ProductOfferAvailabilityStorage                  | class | created | src/Generated/Shared/Transfer/ProductOfferAvailabilityStorageTransfer                  |
| ProductOfferStorageCollection                    | class | created | src/Generated/Shared/Transfer/ProductOfferStorageCollectionTransfer                    |
| ProductOfferStorageCriteria                      | class | created | src/Generated/Shared/Transfer/ProductOfferStorageCriteriaTransfer                      |
| ServicePointStorage                              | class | created | src/Generated/Shared/Transfer/ServicePointStorageTransfer                              |
| Store                                            | class | created | src/Generated/Shared/Transfer/StoreTransfer                                            |

{% endinfo_block %}

### 3) Set up behavior

#### 1. Register the availability plugin:

| PLUGIN                                                  | SPECIFICATION                                   | PREREQUISITES | NAMESPACE                                                                                                                                  |
|---------------------------------------------------------|-------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| ProductOfferServicePointBatchAvailabilityStrategyPlugin | Validates service point for the product offer.  | None          | Spryker\Zed\ProductOfferServicePointAvailability\Communication\Plugin\Availability\ProductOfferServicePointBatchAvailabilityStrategyPlugin |

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\ProductOfferServicePointAvailability\Communication\Plugin\Availability\ProductOfferServicePointBatchAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityExtension\Dependency\Plugin\BatchAvailabilityStrategyPluginInterface>
     */
    protected function getBatchAvailabilityStrategyPlugins(): array
    {
        return [
            new ProductOfferServicePointBatchAvailabilityStrategyPlugin(), // Needs to be before ProductConcreteBatchAvailabilityStrategyPlugin
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the availability plugin works correctly:

1.  Add a product offer with the service point to your cart.

2.  Go to `spy_product_offer_service` and delete the connection between the product offer and the service point.

3.  Try to create an order. You should see the error message that the product isn't available at the moment.

{% endinfo_block %}

#### 2. Enable the demo Click & Collect availability calculator strategy plugin:

For the demo purpose, we propose the example of the Click & Collect product offer service point availability calculator strategy.

| PLUGIN                                                                             | SPECIFICATION                                                                                                                                                                             | PREREQUISITES | NAMESPACE                                    |
|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------|
| ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin | Calculates product offer availabilities, considers merchant references if provided, and returns availabilities by service point UUID for requested items, prioritizing matching criteria. |               | Spryker\Client\ClickAndCollectExample\Plugin |

**src/Pyz/Client/ProductOfferServicePointAvailabilityCalculator/ProductOfferServicePointAvailabilityCalculatorDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ProductOfferServicePointAvailabilityCalculator;

use Spryker\Client\ClickAndCollectExample\Plugin\ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin;
use Spryker\Client\ProductOfferServicePointAvailabilityCalculator\ProductOfferServicePointAvailabilityCalculatorDependencyProvider as SprykerProductOfferServicePointAvailabilityCalculatorDependencyProvider;

class ProductOfferServicePointAvailabilityCalculatorDependencyProvider extends SprykerProductOfferServicePointAvailabilityCalculatorDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ProductOfferServicePointAvailabilityCalculatorExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityCalculatorStrategyPluginInterface>
     */
    protected function getProductOfferServicePointAvailabilityCalculatorStrategyPlugins(): array
    {
        return [
            new ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin(),
        ];
    }
}
```
