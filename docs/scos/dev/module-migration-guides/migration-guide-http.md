---
title: Migration guide - HTTP
description: Use the guide to perform the HTTP part of the Silex Migration Effort.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-http
originalArticleId: e306c206-0b5d-46e3-bba0-e6a827f9aaa3
redirect_from:
  - /2021080/docs/migration-guide-http
  - /2021080/docs/en/migration-guide-http
  - /docs/migration-guide-http
  - /docs/en/migration-guide-http
  - /v5/docs/migration-guide-http
  - /v5/docs/en/migration-guide-http
  - /v6/docs/migration-guide-http
  - /v6/docs/en/migration-guide-http
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-form.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-form.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-form.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:
```bash
composer require spryker/http spryker/event-dispatcher
```

2. Remove old service providers, if you have them in the project:
```php
\Spryker\Yves\Application\Plugin\Provider\CookieServiceProvider
\Spryker\Zed\Application\Communication\Plugin\ServiceProvider\SubRequestServiceProvider
```
3. Enable new plugins in the corresponding files:

**Zed Integration  (when usable in Zed)**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Http\Communication\Plugin\Application\HttpApplicationPlugin;

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
			new HttpApplicationPlugin(),
   			...
		];
	}

	...
}
```

**Zed Integration (when usable in Zed)**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\CookieEventDispatcherPlugin;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\FragmentEventDispatcherPlugin;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\HeaderEventDispatcherPlugin;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\HstsHeaderEventDispatcher;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new CookieEventDispatcherPlugin(),
            new FragmentEventDispatcherPlugin(),
            new HeaderEventDispatcherPlugin(),
            new HstsHeaderEventDispatcher(),
        ];
    }
}
```

**Yves Integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\Application;

use Spryker\Yves\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Yves\Http\Plugin\Application\HttpApplicationPlugin;

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
			new HttpApplicationPlugin(),
   			...
		];
	}

	...
}
```

**Yves Integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\Http\Plugin\EventDispatcher\CookieEventDispatcherPlugin;
use Spryker\Yves\Http\Plugin\EventDispatcher\FragmentEventDispatcherPlugin;
use Spryker\Yves\Http\Plugin\EventDispatcher\HeaderEventDispatcherPlugin;
use Spryker\Yves\Http\Plugin\EventDispatcher\HstsHeaderEventDispatcher;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new CookieEventDispatcherPlugin(),
            new FragmentEventDispatcherPlugin(),
            new HeaderEventDispatcherPlugin(),
            new HstsHeaderEventDispatcher(),
        ];
    }
}
```

4. Configure the *Http Modul*e with the following `\Spryker\Shared\Http\HttpConstants` options:
* `\Spryker\Shared\Http\HttpConstants::YVES_HTTP_PORT` - sets the HTTP port for Yves (Spryker frontend);
* `\Spryker\Shared\Http\HttpConstants::YVES_HTTPS_PORT` - sets the HTTPS port for Yves;
* `\Spryker\Shared\Http\HttpConstants::YVES_TRUSTED_PROXIES` - sets an array of trusted proxies for Yves;
* `\Spryker\Shared\Http\HttpConstants::YVES_TRUSTED_HEADER` - sets a trusted header for Yves requests;
* `\Spryker\Shared\Http\HttpConstants::YVES_TRUSTED_HOSTS` - sets a list of trusted hosts for Yves;
* `\Spryker\Shared\Http\HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED` - use this option to enable or disable the _HTTP Strict-Transport-Security_ header for Yves (**disabled** by default);
* `\Spryker\Shared\Http\HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG` - sets the body of the _HTTP Strict-Transport-Security_ header for Yves;
* `\Spryker\Shared\Http\HttpConstants::ZED_HTTP_PORT` - sets the HTTP port for Zed (Spryker backend);
* `\Spryker\Shared\Http\HttpConstants::ZED_HTTPS_PORT` - sets the HTTPS port for Zed;
* `\Spryker\Shared\Http\HttpConstants::ZED_TRUSTED_PROXIES` - sets an array of trusted proxies for Zed;
* `\Spryker\Shared\Http\HttpConstants::ZED_TRUSTED_HEADER` - sets a trusted header for Zed requests;
* `\Spryker\Shared\Http\HttpConstants::ZED_TRUSTED_HOSTS` - sets a list of trusted hosts for Zed;
* `\Spryker\Shared\Http\HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED` - use this option to enable or disable the _HTTP Strict-Transport-Security_ header for Zed (**disabled** by default);
* `\Spryker\Shared\Http\HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG` - sets the body of the _HTTP Strict-Transport-Security_ header for Zed.
