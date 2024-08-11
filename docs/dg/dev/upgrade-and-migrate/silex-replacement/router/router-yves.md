---
title: Router Yves
description: The article provides instructions on how to install the extension module along with the router and integrate it then in Yves.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/router-yves
originalArticleId: d8b857cc-0e43-4be9-891a-a57afdbe1d2b
redirect_from:
- /docs/scos/dev/migration-concepts/silex-replacement/router/router-yves.html
related:
  - title: Router Zed
    link: docs/scos/dev/migration-concepts/silex-replacement/router/router-zed.html
---

The Router is responsible for matching a request to a route and generating URLs based on a route name. The Spryker's Route module is based on the Symfony's Routing component. For more information on it, check out the [documentation](https://symfony.com/doc/current/routing.html).

## Modules

You can find the list of all the modules related to the service below:

* Router - `spryker/router`
* RouterExtension - `spryker/router-extension`

### Installation

For information on the installation, see [Migration Guide - Router](/docs/dg/dev/upgrade-and-migrate/silex-replacement/upgrade-modules/upgrade-the-router-module.html).

### RouterDependencyProvider

#### RouterPlugins

Routers are added to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouterPlugins()` method. Spryker provides two build-in routers:

* `\Spryker\Yves\Router\Plugin\Router\YvesRouterPlugin` - this is the main router which is required for Yves routing.
* `\Spryker\Yves\Router\Plugin\Router\ZedDevelopmentRouterPlugin` - this router is not required and is only a fallback router for development.

### RouteProviderPlugins

`RouteProviderPlugins` are added to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method. See detailed information about extension points below.

### Configure router per environment

The Router can be configured with the following `\Spryker\Yves\Router\RouterEnvironmentConfigConstantsYves` options:

* `\Spryker\Shared\Router\RouterConstants::YVES_IS_CACHE_ENABLED` - use this option to enable/disable the cache. By default, it is enabled.
* `\Spryker\Shared\Router\RouterConstants::YVES_CACHE_PATH` - use this option if you want to change the path to the generated cache files.
* `\Spryker\Shared\Router\RouterConstants::YVES_IS_SSL_ENABLED` - use this option to enable/disable the Router's SSL capabilities.
* `\Spryker\Shared\Router\RouterConstants::YVES_SSL_EXCLUDED_ROUTE_NAMES` - use this option to disable SSL for the specific route names when SSL is enabled.

For further information, check out the specifications for the Router.

### Configure router

Additionally, you also have the option to configure the Symfony Router with `\Spryker\Yves\Router\RouterConfig::getRouterConfiguration()`.

Check `\Symfony\Component\Routing\Router::setOptions()` to see what you can use. Basically, you do not have to change this configuration, but if you need to, you can.

### Extending router

The Router can be extended in many ways. To add additional functionality, there is a `RouterExtension` module which is installed automatically with the `spryker/router` module.

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

<details open>
<summary markdown='span'>\Spryker\Yves\RouterExtension\Dependency\Plugin\RouterEnhancerPluginInterface</summary>

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
</details>

Use this plugin to hook into the match and to generate processes of the Router.

## Console commands

The Router module provides the following console commands:

* `\Spryker\Yves\Router\Plugin\Console\RouterDebugZedConsole` - lists all routes and can be used to see detailed information about each route.
* `\Spryker\Yves\Router\Plugin\Console\RouterCacheWarmUpConsole` - can be used to warm or refresh the generated cache files.

## Route manipulator plugins

These plugins are used to manipulate the `Route` after it was added to the `RouteCollection` with `\Spryker\Yves\Router\Route\RouteCollection::add()`.

### LanguageDefaultPostAddRouteManipulatorPlugin

This plugin adds the default language to every `Route`.

### SslPostAddRouteManipulatorPlugin

This plugin ensures that all `Route`s have a scheme set. Whether the `Route` should use `http` or `https` is determined by `\Spryker\Yves\Router\RouterConfig::isSslEnabled()` and `\Spryker\Yves\Router\RouterConfig::getSslExcludedRouteNames()`.

### StoreDefaultPostAddRouteManipulatorPlugin

This plugin adds the default store to every `Route`.

## Router enhancer plugins

These plugins can be used in three stages of the Router lifecycle.

1. `RouterEnhancerPluginInterface::beforeMatch()`
2. `RouterEnhancerPluginInterface::afterMatch()`
3. `RouterEnhancerPluginInterface::afterGenerate()`

#### BeforeMatch

This method is executed before the Router tries to match it to a `Route`. As mentioned earlier, `Route`s have a defined URL, for example, `/cart`. Suppose your shop allows a language prefix in the URL's, so the current URL will be `/en/cart`. In this case, to match `/en/cart` to the defined `/cart`, we need to manipulate this URL information before the `Router` tries to match it. The `RouterEnhancer` plugin needs to remember the extracted information for later processing.

#### AfterMatch

This method is executed after the `Router` was able to match an incoming URL to a `Route`. To forward all necessary information that was extracted in the `RouterEnhancerPluginInterface::beforeMatch()` to the application, this method adds the information to the `Route` parameters.

#### AfterGenerate

This method is executed after the `Router` was able to generate a URL by its name. The `Router` is able to generate URL's by a route name, for example, `cart`. The Router would now return you the defined URL for it, for example, `/cart`. If your shop works with a language prefix in the URLs, you need to get a different URL generated, in our case `/en/cart`. This is done in the `RouterEnhancerPluginInterface::afterGenerate()` method.

### LanguagePrefixRouterEnhancerPlugin

This plugin is responsible for extracting the current language name from an incoming URL, to add the current language to the `Route` parameters, and to prefix the generated URLs with the current language.

Through the `\Spryker\Yves\Router\RouterConfig::getAllowedLanguages()` configuration, you tell this plugin what languages it has to work with.

### QueryStringRouterEnhancerPlugin

This plugin is responsible for adding the previously used query parameters to the newly generated URLs. All current query parameters are added to every generated URL.

### StorePrefixRouterEnhancerPlugin

This plugin is responsible for extracting the current store name from an incoming URL, for adding the current store name to the `Route` parameters, and for prefixing the generated URL's with the current store name.

Through the `\Spryker\Yves\Router\RouterConfig::getAllowedStores()` configuration, you tell this plugin what store names it has to work with.
