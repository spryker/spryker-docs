---
title: Storefront API
description: Storefront API is designed for customer-facing applications and buyer journey touchpoints with REST API and JSON:API conventions.
last_updated: Jul 31, 2026
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
  - /docs/dg/dev/glue-api/latest/old-glue-infrastructure/glue-rest-api
  - /docs/dg/dev/glue-api/latest/glue-api.html
  - /docs/dg/dev/glue-api/latest/rest-api/glue-rest-api.html
  - /docs/integrations/spryker-glue-api/storefront-api/storefront-api.html
  - /docs/integrations/spryker-glue-api/storefront-api/developing-apis/storefront-api.html
  - /docs/integrations/spryker-api/storefront-api/developing-apis/storefront-api.html
---

The *Spryker Storefront API* is a JSON REST API that is designed for customer-facing applications and buyer journey touchpoints. It is built to be used as a contract between the Spryker Commerce OS backend and any possible customer touchpoint or integration with third-party systems. As an application, Storefront API knows how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality for customer experiences.

The Storefront API represents a contract that developers can stick to when they are extending the Spryker Commerce OS with new customer touchpoints or integrations. All REST API requests are handled according to the [JSON REST API specification](https://jsonapi.org/). These specifications define how clients should request data, fetch it, modify it, and how the server should respond to it. Hence, the expected behavior stays the same across all endpoints.

![Storefront API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/General/storefront-api.png)

## Two implementations

Storefront API endpoints are served by two interchangeable infrastructures:

- [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html): the recommended infrastructure for developing new Storefront API endpoints.
- Glue: the legacy infrastructure. For details, see [Glue infrastructure](/docs/integrations/spryker-api/storefront-api/developing-apis/glue-infrastructure.html) and the guides in the Develop with Glue section, starting with [Implement a REST API resource](/docs/integrations/spryker-api/storefront-api/developing-apis/implement-a-rest-api-resource.html).

The external JSON:API contract is identical for both infrastructures, so client applications interact with Storefront API endpoints the same way regardless of which infrastructure serves them.

## Key features

- **Customer-focused**: Designed for buyer journey and customer-facing applications
- **REST API based**: Built on REST API principles with JSON:API conventions
- **Storage/Search Integration**: Connects to Storage and Search for optimized customer experience
- **Extensible**: Comes with predefined APIs that can be extended or customized
- **Multi-touchpoint**: Enables building custom experiences across different touchpoints

## Storefront API capabilities

Storefront API empowers developers with a rich set of features:

- **Custom API Application Creation**: Build distinct API applications tailored to specific domains or integration needs
- **Resource Definition**: Define resources, such as products, orders, carts, that your API will expose
- **Relationship Management**: Establish relationships between resources to provide comprehensive data efficiently–for example parent-child or linked resources
- **Efficient Data Handling**: Utilize built-in support for pagination, sorting, filtering, sparse fields (requesting only specific data fields), and configurable inclusion of related data to optimize API calls
- **Robust Security**: Secure your API endpoints using OAuth 2.0 and define granular access controls

## Using Storefront API

Interacting with Storefront API as a client application involves understanding its specific structure for requests and responses. Here are the core pieces of information you need to get started.

### Endpoints and HTTP methods

API interactions happen by sending HTTP requests, such as GET, POST, PATCH, or DELETE, to specific URLs. In Spryker, resource types are often derived from the request URL–for example, `/carts` for cart resources or `/products/{sku}` for a specific product. The API documentation for each Spryker resource details the available endpoints and supported HTTP methods which you can find within the API reference section of our documentation.

### Headers

Key headers you'll commonly use with Storefront API include:
- **Authorization**: To provide an OAuth 2.0 Bearer token for accessing protected resources
- **Content-Type**: Often application/vnd.api+json when sending data, adhering to the JSON:API convention
- **Accept**: To specify the desired response format, also typically application/vnd.api+json
- **Versioning** (Glue infrastructure only): resources served by Glue can be versioned through the `version` parameter of the `Content-Type` header. If no version is specified, the newest version is returned; requesting a non-existent version results in a 404 error. Resources shipped by Spryker are unversioned. For details, see [Resource versioning](/docs/integrations/spryker-api/storefront-api/developing-apis/glue-infrastructure.html#resource-versioning).

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

### HTTP status codes

Below is a list of common HTTP statuses returned by Storefront API endpoints.

#### GET

| CODE | REASON |
| --- | --- |
| 200 | An entity or entities corresponding to the requested resource is/are sent in the response |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### POST

| CODE | REASON |
| --- | --- |
| 201 | Resource created successfully |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### PATCH

| CODE | REASON |
| --- | --- |
| 200 | Resource updated successfully |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### DELETE

| CODE | REASON |
| --- | --- |
| 204 | No content (deleted successfully) |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

### Error codes

In addition to HTTP Status codes, Storefront API can return additional error codes to distinguish business constraint violations. Each API is assigned a specific error code range. Listed below are code ranges for APIs shipped by Spryker. For specific error codes, see API user documentation for the specific APIs.

| RANGE | API |
| --- | --- |
| 001-099 | General error codes |
| 101-199 |Carts API  |
| 201-299 | Wishlists API |
| 301-399 | Products API |
| 401-499 | Customers API |
| 501-599 | Catalog Search API |
| 601-699 | Stores API |
| 701-799 |Categories API  |
|  1001-1099    | Guest Cart API |
| 1101-1199 |  Checkout API|
|  1201-1299| Product Labels API     |
|  1301-1399| Data Exchange API     |

### Data formatting

The current version uses JSON for responses. The request header from the client indicates the desired response format.

### Dates

For date formatting, [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date/time format is used. For requests, any time zone is accepted, however, dates are stored and returned in UTC.

Example:
- request: 1985-07-01T01:22:11+02:00
- in storage and responses: 1985-06-30T23:22:11+00:00

### Prices

Prices are always returned both in cents and as an integer.

### Request header

| HEADER | SAMPLE VALUE | USED FOR | WHEN NOT PRESENT |
| --- | --- | --- | --- |
| Accept | application/vnd.api+json |Indicates the data format of the expected API response.  | 406 Not acceptable |
| Content-Type | application/vnd.api+json; version=1.1 | 	Indicates the request content-type and resource version. | 415 Unsupported |
| Accept-Language | de;, en;q=0.5 | Indicates the desired language in which the content should be returned. |  |

### Response header

  | HEADER | SAMPLE VALUE | USED FOR |
| --- | --- | --- |
| Content-Type |application/vnd.api+json; version=1.1 |Response format and resource version.  |
|Content-Language|de_DE|Indicates the language in which the content is returned.|

### Response structure

The response structure follows the [JSON API](https://jsonapi.org/format/#document-structure) specification. For examples of responses of each endpoint provided by Spryker, see the API user guides for the respective APIs.

## B2C API React example

To help you understand possible use cases, we provide a sample app as an exemplary implementation (which is not a starting point for development). It can coexist with a shop as a second touchpoint in the project. From a technological perspective, it's based on our customers' interests. The app is a single-page application based on the React JS library.

It delivers a full customer experience from browsing the catalog to placing an order. The application helps you understand how you can use the predefined APIs to create a B2C user experience. As an example, the full power of Elasticsearch, which is already present in our [B2B](/docs/about/all/b2b-suite.html) and [B2C Demo Shops](/docs/about/all/b2c-suite.html), is leveraged through dedicated endpoints to deliver catalog search functionality with autocompletion, autosuggestion, facets, sorting, and pagination.

{% info_block infoBox %}

For more details about installing and running, see [B2C API React example](/docs/integrations/spryker-api/storefront-api/developing-apis/b2c-api-react-example/b2c-api-react-example.html).

{% endinfo_block %}

## Use cases

Storefront API is ideal for:
- Web shops and e-commerce storefronts
- Mobile applications (native, hybrid, or web-view)
- Progressive Web Apps (PWAs)
- Headless commerce implementations, such as voice commerce devices and chatbots–for example, leverage the order history APIs to inform customers about the status of their delivery
- Custom customer touchpoints
- Third-party integrations for customer data

## Business advantages of using the Storefront API

You can benefit from the APIs in these aspects:
- Reach more customers: APIs empower you to create any number of touchpoints to connect with your customers, regardless of the device.
- Customization: You can reach out to different customer segments via different touchpoints. APIs enable you to offer a tailored customer experience for your audience, wherever it may be.
- Integrations: APIs are not only used to deliver custom experiences, but you can also leverage APIs to integrate to different platforms; from offering your products on Amazon to leveraging mapping services for customers to find your offline store.
- Testing ideas: APIs are the quickest way to test your ideas and get a head start before the competition does. Consider them as building blocks for your developers to assemble your new ideas. New applications only need to follow the API contracts, but even those can be extended for your purposes.

## Getting started

To start working with Storefront API:

1. **Authentication**: Obtain customer authentication tokens. For details, see [Authenticating and authorization](/docs/integrations/spryker-api/authenticating-and-authorization/authenticating-and-authorization.html).
2. **Explore endpoints**: Review available customer-facing API resources—for example, in the [Storefront API B2C Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-b2c-demo-shop-reference.html).
3. **Implement requests**: Use REST API with [JSON:API](https://jsonapi.org/) conventions.
4. **Handle responses**: Process API responses according to the JSON:API format. For details, see [Response structure](#response-structure).

## Further reading

- [Storefront API B2B Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-b2b-demo-shop-reference.html)
- [Storefront API B2C Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-b2c-demo-shop-reference.html)
- [Storefront API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-marketplace-b2b-demo-shop-reference.html)
- [Storefront API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-marketplace-b2c-demo-shop-reference.html)
- [Authentication and Authorization](/docs/integrations/spryker-api/authenticating-and-authorization/authenticating-and-authorization.html)
- [Glue infrastructure](/docs/integrations/spryker-api/storefront-api/developing-apis/glue-infrastructure.html)
