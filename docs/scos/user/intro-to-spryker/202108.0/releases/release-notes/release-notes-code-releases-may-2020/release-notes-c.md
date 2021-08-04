---
title: Release Notes- Code Releases May, 2020
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-code-releases-may-2020
redirect_from:
  - /2021080/docs/release-notes-code-releases-may-2020
  - /2021080/docs/en/release-notes-code-releases-may-2020
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of new features and enhancements we are announcing in May of 2020 as part of the [code release](https://documentation.spryker.com/v5/docs/spryker-release-process#atomic--code--releases).
For information about installing the Spryker Commerce OS see [Getting Started Guide](/docs/scos/dev/developer-guides/202005.0/dev-getting-sta).


## Spryker Commerce OS
### Custom Order Reference
**Custom Order Reference** is a small but powerful feature that allows adding an external reference to the orders that were placed by a Customer. It can be a reference to a system that manages internal purchases or a ticket system. Irrespective of the purpose of the external system, which can vary from invoicing to accounting, the reference to it can always be saved on the Storefront and in the Back Office. 
**Custom Order Reference** is the out-of-the-box solution that increases transparency and allows you to control purchases for the B2B companies more efficiently.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes%3A+Code+Releases+May%2C+2020/image1.png){height="" width=""}

#### Documentation
[Custom Order Reference](/docs/scos/dev/features/202005.0/order-management/custom-order-reference/custom-order-re)

### Filter and Search in Order Archive 
**Filter and Search in Order Archive** allows B2C users to search and filter orders in their order archive, and for B2B users, it opens even more possibilities. **Filter and Search** adds two new permissions that allow B2B users to view their orders, orders of their Business Units, and orders of their Company. The order management has now become easier and provides multiple tools to find an order by order reference, product name, or product SKU and to see products of the orders on the order archive page. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes%3A+Code+Releases+May%2C+2020/image7.png){height="" width=""}

#### Documentation
[Filter and Search in Order Archive](https://documentation.spryker.com/docs/customer-account-feature-overview#customer-account-on-the-storefront)

### Adding Shipment Cost to RFQ 
**Adding shipment cost for RFQ** is a new step in the Quotation Process at Spryker. Previously, it was not possible to create a quote with a shipment cost, which created limitations in digital negotiations about a purchase. Now, the negotiations can go further: the B2B Customers can negotiate with Supplier not only the item price and volume of order but the shipment cost of the purchase as well. 

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes%3A+Code+Releases+May%2C+2020/image3.png){height="" width=""}


#### Documentation
[Quotation Process and RFQ](https://documentation.spryker.com/v5/docs/quotation-process-rfq-201907)

### Configuration (YAML) File for Batch Data Import
We have improved data importers’ usability. 
Using a **YAML configuration file** as a parameter of data:import **console command** you will now be able to **import several CSV data files in a batch**, having the flexibility of defining it without changing your project’s source code.
You may now change names and location of the CSV files to be imported, define a YAML configuration file with a data subset to import as a bulk, making it easier to manage your data import operation.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes%3A+Code+Releases+May%2C+2020/image4.png){height="" width=""}

#### Documentation
[Importing Data with a Configuration File](https://documentation.spryker.com/v5/docs/importing-data)

### Data Import Documentation
We have improved data importers’ documentation, making it easier to understand how Spryker Demo Shop data import works for most common import operations: Products, Prices, Stock, Content, Merchandising, etc. 
You will have access to detailed information about CSV files content, dependencies, and mandatory information needed to run your usual data import operation.

#### Documentation
[Demo Shop Data Import](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/importing-demo-shop-data/about-demo-shop)

### Product Relation per Store
We have enhanced our multi-store feature with a new product management functionality.
Starting from this release, **Product Relations** can be assigned to stores. You can now define different **Product Relations** of the same type (related product or up-sell) and assign them to specific stores.
This way, you can adjust the relations between products depending on your markets.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes%3A+Code+Releases+May%2C+2020/image6.gif){height="" width=""}

#### Documentation
[Product Relations](/docs/scos/dev/features/202005.0/product-information-management/product-relations/product-relatio)

