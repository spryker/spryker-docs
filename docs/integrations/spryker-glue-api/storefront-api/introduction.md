---
title: Storefront API Introduction
last_updated: Jul 13, 2023
template: glue-api-storefront-guide-template
---

The *Spryker Storefront API* is a JSON REST API that is designed for customer-facing applications and buyer journey touchpoints. It is built to be used as a contract between the Spryker Commerce OS backend and any possible customer touchpoint or integration with third-party systems. As an application, Storefront API knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality for customer experiences.

The Storefront API represents a contract that developers can stick to when they are extending the Spryker Commerce OS with new customer touchpoints or integrations. All REST API requests are handled according to the [JSON REST API specification](https://jsonapi.org/). These specifications define how clients should request data, fetch it, modify it, and how the server should respond to it. Hence, the expected behavior stays the same across all endpoints.

![Storefront API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+REST+API/glue-rest-api.jpg)

## Storefront API Infrastructure

The Spryker API infrastructure, which is implemented as a separate layer of the SCCOS, provides API endpoints, processes requests, and communicates with other layers of the OS for customer-facing functionality.

For more details, see [Storefront Infrastructure](/docs/dg/dev/glue-api/latest/rest-api/glue-infrastructure.html).

## Storefront API Features

The Storefront API comes with a set of predefined APIs, which you can extend or add your own APIs. The predefined APIs support Storefront functionality and can be used for integrations with third-party systems. The Storefront functionality enables you to build a custom experience for your customers in any touchpoint leveraging data and functionality at the core of your Commerce OS. For example, it lets you fetch product data to be displayed on a custom product details page in your mobile app.

For more details, see Storefront API reference:

- [Storefront API B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/api-references/storefront-api/storefront-api-b2b-demo-shop-reference.html)
- [Storefront API B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/api-references/storefront-api/storefront-api-b2c-demo-shop-reference.html)
- [Storefront API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/api-references/storefront-api/storefront-api-marketplace-b2b-demo-shop-reference.html)
- [Storefront API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/api-references/storefront-api/storefront-api-marketplace-b2c-demo-shop-reference.html)

## B2C API React Example

To help you understand possible use cases, we provide a sample app as an exemplary implementation (which is not a starting point for development). It can coexist with a shop as a second touchpoint in the project. From a technological perspective, it's based on our customers' interests. The app is single-page application based on a React JS library.

It delivers a full customer experience from browsing the catalog to placing an order. The application helps you understand how you can use the predefined APIs to create a B2C user experience. As an example, the full power of Elasticsearch, which is already present in our [B2B](/docs/about/all/b2b-suite.html) and [B2C Demo Shops](/docs/about/all/b2c-suite.html), is leveraged through dedicated endpoints to deliver catalog search functionality with autocompletion, autosuggestion, facets, sorting, and pagination.

{% info_block infoBox %}

For more details about installing and running, see [B2C API React example](/docs/dg/dev/glue-api/latest/glue-api-tutorials/b2c-api-react-example/b2c-api-react-example.html).

{% endinfo_block %}

## Use Cases for Storefront API

Storefront API helps you to connect your Spryker Commerce OS with new or existing customer touchpoints. These touchpoints can be headless like voice commerce devices and chat bots, or they may come with a user interface like a mobile app. Alternative front ends also benefit from the APIs. Here are some examples:

- **New frontend**: Build a new frontend or use a frontend framework like Progressive Web Apps and power it by the Storefront API.
- **Mobile app**: A mobile app, no matter if it's native, hybrid or just a web-view, can support the same functionality as the existing demo shops do.
- **Voice commerce**: Leverage the APIs for order history to inform your customers about the status of their delivery.
- **Chatbot**: Use chatbots to identify the customer that are trying to reach out to you and help them answer basic questions about your products.

## Business Advantages

You can benefit from the Storefront API in these aspects:

- **Reach more customers**: APIs empower you to create any number of touchpoints to connect with your customers, regardless of the device.
- **Customization**: You can reach out to different customer segments via different touchpoints. APIs enable you to offer a tailored customer experience for your audience, wherever it may be.
- **Integrations**: APIs are not only used to deliver custom experiences, but you can also leverage APIs to integrate to different platforms; from offering your products on Amazon to leveraging mapping services for customers to find your offline store.
- **Testing ideas**: APIs are the quickest way to test your ideas and get a head start before the competition does. Consider them as building blocks for your developers to assemble your new ideas. New applications only need to follow the API contracts, but even those can be extended for your purposes.

## Further Reading

- [Storefront API](/docs/integrations/spryker-glue-api/storefront-api/storefront-api.html)
- [Glue Infrastructure](/docs/dg/dev/glue-api/latest/rest-api/glue-infrastructure.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/glue-api-authenticating-and-authorization.html)
