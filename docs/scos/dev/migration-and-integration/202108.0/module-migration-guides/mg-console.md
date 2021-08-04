---
title: Migration Guide - Console
originalLink: https://documentation.spryker.com/2021080/docs/mg-console
redirect_from:
  - /2021080/docs/mg-console
  - /2021080/docs/en/mg-console
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](https://documentation.spryker.com/docs/search-migration-concept). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](https://documentation.spryker.com/docs/mg-search#upgrading-from-version-8-9---to-version-8-10--). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Remove the deprecated search related console command classes from `Pyz\Zed\Console\ConsoleDependencyProvider`:
```bash
Spryker\Zed\Search\Communication\Console\GenerateIndexMapConsole;
Spryker\Zed\Search\Communication\Console\SearchCloseIndexConsole;
Spryker\Zed\Search\Communication\Console\SearchCopyIndexConsole;
Spryker\Zed\Search\Communication\Console\SearchCreateSnapshotConsole;
Spryker\Zed\Search\Communication\Console\SearchDeleteIndexConsole;
Spryker\Zed\Search\Communication\Console\SearchDeleteSnapshotConsole;
Spryker\Zed\Search\Communication\Console\SearchOpenIndexConsole;
Spryker\Zed\Search\Communication\Console\SearchRegisterSnapshotRepositoryConsole;
Spryker\Zed\Search\Communication\Console\SearchRestoreSnapshotConsole;
Spryker\Zed\Search\Communication\Console\SearchSetupIndexesConsole;
```
2. Enable the new commands:

**Pyz\Zed\Console**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
...
use Spryker\Zed\Search\Communication\Console\GenerateSourceMapConsole;
use Spryker\Zed\Search\Communication\Console\SearchSetupSourcesConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchCloseIndexConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchCopyIndexConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchDeleteIndexConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchOpenIndexConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchSnapshotCreateConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchSnapshotDeleteConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchSnapshotRegisterRepositoryConsole;
use Spryker\Zed\SearchElasticsearch\Communication\Console\ElasticsearchSnapshotRestoreConsole;

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
            ...
            new GenerateSourceMapConsole(),
            new SearchSetupSourcesConsole(),
            new ElasticsearchCloseIndexConsole(),
            new ElasticsearchCopyIndexConsole(),
            new ElasticsearchDeleteIndexConsole(),
            new ElasticsearchOpenIndexConsole(),
            new ElasticsearchSnapshotRegisterRepositoryConsole(),
            new ElasticsearchSnapshotDeleteConsole(),
            new ElasticsearchSnapshotCreateConsole(),
            new ElasticsearchSnapshotRestoreConsole(),
            ...
        ];

        return $commands;
    }
}
```
## Upgrading from Version 3.* to Version 4.*

Console version 4 has been prepared for a standalone usage. Now, you are able to use `Console` module even without a DB configuration.
Find or create `ConsoleDependencyProvider` in your project. 

{% info_block warningBox %}
Make sure it extends `\Spryker\Zed\Console\ConsoleDependencyProvider`.
{% endinfo_block %}

Find `getServiceProviders method` and add `\Spryker\Zed\Propel\Communication\Plugin\ServiceProvider\PropelServiceProvider` to the service stack.
        
The method could look like this:

```php
/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return \Silex\ServiceProviderInterface[]
*/
public function getServiceProviders(Container $container)
{
    $serviceProviders = parent::getServiceProviders($container);
    $serviceProviders[] = new PropelServiceProvider();

    return $serviceProviders;
}
```

<!-- Last review date: Nov 23, 2017 by Denis Turkov -->
