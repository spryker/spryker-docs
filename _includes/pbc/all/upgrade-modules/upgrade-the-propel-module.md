

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade *Propel*, do the following:

1. Install a new module using Composer:

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
