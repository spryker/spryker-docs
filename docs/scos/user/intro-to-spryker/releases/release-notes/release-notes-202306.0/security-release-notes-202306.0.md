---
title: Security release notes 202306.0
description: Security release notes for the Spryker Product release 202306.0
last_updated: Jun 21, 2023
template: concept-topic-template
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](mailto:support@spryker.com). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Stored XSS in product pages 

Administrators can place a malicious payload into the description section of new and existing product pages in the Back Office application. This payload is then executed to all users of the shop that visit the affected product pages, resulting in a Cross-Site Scripting (XSS) vulnerability.

## Affected modules

`spryker/product-management`: 0.19.3 - 0.19.35 

## Introduced changes

Sanitization controls have been implemented to prevent the input of malicious payloads within product forms.

## How to get the fix

To implement a fix for this vulnerability, the ProductManagement module should be updated to version 0.19.36.

If your version of `spryker/product-management` is earlier than 0.19.35, follow these steps:

1. Upgrade the `spryker/store` module to version 1.19.0 and `spryker/zed-request-extension` to version 1.1.0:

```bash
composer require spryker/store:"~1.19.0" spryker/zed-request-extension:"~1.1.0"
composer show spryker/store # Verify the version
composer show spryker/zed-request-extension # Verify the version
```

2. Upgrade the `spryker/product-management` module to version 0.19.36:

```bash
composer require spryker/product-management:"~0.19.36" spryker/gui:"~3.48.0" spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/product-management # Verify the version
```

## Cross-company Role Manipulation 

Due to missing access validation controls on the backend, an administrator user of a company was able to create and update roles for other companies. This attack was possible by manipulating the company ID parameter included in the HTTP requests of the role creation functionality. 

## Affected modules

`spryker-shop/company-page`: 1.0.0-2.21.0 

## Introduced changes

Access validation controls have been implemented to prevent administrators from being able to create and edit roles for other companies. 

## How to get the fix

