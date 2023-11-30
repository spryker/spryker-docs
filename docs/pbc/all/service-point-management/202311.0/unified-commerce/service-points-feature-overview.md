---
title: Service Points feature overview
description: General overview of the Service Points feature
template: concept-topic-template
---

The *Service Points* feature lets you create and manage service points, service types, and associated services.

## Service point

A *service point* is a physical location where services are provided. Depending on the services provided, there can be different kinds of service points, like a warehouse or a physical store. The definition of a service point ultimately depends on the services it provides.

To add service points and service point addresses using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/{{page.version}}/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import service points, see [Import file details: service_point.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html).

To import service point addresses, see [Import file details: service_point_address.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point-address.csv.html)

## Service type

A *service type* is a classification of services that a business offers to its customers. Service types are determined by the nature of the business. Service type examples:
* Pickup service
* Return service
* Rental service
* Repair service

To add service types using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/{{page.version}}/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import service types, see [Import file details: service_type.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-type.csv.html).


## Service

A *service* represents a specific service type that is provided at a specific service point. For example, a pickup service at a retail location located at Julie-Wolfthorn-Straße 1, 10115, Berlin.

To add services using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/{{page.version}}/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import services, see [Import file details: service.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service.csv.html).


## Service points use cases


With the help of service points, types, and services, a merchant can model different use cases depending on their business needs. Examples of services that can be implemented on a project level are as follows:
* Ship from store
* Request product demo in the retail location
* Request a repair service


## Service points on the Storefront

When checking out, customers select a service point they want to process their order at. The feature is shipped with a search widget that lets them search service points by the following:
* Service point name
* Zip code
* City

By default, search results are sorted by city.

![service point search widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/service-points-feature-overview.md/service-point-search.png)

You can add only predefined service points by default. But developers can configure customers to be able to enter custom addresses for service points.

After placing an order, the customer can see the selected service point on the Order Details page.

![Storefront order with a service point](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/service-points-feature-overview.md/storefront-order-service-point.png)

## Related Business User documents

| FEATURE OVERVIEWS | MERCHANT PORTAL GUIDES |
| - | - |
| [Shipment feature overview](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) | [Create and edit product offers](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/unified-commerce-create-and-edit-product-offers.html) |


## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-the-service-points-feature.html) |
| [Install the Service Points + Shipment feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-the-service-points-shipment-feature.html) |
| [Install the Service Points + Customer Account Management feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-the-service-points-customer-account-management-feature.html) |
| [Install the Service Points + Order Management feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-the-service-points-order-management-feature.html) |
| [Install the Product Offer Shipment feature](docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-product-offer-shipment-feature.html) |
| [Install the Shipment + Customer Account Management feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-customer-account-management-feature.html) |
