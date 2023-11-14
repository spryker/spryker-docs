---
title: Click and Collect feature Product Offer Shipment Type subdomain walkthrough
last_updated: Nov 02, 2023
description: |
  Immerse yourself in the Product Offer Shipment Type subdomain of the Click and Collect feature. Gain insights into the connection between product offers and shipment types, and learn how to install and configure the necessary modules for seamless integration. Discover the significance of data setup and explore extension points for filtering shipment types assigned to product offers before publishing them to storage.

template: concept-topic-template
---

# Product Offer Shipment Type

The Product Offer Shipment Type subdomain deals with the connection between product offers and shipment types.

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

## 2. Data Setup

Spryker offers an import functionality (check the `ProductOfferShipmentTypeDataImport` module) to establish the connection between shipment types and product offers.

## 3. Extension point for filtering shipment types assigned to product offers before publishing them to the Storage.

This extension point provides the ability to filter the product offer shipment type collection before publishing it to storage.

**\Spryker\Zed\ProductOfferShipmentTypeStorageExtension\Dependency\Plugin\ProductOfferShipmentTypeStorageFilterPluginInterface**

An example:

**\Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferShipmentTypeStorage\MerchantProductOfferShipmentTypeStorageFilterPlugin**

This plugin filters out `ProductOfferShipmentTypeCollectionTransfer.productOfferShipmentTypes` with product offers from inactive merchants.
