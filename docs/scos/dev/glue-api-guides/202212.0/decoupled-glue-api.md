---
title: Decoupled Glue API
description: The guide will walk you through the process of handling API requests via GlueStorefront and GlueBackoffice layers.
last_updated: Jul 11, 2023
template: glue-api-storefront-guide-template
---

The Spryker Decoupled Glue API is a set of a few API applications like Glue Storefront API (SAPI) and Glue Backend API (BAPI) of the Spryker Commerce OS. Those applications are build to be used as a contract for accessing Storefront or Backoffice functionality via API. Those applications know how to read and interpret API resources and leverage feature modules that expose existing Spryker functionality.

## Existing Glue Applications
OOTB Spryker Commerce OS provides 3 API applications:
1. Old Glue API application that can be used as a fallback
2. New Glue Storefront API (SAPI) that is a replacement for the old Glue and can be used for the same purpose
3. Glue Backend API (BAPI) that can be used to provide API access for the Backoffice functionality directly without any additional RPC calls.

## Difference between Decoupled Glue Api and the old Glue API
There are a few differences between the current Glue infrastructure (Decoupled Glue API) and the old [Glue API](/docs/scos/dev/glue-api-guides/{{page.version}}/glue-rest-api.html)

### Possibility to create new API applications
With the current infrastructure projects can easily [create](/docs/scos/dev/glue-api-guides/{{page.version}}/create-glue-api-applications.html) their own API applications that would be completely separated from others. This means that resources can be added only to the new application and users will not be able to access them with existing ones.

### Decoupling from conventions
Old Glue API was tightly coupled with a JSON:API convention and all resources have to follow it. With a current infrastructure resources can use any implemented conventions, create new one or even not use any. In this case "no convention" approach will be used and request and response will be formatted as a plain json. More details can be found [here](/docs/scos/dev/glue-api-guides/{{page.version}}/create-and-change-glue-api-conventions.html)

### New type of application - Glue Backend API application
With the current setup OOTB we have an additional Glue Backend API (BAPI) application that is meant to be an API application for our backoffice. This means that with this new application, infrastructure has a direct access to Zed facades from BAPI resources. Also OOTB we have a separate `/token` resource specifically for BAPI that is uses Backoffice users credentials to issue a token for BAPI resource.
More details about difference between SAPI and BAPI can be found [here](/docs/scos/dev/glue-api-guides/{{page.version}}/backend-and-storefront-api-module-differences.html)

### Authentication servers
Current infrastructure allows switching between different authentication servers. This can be useful if you want to use e.g. Auth0 or any other server in addition to implemented servers.
More details and examples can be found [here](docs/scos/dev/glue-api-guides/{{page.version}}/use-authentication-servers-with-glue-api.html)


## Glue Storefront API

![Glue Storefront API](/_drafts/glue-storefront-api.jpeg)

## Glue Backend API

![Glue Backend API](/_drafts/glue-backend-api.jpeg)

## Infrastructure
Decoupled Glue API infrastructure is implemented the same layer of Spryker Commerce OS, called Glue, as an old one. It is responsible for providing API endpoints, processing requests, as well as for communication with other layers of the OS in order to retrieve the necessary information. Separate application are implemented as separate modules, e.g. `GlueStorefrontApiApplication` and `GlueBackendApiApplication`. Each application has its own bootstrapping and a separate virtual host on the Spryker web server (Nginx by default).

Logically, the Glue layer can be divided into separate parts:
* **GlueApplication module**
  <br>The `GlueApplication` module provides a framework for constructing API resources and selecting a proper application. It intercepts all HTTP requests at resource URLs (e.g. `http://mysprykershop.com/resource/1`), selects a proper application based on bootstrap file, does content negotiation and selects applicable convention and executes request flow. Also this module is used for the fallback to the old Glue API.

* **GlueStorefrontApiApplication module**
  <br>The `GlueStorefrontApiApplication` module is used to wire everything related to the Glue Storefront API resources/routes processing. All resources, routes, application plugins and the rest of required plugin stacks are wired into this module.

* **GlueBackendApiApplication module**
  <br>The `GlueBackendApiApplication` module is used to wire everything related to the Glue Backend API resources/routes processing. All resources, routes, application plugins and the rest of required plugin stacks are wired into this module.

