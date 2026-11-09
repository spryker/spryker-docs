


This document describes how to install the [Spryker Core feature](/docs/pbc/all/miscellaneous/latest/spryker-core-feature-overview/spryker-core-feature-overview.html).

{% info_block infoBox "Included features" %}


This guide expects the basic feature to be installed. This guide adds the following functionalities:
- Vault
- Redis Session
- Store GUI
- Blocking too many failed login attempts
- CAPTCHA for the login forms
- Per-account login protection
- Audit logging
- Rule engine

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Spryker Core feature core.

### 1) Install the required modules

1. Install the Spryker Core feature:

```bash
composer require "spryker-feature/spryker-core":"{{page.release_tag}}" --update-with-dependencies
```

2. The login forms of the Storefront, the Back Office, and the Merchant Portal ask the browser to solve a CAPTCHA before the password is checked, so that automated password guessing is slowed down. The CAPTCHA module adds the CAPTCHA to the login forms and checks it, and a CAPTCHA provider creates and verifies the challenges. Install the CAPTCHA module and the ALTCHA provider. ALTCHA is a proof-of-work CAPTCHA: the browser solves it when the user selects its checkbox, without images or calls to third-party services.

```bash
composer require spryker/captcha spryker-eco/captcha-altcha --update-with-dependencies
```

The ALTCHA provider needs the `sodium` PHP extension.

The `altcha` npm package is the browser widget, declared in the `package.json` of `spryker-eco/captcha-altcha`. Add the package to the npm workspaces of the project `package.json`:

```json
"workspaces": [
    "vendor/spryker-eco/captcha-altcha"
]
```

If your project does not use npm workspaces, add the widget to the project `package.json` instead:

```bash
npm install altcha@~3.2.0
```

To use Google reCAPTCHA instead of ALTCHA, skip this step and follow [Install Google reCAPTCHA](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-google-recaptcha.html).

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                            | EXPECTED DIRECTORY                                  |
|-----------------------------------|-----------------------------------------------------|
| Captcha                           | vendor/spryker/captcha                              |
| CaptchaExtension                  | vendor/spryker/captcha-extension                    |
| CaptchaAltcha                     | vendor/spryker-eco/captcha-altcha                   |
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

Router is a core module that mapps URLs to specific controllers and actions. The router cache is used to improve the performance of the routing system by caching the routing information.

To set up Router, add the following configuration:

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
| SecuritySystemUserConstants::SYSTEM_USER_SESSION_REDIS_LIFE_TIME | Key-value storage (Redis or Valkey) session lifetime.                     | Spryker\Shared\SecuritySystemUser |
| SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS            | Default credentials for Yves accessing Zed. | Spryker\Shared\SecuritySystemUser |

{% info_block errorBox "Security measures" %}

To prevent the backend from being compromised, make sure `SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS` is secured in production environments.

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

#### Configure key-value storage (Redis or Valkey)

Add the configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS	 | Defines the key-value storage (Redis or Valkey) lock timeout in milliseconds. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS	 | Defines the retry delay between the attempts to acquire key-value storage (Redis or Valkey) lock in microseconds. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS	 | Defines the time to live for key-value storage (Redis or Valkey) lock in milliseconds. | Spryker\Shared\SessionRedis |
| SessionFileConstants::ZED_SESSION_FILE_PATH	 | Defines the filesystem path for storing Zed sessions. | Spryker\Shared\SessionFile |
| SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD	 | Defines the password for connecting to key-value storage (Redis or Valkey) as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_HOST	 | Defines the host for connecting to key-value storage (Redis or Valkey) as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_PORT	 | Defines the protocol for connecting to key-value storage (Redis or Valkey) as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_DATABASE	 | Defines the database for connecting to key-value storage (Redis or Valkey) as a Zed session storage. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES	 | Defines the list of DSNs for connecting to key-value storage (Redis or Valkey) a as Zed session storage in replication mode. | Spryker\Shared\SessionRedis |
| SessionRedisConstants::ZED_SESSION_REDIS_CLIENT_OPTIONS	 | Defines the list of client options for connecting to key-value storage (Redis or Valkey) as a Zed session storage in replication mode. | Spryker\Shared\SessionRedis |
| StorageRedisConstants::STORAGE_REDIS_PROTOCOL	 | Defines the protocol for connecting to key-value storage (Redis or Valkey). | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_PASSWORD	 | Defines the password for connecting to key-value storage (Redis or Valkey). | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_HOST	 | Defines the host for connecting to key-value storage (Redis or Valkey). | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_PORT	 | Defines the port for connecting to key-value storage (Redis or Valkey). | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_DATABASE	 | Defines the database for connecting to key-value storage (Redis or Valkey). | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION	 | Enables and disables data persistence for a key-value storage (Redis or Valkey) connection. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES	 | Specifies an array of DSN strings for a multi-instance cluster and replication key-value storage (Redis or Valkey) setup. | Spryker\Shared\StorageRedis |
| StorageRedisConstants::STORAGE_REDIS_CONNECTION_OPTIONS	 | Specifies an array of client options for connecting to key-value storage (Redis or Valkey). | Spryker\Shared\StorageRedis |

#### Configure general storage

{% info_block warningBox "" %}

Make sure to replace all the values in the following examples with real values.

{% endinfo_block %}

In case of a multi-instance key-value storage (Redis or Valkey) setup, add the following configuration:

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

In case of a single-instance key-value storage (Redis or Valkey) setup, add the following configuration:

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

If key-value storage (Redis or Valkey) is used as session storage, add the following configuration:

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

In case of a multi-instance key-value storage (Redis or Valkey) setup, add the following configuration:

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

This configuration is used exclusively. In other words, you can't use any other key-value storage (Redis or Valkey) configuration.

{% endinfo_block %}

In case of a single-instance key-value storage (Redis or Valkey) setup, add the following configuration:

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

The SecurityBlocker module provides the functionality to block a user for a certain period of time if the number of failed login attempts exceeds the configured threshold.

1. To set up SecurityBlocker, add the following environment configuration:

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

3. Add the per-account configuration for customers.

