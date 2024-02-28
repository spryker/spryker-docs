---
title: "Click & Collect: Product Offer Shipment Type subdomain"
last_updated: Nov 02, 2023
description: The Product Offer Shipment Type subdomain establishes the connection between product offers and shipment types.

template: concept-topic-template
---

The Product Offer Shipment Type subdomain establishes the connection between product offers and shipment types.

## Installation

[Install the Product Offer Shipment feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-product-offer-shipment-feature.html)

## Modules

| MODULE                                                  | EXPECTED DIRECTORY                                                           |
|---------------------------------------------------------|------------------------------------------------------------------------------|
| ProductOfferShipmentType                                | vendor/spryker/product-offer-shipment-type                                   |
| ProductOfferShipmentTypeAvailability                    | vendor/spryker/product-offer-shipment-type-availability                      |
| ProductOfferShipmentTypeDataImport                      | vendor/spryker/product-offer-shipment-type-data-import                       |
| ProductOfferShipmentTypeGui                             | vendor/spryker/product-offer-shipment-type-gui                               |
| ProductOfferShipmentTypeMerchantPortalGui               | vendor/spryker/product-offer-shipment-type-merchant-portal-gui               |
| ProductOfferShipmentTypeStorage                         | vendor/spryker/product-offer-shipment-type-storage                           |
| ProductOfferShipmentTypeStorageExtension                | vendor/spryker/product-offer-shipment-type-storage-extension                 |

## Data setup

The `ProductOfferShipmentTypeDataImport` module lets you import the relationships between shipment types and product offers.

## Extension point for filtering shipment types assigned to product offers before publishing them to the Storage

This extension point provides the ability to filter the product offer shipment type collection before publishing it to storage :`\Spryker\Zed\ProductOfferShipmentTypeStorageExtension\Dependency\Plugin\ProductOfferShipmentTypeStorageFilterPluginInterface`.

The following example plugin filters out `ProductOfferShipmentTypeCollectionTransfer.productOfferShipmentTypes` with product offers from inactive merchants: `\Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferShipmentTypeStorage\MerchantProductOfferShipmentTypeStorageFilterPlugin`.
