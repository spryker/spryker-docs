---
title: Glue API authentication and authorization
description: Information about Glue API authentication and authorization.
last_updated: Oct 23, 2022
template: glue-api-storefront-guide-template
related:
  - title: Create grant type parameters
    link: docs/dg/dev/glue-api/latest/create-grant-type-parameters.html
  - title: How to use authentication server
    link: docs/dg/dev/glue-api/latest/use-authentication-servers-with-glue-api.html
redirect_from:
    - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/authentication-and-authorization.html
    - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/authentication-and-authorization.html
    - /docs/scos/dev/feature-integration-guides/202404.0/glue-api/glue-api-authentication-integration.html
    - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/authentication-and-authorization.html
    - /docs/scos/dev/glue-api-guides/202404.0/authentication-and-authorization.html

---

For authentication, Spryker implements the OAuth 2.0 mechanism. On the REST API level, it's represented by the Login API.

To get access to a protected resource, a user obtains an *access token*. An access token is a JSON Web Token used to identify a user during API calls. Then, they pass the token in the request header.

![auth-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Authentication+and+Authorization/auth-scheme+%281%29.png)

For security purposes, access tokens have a limited lifetime. When retrieving an access token, the response body also contains the token's lifetime, in seconds. When the lifetime expires, the token can no longer be used for authentication.

There is also a *refresh token* in the response. When your access token expires, you can exchange the refresh token for a new access token. The new access token also has a limited lifetime and a new refresh token.

The default lifetime of the access tokens is 8 hours (28800 seconds), and 1 month (2628000 seconds) of the refresh tokens.

For security purposes, when you finish sending requests as a user or if a token gets compromised, we recommend revoking the refresh token. Revoked tokens are marked as expired on the date and time of the request and can no longer be exchanged for access tokens.

Expired tokens are stored in the database, and you can configure them to be deleted.

## Authentication in the storefront and backend applications

Below, you can find information about [the differences between backend and storefront API modules](/docs/dg/dev/glue-api/{{page.version}}/backend-and-storefront-api-module-differences.html) and [Authentication integration.](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html).

In the Storefront, authentication is used to authenticate as a *customer*, and the Backend is used to authenticate as a *user*.

## Accessing protected resources

To access a protected resource, pass the access token in the `Authorization` header of your request—example:

```html
GET /protected-resource HTTP/1.1
Host: glue-storefront.mysprykershop.com or glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer eyJ0...
Cache-Control: no-cache
```

If authorization is successful, the API performs the requested operation. If authorization fails, the `401 Unathorized` error is returned. The response contains an error code explaining the cause of the error.

Response sample with an error:

```json
{
    "errors": [
        {
            "detail": "Invalid access token.",
            "status": 401,
            "code": "001"
        }
    ]
}
```

For more details, see:
- [Create protected Glue API endpoints](/docs/dg/dev/glue-api/{{page.version}}/create-protected-glue-api-endpoints.html)
- [Use API Key authorization](/docs/dg/dev/glue-api/{{page.version}}/use-api-key-authorization.html)
