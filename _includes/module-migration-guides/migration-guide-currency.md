---
title: Migration guide - Currency
description: Use the guide to update versions to the newer ones of the Currency module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-currency
originalArticleId: 9f4fb3f2-3ab9-42fd-9fd0-dda4131e8444
redirect_from:
  - /2021080/docs/mg-currency
  - /2021080/docs/en/mg-currency
  - /docs/mg-currency
  - /docs/en/mg-currency
  - /v1/docs/mg-currency
  - /v1/docs/en/mg-currency
  - /v2/docs/mg-currency
  - /v2/docs/en/mg-currency
  - /v3/docs/mg-currency
  - /v3/docs/en/mg-currency
  - /v4/docs/mg-currency
  - /v4/docs/en/mg-currency
  - /v5/docs/mg-currency
  - /v5/docs/en/mg-currency
  - /v6/docs/mg-currency
  - /v6/docs/en/mg-currency
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-currency.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-currency.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-currency.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-currency.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-currency.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-currency.html
---

## Upgrading from Version 2.* to Version 3.*

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

And "include" in twig template like `{% raw %}{{{% endraw %} spyCurrencySwitch() {% raw %}}}{% endraw %}`. You may also neet to update your `spryker/kernel` module so you can configure multiple currencies per store. You can set them like here:

```php
$stores['DE'] = [
    'currencyIsoCodes' => ['EUR', 'USD'],
  ];
```
<!-- Last review date: Sep 21, 2017 by Aurimas Ličkus -->
