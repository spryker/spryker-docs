---
title: Injecting dependencies within factories- container globals
description: The ContainerGlobals is a way to inject dependencies which are available inside your Factories.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/container-globals
originalArticleId: 10d83649-13dc-43f2-833d-be3c6882069f
redirect_from:
  - /2021080/docs/container-globals
  - /2021080/docs/en/container-globals
  - /docs/container-globals
  - /docs/en/container-globals
  - /v6/docs/container-globals
  - /v6/docs/en/container-globals
  - /v5/docs/container-globals
  - /v5/docs/en/container-globals
  - /v4/docs/container-globals
  - /v4/docs/en/container-globals
  - /v3/docs/container-globals
  - /v3/docs/en/container-globals
  - /v2/docs/container-globals
  - /v2/docs/en/container-globals
  - /v1/docs/container-globals
  - /v1/docs/en/container-globals
---

The `ContainerInterface` provides a way to make dependencies globally available. Every dependency added to `ContainerInterface`, that is marked as `isGlobal`, is available by using `getProvidedDependency()` in your factory.

To add something globally you need to add the dependency to the `ContainerInterface` and mark it as global.

```php
<?php

namespace ProjectName\Application\Bundle\ApplicationPlugin;

use \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;

class YourApplicationPlugin implements ApplicationPluginInterface
{
    /**
     * {@inheritDoc}
     * - Adds global service.
     *
     * @api
     *
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container->set('Your service name', function () {
            return new YourService();
        });

        $container->configure('Your service name', ['isGlobal' => true]);
    }
    ...
}
```

To access this global dependency, call `$this->getProvidedDependency('Your service name')` inside your factory. With this approach, you can define such dependencies once instead of defining them each time for each module that uses them.

