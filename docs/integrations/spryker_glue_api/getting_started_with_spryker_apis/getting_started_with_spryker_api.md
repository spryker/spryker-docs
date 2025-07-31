---
title: Getting Started with Spryker APIs
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: July 9, 2025
template: default
layout: custom_new
---

<div class="content_box">

Spryker's Glue API is a dedicated application layer within the Spryker Cloud Commerce OS. It's designed to provide API endpoints, process requests, and communicate with other parts of the system to manage data.  Think of it as the primary interface for any external system, custom frontend, or digital touchpoint that needs to interact with your Spryker-powered commerce platform.  Its main purpose is to enable headless commerce strategies, allowing you to build unique customer experiences and integrate seamlessly with a multitude of channels.

</div>

## Spryker GLUE API Types: REST vs Backend (BAPI)

Spryker's Glue API framework offers two primary types of API applications, each tailored for different use cases:

<div class="grid_container">
  <div class="content_card">
    <div class="content_column">
      <div class="content_icon">
      </div>
    </div>
    <div class="content_column">
      <p class="content_title">REST API</p>
      <p class="content_text">Spryker's REST API (often just called the Glue API) is designed for external facing integrations, think headless commerce. It's the API layer that powers web shops, mobile apps, marketplaces, and other client-facing systems..</p>
    </div>
  </div>
  <div class="content_card">
    <div class="content_column">
      <div class="content_icon">
      </div>
    </div>
    <div class="content_column">
      <p class="content_title">Backend API (BAPI)</p>
      <p class="content_text">Tailored for backend processes, administrative tools, or integrations with enterprise systems (for example ERP, CRM). A key advantage of BAPI is its direct access to Spryker's business logic layer (Facades), often leading to more performant backend operations.</p>
    </div>
  </div>
</div>

---

## Spryker's GLUE API Capabilities

The Glue API empowers developers with a rich set of features:

- Custom API Application Creation: Build distinct API applications tailored to specific domains or integration needs.
- Resource Definition: Define resources (like products, orders, carts) that your API will expose.
- Relationship Management: Establish relationships between resources to provide comprehensive data efficiently (for example parent-child or linked resources).
- Efficient Data Handling: Utilize built-in support for pagination, sorting, filtering, sparse fields (requesting only specific data fields), and configurable inclusion of related data to optimize API calls.
- Robust Security: Secure your API endpoints using OAuth 2.0 and define granular access controls

---

## Using Spryker's GLUE API

Interacting with Spryker's Glue API as a client application involves understanding its specific structure for requests and responses. Here's are some core pieces of information that you need to know to help you to get started.



### Endpoints & HTTPS Methods

API interactions happen by sending HTTPS requests (GET, POST, PATCH, DELETE, etc.) to specific URLs. In Spryker, resource types are often derived from the request URL (for example `/carts` for cart resources, `/products/{sku}` for a specific product).  The API documentation for each Spryker resource will detail the available endpoints and supported HTTPS methods which you an find within the API reference section of our documentation.


### Headers

Key headers you'll commonly use with Spryker Glue API include:
- **Authorization:** To provide an OAuth 2.0 Bearer token for accessing protected resources.
- **Content-Type:** Often application/vnd.api+json when sending data, adhering to the JSON:API convention.
- **Accept:** To specify the desired response format, also typically application/vnd.api+json.
- **Versioning:** Spryker's Glue API can handle versioning through request headers. If no version is specified, the newest version of the resource is usually returned. If a specific version is requested and exists, that version is returned; otherwise, a 404 error may occur.


### Request Parameters (especially with JSON:API)

