---
title: Implementing URL Routing in Yves
originalLink: https://documentation.spryker.com/v1/docs/yves-url-routing
redirect_from:
  - /v1/docs/yves-url-routing
  - /v1/docs/en/yves-url-routing
---

The words contained in an URL play a major factor for search engine to determine if the page is relevant for a specific search query. The URL routing is a mechanism used to map URLs to the code that gets executed when a specific request is being submitted. URL routing makes URLs more human readable and SEO friendly.

**To implement URL Routing in Yves**:

**Scenario**: We need to route requests made on `URL /hello` to the action `helloAction(Request $request)` implemented in the `DemoController`.

To route this request, create a plugin that extends `AbstractRouteProviderPlugin` in the module where the controller is defined, under the `Plugin/Router` folder. `AbstractRouteProviderPlugin` enables setting up the HTTP method used (GET or POST) when setting up the new route. 

```php
<?php
protected function buildGetRoute(string $path, string $moduleName, string $controllerName, string $actionName = 'indexAction'): Route
protected function buildPostRoute(string $path, string $moduleName, string $controllerName, string $actionName = 'indexAction'): Route
protected function buildRoute(string $path, string $moduleName, string $controllerName, string $actionName = 'indexAction'): Route
```

In the new created plugin which implements `AbstractRouteProviderPlugin`, you must implement the route in the `addRoutes(RouteCollection $routeCollection): RouteCollection` operation.

```php
<?php
use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    protected static ROUTE_HELLO = 'hello';
    
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

Activate the plugin in `Pyz\Yves\Route\RouterDependencyProvider::getRouteProvider(): array`:

```php
protected function getRouteProvider(): array
	{
		return [
		   //...
			new HelloRouteProvider($isSsl),
		];
	}
```

You can now access <http://mysprykershop.com/hello> in your browser to make a request using the newly configured route.
