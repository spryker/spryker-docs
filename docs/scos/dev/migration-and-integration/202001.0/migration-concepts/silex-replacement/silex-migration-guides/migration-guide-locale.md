---
title: Migration Guide - Locale
description: Use the guide to perform the Locale part of the Silex Migration Effort.
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-locale
originalArticleId: c910e1a3-b0aa-4813-ae61-9c89d10559f4
redirect_from:
  - /v4/docs/migration-guide-locale
  - /v4/docs/en/migration-guide-locale
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:
```bash
composer update spryker/locale
```
2. Add new plugins to dependency providers:

**Zed Integration**

```php
<?php
 
namespace Pyz\Zed\Application;
 
use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleApplicationPlugin;
 
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
            new LocaleApplicationPlugin(),
            ...
        ];
    }
 
    ...
}
```

**Yves Integration**

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\Locale\Plugin\Application\LocaleApplicationPlugin;
 
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
            new LocaleApplicationPlugin(),
            ...
        ];
    }
 
    ...
}
```

3. Enable additional plugins:

**EventDispatcher Zed Integration**

```php
<?php
 
namespace Pyz\Zed\EventDispatcher;
 
use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\EventDispatcher\LocaleEventDispatcherPlugin;
 
class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new LocaleEventDispatcherPlugin(),
            ...
        ];
    }
}
```

**EventDispatcher Yves Integration**

```php
<?php
 
namespace Pyz\Yves\EventDispatcher;
 
use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Yves\Locale\Plugin\EventDispatcher\LocaleEventDispatcherPlugin;
 
class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new LocaleEventDispatcherPlugin(),
            ...
        ];
    }
}
```
