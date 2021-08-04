---
title: Spryker Core Back Office feature integration
originalLink: https://documentation.spryker.com/2021080/docs/spryker-core-back-office-feature-integration
redirect_from:
  - /2021080/docs/spryker-core-back-office-feature-integration
  - /2021080/docs/en/spryker-core-back-office-feature-integration
---

{% info_block errorBox %}

This feature Integration guide expects the basic feature to be in place.

The current feature integration guide adds the following functionalities:

*   Translation
    
*   Security
    
*   OAuth 2.0/Open ID Connect Support for Zed login


{% endinfo_block %}
  


## Prerequisites

Ensure that the related features are installed:

| Name | Version |
| --- | --- | --- |
| Spryker Core | {% raw %}{{{% endraw %}variable.dev-master{% raw %}}}{% endraw %} | [Spryker Core feature integration](https://documentation.spryker.com/upcoming-release/docs/spryker-core-feature-integration) |
 

## 1) Install the required modules using Composer

Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/spryker-core-back-office:"dev-master" --update-with-dependencies
``` 
  
{% info_block warningBox "Verification" %}


Ensure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| Translator | vendor/spryker/translator |
| UserLocale |vendor/spryker/user-locale|
| UserLocaleGui |vendor/spryker/user-locale-gui|
| MessengerExtension| vendor/spryker/messenger-extension|
| SecurityGui |vendor/spryker/security-gui|
| UserPasswordReset |vendor/spryker/user-password-reset|
| UserPasswordResetExtension| vendor/spryker/user-password-reset-extension|
| UserPasswordResetMail |vendor/spryker/user-password-reset-mail|
| SecurityOauthUser| vendor/sprkyer/security-oauth-user|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that the following modules have been uninstalled:

| Module | Expected Directory |
| --- | --- |
| Auth | vendor/spryker/auth |
| AuthMailConnector| vendor/spryker/auth-mail-connector|
| AuthMailConnectorExtension| vendor/spryker/auth-mail-connector-extension|

{% endinfo_block %}


if not uninstalled, run the following command:
```bash
composer remove spryker/auth spryker/auth-mail-connector spryker/auth-mail-connector-extension
```
  

## 2) Set up transfer objects

Run the following commands to generate transfers:
```bash
console transfer:generate
```
  
Ensure the following transfers have been created:
| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `UserTransfer.``fkLocale` | attribute | created | `src/Generated/Shared/Transfer/UserTransfer` |
|`UserTransfer.``localName`| attribute |created| `src/Generated/Shared/Transfer/UserTransfer`|
| `UserTransfer.username`| attribute| created |`src/Generated/Shared/Transfer/UserTransfer`|
| `UserTransfer.password`| attribute |created| `src/Generated/Shared/Transfer/UserTransfer`|
| `UserTransfer.lastLogin`| attribute| created |`src/Generated/Shared/Transfer/UserTransfer`|
| `MessageTransfer`|  class| created| `src/Generated/Shared/Transfer/MessageTransfer`|
| `TranslationTransfer`| class| created| `src/Generated/Shared/Transfer/TranslationTransfer`|
| `KeyTranslationTransfer`| class| created |`src/Generated/Shared/Transfer/KeyTranslationTransfer`|
| `OauthAuthenticationLinkTransfer`| class | created| `src/Generated/Shared/Transfer/OauthAuthenticationLinkTransfer`|
| `ResourceOwnerTransfer`| class |created| `src/Generated/Shared/Transfer/ResourceOwnerTransfer`|
| `ResourceOwnerRequestTransfer`| class| created| `src/Generated/Shared/Transfer/ResourceOwnerRequestTransfer`|
| `ResourceOwnerResponseTransfer`| class |created| `src/Generated/Shared/Transfer/ResourceOwnerResponseTransfer`|

## 3) Set up the configuration

Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `TranslatorConstants::TRANSLATION_ZED_FALLBACK_LOCALES` |  Fallback locales that are used if there is no translation for a selected locale. | `Spryker\Shared\Translator` |
| `TranslatorConstants::TRANSLATION_ZED_CACHE_DIRECTORY`| Absolute path to a translation cache directory. For example, `/var/www/data/DE/cache/Zed/translation`. |`Spryker\Shared\Translator`|
| `TranslatorConstants::TRANSLATION_ZED_FILE_PATH_PATTERNS`| Paths to project level translations. You can use a global pattern that specifies sets of filenames with wildcard characters. |`Spryker\Shared\Translator`|
| `AclConstants::ACL_DEFAULT_RULES` |Default rules for ACL functionality, where you can open access to some modules or controller out of the box. |`Spryker\Shared\Acl`|

  
<details open>
    <summary>config/Shared/config_default.php</summary>
    
```php
use Spryker\Shared\Translator\TranslatorConstants;

// ----------- Translator
$config[TranslatorConstants::TRANSLATION_ZED_FALLBACK_LOCALES] = [
    'de_DE' => ['en_US'],
];
$config[TranslatorConstants::TRANSLATION_ZED_CACHE_DIRECTORY] = sprintf(
    '%s/data/%s/cache/Zed/translation',
    APPLICATION_ROOT_DIR,
    $CURRENT_STORE
);
$config[TranslatorConstants::TRANSLATION_ZED_FILE_PATH_PATTERNS] = [
    APPLICATION_ROOT_DIR . '/data/translation/Zed/*/[a-z][a-z]_[A-Z][A-Z].csv',
];

// >> BACKOFFICE

// ACL: Allow or disallow of URLs for Zed GUI for ALL users
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
```

</details>

### Set up an authentication strategy

Spryker offers two authentication strategies out of the box:

* `\Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig::AUTHENTICATION_STRATEGY_CREATE_USER_ON_FIRST_LOGIN` — If a user does not exist, it is created automatically based on the data from an external service.
*   `\Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig::AUTHENTICATION_STRATEGY_ACCEPT_ONLY_EXISTING_USERS` — Accepts only existing users for authentication.
        

**src/Pyz/Zed/SecurityOauthUser/SecurityOauthUserConfig.php**
```php
<?php

namespace Pyz\Zed\SecurityOauthUser;

use Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig as SprykerSecurityOauthUserConfig;

class SecurityOauthUserConfig extends SprykerSecurityOauthUserConfig
{
    /**
     * Specification:
     *  - Defines by which strategy Oauth user authentication should be.
     *
     * @api
     *
     * @return string
     */
    public function getAuthenticationStrategy(): string
    {
        return static::AUTHENTICATION_STRATEGY_CREATE_USER_ON_FIRST_LOGIN;
    }
}
```
{% info_block warningBox %}

Having finished the entire integration, ensure that:

*   Entries without a translation for a language with a configured fallback are translated into the fallback language.
    
*   Translation cache is stored under the configured directory.
    
*   Translations are found based on the configured file path pattern.  

{% endinfo_block %}

    

## 4) Set up behavior

Set up the following behaviors.

### Set up admin user login to the Back Office

Set up admin user login to the Back Office:

1. Activate the following security plugins:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| SecurityApplicationPlugin | Extends the Zed global container with the services required for the Security functionality. | If there is `WebProfilerApplicationPlugin` in `ApplicationDependencyProvider`, put `SecurityApplicationPlugin` before it. | Spryker\Zed\Security\Communication\Plugin\Application |  
|UserSessionHandlerSecurityPlugin |Sets an authenticated user to the session. |None| Spryker\Zed\User\Communication\Plugin\Securiy|
| UserSecurityPlugin |Sets security firewalls, such as rules and handlers, for the Back Office users. |None |Spryker\Zed\SecurityGui\Communication\Plugin\Security|
| UserPasswordResetMailTypePlugin |Adds a new email type, which is used by `MailUserPasswordResetRequestHandlerPlugin`. |None |Spryker\Zed\UserPasswordResetMail\Communication\Plugin\Mail|
| MailUserPasswordResetRequestHandlerPlugin| Sends a password reset email on a user request. | Mail module must be configured. </br>`UserPasswordResetMailTypePlugin` is enabled.| Spryker\Zed\UserPasswordResetMail\Communication\Plugin\UserPasswordReset|
| OauthUserSecurityPlugin |Sets security firewalls, such as rules and handlers, for Oauth users. |None |\Spryker\Zed\SecurityOauthUser\Communication\Plugin\Security|



**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Security\Communication\Plugin\Application\SecurityApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
		return [
			new SecurityApplicationPlugin(),

			// web profiler plugin should be after security plugin.
			new WebProfilerApplicationPlugin(),
		];
    }
}
```
  

**src/Pyz/Zed/Security/SecurityDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Security;

use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use Spryker\Zed\SecurityOauthUser\Communication\Plugin\Security\OauthUserSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return \Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface[]
     */
    protected function getSecurityPlugins(): array
    {
        return [
		    new UserSessionHandlerSecurityPlugin(),
            new UserSecurityPlugin(),
			new OauthUserSecurityPlugin(),
        ];
    }
}
```
  
{% info_block warningBox "Verification" %}

Ensure that `https://mysprykershop.com/security-oauth-user/login` redirects you to the login page with the “Authentication failed!” message displayed.


