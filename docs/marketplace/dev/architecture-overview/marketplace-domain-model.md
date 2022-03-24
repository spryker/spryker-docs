---
title: Marketplace domain model
description: The following document describes the key domain objects that make a Spryker Shop a Marketplace.
template: concept-topic-template
---
This document describes the key domain objects that make a Spryker Shop a Marketplace.

## Domain model
The following diagram demonstrates the core aggregates of the domain model of the Spryker Marketplace.
The Marketplace is an add-on to your Spryker B2C or B2B project.
It extends the existing Domain with Merchant and ProductOffer to enable sophisticated business models for your Marketplace application.

{% info_block infoBox "Info" %}

This model is intentionally simplified. Learn more about the core domain objects in [Marketplace Merchant feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-merchant-feature-walkthrough.html) and [Product Offer feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html).

{% endinfo_block %}

![Domain Model](https://confluence-connect.gliffy.net/embed/image/02c4183f-2823-4371-ba91-aa5f9585998b.png?utm_medium=live&utm_source=custom)

#### Merchant
`Merchant` is a core Marketplace domain object. `Merchant` represents an entity of a third-party seller on a shop. In other setups, such as "big-box retail", a `Merchant` can represent a branch of a chain of stores.
Merchants use [Merchant Portal](/docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html) to manage their profile, catalog, and sales.

To learn more about the Merchant entity, see [Marketplace Merchant feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-merchant-feature-walkthrough.html).

#### Product
`Product` is a B2C/B2B e-commerce domain object. `Product` represents some goods or services that a customer can buy in a shop. In the Marketplace, a `Product` can be owned by a Marketplace operator or can be created by a merchant.

To learn more about the `Product` entity, see [Marketplace Product feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-product-feature-walkthrough.html).

#### ProductOffer
`ProductOffer` is a Marketplace domain object. `ProductOffer` enables the assignment of a special price and stock to a `Product`. In the Marketplace, a `Merchant` can own a `ProductOffer`, and they define their prices and stock of `Products`.

Relation from `ProductOffer` to `Merchant` is optional. While `ProductOffer` is a core domain object for Marketplace, it can also be used for other non-Marketplace-related cases or even are non-Merchant-related.

To learn more about the Product Offer entity, see [Marketplace Product Offer feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html).

#### Order
`Order` is a B2C/B2B e-commerce domain object. It is another standard e-commerce domain object representing a transaction of buying some goods on a shop by a customer. In the Marketplace, an `Order` may contain items that multiple `Merchants` own. For this reason, merchants never have access to it. Only customers and Marketplace operators can access `Order` objects.

#### MerchantOrder
`MerchantOrder` is a Marketplace domain object. `MerchantOrder` is a composition of `OrderItem`, `OrderTotal`, `OrderShipment`, `OrderCustomer` objects, and other related to a particular merchant within one `Order`. `MerchantOrder` is the key entity that helps Merchants to fulfill `Order` objects. You can have different OMS flows for different `Merchant` objects so that each `Merchant` can process their `MechantOrder` objects with the best flow. `Merchant` objects use the [Merchant Portal application](/docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html) to fulfill `MerchantOrder` objects.

To learn more about the orders in the Marketplace, see [Marketplace Order Management feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-order-management-feature-walkthrough/marketplace-order-management-feature-walkthrough.html).
