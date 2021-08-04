---
title: Router Zed
originalLink: https://documentation.spryker.com/2021080/docs/router-zed
redirect_from:
  - /2021080/docs/router-zed
  - /2021080/docs/en/router-zed
---

The Router is responsible for matching a request to a route and generating URLs based on a route name. The Spryker's Route module is based on the Symfony's Routing component; for more information on it, check out the [documentation](https://symfony.com/doc/current/routing.html).

## Modules

You can find the list of all the modules related to the service below:

* Router - `spryker/router`
* RouterExtension - `spryker/router-extension`

### Installation

For information on the installtion, see [Migration Guide - Router](https://documentation.spryker.com/docs/migration-guide-router). 

Additionally, you need to add the following plugins to the `\Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider`:

* `\Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RouterListenerEventDispatcherPlugin`
* `\Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RouterSslRedirectEventDispatcherPlugin`

### Configure Router per Environment
The Router can be configured with the following `RouterEnvironmentConfigConstantsZed` options:

* `\Spryker\Zed\Router\RouterConstants::ZED_IS_CACHE_ENABLED` - use this option to enable/disable the cache. By default, it is enabled.
* `\Spryker\Zed\Router\RouterConstants::ZED_CACHE_PATH` - use this if you want to change the path to the generated cache files.
* `\Spryker\Zed\Router\RouterConstants::ZED_IS_SSL_ENABLED` - use this to enable/disable Router's SSL capabilities. 
* `\Spryker\Zed\Router\RouterConstants::ZED_SSL_EXCLUDED_ROUTE_NAMES` - use this to disable SSL for the specific route names when SSL is enabled.

For further information, check out the specifications for the Router.

### RouterDependencyProvider
#### RouterPlugins
Routers are added to the `\Pyz\Zed\Router\RouterDependencyProvider::getRouterPlugins()` method. Spryker provides two build-in routers:

* `\Spryker\Zed\Router\Communication\Plugin\Router\ZedRouterPlugin` - This is the main router which is required for Zed routing.
* `\Spryker\Zed\Router\Communication\Plugin\Router\ZedDevelopmentRouterPlugin` - This router is not required and is only a fallback router for development.

#### RouterEnhancerPlugins
Additionally, you can add `\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterEnhancerPluginInterfaces` to the `\Pyz\Zed\Router\RouterDependencyProvider::getRouterEnhancerPlugins()` method.

For detailed information about it have a look into the `\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterEnhancerPluginInterface` interface.

### Configure Router 
Additionally, you also have the option to configure the Symfony Router with `\Spryker\Zed\Router\RouterConfig::getRouterConfiguration()`. 

Check `\Symfony\Component\Routing\Router::setOptions()` to see what you can use. Basically, you do not have to change this configuration, but if you need to, you can.

### Extending Router
The Router can be extended in many ways. To be able to add additional functionality, there is a `RouterExtension` module which is installed automatically with the `spryker/router` module.

The extension module offers the following interface:

**\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface**

```php
<?php
 
namespace Spryker\Zed\RouterExtension\Dependency\Plugin\Router;
 
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

This plugin can be used to add a project specific Router to the `ChainRouter`. The returned router must implement `\Symfony\Component\Routing\RouterInterface`.

### Use Controller from 3rd party
If you want to use 3rd party Controller,  e.g. from `spryker-eco` and alike you need to add the path where the controller can be found to the `\Pyz\Zed\Router\RouterConfig::getControllerDirectories()` method. Paths added to this method will be scanned for controllers. Found controllers will be added to the route cache.

## Console Commands
The Router module provides the following console commands:

* `\Spryker\Zed\Router\Communication\Plugin\Console\RouterDebugZedConsole` - This command lists all routes and can be used to see detailed information about each route.
* `\Spryker\Zed\Router\Communication\Plugin\Console\RouterCacheWarmUpConsole` - This command can be used to warm or refresh the generated cache files.
