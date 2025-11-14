---
title: Dependency injection
description: Spryker's dependency injection is based on the Symfony Dependency Injection component. It lets you inject dependencies via service configuration and autowiring.
last_updated: Nov 5, 2025
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/dependency-injection
originalArticleId: 8c24a5f6-f45a-4ff5-838f-b25712309bd0
redirect_from:
  - /docs/scos/dev/architecture/dependency-injection.html
related:
  - title: How to upgrade to Symfony Dependency Injection
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html
  - title: Bundles
    link: docs/dg/dev/architecture/symfony-bundles.html
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Programming concepts
    link: docs/dg/dev/architecture/programming-concepts.html
  - title: Technology stack
    link: docs/dg/dev/architecture/technology-stack.html
  - title: Modules and layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
---

Spryker uses the [Symfony Dependency Injection component](https://symfony.com/doc/current/components/dependency_injection.html) to manage dependencies in your application. This allows you to use the "Symfony way" of injecting dependencies via service configuration and autowiring, while still keeping the existing Spryker way of dependency injection via Factories and Dependency Providers.

This document describes how to use the Symfony Dependency Injection component in your project.

## Service configuration

You can configure your services in one of the following files:

- `config/Symfony/{APPLICATION}/services.php`
- `config/Symfony/{APPLICATION}/services.yml`
- `config/Symfony/{APPLICATION}/ApplicationServices.php`
- `config/Symfony/{APPLICATION}/*Services.php`

We recommend following the Symfony standard for configuring your container setup. For details, see [Service Container](https://symfony.com/doc/current/service_container.html) in the Symfony documentation.

A project-level `ApplicationServices.php` file can be used to discover and register your services automatically. Here is an example of how you can configure it:

`config/Symfony/{APPLICATION}/ApplicationServices.php`

```php
<?php

/**
 * This is an example configuration that can be used inside a project to tell Symfony which services it has to make
 * available through the Dependency Injection Container. It automatically loads all services from all project modules,
 * except for the ones that are explicitly excluded in the $excludedModuleConfiguration array.
 * 
 * You can also write your custom solution as it is explained in the Symfony documentation.
 * 
 * @see https://symfony.com/doc/current/service_container.html
 */

declare(strict_types = 1);

use Spryker\Service\Container\ProxyFactory;
use Spryker\Zed\ModuleFinder\Business\ModuleFinderFacade;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    /**
     * Make ProxyFactory available in the DIC. The Proxy is used to be able to lazy load services which are not known to
     * the ContainerBuilder at compile time. The Container is compiled based on this configuration file, so services from modules
     * that are not included here will not be available at runtime unless they are proxied.
     */
    $services->set(ProxyFactory::class)->public();

    /**
     * Configuration array to exclude specific modules or specific applications within modules from being loaded into the DIC.
     * If a module is fully excluded, it will not be loaded at all. If only specific applications within a module are to be excluded,
     * the module name is the key and the value is an array with application names as keys and exclusion patterns as values.
     */
    $excludedModuleConfiguration = [
        'DataImport' => true,
        'ProductPageSearch' => true,
        'ProductStorage' => true,
        'PriceProductStorage' => true,
        'UrlStorage' => true,
        'DocumentationGeneratorRestApi' => true,
    ];

    /**
     * Find all on the project level defined modules, including code bucket ones as well. The ModuleFinder also takes care of
     * filtering out modules that are not relevant for the current environment.
     *
     * F.e. In a dev environment you want to include all modules (composer:require-dev is installed), while in a production
     * environment you don't have all modules available but code in your project that extends it for such cases the compilation
     * process would fail if those modules are not found.
     */
    $moduleFinder = new ModuleFinderFacade();
    $projectModules = $moduleFinder->getProjectModules();

    foreach ($projectModules as $moduleTransfer) {
        /**
         * Skip excluded modules entirely when configured in the `$excludedModuleConfiguration`.
         */
        if (isset($excludedModuleConfiguration[$moduleTransfer->getName()]) && !is_array($excludedModuleConfiguration[$moduleTransfer->getName()])) {
            continue;
        }

        // Organization may be Pyz, or any of on the project level defined ones
        $organization = $moduleTransfer->getOrganization()->getName();

        foreach ($moduleTransfer->getApplications() as $applicationTransfer) {
            // If you want to exclude specific applications within a module, you can skip them here.
            //
            // Example:
            //
            // if ($applicationTransfer->getApplication() === 'UnwantedApplication') {
            //    continue;
            // }

            $namespace = sprintf('%s\\%s\\', $organization, $applicationTransfer->getName());

            /**
             * Here is the path built to the services directory of the module for the specific application.
             * 
             * This path structure is based on the standard Spryker project structure.
             */
            $path = sprintf(
                '../../../src/%s/%s/%s/',
                $organization,
                $applicationTransfer->getName(),
                $moduleTransfer->getName(),
            );

            /**
             * This is the important part: Load all services from the module's application services directory into the DIC.
             * 
             * You can also only use this line instead of the whole code in this file. But then you would have to make sure
             * that all modules you want to be available in the DIC are included manually here, which is not the preferred way.
             */
            $services->load($namespace, $path);
        }
    }
};

```

### Autowiring

You can use autowiring to automatically inject dependencies into your services. For details, see [Autowiring](https://symfony.com/doc/current/service_container/autowiring.html) in the Symfony documentation.

Since Spryker's core modules are not yet using the Symfony Dependency Injection component, you can't autowire classes from the core. You need to manually add them to your service configuration if you want to inject core dependencies.

## Compiling the container

To compile the container, you have two options:

- On every request to the application, the Kernel checks if a compiled container already exists. If not, or if the cache is outdated, it generates a new one. (perfect in dev mode)
- Run the following command to build the cache. The application then immediately uses the freshly compiled container.

```bash
console container:build
```

## How Dependency Injection is triggered

Dependency injection is activated when a service is first requested from the container. For instance, if a controller is defined as a service in the container, the container instantiates it. If this controller's constructor has arguments (dependencies), the container automatically injects the required services. This process continues down the dependency chain.

If a class is not defined as a service in the container, it will be instantiated the classic Spryker way, and no dependencies will be injected.

## Using services

Once the container is compiled, you can use your services in your application. You can inject them into your controllers, and other services via constructor injection.

### Controller example

Here is an example of how to inject a service into a controller.

First, define your controller and inject the service using constructor property promotion:

`src/Pyz/Yves/MyModule/Controller/IndexController.php`

```php
<?php

namespace Pyz\Yves\MyModule\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Pyz\Yves\MyModule\MyService;

class IndexController extends AbstractController
{
    public function __construct(private MyService $myService)
    {
    }

    public function indexAction()
    {
        $data = $this->myService->getSomeData();

        return $this->view(
            '@MyModule/views/index/index.twig',
            ['data' => $data]
        );
    }
}
```

Because we configured service discovery for the `Pyz\Yves\MyModule` namespace in `config/ApplicationServices.php` and autowiring is enabled, MyService will be available in the Container when requested.


### Model/Service example

Here is an example of a service with a dependency on a repository.

`src/Pyz/Yves/MyModule/SomeService.php`

```php
<?php

namespace Pyz\Yves\MyModule;

class SomeService
{
    public function findData(): array
    {
        // some logic to fetch data
        return ['foo' => 'bar'];
    }
}
```

`src/Pyz/Yves/MyModule/MyService.php`

```php
<?php

namespace Pyz\Yves\MyModule;

class MyService
{
    public function __construct(private SomeService $someService)
    {
    }

    public function getSomeData(): array
    {
        return $this->someService->findData();
    }
}
```

Because we configured service discovery for the `Pyz\Yves\MyModule` namespace in `config/Symfony/{APPLICATION}/ApplicationServices.php` and autowiring is enabled, `SomeService` is automatically injected into `MyService`.

## Related documentation

For detailed guidance on implementing and using Dependency Injection in your Spryker project, see:

- [Implementation and usage](/docs/dg/dev/architecture/dependency-injection/implementation-and-usage.html) - Detailed examples of manual wiring, using core classes, and the `getService()` pattern
- [Troubleshooting](/docs/dg/dev/architecture/dependency-injection/troubleshooting.html) - Common issues and debugging techniques
- [Best practices](/docs/dg/dev/architecture/dependency-injection/best-practices.html) - Recommendations for DI vs Factory pattern, avoiding anti-patterns, and performance optimization

## Next steps

- [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- [Symfony Bundles in Spryker](/docs/dg/dev/architecture/symfony-bundles.html)
