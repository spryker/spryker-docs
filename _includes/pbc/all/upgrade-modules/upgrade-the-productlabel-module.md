

## Upgrading from Version 2.* to Version 3.*

Version 3.* of the `ProductLabel` module adds the possibility to assign stores to the product labels.

*Estimated migration time: 30 minutes.*

### Preparation for the migration

To migrate to the new module version, execute the following preparation steps:

1. Update the `ProductLabelDataImport` module:

```bash
composer update spryker/product-label-data-import --update-with-dependencies
```

2. Update the database schema and the generated classes:

```bash
console propel:install
console transfer:generate
```

3. Register data import plugins and add them to the full import list:

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductLabelDataImport\ProductLabelDataImportConfig;
use Spryker\Zed\ProductLabelDataImport\Communication\Plugin\ProductLabelStoreDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerSynchronizationDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
  /**
     * @return string[]
     */
    public function getFullImportTypes(): array
    {
      return [
          ProductLabelDataImportConfig::IMPORT_TYPE_PRODUCT_LABEL_STORE,
      ];
    }
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductLabelStoreDataImportPlugin(),
        ];
    }
}
```

4. Register the data import console commands:

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductLabelDataImport\ProductLabelDataImportConfig;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
     protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
     rerurn [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ProductLabelDataImportConfig::IMPORT_TYPE_PRODUCT_LABEL_STORE),
      ];
    }
}
```

5. Prepare data for the product label and store relationships by the given path `data/import/product_label_store.csv`:

```txt
name,store_name
NEW,AT
NEW,DE
NEW,US
```

6. Import the product label and store relationships:

```bash
console data:import:product-label-store
```

### Upgrading to the new module version

To upgrade to the new version of the `ProductLabel` module, do the following:

1. Upgrade the `ProductLabel` module to the new version:

```bash
composer require spryker/product-label:"^3.0.0" --update-with-dependencies
```

2. Add an event behavior to `spy_product_label_store`:

```xml
<table name="spy_product_label_store">
      <behavior name="event">
          <parameter name="spy_product_label_store_all" column="*"/>
      </behavior>
</table>
```



## Upgrading from version 1.* to version 2.*

The following list describes the Backward Compatibility breaking changes in this version and how to upgrade.

### Product label rendering

We've changed `spyProductLabels` twig function to work based on a list of product label IDs. It's original behavior was moved to a new twig function, called `spyProductAbstractLabels`. The idea behind this change is to directly get all the product label IDs of abstract products on catalog pages from Search documents instead of reading all these information from Storage. This is a better approach performance wise and also gives us the ability to be able to search and filter for labels in Elasticsearch.
If you just want to quickly upgrade and keep the previous behavior, you only need to find and replace all the usages of `spyProductLabels` function to `spyProductAbstractLabels` in all of your twig templates.
However, we suggest you to invest some time and
However, to get the full benefits of this version upgrade you first need to export product label IDs to your Search documents. To do this, you need to modify your product search collector, by adding a new `search-result-data` entry (for example, `id_product_labels`) for products. The data of this field can be easily read with `ProductLabelFacade::findLabelIdsByIdProductAbstract()` method.
Once you have the product label IDs in search documents, you can use the `spyProductLabels` twig method in your templates to pass the list of label IDs and display the available labels of a product.

### Database changes

We've also added a new `is_dynamic` field to `spy_product_label` database table to prepare for the new dynamic labels feature coming in the following minor releases. In the 2.0 release the dynamic labels feature is not yet implemented, it will be provided by one of the following minor versions.

To start database migration run the following commands:

- `vendor/bin/console propel:diff`, manual review is necessary for the generated migration file.
- `vendor/bin/console` propel:migrate
- `vendor/bin/console propel:model:build`
