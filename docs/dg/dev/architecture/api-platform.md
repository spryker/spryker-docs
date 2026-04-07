---
title: API Platform
description: Spryker's API Platform integration provides schema-based API resource generation with automatic OpenAPI documentation and the integration of the API Platform Bundle.
last_updated: Apr 7, 2026
template: concept-topic-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: API Platform Configuration
    link: docs/dg/dev/architecture/api-platform/configuration.html
  - title: Relationships
    link: docs/dg/dev/architecture/api-platform/relationships.html
  - title: Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: Security
    link: docs/dg/dev/architecture/api-platform/security.html
  - title: Native API Platform Resources
    link: docs/dg/dev/architecture/api-platform/native-api-platform-resources.html
  - title: Sparse Fieldsets
    link: docs/dg/dev/architecture/api-platform/sparse-fieldsets.html
  - title: Error Handling
    link: docs/dg/dev/architecture/api-platform/error-handling.html
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

Spryker provides abstract base classes that simplify Provider and Processor implementation by routing operations to dedicated methods and providing built-in context helpers.

Detailed information about the API-Platform Provider and Processor concepts can be found on the public docs:
- [API Platform Providers](https://api-platform.com/docs/core/state-providers/)
- [API Platform Processors](https://api-platform.com/docs/core/state-processors/)

**Provider (read operations):**

```php
class CustomerBackendProvider extends AbstractProvider
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {}

    protected function provideItem(): ?object
    {
        // GET /customers/{id} — fetch single resource
        return $this->mapToResource(
            $this->customerFacade->findCustomerByReference($this->getUriVariables()['customerReference']),
        );
    }

    protected function provideCollection(): iterable
    {
        // GET /customers — fetch paginated collection
        return $this->customerFacade->getCustomerCollection($this->getPagination());
    }
}
```

**Processor (write operations):**

```php
class CustomerBackendProcessor extends AbstractProcessor
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {}

    protected function processPost(): mixed
    {
        // POST /customers — create resource
        return $this->mapToResource(
            $this->customerFacade->createCustomer($this->mapToTransfer($this->data)),
        );
    }

    protected function processPatch(): mixed
    {
        // PATCH /customers/{id} — update resource
        return $this->mapToResource(
            $this->customerFacade->updateCustomer($this->mapToTransfer($this->data)),
        );
    }

    protected function processDelete(): mixed
    {
        // DELETE /customers/{id} — delete resource
        $this->customerFacade->deleteCustomer($this->getUriVariables()['customerReference']);

        return null;
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

This API is configured to serve the JSON:API format by default, which can be configured per project.

- **API Type:** `storefront`
- **Application:** Glue
- **Base URL:** `http://glue-storefront.eu.spryker.local/` - Configurable per project
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### GlueBackend API

- **API Type:** `backend`
- **Application:** Glue
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

API Platform fully integrates with Symfony Dependency Injection. Providers and Processors referenced in resource schema YAML files are automatically discovered and registered as public, autowired services. No manual service registration is needed for standard cases.

If you need custom service configuration (non-standard constructor arguments, decorators, etc.), you can still register services manually in your `ApplicationServices.php`:

```php
// config/Glue/ApplicationServices.php
$services->load('Pyz\\Glue\\', '../../../src/Pyz/Glue/');
```

Providers and Processors can use constructor injection to access Zed facades and other services:

```php
class CustomerBackendProvider extends AbstractProvider
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {}
}
```

### Facade integration

Glue layer Providers and Processors access business logic through Zed facades:

```php
class CustomerBackendProcessor extends AbstractProcessor
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {}

    protected function processPost(): mixed
    {
        $customerTransfer = $this->mapToTransfer($this->data);
        $response = $this->customerFacade->createCustomer($customerTransfer);

        return $this->mapToResource($response->getCustomerTransfer());
    }
}
```

## Resource generation

### Console commands

All the following commands can be used with a specific GLUE_APPLICATION by prefixing them with `GLUE_APPLICATION=GLUE_BACKEND` environment variable. For example: `docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug --list`

```bash
# Generate resource classes for all configured API types at once. Usually used during deployment/installation.
docker/sdk cli glue api:generate

# Generate API type specific resource classes. Usually used during development.
docker/sdk cli glue api:generate backend

# Validate schemas only to see if there is any issue in the definitions
docker/sdk cli glue api:generate --validate-only
```

### Debug commands

```bash
# List all resources to see which ones are defined in the schema files.
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

You can disable this interface in production environments by configuring the settings in your `api_platform.php` configuration file. For details, see [Disable Swagger UI](/docs/dg/dev/architecture/api-platform/configuration.html#disable-swaggerui-in-production). 

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

### Relationships

Include related resources via the `?include=` query parameter:

```yaml
includes:
  - relationshipName: addresses
    targetResource: CustomersAddresses
    uriVariableMappings:
      customerReference: customerReference
```

Request:

```markdown
GET /customers/customer--35?include=addresses
```

Response includes both the customer and related addresses in JSON:API format. No provider code changes required - relationships work automatically through decoration.

For detailed information, see [Relationships](/docs/dg/dev/architecture/api-platform/relationships.html).

### Error handling

All exceptions are automatically converted to JSON:API error responses with domain-specific error codes. Providers and Processors throw `GlueApiException` with an HTTP status code, a numeric error code, and a message. Validation errors return status `422` with detailed field-level violations.

For detailed information, see [Error Handling](/docs/dg/dev/architecture/api-platform/error-handling.html).

### ETag support

ETag response headers are automatically added when a Provider stores an etag value in the response context. This enables client-side caching and conditional requests.

### Pagination links

Collection responses with pagination automatically include `first`, `last`, `prev`, and `next` links in the JSON:API response. No additional configuration is needed — the links are generated based on the current page, items per page, and total item count returned by the Provider.

### Sparse fieldsets

Request only the attributes you need using the `fields` query parameter:

```markdown
GET /stores?fields[stores]=name,locale
```

This returns only `name` and `locale` in the response attributes, reducing payload size. Sparse fieldsets work with relationships too — filter attributes on both the main resource and included resources.

For detailed information, see [Sparse Fieldsets](/docs/dg/dev/architecture/api-platform/sparse-fieldsets.html).

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
| Standards | JSON:API, JSON-LD, Hydra | JSON API |
| Learning curve | Lower | Higher |
| Flexibility | High | Very high |
| Use cases | Standard CRUD | Complex business logic |

Both can coexist in the same application. For further migration guidance, see [How to migrate to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html).

## Related documentation

For detailed implementation guides:

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html) - Setup and configuration
- [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html) - Authentication and authorization setup
- [How to migrate to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html) - Migrate endpoints from Glue API
- [API Platform Configuration](/docs/dg/dev/architecture/api-platform/configuration.html) - Configure API Platform settings
- [Security](/docs/dg/dev/architecture/api-platform/security.html) - Authentication and authorization
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating your first resource
- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - Resource Schemas
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) - Validation Schemas
- [Native API Platform Resources](/docs/dg/dev/architecture/api-platform/native-api-platform-resources.html) - Using native PHP attributes
- [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html) - Region-specific resources
- [Sparse Fieldsets](/docs/dg/dev/architecture/api-platform/sparse-fieldsets.html) - Request only needed attributes
- [Error Handling](/docs/dg/dev/architecture/api-platform/error-handling.html) - Domain errors, validation, and error codes
- [Troubleshooting API Platform](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues

## Next steps

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html)
- [Native API Platform Resources](/docs/dg/dev/architecture/api-platform/native-api-platform-resources.html)
- [CodeBucket Support in API Platform](/docs/dg/dev/architecture/api-platform/code-buckets.html)
- [API Platform official documentation](https://api-platform.com/docs/)
