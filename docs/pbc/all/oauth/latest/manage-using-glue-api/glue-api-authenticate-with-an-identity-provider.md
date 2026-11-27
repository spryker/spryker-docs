---
title: "Glue API: Authenticate with an identity provider"
description: Learn how a frontend signs in customers through the Storefront API, and Back Office users and merchant users through the Backend API, with an external identity provider.
last_updated: Nov 27, 2026
template: glue-api-storefront-guide-template
related:
  - title: Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/federated-authentication-for-the-storefront-and-backend-api.html
  - title: Install Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html
  - title: "Glue API: Authenticate as a customer"
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: "Glue API: Authenticate as a Back Office user"
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
---

These endpoints let a frontend, such as a single-page application (SPA), a mobile app, or an admin tool, sign people in with an external identity provider (IdP) and get a Spryker access token:

- Through the Storefront API, customers sign in.
- Through the Backend API, Back Office users, including warehouse users, and merchant users sign in.

The access token is the same as the token of the password sign-in of the API. For how the sign-in works, see [Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/federated-authentication-for-the-storefront-and-backend-api.html).

## Installation

For the modules that provide the endpoints and how to install them, see [Install Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html).

## Differences between the Storefront API and the Backend API

Both APIs have the same endpoints, request attributes, validation rules, and error codes. The examples on this page use the Storefront API. The following differences apply:

| ASPECT | STOREFRONT API | BACKEND API |
|---|---|---|
| Host in the examples | `https://glue.mysprykershop.com` | `https://glue-backend.mysprykershop.com` |
| Who signs in | Customers | Back Office users, including warehouse users, and merchant users |
| `Store` header | Selects the store whose IdPs apply. | Not used. The IdPs are the same for all stores. |
| `X-Anonymous-Customer-Unique-Id` header | Optional. Identifies the guest customer for the post-authentication plugins, which, by default, merge the guest cart into the customer cart. | Not used. |
| `idCompanyUser` in the access token response | Returned. | Not returned. |
| Access token | The same as the token of `POST /access-tokens`. | The same as the token of `POST /token`. |

## Before you start

**Create a PKCE pair.** For each sign-in, the frontend creates a code verifier and a code challenge as defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636):

- The *code verifier* is a random string of 43 to 128 characters from `A-Z`, `a-z`, `0-9`, `-`, `.`, `_`, and `~`.
- The *code challenge* is the base64url-encoded SHA-256 hash of the code verifier, without padding. It is 43 characters long. Only the `S256` method is supported.

Keep the code verifier in the frontend until the sign-in is finished, and send it only to the access token endpoint. The following example creates the pair in a browser:

```javascript
function base64UrlEncode(bytes) {
    return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const codeVerifier = base64UrlEncode(crypto.getRandomValues(new Uint8Array(32)));
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
const codeChallenge = base64UrlEncode(new Uint8Array(digest));
```

**Send no `Authorization` header.** The sign-in endpoints do not need an access token. If a request contains an `Authorization` header with an expired token, the request fails with the `001` error before the endpoint runs.

## Retrieve identity providers

To retrieve the IdPs that are enabled for the API, send the request:

***
`GET` **/identity-providers**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Store | DE | | Storefront API only. The store whose IdPs you retrieve. |

Request sample: retrieve identity providers

`GET https://glue.mysprykershop.com/identity-providers`

### Response

<details>
<summary>Response sample: retrieve identity providers</summary>

```json
{
    "data": [
        {
            "type": "identity-providers",
            "id": "sso_api_keycloak",
            "attributes": {
                "name": "sso_api_keycloak",
                "linkText": "Sign in with Keycloak"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| name | String | Identifier of the IdP. Use it as `{identityProvider}` in the paths of the sign-in endpoints. |
| linkText | String | Label of the sign-in button of the IdP. |

The list changes only when a Back Office user changes the IdP configuration, so you can cache it in the frontend.

## Retrieve an identity provider

To retrieve one IdP, send the request:

***
`GET` **/identity-providers/*{% raw %}{{{% endraw %}identityProvider{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
|---|---|
| ***{% raw %}{{{% endraw %}identityProvider{% raw %}}}{% endraw %}*** | Name of the IdP. To get it, [retrieve identity providers](#retrieve-identity-providers). |

The request headers and the response attributes are the same as in [Retrieve identity providers](#retrieve-identity-providers). The response contains one IdP. If the IdP is not enabled for the API, the response is the `006` error.

## Start a sign-in

To get the authorization URL of an IdP, send the request:

***
`POST` **/identity-providers/*{% raw %}{{{% endraw %}identityProvider{% raw %}}}{% endraw %}*/authorization-requests**
***

| PATH PARAMETER | DESCRIPTION |
|---|---|
| ***{% raw %}{{{% endraw %}identityProvider{% raw %}}}{% endraw %}*** | Name of the IdP. To get it, [retrieve identity providers](#retrieve-identity-providers). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Content-Type | application/vnd.api+json | &check; | The request body is a JSON:API document. |
| Store | DE | | Storefront API only. The store in which the IdP is enabled. |

Request sample: start a sign-in

`POST https://glue.mysprykershop.com/identity-providers/sso_api_keycloak/authorization-requests`

