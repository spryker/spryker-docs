---
title: Glue REST API
last_updated: Jul 13, 2023
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-rest-api
originalArticleId: 0556fe67-9243-4b84-b81f-8e417ca3d270
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/glue-rest-api.html
  - /docs/scos/dev/glue-api-guides/202200.0/glue-rest-api.html
  - /api/definition-api.htm
  - /docs/scos/dev/glue-api-guides/202204.0/glue-rest-api.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/glue-rest-api
related:
  - title: Reference information - GlueApplication errors
    link: docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

The *Spryker Glue REST API* is a JSON REST API that is an application of the Spryker Cloud Commerce OS (SCCOS). It is build to be used as a contract between the SCCOS backend and any possible touchpoint or integration with a third-party system. As an application, Glue knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality.



The REST API represents a contract that developers can stick to when they are extending the Spryker Commerce OS with new touchpoints or integrations. The predefined APIs are not meant to be used in the same way. Furthermore, all REST API requests are handled according to the [JSON REST API specification](https://jsonapi.org/). These specifications define how clients should request data, fetch it, modify it, and how the server should respond to it. Hence, the expected behavior stays the same across all endpoints.

![Glue REST API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+REST+API/glue-rest-api.jpg)



## Glue

The Spryker API infrastructure, which is implemented as a separate layer of the SCCOS, is called Glue. Glue is responsible for providing API endpoints, processing requests, and for communicating with other layers of the OS.

For more details, see [Glue Infrastructure](/docs/dg/dev/glue-api/latest/rest-api/glue-infrastructure.html).

## REST API

The Glue REST API comes with a set of predefined APIs, which you can extend or add your own APIs. The predefined APIs support Storefront functionality and can be used for integrations with third-party systems. The Storefront functionality enables you to build a custom experience for your customers in any touchpoint leveraging data and functionality at the core of your Commerce OS. For example, it lets you to fetch product data to be displayed on a custom product details page in your mobile app.

For more details, see REST API reference:

- [REST API B2B Demo Shop reference](/docs/dg/dev/glue-api/latest/rest-api/rest-api-b2b-demo-shop-reference.html)
- [REST API B2C Demo Shop reference](/docs/dg/dev/glue-api/latest/rest-api/rest-api-b2c-demo-shop-reference.html)

## B2C API React example

To help you understand possible use cases, we provide a sample app as an exemplary implementation (which is not a starting point for development). It can coexist with a shop as a second touchpoint in the project. From a technological perspective, it's based on our customers' interests. The app is single-page application based on a React JS library.

It delivers a full customer experience from browsing the catalog to placing an order. The application helps you understand how you can use the predefined APIs to create a B2C user experience. As an example, the full power of Elasticsearch, which is already present in our [B2B](/docs/about/all/b2b-suite.html) and [B2C Demo Shops](/docs/about/all/b2c-suite.html), is leveraged through dedicated endpoints to deliver catalog search functionality with autocompletion, autosuggestion, facets, sorting, and pagination.

{% info_block infoBox %}

For more deatails about installing and running, see [B2C API React example](/docs/dg/dev/glue-api/latest/glue-api-tutorials/b2c-api-react-example/b2c-api-react-example.html).

{% endinfo_block %}

### Use cases for Glue API

Glue API helps you to connect your Spryker Commerce OS with new or existing touch points. These touchpoints can be headless like voice commerce devices and chat bots, or they may come with a user interface like a mobile app. Alternative front ends also benefit from the APIs. Here are some examples:
- New frontend: Build a new frontend or use a frontend framework like Progressive Web Apps and power it by the Glue API.
- Mobile app: a mobile app, no matter if it's native, hybrid or just a web-view, can support the same functionality as the existing demo shops do.
- Voice commerce: Leverage the APIs for order history to inform your customers about the status of their delivery.
- Chatbot: Use chatbots to identify the customer that are trying to reach out to you and help them answer basic questions about your products.

## Business advantages of using the Glue API

You can benefit from the APIs in these aspects:
- Reach more customers: APIs empower you to create any number of touchpoints to connect with your customers, regardless of the device.
- Customization:  You can reach out to different customer segments via different touchpoints. APIs enable you to offer a tailored customer experience for your audience, wherever it may be.
- Integrations: APIs are not only used to deliver custom experiences, but you can also leverage APIs to integrate to different platforms; from offering your products on Amazon to leveraging mapping services for customers to find your offline store.
- Testing ideas: APIs are the quickest way to test your ideas and get a head start before the competition does. Consider them as building blocks for your developers to assemble your new ideas. New applications only need to follow the API contracts, but even those can be extended for your purposes.
