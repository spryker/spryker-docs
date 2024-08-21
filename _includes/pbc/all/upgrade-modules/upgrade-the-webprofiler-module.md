

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

```bash
composer update spryker/web-profiler
```

2. Remove old service providers, if you have them in the project:

```php
\SprykerShop\Yves\WebProfilerWidget\Plugin\ServiceProvider\WebProfilerWidgetServiceProvider
\Spryker\Shared\WebProfiler\Plugin\ServiceProvider\WebProfilerServiceProvider
```

3. Add new plugins to dependency providers:

**Zed integration**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\WebProfiler\Communication\Plugin\Application\WebProfilerApplicationPlugin;

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
            new WebProfilerApplicationPlugin(),
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
use SprykerShop\Yves\WebProfiler\Plugin\Application\WebProfilerApplicationPlugin;

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
            new WebProfilerApplicationPlugin(),
            ...
        ];
    }
     ...
}
```

4. Enable additional plugins:

**Form Zed integration**

```php
<?php

namespace Pyz\Zed\Form;

use Spryker\Zed\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Zed\WebProfiler\Communication\Plugin\Form\WebProfilerFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    /**
     * @return \Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface[]
     */
    protected function getFormPlugins(): array
    {
        return [
            ...
            new WebProfilerFormPlugin(),
            ...
        ];
    }
}
```

**Twig Zed integration**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use Spryker\Zed\WebProfiler\Communication\Plugin\Twig\WebProfilerTwigLoaderPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        return [
            ...
            new WebProfilerTwigLoaderPlugin(),
            ...
        ];
    }
}
```

**WebProfiler Zed integration**

```php
<?php

namespace Pyz\Zed\WebProfiler;

use Spryker\Zed\Config\Communication\Plugin\WebProfiler\WebProfilerConfigDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerAjaxDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerConfigDataCollectorPlugin as SymfonyWebProfilerConfigDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerEventsDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerExceptionDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerLoggerDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerMemoryDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerRequestDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerRouterDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerTimeDataCollectorPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\WebProfiler\WebProfilerTwigDataCollectorPlugin;
use Spryker\Zed\WebProfiler\WebProfilerDependencyProvider as SprykerWebProfilerDependencyProvider;

class WebProfilerDependencyProvider extends SprykerWebProfilerDependencyProvider
{
    /**
     * @return \Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface[]
     */
    public function getDataCollectorPlugins(): array
    {
        return [
            new WebProfilerRequestDataCollectorPlugin(),
            new WebProfilerRouterDataCollectorPlugin(),
            new WebProfilerAjaxDataCollectorPlugin(),
            new SymfonyWebProfilerConfigDataCollectorPlugin(),
            new WebProfilerConfigDataCollectorPlugin(),
            new WebProfilerEventsDataCollectorPlugin(),
            new WebProfilerExceptionDataCollectorPlugin(),
            new WebProfilerLoggerDataCollectorPlugin(),
            new WebProfilerMemoryDataCollectorPlugin(),
            new WebProfilerTimeDataCollectorPlugin(),
            new WebProfilerTwigDataCollectorPlugin(),
        ];
    }
}
```

**Form Yves integration**

```php
<?php

namespace Pyz\Yves\Form;

use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use SprykerShop\Yves\WebProfilerWidget\Plugin\Form\WebProfilerFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    /**
     * @return \Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface[]
     */
    protected function getFormPlugins(): array
    {
        return [
            ...
            new WebProfilerFormPlugin(),
            ...
        ];
    }
}
```

**Twig Yves integration**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\WebProfilerWidget\Plugin\Twig\WebProfilerTwigLoaderPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        return [
            ...
            new WebProfilerTwigLoaderPlugin(),
            ...
        ];
    }
}
```

**WebProfiler Yves integration**

```php
<?php

namespace Pyz\Yves\WebProfilerWidget;

use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerAjaxDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerConfigDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerConfigDataCollectorPlugin as SymfonyWebProfilerConfigDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerEventsDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerExceptionDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerLoggerDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerMemoryDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerRequestDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerRouterDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerTimeDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\WebProfiler\WebProfilerTwigDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider as SprykerWebProfilerDependencyProvider;

class WebProfilerWidgetDependencyProvider extends SprykerWebProfilerDependencyProvider
{
    /**
     * @return \Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface[]
     */
    public function getDataCollectorPlugins()
    {
        return [
            new WebProfilerRequestDataCollectorPlugin(),
            new WebProfilerRouterDataCollectorPlugin(),
            new WebProfilerAjaxDataCollectorPlugin(),
            new SymfonyWebProfilerConfigDataCollectorPlugin(),
            new WebProfilerConfigDataCollectorPlugin(),
            new WebProfilerEventsDataCollectorPlugin(),
            new WebProfilerExceptionDataCollectorPlugin(),
            new WebProfilerLoggerDataCollectorPlugin(),
            new WebProfilerMemoryDataCollectorPlugin(),
            new WebProfilerTimeDataCollectorPlugin(),
            new WebProfilerTwigDataCollectorPlugin(),
        ];
    }
}
```
