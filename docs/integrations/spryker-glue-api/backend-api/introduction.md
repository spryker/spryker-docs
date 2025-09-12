---
title: Backend API Introduction
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

- **Direct Facade Access**: Backend API resources can use direct facade access through the dependency provider and access the database directly
- **Administrative Focus**: Designed for Backoffice operators, system configuration, and administrative tasks
- **Enterprise Integration**: Built for ERP, CRM, and other enterprise system integrations
- **High Performance**: Optimized for performant backend operations with direct database access
- **Multi-format Support**: Technically supports multiple formats, with REST API shipped out-of-the-box

## Possibility to Create New API Applications

With the current infrastructure, projects can easily create their own API applications that would be completely separated from others. This means that resources can be added only to the new application, and users can't access them with existing ones.

## Decoupling from Conventions

Backend API resources can use any implemented conventions, create new ones, or even not use any. In this case, the "no convention" approach is used, and a request and response are formatted as a plain JSON.

## Authentication Servers

Current infrastructure lets you switch between different authentication servers. For example, this can be useful if you want to use Auth0 or any other server in addition to implemented servers.

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

## Getting Started

To start working with Backend API:

1. **Authentication**: Obtain Back Office user authentication tokens
2. **Explore endpoints**: Review available administrative API resources
3. **Implement requests**: Use appropriate format (REST API OOTB)
4. **Handle responses**: Process API responses according to format

## Further Reading

- [Backend and Storefront API module differences](/docs/dg/dev/glue-api/latest/backend-and-storefront-api-module-differences.html)
- [Create Backend Resources](/docs/integrations/spryker-glue-api/create-glue-api-applications/create-backend-resources.html)
- [Use authentication servers with Backend API](/docs/dg/dev/glue-api/latest/use-authentication-servers-with-glue-api.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/glue-api-authenticating-and-authorization.html)
