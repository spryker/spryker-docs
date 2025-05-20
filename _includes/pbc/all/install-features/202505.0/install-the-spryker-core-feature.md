


This document describes how to install the [Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/spryker-core-feature-overview/spryker-core-feature-overview.html).

{% info_block infoBox "Included features" %}


This guide expects the basic feature to be installed. This guide adds the following functionalities:
* Vault
* Redis Session
* Store GUI
* Blocking too many failed login attempts
* Audit logging
* Rule engine

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Spryker Core feature core.

### 1) Install the required modules

```bash
composer require "spryker-feature/spryker-core":"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                            | EXPECTED DIRECTORY                                  |
|-----------------------------------|-----------------------------------------------------|
| Log                               | vendor/spryker/log                                  |
| LogExtension                      | vendor/spryker/log-extension                        |
| UtilEncryption                    | vendor/spryker/util-encryption                      |
| Vault                             | vendor/spryker/vault                                |
| Router                            | vendor/spryker/router                               |
| SessionExtension                  | vendor/spryker/session-extension                    |
| SessionRedis                      | vendor/spryker/session-redis                        |
| SessionFile                       | vendor/spryker/session-redis                        |
| StoreGui                          | vendor/spryker/store-gui                            |
| StorageExtension                  | vendor/spryker/storage-extension                    |
| StorageRedis                      | vendor/spryker/storage-redis                        |
| SecuritySystemUser                | vendor/spryker/security-system-user                 |
| SecurityBlocker                   | vendor/spryker/security-blocker                     |
| SecurityBlockerExtension          | vendor/spryker/security-blocker-extension           |
| SecurityBlockerStorefrontCustomer | vendor/spryker/security-blocker-storefront-customer |
| RuleEngine                        | vendor/spryker/rule-engine                          |
| RuleEngineExtension               | vendor/spryker/rule-engine-extension                |

{% endinfo_block %}

### 2) Set up configuration

Set up the following configuration.

#### Optional: Set up Router

To user router cache, add the following configuration:

```php
<?php

namespace Pyz\Zed\Router;

use Spryker\Zed\Router\RouterConfig as SprykerRouterConfig;

class RouterConfig extends SprykerRouterConfig
{
    /**
     * @return bool
     */
    public function isRoutingCacheEnabled(): bool
    {
        return true;
    }
}
```

#### Set up SecuritySystemUser

Add the configuration:

| CONFIGURATION                                                    | SPECIFICATION                               | NAMESPACE                         |
|------------------------------------------------------------------|---------------------------------------------|-----------------------------------|
| SecuritySystemUserConstants::SYSTEM_USER_SESSION_REDIS_LIFE_TIME | Redis session lifetime.                     | Spryker\Shared\SecuritySystemUser |
| SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS            | Default credentials for Yves accessing Zed. | Spryker\Shared\SecuritySystemUser |

{% info_block errorBox "Security measures" %}

To prevent the backend from being compromised, make sure that, in production environments, `SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS` is secured.

{% endinfo_block %}


**config/Shared/config_local.php**

```php
<?php

use Spryker\Shared\SecuritySystemUser\SecuritySystemUserConstants;

$config[SecuritySystemUserConstants::SYSTEM_USER_SESSION_REDIS_LIFE_TIME] = 20;
$config[SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'token' => getenv('SPRYKER_ZED_REQUEST_TOKEN') ?: "ADJUST THIS TOKEN TO A SECURE ONE",
    ],
];
```

#### Set up Vault

Add the configuration:

| CONFIGURATION                  | SPECIFICATION        | NAMESPACE            |
|--------------------------------|----------------------|----------------------|
| VaultConstants::ENCRYPTION_KEY | Encrypts vault data. | Spryker\Shared\Vault |

{% info_block errorBox "Security measures" %}

Make sure that, in production environments, the encryption key is secured. This key protects all the data stored in the Vault.

{% endinfo_block %}


**config/Shared/config_local.php**

```php
<?php

use Spryker\Shared\Vault\VaultConstants;

$config[VaultConstants::ENCRYPTION_KEY] = "ADJUST THIS ENCRYPTION KEY TO SECURE ONE"
```

Example:

```php
$secret = "actual_secret";

$vaultFacade->store("secret_category", "secret_id", $secret);

assertSame($secret, $vaultFacade->retrieve("secret_category", "secret_id"));
```

#### Configure Redis

Add the configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS	 | Defines the Redis lock timeout in milliseconds. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS	 | Defines the retry delay between the attempts to acquire Redis lock in microseconds. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS	 | Defines the time to live for Redis lock in milliseconds. | Spryker\Shared\SessionRedis |
| SessionFileConstants::ZED_SESSION_FILE_PATH	 | Defines the filesystem path for storing Zed sessions. | Spryker\Shared\SessionFile |
| SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD	 | Defines the password for connecting to Redis as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_HOST	 | Defines the host for connecting to Redis as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_PORT	 | Defines the protocol for connecting to Redis as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_DATABASE	 | Defines the database for connecting to Redis as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES	 | Defines the list of DSNs for connecting to Redis a as Zed session storage in replication mode. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_CLIENT_OPTIONS	 | Defines the list of client options for connecting to Redis as a Zed session storage in replication mode. | Spryker\Shared\SessionRedis |
| StorageRedisConstants::STORAGE_REDIS_PROTOCOL	 | Defines the protocol for connecting to Redis as a key-value storage. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_PASSWORD	 | Defines the password for connecting to Redis as a key-value storage. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_HOST	 | Defines the host for connecting to Redis as a key-value storage. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_PORT	 | Defines the port for connecting to Redis as a key-value storage. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_DATABASE	 | Defines the database for connecting to Redis as a key-value storage. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION	 | Enables and disables data persistence for a Redis connection. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES	 | Specifies an array of DSN strings for a multi-instance cluster and replication Redis setup. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_CONNECTION_OPTIONS	 | Specifies an array of client options for connecting to Redis as a key-value storage. | Spryker\Shared\StorageRedis |

#### Configure general storage

{% info_block warningBox "" %}

Make sure to replace all the values in the following examples with real values.

{% endinfo_block %}

In case of a multi-instance Redis setup, add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\StorageRedis\StorageRedisConstants;

// ---------- KV storage
$config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION] = true;
$config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = 6379;
$config[StorageRedisConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 0;
```

