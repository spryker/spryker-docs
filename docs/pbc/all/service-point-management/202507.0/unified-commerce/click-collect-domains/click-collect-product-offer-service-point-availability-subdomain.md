---
title: "Click & Collect: Product Offer Service Point Availability subdomain"
last_updated: Nov 02, 2023
description: The Product Offer Service Point Availability subdomain provides the extension points for calculating and filtering data related to the availability of a product offer at a service point.
template: concept-topic-template
---

The Product Offer Service Point Availability subdomain is used to calculate product availability at service points.

## Installation

[Install the Product Offer Service Points Availability feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-availability-feature.html)

## Modules

| MODULE                                                         | EXPECTED DIRECTORY                                                                   |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------|
| ProductOfferServicePointAvailabilitiesRestApi                  | vendor/spryker/product-offer-service-point-availabilities-rest-api                   |
| ProductOfferServicePointAvailability                           | vendor/spryker/product-offer-service-point-availability                              |
| ProductOfferServicePointAvailabilityCalculatorStorage          | vendor/spryker/product-offer-service-point-availability-calculator-storage           |
| ProductOfferServicePointAvailabilityCalculatorStorageExtension | vendor/spryker/product-offer-service-point-availability-calculator-storage-extension |
| ProductOfferServicePointAvailabilityStorage                    | vendor/spryker/product-offer-service-point-availability-storage                      |
| ProductOfferServicePointAvailabilityStorageExtension           | vendor/spryker/product-offer-service-point-availability-storage-extension            |

## Extension point for calculating the availability of a product offer at a service point

The plugin is used to calculate product offer availability at the service point based on specific needs: `\Spryker\Client\ProductOfferServicePointAvailabilityCalculatorStorageExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityCalculatorStrategyPluginInterface`.

The following example plugin calculates product offer availabilities per service point for each item in the request based on the provided conditions:
`\Spryker\Client\ClickAndCollectExample\Plugin\ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin`.


## Extension point for filtering data about the availability of a product offer at a service point

Provides the ability to filter product offer service point availability collection by a provided criteria. The plugin gets executed after a list of `ProductOfferServicePointAvailabilityResponseItemTransfer` is created: `\Spryker\Client\ProductOfferServicePointAvailabilityStorageExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityFilterPluginInterface`.


The following example plugin filters product offer availability data at the service point by shipment type if it exists in the criteria of the availability request: `\Spryker\Client\ProductOfferShipmentTypeAvailabilityStorage\Plugin\ProductOfferServicePointAvailabilityStorage\ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin`.
