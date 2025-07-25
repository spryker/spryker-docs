---
title: Install the Multi-Factor Authentication feature
description: This document describes how to install the Multi-Factor Authentication (MFA) feature in your Spryker project.
template: feature-integration-guide-template
last_updated: Mar 06, 2025
redirect_from:
  - /docs/pbc/all/multi-factor-authentication/202505.0/install-multi-factor-authentication-feature.html
---

This document describes how to install the [Multi-Factor Authentication (MFA) feature](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html).

## Prerequisites

| FEATURE                     | VERSION          | INSTALLATION  GUIDE                                                                                                                                                                                                                     |
|-----------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                                             |
| Spryker Core Back Office    | 202507.0 | [Install the Spryker Core Back Office feature](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/install-the-spryker-core-back-office-feature.html)                                                                      |
| Customer Account Management | 202507.0 | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)                  |
| Agent assist                | 202507.0 | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html)                                                                                          |
| Glue Rest API               | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)   |
| Back Office dropdown navigation | 202507.0 | [Install Back Office dropdown navigation](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/install-back-office-dropdown-navigation.html) |
| Glue Storefront and Backend API Applications | {{page.version}} | [Integrate Storefront and Backend Glue API applications](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |
| Marketplace Merchant Portal Core             | {{page.version}} | [Install the Marketplace Merchant Portal Core](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)                 |
| Merchant Portal Agent Assist                 | {{page.version}} | [Install the Merchant Portal Agent Assist feature](/docs/pbc/all/user-management/{{page.version}}/marketplace/install-and-upgrade/install-the-merchant-portal-agent-assist-feature.html)                                      |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/multi-factor-auth:"^1.0.0" spryker/multi-factor-auth-extension:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                         |
|--------------------------|--------------------------------------------|
| MultiFactorAuth          | vendor/spryker/multi-factor-auth           |
| MultiFactorAuthExtension | vendor/spryker/multi-factor-auth-extension |

{% endinfo_block %}

## 2) Set up configuration

MFA is configured separately for customers and users (Back Office users and agents). Make sure to define values for both user types by implementing the corresponding methods in the `MultiFactorAuthConfig` class, such as `getCustomerCodeLength()` and `getUserCodeLength()`.

### Configure MFA code length for customers

**src/Pyz/Shared/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Shared\MultiFactorAuth;

use Spryker\Shared\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specifications:
     * - Defines the length of the authentication code for customer.
     * 
     * @api
     *
     * @return int
     */
    public function getCustomerCodeLength(): int
    {
        return 6;
    }
}
```

### Configure MFA code length for users

**src/Pyz/Shared/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Shared\MultiFactorAuth;

use Spryker\Shared\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specification:
     * - Returns the multi-factor authentication code length for user.
     *
     * @api
     *
     * @return int
     */
    public function getUserCodeLength(): int
    {
        return 6;
    }
}
```

### Configure MFA code validity time for customers

Configure the time interval in minutes during which an authentication code is valid by extending the `MultiFactorAuthConfig` class:

**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specifications:
     * - Defines the time interval in minutes during which the authentication code is valid.
     * 
     * @api
     *
     * @return int
     */
    public function getCustomerCodeValidityTtl(): int
    {
        return 30;
    }
}
```

### Configure MFA code validity time for users

Configure the time interval in minutes during which an authentication code is valid by extending the `MultiFactorAuthConfig` class:


**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specification:
     * - Returns the code validity TTL in minutes for user.
     *
     * @api
     *
     * @return int
     */
    public function getUserCodeValidityTtl(): int
    {
        return 30;
    }
}
```



### Configure brute-force protection limit for customers

Configure the maximum number of failed MFA attempts a customer can make before brute force protection is triggered. This is done by extending the `MultiFactorAuthConfig` class:


**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specifications:
     * - Defines the number of failed attempts a customer can make to enter the authentication code in order to prevent brute force attacks.
     * 
     * @api
     *
     * @return int
     */
    public function getCustomerAttemptLimit(): int
    {
        return 3;
    }
}
```



### Configure brute-force protection limit for users

Configure the maximum number of failed MFA attempts a customer can make before brute force protection is triggered. This is done by extending the `MultiFactorAuthConfig` class:


**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specification:
     * - Returns the multi-factor authentication code validation attempt limit for user.
     *
     * @api
     *
     * @return int
     */
    public function getUserAttemptsLimit(): int
    {
        return 3;
    }
}
```


### Configure protected routes and forms for customers

**src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Yves\MultiFactorAuth;

use Spryker\Yves\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * Specifications:
     * - Defines the routes and forms that require MFA authentication.
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

{% info_block warningBox "" %}

You can configure multiple forms on the same page to require MFA authentication.

