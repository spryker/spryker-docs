---
title: Service Points feature overview
description: General overview of the Spryker Service Points feature enhancing your Spryker Unified Commerce based projects.
template: concept-topic-template
last_updated: Jan 19, 2024
---

The *Service Points* feature lets you create and manage service points, service types, and associated services.

## Service point

A *service point* is a physical location where services are provided. Depending on the services provided, there can be different kinds of service points, like a warehouse or a physical store. The definition of a service point ultimately depends on the services it provides.

To add service points using Glue API, see [Add service points](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-add-service-points.html). To import service points, see [Import file details: service_point.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html).

To add service point addresses using Glue API, see [Add service point addresses](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-point-addresses/glue-api-add-service-point-addresses.html). To import service point addresses, see [Import file details: service_point_address.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-point-address.csv.html)

## Service type

A *service type* is a classification of services that a business offers to its customers. Service types are determined by the nature of the business. Service type examples:
- Pickup service
- Return service
- Rental service
- Repair service

To add service types using Glue API, see [Add service types](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-add-service-types.html).

To import service types, see [Import file details: service_type.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-type.csv.html).


## Service

A *service* represents a specific service type that is provided at a specific service point. Because each service is unique, if two service points provide services with the same service type, like pickup, those services are represented as two separate entities and are managed accordingly. For example, a pickup service at a retail location at Julie-Wolfthorn-Straße 1, 10115, Berlin is a unique service.

To add services using Glue API, see [Add services](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-services/glue-api-add-services.html).

To import services, see [Import file details: service.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service.csv.html).


## Service points use cases


With the help of service points, types, and services, a store operator can model different use cases depending on their business needs. Here are some examples of services that can be implemented at the project level:
- Ship from store
- Car maintenance or installations services
- Product demonstration at a retail location
- Repair service at a retail location


## Service points on the Storefront

When checking out, customers select a service point they want the order to be processes at. The feature is shipped with a search widget that lets them search service points by the following:
- Service point name
- Zip code
- City

By default, search results are sorted by city.

![service point search widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/service-points-feature-overview.md/service-point-search.png)

You can add only predefined service points by default. But developers can configure customers to be able to enter custom addresses for service points.

After placing an order, the customer can see the selected service point on the Order Details page.

![Storefront order with a service point](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/service-points-feature-overview.md/storefront-order-service-point.png)


## Current constraints

- Services can be configured only for product offers.
- Product catalog can't be filtered by a service type or a service provided in a specific service point.
- The product offer widget on the product details page is not supported. It doesn't show the differences between product offers based on the services assigned to them. As a result, differnt product offers are displayed as duplicates.
- Customers can't add products with preselected service points to cart. They can select service points only during checkout.
- If a product is added to cart without a product offer attached to it, this product can be purchased only with the *Delivery* shipment type.


## Related Business User documents

| FEATURE OVERVIEWS | MERCHANT PORTAL GUIDES |
| - | - |
| [Shipment feature overview](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) | [Create and edit product offers](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/unified-commerce-create-and-edit-product-offers.html) |



## Related Developer documents

| INSTALLATION GUIDES | GLUE API GUIDES   |
| - | - |
| [Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html) | [Add service points](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-add-service-points.html) |
| [Install the Service Points + Shipment feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-shipment-feature.html) |  [Retrieve service points](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html)  |
| [Install the Service Points + Customer Account Management feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-customer-account-management-feature.html) | [Update service points](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-update-service-points.html) |
| [Install the Service Points + Order Management feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-order-management-feature.html) | [Add service types](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-add-service-types.html) |
| [Install the Product Offer Shipment feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-product-offer-shipment-feature.html) | [Retrieve service types](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-retrieve-service-types.html) |
| [Install the Shipment + Customer Account Management feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-customer-account-management-feature.html) | [Update service types](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-update-service-types.html) |
| |  [Add service point addresses](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-point-addresses/glue-api-add-service-point-addresses.html) |
| |  [Retrieve service point addresses](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-point-addresses/glue-api-retrieve-service-point-addresses.html) |
| |  [Add service point addresses](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-point-addresses/glue-api-update-service-point-addresses.html) |
| | [Add services](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-services/glue-api-add-services.html) |
| |  [Retrieve services](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-services/glue-api-retrieve-services.html) |
| | [Update services](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-services/glue-api-update-services.html) |
