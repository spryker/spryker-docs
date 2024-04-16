

This document describes how to install the Catalog + Order Management feature connector.

## Install feature core

Follow the steps below to install the Catalog + Order Management feature connector's core.

### 1) Install the required modules

```shell
composer require spryker/sales-product-connector:"^1.6.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                      |
| ---------------------------- | ------------------------------------------- |
| Product                       | vendor/spryker/product                       |
| Catalog                       | vendor/spryker/catalog                       |
| Product Page Search           | vendor/spryker/product-page-search           |
| Product Page Search Extension | vendor/spryker/product-page-search-extension |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```shell
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER           | TYPE     | EVENT   | PATH                                            |
| ----------------- | ------- | ------ | --------------------------------------------- |
| popularity         | property | Created | src/Generated/Shared/Transfer/ProductPayload    |
| idProductAbstract  | property | Created |                                                 |
| popularity         | property | Created | src/Generated/Shared/Transfer/ProductPageSearch |
| name               | property | Created | src/Generated/Shared/Transfer/SortConfig        |
| parameterName      | property | Created |                                                 |
| fieldName          | property | Created |                                                 |
| isDescending       | property | Created |                                                 |
| unmappedType       | property | Created |                                                 |
| productAbstractIds | property | Created | src/Generated/Shared/Transfer/ProductPageLoad   |
| payloadTransfers   | property | Created |                                                 |


{% endinfo_block %}

## 3) Set up behavior

Register the following plugins:

| PLUGIN    | SPECIFICATION    | PREREQUISITES | NAMESPACE     |
| --------------------- | -------------------- | ------------ | ---------------------------- |
| ProductPopularityDataExpanderPlugin       | Expands the provided `ProductAbstractPageSearch` transfer object's data with popularity. |               | Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch |
| ProductPopularityMapExpanderPlugin        | Adds product popularity related data to product abstract search data. |               | Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch |
| ProductPopularityPageDataLoaderPlugin     | Expands the `ProductPageLoadTransfer` object with popularity data. |               | Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch |
| ProductPageProductAbstractRefreshConsole  | Executes refreshing of a product abstract.                   |               | Spryker\Zed\ProductPageSearch\Communication\Console\ProductPageProductAbstractRefreshConsole |
| PopularitySortConfigTransferBuilderPlugin | Builds a popularity sort configuration transfer for a catalog page. |               | Spryker\Client\SalesProductConnector\Plugin\PopularitySortConfigTransferBuilderPlugin |


<details open><summary markdown='span'>/src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Shared\SalesProductConnector\SalesProductConnectorConfig;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch\ProductPopularityDataExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch\ProductPopularityMapExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch\ProductPopularityPageDataLoaderPlugin;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]|\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataExpanderPluginInterface[]
     */
    protected function getDataExpanderPlugins()
    {
      $dataExpanderPlugins = [];      
      $dataExpanderPlugins[SalesProductConnectorConfig::PLUGIN_PRODUCT_POPULARITY_DATA] = new ProductPopularityDataExpanderPlugin();

      return $dataExpanderPlugins;
    }

        /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
     */
    protected function getDataLoaderPlugins()
    {
        return [
            new ProductPopularityPageDataLoaderPlugin(),
        ];
    }

        /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new ProductPopularityMapExpanderPlugin(),
        ];
    }
}
```
</details>

**/src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\ProductPageSearch\Communication\Console\ProductPageProductAbstractRefreshConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            new ProductPageProductAbstractRefreshConsole(),
        ];

        return $commands;
    }
}
```


**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php  
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\SalesProductConnector\Plugin\PopularitySortConfigTransferBuilderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return \Spryker\Client\Catalog\Dependency\Plugin\SortConfigTransferBuilderPluginInterface[]
     */
    protected function getSortConfigTransferBuilderPlugins()
    {
        return [
            new PopularitySortConfigTransferBuilderPlugin(),
        ];
    }
}
```

## 4) Add translations

1. Append the glossary for the feature:

**data/import/common/common/glossary.csv**

```csv
key,translation,locale
catalog.sort.popularity,Sort by popularity,en_US
catalog.sort.popularity,Sortieren nach Beliebtheit,de_DE
```

2. Import data:

```shell
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}

## 5) Set up a cron job

1. Enable the `page-product-abstract-refresh` console command in the cron-job list:

**config/Zed/cronjobs/jenkins.php**

```php
$jobs[] = [
    'name' => 'page-product-abstract-refresh',
    'command' => '$PHP_BIN vendor/bin/console product-page-search:product-abstract-refresh',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'stores' => $allStores,
];
```

2. Optional: To apply the updated cron job configuration without redeploying, run the following command in CLI:

```shell
vendor/bin/console scheduler:setup
```

{% info_block warningBox "Verification" %}

Make sure that you can sort products by popularity:
1. Place several orders.
2. Go to a Catalog page.
3. Try to sort products by popularity.

{% endinfo_block %}
