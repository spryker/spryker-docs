---
title: Troubleshooting Dependency Injection
description: This document describes common issues and solutions when working with Symfony's Dependency Injection in Spryker.
last_updated: Nov 12, 2025
template: troubleshooting-guide-template
related:
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: Implementation and usage
    link: docs/dg/dev/architecture/dependency-injection/implementation-and-usage.html
  - title: Debugging the Symfony Container
    link: docs/dg/dev/architecture/dependency-injection/debugging-container.html
  - title: Best practices for Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection/best-practices.html
---

This document describes common issues and solutions when working with Symfony's Dependency Injection component in Spryker.

## Container compilation failures

### Unknown classes from core

**Problem:**

The container compilation fails with an error about an unknown class from a Spryker core module.

**Example error:**

```php
The service "Spryker\Zed\Product\Business\ProductFacade" has a dependency on a non-existent service "Spryker\Zed\Product\Business\SomeInternalService".
```

**Cause:**

You're trying to autowire a class from a core module that doesn't have a pre-compiled container or isn't configured in your `ApplicationServices.php`.

**Solution 1 - Register the service manually:**

Add the missing service to your `config/Symfony/Zed/ApplicationServices.php`:

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Spryker\Zed\Product\Business\ProductFacadeInterface;
use Spryker\Zed\Product\Business\ProductFacade;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Register the missing core service
    $services->set(ProductFacadeInterface::class, ProductFacade::class);
};
```

**Solution 2 - Create a project-level extension:**

Create your own class that extends the core service and register it:

```php
<?php

namespace Pyz\Zed\Product\Business;

use Spryker\Zed\Product\Business\ProductFacade as SprykerProductFacade;

class ProductFacade extends SprykerProductFacade
{
}
```

Then ensure it's auto-discovered through your `ApplicationServices.php` service discovery.

### Missing core module container

**Problem:**

Core module doesn't have a pre-compiled container, and autowiring fails.

**Example error:**

```php
Could not find the "Spryker\Zed\Customer\Business\CustomerFacade" in any of the attached containers.
```

**Cause:**

The core module hasn't been updated to support DI compilation yet.

**Solution:**

Create a project-level extension of the service and configure its dependencies manually:

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Spryker\Zed\Customer\Business\CustomerFacade as SprykerCustomerFacade;

class CustomerFacade extends SprykerCustomerFacade
{
    // Your project extensions if needed
}
```

Then register it in `ApplicationServices.php`:

```php
$services->set(CustomerFacadeInterface::class, \Pyz\Zed\Customer\Business\CustomerFacade::class);
```

### Scalar constructor arguments

**Problem:**

Container compilation fails when a service constructor has scalar type hints (int, string, bool, float).

**Example error:**

```php
Cannot autowire service "Pyz\Zed\MyModule\MyService": argument "$timeout" of method "__construct()" is type-hinted "int", you should configure its value explicitly.
```

**Cause:**

Autowiring cannot determine what value to inject for scalar types. The container needs explicit configuration.

**Solution 1 - Configure the argument explicitly:**

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Pyz\Zed\MyModule\MyService;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    $services->set(MyService::class)
        ->arg('$timeout', 30);
};
```

**Solution 2 - Use a configuration object (recommended):**

Instead of scalar arguments, create a value object:

```php
<?php

namespace Pyz\Zed\MyModule;

class MyServiceConfig
{
    public function __construct(
        public readonly int $timeout = 30
    ) {
    }
}

class MyService
{
    public function __construct(
        private MyServiceConfig $config
    ) {
    }
}
```


### Transfer objects in properties or constants

**Problem:**

Container compilation fails when transfer objects are used in class properties or constants.

**Example error:**

```php
Class "Generated\Shared\Transfer\CustomerTransfer" not found.
```

**Cause:**

Transfer objects are generated at runtime. During container compilation (especially on fresh installations), transfer objects don't exist yet.

**Solution 1 - Use transfer objects only in methods:**

```php
<?php

namespace Pyz\Zed\Customer\Business;

class CustomerProcessor
{
    // ❌ WRONG - Will fail during compilation
    private const DEFAULT_CUSTOMER = CustomerTransfer::class;
    private CustomerTransfer $defaultCustomer;

