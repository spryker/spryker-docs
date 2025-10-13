

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

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

**Zed integration (when usable in Zed)**

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

**Zed integration (when usable in Zed)**

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

**Yves integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\Application;

use Spryker\Yves\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Yves\Http\Plugin\Application\YvesHttpApplicationPlugin;

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
			new YvesHttpApplicationPlugin(),
   			...
		];
	}

	...
}
```

**Yves integration (when usable in Yves)**

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

4. Configure the *Http Module* with the following `\Spryker\Shared\Http\HttpConstants` options:

- `\Spryker\Shared\Http\HttpConstants::YVES_HTTP_PORT` - sets the HTTP port for Yves (Spryker Frontend);
- `\Spryker\Shared\Http\HttpConstants::YVES_HTTPS_PORT` - sets the HTTPS port for Yves;
- `\Spryker\Shared\Http\HttpConstants::YVES_TRUSTED_PROXIES` - sets an array of trusted proxies for Yves;
- `\Spryker\Shared\Http\HttpConstants::YVES_TRUSTED_HEADER` - sets a trusted header for Yves requests;
- `\Spryker\Shared\Http\HttpConstants::YVES_TRUSTED_HOSTS` - sets a list of trusted hosts for Yves;
- `\Spryker\Shared\Http\HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED` - use this option to enable or disable the *HTTP Strict-Transport-Security* header for Yves (*disabled** by default);
- `\Spryker\Shared\Http\HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG` - sets the body of the *HTTP Strict-Transport-Security* header for Yves;
- `\Spryker\Shared\Http\HttpConstants::ZED_HTTP_PORT` - sets the HTTP port for Zed (Spryker backend);
- `\Spryker\Shared\Http\HttpConstants::ZED_HTTPS_PORT` - sets the HTTPS port for Zed;
- `\Spryker\Shared\Http\HttpConstants::ZED_TRUSTED_PROXIES` - sets an array of trusted proxies for Zed;
- `\Spryker\Shared\Http\HttpConstants::ZED_TRUSTED_HEADER` - sets a trusted header for Zed requests;
- `\Spryker\Shared\Http\HttpConstants::ZED_TRUSTED_HOSTS` - sets a list of trusted hosts for Zed;
- `\Spryker\Shared\Http\HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED` - use this option to enable or disable the *HTTP Strict-Transport-Security* header for Zed (*disabled* by default);
- `\Spryker\Shared\Http\HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG` - sets the body of the *HTTP Strict-Transport-Security* header for Zed.
