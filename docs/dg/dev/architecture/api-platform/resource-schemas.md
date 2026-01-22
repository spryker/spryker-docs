---
title: Resource Schema in API Platform
description: Understanding API Platform resource schema definitions in Spryker.
last_updated: Jan 8, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
  - title: CodeBucket Support
    link: docs/dg/dev/architecture/api-platform/code-buckets.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: API Platform Testing
    link: docs/dg/dev/architecture/api-platform/testing.html
---

This document explains how to define API Platform resource schemas in Spryker.

## Schema file structure

API Platform uses YAML files to define resource schemas. Resource schemas describe the structure, operations, and behavior of your API resources.

### Schema location

Resource schemas must be placed in the `resources/api/{api-type}/` directory within your module:

```MARKDOWN
src/
├── Spryker/
│   └── {Module}/
│       └── resources/
│           └── api/
│               ├── storefront/
│               │   └── resource-name.yml
│               └── backend/
│                   └── resource-name.yml
├── SprykerFeature/
│   └── {Feature}/
│       └── resources/
│           └── api/
│               └── backend/
│                   └── resource-name.yml
└── Pyz/
    └── Glue/
        └── {Module}/
            └── resources/
                └── api/
                    └── backend/
                        └── resource-name.yml
```

## CodeBucket resources

API Platform supports CodeBucket-specific resource variants that are resolved at runtime based on the `APPLICATION_CODE_BUCKET` environment constant. This enables Code Bucket-specific API resources without requiring separate container compilations.

### CodeBucket schema file naming

Resource schemas follow the pattern: `{resource-name}.resource.yml`
Validation schemas follow the pattern: `{resource-name}.validation.yml`

CodeBuckets are specified inside the schema files, not in the filename.

```MARKDOWN
src/Pyz/Glue/Store/resources/api/backend/
├── stores.resource.yml              # Resource schema (CodeBucket variants defined inside)
└── stores.validation.yml            # Validation schema (CodeBucket variants defined inside)
```

### Generated class naming

The generator creates classes following the pattern: `{ResourceName}{CodeBucket}{ApiType}Resource`

| Schema File | CodeBucket (defined in file) | Generated Class | CODE_BUCKET Constant |
|-------------|------------------------------|----------------|---------------------|
| `stores.resource.yml` | None (base) | `StoresBackendResource` | Not present (base resource) |
| `stores.resource.yml` | EU | `StoresEUBackendResource` | `'EU'` |
| `stores.resource.yml` | AT | `StoresATBackendResource` | `'AT'` |

### How CodeBucket resolution works

1. **Schema definition**: Define CodeBucket variants inside schema files using `codeBucket: EU`
2. **Constant generation**: Generator adds `public const string CODE_BUCKET = 'EU';` to variant classes
3. **Runtime resolution**: System reads `APPLICATION_CODE_BUCKET` and selects matching resource class
4. **Graceful fallback**: If no matching variant exists, base resource is used

### URL consistency

All CodeBucket variants share the same URL path, with the Code Bucket defined in the domain:

- EU variant: `glue-backend.eu.spryker.local/stores` → `StoresEUBackendResource`
- AT variant: `glue-backend.at.spryker.local/stores` → `StoresATBackendResource`
- DE variant: `glue-backend.de.spryker.local/stores` → `StoresBackendResource` (or `StoresDEBackendResource` if variant exists)

The URL path is identical (`/stores`), but the Code Bucket in the domain determines which resource variant is used. Only properties, validations, and business logic differ between variants.

### When to use CodeBucket resources

Use CodeBucket variants when you need:
- Code Bucket-specific properties (EU GDPR fields, tax rates)
- Code Bucket-specific validation rules
- Country-specific business logic
- Feature variations per Code Bucket

For a comprehensive guide including implementation examples, see [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html).

## Resource schema syntax

### Minimal example

