---
title: Using the Storefront API
description: Request and response reference for the Storefront API—endpoints, headers, request parameters, status codes, error codes, and data formats.
last_updated: Aug 7, 2026
template: default
---

Interacting with Storefront API as a client application involves understanding its specific structure for requests and responses. Here are the core pieces of information you need to get started.

## Endpoints and HTTP methods

API interactions happen by sending HTTP requests, such as GET, POST, PATCH, or DELETE, to specific URLs. In Spryker, resource types are often derived from the request URL–for example, `/carts` for cart resources or `/products/{sku}` for a specific product. The API documentation for each Spryker resource details the available endpoints and supported HTTP methods which you can find within the API reference section of our documentation.

## Headers

Key headers you'll commonly use with Storefront API include:
- **Authorization**: To provide an OAuth 2.0 Bearer token for accessing protected resources
- **Content-Type**: Often application/vnd.api+json when sending data, adhering to the JSON:API convention
- **Accept**: To specify the desired response format, also typically application/vnd.api+json
- **Versioning** (Glue infrastructure only): resources served by Glue can be versioned through the `version` parameter of the `Content-Type` header. If no version is specified, the newest version is returned; requesting a non-existent version results in a 404 error. Resources shipped by Spryker are unversioned. For details, see [Resource versioning](/docs/integrations/spryker-api/storefront-api/developing-apis/glue-infrastructure.html#resource-versioning).

## Request Parameters (especially with JSON:API)

Storefront API leverages standardized parameters for efficient data interaction:
- **Pagination**: Use `page[offset]` and `page[limit]` to retrieve data in manageable chunks–for example, `?page[offset]=0&page[limit]=10`).
- **Sorting**: Request data to be sorted using parameters like `?sort=attributeName` (ascending) or `?sort=-attributeName` (descending).
- **Filtering**: Narrow down results using filter parameters, often structured like `?filter[resourceName.fieldName]=value`.
- **Sparse Fields**: To receive only specific fields of a resource and reduce data transfer, use `?fields[resourceName]=attribute1,attribute2`.
- **Including Related Resources**: Fetch related data in a single request using the include parameter–for example, `?include=concrete-product-image-sets`). The behavior of this included section can be configured in Spryker.

## Storefront API Responses

- **Status Codes**: Standard HTTP status codes indicate the outcome, such as 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, or 404 Not Found.
- **Response Body**: The structure often follows the JSON:API convention.
  - The resources field typically contains an array of the primary data objects.
  - An included section may contain data for related resources if requested via the include parameter.
  - Responses often include pagination links, such as next, previous, last, first, automatically calculated when using JSON:API.

## Authentication with Spryker

Storefront API primarily uses OAuth 2.0 for securing endpoints.

Client applications send customer credentials (email and password) to an authentication endpoint (for example, `/access-tokens` for Storefront API or a separate `/token` for Backend API using Back Office credentials) to obtain an access token and a refresh token. This access token (Bearer token) must then be included in the Authorization header for subsequent requests to protected Spryker resources. If an invalid, expired, or no token is provided for a protected resource, the API will respond with a 401 Unauthorized status code.

## HTTP status codes

Below is a list of common HTTP statuses returned by Storefront API endpoints.

### GET

| CODE | REASON |
| --- | --- |
| 200 | An entity or entities corresponding to the requested resource is/are sent in the response |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

### POST

| CODE | REASON |
| --- | --- |
| 201 | Resource created successfully |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

### PATCH

| CODE | REASON |
| --- | --- |
| 200 | Resource updated successfully |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

### DELETE

| CODE | REASON |
| --- | --- |
| 204 | No content (deleted successfully) |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

## Error codes

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

## Data formatting

The current version uses JSON for responses. The request header from the client indicates the desired response format.

## Dates

For date formatting, [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date/time format is used. For requests, any time zone is accepted, however, dates are stored and returned in UTC.

Example:
- request: 1985-07-01T01:22:11+02:00
- in storage and responses: 1985-06-30T23:22:11+00:00

## Prices

Prices are always returned both in cents and as an integer.

## Request header

| HEADER | SAMPLE VALUE | USED FOR | WHEN NOT PRESENT |
| --- | --- | --- | --- |
| Accept | application/vnd.api+json |Indicates the data format of the expected API response.  | 406 Not acceptable |
| Content-Type | application/vnd.api+json; version=1.1 | 	Indicates the request content-type and resource version. | 415 Unsupported |
| Accept-Language | de;, en;q=0.5 | Indicates the desired language in which the content should be returned. |  |

## Response header

  | HEADER | SAMPLE VALUE | USED FOR |
| --- | --- | --- |
| Content-Type |application/vnd.api+json; version=1.1 |Response format and resource version.  |
|Content-Language|de_DE|Indicates the language in which the content is returned.|

## Response structure

The response structure follows the [JSON API](https://jsonapi.org/format/#document-structure) specification. For examples of responses of each endpoint provided by Spryker, see the API user guides for the respective APIs.

