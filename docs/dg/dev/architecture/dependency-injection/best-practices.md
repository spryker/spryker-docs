---
title: Best practices for Dependency Injection
description: This document describes best practices and recommendations when working with Symfony's Dependency Injection in Spryker.
last_updated: Nov 12, 2025
template: concept-topic-template
related:
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: Implementation and usage
    link: docs/dg/dev/architecture/dependency-injection/implementation-and-usage.html
  - title: Troubleshooting Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection/troubleshooting.html
---

This document describes best practices and recommendations when working with Symfony's Dependency Injection component in Spryker.

## When to use DI vs Factory pattern

### Use Dependency Injection when:

- ✅ **Building new features** - Start with DI for all new code
- ✅ **Services are reused** - Multiple consumers need the same service instance
- ✅ **Dependencies are stable** - Interfaces and contracts are well-defined
- ✅ **Testing is priority** - You want easy mocking and testability
- ✅ **Cross-module dependencies** - Services need to be shared across modules

### Use Factory pattern when:

- ✅ **Legacy code migration** - Existing code not yet migrated to DI
- ✅ **Complex creation logic** - Object instantiation requires conditional logic
- ✅ **Module-specific instances** - Need to create new instances per call
- ✅ **Gradual migration** - Transitioning from factory to DI incrementally

### Hybrid approach (recommended):

For facades and larger modules, use a hybrid approach during migration:

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

class CustomerFacade extends AbstractFacade
{
    // New DI pattern for new features
    public function validateCustomerEmail(string $email): bool
    {
        return $this->getService(EmailValidatorInterface::class)
            ->validate($email);
    }

    // Factory pattern for legacy code
    public function processLegacyCustomer(CustomerTransfer $customer): void
    {
        $this->getFactory()
            ->createLegacyProcessor()
            ->process($customer);
    }
}
```

## Interface-based design

Always program against interfaces, not concrete implementations.

### ✅ Good: Interface-based

```php
<?php

namespace Pyz\Zed\Customer\Business;

// Define interface
interface CustomerProcessorInterface
{
    public function process(CustomerTransfer $customer): void;
}

// Implementation
class CustomerProcessor implements CustomerProcessorInterface
{
    public function process(CustomerTransfer $customer): void
    {
        // Implementation
    }
}

// Consumer depends on interface
class CustomerService
{
    public function __construct(
        private CustomerProcessorInterface $processor
    ) {
    }
}
```

### ❌ Bad: Concrete class dependency

```php
<?php

namespace Pyz\Zed\Customer\Business;

// Consumer depends on concrete class
class CustomerService
{
    public function __construct(
        private CustomerProcessor $processor // Tightly coupled!
    ) {
    }
}
```

### Benefits of interfaces:

1. **Flexibility** - Easy to swap implementations
2. **Testability** - Simple to create mocks
3. **Decoupling** - Reduces dependencies between modules
4. **Contract clarity** - Clear expectations for implementations

## Avoiding circular dependencies

Circular dependencies occur when Service A depends on Service B, which depends on Service A.

### ❌ Bad: Circular dependency

```php
<?php

namespace Pyz\Zed\Customer\Business;

class CustomerService
{
    public function __construct(
        private OrderServiceInterface $orderService
    ) {
    }
}

class OrderService implements OrderServiceInterface
{
    public function __construct(
        private CustomerServiceInterface $customerService // Circular!
    ) {
    }
}
```

### ✅ Good: Extract shared dependency

```php
<?php

namespace Pyz\Zed\Customer\Business;

// Create a shared service that both can depend on
class CustomerDataProvider
{
    public function getCustomerData(int $customerId): CustomerData
    {
        // Implementation
    }
}

class CustomerService
{
    public function __construct(
        private CustomerDataProvider $dataProvider
    ) {
    }
}

class OrderService
{
    public function __construct(
        private CustomerDataProvider $dataProvider
    ) {
    }
}
```

## Avoiding scalar types in constructors

Scalar constructor arguments (int, string, bool, float) require manual configuration and reduce autowiring benefits.

### ❌ Bad: Scalars in constructor

```php
<?php

namespace Pyz\Zed\Payment\Business;

class PaymentService
{
    public function __construct(
        private int $timeout,
        private bool $sandboxMode
    ) {
    }
}
```

This requires manual configuration:

```php
$services->set(PaymentService::class)
    ->arg('$timeout', 30)
    ->arg('$sandboxMode', true);
