---
title: Upgrade search initialization
description: Search initialization upgrade introduces two separate commands for the build and data initialization processes.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-initialization-improvement
originalArticleId: 2b3938fa-d016-429f-b317-2951e909eca4
redirect_from:
  - /docs/scos/dev/technical-enhancements/search-initialization-improvement.html
---

Previously, the `vendor/bin/console setup:search` command invoked the `build` and `data initialization` processes. Running both processes simultaneously in a read-only file system results into the `build` process failing as the codebase is already baked into images. That's why the command has has been split into two commands for each of the processes which allows running them separately. You can find the commands below:

**console search:create-indexes**

>Creates indexes in the search service (Elastic Search).

**console search:setup:index-map**

>Generates IndexMap PHP files that are used by the whole application.

To upgrade search initialization, see the following sections.

## 1. Install the required modules using Composer

Install the required modules using Composer:

```bash
composer require spryker/search:"^8.9.0"
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Search | vendor/spryker/search |

{% endinfo_block %}

## 2. Set up behavior

Enable the console commands provided by the `Search` module:

**Pyz/Zed/Console/ConsoleDependencyProvider**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Search\Communication\Console\SearchSetupIndicesConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;

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
    protected function getConsoleCommands(Container $container)
    {
       $commands = [
          ...
          new SearchSetupIndicesConsole(),
          ...
        ];

       return $commands;
    }
}
```
