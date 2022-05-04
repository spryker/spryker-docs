---
title: Customer Account Management feature integration
description: The guide walks you through the process of adding Redirect support for Customer login functionality to your project.
last_updated: Jun 17, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-account-management-feature-integration
originalArticleId: 859d5c6d-7ca6-4cca-ae87-66f2951c2e96
redirect_from:
  - /2021080/docs/customer-account-management-feature-integration
  - /2021080/docs/en/customer-account-management-feature-integration
  - /docs/customer-account-management-feature-integration
  - /docs/en/customer-account-management-feature-integration
related:
  - title: Customer Account Management + Order Management feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/customer-account-management-order-management-feature-integration.html
  - title: Glue API - Customer Account Management feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/glue-api/glue-api-customer-account-management-feature-integration.html
---

This document describes how to integrate the Customer Account Management feature into a Spryker project.
{% info_block errorBox "Included features" %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds:
* Redirect support for Customer login functionality.
* Password set and reset console commands for customers.
* Double opt-in for customer registration.
* OAuth
* Improved password security

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Customer Account Management feature core.

### Prerequisites

Overview and install the necessary features before beginning the integration.


| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- |--- |
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |

### 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker-feature/customer-account-management: "{{page.version}}" spryker/oauth-customer-connector:"^1.6.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Customer | vendor/spryker/customer |
| Oauth | vendor/spryker/oauth |
| OauthRevoke  | vendor/spryker/oauth-revoke |
| OauthCustomerConnector  | vendor/spryker/oauth-customer-connector |

{% endinfo_block %}

### 2) Set up configuration

To set up configuration
1. Set the required OAuth config:

{% info_block infoBox %}

See [OAauth 2.0 Server Installation](https://oauth2.thephpleague.com/installation/) for more details on key generation.

{% endinfo_block %}


**config/Shared/config_default.php**

```php
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://path/to/private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://path/to/public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'generated-encryption-key';
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = 'client-identifier';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = 'client-secret';
```

2. Optional: To enable the double opt-in for the customer registration, make `CustomerConfig::isDoubleOptInEnabled()` return `true`:

```php
<?php

namespace Pyz\Shared\Customer;

use Spryker\Shared\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * @return bool
     */
    public function isDoubleOptInEnabled(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the double opt-in is enabled by registering a new customer and receiving an email to confirm the registration.

{% endinfo_block %}

3. Optional: in order to control the customer account confirmation link sent in the registration confirmation email, use `CustomerConstants::REGISTRATION_CONFIRMATION_TOKEN_URL`. Note that the value has to contain the "%s" placeholder the actual customer's token value will be inserted to. You can set the configuration in the environment config:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Customer\CustomerConstants;

$config[CustomerConstants::REGISTRATION_CONFIRMATION_TOKEN_URL] = $config[ApplicationConstants::BASE_URL_YVES] . '/register/confirm?token=%s';
```

In case you do use double opt-in, you can also configure the link the customer will get in an email. This is valuable in case you use an alternative storefront. The Default link will lead to yves customer confirmation page.

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Customer\CustomerConstants;

$config[CustomerConstants::REGISTRATION_CONFIRMATION_TOKEN_URL] = 'https://spa.mysprykershop.com/customer/confirm?token=%s';
```

{% info_block warningBox "Verification" %}

Ensure that email to confirm the registration uses the alternative link.

{% endinfo_block %}

There is a possibility to configure the password strength validation settings. You can do it in `src/Pyz/Zed/Customer/CustomerConfig.php`:

**src/Pyz/Zed/Customer/CustomerConfig.php**

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 8;
    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 64;

    /**
     * @return string[]
     */
    public function getCustomerPasswordAllowList(): array
    {
        return [
            'change123',
        ];
    }

    /**
     * @return string[]
     */
    public function getCustomerPasswordDenyList(): array
    {
        return [
            'qwerty',
        ];
    }

    /**
     * @return string
     */
    public function getCustomerPasswordCharacterSet(): string
    {
        return "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}:;\[\]<>,.?\/~_+\-=|])[a-zA-Z0-9*.!@#$%^& (){}:;\[\]<>,.?\/~_+\-=|]*$/";
    }

    /**
     * @return int|null
     */
    public function getCustomerPasswordSequenceLimit(): ?int
    {
        return 3;
    }
}
```

Here is the description of the settings:

| SETTING | MEANING |
| --- | --- |
| CustomerConfig::getCustomerPasswordAllowList() | Provides a list of strings that will be accepted as a password for the customer bypassing any policy validations. These will be accepted despite breaking other policies. |
| CustomerConfig::getCustomerPasswordCharacterSet() | Provides regular expression for character set password validation. |
| CustomerConfig::getCustomerPasswordDenyList() | A common list of insecure, invalid passwords. These will be rejected immediately. |
| CustomerConfig::getCustomerPasswordSequenceLimit() | Provides a limit for character repeating if defined.
Example: Limit=4 forbids using "aaaa" in the password but allows "aaa". |
| CustomerConfig::MAX_LENGTH_CUSTOMER_PASSWORD | Defines password maximum length. |
| CustomerConfig::MIN_LENGTH_CUSTOMER_PASSWORD | Defines password minimum length. |

### 3) Set up transfer objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have been applied in the transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CustomerCriteriaFilterTransfer | class | created | src/Generated/Shared/Transfer/CustomerCriteriaFilterTransfer.php |
| CustomerIdentifierTransfer | class | created | src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php |
| CustomerResponseTransfer | class |created| src/Generated/Shared/Transfer/CustomerResponseTransfer.php |
| JwtTokenTransfer | class |created| src/Generated/Shared/Transfer/JwtTokenTransfer.php |
| OauthAccessTokenDataTransfer | class |created| src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer.php |
| OauthAccessTokenValidationRequestTransfer | class |created| src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer.php |
| OauthAccessTokenValidationResponseTransfer | class |created| src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer.php |
| OauthClientTransfer | class |created| src/Generated/Shared/Transfer/OauthClientTransfer.php |
| OauthErrorTransfer | class |created| src/Generated/Shared/Transfer/OauthErrorTransfer.php |
| OauthGrantTypeConfigurationTransfer | class |created| src/Generated/Shared/Transfer/OauthGrantTypeConfigurationTransfer.php |
| OauthRefreshTokenCollectionTransfer | class |created|src/Generated/Shared/Transfer/OauthRefreshTokenCollectionTransfer.php |
| OauthRefreshTokenTransfer | class |created| src/Generated/Shared/Transfer/OauthRefreshTokenTransfer.php |
| OauthRequestTransfer | class |created| src/Generated/Shared/Transfer/OauthRequestTransfer.php |
| OauthResponseTransfer | class |created| src/Generated/Shared/Transfer/OauthResponseTransfer.php |
| OauthScopeRequestTransfer | class |created| src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php |
| OauthScopeTransfer | class |created| src/Generated/Shared/Transfer/OauthScopeTransfer.php |
| OauthTokenCriteriaFilterTransfer | class |created| src/Generated/Shared/Transfer/OauthTokenCriteriaFilterTransfer.php |
| OauthUserTransfer | class |created| src/Generated/Shared/Transfer/OauthUserTransfer.php |
| RevokeRefreshTokenRequestTransfer | class |created| src/Generated/Shared/Transfer/RevokeRefreshTokenRequestTransfer.php |
| RevokeRefreshTokenResponseTransfer | class | created|src/Generated/Shared/Transfer/RevokeRefreshTokenResponseTransfer.php |

{% endinfo_block %}

### 4) Set up behavior

Set up behavior as follows:

1. Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CustomerOauthUserProviderPlugin | Provides a customer OAuth user. | None | Spryker\Zed\OauthCustomerConnector\Communication\Plugin |
| CustomerOauthScopeProviderPlugin | Provides a list of customer scopes. | None | Spryker\Zed\OauthCustomerConnector\Communication\Plugin |		
| CustomerImpersonationOauthUserProviderPlugin | Authenticates a customer by customer reference. | None | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth |		
| CustomerImpersonationOauthScopeProviderPlugin | Returns the customer impersonation scopes. | None | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth |		
| CustomerImpersonationOauthGrantTypeConfigurationProviderPlugin | Provides configuration of `customer_impersonation` grant type. | None | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth |
| OauthExpiredRefreshTokenRemoverPlugin | Removes expired refresh tokens by the provided criteria transfer. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |
| OauthRefreshTokenCheckerPlugin | Checks if refresh token has been revoked. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |
| OauthRefreshTokenReaderPlugin | Finds a refresh token by the provided criteria transfer. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |		
| OauthRefreshTokenRevokerPlugin | Revokes a refresh token. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |		
| OauthRefreshTokenPersistencePlugin | Persists a refresh token. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |
| OauthRefreshTokensReaderPlugin | Retrieves refresh tokens by the provided criteria. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |
| OauthRefreshTokensRevokerPlugin | Revokes all refresh tokens. | None | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth |		
| CustomerPasswordResetConsole | Generates password restoration keys and sends a password reset email to the customers without a password. Sends a password reset email to all the customers if the corresponding command option is provided. | None | Spryker\Zed\Customer\Communication\Console |
| CustomerPasswordSetConsole | Sends the password reset email to all the customers with the empty password value in the database. | None | Spryker\Zed\Customer\Communication\Console |		
| CustomerRegistrationConfirmationMailTypePlugin | Builds a mail for customer registration confirmation that is used when double opt in feature is enabled. | None | Spryker\Zed\Customer\Communication\Plugin\Mail |

<details open><summary markdown='span'>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerImpersonationOauthGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerImpersonationOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerImpersonationOauthUserProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthUserProviderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthExpiredRefreshTokenRemoverPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenCheckerPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenPersistencePlugin
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenReaderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenRevokerPlugin;

use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokensReaderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokensRevokerPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface[]
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new CustomerOauthUserProviderPlugin(),
            new CustomerImpersonationOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface[]
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new CustomerOauthScopeProviderPlugin(),
            new CustomerImpersonationOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthGrantTypeConfigurationProviderPluginInterface[]
     */
    protected function getGrantTypeConfigurationProviderPlugins(): array
    {
        return array_merge(parent::getGrantTypeConfigurationProviderPlugins(), [
            new CustomerImpersonationOauthGrantTypeConfigurationProviderPlugin(),
        ]);
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenRevokerPluginInterface[]
     */
    protected function getOauthRefreshTokenRevokerPlugins(): array
    {
        return [
            new OauthRefreshTokenRevokerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokensRevokerPluginInterface[]
     */
    protected function getOauthRefreshTokensRevokerPlugins(): array
    {
        return [
            new OauthRefreshTokensRevokerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenPersistencePluginInterface[]
     */
    protected function getOauthRefreshTokenPersistencePlugins(): array
    {
        return [
            new OauthRefreshTokenPersistencePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenCheckerPluginInterface[]
     */
    protected function getOauthRefreshTokenCheckerPlugins(): array
    {
        return [
            new OauthRefreshTokenCheckerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthExpiredRefreshTokenRemoverPluginInterface[]
     */
    protected function getOauthExpiredRefreshTokenRemoverPlugins(): array
    {
        return [
            new OauthExpiredRefreshTokenRemoverPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenReaderPluginInterface[]
     */
    protected function getOauthRefreshTokenReaderPlugins(): array
    {
        return [
            new OauthRefreshTokenReaderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokensReaderPluginInterface[]
     */
    protected function getOauthRefreshTokensReaderPlugins(): array
    {
        return [
            new OauthRefreshTokensReaderPlugin(),
        ];
    }
}
```
</details>


<details open><summary markdown='span'>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Customer\Communication\Console\CustomerPasswordResetConsole;
use Spryker\Zed\Customer\Communication\Console\CustomerPasswordSetConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new CustomerPasswordResetConsole(),
            new CustomerPasswordSetConsole(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Ensure that the OAuth client has been added to the `spy_oauth_client` table by running following SQL-query. The result should contain one record
 
```sql
SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that it is possible to obtain the customer OAuth access token with customer credentials or customer reference. See [Glue API: Customer Account Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html) for details.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that `OauthRefreshTokenRemoverPlugin` is set up correctly:
1. Run the command:

```bash
console oauth:refresh-token:remove-expired
```
2. Check that all expired refresh tokens that are older than defined by the removal interval you configured in `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` have been deleted:

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that running the `console customer:password:reset` command sends the password reset emails to all customers:

1. Send the password reset email to all the customers inside the database:

```bash
console customer:password:reset
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers have the password reset hash.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that running the `console customer:password:set` command sends the password reset emails to all the customers without passwords:

1. Send password reset emails to all the customers without passwords:

```bash
console customer:password:set
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers without passwords have the password reset hash.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that running the `console customer:password:reset`command sends the password reset emails to all customers:

1. Send the password reset email to all the customers inside the database:

```bash
console customer:password:reset
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers have the password reset hash.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that running the `console customer:password:set`command sends the password reset emails to all the customers without passwords:
1. Send password reset emails to all the customers without passwords:

```bash
console customer:password:set
```
2. Open the  `spy_customer.restore_password_key` table and ensure that all the customers without passwords have the password reset hash.

{% endinfo_block %}

<details open><summary markdown='span'>src/Pyz/Zed/Mail/MailDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Customer\Communication\Plugin\Mail\CustomerRegistrationConfirmationMailTypePlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionAddInterface;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection
                ->add(new CustomerRegistrationConfirmationMailTypePlugin())

            return $mailCollection;
        });

        return $container;
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Ensure that customer confirmation email is sent to the newly registered customers upon registration.

{% endinfo_block %}

2. Enable Jenkins check for finding and deleting expired refresh tokens:

**config/Zed/cronjobs/jenkins.php**

```php
<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contains spaces or any other characters, that have to be urlencode()'d
 * - jobs[]['role'] default value is 'admin'
 */

$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');
$allStores = array_keys($stores);
...


/* Oauth */
$jobs[] = [
    'name' => 'remove-expired-refresh-tokens',
    'command' => '$PHP_BIN vendor/bin/console oauth:refresh-token:remove-expired',
    'schedule' => '*/5 * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```

### 5) Import data
Import the following data.

#### Add infrastructural data
Add infrastructural data as follows:

1. Install the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| OauthClientInstallerPlugin | Populates the database with OAuth client data. | None | Spryker\Zed\Oauth\Communication\Plugin\Installer |
| OauthCustomerScopeInstallerPlugin | Installs OAuth customer scope data. | None | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Oauth\Communication\Plugin\Installer\OauthClientInstallerPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer\OauthCustomerScopeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new OauthClientInstallerPlugin(),
            new OauthCustomerScopeInstallerPlugin(),
        ];
    }
}
```

2. Run the following command to set up the OAuth client:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Ensure that:

* `spy_oauth_client` is populated with the OAuth client you configured in the `\Spryker\Shared\Oauth\OauthConstants::OAUTH_CLIENT_IDENTIFIER` of environment config files.

* `spy_oauth_scope` tables are filled with customer scopes.

{% endinfo_block %}


## Install feature front end

Follow the steps below to install the Customer Account Management feature front end.

### Prerequisites

Overview and install the necessary features before beginning the integration.

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/customer-account-management: "{{page.version}}" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Ensure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CustomerPage | vendor/spryker-shop/customer-page |

{% endinfo_block %}


### 2) Set up configuration

Optional: To enable double opt-in for customer registration, make `CustomerPageConfig::isDoubleOptInEnabled()` return `true`.

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    /**
     * @return bool
     */
    public function isDoubleOptInEnabled(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that double opt-in is enabled by registering a new customer and checking that you cannot sign in to your account until the registration is confirmed.

{% endinfo_block %}

By default, in Spryker, posting the login form (where SecurityBlocker will make its check and block customers who made too many failed login attempts) is local-independent. So, to be able to see error messages translated into different languages, you need to configure the locale to be added to the login path. You can do this by modifying the following configs:

**src/Pyz/Yves/CustomerPage/CustomerPageConfig.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    /**
     * @return bool
     */
    public function isLocaleInLoginCheckPath(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when the login form for the customer is submitted, the URL it uses contains a locale code. For example, `/de/login_check` would be the default value for the customer.

{% endinfo_block %}

You can define the password minimum and maximum length the frontend will be using. They should be using the same as you defined for the core feature in the `CustomerConfig` above:

**src/Pyz/Yves/CustomerPage/CustomerPageConfig.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 8;
    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 64;
}
```

### 3) Add translations

To add translations:

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
customer.authorization.success,"Almost there! We send you an email to validate your email address. Please confirm it to be able to log in.",en_US
customer.authorization.success,"Fast dort! Wir senden Ihnen eine E-Mail, um Ihre E-Mail-Adresse zu bestätigen. Bitte bestätigen Sie dies, um sich anmelden zu können.",de_DE
customer.authorization.account_confirmed,"Your email address is validated. Please login to continue.",en_US
customer.authorization.account_confirmed,"Ihre E-Mail-Adresse wird bestätigt. Bitte einloggen zum Fortfahren.",de_DE
customer.error.confirm_email_link.invalid_or_used,This email verification link is invalid or has been already used.,en_US
customer.error.confirm_email_link.invalid_or_used,Dieser E-Mail-Verifizierungslink ist ungültig oder wurde bereits verwendet.,de_DE
customer.authorization.validate_email_address,"Almost there! We send you an email to validate your email address. Please confirm it to be able to log in.",en_US
customer.authorization.validate_email_address,"Fast dort! Wir senden Ihnen eine E-Mail, um Ihre E-Mail-Adresse zu bestätigen. Bitte bestätigen Sie dies, um sich anmelden zu können.",de_DE
password.weak,Weak,en_US
password.weak,Schwach,de_DE
password.medium,Medium,en_US
password.medium,Mittel,de_DE
password.strong,Strong,en_US
password.strong,Stark,de_DE
password.very_strong,Very strong,en_US
password.very_strong,Sehr stark,de_DE
password.message,Try lengthening password or adding numbers or symbols.,en_US
password.message,Versuchen Sie es zu verlängern oder Zahlen oder Symbole hinzuzufügen.,de_DE
customer.password.error.deny_list,"This password is considered common. Please use another one.",en_US
customer.password.error.deny_list,"Dieses Passwort ist zu allgemein. Bitte ein neues Passwort eingeben.",de_DE
customer.password.error.sequence,"You repeated the same character too many times.",en_US
customer.password.error.sequence,"Es wurde zu oft das gleiche Zeichen verwendet.",de_DE
customer.password.error.character_set,"Password must contain at least 1 character of each allowed character group: upper case, lower case, digit and a special character.",en_US
customer.password.error.character_set,"Passwort muss mindestens 1 Zeichen von jeder erlaubten Zeichengruppe enthalten: Großschreibung, Kleinschreibung, Zahl und ein Sonderzeichen.",de_DE
```

2. Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Ensure the following:
* The `spy_glossary_key` table has new translation keys.
* The`spy_glossary_translation` table has the corresponding translations.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RedirectUriCustomerRedirectStrategyPlugin | Redirects a customer who has just logged in to the `redirectURI` provided in parameters. | None | SprykerShop\Yves\CustomerPage\Plugin\CustomerPage |
| CustomerConfirmationUserCheckerApplicationPlugin | Adds a service that checks if a customer confirmed the registration before authorizing them.   | None | SprykerShop\Yves\CustomerPage\Plugin\Application |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\CustomerPage\Plugin\CustomerPage\RedirectUriCustomerRedirectStrategyPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CustomerRedirectStrategyPluginInterface[]
     */
    protected function getAfterLoginCustomerRedirectPlugins(): array
    {
        return [
            new RedirectUriCustomerRedirectStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that, when you open `https://mysprykershop.com/login?redirectUri=/cart`, you are redirected to the *Cart* page after login.

{% endinfo_block %}

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\CustomerPage\Plugin\Application\CustomerConfirmationUserCheckerApplicationPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new CustomerConfirmationUserCheckerApplicationPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that when you try to access your account without confirming the registration, you get the error related to registration confirmation.

{% endinfo_block %}


## Related features
| NAME | INTEGRATION GUIDE |
| --- | --- |
| Customer API	 | [Glue API: Customer Account Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html) |
| Customer Account Management + Order Management | [Customer Account Management + Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/customer-account-management-order-management-feature-integration.html)  |
