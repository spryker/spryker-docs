---
title: Storefront API
description: Storefront API is designed for customer-facing applications and buyer journey touchpoints with REST API and JSON:API conventions.
last_updated: July 9, 2025
template: default
layout: custom_new
redirect_from:
  - /docs/scoc/dev/glue-api-guides/202404.0/index.html
  - /docs/scos/dev/glue-api-guides/202404.0/glue-rest-api.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/glue-api-howtos/glue-api-howtos.html
  - /docs/scos/dev/glue-api-guides/202204.0/index.html
  - /docs/scos/dev/glue-api-guides/202404.0/glue-api-guides.html
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/glue-rest-api.html
  - /docs/scos/dev/glue-api-guides/202200.0/glue-rest-api.html
  - /api/definition-api.htm
  - /docs/scos/dev/glue-api-guides/202204.0/glue-rest-api.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/glue-rest-api
  - /docs/dg/dev/glue-api/latest/glue-api.html
  - /docs/dg/dev/glue-api/latest/rest-api/glue-rest-api.html
---

The *Spryker Storefront API* is a JSON REST API that is designed for customer-facing applications and buyer journey touchpoints. It is built to be used as a contract between the Spryker Commerce OS backend and any possible customer touchpoint or integration with third-party systems. As an application, Storefront API knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality for customer experiences.

The Storefront API represents a contract that developers can stick to when they are extending the Spryker Commerce OS with new customer touchpoints or integrations. All REST API requests are handled according to the [JSON REST API specification](https://jsonapi.org/). These specifications define how clients should request data, fetch it, modify it, and how the server should respond to it. Hence, the expected behavior stays the same across all endpoints.

![Storefront API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+REST+API/glue-rest-api.jpg)

## Storefront API Infrastructure

The Spryker API infrastructure, which is implemented as a separate layer of the SCCOS, provides API endpoints, processes requests, and communicates with other layers of the OS for customer-facing functionality.

For more details, see [Storefront Infrastructure](/docs/integrations/spryker-glue-api/getting-started-with-apis/storefront-infrastructure.html).

## Key Features

- **Customer-focused**: Designed for buyer journey and customer-facing applications
- **REST API based**: Built on REST API principles with JSON:API conventions
- **Storage/Search Integration**: Connects to Storage and Search for optimized customer experience
- **Extensible**: Comes with predefined APIs that can be extended or customized
- **Multi-touchpoint**: Enables building custom experiences across different touchpoints

## Storefront API Capabilities

Storefront API empowers developers with a rich set of features:

- **Custom API Application Creation**: Build distinct API applications tailored to specific domains or integration needs
- **Resource Definition**: Define resources, such as products, orders, carts, that your API will expose
- **Relationship Management**: Establish relationships between resources to provide comprehensive data efficiently–for example parent-child or linked resources
- **Efficient Data Handling**: Utilize built-in support for pagination, sorting, filtering, sparse fields (requesting only specific data fields), and configurable inclusion of related data to optimize API calls
- **Robust Security**: Secure your API endpoints using OAuth 2.0 and define granular access controls

## Using Storefront API

Interacting with Storefront API as a client application involves understanding its specific structure for requests and responses. Here's are some core pieces of information that you need to know to help you to get started.

### Endpoints and HTTPS Methods

API interactions happen by sending HTTPS requests, such as GET, POST, PATCH, or DELETE, to specific URLs. In Spryker, resource types are often derived from the request URL–for example, `/carts` for cart resources or `/products/{sku}` for a specific product. The API documentation for each Spryker resource details the available endpoints and supported HTTPS methods which you can find within the API reference section of our documentation.

### Headers

Key headers you'll commonly use with Storefront API include:
- **Authorization**: To provide an OAuth 2.0 Bearer token for accessing protected resources
- **Content-Type**: Often application/vnd.api+json when sending data, adhering to the JSON:API convention
- **Accept**: To specify the desired response format, also typically application/vnd.api+json
- **Versioning**: Spryker's Storefront API can handle versioning through request headers. If no version is specified, the newest version of the resource is usually returned. If a specific version is requested and exists, that version is returned; otherwise, a 404 error may occur.

### Request Parameters (especially with JSON:API)

Storefront API leverages standardized parameters for efficient data interaction:
- **Pagination**: Use `page[offset]` and `page[limit]` to retrieve data in manageable chunks–for example, `?page[offset]=0&page[limit]=10`).
- **Sorting**: Request data to be sorted using parameters like `?sort=attributeName` (ascending) or `?sort=-attributeName` (descending).
- **Filtering**: Narrow down results using filter parameters, often structured like `?filter[resourceName.fieldName]=value`.
- **Sparse Fields**: To receive only specific fields of a resource and reduce data transfer, use `?fields[resourceName]=attribute1,attribute2`.
- **Including Related Resources**: Fetch related data in a single request using the include parameter–for example, `?include=concrete-product-image-sets`). The behavior of this included section can be configured in Spryker.

### Storefront API Responses

- **Status Codes**: Standard HTTP status codes indicate the outcome, such as 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, or 404 Not Found.
- **Response Body**: The structure often follows the JSON:API convention.
  - The resources field typically contains an array of the primary data objects.
  - An included section may contain data for related resources if requested via the include parameter.
  - Responses often include pagination links, such as next, previous, last, first, automatically calculated when using JSON:API.

### Authentication with Spryker

Storefront API primarily uses OAuth 2.0 for securing endpoints.

Client applications send customer credentials (email and password) to an authentication endpoint (for example, `/access-tokens` for Storefront API or a separate `/token` for Backend API using Back Office credentials) to obtain an access token and a refresh token. This access token (Bearer token) must then be included in the Authorization header for subsequent requests to protected Spryker resources. If an invalid, expired, or no token is provided for a protected resource, the API will respond with a 401 Unauthorized status code.

## B2C API React Example

To help you understand possible use cases, we provide a sample app as an exemplary implementation (which is not a starting point for development). It can coexist with a shop as a second touchpoint in the project. From a technological perspective, it's based on our customers' interests. The app is single-page application based on a React JS library.

It delivers a full customer experience from browsing the catalog to placing an order. The application helps you understand how you can use the predefined APIs to create a B2C user experience. As an example, the full power of Elasticsearch, which is already present in our [B2B](/docs/about/all/b2b-suite.html) and [B2C Demo Shops](/docs/about/all/b2c-suite.html), is leveraged through dedicated endpoints to deliver catalog search functionality with autocompletion, autosuggestion, facets, sorting, and pagination.

{% info_block infoBox %}

For more details about installing and running, see [B2C API React example](/docs/integrations/spryker-glue-api/storefront-api/developing-apis/b2c-api-react-example/b2c-api-react-example.html).

{% endinfo_block %}

## Use Cases

Storefront API is ideal for:
- Web shops and e-commerce storefronts
- Mobile applications (native, hybrid, or web-view)
- Progressive Web Apps (PWAs)
- Headless commerce implementations
- Custom customer touchpoints
- Third-party integrations for customer data

## Getting Started

To start working with Storefront API:

1. **Authentication**: Obtain customer authentication tokens
2. **Explore endpoints**: Review available customer-facing API resources
3. **Implement requests**: Use REST API with JSON:API conventions
4. **Handle responses**: Process API responses according to JSON:API format

## Further Reading

- [Storefront API B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-b2b-demo-shop-reference.html)
- [Storefront API B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-b2c-demo-shop-reference.html)
- [Storefront API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-marketplace-b2b-demo-shop-reference.html)
- [Storefront API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-marketplace-b2c-demo-shop-reference.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html)
