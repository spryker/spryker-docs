---
title: Security release notes 202306.0
description: Security release notes for the Spryker Product release 202306.0
last_updated: Jul 11, 2023
template: concept-topic-template
redirect_from:
    - /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202306.0/security-release-notes-202306.0.html
    - /docs/scos/user/intro-to-spryker/releases/release-notes/security-release-notes-202306.0.html

---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Stored XSS in product pages

Administrators can place a malicious payload into the description section of new and existing product pages in the Back Office application. This payload is then executed to all users of the shop that visit the affected product pages, resulting in a Cross-Site Scripting (XSS) vulnerability.

### Affected modules

`spryker/product-management`: 0.19.3-0.19.35

### Introduced changes

Sanitization controls have been implemented to prevent the input of malicious payloads within product forms.

### How to get the fix

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

## Cross-company role manipulation

Because of missing access validation controls on the backend, an administrator user of a company was able to create and update roles for other companies. This was possible because of the possibility to manipulate the company ID parameter included in the HTTP requests of the role creation functionality.

### Affected modules

`spryker-shop/company-page`: 1.0.0-2.21.0

### Introduced changes

Access validation controls have been implemented to prevent administrators from being able to create and edit roles for other companies.

### How to get the fix

The update requires PHP 8 to be installed. If you are using PHP 7, see [PHP 8.1 as the minimum version for all Spryker projects](https://docs.spryker.com/docs/scos/user/intro-to-spryker/whats-new/php8-as-a-minimum-version-for-all-spryker-projects.html) for details on how to migrate to PHP 8.1.

To implement a fix for this vulnerability, upgrade the `company-page` module to version 2.22.0:

```bash
composer require spryker-shop/company-page:"~2.22.0"
composer show spryker-shop/company-page # Verify the version
```

## Unvalidated URL redirection

Attackers were able to bypass the redirect URL validation for URLs provided through the GET request parameter and control the website that the user is redirected to. This type of vulnerability can be used in conjunction with social engineering to coerce a victim into navigating to a malicious resource or location.

### Affected modules

`spryker/kernel`: 1.0.0-3.72.0

### Introduced changes

Additional validation controls have been implemented to prevent an attacker from being able to manipulate the location of the URL redirection.

### How to get the fix

To implement a fix for this vulnerability, update the `kernel` module:

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

## Brute-force attacks on the Storefront and in the Back Office

The Storefront, the Back Office, and the Merchant portals were prone to brute-force attacks. By exploiting this type of vulnerability, an attacker was able to systematically attempt different combinations of usernames and passwords against the login pages of the affected portals until a valid combination was identified.

### Affected modules

`spryker/security-blocker`: 1.0.0-1.1.1

### Introduced changes

Maximum login attempts and blocking time can be configured for the affected portals.

### How to get the fix

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

```php
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

```csv
security_blocker_backoffice_gui.error.account_blocked,"Too many log-in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
security_blocker_backoffice_gui.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

10. Import glossary:

```bash
console data:import:glossary
```

11. Register plugins in `SecurityBlockerDependencyProvider`:

```php
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

```php
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

13. Register plugins in `src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php`:

```php
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

```php
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

```php
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

7. Add translations to `data/import/common/common/glossary.csv` :

```csv
security_blocker_merchant_portal_gui.error.account_blocked,"Too many log in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
security_blocker_merchant_portal_gui.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

8. Import glossary:

```bash
console data:import:glossary
```

## Weak input validation for the customer address field

The parameters related to the address field had insufficient server-side input validation. By supplying invalid or potentially malicious parameter values, an attacker might be able to cause the server to respond in an unexpected way.

### Affected modules

* `spryker-shop/customer-page`: 0.1.0-2.41.0
* `spryker-shop/company-page`: 0.0.1-2.22.0
* `spryker/customer`: 0.20.0-7.51.2
* `spryker/company-unit-address-gui`: 0.1.0-1.3.0
* `spryker/merchant-profile-gui`: 0.1.0-1.2.0

### Introduced changes

Input validation controls have been implemented on the server side to validate values submitted in the address field.

### How to get the fix

To implement a fix for this vulnerability, update the `shop-ui`, `customer-page`, `company-page`, `customer`, `company-unit-address-gui`, and `merchant-profile-gui` modules:

1. Upgrade the `spryker-shop/shop-ui` module to at least version 1.70.0:

```bash
composer require spryker-shop/shop-ui:"^1.70.0"
composer show spryker-shop/customer-page # Verify the version
```

2. Add the `SanitizeXssTypeExtensionFormPlugin` plugin to `FormDependencyProvider`:

**src/Pyz/Yves/Form/FormDependencyProvider.php**

```bash
<?php

namespace Pyz\Yves\Form;

use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use SprykerShop\Yves\ShopUi\Plugin\Form\SanitizeXssTypeExtensionFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface>
     */
    protected function getFormPlugins(): array
    {
        return [
            new SanitizeXssTypeExtensionFormPlugin(),
        ];
    }
}
```

3. Upgrade the `spryker-shop/customer-page` module to version 2.42.0:

```bash
composer require spryker-shop/customer-page:"~2.42.0"
composer show spryker-shop/customer-page # Verify the version
```

4. Upgrade the `spryker-shop/company-page` module to version 2.23.0:

```bash
composer require spryker-shop/company-page:"~2.23.0"
composer show spryker-shop/company-page # Verify the version
```

5. Upgrade the `spryker/customer` module:

   1. If your version of `spryker/customer` is 7.42.0 and later, update it to version 7.51.3:

    ```bash
    composer require spryker/customer:"~7.51.3"
    composer show spryker/customer # Verify the version
    ```

   2. If your version of `spryker/customer` is earlier than 7.42.0, update it to version 7.42.1:

    ```bash
    composer require spryker/customer:"~7.42.1"
    composer show spryker/customer # Verify the version
    ```

   3. If your version of `spryker/customer` is earlier than 7.50.0, update it to version 7.50.1:

    ```bash
    composer require spryker/customer:"~7.50.1"
    composer show spryker/customer # Verify the version
    ```

6. Upgrade the `spryker/company-unit-address-gui` module to version 1.3.1:

```bash
composer require spryker/company-unit-address-gui:"~1.3.1"
composer show spryker/company-unit-address-gui # Verify the version
```

7. Upgrade the `spryker/merchant-profile-gui` module version to 1.2.1:

```bash
composer require spryker/merchant-profile-gui:"~1.2.1"
composer show spryker/merchant-profile-gui # Verify the version
```

## Outdated third-party library guzzlehttp/psr7

An outdated version of the `guzzlehttp/psr7` library was identified to affect Spryker's applications. The version in use, 2.4.3, was affected by a publicly known vulnerability that could let an attacker sneak in a newline (\n) into both the header names and values (CVE-2023-29197).

### Affected modules

* `spryker/guzzle`: 0.20.0-2.4.0
* `spryker/message-broker-aws`: 1.0.0-1.4.2
* `spryker/secrets-manager-aws`: 1.0.0-1.0.1
* `spryker/oauth-auth0` : 1.0.0

### Introduced changes

The affected library has been upgraded.

### How to get the fix

To implement a fix for this vulnerability, update the `guzzle`, `message-broker-aws`, `secrets-manager-aws`, and  `oauth-auth0` modules:

1. Upgrade the `spryker/guzzle` module to version 2.4.1:

```bash
composer require spryker/guzzle:"^2.4.1"
composer show spryker/guzzle # Verify the version
```

2. Upgrade the `spryker/message-broker-aws` module to version 1.4.3:

```bash
composer require spryker/message-broker-aws:"^1.4.3"
composer show spryker/message-broker-aws # Verify the version
```

3. Upgrade the `spryker/secrets-manager-aws` module to version 1.0.2:

```bash
composer require spryker/secrets-manager-aws:"^1.0.2"
composer show spryker/secrets-manager-aws # Verify the version
```

4. Upgrade the `spryker/oauth-auth0` module to version 1.0.1:

```bash
composer require spryker/oauth-auth0:"^1.0.1"
composer show spryker/oauth-auth0 # Verify the version
```

## Missing security HTTP headers

Security-related HTTP headers were missing from Spryker's applications. Adding these headers improves the overall security posture of the applications because they implement an additional layer of protection against common web application attacks.

### Affected modules

* `spryker/event-dispatcher`: <=1.4.0
* `spryker/glue-backend-api-application`: <=1.3.0
* `spryker/glue-storefront-api-application`: <=1.2.0
* `spryker/http`: <=1.10.0
* `spryker/merchant-portal-application`: <=1.1.0

### Introduced changes

The following security-related HTTP headers can be implemented:
* `Strict-Transport-Security`
* `Cache-Control`
* `X-Content-Type-Options`
* `X-Frame-Options`
* `X-XSS-Protection`
* `Content-Security-Policy`

### How to get the fix

To implement a fix for this vulnerability:

1. Update the `event-dispatcher`, `glue-backend-api-application`, `glue-storefront-api-application`, `HTTP`, and `merchant-portal-application` modules:

```bash
composer update spryker/event-dispatcher spryker/glue-backend-api-application spryker/glue-storefront-api-application spryker/http spryker/merchant-portal-application
```

2. Register `Spryker\Glue\Http\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin` in `Pyz\Glue\EventDispatcher::getEventDispatcherPlugins()`.

3. Register `Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\StrictTransportSecurityHeaderResponseFormatterPlugin` in `Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getResponseFormatterPlugins()`.

4. In `Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider::getResponseFormatterPlugins()`, register `Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\StrictTransportSecurityHeaderResponseFormatterPlugin`.

5. In `Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`, register `Spryker\Yves\Http\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin`.

6. In `Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`, register `Spryker\Yves\Http\Plugin\EventDispatcher\EnvironmentInfoHeaderEventDispatcherPlugin`.

7. Remove deprecated `Spryker\Yves\Http\Plugin\EventDispatcher\HeaderEventDispatcherPlugin` from `Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`.

8. In `Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`, register `Spryker\Zed\Http\Communication\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin`.

9.  In `Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`, register `Spryker\Zed\Http\Communication\Plugin\EventDispatcher\EnvironmentInfoHeaderEventDispatcherPlugin`.

10. In `Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider::getMerchantPortalEventDispatcherPlugins()`, register `Spryker\Zed\MerchantPortalApplication\Communication\Plugin\EventDispatcher\HeadersSecurityEventDispatcherPlugin`.

11. Remove deprecated `Spryker\Zed\Http\Communication\Plugin\EventDispatcher\HeaderEventDispatcherPlugin` from `Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`.

12. In `Pyz\Zed\MerchantPortalApplication\MerchantPortalApplicationDependencyProvider::getMerchantPortalApplicationPlugins()`, register `Spryker\Zed\EventDispatcher\Communication\Plugin\MerchantPortalApplication\MerchantPortalEventDispatcherApplicationPlugin`.

13. Overwrite `Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationConfig::getSecurityHeaders()` and `Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConfig::getSecurityHeaders()` to set Cache-Control security header:

```bash
/**
 * @return array<string, string>
 */
public function getSecurityHeaders(): array
{
    return array_merge(
        parent::getSecurityHeaders(),
        ['Cache-Control' => 'no-cache, private'],
    );
}
```

14. Adjust `config/Shared/config_default.php` to add cache control configuration. To see the list of available directives, check `Spryker\Yves\Http\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin`.

```bash
use Spryker\Shared\Http\HttpConstants;

$config[HttpConstants::YVES_HTTP_CACHE_CONTROL_CONFIG] = [
   'public' => true,
   'max-age' => 3600,
];

$config[HttpConstants::ZED_HTTP_CACHE_CONTROL_CONFIG] = [
   'public' => true,
   'max-age' => 3600,
];

$config[HttpConstants::GLUE_HTTP_CACHE_CONTROL_CONFIG] = [
   'public' => true,
   'max-age' => 3600,
];
```
