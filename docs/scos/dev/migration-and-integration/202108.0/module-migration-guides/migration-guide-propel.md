---
title: Migration Guide - Propel
description: Use the guide to perform the Propel part of the Silex Migration Effort.
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-propel
redirect_from:
  - /2021080/docs/migration-guide-propel
  - /2021080/docs/en/migration-guide-propel
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](https://documentation.spryker.com/docs/silex-replacement).

{% endinfo_block %}

To upgrade *Propel*, do the following:

1. Install a new module using composer:
```bash
composer require spryker/propel
```

2. Remove old service providers, if you have them in the project:
```php
\Spryker\Zed\Propel\Communication\Plugin\ServiceProvider\PropelServiceProvider
```

3. Add new plugins to dependency providers:
```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        $applicationPlugins[] = new PropelApplicationPlugin();

        return $applicationPlugins;
    }
}
```

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new PropelApplicationPlugin(),
        ];
    }
}
```
