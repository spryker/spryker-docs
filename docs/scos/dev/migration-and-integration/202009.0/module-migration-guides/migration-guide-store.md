---
title: Migration Guide - Store
description: Use the guide to perform the Store part of the Silex Migration Effort.
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-store
redirect_from:
  - /v6/docs/migration-guide-store
  - /v6/docs/en/migration-guide-store
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](https://documentation.spryker.com/docs/silex-replacement).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:
```bash
composer update spryker/store
```
2. Add new plugins to dependency providers:


```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\Store\Plugin\Application\StoreApplicationPlugin;
 
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
            new StoreApplicationPlugin(),
            ...
        ];
    }
     ...
}
```

