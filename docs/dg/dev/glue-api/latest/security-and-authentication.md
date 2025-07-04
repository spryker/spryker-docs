---
title: Glue API security and authentication
description: This document describes the authorization mechanism used in Spryker and information about authorization scopes.
last_updated: Oct 24, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202404.0/security-and-authentication.html

---

When exposing information through Spryker Glue API and integrating with third-party applications, it's essential to protect API endpoints from unauthorized access. For this purpose, Spryker provides an authorization mechanism, using which you can request users to authenticate themselves before accessing a resource. For this purpose, Spryker Glue is shipped with an implementation of the OAuth 2.0 protocol. It lets users authenticate themselves with their username and password and receive an access token. The token can then be used to access protected resources.

The authorization mechanism provided by the Glue is flexible and lets you define which endpoints specifically require authentication. Usually, protected endpoints include customer wish lists, carts, personal data, and the like. Also, you may want to protect additional areas as required by your project. In addition to endpoints, you may require authorization to use specific REST verbs. For example, a certain endpoint can allow retrieving information but not modifying it. In this case, the GET verb can be allowed for usage without authentication, while the PUT, PATCH, and DELETE verbs require user authentication to use.

## How authentication works

To authenticate a user, the client must send an authentication request containing required and optional fields based on specified grant type. If the provided credentials match a valid Spryker user, the API responds with the `201` response code and a message containing an access token, also known as a bearer token. The token can then be used to access protected API resources. Schematically, the authentication and authorization scheme of Spryker REST API can be represented as follows:

![auth-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Security+and+Authentication/auth-scheme.png)

Access tokens issued by the API have a limited lifetime. When a token is issued, the response message contains not only the access token but also the duration of its validity, in seconds, and a refresh token. Once the access token expires, the corresponding refresh token can be exchanged for a new pair of access and refresh tokens.

If an invalid or expired token is passed when accessing a protected resource, or no token is passed at all, the API responds with the `401 Unauthorized` response code. This response code also is issued if a user is not authorized to access that particular resource. The response body contains a detailed error message. It is, therefore, the client's responsibility to handle the `401` response code and error messages correctly.

Authentication workflow:
![authentication-workflow.PNG](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Security+and+Authentication/authentication-workflow.png)

## Authorization scopes

The API can secure each endpoint individually. For this purpose, API has scopes. A scope defines, what resources specifically users can access.
Follow the [Authorization scopes integration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authorization-scopes.html) guide and check
[how to use Glue API authorization scopes.](/docs/dg/dev/glue-api/latest/use-glue-api-authorization-scopes.html)