```yaml
resource:
  name: Products
  shortName: Product
  description: "Product resource"

  operations:
    - type: Get
    - type: GetCollection

  properties:
    id:
      type: integer
      writable: false
      identifier: true

    name:
      type: string
```

### Complete example with all options

```yaml
# yaml-language-server: $schema=../../../../SprykerSdk/Api/resources/schemas/api-resource-schema-v1.json

resource:
  # Resource identification
  name: Customers                    # Internal name (used for schema merging)
  shortName: Customer                # URL name (becomes /customers)
  description: "Customer resource"   # OpenAPI description

  # State providers and processors
  provider: "Pyz\\Glue\\Customer\\Api\\Backend\\Provider\\CustomerBackendProvider"
  processor: "Pyz\\Glue\\Customer\\Api\\Backend\\Processor\\CustomerBackendProcessor"

  # Pagination configuration
  paginationEnabled: true
  paginationItemsPerPage: 10
  paginationMaximumItemsPerPage: 100
  paginationClientEnabled: true
  paginationClientItemsPerPage: true

  # Security
  security: "is_granted('ROLE_ADMIN')"
  securityPostDenormalize: "is_granted('EDIT', object)"

  # Operations
  operations:
    - type: Post                     # Create new resource
    - type: Get                      # Get single resource
    - type: GetCollection            # Get collection with pagination
    - type: Put                      # Replace entire resource
    - type: Patch                    # Update partial resource
    - type: Delete                   # Delete resource

  # Properties
  properties:
    idCustomer:
      type: integer
      description: "The unique identifier of the customer."
      writable: false                # Read-only property
      readable: true                 # Include in responses (default: true)

    email:
      type: string
      description: "The email address."
      required: true                 # Required for all operations
      openapiContext:
        example: "john@example.com"
        format: "email"

    firstName:
      type: string
      description: "First name."
      openapiContext:
        example: "John"
        minLength: 1
        maxLength: 100

    status:
      type: string
      description: "Customer status."
      openapiContext:
        example: "active"
        schema:
          enum: ["active", "inactive", "pending"]

    customerReference:
      type: string
      description: "Unique customer reference."
      writable: false
      identifier: true               # Use as URL identifier instead of @id

    dateOfBirth:
      type: string
      description: "Date of birth."
      openapiContext:
        format: "date"
        example: "1990-01-01"

    isActive:
      type: boolean
      description: "Active status."
      default: true

    creditLimit:
      type: number
      description: "Credit limit."
      openapiContext:
        format: "float"
        example: 5000.00
```

## Property types

### Supported types

| Type | PHP Type | Example | Description |
|------|----------|---------|-------------|
| `string` | `string` | `"John"` | Text values |
| `integer` | `int` | `42` | Whole numbers |
| `number` | `float` | `3.14` | Decimal numbers |
| `boolean` | `bool` | `true` | True/false values |
| `array` | `array` | `["a", "b"]` | Arrays |
| `object` | `object` | `{"key": "value"}` | Nested objects |

### Property attributes

#### writable

Controls if property can be sent in requests (POST/PUT/PATCH):

```yaml
password:
  type: string
  writable: true    # Can be sent in requests
  readable: false   # Not included in responses
```

#### readable

Controls if property is included in responses:

```yaml
idCustomer:
  type: integer
  writable: false   # Cannot be modified
  readable: true    # Included in responses
```

#### identifier

Marks property as URL identifier:

```yaml
customerReference:
  type: string
  identifier: true  # URL becomes /customers/{customerReference}
```

#### required

Makes property mandatory (use validation schemas for detailed rules):

```yaml
email:
  type: string
  required: true    # Must be present
```

#### default

Sets default value:

```yaml
isActive:
  type: boolean
  default: true     # Defaults to true if not provided
```

## Operations

Define which HTTP operations are available for the resource:

