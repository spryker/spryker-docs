---
title: Authentication and authorization
description: Learn how to authenticate and authorize requests in the Spryker Storefront
  and Backend APIs using OAuth 2.0.
last_updated: Jul 31, 2026
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
  - /docs/dg/dev/glue-api/latest/old-glue-infrastructure/glue-api-authentication-and-authorization
  - /docs/dg/dev/glue-api/latest/authentication-and-authorization.html
  - /docs/dg/dev/glue-api/latest/rest-api/glue-api-authentication-and-authorization.html

  - /docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html
---


Spryker APIs use the OAuth 2.0 framework for authentication to secure their resources. On a technical level, this is handled by the access token endpoints, such as `/access-tokens`. To gain access to a protected resource, a client application must first obtain an access token. This token, a JSON Web Token (JWT), identifies the user in subsequent API calls and must be included in the request header.

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
Host: glue.mysprykershop.com
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
- [Storefront API B2B Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-b2b-demo-shop-reference.html)
- [Storefront API B2C Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-b2c-demo-shop-reference.html)
- [Storefront API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-marketplace-b2b-demo-shop-reference.html)
- [Storefront API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-api/storefront-api/api-references/storefront-api-marketplace-b2c-demo-shop-reference.html)

Backend API:
- [Backend API B2B Demo Shop Reference](/docs/integrations/spryker-api/backend-api/api-references/backend-api-b2b-demo-shop-reference.html)
- [Backend API B2C Demo Shop Reference](/docs/integrations/spryker-api/backend-api/api-references/backend-api-b2c-demo-shop-reference.html)
- [Backend API Marketplace B2B Demo Shop Reference](/docs/integrations/spryker-api/backend-api/api-references/backend-api-marketplace-b2b-demo-shop-reference.html)
- [Backend API Marketplace B2C Demo Shop Reference](/docs/integrations/spryker-api/backend-api/api-references/backend-api-marketplace-b2c-demo-shop-reference.html)

## In this section

Storefront API (Glue implementation):
- [Storefront API security and authentication](/docs/integrations/spryker-api/authenticating-and-authorization/storefront-api-security-and-authentication.html)

Backend API (Glue implementation):
- [Use authentication servers with Backend API](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/use-authentication-servers-with-backend-api.html)
- [Create protected Backend API endpoints](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/create-protected-backend-api-endpoints.html)
- [Create Backend API authorization strategies](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/create-backend-api-authorization-strategies.html)
- [Use Backend API authorization scopes](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/use-backend-api-authorization-scopes.html)
- [Use API key authorization](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/use-api-key-authorization.html)

API Platform:
- [API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html)
- [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html)

General:
- [Endpoint security](/docs/integrations/spryker-api/authenticating-and-authorization/endpoint-security.html)
- [Create grant type parameters](/docs/integrations/spryker-api/authenticating-and-authorization/create-grant-type-parameters.html)
- [Integrate a CIAM provider](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-a-ciam-provider.html)
- [Configure Cross-Origin Resource Sharing](/docs/integrations/spryker-api/authenticating-and-authorization/configure-cross-origin-resource-sharing-for-glue-api.html)
