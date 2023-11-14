---
title: Click and Collect feature Shipment Type Service Point subdomain walkthrough
last_updated: Nov 02, 2023
description: |
  Explore the Shipment Type Service Point subdomain in the Click and Collect feature, focusing on the connection between shipment types and service points. Learn how to install the Shipment Service Points feature and set up the necessary modules to establish a seamless integration. Understand the data setup process, leveraging the import functionality provided by the `ShipmentTypeServicePointDataImport` module to create a robust connection between service points and shipment types.

template: concept-topic-template
---

# Shipment Type Service Point

The Shipment Type Service Point subdomain establishes the connection between shipment types and service points.

[Install the Shipment Service Points feature](/docs/pbc/all/install-features/{{page.version}}/install-the-shipment-service-points-feature.html)

## 1. Modules

| MODULE                             | EXPECTED DIRECTORY                                      |
|------------------------------------|---------------------------------------------------------|
| ShipmentTypeServicePoint           | vendor/spryker/shipment-type-service-point              |
| ShipmentTypeServicePointDataImport | vendor/spryker/shipment-type-service-point-data-import  |
| ShipmentTypeServicePointsRestApi   | vendor/spryker/shipment-type-service-points-rest-api    |
| ShipmentTypeServicePointStorage    | vendor/spryker/shipment-type-service-point-storage      |

## 2. Data Setup

Spryker provides import functionality through the `ShipmentTypeServicePointDataImport` module to facilitate the setup of the connection between service points and shipment types.
