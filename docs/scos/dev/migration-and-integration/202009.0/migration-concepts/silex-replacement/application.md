---
title: Application
originalLink: https://documentation.spryker.com/v6/docs/application
redirect_from:
  - /v6/docs/application
  - /v6/docs/en/application
---

Previously, we had used Silex service providers to implement Symfony components and bootstrap the application. Since Silex had been abandoned, we refactored it out. 

We added a shared Spryker *application* and an `ApplicationExtension` module to be able to add application plugins to the new application. The `Spryker\Shared\Application\Application` accepts the `ContainerInterface` as a dependency. When the latest version of `spryker/silex` is installed, the `ContainerInterface` performs the functions of `Silex\Application`.

The Application class is responsible for booting and running the application. The boot process is split into several steps. In the beginning, all Application Plugins are registered and the bootable ones are separated for later usage in the boot process.

In the Application Plugin registration process, the `ContainerInterface` is filled with all the services the application requires. In the boot process, all Application Plugins which implement `Spryker\Shared\ApplicationExtention\Dependency\Plugin\BootableApplicationPluginInterface` are booted.

HttpKernel handles the run process in the following way:

1. A request object is created from the globals.
2. The response is returned.
3. The process is terminated.

## Adding Application Plugins
Like all plugins in Spryker,  Application Plugins are added within their corresponding Dependency Providers. Each application provided by Spryker has a `getApplicationPlugins()` method which needs to be overridden inside the project namespace and returns a stack of `Spryker\Shared\ApplicationExtention\Dependency\Plugin\ApplicationPluginInterfaces`. All the plugins returned from this method are added to the application.

## Extending Application Plugins

Each service added as an Application plugin has an extension interface. To extend a service, use the extension interface of the respective service. For example, The `Twig` module contains `TwigApplicationPlugin`. The `TwigExtension` module brings at least one interface that can be used to extend Twig. To extend it, add `TwigApplicationPlugin` to `ApplicationDependencyProvider`. To extend Twig further, add a plugin to `TwigDependencyProvider`.

You can still extend services via Service providers. 

## Retrieving an Application Services
You may need to retrieve application services, for example, to generate URLs in one of your models. In your dependency provider, you have access to all Application services through the container.

```php
*DependencyProvider

/**
 * @uses \Spryker\Yves\Router\Plugin\Application\RouterApplicationPlugin::SERVICE_ROUTER
 */
protected const SERVICE_ROUTER = 'routers';

...

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
protected function addRouterService(Container $container)
{
    $container->set(static::SERVICE_ROUTER, function (Container $container) {
       return $container->getApplicationService(static::SERVICE_ROUTER);
    });
     
    return $container;
}
```

This makes the required Application service available within your factory.

```php
*Factory

...

public function getRouterService(): ChainRouter
{
    return $this->getProvidedDependency(*DependencyProvider::SERVICE_ROUTER);
}
```
