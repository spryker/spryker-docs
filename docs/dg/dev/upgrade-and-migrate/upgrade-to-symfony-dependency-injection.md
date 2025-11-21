---
title: How to upgrade to Symfony Dependency Injection
description: This document describes how to upgrade your application to use Symfony's Dependency Injection component.
last_updated: Nov 5, 2025
template: howto-guide-template
---

This document describes how to upgrade your application to use Symfony's Dependency Injection component.

## 1. Upgrade the required modules

To get the Dependency Injection component, upgrade the following modules:

```bash
composer require \
  spryker/application:"^3.37.0" \
  spryker/console:"^4.17.0" \
  spryker/container:"^1.5.0" \
  spryker/development:"^3.48.0" \
  spryker/event-dispatcher:"^1.8.0" \
  spryker/glue-application:"^1.69.0" \
  spryker/http:"^1.13.0" \
  spryker/kernel:"^3.80.0" \
  spryker/module-finder:"^1.4.0" \
  spryker/router:"^1.24.0" \
  spryker/sales-oms:"^0.1.5" \
  spryker/checkout-rest-api:"^3.13.1" \
  spryker/data-import:"^1.31.1" \
  spryker/merchant-oms:"^1.0.4" \
  spryker/sales-payment-merchant-sales-merchant-commission:"^1.0.1" \
  spryker-shop/service-point-cart-page:"^1.0.1" \
  --update-with-dependencies \
  --ignore-platform-req=ext-grpc
```

## 2. Update the console dependency provider

Add the `EventDispatcherApplicationPlugin` to the respective `ConsoleDependencyProvider`:

`src/Pyz/Glue/Console/ConsoleDependencyProvider.php`

```php
use Spryker\Glue\EventDispatcher\Plugin\Console\EventDispatcherApplicationPlugin;

// ...

    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        // ...

        $applicationPlugins[] = new EventDispatcherApplicationPlugin();

        return $applicationPlugins;
    }

// ...
```

`src/Pyz/Yves/Console/ConsoleDependencyProvider.php`

```php
use Spryker\Yves\EventDispatcher\Plugin\Console\EventDispatcherApplicationPlugin;

// ...
    protected function getApplicationPlugins(Container $container): array
    {
        return [
            // ...
            new EventDispatcherApplicationPlugin(),
        ];
    }
// ...
```

`src/Pyz/Zed/Console/ConsoleDependencyProvider.php`

```php
use Spryker\Zed\EventDispatcher\Communication\Plugin\Console\EventDispatcherApplicationPlugin;
use Spryker\Zed\Container\Communication\Console\ContainerBuilderConsole;

// ...
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ...
            new ContainerBuilderConsole(), // This command is used to generate the cached container
        ];

        return $commands;
    }


    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        // ...
    
        $applicationPlugins[] = new EventDispatcherApplicationPlugin();

        return $applicationPlugins;
    }

// ...
```

## 3. Configure services

You can configure your services in `config/Symfony/{APPLICATION}/services.php`. `ApplicationServices.php`, and `*Service.php` can also be used. We recommend following the Symfony standard for configuring your container setup. For details, see [Service Configuration](https://symfony.com/doc/current/service_container/service_config.html) in the Symfony documentation.

## 4. Configure bundles

For details about configuring bundles, see [Symfony Bundles](/docs/dg/dev/architecture/symfony-bundles.html).

## 5. Compile the container

To compile the container, you have two options:

- On every request to the application, the Kernel checks if a compiled container already exists. If not, or if the cache is outdated, it generates a new one.
- Run the following command to build the cache. The application then immediately uses the freshly compiled container.

For CI and production environment you should run the command manually:

```bash
console container:build
```

While in development mode you don't need to manually build the container, as it will be built automatically on demand.

## Next steps

- [Dependency Injection](/docs/dg/dev/architecture/dependency-injection.html)
- [Bundles](/docs/dg/dev/architecture/symfony-bundles.html)