In case of a single-instance Redis setup, add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\StorageRedis\StorageRedisConstants;

// ---------- KV storage
$config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION] = true;
$config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = 6379;
$config[StorageRedisConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 0;
```


#### Configure session storage

{% info_block warningBox "" %}

Make sure to replace all the values in the following examples with real values.

{% endinfo_block %}

If Redis is used as session storage, add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
use Spryker\Shared\SessionRedis\SessionRedisConstants;

// ---------- Session
$config[SessionConstants::ZED_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
$config[SessionRedisConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = 0;
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = 0;
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 0;
```

{% info_block warningBox "" %}

`SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING` and `SessionRedisConfig::SESSION_HANDLER_REDIS` can be used as values for `SessionConstants::ZED_SESSION_SAVE_HANDLER`.

{% endinfo_block %}

In case of a multi-instance Redis setup, add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\SessionRedis\SessionRedisConstants;

$config[SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379'];
$config[SessionRedisConstants::ZED_SESSION_REDIS_CLIENT_OPTIONS] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
    'parameters' => [
        'password' => 'secret',
        'database' => 2,
    ],
];
```

{% info_block warningBox "" %}

This configuration is used exclusively. In other words, you can't use any other Redis configuration.

{% endinfo_block %}

In case of a single-instance Redis setup, add the following configuration:

**config/Share/config_default.php**

```php
<?php

use Spryker\Shared\SessionRedis\SessionRedisConstants;

$config[SessionRedisConstants::ZED_SESSION_REDIS_SCHEME] = 'tcp';
$config[SessionRedisConstants::ZED_SESSION_REDIS_HOST] = '127.0.0.1';
$config[SessionRedisConstants::ZED_SESSION_REDIS_PORT] = 6379;
$config[SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATABASE] = 2;
```

If the file system is used as a session storage, add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionFile\SessionFileConfig;
use Spryker\Shared\SessionFile\SessionFileConstants;

// ---------- Session
$config[SessionConstants::ZED_SESSION_SAVE_HANDLER] = SessionFileConfig::SESSION_HANDLER_FILE;
$config[SessionFileConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionFileConstants::ZED_SESSION_FILE_PATH] = session_save_path();
```

#### Configure SecurityBlocker

1. `SecurityBlocker` stores information about blocked accounts in Redis. So, it needs connection information. You can get it in the environment configuration of your project:

**config/Shared/config_default.php**

```php
$config[SecurityBlockerConstants::SECURITY_BLOCKER_REDIS_PERSISTENT_CONNECTION] = true;
$config[SecurityBlockerConstants::SECURITY_BLOCKER_REDIS_PROTOCOL] = 'tcp';
$config[SecurityBlockerConstants::SECURITY_BLOCKER_REDIS_HOST] = '127.0.0.1';
$config[SecurityBlockerConstants::SECURITY_BLOCKER_REDIS_PORT] = 6379;
$config[SecurityBlockerConstants::SECURITY_BLOCKER_REDIS_PASSWORD] = false;
$config[SecurityBlockerConstants::SECURITY_BLOCKER_REDIS_DATABASE] = 7;
```

2. Add environment configuration for customer security:

| CONFIGURATION                                                                    | SPECIFICATION                                                                                                                                                             | NAMESPACE                                        |
|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCK_FOR_SECONDS           | Specifies the TTL configuration: the time period for which an agent is blocked if the number of attempts is exceeded for a customer.                                      | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCKING_TTL                | Specifies the TTL configuration: the time period within which a number of unsuccessful attempts for a customer is counted to block the agent.                             | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCKING_NUMBER_OF_ATTEMPTS | Defines the number of failed login attempts to make within the time period defined in `SECURITY_BLOCKER_STOREFRONT:CUSTOMER_BLOCKING_TTL` before the customer is blocked. | Spryker\Shared\SecurityBlockerStorefrontCustomer |

**config/Shared/config_default.php**

```php
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCKING_TTL] = 900;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;
```

#### Configure audit logging

1. Add the configuration:

| CONFIGURATION                                             | SPECIFICATION                                                                                                  | NAMESPACE          |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|--------------------|
| LogConstants::LOG_FILE_PATH_ZED                           | Absolute path to the log file to be used by the stream handler.                                                | Spryker\Shared\Log |
| LogConstants::LOG_FILE_PATH_GLUE                          | Absolute path to the log file to be used by the stream handler.                                                | Spryker\Shared\Log |
| LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_ZED             | Provides plugin class names providing the configuration for audit logging for the Zed application.             | Spryker\Shared\Log |
| LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_MERCHANT_PORTAL | Provides plugin class names providing the configuration for audit logging for the Merchant Portal application. | Spryker\Shared\Log |
| LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE            | Provides plugin class names providing the configuration for audit logging for the Glue application.            | Spryker\Shared\Log |
| LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_BACKEND    | Provides plugin class names providing the configuration for audit logging for the Glue Backend application.    | Spryker\Shared\Log |
| LogConstants::AUDIT_LOG_SANITIZE_FIELDS                   | Provides an array with names that are used to sanitize data in audit logs.                                     | Spryker\Shared\Log |
| LogConstants::AUDIT_LOG_SANITIZED_VALUE                   | Provides a string used as a value for the audit log sanitized fields.                                          | Spryker\Shared\Log |
| LogConstants::AUDIT_LOG_TAG_DISALLOW_LIST                 | Provides a list of audit log tags that are disallowed for logging.                                             | Spryker\Shared\Log |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Glue\Log\Plugin\Log\GlueBackendSecurityAuditLoggerConfigPlugin;
use Spryker\Glue\Log\Plugin\Log\GlueSecurityAuditLoggerConfigPlugin;
use Spryker\Shared\Log\LogConstants;
use Spryker\Zed\Log\Communication\Plugin\Log\MerchantPortalSecurityAuditLoggerConfigPlugin;
use Spryker\Zed\Log\Communication\Plugin\Log\ZedSecurityAuditLoggerConfigPlugin;

$config[LogConstants::LOG_FILE_PATH_ZED]
    = $config[LogConstants::LOG_FILE_PATH_GLUE]
    =  'php://stdout';
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_ZED] = [
    ZedSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE] = [
    GlueSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_BACKEND] = [
    GlueBackendSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_MERCHANT_PORTAL] = [
    MerchantPortalSecurityAuditLoggerConfigPlugin::class,
];
```

{% info_block warningBox "Verification" %}

After finishing the installation, make sure the following applies:
* Security actions in Zed, Glue, Glue Backend, and Merchant Portal applications can be logged.
* The configured log file paths contain the corresponding logs for each application.
Example:

```php
<?php

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Spryker\Shared\Log\AuditLoggerTrait;

