---
title: Migration guide - Session
description: Use the guide to perform the Session part of the Silex Migration Effort.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-session
originalArticleId: 87af16e9-98c1-42d0-910c-89dfedfcab68
redirect_from:
  - /2021080/docs/migration-guide-session
  - /2021080/docs/en/migration-guide-session
  - /docs/migration-guide-session
  - /docs/en/migration-guide-session
  - /v1/docs/mg-session
  - /v1/docs/en/mg-session
  - /v2/docs/mg-session
  - /v2/docs/en/mg-session
  - /v3/docs/mg-session
  - /v3/docs/en/mg-session
  - /v4/docs/mg-session
  - /v4/docs/en/mg-session
  - /v5/docs/mg-session
  - /v5/docs/en/mg-session
  - /v6/docs/mg-session
  - /v6/docs/en/mg-session
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-session.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-session.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-session.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-session.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-session.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-session.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-session.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

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
## Upgrading from Version 3.* to Version 4.*

The previous version made use of the deprecated `spryker/new-relic` and the `spryker/new-relic-api` modules.
To be able to use this version you need to install the `spryker/monitoring` module if you haven't done already by running:
```yaml
composer require spryker/monitoring
```

All session handler classes provided by this module are now using the monitoring module instead of the new-relic module.
Additionally we moved some constants from the `SessionConstants` file to the `SessionConfig` file.
You need to update your `config_*` files and use as values for the session configuration the ones which come from the `SessionConfig` file now.

**Example:**

You need to change all:
`$config[SessionConstants::CONFIG_KEY] = SessionConstants::CONFIG_VALUE;`
**to:**
`$config[SessionConstants::CONFIG_KEY] = SessionConfig::CONFIG_VALUE;`
