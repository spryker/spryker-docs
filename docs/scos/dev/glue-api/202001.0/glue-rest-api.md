---
title: Glue REST API
originalLink: https://documentation.spryker.com/v4/docs/glue-rest-api
redirect_from:
  - /v4/docs/glue-rest-api
  - /v4/docs/en/glue-rest-api
---

## Overview
The Spryker Glue REST API is a fully functional JSON REST API that comes in the form of a new application available in the Spryker Commerce OS. It is build to be used as a contract between the Commerce OS Backend and any possible touchpoint or integration with a third party system. As an application, Glue knows how to read and interpret API resources as well as leverage feature modules that expose existing Spryker functionality.
![Glue REST API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+REST+API/glue-rest-api.jpg){height="" width=""}

## Glue
The Spryker API infrastructure, which is implemented as a separate layer of the Spryker Commerce OS, is called Glue. Glue is responsible for providing API endpoints, processing requests, as well as for communication with other layers of the OS in order to retrieve the necessary information. As a result, the Glue is responsible for communicating with any clients on the touchpoint side.

{% info_block infoBox %}
For more details, see [Glue Infrastructure](/docs/scos/dev/glue-api/202001.0/glue-api-developer-guides/glue-infrastruc
{% endinfo_block %}.)

## REST API
The Glue REST API comes with a set of predefined APIs, and the possibility for you to extend and add APIs in your project. There is no restriction when it comes to customization. The predefined APIs support Storefront functionality and may as well be used for integrations with 3rd party systems. Storefront functionality specifically enables you to build a custom experience for your customers in any touchpoint you want and thereby leveraging data and functionality at the core of your Commerce OS. For instance, it allows you to fetch product data to be displayed on a custom product detail page in your mobile app.

{% info_block infoBox %}
For more details, see [REST API Reference](/docs/scos/dev/glue-api/202001.0/rest-api-refere
{% endinfo_block %}.)

## B2C API React example
In order to help you understand possible use cases, we offer you a sample app available as an example implementation (which is not a starting point for customer projects, though). It can coexist with an existing demo shop as a second touchpoint in the project. From a technology perspective, it is based on our customers' interests. The example app is implemented in the form of a single-page application based on a React JS library.

What is more, it delivers a full customer experience from browsing the catalog to placing an order. The application allows you to understand, how the existing APIs can be leveraged to create a B2C user experience. As an example, the full power of Elasticsearch, which is already present in our other demo shops (B2C and B2B), is leveraged via dedicated endpoints to deliver catalog search functionality with auto-completion, auto-suggestion, facets, sorting, and pagination.

{% info_block infoBox %}
[Install and run!](/docs/scos/dev/glue-api/202001.0/b2c-api-react-example/b2c-api-react-e
{% endinfo_block %})

### What can I use the REST API for?
The Glue functionality serves as a starting point to connect your Commerce OS with new or existing touch points. These touchpoints can be headless like voice commerce devices and chat bots, or they may come with a user interface like a mobile app. Alternative front-ends also benefit from the APIs. Here are some examples:

* **New front-end**: Build a new front-end or use front-end frameworks such as Progressive Web Apps and power them by the REST APIs.
* **Mobile App**: Your new mobile app, no matter if it is native, hybrid or just a web-view, can support the same functionality as the existing demo shops do.
* **Voice Commerce**: Leverage the APIs for order history to inform your customers about the status of their delivery.
* **Chatbot**: Use chatbots to identify the customer that is trying to reach out to you and help him answer basic questions about your products.

## What are the business advantages of using the API?
You can benefit from the APIs in these aspects:

* **Reach more customers**: APIs empower you to create any number of touchpoints to get in contact with your customers, whichever the device.
* **Customization**:  You may reach out to different customer segments on different touchpoints. APIs enable you to offer a tailored customer experience for your audience, wherever it may be.
* **Integrations**: APIs are not only used to deliver custom experiences, but you can also leverage APIs to integrate to different platforms; from offering your products on Amazon to leveraging mapping services for customers to find your offline store.
* **Testing ideas**: APIs are the quickest way to test your ideas and get a head start before the competition does. Consider them as building blocks for your developers to assemble your new ideas. New applications only need to follow the API contracts set, but even those can be extended for your purposes.

### Why did we introduce it?
The REST API represents a contract that developers can stick to when they are extending the Commerce OS with new touchpoints or build integrations. The already existing APIs inside the Commerce OS are not meant to be used in the same way. Furthermore, all REST API requests are handled according to the [JSON REST API specification](https://jsonapi.org/). These specifications define how clients should request data, fetch it, modify it, and how the server should respond to it. Hence, the expected behavior stays the same across all endpoints.

Check our introductory video on Glue API:
<iframe src="https://spryker.wistia.com/medias/adls2vfqjm" title="Glue API Intro" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>

