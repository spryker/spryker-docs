---
title: Migration Guide - Session
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-session
redirect_from:
  - /v4/docs/migration-guide-session
  - /v4/docs/en/migration-guide-session
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-replaceme).

{% endinfo_block %}

To upgrade the module, do the following:

1. Install modules using composer:
```bash
composer require spryker/session spryker/event-dispatcher
```
2. Remove old service providers, if you have them in the project::
```php
\Silex\Provider\SessionServiceProvider
\Spryker\Yves\Session\Plugin\ServiceProvider\SessionServiceProvider
\Spryker\Zed\Session\Communication\Plugin\ServiceProvider\SessionServiceProvider
\Spryker\Zed\Application\Communication\Plugin\ServiceProvider\SaveSessionServiceProvider
```
3. Enable new plugins:

**Zed Integration (when usable in ZED)**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Session\Communication\Plugin\Application\SessionApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
	...
	/**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
	{
		return [
			...
			new SessionApplicationPlugin(),
   			...
		];
	}
	...
}
```

**Zed Integration (when usable in ZED)**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Session\Communication\Plugin\EventDispatcher\SaveSessionEventDispatcherPlugin;
use Spryker\Zed\Session\Communication\Plugin\EventDispatcher\SessionEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new SessionEventDispatcherPlugin(),
            new SaveSessionEventDispatcherPlugin(),
            ...
        ];
    }
}
```

**Yves Integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\Session\Plugin\Application\SessionApplicationPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new SessionApplicationPlugin(),
            ...
        ];
    }
}
```

**Yves Integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Yves\Session\Plugin\EventDispatcher\SessionEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new SessionEventDispatcherPlugin(),
            ...
        ];
    }
}
```

**Glue Integration (required as a mock)**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\Session\Plugin\Application\SessionApplicationPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new SessionApplicationPlugin(),
            ...
        ];
    }
}
```
