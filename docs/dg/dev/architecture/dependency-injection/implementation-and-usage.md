---
title: Implementation and usage
description: This document describes how to implement and use Symfony's Dependency Injection in Spryker (Zed application layer).
last_updated: Nov 12, 2025
template: howto-guide-template
related:
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: Troubleshooting Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection/troubleshooting.html
  - title: Best practices for Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection/best-practices.html
---

This document describes how to implement and use Symfony's Dependency Injection component in your Spryker project (Zed application layer only).

## Prerequisites

Before implementing Dependency Injection, ensure you have:

- Upgraded the required modules as described in [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- Configured your `config/Symfony/Zed/ApplicationServices.php` file
- Registered the necessary bundles in `config/Symfony/Zed/bundles.php`

## Manual dependency wiring in ApplicationServices.php

While autowiring handles most dependencies automatically, you may need to manually configure services in some cases.

### Registering services manually

You can manually define services in your `config/Symfony/Zed/ApplicationServices.php` file:

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Pyz\Zed\MyModule\Business\MyService;
use Pyz\Zed\MyModule\Business\MyServiceInterface;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Manually register a service
    $services->set(MyServiceInterface::class, MyService::class);
};
```

### Service definitions with arguments

When you need to pass specific arguments to a service constructor:

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Pyz\Zed\MyModule\Business\MyService;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Define service with specific arguments
    $services->set(MyService::class)
        ->arg('$someArgument', 'some-value')
        ->arg('$anotherArgument', service('AnotherService'));
};
```

### Wiring non-class dependencies

For scalar values (int, string, etc.) and arrays, you need to explicitly define them:

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Pyz\Zed\MyModule\Business\ConfigurableService;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Wire scalars and arrays
    $services->set(ConfigurableService::class)
        ->arg('$timeout', 30)
        ->arg('$apiKey', '%env(API_KEY)%')
        ->arg('$options', ['option1' => 'value1', 'option2' => 'value2']);
};
```

{% info_block warningBox "Avoid scalars in constructors" %}

Best practice is to avoid using scalar values (int, string, etc.) directly in constructor arguments. Instead, use configuration objects or value objects that can be autowired. This makes your services more testable and reduces the need for manual configuration.

{% endinfo_block %}

## Using core classes in Dependency Injection

Spryker core classes are not automatically available in the container. You need to make them available manually.

### Making facades/clients/services available

To use core facades, clients, or services through dependency injection, you need to register them in your `ApplicationServices.php`:

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

    // Register core facade
    $services->set(ProductFacadeInterface::class, ProductFacade::class);

    // Register core client
    $services->set(CustomerClientInterface::class, CustomerClient::class);

    // Register core service
    $services->set(UtilTextServiceInterface::class, UtilTextService::class);
};
```

## Wiring plugin stacks

To tell the container how to resolve plugin stacks defines as array dependency in a class constructor, you can use the Stack Attribute:

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

## Using Dependency Injection in facades

The new `getService()` method in facades allows you to retrieve services directly from the container instead of using the factory pattern.

### The getService() pattern

**Traditional factory pattern:**

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

class CustomerFacade extends AbstractFacade implements CustomerFacadeInterface
{
    public function processCustomerData(CustomerTransfer $customerTransfer): void
    {
        $this->getFactory()
            ->createCustomerProcessor()
            ->process($customerTransfer);
    }
}
```

**New dependency injection pattern with getService():**

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Processor\CustomerProcessorInterface;
use Spryker\Zed\Kernel\Business\AbstractFacade;

class CustomerFacade extends AbstractFacade implements CustomerFacadeInterface
{
    public function processCustomerData(CustomerTransfer $customerTransfer): void
    {
        $this->getService(CustomerProcessorInterface::class)
            ->process($customerTransfer);
    }
}
```

### When to use each approach

- **Use `getService()`**: When you want to leverage dependency injection and the service is configured in the container
- **Use `getFactory()`**: For traditional Spryker architecture or when gradually migrating to dependency injection

### Benefits of the getService() pattern

1. **Explicit dependencies**: Service dependencies are clearly defined through interfaces
2. **Better testability**: Easier to mock services in unit tests
3. **Reduced boilerplate**: No need to create factory methods for each service
4. **Type safety**: Direct type hints on service interfaces

## Entry points and autowiring

Dependency injection is activated when a service is first requested from the container. Entry points are the places where the container begins resolving dependencies.

### Controllers as entry points

When a controller is defined as a service in the container and is resolved by the application, the container automatically instantiates it and injects all constructor dependencies.

**Example controller:**

