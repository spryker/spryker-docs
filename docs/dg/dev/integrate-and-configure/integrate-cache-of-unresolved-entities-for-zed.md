---
title: Integrate cache of unresolved entities for Zed
description: The article provides general description and integration instructions of the Cache of Unresolved Entities for Zed feature
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/cache-of-unresolved-entities-for-zed
originalArticleId: 1ea10e01-93fd-471a-aa18-824dd055c140
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-cache-of-unresolved-entities-for-zed.html
  - /docs/scos/dev/technical-enhancements/cache-of-unresolved-entities-for-zed.html
---

Spryker allows extending certain classes (such as facades, clients, etc.) in projects and in multiple stores. Therefore each class can exist on the core, project, and store level. In addition to that, Spryker supports multiple namespaces for each level. Because of this, there exist multiple possible locations to look up such classes. To avoid unnecessary usages of the expensive `class_exists()` function that does the job, Spryker provides a caching mechanism that writes all non-existing classes into a cache file for Zed. For more details, see[ Activate Class Resolver Cache](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#activate-resolvable-class-names-cache) in Performance Guidelines.


Follow the steps below to integrate Cache of Unresolved Entities for Zed into your project to improve performance.

## 1) Install the required modules

Install the required module:

```bash
composer update spryker/kernel
```

## 2) Set up behavior

Add `Spryker\Zed\Kernel\Communication\Plugin\AutoloaderCacheEventDispatcherPlugin` to `Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider`:

```php
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
