---
title: Add an OAuth provider
description: How to add a new OAuth2/OIDC provider to an existing Federated Authentication installation.
last_updated: Apr 21, 2026
template: feature-integration-guide-template
---

This guide covers adding a new OAuth2/OIDC provider to an existing SSO installation. Module installation and initial plugin wiring are covered in the [integration guide](install-federated-authentication.md).

For a ready-made local IdP to test against, see [Set up Keycloak for local development](set-up-keycloak-for-local-development.md).

## Prerequisites

You need the following from your Identity Provider before starting:

| Value | Description |
|---|---|
| **Client ID** | Application identifier registered in the IdP |
| **Client secret** | Corresponding secret for the client ID |
| **Authorization server URL** | Base URL of the IdP (e.g. `https://sso.example.com`) |
| **Realm** *(Keycloak only)* | Realm name configured in Keycloak |
| **Redirect URI(s)** | Callback URL(s) you will register in the IdP — one per application (see step 2) |

The redirect URIs follow this pattern:

| Surface | Redirect URI |
|---|---|
| Storefront | `https://yves.mystore.com/login/oauth-callback` |
| Back-office | `https://zed.mystore.com/security-oauth-user/login` |
| Merchant Portal | `https://mp.mystore.com/security-merchant-portal-gui/oauth-login` |

Register these URIs in your IdP as allowed redirect URIs before proceeding.

---

## Step 1 — Install the provider package

