---
title: "Glue API: Authenticate as a merchant user"
description: Learn how to authenticate as a merchant user using the Spryker Backend API and which roles the issued token carries.
last_updated: Sep 9, 2026
template: glue-api-storefront-guide-template
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: API Platform security
    link: docs/integrations/spryker-api/authenticating-and-authorization/security.html
---

This endpoint allows authenticating as a merchant user. A merchant user is a Back Office user that is assigned to a merchant; the access token it receives carries the `merchant-user` scope, which the Backend API maps to the `ROLE_MERCHANT_USER` role. Resources built for the Merchant Portal audience, like the merchant profile, check for this role.

The merchant does not have to be approved: a merchant user of a merchant that is still waiting for approval can authenticate and use the endpoints available to merchant users.

{% info_block warningBox "API Platform only" %}

The JSON:API request format, the roles, and the resolution of the acting user described on this page are available with the [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html) integration of the Backend API only. Before using them, [integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html) and [integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html).

On the legacy Glue infrastructure, `POST /token` with the form-encoded body still issues a token that carries the `merchant-user` scope, but no roles are derived from it and no acting user is established. Resources there are protected by scope-based authorization instead: `MerchantUserTypeOauthScopeAuthorizationCheckerPlugin` checks the request path against `OauthMerchantUserConfig::getAllowedForMerchantUserPaths()`.

{% endinfo_block %}

## Installation

The endpoint is provided by the `OauthBackendApi` module. Merchant user scopes are provided by the `OauthMerchantUser` module; to register its plugins, see [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html#optional-enable-the-backend-api-authentication).

## Authenticate as a merchant user

---
`POST` **/token**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Content-Type | application/vnd.api+json | &check; | The request body is a JSON:API document. The form-encoded body described in [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html) is accepted as well. |

Request sample: authenticate as a merchant user

`POST https://glue-backend.mysprykershop.com/token`

```json
{
    "data": {
        "type": "tokens",
        "attributes": {
            "username": "michele@sony-experts.com",
            "password": "change123"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| username | String | &check; | Username of the merchant user. You define it when [creating a merchant user](/docs/pbc/all/merchant-management/latest/marketplace/manage-in-the-back-office/manage-merchant-users/create-merchant-users.html). |
| password | String | &check; | Password of the merchant user. |

### Response

<details><summary>Response sample: authenticate as a merchant user</summary>

```json
{
    "data": {
        "type": "tokens",
        "id": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "attributes": {
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "refreshToken": "def50200a1b2c3d4e5f6789012345678901234567890abcdef..."
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| accessToken | String | Authentication token used to send requests to the protected resources available for this merchant user. It is also the resource `id`. |
| tokenType | String | Type of the authentication token. Set this type when sending a request with the token. |
| expiresIn | Integer | Time in seconds in which the `accessToken` token expires. |
| refreshToken | String | Authentication token used to refresh `accessToken`. See [Refresh the access token](#refresh-the-access-token). |

## Refresh the access token

To exchange a refresh token for a new access token and refresh token, send the request:

---
`POST` **/refresh-tokens**

---

Request sample: refresh the access token

`POST https://glue-backend.mysprykershop.com/refresh-tokens`

```json
{
    "data": {
        "type": "refresh-tokens",
        "attributes": {
            "refreshToken": "def50200a1b2c3d4e5f6789012345678901234567890abcdef..."
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| refreshToken | String | &check; | Refresh token returned by [Authenticate as a merchant user](#authenticate-as-a-merchant-user) or by a previous refresh. |

<details><summary>Response sample: refresh the access token</summary>

```json
{
    "data": {
        "type": "refresh-tokens",
        "id": "def50200f1e2d3c4b5a6978012345678901234567890fedcba...",
        "attributes": {
            "refreshToken": "def50200f1e2d3c4b5a6978012345678901234567890fedcba...",
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
            "tokenType": "Bearer",
            "expiresIn": 28800
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| refreshToken | String | Newly issued refresh token. It is also the resource `id`. The refresh token of the request is revoked. |
| accessToken | String | Newly issued authentication token. |
| tokenType | String | Type of the authentication token. |
| expiresIn | Integer | Time in seconds in which the `accessToken` token expires. |

## Roles the token grants

The scopes in the token decide which roles the Backend API grants to the request:

| USER | SCOPES | ROLES |
| --- | --- | --- |
| Merchant user | `user`, `merchant-user` | `ROLE_USER`, `ROLE_MERCHANT_USER` |
| Back Office user without a merchant | `user`, `back-office-user` | `ROLE_USER`, `ROLE_BACK_OFFICE_USER` |

`ROLE_USER` is held by every authenticated caller, so a resource that must distinguish the two audiences checks `ROLE_MERCHANT_USER` or `ROLE_BACK_OFFICE_USER`. A merchant user calling a resource that requires `ROLE_BACK_OFFICE_USER` gets `403`, and the other way round.

On every request with a valid token, the Backend API resolves the user behind the token and makes it the acting user. The user must be active; a token of a deactivated or deleted user is rejected with `401` and the error code `003`. For details, see [API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html#resolving-the-user-behind-a-token).

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 401 | invalid_grant | The provided user credentials are incorrect or invalid. |
| 401 | 001 | The user could not be authenticated. |
| 401 | 003 | The access token does not belong to an active user (on protected resources). |
| 401 | invalid_request | The refresh token sent to `/refresh-tokens` is unknown, expired, or revoked. |
| 422 | N/A | The request body is not a valid document for the resource, for example, `username` or `password` is missing on `/token`, or `refreshToken` is missing on `/refresh-tokens`. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html).
