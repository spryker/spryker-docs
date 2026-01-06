---
title: "Click & Collect: Service Points domain"
last_updated: Nov 02, 2023
description: Service Points domain is used to configure service points, addresses, stores, service types, and services.
template: concept-topic-template
redirect_from:
---


A Service Point represents a physical location, such as a store, post office, or other designated areas, enabling customers to conveniently pick up their orders or access additional services like returns, exchanges, or customer support. Each service point has the capability to offer one or multiple unique services to customers.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Modules

| MODULE                    | EXPECTED DIRECTORY                             |
|---------------------------|------------------------------------------------|
| ServicePoint              | vendor/spryker/service-point                   |
| ServicePointCart          | vendor/spryker/service-point-cart              |
| ServicePointCartExtension | vendor/spryker/service-point-cart-extension    |
| ServicePointCartsRestApi  | vendor/spryker/service-point-carts-rest-api    |
| ServicePointDataImport    | vendor/spryker/service-point-data-import       |
| ServicePointSearch        | vendor/spryker/service-point-search            |
| ServicePointsRestApi      | vendor/spryker/service-points-rest-api         |
| ServicePointsBackendApi   | vendor/spryker/service-points-backend-api      |
| ServicePointStorage       | vendor/spryker/service-point-storage           |
| SalesServicePoint         | vendor/spryker/sales-service-point             |
| SalesServicePointGui      | vendor/spryker/sales-service-point-gui         |
| SalesServicePointWidget   | vendor/spryker-shop/sales-service-point-widget |
| ServicePointWidget        | vendor/spryker-shop/service-point-widget       |
| ServicePointCartPage      | vendor/spryker-shop/service-point-cart-page    |

## Data setup

The following options let you set up shipment types data:

| MODULE | IMPORT TYPE |
| - | - |
| `ServicePointsBackendApi` | Backend API |
| `ServicePointDataImport` | Data Import |


## Address substitution during checkout

The `ServicePointWidget` module provides a mechanism for substituting the shipping address with the service point address during checkout.

The following plugin handles address substitution when the cart item has a service point selected and the shipment type is set to `pickup`: `\SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage\ServicePointAddressCheckoutAddressCollectionFormExpanderPlugin`.
