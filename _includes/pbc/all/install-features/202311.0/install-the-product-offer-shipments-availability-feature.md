

This document describes how to integrate the Product Offer Shipments Availability feature into a Spryker project.

## Install feature core

Follow the steps below to install the Product Offer Shipments Availability feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                                      |
|-------------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer Service Points Availability | {{page.version}} | [Install the Product Offer Service Points Availability feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-and-upgrade/install-the-product-offer-service-points-availability-feature.html) |
| Shipment                                  | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                                     |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/product-offer-shipment-availability: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                        | EXPECTED DIRECTORY                                 |
|-----------------------------------------------|----------------------------------------------------|
| ProductOfferShipmentAvailability              | vendor/spryker/product-offer-shipment-availability |

{% endinfo_block %}


### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                                               | TYPE  | EVENT   | PATH                                                                                   |
|--------------------------------------------------------|-------|---------|----------------------------------------------------------------------------------------|
| ProductOfferCriteria                                   | class | created | src/Generated/Shared/Transfer/ProductOfferCriteriaTransfer                             |
| ProductAvailabilityCriteria                            | class | created | src/Generated/Shared/Transfer/ProductAvailabilityCriteriaTransfer                      |
| ShipmentType                                           | class | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                                     |
| SellableItemRequest                                    | class | created | src/Generated/Shared/Transfer/SellableItemRequestTransfer                              |
| ProductOfferConditions                                 | class | created | src/Generated/Shared/Transfer/ProductOfferConditionsTransfer                           |
| SellableItemsResponse                                  | class | created | src/Generated/Shared/Transfer/SellableItemsResponseTransfer                            |
| SellableItemResponse                                   | class | created | src/Generated/Shared/Transfer/SellableItemResponseTransfer                             |
| SellableItemsRequest                                   | class | created | src/Generated/Shared/Transfer/SellableItemsRequestTransfer                             |
| ProductOfferCollection                                 | class | created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer                           |
| ProductOffer                                           | class | created | src/Generated/Shared/Transfer/ProductOfferTransfer                                     |
| ProductOfferShipmentTypeCollection                     | class | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeCollectionTransfer               |
| ProductOfferShipmentTypeCriteria                       | class | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeCriteriaTransfer                 |
| ProductOfferShipmentTypeConditions                     | class | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeConditionsTransfer               |
| ProductOfferShipmentType                               | class | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeTransfer                         |
| ProductOfferServicePointAvailabilityConditions         | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityConditionsTransfer   |
| ProductOfferServicePointAvailabilityCollection         | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityCollectionTransfer   |
| ProductOfferServicePointAvailabilityCriteria           | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityCriteriaTransfer     |
| ProductOfferServicePointAvailabilityResponseItem       | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityResponseItemTransfer |
| ProductOfferStorage                                    | class | created | src/Generated/Shared/Transfer/ProductOfferStorageTransfer                              |
| ShipmentTypeStorage                                    | class | created | src/Generated/Shared/Transfer/ShipmentTypeStorageTransfer                              |
| ShipmentTypeStorageConditions                          | class | created | src/Generated/Shared/Transfer/ShipmentTypeStorageConditionsTransfer                    |
| ShipmentTypeStorageCriteria                            | class | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCriteriaTransfer                      |
| ShipmentTypeStorageCollection                          | class | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCollectionTransfer                    |

{% endinfo_block %}

## Set up behavior

Register the availability plugin:

| PLUGIN                                                  | SPECIFICATION                                  | PREREQUISITES | NAMESPACE                                                                                                                                   |
|---------------------------------------------------------|------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| ProductOfferShipmentTypeBatchAvailabilityStrategyPlugin | Validates shipment type for the product offer. | None          | Spryker\Zed\ProductOfferShipmentTypeAvailability\Communication\Plugin\Availability\ProductOfferShipmentTypeBatchAvailabilityStrategyPlugin  |

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\ProductOfferShipmentTypeAvailability\Communication\Plugin\Availability\ProductOfferServicePointBatchAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityExtension\Dependency\Plugin\BatchAvailabilityStrategyPluginInterface>
     */
    protected function getBatchAvailabilityStrategyPlugins(): array
    {
        return [
            new ProductOfferShipmentTypeBatchAvailabilityStrategyPlugin(), // Needs to be before ProductConcreteBatchAvailabilityStrategyPlugin
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that availability plugin works correctly:

1.  Add a product offer with the shipment type to your cart.

2.  Go to `spy_product_offer_shipment_type` and delete the connection between the product offer and the service point.

3.  Try to create an order. You should see the error message that the product isn't available at the moment.

{% endinfo_block %}

2. Register the availability filter plugin:

| PLUGIN                                                        | SPECIFICATION                                                     | PREREQUISITES | NAMESPACE                                                                                                                                                    |
|---------------------------------------------------------------|-------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin  | Filters product offer service point availability by shipmen type. | None          | Spryker\Client\ProductOfferShipmentTypeAvailability\Plugin\ProductOfferServicePointAvailability\ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin |

**src/Pyz/Client/ProductOfferServicePointAvailability/ProductOfferServicePointAvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferServicePointAvailability;

use Spryker\Client\ProductOfferServicePointAvailability\ProductOfferServicePointAvailabilityDependencyProvider as SprykerProductOfferServicePointAvailabilityDependencyProvider;
use Spryker\Client\ProductOfferShipmentTypeAvailability\Plugin\ProductOfferServicePointAvailability\ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin;

class ProductOfferServicePointAvailabilityDependencyProvider extends SprykerProductOfferServicePointAvailabilityDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ProductOfferServicePointAvailabilityExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityFilterPluginInterface>
     */
    protected function getProductOfferServicePointAvailabilityFilterPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin(),
        ];
    }
}
```