The update requires PHP 8 to be installed. If you are using PHP 7, see [PHP 8.0 as the minimum version for all Spryker projects](https://docs.spryker.com/docs/scos/user/intro-to-spryker/whats-new/php8-as-a-minimum-version-for-all-spryker-projects.html).

To implement a fix for this vulnerability, upgrade the company page module to version 2.22.0:

```bash
composer require spryker-shop/company-page:"~2.22.0"
composer show spryker-shop/company-page # Verify the version
```


## Unvalidated URL Redirection

Attackers were able to bypass the redirect URL validation for URLs provided through the GET request parameter and control the website that the user is redirected to. This type of vulnerability can be used in conjunction with social engineering to coerce a victim into navigating to a malicious resource or location.

## Affected modules

`spryker/kernel`: 1.0.0-3.72.0

## Introduced changes

Additional validation controls have been implemented to prevent an attacker from being able to manipulate the location of the URL redirection. 

## How to get the fix

To implement a fix for this vulnerability, update the Kernel module:

* If your version of `spryker/kernel` is 3.72.0, update to version 3.72.1:

```bash
composer require spryker/kernel:"~3.72.1"
composer show spryker/kernel # Verify the version
```

* If your version of `spryker/kernel` is 3.71.0 or 3.71.1, update to version 3.71.2:

```bash
composer require spryker/kernel:"~3.71.2"
composer show spryker/kernel # Verify the version
```

* If your version of `spryker/kernel` is 3.70.0, update to version 3.70.1:

```bash
composer require spryker/kernel:"~3.70.1"
composer show spryker/kernel # Verify the version
```

* If your version of `spryker/kernel` is earlier than 3.69.0, update to version 3.68.1:

```bash
composer require spryker/kernel:"~3.68.1"
composer show spryker/kernel # Verify the version
```

## Brute-force Attacks in the Back Office

The Back Office and Merchant portals were prone to brute-force attacks. By exploiting this type of vulnerability, an attacker was able to systematically attempt different combinations of usernames and passwords against the login pages of the affected portals until a valid combination is identified.

## Affected modules

`spryker/security-blocker`: 1.0.0-1.1.1

## Introduced changes

Maximum login attempts and blocking time can be configured for the affected portals.

## How to get the fix

1. Upgrade the `spryker/security-blocker` module version to 1.2.0:

```bash
composer require spryker/security-blocker:"~1.2.0"
composer show spryker/security-blocker # Verify the version
```

2. Upgrade the `spryker/error-handler` module version to 2.8.0:

```bash
composer require spryker/error-handler:"~2.8.0"
composer show spryker/error-handler # Verify the version
```

3. Install the `spryker/security-blocker-backoffice` module version 1.0.0:

```bash
composer require spryker/security-blocker-backoffice:"~1.0.0"
composer show spryker/security-blocker-backoffice # Verify the version
```

4. Install the `spryker/security-blocker-backoffice-gui` module version 1.0.0:

```bash
composer require spryker/security-blocker-backoffice-gui:"~1.0.0"
composer show spryker/security-blocker-backoffice-gui # Verify the version
```

5. Install the `spryker/security-blocker-storefront-customer` module version 1.0.0:

```bash
composer require spryker/security-blocker-storefront-customer:"~1.0.0"
composer show spryker/security-blocker-storefront-customer # Verify the version
```

6. Install the `spryker/security-blocker-storefront-agent` module version 1.0.0:

```bash
composer require spryker/security-blocker-storefront-agent:"~1.0.0"
composer show spryker/security-blocker-storefront-agent # Verify the version
```

7. Generate transfers:

```bash
console transfer:generate
```

8. Add configuration to `config/Shared/config_default.php`:

```bash
// >>> Security Blocker Storefront Agent
$config[SecurityBlockerStorefrontAgentConstants::AGENT_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerStorefrontAgentConstants::AGENT_BLOCKING_TTL] = 900;
$config[SecurityBlockerStorefrontAgentConstants::AGENT_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;

// >>> Security Blocker Storefront Customer
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCKING_TTL] = 900;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;

// >>> Security Blocker BackOffice user
$config[SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCKING_TTL] = 900;
$config[SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;
```

9. Add translations to `data/import/common/common/glossary.csv`:

```bash
security_blocker_backoffice_gui.error.account_blocked,"Too many log in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
security_blocker_backoffice_gui.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

10. Import glossary:

```bash
console data:import:glossary
```

11. Register plugins in `SecurityBlockerDependencyProvider`:

```bash
<?php

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\SecurityBlocker\SecurityBlockerDependencyProvider as SprykerSecurityBlockerDependencyProvider;
use Spryker\Client\SecurityBlockerBackoffice\Plugin\SecurityBlocker\BackofficeUserSecurityBlockerConfigurationSettingsExpanderPlugin;
use Spryker\Client\SecurityBlockerStorefrontAgent\Plugin\SecurityBlocker\AgentSecurityBlockerConfigurationSettingsExpanderPlugin;
use Spryker\Client\SecurityBlockerStorefrontCustomer\Plugin\SecurityBlocker\CustomerSecurityBlockerConfigurationSettingsExpanderPlugin;

class SecurityBlockerDependencyProvider extends SprykerSecurityBlockerDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerConfigurationSettingsExpanderPluginInterface>
     */
    protected function getSecurityBlockerConfigurationSettingsExpanderPlugins(): array
    {
        return [
            new BackofficeUserSecurityBlockerConfigurationSettingsExpanderPlugin(),
            new AgentSecurityBlockerConfigurationSettingsExpanderPlugin(),
            new CustomerSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```

12. Adjust `src/Pyz/Zed/ErrorHandler/ErrorHandlerConfig.php`:

```bash
<?php

namespace Pyz\Zed\ErrorHandler;

use Spryker\Zed\ErrorHandler\ErrorHandlerConfig as SprykerErrorHandlerConfigAlias;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Spryker\Shared\ErrorHandler\ErrorHandlerConfig getSharedConfig()
 */
class ErrorHandlerConfig extends SprykerErrorHandlerConfigAlias
{
    /**
     * @api
     *
     * @return array<int>
     */
    public function getValidSubRequestExceptionStatusCodes(): array
    {
        return array_merge(
            parent::getValidSubRequestExceptionStatusCodes(),
            [
                Response::HTTP_TOO_MANY_REQUESTS,
            ],
        );
    }
}
```

13. Register plugins in `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php`:

```bash
class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider 
{
...
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new SecurityBlockerBackofficeUserEventDispatcherPlugin(),
        ];
    }
...
```

If Merchant Portal is also installed, follow these steps:

1. Install the `spryker/security-blocker-merchant-portal` module version 1.0.0:

```bash
composer require spryker/security-blocker-merchant-portal:"~1.0.0"
composer show spryker/security-blocker-merchant-portal # Verify the version
```

2. Install the `spryker/security-blocker-merchant-portal-gui` module version 1.0.0:

```bash
composer require spryker/security-blocker-merchant-portal-gui:"~1.0.0"
composer show spryker/security-blocker-merchant-portal-gui # Verify the version
```

3. Generate transfers:

```bash
console transfer:generate
```

4. Register plugins in `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php`:

```bash
class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider 
{
...
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new SecurityBlockerMerchantPortalUserEventDispatcherPlugin(),
        ];
    }
...
```

5. Register plugins in `SecurityBlockerDependencyProvider`:

```bash
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\SecurityBlocker\SecurityBlockerDependencyProvider as SprykerSecurityBlockerDependencyProvider;
use Spryker\Client\SecurityBlockerMerchantPortal\Plugin\SecurityBlocker\MerchantPortalUserSecurityBlockerConfigurationSettingsExpanderPlugin;

class SecurityBlockerDependencyProvider extends SprykerSecurityBlockerDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerConfigurationSettingsExpanderPluginInterface>
     */
    protected function getSecurityBlockerConfigurationSettingsExpanderPlugins(): array
    {
        return [
            ...
            new MerchantPortalUserSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```

6. Add configuration to `config/Shared/config_default.php`:

```bash
// >>> Security Blocker MerchantPortal user
$config[SecurityBlockerMerchantPortalConstants::MERCHANT_PORTAL_USER_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerMerchantPortalConstants::MERCHANT_PORTAL_USER_BLOCKING_TTL] = 900;
$config[SecurityBlockerMerchantPortalConstants::MERCHANT_PORTAL_USER_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;
```

7. Add translations to `data/import/common/common/glossary.csv`:

```bash
security_blocker_merchant_portal_gui.error.account_blocked,"Too many log in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
security_blocker_merchant_portal_gui.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

8. Import glossary:

```bash
console data:import:glossary
```