### Product Abstract Card on Product List
We have improved our Front-end component **Product Abstract Card** to fully support the Product Group feature. Whenever you hover the color selector on the card, the picture, title, and price of the product are updated to match your selection.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes%3A+Code+Releases+May%2C+2020/image8.gif){height="" width=""}

#### Documentation
[Product Groups](https://documentation.spryker.com/docs/product-groups)

## Spryker Glue API
In this release, we continue exposing functionality with high-impact on your **B2C and B2B Storefront**.
Enabling your customers to create shopping lists, allowing you to sell products by any unit of measure that you specifically define, and offering your customers discounts with promotional products are only a part of the APIs provided in this release. 

### Measurement Units API
Both in the B2B and B2C contexts, you’ll find many cases when you want to sell products not by unit but by different measures. For example, you can offer apples by “kilogram” and cables by “Centimeter”, “Meter” or “Feet” instead of by “Item”. This API enables you to **use measurement units throughout the purchasing’s user journey in product detail pages, cart, checkout, and orders**.

#### Documentation
[Measurement Units API](/docs/scos/dev/glue-api-guides/202005.0/retrieving-meas)

### Shopping Lists API
In the B2B context, shopping lists play a key role. Company users can create and manage shopping lists of frequently purchased products to help them complete recurrent purchases and to organize their shopping preferences with ease. With this API, you can **enable your customers’ company users to create and retrieve shopping lists, edit and delete them, add and remove items from a shopping list, etc**.

#### Documentation
[Shopping Lists API](/docs/scos/dev/glue-api-guides/202005.0/managing-shoppi)

### Promotional Products API
Equally important in B2B and B2C are product discounts and promotions. In our previous release, we already provided endpoints for cart rules and vouchers. Now you will also be able to make use of the API to **offer discounts consisting of promotional products**. With this API, you can apply promotional product discounts to allow adding a promotional product to cart and highlight it among the cart items.

#### Documentation
[Promotions API](/docs/scos/dev/glue-api-guides/202005.0/discounts-and-promotions/retrieving-prom)

### Checkout API - Shipment and Payment Methods
The checkout process is paramount for your business in any business model. With this API, you will be able to **integrate shipment and payment methods** seamlessly in your checkout process. You can get shipment and payment methods with one single request and also make use of only the information you need on each checkout step, with clear identification and decoupling of the selected methods’ information.

#### Documentation

* [Checking Out Purchases and Getting Checkout Data](https://documentation.spryker.com/docs/checking-out-purchases-and-getting-checkout-data-201907)
* [Retrieving Customer's Order History](https://documentation.spryker.com/docs/retrieving-customers-order-history)

### Refresh Token API - Create Possibility to Invalidate Refresh Tokens
To enable the maximum level of security for your system, you must be able to invalidate refresh tokens in the presence of potential menaces. With this API **refresh tokens are made persistent long-term and you will be able to revoke them at any time for each user**. You can also configure the amount of time for persistence and clean the refresh tokens up from the database when necessary.

#### Documentation
[Token Revocation](https://documentation.spryker.com/v5/docs/authentication-and-authorization#token-revocation)

### Swagger Documentation Generator Contains “Includes” by Endpoint
In order to make it easier for API consumers to understand the content of those endpoints following the compound documents section of the JSONAPI specification, in this release, we have introduced improvements that will allow you to have upfront information by endpoint about the **primary resources that can be included in the response**. This can be useful not only for a basic understanding of the endpoints but also for automation purposes.

#### Documentation
[Resource Relationships](https://documentation.spryker.com/v5/docs/documenting-glue-api-resources#resource-relationships)

## Technical Enhancements
### Enable Jenkins v2 with SSL
We have improved our Jenkins v2 support and security of cros-service communication covered with SSL by enabling additional API configuration.

### Cart Performance Improvements 
A few last code releases were aiming to bring cart operation to a new performance level. We have raised our acceptance criteria for cart operations to 100 independent cart items and optimized the related calculation stack.
Also, there were a few infrastructural releases bringing performance improvements across all Spryker applications with glossary and class resolver optimizations.

### Yves Console - a Dedicated Storefront Console
There are many DevOps operations which are relevant only for Yves Application, such as router and template engine warmers. Therefore, we have introduced an independent way of running Yves relevant console commands with a separate application context.
