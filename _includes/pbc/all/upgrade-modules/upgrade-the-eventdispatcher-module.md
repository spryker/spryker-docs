

## Upgrading to version 1.1.2

Version 1.1.2 boosts the overall Zed and Glue performance by introducing a [cache of unresolved entities for Zed](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#activate-resolvable-class-names-cache).

To upgrade to the new version of the module, enable the following plugins:

For Glue:

```php
<?php

namespace Pyz\Glue\EventDispatcher;

use Spryker\Glue\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\EventDispatcher\GlueRestControllerListenerEventDispatcherPlugin;
use Spryker\Glue\Kernel\Plugin\EventDispatcher\AutoloaderCacheEventDispatcherPlugin;
use Spryker\Glue\Router\Plugin\EventDispatcher\RouterListenerEventDispatcherPlugin;
use Spryker\Glue\Storage\Plugin\EventDispatcher\StorageKeyCacheEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new GlueRestControllerListenerEventDispatcherPlugin(),
            new StorageKeyCacheEventDispatcherPlugin(),
            new AutoloaderCacheEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
        ];
    }
}
```

For Zed:

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

That's it! You've upgraded the `EventDispatcher` module to 1.1.2 version.

---

{% info_block errorBox %}

The following migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).
{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:

```bash
composer update spryker/event-dispatcher
```

2. Add new plugins to the dependency providers:

**Zed integration**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\EventDispatcher\Communication\Plugin\Application\EventDispatcherApplicationPlugin;

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
            new EventDispatcherApplicationPlugin(),
            ...
        ];
    }
    ...
}
```

**Yves integration**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\EventDispatcher\Plugin\Application\EventDispatcherApplicationPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    ...

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new EventDispatcherApplicationPlugin(),
            ...
        ];
    }

    ...
}
```

**Glue integration**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\EventDispatcher\Plugin\Application\EventDispatcherApplicationPlugin;

class ShopApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    ...

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new EventDispatcherApplicationPlugin(),
            ...
        ];
    }
    ...
}
```

3. Enable additional plugins:

**EventDispatcher Zed integration**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\Acl\Communication\Plugin\EventDispatcher\AccessControlEventDispatcherPlugin;
use Spryker\Zed\Api\Communication\Plugin\EventDispatcher\ApiControllerEventDispatcherPlugin;
use Spryker\Zed\Application\Communication\Plugin\EventDispatcher\HeadersSecurityEventDispatcherPlugin;
use Spryker\Zed\Auth\Communication\Plugin\EventDispatcher\AuthorizationEventDispatcherPlugin;
use Spryker\Zed\Auth\Communication\Plugin\EventDispatcher\RedirectAfterLoginEventDispatcherPlugin;
use Spryker\Zed\EventBehavior\Communication\Plugin\EventDispatcher\EventBehaviorEventDispatcherPlugin;
use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\CookieEventDispatcherPlugin;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\FragmentEventDispatcherPlugin;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\HeaderEventDispatcherPlugin;
use Spryker\Zed\Http\Communication\Plugin\EventDispatcher\HstsHeaderEventDispatcher;
use Spryker\Zed\Locale\Communication\Plugin\EventDispatcher\LocaleEventDispatcherPlugin;
use Spryker\Zed\Monitoring\Communication\Plugin\EventDispatcher\MonitoringRequestTransactionEventDispatcherPlugin;
use Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RequestAttributesEventDispatcherPlugin;
use Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RouterListenerEventDispatcherPlugin;
use Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RouterLocaleEventDispatcherPlugin;
use Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RouterSslRedirectEventDispatcherPlugin;
use Spryker\Zed\Session\Communication\Plugin\EventDispatcher\SaveSessionEventDispatcherPlugin;
use Spryker\Zed\Session\Communication\Plugin\EventDispatcher\SessionEventDispatcherPlugin;
use Spryker\Zed\Twig\Communication\Plugin\EventDispatcher\TwigEventDispatcherPlugin;
use Spryker\Zed\ZedRequest\Communication\Plugin\EventDispatcher\GatewayControllerEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new AuthorizationEventDispatcherPlugin(),
            new AccessControlEventDispatcherPlugin(),
            new EventBehaviorEventDispatcherPlugin(),
            new GatewayControllerEventDispatcherPlugin(),
            new HeadersSecurityEventDispatcherPlugin(),
            new LocaleEventDispatcherPlugin(),
            new MonitoringRequestTransactionEventDispatcherPlugin(),
            new RedirectAfterLoginEventDispatcherPlugin(),
            new RouterLocaleEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
            new RouterSslRedirectEventDispatcherPlugin(),
            new CookieEventDispatcherPlugin(),
            new FragmentEventDispatcherPlugin(),
            new HeaderEventDispatcherPlugin(),
            new HstsHeaderEventDispatcher(),
            new TwigEventDispatcherPlugin(),
            new SessionEventDispatcherPlugin(),
            new SaveSessionEventDispatcherPlugin(),
            new ApiControllerEventDispatcherPlugin(),
            new RequestAttributesEventDispatcherPlugin(),
        ];
    }
}
```

