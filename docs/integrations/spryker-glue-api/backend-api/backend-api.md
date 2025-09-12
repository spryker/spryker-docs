---
title: Backend API
description: Backend API is designed for administrative operations and system-to-system communication with direct access to Zed Facades.
last_updated: July 9, 2025
template: default
layout: custom_new
---

Backend API is designed for admins and system-to-system communication. Tailored for backend processes, administrative tools, or integrations with enterprise systems, such as ERP or CRM. Technically it is multi-format, but REST API is shipped out-of-the-box. A key advantage is its direct access to Spryker's business logic layer (Facades).

## Key Features

- **Admin-focused**: Designed for administrative operations and back-office tasks
- **Multi-format Support**: Technically supports multiple formats, with REST API shipped out-of-the-box
- **Direct Facade Access**: Backend API resources can use direct facade access through the dependency provider and access the database directly
- **Enterprise Integration**: Built for ERP, CRM, and other enterprise system integrations
- **High Performance**: Optimized for performant backend operations with direct database access

## Backend API Capabilities

Backend API provides powerful features for administrative and system integration needs:

- **Direct Business Logic Access**: Access Spryker's business logic layer (Facades) directly for optimal performance
- **Administrative Resources**: Define resources for back-office operations, user management, and system configuration
- **Enterprise Integration**: Built-in support for ERP, CRM, and other enterprise system connections
- **Flexible Data Handling**: Support for bulk operations, complex queries, and administrative workflows
- **Advanced Security**: Comprehensive authentication and authorization for administrative access

## Data Exchange API

Backend API includes the Data Exchange API, a dynamic database API that facilitates data transfer in real-time. It enables you to build, customize, and manage database APIs tailored to your specific business requirements through a user interface.

Key benefits:
- No coding required: API endpoints are created from the user interface
- Rapid API generation: APIs are generated within minutes
- Flexibility and customization: Tailor APIs to your specific needs
- Real-time updates: Dynamic changes and on-the-fly modifications
- Security and Access Control: Strong security measures and access controls

[Learn more about Data Exchange API](/docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html)

## Using Backend API

Backend API is designed for administrative and system-to-system communication with enhanced capabilities:

### Authentication

Backend API uses Back Office credentials for authentication. System administrators and enterprise integrations authenticate using administrative credentials to access backend resources.

### Direct Facade Access

Unlike customer-facing APIs, Backend API resources can directly access Spryker's business logic layer through Facades, providing:
- Enhanced performance for administrative operations
- Direct database access capabilities
- Comprehensive business logic integration
- Optimized backend processing

### Administrative Operations

Backend API supports complex administrative workflows including:
- User and role management
- System configuration
- Bulk data operations
- Enterprise system synchronization
- Administrative reporting and analytics

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

- [Backend API References](/docs/integrations/spryker-glue-api/api-references/backend-api/backend-api-b2b-demo-shop-reference.html)
- [Create Backend Resources](/docs/integrations/spryker-glue-api/create-glue-api-applications/create-backend-resources.html)
- [Data Exchange API](/docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html)
- [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/glue-api-authenticating-and-authorization.html)
