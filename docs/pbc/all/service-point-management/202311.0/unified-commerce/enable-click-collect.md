---
title: Enable Click & Collect
description: Learn how to enable Click&Collect
last_updated: Nov 23, 2023
template: howto-guide-template
---

To enable the default implementation of Click & Collect, follow the steps.

## Prerequisites

Install the following features:

* []

## 1. Add service points and their addresses

To add service points and addresses using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/202311.0/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import service points, see [Import file details: service_point.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html).

To import service point addresses, see [Import file details: service_point_address.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point-address.csv.html).

## 2. Add service types

For Click & Collect, you most probably need the pickup service type.

To add service types using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/202311.0/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import service types, see [Import file details: service_type.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-type.csv.html).


## 3. Add services

You need to add services per service point based on the service types you've added.

To add services using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/202311.0/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import service types, see [Import file details: service.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service.csv.html).


## 4. Assign the service type to shipment type

To import service to shipment type assignments, see [Import file details: shipment_type_service_type.csv](/docs/pbc/all/carrier-management/202311.0/base-shop/import-and-export-data/file-details-shipment-type-service-type.csv.html).


## 5. Assign product offers to shipment types

To import offers to shipment type assignments, see [Import file details: product_offer_shipment_type](/docs/pbc/all/offer-management/202311.0/marketplace/import-and-export-data/import-file-details-product-offer-shipment-type.csv.html).
