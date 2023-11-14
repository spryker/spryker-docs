---
title: Click and Collect feature Service Points domain walkthrough
last_updated: Nov 02, 2023
description: |
  Delve into the Service Points domain of the Click and Collect feature, exploring the definition and functionality of service points. Learn how to install the Service Points feature and set up essential modules for seamless integration. Understand the significance of data setup and discover the available methods, including the Backend API and Data Import, to configure service points, addresses, stores, service types, and services.

template: concept-topic-template
---

# Service Points

A Service Point represents a physical location, such as a store or a post office, enabling customers to conveniently pick up their orders. Each service point has the capability to offer one or multiple unique services to customers.

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

## 2. Data Setup

Spryker offers two methods for setting up service points, service point addresses, service point stores, service types, and services:

- Backend API (check the `ServicePointsBackendApi` module)
- Data Import (check the `ServicePointDataImport` module)
