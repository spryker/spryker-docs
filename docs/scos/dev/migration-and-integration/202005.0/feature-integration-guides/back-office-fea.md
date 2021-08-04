---
title: Back Office Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/back-office-feature-integration
redirect_from:
  - /v5/docs/back-office-feature-integration
  - /v5/docs/en/back-office-feature-integration
---

## Install Feature API
### Prerequisites
Ensure that the related features have been installed:

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/spryker-core: "^master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`Translator`</td><td>`vendor/spryker/translator`</td></tr><tr><td>`UserLocale`</td><td>`vendor/spryker/user-locale`</td></tr><tr><td>`UserLocaleGui`</td><td>`vendor/spryker/user-locale-gui`</td></tr><tr><td>`MessengerExtension`</td><td>`vendor/spryker/messenger-extension`</td></tr></tbody></table>
{% endinfo_block %}


### 2) Set up Transfer Objects

Run the following command to generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following transfers have been created:<table><thead><tr><th>Transfer </th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`UserTransfer.fkLocale`</td><td>attribute</td><td>created</td><td>`src/Generated/Shared/Transfer/UserTransfer`</td></tr><tr><td>`UserTransfer.localName`</td><td>attribute</td><td>created</td><td>`src/Generated/Shared/Transfer/UserTransfer`</td></tr><tr><td>`TranslationTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/TranslationTransfer`</td></tr><tr><td>`KeyTranslationTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/KeyTranslationTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Set up Configuration
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `TranslatorConstants::TRANSLATION_ZED_FALLBACK_LOCALES` | Fallback locales that are used if there is no translation for a selected locale. | `Spryker\Shared\Translator` |
| `TranslatorConstants::TRANSLATION_ZED_CACHE_DIRECTORY` | Absolute path to a translation cache directory. E.g. `var/www/data/DE/cache/Zed/translation`. | `Spryker\Shared\Translator` |
| `TranslatorConstants::TRANSLATION_ZED_FILE_PATH_PATTERNS` | Paths to project level translations. A glob pattern can be used. | `Spryker\Shared\Translator` |

**config/Shared/config_default.php**

```php
<?php

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
```

{% info_block warningBox "Verification" %}
Having finished the feature integration, make sure that:<ul><li>The missing translations of the language which has a configured fallback are translated accordingly.</li><li>Translation cache is stored in the configured directory.</li><li>Translations are located according to the configured file path pattern.</li></ul>
{% endinfo_block %}

### 3) Set up Behavior

#### Set up Translation Across Spryker

Activate the following plugins:

| Plugin |Specification |Prerequisites  | Namespace |
| --- | --- | --- | --- |
| `TranslatorInstallerPlugin` | Cleans and generates new translation cache. | None | `Spryker\Zed\Translator\Communication\Plugin\TranslatorInstallerPlugin` |
| `TranslationPlugin` | Translates messages. | None | `Spryker\Zed\Translator\Communication\Plugin\Messenger\TranslationPlugin` |
| `ZedTranslatorPlugin` | Extends Application with Translator instance. | None | `Spryker\Zed\Translator\Communication\Plugin\Application\ZedTranslatorPlugin` |
| `UserLocalePlugin` | Replaces default Application locale with User Locale. | None | `Spryker\Zed\UserLocale\Communication\Plugin\Application\UserLocalePlugin` |
| `AssignUserLocalePreSavePlugin` | Expands `UserTransfer` with `Locale Id` and `Locale Name`. | None | `Spryker\Zed\UserLocale\Communication\Plugin\User\AssignUserLocalePreSavePlugin` |
| `UserLocaleTransferExpanderPlugin` | Expands `UserTransfer` with `Locale Id` and `Locale Name`. | None | `Spryker\Zed\UserLocale\Communication\Plugin\User\UserLocaleTransferExpanderPlugin` |
| `UserLocaleFormExpanderPlugin` | Anonymizes customer data during customer anonymization. | None | `Spryker\Zed\UserLocaleGui\Communication\Plugin\UserLocaleFormExpanderPlugin` |

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

Run the following console command to execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}
Make sure that:<ul><li>the command has cleaned previous translation cache information in the translation folder that is `data/{YourStore}/cache/Zed/translation`, by default.</li><li>the command has generated translator cache files like `catalogue.{your_locale}.{randomString}.php` and `catalogue.{your_locale}.{randomString}.php.meta`  in `data/{YourStore}/cache/Zed/translation` which is the default folder.</li></ul>
{% endinfo_block %}

**src/Pyz/Zed/Messenger/MessengerDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Application;
 
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
Make sure the trans and `transChoice` twig filters are working and using translations from the configured translation files.
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
Make sure that the locale of the back office matches the locale of the logged in user.
{% endinfo_block %}

**src/Pyz/Zed/User/UserDependencyProvider.php**

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

{% info_block warningBox "Verification" %}
Make sure that plugins work: </br>1. Log into back office.</br>2. Go to the *User Control>User* section.</br>3. Click **Add New User**.</br>4. Check that the **Interface language*** field is available on the *Create new User* page.
{% endinfo_block %}

#### Set Up Console Commands

| Command | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CleanTranslationCacheConsole` | Cleans translation cache for Zed. | None | `Spryker\Zed\Translator\Communication\Console\CleanTranslationCacheConsole` |
| `GenerateTranslationCacheConsole` | Generates new translation cache for Zed. | None | `Spryker\Zed\Translator\Communication\Console\GenerateTranslationCacheConsole` |

**src\Pyz\Zed\Console\ConsoleDependencyProvider**

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

Run the commands:

```bash
console translator:clean-cache
console translator:generate-cache
```

The `console translator:clean-cache` command will clean translator cache folder that is `data/{YourStore}/cache/Zed/translation`, by default.
The `console translator:generate-cache` command will generate translator cache files like `catalogue.{your_locale}.{randomString}.php` and `catalogue.{your_locale}.{randomString}.php.meta` in folder `data/{YourStore}/cache/Zed/translation`, by default.

