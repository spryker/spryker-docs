---
title: Install Federated Authentication (SSO) for the Storefront API and Backend API
description: Integration guide for letting headless frontends sign in customers, Back Office users, and merchant users through the Storefront API and Backend API with an external identity provider.
last_updated: Nov 27, 2026
template: feature-integration-guide-template
related:
  - title: Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/federated-authentication-for-the-storefront-and-backend-api.html
  - title: "Glue API: Authenticate with an identity provider"
    link: docs/pbc/all/oauth/latest/manage-using-glue-api/glue-api-authenticate-with-an-identity-provider.html
  - title: Extend Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/extend-federated-authentication-for-the-storefront-and-backend-api.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

This document describes how to let headless frontends sign people in through the Storefront API and the Backend API with an external identity provider (IdP). For how the sign-in works, see [Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/federated-authentication-for-the-storefront-and-backend-api.html).

You can install the feature for one API only. In this case, skip the steps and plugins of the other API.

## Prerequisites

Install the following features:

| NAME | VERSION | INSTALLATION GUIDE | NOTE |
|---|---|---|---|
| Federated Authentication | {{page.release_tag}} | [Install Federated Authentication via OAuth2/OIDC](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication.html) | Install steps 1–3. For the Storefront API, also register the plugins of `CustomerDependencyProvider` from *6.1 Storefront*. For the Backend API, also register the plugins of `SecurityOauthUserDependencyProvider` from *6.2 Back-office*. The API sign-in resolves accounts with these plugins. |
| Configuration Management | {{page.release_tag}} | [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-configuration-feature.html) | Provides the Back Office page where you configure the IdPs. |
| API Platform | {{page.release_tag}} | [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html) | |
| API Platform security | {{page.release_tag}} | [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html) | |
| Backend API authentication | {{page.release_tag}} | [Integrate the authentication](/docs/integrations/spryker-api/backend-api/integrate-backend-api/integrate-the-authentication.html) | Required for the Backend API only. |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/auth-rest-api spryker/oauth-backend-api spryker/security-oauth-knpu spryker/oauth spryker/oauth-customer-connector spryker/oauth-user-connector spryker/security-oauth-user spryker/api-platform spryker/store --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|---|---|
| AuthRestApi | vendor/spryker/auth-rest-api |
| AuthRestApiExtension | vendor/spryker/auth-rest-api-extension |
| OauthBackendApi | vendor/spryker/oauth-backend-api |
| OauthBackendApiExtension | vendor/spryker/oauth-backend-api-extension |
| SecurityOauthKnpu | vendor/spryker/security-oauth-knpu |
| Oauth | vendor/spryker/oauth |
| OauthExtension | vendor/spryker/oauth-extension |
| OauthCustomerConnector | vendor/spryker/oauth-customer-connector |
| OauthUserConnector | vendor/spryker/oauth-user-connector |
| OauthUserConnectorExtension | vendor/spryker/oauth-user-connector-extension |
| SecurityOauthUser | vendor/spryker/security-oauth-user |
| ApiPlatform | vendor/spryker/api-platform |
| Store | vendor/spryker/store |

{% endinfo_block %}

## 2) Generate transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
|---|---|---|---|
| IdentityProvider | class | created | src/Generated/Shared/Transfer/IdentityProviderTransfer |
| IdentityProviderCollection | class | created | src/Generated/Shared/Transfer/IdentityProviderCollectionTransfer |
| IdentityProviderCriteria | class | created | src/Generated/Shared/Transfer/IdentityProviderCriteriaTransfer |
| IdentityProviderConditions | class | created | src/Generated/Shared/Transfer/IdentityProviderConditionsTransfer |
| IdentityProviderAuthorizationRequest | class | created | src/Generated/Shared/Transfer/IdentityProviderAuthorizationRequestTransfer |
| IdentityProviderAuthorizationResponse | class | created | src/Generated/Shared/Transfer/IdentityProviderAuthorizationResponseTransfer |
| IdentityProviderAccessTokenRequest | class | created | src/Generated/Shared/Transfer/IdentityProviderAccessTokenRequestTransfer |
| IdentityProviderAccessTokenResponse | class | created | src/Generated/Shared/Transfer/IdentityProviderAccessTokenResponseTransfer |
| OauthIdentityProviderAuthenticationRequest | class | created | src/Generated/Shared/Transfer/OauthIdentityProviderAuthenticationRequestTransfer |
| OauthIdentityProviderAuthenticationResponse | class | created | src/Generated/Shared/Transfer/OauthIdentityProviderAuthenticationResponseTransfer |
| OauthUserResolveRequest | class | created | src/Generated/Shared/Transfer/OauthUserResolveRequestTransfer |
| OauthUserResolveResponse | class | created | src/Generated/Shared/Transfer/OauthUserResolveResponseTransfer |