Spryker's Glue API leverages standardized parameters for efficient data interaction :
- **Pagination:** Use `page[offset]` and `page[limit]` to retrieve data in manageable chunks (for example `?page[offset]=0&page[limit]=10`). These values are accessible within Spryker via `GlueRequestTransfer->getPagination()`.
- **Sorting:** Request data to be sorted using parameters like `?sort=attributeName` (ascending) or `?sort=-attributeName` (descending). Sorting parameters can be retrieved using `$glueRequestTransfer->getSortings()`.
- **Filtering:** Narrow down results using filter parameters, often structured like `?filter[resourceName.fieldName]=value`. These are accessible via `$glueRequestTransfer->getFilters()`.
- **Sparse Fields:** To receive only specific fields of a resource and reduce data transfer, use `?fields[resourceName]=attribute1,attribute2`. This is retrieved using `$glueRequestTransfer->getQueryFields()`.
- **Including Related Resources:** Fetch related data in a single request using the include parameter (for example `?include=concrete-product-image-sets`).  The behavior of this included section can be configured in Spryker.  


### Understanding Spryker Glue API Responses

- **Status Codes:** Standard HTTP status codes indicate the outcome (for example 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found)
- **Response Body:** The structure often follows the JSON:API convention.
  - The resources field in the GlueResponseTransfer typically contains an array of the primary data objects.
  - An included section may contain data for related resources if requested via the include parameter.
  - Responses often include pagination links (next, previous, last, first) automatically calculated when using JSON:API.
  - The overall response structure is defined by GlueResponseTransfer, which includes fields for HTTP status, metadata, content/resources, errors, filters, sortings, and pagination details.


### Authentication with Spryker

Spryker's Glue API primarily uses OAuth 2.0 for securing endpoints.
Client applications typically send user credentials (username, password) to an authentication endpoint (for example `/token` for SAPI, or a separate `/token` resource for BAPI using Back Office user credentials ) to obtain an access token and a refresh token.
This access token (Bearer token) must then be included in the Authorization header for subsequent requests to protected Spryker resources.
If an invalid, expired, or no token is provided for a protected resource, the API will respond with a 401 Unauthorized status code.

---

## Querying GLUE API Data

The Glue API supports standardized ways to query and manipulate data, especially when using conventions like JSON:API. This makes client interactions predictable and efficient. Key mechanisms include:

- **Pagination:** Handle large datasets effectively by requesting data in manageable chunks (pages).
- **Sorting:** Allow clients to specify the order in which results should be returned.
- **Filters:** Enable clients to retrieve subsets of resources based on specific criteria.
- **Sparse Fields:** Optimize response payloads by allowing clients to request only the specific data fields they need.
- **To learn more, explore:** "Querying Data with Glue API: Standard Parameters (Pagination, Sorting, Filters, Sparse Fields)."

<a class="fl_cont" href="/docs/dg/dev/glue-api/202410.0/use-default-glue-parameters">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Querying Data with GLUE Parameters</div>
</a>

---

## Building and Customizing Your APIs

The Glue API is not just for consumption; it's a powerful platform for development and customization.


### The Developers Journey: What's Involved in Using Glue API

Developing with the Glue API involves a structured approach. At a high level, this journey includes:

- Setting up the Application Context: Deciding whether to use the standard SAPI or BAPI, or if a custom API application is needed for your project.
- Implementing Resources: This is the core development activity. It involves creating modules that define your API resources, including:
- Controllers: To handle incoming HTTP requests and manage the request-response flow.
- Processors/Logic: To contain the business logic for fetching, creating, or updating data.
- Transfer Objects: To define the data structures for requests and responses.
- Configuring Routing: Ensuring that API calls are correctly directed to the appropriate resource and controller action.
- Considering Conventions and Best Practices: Adhering to API design principles, versioning strategies, and documentation standards.

Beyond the standard SAPI and BAPI, Spryker allows you to create entirely new, isolated Glue API applications. This is perfect for projects requiring a dedicated API with its own set of resources, configurations, or even custom request processing workflows.

<a class="fl_cont" href="/docs/dg/dev/glue-api/202410.0/use-default-glue-parameters">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Creating and change GLUE API Conventions</div>
</a>

<a class="fl_cont" href="/docs/dg/dev/glue-api/202410.0/use-default-glue-parameters">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Create GLUE API Applications</div>
</a>

<a class="fl_cont" href="/docs/dg/dev/glue-api/202410.0/use-default-glue-parameters">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Use Default GLUE Parameters</div>
</a>