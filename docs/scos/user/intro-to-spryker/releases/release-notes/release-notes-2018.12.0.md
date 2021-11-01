---
title: Release Notes 2018.12.0
description: This document contains business level description of major new features and enhancements released in November of 2018.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-2018-12-0
originalArticleId: ed7ff54e-895b-4b0c-a4e0-3731e5547b6e
redirect_from:
  - /2021080/docs/release-notes-2018-12-0
  - /2021080/docs/en/release-notes-2018-12-0
  - /docs/release-notes-2018-12-0
  - /docs/en/release-notes-2018-12-0
  - /v5/docs/release-notes-2018-12-0
  - /v5/docs/en/release-notes-2018-12-0
  - /v4/docs/release-notes-2018-12-0
  - /v4/docs/en/release-notes-2018-12-0
  - /v3/docs/release-notes-2018-12-0
  - /v3/docs/en/release-notes-2018-12-0
  - /v2/docs/release-notes-2018-12-0
  - /v2/docs/en/release-notes-2018-12-0
  - /v1/docs/release-notes-2018-12-0
  - /v1/docs/en/release-notes-2018-12-0
  - /v6/docs/release-notes-2018-12-0
  - /v6/docs/en/release-notes-2018-12-0
related:
  - title: Managing Customers
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/managing-customers.html
  - title: Managing Wishlists
    link: docs/scos/dev/glue-api-guides/page.version/managing-wishlists/managing-wishlists.html
  - title: Retrieving Customer's Order History
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/retrieving-customer-orders.html
  - title: REST API Reference
    link: docs/scos/dev/glue-api-guides/page.version/rest-api-reference.html
---

 The Spryker Commerce OS is an end-to-end solution for e-commerce. This document contains business level description of major new features and enhancements released in November of 2018.

For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-getting-started-guide.html).

## Spryker Glue REST API
In response to multiple customer requests, we are happy to introduce Glue as a new application layer to the Spryker Commerce OS architecture. Glue provides API infrastructure, own application, feature resources, and documentation generators.
![Spryker Glue REST API](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image4.jpg)

### API Application Infrastructure
The Glue allows you to use the power of the Spryker Commerce OS in a variety of custom-built applications. With Glue, you can build a mobile commerce application or implement a Spryker Shop by using a single-page JS framework. Basically, you can enable any touch points required by your business. As an application, Glue knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality. It is an integration and extension point for your Spryker implementation.

## Glue (Storefront)
### Catalog Browsing
The catalog browsing endpoints allow you to request search results and also use the Elasticsearch facet implementation. Furthermore, you can retrieve product-related information beyond price and category, including product labels and relations.

**Documentation**: [Catalog Search](/docs/scos/dev/glue-api-guides/{{site.version}}/searching-the-product-catalog.html).

### Login/Registration
Endpoints ensure access-token login and retrieval. Customers can also register and request new passwords in case they forgot or want to change their current password.

**Documentation**: [Managing Customers](/docs/scos/user/back-office-user-guides/{{site.version}}/customer/customer-customer-access-customer-groups/managing-customers.html).

### Cart
Customers and guests can add products to their cart. Guest carts are now also persisted and retrievable via anonymous IDs, handled by your client application.

**Documentation**: [Managing Carts](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).

### Checkout
Retrieve all the necessary information to build your checkout for guest customers and already registered customers with their personal data. If you offer different shipment or payment methods on your own conditions, they will be considered.

**Documentation**: [Checking Out Purchases and Getting Checkout Data](/docs/scos/dev/glue-api-guides/{{site.version}}/checking-out/checking-out-purchases.html).

### Customer Account
Your customers can benefit from the same shop experience with the customer account endpoints. Not only can basic customer information be administered, but also wishlist and order history functionality is offered.

**Documentation**: [Managing Customers](/docs/scos/user/back-office-user-guides/{{site.version}}/customer/customer-customer-access-customer-groups/managing-customers.html), [Managing Wishlists](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-wishlists/managing-wishlists.html), [Retrieving Customer's Order History](/docs/scos/dev/glue-api-guides/{{site.version}}/retrieving-orders.html).

## Documentation Swagger Generator
![Documentation Swagger generator](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image3.png)

To help you keep track of your API development, we implemented a simple command that will create a YAML file to be used in your Swagger implementation to share the progress of development in your company.

**Documentation**: [REST API Reference](/docs/scos/dev/glue-api-guides/{{site.version}}/rest-api-reference.html).

## B2C API React Example
![B2C API React example](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image2.png)

To demonstrate how to use Spryker’s API, we’ve included an example application based on a React JS library. It leverages a selection of existing endpoints to provide a complete shop experience - from browsing the catalog to placing an order.

{% info_block warningBox %}

This application is released for the sole purpose of illustrating API usage. It is part of the documentation and should not under any circumstances be used as a starting point for any project.

{% endinfo_block %}

## Demo Shops
### B2C Demo Shop
After the initial release of our new B2C Demo Shop, we are happy to announce the new standard template for it. This new template comes with a responsive design and stylized interface to emphasize the idea behind a good B2C online shop.
![B2C demo shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image1.png)

### B2B Demo Shop
Our B2B Demo Shop interface has been updated to be responsive on every device.
![B2B demo shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.12.0/image5.png)
