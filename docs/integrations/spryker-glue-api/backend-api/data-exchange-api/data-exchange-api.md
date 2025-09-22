---
title: Data Exchange API
description: Comprehensive documentation for the Spryker Data Exchange API, enabling seamless integration and efficient data transfer between systems.
last_updated: July 9, 2025
template: default
---

## Data Exchange API vs. Dynamic Entity API

### What is Data Exchange

Data Exchange refers to the process of transferring data between Spryker and third-party systems.

### How the APIs Relate

**In simple terms:**
The **Data Exchange API** is the business-facing name for Spryker's integration capability that allows data to flow between Spryker and external systems.
It is **powered by the Dynamic Entity API**, a technical feature in the Spryker Back Office that enables you to create and manage API endpoints without custom development.
- **Dynamic Entity API ->** technical perspective: how the endpoints are built.
- **Data Exchange API ->** business perspective: why the endpoints are used.

### Dynamic Entity API

The Dynamic Entity API is part of Spryker Commerce OS. It lets you build, customize, and manage database APIs through a Back Office user interface, with no coding required.

**Key features**
- **No coding required**: API endpoints are created directly from the UI.
- **Rapid API generation**: APIs can be generated in minutes.
- **Flexibility and customization**: Tailor endpoints and parameters to fit your systems.
- **Real-time updates**: Modify APIs on the fly without downtime.
- **Security and access control**: Built-in safeguards and permissions.
- **Direct database access**: Work with Spryker entities for real-time data operations.

### Data Exchange API

The **Data Exchange API** builds on the Dynamic Entity API to facilitate real-time data transfer across all integrated platforms.

**When to use it**
- The Data Exchange API is recommended when you want to:
- Create your own data integration engine via API (without middleware).
- Synchronize data in real time between Spryker and external systems.
- Build custom dashboards or reporting tools with direct Spryker data access.
- Integrate with third-party systems that require immediate updates.
- Develop custom administrative interfaces for reading/writing Spryker data.

### Install and configure

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

### Sending requests

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
