This document describes how to upgrade the Locale module.

## Upgrading from version 3.* to version 4.0.0

In this new version of the `Locale` module, we have added support configuration locale for each store in database.
With the `Locale` module version 4 we have added the `spy_locale_store` database table to persist stores-locales in ZED.
Also added column `fk_locale` into  `spy_store` for save default locale per store. 

You can find more details about the changes on the [Locale module](https://github.com/spryker/locale/releases) release page.

*Estimated migration time: 5 min 99 sec*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Locale` module to the new version:

```bash
composer require spryker/locale:"^4.0.0" --update-with-dependencies
```

2. Install the `LocalDataImport` module for import data for populate configuration tables in database.

```bash
composer require spryker/locale-data-import --update-with-dependencies
```
3. Run `vendor/bin/console transfer:generate` to update the transfer objects.

4. Run `vendor/bin/console propel:migrate` to apply the database changes.

5. Add new plugins to dependency providers:

**Application integration**

`src/Pyz/Zed/Application/ApplicationDependencyProvider.php`

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleBackendGatewayApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        return [
            ...
            new LocaleBackendGatewayApplicationPlugin(),
            ...
        ];
    }

    ...
}
```

**Integrate console commands**

`src/Pyz/Zed/Console/ConsoleDependencyProvider.php`

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\Console\LocaleApplicationPlugin;
use Spryker\Zed\LocaleDataImport\LocaleDataImportConfig;
use Spryker\Zed\Locale\Communication\Plugin\Console\LocaleApplicationPlugin;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider 
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            ...
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_DEFAULT_LOCALE_STORE),
            ...        
        ];
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        ...
        
        $applicationPlugins[] = new LocaleApplicationPlugin();
        
        ...
        
        return $applicationPlugins;
    }
}
```

**DataImport integrations**

`src/Pyz/Zed/DataImport/DataImportDependencyProvider.php`


```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\DefaultLocaleStoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\LocaleStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    ... 
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            ...
            new LocaleStoreDataImportPlugin(),
            new DefaultLocaleStoreDataImportPlugin(),
            ...
        ];           
    }
    
    ...
}
```

**Integrate store dependency provider**


`src/Pyz/Zed/Store/StoreDependencyProvider.php`


```php
<?php

namespace Pyz\Zed\Store;

use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostUpdatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreCreateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStoreCollectionExpanderPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostUpdatePlugin;
use Spryker\Zed\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreCreateValidationPluginInterface>
     */
    protected function getStorePreCreateValidationPlugins(): array
    {
        return [
            ...
            new DefaultLocaleStorePreCreateValidationPlugin(),
            ...
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreUpdateValidationPluginInterface>
     */
    protected function getStorePreUpdateValidationPlugins(): array
    {
        return [
            ...
            new DefaultLocaleStorePreUpdateValidationPlugin(),
            ...
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostCreatePluginInterface>
     */
    protected function getStorePostCreatePlugins(): array
    {
        return [
            ...
            new DefaultLocaleStorePostCreatePlugin(),
            new LocaleStorePostCreatePlugin(),
            ... 
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostUpdatePluginInterface>
     */
    protected function getStorePostUpdatePlugins(): array
    {
        return [
            ...
            new DefaultLocaleStorePostUpdatePlugin(),
            new LocaleStorePostUpdatePlugin(),
            ...
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StoreCollectionExpanderPluginInterface>
     */
    protected function getStoreCollectionExpanderPlugins(): array
    {
        return [
            ...
            new LocaleStoreCollectionExpanderPlugin(),
            ...
        ];
    }
}
```

5. Preparing csv files for configure stores via data import 

Example for DE store locales configurations: 
`data/import/common/DE/locale_store.csv`

```
locale_name,store_name
en_US,DE
de_DE,DE
```

Example for DE store default locale:
`data/import/common/DE/default_locale_store.csv`

```
locale_name,store_name
en_US,DE
```

6. Use data import command for import configuration

```bash 
vendor/bin/console data:import:locale-store 
vendor/bin/console data:import:default-locale-store
```


***


{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

```bash
composer update spryker/locale
```

2. Add new plugins to dependency providers:

**Zed integration**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new LocaleApplicationPlugin(),
            ...
        ];
    }

    ...
}
```

**Yves integration**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\Locale\Plugin\Application\LocaleApplicationPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    ...

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new LocaleApplicationPlugin(),
            ...
        ];
    }

    ...
}
```

3. Enable additional plugins:

**EventDispatcher Zed integration**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\EventDispatcher\LocaleEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new LocaleEventDispatcherPlugin(),
            ...
        ];
    }
}
```

**EventDispatcher Yves integration**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Yves\Locale\Plugin\EventDispatcher\LocaleEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new LocaleEventDispatcherPlugin(),
            ...
        ];
    }
}
```
