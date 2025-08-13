---
title: Integrating FACT-Finder
description: This article provides details on how to integrate Fact Finder modules into the Spryker project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/fact-finder-integration-into-project
originalArticleId: 1bd158d4-9fd7-4a62-9665-577d5347a754
redirect_from:
  - /docs/scos/dev/technology-partner-guides/201907.0/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - /docs/scos/dev/technology-partner-guides/202212.0/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - /docs/scos/dev/technology-partner-guides/202311.0/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
related:
  - title: Installing and configuring FACT-Finder
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
  - title: Installing and configuring FACT-Finder web components
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder-web-components.html
  - title: Installing and configuring FACT-Finder NG API
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-the-fact-finder-ng-api.html
  - title: Using FACT-Finder campaigns
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-campaigns.html
  - title: Exporting product data for FACT-Finder
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/exporting-product-data-for-fact-finder.html
  - title: Using FACT-Finder search
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - title: Using FACT-Finder recommendation engine
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - title: Using FACT-Finder tracking
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
  - title: Using FACT-Finder search suggestions
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search-suggestions.html
---

## Prerequisites

To integrate with FACT-Finder, you will need your FACT-Finder account. If you do not have a FACT-Finder account,  contact [FACT-Finder](http://www.fact-finder.de/).
Make sure, that FactFinder modules were [installed and configured](/docs/pbc/all/miscellaneous/{{page.version}}/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html) before proceeding with the integration.

### FactFinder Module

To use Spryker's FactFinder module in your project:

1. Add a new module to `Pyz\Yves\ namespace` and create a route provider:

```php
<?php

namespace Pyz\Yves\FactFinderGui\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class FactFinderGuiRouteProviderPlugin extends AbstractRouteProviderPlugin
{

    public const ROUTE_NAME_FACT_FINDER = 'fact-finder';
    public const ROUTE_NAME_FACT_FINDER_SEARCH = 'fact-finder-search';
    public const ROUTE_NAME_FACT_FINDER_TRACK = 'fact-finder-track';
    public const ROUTE_FACT_FINDER_RECOMMENDATIONS = 'fact-finder-recommendations';

    /**
     * Specification:
     * - Adds Routes to the RouteCollection.
     *
     * @api
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/factfinder', 'FactFinder', 'Search', 'index');
        $routeCollection->add(static::ROUTE_NAME_FACT_FINDER_SEARCH, $route);

        $route = $this->buildRoute('/factfinder/suggestions', 'FactFinder', 'Suggestions', 'index');
        $routeCollection->add(static::ROUTE_NAME_FACT_FINDER_SEARCH, $route);

        $route = $this->buildRoute('/factfinder/track', 'FactFinder', 'Track', 'index');
        $routeCollection->add(static::ROUTE_NAME_FACT_FINDER_TRACK, $route);

        $route = $this->buildRoute('/factfinder/recommendations', 'FactFinder', 'Recommendations', 'index');
        $routeCollection->add(static::ROUTE_FACT_FINDER_RECOMMENDATIONS, $route);

        return $routeCollection;
    }
}
```

2. Then add the created route provider to the `RouterDependencyProvider` file:    Expand a code sample

```php
<?php

namespace Pyz\Yves\Router;

// ...
use Pyz\Yves\FactFinderGui\Plugin\Router\FactFinderGuiRouteProviderPlugin;
// ...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    // ...
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new FactFinderGuiRouteProviderPlugin(),
            // ...
        ];
    }
    // ...
}
```

3. Copy the config example from `vendor/spryker-eco/fact-finder-sdk/config/config_default.php.dist` to your project config file.

### FactFinderSdk Module

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