{% endinfo_block %}


### Configure protected routes and forms for users


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

{% info_block warningBox "" %}

You can configure multiple forms on the same page to require MFA authentication.

{% endinfo_block %}


### Configure protected routes and forms for Glue API

**src/Pyz/Glue/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Glue\MultiFactorAuth;

use Spryker\Glue\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * @return array<string>
     */
    public function getRestApiMultiFactorAuthProtectedResources(): array
    {
        return [
            'YOUR_RESOURCE_NAME',
        ];
    }
}
```


### Configure protected routes for Glue Backend API

{% info_block infoBox "Note" %}

Only resource routes are supported for MFA protection. Custom routes defined via `RouteProviderPlugins` will not be protected by Multi-Factor Authentication.
For more information about Glue Backend API resources, see [Create a Backend resource](/docs/dg/dev/glue-api/latest/routing/create-backend-resources.html).

{% endinfo_block %}

<details>
<summary>src/Pyz/Glue/MultiFactorAuth/MultiFactorAuthConfig.php</summary>

```php
namespace Pyz\Glue\MultiFactorAuth;

use Spryker\Glue\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * @return array<string>
     */
    public function getMultiFactorAuthProtectedBackendResources(): array
    {
        return [
            'YOUR_RESOURCE_NAME',
        ];
    }
}
```
</details>

### Configure protected routes for Glue Storefront API

{% info_block infoBox "Note" %}

Only resource routes are supported for MFA protection. Custom routes defined via `RouteProviderPlugins` will not be protected by Multi-Factor Authentication.
For more information about Glue Storefront API resources, see [Create storefront resources](/docs/dg/dev/glue-api/latest/routing/create-storefront-resources.html).

{% endinfo_block %}

<details>
<summary>src/Pyz/Glue/MultiFactorAuth/MultiFactorAuthConfig.php</summary>

```php
namespace Pyz\Glue\MultiFactorAuth;

use Spryker\Glue\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    /**
     * @return array<string>
     */
    public function getMultiFactorAuthProtectedStorefrontResources(): array
    {
        return [
            'YOUR_RESOURCE_NAME',
        ];
    }
}
```
</details>

### Configure Back Office ACL access

To allow access to MFA requests during the login process in the Back Office, define a public ACL rule.


**config/Shared/config_default.php**

```php
$config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'multi-factor-auth',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
];
```

**src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php**

```php
<?php
namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiConfig as SprykerSecurityGuiConfig;

class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    /**
     * @var string
     */
    protected const IGNORABLE_ROUTE_PATTERN = '^/(...|multi-factor-auth|...)';
}
```

### Configure protected endpoints

{% info_block infoBox %}

Multi-Factor Authentication protection is configured differently for each API type. The Glue REST API is currently the main Storefront API implementation and already has default protected endpoints configured.

The configuration below focuses on additional API types (Backend API and Storefront API). If you're only using REST API, the default configuration is sufficient and no additional steps are needed.

{% endinfo_block %}

#### For Glue Backend API

<details>
<summary>src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php</summary>

```php
namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    public function getProtectedPaths(): array
    {
        return [
            '/multi-factor-auth-types' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-trigger' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-type-activate' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-type-verify' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-type-deactivate' => [
                'isRegularExpression' => false,
            ],
        ];
    }
}
```
</details>

#### For Glue Storefront API

<details>
<summary>src/Pyz/Shared/GlueStorefrontApiApplicationAuthorizationConnector/GlueStorefrontApiApplicationAuthorizationConnectorConfig.php</summary>

```php
namespace Pyz\Shared\GlueStorefrontApiApplicationAuthorizationConnector;

class GlueStorefrontApiApplicationAuthorizationConnectorConfig extends SprykerGlueStorefrontApiApplicationAuthorizationConnectorConfig
{
    public function getProtectedPaths(): array
    {
        return [
            '/multi-factor-auth-types' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-trigger' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-type-activate' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-type-verify' => [
                'isRegularExpression' => false,
            ],
            '/multi-factor-auth-type-deactivate' => [
                'isRegularExpression' => false,
            ],
        ];
    }
}
```
</details>

### Configure the navigation items

To allow Merchant and MerchantAgent users to access the Multi-Factor Authentication setup page via the navigation menu in the Merchant Portal, 
add the following entries to the `config/Zed/navigation-secondary-merchant-portal.xml` file:

#### For Merchant Portal

<details>
<summary>config/Zed/navigation-secondary-merchant-portal.xml</summary>

```xml
<set-up-multi-factor-auth>
    <label>Set up Multi-Factor Authentication</label>
    <title>Set up Multi-Factor Authentication</title>
    <bundle>multi-factor-auth</bundle>
    <controller>user-management-merchant-portal</controller>
    <action>set-up</action>
