

This document describes how to install the Product Offer Service Points Availability feature.

## Install feature core

Follow the steps below to install the Product Offer Service Points Availability feature core.

### Prerequisites

Install the required features:

| NAME                             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                         |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer Service Points     | 202507.0 | [Install the Product Offer Service Points feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-feature.html)            |
| Marketplace Inventory Management | 202507.0 | [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-feature.html) |

### 1) Install the required modules

1. Install the required modules using Composer:

```bash
composer require spryker-feature/product-offer-service-points-availability: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                                         | EXPECTED DIRECTORY                                                                   |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------|
| ProductOfferServicePointAvailability                           | vendor/spryker/product-offer-service-point-availability                              |
| ProductOfferServicePointAvailabilityCalculatorStorage          | vendor/spryker/product-offer-service-point-availability-calculator-storage           |
| ProductOfferServicePointAvailabilityCalculatorStorageExtension | vendor/spryker/product-offer-service-point-availability-calculator-storage-extension |
| ProductOfferServicePointAvailabilitiesRestApi                  | vendor/spryker/product-offer-service-point-availabilities-rest-api                   |
| ProductOfferServicePointAvailabilityStorage                    | vendor/spryker/product-offer-service-point-availability-storage                      |
| ProductOfferServicePointAvailabilityStorageExtension           | vendor/spryker/product-offer-service-point-availability-storage-extension            |
| ProductOfferServicePointAvailabilityWidget                     | vendor/spryker-shop/product-offer-service-point-availability-widget                  |

{% endinfo_block %}

2. Optional: To install an example calculator strategy for the Click & Collect product offer service point availability, install the following module:

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

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                                               | TYPE  | EVENT   | PATH                                                                                                         |
|------------------------------------------------------------------------|-------|---------|--------------------------------------------------------------------------------------------------------------|
| ProductOfferCriteria                                                   | class | created | src/Generated/Shared/Transfer/ProductOfferCriteriaTransfer                                                   |
| ProductAvailabilityCriteria                                            | class | created | src/Generated/Shared/Transfer/ProductAvailabilityCriteriaTransfer                                            |
| ServicePoint                                                           | class | created | src/Generated/Shared/Transfer/ServicePointTransfer                                                           |
| SellableItemRequest                                                    | class | created | src/Generated/Shared/Transfer/SellableItemRequestTransfer                                                    |
| ProductOfferConditions                                                 | class | created | src/Generated/Shared/Transfer/ProductOfferConditionsTransfer                                                 |
| SellableItemsResponse                                                  | class | created | src/Generated/Shared/Transfer/SellableItemsResponseTransfer                                                  |
| SellableItemResponse                                                   | class | created | src/Generated/Shared/Transfer/SellableItemResponseTransfer                                                   |
| SellableItemsRequest                                                   | class | created | src/Generated/Shared/Transfer/SellableItemsRequestTransfer                                                   |
| ProductOfferCollection                                                 | class | created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer                                                 |
| ProductOfferServiceCollection                                          | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCollectionTransfer                                          |
| ProductOfferServiceCriteria                                            | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCriteriaTransfer                                            |
| ProductOfferServiceConditions                                          | class | created | src/Generated/Shared/Transfer/ProductOfferServiceConditionsTransfer                                          |
| ProductOffer                                                           | class | created | src/Generated/Shared/Transfer/ProductOfferTransfer                                                           |
| ProductOfferServices                                                   | class | created | src/Generated/Shared/Transfer/ProductOfferServicesTransfer                                                   |
| Service                                                                | class | created | src/Generated/Shared/Transfer/ServiceTransfer                                                                |
| ProductOfferServicePointAvailabilityRequestItem                        | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityRequestItemTransfer                        |
| ProductOfferServicePointAvailabilityConditions                         | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityConditionsTransfer                         |
| ProductOfferServicePointAvailabilityCriteria                           | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityCriteriaTransfer                           |
| ProductOfferServicePointAvailabilityResponseItem                       | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityResponseItemTransfer                       |
| ProductOfferServicePointAvailabilityCollection                         | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityCollectionTransfer                         |
| ProductOfferStorage                                                    | class | created | src/Generated/Shared/Transfer/ProductOfferStorageTransfer                                                    |
| ServiceStorage                                                         | class | created | src/Generated/Shared/Transfer/ServiceStorageTransfer                                                         |
| ServiceTypeStorage                                                     | class | created | src/Generated/Shared/Transfer/ServiceTypeStorageTransfer                                                     |
| ProductOfferAvailabilityStorage                                        | class | created | src/Generated/Shared/Transfer/ProductOfferAvailabilityStorageTransfer                                        |
| ProductOfferStorageCollection                                          | class | created | src/Generated/Shared/Transfer/ProductOfferStorageCollectionTransfer                                          |
| ProductOfferStorageCriteria                                            | class | created | src/Generated/Shared/Transfer/ProductOfferStorageCriteriaTransfer                                            |
| ServicePointStorage                                                    | class | created | src/Generated/Shared/Transfer/ServicePointStorageTransfer                                                    |
| Store                                                                  | class | created | src/Generated/Shared/Transfer/StoreTransfer                                                                  |
| RestProductOfferServicePointAvailabilitiesRequestAttributes            | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilitiesRequestAttributesTransfer            |
| RestProductOfferServicePointAvailabilityRequestItemsAttributes         | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilityRequestItemsAttributesTransfer         |
| RestProductOfferServicePointAvailabilitiesResponseAttributes           | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilitiesResponseAttributesTransfer           |
| RestProductOfferServicePointAvailabilityResponseItemsAttributes        | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilityResponseItemsAttributesTransfer        |
| RestProductOfferServicePointAvailabilitiesResponseAttributesCollection | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilitiesResponseAttributesCollectionTransfer |
| RestErrorMessage                                                       | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer                                                       |

{% endinfo_block %}

### 3) Set up behavior

Set up the following behaviors.

#### Enable the availability plugin

| PLUGIN                                                  | SPECIFICATION                                   | PREREQUISITES | NAMESPACE                                                                                                                                  |
|---------------------------------------------------------|-------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| ProductOfferServicePointBatchAvailabilityStrategyPlugin | Validates the service point for a product offer.  |           | Spryker\Zed\ProductOfferServicePointAvailability\Communication\Plugin\Availability\ProductOfferServicePointBatchAvailabilityStrategyPlugin |

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

1. Add a product offer with a service point to cart.

2. In the `spy_product_offer_service` database table, delete the connection between the product offer and the service point.

3. Try to create an order.
    Make sure you get the error message about the product being unavailable.

{% endinfo_block %}

#### Enable the demo Click & Collect availability calculator strategy plugin

Optional: If you've installed the example module in [1) Install the required modules](#install-the-required-modules), enable the following example plugin.

| PLUGIN                                                                             | SPECIFICATION                                                                                                                                                                             | PREREQUISITES | NAMESPACE                                    |
|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------|
| ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin | Calculates and returns product offer availabilities by service point UUID for requested items, prioritizing the matching criteria. Takes into account merchant references if provided. |               | Spryker\Client\ClickAndCollectExample\Plugin |

**src/Pyz/Client/ProductOfferServicePointAvailabilityCalculatorStorage/ProductOfferServicePointAvailabilityCalculatorStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferServicePointAvailabilityCalculatorStorage;

use Spryker\Client\ClickAndCollectExample\Plugin\ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin;
use Spryker\Client\ProductOfferServicePointAvailabilityCalculatorStorage\ProductOfferServicePointAvailabilityCalculatorStorageDependencyProvider as SprykerProductOfferServicePointAvailabilityCalculatorStorageDependencyProvider;

class ProductOfferServicePointAvailabilityCalculatorStorageDependencyProvider extends SprykerProductOfferServicePointAvailabilityCalculatorStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ProductOfferServicePointAvailabilityCalculatorStorageExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityCalculatorStrategyPluginInterface>
     */
    protected function getProductOfferServicePointAvailabilityCalculatorStrategyPlugins(): array
    {
        return [
            new ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin(),
        ];
    }
}
```

