---
title: Install the Configuration Management feature
description: Learn how to integrate and configure Configuration Management feature in a Spryker project.
last_updated: Apr 22, 2026
template: howto-guide-template

related:
  - title: Configuration Management feature
    link: docs/dg/dev/backend-development/configuration-management.html
---

This document describes how to install the Configuration Management feature.

## Prerequisites

Update the required modules:

| NAME | VERSION |
|----|---------|
| Kernel | ^3.82   |
| Store | ^1.36   |
| Translator   | ^1.15   |

## Install feature core

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/configuration:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Configuration | vendor/spryker/configuration |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to extend scope support with store-level configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ConfigurationConfig | Adds `store` scope to available scopes and defines scope hierarchy (store inherits from global). | Pyz\Shared\Configuration |

**src/Pyz/Shared/Configuration/ConfigurationConfig.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

declare(strict_types = 1);

namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;
use Spryker\Shared\Configuration\ConfigurationConstants;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    /**
     * @uses \Spryker\Shared\Store\StoreConstants::SCOPE_STORE
     */
    public const string SCOPE_STORE = 'store';

    public function getAvailableScopes(): array
    {
        $availableScopes = parent::getAvailableScopes();
        $availableScopes[] = static::SCOPE_STORE;

        return $availableScopes;
    }

    public function getScopeHierarchy(): array
    {
        $scopeHierarchy = parent::getScopeHierarchy();
        $scopeHierarchy[static::SCOPE_STORE] = ConfigurationConstants::SCOPE_GLOBAL;

        return $scopeHierarchy;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that after reading a configuration value with `store` scope, the system falls back to the `global` scope value if no store-specific value is set.

{% endinfo_block %}

#### 2.1) Set up encryption for secret settings

Add encryption key configuration for encrypting and decrypting secret configuration values:

**config/Shared/config_default.php**

Add the import statement:

```php
use Spryker\Shared\Configuration\ConfigurationConstants;
```

Add the encryption configuration:

```php
// Configuration system
$config[ConfigurationConstants::ENCRYPTION_KEY] = hex2bin(getenv('SPRYKER_CONFIGURATION_ENCRYPTION_KEY') ?: '') ?: null;
$config[ConfigurationConstants::ENCRYPTION_INIT_VECTOR] = hex2bin(getenv('SPRYKER_CONFIGURATION_ENCRYPTION_INIT_VECTOR') ?: '') ?: null;
```

#### 2.2) Provide environment variables


For local development, add the following environment variables to your deploy file (`deploy.dev.yml` or equivalent):

```yaml
image:
    environment:
        SPRYKER_CONFIGURATION_ENCRYPTION_KEY: '<your-64-char-hex-key>'
        SPRYKER_CONFIGURATION_ENCRYPTION_INIT_VECTOR: '<your-32-char-hex-iv>'
```

In Cloud, add environment variables using [Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store).

To generate new keys, run:

```bash
openssl rand -hex 32  # generates SPRYKER_CONFIGURATION_ENCRYPTION_KEY
openssl rand -hex 16  # generates SPRYKER_CONFIGURATION_ENCRYPTION_INIT_VECTOR
```

{% info_block warningBox "Verification" %}

1. Create a setting with `secret: true` in a YAML schema and run `configuration:sync`.
2. Set a value for the secret setting in the Back Office.
3. Check the `spy_configuration_value` table — the stored value must be encrypted (not plain text).
4. Read the value back in the Back Office — it must be decrypted and displayed correctly.

{% endinfo_block %}

### 3) Set up the database schema and transfer objects

#### 3.1) Set up database schema extension

Add event behavior to the `spy_configuration_value` table to enable Publish & Synchronize:

**src/Pyz/Zed/Configuration/Persistence/Propel/Schema/spy_configuration.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Configuration\Persistence" package="src.Orm.Zed.Configuration.Persistence">

    <table name="spy_configuration_value" phpName="SpyConfigurationValue">
        <behavior name="event">
            <parameter name="spy_configuration_value_all" column="*" keep-additional="true"/>
        </behavior>
    </table>

</database>
```

#### 3.2) Apply database changes and generate transfers

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_configuration_value | table | created |
| spy_configuration_storage | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes in transfer objects have been applied:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ConfigurationSetting | class | created | src/Generated/Shared/Transfer/ConfigurationSettingTransfer |
| ConfigurationValue | class | created | src/Generated/Shared/Transfer/ConfigurationValueTransfer |
| ConfigurationScope | class | created | src/Generated/Shared/Transfer/ConfigurationScopeTransfer |
| ConfigurationFeature | class | created | src/Generated/Shared/Transfer/ConfigurationFeatureTransfer |
| ConfigurationTab | class | created | src/Generated/Shared/Transfer/ConfigurationTabTransfer |
| ConfigurationGroup | class | created | src/Generated/Shared/Transfer/ConfigurationGroupTransfer |
| ConfigurationConstraint | class | created | src/Generated/Shared/Transfer/ConfigurationConstraintTransfer |
| ConfigurationDependency | class | created | src/Generated/Shared/Transfer/ConfigurationDependencyTransfer |
| ConfigurationSyncResponse | class | created | src/Generated/Shared/Transfer/ConfigurationSyncResponseTransfer |
| ConfigurationSettingCollection | class | created | src/Generated/Shared/Transfer/ConfigurationSettingCollectionTransfer |
| ConfigurationScopeCollection | class | created | src/Generated/Shared/Transfer/ConfigurationScopeCollectionTransfer |
| ConfigurationValueRequest | class | created | src/Generated/Shared/Transfer/ConfigurationValueRequestTransfer |
| ConfigurationValueResponse | class | created | src/Generated/Shared/Transfer/ConfigurationValueResponseTransfer |
| ConfigurationValidationRequest | class | created | src/Generated/Shared/Transfer/ConfigurationValidationRequestTransfer |
| ConfigurationValidationResponse | class | created | src/Generated/Shared/Transfer/ConfigurationValidationResponseTransfer |
| ConfigurationError | class | created | src/Generated/Shared/Transfer/ConfigurationErrorTransfer |
| ConfigurationValueCollectionRequest | class | created | src/Generated/Shared/Transfer/ConfigurationValueCollectionRequestTransfer |
| ConfigurationValueDeletion | class | created | src/Generated/Shared/Transfer/ConfigurationValueDeletionTransfer |
| ConfigurationValueCollectionResponse | class | created | src/Generated/Shared/Transfer/ConfigurationValueCollectionResponseTransfer |
| ConfigurationSettingValuesCriteria | class | created | src/Generated/Shared/Transfer/ConfigurationSettingValuesCriteriaTransfer |
| ConfigurationSettingValueCollection | class | created | src/Generated/Shared/Transfer/ConfigurationSettingValueCollectionTransfer |
| ConfigurationStorage | class | created | src/Generated/Shared/Transfer/ConfigurationStorageTransfer |
| ConfigurationFileUpload | class | created | src/Generated/Shared/Transfer/ConfigurationFileUploadTransfer |
| ConfigurationFileUploadCollectionRequest | class | created | src/Generated/Shared/Transfer/ConfigurationFileUploadCollectionRequestTransfer |
| ConfigurationFileUploadCollectionResponse | class | created | src/Generated/Shared/Transfer/ConfigurationFileUploadCollectionResponseTransfer |

{% endinfo_block %}

### 4) Add translations

Regenerate the Zed translator cache to pick up the Configuration Management Back Office UI translations:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

1. Navigate to the Configuration Management page in the Back Office.
2. Verify that all UI labels, buttons, and messages are displayed in the correct locale.
3. Switch to German locale and verify the German translations appear.

{% endinfo_block %}

### 5) Configure navigation

Add the Configuration Management entry to `config/Zed/navigation.xml`:

```xml
<configuration-management>
    <label>Configuration</label>
    <title>Configuration Management</title>
    <icon>settings</icon>
    <bundle>configuration</bundle>
    <controller>manage</controller>
    <action>index</action>
    <visible>1</visible>
</configuration-management>
```

Execute the following command to clear the navigation cache:

```bash
console navigation:cache:remove
```

{% info_block warningBox "Verification" %}

Log in to the Back Office and verify that the **Configuration** menu item appears in the main navigation sidebar.

{% endinfo_block %}

### 6) Set up behavior

#### 6.1) Register console commands and application plugin

Register the configuration sync console command and the application plugin that exposes the Configuration facade as an application service for direct Zed access from the Client layer:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurationSyncConsole | Synchronizes configuration schemas from YAML files and generates the merged schema and settings map. | None | Spryker\Zed\Configuration\Communication\Console |
| ConfigurationApplicationPlugin | Registers the Configuration facade as an application service for direct access in Zed applications. | None | Spryker\Zed\Configuration\Communication\Plugin\Application |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

Add the import statements:

```php
use Spryker\Zed\Configuration\Communication\Console\ConfigurationSyncConsole;
use Spryker\Zed\Configuration\Communication\Plugin\Application\ConfigurationApplicationPlugin;
```

Register the console command in `getConsoleCommands()`:

```php
protected function getConsoleCommands(Container $container): array
{
    $commands = [
        // ...
        new ConfigurationSyncConsole(),
        // ...
    ];
}
```

Register the application plugin in `getApplicationPlugins()`:

```php
protected function getApplicationPlugins(Container $container): array
{
    $applicationPlugins = parent::getApplicationPlugins($container);
    // ...
    $applicationPlugins[] = new ConfigurationApplicationPlugin();

    return $applicationPlugins;
}
```

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

Add the import statement:

```php
use Spryker\Zed\Configuration\Communication\Plugin\Application\ConfigurationApplicationPlugin;
```

Register the application plugin in each Zed application context (`getBackofficeApplicationPlugins()`, `getBackendGatewayApplicationPlugins()`, `getBackendApiApplicationPlugins()`):

```php
protected function getBackofficeApplicationPlugins(): array
{
    return [
        // ...
        new ConfigurationApplicationPlugin(),
    ];
}

protected function getBackendGatewayApplicationPlugins(): array
{
    return [
        // ...
        new ConfigurationApplicationPlugin(),
    ];
}

protected function getBackendApiApplicationPlugins(): array
{
    return [
        // ...
        new ConfigurationApplicationPlugin(),
    ];
}
```

{% info_block warningBox "Verification" %}

1. Run `console configuration:sync` and verify that it outputs the number of processed settings.
2. Verify that configuration values can be read in Zed context via the Client layer without going through storage.

{% endinfo_block %}

#### 6.2) Set up queue configuration

Register the Configuration storage synchronization queue in both message broker implementations.

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

Add the import statement:

```php
use Spryker\Shared\Configuration\ConfigurationConstants;
```

Add the queue name to `getSynchronizationQueueConfiguration()`:

```php
protected function getSynchronizationQueueConfiguration(): array
{
    return [
        // ...
        ConfigurationConstants::QUEUE_NAME_SYNC_CONFIGURATION,
    ];
}
```

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php**

Add the import statement:

```php
use Spryker\Shared\Configuration\ConfigurationConstants;
```

Add the queue name to `getSynchronizationQueueConfiguration()`:

```php
protected function getSynchronizationQueueConfiguration(): array
{
    return [
        // ...
        ConfigurationConstants::QUEUE_NAME_SYNC_CONFIGURATION,
    ];
}
```

{% info_block warningBox "Verification" %}

Run `console queue:setup` and verify that the `sync.storage.configuration` queue is created in RabbitMQ.

{% endinfo_block %}

#### 6.3) Register queue message processor

Register the synchronization storage queue message processor for the Configuration sync queue:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

Add the import statements:

```php
use Spryker\Shared\Configuration\ConfigurationConstants;
```

Add the processor to `getProcessorMessagePlugins()`:

```php
protected function getProcessorMessagePlugins(Container $container): array
{
    return [
        // ...
        ConfigurationConstants::QUEUE_NAME_SYNC_CONFIGURATION => new SynchronizationStorageQueueMessageProcessorPlugin(),
    ];
}
```

{% info_block warningBox "Verification" %}

1. Save a configuration value in the Back Office.
2. Run `console queue:worker:start --stop-when-empty`.
3. Verify that the `sync.storage.configuration` queue is processed without errors.

{% endinfo_block %}

#### 6.4) Register publisher plugins

Enable Publish & Synchronize for configuration values by registering the publisher plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurationValueWritePublisherPlugin | Publishes storefront-visible, non-secret configuration values to `spy_configuration_storage` when `spy_configuration_value` entities are created, updated, or deleted. | None | Spryker\Zed\Configuration\Communication\Plugin\Publisher |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

Add the import statement:

```php
use Spryker\Zed\Configuration\Communication\Plugin\Publisher\ConfigurationValueWritePublisherPlugin;
```

Register the plugin group in `getPublisherPlugins()`:

```php
protected function getPublisherPlugins(): array
{
    return array_merge(
        // ...
        $this->getConfigurationStoragePlugins(),
    );
}
```

Add the new method:

```php
/**
 * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
 */
protected function getConfigurationStoragePlugins(): array
{
    return [
        new ConfigurationValueWritePublisherPlugin(),
    ];
}
```

{% info_block warningBox "Verification" %}

1. Save a configuration value in the Back Office.
2. Check that the `spy_configuration_storage` table contains the published value.
3. Verify that secret settings are NOT published to storage.

{% endinfo_block %}

#### 6.5) Register scope identifier provider plugins

Register the store scope identifier provider to resolve the current store name as the scope identifier:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreConfigurationScopeIdentifierProviderPlugin | Provides the current store name as the scope identifier for the `store` scope. | Store module installed | Spryker\Zed\Store\Communication\Plugin\Configuration |

**src/Pyz/Zed/Configuration/ConfigurationDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

declare(strict_types = 1);

namespace Pyz\Zed\Configuration;

use Spryker\Zed\Configuration\ConfigurationDependencyProvider as SprykerConfigurationDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Configuration\StoreConfigurationScopeIdentifierProviderPlugin;

class ConfigurationDependencyProvider extends SprykerConfigurationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationScopeIdentifierProviderPluginInterface>
     */
    protected function getScopeIdentifierProviderPlugins(): array
    {
        return [
            new StoreConfigurationScopeIdentifierProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Navigate to the Configuration Management page in the Back Office.
2. Switch the scope selector to a specific store.
3. Verify that the scope identifier resolves to the store name (for example `DE`, `AT`).

{% endinfo_block %}

#### 6.6) Register Client-level request expander plugins

Register the store scope expander to attach the current store scope to configuration value requests:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreScopeConfigurationValueRequestExpanderPlugin | Expands the configuration value request with the current store scope and store name as scope identifier. | Store module installed | Spryker\Client\Store\Plugin\Configuration |

**src/Pyz/Client/Configuration/ConfigurationDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

declare(strict_types = 1);

namespace Pyz\Client\Configuration;

use Spryker\Client\Configuration\ConfigurationDependencyProvider as SprykerConfigurationDependencyProvider;
use Spryker\Client\Store\Plugin\Configuration\StoreScopeConfigurationValueRequestExpanderPlugin;

class ConfigurationDependencyProvider extends SprykerConfigurationDependencyProvider
{
    protected function getConfigurationValueRequestExpanderPlugins(): array
    {
        return [
            new StoreScopeConfigurationValueRequestExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Read a configuration value via the Client layer.
2. Verify that the request includes the current store as a scope with the store name as scope identifier.

{% endinfo_block %}

#### 6.7) Optional: Set up data import

Enable CLI-based bulk import of configuration values from CSV files.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurationValueDataImportPlugin | Imports configuration values from CSV using the DataImport framework. Validates setting keys, scopes, and constraints. Skips secret settings with a warning. | `configuration:sync` must be run first | Spryker\Zed\Configuration\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

Add the import statement and register the plugin in `getDataImporterPlugins()`:

```php
use Spryker\Zed\Configuration\Communication\Plugin\DataImport\ConfigurationValueDataImportPlugin;
```

```php
protected function getDataImporterPlugins(): array
{
    return [
        // ...
        new ConfigurationValueDataImportPlugin(),
    ];
}
```

**src/Pyz/Zed/DataImport/DataImportConfig.php**

Add the import type to the full import types list:

```php
use Spryker\Zed\Configuration\ConfigurationConfig;
```

```php
public function getFullImportTypes(): array
{
    return [
        // ...
        ConfigurationConfig::IMPORT_TYPE_CONFIGURATION_VALUE,
    ];
}
```

**data/import/common/common/configuration_value.csv**

Create the CSV file with the required columns:

```csv
setting_key,scope,scope_identifier,value
```

**data/import/local/full_EU.yml** (or your region-specific import config)

Add the `configuration-value` data entity:

```yaml
actions:
    # ...
    - data_entity: configuration-value
      source: data/import/common/common/configuration_value.csv
```

{% info_block warningBox "Verification" %}

1. Add a row to `data/import/common/common/configuration_value.csv` with a valid setting key, for example:

   ```csv
   setting_key,scope,scope_identifier,value
   system:general:basic:site_name,store,DE,My German Store
   ```

2. Run `console data:import configuration-value`.
3. Verify the value is saved by checking the Back Office Configuration page.

{% endinfo_block %}

### 7) Add install recipe commands

Add the `configuration:sync` command to the install recipe so that the merged schema and settings map are generated during deployment.

**config/install/docker.yml**

Add the command to the `build` section:

```yaml
    build:
        # ... existing commands ...

        configuration-sync:
            command: 'vendor/bin/console configuration:sync'
```

{% info_block warningBox "Verification" %}

Run the install recipe and verify that the `configuration:sync` step executes without errors.

{% endinfo_block %}

### 8) Configure data directory

Add the `data/configuration/` directory to `.gitignore` exceptions to ensure the generated schema files are tracked:

**.gitignore**

```diff
 /data/*
 !/data/import/
 !/data/export/
+!/data/configuration/
```

Create the directory with a `.gitkeep` file:

```bash
mkdir -p data/configuration
touch data/configuration/.gitkeep
```

{% info_block warningBox "Verification" %}

Run `console configuration:sync` and verify that `data/configuration/merged-schema.php` and `data/configuration/settings-map.php` are generated.

{% endinfo_block %}

## Configuration Schema YAML Reference

Configuration settings are defined in YAML files with the `*.configuration.yml` extension. The schema sync command (`configuration:sync`) discovers these files and merges them into a single schema.