</set-up-multi-factor-auth>
```
</details>

#### For Merchant Agent Portal

<details>
<summary>config/Zed/navigation-secondary-merchant-portal.xml</summary>

```xml
<set-up-multi-factor-auth-agent>
  <label>Set up Multi-Factor Authentication</label>
  <title>Set up Multi-Factor Authentication</title>
  <bundle>multi-factor-auth</bundle>
  <controller>user-management-agent-merchant-portal</controller>
  <action>set-up</action>
</set-up-multi-factor-auth-agent>
```
</details>

### Configure whitelisted routes 

#### For the Merchant Portal

To allow Multi-Factor Authentication routes to bypass default security restrictions during login or MFA validation flows 
in the Merchant Portal, extend the whitelisted route and path patterns in `SecurityMerchantPortalGuiConfig`:

<details>
<summary>src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiConfig.php</summary>

```php
<?php
namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiConfig as SprykerSecurityMerchantPortalGuiConfig;

class SecurityMerchantPortalGuiConfig extends SprykerSecurityMerchantPortalGuiConfig
{
    protected const MERCHANT_PORTAL_ROUTE_PATTERN = '^/((.+)-merchant-portal-gui|multi-factor-auth/(merchant-user|user-management-merchant-portal))/';

    protected const IGNORABLE_PATH_PATTERN = '^/(security-merchant-portal-gui|multi-factor-auth)';
}
```
</details>

#### For the Agent Merchant Portal

<details>
<summary>src/Pyz/Zed/AgentSecurityMerchantPortalGui/AgentSecurityMerchantPortalGuiConfig.php</summary>

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
        return '^/(agent(.+)-merchant-portal-gui|multi-factor-auth/(agent-merchant-user|user-management-agent-merchant-portal))(?!agent-security-merchant-portal-gui\/login$)/';
    }

    /**
     * @return string
     */
    public function getRoutePatternAgentMerchantPortalLogin(): string
    {
        return '^/(agent-security-merchant-portal-gui/login|multi-factor-auth/agent-merchant-user($|/))';
    }
}
```
</details>

## 3) Set up the database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                               | TYPE  | EVENT |
|-----------------------------------------------|-------|-------|
| spy_customer_multi_factor_auth                | table | added |
| spy_customer_multi_factor_auth_codes          | table | added |
| spy_customer_multi_factor_auth_codes_attempts | table | added |
| spy_user_multi_factor_auth                    | table | added |
| spy_user_multi_factor_auth_codes              | table | added |
| spy_user_multi_factor_auth_codes_attempts     | table | added |

{% endinfo_block %}

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

## 4) Add translations

1. Append glossary according to your configuration:

<details>
<summary>data/import/common/common/glossary.csv</summary>

