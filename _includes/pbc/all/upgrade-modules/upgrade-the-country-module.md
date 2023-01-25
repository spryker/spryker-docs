This document describes how to upgrade the Country module.

## Upgrading from version 3.* to version 4.0.0

In this new version of the `Country` module, we have added support configuration currency for each store in database.
With the `Country` module version 4 we have added the `spy_country_store` database table to persist stores-countries in ZED.

You can find more details about the changes on the [Country module](https://github.com/spryker/country/releases) release page.

*Estimated migration time: 5 min 99 sec*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Country` module to the new version:

```bash
composer require spryker/country:"^4.0.0" --update-with-dependencies
```

2. Install the `CountryDataImport` module for import data for populate configuration tables in database.

```bash
composer require spryker/country-data-import
```
3. Run `vendor/bin/console transfer:generate` to update the transfer objects.

4. Run `vendor/bin/console propel:migrate` to apply the database changes.

5. Add new plugins to dependency providers:

**Integrate console commands**


```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\CountryDataImport\CountryDataImportConfig; 

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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CountryDataImportConfig::IMPORT_TYPE_COUNTRY_STORE),
            ...        
        ];
    }
```

**DataImport integrations**

`src/Pyz/Zed/DataImport/DataImportDependencyProvider.php`


```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport\CountryStoreDataImportPlugin;

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
            new CountryStoreDataImportPlugin(),
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

use Spryker\Zed\Country\Communication\Plugin\Store\CountryStoreCollectionExpanderPlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostCreatePlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostUpdatePlugin;
use Spryker\Zed\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostCreatePluginInterface>
     */
    protected function getStorePostCreatePlugins(): array
    {
        return [
            ... 
            new CountryStorePostCreatePlugin(),
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
            new CountryStorePostUpdatePlugin(),
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
            new CountryStoreCollectionExpanderPlugin(),
            ...
        ];
    }
}
```

5. Prepare csv files for configuration stores via data import

Example for DE store locales configurations:
`data/import/common/DE/country_store.csv`

```
store_name,country
DE,DE
DE,FR
```

6. Use data import command for import configuration

```bash 
vendor/bin/console  data:import:country-store
```