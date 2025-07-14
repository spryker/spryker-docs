---
title: Sprker API Errors and Troubleshooting
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: July 9, 2025
layout: custom_new
---

Sometimes an API can return an error for various reasons, here are some generic steps that can help you debug and troubleshoot those errors. For more certain API endpoints view the specific documentation for that endpoint , this will provide errors related to that API.


## Analyze the HTTP Status Code

The HTTP status code provides the initial classification of the error.

### 4xx Client-Side Errors

The request sent by the client is flawed.

- **400 Bad Request**: Malformed request, often due to invalid JSON or a missing required attribute.
- **401 Unauthorized**: Authentication failure. The `Authorization` header is missing, or the token is invalid or expired.
- **403 Forbidden**: Authorization failure. The authenticated user lacks the necessary permissions (scopes) for the resource.
- **404 Not Found**: The requested resource could not be found. This can be due to a wrong URL, an unregistered route, or a request for a non-existent API version.
- **415 Unsupported Media Type**: The `Content-Type` header is missing or incorrect.
- **422 Unprocessable Entity**: The request is syntactically correct but contains semantic errors, such as failing a business logic validation.
- **429 Too Many Requests**: Rate limiting has been triggered, often due to too many failed login attempts.

### 5xx Server-Side Errors

An unexpected error occurred on the server. These issues require checking server-side application and system logs.


## Decode the JSON Error Payload

For 4xx errors, the response body contains a JSON object with specific error details.

- **detail**: A human-readable message explaining the error (for example `"Invalid access token."`). This is the best place to start.
- **code**: A numeric, application-specific error code (for example `"202"`). This code is essential for programmatic error handling and for looking up the precise issue in reference tables.


## Correlate with the Request Context

Analyze the error in the context of the original request.

### Request Headers

- **Authorization**: Is the Bearer token present and valid?
- **Content-Type**: Is the media type correct? Does it include the correct version parameter? A non-existent version will cause a `404 Not Found` error.

### URL and Path

- Is the endpoint path spelled correctly?
- If the URL includes a resource ID, does an entity with that ID exist?

### Request Body

- Is the JSON syntax valid?
- Are all required fields present?
- Do the data types match the API's expectations?

## Common Error Scenarios

### Authentication (`401` / `403`)

These errors relate to the OAuth 2.0 security layer.

- A **401 Unauthorized** error points to problems with the access token (missing, expired, or invalid). The client should be able to use a refresh token to get a new access token.
- A **403 Forbidden** error indicates the user is authenticated but lacks the required permissions (scopes) to perform the action. Check the user's roles and the endpoint's security configuration.

### Routing (`404`)

A `404 Not Found` can be caused by more than a simple typo.

**Checklist:**

- Verify the URL path and HTTP verb.
- Check the `Content-Type` header for a correct API version.
- Confirm the requested resource ID exists in the database.
- Ensure the `ResourceRoutePlugin` is correctly defined and registered in the appropriate dependency provider (`GlueApplicationDependencyProvider` for legacy, or application-specific for decoupled).

### Business Logic (`422`)

Occurs when the request violates a business rule (for example trying to check out with an out-of-stock item). The specific numeric code in the error payload is key to understanding the exact issue.
