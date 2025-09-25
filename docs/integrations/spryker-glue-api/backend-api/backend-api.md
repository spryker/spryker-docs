---
title: Backend API
description: Backend API is designed for administrative operations and system-to-system communication with direct access to Zed Facades.
last_updated: July 9, 2025
template: default
layout: custom_new
---

## Existing API Applications

Out of the box, Spryker Commerce OS provides API applications:
- Storefront API that can be used for customer-facing integrations and headless commerce
- Backend API that can be used to provide API access for the Backoffice functionality directly without any additional RPC calls

## Backend API Application

With the current setup out of the box, we have a Backend API application that is meant to be an API application for our Back Office. This means that with this new application, infrastructure has direct access to Zed facades from Backend API resources. Also, out of the box, we have a separate `/token` resource specifically for Backend API that uses Back Office users' credentials to issue a token for a Backend API resource.

For more details about the difference between SAPI and BAPI, refer to [Backend and storefront API module differences](/docs/integrations/spryker-glue-api/getting-started-with-apis/backend-and-storefront-api-differences.html).

![Backend API](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-api/glue-backend-api.jpeg)

## Key Features

- **Admin-focused**: Designed for administrative operations and back-office tasks
- **Multi-format Support**: Technically supports multiple conventions, with JSON:API shipped out-of-the-box
- **Direct Facade Access**: Backend API resources can use direct facade access through the dependency provider and access the database directly
- **Enterprise Integration**: Built for ERP, CRM, and other enterprise system integrations
- **Multi-format Support**: Technically supports multiple conventions, with JSON:API shipped out-of-the-box

### Possibility to create new API applications

With the current infrastructure, projects can easily [create](/docs/integrations/spryker-glue-api/backend-api/developing-apis/create-api-applications.html) their own API applications that would be completely separated from others. This means that resources can be added only to the new application, and users can't access them with existing ones.

### Decoupling from conventions

StorefrontAPI is tightly coupled with a JSON:API convention, and all resources have to follow it. For Backend API resources can use any implemented conventions, create new ones, or even not use any. In this case, the "no convention" approach is used, and a request and response are formatted as a plain JSON. For more details, see [Create and change Backend API conventions](/docs/integrations/spryker-glue-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html).

### Authentication

Backend API uses Back Office credentials for authentication. System administrators and enterprise integrations authenticate using administrative credentials to access backend resources.

For API key-based authentication, see [Use API Key Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/backend-api/use-api-key-authorization.html).

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

| FIELD                | DESCRIPTION                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------|
| pagination           | `PaginationTransfer` object with request pagination data.                                             |
| sortings             | Collection of `SortTransfer` objects.                                                                  |
| queryFields          | Assoc array of query parameters with values.                                                           |
| resource             | `GlueResourceTransfer` object with resource-related data.                                              |
| path                 | Returns the path being requested relative to the executed script.                                     |
| content              | Request body content.                                                                                 |
| filters              | Collection of `GlueFilterTransfer` objects.                                                            |
| attributes           | Array of attributes from the `Request` object.                                                         |
| meta                 | Array of metadata from the `Request` object.                                                          |
| locale               | Current locale.                                                                                        |
| host                 | Current host.                                                                                          |
| convention           | Selected convention that was selected in `ContentNegotiator`.                                          |
| application          | Selected application.                                                                                  |
| method               | Request "intended" method.                                                                            |
| parametersString     | Normalized query string from the `Request` object.                                                     |
| requestedFormat      | `content-type` header value.                                                                           |
| acceptedFormat       | `accept` header value that was processed in `ContentNegotiator`                                       |
| httpRequestAttributes | Request parameters from the `Request` object.                                                          |
| requestUser          | Backend user requesting the resource (valid only for Glue Backend API).                               |
| requestCustomer      | Storefront customer requesting the resource (valid only for Glue Storefront API).                     |

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

For date formatting, [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date/time format is used. For requests, any time zone is accepted; however, dates are stored and returned in UTC.

Example:
- request: `1985-07-01T01:22:11+02:00`
- in storage and responses: `1985-06-30T23:22:11+00:00`

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


## Data Exchange API

Backend API includes the Data Exchange API, a dynamic database API that facilitates data transfer in real-time. It enables you to build, customize, and manage database APIs tailored to your specific business requirements through a user interface.

Key benefits:
- No coding and deploying  required: API endpoints are created from the user interface
- Rapid API generation: APIs are generated within minutes
- Flexibility and customization: Tailor APIs to your specific needs
- Real-time updates: Dynamic changes and on-the-fly modifications
- Security and Access Control: Strong security measures and access controls

[Learn more about Data Exchange API](/docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html)

## Further Reading

- [Backend API B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-b2b-demo-shop-reference.html)
- [Backend API B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-b2c-demo-shop-reference.html)
- [Backend API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2b-demo-shop-reference.html)
- [Backend API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2c-demo-shop-reference.html)
- [Create Backend Resources](/docs/integrations/spryker-glue-api/backend-api/developing-apis/create-backend-resources.html)
- [Data Exchange API](/docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html)
