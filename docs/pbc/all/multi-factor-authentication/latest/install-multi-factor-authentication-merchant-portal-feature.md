---
title: Install the Multi-Factor Authentication Merchant Portal feature
description: This document describes how to install the Multi-Factor Authentication Merchant Portal (MFA MP) feature in your Spryker project.
template: feature-integration-guide-template
last_updated: Aug 04, 2025
---

This document describes how to install the [Multi-Factor Authentication (MFA) feature](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html).

## Prerequisites

| FEATURE                          | VERSION          | INSTALLATION  GUIDE                                                                                                                                                                                                                     |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | {{page.version}} | [Install the Marketplace Merchant Portal Core](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)                 |
| Merchant Portal Agent Assist     | {{page.version}} | [Install the Merchant Portal Agent Assist feature](/docs/pbc/all/user-management/{{page.version}}/marketplace/install-and-upgrade/install-the-merchant-portal-agent-assist-feature.html)                                      |
| Multi-Factor Authentication      | {{page.version}} | [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/multi-factor-auth-merchant-portal:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY                               |
|-------------------------------|--------------------------------------------------|
| MultiFactorAuthMerchantPortal | vendor/spryker/multi-factor-auth-merchant-portal |

{% endinfo_block %}

## 2) Set up configuration

Set up the configuration in the following sections.

### Configure protected routes and forms for users

You can configure multiple forms on the same page to require MFA authentication.

**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specifications:
     * - Returns a list of enabled routes and their corresponding forms for user multi-factor authentication in the following format
     * [
     *    'routeName' => ['formName'],
     * ]
     * 
     * @api
     *
     * @return array<string, array<string>>
     */
    public function getEnabledRoutesAndForms(): array
    {
        return [
            'YOUR_ROUTE_NAME' => ['YOUR_FORM_NAME'],
        ];
    }
}
```


### Configure Back Office ACL access

To allow access to MFA requests during the login process in the Back Office, define a public ACL rule.


**config/Shared/config_default.php**

```php
$config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'multi-factor-auth-merchant-portal',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'agent-security-merchant-portal-gui',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    
];
```


### Configure navigation


Add the MFA setup navigation item to one of the following files:

Merchant Portal: `config/Zed/navigation-secondary-merchant-portal.xml`

```xml
<set-up-multi-factor-auth>
    <label>Set up Multi-Factor Authentication</label>
    <title>Set up Multi-Factor Authentication</title>
    <bundle>multi-factor-auth-merchant-portal</bundle>
    <controller>user-management</controller>
    <action>set-up</action>
</set-up-multi-factor-auth>
```

Merchant Agent Portal: `config/Zed/navigation-secondary-merchant-portal.xml`


```xml
<set-up-multi-factor-auth-agent>
  <label>Set up Multi-Factor Authentication</label>
  <title>Set up Multi-Factor Authentication</title>
  <bundle>multi-factor-auth-merchant-portal</bundle>
  <controller>agent-user-management</controller>
  <action>set-up</action>
</set-up-multi-factor-auth-agent>
```





### Configure whitelisted routes 

To allow MFA routes to bypass default security restrictions during login or MFA validation flows in the Merchant Portal, extend the whitelisted route and path patterns in one of the following files

Merchant Portal: `src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiConfig.php`

```php
<?php
namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiConfig as SprykerSecurityMerchantPortalGuiConfig;

class SecurityMerchantPortalGuiConfig extends SprykerSecurityMerchantPortalGuiConfig
{
    /**
     * @var string
     */
    protected const MERCHANT_PORTAL_ROUTE_PATTERN = '^/((.+)-merchant-portal-gui|multi-factor-auth-merchant-portal/(merchant-user|user-management)|_profiler)/';

    /**
     * @var string
     */
    protected const IGNORABLE_PATH_PATTERN = '^/(security-merchant-portal-gui|multi-factor-auth-merchant-portal|_profiler)';
}
```

Agent Merchant Portal: `src/Pyz/Zed/AgentSecurityMerchantPortalGui/AgentSecurityMerchantPortalGuiConfig.php`

```php
<?php
namespace Pyz\Zed\AgentSecurityMerchantPortalGui;

use Spryker\Zed\AgentSecurityMerchantPortalGui\AgentSecurityMerchantPortalGuiConfig as SprykerAgentSecurityMerchantPortalGuiConfig;

class AgentSecurityMerchantPortalGuiConfig extends SprykerAgentSecurityMerchantPortalGuiConfig
{
    /**
     * @return string
     */
    public function getRoutePatternAgentMerchantPortal(): string
    {
        return '^/(agent(.+)-merchant-portal-gui|multi-factor-auth-merchant-portal/(agent-merchant-user|agent-user-management))(?!agent-security-merchant-portal-gui\/login$)/';
    }