* **Convention module**
  <br>Each convention module represent some specific convention and should include all required functionality to format API requests according this convention. OOTB Spryker provides a `GlueJsonApiConvention` module that represents JSON:API convention.


* **Resource modules**
  <br>A `Resource` module implements a separate resource or a set of resources for specific application. Resource module MUST be dedicated to specific application, but can use different conventions. Such a module handles requests to a particular resource and provides them with responses. In the process of doing so, the module can communicate with the Storage, Search or Spryker Commerce OS (Zed via RPC call) for the Glue Storefront API application or it can communicate with a Zed directly via Facades for the Glue Backend API application. The modules do not handle request semantics or rules. Their only task is to provide the necessary data in a `GlueResponseTransfer` object. All formatting and processing will be done by convention or selected application module.

* **Relationship modules**
  <br>Such modules represent relationships between two different resources. Their task is to extend the response of one of the resources with data from related resources. OOTB only applicable for resources that are using JSON:API convention.

To be able to process API requests correctly, the `Resource` modules need to implement resource plugins that facilitate routing of requests to the module. Such plugins need to be registered in the application they are related to. Also plugins must implement a convention resource interface if it must implement one.

## Request flow
Glue executes a few steps in order to execute a request:
### Application bootstraping and running
Upon receiving an API request, an API context transfer will be created where we setup basic request data like host, path and method. It can be used to select a required application from provided applications list. After that `ApiApplicationProxy` will be used to bootstrap and run selected application. If selected application plugin is instance of `RequestFlowAgnosticApiApplication` the direct flow will be used and no additional Glue logic will be executed. It's useful if we need to create a simple API application that will just return result of execution as is.
In the case if application plugin is instance of `RequestFlowAwareApiApplication` we execute a whole request flow.
### Request flow preparation
First we hydrate `GlueRequestTransfer` with data from the `Request` object. This includes request body, query params, headers, attributes, etc.
After that `ContentNegotiator` tries to resolve what convention should application use for this request and updates `GlueRequestTransfer` with request format. Convention is optional, so if it wasn't found, application will use requested and accepted format to prepare request and response data.
With hydrated `GlueRequestTransfer` and selected or not convention, application will execute `RequestFlowExecutor`.
### Executing request builders, request validators and response formatting based on selected convention
On this stage a bunch of plugin stacks will be executed to prepare request and response. If convention was selected, application will merge plugins from 3 different places: default plugins from `GlueApplicationDependencyProvider`, plugins from selected convention and application specific plugins. In case convention wasn't found, instead of convention plugins, default flow classes will be executed before common and application specific plugins.
### Routing
Routing will try to find required resource in 2 plugin stacks in selected application dependency provider. E.g. `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getResourcePlugins()` and `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getRouteProviderPlugins()`. If no route was found, `MissingResource` will be selected and executed.
More details how to create a resource can be found here:
- [Storefront resources](/docs/scos/dev/glue-api-guides/{{page.version}}/routing/create-storefront-resources.html)
- [Backend resources](/docs/scos/dev/glue-api-guides/{{page.version}}/routing/create-backend-resources.html)
- [Custom routes](/docs/scos/dev/glue-api-guides/{{page.version}}/routing/create-routes.html)

## Resource modules
A Resource module is a module that implements a single resource or a set of resources. It is responsible for accepting a request in the form of `GlueRequestTransfer` and providing responses in the form of `GlueResponseTransfers`.
For this purpose, SAPI resource module can communicate with the Storage or Search, for which purpose it implements a [Client](/docs/scos/dev/back-end-development/client/client.html). It can also communicate with the Spryker Commerce OS (Zed) via RPC calls.
BAPI resources can use direct facade access via dependency provider and access database directly.
Resource modules must implement all logic related to processing a request. It is not recommended having any of the Business Logic, or a part of it, in the GlueApplication or specific application Module. In case you need to extend any of the built-in Glue functionality, it is always safer to extend the relevant Resource module than infrastructure.
### Module naming
Resource modules has their own naming patter to follow:
- Storefront resources must use simple `Api` suffix and resource name in plural. E.g. `ProductsApi`.
- Backend resources must use `BackendApi` suffix and resource name in plural. E.g. `ProductsBackendApi`.
### Module structure
Recommended module structure:

