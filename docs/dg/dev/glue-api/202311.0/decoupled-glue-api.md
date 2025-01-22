---
title: Decoupled Glue API
description: Learn about the process of handling API requests through GlueStorefront and GlueBackoffice layers.
last_updated: Jul 11, 2023
template: glue-api-storefront-guide-template
redirect_from:
- /docs/scos/dev/glue-api-guides/202311.0/decoupled-glue-api.html

---

The Spryker Decoupled Glue API is a set of a few API applications like *Glue Storefront API (SAPI)* and *Glue Backend API (BAPI)* of the Spryker Commerce OS. Those applications are built to be used as a contract for accessing Storefront or Backoffice functionality through API. Those applications know how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality.

## Existing Glue Applications

Out of the box, Spryker Commerce OS provides three API applications:
* Old Glue API application that can be used as a fallback.
* New Glue Storefront API (SAPI) that is a replacement for the old Glue and can be used for the same purpose.
* Glue Backend API (BAPI) that can be used to provide API access for the Backoffice functionality directly without any additional RPC calls.

## Difference between Decoupled Glue Api and the old Glue API

There are a few differences between the current Glue infrastructure (Decoupled Glue API) and the old [Glue API](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-rest-api.html).

### Possibility to create new API applications

With the current infrastructure, projects can easily [create](/docs/dg/dev/glue-api/{{page.version}}/create-glue-api-applications.html) their own API applications that would be completely separated from others. This means that resources can be added only to the new application, and users can't access them with existing ones.

### Decoupling from conventions

Old Glue API was tightly coupled with a JSON:API convention, and all resources have to follow it. With the current infrastructure, resources can use any implemented conventions, create new ones, or even not use any. In this case, the "no convention" approach is used, and a request and response are formatted as a plain JSON. For more details, see [Create and change Glue API conventions](/docs/dg/dev/glue-api/{{page.version}}/create-and-change-glue-api-conventions.html).

### New type of application: Glue Backend API application

With the current setup out of the box, we have an additional Glue Backend API (BAPI) application that is meant to be an API application for our Back Office. This means that with this new application, infrastructure has direct access to Zed facades from BAPI resources. Also, out of the box, we have a separate `/token` resource specifically for BAPI that uses Back Office users' credentials to issue a token for a BAPI resource.

For more details about the difference between SAPI and BAPI, refer to [Backend and storefront API module differences](/docs/dg/dev/glue-api/{{page.version}}/backend-and-storefront-api-module-differences.html).

### Authentication servers
Current infrastructure lets you switch between different authentication servers. For example, this can be useful if you want to use Auth0 or any other server in addition to implemented servers.

For more details and examples, see [Use authentication servers with Glue API](/docs/dg/dev/glue-api/{{page.version}}/use-authentication-servers-with-glue-api.html).


## Glue Storefront API

![Glue Storefront API](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-api/glue-storefront-api.jpeg)

## Glue Backend API

![Glue Backend API](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-api/glue-backend-api.jpeg)

## Infrastructure

Decoupled Glue API infrastructure is implemented in the same layer of Spryker Commerce OS and called Glue, as the old one. It is responsible for providing API endpoints, processing requests, and communicating with other layers of the OS to retrieve the necessary information. Separate applications are implemented as separate modules—for example, `GlueStorefrontApiApplication`, and `GlueBackendApiApplication`. Each application has its own bootstrapping and a separate virtual host on the Spryker web server (Nginx by default).

Logically, the Glue layer can be divided into separate parts:

* **`GlueApplication` module**: The `GlueApplication` module provides a framework for constructing API resources and selecting a proper application. It intercepts all HTTP requests at resource URLs (for example, `http://mysprykershop.com/resource/1`), selects a proper application based on a bootstrap file, does content negotiation and selects applicable convention, and executes request flow. Also, this module is used for the fallback to the old Glue API.
* **GlueStorefrontApiApplication module**: The `GlueStorefrontApiApplication` module is used for wiring everything related to the Glue Storefront API resources and route processing. All resources, routes, application plugins, and the rest of the required plugin stacks are wired into this module.
* **GlueBackendApiApplication module**: The `GlueBackendApiApplication` module is used for wiring everything related to the Glue Backend API resources and route processing. All resources, routes, application plugins, and the rest of the required plugin stacks are wired into this module.
* **Convention module**: Each convention module represents some specific convention and should include all required functionality to format API requests according to this convention. Out of the box, Spryker provides a `GlueJsonApiConvention` module that represents JSON:API convention.
* **Resource modules**: A `Resource` module implements a separate resource or a set of resources for a specific application. The `Resource` module *must* be dedicated to a specific application but can use different conventions. Such a module handles requests to a particular resource and provides them with responses. In the process of doing so, the module can communicate with the Storage, Search, or Spryker Commerce OS (Zed through RPC call) for the Glue Storefront API application, or it can communicate with a Zed directly through Facades for the Glue Backend API application. The modules do not handle request semantics or rules. Their only task is to provide the necessary data in a `GlueResponseTransfer` object. All formatting and processing are done by the convention or selected application module.
* **Relationship modules**: Such modules represent relationships between two different resources. Their task is to extend the response of one of the resources with data from related resources. Out of the box, these modules are only applicable for resources that are using JSON:API convention.

