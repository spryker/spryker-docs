---
title: API Platform
description: Spryker's API Platform integration provides schema-based API resource generation with automatic OpenAPI documentation and the integration of the API Platform Bundle.
last_updated: Sep 4, 2026
template: concept-topic-template
related:
  - title: Integrate API Platform
    link: docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html
  - title: API Platform configuration
    link: docs/integrations/spryker-api/api-platform/configuration.html
  - title: Resource relationships
    link: docs/integrations/spryker-api/api-platform/relationships.html
  - title: Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: Security
    link: docs/integrations/spryker-api/authenticating-and-authorization/security.html
  - title: Native API Platform resources
    link: docs/integrations/spryker-api/api-platform/native-api-platform-resources.html
  - title: Sparse Fieldsets
    link: docs/integrations/spryker-api/api-platform/sparse-fieldsets.html
  - title: Serialization
    link: docs/integrations/spryker-api/api-platform/serialization.html
redirect_from:
  - /docs/dg/dev/architecture/api-platform.html
---

Spryker's API Platform integration provides schema-based API resource generation with automatic OpenAPI documentation. This allows you to define your API resources using YAML schemas and automatically generate fully functional API endpoints with validation, pagination, and [serialization](/docs/integrations/spryker-api/api-platform/serialization.html).

This document describes the API Platform architecture and how it integrates with Spryker.

## What is API Platform

API Platform is a framework for building modern APIs based on web standards and best practices. In Spryker, it complements the existing Glue API infrastructure by providing:

- **Schema-based resource generation**: Define resources in YAML, generate PHP classes automatically
- **Automatic OpenAPI documentation**: Interactive API documentation generated from schemas
- **Built-in validation**: Symfony Validator integration with operation-specific rules
- **Pagination support**: Standardized pagination with configurable defaults
- **State management**: Separate providers (read) and processors (write) for clean architecture

