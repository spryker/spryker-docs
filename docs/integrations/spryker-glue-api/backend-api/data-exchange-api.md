---
title: Data Exchange API
description: Comprehensive documentation for the Spryker Data Exchange API, enabling seamless integration and efficient data transfer between systems.
last_updated: July 9, 2025
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/integrations/custom-building-integrations/data-exchange/data-exchange-api.html
---
Data Exchange refers to the process of transferring data between Spryker and third-party systems.

Spryker offers the following options to import and export data:

- Data Exchange API: available in SCCOS by default
- Data Importers and Data Exporters: available in Spryker Cloud Commerce OS (SCCOS) by default

## Data Exchange API

Data Exchange API is a dynamic database API that facilitates data transfer in real-time, ensuring data is exchanged across all integrated platforms. It's part of the Backend API suite within Spryker Commerce OS (SCCOS) platform core.

Data Exchange API lets you build, customize, and manage database APIs tailored to your specific business requirements through a user interface, providing direct access to your Spryker data without requiring custom development.

## Key Features

The main benefits of the Data Exchange API include the following:

- **No coding required**: API endpoints are created from the user interface
- **Rapid API generation**: APIs are generated within minutes
- **Flexibility and customization**: Tailor APIs to your needs and define parameters to ensure compatibility with your systems
- **Real-time updates**: Infrastructure supports dynamic changes, so you can modify APIs on the fly
- **Security and Access Control**: Incorporates strong security measures and access controls to safeguard sensitive information
- **Direct database access**: Provides direct access to Spryker database entities for real-time data operations

## Use Cases

Data Exchange API is recommended when you want to:

- Create your own data integration engine via API without using middleware software
- Enable real-time data synchronization between Spryker and external systems
- Build custom dashboards or reporting tools that need direct access to Spryker data
- Integrate with third-party systems that require immediate data updates
- Develop custom administrative interfaces that need to read/write Spryker data

## Install and Configure

To install and configure the Data Exchange API:

1. **Installation**: The Data Exchange API is available in SCCOS by default as part of the Backend API infrastructure.

2. **Configuration**: Configure API endpoints through the Back Office interface:
   - Navigate to the Data Exchange API configuration section
   - Define your API endpoints and data mappings
   - Set up authentication and authorization rules
   - Configure data validation and transformation rules

3. **Authentication**: Use Backend API authentication methods:
   - Back Office user credentials for administrative access
   - API key authentication for system-to-system integration
   - OAuth 2.0 for secure third-party integrations

## Sending Requests

Data Exchange API follows Backend API conventions:

- **Base URL**: `https://your-backend-api.spryker.com/dynamic-entity/`
- **Authentication**: Include authentication headers as per Backend API requirements
- **Request Format**: JSON format for request and response bodies
- **HTTP Methods**: Support for GET, POST, PUT, PATCH, DELETE operations

Example request:

```bash
curl -X GET \
  https://your-backend-api.spryker.com/dynamic-entity/products \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json'
```

## Post Plugins

The Data Exchange API supports post plugins for extending functionality:

- **Data transformation plugins**: Transform data before sending responses
- **Validation plugins**: Add custom validation rules for incoming data
- **Audit plugins**: Log API usage and data changes
- **Integration plugins**: Connect with external systems automatically

For detailed implementation of post plugins, see the Backend API development guides.