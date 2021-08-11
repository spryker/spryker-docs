---
title: Migration Guide - Console
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-console
redirect_from:
  - /v4/docs/migration-guide-console
  - /v4/docs/en/migration-guide-console
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide-search.html). 

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