Read more about the API Platform project at [api-platform.com](https://api-platform.com/).

### Why Spryker is moving to API Platform

API Platform replaces Spryker-specific patterns for routing, authentication, and resource definition with industry-standard Symfony conventions, automatic OpenAPI schema generation, and a clean separation between resource schema, provider, and validation.

| Aspect | Previous infrastructure | API Platform |
|---|---|---|
| Bootstrap | Spryker-specific application bootstrap | Symfony Kernel-based routing |
| Resource registration | Manual plugin registration in `GlueApplicationDependencyProvider` | Declarative YAML resource definitions (`*.resource.yml`) |
| Authentication | Custom flows per module | Standard OAuth2 / Symfony Security |
| Coupling | Tight coupling between resource and routing logic | Clean separation: provider + resource schema + validation |
| Testability | Complex to test and extend | Symfony-native, testable with standard PHPUnit patterns |
| OpenAPI | Manual / partial | Automatic OpenAPI schema generation |

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
src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.resource.yml
src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.validation.yml
```

Example resource schema `src/Spryker/{Module}/resources/api/{api-type}/{resource-name}.resource.yml`:

```yaml
resource:
  name: Customers
  shortName: customers
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
    shortName: 'customers',
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

Any of the [existing APIs](/docs/integrations/spryker-api/getting-started-with-apis/getting-started-with-apis.html) can be extended using API Platform.

Spryker supports multiple API types for different use cases:

### Glue API 

This API is configured to serve the [JSON:API](https://jsonapi.org/format/) format by default; to change the supported formats, see [Configure supported formats](/docs/integrations/spryker-api/api-platform/configuration.html#configure-supported-formats). Projects migrating their APIs can provide new APIs as well as supporting the existing ones while migrating.

- **API Type:** `storefront`
- **Application:** Glue
- **Base URL:** `http://glue.eu.spryker.local/` - Configurable per project
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### GlueStorefront API 

This API serves the [JSON:API](https://jsonapi.org/format/) format by default; additional formats, such as JSON-LD, can be enabled per project. For instructions, see [Configure supported formats](/docs/integrations/spryker-api/api-platform/configuration.html#configure-supported-formats).

- **API Type:** `storefront`
- **Application:** GlueStorefront
- **Base URL:** `http://glue-storefront.eu.spryker.local/` - Configurable per project
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### GlueBackend API

- **API Type:** `backend`
- **Application:** GlueBackend
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
class CustomerBackendProvider implements ProviderInterface
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

You can disable this interface in production environments by configuring the settings in your `api_platform.php` configuration file. For details, see [Enable the documentation UI only in development](/docs/integrations/spryker-api/api-platform/configuration.html#enable-the-documentation-ui-only-in-development).

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

For detailed information, see [Resource relationships](/docs/integrations/spryker-api/api-platform/relationships.html).

### Sparse fieldsets

Request only the attributes you need using the `fields` query parameter:

```markdown
GET /stores?fields[stores]=name,locale
```

This returns only `name` and `locale` in the response attributes, reducing payload size. Sparse fieldsets work with relationships too — filter attributes on both the main resource and included resources.

For detailed information, see [Sparse Fieldsets](/docs/integrations/spryker-api/api-platform/sparse-fieldsets.html).

## Performance

### Opcache

API Platform loads a significantly larger class graph per request than the legacy Glue stack—the Symfony kernel, serializer, validator, security components, and the generated resource classes. Opcache must be enabled on all deployed environments; without it, every request recompiles this class graph, adding a flat overhead of seconds per request. For configuration details, see [Opcache activation](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#opcache-activation).

### Cache warming

API Platform deployment requires two sequential steps, not alternatives:

1. Generate the API resource classes from the schema files:

```bash
docker/sdk cli glue api:generate
```

2. Warm the application cache—including the **router cache**—once the resources from step 1 exist. Run it per Glue application:

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue cache:warmup
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue cache:warmup
```

API Platform registers its operations as routes in the standard Symfony router, whose compiled matcher and generator are dumped to `data/cache/Glue<Storefront|Backend>/<environment>/url_matching_routes.php` and `url_generating_routes.php`. `cache:warmup` builds these dumps from the resource collection produced in step 1. Add both steps to your deployment and installation recipes for every API Platform application.

{% info_block warningBox "Use cache:warmup, not api:router:cache:warm-up" %}

`api:router:cache:warm-up` warms only the legacy Glue (`GlueApplication`) custom-route router—it does **not** build the API Platform router dump. Use `cache:warmup` (or `cache:clear`) to warm the API Platform router.

{% endinfo_block %}

#### Multi-container and cloud deployments

In production, applications run with debug disabled. The router dump is then written once and never revalidated—whatever route set it was first built from is frozen for the life of the container.

In a single-container setup this is harmless: the cache is warmed in the same place that serves requests, with the full route set. In a multi-container topology where resource generation runs in a build container and requests are served by a separate runtime container (for example, AWS ECS), you must guarantee the router dump is built against the complete resource collection **for the runtime container**—either warmed in the runtime container after deployment, or baked at build time only if `data/cache` is shipped to every runtime replica with the full route set.

If the dump is built before resources are generated (an empty or incomplete collection), the runtime container freezes that empty dump and:

- every API request returns HTTP 404 (Glue code `007`, legacy fallthrough) because the route is absent from the matcher;
- once the matcher is partially rebuilt, data endpoints return HTTP 500 from IRI generation (`RouteNotFoundException`), because the URL generator dump is also empty;
- `/docs.json` returns 0 paths, even though `api:debug --list` shows the resources resolving correctly.

To recover a frozen container, clear and re-warm the cache (`cache:clear`) with the full resource collection present.

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
| Standards | JSON:API by default; JSON-LD and other formats available | JSON API |
| Use cases | Standard CRUD | Complex business logic |

Both can coexist in the same application. For further migration guidance, see [Migrate to API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/migrate-to-api-platform.html).

## Next steps

- [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html) - Setup and configuration
- [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html) - Authentication and authorization setup
- [Migrate to API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/migrate-to-api-platform.html) - Migrate endpoints from Glue API
- [API Platform configuration](/docs/integrations/spryker-api/api-platform/configuration.html) - Configure API Platform settings
- [Security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html) - Authentication and authorization
- [Implement an API Platform resource](/docs/integrations/spryker-api/api-platform/enablement.html) - Creating your first resource
- [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html) - Resource schemas
- [Typed collections in the published contract](/docs/integrations/spryker-api/api-platform/typed-collections.html) - What object collections publish, and when to adopt them
- [Validation schemas](/docs/integrations/spryker-api/api-platform/validation-schemas.html) - Validation schemas
- [Native API Platform resources](/docs/integrations/spryker-api/api-platform/native-api-platform-resources.html) - Using native PHP attributes
- [CodeBucket support](/docs/integrations/spryker-api/api-platform/code-buckets.html) - Region-specific resources
- [Sparse Fieldsets](/docs/integrations/spryker-api/api-platform/sparse-fieldsets.html) - Request only needed attributes
- [Serialization](/docs/integrations/spryker-api/api-platform/serialization.html) - How requests and responses are serialized
- [Troubleshooting API Platform](/docs/integrations/spryker-api/api-platform/troubleshooting.html) - Common issues
- [API Platform official documentation](https://api-platform.com/docs/symfony/)