{% endinfo_block %}


  

**src/Pyz/Zed/UserPasswordReset/UserPasswordResetDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\UserPasswordReset;

use Spryker\Zed\UserPasswordReset\UserPasswordResetDependencyProvider as SprykerUserPasswordResetDependencyProvider;
use Spryker\Zed\UserPasswordResetMail\Communication\Plugin\UserPasswordReset\MailUserPasswordResetRequestHandlerPlugin;

class UserPasswordResetDependencyProvider extends SprykerUserPasswordResetDependencyProvider
{
    /**
     * @return \Spryker\Zed\UserPasswordResetExtension\Dependency\Plugin\UserPasswordResetRequestHandlerPluginInterface[]
     */
    public function getUserPasswordResetRequestHandlerPlugins(): array
    {
        return [
            new MailUserPasswordResetRequestHandlerPlugin(),
        ];
    }
}
```
  

**src/Pyz/Zed/Mail/MailDependencyProvider.php**
```php
<?php

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\UserPasswordResetMail\Communication\Plugin\Mail\UserPasswordResetMailTypePlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection
				->add(new UserPasswordResetMailTypePlugin());

			return $mailCollection;
        });
		
		return $container;
    }
}
```

  
2. Rebuild Zed router and Twig caches:
```bash
console router:cache:warm-up
console twig:cache:warmer
```
  
{% info_block warningBox "Verification" %}



Ensure that:

*   You can open the Back Office login page or any page which requires authentication.
    
*   On the Back Office login page, the **Forgot password?** button redirects you to the password reset form.
    
*   You receive a password reset email to the email address you submitted the password reset form with.

{% endinfo_block %}    

  

### Set up translation across the Back Office

To set up translation:

1. Activate the following plugins for translation:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| TranslatorInstallerPlugin | Regenerates new translation caches for all locales of the current store. | None | Spryker\Zed\Translator\Communication\Plugin |
| TranslationPlugin |Translates flash messages provided by the Messenger module.| None| Spryker\Zed\Translator\Communication\Plugin\Messenger|
| TranslatorTwigPlugin |Extends Twig with Symfony's translation extension and Spryker's translator logic. |None |Spryker\Zed\Translator\Communication\Plugin\Twig|
| UserLocaleLocalePlugin |Provides locale of the logged-in user as current locale. | Enable `\Spryker\Zed\Locale\Communication\Plugin\Application\LocaleApplicationPlugin` that sets the locale of the application based on the provided locale plugin. |Spryker\Zed\UserLocale\Communication\Plugin\Locale|
| AssignUserLocalePreSavePlugin |Expands `UserTransfer` before saving it with a locale ID and name. |None |Spryker\Zed\UserLocale\Communication\Plugin\User|
| UserLocaleTransferExpanderPlugin |Expands `UserTransfer` with a locale ID and name after reading it from the database.| None |Spryker\Zed\UserLocale\Communication\Plugin\User|
| UserLocaleFormExpanderPlugin |Expands the Edit user profile form with a locale field. |None |Spryker\Zed\UserLocaleGui\Communication\Plugin|



  

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Translator\Communication\Plugin\TranslatorInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
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



Ensure that the command:

*   cleaned previous translation cache in the translation folder, which is `data/{YourStore}/cache/Zed/translation` by default.
    
*   generated translation cache files like `catalogue.{your_locale}.{randomString}.php` and `catalogue.{your_locale}.{randomString}.php.meta` in the translation folder, which is `data/{YourStore}/cache/Zed/translation` by default.

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
     * @return \Spryker\Zed\MessengerExtension\Dependency\Plugin\TranslationPluginInterface[]
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
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
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


Ensure that the `trans` and `transChoice` Twig filters are working and using translations from the configured translation files.

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


  
<details open>
    <summary>src/Pyz/Zed/User/UserDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;
use Spryker\Zed\UserLocale\Communication\Plugin\User\AssignUserLocalePreSavePlugin;
use Spryker\Zed\UserLocale\Communication\Plugin\User\UserLocaleTransferExpanderPlugin;
use Spryker\Zed\UserLocaleGui\Communication\Plugin\UserLocaleFormExpanderPlugin;

class UserDependencyProvider extends SprykerUserDependencyProvider
{

	/**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface[]
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new UserLocaleFormExpanderPlugin(),
        ];
    }
   

	/**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserPreSavePluginInterface[]
     */
    protected function getUserPreSavePlugins(): array
    {
        return [
            new AssignUserLocalePreSavePlugin(),
        ];
    }

	/**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTransferExpanderPluginInterface[]
     */
    protected function getUserTransferExpanderPlugins(): array
    {
        return [
            new UserLocaleTransferExpanderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}




Ensure that you’ve enabled the plugins:

1.  In the Back Office, go to **Users** > **Users**.
    
2.  Select **+Add New User**.
    
3.  On the *Create new User* page, check that the **Interface language*** field exists.
    

{% endinfo_block %}

### Set up console commands for cache

Set up the following console commands:

| Command | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| CleanTranslationCacheConsole | Cleans translation cache for Zed. | None | Spryker\Zed\Translator\Communication\Console |
| GenerateTranslationCacheConsole |Generates translation cache for Zed. |None| Spryker\Zed\Translator\Communication\Console|

 

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
     * @return \Symfony\Component\Console\Command\Command[]
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

Regenerate translation cache:
```bash
console translator:clean-cache
console translator:generate-cache
```
{% info_block warningBox "Verification" %}




Ensure that the command:

*   cleaned previous translation cache in the translation folder, which is `data/{YourStore}/cache/Zed/translation` by default.
    
*   generated translator cache files like `catalogue.{your_locale}.{randomString}.php` and `catalogue.{your_locale}.{randomString}.php.meta` in the translation folder, which is `data/{YourStore}/cache/Zed/translation` by default.
    

{% endinfo_block %}
  


