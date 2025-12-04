---
title: Schemas and Resource Generation
description: Understanding API Platform schema definitions and the resource generation process in Spryker.
last_updated: Nov 24, 2025
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
---

This document explains how API Platform schemas are defined and how resources are generated in Spryker.

## Schema file structure

API Platform uses YAML files to define resource schemas. Schemas describe the structure, operations, and behavior of your API resources.

### Schema location

Schemas must be placed in the `resources/api/{api-type}/` directory within your module:

```MARKDOWN
src/
├── Spryker/
│   └── {Module}/
│       └── resources/
│           └── api/
│               ├── storefront/
│               │   ├── resource-name.yml
│               │   └── resource-name.validation.yml
│               └── backoffice/
│                   ├── resource-name.yml
│                   └── resource-name.validation.yml
├── SprykerFeature/
│   └── {Feature}/
│       └── resources/
│           └── api/
│               └── backoffice/
│                   └── resource-name.yml
└── Pyz/
    └── Glue/
        └── {Module}/
            └── resources/
                └── api/
                    └── backoffice/
                        └── resource-name.yml
```

### Basic schema structure

A complete resource schema consists of two files:

1. **Resource schema** (`{resource-name}.yml`) - Defines structure and operations
2. **Validation schema** (`{resource-name}.validation.yml`) - Defines validation rules

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

Makes property mandatory (use validation schema for detailed rules):

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

## Validation schema syntax

Validation schemas define constraints for each operation type.

### Basic validation

```yaml
post:
  email:
    - NotBlank:
        message: "Email is required"
    - Email:
        message: "Invalid email format"

  firstName:
    - NotBlank
    - Length:
        min: 2
        max: 100
        minMessage: "Name must be at least {{ limit }} characters"
        maxMessage: "Name cannot exceed {{ limit }} characters"

patch:
  email:
    - Optional:
        constraints:
          - NotBlank
          - Email
```

### Available validation constraints

#### String constraints

```yaml
# Required field
- NotBlank:
    message: "This field is required"

# Email validation
- Email:
    message: "Invalid email format"

# Length validation
- Length:
    min: 2
    max: 100
    minMessage: "Too short"
    maxMessage: "Too long"

# Regular expression
- Regex:
    pattern: '/^[A-Z][a-z]+$/'
    message: "Must start with uppercase letter"

# Choice from list
- Choice:
    choices: ["active", "inactive", "pending"]
    message: "Invalid status"

# URL validation
- Url:
    message: "Invalid URL"
```

#### Numeric constraints

```yaml
# Positive number
- Positive:
    message: "Must be positive"

# Range validation
- Range:
    min: 0
    max: 100
    notInRangeMessage: "Must be between {{ min }} and {{ max }}"

# Greater than
- GreaterThan:
    value: 0
    message: "Must be greater than {{ compared_value }}"
```

#### Date constraints

```yaml
# Date format
- Date:
    message: "Invalid date format"

# DateTime format
- DateTime:
    message: "Invalid datetime format"

# Future date
- GreaterThan:
    value: "today"
    message: "Must be a future date"
```

#### Security constraints

```yaml
# Password strength
- NotCompromisedPassword:
    message: "This password has been leaked in a data breach"

# Complex password requirements
- Regex:
    pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'
    message: "Password must contain uppercase, lowercase, number, and special character"
```

### Operation-specific validation

Define different rules for different operations:

```yaml
post:
  password:
    - NotBlank
    - Length:
        min: 12
        max: 128
    - Regex:
        pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/'
        message: "Password must contain uppercase, lowercase, and number"

patch:
  password:
    - Optional:
        constraints:
          - Length:
              min: 12
              max: 128

put:
  password:
    - NotBlank
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

```MARKDOWN
1. Schema Discovery
   ↓
2. Schema Loading (YAML)
   ↓
3. Schema Parsing
   ↓
4. Schema Validation
   ↓
5. Schema Merging (Core → Feature → Project)
   ↓
6. Resource Class Generation
   ↓
7. Cache Update
```

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
docker/sdk cli glue  api:debug --list

# Show specific resource
docker/sdk cli glue  api:debug customers --api-type=backend

# Show merged schema
docker/sdk cli glue  api:debug customers --api-type=backend --show-merged

# Show contributing source files
docker/sdk cli glue  api:debug customers --api-type=backend --show-sources

# Validate schemas without generating
docker/sdk cli glue  api:generate --validate-only
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
docker/sdk cli glue  api:generate

# Generate specific API type
docker/sdk cli glue  api:generate backend
docker/sdk cli glue  api:generate storefront

# Generate with options
docker/sdk cli glue  api:generate --dry-run           # Preview without writing
docker/sdk cli glue  api:generate --validate-only     # Only validate schemas
docker/sdk cli glue  api:generate --resource=customers  # Generate single resource
```

### Output

```bash
Generating API resources for ApiType: backoffice

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

### 3. Use operation-specific validation

```yaml
# ✅ Good - Different rules per operation
post:
  password:
    - NotBlank
    - Length: { min: 12 }

patch:
  password:
    - Optional:
        constraints:
          - Length: { min: 12 }

# ❌ Bad - Same validation everywhere
password:
  required: true
```

### 4. Leverage schema merging

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

### 5. Use readable/writable correctly

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
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues
- [API Platform Documentation](https://api-platform.com/docs/) - Official API Platform docs
