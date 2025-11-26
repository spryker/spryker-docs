---
title: API Platform
description: Spryker's API Platform integration provides schema-based REST API resource generation with automatic OpenAPI documentation.
last_updated: Nov 24, 2025
template: concept-topic-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection.html
---

Spryker's API Platform integration provides schema-based API resource generation with automatic OpenAPI documentation. This allows you to define your API resources using YAML or XML schemas and automatically generate fully-functional API endpoints with validation, pagination, and serialization.

This document describes the API Platform architecture and how it integrates with Spryker.

## What is API Platform

API Platform is a framework for building modern APIs based on web standards and best practices. In Spryker, it complements the existing Glue API infrastructure by providing:

- **Schema-based resource generation**: Define resources in YAML/XML, generate PHP classes automatically
- **Automatic OpenAPI documentation**: Interactive API documentation generated from schemas
- **Built-in validation**: Symfony Validator integration with operation-specific rules
- **Pagination support**: Standardized pagination with configurable defaults
- **State management**: Separate providers (read) and processors (write) for clean architecture

## Architecture overview

### Resource generation workflow

```MARKDOWN
Schema Files (YAML/XML)
    ↓
Schema Discovery & Validation
    ↓
Multi-layer Schema Merging (Core → Feature → Project)
    ↓
Resource Class Generation
    ↓
API Platform Resource (with attributes)
    ↓
REST API Endpoints
```

### Core components

#### 1. Schema files

Resources are defined in YAML or XML files located in module directories:

```MARKDOWN
src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.yml
src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.validation.yml
```

Example schema:

```yaml
resource:
  name: Customers
  shortName: Customer
  description: "Customer resource for backoffice API"

  provider: "Pyz\\Zed\\Customer\\Api\\Backoffice\\Provider\\CustomerBackofficeProvider"
  processor: "Pyz\\Zed\\Customer\\Api\\Backoffice\\Processor\\CustomerBackofficeProcessor"

  paginationEnabled: true

  operations:
    - type: Post
    - type: Get
    - type: GetCollection
    - type: Patch
    - type: Delete

  properties:
    email:
      type: string
      description: "Customer email address"
    customerReference:
      type: string
      identifier: true
      writable: false
```

#### 2. Generated resources

The generator creates PHP classes with API Platform attributes:

`src/Generated/Api/Backoffice/CustomersBackofficeResource.php`

```php
<?php

namespace Generated\Api\Backoffice;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [new Post(), new Get(), new GetCollection(), new Patch(), new Delete()],
    shortName: 'Customer',
    provider: CustomerBackofficeProvider::class,
    processor: CustomerBackofficeProcessor::class
)]
final class CustomersBackofficeResource
{
    #[ApiProperty(identifier: true, writable: false)]
    public ?string $customerReference = null;

    #[ApiProperty]
    #[Assert\NotBlank(groups: ['customers:create'])]
    #[Assert\Email(groups: ['customers:create'])]
    public ?string $email = null;

    // Getters, setters, toArray(), fromArray()...
}
```

#### 3. State providers and processors

**Provider (read operations):**

```php
class CustomerBackofficeProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Fetch and return data from your business layer
        return $customerResource;
    }
}
```

**Processor (write operations):**

```php
class CustomerBackofficeProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        // Persist changes through your business layer
        return $updatedResource;
    }
}
```

## API types

Spryker supports multiple API types for different use cases:

### Storefront API (Glue)

- **API Type:** `storefront`
- **Application:** Glue
- **Base URL:** `http://glue.eu.spryker.local/` - Configurable per project
- **Use cases:** Customer-facing APIs, mobile apps, PWAs
- **Example:** `/access-tokens`

### Backoffice API (Zed)

- **API Type:** `backoffice`
- **Application:** Zed
- **Base URL:** `http://backoffice.eu.spryker.local/`
- **Use cases:** Admin panels, internal tools, ERP integrations
- **Example:** `/customers`

### Merchant Portal API

- **API Type:** `merchant-portal`
- **Application:** MerchantPortal
- **Base URL:** `http://mp.glue.eu.spryker.local/`
- **Use cases:** Marketplace merchant interfaces
- **Example:** `/products`

## Multi-layer schema merging

One of the key features is support for multi-layer schema definitions that automatically merge:

**Core layer** (vendor/spryker):

