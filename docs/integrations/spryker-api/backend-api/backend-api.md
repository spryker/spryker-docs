---
title: Backend API
description: Backend API is designed for administrative operations and system-to-system communication with direct access to Zed Facades.
last_updated: Aug 7, 2026
template: default
layout: custom_new
redirect_from:
  - /docs/integrations/spryker-glue-api/backend-api/backend-api.html
---

## Existing API Applications

Out of the box, Spryker Commerce OS provides API applications:
- Storefront API that can be used for customer-facing integrations and headless commerce
- Backend API that can be used to provide API access for the Back Office functionality directly without any additional RPC calls

## Backend API Application

With the current setup out of the box, we have a Backend API application that is meant to be an API application for our Back Office. This means that with this new application, infrastructure has direct access to Zed facades from Backend API resources. Also, out of the box, we have a separate `/token` resource specifically for Backend API that uses Back Office users' credentials to issue a token for a Backend API resource.

For more details about the difference between SAPI and BAPI, see [Comparison of Storefront and Backend APIs](/docs/integrations/spryker-api/getting-started-with-apis/comparison-of-storefront-and-backend-apis.html).

## Key Features

- **Admin-focused**: Designed for administrative operations and Back Office tasks
- **Multi-format Support**: Technically supports multiple conventions, with JSON:API shipped out-of-the-box
- **Direct Facade Access**: Backend API resources can use direct facade access through the dependency provider and access the database directly
- **Enterprise Integration**: Built for ERP, CRM, and other enterprise system integrations

### Possibility to create new API applications

With the current infrastructure, projects can easily [create](/docs/integrations/spryker-api/backend-api/developing-apis/create-api-applications.html) their own API applications that would be completely separated from others. This means that resources can be added only to the new application, and users can't access them with existing ones.

### Decoupling from conventions

Storefront API is tightly coupled with a JSON:API convention, and all resources have to follow it. Backend API resources can use any implemented conventions, create new ones, or even not use any. In this case, the "no convention" approach is used, and a request and response are formatted as a plain JSON. For more details, see [Create and change Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html).

### Authentication

Backend API uses Back Office credentials for authentication. System administrators and enterprise integrations authenticate using administrative credentials to access backend resources.

For API key-based authentication, see [Use API Key Authorization](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/use-api-key-authorization.html).

## Request and response reference

For the Glue resource module conventions, request and response structures, HTTP status codes, and request and response headers, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html).

## Data Exchange API

Backend API includes the Data Exchange API, a dynamic database API that facilitates data transfer in real-time. It enables you to build, customize, and manage database APIs tailored to your specific business requirements through a user interface.

Key benefits:
- No coding and deploying  required: API endpoints are created from the user interface
- Rapid API generation: APIs are generated within minutes
- Flexibility and customization: Tailor APIs to your specific needs
- Real-time updates: Dynamic changes and on-the-fly modifications
- Security and Access Control: Strong security measures and access controls

[Learn more about Data Exchange API](/docs/integrations/spryker-api/backend-api/data-exchange-api/data-exchange-api.html)

## Further Reading

- [Backend API B2B Demo Shop Reference](/docs/integrations/spryker-api/backend-api/api-references/backend-api-b2b-demo-shop-reference.html)
- [Backend API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-api/backend-api/api-references/backend-api-marketplace-b2b-demo-shop-reference.html)
- [Create Backend Resources](/docs/integrations/spryker-api/backend-api/developing-apis/create-backend-resources.html)
- [Data Exchange API](/docs/integrations/spryker-api/backend-api/data-exchange-api/data-exchange-api.html)
- [Authentication and Authorization](/docs/integrations/spryker-api/authenticating-and-authorization/authenticating-and-authorization.html)
