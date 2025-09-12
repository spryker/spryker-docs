---
title: Storefront API
description: Storefront API is designed for customer-facing applications and buyer journey touchpoints with REST API and JSON:API conventions.
last_updated: July 9, 2025
template: default
layout: custom_new
---

Storefront API is designed for consumers and customer-facing integrations. It's the API layer that powers web shops, mobile apps, marketplaces, and other client-facing systems. It is based on REST API and follows JSON:API conventions.

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
- **Pagination**: Use `page[offset]` and `page[limit]` to retrieve data in manageable chunks–for example, `?page[offset]=0&page[limit]=10`). These values are accessible within Spryker via `GlueRequestTransfer->getPagination()`.
- **Sorting**: Request data to be sorted using parameters like `?sort=attributeName` (ascending) or `?sort=-attributeName` (descending). Sorting parameters can be retrieved using `$glueRequestTransfer->getSortings()`.
- **Filtering**: Narrow down results using filter parameters, often structured like `?filter[resourceName.fieldName]=value`. These are accessible via `$glueRequestTransfer->getFilters()`.
- **Sparse Fields**: To receive only specific fields of a resource and reduce data transfer, use `?fields[resourceName]=attribute1,attribute2`. This is retrieved using `$glueRequestTransfer->getQueryFields()`.
- **Including Related Resources**: Fetch related data in a single request using the include parameter–for example, `?include=concrete-product-image-sets`). The behavior of this included section can be configured in Spryker.

### Storefront API Responses

- **Status Codes**: Standard HTTP status codes indicate the outcome, such as 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, or 404 Not Found.
- **Response Body**: The structure often follows the JSON:API convention.
  - The resources field in `GlueResponseTransfer` typically contains an array of the primary data objects.
  - An included section may contain data for related resources if requested via the include parameter.
  - Responses often include pagination links, such as next, previous, last, first, automatically calculated when using JSON:API.
  - The overall response structure is defined by GlueResponseTransfer, which includes fields for HTTP status, metadata, content/resources, errors, filters, sortings, and pagination details.

### Authentication with Spryker

Storefront API primarily uses OAuth 2.0 for securing endpoints.

Client applications send user credentials (username and password) to an authentication endpoint (for example, `/token` for Storefront API or a separate `/token` for Backend API using Back Office credentials) to obtain an access token and a refresh token. This access token (Bearer token) must then be included in the Authorization header for subsequent requests to protected Spryker resources. If an invalid, expired, or no token is provided for a protected resource, the API will respond with a 401 Unauthorized status code.

## Querying Storefront API Data

The Storefront API supports standardized ways to query and manipulate data, especially when using conventions like JSON:API. This makes client interactions predictable and efficient. Key mechanisms are as follows:

- **Pagination**: Handle large datasets effectively by requesting data in manageable chunks (pages).
- **Sorting**: Allow clients to specify the order in which results should be returned.
- **Filters**: Enable clients to retrieve subsets of resources based on specific criteria.
- **Sparse Fields**: Optimize response payloads by allowing clients to request only the specific data fields they need.

For more information, see [Querying data with Storefront API parameters](/docs/dg/dev/glue-api/latest/use-default-glue-parameters).

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

- [Storefront API References](/docs/integrations/spryker-glue-api/api-references/storefront-api/storefront-api-b2b-demo-shop-reference.html)
- [Create Storefront Resources](/docs/integrations/spryker-glue-api/create-glue-api-applications/create-storefront-resources.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/glue-api-authenticating-and-authorization.html)
