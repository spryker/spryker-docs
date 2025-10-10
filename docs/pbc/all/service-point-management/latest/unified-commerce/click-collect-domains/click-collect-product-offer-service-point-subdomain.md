---
title: "Click & Collect: Product Offer Service Point subdomain"
last_updated: Nov 02, 2023
description: The Product Offer Service Point subdomain establishes the connection between product offers and service points.
template: concept-topic-template
---


The Product Offer Service Point subdomain refers to the connection between product offers and service points.

## Installation

[Install the Product Offer Service Points feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-feature.html)

## Modules

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

## Data setup

The `ProductOfferServicePointDataImport` module lets you import the relationships between product offers and service points.

## Extension point for filtering services assigned to the product offers before publishing them to Storage

This extension point provides the ability to filter the Product Offer Service collection before publishing it to storage: `\Spryker\Zed\ProductOfferServicePointStorageExtension\Dependency\Plugin\ProductOfferServiceCollectionStorageFilterPluginInterface`.

The following example plugin filters the product offer services collection by active and approved merchants: `\Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferServicePointStorage\MerchantProductOfferServiceStorageFilterPlugin`.
