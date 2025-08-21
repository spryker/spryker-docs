---
title: "Click & Collect: Shipment Type Service Point subdomain"
last_updated: Nov 02, 2023
description: The Shipment Type Service Point subdomain connects shipment types and service points.
template: concept-topic-template
redirect_from:
---

The Shipment Type Service Point subdomain establishes the connection between shipment types and service points.

## Installation

[Install the Shipment Service Points feature](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/install-features/install-the-shipment-service-points-feature.html)

## Modules

| MODULE                             | EXPECTED DIRECTORY                                      |
|------------------------------------|---------------------------------------------------------|
| ShipmentTypeServicePoint           | vendor/spryker/shipment-type-service-point              |
| ShipmentTypeServicePointDataImport | vendor/spryker/shipment-type-service-point-data-import  |
| ShipmentTypeServicePointsRestApi   | vendor/spryker/shipment-type-service-points-rest-api    |
| ShipmentTypeServicePointStorage    | vendor/spryker/shipment-type-service-point-storage      |

## Data setup

Spryker provides import functionality through the `ShipmentTypeServicePointDataImport` module to facilitate the setup of the connection between service points and shipment types.

## Address substitution during checkout

The `ShipmentTypeServicePointsRestApi` module provides a mechanism for substituting the shipping address with the service point address during checkout.

### Plugins

The following plugin handles address substitution when the shipment type is set to `pickup` and a service point is selected: `\Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\CheckoutRestApi\ShipmentTypeServicePointCheckoutRequestExpanderPlugin`.

Additionally, you can redefine applicable shipment type keys supporting address substitution through module configuration: `\Spryker\Shared\ShipmentTypeServicePointsRestApi\ShipmentTypeServicePointsRestApiConfig::getApplicableShipmentTypeKeysForShippingAddress`.
