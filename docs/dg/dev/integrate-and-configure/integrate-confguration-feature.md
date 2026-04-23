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
composer require spryker/configuration:"^0.1.0" --update-with-dependencies
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
| ConfigurationSettingValues | class | created | src/Generated/Shared/Transfer/ConfigurationSettingValuesTransfer |
| ConfigurationStorage | class | created | src/Generated/Shared/Transfer/ConfigurationStorageTransfer |

{% endinfo_block %}

### 4) Configure navigation

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

### 5) Set up behavior

#### 5.1) Register console commands

Register the configuration sync console command:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurationSyncConsole | Synchronizes configuration schemas from YAML files and generates the merged schema and settings map. | None | Spryker\Zed\Configuration\Communication\Console |

**src/Pyz/Console/src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

Add the import statement and register the console command in `getConsoleCommands()`:

```php
use Spryker\Zed\Configuration\Communication\Console\ConfigurationSyncConsole;
```

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

{% info_block warningBox "Verification" %}

Run `console configuration:sync` and verify that it outputs the number of processed settings.

{% endinfo_block %}

#### 5.2) Set up queue configuration

Register the Configuration storage synchronization queue in both message broker implementations.

**src/Pyz/RabbitMq/src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

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

**src/Pyz/SymfonyMessenger/src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php**

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

#### 5.3) Register queue message processor

Register the synchronization storage queue message processor for the Configuration sync queue:

**src/Pyz/Queue/src/Pyz/Zed/Queue/QueueDependencyProvider.php**

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

#### 5.4) Register publisher plugins

Enable Publish & Synchronize for configuration values by registering the publisher plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurationValueWritePublisherPlugin | Publishes storefront-visible, non-secret configuration values to `spy_configuration_storage` when `spy_configuration_value` entities are created, updated, or deleted. | None | Spryker\Zed\Configuration\Communication\Plugin\Publisher |

**src/Pyz/Publisher/src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

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

#### 5.5) Register scope identifier provider plugins

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

#### 5.6) Register Client-level request expander plugins

Register the store scope expander to attach the current store scope to configuration value requests:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreScopeConfigurationValueRequestExpanderPlugin | Expands the configuration value request with the current store scope and store name as scope identifier. | Store module installed | Spryker\Client\Store\Plugin\Configuration |

**src/Pyz/Configuration/src/Pyz/Client/Configuration/ConfigurationDependencyProvider.php**

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

### 6) Add install recipe commands

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

### 7) Configure data directory

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
