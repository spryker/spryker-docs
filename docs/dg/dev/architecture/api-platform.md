---
title: API Platform
description: Spryker's API Platform integration provides schema-based API resource generation with automatic OpenAPI documentation and the integration of the API Platform Bundle.
last_updated: Nov 24, 2025
template: concept-topic-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection.html
---

Spryker's API Platform integration provides schema-based API resource generation with automatic OpenAPI documentation. This allows you to define your API resources using YAML schemas and automatically generate fully functional API endpoints with validation, pagination, and serialization.

This document describes the API Platform architecture and how it integrates with Spryker.

## What is API Platform

API Platform is a framework for building modern APIs based on web standards and best practices. In Spryker, it complements the existing Glue API infrastructure by providing:

- **Schema-based resource generation**: Define resources in YAML, generate PHP classes automatically
- **Automatic OpenAPI documentation**: Interactive API documentation generated from schemas
- **Built-in validation**: Symfony Validator integration with operation-specific rules
- **Pagination support**: Standardized pagination with configurable defaults
- **State management**: Separate providers (read) and processors (write) for clean architecture

Read more about the API Platform project at [api-platform.com](https://api-platform.com/).

{% info_block warningBox "CodeBucket support" %}

Currently, the API-Platform integration does not support code buckets. When defining resources, use only the Core and Project layers.

Code bucket support is planned for future releases.

{% endinfo_block %}

## Architecture overview

### Resource generation workflow

```MARKDOWN
Schema Files (YAML)
    ↓
Schema Discovery & Validation
    ↓
Multi-layer Schema Merging (Core → Feature → Project → [Code Buckets])
    ↓
Resource Class Generation
    ↓
API Platform Resource (with attributes)
    ↓
API Endpoints
```

### Core components

#### 1. Schema files

Resources are defined in YAML files located in module directories:

```MARKDOWN
src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.resources.yml
src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.validation.yml
```

Example resource schema `src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.resources.yml`:

```yaml
resource:
  name: Customers
  shortName: Customer
  description: "Customer resource for backend API"

  provider: "Pyz\\Glue\\Customer\\Api\\Backend\\Provider\\CustomerBackendProvider"
  processor: "Pyz\\Glue\\Customer\\Api\\Backend\\Processor\\CustomerBackendProcessor"

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

Example validation schema `src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.validation.yml`:

```yaml
post:
  name:
    - NotBlank:
        message: First name is required
    - Length:
        min: 2
        max: 64
        minMessage: First name must be at least 2 characters
        maxMessage: First name cannot exceed 64 characters

patch:
  name:
    - Optional:
        constraints:
          - Length:
              min: 2
              max: 64
              minMessage: First name must be at least 2 characters
              maxMessage: First name cannot exceed 64 characters

```

#### 2. Generated resources

The generator creates PHP classes with API Platform attributes:

`src/Generated/Api/Backend/CustomersBackendResource.php`

```php
<?php

namespace Generated\Api\Backend;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [new Post(), new Get(), new GetCollection(), new Patch(), new Delete()],
    shortName: 'Customer',
    provider: CustomerBackendProvider::class,
    processor: CustomerBackendProcessor::class
)]
final class CustomersBackendResource
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

Detailed information about the API-Platform Provider and Resources can be found on the public docs:
- [API Platform Providers](https://api-platform.com/docs/core/state-providers/)
- [API Platform Processors](https://api-platform.com/docs/core/state-processors/)

**Provider (read operations):**

```php
class CustomerBackendProvider implements ProviderInterface
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
class CustomerBackendProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        // Persist changes through your business layer
        return $updatedResource;
    }
}
```

## API types

Any of the [existing APIs](https://docs.spryker.com/docs/integrations/spryker-glue-api/getting-started-with-apis/getting-started-with-apis) can be extended using API Platform.

Spryker supports multiple API types for different use cases:

### Glue API 

This API is configured to serve the JSON:API format by default, which can be configured per project. Projects migrating their APIs can provide new APIs as well as supporting the existing ones while migrating.

- **API Type:** `storefront`
- **Application:** Glue
- **Base URL:** `http://glue.eu.spryker.local/` - Configurable per project
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### GlueStorefront API 

Thie API is configured to serve the JSON+LD format by default, which can be configured per project.

- **API Type:** `storefront`
- **Application:** Glue
- **Base URL:** `http://glue-storefront.eu.spryker.local/` - Configurable per project
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### GlueBackend API

- **API Type:** `backend`
- **Application:** Zed
- **Base URL:** `http://glue-backend.eu.spryker.local/`
- **Use cases:** Admin panels, internal tools, ERP integrations

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

**Result**: A single merged resource with all properties, project code-bucket layer taking precedence.

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
class CustomerBackendProcessor implements ProcessorInterface
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
docker/sdk cli glue  api:generate

# Generate specific API type
docker/sdk cli glue  api:generate backend

# Validate schemas only
docker/sdk cli glue  api:generate --validate-only

# Dry run
docker/sdk cli glue  api:generate --dry-run
```

### Debug commands

```bash
# List all resources
docker/sdk cli glue  api:debug --list

# Inspect specific resource and print details about properties and operations
docker/sdk cli glue  api:debug customers --api-type=backend

# Show merged schema
docker/sdk cli glue  api:debug customers --api-type=backend --show-merged

# Show contributing files for a resource
docker/sdk cli glue  api:debug customers --api-type=backend --show-sources
```

## Features

### Automatic OpenAPI documentation

API Platform generates interactive OpenAPI documentation:

- Swagger UI at the root URL `/` for example `http://glue-backend.eu.spryker.local/`

You can disable this interface in production environments by configuring the `api_platform.enable_docs` setting in your configuration files. 

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

### Cache warming

Pre-generate resources during deployment:

```bash
docker/sdk cli glue  api:generate
```

or

```bash
docker/sdk cli glue  cache:warmup
```

### Property-level access control

```yaml
properties:
  password:
    writable: true   # Can be written
    readable: false  # Not in responses
```

## Comparison with Glue API

| Feature | API Platform | Glue API |
|---------|-------------|--------------|
| Definition | Schema-based (YAML) | Code-based (PHP) |
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
- [How to migrate to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html) - Migrate endpoints from Glue API
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating your first resource
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Schema syntax reference
- [Troubleshooting API Platform](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues

## Next steps

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [API Platform official documentation](https://api-platform.com/docs/)