{% endinfo_block %}

## 3) Configure the KnpU clients

A KnpU client holds the credentials of a client registration at your IdP. Spryker uses it to build the authorization URL and to exchange the authorization code. Where you configure the client depends on the API:

- **Storefront API**: Zed builds the authorization URL and exchanges the code, and the Storefront API calls Zed through the backend gateway. Configure the clients in the Zed configuration. The Storefront API needs no KnpU configuration.
- **Backend API**: the Backend API runs the sign-in in the Glue Backend process. Configure the clients in the Glue Backend configuration.

Install the Composer package of your IdP type. The examples in this guide use Keycloak:

```bash
composer require stevenmaguire/oauth2-keycloak
```

For other IdP types, see the [KnpU OAuth2 Client Bundle provider list](https://github.com/knpuniversity/oauth2-client-bundle#client-downloader-table). If a client type has no installed package, the container build of the whole application fails.

The following rules apply to the KnpU clients of both APIs:

- Set `redirect_route` to an absolute URL. KnpU requires the field, and each request replaces its value with the approved redirect URI of the request.
- Do not use a `*_pkce` client type, and do not set the `pkceMethod` option. Otherwise, the provider replaces the code challenge of the frontend, and every sign-in fails.
- For the `generic` client type with OpenID Connect, set `provider_options: { scopeSeparator: ' ' }`.
- Use a separate client for each API and for each browser application.

### 3.1) Storefront API

Make sure `KnpU\OAuth2ClientBundle\KnpUOAuth2ClientBundle` is registered in `config/Zed/bundles.php`, and add the client:

**config/Zed/packages/knpu_oauth2_client.yaml**

```yaml
knpu_oauth2_client:
    clients:
        # ...
        sso_api_keycloak:
            type: keycloak
            auth_server_url: '%env(OAUTH_SSO_BASE_URL)%'
            realm: '%env(OAUTH_SSO_GLUE_STOREFRONT_REALM)%'
            client_id: '%env(OAUTH_SSO_GLUE_STOREFRONT_CLIENT_ID)%'
            client_secret: '%env(OAUTH_SSO_GLUE_STOREFRONT_CLIENT_SECRET)%'
            redirect_route: '%env(OAUTH_REDIRECT_URI_GLUE_STOREFRONT)%'
            redirect_params: {}
            version: '25.0.0'
```

Set `OAUTH_REDIRECT_URI_GLUE_STOREFRONT` to an absolute URL, for example, the redirect URI of your frontend.

### 3.2) Backend API

Register the KnpU bundle in the Glue Backend application:

**config/GlueBackend/bundles.php**

```php
<?php

use KnpU\OAuth2ClientBundle\KnpUOAuth2ClientBundle;

return [
    // ...
    KnpUOAuth2ClientBundle::class => ['all' => true],
];
```

Add the client:

**config/GlueBackend/packages/knpu_oauth2_client.yaml**

```yaml
knpu_oauth2_client:
    clients:
        sso_backend_api_keycloak:
            type: keycloak
            auth_server_url: '%env(OAUTH_SSO_BASE_URL)%'
            realm: '%env(OAUTH_SSO_GLUE_BACKEND_REALM)%'
            client_id: '%env(OAUTH_SSO_GLUE_BACKEND_CLIENT_ID)%'
            client_secret: '%env(OAUTH_SSO_GLUE_BACKEND_CLIENT_SECRET)%'
            redirect_route: '%env(OAUTH_REDIRECT_URI_GLUE_BACKEND)%'
            redirect_params: {}
            version: '25.0.0'
```

Declare only Backend API clients in this file.

## 4) Configure the identity providers

An API offers only the IdPs of its own group in the Back Office, and only for the redirect URIs that you approve there. This keeps the result of a sign-in away from addresses that you do not control.

If you have not done it yet, sync the configuration schema of the `SecurityOauthKnpu` module:

```bash
console configuration:sync
```

In the Back Office, go to **Configuration > Integrations > Federated Authentication (SSO)**, and add an IdP in the group of each API:

| GROUP | SCOPE | CLIENT NAME DEFINED IN |
|---|---|---|
| Storefront API | Global or store | `config/Zed/packages/knpu_oauth2_client.yaml` |
| Backend API | Global | `config/GlueBackend/packages/knpu_oauth2_client.yaml` |

The fields are the same as in the browser application groups. For their description, see [Configure providers](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication.html#5-configure-providers). The API groups have one more required field, **Redirect URIs**: the approved redirect URIs of your frontends, one per line. Consider the following when you fill in the fields:

- A redirect URI of a request must match an approved redirect URI exactly. Custom URI schemes of mobile apps, such as `com.example.shop:/oauth2redirect`, are allowed. An IdP without redirect URIs accepts no sign-in.
- In **OAuth Scopes**, request the `email` scope, for example, `openid, email, profile`. A sign-in without an email fails.
- Do not add the same client name to both API groups. Spryker does not use such a client in at least one of the APIs and logs the misconfiguration.

To offer different IdPs in a store, select the store in the scope switcher and add the IdPs to the Storefront API group there. A store without its own IdPs uses the global ones.

## 5) Set up behavior

Register the plugins of the APIs you install.

### 5.1) Storefront API

1. Provide the KnpU clients to the backend gateway, and let Zed read the IdPs of the store of the request:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| OauthKnpuClientRegistryApplicationPlugin | Provides the KnpU client registry to the application. Unlike `OauthKnpuApplicationPlugin`, registers no routes. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application |
| StoreScopeConfigurationValueRequestExpanderPlugin | Adds the current store as the scope of a configuration read without a scope. Without this plugin, Zed reads only the global IdPs of the Storefront API group. | Spryker\Zed\Store\Communication\Plugin\Configuration |

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application\OauthKnpuClientRegistryApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        return [
            // ...
            new OauthKnpuClientRegistryApplicationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Configuration/ConfigurationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Configuration;

use Spryker\Zed\Configuration\ConfigurationDependencyProvider as SprykerConfigurationDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Configuration\StoreScopeConfigurationValueRequestExpanderPlugin;

class ConfigurationDependencyProvider extends SprykerConfigurationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationValueRequestExpanderPluginInterface>
     */
    protected function getConfigurationValueRequestExpanderPlugins(): array
    {
        return [
            new StoreScopeConfigurationValueRequestExpanderPlugin(),
        ];
    }
}
```

2. Register the KnpU adapter plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| KnpuCustomerIdentityProviderPlugin | Returns the IdPs of the Storefront API group in the current store. Leaves out IdPs without a KnpU client and IdPs whose client name is also in the Backend API group, and logs the misconfiguration. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi |
| KnpuIdentityProviderAuthorizationStrategyPlugin | Builds the authorization URL of the IdP with a new `state` value and the code challenge of the frontend. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi |
| KnpuIdentityProviderClientStrategyPlugin | Exchanges the authorization code with the code verifier and the redirect URI, and returns the resource owner. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi |

**src/Pyz/Zed/AuthRestApi/AuthRestApiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AuthRestApi;

use Spryker\Zed\AuthRestApi\AuthRestApiDependencyProvider as SprykerAuthRestApiDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi\KnpuCustomerIdentityProviderPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi\KnpuIdentityProviderAuthorizationStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi\KnpuIdentityProviderClientStrategyPlugin;

class AuthRestApiDependencyProvider extends SprykerAuthRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\CustomerIdentityProviderPluginInterface>
     */
    protected function getCustomerIdentityProviderPlugins(): array
    {
        return [
            new KnpuCustomerIdentityProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\IdentityProviderAuthorizationStrategyPluginInterface>
     */
    protected function getIdentityProviderAuthorizationStrategyPlugins(): array
    {
        return [
            new KnpuIdentityProviderAuthorizationStrategyPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\IdentityProviderClientStrategyPluginInterface>
     */
    protected function getIdentityProviderClientStrategyPlugins(): array
    {
        return [
            new KnpuIdentityProviderClientStrategyPlugin(),
        ];
    }
}
```

After a successful sign-in, the Storefront API runs the post-authentication plugins of `getPostAuthPlugins()` in the same dependency provider, as for the password sign-in. For example, `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` merges the guest cart into the customer cart. To add your own actions, see [Run actions after a customer signs in](/docs/pbc/all/oauth/latest/extend-federated-authentication-for-the-storefront-and-backend-api.html#run-actions-after-a-customer-signs-in).

3. Make sure your deployment warms up the backend gateway routes. Otherwise, the gateway answers `404` for the new sign-in calls, and the Storefront API responds with `500`:

```bash
console router:cache:warm-up:backend-gateway
```

### 5.2) Backend API

1. Provide the KnpU clients to the Glue Backend application:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| OauthKnpuClientRegistryApplicationPlugin | Provides the KnpU client registry to the application. Unlike `OauthKnpuApplicationPlugin`, registers no routes. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application\OauthKnpuClientRegistryApplicationPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            // ...
            new OauthKnpuClientRegistryApplicationPlugin(),
        ];
    }
}
```

2. Register the KnpU adapter plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| KnpuUserIdentityProviderPlugin | Returns the IdPs of the Backend API group. Leaves out IdPs without a KnpU client and IdPs whose client name is also in the Storefront API group, and logs the misconfiguration. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\OauthBackendApi |
| KnpuUserIdentityProviderAuthorizationStrategyPlugin | Builds the authorization URL of the IdP with a new `state` value and the code challenge of the frontend. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\OauthBackendApi |
| KnpuUserIdentityProviderClientStrategyPlugin | Exchanges the authorization code with the code verifier and the redirect URI, and returns the resource owner. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\OauthBackendApi |

**src/Pyz/Zed/OauthBackendApi/OauthBackendApiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\OauthBackendApi;

use Spryker\Zed\OauthBackendApi\OauthBackendApiDependencyProvider as SprykerOauthBackendApiDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\OauthBackendApi\KnpuUserIdentityProviderAuthorizationStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\OauthBackendApi\KnpuUserIdentityProviderClientStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\OauthBackendApi\KnpuUserIdentityProviderPlugin;

class OauthBackendApiDependencyProvider extends SprykerOauthBackendApiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\OauthBackendApiExtension\Dependency\Plugin\UserIdentityProviderPluginInterface>
     */
    protected function getUserIdentityProviderPlugins(): array
    {
        return [
            new KnpuUserIdentityProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OauthBackendApiExtension\Dependency\Plugin\IdentityProviderAuthorizationStrategyPluginInterface>
     */
    protected function getIdentityProviderAuthorizationStrategyPlugins(): array
    {
        return [
            new KnpuUserIdentityProviderAuthorizationStrategyPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OauthBackendApiExtension\Dependency\Plugin\IdentityProviderClientStrategyPluginInterface>
     */
    protected function getIdentityProviderClientStrategyPlugins(): array
    {
        return [
            new KnpuUserIdentityProviderClientStrategyPlugin(),
        ];
    }
}
```