#### Enable the Storefront API

To enable the Storefront API, register the following plugin:

| PLUGIN        | SPECIFICATION                                                        | PREREQUISITES | NAMESPACE                                                  |
|-----------------------------------------------------------|----------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ProductOfferServicePointAvailabilitiesResourceRoutePlugin | Registers the `product-offer-service-point-availabilities` resource. |               | Spryker\Glue\ProductOfferServicePointAvailabilitiesRestApi |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductOfferServicePointAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferServicePointAvailabilitiesResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductOfferServicePointAvailabilitiesResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Send the following request:

`POST https://glue.mysprykershop.com/product-offer-service-point-availabilities`

```json
  {
      "data": {
          "type": "product-offer-service-point-availabilities",
          "attributes": {
              "servicePointUuids": [
                  "{{service-point-uuid}}"
              ],
              "serviceTypeUuid": "{{service-type-uuid}}",
              "productOfferServicePointAvailabilityRequestItems": [
                  {
                      "productConcreteSku": "{{product-concrete-sku}}",
                      "productOfferReference": "{{product-offer-reference}}",
                      "quantity": 1
                  }
              ]
          }
      }
  }
```

Make sure you get a valid response.

{% endinfo_block %}

## Install feature frontend

Follow the steps to install the Product Offer Service Points Availability feature frontend.

### 1) Add translations

1. Append the glossary:

```csv
product_offer_service_point_availability_widget.all_items_available,All items are available.,en_US
product_offer_service_point_availability_widget.all_items_available,Alle Produkte sind verfügbar.,de_DE
product_offer_service_point_availability_widget.some_items_not_available,Some items are not available.,en_US
product_offer_service_point_availability_widget.some_items_not_available,Einige der Produkte sind nicht verfügbar.,de_DE
product_offer_service_point_availability_widget.all_items_not_available,Not available.,en_US
product_offer_service_point_availability_widget.all_items_not_available,Keine der Produkte sind verfügbar.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 2) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN                                            | SPECIFICATION                                                                     | PREREQUISITES  | NAMESPACE                                                           |
|---------------------------------------------------|-----------------------------------------------------------------------------------|----------------|---------------------------------------------------------------------|
| ProductOfferServicePointAvailabilityDisplayWidget | Enables the message about the product offer availability for service points. |                | SprykerShop\Yves\ProductOfferServicePointAvailabilityWidget\Widget  |
| ProductOfferServicePointAvailabilityWidget        | Shows the product offer availability for service points.         |                | SprykerShop\Yves\ProductOfferServicePointAvailabilityWidget\Widget  |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductOfferServicePointAvailabilityWidget\Widget\ProductOfferServicePointAvailabilityDisplayWidget;
use SprykerShop\Yves\ProductOfferServicePointAvailabilityWidget\Widget\ProductOfferServicePointAvailabilityWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductOfferServicePointAvailabilityWidget::class,
            ProductOfferServicePointAvailabilityDisplayWidget::class,
        ];
    }
}
```