```csv
multi_factor_auth.multi_factor_auth.list.title,"Set up Multi-Factor Authentication",en_US
multi_factor_auth.multi_factor_auth.list.title,"Multi-Faktor-Authentifizierung einrichten",de_DE
multi_factor_auth.error.invalid_code,"Invalid multi-factor authentication code. You have %remainingAttempts% attempt(s) left.",en_US
multi_factor_auth.error.invalid_code,"Ungültiger Multi-Faktor-Authentifizierungscode. Sie haben %remainingAttempts% Versuch(e) verbleiben.",de_DE
multi_factor_auth.error.attempts_exceeded,"You have exceeded the number of allowed attempts. Please try again after the page has been refreshed.",en_US
multi_factor_auth.error.attempts_exceeded,"Sie haben die Anzahl der zulässigen Versuche überschritten. Bitte versuchen Sie es erneut, nachdem die Seite aktualisiert wurde.",de_DE
multi_factor_auth.error.expired_code,"The multi-factor authentication code has expired. Please try again.",en_US
multi_factor_auth.error.expired_code,"Der Multi-Faktor-Authentifizierungscode ist abgelaufen. Bitte versuchen Sie es erneut.",de_DE
multi_factor_auth.error.authentication_method_not_selected,"Unable to proceed. A multi-factor authentication method must be selected. Please refresh the page and try again or contact support if the problem persists.",en_US
multi_factor_auth.error.authentication_method_not_selected,"Kann nicht fortgesetzt werden. Es muss eine Multi-Faktor-Authentifizierungsmethode ausgewählt werden. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut oder wenden Sie sich an den Support, wenn das Problem weiterhin besteht.",de_DE
multi_factor_auth.error.corrupted_code,"The provided code is empty or invalid. Please try again.",en_US
multi_factor_auth.error.corrupted_code,"Der angegebene Code ist leer oder ungültig. Bitte versuchen Sie es erneut.",de_DE
multi_factor_auth.method.select,"Select Authentication Method",en_US
multi_factor_auth.method.select,"Authentifizierungsmethode auswählen",de_DE
multi_factor_auth.code.validation,"Enter Authentication Code",en_US
multi_factor_auth.code.validation,"Authentifizierungscode eingeben",de_DE
multi_factor_auth.enter_code_for_method,"We sent the authentication code to your %type%. Type it below to continue.",en_US
multi_factor_auth.enter_code_for_method,"Wir haben Ihnen den Authentifizierungscode per %type% gesendet. Geben Sie ihn unten ein, um fortzufahren.",de_DE
multi_factor_auth.access_denied,"Access is strictly restricted until multi-factor authentication verification is successfully completed. Please ensure that JavaScript is enabled in your browser, refresh the page, and try again. If the problem persists, you may need to complete the multi-factor authentication process again.",en_US
multi_factor_auth.access_denied,"Zugriff ist bis zur erfolgreichen Vollziehung der Multi-Faktor-Authentifizierung eingeschränkt. Bitte stellen Sie sicher, dass JavaScript in Ihrem Browser aktiviert ist, die Seite aktualisieren und erneut versuchen. Wenn das Problem weiterhin besteht, sollten Sie die Multi-Faktor-Authentifizierungprozess erneut abschließen.",de_DE
multi_factor_auth.activation.success,"The multi-factor authentication has been activated.",en_US
multi_factor_auth.activation.success,"Die Multi-Faktor-Authentifizierung wurde aktiviert.",de_DE
multi_factor_auth.deactivation.success,"The multi-factor authentication has been deactivated.",en_US
multi_factor_auth.deactivation.success,"Die Multi-Faktor-Authentifizierung wurde deaktiviert.",de_DE
multi_factor_auth.activation.error,"The multi-factor authentication could not be activated.",en_US
multi_factor_auth.activation.error,"Die Multi-Faktor-Authentifizierung konnte nicht aktiviert werden.",de_DE
multi_factor_auth.deactivation.error,"The multi-factor authentication could not be deactivated.",en_US
multi_factor_auth.deactivation.error,"Die Multi-Faktor-Authentifizierung konnte nicht deaktiviert werden.",de_DE
multi_factor_auth.selection.error.required,"Please choose how you would like to verify your identity.",en_US
multi_factor_auth.selection.error.required,"Bitte wählen Sie aus, wie Sie Ihre Identität überprüfen möchten.",de_DE
multi_factor_auth.continue,"Continue",en_US
multi_factor_auth.continue,"Fortfahren",de_DE
multi_factor_auth.verify_code,"Verify Code",en_US
multi_factor_auth.verify_code,"Code überprüfen",de_DE
multi_factor_auth.required_options,"You must choose one option to continue!",en_US
multi_factor_auth.required_options,"Sie müssen eine Option auswählen, um fortzufahren!",de_DE
multi_factor_auth.invalid_csrf_token,"Invalid CSRF token.",en_US
multi_factor_auth.invalid_csrf_token,"Ungültiges CSRF-Token.",de_DE
multi_factor_auth.note_mfa_affects,"Note, any changes made here will also affect how MFA works in other environments like the Back Office, since your accounts are linked.",en_US
multi_factor_auth.note_mfa_affects,"Hinweis: Alle hier vorgenommenen Änderungen wirken sich auch darauf aus, wie MFA in anderen Umgebungen wie dem Back Office funktioniert, da Ihre Konten verknüpft sind.",de_DE
```

</details>

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

## 5) Set up widgets

{% info_block warningBox "Only for customers or agents" %}

Apply the changes in this section only if you're integrating MFA for customers or agents in Yves (Storefront).

{% endinfo_block %}

Register the following plugins to enable widgets:

