---
title: Data Exchange API
description: Comprehensive documentation for the Spryker Data Exchange API, enabling seamless integration and efficient data transfer between systems.
last_updated: July 9, 2025
template: default
---

Data Exchange refers to the process of transferring data between Spryker and third-party systems.

The following options to import and export data are available by default:

- Data Exchange API
- Data importers and exporters

## Data Exchange API

Data Exchange API is a dynamic database API that facilitates data transfer in real-time, ensuring data is exchanged across all integrated platforms. It's part of the Backend API suite in Spryker.

Data Exchange API lets you build, customize, and manage database APIs tailored to your specific business requirements through a user interface, providing direct access to your Spryker data without requiring custom development.

## Key features

The main benefits of the Data Exchange API include the following:

- No coding required: API endpoints are created from the user interface
- Rapid API generation: APIs are generated within minutes
- Flexibility and customization: Tailor APIs to your needs and define parameters to ensure compatibility with your systems
- Real-time updates: Infrastructure supports dynamic changes, so you can modify APIs on the fly
- Security and access control: Incorporates strong security measures and access controls to safeguard sensitive information
- Direct database access: Provides direct access to Spryker database entities for real-time data operations

## Use cases

Data Exchange API is recommended when you want to do the following:

- Create your own data integration engine via API without using middleware software
- Enable real-time data synchronization between Spryker and external systems
- Build custom dashboards or reporting tools that need direct access to Spryker data
- Integrate with third-party systems that require immediate data updates
- Develop custom administrative interfaces that need to read or write Spryker data

## Install and configure

1. Installation: The Data Exchange API is available by default as part of the Backend API infrastructure.

2. Configuration: Configure API endpoints through the Back Office:
   - Go to Data Exchange API
   - Define your API endpoints and data mappings
   - Set up authentication and authorization rules
   - Configure data validation and transformation rules

3. Authentication: Use Backend API authentication methods:
   - Back Office user credentials for administrative access
   - API key authentication for system-to-system integration
   - OAuth 2.0 for secure third-party integrations

## Sending requests

Data Exchange API follows Backend API conventions:

- Base URL: `https://your-backend-api.spryker.com/dynamic-entity/`
- Authentication: Include authentication headers as per Backend API requirements
- Request format: JSON format for request and response bodies
- HTTP methods: Support for GET, POST, PUT, PATCH, DELETE operations

Example request with Bearer token:

```bash
curl -X GET \
  https://your-backend-api.spryker.com/dynamic-entity/products \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json'
```

Example request with API Key (header):

```bash
curl -X GET \
  https://your-backend-api.spryker.com/dynamic-entity/products \
  -H 'X-Api-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```

Example request with API Key (URL parameter):

```bash
curl -X GET \
  'https://your-backend-api.spryker.com/dynamic-entity/products?api_key=YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```
