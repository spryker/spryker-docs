---
title: Router Zed
originalLink: https://documentation.spryker.com/v3/docs/router-zed-201907
redirect_from:
  - /v3/docs/router-zed-201907
  - /v3/docs/en/router-zed-201907
---

The Router is responsible for matching a request to a route and generating URLs based on a route name. The Spryker's Route module is based on the Symfony's Routing component; for more information on it, check out the [documentation](https://symfony.com/doc/current/routing.html).

## Modules

You can find the list of all the modules related to the service below:

* Router - `spryker/router`
* RouterExtension - `spryker/router-extension`

### Installation

Run this command to install the extension module along with the router:

```
composer require spryker/router
```

## Integration

To be able to use the Router, add `RouterApplicationPlugin` of the `spryker/router` module to your `ApplicationDependencyProvider.`

#### Zed integration

```
<?php
 
namespace Pyz\Zed\Application;
 
use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Router\Communication\Plugin\Application\RouterApplicationPlugin;
 
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
 
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new RouterApplicationPlugin(),
            ...
        ];
    }
 
    ...
}
```

## Configure Router per Environment

The Router can be configured with the following RouterConstants options:

* `\Spryker\Zed\Router\RouterConstants::ZED_IS_CACHE_ENABLED` - use this option to enable/disable the cache. By default, it is enabled.
* `\Spryker\Zed\Router\RouterConstants::ZED_CACHE_PATH` - use this if you want to change the path to the generated cache files.
* `\Spryker\Zed\Router\RouterConstants::ZED_IS_SSL_ENABLED` - use this to enable/disable Router's SSL capabilities. 
* `\Spryker\Zed\Router\RouterConstants::ZED_SSL_EXCLUDED_ROUTE_NAMES` - use this to disable SSL for the specific route names when SSL is enabled.

For further information, check out the specifications for the Router.

## Configure Router 

Additionally, you also have the option to configure the Symfony Router with `\Spryker\Zed\Router\RouterConfig::getRouterConfiguration(). `

Check `\Symfony\Component\Routing\Router::setOptions()` to see what you can use. Basically, you do not have to change this configuration, but if you need to, you can.

## Extending Router

The Router can be extended in many ways. To be able to add additional functionality, there is a RouterExtension module which is installed automatically with the *spryker/router* module.

The extension module offers the following interface:

**\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface**

```
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

This plugin can be used to add a project specific Router to the ChainRouter. The returned router must implement `\Symfony\Component\Routing\RouterInterface`.