| PLUGIN                           | SPECIFICATION                                             | PREREQUISITES | NAMESPACE                               |
|----------------------------------|-----------------------------------------------------------|---------------|-----------------------------------------|
| MultiFactorAuthHandlerWidget     | Provides MFA handling functionality.                      |               | SprykerShop\Yves\MultiFactorAuth\Widget |
| SetMultiFactorAuthMenuItemWidget | Adds an MFA menu item to the customer profile navigation. |               | SprykerShop\Yves\MultiFactorAuth\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\MultiFactorAuth\Widget\MultiFactorAuthHandlerWidget;
use Spryker\Yves\MultiFactorAuth\Widget\SetMultiFactorAuthMenuItemWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SetMultiFactorAuthMenuItemWidget::class,
            MultiFactorAuthHandlerWidget::class,
        ];
    }
}
```


## 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                      | PREREQUISITES | NAMESPACE                                                                             |
|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------|
| CustomerMultiFactorAuthenticationHandlerPlugin            | Handles customer login MFA.                                                                                                        |               | Spryker\Yves\MultiFactorAuth\Plugin\AuthenticationHandler\Customer                    |
| UserMultiFactorAuthenticationHandlerPlugin                | Handles user login MFA.                                                                                                            |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\AuthenticationHandler\User           |
| MultiFactorAuthCustomerRouteProviderPlugin                | Provides routes for customer MFA.                                                                                                  |               | Spryker\Yves\MultiFactorAuth\Plugin\Router\Customer                                   |
| MultiFactorAuthAgentRouteProviderPlugin                   | Provides routes for agent user MFA.                                                                                                |               | Spryker\Yves\MultiFactorAuth\Plugin\Router\Agent                                      |
| MultiFactorAuthExtensionFormPlugin                        | Provides customer form validation against corrupted requests.                                                                      |               | Spryker\Yves\MultiFactorAuth\Plugin\Form                                              |
| MultiFactorAuthExtensionFormPlugin                        | Provides user form validation against corrupted requests.                                                                          |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Form                                 |
| RemoveMultiFactorAuthCustomerTableActionExpanderPlugin    | Removes the MFA table action from the customer table in BackOffice.                                                                |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Customer                             |
| PostCustomerLoginMultiFactorAuthenticationPlugin          | Handles customer MFA after successful login.                                                                                       |               | SprykerShop\Yves\CustomerPage\Plugin\MultiFactorAuth                                  |
| PostAgentLoginMultiFactorAuthenticationPlugin             | Handles agent user MFA after successful login.                                                                                     |               | SprykerShop\Yves\AgentPage\Plugin\MultiFactorAuth                                     |
| PostUserLoginMultiFactorAuthenticationPlugin              | Handles user MFA after successful login.                                                                                           |               | Spryker\Zed\SecurityGui\Communication\Plugin\MultiFactorAuth                          |
| MultiFactorAuthSetupNavigationPlugin                      | Adds the optional MFA menu item to the dropdown navigation in BackOffice.                                                          |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation                           |
| MultiFactorAuthRestUserValidatorPlugin                    | Validates requests against MFA for Glue REST API.                                                                                  |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                           |
| MultiFactorAuthTypesResourcePlugin                        | Provides available MFA methods for Glue REST API.                                                                                  |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                           |
| MultiFactorAuthTriggerResourcePlugin                      | Triggers code sending for the provided enabled MFA method for Glue REST API.                                                       |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                           |
| MultiFactorAuthActivateResourcePlugin                     | Triggers code sending the provided MFA method to be activated for Glue REST API.                                                   |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                           |
| MultiFactorAuthDeactivateResourcePlugin                   | Deactivates the provided MFA method for Glue REST API.                                                                             |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                           |
| MultiFactorAuthTypeVerifyResourcePlugin                   | Verifies MFA code and activates the provided MFA method for Glue REST API.                                                         |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                           |
| MultiFactorAuthBackendApiRequestValidatorPlugin           | Validates requests against MFA for Backend API.                                                                                    |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication                         |
| MultiFactorAuthBackendResourcePlugin                      | Provides available MFA methods for Backend API.                                                                                    |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication                         |                    
| MultiFactorAuthTriggerBackendResourcePlugin               | Triggers code sending for the provided enabled MFA method for Backend API.                                                         |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication                         |     
| MultiFactorAuthTypeActivateBackendResourcePlugin          | Triggers code sending the provided MFA method to be activated for Backend API.                                                     |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication                         | 
| MultiFactorAuthTypeDeactivateBackendResourcePlugin        | Deactivates the provided MFA method for Backend API.                                                                               |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication                         |                  
| MultiFactorAuthTypeVerifyBackendResourcePlugin            | Verifies MFA code and activates the provided MFA method for Backend API.                                                           |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication                         |    
| MultiFactorAuthStorefrontApiRequestValidatorPlugin        | Validates requests against MFA for Storefront API.                                                                                 |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication                      |
| MultiFactorAuthStorefrontResourcePlugin                   | Provides available MFA methods for Storefront API.                                                                                 |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication                      |                    
| MultiFactorAuthTriggerStorefrontResourcePlugin            | Triggers code sending for the provided enabled MFA method for Storefront API.                                                      |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication                      |     
| MultiFactorAuthTypeActivateStorefrontResourcePlugin       | Triggers code sending the provided MFA method to be activated for Storefront API.                                                  |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication                      | 
| MultiFactorAuthTypeDeactivateStorefrontResourcePlugin     | Deactivates the provided MFA method for Storefront API.                                                                            |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication                      |                  
| MultiFactorAuthTypeVerifyStorefrontResourcePlugin         | Verifies MFA code and activates the provided MFA method for Storefront API.                                                        |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication                      |
| UserMultiFactorAuthAclEntityConfigurationExpanderPlugin   | Provides ACL entity configuration for a merchant user.                                                                             |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\AclMerchantPortal                    |
| MerchantUserMultiFactorAuthenticationHandlerPlugin        | Handles merchant user login MFA.                                                                                                   |               | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\AuthenticationHandler      |
| PostMerchantUserLoginMultiFactorAuthenticationPlugin      | Handles merchant user MFA after successful login.                                                                                  |               | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth            |
| MerchantAgentUserMultiFactorAuthenticationHandlerPlugin   | Handles agent merchant user login MFA.                                                                                             |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\AuthenticationHandler |
| PostAgentMerchantUserLoginMultiFactorAuthenticationPlugin | Handles agent merchant user MFA after successful login.                                                                            |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth       |
| MerchantPortalNavigationItemCollectionFilterPlugin        | Controls visibility of the MFA setup option in Merchant Portal navigation menu based on user role and available MFA methods.       |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation                           |
| AgentMerchantPortalNavigationItemCollectionFilterPlugin   | Controls visibility of the MFA setup option in Agent Merchant Portal navigation menu based on user role and available MFA methods. |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation                           |
| MultiFactorAuthenticationMerchantUserSecurityPlugin       | Registers merchant user provider  .                                                                                                |               | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth            |
| MultiFactorAuthenticationAgentMerchantUserSecurityPlugin  | Registers agent merchant user provider .                                                                                           |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth       |



### Register the plugins for customers


**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\MultiFactorAuth\Plugin\AuthenticationHandler\Customer\CustomerMultiFactorAuthenticationHandlerPlugin;
use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    protected function getCustomerAuthenticationHandlerPlugins(): array
    {
        return [
            new CustomerMultiFactorAuthenticationHandlerPlugin(),
        ];
    }
}
```



