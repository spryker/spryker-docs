---
title: "Click & Collect: Shipment Types domain"
last_updated: Nov 02, 2023
description: Discover the key extension points for customizing the behavior of shipment types during checkout.
template: concept-topic-template
redirect_from:
---

Shipment types offer different options for customers to receive their orders.

## Installation

[Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)

## Modules

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
| SalesShipmentType                                         | vendor/spryker/sales-shipment-type                                               |

## Data setup

The following options let you set up shipment types data:

| MODULE | IMPORT TYPE |
| - | - |
| `ShipmentTypesBackendApi` | Backend API |
| `ShipmentTypeDataImport` | Data import |

## Extension point for filtering shipment types for the quote during checkout

Filter shipment types for the quote during checkout with the following extension point: `\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\AvailableShipmentTypeFilterPluginInterface`.

Example of a plugin that filters out shipment types without a product offer shipment type relation: `\Spryker\Client\ClickAndCollectExample\Plugin\ShipmentTypeStorage\ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin`.

## Extension point for expanding Shipment Type data before publishing to the Storage

Expands shipment type storage collection with additional data before publishing to the Storage: `\Spryker\Zed\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface`. Use the expanded data after retrieving Shipment Type data from the Storage.

The following example plugin expands shipment types with a service type: `\Spryker\Zed\ShipmentTypeServicePointStorage\Communication\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin`.


## Extension point for expanding Shipment Type data after retrieving from the Storage

Expands shipment type storage collection with additional data after retrieving it from the Storage: `\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface`.

The following example plugin expands shipment types with a service type: `\Spryker\Client\ShipmentTypeServicePointStorage\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin`.
