---
title: Search Initialization Improvement
originalLink: https://documentation.spryker.com/v5/docs/search-initialization-improvement
redirect_from:
  - /v5/docs/search-initialization-improvement
  - /v5/docs/en/search-initialization-improvement
---

## General Information

Previously, the `vendor/bin/console setup:search` command invoked the `build` and `data initialization` processes. Running both processes simultaneously in a read-only file system results into the`build` process failing as the codebase is already baked into images. That's why the command has has been split into two commands for each of the processes which allows running them separately. You can find the commands below:

**console search:create-indexes**
>Creates indexes in the search service (Elastic Search).

**console search:setup:index-map**
>Generates IndexMap PHP files that are used by the whole application.

## Integration
### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
```bash
composer require spryker/search:"^8.9.0"
```

{% info_block warningBox "Verification" %}


Make sure that the following module has been installed:

| Module | Expected Directory |
| --- | --- |
| `Seach` | `vendor/spryker/search` |

{% endinfo_block %}

### 2) Set Up Behavior

Enable the console commands provided by the `Search`module:

Pyz/Zed/Console/ConsoleDependencyProvider
    
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
