---
title: Integrate Propel clean command
description: Learn how to enable and integrate the Propel clean command into your Spryker based project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/propel-clean-command
originalArticleId: 6fd10cbd-243f-488a-8ad8-43b7f973e561
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-propel-clean-command.html
  - /docs/scos/dev/technical-enhancements/propel-clean-command.html
---

The `propel:database:drop` command is used to clean a database of all the tables, indexes, counters and so on. The command invokes the `drop` process to delete and re-create the database from scratch.

When working with a remote database, you might have insufficient permissions to invoke the `drop` process. To cover the case, the `vendor/bin/console propel:tables:drop` command was introduced. The command cleans the database without dropping it.

To integrate the command, follow the steps.


## Prerequisites

Install the following features:

| NAME | VERSION | REQUIRED SUB-FEATURE |
| --- | --- | --- |
| Spryker Core | {{site.version}} | [Feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/propel:"^3.10.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
|  Propel |  vendor/spryker/propel |

{% endinfo_block %}

## 2) Set up behavior

1. Clean up Codeception configuration by deleting `SetupHelper` from all Codeception configuration files:

```shell
- \SprykerTest\Shared\Application\Helper\SetupHelper
```

{% info_block infoBox %}

Use `SprykerTest\Shared\Testify\Helper\DataCleanupHelper` instead to clean up data after each test that can intersect with other tests.

{% endinfo_block %}

2. Enable the `DatabaseDropTablesConsole` console command in `Pyz\Zed\Console\ConsoleDependencyProvider`:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
    <?php
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
            new DatabaseDropTablesConsole(),
            ...
```

{% info_block infoBox %}

* Spryker\Zed\Propel\Communication\Console\DatabaseExportConsole is deprecated.
* Spryker\Zed\Propel\Communication\Console\DatabaseImportConsole is deprecated.

{% endinfo_block %}

3. Run `vendor/bin/console` and make sure the `propel:tables:drop` command is in the list.