**EventDispatcher Yves integration**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\Application\Communication\Plugin\EventDispatcher\HeadersSecurityEventDispatcherPlugin;
use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Yves\Http\Plugin\EventDispatcher\CookieEventDispatcherPlugin;
use Spryker\Yves\Http\Plugin\EventDispatcher\FragmentEventDispatcherPlugin;
use Spryker\Yves\Http\Plugin\EventDispatcher\HeaderEventDispatcherPlugin;
use Spryker\Yves\Http\Plugin\EventDispatcher\HstsHeaderEventDispatcher;
use Spryker\Yves\Kernel\Plugin\EventDispatcher\AutoloaderCacheEventDispatcherPlugin;
use Spryker\Yves\Locale\Plugin\EventDispatcher\LocaleEventDispatcherPlugin;
use Spryker\Yves\Monitoring\Plugin\EventDispatcher\MonitoringRequestTransactionEventDispatcherPlugin;
use Spryker\Yves\Router\Plugin\EventDispatcher\RouterListenerEventDispatcherPlugin;
use Spryker\Yves\Router\Plugin\EventDispatcher\RouterLocaleEventDispatcherPlugin;
use Spryker\Yves\Router\Plugin\EventDispatcher\RouterSslRedirectEventDispatcherPlugin;
use Spryker\Yves\Session\Plugin\EventDispatcher\SessionEventDispatcherPlugin;
use Spryker\Yves\Storage\Plugin\EventDispatcher\StorageCacheEventDispatcherPlugin;
use SprykerShop\Yves\ErrorPage\Plugin\EventDispatcher\ErrorPageEventDispatcherPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\ShopApplicationEventDispatcherPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\ShopApplicationExceptionEventDispatcherPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\ShopApplicationFilterControllerEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new ErrorPageEventDispatcherPlugin(),
            new HeadersSecurityEventDispatcherPlugin(),
            new LocaleEventDispatcherPlugin(),
            new RouterLocaleEventDispatcherPlugin(),
            new ShopApplicationEventDispatcherPlugin(),
            new ShopApplicationFilterControllerEventDispatcherPlugin(),
            new ShopApplicationExceptionEventDispatcherPlugin(),
            new LocaleEventDispatcherPlugin(),
            new RouterLocaleEventDispatcherPlugin(),
            new HeadersSecurityEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
            new RouterSslRedirectEventDispatcherPlugin(),
            new CookieEventDispatcherPlugin(),
            new FragmentEventDispatcherPlugin(),
            new HeaderEventDispatcherPlugin(),
            new HstsHeaderEventDispatcher(),
            new StorageCacheEventDispatcherPlugin(),
            new MonitoringRequestTransactionEventDispatcherPlugin(),
            new AutoloaderCacheEventDispatcherPlugin(),
            new SessionEventDispatcherPlugin(),
        ];
    }
}
```

**EventDispatcher Glue integration**

```php
<?php

namespace Pyz\Glue\EventDispatcher;

use Spryker\Glue\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\EventDispatcher\GlueRestControllerListenerEventDispatcherPlugin;
use Spryker\Glue\Kernel\Plugin\EventDispatcher\AutoloaderCacheEventDispatcherPlugin;
use Spryker\Glue\Router\Plugin\EventDispatcher\RouterListenerEventDispatcherPlugin;
use Spryker\Glue\Storage\Plugin\EventDispatcher\StorageKeyCacheEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new GlueRestControllerListenerEventDispatcherPlugin(),
            new StorageKeyCacheEventDispatcherPlugin(),
            new AutoloaderCacheEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
        ];
    }
}
```
