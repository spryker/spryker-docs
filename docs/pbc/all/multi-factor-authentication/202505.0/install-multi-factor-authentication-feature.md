---
title: Install the Multi-Factor Authentication feature
description: This document describes how to install the Multi-Factor Authentication (MFA) feature in your Spryker project.
template: feature-integration-guide-template
last_updated: Mar 06, 2025
---

This document describes how to install the [Multi-Factor Authentication (MFA) feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication.html).


## Prerequisites

| FEATURE                     | VERSION          | INSTALLATION  GUIDE                                                                                                                                                                                                                     |
|-----------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                                             |
| Spryker Core Back Office    | {{site.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/back-office/202410.0/base-shop/install-and-upgrade/install-the-spryker-core-back-office-feature.html)                                                                      |
| Customer Account Management | {{site.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)                  |
| Agent assist                | {{site.version}} | [Install the Agent Assist feature](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-feature.html)                                                                                          |    
| Glue Rest API               | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)   |


## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/multi-factor-auth:"^0.2.0" spryker/multi-factor-auth-extension:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                         |
|--------------------------|--------------------------------------------|
| MultiFactorAuth          | vendor/spryker/multi-factor-auth           |
| MultiFactorAuthExtension | vendor/spryker/multi-factor-auth-extension |

{% endinfo_block %}

## 2) Set up configuration

MFA is configured separately for customers and users (Back Office users and agents). Make sure to defines values for both user types by implementing the corresponding methods in the `MultiFactorAuthConfig` class–for example, `getCustomerCodeLength()` and `getUserCodeLength()`.

### Configure MFA code length for customers

**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

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

**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

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

**>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php**

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


{% info_block warningBox "" %}

You can configure multiple forms on the same page to require MFA authentication.

{% endinfo_block %}

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

| PLUGIN                           | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                               |
|----------------------------------|---------------------------------------------------|---------------|-----------------------------------------|
| MultiFactorAuthHandlerWidget     | Provides MFA handling functionality.               |               | SprykerShop\Yves\MultiFactorAuth\Widget |
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


### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                 | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                                   |
|--------------------------------------------------------|---------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------|
| CustomerMultiFactorAuthenticationHandlerPlugin         | Handles customer login MFA.                                               |               | Spryker\Yves\MultiFactorAuth\Plugin\AuthenticationHandler\Customer          |
| UserMultiFactorAuthenticationHandlerPlugin             | Handles user login MFA.                                                   |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\AuthenticationHandler\User |
| MultiFactorAuthCustomerRouteProviderPlugin             | Provides routes for customer MFA.                                         |               | Spryker\Yves\MultiFactorAuth\Plugin\Router\Customer                         |
| MultiFactorAuthAgentRouteProviderPlugin                | Provides routes for agent MFA.                                       |               | Spryker\Yves\MultiFactorAuth\Plugin\Router\Agent                            |
| MultiFactorAuthExtensionFormPlugin                     | Provides customer form validation against corrupted requests.             |               | Spryker\Yves\MultiFactorAuth\Plugin\Form                                    |
| MultiFactorAuthExtensionFormPlugin                     | Provides user form validation against corrupted requests.                 |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Form                       |
| RemoveMultiFactorAuthCustomerTableActionExpanderPlugin | Removes the MFA table action from the customer table in the Back Office.       |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Customer                   |
| PostCustomerLoginMultiFactorAuthenticationPlugin       | Handles customer MFA after a successful login.                              |               | SprykerShop\Yves\CustomerPage\Plugin\MultiFactorAuth                        |
| PostAgentLoginMultiFactorAuthenticationPlugin          | Handles agent user MFA after a successful login.                            |               | SprykerShop\Yves\AgentPage\Plugin\MultiFactorAuth                           |
| PostUserLoginMultiFactorAuthenticationPlugin           | Handles user MFA after a successful login.                                  |               | Spryker\Zed\SecurityGui\Communication\Plugin\MultiFactorAuth                |
| MultiFactorAuthSetupNavigationPlugin                   | Adds the optional MFA menu item to the dropdown navigation in the Back Office. |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Navigation                 |
| MultiFactorAuthRestUserValidatorPlugin                 | Validates requests against MFA.                                           |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                 |
| MultiFactorAuthTypesResourcePlugin                     | Provides available MFA methods.                                           |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                 |
| MultiFactorAuthTriggerResourcePlugin                   | Triggers code sending for the provided enabled MFA method.                |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                 |
| MultiFactorAuthActivateResourcePlugin                  | Triggers code sending for the provided MFA method to be activated.            |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                 |
| MultiFactorAuthDeactivateResourcePlugin                | Deactivates the provided MFA method.                                      |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                 |
| MultiFactorAuthTypeVerifyResourcePlugin                | Verifies MFA code and activates the provided MFA method.                  |               | Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi                 |


#### Register the plugins for customers


<summary>src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php

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



<details>
<summary>src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthDependencyProvider.php</summary>

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
</details>

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

</details>


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



#### Register the plugins for agent users


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



**rc/Pyz/Yves/Router/RouterDependencyProvider.php**

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


#### Register the plugins for Back Office users


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



{% info_block warningBox "Verification" %}

Make sure the following [Install the Backoffice dropdown navigation](/docs/pbc/all/back-office/{{page.version}}/base-shop/howto-guides/howto-install-the-backoffice-dropdown-navigation.html) feature is installed.

{% endinfo_block %}



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


#### 6.4) For Glue Rest API


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
</details>

{% info_block warningBox "Verification" %}

Follow the link [How to Use Multi-Factor Authentication with Glue API](/docs/pbc/all/multi-factor-authentication/{{page.version}}/howto-use-multi-factor-authentication-with-glue-api.html) for verification.

{% endinfo_block %}

### 7) Set up the frontend

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


2. Build the MFA frontend assets:

```bash
docker/sdk up --assets
```

{% info_block warningBox "Verification" %}

- Integrate one of the supported Multi-Factor Authentication methods, see [Multi-Factor Authentication](/docs/pbc/all/multi-factor-authentication/202505.0/multi-factor-authentication.md#multi-factor-authentication-methods).
- Make sure the **Set up Multi-Factor Authentication** menu item is displayed in the navigation menu.
- Clicking the menu should open the following page:
 - For customers:`https://yves.mysprykershop.com/multi-factor-auth/set`;
 - For agents: `https://yves.mysprykershop.com/agent/multi-factor-auth/set`;
 - For backoffice users: `https://backoffice.mysprykershop.com/multi-factor-auth/user-management/set-up`.

{% endinfo_block %}













