| ResourcesRestApi                                               | DESCRIPTION                                                                                          |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| `Glue/Resources(Backend)Api/Controller`                        | Folder for resource controllers. Controllers are used to handle API requests and responses.          |
| `Glue/Resources(Backend)Api/Dependency`                             | Bridges to clients/facades from other modules.                                                       |
| `Glue/Resources(Backend)Api/Plugin`                                 | Resource plugins.                                                                                    |
| `Glue/Resources(Backend)Api/Processor`                              | Folder where all resource processing logic, data mapping code and calls to other clients are located. |
| `Glue/Resources(Backend)Api/Resources(Backend)ApiConfig.php`             | Contains resource-related configuration.                                                             |
| `Glue/Resources(Backend)Api/Resources(Backend)ApiDependencyProvider.php` | Provides external dependencies.                                                                      |
| `Glue/Resources(Backend)Api/Resources(Backend)ApiFactory.php`            | Factory that creates instances.                                                                      |

Also, a module should contain the transfer definition in `src/Pyz/Shared/Resources(Backend)Api/Transfer`:

| ResourcesRestApi                       | DESCRIPTION |
|----------------------------------------| --- |
| `resources_(backend_)api.transfer.xml` | Contains API transfer definitions. |

The resulting folder structure on the example of the ServicePointsBackendApi Resource module looks as follows:
![Module structure](/_drafts/glue-api-module-structure.png)

## Glue Request structure
| FIELD       | DESCRIPTION                                                                       |
|-------------|-----------------------------------------------------------------------------------|
| pagination  | `PaginationTransfer` object with request pagination data                          |
| sortings    | Collection of `SortTransfer` objects                                              |
| queryFields | Assoc array of query parameters with values                                       |
| resource    | `GlueResourceTransfer` object with resource related data                          |
| path        | Returns the path being requested relative to the executed script.                 |
| content     | Request body conten                                                               |
| filters     | Collection of `GlueFilterTransfer` objects                                        |
| attributes  | Array of attributes from the `Request` object                                     |
| meta        | Array of meta data from the `Request` object                                      |
| locale      | Current locale                                                                    |
| host        | Current host                                                                      |
| convention  | Selected convention that was selected in `ContentNegotiator`                      |
| application  | Selected application                                                              |
| method  | Request "intended" method.                                                        |
| parametersString  | Normalized query string from the `Request` object                                 |
| requestedFormat  | `content-type` header value                                                       |
| acceptedFormat  | `accept` header value that was processed in `ContentNegotiator`                   |
| httpRequestAttributes  | Request parameters from the `Request` object                                      |
| requestUser  | Backend user that requesting resource (valid only for Glue Backend API)           |
| requestCustomer  | Storefront customer that requesting resource (valid only for Glue Storefront API) |
## Glue Response structure
| FIELD | DESCRIPTION                                                                                             |
|-------|---------------------------------------------------------------------------------------------------------|
| httpStatus   | Response status code                                                                                    |
| meta   | Return headers                                                                                          |
| content   | Response body. If resource set any data into it, response body will use it instead of `resources` field |
| requestValidation   | `GlueRequestValidationTransfer` object                                                                  |
| errors   | Collection of `GlueErrorTransfer` objects                                                               |
| filters   | Collection of `GlueFilterTransfer` objects                                                              |
| sortings   | Collection of `SortTransfer` objects                                                                    |
| pagination   | `PaginationTransfer` object                                                                             |
| resources   | Collection of `GlueResourceTransfer` objects that are used to to prepare response body                  |
| format   | Response format. E.g. `application/vnd.api+json` for JSON:API resources                                 |
## HTTP status codes

Below is a list of common HTTP statuses returned by Glue endpoints.

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


## Dates

For date formatting, [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date/time format is used. For requests, any time zone is accepted, however, dates are stored and returned in UTC.

Example:
* request: 1985-07-01T01:22:11+02:00
* in storage and responses: 1985-06-30T23:22:11+00:00

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