To be able to process API requests correctly, the `Resource` modules need to implement resource plugins that facilitate the routing of requests to the module. Such plugins need to be registered in the application they are related to. Also, plugins must implement a convention resource interface if must implement one.

## Request flow

Glue executes a few steps in order to execute a request:

### Application bootstrapping and running

Upon receiving an API request, an API context transfer is created where we set up basic request data like host, path, and method. It can be used to select a required application from the provided applications list. After that, `ApiApplicationProxy` is used to bootstrap and run the selected application. If the selected application plugin is the instance of `RequestFlowAgnosticApiApplication`, the direct flow is used, and no additional Glue logic is executed. It's useful if we need to create a simple API application that just returns the result of execution as is. If the application plugin is the instance of `RequestFlowAwareApiApplication`, we execute the whole request flow.

### Request flow preparation

First, we hydrate `GlueRequestTransfer` with data from the `Request` object. This includes request body, query params, headers, and attributes.

Then, `ContentNegotiator` tries to resolve what convention the application must use for this request and updates `GlueRequestTransfer` with the request format. The convention is optional, so if it's not found, the application uses the requested and accepted format to prepare request and response data.

With hydrated `GlueRequestTransfer` and selected or not convention, the application executes `RequestFlowExecutor`.

### Executing request builders, request validators, and response formatting based on selected convention

At this stage, a bunch of plugin stacks are executed to prepare the request and response. If the convention is selected, the application merges plugins from three different places: default plugins from `GlueApplicationDependencyProvider`, plugins from the selected convention, and application-specific plugins. If the convention isn't found, instead of convention plugins, default flow classes are executed before common and application-specific plugins.

### Routing

Routing tries to find required resources in two plugin stacks in the selected application dependency provider—for example, `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getResourcePlugins()` and `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getRouteProviderPlugins()`. If no route is found, `MissingResource` is selected and executed.

For more details about creating a resource, see these documents:
* [Create storefront resources](/docs/dg/dev/glue-api/{{page.version}}/routing/create-storefront-resources.html)
* [Create backend resources](/docs/dg/dev/glue-api/{{page.version}}/routing/create-backend-resources.html)
* [Create routes](/docs/dg/dev/glue-api/{{page.version}}/routing/create-routes.html)

## Resource modules

A `Resource` module is a module that implements a single resource or a set of resources. It is responsible for accepting a request in the form of `GlueRequestTransfer` and providing responses in the form of `GlueResponseTransfers`. For this purpose, the SAPI `Resource` module can communicate with the Storage or Search, for which purpose it implements a [Client](/docs/dg/dev/backend-development/client/client.html). It can also communicate with the Spryker Commerce OS (Zed) through RPC calls.

BAPI resources can use direct facade access through the dependency provider and access the database directly. `Resource` modules must implement all logic related to processing a request. It is not recommended to have any of the Business Logic, or a part of it, in the GlueApplication or specific application Module. If you need to extend any of the built-in Glue functionality, extending the relevant `Resource` module is always safer than infrastructure.

### Module naming

Resource modules have their own naming pattern to follow:
- Storefront resources must use the simple `Api` suffix and resource name in plural—for example, `ProductsApi`.
- Backend resources must use the `BackendApi` suffix and resource name in plural—for example, `ProductsBackendApi`.
### Module structure

Recommended module structure:

| RESOURCESRESTAPI                                               | DESCRIPTION                                                                                          |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| `Glue/Resources(Backend)Api/Controller`                        | Folder for resource controllers. Controllers are used to handle API requests and responses.          |
| `Glue/Resources(Backend)Api/Dependency`                             | Bridges to clients/facades from other modules.                                                       |
| `Glue/Resources(Backend)Api/Plugin`                                 | Resource plugins.                                                                                    |
| `Glue/Resources(Backend)Api/Processor`                              | Folder where all resource processing logic, data mapping code and calls to other clients are located. |
| `Glue/Resources(Backend)Api/Resources(Backend)ApiConfig.php`             | Contains resource-related configuration.                                                             |
| `Glue/Resources(Backend)Api/Resources(Backend)ApiDependencyProvider.php` | Provides external dependencies.                                                                      |
| `Glue/Resources(Backend)Api/Resources(Backend)ApiFactory.php`            | Factory that creates instances.                                                                      |

Also, a module must contain the transfer definition in `src/Pyz/Shared/Resources(Backend)Api/Transfer`:

| RESOURCESRESTAPI                       | DESCRIPTION |
|----------------------------------------| --- |
| `resources_(backend_)api.transfer.xml` | Contains API transfer definitions. |

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
* request: `1985-07-01T01:22:11+02:00`
* in storage and responses: `1985-06-30T23:22:11+00:00`

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
