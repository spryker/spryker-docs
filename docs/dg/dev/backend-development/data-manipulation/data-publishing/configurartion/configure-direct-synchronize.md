---
title: Configure direct synchronize
description: 
last_updated: August 5, 2026
template: howto-guide-template
---

To optimize performance and flexibility, you can enable direct synchronization on the project level. This approach uses in-memory storage to retain all synchronization events instead of sending them to the queue. With this setup, you can control if entities are synchronized directly or through the traditional queue-based method.

For more details on direct sync, see [Synchronization types](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization#synchronization-types).

To enable direct synchronization, do the following:

1. Add `DirectSynchronizationConsolePlugin` to `ConsoleDependencyProvider::getEventSubscriber()`.

2. Enable the `SynchronizationBehaviorConfig::isDirectSynchronizationEnabled()` configuration.

3. Rebuild Propel models - `vendor/bin/console propel:install`.

 

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Console;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Synchronization\Communication\Plugin\Console\DirectSynchronizationConsolePlugin;
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\EventDispatcher\EventSubscriberInterface>
     */
    public function getEventSubscriber(Container $container): array
    {
        return [
            new DirectSynchronizationConsolePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\SynchronizationBehavior;
use Spryker\Zed\SynchronizationBehavior\SynchronizationBehaviorConfig as SprykerSynchronizationBehaviorConfig;
class SynchronizationBehaviorConfig extends SprykerSynchronizationBehaviorConfig
{
    public function isDirectSynchronizationEnabled(): bool
    {
        return true;
    }
}
```

This configuration enables direct sync for all entities with synchronization behavior.

4. Recommended: Enable `QueueConfig::isReducedSyncQueueScanEnabled()` to reduce how often the queue worker scans the sync queue. Because direct synchronization writes events to in-memory storage instead of the sync queue, the sync queue stays mostly empty, so the worker does not need to scan it as frequently. This method requires the following package versions:

- `spryker/queue` >= 1.29.0
- `spryker/console` >= 4.19.0
- `spryker/symfony-messenger` >= 1.8.1

{% info_block warningBox "Enable only with direct sync" %}

Enable `isReducedSyncQueueScanEnabled()` only when direct synchronization is enabled. With the traditional queue-based synchronization, the sync queue still receives events and must be scanned at the regular interval.

{% endinfo_block %}

**src/Pyz/Zed/Queue/QueueConfig.php**

```php
<?php
namespace Pyz\Zed\Queue;
use Spryker\Zed\Queue\QueueConfig as SprykerQueueConfig;
class QueueConfig extends SprykerQueueConfig
{
    public function isReducedSyncQueueScanEnabled(): bool
    {
        return true;
    }
}
```

5. Optional: To disable direct sync for specific entities, add an additional parameter in the Propel schema:


```xml
<table name="spy_table_storage" identifierQuoting="true">
    <behavior name="synchronization">
        <parameter name="direct_sync_disabled"/>
    </behavior>
</table>
```

## Environment limitations related to Dynamic Multi-Store

When Dynamic Multi-Store (DMS) is enabled, there're no environment limitations for direct sync.

When DMS is disabled, direct sync has the following limitations:

- Single-store configuration: The feature is only supported for configurations with a single store.

- Multi-store configuration with namespace consistency: For configurations with multiple stores, all stores must use the same Storage and Search namespaces.

Example configuration for multiple stores:

```yml
stores:
    DE:
        services:
            broker:
                namespace: de-docker
            key_value_store:
                namespace: 1
            search:
                namespace: search
    AT:
        services:
            broker:
                namespace: at-docker
            key_value_store:
                namespace: 1
            search:
                namespace: search
```


