---
title: "Backend API: Manage Multi-Factor Authentication"
description: Learn how Back Office users and merchant users manage their Multi-Factor Authentication methods and pass MFA-protected requests using the Spryker Backend API.
last_updated: Sep 22, 2026
template: glue-api-backend-guide-template
related:
  - title: Manage Multi-Factor Authentication using Glue API
    link: docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/manage-multi-factor-authentication-using-glue-api.html
  - title: Install the Multi-Factor Authentication feature
    link: docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html
---

This document describes how Back Office users and merchant users manage their Multi-Factor Authentication (MFA) methods using the Backend API, and how they send requests to MFA-protected Backend API resources.

The email authentication method is used as an example. The endpoints support all authentication methods registered in your project.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the module that provides the endpoints and its installation instructions, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html).

## Conventions

Request headers and the error envelope are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/backend-api-conventions.html). This page lists only what is specific to MFA.

All endpoints require a Back Office user or merchant user access token. To get one, see [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). A token that belongs to neither user type gets `403`.

Every endpoint works on the MFA settings of the user the token belongs to. Back Office users and merchant users share the same MFA settings, so a method activated in the Back Office, in the Merchant Portal, or through this API applies everywhere.

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | Access token of the Back Office user or merchant user. |
| X-MFA-Code | string | ✓ for [verify](#verify-an-mfa-method), [deactivate](#deactivate-an-mfa-method), and [protected requests](#send-requests-to-protected-resources) | Code the user received through an MFA method. To get one, [request an MFA code](#request-an-mfa-code). |

## Retrieve MFA methods

To retrieve the MFA methods registered in the project and their status for the authenticated user, send the request:

***
`GET` **/multi-factor-auth-types**
***

### Request

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/multi-factor-auth-types` | Retrieve the MFA methods and their status for the authenticated user. |

### Response

<details>
  <summary>Response sample: retrieve MFA methods</summary>

```json
{
    "data": [
        {
            "type": "multi-factor-auth-types",
            "id": "email",
            "attributes": {
                "type": "email",
                "status": "deactivated"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/multi-factor-auth-types/email"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| type | String | Identifier of the MFA method. It is also the resource `id`. `email` is shipped by default; projects register additional methods through the `MultiFactorAuthPlugin` chain. |
| status | String | Status of the method for the authenticated user: `deactivated`, `activation is pending`, or `activated`. |

| STATUS | DESCRIPTION |
| --- | --- |
| deactivated | The method is registered in the project but not activated for the user. Protected requests do not require a code. |
| activation is pending | The user started the activation but has not verified the code yet. Protected requests do not require a code. |
| activated | The method is activated for the user. Protected requests require a valid `X-MFA-Code` header. |

## Activate an MFA method

Activation takes two steps: start the activation to receive a code through the method, then verify the code. Until the code is verified, the method stays in the `activation is pending` status.

To start the activation, send the request:

***
`POST` **/multi-factor-auth-type-activate**
***

### Request

If the user already has an activated method, the request must carry a valid code of that method in the `X-MFA-Code` header. To get one, [request an MFA code](#request-an-mfa-code).

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| type | String | ✓ | MFA method to activate. To get the registered methods, [retrieve MFA methods](#retrieve-mfa-methods). |

```http
POST /multi-factor-auth-type-activate
Authorization: Bearer <access_token>
Content-Type: application/vnd.api+json

{
    "data": {
        "type": "multi-factor-auth-type-activate",
        "attributes": {
            "type": "email"
        }
    }
}
```

### Response

`204 No Content` means that the method is in the `activation is pending` status and a verification code was sent through it.

## Verify an MFA method

To finish the activation, send the code you received:

***
`POST` **/multi-factor-auth-type-verify**
***

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-MFA-Code | string | ✓ | Code received after [starting the activation](#activate-an-mfa-method). |

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| type | String | ✓ | MFA method with a pending activation. |

```http
POST /multi-factor-auth-type-verify
Authorization: Bearer <access_token>
X-MFA-Code: 482913
Content-Type: application/vnd.api+json

{
    "data": {
        "type": "multi-factor-auth-type-verify",
        "attributes": {
            "type": "email"
        }
    }
}
```

### Response

`204 No Content` means that the method is `activated`. From now on, requests to [protected resources](#send-requests-to-protected-resources) require a valid `X-MFA-Code` header.

## Request an MFA code

To receive a code through an activated method, send the request:

***
`POST` **/multi-factor-auth-trigger**
***

### Request

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| type | String | ✓ | Activated MFA method to send the code through. |

```http
POST /multi-factor-auth-trigger
Authorization: Bearer <access_token>
Content-Type: application/vnd.api+json

{
    "data": {
        "type": "multi-factor-auth-trigger",
        "attributes": {
            "type": "email"
        }
    }
}
```

### Response

`204 No Content` means that the code was sent through the requested method.

A code is valid for the configured validity time, 30 minutes by default, and for the configured number of attempts, three by default. To change them, see [Configure MFA code validity time for users](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html#configure-mfa-code-validity-time-for-users) and [Configure brute-force protection limit for users](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html#configure-brute-force-protection-limit-for-users).

## Deactivate an MFA method

To deactivate an activated method, send a valid code of that method with the request:

***
`POST` **/multi-factor-auth-type-deactivate**
***

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-MFA-Code | string | ✓ | Code received through the method being deactivated. To get one, [request an MFA code](#request-an-mfa-code). |

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| type | String | ✓ | Activated MFA method to deactivate. |

```http
POST /multi-factor-auth-type-deactivate
Authorization: Bearer <access_token>
X-MFA-Code: 482913
Content-Type: application/vnd.api+json

{
    "data": {
        "type": "multi-factor-auth-type-deactivate",
        "attributes": {
            "type": "email"
        }
    }
}
```

### Response

`204 No Content` means that the method is `deactivated`.

## Send requests to protected resources

When the user has an activated MFA method, `POST`, `PATCH`, and `DELETE` requests to the resources listed in `MultiFactorAuthConfig::getMultiFactorAuthProtectedBackendResources()` must carry a valid code in the `X-MFA-Code` header. `GET` requests are never checked. To configure the list, see [Configure protected resources for Backend API](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html#configure-protected-resources-for-backend-api).

To pass such a request, [request an MFA code](#request-an-mfa-code) and add it to the request:

```http
POST /warehouse-user-assignments
Authorization: Bearer <access_token>
X-MFA-Code: 482913
Content-Type: application/vnd.api+json
```

A successful response contains no MFA-specific information. A request without the header gets `403` with the error code `5900`; a request with a wrong, expired, or already used code gets `403` with the error code `5901`.

```json
{
    "errors": [
        {
            "code": "5900",
            "status": 403,
            "detail": "X-MFA-Code header is missing."
        }
    ]
}
```

## Possible errors

| CODE | STATUS | REASON |
| --- | --- | --- |
| 5900 | 403 | The `X-MFA-Code` header is missing. |
| 5901 | 403 | The `X-MFA-Code` header carries a code that is unknown, expired, blocked after too many attempts, or issued for a different method. |
| 5902 | 400 | The `type` attribute is missing. |
| 5903 | 400 | The method to verify is already activated. |
| 5904 | 400 | The method to activate is already activated. |
| 5906 | 400 | `Multi-factor authentication type is not found.`: the method is not registered in the project. `Multi-factor authentication type is not found for the current user.`: the method is registered but not in the status the operation expects for the authenticated user—for example, requesting a code through, or deactivating, a method that is not activated, or verifying a method without a pending activation. |
| 5910 | 503 | The code could not be sent, for example because the mail transport is unavailable. Retry later. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
