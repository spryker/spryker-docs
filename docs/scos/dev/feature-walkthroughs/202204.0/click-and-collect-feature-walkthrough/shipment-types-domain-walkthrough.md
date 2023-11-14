---
title: Click and Collect feature Shipment Types domain walkthrough
last_updated: Nov 02, 2023
description: |
  Explore the Shipment Types domain in the Click and Collect feature, understanding the various options available to customers for receiving their orders. This guide provides comprehensive details on installing the Shipment feature, delving into the associated modules, and showcasing different data setup methods. Additionally, discover key extension points for customizing Shipment Types behavior during the checkout process.

template: concept-topic-template
---

# Shipment Types

Shipment types offer diverse options for customers to receive their orders.

[Install the Shipment feature](/docs/pbc/all/install-features/{{page.version}}/install-the-shipment-feature.html)

## 1. Modules

| MODULE                                                    | EXPECTED DIRECTORY                                                               |
|-----------------------------------------------------------|----------------------------------------------------------------------------------|
| ShipmentType                                              | vendor/spryker/shipment-type                                                     |
| ShipmentTypeCart                                          | vendor/spryker/shipment-type-cart                                                |
| ShipmentTypeDataImport                                    | vendor/spryker/shipment-type-data-import                                         |
| ShipmentTypeProductOfferServicePointAvailabilitiesRestApi | vendor/spryker/shipment-type-product-offer-service-point-availabilities-rest-api |
| ShipmentTypesBackendApi                                   | vendor/spryker/shipment-type-backend-api                                         |
| ShipmentTypeServicePoint                                  | vendor/spryker/shipment-type-service-point                                       |
| ShipmentTypeServicePointDataImport                        | vendor/spryker/shipment-type-service-point-data-import                           |
| ShipmentTypeServicePointsRestApi                          | vendor/spryker/shipment-type-service-points-rest-api                             |
| ShipmentTypeServicePointStorage                           | vendor/spryker/shipment-type-service-point-storage                               |
| ShipmentTypesRestApi                                      | vendor/spryker/shipment-type-rest-api                                            |
| ShipmentTypeStorage                                       | vendor/spryker/shipment-type-storage                                             |
| ShipmentTypeStorageExtension                              | vendor/spryker/shipment-type-extension                                           |
| ShipmentTypeWidget                                        | vendor/spryker-shop/shipment-type-widget                                         |

## 2. Data Setup

Spryker offers two methods for setting up shipment types:
- Backend API (check `ShipmentTypesBackendApi` module)
- Data import (check `ShipmentTypeDataImport` module)

## 3. Extension point for filter shipment types for the quote during the checkout process

Filter shipment types for the quote during the checkout process with the following extension point:

**\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\AvailableShipmentTypeFilterPluginInterface**

An example:

**\Spryker\Client\ClickAndCollectExample\Plugin\ShipmentTypeStorage\ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin**

This plugin filters out shipment types without a product offer shipment type relation.

## 4. Extension point for expanding Shipment Type data before publishing to the Storage

Expands shipment type storage collection with additional data before publishing to the Storage.
Use the expanded data after retrieving Shipment Type data from the Storage.

**\Spryker\Zed\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface**

An example:

**\Spryker\Zed\ShipmentTypeServicePointStorage\Communication\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin**

This plugin expands shipment types with a service type.

## 5. Extension point for expanding Shipment Type data after retrieving from the Storage

Expands shipment type storage collection with additional data after retrieving it from the Storage.

**\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface**

An example:

**\Spryker\Client\ShipmentTypeServicePointStorage\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin**

This plugin expands shipment types with a service type.
