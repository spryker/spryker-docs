---
title: Add an OAuth provider
description: How to add a new OAuth2/OIDC provider to an existing Federated Authentication installation of the Storefront, Back Office, Merchant Portal, Storefront API, or Backend API.
last_updated: Nov 27, 2026
template: feature-integration-guide-template
---

This guide covers adding a new OAuth2/OIDC provider to an existing SSO installation of the Storefront, Back Office, Merchant Portal, Storefront API, or Backend API.

For a ready-made local IdP to test against, see [Set up Keycloak for local development](/docs/pbc/all/oauth/latest/install-and-upgrade/set-up-keycloak-for-local-development.html).

## Prerequisites

SSO must be installed for the application that gets the new provider. Module installation and initial plugin wiring are covered in the integration guides:

- Storefront, Back Office, and Merchant Portal: [Install Federated Authentication via OAuth2/OIDC](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication.html)
- Storefront API and Backend API: [Install Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html)

You need the following from your Identity Provider before starting:

| Value | Description                                                                  |
|---|------------------------------------------------------------------------------|
| **Client ID** | Application identifier registered in the IdP                                 |
| **Client secret** | Corresponding secret for the client ID                                       |
| **Authorization server URL** | Base URL of the IdP (for example, `https://sso.example.com`)                 |
| **Redirect URI** | Callback URL you will register in the IdP — one per browser application, one or more per API (see the following table) |

