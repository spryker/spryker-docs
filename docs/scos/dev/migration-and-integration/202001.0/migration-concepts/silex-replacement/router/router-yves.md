---
title: Router Yves
originalLink: https://documentation.spryker.com/v4/docs/router-yves
redirect_from:
  - /v4/docs/router-yves
  - /v4/docs/en/router-yves
---

The Router is responsible for matching a request to a route and generating URLs based on a route name. The Spryker's Route module is based on the Symfony's Routing component. For more information on it, check out the [documentation](https://symfony.com/doc/current/routing.html){target="_blank"}.

## Modules

You can find the list of all the modules related to the service below:

* Router - `spryker/router`
* RouterExtension - `spryker/router-extension`

### Installation

For more information on the installtion, see Migration Guide - Router. <!-- add a link -->

### RouterDependencyProvider
#### RouterPlugins
Routers are added to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouterPlugins()` method. Spryker provides two build-in routers:

* `\Spryker\Yves\Router\Plugin\Router\ZedRouterPlugin` - This is the main router which is required for Zed routing.
* `\Spryker\Yves\Router\Plugin\Router\ZedDevelopmentRouterPlugin` - This router is not required and is only a fallback router for development.

### RouteProviderPlugins
`RouteProviderPlugins` are added to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method. See detailed information about extension points below.

### Configure Router per Environment
The Router can be configured with the following `\Spryker\Yves\Router\RouterEnvironmentConfigConstantsYves` options:

* `\Spryker\Shared\Router\RouterConstants::YVES_IS_CACHE_ENABLED` - use this option to enable/disable the cache. By default, it is enabled.
* `\Spryker\Shared\Router\RouterConstants::YVES_CACHE_PATH` - use this if you want to change the path to the generated cache files.
* `\Spryker\Shared\Router\RouterConstants::YVES_IS_SSL_ENABLED` - use this to enable/disable the Router's SSL capabilities.
* `\Spryker\Shared\Router\RouterConstants::YVES_SSL_EXCLUDED_ROUTE_NAMES` - use this to disable SSL for the specific route names when SSL is enabled.

For further information, check out the specifications for the Router.

### Configure Router 
Additionally, you also have the option to configure the Symfony Router with `\Spryker\Yves\Router\RouterConfig::getRouterConfiguration()`. 

Check `\Symfony\Component\Routing\Router::setOptions()` to see what you can use. Basically, you do not have to change this configuration, but if you need to, you can.

### Extending Router
The Router can be extended in many ways. To be able to add additional functionality, there is a `RouterExtension` module which is installed automatically with the `spryker/router` module.

The extension module offers the following interfaces:

**\Spryker\Yves\RouterExtension\Dependency\Plugin\RouterPluginInterface**

```php
<?php
 
namespace Spryker\Yves\RouterExtension\Dependency\Plugin\Router;
 
use Spryker\Service\Container\ContainerInterface;
use Twig\Environment;
 
interface RouterPluginInterface
{
    /**
     * Specification:
     * - Returns a RouterInterface which is added to the ChainRouter.
     *
     * @api
     *
     * @return \Symfony\Component\Routing\RouterInterface
     */
    public function getRouter(): RouterInterface;
}
```

This plugin is used to add a project-specific Router to the `ChainRouter`. The returned router must implement `\Symfony\Component\Routing\RouterInterface`.

**\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface**

```php
<?php
 
namespace Spryker\Yves\RouterExtension\Dependency\Plugin\Router;
 
use Spryker\Service\Container\ContainerInterface;
use Twig\Environment;
 
interface RouteProviderPluginInterface
{
    /**
     * Specification:
     * - Adds routes to the RouteCollection.
     * - Returns a RouteCollection.
     *
     * @api
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection;
}
```

This plugin is used to provide routes to a router. There is `\Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin` that can be extended in all modules that need to add routes.

`AbstractPlugin` provides convenient methods to add routes to your Application. 

**\Spryker\Yves\RouterExtension\Dependency\Plugin\PostAddRouteManipulatorPluginInterface**

```php
<?php
 
namespace Spryker\Yves\RouterExtension\Dependency\Plugin\Router;
 
use Spryker\Service\Container\ContainerInterface;
use Twig\Environment;
 
interface PostAddRouteManipulatorPluginInterface
{
    /**
     * Specification:
     * - Returns a manipulated Route.
     *
     * @api
     *
     * @param string $routeName
     * @param \Symfony\Component\Routing\Route $route
     *
     * @return \Symfony\Component\Routing\Route
     */
    public function manipulate(string $routeName, Route $route): Route;
}
```

Use this class when you need to manipulate all routes at once without refactoring each part of the code, where routes are created. Every route, which is added to `RouteCollection`, will be manipulated with all the attached `\Spryker\Yves\RouterExtension\Dependency\Plugin\PostAddRouteManipulatorPluginInterface's`. Imagine you need all your URLs to have a prefix or suffix (e.g. `/{store}/url-to-something/{locale}`) instead of adding `{store}` and `{locale}` to all routes manually. In this case, you just add a manipulator that does that for you.

**\Spryker\Yves\RouterExtension\Dependency\Plugin\RouterEnhancerPluginInterface**

```php
<?php
 
namespace Spryker\Yves\RouterExtension\Dependency\Plugin;
 
use Symfony\Component\Routing\RequestContext;
 
interface RouterEnhancerPluginInterface
{
    /**
     * Specification:
     * - Returns a manipulated pathinfo.
     * - Can be used to e.g. remove optional prefix from pathinfo.
     *
     * Symfony's routing component doesn't allow to have optional URL parameter before non-optional ones.
     *
     * We need to allow projects to use optional arguments in the URL e.g. `/{store}/{locale}/foo-bar`.
     * The configured route will only have an URL like `/foo-bar` without the optional arguments but we need to be able
     * to match an incoming route like `/de/de/foo-bar` to the configured one.
     *
     * This method will "normalize" the incoming URL to be matchable.
     *
     * @api
     *
     * @param string $pathinfo
     * @param \Symfony\Component\Routing\RequestContext $requestContext
     *
     * @return string
     */
    public function beforeMatch(string $pathinfo, RequestContext $requestContext): string;
 
    /**
     * Specification:
     * - Adds additional information to the matched $parameters.
     *
     * @api
     *
     * @param array $parameters
     * @param \Symfony\Component\Routing\RequestContext $requestContext
     *
     * @return array
     */
    public function afterMatch(array $parameters, RequestContext $requestContext): array;
 
    /**
     * Specification:
     * - Returns a manipulated url after it was generated.
     * - Can be used to e.g. add an optional argument to the URL.
     *
     * Symfony's routing component doesn't allow to have optional URL parameter before non-optional ones.
     *
     * We need to allow projects to use optional arguments in the URL e.g. `/{store}/{locale}/foo-bar`.
     * The configured route will only have an URL like `/foo-bar` with a route name e.g. `foo-bar`. After the generator
     * was able to generate an URL by the given route name we need to add the optional arguments to
     * return an URL like `/de/de/foo-bar`.
     *
     * This method will "normalize" the outgoing URL after it was generated.
     *
     * @api
     *
     * @param string $url
     * @param \Symfony\Component\Routing\RequestContext $requestContext
     * @param int $referenceType
     *
     * @return string
     */
    public function afterGenerate(string $url, RequestContext $requestContext, int $referenceType): string;
}
```

Use this plugin to hook into the match and the generate processes of the Router. 

## Console Commands
The Router module provides the following console commands:

* `\Spryker\Yves\Router\Plugin\Console\RouterDebugZedConsole` - This command lists all routes and can be used to see detailed information about each route.
* `\Spryker\Yves\Router\Plugin\Console\RouterCacheWarmUpConsole` - This command can be used to warm or refresh the generated cache files.
