---
title: Migration Guide - Messenger
description: Use the guide to perform the Messenger part of the Silex Migration Effort.
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-messenger
originalArticleId: f29de7bd-4c9c-422a-9e91-89db100698ba
redirect_from:
  - /2021080/docs/migration-guide-messenger
  - /2021080/docs/en/migration-guide-messenger
  - /docs/migration-guide-messenger
  - /docs/en/migration-guide-messenger
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-and-integration/{{page.version}}/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:
```bash
composer update spryker/messenger
```

2. Remove old service providers, if you have them in the project:
```php
\Spryker\Yves\Messenger\Plugin\Provider\FlashMessengerServiceProvider
\Spryker\Zed\Messenger\Communication\Plugin\ServiceProvider\MessengerServiceProviderx
```
3. Add  new plugins to  dependency providers:

**Zed Integration**

```php
<?php
 
namespace Pyz\Zed\Application;
 
use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Messenger\Communication\Plugin\Application\MessengerApplicationPlugin;
 
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
            new MessengerApplicationPlugin(),
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
use Spryker\Yves\Messenger\Plugin\Application\MessengerApplicationPlugin;
 
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
            new MessengerApplicationPlugin(),
            ...
        ];
    }
 
    ...
}
```
