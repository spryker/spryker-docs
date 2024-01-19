---
title: Implement URL routing in Yves
description: URL routing lets you map URLs to the code that gets executed when a specific request is being submitted. URL routing makes URLs more human-readable and SEO friendly.
last_updated: Sep 2, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/yves-url-routing
originalArticleId: cf881c42-2422-4c51-a9c8-557b101edb06
redirect_from:
  - /docs/scos/dev/back-end-development/yves/implement-url-routing-in-yves.html
related:
  - title: Yves overview
    link: docs/scos/dev/back-end-development/yves/yves.html
  - title: Add translations for Yves
    link: docs/scos/dev/back-end-development/yves/adding-translations-for-yves.html
  - title: CLI entry point for Yves
    link: docs/scos/dev/back-end-development/yves/cli-entry-point-for-yves.html
  - title: Controllers and actions
    link: docs/scos/dev/back-end-development/yves/controllers-and-actions.html
  - title: Modular Frontend
    link: docs/scos/dev/back-end-development/yves/modular-frontend.html
  - title: Yves bootstrapping
    link: docs/scos/dev/back-end-development/yves/yves-bootstrapping.html
  - title: Yves routes
    link: docs/scos/dev/back-end-development/yves/yves-routes.html
---

The words contained in an URL play a major factor for a search engine to determine if the page is relevant for a specific search query. URL routing is a mechanism used to map URLs to the code that gets executed when a specific request is being submitted. URL routing makes URLs more human-readable and SEO-friendly.

To implement URL Routing in Yves, follow these steps per scenario:

**Scenario 1:** You need to route requests made on `URL /hello` to the action `helloAction(Request $request)` implemented in the `DemoController`.

To route the preceding request, follow these steps:

1. Create a plugin that extends `AbstractRouteProviderPlugin` in the module where the controller is defined, under the `Plugin/Router` folder. `AbstractRouteProviderPlugin` enables setting up the HTTP method used (GET or POST) when setting up the new route.

```php
<?php
protected function buildGetRoute(string $path, string $moduleName, string $controllerName, string $actionName = 'indexAction'): Route
protected function buildPostRoute(string $path, string $moduleName, string $controllerName, string $actionName = 'indexAction'): Route
protected function buildRoute(string $path, string $moduleName, string $controllerName, string $actionName = 'indexAction'): Route
```

2. In the new created plugin, which extends `AbstractRouteProviderPlugin`, implement the route in the `addRoutes(RouteCollection $routeCollection): RouteCollection` operation:

```php
<?php
use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;

class HelloRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    private const ROUTE_HELLO = 'hello';

    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = $this->addHelloRoute($routeCollection);

        return $routeCollection;
    }

    protected function addHelloRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/hello', 'Demo', 'Demo', 'helloAction');
        $routeCollection->add(static::ROUTE_HELLO, $route);

        return $routeCollection;
    }
}
```

3. Activate the plugin in `Pyz\Yves\Route\RouterDependencyProvider::getRouteProvider(): array`:

```php
protected function getRouteProvider(): array
{
    return [
        //...
        new HelloRouteProvider($isSsl),
    ];
}
```

4. To make a request using the newly configured route in your browser, open `http://mysprykershop.com/hello`

**Scenario 2:** You need to route requests made on `URL /hello/{name}` to the action `helloAction(Request $request)` implemented in `DemoController`, which generates different content based on the value of the `name` parameter.

To add a route with parameters, follow these steps:
1. You can use curly braces syntax:

```php
<?php
use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
class HelloRouteProvider extends AbstractRouteProviderPlugin
{
    private const ROUTE_HELLO = 'hello';

    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = $this->addHelloRoute($routeCollection);

        return $routeCollection;
    }

    protected function addHelloRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/hello/{name}', 'Demo', 'Demo', 'helloAction');
        $routeCollection->add(static::ROUTE_HELLO, $route);

        return $routeCollection;
    }
}
```

2. Use this parameter in the controller:

```php
public function helloAction(Request $request)
{
    $name = $request->attributes->get('name');
}
```

3. Open `http://mysprykershop.com/hello/spryker` to make a request using the newly configured route with the `name` parameter having its value set to `spryker`.