```yaml
resource:
  name: Customers
  properties:
    email:
      type: string
```

**Feature layer** (src/SprykerFeature):

```yaml
resource:
  name: Customers
  properties:
    loyaltyPoints:
      type: integer
```

**Project layer** (src/Pyz):

```yaml
resource:
  name: Customers
  properties:
    email:
      required: true  # Override core
    customField:
      type: string    # Project-specific
```

**Result**: A single merged resource with all properties, project layer taking precedence.

## Integration with Spryker architecture

### Dependency Injection

API Platform fully integrates with Symfony Dependency Injection:

```php
// config/Zed/ApplicationServices.php
$services->load('Pyz\\Zed\\', '../../../src/Pyz/Zed/');
```

Providers and Processors are automatically discovered and can use constructor injection:

```php
class CustomerBackofficeProvider implements ProviderInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
        private CustomerRepositoryInterface $customerRepository,
    ) {}
}
```

### Facade integration

Resources can leverage existing Spryker facades:

```php
class CustomerBackofficeProcessor implements ProcessorInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {}

    public function process(mixed $data, Operation $operation, ...): mixed
    {
        $customerTransfer = $this->mapToTransfer($data);
        $response = $this->customerFacade->createCustomer($customerTransfer);
        return $this->mapToResource($response->getCustomerTransfer());
    }
}
```

## Resource generation

### Console commands

```bash
# Generate all configured API types
console api:generate

# Generate specific API type
console api:generate backoffice

# Validate schemas only
console api:generate --validate-only

# Force regeneration (bypass cache)
console api:generate --force

# Dry run
console api:generate --dry-run
```

### Debug commands

```bash
# List all resources
console api:debug --list

# Inspect specific resource
console api:debug customers --api-type=backoffice

# Show merged schema
console api:debug customers --api-type=backoffice --show-merged

# Show contributing files
console api:debug customers --api-type=backoffice --show-sources
```

## Features

### Automatic OpenAPI documentation

API Platform generates interactive OpenAPI documentation:

- Swagger UI at the root URL `/`
- OpenAPI JSON specification at `/docs.json`

### Built-in validation

Validation rules from `*.validation.yml` files are converted to Symfony Validator constraints:

```yaml
post:
  email:
    - NotBlank
    - Email
```

Becomes:

```php
#[Assert\NotBlank(groups: ['customers:create'])]
#[Assert\Email(groups: ['customers:create'])]
public ?string $email = null;
```

### Pagination support

Standardized pagination with query parameters:

```MARKDOWN
GET /customers?page=2&itemsPerPage=20
```

Provider returns `PaginatorInterface`:

```php
return new TraversablePaginator(
    new \ArrayObject($results),
    $currentPage,
    $itemsPerPage,
    $totalItems
);
```

### Operation-specific behavior

Define different validation and behavior per operation:

```yaml
operations:
  - type: Post            # Create
  - type: Get             # Read one
  - type: GetCollection   # Read many
  - type: Patch           # Update
  - type: Delete          # Delete
```

Each operation can have specific validation rules and security settings.

## Performance

### Caching

The generator uses intelligent caching:

- Detects schema file changes
- Only regenerates modified resources
- Production: cache is persistent
- Development: cache auto-invalidates

### Cache warming

Pre-generate resources during deployment:

```bash
console api:generate
```

or

```bash
console cache:warmup
```

### Property-level access control

```yaml
properties:
  password:
    writable: true   # Can be written
    readable: false  # Not in responses
```

## Comparison with Glue REST API

| Feature | API Platform | Glue REST API |
|---------|-------------|---------------|
| Definition | Schema-based (YAML/XML) | Code-based (PHP) |
| Documentation | Auto-generated OpenAPI | Manual |
| Validation | Declarative | Programmatic |
| Standards | JSON-LD, Hydra | JSON API |
| Learning curve | Lower | Higher |
| Flexibility | High | Very high |
| Use cases | Standard CRUD | Complex business logic |

Both can coexist in the same application. For further migration guidance, see [How to migrate to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html).

## Related documentation

For detailed implementation guides:

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html) - Setup and configuration
- [How to migrate to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html) - Migrate endpoints from Glue REST API
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating your first resource
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Schema syntax reference
- [Troubleshooting API Platform](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues

## Next steps

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [API Platform official documentation](https://api-platform.com/docs/)
