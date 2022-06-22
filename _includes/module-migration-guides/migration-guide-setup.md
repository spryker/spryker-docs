---
title: Migration guide - Setup
description: Use the guide to learn how to update the Setup module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-setup
originalArticleId: 8504425c-2afa-47cc-b6ff-fe5013f95de9
redirect_from:
  - /2021080/docs/mg-setup
  - /2021080/docs/en/mg-setup
  - /docs/mg-setup
  - /docs/en/mg-setup
  - /v1/docs/mg-setup
  - /v1/docs/en/mg-setup
  - /v2/docs/mg-setup
  - /v2/docs/en/mg-setup
  - /v3/docs/mg-setup
  - /v3/docs/en/mg-setup
  - /v4/docs/mg-setup
  - /v4/docs/en/mg-setup
  - /v5/docs/mg-setup
  - /v5/docs/en/mg-setup
  - /v6/docs/mg-setup
  - /v6/docs/en/mg-setup
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-setup.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-setup.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-setup.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-setup.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-setup.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-setup.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-setup.html
---

## Upgrading from Version 3.* to Version 4.*

With this update the behavior of the `setup:install` command slightly changes. Instead of removing directories where generated files are stored, these directories will be kept and emptied.

The `setup:install` command utilizes two new commands for cleaning up generated files: cache:empty-all and `setup:empty-generated-directory`. These two commands replace `cache:delete-all` and `setup:remove-generated-directory` which are now marked as deprecated.

The new commands need to be registered in projects in order to enable `setup:install` to run them. `ConsoleDependencyProvider::getConsoleCommands()` needs to return instances of `\Spryker\Zed\Setup\Communication\Console\EmptyGeneratedDirectoryConsole` and `\Spryker\Zed\Cache\Communication\Console\EmptyAllCachesConsole.`

{% info_block infoBox "Deprecation Notice" %}

As of this release the following commands have been deprecated and need to be removed `\Spryker\Zed\Setup\Communication\Console\RemoveGeneratedDirectoryConsole`<br> `\Spryker\Zed\Cache\Communication\Console\DeleteAllCachesConsole`

{% endinfo_block %}

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Cache\Communication\Console\EmptyAllCachesConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Setup\Communication\Console\EmptyGeneratedDirectoryConsole;

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
            // ...
            new EmptyAllCachesConsole(),
            new EmptyGeneratedDirectoryConsole(),
            // ...
        ];

        return $commands;
    }
}
```
<!--See also:

* Checkout other Console commands
-->
