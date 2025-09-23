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

![Backend API](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-api/glue-backend-api.jpeg)

## Key Features

- **Admin-focused**: Designed for administrative operations and back-office tasks
- **Multi-format Support**: Technically supports multiple conventions, with JSON:API shipped out-of-the-box
- **Direct Facade Access**: Backend API resources can use direct facade access through the dependency provider and access the database directly
- **Enterprise Integration**: Built for ERP, CRM, and other enterprise system integrations
- **Multi-format Support**: Technically supports multiple conventions, with JSON:API shipped out-of-the-box

## Possibility to Create New API Applications

With the current infrastructure, projects can easily create their own API applications that would be completely separated from others. This means that resources can be added only to the new application, and users can't access them with existing ones.

## Decoupling from Conventions

Backend API resources can use any implemented conventions, create new ones, or even not use any. In this case, the "no convention" approach is used, and a request and response are formatted as a plain JSON.

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

## Use Cases

Backend API is ideal for:
- Administrative dashboards and back-office applications
- Enterprise system integrations (ERP, CRM, PIM)
- System-to-system communication
- Data synchronization and bulk operations
- Administrative automation and workflows
- Third-party management tools

## Data Exchange API

Backend API includes the Data Exchange API, a dynamic database API that facilitates data transfer in real-time. It enables you to build, customize, and manage database APIs tailored to your specific business requirements through a user interface.

Key benefits:
- No coding and deploying  required: API endpoints are created from the user interface
- Rapid API generation: APIs are generated within minutes
- Flexibility and customization: Tailor APIs to your specific needs
- Real-time updates: Dynamic changes and on-the-fly modifications
- Security and Access Control: Strong security measures and access controls

[Learn more about Data Exchange API](/docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html)

## Getting Started

To start working with Backend API:

1. **Authentication**: Obtain Back Office user authentication tokens
2. **Explore endpoints**: Review available administrative API resources
3. **Handle responses**: Process API responses according to format

## Further Reading

- [Backend API B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-b2b-demo-shop-reference.html)
- [Backend API B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-b2c-demo-shop-reference.html)
- [Backend API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2b-demo-shop-reference.html)
- [Backend API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2c-demo-shop-reference.html)
- [Create Backend Resources](/docs/integrations/spryker-glue-api/backend-api/developing-apis/create-backend-resources.html)
- [Data Exchange API](/docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html)
