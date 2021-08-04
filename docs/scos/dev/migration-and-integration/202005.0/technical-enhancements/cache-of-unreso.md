---
title: Cache of Unresolved Entities for Zed
originalLink: https://documentation.spryker.com/v5/docs/cache-of-unresolved-entities-for-zed
redirect_from:
  - /v5/docs/cache-of-unresolved-entities-for-zed
  - /v5/docs/en/cache-of-unresolved-entities-for-zed
---

Spryker allows extending certain classes (such as facades, clients, etc.) in projects and in multiple stores. Therefore each class can exist on the core, project, and store level. In addition to that, Spryker supports multiple namespaces for each level. Because of this, there exist multiple possible locations to look up such classes. To avoid unnecessary usages of the expensive `class_exists()` function that does the job, Spryker provides a caching mechanism that writes all non-existing classes into a cache file for Zed. For more details, see[ Activate Class Resolver Cache](https://documentation.spryker.com/docs/en/performance-guidelines#activate-class-resolver-cache) in Performance Guidelines.

## Integration
Follow the steps below to integrate Cache of Unresolved Entities for Zed into your project to improve performance.

### 1) Install the Required Modules Using Composer
Run the following command to install the required module:
```Bash
composer update spryker/kernel
```
### 2) Set Up Behavior
Add `Spryker\Zed\Kernel\Communication\Plugin\AutoloaderCacheEventDispatcherPlugin` to `Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider`:

```PHP
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Kernel\Communication\Plugin\AutoloaderCacheEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new AutoloaderCacheEventDispatcherPlugin(),
        ];
    }
}
```

That's it. You now have the  Cache of Unresolved Entities for Zed feature installed.