Install the composer package for your provider. The package name depends on the provider type — refer to the [KnpU OAuth2 Client Bundle provider documentation](https://github.com/knpuniversity/oauth2-client-bundle#supported-grant-types--oauth2-providers) for the correct package. For example, for Keycloak:

```bash
composer require stevenmaguire/oauth2-keycloak
```

---

## Step 2 — Set environment variables

Add to your deploy config or secrets manager. Replace `{CLIENT_NAME}` with your chosen YAML client key (uppercase, underscores). The further examples in this guide use `MY_SSO_YVES`, `MY_SSO_ZED`, and `MY_SSO_MP` as `{CLIENT_NAME}` for each application respectively.

```bash
# Redirect URIs — one per application, shared across all providers in that application
SPRYKER_OAUTH_REDIRECT_URI_YVES=https://yves.mystore.com/login/oauth-callback
SPRYKER_OAUTH_REDIRECT_URI_ZED=https://zed.mystore.com/security-oauth-user/login
SPRYKER_OAUTH_REDIRECT_URI_MERCHANT_PORTAL=https://mp.mystore.com/security-merchant-portal-gui/oauth-login

# Per-client credentials
SPRYKER_OAUTH_{CLIENT_NAME}_BASE_URL=https://sso.example.com
SPRYKER_OAUTH_{CLIENT_NAME}_REALM=my-realm       # Keycloak only
SPRYKER_OAUTH_{CLIENT_NAME}_CLIENT_ID=my-client-id
SPRYKER_OAUTH_{CLIENT_NAME}_CLIENT_SECRET=<secret>
```

---

## Step 3 — Register the KnpU client

Add a client entry to the YAML for each application you are enabling. The client key (e.g. `my_sso_yves`) is the identifier you will reference in the Spryker config in step 4.

**`config/Yves/packages/knpu_oauth2_client.yaml`**
```yaml
knpu_oauth2_client:
    clients:
        my_sso_yves:
            type: keycloak                                            # see KnpU docs for supported types
            auth_server_url: '%env(SPRYKER_OAUTH_MY_SSO_YVES_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_MY_SSO_YVES_REALM)%'         # Keycloak only
            client_id: '%env(SPRYKER_OAUTH_MY_SSO_YVES_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_MY_SSO_YVES_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_YVES)%'
            redirect_params: {}
```

**`config/Zed/packages/knpu_oauth2_client.yaml`**
```yaml
knpu_oauth2_client:
    clients:
        my_sso_zed:
            type: keycloak
            auth_server_url: '%env(SPRYKER_OAUTH_MY_SSO_ZED_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_MY_SSO_ZED_REALM)%'
            client_id: '%env(SPRYKER_OAUTH_MY_SSO_ZED_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_MY_SSO_ZED_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_ZED)%'
            redirect_params: {}
```

**`config/MerchantPortal/packages/knpu_oauth2_client.yaml`**
```yaml
knpu_oauth2_client:
    clients:
        my_sso_mp:
            type: keycloak
            auth_server_url: '%env(SPRYKER_OAUTH_MY_SSO_MP_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_MY_SSO_MP_REALM)%'
            client_id: '%env(SPRYKER_OAUTH_MY_SSO_MP_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_MY_SSO_MP_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_MERCHANT_PORTAL)%'
            redirect_params: {}
```

Each provider type has its own required fields. `auth_server_url` and `realm` are Keycloak-specific. Refer to the [KnpU provider documentation](https://github.com/knpuniversity/oauth2-client-bundle#supported-grant-types--oauth2-providers) for other provider types.

---

## Step 4 — Register the provider in Spryker config

The `clientName` must match the YAML client key exactly. The `statePrefix` must be unique across all providers in the same application — it is used to route the callback to the correct provider.

**`src/Pyz/Yves/SecurityOauthKnpu/SecurityOauthKnpuConfig.php`**
```php
public function getCustomerProviderConfigs(): array
{
    return [
        (new OauthKnpuProviderConfigTransfer())
            ->setClientName('my_sso_yves')
            ->setStatePrefix('my_sso_yves')
            ->setLinkText('Login with SSO'),
    ];
}
```

**`src/Pyz/Zed/SecurityOauthKnpu/SecurityOauthKnpuConfig.php`**
```php
public function getZedUserProviderConfigs(): array
{
    return [
        (new OauthKnpuProviderConfigTransfer())
            ->setClientName('my_sso_zed')
            ->setStatePrefix('my_sso_zed')
            ->setLinkText('Login with SSO'),
    ];
}

public function getMerchantUserProviderConfigs(): array
{
    return [
        (new OauthKnpuProviderConfigTransfer())
            ->setClientName('my_sso_mp')
            ->setStatePrefix('my_sso_mp')
            ->setLinkText('Login with SSO'),
    ];
}
```

---

## Step 5 — Add a second provider to the same application (optional)

Storefront and Merchant Portal support multiple providers simultaneously — one login button per provider. Add additional YAML client entries and additional `OauthKnpuProviderConfigTransfer` entries to the collection:

```yaml
# config/Yves/packages/knpu_oauth2_client.yaml
knpu_oauth2_client:
    clients:
        my_keycloak_yves:
            type: keycloak
            auth_server_url: '%env(SPRYKER_OAUTH_MY_KEYCLOAK_YVES_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_MY_KEYCLOAK_YVES_REALM)%'
            client_id: '%env(SPRYKER_OAUTH_MY_KEYCLOAK_YVES_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_MY_KEYCLOAK_YVES_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_YVES)%'
            redirect_params: {}
        my_github_yves:
            type: github
            client_id: '%env(SPRYKER_OAUTH_MY_GITHUB_YVES_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_MY_GITHUB_YVES_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_YVES)%'
            redirect_params: {}
```

```php
public function getCustomerProviderConfigs(): array
{
    return [
        (new OauthKnpuProviderConfigTransfer())
            ->setClientName('my_keycloak_yves')
            ->setStatePrefix('my_keycloak_yves')
            ->setLinkText('Login with Corporate SSO'),
        (new OauthKnpuProviderConfigTransfer())
            ->setClientName('my_github_yves')
            ->setStatePrefix('my_github_yves')
            ->setLinkText('Login with GitHub'),
    ];
}
```

> Back-office supports a single provider only.

---

## Verification

1. Open the login page for the configured application.
2. The configured `linkText` button(s) should appear.
3. Clicking a button redirects to the IdP login page.
4. After successful IdP login, you are redirected back and authenticated in Spryker.

If a button does not appear, verify that the collection method returns at least one entry and that the `clientName` matches the YAML key exactly.
