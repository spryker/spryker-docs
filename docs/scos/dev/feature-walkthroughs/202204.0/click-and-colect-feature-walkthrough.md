---
title: Click and Collect feature walkthrough
last_updated: Sep 26, 2023
description: TODO
template: concept-topic-template
---

C&C business models refers to a retail strategy where customers make purchases online and then collect their ordered products from a physical store or a designated pickup location. This model combines the convenience of online shopping with the immediacy of in-store pickup.

## Domain Model

TBD (Diagrams are here https://spryker.atlassian.net/wiki/spaces/CORE/pages/3894607900/WIP+Developer+Feature+Overview+materials) 

| Connection | Description                                                                             | Rationale                                                                                                                                                                                                                                                                                                                                                                        |
|------------|-----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SP1        | Every service must belong to a service point. One service point can have many services. | Services are assigned to service points where it is provided, the service is an instance of its type that is available at this service point.                                                                                                                                                                                                                                    |
| SP2        | A service point must have one address.                                                  | A service point represents a physical location in the real world, for that reason, it must have an address and geo-location.                                                                                                                                                                                                                                                     |
| SP3        | A service point can belong to one or many stores.                                       | Service point can belong to one or many stores. Connection between service point and store enable possibility to provide services for specified online store. <br/> F.e. if service point is connected to two online stores it means that it could provide pickup service for orders created in this two stores as physical location where customers could collect their orders. |
| ST1        | Service type can have many services enabled in specific service points.                 | Service that have same service type could be created for any number of service points. <br/> The service point could have only one service of specific type.                                                                                                                                                                                                                     |
| ShT1       | Shipment type should have one or more Shipment methods.                                 | Shipment type is a logical grouping of specific shipment methods. <br/> F.e. “In store pickup“ shipment type could be represented by following shipment methods: In-Store Counter pickup, Curbside pickup, Locker pickup, etc.                                                                                                                                                   |
| ShT2       | Shipment type can have none or one connected service type.                              | If shipment type that has connection with the service is selected on checkout, it means that user can select specific service point as a destination of corresponding shipment group.                                                                                                                                                                                            |
| ShT3       | Shipment type can belong to one or many stores.                                         | This connection makes shipment type available at specific store(s).                                                                                                                                                                                                                                                                                                              |
| PO1        | Product offer can be connected to none or many services.                                | As Product Offer is used to share stock between various (especially selling services). As stock physically can be only in one physical place, it means that Product offer MUST be connected to services that have same service point only.                                                                                                                                       |
| PO2        | Product offer can be connected to none or many delivery types.                          | Same product offer could be connected with few delivery types. It means that offer could be delivered by two different delivery types but price of the product is same for both of them and stock is shared. So delivery will be done from one place. <br/> F.e single product offer can be created for Pickup and Ship from store delivery types.                               |


## Database Diagram

TBD (Diagrams are here https://spryker.atlassian.net/wiki/spaces/CORE/pages/3894607900/WIP+Developer+Feature+Overview+materials)

# Service Point

 * A **Service point** refers to a physical location, such as a store or a post office, where customers can pick up their orders. Service points are typically used to deliver products purchased online, especially for customers who may not be able to receive the products at their homes or workplace. <br/> Service points can be owned and operated by the e-commerce platform operator itself or by third-party providers.
 * A **Service point address** is the physical address of a location where customers can pick up their orders. <br/> For example, if a customer chooses to use an Amazon Locker as a service point to pick up their order, they will be given the address of the specific Amazon Locker location where their package will be delivered. The customer can then go to that location and use a unique code or barcode to retrieve their package. <br/> The service point address is an important component of e-commerce logistics, as it allows customers to locate and access their orders for pickup easily.
 * A **Service Type** is different categories or classifications of services that a business offers to its customers. These service types are often determined by the nature of the business. Examples: Pickup service, Return service, Stock keeping service, et.
 * A **Service** represent a specific service type that are provided (enabled) in specific Service point. <br/> A service is a capability within a service point that is offered to other entities, for example customers, merchants, third parties, basically any business entity. A service can be a point of sale, a locker where you can deliver to and customers can pick up their goods. It could be as well a loading point or loading dock. A service itself can be an aggregation of business entities that must be a logical part of this service. A service in this context is a point of interaction that exists in the real world.

# Shipment Type

Shipment type refers to the different options available to customers for receiving their orders.
Some common shipment types include:
 * Home Delivery: This option allows customers to get their order delivered to the address they filled in during checkout.
 * In-store pickup (aka click & collect): This option allows customers to pick up their orders from a physical store or service point location, typically within a few hours to a day after the order is placed.
Shipment method, on the other hand, refers to how the product is physically transported from the seller to the customer. Examples of shipment methods are Next Day Delivery or Express Delivery.
Shipment type is a logical grouping of the shipment methods.

# Click & Collect

TBD

# Extension Points

TBD