    /**
     * @return string
     */
    public function getRoutePatternAgentMerchantPortalLogin(): string
    {
        return '^/(agent-security-merchant-portal-gui/login|multi-factor-auth-merchant-portal/agent-merchant-user($|/))';
    }
}
```

## 3) Set up transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                          | TYPE     | EVENT   | PATH                                                                    |
|-----------------------------------|----------|---------|-------------------------------------------------------------------------|
| MultiFactorAuth                   | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthTransfer                   |
| MultiFactorAuthCode               | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthCodeTransfer               |
| MultiFactorAuthTypesCollection    | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthTypesCollectionTransfer    |
| MultiFactorAuthValidationRequest  | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthValidationRequestTransfer  |
| MultiFactorAuthValidationResponse | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthValidationResponseTransfer |
| MultiFactorAuthCriteria           | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthCriteria                   |
| MultiFactorAuthCodeCriteria       | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthCodeCriteriaTransfer       |

{% endinfo_block %}


## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                      | PREREQUISITES | NAMESPACE                                                                                              |
|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------|
| UserMultiFactorAuthAclEntityConfigurationExpanderPlugin   | Provides ACL entity configuration for a merchant user.                                                                             |               | Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\AclMerchantPortal                       |
| PostMerchantUserLoginMultiFactorAuthenticationPlugin      | Handles merchant user MFA after a successful login.                                                                                  |               | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth                             |
| PostAgentMerchantUserLoginMultiFactorAuthenticationPlugin | Handles agent merchant user MFA after a successful login.                                                                            |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth                        |
| MerchantUserMultiFactorAuthenticationHandlerPlugin        | Handles merchant user login MFA.                                                                                                   |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\AuthenticationHandler\MerchantUser                    |
| MerchantAgentUserMultiFactorAuthenticationHandlerPlugin   | Handles agent merchant user login MFA.                                                                                             |               | Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\AuthenticationHandler\MerchantAgentUser |
| MerchantPortalNavigationItemCollectionFilterPlugin        | Controls visibility of the MFA setup option in Merchant Portal navigation menu based on user role and available MFA methods.       |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation                                            |
| AgentMerchantPortalNavigationItemCollectionFilterPlugin   | Controls visibility of the MFA setup option in Agent Merchant Portal navigation menu based on user role and available MFA methods. |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation                                            |
| MultiFactorAuthenticationMerchantUserSecurityPlugin       | Registers merchant user provider.                                                                                                  |               | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth                             |
| MultiFactorAuthenticationAgentMerchantUserSecurityPlugin  | Registers agent merchant user provider.                                                                                            |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth                        |
| MerchantPortalMultiFactorAuthPluginExpanderPlugin         | Expands the list of MFA plugins.                                                                           |               | Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\Expander                                |


### Register plugins For Merchant Portal

<details>
<summary>src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php</summary>

```php
namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\AclMerchantPortal\UserMultiFactorAuthAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new UserMultiFactorAuthAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\Expander\MerchantPortalMultiFactorAuthPluginExpanderPlugin;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    protected function getMultiFactorAuthPluginExpanderPlugins(): array
    {
        return [
            new MerchantPortalMultiFactorAuthPluginExpanderPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/MultiFactorAuthMerchantPortal/MultiFactorAuthMerchantPortalDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuthMerchantPortal;

use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Factors\Email\UserEmailMultiFactorAuthPlugin;
use Spryker\Zed\MultiFactorAuthMerchantPortal\MultiFactorAuthMerchantPortalDependencyProvider as SprykerMultiFactorAuthMultiFactorAuthMerchantPortalDependencyProvider;
use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth\PostMerchantUserLoginMultiFactorAuthenticationPlugin;

class MultiFactorAuthMerchantPortalDependencyProvider extends SprykerMultiFactorAuthMultiFactorAuthMerchantPortalDependencyProvider
{
    protected function getUserMultiFactorAuthPlugins(): array
    {
        return [
            new UserEmailMultiFactorAuthPlugin(),
        ];
    }

    protected function getPostLoginMultiFactorAuthenticationPlugins(): array
    {
        return [
            new PostMerchantUserLoginMultiFactorAuthenticationPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/ZedNavigation/ZedNavigationDependencyProvider.php</summary>

```php
namespace Pyz\Zed\ZedNavigation;

use Spryker\Zed\ZedNavigation\ZedNavigationDependencyProvider as SprykerZedNavigationDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\Navigation\MerchantPortalNavigationItemCollectionFilterPlugin;

class ZedNavigationDependencyProvider extends SprykerZedNavigationDependencyProvider
{
    protected function getNavigationItemCollectionFilterPlugins(): array
    {
        return [
            // Manages the visibility of the "Set up Multi-Factor Authentication" navigation item in the Merchant Portal UI.
            // It determines whether this option should be shown to users by two key checks:
            // - Checks if there are any MFA plugin methods registered
            // - Verifies if the current user has the Merchant role
            new MerchantPortalNavigationItemCollectionFilterPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php</summary>

```php
namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiDependencyProvider as SprykerSecurityMerchantPortalGuiDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\AuthenticationHandler\MerchantUser\MerchantUserMultiFactorAuthenticationHandlerPlugin;

class SecurityMerchantPortalGuiDependencyProvider extends SprykerSecurityMerchantPortalGuiDependencyProvider
{
    protected function getMerchantUserAuthenticationHandlerPlugins(): array
    {
        return [
            new MerchantUserMultiFactorAuthenticationHandlerPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/Security/SecurityDependencyProvider.php</summary>

```php
namespace Pyz\Zed\Security;

use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth\MultiFactorAuthenticationMerchantUserSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    protected function getSecurityPlugins(): array
    {
        return [
            new MultiFactorAuthenticationMerchantUserSecurityPlugin(),
        ];
    }
}
```
</details>

### Register plugins for Agent Merchant Portal

<details>
<summary>src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php</summary>

```php
namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\AclMerchantPortal\UserMultiFactorAuthAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new UserMultiFactorAuthAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\Expander\MerchantPortalMultiFactorAuthPluginExpanderPlugin;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{   
    protected function getMultiFactorAuthPluginExpanderPlugins(): array
    {
        return [
            new MerchantPortalMultiFactorAuthPluginExpanderPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/MultiFactorAuthMerchantPortal/MultiFactorAuthMerchantPortalDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuthMerchantPortal;

use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Factors\Email\UserEmailMultiFactorAuthPlugin;
use Spryker\Zed\MultiFactorAuthMerchantPortal\MultiFactorAuthMerchantPortalDependencyProvider as SprykerMultiFactorAuthMultiFactorAuthMerchantPortalDependencyProvider;
use Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth\PostAgentMerchantUserLoginMultiFactorAuthenticationPlugin;

class MultiFactorAuthMerchantPortalDependencyProvider extends SprykerMultiFactorAuthMultiFactorAuthMerchantPortalDependencyProvider
{
    protected function getUserMultiFactorAuthPlugins(): array
    {
        return [
            new UserEmailMultiFactorAuthPlugin(),
        ];
    }

    protected function getPostLoginMultiFactorAuthenticationPlugins(): array
    {
        return [
            new PostAgentMerchantUserLoginMultiFactorAuthenticationPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/AgentSecurityMerchantPortalGui/AgentSecurityMerchantPortalGuiDependencyProvider.php</summary>

```php
namespace Pyz\Zed\AgentSecurityMerchantPortalGui;

use Spryker\Zed\AgentSecurityMerchantPortalGui\AgentSecurityMerchantPortalGuiDependencyProvider as SprykerAgentSecurityMerchantPortalGuiDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\AuthenticationHandler\MerchantAgentUser\MerchantAgentUserMultiFactorAuthenticationHandlerPlugin;

class AgentSecurityMerchantPortalGuiDependencyProvider extends SprykerAgentSecurityMerchantPortalGuiDependencyProvider
{
    protected function getMerchantAgentUserAuthenticationHandlerPlugins(): array
    {
        return [
            new MerchantAgentUserMultiFactorAuthenticationHandlerPlugin(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/ZedNavigation/ZedNavigationDependencyProvider.php</summary>

```php
namespace Pyz\Zed\ZedNavigation;

use Spryker\Zed\ZedNavigation\ZedNavigationDependencyProvider as SprykerZedNavigationDependencyProvider;
use Spryker\Zed\MultiFactorAuthMerchantPortal\Communication\Plugin\Navigation\AgentMerchantPortalNavigationItemCollectionFilterPlugin;

class ZedNavigationDependencyProvider extends SprykerZedNavigationDependencyProvider
{
    protected function getNavigationItemCollectionFilterPlugins(): array
    {
        return [
            // Manages the visibility of the "Set up Multi-Factor Authentication" navigation item in the Agent Merchant Portal UI.
            // It determines whether this option should be shown to users by two key checks:
            // - Checks if there are any MFA plugin methods registered
            // - Verifies if the current user has the Merchant Agent role
            new AgentMerchantPortalNavigationItemCollectionFilterPlugin(),
        ];
    }
}
```
</details>

<details>
<summary>src/Pyz/Zed/Security/SecurityDependencyProvider.php</summary>

```php
namespace Pyz\Zed\Security;

use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth\MultiFactorAuthenticationAgentMerchantUserSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    protected function getSecurityPlugins(): array
    {
        return [
            new MultiFactorAuthenticationAgentMerchantUserSecurityPlugin(),
        ];
    }
}
```
</details>

## 7) Set up the frontend

Add the following settings:

<details>
<summary>tsconfig.mp.json</summary>

```javascript
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "target": "ES2022",
        "paths": {
            ...
            "@mp/multi-factor-auth": ["vendor/spryker/spryker/Bundles/MultiFactorAuthMerchantPortal/mp.public-api.ts"],
            ...
        }
    }
}
```

</details>

2. Build the MFA frontend assets:

```bash
docker/sdk up --assets
```

{% info_block warningBox "Verification" %}

1. Integrate one of the [supported MFA methods](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.md#multi-factor-authentication-methods).
2. Log into Merchant Portal or Agent Merchant Portal.
Make sure the following applies:
- The **Set up Multi-Factor Authentication** menu item is displayed in the navigation
- Clicking the menu opens one of the following pages:
  - Merchant Portal users: `https://mp.mysprykershop.com/multi-factor-auth/user-management-merchant-portal/set-up`
  - Agent Merchant Portal users: `https://mp.mysprykershop.com/multi-factor-auth/user-management-agent-merchant-portal/set-up`

{% endinfo_block %}






