Depending on the provider type, KnpU might require other values, for example, the realm for Keycloak or the issuer for Okta. For the fields of each provider type, see the configuration examples in the [KnpU OAuth2 Client Bundle documentation](https://github.com/knpuniversity/oauth2-client-bundle#configuration).

The redirect URIs follow this pattern:

| Surface | Redirect URI |
|---|---|
| Storefront | `https://yves.mystore.com/login/oauth-callback` |
| Back Office | `https://zed.mystore.com/security-oauth-user/login` |
| Merchant Portal | `https://mp.mystore.com/security-merchant-portal-gui/oauth-login` |
| Storefront API | The callback URLs of your frontends, for example, `https://shop.mystore.com/auth/callback` or `com.mystore.shop:/oauth2redirect` for a mobile app |
| Backend API | The callback URLs of your frontends for Back Office users and merchant users, for example, `https://admin.mystore.com/auth/callback` |

The browser applications receive the result of a sign-in at a fixed Spryker URL. The APIs return the result to your frontends, so you approve their URLs yourself, in step 4 and step 5.

---

## Step 1 — Install the provider package

Install the composer package for your provider. The package name depends on the provider type — refer to the [KnpU OAuth2 Client Bundle provider documentation](https://github.com/knpuniversity/oauth2-client-bundle#client-downloader-table) for the correct package. For example, for Keycloak:

```bash
composer require stevenmaguire/oauth2-keycloak
```

One package serves all applications of the project.

---

## Step 2 — Set environment variables

The KnpU clients that you add in step 3 read their settings, such as the client ID and the client secret, from environment variables. Make these variables available as environment variables to each application that you enable. For Spryker Cloud environments, see [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html).

---

## Step 3 — Register the KnpU client

Add a client entry to the YAML file of each application you are enabling.

| Application | YAML file |
|---|---|
| Storefront | `config/Yves/packages/knpu_oauth2_client.yaml` |
| Back Office | `config/Zed/packages/knpu_oauth2_client.yaml` |
| Merchant Portal | `config/MerchantPortal/packages/knpu_oauth2_client.yaml` |
| Storefront API | `config/Zed/packages/knpu_oauth2_client.yaml` |
| Backend API | `config/GlueBackend/packages/knpu_oauth2_client.yaml` |

Zed runs the sign-in of the Storefront API, so the Storefront API clients are in the same file as the Back Office client. Add a separate client for each of them.

For example, a Keycloak client:

```yaml
knpu_oauth2_client:
    clients:
        my_sso:
            type: keycloak
            auth_server_url: '%env(OAUTH_BASE_URL)%'
            realm: '%env(OAUTH_REALM)%'
            client_id: '%env(OAUTH_CLIENT_ID)%'
            client_secret: '%env(OAUTH_CLIENT_SECRET)%'
            redirect_route: '%env(OAUTH_REDIRECT_URI)%'
            redirect_params: {}
```

In the example, `my_sso` is the client name that you enter in the Back Office in step 4. For the Storefront, Back Office, and Merchant Portal, `redirect_route` is the Spryker callback URL of the application from the prerequisites. For the Storefront API and Backend API, it is the URL of your frontend that receives the callback. Use different variables for each application.

The Storefront API and Backend API require a client type without built-in PKCE. Do not use a `*_pkce` type, such as `keycloak_pkce`, and do not set the `pkceMethod` option: the frontend creates the PKCE pair of an API sign-in, and a PKCE client type replaces its code challenge, so every sign-in fails.

Each provider type has its own required fields. `auth_server_url` and `realm` are Keycloak-specific. For the `generic` type with OpenID Connect, set `provider_options: { scopeSeparator: ' ' }`, because OpenID Connect expects the scopes separated by spaces. Refer to the [KnpU provider documentation](https://github.com/knpuniversity/oauth2-client-bundle#configuration) for other provider types.

---

## Step 4 — Enable the provider in the Back Office

Spryker uses a KnpU client only after you enable it as a provider of the application. A browser application then shows an SSO button for it, and an API lists it in `GET /identity-providers`.

In the Back Office, go to **Configuration > Integrations > Federated Authentication (SSO)**, and add a provider in the group of the application:

| Group | Scope | Number of providers | Client name defined in |
|---|---|---|---|
| Storefront | Global or store | One or more | `config/Yves/packages/knpu_oauth2_client.yaml` |
| Back Office | Global | One | `config/Zed/packages/knpu_oauth2_client.yaml` |
| Merchant Portal | Global | One or more | `config/MerchantPortal/packages/knpu_oauth2_client.yaml` |
| Storefront API | Global or store | One or more | `config/Zed/packages/knpu_oauth2_client.yaml` |
| Backend API | Global | One or more | `config/GlueBackend/packages/knpu_oauth2_client.yaml` |

For the provider, enter the following values, and save the changes:

- **Client Name**: the YAML client key from step 3, for example `my_sso`. The value must match the key exactly.
- **Login Button Label**: the text of the SSO button, for example `Login with SSO`. The APIs return it as `linkText`, so your frontend can show it on its button.
- **Redirect URIs** (Storefront API and Backend API only): the approved redirect URIs of your frontends from the prerequisites, one per line.

For all provider fields, see [Configure providers](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication.html#5-configure-providers).

Consider the following for the Storefront API and Backend API groups:

- The redirect URI of a sign-in request must match an approved redirect URI exactly. Custom URI schemes of mobile apps, such as `com.mystore.shop:/oauth2redirect`, are allowed. A provider without redirect URIs accepts no sign-in.
- In **OAuth Scopes**, request the `email` scope, for example, `openid, email, profile`. A sign-in without an email fails.
- Do not add the same client name to both API groups. Spryker does not use such a client in at least one of the APIs and logs the misconfiguration.

To offer a provider only in some stores of the Storefront or the Storefront API, select the store in the scope switcher and add the provider there. A store without its own providers uses the global providers.

---

## Step 5 — Configure the client registration at the IdP

The IdP returns the result of a sign-in only to the redirect URIs that the client registration allows.

Use a separate client registration, with its own client ID and secret, for each application. The IdP lets only the client that requested an authorization code redeem it, so a sign-in of one application cannot be completed in another.

Make sure the client registration of each KnpU client from step 3 is set up as follows:

- **Client authentication**: on. Spryker sends the client secret when it exchanges the authorization code.
- **Authorization code flow**: on. In Keycloak, this setting is called **Standard flow**.
- **Valid redirect URIs**: for a browser application, its redirect URI from the prerequisites. For an API, the same addresses as in **Redirect URIs** of the provider in the Back Office.
- **PKCE code challenge method** (Storefront API and Backend API only): `S256`. Spryker exchanges the authorization code with the code verifier of the frontend.

---

## Optional: Step 6 — Add a second provider to the same application

The Storefront, Merchant Portal, Storefront API, and Backend API support multiple providers simultaneously. A browser application shows one login button per provider, and an API lists each provider in `GET /identity-providers`. The Back Office supports a single provider only.

Add a YAML client entry for each provider, and then add a provider for each client in the group of the application in the Back Office. Give each provider a **State Prefix** that is unique in the application, or leave the field empty to use the client name.

If the second provider has a different type than the first, install its package as in [step 1](#step-1--install-the-provider-package). For the Okta client in the following example, run:

```bash
composer require foxworth42/oauth2-okta
```

```yaml
# config/Yves/packages/knpu_oauth2_client.yaml
knpu_oauth2_client:
    clients:
        my_keycloak:
            type: keycloak
            auth_server_url: '%env(OAUTH_KEYCLOAK_BASE_URL)%'
            realm: '%env(OAUTH_KEYCLOAK_REALM)%'
            client_id: '%env(OAUTH_KEYCLOAK_CLIENT_ID)%'
            client_secret: '%env(OAUTH_KEYCLOAK_CLIENT_SECRET)%'
            redirect_route: '%env(OAUTH_REDIRECT_URI)%'
            redirect_params: {}
        my_okta:
            type: okta
            issuer: '%env(OAUTH_OKTA_ISSUER)%'
            client_id: '%env(OAUTH_OKTA_CLIENT_ID)%'
            client_secret: '%env(OAUTH_OKTA_CLIENT_SECRET)%'
            redirect_route: '%env(OAUTH_REDIRECT_URI)%'
            redirect_params: {}
```

In the **Storefront** group, add two providers:

| CLIENT NAME | LOGIN BUTTON LABEL |
|---|---|
| `my_keycloak` | `Login with Corporate SSO` |
| `my_okta` | `Login with Okta` |

For an API, add the clients to the YAML file of the API from step 3, and add the providers with their **Redirect URIs** to the **Storefront API** or **Backend API** group.

---

## Verification

### Storefront, Back Office, and Merchant Portal

1. Open the login page for the configured application.
2. The buttons with the configured **Login Button Label** should appear.
3. Clicking a button redirects to the IdP login page.
4. After successful IdP login, you are redirected back and authenticated in Spryker.

If a button does not appear, check the following:

- The provider is saved in the Back Office group of the application. For the Storefront, it is saved globally or in the scope of the store that you are testing.
- **Client Name** matches the YAML client key exactly.
- For the Storefront, the queue workers are running. The Storefront reads the providers from key-value storage, which is updated after you save the changes in the Back Office.

### Storefront API and Backend API

Complete a sign-in as described in [Glue API: Authenticate with an identity provider](/docs/pbc/all/oauth/latest/manage-using-glue-api/glue-api-authenticate-with-an-identity-provider.html):

1. Send `GET /identity-providers`, and make sure the response lists the provider with your client name as `name`. For the Storefront API, send the `Store` header of a store in which the provider is enabled.
2. Send `POST /identity-providers/{identityProvider}/authorization-requests` with an approved redirect URI and a code challenge. Make sure the response contains `authorizationUrl` and `state`.
3. Open `authorizationUrl` in a browser, and sign in at the IdP.
4. Send `POST /identity-providers/{identityProvider}/access-tokens` with the authorization code from the redirect, the code verifier, and the redirect URI. Make sure the response contains `accessToken`.

If the provider is not listed or a sign-in fails, check the following:

- The provider is saved in the **Storefront API** or **Backend API** group. For the Storefront API, it is saved globally or in the scope of the store of the `Store` header. Otherwise, the API responds with the `006` error.
- **Client Name** matches the client key in the YAML file of the API exactly: `config/Zed/packages/knpu_oauth2_client.yaml` for the Storefront API, `config/GlueBackend/packages/knpu_oauth2_client.yaml` for the Backend API.
- The client name is not used in both API groups.
- The redirect URI of the request matches an approved redirect URI of the provider exactly. Otherwise, the API responds with the `007` error.
- The KnpU client does not use a `*_pkce` type, and the client registration at the IdP accepts PKCE `S256`.
