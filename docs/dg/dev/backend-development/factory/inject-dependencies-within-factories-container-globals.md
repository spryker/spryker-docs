---
title: "Inject dependencies within factories: Container globals"
description: ContainerGlobals lets you inject dependencies available inside your factories.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/factory/inject-dependencies-within-factories-container-globals.html
  - /docs/scos/dev/back-end-development/factory/injecting-dependencies-within-factories-container-globals.html
related:
  - title: Factory
    link: docs/dg/dev/backend-development/factory/factory.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


The `ContainerInterface` provides a way to make dependencies globally available. Every dependency added to `ContainerInterface`, that is, marked as `isGlobal`, is available by using `getProvidedDependency()` in your factory.

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

To access this global dependency, inside your factory, call `$this->getProvidedDependency('Your service name')`. With this approach, you can define such dependencies once instead of defining them each time for each module that uses them.