The settings from the previous step count failed logins per IP address, so an attacker who switches IP addresses is never blocked. The following settings count login attempts per customer account, regardless of the IP address. They also define the challenge thresholds: in the `after_failed_attempts` CAPTCHA mode, the login form requires a CAPTCHA only after one of these thresholds is reached. For the CAPTCHA modes, see [Configure the login CAPTCHA](#configure-the-login-captcha). The settings apply to the `customer` login realm: one counter per account is shared by every login surface of the realm, which are the Storefront login, the Glue API `POST /access-tokens` endpoint, and the Storefront API `POST /token` endpoint.

The protection uses three counters:

- Account counter: counts every login attempt for one account in the time window. It is reset when the account logs in successfully.
- IP counter: counts failed logins from one IP address, as configured in the previous step.
- Realm-wide counter: counts failed logins for all accounts of the realm. When it reaches its threshold, every login of the realm requires a CAPTCHA. This counter never blocks a login, and it protects against password spraying, which tries one password against many accounts. Each IP address adds at most as many failed logins to this counter as `CUSTOMER_IP_CHALLENGE_NUMBER_OF_ATTEMPTS` defines, so one IP address cannot require a CAPTCHA for the whole realm. If `CUSTOMER_IP_CHALLENGE_NUMBER_OF_ATTEMPTS` is `0`, the failed logins of an IP address are not limited.

| CONFIGURATION | SPECIFICATION | NAMESPACE |
|---|---|---|
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCKING_NUMBER_OF_ATTEMPTS | Defines the number of login attempts per account within the `CUSTOMER_ACCOUNT_BLOCKING_TTL` time period before the account is blocked. `0` disables the account block. | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCKING_TTL | Defines the time period in seconds within which the login attempts of an account are counted. | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCK_FOR_SECONDS | Defines the time period in seconds for which a blocked account stays blocked. The block is not extended by further attempts. | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_CHALLENGE_NUMBER_OF_ATTEMPTS | Defines the number of login attempts per account after which the login form requires a CAPTCHA. `0` disables this trigger. | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_IP_CHALLENGE_NUMBER_OF_ATTEMPTS | Defines the number of failed logins per IP address after which the login form requires a CAPTCHA. `0` disables this trigger. | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_GLOBAL_CHALLENGE_NUMBER_OF_ATTEMPTS | Defines the number of failed customer logins within the `CUSTOMER_GLOBAL_CHALLENGE_TTL` time period after which every customer login requires a CAPTCHA. `0` disables this trigger. | Spryker\Shared\SecurityBlockerStorefrontCustomer |
| SecurityBlockerStorefrontCustomerConstants::CUSTOMER_GLOBAL_CHALLENGE_TTL | Defines the time period in seconds within which the failed customer logins are counted for the realm-wide counter. | Spryker\Shared\SecurityBlockerStorefrontCustomer |

**config/Shared/config_default.php**

```php
use Spryker\Shared\SecurityBlockerStorefrontCustomer\SecurityBlockerStorefrontCustomerConstants;

$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCKING_TTL] = 900;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_CHALLENGE_NUMBER_OF_ATTEMPTS] = 3;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_IP_CHALLENGE_NUMBER_OF_ATTEMPTS] = 5;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_GLOBAL_CHALLENGE_NUMBER_OF_ATTEMPTS] = 100;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_GLOBAL_CHALLENGE_TTL] = 300;
```

{% info_block infoBox "Test environments" %}

End-to-end tests usually send many failed logins from one IP address with the same test accounts, and they cannot solve a CAPTCHA. In the configuration of such an environment, for example `config/Shared/config_default-ci.php`, lift the account block and switch the CAPTCHA off. Setting the challenge thresholds to `0` is not enough, because in the default `always` CAPTCHA mode, every login requires a CAPTCHA regardless of the thresholds:

```php
use Spryker\Shared\Captcha\CaptchaConstants;
use Spryker\Shared\SecurityBlockerStorefrontCustomer\SecurityBlockerStorefrontCustomerConstants;

$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_BLOCKING_NUMBER_OF_ATTEMPTS] = 1000;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_ACCOUNT_CHALLENGE_NUMBER_OF_ATTEMPTS] = 0;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_IP_CHALLENGE_NUMBER_OF_ATTEMPTS] = 0;
$config[SecurityBlockerStorefrontCustomerConstants::CUSTOMER_GLOBAL_CHALLENGE_NUMBER_OF_ATTEMPTS] = 0;
$config[CaptchaConstants::IS_CAPTCHA_ENABLED] = false;
```

To test the CAPTCHA itself in an end-to-end environment, keep `IS_CAPTCHA_ENABLED` set to `true`, keep the challenge thresholds above `0`, and set the CAPTCHA mode of the environment to `after_failed_attempts`, as described in [Configure the login CAPTCHA](#configure-the-login-captcha). Then only the tests that make failed logins have to solve a CAPTCHA.

{% endinfo_block %}

4. Optional: To write account blocks to the audit log, enable the security audit log of the SecurityBlocker client. When enabled, a blocked account is logged with the `login_account_locked` tag, and a reached realm-wide threshold is logged with the `login_global_challenge_threshold_reached` tag. The log entries contain neither the login identifier in clear text nor the IP address.

**src/Pyz/Client/SecurityBlocker/SecurityBlockerConfig.php**

```php
<?php

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\SecurityBlocker\SecurityBlockerConfig as SprykerSecurityBlockerConfig;

class SecurityBlockerConfig extends SprykerSecurityBlockerConfig
{
    protected const bool IS_SECURITY_AUDIT_LOG_ENABLED = true;
}
```

#### Configure the login CAPTCHA

The CAPTCHA module protects five login forms: the Storefront customer login, the Storefront agent login, the Back Office login, the Merchant Portal login, and the Merchant Portal agent login. It adds a CAPTCHA field to each of these forms and checks the submitted solution after the login blockers check whether the login is blocked, and before they count the attempt and the firewall processes the login. A submission without a valid solution is rejected: the password is not checked, and the attempt is not counted as a failed login. A CAPTCHA provider creates and verifies the challenges. The default provider is ALTCHA. To use Google reCAPTCHA instead, see [Install Google reCAPTCHA](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-google-recaptcha.html).

The SecurityBlocker modules count failed logins and block accounts and IP addresses. They do not check the CAPTCHA. Instead, each of them provides a CAPTCHA requirement plugin that tells the CAPTCHA module whether a challenge threshold is reached for a login.

Each login form has a CAPTCHA context, which is the identifier of the form. A challenge is bound to the context of its form, so a solution is accepted only by the same form. The CAPTCHA requirement plugins and the rate limit of the challenge endpoints work per context, and Google reCAPTCHA v3 uses the context as the action name. The contexts are the `CONTEXT_*` constants of `Spryker\Shared\Captcha\CaptchaConfig`:

| CONTEXT | LOGIN FORM |
|---|---|
| `storefront_customer_login` | Storefront customer login, including the login step of the checkout |
| `storefront_agent_login` | Storefront agent login |
| `backoffice_user_login` | Back Office login |
| `merchant_portal_user_login` | Merchant Portal login |
| `merchant_portal_agent_login` | Merchant Portal agent login |

The CAPTCHA mode and the HMAC secret of ALTCHA are settings of the Configuration Management feature. Before you continue, install the feature as described in [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-configuration-feature.html), including the encryption of secret settings.

1. Add the CAPTCHA configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
|---|---|---|
| CaptchaConstants::IS_CAPTCHA_ENABLED | Switches the CAPTCHA of the login forms on or off for an environment. If `false`, no login form shows or checks a CAPTCHA, regardless of the CAPTCHA mode, and the login blockers still apply. If `true` and no CAPTCHA provider is wired, or the provider cannot create or verify challenges, every login that requires a CAPTCHA is rejected. Default: `false`. | Spryker\Shared\Captcha |
| CaptchaConstants::REDIS_* | Define the key-value storage (Redis or Valkey) connection that stores the solved challenges, so that each solution is accepted only once, and the counters of the challenge rate limit. | Spryker\Shared\Captcha |
| CaptchaAltchaConstants::KEY_DERIVATION_ALGORITHM | Defines the proof-of-work algorithm: `ARGON2ID` or `PBKDF2/SHA-256`. Argon2id is memory-hard, which limits the speed-up of GPU solvers. Default: `ARGON2ID`. | SprykerEco\Shared\CaptchaAltcha |
| CaptchaAltchaConstants::COST | Defines the iterations of one key derivation. Default: `2` for Argon2id, `1000` for PBKDF2. | SprykerEco\Shared\CaptchaAltcha |
| CaptchaAltchaConstants::MEMORY_COST | Defines the memory of one Argon2id key derivation in KiB. Default: `16384` (16 MiB). | SprykerEco\Shared\CaptchaAltcha |
| CaptchaAltchaConstants::MINIMUM_COUNTER | Defines the minimum number of key derivations the browser performs to solve a challenge; the actual number is between the minimum and twice the minimum. A higher value makes a challenge slower to solve. Default: `20` for Argon2id, `1000` for PBKDF2. | SprykerEco\Shared\CaptchaAltcha |
| CaptchaAltchaConstants::CHALLENGE_TTL | Defines the time in seconds during which a challenge can be solved and submitted. Default: `300`. | SprykerEco\Shared\CaptchaAltcha |

**config/Shared/config_default.php**

```php
use Spryker\Shared\Captcha\CaptchaConstants;
use SprykerEco\Client\CaptchaAltcha\CaptchaAltchaConfig;
use SprykerEco\Shared\CaptchaAltcha\CaptchaAltchaConstants;

$config[CaptchaConstants::IS_CAPTCHA_ENABLED] = true;
$config[CaptchaConstants::REDIS_PERSISTENT_CONNECTION] = true;
$config[CaptchaConstants::REDIS_SCHEME] = getenv('SPRYKER_KEY_VALUE_STORE_PROTOCOL') ?: 'tcp';
$config[CaptchaConstants::REDIS_HOST] = getenv('SPRYKER_KEY_VALUE_STORE_HOST');
$config[CaptchaConstants::REDIS_PORT] = getenv('SPRYKER_KEY_VALUE_STORE_PORT');
$config[CaptchaConstants::REDIS_USER] = getenv('SPRYKER_KEY_VALUE_USERNAME');
$config[CaptchaConstants::REDIS_PASSWORD] = getenv('SPRYKER_KEY_VALUE_PASSWORD');
$config[CaptchaConstants::REDIS_DATABASE] = 7;

$config[CaptchaAltchaConstants::KEY_DERIVATION_ALGORITHM] = CaptchaAltchaConfig::KEY_DERIVATION_ALGORITHM_ARGON2ID;
$config[CaptchaAltchaConstants::COST] = 2;
$config[CaptchaAltchaConstants::MEMORY_COST] = 16384;
$config[CaptchaAltchaConstants::MINIMUM_COUNTER] = 20;
$config[CaptchaAltchaConstants::CHALLENGE_TTL] = 300;
```

2. Select the CAPTCHA mode.

The CAPTCHA mode defines when the login forms require a CAPTCHA. It is a Back Office setting, so you can change it without a deployment. The setting applies to all five login forms:

| CAPTCHA MODE | BEHAVIOR |
|---|---|
| `always` (**Always**), default | Every login form shows the CAPTCHA every time it is rendered, and every login submission is checked. |
| `after_failed_attempts` (**After Failed Attempts**) | A login form shows and checks the CAPTCHA only while a CAPTCHA requirement plugin requires it, which is after a challenge threshold of the SecurityBlocker modules is reached for the account, the IP address, or the whole login realm. The account and realm-wide counters are maintained only by the `ip-and-account` login protection strategy, so with the `ip` strategy, only the IP challenge threshold can require a CAPTCHA. |

`CaptchaConstants::IS_CAPTCHA_ENABLED` and the CAPTCHA mode work together: `IS_CAPTCHA_ENABLED` switches the CAPTCHA on or off for an environment, and the CAPTCHA mode defines when a login requires the CAPTCHA while it is switched on. An unknown mode value is treated as `always`.

The Back Office and the Merchant Portal read the mode from the database, so they apply a changed mode at once. The Storefront reads the mode from the key-value storage, so it applies a changed mode after the `sync.storage.configuration` queue has been processed.

Register the setting in the Back Office by synchronizing the configuration schema:

```bash
console configuration:sync
```

To change the mode, in the Back Office, go to **Configuration**, select **Security** in the sidebar, and open the **CAPTCHA** tab. In the **Login Forms** group, select the **CAPTCHA Mode**. The key of the setting is `security:captcha:login:mode`, and its scope is global.

To set the mode during deployment, for example in a test environment, import it with the `configuration-value` data importer, as described in [Data Import](/docs/dg/dev/backend-development/configuration-management.html#data-import):

```csv
setting_key,scope,scope_identifier,value
security:captcha:login:mode,global,,after_failed_attempts
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Configuration** > **Security** > **CAPTCHA**. Make sure the **Login Forms** group contains the **CAPTCHA Mode** setting with the **Always** and **After Failed Attempts** options.

{% endinfo_block %}

3. Set up the HMAC secret of ALTCHA.

ALTCHA signs every challenge with an HMAC secret and checks the signature when the solution is submitted, so that a client cannot create its own challenges. Each environment needs its own random secret. The secret is a secret setting of the Configuration Management feature: in the Back Office, it is the **HMAC Secret** setting of **Configuration** > **Integrations** > **ALTCHA**, with the `integrations:altcha:credentials:hmac_secret` key. The secret must be at least 32 characters long. It is stored encrypted and is never published to the key-value storage.

The `captcha-altcha:hmac-secret:generate` console command stores a secret, so that a new environment never runs without one:

- If no secret is stored, the command generates a random 64-character secret and stores it.
- If the stored secret is shorter than 32 characters, the command replaces it the same way, because ALTCHA rejects such a secret.
- If a secret of 32 characters or more is stored, the command keeps it. So you can run the command on every deployment, and a secret that an administrator changed in the Back Office stays in place.
- The command never prints or logs the secret. If the secret cannot be saved, the command exits with an error code and shows the reason.

Register the console command:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerEco\Zed\CaptchaAltcha\Communication\Console\CaptchaAltchaHmacSecretGenerateConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new CaptchaAltchaHmacSecretGenerateConsole(),
        ];
    }
}
```

The command needs the setting registered by `configuration:sync` and an initialized database. In every install recipe that initializes the database, including the recipe of `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`, add the command after the `setup:init-db` step, for example:

**config/install/docker.yml**

```yaml
sections:
    init-storages-per-region:
        init-database:
            command: 'vendor/bin/console setup:init-db'

        captcha-altcha-hmac-secret-generate:
            command: 'vendor/bin/console captcha-altcha:hmac-secret:generate'
```

Also add the command to the recipe that runs on every deployment, after the database migrations. This way, an existing environment gets a secret with its first deployment of this feature. On Spryker Cloud, this is the recipe of `SPRYKER_HOOK_INSTALL`, for example:

**config/install/production.yml**

```yaml
sections:
    diff:
        propel-migrate:
            command: 'vendor/bin/console propel:migrate -vvv --no-ansi'

    init-configuration:
        captcha-altcha-hmac-secret-generate:
            command: 'vendor/bin/console captcha-altcha:hmac-secret:generate -vvv --no-ansi'
```

The command keeps a stored secret, so it is safe to run on every deployment.

To store a secret in an existing environment without a deployment, run the command once:

```bash
console captcha-altcha:hmac-secret:generate
```

An administrator can change the secret in the Back Office at any time. Challenges signed with the previous secret are rejected afterward, so a visitor who had a login form open solves a new challenge.

{% info_block warningBox "Missing secret" %}

Without a secret, or with a secret shorter than 32 characters, ALTCHA cannot create or verify challenges, and an error is logged: every login that requires a CAPTCHA is rejected with the `The security check is currently unavailable. Please try again later.` message. In the default `always` mode, this blocks every login form, including the Back Office login, so you cannot log in to the Back Office to enter a secret. The install step prevents this. To recover an environment without a valid secret, run `console captcha-altcha:hmac-secret:generate`, or switch the CAPTCHA off temporarily with `$config[CaptchaConstants::IS_CAPTCHA_ENABLED] = false;`.

{% endinfo_block %}

Only an application that registers `ConfigurationApplicationPlugin` can read secret settings. Because of this, the applications use ALTCHA as follows:

- The Back Office, the Backend Gateway, the Merchant Portal, and the console create and verify the challenges in their own process. The Back Office, the Backend Gateway, and the console register `ConfigurationApplicationPlugin` when you install the Configuration Management feature. For the Merchant Portal, register the plugin as described in [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html#enable-merchant-portal-infrastructural-plugins). Without the plugin, the Merchant Portal sends every challenge and solution to the Backend Gateway and logs a warning.
- The Storefront cannot read secret settings. It creates the challenges and verifies the solutions through the Backend Gateway, with the `/captcha-altcha/gateway/create-captcha-challenge` and `/captcha-altcha/gateway/verify-captcha-payload` requests.

4. Set up the challenge endpoints.

The ALTCHA widget fetches its challenge from a challenge endpoint of the Storefront, the Back Office, or the Merchant Portal when the user selects its checkbox. It solves the challenge in about one second and then shows the checkbox as selected. A login page renders without a challenge, and typing in the form creates none: the server creates one challenge each time the user selects the checkbox. Creating an ALTCHA challenge costs the server about 9 ms of CPU time and 16 MiB of memory, because it derives an Argon2id key. On the Storefront, the endpoint creates the challenge with one request to the Backend Gateway. A challenge expires `CaptchaAltchaConstants::CHALLENGE_TTL` seconds after its creation.

The `auto` attribute of the widget defines when the widget fetches and solves the challenge. `SprykerEco\Client\CaptchaAltcha\CaptchaAltchaConfig::getChallengeUrlWidgetAutoMode()` returns `off` by default, so the widget starts when the user selects its checkbox. If the challenge endpoint answers with the `429` or `503` status, the widget shows the `Verification failed. Try again later.` error, and the checkbox stays cleared. The checkbox is a required field. In the Back Office, the browser asks the user to select the checkbox before it submits the login form. On the Storefront and in the Merchant Portal, the browser sends the login form without it, and the CAPTCHA module rejects the login with the `Please complete the security check.` message. The widget also supports the `onfocus`, `onsubmit`, and `onload` values, with which the widget selects the checkbox itself. With `onfocus`, the widget starts when the user enters the form. With `onsubmit`, the widget starts when the user submits the form, and it submits the form after it solves the challenge.

The Storefront, the Back Office, and the Merchant Portal each have their own challenge endpoint:

| CHALLENGE ENDPOINT | REQUESTED BY |
|---|---|
| Storefront: `/captcha/challenge?context=<context>`, with the store and locale prefix of the router. `Spryker\Yves\Captcha\Plugin\Router\CaptchaRouteProviderPlugin` adds it as the `captcha-challenge` route, which `Spryker\Yves\Captcha\CaptchaConfig::getChallengeRouteName()` returns. | The Storefront customer login and agent login, with the `storefront_customer_login` and `storefront_agent_login` contexts. |
| Back Office: `/captcha/challenge?context=<context>`, served by `Spryker\Zed\Captcha\Communication\Controller\ChallengeController`. | The Back Office login. |
| Merchant Portal: `/captcha/merchant-portal-challenge?context=<context>`, served by `MerchantPortalChallengeController`. The Merchant Portal router routes only the controllers whose path or filename contains `MerchantPortal`. | The Merchant Portal login and the Merchant Portal agent login. |

The Back Office and Merchant Portal endpoints accept the contexts of the login forms of `Spryker\Zed\Captcha\CaptchaConfig::getLoginForms()`. Each of these login forms names its endpoint in `CaptchaLoginForm.challengeUrl`. A login form without `challengeUrl` creates its challenge while the page renders. To protect another Back Office or Merchant Portal login form, override `getLoginForms()` and append a `CaptchaLoginFormTransfer` with the context, the rejection response type, and the challenge URL of the form. The rejection response type is `CaptchaConfig::REJECTION_RESPONSE_TYPE_REDIRECT` for a Back Office form and `CaptchaConfig::REJECTION_RESPONSE_TYPE_ZED_UI` for a Merchant Portal form.

Every endpoint answers `GET` requests with the `Cache-Control: no-store` header and one of the following status codes:

| STATUS | RESPONSE |
|---|---|
| `200` | The JSON document of a new challenge. |
| `404` | The context belongs to the login forms of another endpoint, or the context is unknown. |
| `429` | The request exceeds the rate limit of the context. |
| `503` | The endpoint fails to create a challenge, for example, because the key-value storage fails or the CAPTCHA provider does not implement `CaptchaChallengeUrlProviderPluginInterface`. The endpoint logs an error. |

The endpoints limit the number of challenges per context in fixed time windows. A window starts with its first request. The following configuration defines the limits:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
|---|---|---|
| CaptchaConfig::getChallengeRateLimitPerIp() | Defines the number of challenges per window for one context and one IP address. Default: `30`. | Spryker\Client\Captcha |
| CaptchaConfig::getChallengeRateLimitPerContext() | Defines the number of challenges per window for one context from all IP addresses together. This limit bounds the CPU cost of the challenges when an attacker rotates IP addresses. Default: `600`. | Spryker\Client\Captcha |
| CaptchaConfig::getChallengeRateLimitWindowSeconds() | Defines the length of a window in seconds. Default: `60`. | Spryker\Client\Captcha |

A request that exceeds the limit of its IP address leaves the counter of the context unchanged. The CAPTCHA key-value storage, which `CaptchaConstants::REDIS_*` defines, holds the counters in the `captcha:challenge-rate:{<context>}:ip:<hash>` and `captcha:challenge-rate:{<context>}:all` keys. `<hash>` is the `sha256` hash of the IP address, so the key-value storage holds the IP address only as a hash. If the key-value storage fails, the endpoint answers with the `503` status and logs an error.

You can change a limit by overriding its method. For example, a shop with many logins allows more challenges per context:

**src/Pyz/Client/Captcha/CaptchaConfig.php**

```php
<?php

namespace Pyz\Client\Captcha;

use Spryker\Client\Captcha\CaptchaConfig as SprykerCaptchaConfig;

class CaptchaConfig extends SprykerCaptchaConfig
{
    public function getChallengeRateLimitPerContext(): int
    {
        return 1200;
    }
}
```

The user requests a challenge before logging in, so the Back Office and Merchant Portal endpoints must allow anonymous access. Add `captcha/challenge` to the routes that the Back Office firewall ignores. If your project already overrides the pattern, add `captcha/challenge` to its alternatives:

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
    protected const IGNORABLE_ROUTE_PATTERN = '^/(security-gui|captcha/challenge)';
}
```

In a marketplace, add `captcha/merchant-portal-challenge` to the routes of the Merchant Portal firewall and to the paths that it ignores:

**src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiConfig.php**

```php
<?php

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiConfig as SprykerSecurityMerchantPortalGuiConfig;

class SecurityMerchantPortalGuiConfig extends SprykerSecurityMerchantPortalGuiConfig
{
    /**
     * @var string
     */
    protected const MERCHANT_PORTAL_ROUTE_PATTERN = '^/((.+)-merchant-portal-gui|captcha/merchant-portal-challenge)/';

    /**
     * @var string
     */
    protected const IGNORABLE_PATH_PATTERN = '^/(security-merchant-portal-gui|captcha/merchant-portal-challenge)';
}
```

Allow both endpoints in the access control rules:

**src/Pyz/Zed/Acl/AclConfig.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function getRules(): array
    {
        $rules = [
            // ...
            [
                'bundle' => 'captcha',
                'controller' => 'challenge',
                'action' => 'index',
                'type' => AclConstants::ALLOW,
            ],
            [
                'bundle' => 'captcha',
                'controller' => 'merchant-portal-challenge',
                'action' => 'index',
                'type' => AclConstants::ALLOW,
            ],
        ];

        return array_merge($rules, $this->rules);
    }
}
```

{% info_block warningBox "Anonymous access" %}

Without anonymous access, the Back Office and Merchant Portal endpoints redirect to the login page instead of returning a challenge. The widget then gets no challenge to solve, so every login that requires a CAPTCHA fails.

{% endinfo_block %}

On the Storefront, register `CaptchaRouteProviderPlugin` as described in [Set up behavior](#4-set-up-behavior) of the feature frontend. Without the route, the Storefront login forms create their challenge while the page renders, and the Storefront logs an error that names `CaptchaRouteProviderPlugin`.

{% info_block warningBox "Verification" %}

1. In the default `always` CAPTCHA mode, open the Back Office login page with the **Network** tab of the developer tools of your browser. Make sure the login form shows the CAPTCHA, and the browser sends no request to `/captcha/challenge` while the page loads.
2. Enter the email address and the correct password of a user. Make sure the browser still sends no request to `/captcha/challenge`.
3. Select the checkbox of the CAPTCHA. Make sure the browser sends one `GET /captcha/challenge?context=backoffice_user_login` request, the response has the `200` status and a JSON body, and the widget shows the checkbox as selected.
4. Submit the form. Make sure the login succeeds.
5. In a marketplace, repeat the previous steps on the Merchant Portal login page with a merchant user. The request of the widget is `GET /captcha/merchant-portal-challenge?context=merchant_portal_user_login`.

For the Storefront, see the verification of `CaptchaRouteProviderPlugin` in [Set up behavior](#4-set-up-behavior) of the feature frontend.

{% endinfo_block %}

5. Make sure your infrastructure meets the following requirements:

- Serve the shop over HTTPS. The ALTCHA widget uses the Web Crypto API, which browsers provide only in secure contexts. Over plain HTTP, the widget shows *Verification failed*.
- Serve the frontend assets from the shop's own host, not from a CDN on another origin. The widget solves Argon2id challenges in a web worker that is a script of the frontend build, and browsers start a worker only from a script of the page's origin.
- If you use a Content Security Policy that sets `script-src`, allow `'wasm-unsafe-eval'`, because the Argon2id worker runs WebAssembly. If it sets `worker-src`, allow `'self'`. With `PBKDF2/SHA-256`, the widget starts its workers from `blob:` URLs, so `worker-src` must allow `blob:`.
- Configure trusted proxies, for example `HttpConstants::YVES_TRUSTED_PROXIES` and `HttpConstants::ZED_TRUSTED_PROXIES`, with the addresses of your load balancers. Otherwise, all clients share the IP address of the load balancer, or a client can choose its IP address with a spoofed `X-Forwarded-For` header. The account counter does not depend on the IP address. For the Back Office and the Merchant Portal logins, also see [Select the IP counter key strategy](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-spryker-core-back-office-feature.html#select-the-ip-counter-key-strategy).
- Run the key-value storage that holds the counters with `maxmemory-policy volatile-ttl`. All counters have a time to live, so this policy evicts the shortest-lived counters first under memory pressure.

#### Configure audit logging

1. Add the configuration:

| CONFIGURATION                                             | SPECIFICATION                                                                                                  | NAMESPACE          |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|--------------------|
| LogConstants::LOG_FILE_PATH_ZED                           | Absolute path to the log file of the Zed application to be used by the stream handler.                         | Spryker\Shared\Log |
| LogConstants::LOG_FILE_PATH_GLUE                          | Absolute path to the log file of the Glue application to be used by the stream handler.                        | Spryker\Shared\Log |
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
- Security actions in Zed, Glue, Glue Backend, and Merchant Portal applications can be logged.
- The configured log file paths contain the logs for each application.
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
| SessionHandlerRedisLockingProviderPlugin | Provides a key-value storage (Redis or Valkey)-based session handler implementation with session locking for Zed sessions. |  | Spryker\Zed\SessionRedis\Communication\Plugin\Session                    |
| SessionHandlerRedisProviderPlugin	 | Provides a key-value storage (Redis or Valkey)-based session handler implementation for Zed sessions. |  | Spryker\Zed\SessionRedis\Communication\Plugin\Session                    |
| StorageRedisPlugin | Provides a key-value storage (Redis or Valkey)-based storage implementation. |  | Spryker\Client\StorageRedis\Plugin                                       |
| ZedSystemUserSecurityPlugin | Sets security firewalls, such as rules and handlers, for system users; provides Yves access to Zed. |  | Spryker\Zed\SecurityGui\Communication\Plugin\Security                    |
| ZedSessionRedisLockReleaserPlugin | Removes a session lock from key-value storage (Redis or Valkey) by session ID for Zed sessions. It's used for removing previously created locks by running `session:lock:remove`. |  | Spryker\Zed\SessionRedis\Communication\Plugin\Session                    |
| CustomerSecurityBlockerConfigurationSettingsExpanderPlugin | Expands security blocker configuration settings with customer settings. |  | Spryker\Client\SecurityBlockerStorefrontCustomer\Plugin\SecurityBlocker\CustomerSecurityBlockerConfigurationSettingsExpanderPlugin |
| CustomerSecurityBlockerLoginRealmConfigurationExpanderPlugin | Provides the per-account and CAPTCHA thresholds of the `customer` login realm. If no plugin provides a realm, the realm uses the module defaults, and a warning is logged. |  | Spryker\Client\SecurityBlockerStorefrontCustomer\Plugin\SecurityBlocker |
| AltchaCaptchaProviderPlugin | Creates and verifies ALTCHA challenges, bound to the CAPTCHA context of the login form. On the Storefront, creates and verifies them through the Backend Gateway, because the Storefront cannot read the HMAC secret. Implements `CaptchaChallengeUrlProviderPluginInterface`, so its widget fetches the challenge from the challenge endpoint when the user selects the checkbox of the widget. The CAPTCHA module accepts each solved challenge only once. If CAPTCHA is enabled and no CAPTCHA provider plugin is registered, every login that requires a CAPTCHA is rejected and an error is logged. | The HMAC secret of ALTCHA is stored as described in [Configure the login CAPTCHA](#configure-the-login-captcha). | SprykerEco\Client\CaptchaAltcha\Plugin\Captcha |
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
use Spryker\Client\SecurityBlockerStorefrontCustomer\Plugin\SecurityBlocker\CustomerSecurityBlockerLoginRealmConfigurationExpanderPlugin;

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

    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerLoginRealmConfigurationExpanderPluginInterface>
     */
    protected function getSecurityBlockerLoginRealmConfigurationExpanderPlugins(): array
    {
        return [
            new CustomerSecurityBlockerLoginRealmConfigurationExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Captcha/CaptchaDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Captcha;

use Spryker\Client\Captcha\CaptchaDependencyProvider as SprykerCaptchaDependencyProvider;
use Spryker\Client\CaptchaExtension\Dependency\Plugin\CaptchaProviderPluginInterface;
use SprykerEco\Client\CaptchaAltcha\Plugin\Captcha\AltchaCaptchaProviderPlugin;

class CaptchaDependencyProvider extends SprykerCaptchaDependencyProvider
{
    protected function getCaptchaProviderPlugin(): ?CaptchaProviderPluginInterface
    {
        return new AltchaCaptchaProviderPlugin();
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
- Logs data has been expanded with the registered plugins: environment, server, request.
- Log type sections exist and contain the corresponding data.

{% endinfo_block %}

2. Set up the console commands:

| COMMAND | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StorageRedisExportRdbConsole | Exports a key-value storage (Redis or Valkey) database as an .rdb file. |  | Spryker\Zed\StorageRedis\Communication\Console |
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

RabbitMQ is used for event handling in Spryker. The default event queues are used to handle events that are published by the system.

1. Enable the default event queues in the RabbitMQ configuration:


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
composer require "spryker-feature/spryker-core": "{{page.release_tag}}"
```

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                               | SPECIFICATION                                                                                                  | NAMESPACE                   |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|
| SessionFileConstants::YVES_SESSION_FILE_PATH                | Defines the filesystem path for storing Yves sessions.                                                         | Spryker\Shared\SessionFile  |
| SessionRedisConstants::YVES_SESSION_REDIS_SCHEME            | Defines a scheme protocol for key-value storage (Redis or Valkey) connection when used as Yves session storage.                                   | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD          | Defines the password used while connecting to key-value storage (Redis or Valkey) as Yves session storage.                                   | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_HOST              | Defines the host used while connecting to key-value storage (Redis or Valkey) as Yves session storage.                                       | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_PORT              | Defines the port used while connecting to key-value storage (Redis or Valkey) as Yves session storage.                                       | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_DATABASE          | Defines the database used while connecting to key-value storage (Redis or Valkey) as Yves session storage.                                   | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES | Defines the list of DSNs used while connecting to key-value storage (Redis or Valkey) as Yves session storage in replication mode.           | Spryker\Shared\SessionRedis |
| SessionRedisConstants::YVES_SESSION_REDIS_CLIENT_OPTIONS    | Defines the list of client options used while connecting to key-value storage (Redis or Valkey) as Yves session storage in replication mode. | Spryker\Shared\SessionRedis |
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

You can configure the session handler using one of the following options:

- `SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING`
- `SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING`
- `SessionRedisConfig::SESSION_HANDLER_REDIS`

The most flexible option is `SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING`, which allows enabling or disabling key-value storage (Redis or Valkey) locking based on your configuration.



{% endinfo_block %}

2. In case of a multi-instance key-value storage (Redis or Valkey) setup, add the following configuration:

{% info_block warningBox "" %}

This configuration is used exclusively. In other words, you can't use any other key-value storage (Redis or Valkey) configuration.

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


3. In case of a single-instance key-value storage (Redis or Valkey) setup, add the following configuration:

{% info_block warningBox "" %}

Make sure you don't use the same key-value storage (Redis or Valkey) database for Yves and Zed sessions.

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

Pass the locale used in the login check path to `SecurityBlocker`, and select the login protection strategy of the Storefront customer and agent logins:

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

    protected const string LOGIN_PROTECTION_STRATEGY = self::LOGIN_PROTECTION_STRATEGY_IP_AND_ACCOUNT;

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

The login protection strategy defines how a login form is protected. The same strategy constants exist in the configuration of every module that protects a login: `SecurityBlockerBackofficeGuiConfig`, `SecurityBlockerMerchantPortalGuiConfig`, `AgentSecurityBlockerMerchantPortalGuiConfig`, and `SecurityBlockerRestApiConfig`.

| STRATEGY | BEHAVIOR |
|---|---|
| `LOGIN_PROTECTION_STRATEGY_IP` (`ip`), default | Failed logins are counted and blocked per IP address only. In the `after_failed_attempts` CAPTCHA mode, only the IP challenge threshold can require a CAPTCHA. |
| `LOGIN_PROTECTION_STRATEGY_IP_AND_ACCOUNT` (`ip-and-account`) | Adds the per-account counter and the realm-wide counter, which you configure in [Configure SecurityBlocker](#configure-securityblocker). In the `after_failed_attempts` CAPTCHA mode, their challenge thresholds can require a CAPTCHA as well. |

The strategy does not check the CAPTCHA. The CAPTCHA module checks it between the block check and the counting of the login blockers, as described in [Configure the login CAPTCHA](#configure-the-login-captcha). With the `ip-and-account` strategy, each login request is processed as follows:

1. If the account or the IP address is blocked, the request is rejected with the `429 Too Many Requests` status. The block is checked before the CAPTCHA, so a blocked user sees the block, and the CAPTCHA solution of a blocked request stays unused.
2. If the login requires a CAPTCHA, the CAPTCHA module verifies the submitted solution. A missing, invalid, expired, or reused solution rejects the request with an error message. The password is not checked, and the attempt is not counted.
3. The attempt is counted against the account before the password is checked, so that parallel requests cannot exceed the limit of the account.
4. A successful login resets the account counter. A failed login increases the IP counter and the realm-wide counter.

The block messages are the same for existing and unknown accounts, so they do not reveal which accounts exist.

{% info_block warningBox "Verification" %}

Make sure that, when a customer or agent submits a login form, the request URL includes a locale code. Examples of default values:
- Customer: `/de/login_check`  
- Agent: `/de/agent/login_check`

{% endinfo_block %}

{% info_block infoBox "" %}

All locale-related configs in `CustomerPage`, `AgentPage`, and `SecurityBlockerPage` are deprecated. In future releases, only locale-specific URLs will be used.

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

- Security actions in the Yves applications can be logged
- The configured log file path contains the corresponding log
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


<details>
  <summary>src/Pyz/Yves/SessionRedis/SessionRedisConfig.php</summary>

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

</details>

#### Set up the CAPTCHA form theme

To render the CAPTCHA widget in Storefront forms, register the form theme of the CAPTCHA module:

**src/Pyz/Yves/ShopApplication/ShopApplicationConfig.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationConfig as SprykerShopApplicationConfig;

class ShopApplicationConfig extends SprykerShopApplicationConfig
{
    public function getFormThemes(): array
    {
        return array_merge(parent::getFormThemes(), [
            '@Captcha/resources/form/captcha.twig',
        ]);
    }
}
```

The Storefront login forms render the CAPTCHA field through the `form` molecule, so the login templates need no changes.

Rebuild the Storefront assets, so that they include the widget of the CAPTCHA provider:

```bash
npm run yves
```

In deployment pipelines, use `npm run yves:production`.

### 3) Add translations

1. Append the glossary according to your configuration. The `account_blocked` message does not mention the IP address, because the block can also apply to the account. The `captcha.*` keys are the messages of the CAPTCHA on the Storefront login forms.

**src/data/import/glossary.csv**

```yaml
error.429,Zu viele Anfragen,de_DE
error.429,Too Many Requests,en_US
security_blocker_page.error.account_blocked,"Too many login attempts. Please wait %minutes% minutes before trying again.",en_US
security_blocker_page.error.account_blocked,"Zu viele Anmeldeversuche. Bitte warten Sie %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
captcha.error.required,"Please complete the security check.",en_US
captcha.error.required,"Bitte schließen Sie die Sicherheitsprüfung ab.",de_DE
captcha.error.invalid,"The security check could not be verified. Please try again.",en_US
captcha.error.invalid,"Die Sicherheitsprüfung konnte nicht bestätigt werden. Bitte versuchen Sie es erneut.",de_DE
captcha.error.expired,"The security check has expired. Please try again.",en_US
captcha.error.expired,"Die Sicherheitsprüfung ist abgelaufen. Bitte versuchen Sie es erneut.",de_DE
captcha.error.unavailable,"The security check is currently unavailable. Please try again later.",en_US
captcha.error.unavailable,"Die Sicherheitsprüfung ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",de_DE
captcha.noscript,"Please enable JavaScript to complete the security check.",en_US
captcha.noscript,"Bitte aktivieren Sie JavaScript, um die Sicherheitsprüfung abzuschließen.",de_DE
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
| SessionHandlerRedisProviderPlugin                      | Provides a key-value storage (Redis or Valkey)-based session handler implementation for Yves sessions.                                                                             |               | Spryker\Yves\SessionRedis\Plugin\Session                      |
| SessionHandlerConfigurableRedisLockingProviderPlugin() | Provides a configurable, key-value storage (Redis or Valkey)-based session handler for Yves sessions, offering fine-grained control over session locking.                          |               | Spryker\Yves\SessionFile\Plugin\Session                       |
| SessionHandlerFileProviderPlugin                       | Provides a file-based session handler implementation for Yves sessions.                                                                              |               | Spryker\Yves\SessionFile\Plugin\Session                       |
| YvesSessionRedisLockReleaserPlugin                     | Removes a session lock from key-value storage (Redis or Valkey) by session ID for Yves sessions. It's used for removing previously created locks by running `session:lock:remove`. |               | Spryker\Zed\SessionRedis\Communication\Plugin\Session         |
| LoginCaptchaEventDispatcherPlugin                      | Checks the CAPTCHA of a submitted Storefront customer or agent login form after the login blockers check for a block, and before they count the attempt and the firewall processes it. Tells the forms apart by the login check route. A submission without a valid solution is rejected before it is counted as a failed login: the customer or agent is redirected to the login page with an error message, or the multi-factor authentication script receives a JSON response. Does nothing if `CaptchaConstants::IS_CAPTCHA_ENABLED` is `false`, or in the `after_failed_attempts` CAPTCHA mode while no CAPTCHA requirement plugin requires a CAPTCHA. | Register it before `SecurityBlockerCustomerEventDispatcherPlugin` and `SecurityBlockerAgentEventDispatcherPlugin`. | Spryker\Yves\Captcha\Plugin\EventDispatcher |
| SecurityBlockerCustomerEventDispatcherPlugin           | Adds subscribers for request and authentication failure events to control the customers' failed login attempts.                                      |               | SprykerShop\Yves\SecurityBlockerPage\Plugin\EventDispatcher   |
| SecurityBlockerAgentEventDispatcherPlugin              | Adds subscribers for request and authentication failure events to control the agents' failed login attempts.                                         |               | SprykerShop\Yves\SecurityBlockerPage\Plugin\EventDispatcher   |
| SecurityBlockerLoginCaptchaRequirementPlugin           | Requires a CAPTCHA for the `storefront_customer_login` and `storefront_agent_login` contexts while a challenge threshold of the SecurityBlocker is reached for the IP address, the account, or the login realm: `customer` for the customer login and `user` for the agent login. Requires a CAPTCHA and logs an error if the counters cannot be read. Used only in the `after_failed_attempts` CAPTCHA mode. |               | SprykerShop\Yves\SecurityBlockerPage\Plugin\Captcha           |
| CaptchaRouteProviderPlugin                             | Adds the `captcha-challenge` route, `/captcha/challenge`, from which the CAPTCHA widget of the Storefront login forms fetches its challenge when the user selects the checkbox of the widget. Accepts the `storefront_customer_login` and `storefront_agent_login` contexts and limits the challenges per IP address and per context, as described in [Configure the login CAPTCHA](#configure-the-login-captcha). Without the route, the login forms create their challenge while the page renders and log an error that names `CaptchaRouteProviderPlugin`. |               | Spryker\Yves\Captcha\Plugin\Router                            |
| AuditLogTagFilterBufferedStreamHandlerPlugin           | Provides the Monolog handler.                                                                                                                        |               | Spryker\Yves\Log\Plugin\Log                                   |
| PsrLogMessageProcessorPlugin                           | Processes a record's message according to PSR-3 rules.                                                                                               |               | Spryker\Yves\Log\Plugin\Processor                             |
| EnvironmentProcessorPlugin                             | Adds environment related data to the log data.                                                                                                       |               | Spryker\Yves\Log\Plugin\Processor                             |
| ServerProcessorPlugin                                  | Adds service related data to the log data.                                                                                                           |               | Spryker\Yves\Log\Plugin\Processor                             |
| AuditLogRequestProcessorPlugin                         | Adds request related data to the log data.                                                                                                           |               | Spryker\Yves\Log\Plugin\Log                                   |
| ResponseProcessorPlugin                                | Removes response data from the log data.                                                                                                             |               | Spryker\Yves\Log\Plugin\Processor                             |
| AuditLogMetaDataProcessorPlugin                        | Adds the `audit_log` log type to the log data.                                                                                                       |               | Spryker\Yves\Log\Plugin\Log                                   |
| UrlSessionRedisLockingExclusionConditionPlugin         | Skips key-value storage (Redis or Valkey) session locking when the request URI matches any of the URL patterns from the module configuration.                                      |               | Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion |
| BotSessionRedisLockingExclusionConditionPlugin         | Skips key-value storage (Redis or Valkey) session locking when the request's User-Agent header contains any of the patterns returned by the module configuration.                   |               | Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion |

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

use Spryker\Yves\Captcha\Plugin\EventDispatcher\LoginCaptchaEventDispatcherPlugin;
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
            new LoginCaptchaEventDispatcherPlugin(),
            new SecurityBlockerCustomerEventDispatcherPlugin(),
            new SecurityBlockerAgentEventDispatcherPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Captcha/CaptchaDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Captcha;

use Spryker\Yves\Captcha\CaptchaDependencyProvider as SprykerCaptchaDependencyProvider;
use SprykerShop\Yves\SecurityBlockerPage\Plugin\Captcha\SecurityBlockerLoginCaptchaRequirementPlugin;

class CaptchaDependencyProvider extends SprykerCaptchaDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\CaptchaExtension\Dependency\Plugin\CaptchaRequirementPluginInterface>
     */
    protected function getCaptchaRequirementPlugins(): array
    {
        return [
            new SecurityBlockerLoginCaptchaRequirementPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Captcha\Plugin\Router\CaptchaRouteProviderPlugin;
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new CaptchaRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Register the CAPTCHA field of every login form" %}

`LoginCaptchaEventDispatcherPlugin` checks the CAPTCHA of both Storefront login forms. If a login form has no CAPTCHA field, every login through this form is rejected with the `Please complete the security check.` message: in the `always` CAPTCHA mode at once, and in the `after_failed_attempts` CAPTCHA mode once a challenge threshold is reached. Register the plugins that add the CAPTCHA field together with `LoginCaptchaEventDispatcherPlugin`:

- For the customer login, register `CustomerLoginFormCaptchaExpanderPlugin` as described in [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html).
- For the agent login, register `AgentLoginFormCaptchaExpanderPlugin` as described in [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html).

{% endinfo_block %}

{% info_block warningBox "Verification" %}

| PLUGIN | VERIFICATION |
|------|-------------|
| `CaptchaRouteProviderPlugin` | 1. In the default `always` CAPTCHA mode, open the Storefront login page with the **Network** tab of the developer tools of your browser. Make sure the login form shows the CAPTCHA, and the browser sends no request to `/captcha/challenge` while the page loads. <br>2. Enter the email address and the correct password of a customer. Make sure the browser still sends no request to `/captcha/challenge`. <br>3. Select the checkbox of the CAPTCHA. Make sure the browser sends one request to `/captcha/challenge?context=storefront_customer_login`, with the store and locale prefix of the router, the response has the `200` status and a JSON body, and the widget shows the checkbox as selected. <br>4. Submit the form. Make sure the login succeeds. <br>5. Make sure the log contains no error that names `CaptchaRouteProviderPlugin`. |
| `LoginCaptchaEventDispatcherPlugin` | In the default `always` CAPTCHA mode, open the Storefront login page, and submit the form with the correct password without selecting the checkbox of the security check. Make sure the login is rejected with the `Please complete the security check.` message. |
| `SecurityBlockerLoginCaptchaRequirementPlugin` | 1. Set the CAPTCHA mode to `after_failed_attempts`, and wait until the `sync.storage.configuration` queue has been processed. <br>2. On the Storefront login page, make sure the login form shows no CAPTCHA. <br>3. Enter a wrong password for a customer account as many times as `CUSTOMER_ACCOUNT_CHALLENGE_NUMBER_OF_ATTEMPTS` defines. <br>4. Make sure the login form shows the CAPTCHA. |
| `SecurityBlockerCustomerEventDispatcherPlugin` | Complete the security check and enter a wrong password for a customer account as many times as `CUSTOMER_ACCOUNT_BLOCKING_NUMBER_OF_ATTEMPTS` defines. Make sure the next login, even with the correct password, is rejected with the `Too many login attempts. Please wait 6 minutes before trying again.` message. |
| `SecurityBlockerAgentEventDispatcherPlugin` | Repeat the previous verifications on the agent login page, `https://mysprykershop.com/agent/login`, with an agent account. For agents, the thresholds are `SecurityBlockerBackofficeConstants::USER_ACCOUNT_CHALLENGE_NUMBER_OF_ATTEMPTS` and `SecurityBlockerBackofficeConstants::USER_ACCOUNT_BLOCKING_NUMBER_OF_ATTEMPTS`. |

For the verification steps of the CAPTCHA field, see [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) and [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html).

{% endinfo_block %}


<details>
  <summary>src/Pyz/Yves/Log/LogDependencyProvider.php</summary>

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

</details>

{% info_block warningBox "Verification" %}

Make sure the following applies:
- The logs data has been expanded with the registered plugins: environment, server, request
- The log type section exists and contains the corresponding data

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

Make sure that the key-value storage (Redis or Valkey) session locking is skipped for the URLs and user agents specified in the configuration.
- For example, if the URL `/error-page` is accessed, the key-value storage (Redis or Valkey) session locking should be skipped.
- If the user agent `Googlebot` is used, the key-value storage (Redis or Valkey) session locking should be skipped.

{% endinfo_block %}
