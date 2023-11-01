---
title: Service Points feature overview
description:
template: concept-topic-template
---

The *Service Points* feature lets you create and manage service points, service types, and associated services.

## Service point

A *service point* is a physical location where services are provided. It can combine various services to form different types of service points, such as warehouses or physical stores. The definition of a service point ultimately depends on the services it provides.

## Service

A *service* represents a specific service type that is provided at a specific service point. A service is a capability within a service point that is offered to its customers. An example of such a service will be a pickup service at a retail location located on Julie-Wolfthorn-Straße 1, 10115, Berlin.

## Service type

A *service type* is a classification of services that a business offers to its customers. These service types are often determined by the nature of the business. Examples: Pickup service, Return service, Rental service.

Relation between these entities can be described with the following example of a pickup service provided inside a retail location:



With the help of these entities, a Merchant can model different use cases depending on their business needs. Below are examples of services that can be implemented on a project level:
Ship-from-Store
Request product demo in the retail location
Request repair service
etc.
In our out-of-the-box implementation, we provide everything you need to implement Click&Collect (also known as In-Store Pickup) in your store, which can be described with the following steps:
Configure service points and their addresses
Configure service type (e.g. Pickup)
Create a service per each service point with the previously configured service type
Configure service type for the shipment type (link it to Shipment + Service Points Feature)
Define which Product Offers are available for each Service and Shipment Type (link it to Product Offer Shipment Feature Overview)
Currently, we offer the following methods to create these entities:
Data Import
Service Points and Service Point Addresses
Service Types
Services
Shipment Type Service Types
Product Offers
Note to document writer: extract import instructions from the guide or make a link that references the section of the guide install-the-service-points-feature.md
Backend APIs (See Swagger documentation here https://spryker.atlassian.net/browse/CC-31210 )
Service Point Search Widget
Customers can search for a service point by the following parameters:
Service Point Name
Zip Code
City
By default, search results are sorted by City.
%Add Screenshots here%
You can import service points and their addresses, see:
Import service points and their addresses
Import service types
Import services
Note to document writer: extract import instructions from the guide or make a link that references the section of the guide install-the-service-points-feature.md
Related Business User Documents
Shipment feature overview
Manage product offers
Related Developer Documents
⭐ install-the-service-points-feature.md
install-the-shipment-service-points-feature.md
install-the-product-offer-shipment-feature.md
install-the-shipment-customer-account-management-feature.md
