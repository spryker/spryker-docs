---
title: Click and Collect feature Service Points domain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Service Points

Service Point represents a physical location, such as a store or a post office, where customers can pick up their orders.
Each service point can provide one or multiple unique services in it to the customers.

[Install the Service Points feature](/docs/pbc/all/install-features/{{page.version}}/install-the-service-points-feature.html)

## 1. Modules

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

## 2. Data set up

Spryker offers two ways to set up the service points, service point addresses, service point stores, service types and services:
- Backend API (check `ServicePointsBackendApi` module)
- Data import (check `ServicePointDataImport` module)
