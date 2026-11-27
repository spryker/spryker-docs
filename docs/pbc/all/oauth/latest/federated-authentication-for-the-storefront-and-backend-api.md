---
title: Federated Authentication (SSO) for the Storefront API and Backend API
description: Learn how headless frontends sign in customers, Back Office users, and merchant users through the Storefront API and Backend API with an external identity provider.
template: concept-topic-template
last_updated: Nov 27, 2026
related:
  - title: Install Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html
  - title: "Glue API: Authenticate with an identity provider"
    link: docs/pbc/all/oauth/latest/manage-using-glue-api/glue-api-authenticate-with-an-identity-provider.html
---

Headless frontends, such as single-page applications (SPAs), mobile apps, and admin tools, get their Spryker access tokens from the Storefront API or the Backend API. Without Federated Authentication for the APIs, these frontends can sign people in only with a password, even when your Storefront, Back Office, and Merchant Portal already offer sign-in through an external identity provider (IdP).

With Federated Authentication for the APIs, a frontend signs people in with the same IdPs that your browser applications use, and gets the same Spryker access token as with a password. The password sign-in stays available.

This page describes what is specific to the sign-in through the APIs. For the concepts that the APIs share with the browser applications, such as identity records, account matching, and just-in-time provisioning, see [Federated Authentication via OAuth2/OIDC](/docs/pbc/all/oauth/latest/federated-authentication.html).

## What you get

| ASPECT | STOREFRONT API | BACKEND API |
|---|---|---|
| Who signs in | Customers | Back Office users, including warehouse users, and merchant users |
| Access token | The same token as `POST /access-tokens` | The same token as `POST /token` |
| Identity providers | Set up globally or per store | Set up globally |
| Account rules | The same rules as Storefront SSO | The same rules as Back Office SSO |
| Actions after sign-in | The post-authentication plugin stack of the password sign-in runs, for example, the guest cart merge | None |

Both APIs have the same endpoints, request fields, validation rules, and error codes, so one frontend flow serves both APIs.

## How the sign-in works

The sign-in uses the [OAuth 2.0 authorization code flow](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1) with [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636). PKCE protects the authorization code of a frontend that cannot keep a client secret: the frontend creates a random secret, the *code verifier*, and sends only its SHA-256 hash, the *code challenge*, when the sign-in starts. To finish the sign-in, the frontend sends the code verifier. The IdP accepts the authorization code only together with the matching code verifier, so a stolen code is useless to an attacker.

Because the frontend keeps the code verifier and the `state` value, Spryker stores nothing between the calls of a sign-in.

A sign-in has the following steps:

1. The frontend lists the IdPs with `GET /identity-providers` and shows a sign-in button for each of them.
2. The frontend creates a code verifier and its code challenge. It starts the sign-in with `POST /identity-providers/{identityProvider}/authorization-requests` and sends its redirect URI and the code challenge. Spryker checks that the redirect URI is approved for the IdP, and returns the authorization URL of the IdP and a new `state` value.
3. The frontend opens the authorization URL, and the person signs in at the IdP.
4. The IdP redirects the person to the redirect URI with an authorization code and the `state` value. The frontend rejects the redirect if the `state` value differs from the one of step 2.
5. The frontend sends the authorization code, the code verifier, and the redirect URI to `POST /identity-providers/{identityProvider}/access-tokens`. Spryker checks the redirect URI again, exchanges the code with the IdP in the backend, resolves the account of the person, and returns an access token.

For the requests and responses, see [Glue API: Authenticate with an identity provider](/docs/pbc/all/oauth/latest/manage-using-glue-api/glue-api-authenticate-with-an-identity-provider.html).

## Where the identity providers are configured

Each API has its own group of IdPs in the Back Office, under **Configuration > Integrations > Federated Authentication (SSO)**:

- **Storefront API**: you can set up the IdPs globally or per store. `GET /identity-providers` lists the IdPs of the store of the request.
- **Backend API**: you set up the IdPs globally, because Back Office users do not belong to a store.

Each IdP entry names a KnpU client and lists the approved redirect URIs: the addresses of your frontends that may receive the result of a sign-in. Spryker accepts a redirect URI only when it exactly matches an approved one. Spryker does not match prefixes or patterns, and the comparison is case-sensitive. Custom URI schemes of mobile apps, such as `com.example.shop:/oauth2redirect`, are allowed. An IdP entry without redirect URIs accepts no sign-in. Without this check, an attacker could send the result of a sign-in to an address that the attacker controls and sign in as the person.

An API accepts only the IdPs of its own group. A KnpU client that is set up in both API groups is never used by both APIs: Spryker leaves it out of the list, answers with an error, and logs the misconfiguration.

To set up the IdPs, see [Install Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html).

## How accounts are matched

The API sign-in adds no account rules of its own. It matches a person to an account with the same rules as the browser SSO for the same kind of person:

- **Customers** are matched as in Storefront SSO: by the stored identity, then by email. A customer account is created only if your project's Storefront SSO setup creates accounts. For details, see [How Login Works](/docs/pbc/all/oauth/latest/federated-authentication.html#how-login-works) and [Storefront account bootstrapping](/docs/pbc/all/oauth/latest/storefront-account-bootstrapping.html).
- **Back Office users and merchant users** are matched as in Back Office SSO. The just-in-time (JIT) creation of a Back Office user follows your project's Back Office SSO setup. For details, see [Just-in-Time Provisioning: Back Office](/docs/pbc/all/oauth/latest/federated-authentication.html#back-office). A merchant user must already exist: the sign-in never creates a merchant user. Only active users get an access token.

The email of the person comes only from the email field of the IdP or from the `email` or `mail` claim. Spryker never uses the `preferred_username` claim as the email: according to [OpenID Connect Core 1.0, section 5.7](https://openid.net/specs/openid-connect-core-1_0.html#ClaimStability), this claim is not unique and can change, so a person could set it to the email of another person. An IdP that returns no email fails the API sign-in. Request the `email` scope from your IdP.

## Access tokens

An access token from an API sign-in carries the same claims and scopes as a password token of the same person. It works on every resource where the password token works:

- In the Storefront API, the token has the `customer` scope and the same customer data as a token of `POST /access-tokens`, such as the company user and permissions. The response also contains `idCompanyUser`.
- In the Backend API, the token has the `user` scope and the scope of the user type: `back-office-user`, `merchant-user`, or `warehouse-user`.

The API sign-in issues no refresh token. A Spryker token refresh checks only the stored Spryker token and never asks the IdP, so a refresh token would keep a person signed in after the IdP disabled them. Instead, access ends when the access token expires, by default after 8 hours. To continue, the frontend repeats the sign-in. If the session of the person at the IdP is still active, the IdP does not ask the person to sign in again.

An access token stays valid until it expires, even if the IdP disables the person in the meantime.

## Multi-Factor Authentication

In both APIs, Multi-Factor Authentication (MFA) is a check on write requests to protected resources with the `X-MFA-Code` header, not a step of the sign-in. The check treats an access token from an API sign-in the same as a password token of the same person. The API sign-in adds no MFA step and removes none.

To decide whether MFA runs at the IdP, in Spryker, or both, see [Multi-Factor Authentication with SSO](/docs/pbc/all/oauth/latest/multi-factor-authentication-with-sso.html).

## Audit log

Each access token request writes a record to the `security` audit channel: `Successful Login` or `Failed Login`, with the name of the IdP. A record never contains the authorization code, the code verifier, or a token. In the Storefront API, the password sign-in writes no audit record, but the IdP sign-in does.

A failed sign-in answers with a generic error. The reason of the failure is written only to the application log.

## Security considerations

The design of the API sign-in protects the accounts of your users as follows:

- **PKCE is mandatory.** Only the `S256` code challenge method is supported.
- **The frontend checks `state`.** Each authorization request returns a new `state` value. Spryker does not store it, so the frontend must compare it with the `state` value of the redirect.
- **The redirect URI is checked twice**: when the sign-in starts and when it finishes.
- **Spryker issues a token only for a verified code.** Spryker exchanges the authorization code with the IdP in the backend before it issues a token. No API request issues a token for a customer reference or a username alone.

## Risks your project owns

- **Email trust.** On the first sign-in, Spryker links the identity to an existing account with the same email. Spryker does not check the `email_verified` claim. If your IdP can return email addresses that the person has not verified, add the check. For details, see [Reject unverified email addresses](/docs/pbc/all/oauth/latest/extend-federated-authentication-for-the-storefront-and-backend-api.html#reject-unverified-email-addresses).
- **Back Office users created on first sign-in.** If no Back Office user matches the email that the IdP returns, the Backend API sign-in follows your project's Back Office SSO setup for JIT provisioning: the user (`spy_user`) is either created or rejected. For details, see [Just-in-Time Provisioning: Back Office](/docs/pbc/all/oauth/latest/federated-authentication.html#back-office). Add only the IdPs of your own staff to the Backend API group.
- **Shared client registrations.** Spryker checks only that the two API groups do not share a KnpU client. The groups of the Storefront, Back Office, and Merchant Portal are not checked against the API groups. If one client registration at the IdP serves a browser application and an API, only the approved redirect URIs keep their sign-ins apart. Use a separate client registration at the IdP for each application.
- **IdP outage.** When the IdP is not available, the API sign-in with this IdP fails. The password sign-in stays available.

## Limitations

- The feature covers the Storefront API and Backend API of [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html). The legacy Glue REST API is not supported.
- Agent Assist sign-in with `agent-access-tokens` is not supported.
- Sign-in of services without a person, also known as machine-to-machine sign-in, is not supported.
- The password sign-in cannot be turned off for the APIs.
- No refresh token is issued.
- A signed-in person cannot link an additional IdP to their account or unlink one.
- Signing out of Spryker does not sign the person out of the IdP.
