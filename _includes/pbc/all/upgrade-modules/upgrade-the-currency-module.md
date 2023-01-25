This document describes how to upgrade the Currency module.

## Upgrading from version 3.* to version 4.0.0

In this new version of the `Currency` module, we have added support configuration currency for each store in database.
With the `Currency` module version 4 we have added the `spy_currency_store` database table to persist stores-locales in ZED.
Also added column `fk_currency` into  `spy_store` for save default currency per store.

You can find more details about the changes on the [Currency module](https://github.com/spryker/currency/releases) release page.

*Estimated migration time: 5 min 00 sec*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Currency` module to the new version:

```bash
composer require spryker/currency:"^4.0.0" --update-with-dependencies
```

2. Install the `CurrencyDataImport` module for import data for populate configuration tables in database.

```bash
composer require spryker/currency-data-import
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
use Spryker\Zed\Currency\Communication\Plugin\Application\CurrencyBackendGatewayApplicationPlugin;

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
            new CurrencyBackendGatewayApplicationPlugin(),
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
use Spryker\Zed\CountryDataImport\CountryDataImportConfig;
use Spryker\Zed\CurrencyDataImport\CurrencyDataImportConfig;

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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CurrencyDataImportConfig::IMPORT_TYPE_CURRENCY_STORE),
            ...        
        ];
    }
}
```


**DataImport integrations**

`src/Pyz/Zed/DataImport/DataImportDependencyProvider.php`


```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\CurrencyDataImport\Communication\Plugin\DataImport\CurrencyStoreDataImportPlugin;

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
            new CurrencyStoreDataImportPlugin(),
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

use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStoreCollectionExpanderPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostCreatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreCreateValidationPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreUpdateValidationPlugin;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreCreateValidationPluginInterface>
     */
    protected function getStorePreCreateValidationPlugins(): array
    {
        return [
            ...
            new DefaultCurrencyStorePreCreateValidationPlugin(),
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
            new DefaultCurrencyStorePreUpdateValidationPlugin(),
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
            new CurrencyStorePostCreatePlugin(),
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
            new CurrencyStorePostUpdatePlugin(),
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
            new CurrencyStoreCollectionExpanderPlugin(),
            ...
        ];
    }
}
```


6. Preparing csv files for configure stores via data import

Example for DE store locales configurations:
`data/import/common/DE/currency_store.csv`

```
currency_code,store_name,is_default
EUR,DE,1
CHF,DE,0
```

7. Use data import command for import configuration

```bash 
vendor/bin/console  data:import:currency-store   
```

***

## Upgrading from version 2.* to version 3.*

With the `Currency` module version 3 we have added the `sp_currency` database table to persist currencies in ZED.

Run the following SQL request:

```sql
CREATE SEQUENCE "spy_currency_pk_seq";

                CREATE TABLE "spy_currency"
                (
                    "id_currency" INTEGER NOT NULL,
                    "name" VARCHAR(255),
                    "code" VARCHAR(5),
                    "symbol" VARCHAR(5),
                    PRIMARY KEY ("id_currency")
                );
```

We have also added currency data importers which are provided in our demoshop. Take `\Pyz\Zed\DataImport\Business\Model\Currency\CurrencyWriterStep` and instantiate it in `DataImportBusinessFactory`:

```php
namespace Pyz\Zed\DataImport\Business;

        /**
         * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
         * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
         */
        class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
        {

               /**
                 * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
                 */
                public function getImporter()
                {
                    $dataImporterCollection = $this->createDataImporterCollection();
                    $dataImporterCollection->addDataImporter($this->createCurrencyImporter());

                }

              /**
                * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
                */
               protected function createCurrencyImporter()
               {
                   $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCurrencyDataImporterConfiguration());

                   $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
                   $dataSetStepBroker->addStep(new CurrencyWriterStep());

                   $dataImporter->addDataSetStepBroker($dataSetStepBroker);

                   return $dataImporter;
               }
           }
```

Take `/data/import/currency.csv` from the demoshop and put it into your project import directory. Configure the importer:

```php
namespace Pyz\Zed\DataImport;

        class DataImportConfig extends SprykerDataImportConfig
        {
            const IMPORT_TYPE_CURRENCY = 'currency';

        }


        /**
         * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
         */
        public function getCurrencyDataImporterConfiguration()
        {
            return $this->buildImporterConfiguration('currency.csv', static::IMPORT_TYPE_CURRENCY);
        }
```

Add the console command:

```php
namespace Pyz\Zed\Console;

      /**
       * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
       */
      class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
      {
            /**
              * @param \Spryker\Zed\Kernel\Container $container
              *
              * @return \Symfony\Component\Console\Command\Command[]
              */
             public function getConsoleCommands(Container $container)
             {
                 $commands = [
                   new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . DataImportConfig::IMPORT_TYPE_CURRENCY),
                 ]

             }
      }
```

Now, you should be able to import currencies using `data:import:currency` console command. With the version 3 we have created the currency switcher twig function which renders drop down with currency selection. Add `\Spryker\Yves\Currency\Plugin\CurrencySwitcherServiceProvider` service provider to Yves bootstrap.

```php
namespace Pyz\Yves\Application;

  class YvesBootstrap
  {
      /**
       * @return void
      */
      protected function registerServiceProviders()
      {
           $this->application->register(new CurrencySwitcherServiceProvider());
       }
  }
```

And "include" in twig template like `{% raw %}{{{% endraw %} spyCurrencySwitch() {% raw %}}}{% endraw %}`. You may also need to update your `spryker/kernel` module so you can configure multiple currencies per store. You can set them like here:

```php
$stores['DE'] = [
    'currencyIsoCodes' => ['EUR', 'USD'],
  ];
```
