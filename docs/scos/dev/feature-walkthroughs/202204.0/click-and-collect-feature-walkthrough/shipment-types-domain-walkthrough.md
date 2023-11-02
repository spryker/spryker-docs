---
title: Click and Collect feature Shipment Types domain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Shipment Types

Shipment type refers to the different options available to customers for receiving their orders.

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

## 2. Data set up

Spryker offers two ways to set up the shipment types:
- Backend API (check `ShipmentTypesBackendApi` module)
- Import (check `ShipmentTypeDataImport` module)

## 3. Extension point for filter shipment types for the quote during checkout process

Allows filtering out shipment types for the quote during checkout process.

**\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\AvailableShipmentTypeFilterPluginInterface**

The example of implementation:

**\Spryker\Client\ClickAndCollectExample\Plugin\ShipmentTypeStorage\ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin**

The plugin filters out shipment types without product offer shipment type relation.

## 4. Extension point for expanding Shipment Type data before publishing to the Storage

Provides ability to expand shipment type storage collection with additional data before publishing it to the Storage.
Later, the expanded data can be used after retrieving the Shipment Type data from the Storage.

**\Spryker\Zed\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface**

The example of implementation:

**\Spryker\Zed\ShipmentTypeServicePointStorage\Communication\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin**

The plugin expands shipment type with a service type.

## 5. Extension point for expanding Shipment Type data after retrieving from the Storage

Provides ability to expand shipment type storage collection with additional data after it is retrieved from the Storage.

**\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface**

The example of implementation:

**\Spryker\Client\ShipmentTypeServicePointStorage\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin**

The plugin expands shipment type with a service type.
