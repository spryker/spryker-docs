---
title: Click and Collect feature Product Offer Shipment Type subdomain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Product Offer Shipment Type

Refers to the connection between product offer and shipment type.

[Install the Product Offer Shipment feature](/docs/pbc/all/install-features/{{page.version}}/install-the-product-offer-shipment-feature.html)

## 1. Modules:

| MODULE                                                  | EXPECTED DIRECTORY                                                           |
|---------------------------------------------------------|------------------------------------------------------------------------------|
| ProductOfferShipmentType                                | vendor/spryker/product-offer-shipment-type                                   |
| ProductOfferShipmentTypeAvailability                    | vendor/spryker/product-offer-shipment-type-availability                      |
| ProductOfferShipmentTypeDataImport                      | vendor/spryker/product-offer-shipment-type-data-import                       |
| ProductOfferShipmentTypeGui                             | vendor/spryker/product-offer-shipment-type-gui                               |
| ProductOfferShipmentTypeMerchantPortalGui               | vendor/spryker/product-offer-shipment-type-merchant-portal-gui               |
| ProductOfferShipmentTypeStorage                         | vendor/spryker/product-offer-shipment-type-storage                           |
| ProductOfferShipmentTypeStorageExtension                | vendor/spryker/product-offer-shipment-type-storage-extension                 |

## 2. Data set up

Spryker offers import (check `ProductOfferShipmentTypeDataImport` module) functionality to set up the connection between shipment types and product offers.

## 3. Extension point for filtering shipment types assigned to product offers before publishing them to the Storage.

Provides ability to filter product offer shipment type collection before publishing it to the Storage.

**\Spryker\Zed\ProductOfferShipmentTypeStorageExtension\Dependency\Plugin\ProductOfferShipmentTypeStorageFilterPluginInterface**

An example:

**\Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferShipmentTypeStorage\MerchantProductOfferShipmentTypeStorageFilterPlugin**

The plugin filters out ProductOfferShipmentTypeCollectionTransfer.productOfferShipmentTypes with product offers from inactive merchants.
