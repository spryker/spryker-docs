---
title: Marketplace Domain Model
description:
template: concept-topic-template
---
This document depicts how a Spryker Marketplace looks like in general. After reading this odc you will now: 

- what are the key Domain Object that makes a Spryker shop to be a Marketplace

## Domain Model
The following diagram demonstrates the core aggregates of the domain model of the Spyker Marketplace.
Marketplace is an add-on to your Spryker b2c or b2b project.
It extends the existing Domain with Merchant and ProductOffer to enable sophisticated business models for your Marketplace application. 
Please note that this model is intentionally simplified, learn more about core domain objects in Feature Walkthourghs section.

![Domain Model](https://confluence-connect.gliffy.net/embed/image/02c4183f-2823-4371-ba91-aa5f9585998b.png?utm_medium=live&utm_source=custom)

#### Merchant
Is a core Marketplace domain object. Merchant represents an entity of a third-party seller on a shop. In other setups (such as "big box retail"), Merchant can represent a branch of a chain of stores.
Merchants use MerchantPortal to manage their profile, catalog, and sales. 

Learn more about [Marketplace Merchant here](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-merchant-feature-walkthrough.html).

#### Product
Is a b2c/b2b e-commerce domain object. Some goods that are offered in a shop and can be bought by a customer. Notice that in Marketplace a Product can be owned by a Marketplace Operator or can be created by a Merchant.

Learn more about [Marketplace Product here](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-product-feature-walkthrough.html).

#### ProductOffer
Marketplace Domain object. ProductOffer allows assigning a special price and stock to a Product. In Marketplace, a ProductOffer can be owned by a Merchant, this way Merchants can define their own prices and stock to Products on a system.

Please notice that relation from ProductOffer to Merchant is optional. While ProductOffer is a core domain object for Marketplace, it can also be used for other cases that are not Marketplace related or even are not  Merchant related.

Learn more about [Marketplace Product Offer here](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html)

#### Order 
Is a b2c/b2b e-commerce domain object. Another standard e-commerce domain object that represents a transaction of buying some goods on a shop by a Customer. In Marketplace an Order may contain items that are owned by multiple Merchants. For this reason, Merchants never have access to it, only Customer and Marketplace Operator can access Orders.

#### MerchantOrder 
Marketplace domain object. MerchantOrder is a composition of OrderItems, OrderTotals, OrderShipment, OrderCustomer, and other objects that are related to a particular Merchant within one Order. This is the key entity that helps Merchants to fulfill Orders. It is even possible to have different OMS flows for different Merchants, so each Merchant can process its MechantOrders with the flow that suits best. Merchants use MerchantPortal application to fulfill MerchantOrders. (todo: link to this page to MerchnatPortal)

 
Learn more about [Marketplace Order Management here](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-order-management-feature-walkthrough.html#module-relations)
