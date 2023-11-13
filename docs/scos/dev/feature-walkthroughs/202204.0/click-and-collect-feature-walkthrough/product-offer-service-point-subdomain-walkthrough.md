---
title: Click and Collect feature Product Offer Service Point subdomain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Product Offer Service Point

Refers to the connection between product offer and service point.

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

## 2. Data set up

Spryker offers import (check `ProductOfferServicePointDataImport` module) functionality to set up the connection between product offers and service points.

## 3. Extension point for filtering services assigned to the product offers before publishing them to Storage

Provides ability to filter Product Offer Service collection before publishing it to the Storage.

**\Spryker\Zed\ProductOfferServicePointStorageExtension\Dependency\Plugin\ProductOfferServiceCollectionStorageFilterPluginInterface**

An example:

**\Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferServicePointStorage\MerchantProductOfferServiceStorageFilterPlugin**

The plugin filters product offer services collection by active and approved merchants.
