{% info_block errorBox %}

This feature integration guide expects the basic feature to be in place.
The current feature integration guide adds the following functionalities:
* Translation
* Security
* OAuth 2.0/Open ID Connect Support for Zed login

{% endinfo_block %}

## Prerequisites

Ensure that the related features are installed:

| NAME   | VERSION | INTEGRATE GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) | 

## 1) Install the required modules

1. Install the required modules using Composer:

```bash
composer require spryker-feature/spryker-core-back-office:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| MessengerExtension           | vendor/spryker/messenger-extension             |
| SecurityGui                  | vendor/spryker/security-gui                    |
| SecurityOauthUser            | vendor/sprkyer/security-oauth-user             |
| Translator                   | vendor/spryker/translator                      |
| User                         | vendor/spryker/user                            |
| UserLocale                   | vendor/spryker/user-locale                     |
| UserLocaleGui                | vendor/spryker/user-locale-gui                 |
| UserPasswordReset            | vendor/spryker/user-password-reset             |
| UserPasswordResetExtension   | vendor/spryker/user-password-reset-extension   |
| UserPasswordResetMail        | vendor/spryker/user-password-reset-mail        |
| SecurityBlockerBackoffice    | vendor/spryker/security-blocker-backoffice     |
| SecurityBlockerBackofficeGui | vendor/spryker/security-blocker-backoffice-gui |

Ensure that the following modules have been removed:

| MODULE                     | EXPECTED DIRECTORY                           |
|----------------------------|----------------------------------------------|
| Auth                       | vendor/spryker/auth                          |
| AuthMailConnector          | vendor/spryker/auth-mail-connector           |
| AuthMailConnectorExtension | vendor/spryker/auth-mail-connector-extension |

{% endinfo_block %}

2. If these modules have not been removed, remove them:

```bash
composer remove spryker/auth spryker/auth-mail-connector spryker/auth-mail-connector-extension
```

## 2) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                                     | TYPE      | EVENT   | PATH                                                                       |
|----------------------------------------------|-----------|---------|----------------------------------------------------------------------------|
| UserTransfer.fkLocale                        | attribute | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| UserTransfer.localName                       | attribute | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| UserTransfer.username                        | attribute | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| UserTransfer.password                        | attribute | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| UserTransfer.lastLogin                       | attribute | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| MessageTransfer                              | class     | created | src/Generated/Shared/Transfer/MessageTransfer                              |
| TranslationTransfer                          | class     | created | src/Generated/Shared/Transfer/TranslationTransfer                          |
| KeyTranslationTransfer                       | class     | created | src/Generated/Shared/Transfer/KeyTranslationTransfer                       |
| OauthAuthenticationLinkTransfer              | class     | created | src/Generated/Shared/Transfer/OauthAuthenticationLinkTransfer              |
| ResourceOwnerTransfer                        | class     | created | src/Generated/Shared/Transfer/ResourceOwnerTransfer                        |
| ResourceOwnerRequestTransfer                 | class     | created | src/Generated/Shared/Transfer/ResourceOwnerRequestTransfer                 |
| ResourceOwnerResponseTransfer                | class     | created | src/Generated/Shared/Transfer/ResourceOwnerResponseTransfer                |
| SecurityBlockerConfigurationSettingsTransfer | class     | created | src/Generated/Shared/Transfer/SecurityBlockerConfigurationSettingsTransfer |
| SecurityCheckAuthResponseTransfer            | class     | created | src/Generated/Shared/Transfer/SecurityCheckAuthResponseTransfer            |
| SecurityCheckAuthContextTransfer             | class     | created | src/Generated/Shared/Transfer/SecurityCheckAuthContextTransfer             |
| LocaleTransfer                               | class     | created | src/Generated/Shared/Transfer/LocaleTransfer                               |

{% endinfo_block %}

## 3) Set up the configuration

Add the following configuration to your project:

| CONFIGURATION                                                                   | SPECIFICATION                                                                                                                                          | NAMESPACE                 |
|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| TranslatorConstants::TRANSLATION_ZED_FALLBACK_LOCALES                           | Fallback locales that are used if there is no translation for a selected locale.                                                                       | Spryker\Shared\Translator |
| AclConstants::ACL_DEFAULT_RULES                                                 | Default rules for ACL functionality, where you can open access to some modules or controller out of the box.                                           | Spryker\Shared\Acl        |
| SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCKING_TTL                | Specifies the TTL configuration, the period when the number of unsuccessful tries is counted for a Back Office user.                                   | Spryker\Shared\SecurityBlockerBackoffice |
| SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCK_FOR_SECONDS           | Specifies the TTL configuration, the period for which the Back Office user is blocked if the number of attempts is exceeded for the Back Office.       | Spryker\Shared\SecurityBlockerBackoffice |
| SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCKING_NUMBER_OF_ATTEMPTS | Specifies number of failed login attempts a Back Office user can make during the `SECURITY_BLOCKER_BACKOFFICE:BLOCKING_TTL` time before it is blocked. | Spryker\Shared\SecurityBlockerBackoffice |

**config/Shared/config_default.php**

```php
use Spryker\Shared\Translator\TranslatorConstants;

