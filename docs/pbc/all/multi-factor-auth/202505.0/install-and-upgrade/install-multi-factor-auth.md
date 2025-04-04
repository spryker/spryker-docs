---
title: Install the Multi-Factor Authentication Feature
description: This document describes how to install the Multi-Factor Authentication (MFA) feature in your Spryker project.
template: feature-integration-guide-template
last_updated: Mar 06, 2025
---

This document describes how to install the Multi-Factor Authentication (MFA) feature in your Spryker project. 
Follow the link to the [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-auth/{{site.version}}/multi-factor-auth.html) to learn more about the feature and its benefits.

## Prerequisites

To start the integration, make sure that the following features have been installed in your project:

| NAME                        | VERSION          | INTEGRATION  GUIDE                                                                                                                                                                                                     |
|-----------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                            |
| Customer Account Management | {{site.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

## 1) Install the required modules using composer

Run the following command to install the required modules:

```bash
composer require spryker/multi-factor-auth:"^0.1.0" spryker/multi-factor-auth-extension:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                         |
|--------------------------|--------------------------------------------|
| MultiFactorAuth          | vendor/spryker/multi-factor-auth           |
| MultiFactorAuthExtension | vendor/spryker/multi-factor-auth-extension |

{% endinfo_block %}

## 2) Set up configuration

### 2.1) Configure code length 

To configure the length of the authentication code, extend the `MultiFactorAuthConfig` class in your project:

<details>
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    public function getCustomerCodeLength(): int
    {
        return 6;
    }
}
```

</details>

### 2.2) Configure code validity time

To configure the time interval during which the authentication code is valid, extend the `MultiFactorAuthConfig` class in your project:

<details>
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    public function getCustomerCodeValidityTtl(): int
    {
        return 30;
    }
}
```
</details>

### 2.3) Configure brute-force protection limit

To configure the number of failed attempts a customer can make to enter the authentication code in order to prevent brute force attacks, extend the `MultiFactorAuthConfig` class in your project:

<details>
<summary>src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthConfig.php</summary>

```php
namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    public function getCustomerAttemptLimit(): int
    {
        return 3;
    }
}
```
</details>

### 2.4) Configure enabled routes and forms

To specify which routes and forms should require Multi-Factor Authentication (MFA), extend the `MultiFactorAuthConfig` class in your project and configure the necessary entries:

<details>
<summary>src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthConfig.php</summary>

```php
namespace Pyz\Yves\MultiFactorAuth;

use Spryker\Yves\MultiFactorAuth\MultiFactorAuthConfig as SprykerMultiFactorAuthConfig;

class MultiFactorAuthConfig extends SprykerMultiFactorAuthConfig
{
    public function getEnabledRoutesAndForms(): array
    {
        return [
            'YOUR_ROUTE_NAME' => ['YOUR_FORM_NAME'],
        ];
    }
}
```
</details>

{% info_block warningBox "Note" %}

Note, you can configure multiple forms on the same page to require MFA authentication.

{% endinfo_block %}

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

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                          | TYPE     | EVENT   | PATH                                                                    |
|-----------------------------------|----------|---------|-------------------------------------------------------------------------|
| MultiFactorAuth                   | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthTransfer                   |
| MultiFactorAuthCode               | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthCodeTransfer               |
| MultiFactorAuthTypesCollection    | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthTypesCollectionTransfer    |
| MultiFactorAuthValidationRequest   | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthValidationRequestTransfer |
| MultiFactorAuthValidationResponse | class    | created | src/Generated/Shared/Transfer/MultiFactorAuthValidationResponseTransfer |

{% endinfo_block %}

## 4) Add translations

Append glossary according to your configuration:

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
```
</details>

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

## 5) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN                           | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                               |
|----------------------------------|---------------------------------------------------|---------------|-----------------------------------------|
| MultiFactorAuthHandlerWidget     | Provides MFA handling functionality               |               | SprykerShop\Yves\MultiFactorAuth\Widget |
| SetMultiFactorAuthMenuItemWidget | Adds menu item to the customer profile navigation |               | SprykerShop\Yves\MultiFactorAuth\Widget |

<details>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
</details>

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                         | SPECIFICATION                                             | PREREQUISITES | NAMESPACE                                                           |
|------------------------------------------------|-----------------------------------------------------------|---------------|---------------------------------------------------------------------|
| CustomerMultiFactorAuthenticationHandlerPlugin | Handles customer multi-factor authentication during login |               | Spryker\Yves\MultiFactorAuth\Plugin\AuthenticationHandler\Customer  |
| MultiFactorAuthCustomerRouteProviderPlugin     | Provides routes for customer multi-factor auth            |               | Spryker\Yves\MultiFactorAuth\Plugin\Router\Customer  |
| MultiFactorAuthExtensionFormPlugin             | Provides form validation against corrupted requests       |               | Spryker\Yves\MultiFactorAuth\Plugin\Form |

<details>
<summary>src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php</summary>
    
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
</details>

<details>
<summary>src/Pyz/Yves/Router/RouterDependencyProvider.php</summary>

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

<details>
<summary>src/Pyz/Yves/Router/RouterDependencyProvider.php</summary>

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
</details>

### 7) Set up the frontend

To set up the frontend, you need to build the assets for the Multi-Factor Authentication feature. This step is crucial to ensure that the frontend components are properly integrated and functional.

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

{% info_block warningBox "Verification" %}

1. Build the MFA frontend assets by running the following command:

```bash
docker/sdk up --assets
```

2. Confirm successful integration:
 - Ensure that at least one MFA type plugin is wired.
 - Once enabled, a new menu item, **Set up Multi-Factor Authentication**, will appear in the sidebar.
 - The MFA settings page should now be accessible at https://yves.mysprykershop.com/multi-factor-auth/set.

For a complete list of available MFA types in Spryker and installation instructions, refer to the following guide [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-auth/{{site.version}}/multi-factor-auth.html#multi-factor-authentication-methods).

{% endinfo_block %}
