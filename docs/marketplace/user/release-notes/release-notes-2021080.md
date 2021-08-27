---
title: Release notes 202108.0
description: Release notes for the release 202108.0
template: concept-topic-template
---


The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of new features and enhancements.

For information about installing the Spryker Commerce OS, see [Developer getting started guide](https://documentation.spryker.com/docs/dev-getting-started).


## Merchants

A _Merchant_ is a third-party seller who is invited by a marketplace operator to join the Marketplace, so they can offer their products to end customers. The Marketplace supports multiple merchants. The merchant has its own merchant users, products, offers, and profile on the Storefront.


### Merchant Portal

_Merchant Portal_ is the management interface where merchants do all administrative tasks:



* Create and manage products and product offers
* Manage orders and returns
* Register and edit merchant profile
* Review their shop’s performance

![Merchant portal dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/merchant-portal-dashboard.png)



  Documentation:
  * [Merchant Portal overview](/docs/marketplace/user/merchant-portal-user-guides/logging-in-to-the-merchant-portal.html)
  * [Merchant users](/docs/marketplace/user/features/marketplace-merchant/marketplace-merchant-overview/merchant-users.html)


### Merchant Profile

_Merchant Profile_ is a Storefront page with a unique URL where a merchant showcases all the relevant information about their shop. Managed within the merchant portal, a merchant can add the following information to the merchant profile:



* Shop description
* Banner
* Logo
* Contact information
* Opening hours
* Terms & conditions
* Imprint details.

They can also set up the store relations, determine their own unique merchant profile URL, and publish their shop online.

Every reference to a merchant on the Storefront is linked to their merchant profile, so that it is transparent who the seller of a product is.

![Merchant profile](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/merchant-profile-page.png)

  Documentation: [Marketplace Merchant feature overview](/docs/marketplace/user/features/marketplace-merchant/marketplace-merchant-overview/marketplace-merchant-overview.html)




## Merchant Products and Merchant Product Offers

In the Marketplace, merchants can sell products by creating new products or creating offers for the products that were created by other merchants. Customers can filter products and offers by merchants in the catalog and search results.


### Merchant Products

A _Merchant Product_ is a product created by a merchant. The merchant that creates a product owns the product data like product description, images, attributes, prices, or stock.

![Merchant product on the Product Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/merchant-product-on-pdp.png)

  Documentation: [Marketplace Products feature overview](/docs/marketplace/user/features/marketplace-product-feature-overview.html)


### Merchant Product Offers

Multiple merchants can sell the same product. When a merchant wants to sell a product that had been created by another merchant, instead of creating a duplicate product, they create a _Product Offer_. The merchant that originally created the product owns the product information. The merchant who created the product offer, owns the information that’s unique for the offer, like price, stock, and validity dates. A merchant can create multiple offers for the same product.

The _Product Details _page contains a section where a customer can view and select the product or its offers. In this section, the merchant who created the product is displayed on top, while the product offers are sorted in an ascending order by price.

![Merchant offers on the Product Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/merchant-offers-on-pdp.png)

  Documentation: [Marketplace Product Offer](/docs/marketplace/user/features/marketplace-product-offer.html)


### Merchant Product Options

Merchants can create and connect product options to their or other merchants’ products.

Documentation: [Marketplace Product Options feature overview](https://docs.spryker.com/docs/marketplace/user/features/marketplace-product-options-feature-overview.html)




## Marketplace and Merchant Orders

When a customer places an order on the Marketplace, a _Marketplace Order_ is created. The Marketplace Order can contain offers and products from different merchants. The part of the order that belongs to a certain merchant is referred to as a _Merchant Order_ and it can have a custom order management process mapped with the Spryker State Machine.


### Split orders

Customers can add products from different merchants to a single cart and order them as a single order. An order with items from multiple merchants is split into merchant orders. The key features of split orders are as follows:



* Each merchant order has a dedicated state machine.
* Merchants or a marketplace operator can fulfill the orders from different warehouses and at different times
* Each merchant order is a separate shipment that a customer can track and get updates about.
* Merchants independently process their returns.
* Merchants have different OMS processes that are ruled by the State Machine.

![Marketplace order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/the-storefront-order-details.png)

	Documentation: [Marketplace Order Management](/docs/marketplace/user/features/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html)





## Back Office for Marketplace Operator

A _Marketplace Operator_ ensures compliance with Marketplace guidelines by managing merchants, their products, and offers and reviewing marketplace performance in the Back Office.


### Merchant management

The operator can create, edit, and approve merchants and merchant users. They also manage the access of merchant users to the Merchant Portal.

![Merchants in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/the-back-office-merchants.png)

  Documentation:
  * [Managing merchants](/docs/marketplace/user/back-office-user-guides/marketplace/merchants/managing-merchants.html)
  * [Managing merchant users](/docs/marketplace/user/back-office-user-guides/marketplace/merchants/managing-merchant-users.html)


### Merchant product management

The operator can edit and activate merchant products and product options.

![Merchnat products in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/the-back-office-products.png)

  Documentation: [Marketplace Products feature overview](/docs/marketplace/user/features/marketplace-product-feature-overview.html)


### Merchant product offer management

The operator can view and approve merchant product offers.

![Merchant offer in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/the-back-office-offers.png)

  Documentation: [Managing merchant product offers](/docs/marketplace/user/back-office-user-guides/marketplace/offers/managing-merchant-product-offers.html)


### Marketplace and merchant order management

The operator can view and cancel marketplace and merchant orders.

![Marketplace orders in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/the-back-office-orders.png)

  Documentation: [Managing marketplace orders](/docs/marketplace/user/back-office-user-guides/marketplace/orders/managing-marketplace-orders.html)


### Marketplace and merchant return management

The operator can view and create marketplace and merchant returns.

![Marketplace returns in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Releases/Release+notes+202108.0/the-back-office-returns.png)

## Operator as a merchant

The operator can act as a _Main Merchant_ and sell products. In Back Office, they manage their own orders and returns separately from the other merchants’ orders and returns.

  Documentation: [Managing main merchant orders](/docs/marketplace/user/back-office-user-guides/sales/managing-main-merchant-orders.html)




## Glue APIs

All the significant features of Spryker Marketplace are covered with Glue APIs.

  Documentation:
  * [Retrieving merchant information](/docs/marketplace/dev/glue-api-guides/retrieving-merchant-information.html)
  * [Retrieving merchant abstract products](/docs/marketplace/dev/glue-api-guides/abstract-products/retrieving-abstract-products.html)
  * [Retrieving merchant concrete products](/docs/marketplace/dev/glue-api-guides/concrete-products/retrieving-concrete-products.html)
  * [Retrieving product offers](/docs/marketplace/dev/glue-api-guides/retrieving-product-offers.html)
  * [Retrieving product offers for a concrete product](/docs/marketplace/dev/glue-api-guides/concrete-products/retrieving-product-offers-for-a-concrete-product.html)
  * [Managing items in carts of registered users](/docs/marketplace/dev/glue-api-guides/carts-of-registered-users/managing-items-in-carts-of-registered-users.html)
  * [Retrieving marketplace orders](/docs/marketplace/dev/glue-api-guides/retrieving-marketplace-orders.html)
  * [Managing the returns](/docs/marketplace/dev/glue-api-guides/managing-the-returns.html)
  * [Managing wishlist items](/docs/marketplace/dev/glue-api-guides/wishlists/managing-wishlist-items.html)
  * [Catalog search](/docs/marketplace/dev/glue-api-guides/catalog-search.html)
  * [Retrieving suggestions for auto-completion and search](/docs/marketplace/dev/glue-api-guides/retrieving-suggestions-for-auto-completion-and-search.html)



## Data exchange

To ensure a smooth merchant onboarding process and overall marketplace setup, we’ve implemented marketplace-specific data importers to exchange the most relevant information between merchants and the operator.


### Data import

These are the new data importers available in our data import framework:

* Product offers: The operator can provide a template to the merchants, so that they can add all offer-related information in one file that can be imported afterwards. Documentation: [File details: combined_merchant_product_offer.csv](/docs/marketplace/dev/data-import/file-details-combined-merchant-product-offer-csv.html).
* Merchant Order items status. Documentation: [File details: merchant-order-status.csv](/docs/marketplace/dev/data-import/file-details-merchant-order-status-csv.html).


### Data export

The new merchant order exporter allows to export information like orders, order Items, and expenses.

  Documentation: [Data export Merchant Orders .csv files format](/docs/marketplace/dev/data-export/data-export-merchant-orders-csv-files-format.html)