```yaml
operations:
  - type: Get                      # GET /customers/{id}
  - type: GetCollection            # GET /customers
  - type: Post                     # POST /customers
  - type: Put                      # PUT /customers/{id}
  - type: Patch                    # PATCH /customers/{id}
  - type: Delete                   # DELETE /customers/{id}
```

The operation names map to HTTP methods:
- `post` → POST (create)
- `get` → GET (single resource)
- `getCollection` → GET (collection)
- `put` → PUT (replace)
- `patch` → PATCH (update)
- `delete` → DELETE (remove)

## Resource generation process

### Generation workflow

The resource generation process is organized into distinct phases, each producing result objects for comprehensive error tracking and reporting:

```MARKDOWN
1. Preparation Phase
   ↓
2. Schema Parsing Phase → ParseResult
   - Load validation schemas
   - Parse validation rules
   - Load resource schemas
   - Parse resource definitions
   ↓
3. Schema Merging Phase → MergeResult
   - Merge schemas (Core → Feature → Project)
   - Track contributing source files
   ↓
4. Validation Phase → ValidationResult
   - Validate merged schemas
   - Apply validation rules
   ↓
5. Code Generation Phase
   - Generate PHP resource classes
   - Write files to output directory
   ↓
6. Cache Update
```

### Result objects

Each phase produces result objects that encapsulate both successful outcomes and failures:

- **ParseResult**: Contains grouped schemas and tracks failed validation files and schema files that could not be parsed
- **MergeResult**: Contains successfully merged schemas and tracks resources that failed to merge
- **ValidationResult**: Contains validated schemas and tracks resources that failed validation with detailed error messages

This structured approach ensures that errors in one resource do not block the generation of other valid resources, and provides clear feedback about what succeeded and what failed.

### Multi-layer schema merging

Spryker automatically merges schemas from multiple layers:

**Core layer** (lowest priority):

```yaml
# vendor/spryker/customer/resources/api/backend/customer.yml
resource:
  name: Customers
  properties:
    email:
      type: string
    firstName:
      type: string
```

**Feature layer** (medium priority):

```yaml
# src/SprykerFeature/CRM/resources/api/backend/customer.yml
resource:
  name: Customers
  properties:
    phone:
      type: string      # Added property
```

**Project layer** (highest priority):

```yaml
# src/Pyz/GLue/Customer/resources/api/backend/customer.yml
resource:
  name: Customers
  properties:
    email:
      required: true    # Override core definition
    customField:
      type: string      # Project-specific field
```

**Merged result:**

```yaml
resource:
  name: Customers
  properties:
    email:
      type: string
      required: true    # From project layer
    firstName:
      type: string      # From core layer
    phone:
      type: string      # From feature layer
    customField:
      type: string      # From project layer
```

### Generated resource class

The generator creates a complete PHP class with API Platform attributes:

```php
<?php

declare(strict_types=1);
namespace Generated\Api\Backend;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;

#[ApiResource(
    operations: [new Post(), new Get(), new GetCollection(), new Patch(), new Delete()],
    shortName: 'Customer',
    provider: CustomerBackendProvider::class,
    processor: CustomerBackendProcessor::class,
    paginationItemsPerPage: 10
)]
final class CustomersBackendResource
{
    #[ApiProperty(writable: false)]
    public ?int $idCustomer = null;

    #[ApiProperty(openapiContext: ['example' => 'john@example.com'])]
    #[Assert\NotBlank(groups: ['customers:create'])]
    #[Assert\Email(groups: ['customers:create'])]
    public ?string $email = null;

    #[ApiProperty(identifier: true, writable: false)]
    public ?string $customerReference = null;

    // Getters, setters, toArray(), fromArray() methods...
}
```

## Debugging schemas

### Debug commands

```bash
# List all resources
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug --list

# Show specific resource
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug customers --api-type=backend

# Show merged schema
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug customers --api-type=backend --show-merged

# Show contributing source files
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug customers --api-type=backend --show-sources

# Validate schemas without generating
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --validate-only
```

