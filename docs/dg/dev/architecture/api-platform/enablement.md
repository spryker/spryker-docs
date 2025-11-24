---
title: API Platform Enablement
description: Learn how to create and enable API Platform resources in your Spryker project.
last_updated: Nov 24, 2025
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Schemas and Resource Generation
    link: docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html
---

This document describes how to create and enable API Platform resources in your Spryker project.

## Prerequisites

Before creating API resources, ensure you have:

- Integrated API Platform as described in [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- Configured your application's bundle files
- Configured API types in your `spryker_api_platform.php` configuration

## Creating your first API resource

### 1. Define the resource schema

Create a schema file that defines your API resource structure. Schemas should be placed in `resources/api/{api-type}/` directory within your module.

**Example: Customer resource for Backoffice API**

`src/Pyz/Zed/Customer/resources/api/backoffice/customers.yml`

```yaml
# yaml-language-server: $schema=../../../../SprykerSdk/Api/resources/schemas/api-resource-schema-v1.json

resource:
    name: Customers
    shortName: Customer
    description: "Customer resource for backoffice API"

    provider: "Pyz\\Zed\\Customer\\Api\\Provider\\CustomerBackofficeProvider"
    processor: "Pyz\\Zed\\Customer\\Api\\Processor\\CustomerBackofficeProcessor"

    paginationEnabled: true
    paginationItemsPerPage: 10

    operations:
        - type: Post
        - type: Get
        - type: GetCollection
        - type: Patch
        - type: Delete

    properties:
        idCustomer:
            type: integer
            description: "The unique identifier of the customer."
            writable: false

        email:
            type: string
            description: "The email address of a user or contact."
            openapiContext:
                example: "test@spryker.com"

        firstName:
            type: string
            description: "The first name of a person."
            openapiContext:
                example: "John"

        lastName:
            type: string
            description: "The last name of a user or customer."
            openapiContext:
                example: "Doe"

        customerReference:
            type: string
            description: "A unique reference for a customer."
            writable: false
            identifier: true
```

### 2. Create validation schema

Define validation rules in a separate validation schema file:

`src/Pyz/Zed/Customer/resources/api/backoffice/customers.validation.yml`

```yaml
post:
    email:
        - NotBlank
        - Email

    firstName:
        - NotBlank
        - Length:
              max: 100

    lastName:
        - NotBlank
        - Length:
              max: 100

patch:
    email:
        - Optional:
              constraints:
                  - NotBlank
                  - Email

    firstName:
        - Optional:
              constraints:
                  - NotBlank
                  - Length:
                        max: 100
```

### 3. Implement the Provider

The Provider is responsible for fetching data (GET operations). Implement the `ProviderInterface`:

`src/Pyz/Zed/Customer/Api/Provider/CustomerBackofficeProvider.php`

```php
<?php

namespace Pyz\Zed\Customer\Api\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\TraversablePaginator;
use ApiPlatform\State\ProviderInterface;
use Pyz\Zed\Customer\Business\CustomerFacadeInterface;
use Generated\Api\Backoffice\CustomersBackofficeResource;

class CustomerBackofficeProvider implements ProviderInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    /**
     * @param \ApiPlatform\Metadata\Operation $operation
     * @param array<string, mixed> $uriVariables
     * @param array<string, mixed> $context
     *
     * @return object|array<object>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Single resource (GET /customers/{id})
        if (isset($uriVariables['customerReference'])) {
            return $this->getCustomer($uriVariables['customerReference']);
        }

        // Collection (GET /customers)
        return $this->getCustomers($context);
    }

    private function getCustomer(string $customerReference): ?CustomersBackofficeResource
    {
        $customerTransfer = $this->customerFacade->findCustomerByReference($customerReference);

        if ($customerTransfer === null) {
            return null;
        }

        // Map to API resource
        $resource = new CustomersBackofficeResource();
        $resource->idCustomer = $customerTransfer->getIdCustomer();
        $resource->email = $customerTransfer->getEmail();
        $resource->firstName = $customerTransfer->getFirstName();
        $resource->lastName = $customerTransfer->getLastName();
        $resource->customerReference = $customerTransfer->getCustomerReference();

        return $resource;
    }

    private function getCustomers(array $context): TraversablePaginator
    {
        $filters = $context['filters'] ?? [];
        $page = (int) ($filters['page'] ?? 1);
        $itemsPerPage = (int) ($filters['itemsPerPage'] ?? 10);

        $customerCollection = $this->customerFacade->getCustomerCollection($page, $itemsPerPage);

        $resources = [];
        foreach ($customerCollection->getCustomers() as $customerTransfer) {
            $resource = new CustomersBackofficeResource();
            $resource->idCustomer = $customerTransfer->getIdCustomer();
            $resource->email = $customerTransfer->getEmail();
            $resource->firstName = $customerTransfer->getFirstName();
            $resource->lastName = $customerTransfer->getLastName();
            $resource->customerReference = $customerTransfer->getCustomerReference();

            $resources[] = $resource;
        }

        return new TraversablePaginator(
            new \ArrayObject($resources),
            $page,
            $itemsPerPage,
            $customerCollection->getTotalCount()
        );
    }
}
```

### 4. Implement the Processor

The Processor handles data modifications (POST, PUT, PATCH, DELETE). Implement the `ProcessorInterface`:

`src/Pyz/Zed/Customer/Api/Processor/CustomerBackofficeProcessor.php`

```php
<?php

namespace Pyz\Zed\Customer\Api\Processor;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use Pyz\Zed\Customer\Business\CustomerFacadeInterface;
use Generated\Api\Backoffice\CustomersBackofficeResource;

class CustomerBackofficeProcessor implements ProcessorInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    /**
     * @param mixed $data
     * @param \ApiPlatform\Metadata\Operation $operation
     * @param array<string, mixed> $uriVariables
     * @param array<string, mixed> $context
     *
     * @return mixed
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($operation instanceof Delete) {
            $this->customerFacade->deleteCustomer($uriVariables['customerReference']);
            return null;
        }

        if ($operation instanceof Post) {
            $customerTransfer = $this->mapToTransfer($data);
            $savedCustomer = $this->customerFacade->createCustomer($customerTransfer);
            return $this->mapToResource($savedCustomer);
        }

        if ($operation instanceof Patch) {
            $customerTransfer = $this->mapToTransfer($data);
            $customerTransfer->setCustomerReference($uriVariables['customerReference']);
            $updatedCustomer = $this->customerFacade->updateCustomer($customerTransfer);
            return $this->mapToResource($updatedCustomer);
        }

        return null;
    }

    private function mapToTransfer(CustomersBackofficeResource $resource): CustomerTransfer
    {
        $transfer = new CustomerTransfer();
        $transfer->setEmail($resource->email);
        $transfer->setFirstName($resource->firstName);
        $transfer->setLastName($resource->lastName);

        return $transfer;
    }

    private function mapToResource(CustomerTransfer $transfer): CustomersBackofficeResource
    {
        $resource = new CustomersBackofficeResource();
        $resource->idCustomer = $transfer->getIdCustomer();
        $resource->email = $transfer->getEmail();
        $resource->firstName = $transfer->getFirstName();
        $resource->lastName = $transfer->getLastName();
        $resource->customerReference = $transfer->getCustomerReference();

        return $resource;
    }
}
```

### 5. Generate the resource

Run the generation command to create the API resource class:

```bash
console api:generate backoffice
```

This generates:

`src/Generated/Api/Backoffice/CustomersBackofficeResource.php`

The generated class includes:
- API Platform attributes (`#[ApiResource]`, `#[ApiProperty]`)
- Validation constraints (`#[Assert\NotBlank]`, `#[Assert\Email]`, etc.)
- Public properties for all defined fields
- Getters and setters
- `toArray()` and `fromArray()` methods

### 6. Register services in DI container

Make your Provider and Processor available through dependency injection:

`config/Symfony/ZED/ApplicationServices.php`

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Auto-discover services from your project modules
    $services->load('Pyz\\Zed\\', '../../../src/Pyz/Zed/');
};
```

### 7. Test your API

After generation, your API is immediately available:

```bash
# List all customers
GET /api/backoffice/customers

