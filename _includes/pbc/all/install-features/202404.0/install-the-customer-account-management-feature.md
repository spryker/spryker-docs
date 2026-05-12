

This document describes how to install the [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature.

{% info_block errorBox "Included features" %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the following functionalities:
* Redirect support for Customer login functionality.
* Password set and reset console commands for customers.
* Double opt-in for customer registration.
* OAuth
* Improved password security
* Session validation

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Customer Account Management feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/customer-account-management: "{{page.version}}" spryker/oauth-customer-connector:"^1.8.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                           |
|-------------------------|----------------------------------------------|
| Customer                | vendor/spryker/customer                      |
| CustomerGroup           | vendor/spryker/customer-group                |
| CustomerNote            | vendor/spryker/customer-note                 |
| CustomerNoteGui         | vendor/spryker/customer-note-gui             |
| CustomerStorage         | vendor/spryker/customer-storage              |
| Oauth                   | vendor/spryker/oauth                         |
| OauthCryptography       | vendor/spryker/oauth-cryptography            |
| OauthCustomerConnector  | vendor/spryker/oauth-customer-connector      |
| OauthCustomerValidation | vendor/spryker/oauth-customer-validation     |
| OauthRevoke             | vendor/spryker/oauth-revoke                  |

{% endinfo_block %}

### 2) Set up configuration

1. Set the required OAuth config:

{% info_block infoBox %}

For more details about key generation, see [OAuth 2.0 Server Installation](https://oauth2.thephpleague.com/installation/).

{% endinfo_block %}

**config/Shared/config_default.php**

```php
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://path/to/private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://path/to/public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'generated-encryption-key';
$config[OauthConstants::OAUTH_CLIENT_CONFIGURATION] = '[{"identifier":"client-identifier","secret":"client-secret","isConfidential":true,"name":"Customer client","redirectUri":null,"isDefault":true}]';
```

2. Adjust RabbitMq module configuration:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\CustomerStorage\CustomerStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            CustomerStorageConfig::PUBLISH_CUSTOMER_INVALIDATED,
        ];
    }

    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            CustomerStorageConfig::CUSTOMER_INVALIDATED_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

3. Optional: To enable the double opt-in for the customer registration, adjust the `CustomerConfig::isDoubleOptInEnabled()` to return `true`:

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

4. Optional: To control the customer account confirmation link sent in the registration confirmation email, use `CustomerConstants::REGISTRATION_CONFIRMATION_TOKEN_URL`. Keep in mind that the value must contain the `%s` placeholder that the actual customer's token value is inserted to. You can set the configuration in the environment config:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Customer\CustomerConstants;

$config[CustomerConstants::REGISTRATION_CONFIRMATION_TOKEN_URL] = $config[ApplicationConstants::BASE_URL_YVES] . '/register/confirm?token=%s';
```

If you use double opt-in, you can also configure the link the customer gets in an email. This is valuable if you use an alternative storefront. The default link leads to the Yves customer confirmation page.

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Customer\CustomerConstants;

$config[CustomerConstants::REGISTRATION_CONFIRMATION_TOKEN_URL] = 'https://spa.mysprykershop.com/customer/confirm?token=%s';
```

{% info_block warningBox "Verification" %}

Ensure that email to confirm the registration uses the alternative link.

{% endinfo_block %}

You can configure the password strength validation settings in `src/Pyz/Zed/Customer/CustomerConfig.php`:

**src/Pyz/Zed/Customer/CustomerConfig.php**

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * @var int
     */
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 8;

    /**
     * @var int
     */
    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 64;

    /**
     * @return array<string>
     */
    public function getCustomerPasswordAllowList(): array
    {
        return [
            'change123',
        ];
    }

    /**
     * @return array<string>
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

The following table describes the settings:

| SETTING                                                                 | MEANING                                                                                                                                                                   |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CustomerConfig::getCustomerPasswordAllowList()                          | Provides a list of strings that will be accepted as a password for the customer bypassing any policy validations. These will be accepted despite breaking other policies. |
| CustomerConfig::getCustomerPasswordCharacterSet()                       | Provides regular expression for character set password validation.                                                                                                        |
| CustomerConfig::getCustomerPasswordDenyList()                           | A common list of insecure, invalid passwords. These will be rejected immediately.                                                                                         |
| CustomerConfig::getCustomerPasswordSequenceLimit()                      | Provides a limit for character repeating if defined.                                                                                                                      
 Example: `Limit=4` forbids using "aaaa" in the password but allows "aaa". |
| CustomerConfig::MAX_LENGTH_CUSTOMER_PASSWORD                            | Defines password maximum length.                                                                                                                                          |
| CustomerConfig::MIN_LENGTH_CUSTOMER_PASSWORD                            | Defines password minimum length.                                                                                                                                          |

### 3) Set up database schema and transfer objects

**src/Pyz/Zed/Customer/Persistence/Propel/Schema/spy_customer.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Customer\Persistence" package="src.Orm.Zed.Customer.Persistence">

    <table name="spy_customer">
        <behavior name="event">
            <parameter name="spy_customer_anonymized_at" column="anonymized_at"/>
            <parameter name="spy_customer_password" column="password"/>
        </behavior>
    </table>
</database>
```

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have been applied in the transfer objects:

| TRANSFER                                            | TYPE  | EVENT   | PATH                                                                                   |
|-----------------------------------------------------|-------|---------|----------------------------------------------------------------------------------------|
| CustomerCollectionTransfer                          | class | created | src/Generated/Shared/Transfer/CustomerCollectionTransfer.php                           |
| CustomerCriteriaFilterTransfer                      | class | created | src/Generated/Shared/Transfer/CustomerCriteriaFilterTransfer.php                       |
| CustomerIdentifierTransfer                          | class | created | src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php                           |
| CustomerResponseTransfer                            | class | created | src/Generated/Shared/Transfer/CustomerResponseTransfer.php                             |
| CustomerTransfer                                    | class | created | src/Generated/Shared/Transfer/CustomerTransfer.php                                     |
| ErrorTransfer                                       | class | created | src/Generated/Shared/Transfer/ErrorTransfer.php                                        |
| EventEntityTransfer                                 | class | created | src/Generated/Shared/Transfer/EventEntityTransfer.php                                  |
| GlueAuthenticationRequestContextTransfer            | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestContextTransfer.php             |
| GlueAuthenticationRequestTransfer                   | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestTransfer.php                    |
| InvalidatedCustomerCollectionDeleteCriteriaTransfer | class | created | src/Generated/Shared/Transfer/InvalidatedCustomerCollectionDeleteCriteriaTransfer.php  |
| InvalidatedCustomerCollectionTransfer               | class | created | src/Generated/Shared/Transfer/InvalidatedCustomerCollectionTransfer.php                |
| InvalidatedCustomerConditionsTransfer               | class | created | src/Generated/Shared/Transfer/InvalidatedCustomerConditionsTransfer.php                |
| InvalidatedCustomerCriteriaTransfer                 | class | created | src/Generated/Shared/Transfer/InvalidatedCustomerCriteriaTransfer.php                  |
| InvalidatedCustomerTransfer                         | class | created | src/Generated/Shared/Transfer/InvalidatedCustomerTransfer.php                          |
| JwtTokenTransfer                                    | class | created | src/Generated/Shared/Transfer/JwtTokenTransfer.php                                     |
| OauthAccessTokenDataTransfer                        | class | created | src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer.php                         |
| OauthAccessTokenValidationRequestTransfer           | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer.php            |
| OauthAccessTokenValidationResponseTransfer          | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer.php           |
| OauthClientTransfer                                 | class | created | src/Generated/Shared/Transfer/OauthClientTransfer.php                                  |
| OauthErrorTransfer                                  | class | created | src/Generated/Shared/Transfer/OauthErrorTransfer.php                                   |
| OauthGrantTypeConfigurationTransfer                 | class | created | src/Generated/Shared/Transfer/OauthGrantTypeConfigurationTransfer.php                  |
| OauthRefreshTokenCollectionTransfer                 | class | created | src/Generated/Shared/Transfer/OauthRefreshTokenCollectionTransfer.php                  |
| OauthRefreshTokenTransfer                           | class | created | src/Generated/Shared/Transfer/OauthRefreshTokenTransfer.php                            |
| OauthRequestTransfer                                | class | created | src/Generated/Shared/Transfer/OauthRequestTransfer.php                                 |
| OauthResponseTransfer                               | class | created | src/Generated/Shared/Transfer/OauthResponseTransfer.php                                |
| OauthScopeFindRequestTransfer                       | class | created | src/Generated/Shared/Transfer/OauthScopeFindRequestTransfer.php                        |
| OauthScopeFindTransfer                              | class | created | src/Generated/Shared/Transfer/OauthScopeFindTransfer.php                               |
| OauthScopeRequestTransfer                           | class | created | src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php                            |
| OauthScopeTransfer                                  | class | created | src/Generated/Shared/Transfer/OauthScopeTransfer.php                                   |
| OauthTokenCriteriaFilterTransfer                    | class | created | src/Generated/Shared/Transfer/OauthTokenCriteriaFilterTransfer.php                     |
| OauthUserTransfer                                   | class | created | src/Generated/Shared/Transfer/OauthUserTransfer.php                                    |
| PaginationTransfer                                  | class | created | src/Generated/Shared/Transfer/PaginationTransfer.php                                   |
| RevokeRefreshTokenRequestTransfer                   | class | created | src/Generated/Shared/Transfer/RevokeRefreshTokenRequestTransfer.php                    |
| RevokeRefreshTokenResponseTransfer                  | class | created | src/Generated/Shared/Transfer/RevokeRefreshTokenResponseTransfer.php                   |
| SynchronizationDataTransfer                         | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer.php                          |

{% endinfo_block %}

### 4) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                         | SPECIFICATION                                                                                                                                                                                                | PREREQUISITES | NAMESPACE                                                           |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| CustomerOauthUserProviderPlugin                                | Provides a customer OAuth user.                                                                                                                                                                              | None          | Spryker\Zed\OauthCustomerConnector\Communication\Plugin             |
| CustomerOauthScopeProviderPlugin                               | Provides a list of customer scopes.                                                                                                                                                                          | None          | Spryker\Zed\OauthCustomerConnector\Communication\Plugin             |		
| CustomerImpersonationOauthUserProviderPlugin                   | Authenticates a customer by the customer reference.                                                                                                                                                          | None          | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth       |		
| CustomerImpersonationOauthScopeProviderPlugin                  | Returns the customer impersonation scopes.                                                                                                                                                                   | None          | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth       |		
| CustomerImpersonationOauthGrantTypeConfigurationProviderPlugin | Provides configuration of `customer_impersonation` grant type.                                                                                                                                               | None          | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth       |
| OauthExpiredRefreshTokenRemoverPlugin                          | Removes expired refresh tokens by the provided criteria transfer.                                                                                                                                            | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |
| OauthRefreshTokenCheckerPlugin                                 | Checks if refresh token has been revoked.                                                                                                                                                                    | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |
| OauthRefreshTokenReaderPlugin                                  | Finds a refresh token by the provided criteria transfer.                                                                                                                                                     | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |		
| OauthRefreshTokenRevokerPlugin                                 | Revokes a refresh token.                                                                                                                                                                                     | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |		
| OauthRefreshTokenPersistencePlugin                             | Persists a refresh token.                                                                                                                                                                                    | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |
| OauthRefreshTokensReaderPlugin                                 | Retrieves refresh tokens by the provided criteria.                                                                                                                                                           | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |
| OauthRefreshTokensRevokerPlugin                                | Revokes all refresh tokens.                                                                                                                                                                                  | None          | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth                  |		
| CustomerPasswordResetConsole                                   | Generates password restoration keys and sends a password reset email to the customers without a password. Sends a password reset email to all the customers if the corresponding command option is provided. | None          | Spryker\Zed\Customer\Communication\Console                          |
| CustomerPasswordSetConsole                                     | Sends the password reset email to all the customers with the empty password value in the database.                                                                                                           | None          | Spryker\Zed\Customer\Communication\Console                          |		
| CustomerRegistrationConfirmationMailTypePlugin                 | Builds a mail for customer registration confirmation that is used when double opt in feature is enabled.                                                                                                     | None          | Spryker\Zed\Customer\Communication\Plugin\Mail                      |
| *** ValidateInvalidatedCustomerAccessTokenValidatorPlugin      | Validates provided access token if the customer is not anonymized and the password hasn't been changed after a token creation.                                                                               | None          | Spryker\Client\OauthCustomerValidation\Plugin\Oauth                 |
| CustomerInvalidatedWritePublisherPlugin                        | Used in case if customer was invalidated or customer's password was changed and publishes customer data to storage based on customer publish event.                                                          | None          | Spryker\Zed\CustomerStorage\Communication\Plugin\Publisher\Customer |
| EventQueueMessageProcessorPlugin                               | Used for processing invalidated customers within queue.                                                                                                                                                      | None          | Spryker\Zed\Event\Communication\Plugin\Queue                        |
| SynchronizationStorageQueueMessageProcessorPlugin              | Registration of new queue message processor.                                                                                                                                                                 | None          | Spryker\Zed\Synchronization\Communication\Plugin\Queue              |
| CustomerInvalidatedStorageSynchronizationDataPlugin            | Allows synchronizing the whole storage table content into Storage.                                                                                                                                           | None          | Spryker\Zed\CompanyUserStorage\Communication\Plugin\Synchronization |
| DeleteExpiredCustomerInvalidatedRecordsConsole                 | Deletes all expired customer invalidated storage records.                                                                                                                                                    | None          | Spryker\Zed\CustomerStorage\Communication\Console                   |


<details>
<summary>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

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
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface>
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new CustomerOauthUserProviderPlugin(),
            new CustomerImpersonationOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface>
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new CustomerOauthScopeProviderPlugin(),
            new CustomerImpersonationOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthGrantTypeConfigurationProviderPluginInterface>
     */
    protected function getGrantTypeConfigurationProviderPlugins(): array
    {
        return array_merge(parent::getGrantTypeConfigurationProviderPlugins(), [
            new CustomerImpersonationOauthGrantTypeConfigurationProviderPlugin(),
        ]);
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenRevokerPluginInterface>
     */
    protected function getOauthRefreshTokenRevokerPlugins(): array
    {
        return [
            new OauthRefreshTokenRevokerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokensRevokerPluginInterface>
     */
    protected function getOauthRefreshTokensRevokerPlugins(): array
    {
        return [
            new OauthRefreshTokensRevokerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenPersistencePluginInterface>
     */
    protected function getOauthRefreshTokenPersistencePlugins(): array
    {
        return [
            new OauthRefreshTokenPersistencePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenCheckerPluginInterface>
     */
    protected function getOauthRefreshTokenCheckerPlugins(): array
    {
        return [
            new OauthRefreshTokenCheckerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthExpiredRefreshTokenRemoverPluginInterface>
     */
    protected function getOauthExpiredRefreshTokenRemoverPlugins(): array
    {
        return [
            new OauthExpiredRefreshTokenRemoverPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenReaderPluginInterface>
     */
    protected function getOauthRefreshTokenReaderPlugins(): array
    {
        return [
            new OauthRefreshTokenReaderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokensReaderPluginInterface>
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

**src/Pyz/Client/Oauth/OauthDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Oauth;

use Spryker\Client\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Client\OauthCustomerValidation\Plugin\Oauth\ValidateInvalidatedCustomerAccessTokenValidatorPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return array<\Spryker\Client\OauthExtension\Dependency\Plugin\AccessTokenValidatorPluginInterface>
     */
    protected function getAccessTokenValidatorPlugins(): array
    {
        return [
            new ValidateInvalidatedCustomerAccessTokenValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\CustomerStorage\Communication\Plugin\Publisher\Customer\CustomerInvalidatedWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new CustomerInvalidatedWritePublisherPlugin(),
        ];
    }
}
```

Register new queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\CustomerStorage\CustomerStorageConfig;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventQueueMessageProcessorPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            CustomerStorageConfig::PUBLISH_CUSTOMER_INVALIDATED => new EventQueueMessageProcessorPlugin(),
            CustomerStorageConfig::CUSTOMER_INVALIDATED_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CustomerStorage\Communication\Plugin\Synchronization\CustomerInvalidatedStorageSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CustomerInvalidatedStorageSynchronizationDataPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Customer\Communication\Console\CustomerPasswordResetConsole;
use Spryker\Zed\Customer\Communication\Console\CustomerPasswordSetConsole;
use Spryker\Zed\CustomerStorage\Communication\Console\DeleteExpiredCustomerInvalidatedRecordsConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new CustomerPasswordResetConsole(),
            new CustomerPasswordSetConsole(),
            new DeleteExpiredCustomerInvalidatedRecordsConsole(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the OAuth client has been added to the `spy_oauth_client` table by running the following SQL query. The result must contain one record.
 
```sql
SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
```

Ensure you can obtain the customer OAuth access token with customer credentials or customer reference. For details, see [Install the Customer Account Management Glue API](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-account-management-glue-api.html).

Ensure that `OauthRefreshTokenRemoverPlugin` is set up correctly:
1. Run the command:

```bash
console oauth:refresh-token:remove-expired
```
2. Check that all expired refresh tokens that are older than defined by the removal interval you configured in `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` have been deleted:

Ensure that running the `console customer:password:reset` command sends the password reset emails to all customers:

1. Send the password reset email to all the customers inside the database:

```bash
console customer:password:reset
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers have the password reset hash.

Ensure that running the `console customer:password:set` command sends the password reset emails to all the customers without passwords:

1. Send password reset emails to all the customers without passwords:

```bash
console customer:password:set
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers without passwords have the password reset hash.

Ensure that running the `console customer:password:reset`command sends the password reset emails to all customers:

1. Send the password reset email to all the customers inside the database:

```bash
console customer:password:reset
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers have the password reset hash.

Ensure that running the `console customer:password:set`command sends the password reset emails to all the customers without passwords:
1. Send password reset emails to all the customers without passwords:

```bash
console customer:password:set
```
2. Open the  `spy_customer.restore_password_key` table and ensure that all the customers without passwords have the password reset hash.

{% endinfo_block %}

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Ensure that the customer confirmation email is sent to the newly registered customers upon registration.

{% endinfo_block %}

1. Enable Jenkins check for finding and deleting expired refresh tokens and invalidated customers:

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

/* Customer */
$jobs[] = [
    'name' => 'delete-expired-customer-invalidated',
    'command' => '$PHP_BIN vendor/bin/console customer:delete-expired-customer-invalidated',
    'schedule' => '0 0 * * 0',
    'enable' => true,
    'stores' => $allStores,
];
```

### 5) Import data

Import the following data.

#### Add infrastructural data

Add infrastructural data as follows:

1. Install the following plugins:

| PLUGIN                            | SPECIFICATION                                  | PREREQUISITES | NAMESPACE                                                         |
|-----------------------------------|------------------------------------------------|---------------|-------------------------------------------------------------------|
| OauthClientInstallerPlugin        | Populates the database with OAuth client data. | None          | Spryker\Zed\Oauth\Communication\Plugin\Installer                  |
| OauthCustomerScopeInstallerPlugin | Installs OAuth customer scope data.            | None          | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer |

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
     * @return array<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface>
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

2. Set up the OAuth client:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Ensure the following:

* The `spy_oauth_client` table is populated with the OAuth client(s) you configured in the `\Spryker\Shared\Oauth\OauthConstants::OAUTH_CLIENT_CONFIGURATION` of environment config files.

* The `spy_oauth_scope` tables are filled with customer scopes.

{% endinfo_block %}


## Install feature frontend

Follow the steps below to install the Customer Account Management feature frontend.

### Prerequisites

To start feature integration, integrate the required feature:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/customer-account-management: "{{page.version}}" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Ensure that the following modules were installed:

| MODULE                        | EXPECTED DIRECTORY                                   |
|-------------------------------|------------------------------------------------------|
| CustomerPage                  | vendor/spryker-shop/customer-page                    |
| CustomerValidationPage        | vendor/spryker-shop/customer-validation-page         |
| SessionCustomerValidationPage | vendor/spryker-shop/session-customer-validation-page |


{% endinfo_block %}

### 2) Set up configuration

Optional: To enable double opt-in for customer registration, adjust the `CustomerPageConfig::isDoubleOptInEnabled()` method to return `true`.

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

By default, in Spryker, posting the login form (where SecurityBlocker makes its check and blocks users who made too many failed login attempts) is local-independent. So, to see error messages translated into different languages, you need to configure the locale to be added to the login path. You can do this by modifying the following configs:

**src/Pyz/Yves/CustomerPage/CustomerPageConfig.php**

Optional: For security reasons, we recommend enabling the security blocker feature that will block recurring attempts of resetting a password by setting `CUSTOMER_SECURITY_BLOCKER_ENABLED` to `true;`

```php
<?php

namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    /**
     * @var bool
     */
    protected const CUSTOMER_SECURITY_BLOCKER_ENABLED = true;

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

Make sure that when the login form for the customer is submitted, the URL it uses contains a locale code—for example, `/de/login_check` is the default value for the customer.

{% endinfo_block %}

You can define the password minimum and maximum length the frontend can use. They must use the same as you defined for the core feature in the previous `CustomerConfig`:

**src/Pyz/Yves/CustomerPage/CustomerPageConfig.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    /**
     * @uses \Pyz\Zed\Customer\CustomerConfig::MIN_LENGTH_CUSTOMER_PASSWORD
     *
     * @var int
     */
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 8;

    /**
     * @uses \Pyz\Zed\Customer\CustomerConfig::MAX_LENGTH_CUSTOMER_PASSWORD
     *
     * @var int
     */
    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 64;
}
```

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                      | TYPE  | EVENT   | PATH                                                        |
|-------------------------------|-------|---------|-------------------------------------------------------------|
| SessionEntityRequestTransfer  | class | created | src/Generated/Shared/Transfer/SessionEntityRequestTransfer  |
| SessionEntityResponseTransfer | class | created | src/Generated/Shared/Transfer/SessionEntityResponseTransfer |

{% endinfo_block %}

### 4) Add translations

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
password.message,Try lengthening the password or adding numbers or symbols.,en_US
password.message,Versuchen Sie es zu verlängern oder Zahlen oder Symbole hinzuzufügen.,de_DE
customer.password.error.deny_list,"This password is considered common. Please use another one.",en_US
customer.password.error.deny_list,"Dieses Passwort ist zu allgemein. Bitte ein neues Passwort eingeben.",de_DE
customer.password.error.sequence,"You repeated the same character too many times.",en_US
customer.password.error.sequence,"Es wurde zu oft das gleiche Zeichen verwendet.",de_DE
customer.password.error.character_set,"Password must contain at least 1 character of each allowed character group: upper case, lower case, digit, and a special character.",en_US
customer.password.error.character_set,"Passwort muss mindestens 1 Zeichen von jeder erlaubten Zeichengruppe enthalten: Großschreibung, Kleinschreibung, Zahl und ein Sonderzeichen.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Ensure the following:
* The `spy_glossary_key` table has new translation keys.
* The `spy_glossary_translation` table has the corresponding translations.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                       | SPECIFICATION                                                                                | PREREQUISITES                     | NAMESPACE                                                       |
|--------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------|-----------------------------------------------------------------|
| RedirectUriCustomerRedirectStrategyPlugin                    | Redirects a customer who has just logged in to the `redirectURI` provided in parameters.     | None                              | SprykerShop\Yves\CustomerPage\Plugin\CustomerPage               |
| CustomerConfirmationUserCheckerApplicationPlugin             | Adds a service that checks if a customer confirmed the registration before authorizing them. | None                              | SprykerShop\Yves\CustomerPage\Plugin\Application                |
| SaveCustomerSessionSecurityPlugin                            | Extends security builder event dispatcher with save customer session listener.               | None                              | SprykerShop\Yves\SessionCustomerValidationPage\Plugin\Security  |
| ValidateCustomerSessionSecurityPlugin                        | Extends security service with customer session validator listener.                           | None                              | SprykerShop\Yves\SessionCustomerValidationPage\Plugin\Security  |
| LogoutInvalidatedCustomerFilterControllerEventHandlerPlugin  | Logs out an invalidated customer.                                                            | None                              | SprykerShop\Yves\CustomerValidationPage\Plugin\ShopApplication  |
| RedisCustomerSessionSaverPlugin                              | Saves customer's session data to Redis storage.                                              | Session data is stored in Redis.  | Spryker\Yves\SessionRedis\Plugin\SessionCustomerValidationPage  |
| RedisCustomerSessionValidatorPlugin                          | Validates customer's session data in Redis storage.                                          | Session data is stored in Redis.  | Spryker\Yves\SessionRedis\Plugin\SessionCustomerValidationPage  |
| FileCustomerSessionSaverPlugin                               | Saves customer's session data to a file.                                                     | Session data is stored in a file. | Spryker\Yves\SessionFile\Plugin\SessionCustomerValidationPage   |
| FileCustomerSessionValidatorPlugin                           | Validates customer's session data in a file.                                                 | Session data is stored in a file. | Spryker\Yves\SessionFile\Plugin\SessionCustomerValidationPage   |

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
use SprykerShop\Yves\CustomerValidationPage\Plugin\ShopApplication\LogoutInvalidatedCustomerFilterControllerEventHandlerPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new CustomerConfirmationUserCheckerApplicationPlugin(),
        ];
    }

    /**
     * @return array<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\FilterControllerEventHandlerPluginInterface>
     */
    protected function getFilterControllerEventSubscriberPlugins(): array
    {
        return [
            ...
            new LogoutInvalidatedCustomerFilterControllerEventHandlerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that when you try to access your account without confirming the registration, you get the error related to registration confirmation.

{% endinfo_block %}


**src/Pyz/Yves/Security/SecurityDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Security;

use Spryker\Yves\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use SprykerShop\Yves\SessionCustomerValidationPage\Plugin\Security\SaveCustomerSessionSecurityPlugin;
use SprykerShop\Yves\SessionCustomerValidationPage\Plugin\Security\ValidateCustomerSessionSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new ValidateCustomerSessionSecurityPlugin(),
            new SaveCustomerSessionSecurityPlugin(),
        ];
    }
}
```

{% info_block warningBox "Warning" %}

Apply the following changes only if session data is stored in Redis.

{% endinfo_block %}

**src/Pyz/Yves/SessionCustomerValidationPage/SessionCustomerValidationPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\SessionCustomerValidationPage;

use Spryker\Yves\SessionRedis\Plugin\SessionCustomerValidationPage\RedisCustomerSessionSaverPlugin;
use Spryker\Yves\SessionRedis\Plugin\SessionCustomerValidationPage\RedisCustomerSessionValidatorPlugin;
use SprykerShop\Yves\SessionCustomerValidationPage\SessionCustomerValidationPageDependencyProvider as SprykerSessionCustomerValidationPageDependencyProvider;
use SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionSaverPluginInterface;
use SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionValidatorPluginInterface;

/**
 * @method \SprykerShop\Yves\SessionCustomerValidationPage\SessionCustomerValidationPageConfig getConfig()
 */
class SessionCustomerValidationPageDependencyProvider extends SprykerSessionCustomerValidationPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionSaverPluginInterface
     */
    protected function getCustomerSessionSaverPlugin(): CustomerSessionSaverPluginInterface
    {
        return new RedisCustomerSessionSaverPlugin();
    }

    /**
     * @return \SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionValidatorPluginInterface
     */
    protected function getCustomerSessionValidatorPlugin(): CustomerSessionValidatorPluginInterface
    {
        return new RedisCustomerSessionValidatorPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as a customer.
2. Ensure that the following Redis key exists and contains data:
   `{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}:customer:entity`
3. Changed the session data to an invalid value.
4. Verify that the customer was logged out.

{% endinfo_block %}

{% info_block warningBox "Warning" %}

Apply the following changes only if session data is stored in a file.

{% endinfo_block %}

**src/Pyz/Yves/SessionCustomerValidationPage/SessionCustomerValidationPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\SessionCustomerValidationPage;

use Spryker\Yves\SessionFile\Plugin\SessionCustomerValidationPage\FileCustomerSessionSaverPlugin;
use Spryker\Yves\SessionFile\Plugin\SessionCustomerValidationPage\FileCustomerSessionValidatorPlugin;
use SprykerShop\Yves\SessionCustomerValidationPage\SessionCustomerValidationPageDependencyProvider as SprykerSessionCustomerValidationPageDependencyProvider;
use SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionSaverPluginInterface;
use SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionValidatorPluginInterface;

/**
 * @method \SprykerShop\Yves\SessionCustomerValidationPage\SessionCustomerValidationPageConfig getConfig()
 */
class SessionCustomerValidationPageDependencyProvider extends SprykerSessionCustomerValidationPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionSaverPluginInterface
     */
    protected function getCustomerSessionSaverPlugin(): CustomerSessionSaverPluginInterface
    {
        return new FileCustomerSessionSaverPlugin();
    }

    /**
     * @return \SprykerShop\Yves\SessionCustomerValidationPageExtension\Dependency\Plugin\CustomerSessionValidatorPluginInterface
     */
    protected function getCustomerSessionValidatorPlugin(): CustomerSessionValidatorPluginInterface
    {
        return new FileCustomerSessionValidatorPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as a customer.
2. Ensure that a file in the following path exists and contains data:
   `data/session/session:customer:{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}`
3. Changed the session data to an invalid value.
4. Verify that the customer was logged out.

{% endinfo_block %}

## Install related features

| NAME                                           | INSTALLATION GUIDE                                                                                                                                                                                      |
|------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Customer API	                                  | [Install the Customer Account Management Glue API](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-account-management-glue-api.html)       |
| Customer Account Management + Order Management | [Install the Customer Account Management + Order Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-order-management-feature.html) |
