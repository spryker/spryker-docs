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
    link: docs/dg/dev/architecture/bundles.html
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

You can configure your services in the following files:

- `config/services.php`
- `config/services.yml`
- `config/ApplicationServices.php`
- `config/*Services.php`

We recommend following the Symfony standard for configuring your container setup. For details, see [Service Container](https://symfony.com/doc/current/service_container.html) in the Symfony documentation.

A project-level `ApplicationServices.php` file can be used to discover and register your services automatically. Here is an example of how you can configure it:

`config/ApplicationServices.php`

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Spryker\Service\Container\ProxyFactory;
use Spryker\Zed\ModuleFinder\Business\ModuleFinderFacade;
use Spryker\Shared\ModuleFinder\Transfer\Organization;
use Spryker\Shared\ModuleFinder\Transfer\ModuleFilter;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    $services->set(ProxyFactory::class)->public();

    $excludedModuleConfiguration = [
        'DataImport' => true,
        'ProductPageSearch' => true,
        'ProductStorage' => true,
        'PriceProductStorage' => true,
        'UrlStorage' => true,
        'DocumentationGeneratorRestApi' => true,
    ];

    $organization = new Organization();
    $organization->setName('Pyz');

    $moduleFilter = new ModuleFilter();
    $moduleFilter->setOrganization($organization);

    $moduleFinder = new ModuleFinderFacade();
    $projectModules = $moduleFinder->getProjectModules($moduleFilter);

    foreach ($projectModules as $moduleTransfer) {
        // Fully excluded Modules: The $excludedModuleConfiguration has the module name as the key but no further exclude configuration.
        if (isset($excludedModuleConfiguration[$moduleTransfer->getName()]) && !is_array($excludedModuleConfiguration[$moduleTransfer->getName()])) {
            continue;
        }

        foreach ($moduleTransfer->getApplications() as $applicationTransfer) {
            // We are only using the "default" organization namespace here as the Container takes care of correctly resolving.
            $namespace = sprintf('Pyz\\%s\\', $applicationTransfer->getName());

            $path = sprintf('../src/Pyz/%s/', $applicationTransfer->getName());

            // A module may have an `exclude` configuration, when that is the case, we have to add exclude to the load method.
            if (isset($excludedModuleConfiguration[$moduleTransfer->getName()][$applicationTransfer->getName()])) {
                $services->load($namespace, $path)->exclude($excludedModuleConfiguration[$moduleTransfer->getName()][$applicationTransfer->getName()]);

                continue;
            }

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

Because we configured service discovery for the `Pyz\Yves\MyModule` namespace in `config/ApplicationServices.php` and autowiring is enabled, all controllers will be available in the Container when requested.


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

Because we configured service discovery for the `Pyz\Yves\MyModule` namespace in `config/ApplicationServices.php` and autowiring is enabled, `SomeService` is automatically injected into `MyService`.

## Next steps

- [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- [Bundles](/docs/dg/dev/architecture/bundles.html)
