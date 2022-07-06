---
title: Migration guide - Store
description: Use the guide to perform the Store part of the Silex Migration Effort.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-store
originalArticleId: 966422fb-ce27-4afa-a754-f12d9fcec18b
redirect_from:
  - /2021080/docs/migration-guide-store
  - /2021080/docs/en/migration-guide-store
  - /docs/migration-guide-store
  - /docs/en/migration-guide-store
  - /v5/docs/migration-guide-store
  - /v5/docs/en/migration-guide-store
  - /v6/docs/migration-guide-store
  - /v6/docs/en/migration-guide-store
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-store.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-store.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-store.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

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
