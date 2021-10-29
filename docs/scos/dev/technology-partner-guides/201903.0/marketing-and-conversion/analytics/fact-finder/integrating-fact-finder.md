---
title: Integrating FACT-Finder
description: This article provides details on how to integrate Fact Finder modules into the Spryker project.
template: howto-guide-template
---

## Prerequisites

To integrate with FACT-Finder, you will need your FACT-Finder account. If you do not have a FACT-Finder account, please contact [FACT-Finder](http://www.fact-finder.de/).


## FactFinder Module

To use Spryker's FactFinder module in your project:

1. Add a new module to `Pyz\Yves\ namespace` and create a controller provider:

```php
<?php


namespace Pyz\Yves\FactFinderGui\Plugin\Provider;

use Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider;
use Silex\Application;

class FactFinderGuiControllerProvider extends AbstractYvesControllerProvider
{

    const ROUTE_FACT_FINDER = 'fact-finder';
    const ROUTE_FACT_FINDER_SEARCH = 'fact-finder-search';
    const ROUTE_FACT_FINDER_TRACK = 'fact-finder-track';

    /**
     * @param \Silex\Application $app
     *
     * @return void
     */
    protected function defineControllers(Application $app)
    {
        $allowedLocalesPattern = $this->getAllowedLocalesPattern();

        $this->createController('/{factfinder}', self::ROUTE_FACT_FINDER, 'FactFinder', 'Search', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');

        $this->createController('/{factfinder}/suggestions', self::ROUTE_FACT_FINDER_SEARCH, 'FactFinder', 'Suggestions', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');

        $this->createController('/{factfinder}/track', self::ROUTE_FACT_FINDER_TRACK, 'FactFinder', 'Track', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');

        $this->createController('/{factfinder}/recommendations', self::ROUTE_FACT_FINDER_RECOMMENDATIONS, 'FactFinder', 'Recommendations', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');
    }

}
```

2. Then add the created controller provider to `YvesBootsrap` file:    Expand a code sample   

```php
<?php

namespace Pyz\Yves\Application;

...
use Pyz\Yves\FactFinderGui\Plugin\Provider\FactFinderGuiControllerProvider;
...

class YvesBootstrap
{
    ...
    /**
     * @param bool|null $isSsl
     *
     * @return \Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            ...
            new FactFinderGuiControllerProvider($isSsl),
            ...
        ];
    }
    ...
}
```
3. Copy the config example from `vendor/spryker-eco/fact-finder-sdk/config/config_default.php.dist` to your project config file.

## FactFinderSdk Module

To use the `FactFindeSdk` module directly in your module, you have to add a client to your dependency provider.

**To add a client to the dependency provider, do the following:**:

1. Add to the dependency provider:  

```php
<?php

...

use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class YourBundleDependencyProvider extends AbstractBundleDependencyProvider
{

    const FACT_FINDER_SDK_CLIENT = 'FACT_FINDER_SDK_CLIENT';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = $this->provideClients($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function provideClients(Container $container)
    {
        $container[self::FACT_FINDER_SDK_CLIENT] = function () use ($container) {
            return $container->getLocator()
                ->factFinderSdk()
                ->client();
        };

        return $container;
    }

}
```
2. Add it to your factory:

```php
<?php

...

use Spryker\Yves\Kernel\AbstractFactory;

class YourBundleFactory extends AbstractFactory
{

    ...

    /**
     * @return \SprykerEco\Client\FactFinderSdk\FactFinderSdkClient
     */
    public function getFactFinderClient()
    {
        return $this->getProvidedDependency(FactFinderDependencyProvider::FACT_FINDER_SDK_CLIENT);
    }

    ...

}
```
