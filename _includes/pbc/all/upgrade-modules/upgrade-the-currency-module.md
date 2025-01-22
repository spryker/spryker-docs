This document describes how to upgrade the Currency module.

## Prerequisites

[Upgrade to PHP 8.3](/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-83.html)

## Upgrading from version 3.* to version 4.0.0

In this version of the `Country` module, we have enabled the configuration of currencies per store in the database. The `Country` module version 4 introduces the `spy_country_store` database table to persist stores-countries in Zed. Also, we've added the `fk_currency`  column to the `spy_store` table for saving default currencies per store. You can find more details about the changes on the [Currency module release page](https://github.com/spryker/currency/releases).

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Currency` module to the new version:

```bash
composer require spryker/currency:"^4.0.0" --update-with-dependencies
```

2. Update transfer objects:

```shell
vendor/bin/console transfer:generate
```

3. Apply database changes:

```shell
vendor/bin/console propel:install
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
