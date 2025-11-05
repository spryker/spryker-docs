---
title: Authentication and authorization
description: Learn how to authenticate and authorize requests in the Spryker Backend
  API using OAuth 2.0.
last_updated: July 9, 2025
template: default
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/authentication-and-authorization.html
  - /docs/scos/dev/feature-integration-guides/202404.0/glue-api/glue-api-authentication-integration.html
  - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202404.0/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/glue-api-authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202005.0/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202200.0/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202204.0/authentication-and-authorization.html
  - /docs/pbc/all/identity-access-management/202404.0/glue-api-authentication-and-authorization.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/glue-api-authentication-and-authorization
  - /docs/dg/dev/glue-api/latest/authentication-and-authorization.html
  - /docs/dg/dev/glue-api/latest/rest-api/glue-api-authentication-and-authorization.html

---


Spryker APIs uses the OAuth 2.0 framework for authentication to secure its resources. On a technical level, this is handled by the Login API. To gain access to a protected resource, a client application must first obtain an access token. This token, a JSON Web Token (JWT), identifies the user in subsequent API calls and must be included in the request header.

![auth-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Authentication+and+Authorization/auth-scheme+%281%29.png)


## Access and refresh tokens

For security, access tokens have a limited lifespan. The default lifetime is **8 hours** (28,800 seconds). When an access token is issued, the response also includes a **refresh token**.

- Access Token: Used to authenticate requests to protected resources.
- Refresh Token: When an access token expires, the refresh token can be exchanged for a new access token and a new refresh token. The default lifetime for a refresh token is **1 month** (2,628,000 seconds).

It is recommended to revoke refresh tokens when they are no longer needed or if they become compromised. A revoked token is immediately marked as expired and cannot be used to obtain a new access token.


## Accessing protected resources

To make a request to a protected resource, you must pass the access token in the `Authorization` header.

**Example Request:**

```http
GET /carts HTTP/1.1
Host: mysprykershop.com:10001
Content-Type: application/json
Authorization: Bearer eyJ0...
Cache-Control: no-cache
```

If the token is valid, the API will process the request. If authorization fails, the API returns a `401 Unauthorized` error with a code explaining the reason for the failure.

**Example Error Response:**

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


## User and application types

Authentication grants access based on user type, and different endpoints may require different user roles. In the Spryker ecosystem, there is a distinction between the Storefront and Backend APIs.

- Storefront API: Used to authenticate a customer.
- Backend API: Used to authenticate a user (for example a company user or agent).

By default, you can authenticate as a customer, a company user, or an agent assist.

## Protected resources

Protected resources require authentication for interactions. To see which endpoints are protected in your specific implementation, refer to the API references where Swagger shows a lock icon for protected APIs:

Storefront API:
- [Storefront API B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-b2b-demo-shop-reference.html)
- [Storefront API B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-b2c-demo-shop-reference.html)
- [Storefront API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-marketplace-b2b-demo-shop-reference.html)
- [Storefront API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-marketplace-b2c-demo-shop-reference.html)

Backend API:
- [Backend API B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-b2b-demo-shop-reference.html)
- [Backend API B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-b2c-demo-shop-reference.html)
- [Backend API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2b-demo-shop-reference.html)
- [Backend API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2c-demo-shop-reference.html)
