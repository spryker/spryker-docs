---
title: Click and Collect feature Product Offer Service Point Availability subdomain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Product Offer Service Point Availability

Refers to the availability calculation.

[Install the Product Offer Service Points Availability feature](/docs/pbc/all/install-features/{{page.version}}/install-the-product-offer-service-points-availability-feature.html)

## 1. Modules:

| MODULE                                                         | EXPECTED DIRECTORY                                                                   |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------|
| ProductOfferServicePointAvailabilitiesRestApi                  | vendor/spryker/product-offer-service-point-availabilities-rest-api                   |
| ProductOfferServicePointAvailability                           | vendor/spryker/product-offer-service-point-availability                              |
| ProductOfferServicePointAvailabilityCalculatorStorage          | vendor/spryker/product-offer-service-point-availability-calculator-storage           |
| ProductOfferServicePointAvailabilityCalculatorStorageExtension | vendor/spryker/product-offer-service-point-availability-calculator-storage-extension |
| ProductOfferServicePointAvailabilityStorage                    | vendor/spryker/product-offer-service-point-availability-storage                      |
| ProductOfferServicePointAvailabilityStorageExtension           | vendor/spryker/product-offer-service-point-availability-storage-extension            |

## 2. Extension point for calculating the availability of a product offer at a service point.

The plugin is used to calculate product offer availability at the service point based on specific needs.

**\Spryker\Client\ProductOfferServicePointAvailabilityCalculatorStorageExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityCalculatorStrategyPluginInterface**

An example:

**\Spryker\Client\ClickAndCollectExample\Plugin\ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin**

The plugin calculates product offer availabilities per service point for each item in request based on the provided conditions.

## 3. Extension point for filtering data about the availability of a product offer at a service point.

Provides ability to filter product offer service point availability collection by provided criteria. The plugin gets executed after a list of `ProductOfferServicePointAvailabilityResponseItemTransfer` is created.

**\Spryker\Client\ProductOfferServicePointAvailabilityStorageExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityFilterPluginInterface**

An example:

**\Spryker\Client\ProductOfferShipmentTypeAvailabilityStorage\Plugin\ProductOfferServicePointAvailabilityStorage\ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin**

The plugin filters product offer availability data at the service point by shipment type in case of its existence in the criteria of the availability request.
