---
title: Yves Routes
originalLink: https://documentation.spryker.com/v4/docs/t-yves-routes
redirect_from:
  - /v4/docs/t-yves-routes
  - /v4/docs/en/t-yves-routes
---

Whenever you need to create a new controller, you’ll need to define a path where it’s available. To do that, register your controllers for a specific path (or in other words, create a new route definition) in a route.

Have a look at the `ApplicationRouteProviderPlugin` and see how it registers two controllers in the `Application` module.

```php
<?php
namespace Pyz\Yves\Application\Plugin\Provider;
 
use Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider;
use Silex\Application;
 
class ApplicationRouteProviderPlugin extends AbstractYvesControllerProvider
{
    protected const ROUTE_HOME = 'home';
    protected const ROUTE_IMPRINT = 'imprint';
    
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
        $routeCollection = $this->addImpintRoute($routeCollection);
        
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
        $routeCollection->add(static::ROUTE_HOME, $route);

        return $routeCollection;
    }
    
    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addImpintRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/', 'Application', 'Static', 'imprintAction');
        $routeCollection->add(static::ROUTE_IMPRINT, $route);

        return $routeCollection;
    }
}
```

Here we connect the `IndexController` and `StaticController` in the `Application` module to the `paths /` and `/imprint`. The last argument is the action name, which is default to index.

Note that we are extending `AbstractRouteProviderPlugin` in the example which helps to get the URL prefix in the mounting process, but this is optional to use. If you want to register your controller providers, you only need to implement `Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface` for your class and mount your controller providers.

The mounting process happens in `RouterDependencyProvider`. The example assumes that the `Controller` providers we use extend the `AbstractRouteProviderPlugin`.

After adding a new route, clear the route cache `vendor/bin/console router:cache:warm-up`.

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
Routers are responsible for finding a matching controller action for each request. Spryker uses Symfony’s `ChainRouter` to chain multiple routers which means that each router will be executed after each other, and the first, which finds a matching path, will resolve the request.

By default we provide three routers:

1. The first router is the `YvesRouterPlugin`, which tries to match the path with the registered `RouteProviders`.

2. The second one is the `StorageRouterPlugin`, which tries to match the path with the key-value storage (Redis).

3. The third one is the default `YvesDevelopmentRouterPlugin`, which tries to match the path with the registered `RouteProviders`.

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