# Get single customer
GET /api/backoffice/customers/{customerReference}

# Create customer
POST /api/backoffice/customers
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe"
}

# Update customer
PATCH /api/backoffice/customers/{customerReference}
{
  "firstName": "Jane"
}

# Delete customer
DELETE /api/backoffice/customers/{customerReference}
```

## API types and use cases

Spryker supports multiple API types for different use cases:

### Storefront API (Glue)
- **API Type:** `storefront`
- **Module location:** `src/Spryker/{Module}/resources/api/storefront/`
- **Generated namespace:** `Generated\Api\Storefront`
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### Backoffice API (Zed)
- **API Type:** `backoffice`
- **Module location:** `src/Pyz/Zed/{Module}/resources/api/backoffice/`
- **Generated namespace:** `Generated\Api\Backoffice`
- **Use cases:** Admin panels, internal tools, ERP integrations

### Merchant Portal API
- **API Type:** `merchant-portal`
- **Module location:** `src/Spryker/{Module}/resources/api/merchant-portal/`
- **Generated namespace:** `Generated\Api\MerchantPortal`
- **Use cases:** Marketplace merchant interfaces

## Schema layering and inheritance

API Platform supports multi-layer schema definitions with automatic merging:

### Core layer
`vendor/spryker/customer/resources/api/backoffice/customer.yml` - Base definition

### Feature layer
`src/SprykerFeature/CustomerRelationManagement/resources/api/backoffice/customer.yml` - Feature enhancements

### Project layer
`src/Pyz/Zed/Customer/resources/api/backoffice/customer.yml` - Project customizations

The generator automatically merges these schemas with project layer taking precedence.

## Debugging resources

Use the debug command to inspect resources:

```bash
# List all resources
console api:debug --list

# Show resource details
console api:debug customers --api-type=backoffice

# Show merged schema
console api:debug customers --api-type=backoffice --show-merged

# Show source files
console api:debug customers --api-type=backoffice --show-sources
```

## Next steps

- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Deep dive into schema syntax
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues and solutions
