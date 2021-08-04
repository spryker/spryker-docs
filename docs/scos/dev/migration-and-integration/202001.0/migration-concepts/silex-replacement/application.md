---
title: Application
originalLink: https://documentation.spryker.com/v4/docs/application
redirect_from:
  - /v4/docs/application
  - /v4/docs/en/application
---

## Application and Application Extension
Previously, we used the Silex Microframework and its Service Provider capabilities to implement Symfony components and bootstrap our application. Silex is abandoned, and we are in the process of refactoring it out.

We added a shared Spryker Application and an ApplicationExtension module to be able to add Application Plugins to the new Application. The `Spryker\Shared\Application\Application` accepts the `ContainerInterface` as a dependency. When the latest version of `spryker/silex` is installed, the `ContainerInterface` performs the functions of `Silex\Application`.

The Application class is responsible for booting and running the application. The boot process is split into several steps. In the beginning, all Application Plugins are registered with the bootable ones being separated for later usage in the boot process.

In the Application Plugin registration process, the `ContainerInterface` is filled with all the services the application requires. In the boot process, all Application Plugins which implement `Spryker\Shared\ApplicationExtention\Dependency\Plugin\BootableApplicationPluginInterface` are booted.

HttpKernel handles the run process in the following way:

1. A request object is created from the globals.
2. The response is returned.
3. The process is terminated.

## How to Add Application Plugins
Like all plugins in Spryker,  Application Plugins are added within their corresponding Dependency Providers. Each application provided by Spryker has a `getApplicationPlugins()` method which needs to be overridden inside the project namespace and returns a stack of `Spryker\Shared\ApplicationExtention\Dependency\Plugin\ApplicationPluginInterfaces`. All plugins returned from this method are added to the application.

## How to Extend Application Plugins
We expect that there will be no reason to extend Application Plugins. Every Application Plugin brings a "service" into the application. Previously, it was possible to add several Service Providers to the application which were responsible for configuring and booting one of those services. For example, the Twig service had a couple of Service Providers to properly configure and construct it. There was a Service Provider which brought a service with its default configuration and other Service Providers which were to change the configuration, add or change functionality etc.

With the new Application Plugins, this will no longer be supported. Instead, all modules which provide services will have their corresponding Extension modules. For example, Twig and its TwigExtension module. The Twig module brings a Twig Application Plugin in which the Twig service is added to the Container. Also, the Twig Application Plugin contains extension points for the Twig service.
