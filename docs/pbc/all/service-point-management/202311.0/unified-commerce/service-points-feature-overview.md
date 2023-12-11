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

A *service* represents a specific service type that is provided at a specific service point. Because each service is unique, if two service points provide services with the same service type, like pickup, those services are represented as two separate entities and are managed accordingly. For example, a pickup service at a retail location at Julie-Wolfthorn-Straße 1, 10115, Berlin is a unique service.

To add services using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/scos/dev/glue-api-guides/{{page.version}}/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import services, see [Import file details: service.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service.csv.html).


## Service points use cases


With the help of service points, types, and services, a store operator can model different use cases depending on their business needs. Here are some examples of services that can be implemented at the project level:
* Ship from store
* Car maintenance or installations services
* Product demonstration at the retail location
* Repair service at the retail location


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


## Current constraints

* Services can be configured only for product offers.
* Product catalog can't be filtered by a service type or a service provided in a specific service point.
* Product details page is not supported, meaning it will show all product offers created in the system for the product.
* Customers can't add products with preselected service points to cart. They can select service points only during checkout.
* If a product is added to cart without a product offer attached to it, this product can be purchased only with the *Delivery* shipment type.


Similar  constraints apply to the *shipment type*. See [Shipment feature overview](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html).

## Recommended customizations for Click & Collect setup

Since we do not yet support a product catalog or a product details page, the following project-level customizations are recommended on the Product Details Page:

* First, you need to implement the Default Product Offer Reference Strategy if you want a specific offer to be prioritized at the first position. Refer to the [Install the Marketplace Product Offer features](https://docs.spryker.com/docs/pbc/all/offer-management/202307.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html#set-up-behavior)  development documentation for more details. Ensure that only product offers are displayed on prodcut details page.
* Second, you need to filter the list of product offers displayed on the Product Details page by overriding the Merchant Product Offer Widget behavior. This filter should display product offers with an empty service and shipment type set to _empty_ or _Delivery_. In this case, customers will always be able to buy a product with the default shipment option and, if desired, choose Pickup during checkout." Refer to the [](https://docs.spryker.com/docs/pbc/all/offer-management/202307.0/marketplace/render-merchant-product-offers-on-the-storefront.html#prerequisites).
* Add information about product availability in the service point locations by using Service Point Widget. Refer to [Install the Service Points feature](https://docs.spryker.com/docs/pbc/all/service-point-management/202311.0/unified-commerce/install-features/install-the-service-points-feature.html) development documentation for more details.

As a result, you will have the following user journey:
1. Customer goes to the Product Details Page.
2. Customer sees that a product is available for delivery and for pickup.
3. Customer adds the product to the shopping cart.
4. Customer goes through checkout and selects a shipment type: *Pickup*.
5. Customer observes product availability in the retail locations and selects one where it's available.
6. Customer completes checkout by placing the order.


## Related Business User documents

| FEATURE OVERVIEWS | MERCHANT PORTAL GUIDES |
| - | - |
| [Shipment feature overview](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) | [Create and edit product offers](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/unified-commerce-create-and-edit-product-offers.html) |


## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html) |
| [Install the Service Points + Shipment feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-shipment-feature.html) |
| [Install the Service Points + Customer Account Management feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-customer-account-management-feature.html) |
| [Install the Service Points + Order Management feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-order-management-feature.html) |
| [Install the Product Offer Shipment feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-product-offer-shipment-feature.html) |
| [Install the Shipment + Customer Account Management feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-customer-account-management-feature.html) |
