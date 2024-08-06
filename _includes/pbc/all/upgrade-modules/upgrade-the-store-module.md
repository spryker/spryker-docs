

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

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
