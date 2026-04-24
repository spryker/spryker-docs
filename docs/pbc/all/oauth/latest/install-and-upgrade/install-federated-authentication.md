---
title: Install Federated Authentication via OAuth2/OIDC
description: Integration guide for adding SSO to Spryker Storefront, Back-office, and Merchant Portal using KnpU OAuth2 Client Bundle.
last_updated: Apr 21, 2026
template: feature-integration-guide-template
---

## Prerequisites

Install the following required features:

| NAME | VERSION | INSTALLATION GUIDE | NOTE |
|---|---|---|---|
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) | |
| Customer Account Management | {{page.release_tag}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) | |
| Spryker Core Back Office | {{page.release_tag}} | [Install the Spryker Core Back Office feature](https://docs.spryker.com/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-spryker-core-back-office-feature) | Required for Back-office SSO only. Follow the *OAuth 2.0/Open ID Connect Support for Zed login* section. |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/security-oauth-knpu --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|---|---|
| SecurityOauthKnpu | vendor/spryker/security-oauth-knpu |

{% endinfo_block %}

## 2) Set up the database

Apply the database schema changes:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure the following tables have been created:

| TABLE |
|---|
| spy_oauth_knpu_customer_identity |
| spy_oauth_knpu_user_identity |
| spy_oauth_knpu_merchant_user_identity |

{% endinfo_block %}

## 3) Generate transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
|---|---|---|---|
| OauthKnpuProviderConfig | class | created | src/Generated/Shared/Transfer/OauthKnpuProviderConfigTransfer |
| OauthKnpuResourceOwner | class | created | src/Generated/Shared/Transfer/OauthKnpuResourceOwnerTransfer |
| OauthKnpuCustomerIdentity | class | created | src/Generated/Shared/Transfer/OauthKnpuCustomerIdentityTransfer |
| OauthKnpuUserIdentity | class | created | src/Generated/Shared/Transfer/OauthKnpuUserIdentityTransfer |
| OauthKnpuMerchantUserIdentity | class | created | src/Generated/Shared/Transfer/OauthKnpuMerchantUserIdentityTransfer |
| OauthKnpuIdentityCriteria | class | created | src/Generated/Shared/Transfer/OauthKnpuIdentityCriteriaTransfer |
| OauthAuthenticationLink | class | created | src/Generated/Shared/Transfer/OauthAuthenticationLinkTransfer |

{% endinfo_block %}

## 4) Configure OAuth clients

Install the composer package for your provider. The examples in this guide use Keycloak:

```bash
composer require stevenmaguire/oauth2-keycloak
```

For other providers, see the [KnpU OAuth2 Client Bundle provider list](https://github.com/knpuniversity/oauth2-client-bundle#supported-grant-types--oauth2-providers) for the correct package name.

Register your OAuth providers in the KnpU bundle configuration for each application. The `redirect_route` field must be the full callback URL — KnpU uses Symfony's router, and the OAuth callback routes are registered in the Symfony router rather than Spryker's own router. You can use any provider supported by `knpuniversity/oauth2-client-bundle`. For the full list of provider types and their specific fields, see the [KnpU OAuth2 Client Bundle provider documentation](https://github.com/knpuniversity/oauth2-client-bundle#supported-grant-types--oauth2-providers).

### Storefront

**config/Yves/packages/knpu_oauth2_client.yaml**

```yaml
knpu_oauth2_client:
    clients:
        sso_yves:
            type: keycloak
            auth_server_url: '%env(SPRYKER_OAUTH_SSO_YVES_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_SSO_YVES_REALM)%'
            client_id: '%env(SPRYKER_OAUTH_SSO_YVES_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_SSO_YVES_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_YVES)%'
            redirect_params: {}
            version: '25.0.0'
```

Set `SPRYKER_OAUTH_REDIRECT_URI_YVES` to the full callback URL: `https://{YVES_HOST}/login/oauth-callback`.

### Back-office

**config/Zed/packages/knpu_oauth2_client.yaml**

```yaml
knpu_oauth2_client:
    clients:
        sso_zed:
            type: keycloak
            auth_server_url: '%env(SPRYKER_OAUTH_SSO_ZED_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_SSO_ZED_REALM)%'
            client_id: '%env(SPRYKER_OAUTH_SSO_ZED_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_SSO_ZED_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_ZED)%'
            redirect_params: {}
            version: '25.0.0'
```

Set `SPRYKER_OAUTH_REDIRECT_URI_ZED` to the full callback URL: `https://{ZED_HOST}/security-oauth-user/login`.

### Merchant Portal

**config/MerchantPortal/packages/knpu_oauth2_client.yaml**

```yaml
knpu_oauth2_client:
    clients:
        sso_merchant_portal:
            type: keycloak
            auth_server_url: '%env(SPRYKER_OAUTH_SSO_MP_BASE_URL)%'
            realm: '%env(SPRYKER_OAUTH_SSO_MP_REALM)%'
            client_id: '%env(SPRYKER_OAUTH_SSO_MP_CLIENT_ID)%'
            client_secret: '%env(SPRYKER_OAUTH_SSO_MP_CLIENT_SECRET)%'
            redirect_route: '%env(SPRYKER_OAUTH_REDIRECT_URI_MERCHANT_PORTAL)%'
            redirect_params: {}
            version: '25.0.0'
```

Set `SPRYKER_OAUTH_REDIRECT_URI_MERCHANT_PORTAL` to the full callback URL: `https://{MERCHANT_PORTAL_HOST}/security-merchant-portal-gui/oauth-login`.

## 5) Configure providers

Tell `SecurityOauthKnpu` which KnpU clients to use in each application and how to label the login buttons. Each `clientName` must match a key defined in the corresponding `knpu_oauth2_client.yaml`. Each `statePrefix` must be unique per provider in a given application.

### Storefront

**src/Pyz/Yves/SecurityOauthKnpu/SecurityOauthKnpuConfig.php**

```php
<?php

namespace Pyz\Yves\SecurityOauthKnpu;

use Generated\Shared\Transfer\OauthKnpuProviderConfigTransfer;
use Spryker\Yves\SecurityOauthKnpu\SecurityOauthKnpuConfig as SprykerSecurityOauthKnpuConfig;

class SecurityOauthKnpuConfig extends SprykerSecurityOauthKnpuConfig
{
    /**
     * @api
     *
     * @return array<\Generated\Shared\Transfer\OauthKnpuProviderConfigTransfer>
     */
    public function getCustomerProviderConfigs(): array
    {
        return [
            (new OauthKnpuProviderConfigTransfer())
                ->setClientName('sso_yves')
                ->setStatePrefix('sso_yves')
                ->setLinkText('Login with SSO'),
        ];
    }
}
```

### Back-office and Merchant Portal

**src/Pyz/Zed/SecurityOauthKnpu/SecurityOauthKnpuConfig.php**

```php
<?php

namespace Pyz\Zed\SecurityOauthKnpu;

use Generated\Shared\Transfer\OauthKnpuProviderConfigTransfer;
use Spryker\Zed\SecurityOauthKnpu\SecurityOauthKnpuConfig as SprykerSecurityOauthKnpuConfig;

class SecurityOauthKnpuConfig extends SprykerSecurityOauthKnpuConfig
{
    /**
     * @api
     *
     * @return array<\Generated\Shared\Transfer\OauthKnpuProviderConfigTransfer>
     */
    public function getZedUserProviderConfigs(): array
    {
        return [
            (new OauthKnpuProviderConfigTransfer())
                ->setClientName('sso_zed')
                ->setStatePrefix('sso_zed')
                ->setLinkText('Login with SSO'),
        ];
    }

    /**
     * @api
     *
     * @return array<\Generated\Shared\Transfer\OauthKnpuProviderConfigTransfer>
     */
    public function getMerchantUserProviderConfigs(): array
    {
        return [
            (new OauthKnpuProviderConfigTransfer())
                ->setClientName('sso_merchant_portal')
                ->setStatePrefix('sso_merchant_portal')
                ->setLinkText('Login with SSO'),
        ];
    }
}
```

## 6) Set up behavior

### 6.1 Storefront

1. Register the KnpU application plugin and the Storefront route provider:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| OauthKnpuApplicationPlugin | Bridges the KnpU `ClientRegistry` into Spryker DI and registers `/login/oauth-callback` in Symfony Router. | Spryker\Yves\SecurityOauthKnpu\Plugin\Application |
| SecurityOauthKnpuRouteProviderPlugin | Registers the OAuth initiation route in Spryker's Yves router. | Spryker\Yves\SecurityOauthKnpu\Plugin\Router |
| OauthAuthenticationLinksWidget | Renders the SSO login buttons on the login page. Calls `getCustomerAuthenticationLinkPlugins()` to collect links from all registered providers. | SprykerShop\Yves\CustomerPage\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\SecurityOauthKnpu\Plugin\Application\OauthKnpuApplicationPlugin;
use SprykerShop\Yves\CustomerPage\Widget\OauthAuthenticationLinksWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getApplicationPlugins(): array
    {
        return [
            // ...
            new OauthKnpuApplicationPlugin(),
        ];
    }

    protected function getGlobalWidgets(): array
    {
        return [
            // ...
            OauthAuthenticationLinksWidget::class,
        ];
    }
}
```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use Spryker\Yves\SecurityOauthKnpu\Plugin\Router\SecurityOauthKnpuRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new SecurityOauthKnpuRouteProviderPlugin(),
        ];
    }
}
```

2. Register the customer OAuth plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| KnpuCustomerAuthenticationLinkPlugin | Renders the SSO login button on the Storefront login page. | Spryker\Yves\SecurityOauthKnpu\Plugin\CustomerPage |
| KnpuOauthCustomerClientStrategyPlugin | Exchanges the authorization code for a resource owner via KnpU. | Spryker\Yves\SecurityOauthKnpu\Plugin\CustomerPage |
| KnpuOauthCustomerIdentityStrategyPlugin | Resolves the Spryker customer entity from the resource owner claims. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Customer |
| KnpuOauthCustomerIdentityPersistencePlugin | Creates or updates the OAuth identity record for the customer. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Customer |
| CreateCustomerOauthCustomerAuthenticationStrategyPlugin | Creates a new customer account on first SSO login if no account with that email exists. Use this when you want SSO to provision new customers automatically. | Spryker\Zed\Customer\Communication\Plugin\Customer |
| AcceptOnlyOauthCustomerAuthenticationStrategyPlugin | Rejects the login if no existing Spryker customer account matches the IdP email. Use this when customer records are managed externally — for example, imported from a CRM — and you do not want SSO to create accounts. | Spryker\Zed\Customer\Communication\Plugin\Customer |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\SecurityOauthKnpu\Plugin\CustomerPage\KnpuCustomerAuthenticationLinkPlugin;
use Spryker\Yves\SecurityOauthKnpu\Plugin\CustomerPage\KnpuOauthCustomerClientStrategyPlugin;
use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    protected function getCustomerAuthenticationLinkPlugins(): array
    {
        return [
            new KnpuCustomerAuthenticationLinkPlugin(),
        ];
    }

    protected function getOauthCustomerClientStrategyPlugins(): array
    {
        return [
            new KnpuOauthCustomerClientStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Customer/CustomerDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\Communication\Plugin\Customer\AcceptOnlyOauthCustomerAuthenticationStrategyPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Customer\CreateCustomerOauthCustomerAuthenticationStrategyPlugin;
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Customer\KnpuOauthCustomerIdentityPersistencePlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Customer\KnpuOauthCustomerIdentityStrategyPlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
    protected function getOauthCustomerAuthenticationStrategyPlugins(): array
    {
        return [
            new KnpuOauthCustomerIdentityStrategyPlugin(),
            new CreateCustomerOauthCustomerAuthenticationStrategyPlugin(), // or AcceptOnlyOauthCustomerAuthenticationStrategyPlugin
        ];
    }

    protected function getOauthCustomerPostResolvePlugins(): array
    {
        return [
            new KnpuOauthCustomerIdentityPersistencePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Go to the Storefront login page.
2. Make sure the SSO login button is visible.
3. Click the button and complete authentication with your IdP.
4. Make sure you are logged in and redirected to the Storefront.

{% endinfo_block %}

### 6.2 Back-office

1. Register the KnpU application plugin and the authentication link plugin:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| OauthKnpuApplicationPlugin | Bridges the KnpU `ClientRegistry` into Spryker DI and registers the callback routes in Symfony Router. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application |
| KnpuOauthAuthenticationLinkPlugin | Renders the SSO login button on the Back-office login page. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityGui |

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application\OauthKnpuApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    protected function getBackofficeApplicationPlugins(): array
    {
        return [
            // ...
            new OauthKnpuApplicationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiDependencyProvider as SprykerSecurityGuiDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityGui\KnpuOauthAuthenticationLinkPlugin;

class SecurityGuiDependencyProvider extends SprykerSecurityGuiDependencyProvider
{
    protected function getAuthenticationLinkPlugins(): array
    {
        return [
            new KnpuOauthAuthenticationLinkPlugin(),
        ];
    }
}
```

2. Register the back-office user OAuth plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| KnpuOauthUserClientStrategyPlugin | Exchanges the authorization code for a resource owner via KnpU. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthUser |
| KnpuOauthUserIdentityStrategyPlugin | Resolves the Spryker back-office user entity from the resource owner claims. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthUser |
| KnpuOauthUserIdentityPersistencePlugin | Creates or updates the OAuth identity record for the back-office user. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthUser |

**src/Pyz/Zed/SecurityOauthUser/SecurityOauthUserDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SecurityOauthUser;

use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthUser\KnpuOauthUserClientStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthUser\KnpuOauthUserIdentityPersistencePlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthUser\KnpuOauthUserIdentityStrategyPlugin;
use Spryker\Zed\SecurityOauthUser\SecurityOauthUserDependencyProvider as SprykerSecurityOauthUserDependencyProvider;

class SecurityOauthUserDependencyProvider extends SprykerSecurityOauthUserDependencyProvider
{
    protected function getOauthUserClientStrategyPlugins(): array
    {
        return [
            new KnpuOauthUserClientStrategyPlugin(),
        ];
    }

    protected function getOauthUserAuthenticationStrategyPlugins(): array
    {
        return [
            new KnpuOauthUserIdentityStrategyPlugin(),
        ];
    }

    protected function getOauthUserPostResolvePlugins(): array
    {
        return [
            new KnpuOauthUserIdentityPersistencePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Go to the Back-office login page.
2. Make sure the SSO login button is visible.
3. Click the button and complete authentication with your IdP.
4. Make sure you are logged in and redirected to the Back-office dashboard.

{% endinfo_block %}

### 6.3 Merchant Portal

1. Register the KnpU application plugin and the authentication link plugin:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| OauthKnpuApplicationPlugin | Bridges the KnpU `ClientRegistry` into Spryker DI and registers the callback routes in Symfony Router. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application |
| KnpuOauthMerchantUserAuthenticationLinkPlugin | Renders the SSO login button on the Merchant Portal login page. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityMerchantPortalGui |

**src/Pyz/Zed/MerchantPortalApplication/MerchantPortalApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\MerchantPortalApplication;

use Spryker\Zed\MerchantPortalApplication\MerchantPortalApplicationDependencyProvider as SprykerMerchantPortalApplicationDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Application\OauthKnpuApplicationPlugin;

class MerchantPortalApplicationDependencyProvider extends SprykerMerchantPortalApplicationDependencyProvider
{
    protected function getMerchantPortalApplicationPlugins(): array
    {
        return [
            // ...
            new OauthKnpuApplicationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiDependencyProvider as SprykerSecurityMerchantPortalGuiDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityMerchantPortalGui\KnpuOauthMerchantUserAuthenticationLinkPlugin;

class SecurityMerchantPortalGuiDependencyProvider extends SprykerSecurityMerchantPortalGuiDependencyProvider
{
    protected function getMerchantPortalAuthenticationLinkPlugins(): array
    {
        return [
            new KnpuOauthMerchantUserAuthenticationLinkPlugin(),
        ];
    }
}
```

2. Register the merchant user OAuth plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| KnpuOauthMerchantUserClientStrategyPlugin | Exchanges the authorization code for a resource owner via KnpU. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthMerchantPortal |
| KnpuOauthMerchantUserIdentityStrategyPlugin | Resolves the Spryker merchant user entity from the resource owner claims. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthMerchantPortal |
| KnpuOauthMerchantUserIdentityPersistencePlugin | Creates or updates the OAuth identity record for the merchant user. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthMerchantPortal |
| ExistingMerchantUserAuthenticationStrategyPlugin | Resolves merchant users by email on first SSO login. Must be placed after `KnpuOauthMerchantUserIdentityStrategyPlugin` so the identity lookup runs first. | Spryker\Zed\SecurityOauthMerchantPortal\Communication\Plugin\SecurityOauthMerchantPortal |

**src/Pyz/Zed/SecurityOauthMerchantPortal/SecurityOauthMerchantPortalDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SecurityOauthMerchantPortal;

use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthMerchantPortal\KnpuOauthMerchantUserClientStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthMerchantPortal\KnpuOauthMerchantUserIdentityPersistencePlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\SecurityOauthMerchantPortal\KnpuOauthMerchantUserIdentityStrategyPlugin;
use Spryker\Zed\SecurityOauthMerchantPortal\Communication\Plugin\SecurityOauthMerchantPortal\ExistingMerchantUserAuthenticationStrategyPlugin;
use Spryker\Zed\SecurityOauthMerchantPortal\SecurityOauthMerchantPortalDependencyProvider as SprykerSecurityOauthMerchantPortalDependencyProvider;

class SecurityOauthMerchantPortalDependencyProvider extends SprykerSecurityOauthMerchantPortalDependencyProvider
{
    protected function getOauthMerchantUserClientStrategyPlugins(): array
    {
        return [
            new KnpuOauthMerchantUserClientStrategyPlugin(),
        ];
    }

    protected function getOauthMerchantUserAuthenticationStrategyPlugins(): array
    {
        return [
            new KnpuOauthMerchantUserIdentityStrategyPlugin(),
            new ExistingMerchantUserAuthenticationStrategyPlugin(),
        ];
    }

    protected function getOauthMerchantUserPostResolvePlugins(): array
    {
        return [
            new KnpuOauthMerchantUserIdentityPersistencePlugin(),
        ];
    }
}
```

3. Register the Merchant Portal ACL plugins to grant merchant users access to the OAuth identity tables:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| SecurityOauthKnpuMerchantUserAclEntityRuleExpanderPlugin | Expands the ACL entity rule collection with rules for the OAuth identity tables. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AclMerchantPortal |
| SecurityOauthKnpuMerchantUserAclEntityConfigurationExpanderPlugin | Expands the ACL entity configuration with the OAuth identity entity configuration. | Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AclMerchantPortal |

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AclMerchantPortal\SecurityOauthKnpuMerchantUserAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AclMerchantPortal\SecurityOauthKnpuMerchantUserAclEntityRuleExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    protected function getMerchantAclEntityRuleExpanderPlugins(): array
    {
        return [
            // ...
            new SecurityOauthKnpuMerchantUserAclEntityRuleExpanderPlugin(),
        ];
    }

    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            // ...
            new SecurityOauthKnpuMerchantUserAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Go to the Merchant Portal login page.
2. Make sure the SSO login button is visible.
3. Click the button and complete authentication with your IdP.
4. Make sure the merchant user is logged in and redirected to the Merchant Portal dashboard.

{% endinfo_block %}

## Next steps

- [Add an OAuth provider](/docs/pbc/all/oauth/latest/install-and-upgrade/add-an-oauth-provider.md) — wire additional IdP clients per application.
- [Set up Keycloak for local development](/docs/pbc/all/oauth/latest/install-and-upgrade/set-up-keycloak-for-local-development.md) — run a local Keycloak instance to test SSO without an external IdP.
