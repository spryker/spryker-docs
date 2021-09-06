---
title: Migration Guide - Locale
description: Use the guide to perform the Locale part of the Silex Migration Effort.
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-locale
originalArticleId: 60dc3af3-45ae-49f4-b2f2-48ec00e611dd
redirect_from:
  - /v6/docs/migration-guide-locale
  - /v6/docs/en/migration-guide-locale
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

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