```

### ✅ Good: Configuration object

```php
<?php

namespace Pyz\Zed\Payment\Business;

// Value object for configuration
class PaymentConfig
{   
    public function getTimeout(): int {
        return 123;
    }
    
    public function getSandboxMode(): bool {
        return true;
    }
}

class PaymentService
{
    public function __construct(
        private PaymentConfig $config
    ) {
    }
}
```

### Benefits:

1. **Single configuration point** - Configure once, use everywhere
2. **Type safety** - Strong typing for all configuration
3. **Easier testing** - Create mock configs easily
4. **Better organization** - Clear separation of concerns


### Keep services focused (Single Responsibility)

Each service should have one clear purpose:

```php
<?php

// ✅ Good: Focused services
class CustomerEmailValidator
{
    public function validate(string $email): bool
    {
        // Only validates emails
    }
}

class CustomerAddressValidator
{
    public function validate(AddressTransfer $address): bool
    {
        // Only validates addresses
    }
}

// ❌ Bad: Too many responsibilities
class CustomerValidator
{
    public function validateEmail(string $email): bool { }
    public function validateAddress(AddressTransfer $address): bool { }
    public function validatePhone(string $phone): bool { }
    public function validateCreditCard(string $card): bool { }
    // Too many unrelated validations!
}
```

## Performance considerations

### Use service proxies for expensive services

For services that are expensive to instantiate but not always needed:

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Mark service as lazy to create proxy
    $services->set(ExpensiveService::class)
        ->lazy();
};
```

### Avoid service explosion

Don't create a service for every single class. Use factories for lightweight objects:

```php
<?php

// ✅ Good: Use factory for simple value objects
class CustomerFactory
{
    public function createCustomerData(array $data): CustomerData
    {
        return new CustomerData(
            $data['name'],
            $data['email']
        );
    }
}

// ❌ Bad: Making every value object a service
$services->set(CustomerData::class); // Unnecessary!
```

### Consider container compilation time

Each service registered increases compilation time. For development:

- Exclude heavy modules (DataImport, Storage, Search)
- Use container cache
- Compile container in deployment pipeline

```php
<?php

$excludedModuleConfiguration = [
    'DataImport' => true,
    'ProductPageSearch' => true,
    'ProductStorage' => true,
    'PriceProductStorage' => true,
];
```

## Testing best practices

### Use constructor injection for better testability

```php
<?php

namespace Pyz\Zed\Customer\Business;

class CustomerService
{
    public function __construct(
        private CustomerRepositoryInterface $repository,
        private EmailValidatorInterface $validator
    ) {
    }

    public function registerCustomer(CustomerTransfer $customer): bool
    {
        if (!$this->validator->validate($customer->getEmail())) {
            return false;
        }

        $this->repository->save($customer);

        return true;
    }
}
```

## Migration checklist

When migrating a module to DI, follow this checklist:

- [ ] Update facades to use `getService()` instead of `getFactory()`
- [ ] Configure services in `ApplicationServices.php` if needed
- [ ] Remove scalar constructor arguments (use config objects)
- [ ] Verify no circular dependencies exist
- [ ] Check for transfer object usage in properties/constants
- [ ] Test container compilation
- [ ] Run full test suite


## Common anti-patterns to avoid

### ❌ Service locator pattern

```php
<?php

// Don't inject the entire container
class CustomerService
{
    public function __construct(
        private ContainerInterface $container // Anti-pattern!
    ) {
    }

    public function process(): void
    {
        $validator = $this->container->get(ValidatorInterface::class);
        // This hides dependencies
    }
}
```

### ❌ Static dependencies

```php
<?php

// Don't use static dependencies
class CustomerService
{
    public function process(): void
    {
        // Anti-pattern! Not testable
        $result = SomeStaticHelper::doSomething();
    }
}
```

### ❌ New keyword in services

```php
<?php

// Don't instantiate dependencies directly
class CustomerService
{
    public function process(): void
    {
        // Anti-pattern! Should be injected
        $validator = new EmailValidator();
    }
}
```

## Next steps

- [Dependency injection](/docs/dg/dev/architecture/dependency-injection.html)
- [Implementation and usage](/docs/dg/dev/architecture/dependency-injection/implementation-and-usage.html)
- [Troubleshooting Dependency Injection](/docs/dg/dev/architecture/dependency-injection/troubleshooting.html)
