---
title: Click and Collect feature Product Offer Service Point subdomain walkthrough
last_updated: Nov 02, 2023
description: |
  Explore the Product Offer Service Point subdomain in the Click and Collect feature. Understand the connection between product offers and service points, and learn how to install and configure the necessary modules for seamless integration. Discover the significance of data setup and explore extension points for filtering services assigned to product offers before publishing them to storage.

template: concept-topic-template
---

# Product Offer Service Point

The Product Offer Service Point subdomain refers to the connection between product offers and service points.

[Install the Product Offer Service Points feature](/docs/pbc/all/install-features/{{page.version}}/install-the-product-offer-service-points-feature.html)

## 1. Modules:

| MODULE                                                         | EXPECTED DIRECTORY                                                                   |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------|
| ProductOfferServicePoint                                       | vendor/spryker/product-offer-service-point                                           |
| ProductOfferServicePointAvailabilitiesRestApi                  | vendor/spryker/product-offer-service-point-availabilities-rest-api                   |
| ProductOfferServicePointAvailability                           | vendor/spryker/product-offer-service-point-availability                              |
| ProductOfferServicePointAvailabilityCalculatorStorage          | vendor/spryker/product-offer-service-point-availability-calculator-storage           |
| ProductOfferServicePointAvailabilityCalculatorStorageExtension | vendor/spryker/product-offer-service-point-availability-calculator-storage-extension |
| ProductOfferServicePointAvailabilityStorage                    | vendor/spryker/product-offer-service-point-availability-storage                      |
| ProductOfferServicePointAvailabilityStorageExtension           | vendor/spryker/product-offer-service-point-availability-storage-extension            |
| ProductOfferServicePointDataImport                             | vendor/spryker/product-offer-service-point-data-import                               |
| ProductOfferServicePointGui                                    | vendor/spryker/product-offer-service-point-gui                                       |
| ProductOfferServicePointMerchantPortalGui                      | vendor/spryker/product-offer-service-point-merchant-portal-gui                       |
| ProductOfferServicePointStorage                                | vendor/spryker/product-offer-service-point-storage                                   |
| ProductOfferServicePointStorageExtension                       | vendor/spryker/product-offer-service-point-storage-extension                         |
| ProductOfferServicePointAvailabilityWidget                     | vendor/spryker-shop/product-offer-service-point-availability-widget                  |

## 2. Data Setup

Spryker offers an import functionality (check the `ProductOfferServicePointDataImport` module) to establish the connection between product offers and service points.

## 3. Extension point for filtering services assigned to the product offers before publishing them to Storage

This extension point provides the ability to filter the Product Offer Service collection before publishing it to storage.

**\Spryker\Zed\ProductOfferServicePointStorageExtension\Dependency\Plugin\ProductOfferServiceCollectionStorageFilterPluginInterface**

Example:

**\Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferServicePointStorage\MerchantProductOfferServiceStorageFilterPlugin**

This plugin filters the product offer services collection by active and approved merchants.
