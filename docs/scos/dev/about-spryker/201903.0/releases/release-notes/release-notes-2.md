---
title: Release Notes 2018.12.0
originalLink: https://documentation.spryker.com/v2/docs/release-notes-2018-12-0
redirect_from:
  - /v2/docs/release-notes-2018-12-0
  - /v2/docs/en/release-notes-2018-12-0
---

 The Spryker Commerce OS is an end-to-end solution for e-commerce. This document contains business level description of major new features and enhancements released in November of 2018.
 
For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-guides/201903.0/installation/dev-getting-sta).

## Spryker Glue REST API
In response to multiple customer requests, we are happy to introduce Glue as a new application layer to the Spryker Commerce OS architecture. Glue provides API infrastructure, own application, feature resources, and documentation generators.
![Spryker Glue REST API](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image4.jpg){height="" width=""}

### API Application Infrastructure
The Glue allows you to use the power of the Spryker Commerce OS in a variety of custom-built applications. With Glue, you can build a mobile commerce application or implement a Spryker Shop by using a single-page JS framework. Basically, you can enable any touch points required by your business. As an application, Glue knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality. It is an integration and extension point for your Spryker implementation.

## Glue (Storefront)
### Catalog Browsing
The catalog browsing endpoints allow you to request search results and also use the Elasticsearch facet implementation. Furthermore, you can retrieve product-related information beyond price and category, including product labels and relations.

**Documentation**: [Catalog Search](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/catalog-search).

### Login/Registration
Endpoints ensure access-token login and retrieval. Customers can also register and request new passwords in case they forgot or want to change their current password.

**Documentation**: [Managing Customers](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/customers/customers-customer-access-customer-groups/managing-custom).

### Cart
Customers and guests can add products to their cart. Guest carts are now also persisted and retrievable via anonymous IDs, handled by your client application.

**Documentation**: [Managing Carts](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/managing-carts/managing-carts).

### Checkout
Retrieve all the necessary information to build your checkout for guest customers and already registered customers with their personal data. If you offer different shipment or payment methods on your own conditions, they will be considered.

**Documentation**: [Checking Out Purchases and Getting Checkout Data](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/checking-out-pu).

### Customer Account
Your customers can benefit from the same shop experience with the customer account endpoints. Not only can basic customer information be administered, but also wishlist and order history functionality is offered.

**Documentation**: [Managing Customers](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/customers/customers-customer-access-customer-groups/managing-custom), [Managing Wishlists](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/managing-wishli), [Retrieving Customer's Order History](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/retrieving-orde).

## Documentation Swagger Generator
![Documentation Swagger generator](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image3.png){height="" width=""}

To help you keep track of your API development, we implemented a simple command that will create a YAML file to be used in your Swagger implementation to share the progress of development in your company.

**Documentation**: [REST API Reference](/docs/scos/dev/glue-api/201903.0/rest-api-refere).

## B2C API React Example
![B2C API React example](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image2.png){height="" width=""}

To demonstrate how to use Spryker’s API, we’ve included an example application based on a React JS library. It leverages a selection of existing endpoints to provide a complete shop experience - from browsing the catalog to placing an order.

{% info_block warningBox %}
This application is released for the sole purpose of illustrating API usage. It is part of the documentation and should not under any circumstances be used as a starting point for any project.
{% endinfo_block %}

## Demo Shops
### B2C Demo Shop
After the initial release of our new B2C Demo Shop, we are happy to announce the new standard template for it. This new template comes with a responsive design and stylized interface to emphasize the idea behind a good B2C online shop.
![B2C demo shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image1.png){height="" width=""}

### B2B Demo Shop
Our B2B Demo Shop interface has been updated to be responsive on every device.
![B2B demo shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image5.png){height="" width=""}
