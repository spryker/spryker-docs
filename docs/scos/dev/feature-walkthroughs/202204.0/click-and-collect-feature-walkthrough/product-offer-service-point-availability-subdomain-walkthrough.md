---
title: Click and Collect feature Product Offer Service Point Availability subdomain walkthrough
last_updated: Nov 02, 2023
description: |
  Explore the intricacies of the Product Offer Service Point Availability subdomain in the Click and Collect feature. Learn about the modules, installation of the feature, and the extension points for calculating and filtering data related to the availability of a product offer at a service point. Enhance your understanding with examples of plugins and strategies used in the availability calculation process.

template: concept-topic-template
---

# Product Offer Service Point Availability

The Product Offer Service Point Availability subdomain refers to the calculation of product availability at service points.

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

Example:

**\Spryker\Client\ClickAndCollectExample\Plugin\ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin**

This plugin calculates product offer availabilities per service point for each item in the request based on the provided conditions.

## 3. Extension point for filtering data about the availability of a product offer at a service point.

Provides the ability to filter product offer service point availability collection by provided criteria. The plugin gets executed after a list of `ProductOfferServicePointAvailabilityResponseItemTransfer` is created.

**\Spryker\Client\ProductOfferServicePointAvailabilityStorageExtension\Dependency\Plugin\ProductOfferServicePointAvailabilityFilterPluginInterface**

Example:

**\Spryker\Client\ProductOfferShipmentTypeAvailabilityStorage\Plugin\ProductOfferServicePointAvailabilityStorage\ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin**

This plugin filters product offer availability data at the service point by shipment type if it exists in the criteria of the availability request.
