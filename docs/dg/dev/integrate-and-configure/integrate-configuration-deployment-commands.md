---
title: Integrate the Configuration Management deployment commands
description: Learn how to integrate the configuration export, restore, and environment import console commands in a Spryker project.
last_updated: Oct 12, 2026
template: howto-guide-template

related:
  - title: Install the Configuration Management feature
    link: docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html
  - title: Configuration Management feature
    link: docs/dg/dev/backend-development/configuration-management.html
---

This document describes how to integrate the three console commands that move configuration values in and out of the database:

| COMMAND | PURPOSE |
| --- | --- |
| `configuration:export` | Writes the stored value of the named settings to a file. |
| `configuration:restore` | Saves the values held in a configuration value file into the database. |
| `configuration:import-environment` | Saves listed values declared in environment variables. |

Each command is independent. Integrate only the ones your project needs, then see [Using the commands together](#using-the-commands-together) for the case they were designed for.

## Prerequisites

Install the [Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html) first. All three commands read the settings map that `configuration:sync` generates, and none of them works without it.

Update the required modules:

| NAME | VERSION |
| --- | --- |
| Configuration | ^1.5.0 |

## Register the console commands

Register the commands you intend to use.

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Configuration\Communication\Console\ExportConfigurationConsole;
use Spryker\Zed\Configuration\Communication\Console\ImportEnvironmentConfigurationConsole;
use Spryker\Zed\Configuration\Communication\Console\RestoreConfigurationConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ...
            new ExportConfigurationConsole(),
            new ImportEnvironmentConfigurationConsole(),
            new RestoreConfigurationConsole(),
        ];

        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}

Run `console list configuration` and verify that the commands you registered are listed.

{% endinfo_block %}

## configuration:export

```bash
console configuration:export <setting key> [<setting key> ...]
```

Writes the stored value of each named setting to a file, so that the values survive an operation that empties the database.

The command reports each named key it does not export:

- A setting declared `secret: true` in the schema is skipped. A secret is never written to the export file.
- A setting with no stored value is skipped. A value exists only after it has been saved.

### Configure the export file path

`ConfigurationConfig::getExportFile()` throws an exception until you redefine it at the project level. The command writes to this path and does not guess one.

**src/Pyz/Shared/Configuration/ConfigurationConfig.php**

```php
<?php

namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    /**
     * @return string
     */
    public function getExportFile(): string
    {
        return APPLICATION_ROOT_DIR . '/data/export/configuration-values.json';
    }
}
```

Make sure the directory reaches the container:

**.gitignore**

```diff
 /data/*
 !/data/import/
+!/data/export/
```

{% info_block warningBox "Verification" %}

Save a value in **Back Office&nbsp;&rarr;&nbsp;Configuration**, run the command for that setting key, and verify that the file is created and contains the value.

{% endinfo_block %}

## configuration:restore

```bash
console configuration:restore <setting key> [<setting key> ...]
```

Reads the configuration value file at the configured path and saves the values it holds into the database.

The command skips a named key when the schema no longer defines it, or when the schema declares it secret. Both cases are reported.

When every value is restored successfully, the command removes the file. If any value fails, the file is kept so that you can fix the cause and run the command again.

### Configure the file path

`ConfigurationConfig::getExportFile()` throws an exception until you redefine it at the project level. The command reads from this path and does not guess one.

**src/Pyz/Shared/Configuration/ConfigurationConfig.php**

```php
<?php

namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    /**
     * @return string
     */
    public function getExportFile(): string
    {
        return APPLICATION_ROOT_DIR . '/data/export/configuration-values.json';
    }
}
```

{% info_block warningBox "Verification" %}

Place a configuration value file at the configured path, run the command for a setting key held in it, and verify that the value appears in **Back Office&nbsp;&rarr;&nbsp;Configuration** and that the file is removed.

{% endinfo_block %}

## configuration:import-environment

```bash
console configuration:import-environment <variable name> [<variable name> ...]
```

Saves the value of each named environment variable as a configuration value. Settings declared `secret: true` in the schema are encrypted on save.

