---
title: Implement incremental installers
description: Import and publish data during normal deployment
last_updated: Aug 30, 2024
template: howto-guide-template
---

This document describes how to install and run the IncrementalInstaller module to import or publish data during normal deployment. The IncrementalInstaller module executes installation scripts once per environment and stores plugin information in the database. It works similarly to a database migration system but is also suitable for data manipulation tasks.

## Install the IncrementalInstaller module

1. Require the package:
```bash
composer require spryker/incremental-installer
```

2. Run the database migration and generate transfers:
```bash
console propel:install
console transfer:generate
```

3. Add a console command to `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`:
```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\IncrementalInstaller\Communication\Console\IncrementalInstallersConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        // ...
        $commands = [
            // ...
            new IncrementalInstallersConsole(),
        ];
    }
}
```

## Implement IncrementalInstallerPlugin

```php
<?php

namespace Pyz\Zed\FooBarModule\Communication\Plugin\IncrementalInstaller;

use Spryker\Zed\IncrementalInstallerExtension\Dependency\Plugin\IncrementalInstallerPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class FooBarIncrementalInstallerPlugin extends AbstractPlugin implements IncrementalInstallerPluginInterface
{
    public function isApplicable(): bool
    {
        // todo: define whether the plugin is applicable to the current environment
    }

    public function execute(): void;
    {
        // todo: implement execution
    }
}
```

```php
<?php

namespace Pyz\Zed\IncrementalInstaller;

use Pyz\Zed\FooBarModule\Communication\Plugin\IncrementalInstaller\FooBarIncrementalInstallerPlugin;
use Spryker\Zed\IncrementalMigration\IncrementalInstallerDependencyProvider as SprykerIncrementalInstallerDependencyProvider;

class IncrementalInstallerDependencyProvider extends SprykerIncrementalInstallerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\IncrementalInstallerExtension\Dependency\Plugin\IncrementalInstallerPluginInterface>
     */
    protected function getIncrementalInstallerPlugins(): array
    {
        return [
            new FooBarIncrementalInstallerPlugin(),
        ];
    }
}

```

## Run incremental installer

```bash
console incremental-installer:execute
```

## Enable incremental installer for normal deployment

Add the incremental installer command at the end of the relevant deployment configuration files, like `config/install/staging.yml`, including those for destructive, normal, local, and CI environments.

```yml
    data-import:
        incremental-installer:
            command: 'vendor/bin/console incremental-installer:execute -vvv --no-ansi'
            stores: true
```
