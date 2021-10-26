---
title: Migration Guide - ErrorHandler
description: Use the guide to perform the ErrorHandler part of the Silex Migration Effort.
last_updated: Aug 27, 2020
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-errorhandler
originalArticleId: 2bb33bff-6211-4dfb-bc70-6cffa1712d66
redirect_from:
  - /v6/docs/migration-guide-errorhandler
  - /v6/docs/en/migration-guide-errorhandler
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
