---
title: Migration guide - ErrorHandler
description: Use the guide to perform the ErrorHandler part of the Silex Migration Effort.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-errorhandler
originalArticleId: 2f18956f-5d59-4c50-b225-4634052c02c3
redirect_from:
  - /2021080/docs/migration-guide-errorhandler
  - /2021080/docs/en/migration-guide-errorhandler
  - /docs/migration-guide-errorhandler
  - /docs/en/migration-guide-errorhandler
  - /v5/docs/migration-guide-errorhandler
  - /v5/docs/en/migration-guide-errorhandler
  - /v6/docs/migration-guide-errorhandler
  - /v6/docs/en/migration-guide-errorhandler
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-errorhandler.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-errorhandler.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-errorhandler.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:
```bash
composer update spryker/error-handler
```
2. Remove the old service providers, if you have them in the project:
```php
\Spryker\Shared\ErrorHandler\Plugin\ServiceProvider\WhoopsErrorHandlerServiceProvider
```
3. Add new plugins to the dependency providers:

**Zed Integration**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\ErrorHandler\Communication\Plugin\Application\ErrorHandlerApplicationPlugin;

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
            new ErrorHandlerApplicationPlugin(),
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
use Spryker\Yves\ErrorHandler\Plugin\Application\ErrorHandlerApplicationPlugin;

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
            new ErrorHandlerApplicationPlugin(),
            ...
        ];
    }
    ...
}
```

4. Update the `config_*.php` file:
```php
// Replace
$config[ApplicationConstants::IS_PRETTY_ERROR_HANDLER_ENABLED] = true;

// with
$config[ErrorHandlerConstants::IS_PRETTY_ERROR_HANDLER_ENABLED] = true;
```