// ----------- Translator
$config[TranslatorConstants::TRANSLATION_ZED_FALLBACK_LOCALES] = [
    'de_DE' => ['en_US'],
];

// >> BACKOFFICE

// ACL: Allow or disallow URLs for Zed GUI for ALL users
$config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'security-gui',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'acl',
        'controller' => 'index',
        'action' => 'denied',
        'type' => 'allow',
    ],
];

// Security Blocker Back Office user
$config[SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCKING_TTL] = 900;
$config[SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerBackofficeConstants::BACKOFFICE_USER_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;

```

### Set up an authentication strategy

Spryker offers two authentication strategies out of the box:

* `\Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig::AUTHENTICATION_STRATEGY_CREATE_USER_ON_FIRST_LOGIN`: If a user doesn't exist, it is created automatically based on the data from an external service.
* `\Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig::AUTHENTICATION_STRATEGY_ACCEPT_ONLY_EXISTING_USERS`: It accepts only existing users for authentication.


**src/Pyz/Zed/SecurityOauthUser/SecurityOauthUserConfig.php**

```php
<?php

namespace Pyz\Zed\SecurityOauthUser;

use Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig as SprykerSecurityOauthUserConfig;

class SecurityOauthUserConfig extends SprykerSecurityOauthUserConfig
{
    /**
     * @return string
     */
    public function getAuthenticationStrategy(): string
    {
        return static::AUTHENTICATION_STRATEGY_CREATE_USER_ON_FIRST_LOGIN;
    }
}
```

{% info_block warningBox "Verification" %}

After finishing the entire integration, ensure the following:
* Entries without a translation for a language with a configured fallback are translated into the fallback language.
* The translation cache is stored under the configured directory.
* Translations are found based on the configured path pattern.

{% endinfo_block %}

### Configure navigation

1. Add the `StorageGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <maintenance>
        <label>Maintenance</label>
        <title>Maintenance</title>
        <icon>fa-wrench</icon>
        <pages>
            <storage-gui>
                <label>Storage</label>
                <title>Storage index</title>
                <bundle>storage-gui</bundle>
                <controller>maintenance</controller>
                <action>index</action>
            </storage-gui>
        </pages>
    </maintenance>
</config>
```

2. Execute the following command:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

In the Back Office, make sure that you can select **Maintenance&nbsp;<span aria-label="and then">></span> Storage**.

{% endinfo_block %}

### Configure the `User` module to execute post save plugins:

**src/Pyz/Zed/User/UserConfig.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserConfig as SprykerUserConfig;

class UserConfig extends SprykerUserConfig
{
    /**
     * @var bool
     */
    protected const IS_POST_SAVE_PLUGINS_ENABLED_AFTER_USER_STATUS_CHANGE = true;

}
```

## 4) Set up behavior

Set up the following behaviors.

### Set up admin user login to the Back Office

1. Activate the following security plugins:

| PLUGIN                                                           | SPECIFICATION                                                                                                                                                                                           | PREREQUISITES                                                                                                                | NAMESPACE                                                                       |
|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| ZedSecurityApplicationPlugin                                     | Integrates with the Symfony framework, leveraging its security components for managing authentication and authorization, configures and provides necessary services for security-related functionality. | If there is `WebProfilerApplicationPlugin` in `ApplicationDependencyProvider`, put `ZedSecurityApplicationPlugin` before it. | Spryker\Zed\Security\Communication\Plugin\Application                           |  
| ZedUserSessionHandlerSecurityPlugin                              | Extends security service with `CurrentUserSessionHandlerListener` to handle user sessions during the authentication process.                                                                            | None                                                                                                                         | Spryker\Zed\User\Communication\Plugin\Securiy                                   |
| ZedUserSecurityPlugin                                            | Extends security service with User firewall.                                                                                                                                                            | None                                                                                                                         | Spryker\Zed\SecurityGui\Communication\Plugin\Security                           |
| UserPasswordResetMailTypeBuilderPlugin                           | Builds the `MailTransfer` with data for a user password restore mail.                                                                                                                                   | None                                                                                                                         | Spryker\Zed\UserPasswordResetMail\Communication\Plugin\Mail                     |
| MailUserPasswordResetRequestStrategyPlugin                       | Sends a password reset email on a user request.                                                                                                                                                         | Mail module must be configured. <br>`UserPasswordResetMailTypeBuilderPlugin` is enabled.                                     | Spryker\Zed\UserPasswordResetMail\Communication\Plugin\UserPasswordReset        |
| ZedOauthUserSecurityPlugin                                       | Extends `User` firewall with authenticator and user provider if exists, introduces `OauthUser` firewall in security service otherwise.                                                                  | Mst be connected after or instead of `ZedUserSecurityPlugin`                                                                 | \Spryker\Zed\SecurityOauthUser\Communication\Plugin\Security                    |
| BackofficeUserSecurityBlockerConfigurationSettingsExpanderPlugin | Expands security blocker configuration settings with Back Office user security configuration.                                                                                                           | None                                                                                                                         | \Spryker\Client\SecurityBlockerBackoffice\Plugin\SecurityBlocker                |
| SecurityBlockerBackofficeUserEventDispatcherPlugin               | Adds a listener to log the failed Backoffice login attempts. Denies user access in case of exceeding the limit.                                                                                         | None                                                                                                                         | \Spryker\Zed\SecurityBlockerBackofficeGui\Communication\Plugin\EventDispatcher  |

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Security\Communication\Plugin\Application\ZedSecurityApplicationPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\Application\WebProfilerApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new ZedSecurityApplicationPlugin(),
            
            // web profiler plugin should be after the security plugin.
            new WebProfilerApplicationPlugin(),
        ]

        return $plugins;
    }

    /**
     * @return list<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackofficeApplicationPlugins(): array
    {
        $plugins = [
            new ZedSecurityApplicationPlugin(),
        ];

        return $plugins;
    }

    /**
     * @return list<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackendGatewayApplicationPlugins(): array
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
use Spryker\Zed\SecurityGui\Communication\Plugin\Security\ZedUserSecurityPlugin;
use Spryker\Zed\SecurityOauthUser\Communication\Plugin\Security\ZedOauthUserSecurityPlugin;
use Spryker\Zed\User\Communication\Plugin\Security\ZedUserSessionHandlerSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new ZedUserSessionHandlerSecurityPlugin(),
            new ZedUserSecurityPlugin(),
            new ZedOauthUserSecurityPlugin(),
        ];
    }
}
```

**src/Pyz/Client/SecurityBlocker/SecurityBlockerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\SecurityBlocker\SecurityBlockerDependencyProvider as SprykerSecurityBlockerDependencyProvider;
use Spryker\Client\SecurityBlockerBackoffice\Plugin\SecurityBlocker\BackofficeUserSecurityBlockerConfigurationSettingsExpanderPlugin;

class SecurityBlockerDependencyProvider extends SprykerSecurityBlockerDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerConfigurationSettingsExpanderPluginInterface>
     */
    protected function getSecurityBlockerConfigurationSettingsExpanderPlugins(): array
    {
        return [
            new BackofficeUserSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\SecurityBlockerBackofficeGui\Communication\Plugin\EventDispatcher\SecurityBlockerBackofficeUserEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new SecurityBlockerBackofficeUserEventDispatcherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that `https://mysprykershop.com/security-oauth-user/login` redirects you to the login page with the *Authentication failed!* message displayed.

{% endinfo_block %}

**src/Pyz/Zed/UserPasswordReset/UserPasswordResetDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\UserPasswordReset;

use Spryker\Zed\UserPasswordReset\UserPasswordResetDependencyProvider as SprykerUserPasswordResetDependencyProvider;
use Spryker\Zed\UserPasswordResetMail\Communication\Plugin\UserPasswordReset\MailUserPasswordResetRequestStrategyPlugin;

class UserPasswordResetDependencyProvider extends SprykerUserPasswordResetDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\UserPasswordResetExtension\Dependency\Plugin\UserPasswordResetRequestStrategyPluginInterface>
     */
    public function getUserPasswordResetRequestStrategyPlugins(): array
    {
        return [
            new MailUserPasswordResetRequestStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Mail/MailDependencyProvider.php**
```php
<?php

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\UserPasswordResetMail\Communication\Plugin\Mail\UserPasswordResetMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface>
     */
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new UserPasswordResetMailTypeBuilderPlugin(),
        ];
    }
}
```

2. Rebuild Zed router and Twig caches:

```bash
console router:cache:warm-up
console twig:cache:warmer
```

{% info_block warningBox "Verification" %}

Ensure the following:
* You can open the Back Office login page or any page which requires authentication.
* On the Back Office login page, the **Forgot password?** button redirects you to the password reset form.
* You receive a password reset email to the email address you submitted the password reset form with.

{% endinfo_block %}

### Set up translation across the Back Office

1. Activate the following plugins for translation:

| PLUGIN                        | SPECIFICATION                                                                        | PREREQUISITES                                                                                                                                                      | NAMESPACE                                             |
|-------------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| TranslatorInstallerPlugin     | Regenerates new translation caches for all locales of the current store.             | None                                                                                                                                                               | Spryker\Zed\Translator\Communication\Plugin           |
| TranslationPlugin             | Translates flash messages provided by the Messenger module.                          | None                                                                                                                                                               | Spryker\Zed\Translator\Communication\Plugin\Messenger |
| TranslatorTwigPlugin          | Extends Twig with Symfony's translation extension and Spryker's translator logic.    | None                                                                                                                                                               | Spryker\Zed\Translator\Communication\Plugin\Twig      |
| UserLocaleLocalePlugin        | Provides locale of the logged-in user as current locale.                             | Enable `\Spryker\Zed\Locale\Communication\Plugin\Application\LocaleApplicationPlugin` that sets the locale of the application based on the provided locale plugin. | Spryker\Zed\UserLocale\Communication\Plugin\Locale    |
| AssignUserLocalePreSavePlugin | Expands `UserTransfer` before saving it with a locale ID and name.                   | None                                                                                                                                                               | Spryker\Zed\UserLocale\Communication\Plugin\User      |
| LocaleUserExpanderPlugin      | Expands `UserTransfer` with a locale ID and name after reading it from the database. | None                                                                                                                                                               | Spryker\Zed\UserLocale\Communication\Plugin\User      |
| UserLocaleFormExpanderPlugin  | Expands the Edit user profile form with a locale field.                              | None                                                                                                                                                               | Spryker\Zed\UserLocaleGui\Communication\Plugin        |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Translator\Communication\Plugin\TranslatorInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface>
     */
    public function getInstallerPlugins()
    {
        return [
     		new TranslatorInstallerPlugin(),
        ];
    }
}
```

2. Execute the registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Ensure that the command has done the following:
* Cleaned the previous translation cache in the translation folder, which is `data/{YOUR_STORE}/cache/Zed/translation` by default.
* Generated translation cache files like `catalogue.{YOUR_LOCALE}.{RANDOM_STRING}.php` and `catalogue.{YOUR_LOCALE}.{RANDOM_STRING}.php.meta` in the translation folder, which is `data/{YOUR_STORE}/cache/Zed/translation` by default.

{% endinfo_block %}

**src/Pyz/Zed/Messenger/MessengerDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Messenger;

use Spryker\Zed\Messenger\MessengerDependencyProvider as SprykerMessengerDependencyProvider;
use Spryker\Zed\Translator\Communication\Plugin\Messenger\TranslationPlugin;

class MessengerDependencyProvider extends SprykerMessengerDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MessengerExtension\Dependency\Plugin\TranslationPluginInterface>
     */
    protected function getTranslationPlugins(): array
    {
        return [
            /**
             * TranslationPlugin needs to be after other translator plugins.
             */
            new TranslationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Translator\Communication\Plugin\Twig\TranslatorTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new TranslatorTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the `trans` and `transChoice` Twig filters work and use translations from the configured translation files.

{% endinfo_block %}

**src/Pyz/Zed/Locale/LocaleDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Locale;

use Spryker\Shared\LocaleExtension\Dependency\Plugin\LocalePluginInterface;
use Spryker\Zed\Locale\LocaleDependencyProvider as SprykerLocaleDependencyProvider;
use Spryker\Zed\UserLocale\Communication\Plugin\Locale\UserLocaleLocalePlugin;

class LocaleDependencyProvider extends SprykerLocaleDependencyProvider
{
    /**
     * @return \Spryker\Shared\LocaleExtension\Dependency\Plugin\LocalePluginInterface
     */
    protected function getLocalePlugin(): LocalePluginInterface
    {
        return new UserLocaleLocalePlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the locale of the Back Office matches the locale of a logged-in user.

{% endinfo_block %}

<details><summary markdown='span'>src/Pyz/Zed/User/UserDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;
use Spryker\Zed\UserLocale\Communication\Plugin\User\AssignUserLocalePreSavePlugin;
use Spryker\Zed\UserLocale\Communication\Plugin\User\LocaleUserExpanderPlugin;
use Spryker\Zed\UserLocaleGui\Communication\Plugin\UserLocaleFormExpanderPlugin;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface>
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new UserLocaleFormExpanderPlugin(),
        ];
    }


	/**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserPreSavePluginInterface>
     */
    protected function getUserPreSavePlugins(): array
    {
        return [
            new AssignUserLocalePreSavePlugin(),
        ];
    }

	/**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserExpanderPluginInterface>
     */
    protected function getUserExpanderPlugins(): array
    {
        return [
            new LocaleUserExpanderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Ensure that you've enabled the plugins:
1. In the Back Office, select **Users&nbsp;<span aria-label="and then">></span> Users**.
2. Select **Add New User**.
3. On the **Create new User** page, check that the **Interface language*** field exists.

{% endinfo_block %}

3. Add translations

Append glossary according to your configuration:

data/import/common/common/glossary.csv

```yaml
security_blocker_backoffice_gui.error.account_blocked,"Too many log in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
security_blocker_backoffice_gui.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

### Set up Audit logging

1. Activate the following plugins:

| PLUGIN                                 | SPECIFICATION                                                         | PREREQUISITES | NAMESPACE                                  |
|----------------------------------------|-----------------------------------------------------------------------|---------------|--------------------------------------------|
| CurrentUserDataRequestProcessorPlugin  | Adds username and user UUID from the current request to the log data. | None          | Spryker\Zed\User\Communication\Plugin\Log  |

**src/Pyz/Zed/Log/LogDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Log;

use Spryker\Zed\User\Communication\Plugin\Log\CurrentUserDataRequestProcessorPlugin;
use Spryker\Zed\Log\LogDependencyProvider as SprykerLogDependencyProvider;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getZedSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new CurrentUserDataRequestProcessorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getMerchantPortalSecurityAuditLogProcessorPlugins(): array
    {
        return [
            new CurrentUserDataRequestProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the audit logs data is expanded by the current logged in user data.

{% endinfo_block %}

### Set up console commands for managing the translation cache

1. Set up the following console commands:

| COMMAND                         | SPECIFICATION                        | PREREQUISITES | NAMESPACE                                    |
|---------------------------------|--------------------------------------|-----------------|----------------------------------------------|
| CleanTranslationCacheConsole    | Cleans translation cache for Zed.    | None            | Spryker\Zed\Translator\Communication\Console |
| GenerateTranslationCacheConsole | Generates translation cache for Zed. | None            | Spryker\Zed\Translator\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Translator\Communication\Console\CleanTranslationCacheConsole;
use Spryker\Zed\Translator\Communication\Console\GenerateTranslationCacheConsole;

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
            new CleanTranslationCacheConsole(),
            new GenerateTranslationCacheConsole(),
        ];
        
        return $commands;
    }
}
```

2. Regenerate translation cache:

```bash
console translator:clean-cache
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Ensure that the command has done the following:
* Cleaned the previous translation cache in the translation folder, which is `data/{YOUR_STORE}/cache/Zed/translation` by default.
* Generated translator cache files like `catalogue.{YOUR_LOCALE}.{RANDOM_STRING}.php` and `catalogue.{YOUR_LOCALE}.{RANDOM_STRING}.php.meta` in the translation folder, which is `data/{YOUR_STORE}/cache/Zed/translation` by default.

{% endinfo_block %}
