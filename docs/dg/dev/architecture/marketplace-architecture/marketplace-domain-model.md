---
title: Marketplace domain model
description: Understand Spryker's marketplace domain model, enabling effective structuring of marketplace operations, from vendor management to product catalog integration and order flow.
template: concept-topic-template
last_updated: Sep 21, 2023
redirect_from:
  - /docs/marketplace/dev/architecture-overview/marketplace-domain-model.html
  - /docs/scos/dev/architecture/marketplace-architecture/marketplace-domain-model.html
related:
  - title: Marketplace Application composition
    link: docs/marketplace/dev/architecture-overview/marketplace-application-composition.html
  - title: Marketplace Merchant Portal architecture overview
    link: docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
  - title: Marketplace in the Back Office
    link: docs/marketplace/dev/architecture-overview/marketplace-in-back-office.html
---

The following diagram demonstrates the core aggregates of the domain model of the Spryker Marketplace.
The Marketplace is an add-on to your Spryker B2C or B2B project.
It extends the existing Domain with Merchant and ProductOffer to enable sophisticated business models for your Marketplace application.

{% info_block infoBox "" %}

This model is intentionally simplified. Learn more about the core domain objects in [Marketplace Merchant feature walkthrough](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/domain-model-and-relationships/merchant-feature-domain-model.html) and [Product Offer feature walkthrough](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-merchant-portal-product-offer-management-feature-domain-model-and-relationships.html).

{% endinfo_block %}

![Domain Model](https://confluence-connect.gliffy.net/embed/image/02c4183f-2823-4371-ba91-aa5f9585998b.png?utm_medium=live&utm_source=custom)

## Merchant

`Merchant` is a core Marketplace domain object. `Merchant` represents an entity of a third-party seller on a shop. In other setups, such as "big-box retail", a `Merchant` can represent a branch of a chain of stores.
Merchants use [Merchant Portal](/docs/dg/dev/architecture/marketplace-architecture/marketplace-merchant-portal-architecture-overview.html) to manage their profile, catalog, and sales.

To learn more about the `Merchant` entity, see [Marketplace Merchant feature walkthrough](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/domain-model-and-relationships/marketplace-merchant-feature-domain-model.html).

## Product

`Product` is a B2C/B2B e-commerce domain object. `Product` represents some goods or services that a customer can buy in a shop. In the Marketplace, a `Product` can be owned by a Marketplace operator or can be created by a merchant.

To learn more about the `Product` entity, see [Marketplace Product feature walkthrough](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/marketplace-product-feature-overview.html).

## ProductOffer

`ProductOffer` is a Marketplace domain object. `ProductOffer` enables the assignment of a special price and stock to a `Product`. In the Marketplace, a `Merchant` can own a `ProductOffer`, and they define their prices and stock of `Products`.

Relation from `ProductOffer` to `Merchant` is optional. While `ProductOffer` is a core domain object for Marketplace, it can also be used for other non-Marketplace-related cases or even are non-Merchant-related.

To learn more about the Product Offer entity, see [Marketplace Product Offer feature walkthrough](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-merchant-portal-product-offer-management-feature-domain-model-and-relationships.html).

## Order

`Order` is a B2C/B2B e-commerce domain object. It is another standard e-commerce domain object representing a transaction of buying some goods on a shop by a customer. In the Marketplace, an `Order` may contain items that multiple `Merchants` own. For this reason, merchants never have access to it. Only customers and Marketplace operators can access `Order` objects.

## MerchantOrder

`MerchantOrder` is a Marketplace domain object. `MerchantOrder` is a composition of `OrderItem`, `OrderTotal`, `OrderShipment`, `OrderCustomer` objects, and other related to a particular merchant within one `Order`. `MerchantOrder` is the key entity that helps Merchants to fulfill `Order` objects. You can have different OMS flows for different `Merchant` objects so that each `Merchant` can process their `MerchantOrder` objects with the best flow. `Merchant` objects use the [Merchant Portal application](/docs/dg/dev/architecture/marketplace-architecture/marketplace-merchant-portal-architecture-overview.html) to fulfill `MerchantOrder` objects.

To learn more about the orders in the Marketplace, see [Marketplace Order Management feature overview](/docs/pbc/all/order-management-system/{{site.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html).
