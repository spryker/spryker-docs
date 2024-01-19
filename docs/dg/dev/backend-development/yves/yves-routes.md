---
title: Yves routes
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-yves-routes
originalArticleId: 163c596a-1229-4345-b524-e404420531aa
redirect_from:
  - /docs/scos/dev/back-end-development/yves/yves-routes.html
related:
  - title: Yves overview
    link: docs/scos/dev/back-end-development/yves/yves.html
  - title: Add translations for Yves
    link: docs/scos/dev/back-end-development/yves/adding-translations-for-yves.html
  - title: CLI entry point for Yves
    link: docs/scos/dev/back-end-development/yves/cli-entry-point-for-yves.html
  - title: Controllers and actions
    link: docs/scos/dev/back-end-development/yves/controllers-and-actions.html
  - title: Implement URL routing in Yves
    link: docs/scos/dev/back-end-development/yves/implement-url-routing-in-yves.html
  - title: Modular Frontend
    link: docs/scos/dev/back-end-development/yves/modular-frontend.html
  - title: Yves bootstrapping
    link: docs/scos/dev/back-end-development/yves/yves-bootstrapping.html
---

Whenever you need to create a new controller, you need to define a path where it's available. To do that, register your controllers for a specific path (or in other words, create a new route definition) in a route.

Have a look at `ApplicationRouteProviderPlugin` and see how it registers two controllers in the `Application` module:

```php
<?php
namespace Pyz\Yves\Application\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class ApplicationRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    public const ROUTE_NAME_HOME = 'home';
    public const ROUTE_NAME_IMPRINT = 'imprint';

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
        $routeCollection = $this->addHomeRoute($routeCollection);
        $routeCollection = $this->addImprintRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addHomeRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/', 'HomePage', 'Index', 'indexAction');
        $routeCollection->add(static::ROUTE_NAME_HOME, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addImprintRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/', 'Application', 'Static', 'imprintAction');
        $routeCollection->add(static::ROUTE_NAME_IMPRINT, $route);

        return $routeCollection;
    }
}
```

Here the `IndexController` and `StaticController` are connected in the `Application` module to the `paths /` and `/imprint`. The last argument is the action name, which is defaulted to index.

Note that in the example `AbstractRouteProviderPlugin` is extended, which helps to get the URL prefix in the mounting process, but this is optional to use. If you want to register your controller providers, you only need to implement `Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface` for your class and mount your routes.

The mounting process happens in `RouterDependencyProvider`. The example assumes that the used `Route` providers extend `AbstractRouteProviderPlugin`.

After adding a new route, clear the route cache `vendor/bin/yves router:cache:warm-up`.

```php
<?php
/**
 * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
 */
protected function getRouteProvider()
{
    return [
        new ApplicationRouteProviderPlugin(),
        new CheckoutPageRouteProviderPlugin(),
        // ...
    ];
}
```

## Routers

Routers are responsible for finding a matching controller action for each request. Spryker uses Symfony's `ChainRouter` to chain multiple routers which means that each router is executed after each other, and the first, which finds a matching path, resolves the request.

By default we provide three routers:

* *The `YvesRouterPlugin` router: Tries to match the path with the registered `RouteProviders`.
* The `StorageRouterPlugin` router: Tries to match the path with the key-value storage (Redis).
* The default `YvesDevelopmentRouterPlugin` router: Tries to match the path with the registered `RouteProviders`.

If you want to add a new router, add it to `RouterDependencyProvider` but make sure you do it in the right ordering.

```php
<?php
/**
* @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouterPluginInterface[]
*/
protected function getRouterPlugins(): array
{
    return [
        new YvesRouterPlugin(),
        new StorageRouterPlugin(),
        // This router will only be hit, when no other router was able to match/generate.
        new YvesDevelopmentRouterPlugin(),
    ];
}
```