3. Register the plugin that resolves the Back Office user of a resource owner with the Back Office SSO rules:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| OauthUserResourceOwnerResolverPlugin | Resolves the user with the authentication strategy, post-resolve, and restriction plugins of `SecurityOauthUserDependencyProvider`, the same as the Back Office sign-in. Applies to every resource owner, so register project plugins that serve one IdP only before it. | Spryker\Zed\SecurityOauthUser\Communication\Plugin\OauthUserConnector |

**src/Pyz/Zed/OauthUserConnector/OauthUserConnectorDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\OauthUserConnector;

use Spryker\Zed\OauthUserConnector\OauthUserConnectorDependencyProvider as SprykerOauthUserConnectorDependencyProvider;
use Spryker\Zed\SecurityOauthUser\Communication\Plugin\OauthUserConnector\OauthUserResourceOwnerResolverPlugin;

class OauthUserConnectorDependencyProvider extends SprykerOauthUserConnectorDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\OauthUserConnectorExtension\Dependency\Plugin\OauthUserResourceOwnerResolverPluginInterface>
     */
    protected function getOauthUserResourceOwnerResolverPlugins(): array
    {
        return [
            new OauthUserResourceOwnerResolverPlugin(),
        ];
    }
}
```

### 5.3) Register the identity provider grant

The access token of an API sign-in is issued by the `identity_provider` grant of the `Oauth` module. The grant first lets an authenticator plugin exchange the authorization code at the IdP. Then, it passes only the resource owner that the IdP returned to the user provider plugins, which resolve the account.

| PLUGIN | SPECIFICATION | API | NAMESPACE |
|---|---|---|---|
| CustomerIdentityProviderOauthRequestGrantTypeConfigurationProviderPlugin | Provides the configuration of the `identity_provider` grant for requests of the Storefront API. | Storefront API | Spryker\Zed\Oauth\Communication\Plugin\Oauth |
| CustomerOauthIdentityProviderAuthenticatorPlugin | Checks the IdP and the redirect URI, and exchanges the authorization code with the first applicable client strategy plugin. | Storefront API | Spryker\Zed\AuthRestApi\Communication\Plugin\Oauth |
| CustomerIdentityProviderOauthUserProviderPlugin | Resolves the customer of the resource owner with the OAuth plugins of `CustomerDependencyProvider`. | Storefront API | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth |
| CustomerIdentityProviderOauthScopeProviderPlugin | Adds the customer scopes, so the token grants the same access as a password token. | Storefront API | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth |
| UserIdentityProviderOauthRequestGrantTypeConfigurationProviderPlugin | Provides the configuration of the `identity_provider` grant for requests of the Backend API. | Backend API | Spryker\Zed\Oauth\Communication\Plugin\Oauth |
| UserOauthIdentityProviderAuthenticatorPlugin | Checks the IdP and the redirect URI, and exchanges the authorization code with the first applicable client strategy plugin. | Backend API | Spryker\Zed\OauthBackendApi\Communication\Plugin\Oauth |
| UserIdentityProviderOauthUserProviderPlugin | Resolves the user of the resource owner with the resolver plugins of `OauthUserConnectorDependencyProvider`. Accepts only active users. | Backend API | Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth |
| UserIdentityProviderOauthScopeProviderPlugin | Adds the same scopes as for a password token of the user, including the scope of the user type. | Backend API | Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth |

**src/Pyz/Zed/Oauth/OauthDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Oauth;

use Spryker\Zed\AuthRestApi\Communication\Plugin\Oauth\CustomerOauthIdentityProviderAuthenticatorPlugin;
use Spryker\Zed\Oauth\Communication\Plugin\Oauth\CustomerIdentityProviderOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\Communication\Plugin\Oauth\UserIdentityProviderOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthBackendApi\Communication\Plugin\Oauth\UserOauthIdentityProviderAuthenticatorPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerIdentityProviderOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerIdentityProviderOauthUserProviderPlugin;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth\UserIdentityProviderOauthScopeProviderPlugin;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth\UserIdentityProviderOauthUserProviderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface>
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            // ...
            new CustomerIdentityProviderOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface>
     */
    protected function getOauthUserProviderPlugins(): array
    {
        return [
            // ...
            new UserIdentityProviderOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface>
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            // ...
            new CustomerIdentityProviderOauthScopeProviderPlugin(),
            new UserIdentityProviderOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface>
     */
    protected function getOauthRequestGrantTypeConfigurationProviderPlugins(): array
    {
        return [
            // ...
            new CustomerIdentityProviderOauthRequestGrantTypeConfigurationProviderPlugin(),
            new UserIdentityProviderOauthRequestGrantTypeConfigurationProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthIdentityProviderAuthenticatorPluginInterface>
     */
    protected function getOauthIdentityProviderAuthenticatorPlugins(): array
    {
        return [
            new CustomerOauthIdentityProviderAuthenticatorPlugin(),
            new UserOauthIdentityProviderAuthenticatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Warning" %}

The user provider plugins do not verify the authorization code themselves. They rely on the grant, which passes only the resource owner that an authenticator plugin verified at the IdP. Do not register a grant type of your own with the identifier `identity_provider`, and register only authenticator plugins that exchange the code at the IdP themselves.

{% endinfo_block %}

## 6) Configure the audit log of the Storefront API

Each access token request of an API sign-in writes a `Successful Login` or `Failed Login` record to the `security` audit channel. The Storefront API needs an audit logger configuration for these records. Without it, the records are dropped.

**config/Shared/config_default.php**

```php
use Spryker\Glue\Log\Plugin\Log\GlueSecurityAuditLoggerConfigPlugin;
use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_STOREFRONT] = [
    GlueSecurityAuditLoggerConfigPlugin::class,
];
```

## 7) Set up the client registrations at the identity provider

Spryker exchanges the authorization code with the client secret and the code verifier, so the client registration at your IdP must accept both. For example, in Keycloak, set up a separate client for each API as follows:

- **Client authentication**: on.
- **Standard flow**: on.
- **Proof Key for Code Exchange Code Challenge Method**: `S256`.
- **Valid redirect URIs**: the same addresses as in **Redirect URIs** of the IdP in the Back Office.
- The IdP must return the email of the person. Request the `email` scope.

To run Keycloak locally, see [Set up Keycloak for local development](/docs/pbc/all/oauth/latest/install-and-upgrade/set-up-keycloak-for-local-development.html).

{% info_block warningBox "Verification" %}

For each API you installed, complete a sign-in as described in [Glue API: Authenticate with an identity provider](/docs/pbc/all/oauth/latest/manage-using-glue-api/glue-api-authenticate-with-an-identity-provider.html):

1. Send `GET /identity-providers`, and make sure the response lists the IdP you configured. For the Storefront API, send the `Store` header of a store in which the IdP is enabled.
2. Send `POST /identity-providers/{identityProvider}/authorization-requests` with an approved redirect URI and a code challenge. Make sure the response contains `authorizationUrl` and `state`.
3. Open `authorizationUrl` in a browser, and sign in at the IdP.
4. Send `POST /identity-providers/{identityProvider}/access-tokens` with the authorization code from the redirect, the code verifier, and the redirect URI. Make sure the response contains `accessToken` and no `refreshToken`.
5. Send a request to a protected resource with the access token, and make sure you get the same result as with a password token of the same person.
6. Make sure a `Successful Login` record is written to the `security` audit channel.

{% endinfo_block %}

## Troubleshooting

| SYMPTOM | CAUSE | SOLUTION |
|---|---|---|
| `GET /identity-providers` returns an empty list, and an error is logged. | The client name of the IdP has no KnpU client in the YAML file of the API, or the client name is in both API groups. | Add the client to the YAML file of the API from [step 3](#3-configure-the-knpu-clients). Use one client name per API. |
| `GET /identity-providers` returns an empty list, and an error about the configuration is logged. | The value of the API group in the Back Office is not a JSON list, or an entry has no client name. | Fix the IdP entries in the Back Office. |
| The Storefront API lists only the global IdPs, and the IdPs of the store are missing. | `StoreScopeConfigurationValueRequestExpanderPlugin` is not registered. | Register the plugin as described in [5.1) Storefront API](#51-storefront-api). |
| An IdP is listed, but the authorization request returns `404` with code `006`. | The KnpU adapter plugins are not registered. | Register all three KnpU plugins of the API. |
| The Storefront API answers `500` on all sign-in calls. | The backend gateway lacks `OauthKnpuClientRegistryApplicationPlugin`, or the backend gateway routes were not warmed up after the deployment. | Register the plugin, and run `console router:cache:warm-up:backend-gateway`. |
| The Backend API answers `500` on all sign-in calls. | The Glue Backend application lacks `OauthKnpuClientRegistryApplicationPlugin`, or `KnpUOAuth2ClientBundle` is not registered in `config/GlueBackend/bundles.php`. | Register both. |
| The container build fails after you add a client. | The Composer package of the client type is not installed. | Install the package of the client type. |
| Every access token request returns `401` with code `003`. | The IdP rejects the code exchange: wrong client secret, a code that was issued for another redirect URI, or a wrong code verifier. Or the grant plugins of [step 5.3](#53-register-the-identity-provider-grant) are not registered. | Check the application log for the reason, and check the plugins of `OauthDependencyProvider`. |
| The IdP rejects the code verifier. | A `*_pkce` client type or the `pkceMethod` option replaced the code challenge of the frontend. | Use the client type without the `_pkce` suffix, and remove `pkceMethod`. |
| The access token request returns `401` with code `003` for one person only. | No account was resolved, the account is restricted, or the Back Office user is not active. | Check the account, the email claim of the IdP, and the OAuth plugins of `CustomerDependencyProvider` or `SecurityOauthUserDependencyProvider`. |
| With a Keycloak running locally, every access token request returns `401` with code `003`, and the log reports a failed user info request. | Keycloak takes the issuer of a token from the host name of the sign-in. A token issued for another host name fails the user info request of Spryker. | Open the authorization URL at the same Keycloak host name that Zed or the Glue Backend application uses. |
| Protected resources answer `403` with a token from an API sign-in. | The scope provider plugin of the API is not registered. | Register `CustomerIdentityProviderOauthScopeProviderPlugin` or `UserIdentityProviderOauthScopeProviderPlugin`. |
| A sign-in call returns `401` with code `001`. | The request has an `Authorization` header with an expired token. | Send the sign-in calls without the `Authorization` header. |
| No `Successful Login` or `Failed Login` records are written for the Storefront API. | `LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_STOREFRONT` is not set. | Set it as described in [step 6](#6-configure-the-audit-log-of-the-storefront-api). |
| The Storefront API answers `500` after an upgrade, and the log reports a missing class or interface. | The class map or the APCu autoloader cache still lists classes that the upgrade removed. | Run `composer dump-autoload`, with `--apcu` if you use APCu, and clear the Glue cache. |
