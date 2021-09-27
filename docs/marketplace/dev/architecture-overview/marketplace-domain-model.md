---
title: Marketplace domain model
description: The following document shows how Spryker Marketplace looks in general. As a result of reading this document, you will have a better understanding of the key Domain Objects that make a Spryker Shop a Marketplace.
template: concept-topic-template
---
The following document shows how Spryker Marketplace looks in general. As a result of reading this document, you will have a better understanding of the key Domain Objects that make a Spryker Shop a Marketplace.
 
## Domain Model
The following diagram demonstrates the core aggregates of the domain model of the Spryker Marketplace.
The Marketplace is an add-on to your Spryker B2C or B2B project.
It extends the existing Domain with Merchant and ProductOffer to enable sophisticated business models for your Marketplace application. 
Please note that this model is intentionally simplified. Learn more about core domain objects in the Marketplace Merchant feature walkthrough and Product offer feature walkthrough.

![Domain Model](https://confluence-connect.gliffy.net/embed/image/02c4183f-2823-4371-ba91-aa5f9585998b.png?utm_medium=live&utm_source=custom)

#### Merchant
It is a core Marketplace domain object. Merchant represents an entity of a third-party seller on a shop. In other setups (such as "big-box retail"), the Merchant can represent a branch of a chain of stores.
Merchants use MerchantPortal to manage their profile, catalog, and sales. 

To learn more about the merchant entity, see [Marketplace Merchant feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-feature-walkthrough.html).

#### Product
It is a B2C/B2B e-commerce domain object. The product represents some goods or services offered in a shop, and a customer can buy that. Notice that in the Marketplace, a Product can be owned by a Marketplace Operator or can be created by a Merchant.

To learn more about the product, see [Marketplace Product feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-feature-walkthrough.html).

#### ProductOffer
ProductOffer is a Marketplace Domain object. ProductOffer allows assigning a special price and stock to a Product. In the Marketplace, a Merchant can own a ProductOffer, and they define their prices and stock to Products in the system.

Relation from ProductOffer to Merchant is optional. While ProductOffer is a core domain object for Marketplace, it can also be used for other not Marketplace-related cases or even are not Merchant-related.

To learn more about the Product Offer, see [Marketplace Product Offer feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html).

#### Order 
Order is a B2C/B2B e-commerce domain object. It is another standard e-commerce domain object representing a transaction of buying some goods on a shop by a Customer. In the Marketplace, an Order may contain items that multiple Merchants own. For this reason, Merchants never have access to it. Only the Customer and Marketplace Operator can access to Orders.

#### MerchantOrder 
MerchantOrder is a Marketplace domain object. MerchantOrder is a composition of OrderItems, OrderTotals, OrderShipment, OrderCustomer, and other objects related to a particular Merchant within the one Order. MerchantOrder is the key entity that helps Merchants to fulfill Orders. It is possible to have different OMS flows for different Merchants so that each Merchant can process their MechantOrders with the best flow. Merchants use the MerchantPortal application to fulfill MerchantOrders. (todo: link to this page to MerchantPortal)

 
To learn more about the orders in the Marketplace, see [Marketplace Order Management feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough.html).

