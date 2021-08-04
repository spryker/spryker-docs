---
title: Injecting Dependencies within Factories- Container Globals
originalLink: https://documentation.spryker.com/v2/docs/container-globals
redirect_from:
  - /v2/docs/container-globals
  - /v2/docs/en/container-globals
---

The `ContainerGlobals` is a way to inject dependencies which are available inside your [Factories](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/factory/factory). Every dependency added to the `ContainerGlobals` is available by using `getProvidedDependency()` in your factory.

To add something globally you need to create a service provider and add it to the bootstrap of your application.

```php
<?php

namespace ProjectName\Application\Bundle\ServiceProvider;

use Silex\Application;
use Silex\ServiceProviderInterface;
use Spryker\Shared\Kernel\ContainerGlobals;

class YourServiceProvider implements ServiceProviderInterface
{

    /**
     * @param \Silex\Application $app
     *
     * @return void
     */
    public function register(Application $app)
    {
        $containerGlobals = new ContainerGlobals();
        $containerGlobals[KEY_FOR_GLOBAL_DEPENDENCY] = $containerGlobals->share(function () use () {
            return new ProjectName\Global\Dependency();
        });
    }
    ...
}
```

To access this global dependency, call `$this->getProvidedDependency(KEY_FOR_GLOBAL_DEPENDENCY)` inside your factory. `FormFactoryServiceProvider` gives you a full example on how to add a `FormFactory` that’s available to all of your [factories](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/factory/factory) With this approach you can define such dependencies once, instead of defining them each time for each module that uses them.