The command takes variable names, never values. Each value is read from the environment inside the command, so no secret reaches the recipe, the process list, or the deployment log. A variable that is not set is reported and skipped.

### Name the environment variables

Name each variable after the setting key, prefixed with `configuration:` and the scope. The scope is always named, including `global`:

| PATTERN | SCOPE |
| --- | --- |
| `configuration:global:<setting key>` | Global scope |
| `configuration:<scope>:<identifier>:<setting key>` | Scoped value, such as a store |

For example, a global Google Analytics measurement ID uses this variable name:

```text
configuration:global:integrations:google_analytics:tracking:measurement_id
```

{% info_block warningBox "Do not commit values" %}

Set the values in the environment configuration of your hosting provider, not in a deploy file that is committed to the repository.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Set a variable for one setting, run the command with that variable name, and verify that the value appears in **Back Office&nbsp;&rarr;&nbsp;Configuration**.

{% endinfo_block %}

## Using the commands together

The commands were designed for a destructive deployment, which drops the tables and removes every value a Back Office user has saved. Run `configuration:export` before anything drops the tables, and the other two after `configuration:sync`, which regenerates the settings map that both validate against.

**config/install/destructive.yml**

```yaml
sections:
    configuration-export:
        configuration-export:
            command: >-
                vendor/bin/console configuration:export
                integrations:google_analytics:tracking:measurement_id
                -vvv --no-ansi

    # ... sections that drop and rebuild the database ...

    configuration:
        configuration-sync:
            command: 'vendor/bin/console configuration:sync -vvv --no-ansi'

        configuration-import-environment:
            command: >-
                vendor/bin/console configuration:import-environment
                configuration:global:integrations:google_analytics:connection:service_account_credentials_json
                -vvv --no-ansi

        configuration-restore:
            command: >-
                vendor/bin/console configuration:restore
                integrations:google_analytics:tracking:measurement_id
                -vvv --no-ansi
```

Both `configuration:restore` and `configuration:import-environment` save values, so the one that runs last wins. Decide which source is authoritative for your project:

| ORDER | RESULT |
| --- | --- |
| Import before restore | A value a user saved in the Back Office survives the deployment, even when the environment also declares one. |
| Restore before import | The environment is authoritative and overwrites what a user saved. |

{% info_block warningBox "Shared filesystem" %}

Every section of one `vendor/bin/install` run must see the same filesystem. If your deployment runs each section in a separate container without a shared volume, `configuration:restore` cannot find the file `configuration:export` wrote.

{% endinfo_block %}

{% info_block infoBox "Exit codes" %}

All three commands exit successfully even when they report an error, so that a configuration problem never fails a deployment. Read the command output to confirm the result.

{% endinfo_block %}

## Troubleshooting

| SYMPTOM | CAUSE | SOLUTION |
| --- | --- | --- |
| `Nothing stored for key "..."` during export | No value is stored for that setting | Expected on a first deployment. A value exists only after it has been saved. `configuration:sync` does not create values. |
| `Could not import secret setting "...": TypeError` | The encryption key is not configured | Set `SPRYKER_CONFIGURATION_ENCRYPTION_KEY` and `SPRYKER_CONFIGURATION_ENCRYPTION_INIT_VECTOR`. Details are suppressed for secret settings, so the message does not name the cause. |
| `ConfigurationConfig::getExportFile() has to be redefined` | The project-level path is missing | Redefine `getExportFile()` in `src/Pyz/Shared/Configuration/ConfigurationConfig.php`. |
| `The configuration schema holds no settings` | The settings map is missing | Run `configuration:sync` before the restore and the environment import. |
| `No export at "...", nothing to restore.` | No file exists at the configured path | Verify that `getExportFile()` returns the path where the file was written, and that the file is readable by the current user. |
| `Skipping "...": the name does not resolve to a setting key` | The variable name is malformed | The scope is always named. Use `configuration:global:<setting key>` or `configuration:<scope>:<identifier>:<setting key>`. |