```php
<?php

namespace Pyz\Zed\Customer\Communication\Controller;

use Pyz\Zed\Customer\Business\CustomerFacadeInterface;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class IndexController extends AbstractController
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
        private CustomerRepositoryInterface $customerRepository
    ) {
    }

    public function indexAction(): array
    {
        $customers = $this->customerRepository->findAll();

        return $this->viewResponse([
            'customers' => $customers,
        ]);
    }
}
```

When the application resolves this controller through the container (automatically done when the controller is known in the container), it:

1. Detects the controller class needs to be instantiated
2. Analyzes the constructor parameters (`$customerFacade`, `$customerRepository`)
3. Resolves `CustomerFacadeInterface` from the container
4. Resolves `CustomerRepositoryInterface` from the container
5. Injects both dependencies into the controller constructor
6. Returns the fully instantiated controller

### Console commands as entry points

Console commands work similarly to controllers:

```php
<?php

namespace Pyz\Zed\Customer\Communication\Console;

use Pyz\Zed\Customer\Business\CustomerFacadeInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CustomerImportCommand extends Command
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
        private ImportServiceInterface $importService
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $data = $this->importService->loadData();
        $this->customerFacade->importCustomers($data);

        return Command::SUCCESS;
    }
}
```

### How autowiring chains through dependencies

When the container resolves a dependency, it recursively resolves all nested dependencies:

```markdown
Controller (Entry Point)
    ↓ requires CustomerFacadeInterface
    CustomerFacade
        ↓ requires CustomerRepositoryInterface (via getService())
        CustomerRepository
            ↓ requires EntityManagerInterface
            EntityManager
                ↓ requires Connection
                Connection ← All dependencies fully resolved
```

**Key points:**

1. **Type hints are required**: The container uses constructor type hints to determine which services to inject
2. **Interfaces preferred**: Always type hint against interfaces, not concrete classes
3. **Recursive resolution**: If an injected service has its own dependencies, those are also resolved automatically
4. **Singleton behavior**: By default, services are shared (created once and reused)

### Entry point requirements

For a class to be an entry point and trigger autowiring:

1. It must be known to the container (either via service discovery or manual registration)
2. It must have constructor parameters with type hints
3. The type-hinted dependencies must be available in the container or be autowirable

## Gradually migrating from factory pattern to dependency injection

You can migrate your application incrementally without breaking existing functionality.

### Migration strategy

1. **Start with new features**: Implement new features using dependency injection from the beginning
2. **Migrate isolated services**: Begin with services that have few dependencies
3. **Update facades gradually**: Convert facade methods to use `getService()` one at a time
4. **Keep factories for legacy code**: Leave existing factory-based code unchanged until you're ready to migrate it

### Example: Partial migration

**Step 1 - Original factory-based code:**

```php
<?php

namespace Pyz\Zed\Customer\Business;

class CustomerFacade extends AbstractFacade
{
    public function processCustomer(CustomerTransfer $customer): void
    {
        $this->getFactory()
            ->createCustomerProcessor()
            ->process($customer);
    }

    public function validateCustomer(CustomerTransfer $customer): bool
    {
        return $this->getFactory()
            ->createCustomerValidator()
            ->validate($customer);
    }
}
```

**Step 2 - Migrate one method to dependency injection:**

```php
<?php

namespace Pyz\Zed\Customer\Business;

class CustomerFacade extends AbstractFacade
{
    // Old factory pattern - still works
    public function processCustomer(CustomerTransfer $customer): void
    {
        $this->getFactory()
            ->createCustomerProcessor()
            ->process($customer);
    }

    // New dependency injection pattern
    public function validateCustomer(CustomerTransfer $customer): bool
    {
        return $this->getService(CustomerValidatorInterface::class)
            ->validate($customer);
    }
}
```

**Step 3 - Fully migrated:**

```php
<?php

namespace Pyz\Zed\Customer\Business;

class CustomerFacade extends AbstractFacade
{
    public function processCustomer(CustomerTransfer $customer): void
    {
        $this->getService(CustomerProcessorInterface::class)
            ->process($customer);
    }

    public function validateCustomer(CustomerTransfer $customer): bool
    {
        return $this->getService(CustomerValidatorInterface::class)
            ->validate($customer);
    }
}
```

### Coexistence considerations

- Both patterns can coexist in the same facade
- Factory-based services won't benefit from dependency injection until migrated
- Test both patterns separately during migration
- Update tests to accommodate the new pattern

## Next steps

- [Troubleshooting Dependency Injection](/docs/dg/dev/architecture/dependency-injection/troubleshooting.html)
- [Best practices for Dependency Injection](/docs/dg/dev/architecture/dependency-injection/best-practices.html)