**src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthDependencyProvider.php**

```php
namespace Pyz\Yves\MultiFactorAuth;

use SprykerShop\Yves\CustomerPage\Plugin\MultiFactorAuth\PostCustomerLoginMultiFactorAuthenticationPlugin;
use Spryker\Yves\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    protected function getPostLoginMultiFactorAuthenticationPlugins(): array
    {
        return [
            new PostCustomerLoginMultiFactorAuthenticationPlugin(),
        ];
    }
}
```


**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use Spryker\Yves\MultiFactorAuth\Plugin\Router\Customer\MultiFactorAuthCustomerRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    protected function getRouteProvider(): array
    {
        return [
            new MultiFactorAuthCustomerRouteProviderPlugin(),
        ];
    }
}
```



**src/Pyz/Yves/Form/FormDependencyProvider.php**

```php
namespace Pyz\Yves\Form;

use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Yves\MultiFactorAuth\Plugin\Form\MultiFactorAuthExtensionFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    protected function getFormPlugins(): array
    {
        return [
            new MultiFactorAuthExtensionFormPlugin(),
        ];
    }
}
```



### Register the plugins for agent users


**src/Pyz/Yves/AgentPage/AgentPageDependencyProvider.php**

```php
namespace Pyz\Yves\AgentPage;

use Spryker\Yves\MultiFactorAuth\Plugin\AuthenticationHandler\Agent\AgentUserMultiFactorAuthenticationHandlerPlugin;
use SprykerShop\Yves\AgentPage\AgentPageDependencyProvider as SprykerShopAgentPageDependencyProvider;

class AgentPageDependencyProvider extends SprykerShopAgentPageDependencyProvider
{
    protected function getAgentUserAuthenticationHandlerPlugins(): array
    {
        return [
            new AgentUserMultiFactorAuthenticationHandlerPlugin(),
        ];
    }
}
```



**src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthDependencyProvider.php**

```php
namespace Pyz\Yves\MultiFactorAuth;

use SprykerShop\Yves\AgentPage\Plugin\MultiFactorAuth\PostAgentLoginMultiFactorAuthenticationPlugin;
use Spryker\Yves\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    protected function getPostLoginMultiFactorAuthenticationPlugins(): array
    {
        return [
            new PostAgentLoginMultiFactorAuthenticationPlugin(),
        ];
    }
}
```



**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use Spryker\Yves\MultiFactorAuth\Plugin\Router\Agent\MultiFactorAuthAgentRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    protected function getRouteProvider(): array
    {
        return [
            new MultiFactorAuthAgentRouteProviderPlugin(),
        ];
    }
}
```



**src/Pyz/Yves/Form/FormDependencyProvider.php**

