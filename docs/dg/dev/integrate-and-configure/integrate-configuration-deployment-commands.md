---
title: Integrate the Configuration Management deployment commands
description: Learn how to integrate the configuration export, restore, and environment import console commands in a Spryker project.
last_updated: Oct 19, 2026
template: howto-guide-template

related:
  - title: Integrate the Configuration Management feature
    link: docs/dg/dev/integrate-and-configure/integrate-configuration-feature.html
  - title: Configuration Management feature
    link: docs/dg/dev/backend-development/configuration-management.html
---

This document explains how to integrate three console commands that keep configuration values across deployments that reset the database.

| Command | Use it to |
| --- | --- |
| `configuration:export` | Save the values that Back Office users entered to a file before the deployment drops the database tables. |
| `configuration:restore` | Write exported configuration values to the database after the database is rebuilt. |
| `configuration:import-environment` | Write values from environment variables to the database on deployment, including values that must not be stored in a file or in the repository, such as credentials. |

Each command is independent. Integrate only the ones your project needs, then see [Use the commands together](#use-the-commands-together) for the case they were designed for.

## Prerequisites

Install the [Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-configuration-feature.html).

The commands require the following package version:

| Package | Version |
| --- | --- |
| spryker/configuration | ^1.6.0 |

```bash
composer require spryker/configuration:"^1.6.0" --update-with-dependencies
```

All three commands read the settings map that `configuration:sync` generates. Run `configuration:sync` before running any of them.

## Register the console commands

Register each command you want to use in `ConsoleDependencyProvider`.

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

Run `vendor/bin/console list configuration` and make sure the registered commands are listed in the output.

{% endinfo_block %}

## Export configuration values: configuration:export

```bash
vendor/bin/console configuration:export <setting key> [<setting key> ...]
```

A setting key identifies a setting in the configuration schema. It consists of the feature, tab, group, and setting keys from the schema YAML file, separated by colons: `<feature>:<tab>:<group>:<setting>`. For example, `integrations:google_analytics:tracking:measurement_id`.

The command writes the stored values of the specified settings to the export file. It exports a value for every scope in which the setting has one.

The command skips the following settings and reports each of them:

- **Secret settings:** Settings declared with `secret: true` in the schema are never written to the export file. To restore them after a deployment, use `configuration:import-environment`.
- **Settings without a stored value:** Settings that have no value in the database, for example, because no Back Office user has saved them yet.

### Configure the export file path

Both `configuration:export` and `configuration:restore` use the path that `ConfigurationConfig::getExportFile()` returns. By default, this is `data/export/configuration-values.json` in the application root directory, for example, `/data/data/export/configuration-values.json` in the Docker SDK containers.

The default works when both commands run on the same filesystem, as in a local Docker SDK environment and in Spryker Cloud. If your deployment runs `configuration:export` and `configuration:restore` on filesystems that don't share this directory, for example, in separate containers, redefine the path on the project level to a location that both commands can access:

**src/Pyz/Shared/Configuration/ConfigurationConfig.php**

```php
<?php

namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    public function getExportFile(): string
    {
        return '/mnt/shared/configuration-values.json';
    }
}
```

The path refers to the filesystem of the container that runs the command, both locally and in production; see [Use the commands together](#use-the-commands-together).

If the directory does not exist, the command creates it. The directory is created with `0700` permissions and the file with `0600` permissions, so only the user that runs the command can read the file.

### Export file format

The export file is a JSON file with the following structure:

```json
{
    "values": [
        {
            "setting_key": "integrations:google_analytics:tracking:measurement_id",
            "scope": "global",
            "scope_identifier": "",
            "value": "G-XXXXXXXXXX"
        }
    ]
}
```

| Field | Description |
| --- | --- |
| `setting_key` | The setting key. |
| `scope` | The scope of the value, such as `global` or `store`. |
| `scope_identifier` | The identifier within the scope, such as a store name. Empty for the `global` scope. |
| `value` | The stored value. |

{% info_block warningBox "Verification" %}

Save a value in **Back Office&nbsp;&rarr;&nbsp;Configuration**, run the command for that setting key, and make sure the file is created at the configured path and contains the value.

{% endinfo_block %}

## Restore configuration values: configuration:restore

```bash
vendor/bin/console configuration:restore <setting key> [<setting key> ...]
```

Reads the export file from the path configured in [Configure the export file path](#configure-the-export-file-path) and saves the values of the specified settings to the database. Values of other settings in the file are left unchanged.

The command skips a setting and reports it if the schema no longer defines the setting or declares it as secret.

The command deletes the export file only if all values are restored successfully. If any value fails to restore, the command keeps the file, so you can fix the error and run the command again.

{% info_block warningBox "Verification" %}

Place an export file at the configured path, run the command for a setting key it holds, and make sure the values are restored in **Back Office&nbsp;&rarr;&nbsp;Configuration** and the file is removed. For the file structure, see [Export file format](#export-file-format).

{% endinfo_block %}

## Import values from environment variables: configuration:import-environment

```bash
vendor/bin/console configuration:import-environment <setting key>=<VARIABLE> [<setting key>=<VARIABLE> ...] [--scope=<scope> --scope-identifier=<identifier>]
```

Saves the value of each mapped environment variable as the value of the setting. Use this command for values that must not be written to the export file or committed to the repository, such as credentials, and for values that differ per environment. It also saves you from setting the same values in the Back Office after every deployment, for example, on demo or testing environments: set an environment variable once, and the command imports its value on each deployment. Settings declared with `secret: true` in the schema are encrypted when saved.

Each argument maps a setting key to the name of the environment variable that holds its value. Pass the variable name, not the value. The command reads each value from the environment, so secret values don't appear in the command arguments or the deployment recipe.

For example, the following command imports the Google Analytics measurement ID and service account credentials in the global scope:

```bash
vendor/bin/console configuration:import-environment \
    integrations:google_analytics:tracking:measurement_id=GA_MEASUREMENT_ID \
    integrations:google_analytics:connection:service_account_credentials_json=GA_SERVICE_ACCOUNT_JSON
```

You choose the variable names. A variable name can contain only letters, digits, and underscores, and must not start with a digit.

### Import values for a scope

All mappings of one call are saved in the same scope. By default, this is the `global` scope. To save values in another scope, pass the scope and its identifier, for example, a store name:

```bash
vendor/bin/console configuration:import-environment --scope=store --scope-identifier=DE \
    integrations:google_analytics:tracking:measurement_id=GA_MEASUREMENT_ID_DE
```

The `global` scope doesn't take an identifier; every other scope requires one. To import values for several stores, run the command once per store, with a variable per store.

If an environment variable is not set or is empty, the command skips the setting and reports it. This way, you can use the same recipe in environments that don't define every variable, for example, in an environment without the `AT` store.

{% info_block warningBox "Do not commit values" %}

Set the values in the environment configuration of your hosting provider, not in a deploy file that is committed to the repository.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Set a variable for one setting, run the command with a mapping for that setting, and make sure the value is displayed in **Back Office&nbsp;&rarr;&nbsp;Configuration**.

{% endinfo_block %}

## Use the commands together

These commands support deployments that drop the database tables and so remove the configuration values saved by Back Office users.

Run `configuration:export` before the deployment drops the tables. After the database is rebuilt, run `configuration:sync` to regenerate the settings map, then run `configuration:import-environment` and `configuration:restore` to restore the values.

In `config/install/destructive.yml`, add the sections as follows:

- `configuration-export`: before `clean-storage`, which drops the database tables.
- `configuration`: after the database is rebuilt and the data is imported, and before `scheduler-start`, so that the restored values are published.

**config/install/destructive.yml**

```yaml
sections:
    scheduler-clean:
        # ...

    configuration-export:
        configuration-export:
            command: >-
                vendor/bin/console configuration:export
                integrations:google_analytics:tracking:measurement_id
                -vvv --no-ansi

    clean-storage:
        # ...

    init-storages-per-region:
        # ...

    setup-queue:
        # ...

    setup-minimal-data:
        # ...

    clear-and-init-search:
        # ...

    demodata:
        # ...

    configuration:
        configuration-sync:
            command: 'vendor/bin/console configuration:sync -vvv --no-ansi'

        configuration-import-environment:
            command: >-
                vendor/bin/console configuration:import-environment
                integrations:google_analytics:connection:service_account_credentials_json=GA_SERVICE_ACCOUNT_JSON
                -vvv --no-ansi

        configuration-restore:
            command: >-
                vendor/bin/console configuration:restore
                integrations:google_analytics:tracking:measurement_id
                -vvv --no-ansi

    scheduler-start:
        # ...
```

Both `configuration:restore` and `configuration:import-environment` write configuration values. If both commands write the same setting, the command that runs last determines the final value.

Choose the order based on which source must take precedence:

| Command order | Result |
| --- | --- |
| Import environment, then restore | The exported value takes precedence over the environment variable value. |
| Restore, then import environment | The environment variable value takes precedence over the exported value. |

{% info_block warningBox "Shared filesystem" %}

All sections in a single `vendor/bin/install` run must have access to the same export file. If your deployment runs each section in a separate container, configure a shared volume so that `configuration:restore` can access the file created by `configuration:export`.

{% endinfo_block %}

{% info_block infoBox "Spryker Cloud" %}

In Spryker Cloud, the install stage runs the whole `SPRYKER_HOOK_DESTRUCTIVE_INSTALL` command in one job, so all sections of the recipe share the same filesystem and you don't need a shared volume. The export file exists only while that job runs: if `configuration:restore` fails, the file isn't available for a later run, and you need to set the affected values in the Back Office again. Set the variables for `configuration:import-environment` in the Parameter Store. For details, see [Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html#install-stage) and [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html).

{% endinfo_block %}

### Exit codes

The commands exit with code `1` when they fail, so the deployment stops at that section. For example, a command fails when the export file path is not configured, the export file can't be written or read, a value can't be restored or imported, a mapping is invalid, or the settings map is missing.

The commands exit with code `0` when there is nothing to do: no stored values to export, no export file to restore from, or an environment variable that is not set. `configuration:export` also exits with code `0` when the configuration values table doesn't exist yet, which is the case on the first destructive deployment.

To continue the deployment even if one of these commands fails, set `breakOnFailure: false` for the command in the recipe:

```yaml
        configuration-restore:
            command: 'vendor/bin/console configuration:restore integrations:google_analytics:tracking:measurement_id -vvv --no-ansi'
            breakOnFailure: false
```

## Troubleshooting

| Symptom | Cause | Solution |
| --- | --- | --- |
| `Nothing stored for key "..."` during export | No value is stored for the setting | This is expected on the first deployment if the setting has not been saved. `configuration:sync` generates the settings map but does not create configuration values. |
| `Could not import "..." (scope: ...): TypeError` for a secret setting | The encryption key or initialization vector is missing or invalid | Configure `SPRYKER_CONFIGURATION_ENCRYPTION_KEY` and `SPRYKER_CONFIGURATION_ENCRYPTION_INIT_VECTOR` with the required values. The commands never print configuration values, so they don't print exception or validation details either, and the message might not identify the exact cause. |
| `The configuration schema holds no settings` | The settings map has not been generated or contains no settings | Run `configuration:sync` before running the commands. |
| `No export at "...", nothing to restore.` | No file exists at the configured path | Make sure `getExportFile()` returns the path where the file was written, and that the file is readable by the current user. |
| `Could not import mapping #...: expected "<setting key>=<VARIABLE>"` | The argument is not a mapping, or the part after `=` is not a valid variable name | Pass `<setting key>=<VARIABLE>`, with the name of the environment variable after `=`, not its value. |
| `Could not import "...": the schema defines no such setting.` | The setting key in the mapping doesn't exist in the configuration schema | Check the setting key, and run `configuration:sync` after changing the schema. |
| `The "..." scope needs a scope identifier` or `takes no scope identifier` | The `--scope` and `--scope-identifier` options don't match | Pass `--scope-identifier` for every scope except `global`, and omit it for `global`. |
| `Could not read the stored configuration values (...)` during export | The configuration values can't be read, for example, because the database is unreachable | Fix the cause before the deployment drops the tables. The command exits with code `1`, so the deployment stops. |