### Common schema errors

The generator validates schemas and provides detailed error messages:

```bash
# Missing required fields
Error: Resource "customers" is missing required field "name"

# Invalid operation type
Error: Invalid operation type "INVALID". Must be one of: Get, Post, Put, Patch, Delete, GetCollection

# Invalid property type
Error: Property "age" has invalid type "int". Must be one of: string, integer, number, boolean, array, object

# Provider class not found
Error: Provider class "Pyz\Glue\Customer\Api\Backend\Provider\MissingProvider" does not exist
```

## Advanced schema features

### Custom operations

Define custom operations beyond standard CRUD:

```yaml
operations:
  - type: Post
    uriTemplate: "/customers/{id}/activate"
    method: "POST"
    processor: "Pyz\\Glue\\Customer\\Api\\Backend\\Processor\\CustomerActivationProcessor"
```

### Nested resources

Define relationships between resources:

```yaml
properties:
  addresses:
    type: array
    description: "Customer addresses"
    items:
      type: object
      properties:
        street:
          type: string
        city:
          type: string
```

### Security expressions

Add fine-grained security:

```yaml
resource:
  security: "is_granted('ROLE_ADMIN')"
  securityPostDenormalize: "is_granted('EDIT', object)"
```

## Generation commands

### Basic generation

```bash
# Generate all configured API types
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate

# Generate specific API type
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate backend
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue api:generate storefront

# Generate with options
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --dry-run           # Preview without writing
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --validate-only     # Only validate schemas
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --resource=customers  # Generate single resource
```

### Output

```bash
Generating API resources for ApiType: backend

Discovering schema files...
Validating schemas... OK
Merging schemas... OK

Generating resources:
 10/10 [============================] 100%

Generated: 10 file(s)
Cache updated

Done!
```

## Schema validation rules

The generator enforces these rules:

### Required fields

Every resource must have:
- `name` - Internal resource name
- `shortName` - URL-friendly name
- At least one `operation`
- At least one `property`

### Valid operation types

Only these operation types are allowed:
- `Get` - Retrieve single resource
- `GetCollection` - Retrieve collection
- `Post` - Create resource
- `Put` - Replace entire resource
- `Patch` - Update partial resource
- `Delete` - Delete resource

### Valid property types

Only these property types are allowed:
- `string`
- `integer`
- `number`
- `boolean`
- `array`
- `object`

### Provider/Processor validation

- Provider/Processor classes must exist
- Classes must implement correct interfaces
- Namespaces must be valid PHP namespaces

## Best practices

### 1. Use semantic naming

```yaml
# ✅ Good
resource:
  name: Customers
  shortName: Customer

# ❌ Bad
resource:
  name: CustomerData
  shortName: cust
```

### 2. Document all properties

```yaml
# ✅ Good
email:
  type: string
  description: "The customer's email address used for login and notifications"

# ❌ Bad
email:
  type: string
```

### 3. Leverage schema merging

```yaml
# Core: Define base properties
# src/Spryker/Customer/resources/api/backend/customer.yml
resource:
  name: Customers
  properties:
    email:
      type: string

# Project: Only override what's needed
# src/Pyz/Glue/Customer/resources/api/backend/customer.yml
resource:
  name: Customers
  properties:
    email:
      required: true  # ← Only the difference
```

### 4. Use readable/writable correctly

```yaml
# Read-only fields (IDs, timestamps)
idCustomer:
  type: integer
  writable: false

# Write-only fields (passwords)
password:
  type: string
  readable: false

# Read-write fields (normal data)
email:
  type: string
  writable: true
  readable: true
```

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Architecture overview
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) - Define validation rules
- [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html) - Code Bucket-specific resources
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html) - Writing and running tests
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues
- [API Platform Documentation](https://api-platform.com/docs/) - Official API Platform docs