```php
namespace Pyz\Yves\Form;

use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Yves\MultiFactorAuth\Plugin\Form\MultiFactorAuthExtensionFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    protected function getFormPlugins(): array
    {
        return [
            new MultiFactorAuthExtensionFormPlugin(),
        ];
    }
}
```


### Register the plugins for Back Office users


**src/Pyz/Zed/Customer/CustomerDependencyProvider.php**

```php
namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Customer\RemoveMultiFactorAuthCustomerTableActionExpanderPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    protected function getCustomerTableActionExpanderPlugins(): array
    {
        return [
            new RemoveMultiFactorAuthCustomerTableActionExpanderPlugin(),
        ];
    }
}
```


**src/Pyz/Zed/Form/FormDependencyProvider.php**

```php
namespace Pyz\Zed\Form;

use Spryker\Zed\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Form\MultiFactorAuthExtensionFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    protected function getFormPlugins(): array
    {
        return [
            new MultiFactorAuthExtensionFormPlugin(),
        ];
    }
}
```


**src/Pyz/Zed/Gui/GuiDependencyProvider.php**

```php
namespace Pyz\Zed\Gui;

use Spryker\Zed\Gui\GuiDependencyProvider as SprykerGuiDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation\MultiFactorAuthSetupNavigationPlugin;

class GuiDependencyProvider extends SprykerGuiDependencyProvider
{
    protected function getDropdownNavigationPlugins(): array
    {
        return [
            new MultiFactorAuthSetupNavigationPlugin(),
        ];
    }
}
```



**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthDependencyProvider.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;
use Spryker\Zed\SecurityGui\Communication\Plugin\MultiFactorAuth\PostUserLoginMultiFactorAuthenticationPlugin;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    protected function getPostLoginMultiFactorAuthenticationPlugins(): array
    {
        return [
            new PostUserLoginMultiFactorAuthenticationPlugin(),
        ];
    }
}
```



**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\MultiFactorAuth\Communication\Plugin\AuthenticationHandler\User\UserMultiFactorAuthenticationHandlerPlugin;
use Spryker\Zed\SecurityGui\SecurityGuiDependencyProvider as SprykerSecurityGuiDependencyProvider;

class SecurityGuiDependencyProvider extends SprykerSecurityGuiDependencyProvider
{
    protected function getUserAuthenticationHandlerPlugins(): array
    {
        return [
            new UserMultiFactorAuthenticationHandlerPlugin(),
        ];
    }
}
```


### Register the plugins for Glue API


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthActivateResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthRestUserValidatorPlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTriggerResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTypeDeactivateResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTypesResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTypeVerifyResourcePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    protected function getResourceRoutePlugins(): array
    {
        return [
            new MultiFactorAuthTypesResourcePlugin(),
            new MultiFactorAuthTriggerResourcePlugin(),
            new MultiFactorAuthActivateResourcePlugin(),
            new MultiFactorAuthTypeVerifyResourcePlugin(),
            new MultiFactorAuthTypeDeactivateResourcePlugin(),
        ];
    }
    
    protected function getRestUserValidatorPlugins(): array
    {
        return [
            new MultiFactorAuthRestUserValidatorPlugin(),
        ];
    }
}
```


### Register the plugins For Glue Backend API

<details>
<summary>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php</summary>

```php
namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthActivateBackendResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthBackendApiRequestValidatorPlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthTriggerBackendResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthTypeActivateBackendResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthTypeDeactivateBackendResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthTypeVerifyBackendResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueBackendApiApplication\MultiFactorAuthTypesBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    protected function getResourcePlugins(): array
    {
        return [
            new MultiFactorAuthTypesBackendResourcePlugin(),
            new MultiFactorAuthTriggerBackendResourcePlugin(),
            new MultiFactorAuthActivateBackendResourcePlugin(),
            new MultiFactorAuthTypeVerifyBackendResourcePlugin(),
            new MultiFactorAuthTypeDeactivateBackendResourcePlugin(),
            new MultiFactorAuthTypeActivateBackendResourcePlugin(),
        ];
    }
    
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            // This is a crucial part of the MFA integration as this plugin checks all requests to protected resources and enforces Multi-Factor Authentication validation
            new MultiFactorAuthBackendApiRequestValidatorPlugin(),
        ];
    }
}
```

</details>

### Register the plugins For Glue Storefront API

<details>
<summary>src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php</summary>

```php
namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthActivateStorefrontResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthStorefrontApiRequestValidatorPlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTriggerStorefrontResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypeActivateStorefrontResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypeDeactivateStorefrontResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypeVerifyStorefrontResourcePlugin;
use Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypesStorefrontResourcePlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    protected function getResourcePlugins(): array
    {
        return [
            new MultiFactorAuthTypesStorefrontResourcePlugin(),
            new MultiFactorAuthTriggerStorefrontResourcePlugin(),
            new MultiFactorAuthActivateStorefrontResourcePlugin(),
            new MultiFactorAuthTypeVerifyStorefrontResourcePlugin(),
            new MultiFactorAuthTypeDeactivateStorefrontResourcePlugin(),
            new MultiFactorAuthTypeActivateStorefrontResourcePlugin(),
        ];
    }
    
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            // This is a crucial part of the MFA integration as this plugin checks all requests to protected resources and enforces Multi-Factor Authentication validation
            new MultiFactorAuthStorefrontApiRequestValidatorPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure you can authenticate with MFA using Glue API. For instructions, see [Authenticate through MFA](/docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/glue-api-authenticate-through-mfa.html).