class AuditLogger
{
    use AuditLoggerTrait;

    /**
     * @param string $action
     * @param list<string> $tags
     *
     * @return void
     */
    public function addAuditLog(string $action, array $tags): void
    {
        $this->getAuditLogger(
            (new AuditLoggerConfigCriteriaTransfer())->setChannelName('security'),
        )->info('user logged in', ['tags' => ['user_logged_in']]);
    }
}
```

{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOG_SANITIZE_FIELDS] = [
    'password',
];
$config[LogConstants::AUDIT_LOG_SANITIZED_VALUE] = '*****'; // The default value is ***
```

{% info_block warningBox "Verification" %}

Make sure the specified request data fields are sanitized in the logs.

{% endinfo_block %}

2. Optional: Disallow logging of specific tags. Example of disallowing logging of `user_logged_in` tags:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOG_TAG_DISALLOW_LIST] = ['user_logged_in'];

```

{% info_block warningBox "Verification" %}

Make sure that logging for 'user_logged_in' tags doesn't write any logs.

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Apply database changes, generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_vault_deposit | table | created |

| TRANSFER | TYPE | EVENT | PATH                                                                       |
| --- | --- | --- |----------------------------------------------------------------------------|
| SpyVaultDepositEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyVaultDepositEntityTransfer                |
| VaultDepositTransfer | class | created | src/Generated/Shared/Transfer/VaultDepositTransfer                         |
| RedisConfigurationTransfer | class | created | src/Generated/Shared/Transfer/RedisConfigurationTransfer                   |
| RedisCredentialsTransfer | class | created | src/Generated/Shared/Transfer/RedisCredentialsTransfer                     |
| UserTransfer | class | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| MessageTransfer | class | created | src/Generated/Shared/Transfer/MessageTransfer                              |
| GroupCriteriaTransfer | class | created | src/Generated/Shared/Transfer/GroupCriteriaTransfer                        |
| GroupTransfer | class | created | src/Generated/Shared/Transfer/GroupTransfer                                |
| UserCriteriaTransfer | class | created | src/Generated/Shared/Transfer/UserCriteriaTransfer                         |
| SecurityCheckAuthContextTransfer | class | created | src/Generated/Shared/Transfer/SecurityCheckAuthContextTransfer             |
| SecurityCheckAuthResponseTransfer | class | createdl | src/Generated/Shared/Transfer/SecurityCheckAuthResponseTransfer            |
| SecurityBlockerConfigurationSettingsTransfer | class | created | src/Generated/Shared/Transfer/SecurityBlockerConfigurationSettingsTransfer |
| AuditLoggerConfigCriteriaTransfer | class | created | src/Generated/Shared/Transfer/AuditLoggerConfigCriteriaTransfer |

{% endinfo_block %}

### 4) Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
rule_engine.validation.invalid_query_string,The provided query string has an invalid format.,en_US
rule_engine.validation.invalid_query_string,Die angegebene Abfragezeichenfolge hat ein ungültiges Format.,de_DE
rule_engine.validation.invalid_compare_operator_value,The provided compare operator is invalid.,en_US
rule_engine.validation.invalid_compare_operator_value,Der angegebene Vergleichsoperator ist ungültig.,de_DE
```

2. Add the glossary keys:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 5) Set up behavior

1. Install the following plugins with modules:

| PLUGIN                                                     | SPECIFICATION                                                                                                                                                              | PREREQUISITES | NAMESPACE                                                                                                                          |
|------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |------------------------------------------------------------------------------------------------------------------------------------|
| ZedSecurityApplicationPlugin | Extends the Zed global container with required services for security functionality. |  | Spryker\Zed\Security\Communication\Plugin\Application                    |
| SessionHandlerFileProviderPlugin | Provides a file-based session handler implementation for Zed sessions. |  | Spryker\Zed\SessionFile\Communication\Plugin\Session                     |
| SessionHandlerRedisLockingProviderPlugin | Provides a Redis-based session handler implementation with session locking for Zed sessions. |  | Spryker\Zed\SessionRedis\Communication\Plugin\Session                    |
| SessionHandlerRedisProviderPlugin	 | Provides a Redis-based session handler implementation for Zed sessions. |  | Spryker\Zed\SessionRedis\Communication\Plugin\Session                    |
| StorageRedisPlugin | Provides a Redis-based storage implementation. |  | Spryker\Client\StorageRedis\Plugin                                       |
| ZedSystemUserSecurityPlugin | Sets security firewalls, such as rules and handlers, for system users; provides Yves access to Zed. |  | Spryker\Zed\SecurityGui\Communication\Plugin\Security                    |
| ZedSessionRedisLockReleaserPlugin | Removes a session lock from Redis by session ID for Zed sessions. It's used for removing previously created locks by running `session:lock:remove`. |  | Spryker\Zed\SessionRedis\Communication\Plugin\Session                    |
| CustomerSecurityBlockerConfigurationSettingsExpanderPlugin | Expands security blocker configuration settings with customer settings. |  | Spryker\Client\SecurityBlockerStorefrontCustomer\Plugin\SecurityBlocker\CustomerSecurityBlockerConfigurationSettingsExpanderPlugin |
| AuditLogTagFilterBufferedStreamHandlerPlugin               | Provides the Monolog handler.                                                                                                                                                  |  | Spryker\Glue\Log\Plugin\Log                                                                                                        |
| PsrLogMessageProcessorPlugin                               | Processes a record's message according to PSR-3 rules.                                                                                                                     |  | Spryker\Glue\Log\Plugin\Processor                                                                                                  |
| EnvironmentProcessorPlugin                                 | Adds environment related data to the log data.                                                                                                                             |  | Spryker\Glue\Log\Plugin\Processor                                                                                                  |
| ServerProcessorPlugin                                      | Adds service related data to the log data.                                                                                                                                  |  | Spryker\Glue\Log\Plugin\Processor                                                                                                  |
| AuditLogRequestProcessorPlugin                             | Adds request related data to the log data.                                                                                                                                 |  | Spryker\Glue\Log\Plugin\Log                                                                                                        |
| ResponseProcessorPlugin                                    | Removes response data from the log data.                                                                                                                                   |  | Spryker\Glue\Log\Plugin\Processor                                                                                                  |
| AuditLogMetaDataProcessorPlugin                            | Adds the `audit_log` log type to the log data.                                                                                                                                 |  | Spryker\Glue\Log\Plugin\Log                                                                                                        |
| AuditLogTagFilterBufferedStreamHandlerPlugin               | Provides the Monolog handler.                                                                                                                                                  |  | Spryker\Zed\Log\Communication\Plugin\Log                                                                                           |
| PsrLogMessageProcessorPlugin                               | Processes a record's message according to PSR-3 rules.                                                                                                                     |  | Spryker\Zed\Log\Communication\Plugin\Processor                                                                                     |
| EnvironmentProcessorPlugin                                 | Adds environment related data to the log data.                                                                                                                             |  | Spryker\Zed\Log\Communication\Plugin\Processor                                                                                     |
| ServerProcessorPlugin                                      | Adds service related data to the log data.                                                                                                                                  |  | Spryker\Zed\Log\Communication\Plugin\Processor                                                                                     |
| AuditLogRequestProcessorPlugin                             | Adds request related data to the log data.                                                                                                                                 |  | Spryker\Zed\Log\Communication\Plugin\Log                                                                                           |
| ResponseProcessorPlugin                                    | Removes response data from the log data.                                                                                                                                   |  | Spryker\Zed\Log\Communication\Plugin\Processor                                                                                     |
| AuditLogMetaDataProcessorPlugin                            | Adds the `audit_log` log type to the log data.                                                                                                                                 |  | Spryker\Zed\Log\Communication\Plugin\Log                                                                                           |

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Security\Communication\Plugin\Application\ZedSecurityApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new ZedSecurityApplicationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Security/SecurityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Security;

use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use Spryker\Zed\SecuritySystemUser\Communication\Plugin\Security\ZedSystemUserSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new ZedSystemUserSecurityPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Session/SessionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Session;

use Spryker\Zed\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Zed\SessionFile\Communication\Plugin\Session\SessionHandlerFileProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\SessionHandlerRedisLockingProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\SessionHandlerRedisProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\ZedSessionRedisLockReleaserPlugin;

