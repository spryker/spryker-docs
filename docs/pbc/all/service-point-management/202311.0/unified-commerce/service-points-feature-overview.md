---
title: Service Points feature overview
description:
template: concept-topic-template
---

The *Service Points* feature lets you create and manage service points, service types, and associated services.

## Service point

A *service point* is a physical location where services are provided. Depending on the services provided, there can be different kinds of service points, like a warehouse or a physical store. The definition of a service point ultimately depends on the services it provides.

## Service type

A *service type* is a classification of services that a business offers to its customers. Service types are determined by the nature of the business. Service type examples:
* Pickup service
* Return service
* Rental service
* Repair service

## Service

A *service* represents a specific service type that is provided at a specific service point. For example, a pickup service at a retail location located at Julie-Wolfthorn-Straße 1, 10115, Berlin.


## Service points use cases


With the help of service points, types, and services, a Merchant can model different use cases depending on their business needs. Examples of services that can be implemented on a project level are as follows:
* Ship from store
* Request product demo in the retail location
* Request a repair service



Relation between these entities can be described with the following example of a pickup service provided inside a retail location:







The feature is fully equipped to enable in-store pickup in your store. Stpes to implement in-store pickup:
1. Configure service points and their addresses.
2. Configure service types, for example-Pickup.
3. Create a service per each service point with the previously configured service type.
4. Configure a service type for the shipment type
<!-- link to  Shipment + Service Points Feature -->
5. Define which Product Offers are available for each Service and Shipment Type
<!-- link to Product Offer Shipment Feature Overview -->


## Adding service data

Currently, we offer the following methods to create these entities:
Data Import
Service Points and Service Point Addresses
Service Types
Services
Shipment Type Service Types
Product Offers
Note to document writer: extract import instructions from the guide or make a link that references the section of the guide install-the-service-points-feature.md
Backend APIs (See Swagger documentation here https://spryker.atlassian.net/browse/CC-31210 )


## Service points on the Storefront

When checking out, customers select a service point they want to process their order at. The feature is shipped with a search widget that lets them search service points by the following:
* Service point name
* Zip code
* City

By default, search results are sorted by city.

![search widget screenshot]

You can add only predefined service points by default. But developers can configure customers to be able to enter custom addresses for service points.

After placing an order, the customer can see the selected service point on the Order Details page.

![screenshot with an order]

## Related Business User documents

| FEATURE OVERVIEWS | MERCHANT PORTAL GUIDES |
| - | - |
| [Shipment feature overview](/docs/pbc/all/carrier-management/202311.0/base-shop/shipment-feature-overview.html) | [Create and edit product offers](/docs/pbc/all/offer-management/202311.0/unified-commerce/unified-commerce-create-and-edit-product-offers.html) |


## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the Service Points feature](/docs/pbc/all/service-point-management/202311.0/unified-commerce/install-the-service-points-feature.html) |
| [Install the Service Points + Shipment feature](/docs/pbc/all/service-point-management/202311.0/unified-commerce/install-the-service-points-shipment-feature.html) |
| [Install the Service Points + Customer Account Management feature](/docs/pbc/all/service-point-management/202311.0/unified-commerce/install-the-service-points-customer-account-management-feature.html) |
| [Install the Service Points + Order Management feature](/docs/pbc/all/service-point-management/202311.0/unified-commerce/install-the-service-points-order-management-feature.html) |
| [Install the Product Offer Shipment feature](docs/pbc/all/offer-management/202311.0/unified-commerce/install-and-upgrade/install-the-product-offer-shipment-feature.html) |
| [Install the Shipment + Customer Account Management feature](/docs/pbc/all/carrier-management/202311.0/base-shop/install-and-upgrade/install-features/install-the-shipment-customer-account-management-feature.html) |
