---
title: Click and Collect feature Shipment Type Service Point subdomain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Shipment Type Service Point

Refers to the connection between shipment type and service point.

[Install the Shipment Service Points feature](/docs/pbc/all/install-features/{{page.version}}/install-the-shipment-service-points-feature.html)

## 1. Modules

| MODULE                             | EXPECTED DIRECTORY                                      |
|------------------------------------|---------------------------------------------------------|
| ShipmentTypeServicePoint           | vendor/spryker/shipment-type-service-point              |
| ShipmentTypeServicePointDataImport | vendor/spryker/shipment-type-service-point-data-import  |
| ShipmentTypeServicePointsRestApi   | vendor/spryker/shipment-type-service-points-rest-api    |
| ShipmentTypeServicePointStorage    | vendor/spryker/shipment-type-service-point-storage      |

## 2. Data set up

Spryker offers import (check `ShipmentTypeServicePointDataImport` module) functionality to set up the connection between service points and shipment types.