    // ✅ CORRECT - Transfer objects only in method signatures
    public function process(CustomerTransfer $customer): CustomerTransfer
    {
        // Use transfer objects here
        return $customer;
    }
}
```

**Solution 2 - Exclude modules during compilation:**

In `ApplicationServices.php`, exclude modules that heavily use transfers:

```php
<?php

$excludedModuleConfiguration = [
    'DataImport' => true, // Often uses many transfer objects
    'ProductPageSearch' => true,
    'ProductStorage' => true,
];

foreach ($projectModules as $moduleTransfer) {
    if (isset($excludedModuleConfiguration[$moduleTransfer->getName()])) {
        continue; // Skip this module
    }

    // ... load module services
}
```

### Argument is type-hinted "array"

**Problem:**

The container compilation fails with an error about configuring values explicitly.

**Example error:**

```php
Cannot autowire service "Spryker\Glue\AuthRestApi\Processor\AccessTokens\AccessTokenUserFinder": argument "$restUserExpanderPlugins" of method "__construct()" is type-hinted "array", you should configure its value explicitly.
```

**Cause:**

Symfony can't automatically detect which classes it should inject as dependency for array's. There is a type-hint to an array of interfaces but which ones should be added here can't be automatically detected.

**Solution - Use the Stack Attribute:**

```php
<?php

namespace Spryker\Glue\AuthRestApi\Processor\AccessTokens;

use Spryker\Service\Container\Attributes\Stack;