class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\SessionExtension\Dependency\Plugin\SessionHandlerProviderPluginInterface>
     */
    protected function getSessionHandlerPlugins(): array
    {
        return [
            new SessionHandlerRedisProviderPlugin(),
            new SessionHandlerRedisLockingProviderPlugin(),
            new SessionHandlerFileProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SessionExtension\Dependency\Plugin\SessionLockReleaserPluginInterface>
     */
    protected function getZedSessionLockReleaserPlugins(): array
    {
        return [
            new ZedSessionRedisLockReleaserPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Storage/StorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Storage;

use Spryker\Client\Storage\StorageDependencyProvider as SprykerStorageDependencyProvider;
use Spryker\Client\StorageExtension\Dependency\Plugin\StoragePluginInterface;
use Spryker\Client\StorageRedis\Plugin\StorageRedisPlugin;

class StorageDependencyProvider extends SprykerStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\StorageExtension\Dependency\Plugin\StoragePluginInterface|null
     */
    protected function getStoragePlugin(): ?StoragePluginInterface
    {
        return new StorageRedisPlugin();
    }
}
```

**src/Pyz/Client/SecurityBlocker/SecurityBlockerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\SecurityBlocker\SecurityBlockerDependencyProvider as SprykerSecurityBlockerDependencyProvider;
use Spryker\Client\SecurityBlockerStorefrontCustomer\Plugin\SecurityBlocker\CustomerSecurityBlockerConfigurationSettingsExpanderPlugin;

class SecurityBlockerDependencyProvider extends SprykerSecurityBlockerDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerConfigurationSettingsExpanderPluginInterface>
     */
    protected function getSecurityBlockerConfigurationSettingsExpanderPlugins(): array
    {
        return [
            new CustomerSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Go to `https://zed.mysprykershop.com` and make sure Zed boots up without errors.

{% endinfo_block %}

<details>
  <summary>src/Pyz/Glue/Log/LogDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\Log;

use Spryker\Glue\Log\LogDependencyProvider as SprykerLogDependencyProvider;
use Spryker\Glue\Log\Plugin\Log\AuditLogMetaDataProcessorPlugin;
use Spryker\Glue\Log\Plugin\Log\AuditLogRequestProcessorPlugin;
use Spryker\Glue\Log\Plugin\Log\AuditLogTagFilterBufferedStreamHandlerPlugin;
use Spryker\Glue\Log\Plugin\Processor\EnvironmentProcessorPlugin;
use Spryker\Glue\Log\Plugin\Processor\PsrLogMessageProcessorPlugin;
use Spryker\Glue\Log\Plugin\Processor\ResponseProcessorPlugin;
use Spryker\Glue\Log\Plugin\Processor\ServerProcessorPlugin;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getGlueSecurityAuditLogHandlerPlugins(): array
    {
        return [
            new AuditLogTagFilterBufferedStreamHandlerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getGlueBackendSecurityAuditLogHandlerPlugins(): array
    {
        return [
            new AuditLogTagFilterBufferedStreamHandlerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getGlueSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new PsrLogMessageProcessorPlugin(),
            new EnvironmentProcessorPlugin(),
            new ServerProcessorPlugin(),
            new AuditLogRequestProcessorPlugin(),
            new ResponseProcessorPlugin(),
            new AuditLogMetaDataProcessorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getGlueBackendSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new PsrLogMessageProcessorPlugin(),
            new EnvironmentProcessorPlugin(),
            new ServerProcessorPlugin(),
            new AuditLogRequestProcessorPlugin(),
            new ResponseProcessorPlugin(),
            new AuditLogMetaDataProcessorPlugin(),
        ];
    }
}
```

</details>


<details>
  <summary>src/Pyz/Zed/Log/LogDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Log;

use Spryker\Zed\Log\Communication\Plugin\Log\AuditLogMetaDataProcessorPlugin;
use Spryker\Zed\Log\Communication\Plugin\Log\AuditLogRequestProcessorPlugin;
use Spryker\Zed\Log\Communication\Plugin\Log\AuditLogTagFilterBufferedStreamHandlerPlugin;
use Spryker\Zed\Log\Communication\Plugin\Processor\EnvironmentProcessorPlugin;
use Spryker\Zed\Log\Communication\Plugin\Processor\PsrLogMessageProcessorPlugin;
use Spryker\Zed\Log\Communication\Plugin\Processor\ResponseProcessorPlugin;
use Spryker\Zed\Log\Communication\Plugin\Processor\ServerProcessorPlugin;
use Spryker\Zed\Log\LogDependencyProvider as SprykerLogDependencyProvider;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getZedSecurityAuditLogHandlerPlugins(): array
    {
        return [
            new AuditLogTagFilterBufferedStreamHandlerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getMerchantPortalSecurityAuditLogHandlerPlugins(): array
    {
        return [
            new AuditLogTagFilterBufferedStreamHandlerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getZedSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new PsrLogMessageProcessorPlugin(),
            new EnvironmentProcessorPlugin(),
            new ServerProcessorPlugin(),
            new AuditLogRequestProcessorPlugin(),
            new ResponseProcessorPlugin(),
            new AuditLogMetaDataProcessorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getMerchantPortalSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new PsrLogMessageProcessorPlugin(),
            new EnvironmentProcessorPlugin(),
            new ServerProcessorPlugin(),
            new AuditLogRequestProcessorPlugin(),
            new ResponseProcessorPlugin(),
            new AuditLogMetaDataProcessorPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure the following applies:
* Logs data has been expanded with the registered plugins: environment, server, request.
* Log type sections exist and contain the corresponding data.

{% endinfo_block %}

2. Set up the console commands:

| COMMAND | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StorageRedisExportRdbConsole | Exports a Redis database as an .rdb file. |  | Spryker\Zed\StorageRedis\Communication\Console |
| StorageRedisImportRdbConsole	 | Imports an rdb file.	 |  | Spryker\Zed\StorageRedis\Communication\Console |

**Pyz\Zed\Console\ConsoleDependencyProvider**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\StorageRedis\Communication\Console\StorageRedisExportRdbConsole;
use Spryker\Zed\StorageRedis\Communication\Console\StorageRedisImportRdbConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new StorageRedisExportRdbConsole(),
            new StorageRedisImportRdbConsole(),
        ];

        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}

To verify that `StorageRedisExportRdbConsole` and `StorageRedisImportRdbConsole` are activated, check if the `vendor/bin/console storage:redis:export-rdb` and `vendor/bin/console storage:redis:import-rdb` console commands exist.

{% endinfo_block %}

3. Build the navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

{% info_block warningBox "Verification" %}

To verify that the navigation for Store GUI is successfully generated, make sure that, in the Back Office, the **Administration**>**Stores** navigation item is displayed.

{% endinfo_block %}

### 6) Set up Publish and Synchronize

1. Update the RabbitMQ configuration:

<details>
<summary>Pyz/Client/RabbitMq/RabbitMqConfig.php</summary>

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\Event\EventConfig;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\UrlStorage\UrlStorageConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            EventConstants::EVENT_QUEUE => [
                EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
                EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
            ],
            GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION,
            UrlStorageConstants::URL_SYNC_STORAGE_QUEUE,
            $this->get(LogConstants::LOG_QUEUE_NAME),
            // ...
        ];
    }

    /**
     * @return string
     */
    protected function getDefaultBoundQueueNamePrefix(): string
    {
        return 'error';
    }
}
```
</details>

2. Add `PublisherTriggerEventsConsole` to `ConsoleDependencyProvider`:

**Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Publisher\Communication\Console\PublisherTriggerEventsConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            // ...
            new PublisherTriggerEventsConsole(),
            // ...
        ];
        // ...
    }
}
```

1. Add `PublisherSubscriber` to `EventDependencyProvider`:

**src/Pyz/Zed/Event/EventDependencyProvidder.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Event\Subscriber\GlossaryStorageEventSubscriber;
use Spryker\Zed\Publisher\Communication\Plugin\Event\PublisherSubscriber;
use Spryker\Zed\UrlStorage\Communication\Plugin\Event\Subscriber\UrlStorageEventSubscriber;
use Spryker\Zed\Publisher\Communication\Plugin\Event\PublisherSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new GlossaryStorageEventSubscriber());
        $eventSubscriberCollection->add(new UrlStorageEventSubscriber());
        // ...
        $eventSubscriberCollection->add(new PublisherSubscriber());

        return $eventSubscriberCollection;
    }
}
```

## Install feature frontend

Follow the steps below to install the Spryker Core feature frontend.

### 1) Install the required modules

```bash
composer require "spryker-feature/spryker-core": "{{page.version}}"
```

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                               | SPECIFICATION                                                                                                  | NAMESPACE                   |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|
| SessionFileConstants::YVES_SESSION_FILE_PATH                | Defines the filesystem path for storing Yves sessions.                                                         | Spryker\Shared\SessionFile  |
| SessionRedisConstants::YVES_SESSION_REDIS_SCHEME            | Defines a scheme|protocol for Redis connection when used as Yves session storage.                                   | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD          | Defines the password used while connecting to Redis as Yves session storage.                                   | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_HOST              | Defines the host used while connecting to Redis as Yves session storage.                                       | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_PORT              | Defines the port used while connecting to Redis as Yves session storage.                                       | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_DATABASE          | Defines the database used while connecting to Redis as Yves session storage.                                   | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES | Defines the list of DSNs used while connecting to Redis as Yves session storage in replication mode.           | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_CLIENT_OPTIONS    | Defines the list of client options used while connecting to Redis as Yves session storage in replication mode. | Spryker\Shared\SessionRedis |
| LogConstants::LOG_FILE_PATH_YVES                            | Absolute path to the log file to be used by the stream handler.                                      | Spryker\Shared\Log          |
| LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_YVES              | Provides plugin class names that contain the configuration for audit logging for the Yves application.                    | Spryker\Shared\Log          |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
use Spryker\Shared\SessionRedis\SessionRedisConstants;

// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING;
$config[SessionRedisConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
```

{% info_block warningBox "" %}

`SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING`, `SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING` and `SessionRedisConfig::SESSION_HANDLER_REDIS` can be used as values for the session handler configuration option.

The latest option is the `SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING`, providing the most flexibility. It allows you to use the Redis session handler with or without locking, depending on the configuration.

{% endinfo_block %}

2. In case of a multi-instance Redis setup, add the following configuration:

{% info_block warningBox "" %}

This configuration is used exclusively. In other words, you can't use any other Redis configuration.

{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\SessionRedis\SessionRedisConstants;

$config[SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379'];
$config[SessionRedisConstants::YVES_SESSION_REDIS_CLIENT_OPTIONS] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
    'parameters' => [
        'password' => 'secret',
        'database' => 1,
    ],
];
```


3. In case of a single-instance Redis setup, add the following configuration:

{% info_block warningBox "" %}

Make sure you don't use the same Redis database for Yves and Zed sessions.

{% endinfo_block %}

**config/Share/config_default.php**

```php
<?php

use Spryker\Shared\SessionRedis\SessionRedisConstants;

$config[SessionRedisConstants::YVES_SESSION_REDIS_SCHEME] = 'tcp';
$config[SessionRedisConstants::YVES_SESSION_REDIS_HOST] = '127.0.0.1';
$config[SessionRedisConstants::YVES_SESSION_REDIS_PORT] = 6379;
$config[SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATABASE] = 1;
```


4. If the file system is used as a session storage, add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionFile\SessionFileConfig;
use Spryker\Shared\SessionFile\SessionFileConstants;

// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionFileConfig::SESSION_HANDLER_FILE;
$config[SessionFileConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionFileConstants::YVES_SESSION_FILE_PATH] = session_save_path();
```

#### Set up SecurityBlocker

Pass the locale used in the login check path to `SecurityBlocker`:

**src/Pyz/Yves/SecurityBlockerPage/SecurityBlockerPageConfig.php**

```php
<?php

namespace Pyz\Yves\SecurityBlockerPage;

use SprykerShop\Yves\SecurityBlockerPage\SecurityBlockerPageConfig as SprykerSecurityBlockerPageConfig;

class SecurityBlockerPageConfig extends SprykerSecurityBlockerPageConfig
{
    /**
     * @var bool
     */
    protected const USE_EMAIL_CONTEXT_FOR_LOGIN_SECURITY_BLOCKER = false;

    /**
     * @return bool
     */
    public function isLocaleInCustomerLoginCheckPath(): bool
    {
        return true;
    }

    /**
     * @return bool
     */
    public function isLocaleInAgentLoginCheckPath(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when the login form for the customer or agent is submitted, the URL it uses contains a locale code. Examples of default values:
* For customer: `/de/login_check`
* For agent: `/de/agent/login_check`

{% endinfo_block %}

{% info_block infoBox "" %}

All locale-related configs in `CustomerPage`, `AgentPage`, and `SecurityBlockerPage` are deprecated; in future releases, only locale-specific URLs will be used.

{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;
use Spryker\Yves\Log\Plugin\Log\YvesSecurityAuditLoggerConfigPlugin;

$config[LogConstants::LOG_FILE_PATH_YVES] = 'php://stdout';
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_YVES] = [
    YvesSecurityAuditLoggerConfigPlugin::class,
];
```

{% info_block warningBox "Verification" %}

After finishing the installation, make sure the following applies:

* Security actions in the Yves applications can be logged.
* The configured log file path contains the corresponding log.
Example:

```php
<?php

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Spryker\Shared\Log\AuditLoggerTrait;

class AuditLogger
{
    use AuditLoggerTrait;

    /**
     * @param string $action
     * @param list<string> $tags
     *
     * @return void
     */
    public function addAuditLog(string $action, array $tags): void
    {
        $this->getAuditLogger(
            (new AuditLoggerConfigCriteriaTransfer())->setChannelName('security'),
        )->info('user logged in', ['tags' => ['user_logged_in']]);
    }
}
```

{% endinfo_block %}

```php
<?php

namespace Pyz\Yves\SessionRedis;

use Spryker\Yves\SessionRedis\SessionRedisConfig as SprykerSessionRedisConfig;

/**
 * @method \Spryker\Shared\SessionRedis\SessionRedisConfig getSharedConfig()
 */
class SessionRedisConfig extends SprykerSessionRedisConfig
{
    /**
     * @return list<string>
     */
    public function getSessionRedisLockingExcludedUrlPatterns(): array
    {
        return [
            '/^.*\/error-page\/*.*$/',
            '/^.*\/health-check$/',
        ];
    }

    /**
     * @return list<string>
     */
    public function getSessionRedisLockingExcludedBotUserAgents(): array
    {
        return [
            'Googlebot',
            'bingbot',
            'Baiduspider',
            'YandexBot',
            'DuckDuckBot',
            'Sogou',
            'ia_archiver',
            'facebookexternalhit',
            'Twitterbot',
            'LinkedInBot',
            'Slackbot',
            'WhatsApp',
            'Discordbot',
            'AhrefsBot',
            'Applebot',
            'msnbot',
            'MJ12bot',
            'SEMrushBot',
            'PetalBot',
            'SeznamBot',
            'AdsBot-Google',
            'crawler',
            'spider',
            'robot',
            'bot/',
        ];
    }
}
```

{% info_block warningBox "Validation" %}

Make sure that the Redis session locking is skipped for the URLs and user agents specified in the configuration.
* For example, if the URL `/error-page` is accessed, the Redis session locking should be skipped.
* If the user agent `Googlebot` is used, the Redis session locking should be skipped.

{% endinfo_block %}

### 3) Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
error.429,Zu viele Anfragen,de_DE
error.429,Too Many Requests,en_US
security_blocker_page.error.account_blocked,"Too many log in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
security_blocker_page.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

2. Add the glossary keys:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 4) Set up behavior

Install the plugins and modules:

| PLUGIN                                                 | SPECIFICATION                                                                                                                                        | PREREQUISITES | NAMESPACE                                                     |
|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| SessionHandlerRedisProviderPlugin                      | Provides a Redis-based session handler implementation for Yves sessions.                                                                             |               | Spryker\Yves\SessionRedis\Plugin\Session                      |
| SessionHandlerConfigurableRedisLockingProviderPlugin() | Provides a configurable, Redis-based session handler for Yves sessions, offering fine-grained control over session locking.                          |               | Spryker\Yves\SessionFile\Plugin\Session                       |
| SessionHandlerFileProviderPlugin                       | Provides a file-based session handler implementation for Yves sessions.                                                                              |               | Spryker\Yves\SessionFile\Plugin\Session                       |
| YvesSessionRedisLockReleaserPlugin                     | Removes a session lock from Redis by session ID for Yves sessions. It's used for removing previously created locks by running `session:lock:remove`. |               | Spryker\Zed\SessionRedis\Communication\Plugin\Session         |
| SecurityBlockerCustomerEventDispatcherPlugin           | Adds subscribers for request and authentication failure events to control the customers' failed login attempts.                                      |               | SprykerShop\Yves\SecurityBlockerPage\Plugin\EventDispatcher   |
| SecurityBlockerAgentEventDispatcherPlugin              | Adds subscribers for request and authentication failure events to control the agents' failed login attempts.                                         |               | SprykerShop\Yves\SecurityBlockerPage\Plugin\EventDispatcher   |
| AuditLogTagFilterBufferedStreamHandlerPlugin           | Provides the Monolog handler.                                                                                                                        |               | Spryker\Yves\Log\Plugin\Log                                   |
| PsrLogMessageProcessorPlugin                           | Processes a record's message according to PSR-3 rules.                                                                                               |               | Spryker\Yves\Log\Plugin\Processor                             |
| EnvironmentProcessorPlugin                             | Adds environment related data to the log data.                                                                                                       |               | Spryker\Yves\Log\Plugin\Processor                             |
| ServerProcessorPlugin                                  | Adds service related data to the log data.                                                                                                           |               | Spryker\Yves\Log\Plugin\Processor                             |
| AuditLogRequestProcessorPlugin                         | Adds request related data to the log data.                                                                                                           |               | Spryker\Yves\Log\Plugin\Log                                   |
| ResponseProcessorPlugin                                | Removes response data from the log data.                                                                                                             |               | Spryker\Yves\Log\Plugin\Processor                             |
| AuditLogMetaDataProcessorPlugin                        | Adds the `audit_log` log type to the log data.                                                                                                       |               | Spryker\Yves\Log\Plugin\Log                                   |
| UrlSessionRedisLockingExclusionConditionPlugin         | Skips Redis session locking when the request URI matches any of the URL patterns from the module configuration.                                      |               | Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion |
| BotSessionRedisLockingExclusionConditionPlugin         | Skips Redis session locking when the request’s User-Agent header contains any of the patterns returned by the module configuration.                  |               | Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion |

**src/Pyz/Yves/Session/SessionDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Session;

use Spryker\Yves\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Yves\SessionFile\Plugin\Session\SessionHandlerFileProviderPlugin;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerRedisLockingProviderPlugin;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerRedisProviderPlugin;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerConfigurableRedisLockingProviderPlugin();

class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\SessionExtension\Dependency\Plugin\SessionHandlerProviderPluginInterface>
     */
    protected function getSessionHandlerPlugins(): array
    {
        return [
            new SessionHandlerRedisProviderPlugin(),
            new SessionHandlerConfigurableRedisLockingProviderPlugin(),
            new SessionHandlerFileProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Session/SessionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Session;

use Spryker\Zed\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\YvesSessionRedisLockReleaserPlugin;

class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SessionExtension\Dependency\Plugin\SessionLockReleaserPluginInterface>
     */
    protected function getYvesSessionLockReleaserPlugins(): array
    {
        return [
            new YvesSessionRedisLockReleaserPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use SprykerShop\Yves\SecurityBlockerPage\Plugin\EventDispatcher\SecurityBlockerAgentEventDispatcherPlugin;
use SprykerShop\Yves\SecurityBlockerPage\Plugin\EventDispatcher\SecurityBlockerCustomerEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new SecurityBlockerCustomerEventDispatcherPlugin(),
            new SecurityBlockerAgentEventDispatcherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Validation" %}

1. Make sure `SecurityBlockerCustomerEventDispatcherPlugin` is activated by attempting to sign in with as a customer the incorrect credentials. After making the number of attempts specified in `SecurityBlockerConstants::SECURITY_BLOCKER_BLOCKING_NUMBER_OF_ATTEMPTS`, the account should get blocked for the period of time specified in `SecurityBlockerConstants::SECURITY_BLOCKER_BLOCK_FOR`. Consequent login attempts should return the `429 Too many requests` error.

2. To verify `SecurityBlockerAgentEventDispatcherPlugin`, repeat step 2 for the agent sign-in to check. The security behavior should match the configuration you've set up in [Set up configuration](#set-up-configuration).

{% endinfo_block %}

**src/Pyz/Yves/Log/LogDependencyProvider.php**

```php
use Spryker\Yves\Log\LogDependencyProvider as SprykerLogDependencyProvider;
use Spryker\Yves\Log\Plugin\Log\AuditLogMetaDataProcessorPlugin;
use Spryker\Yves\Log\Plugin\Log\AuditLogRequestProcessorPlugin;
use Spryker\Yves\Log\Plugin\Log\AuditLogTagFilterBufferedStreamHandlerPlugin;
use Spryker\Yves\Log\Plugin\Processor\EnvironmentProcessorPlugin;
use Spryker\Yves\Log\Plugin\Processor\PsrLogMessageProcessorPlugin;
use Spryker\Yves\Log\Plugin\Processor\ResponseProcessorPlugin;
use Spryker\Yves\Log\Plugin\Processor\ServerProcessorPlugin;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getYvesSecurityAuditLogHandlerPlugins(): array
    {
        return [
            new AuditLogTagFilterBufferedStreamHandlerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getYvesSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new PsrLogMessageProcessorPlugin(),
            new EnvironmentProcessorPlugin(),
            new ServerProcessorPlugin(),
            new AuditLogRequestProcessorPlugin(),
            new ResponseProcessorPlugin(),
            new AuditLogMetaDataProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following applies:
* The logs data has been expanded with the registered plugins: environment, server, request.
* The log type sections exists and contains the corresponding data.

{% endinfo_block %}

**src/Pyz/Yves/SessionRedis/SessionRedisDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\SessionRedis;

use Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion\BotSessionRedisLockingExclusionConditionPlugin;
use Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion\UrlSessionRedisLockingExclusionConditionPlugin;
use Spryker\Yves\SessionRedis\SessionRedisDependencyProvider as SprykerSessionRedisDependencyProvider;

/**
 * @method \Spryker\Yves\SessionRedis\SessionRedisConfig getConfig()
 */
class SessionRedisDependencyProvider extends SprykerSessionRedisDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\SessionRedisExtension\Dependency\Plugin\SessionRedisLockingExclusionConditionPluginInterface>
     */
    protected function getSessionRedisLockingExclusionConditionPlugins(): array
    {
        return [
            new UrlSessionRedisLockingExclusionConditionPlugin(),
            new BotSessionRedisLockingExclusionConditionPlugin(),
        ];
    }
} 
```

{% info_block warningBox "Validation" %}

Make sure that the Redis session locking is skipped for the URLs and user agents specified in the configuration.
* For example, if the URL `/error-page` is accessed, the Redis session locking should be skipped.
* If the user agent `Googlebot` is used, the Redis session locking should be skipped.

{% endinfo_block %}