```json
{
    "data": {
        "type": "identity-provider-authorization-requests",
        "attributes": {
            "redirectUri": "https://shop.example.com/auth/callback",
            "codeChallenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| redirectUri | String | &check; | Address of the frontend to which the IdP returns the person after the sign-in. Must exactly match an approved redirect URI of the IdP in the Back Office. Custom URI schemes of mobile apps, such as `com.example.shop:/oauth2redirect`, are allowed. Maximum 2048 characters. |
| codeChallenge | String | &check; | Code challenge of the PKCE pair: 43 characters of `A-Z`, `a-z`, `0-9`, `-`, and `_`. |

### Response

<details>
<summary>Response sample: start a sign-in</summary>

```json
{
    "data": {
        "type": "identity-provider-authorization-requests",
        "attributes": {
            "authorizationUrl": "https://keycloak.example.com/realms/shop/protocol/openid-connect/auth?response_type=code&client_id=shop&redirect_uri=https%3A%2F%2Fshop.example.com%2Fauth%2Fcallback&scope=openid%20email%20profile&state=kc_3f9a1c2b7d4e5f60718293a4b5c6d7e8&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256",
            "state": "kc_3f9a1c2b7d4e5f60718293a4b5c6d7e8"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| authorizationUrl | String | Authorization URL of the IdP. Open it to let the person sign in at the IdP. |
| state | String | Value that protects the redirect against cross-site request forgery: the state prefix of the IdP, an underscore, and 32 hexadecimal characters. Each request returns a new value. Keep it in the frontend to check the redirect. |

Spryker stores nothing about the request.

## Handle the redirect

After the sign-in, the IdP redirects the person to `redirectUri` with the `code` and `state` query parameters. Before you continue, make sure that `state` equals the value from [Start a sign-in](#start-a-sign-in). If the values differ or `state` is missing, stop the sign-in. If the IdP returns an `error` parameter instead of `code`, the sign-in failed at the IdP.

## Finish a sign-in

To exchange the authorization code for a Spryker access token, send the request:

***
`POST` **/identity-providers/*{% raw %}{{{% endraw %}identityProvider{% raw %}}}{% endraw %}*/access-tokens**
***

| PATH PARAMETER | DESCRIPTION |
|---|---|
| ***{% raw %}{{{% endraw %}identityProvider{% raw %}}}{% endraw %}*** | Name of the IdP of the sign-in. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Content-Type | application/vnd.api+json | &check; | The request body is a JSON:API document. |
| Store | DE | | Storefront API only. The store in which the IdP is enabled. |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | | Storefront API only. Unique identifier of the guest customer. The post-authentication plugins receive it, and, by default, merge the guest cart into the customer cart. |

Request sample: finish a sign-in

`POST https://glue.mysprykershop.com/identity-providers/sso_api_keycloak/access-tokens`

```json
{
    "data": {
        "type": "identity-provider-access-tokens",
        "attributes": {
            "code": "b2f6c1d0-6a5c-4c55-9a52-1e2b3c4d5e6f.9f8e7d6c",
            "codeVerifier": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
            "redirectUri": "https://shop.example.com/auth/callback"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| code | String | &check; | Authorization code from the redirect. A code is valid for one request only. |
| codeVerifier | String | &check; | Code verifier of the PKCE pair: 43 to 128 characters of `A-Z`, `a-z`, `0-9`, `-`, `.`, `_`, and `~`. |
| redirectUri | String | &check; | The same redirect URI as in the request that started the sign-in. Maximum 2048 characters. |

### Response

<details>
<summary>Response sample: finish a sign-in</summary>

```json
{
    "data": {
        "type": "identity-provider-access-tokens",
        "id": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "attributes": {
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "idCompanyUser": "a4af4d59-3f12-5f37-a0fd-8c21764cf7f9"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| accessToken | String | Access token for requests to protected resources. It has the same claims and scopes as a password token of the same person. |
| tokenType | String | Type of the access token. Always `Bearer`. |
| expiresIn | Integer | Time in seconds until the access token expires. |
| idCompanyUser | String | Storefront API only. Unique identifier of the company user of the customer. `null` if the customer is not a company user. |

The response contains no refresh token. When the access token expires, start a new sign-in. If the session of the person at the IdP is still active, the IdP does not ask the person to sign in again.

## Possible errors

| CODE | STATUS | REASON |
|---|---|---|
| 001 | 401 | The request contains an `Authorization` header with an invalid or expired token. Send the request without this header. |
| 003 | 401 | The sign-in failed. For example, the IdP rejected the code or the code verifier, the code expired or was already used, the IdP returned no email, no account was resolved, or the account is restricted or not active. The reason is written to the application log. |
| 006 | 404 | The IdP is not enabled for the API. In the Storefront API, the IdP is not enabled in the store of the request. |
| 007 | 422 | The redirect URI is not an approved redirect URI of the IdP. |
| 901 | 422 | The request is not valid. For example, a required attribute is missing, the code challenge or the code verifier has the wrong format, or the redirect URI is longer than 2048 characters. |

To view generic errors of the Storefront API, see [Reference information: GlueApplication errors](/docs/integrations/spryker-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
