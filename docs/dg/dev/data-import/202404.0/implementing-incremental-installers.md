---
title: Implementing incremental installers
description: Use the guide to install and run IncrementalInstaller module to import or publish data during normal deployment
last_updated: Aug 30, 2024
template: howto-guide-template
---

This document describes how to install and run `IncrementalInstaller` module to import or publish data during normal deployment.
The IncrementalInstaller module is designed to execute installation scripts once per environment and store plugin information in the database. 
It operates similarly to a database migration system but is also suitable for data manipulation tasks. 
It integrates seamlessly with the common Spryker plugin stack.

## Install IncrementalInstaller module

Require the package
```bash
composer require spryker/incremental-installer
```

Run the database migration and generate transfers:
```bash
console propel:install
console transfer:generate
```

Add console command to src/Pyz/Zed/Console/ConsoleDependencyProvider.php
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

Add command execution at the end of the relevant deployment configuration files (e.g., config/install/*.yml), including those for destructive, normal, local, and CI environments.

```yml
    data-import:
        glossary:
            command: 'vendor/bin/console incremental-installer:execute -vvv --no-ansi'
            stores: true
```
