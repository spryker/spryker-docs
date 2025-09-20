---
title: Configure direct synchronize
description: 
last_updated: Jun 16, 2025
template: howto-guide-template
---

To optimize performance and flexibility, you can enable direct synchronization on the project level. This approach uses in-memory storage to retain all synchronization events instead of sending them to the queue. With this setup, you can control if entities are synchronized directly or through the traditional queue-based method.

For more details on direct sync, see [Synchronization types](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization#Synchronization-types)

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

This configuration enables direct synchronization for all entities with synchronization behavior. If needed, you can disable direct synchronization for specific entities by adding an additional parameter in the Propel schema:


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


