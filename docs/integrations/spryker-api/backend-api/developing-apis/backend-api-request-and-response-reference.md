---
title: Backend API request and response reference
description: Reference for Backend API resource modules, request and response structures, HTTP status codes, and headers on the Glue infrastructure.
template: default
last_updated: Aug 7, 2026
---

{% info_block warningBox "Deprecation warning" %}

{% include integrations/backend-api-on-glue-status.md %}

{% endinfo_block %}

This document is a reference for the Glue implementation of the Backend API: resource module conventions, request and response structures, HTTP status codes, and request and response headers.

![Backend API](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-api/glue-backend-api.jpeg)

## Resource Modules

A `Resource` module implements a single resource or a set of resources. It is responsible for accepting requests in the form of `GlueRequestTransfer` and providing responses in the form of `GlueResponseTransfers`.

Backend API resources can use direct facade access through the dependency provider and access the database directly. `Resource` modules must implement all logic related to processing a request. It is not recommended to have any of the Business Logic, or a part of it, in the GlueApplication or specific application Module.

### Module Naming

Backend resources must use the `BackendApi` suffix and resource name in plural—for example, `ProductsBackendApi`.

### Module Structure

Recommended module structure:

| RESOURCESBACKENDAPI                                               | DESCRIPTION                                                                                          |
|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| `Glue/ResourcesBackendApi/Controller`                            | Folder for resource controllers. Controllers are used to handle API requests and responses.          |
| `Glue/ResourcesBackendApi/Dependency`                            | Bridges to clients/facades from other modules.                                                       |
| `Glue/ResourcesBackendApi/Plugin`                                | Resource plugins.                                                                                    |
| `Glue/ResourcesBackendApi/Processor`                             | Folder where all resource processing logic, data mapping code and calls to other clients are located. |
| `Glue/ResourcesBackendApi/ResourcesBackendApiConfig.php`         | Contains resource-related configuration.                                                             |
| `Glue/ResourcesBackendApi/ResourcesBackendApiDependencyProvider.php` | Provides external dependencies.                                                                      |
| `Glue/ResourcesBackendApi/ResourcesBackendApiFactory.php`        | Factory that creates instances.                                                                      |

Also, a module must contain the transfer definition in `src/Pyz/Shared/ResourcesBackendApi/Transfer`:

| RESOURCESBACKENDAPI                    | DESCRIPTION |
|----------------------------------------| --- |
| `resources_backend_api.transfer.xml`  | Contains API transfer definitions. |


The resulting folder structure on the example of the ServicePointsBackendApi Resource module looks as follows:

![Module structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-api/glue-api-module-structure.png)

## Glue request structure

| FIELD                | DESCRIPTION                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------|
| pagination           | `PaginationTransfer` object with request pagination data.                                        |
| sortings             | Collection of `SortTransfer` objects.                                                             |
| queryFields          | Assoc array of query parameters with values.                                                      |
| resource             | `GlueResourceTransfer` object with resource-related data.                                         |
| path                 | Returns the path being requested relative to the executed script.                                |
| content              | Request body content.                                                                            |
| filters              | Collection of `GlueFilterTransfer` objects.                                                       |
| attributes           | Array of attributes from the `Request` object.                                                    |
| meta                 | Array of metadata from the `Request` object.                                                     |
| locale               | Current locale.                                                                                   |
| host                 | Current host.                                                                                     |
| convention           | Selected convention that was selected in `ContentNegotiator`.                                     |
| application          | Selected application.                                                                             |
| method               | Request "intended" method.                                                                       |
| parametersString     | Normalized query string from the `Request` object.                                                |
| requestedFormat      | `content-type` header value.                                                                      |
| acceptedFormat       | `accept` header value that was processed in `ContentNegotiator`                                  |
| httpRequestAttributes | Request parameters from the `Request` object.                                                     |
| requestUser          | Backend user requesting the resource (valid only for Backend API).                               |
| requestCustomer      | Storefront customer requesting the resource (valid only for Glue Storefront API).                |

## Glue response structure

| FIELD               | DESCRIPTION                                                                                           |
|---------------------|-------------------------------------------------------------------------------------------------------|
| httpStatus          | Response status code.                                                                                  |
| meta                | Return headers.                                                                                        |
| content             | Response body. If the resource sets any data into it, the response body uses it instead of the `resources` field. |
| requestValidation   | `GlueRequestValidationTransfer` object.                                                                |
| errors              | Collection of `GlueErrorTransfer` objects.                                                             |
| filters             | Collection of `GlueFilterTransfer` objects.                                                            |
| sortings            | Collection of `SortTransfer` objects.                                                                  |
| pagination          | `PaginationTransfer` object.                                                                           |
| resources           | Collection of `GlueResourceTransfer` objects that are used to prepare the response body.               |
| format              | Response format—for example, `application/vnd.api+json` for JSON:API resources.                       |

## HTTP status codes

This section provides a list of common HTTP statuses returned by Glue endpoints.

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
| 404 | Resource not found |

### DELETE

| CODE | REASON |
| --- | --- |
| 204 | No content (deleted successfully) |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
| 404 | Resource not found |


## Dates

For date formatting, the [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) format is used. For requests, any time zone is accepted; however, dates are stored and returned in UTC.

Example:
- Request: `1985-07-01T01:22:11+02:00`
- In storage and responses: `1985-06-30T23:22:11+00:00`

## Request header

| HEADER | SAMPLE VALUE | USED FOR | WHEN NOT PRESENT |
| --- | --- | --- | --- |
| Accept | application/vnd.api+json |Indicates the data format of the expected API response.  | 406 Not acceptable |
| Content-Type | application/vnd.api+json; version=1.1 |  Indicates the request content-type and resource version. | 415 Unsupported |
| Accept-Language | de;, en;q=0.5 | Indicates the desired language in which the content should be returned. |  |

## Response header

| HEADER | SAMPLE VALUE | USED FOR |
| --- | --- | --- |
| Content-Type |application/vnd.api+json; version=1.1 |Response format and resource version.  |
|Content-Language|de_DE|Indicates the language in which the content is returned.|
