---
title: Glue REST API
originalLink: https://documentation.spryker.com/v6/docs/glue-rest-api
redirect_from:
  - /v6/docs/glue-rest-api
  - /v6/docs/en/glue-rest-api
---

The Spryker Glue REST API is a JSON REST API that is an application of the Spryker Commerce OS. It is build to be used as a contract between the Spryker Commerce OS Backend and any possible touchpoint or integration with a third-party system. As an application, Glue knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality.
![Glue REST API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+REST+API/glue-rest-api.jpg){height="" width=""}

## Glue
The Spryker API infrastructure, which is implemented as a separate layer of the Spryker Commerce OS, is called Glue. Glue is responsible for providing API endpoints, processing requests, and for communicating with other layers of the OS.

{% info_block infoBox %}
For more details, see [Glue Infrastructure](https://documentation.spryker.com/docs/glue-infrastructure
{% endinfo_block %}.)

## REST API
The Glue REST API comes with a set of predefined APIs, which you can extend or add your own APIs. The predefined APIs support Storefront functionality and can be used for integrations with third-party systems. The Storefront functionality enables you to build a custom experience for your customers in any touchpoint leveraging data and functionality at the core of your Commerce OS. For example, it allows you to fetch product data to be displayed on a custom product details page in your mobile app.

For more details, see [REST API Reference](https://documentation.spryker.com/docs/rest-api-reference).

## B2C API React example
To help you understand possible use cases, we provide a sample app as an examplary implementation (which is not a starting point for customer projects, though). It can coexist with a shop as a second touchpoint in the project. From a technology perspective, it is based on our customers' interests. The app is single-page application based on a React JS library.

It delivers a full customer experience from browsing the catalog to placing an order. The application helps you understand how you can use the predefined APIs to create a B2C user experience. As an example, the full power of Elasticsearch, which is already present in our [B2B](https://documentation.spryker.com/docs/b2b-suite#b2b-demo-shop) and [B2C Demo Shops](https://documentation.spryker.com/docs/b2c-suite#b2c-demo-shop), is leveraged via dedicated endpoints to deliver catalog search functionality with auto-completion, auto-suggestion, facets, sorting, and pagination.

{% info_block infoBox %}
[Install and run!](https://documentation.spryker.com/docs/b2c-api-react-example
{% endinfo_block %})

### What can you use the REST API for?
Glue API helps you to connect your Spryker Commerce OS with new or existing touch points. These touchpoints can be headless like voice commerce devices and chat bots, or they may come with a user interface like a mobile app. Alternative front ends also benefit from the APIs. Here are some examples:

* New front end: Build a new front end or use a front-end framework like Progressive Web Apps and power it by the Glue API.
* Mobile app: a mobile app, no matter if it is native, hybrid or just a web-view, can support the same functionality as the existing demo shops do.
* Voice commerce: Leverage the APIs for order history to inform your customers about the status of their delivery.
* Chatbot: Use chatbots to identify the customer that are trying to reach out to you and help them answer basic questions about your products.

## What are the business advantages of using the Glue API?
You can benefit from the APIs in these aspects:

* Reach more customers: APIs empower you to create any number of touchpoints to connect with your customers, regardless of the device.
* Customization:  You can reach out to different customer segments via different touchpoints. APIs enable you to offer a tailored customer experience for your audience, wherever it may be.
* Integrations: APIs are not only used to deliver custom experiences, but you can also leverage APIs to integrate to different platforms; from offering your products on Amazon to leveraging mapping services for customers to find your offline store.
* Testing ideas: APIs are the quickest way to test your ideas and get a head start before the competition does. Consider them as building blocks for your developers to assemble your new ideas. New applications only need to follow the API contracts, but even those can be extended for your purposes.

### Why did we introduce the Glue API?
The REST API represents a contract that developers can stick to when they are extending the Spryker Commerce OS with new touchpoints or integrations. The predefined APIs are not meant to be used in the same way. Furthermore, all REST API requests are handled according to the [JSON REST API specification](https://jsonapi.org/). These specifications define how clients should request data, fetch it, modify it, and how the server should respond to it. Hence, the expected behavior stays the same across all endpoints.