{% endinfo_block %}

### Register the plugins For Merchant Portal

<details>
<summary>src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php</summary>

```php
namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\MultiFactorAuth\Communication\Plugin\AclMerchantPortal\UserMultiFactorAuthAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;

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
<summary>src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php</summary>

```php
namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiDependencyProvider as SprykerSecurityMerchantPortalGuiDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\AuthenticationHandler\MerchantUser\MerchantUserMultiFactorAuthenticationHandlerPlugin;

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
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;
use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth\PostMerchantUserLoginMultiFactorAuthenticationPlugin;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
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
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation\MerchantPortalNavigationItemCollectionFilterPlugin;

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

### Register the plugins for Agent Merchant Portal

<details>
<summary>src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php</summary>

```php
namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\MultiFactorAuth\Communication\Plugin\AclMerchantPortal\UserMultiFactorAuthAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;

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
<summary>src/Pyz/Zed/AgentSecurityMerchantPortalGui/AgentSecurityMerchantPortalGuiDependencyProvider.php</summary>

```php
namespace Pyz\Zed\AgentSecurityMerchantPortalGui;

use Spryker\Zed\AgentSecurityMerchantPortalGui\AgentSecurityMerchantPortalGuiDependencyProvider as SprykerAgentSecurityMerchantPortalGuiDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\AuthenticationHandler\MerchantAgentUser\MerchantAgentUserMultiFactorAuthenticationHandlerPlugin;

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
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;
use Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\MultiFactorAuth\PostAgentMerchantUserLoginMultiFactorAuthenticationPlugin;
class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
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
<summary>src/Pyz/Zed/ZedNavigation/ZedNavigationDependencyProvider.php</summary>

```php
namespace Pyz\Zed\ZedNavigation;

use Spryker\Zed\ZedNavigation\ZedNavigationDependencyProvider as SprykerZedNavigationDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation\AgentMerchantPortalNavigationItemCollectionFilterPlugin;

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
<summary>frontend/settings.json</summary>

```javascript
{
    const globalSettings = {
        ...
        paths: {
            ...
            sprykerCore: './vendor/spryker/spryker/Bundles',
            ...
        };
        
    const paths = {
        ...
        sprykerCore: globalSettings.paths.sprykerCore,   
        ...
        };

    return {
        ...
        find: {
            componentEntryPoints: {
                dirs: [
                    ...
                    join(globalSettings.context, paths.sprykerCore),
                    ...
                ],
                ...
            },
            componentStyles: {
                dirs: [
                    ...
                    join(globalSettings.context, paths.sprykerCore),
                    ...
                ],
                ...
            },
            ...
        },
        ... 
    };
}
```

</details>

<details>
<summary>tsconfig.mp.json</summary>

```javascript
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "target": "ES2022",
        "paths": {
            ...
            "@mp/multi-factor-auth": ["vendor/spryker/spryker/Bundles/MultiFactorAuth/mp.public-api.ts"],
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

- Integrate one of the supported MFA methods, see [Multi-Factor Authentication](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.md#multi-factor-authentication-methods).
- Make sure the **Set up Multi-Factor Authentication** menu item is displayed in the navigation menu.
- Clicking the menu should open one the following pages depending on your user:
  - Customers:`https://yves.mysprykershop.com/multi-factor-auth/set`
  - Agents: `https://yves.mysprykershop.com/agent/multi-factor-auth/set`
  - Back Office users: `https://backoffice.mysprykershop.com/multi-factor-auth/user-management/set-up`
  - Merchant Portal users: `https://mp.mysprykershop.com/multi-factor-auth/user-management-merchant-portal/set-up`.
  - Agent Merchant Portal users: `https://mp.mysprykershop.com/multi-factor-auth/user-management-agent-merchant-portal/set-up`.

{% endinfo_block %}