class AccessTokenUserFinder implements AccessTokenUserFinderInterface
{
    /**
     * @param array<\Spryker\Glue\AuthRestApiExtension\Dependency\Plugin\RestUserMapperPluginInterface> $restUserExpanderPlugins
     */
    #[Stack(
        dependencyProvider: AuthRestApiDependencyProvider::class,
        dependencyProviderMethod: 'getRestUserExpanderPlugins',
        provideToArgument: '$restUserExpanderPlugins',
    )]
    public function __construct(
        protected array $restUserExpanderPlugins
    ) {}
}
```

During compilation the `\Spryker\Service\Container\Pass\StackResolverPass` understands this configuration and will inject the array dependency through this configuration. When the class is requested from the container, the container knows that it has to pass the returned array from the `AuthRestApiDependencyProvider::getRestUserExpanderPlugins()` method to the argument `$restUserExpanderPlugins`.

Multiple Stack attributes can be used on a class constructor.

## Debugging

When you need to understand how the container resolves services or troubleshoot issues, debug into these key classes:

### ContainerDelegator - Service resolution

**Location:** `Spryker\Service\Container\ContainerDelegator`

**Purpose:** Tracks which service from which container gets resolved.

**Key methods to debug:**

- `get(string $id)`: Main entry point for service resolution (line 94)
- `findInProjectContainer(string $id)`: Searches for services in project container (line 226)
- `getPartsFromId(string $id)`: Extracts namespace, application, module from service ID (line 430)

**What to look for:**

- Check `$this->resolvedServices` to see already resolved services
- Inspect `$this->containers` to see attached containers (project_container, application_container)
- Review `$this->checkedContainer` for which containers were searched

**Debug example:**

```php
// Add breakpoint in ContainerDelegator::get()
public function get(string $id, int $invalidBehavior = self::EXCEPTION_ON_INVALID_REFERENCE): ?object
{
    // Check here what $id is being requested
    // Inspect $this->containers to see available containers
    // Step through to see resolution logic
}
```

### ControllerResolver - Controller discovery

**Location:** `Spryker\Shared\Router\Resolver\ControllerResolver`

**Purpose:** Resolves controller classes from route definitions and injects dependencies.

**Key methods to debug:**

- `getController(Request $request)`: Main entry point for controller resolution (line 37)
- `getControllerFromString()`: Handles string-based controller definitions (line 66)
- `injectContainerAndInitialize()`: Injects dependencies into controller (line 170)

**What to look for:**

- Check how the controller string is parsed
- See if controller is found in ContainerDelegator via `$globalContainer->has($controller)` (line 75)
- Verify if controller is being instantiated via DI or traditionally

**Debug example:**

```php
// Add breakpoint in ControllerResolver::getController()
public function getController(Request $request): callable|false
{
    $controller = $request->attributes->get('_controller');
    // Check $controller value
    // Step through to see if it's resolved from container
}
```

### Kernel - Application setup

**Location:** `Spryker\Shared\Application\Kernel`

**Purpose:** Sets up the application, manages ApplicationPlugins, and boots the container.

**Extends:** `Symfony\Component\HttpKernel\Kernel`

**Uses:** `Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait`

**Key methods to debug:**

- `__construct()`: Initial setup, attaches containers to ContainerDelegator (line 44)
- `boot()`: Boots Symfony container and ApplicationPlugins (line 130)
- `build()`: Registers compiler passes (line 248)
- `configureContainer()`: Loads service configuration files (line 209)

**Important Symfony base class methods:**

Refer to Symfony documentation for these methods:

- [Symfony HttpKernel Component](https://symfony.com/doc/current/components/http_kernel.html)
- [MicroKernelTrait](https://symfony.com/doc/current/configuration/micro_kernel_trait.html)

**What to look for:**

- Check which ApplicationPlugins are registered
- Inspect `$this->container` to see if it's ContainerDelegator or Symfony container
- Review which compiler passes are added
- Verify service configuration file loading

**Debug example:**

```php
// Add breakpoint in Kernel::boot()
public function boot(): void
{
    // Check if container is already compiled
    // See which ApplicationPlugins are being booted
    // Inspect ContainerDelegator attachments
}
```

### Application - Request handling

**Location:** `Spryker\Shared\Application\Application`

**Purpose:** Sets up and boots ApplicationPlugins, selects the correct Kernel, and handles requests via HttpKernel.

**Key methods to debug:**

- `handle()`: Main request handling entry point (line 180)
- `registerPlugins()`: Registers all ApplicationPlugins (line 100)
- `registerPluginsAndBoot()`: Registers and boots ApplicationPlugins (line 131)

**What to look for:**

- Check which ApplicationPlugins are registered
- See when the Kernel is created and booted
- Verify container setup and switching

**Debug example:**

```php
// Add breakpoint in Application::handle()
public function handle(Request $request, int $type = self::MASTER_REQUEST, bool $catch = true): Response
{
    // Check if kernel exists in container
    // See how container is set up
    // Verify plugin registration timing
}
```

### Common debugging workflow

1. **Start with ContainerDelegator** - Check if the service is being requested and from which container
2. **Move to ControllerResolver** - If controller-related, see how it's being resolved
3. **Check Kernel setup** - Verify ApplicationPlugins and container configuration
4. **Review Application flow** - Understand the complete request lifecycle

### Enabling debug output

To see detailed container compilation information, set the debug flag to true:

In your `config/Shared/config_default.php`:

```php
$config[ApplicationConstants::ENABLE_APPLICATION_DEBUG] = true;
```

This enables:
- Container cache verification
- Detailed compiler pass output
- Service resolution logging

## Additional tips

### Verify container cache

If you suspect the container cache is stale:

```bash
# Clear the container cache
rm -rf data/cache/Zed/*/appSpryker_Shared_Application_Kernel*

# Rebuild the container
console container:build
```

### Check service availability

To verify if a service is available in the container, check the compiled container file:

```bash
# Location of compiled container
data/cache/Zed/{environment}/appSpryker_Shared_Application_Kernel_{Application}_{Environment}Container.php
```

Search for your service ID in this file to see if it was registered correctly.

### Module compilation check

If a core module doesn't have a container, check if it exists:

```bash
# Core module container location
vendor/spryker/{module-name}/src/Spryker/Zed/{ModuleName}/Service/Container/{ModuleName}ServiceContainer.php
```

## Next steps

- [Implementation and usage](/docs/dg/dev/architecture/dependency-injection/implementation-and-usage.html)
- [Best practices for Dependency Injection](/docs/dg/dev/architecture/dependency-injection/best-practices.html)
- [Dependency injection](/docs/dg/dev/architecture/dependency-injection.html)
