---
title: CodeBucket Support in API Platform
description: Learn how to create and use CodeBucket-specific API resources in Spryker.
last_updated: Jan 8, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
---

This document explains how to create and use CodeBucket-specific API resources in API Platform.

## Overview

CodeBucket support enables API Platform to serve different resource variants based on the runtime `APPLICATION_CODE_BUCKET` environment constant. This allows you to maintain region-specific or market-specific API resources without requiring separate container compilations for each CodeBucket.

### Use cases

Use CodeBucket resources when you need:

- **Region-specific properties**: EU-specific GDPR fields, tax rates, compliance data
- **Market-specific validation**: Different validation rules per region or country
- **Localized business logic**: Country-specific processing requirements
- **Feature variations**: Enable features only in specific markets

### Key benefits

- **Single container**: Compile once, serve hundreds of CodeBuckets
- **Runtime resolution**: Automatic selection of correct resource variant
- **Graceful fallback**: Base resources used when CodeBucket variant doesn't exist
- **No duplication**: Share common logic while extending for specific needs

## How CodeBucket resolution works

### Architecture overview

API Platform uses a decorator pattern to intercept resource resolution and select the appropriate CodeBucket variant at runtime:

```MARKDOWN
Request → Symfony Routing → API Platform
                              ↓
                    CodeBucket Decorators
                              ↓
           ┌──────────────────┴──────────────────┐
           │                                     │
    Resource Class Resolver         Resource Name Collection Factory
    (Runtime resolution)            (Compile-time filtering)
           │                                     │
           └──────────────────┬──────────────────┘
                              ↓
                    Selected Resource Variant
                    (Base or CodeBucket-specific)
```

### Runtime resolution flow

```MARKDOWN
1. Request: GET /stores
   APPLICATION_CODE_BUCKET = 'EU'

2. CodeBucketResourceNameCollectionFactory
   → Filters resource collection at compile time
   → Includes only EU variants or base resources (no conflicts)

3. CodeBucketResourceClassResolver
   → Reads APPLICATION_CODE_BUCKET = 'EU'
   → Base class: StoresBackendResource
   → Builds variant name: StoresEUBackendResource
   → Checks: class_exists('Generated\Api\Backend\StoresEUBackendResource')
   → Validates: StoresEUBackendResource::CODE_BUCKET === 'EU'
   → Returns: StoresEUBackendResource

4. API Platform executes with EU-specific resource
   → Properties: base + EU-specific fields
   → Validations: base + EU-specific rules
```

### CodeBucket detection mechanism

The system identifies CodeBucket resources using three checks:

1. **Class existence**: `class_exists($codeBucketClassName)`
2. **Constant check**: `defined("$className::CODE_BUCKET")`
3. **Value match**: `constant("$className::CODE_BUCKET") === $currentCodeBucket`

### Generated CODE_BUCKET constant

CodeBucket resources automatically get a `CODE_BUCKET` constant during generation:

```php
// StoresEUBackendResource.php (EU variant)
final class StoresEUBackendResource
{
    public const string CODE_BUCKET = 'EU';

    // Properties...
}

// StoresBackendResource.php (base - no constant)
final class StoresBackendResource
{
    // Properties... (no CODE_BUCKET constant)
}
```

## Resource naming conventions

### File naming pattern

CodeBucket resource schemas follow the pattern: `{resource-name}-{CODE_BUCKET}.yml`

```MARKDOWN
src/Pyz/Glue/Store/resources/api/backend/
├── stores.yml              # Base resource
├── stores-EU.yml           # EU variant
├── stores-AT.yml           # Austria variant
├── stores-DE.yml           # Germany variant
├── stores.validation.yml   # Base validation
├── stores-EU.validation.yml # EU validation
└── stores-AT.validation.yml # Austria validation
```

### Generated class naming pattern

The generator creates classes following: `{ResourceName}{CodeBucket}{ApiType}Resource`

| Schema File | Generated Class |
|-------------|----------------|
| `stores.yml` | `StoresBackendResource` |
| `stores-EU.yml` | `StoresEUBackendResource` |
| `stores-AT.yml` | `StoresATBackendResource` |
| `stores-EU.yml` (Storefront) | `StoresEUStorefrontResource` |

### URL consistency

All CodeBucket variants share the same URL endpoints:

- Base: `/stores` → `StoresBackendResource`
- EU: `/stores` → `StoresEUBackendResource`
- AT: `/stores` → `StoresATBackendResource`

The URL routing is identical across all variants. Only the properties, validations, and business logic differ.

## Creating CodeBucket resources

### Basic example

**Step 1: Create base resource**

`src/Pyz/Glue/Store/resources/api/backend/stores.yml`

```yaml
resource:
  name: Stores
  shortName: Store
  description: "Store resource"

  provider: "Pyz\\Glue\\Store\\Api\\Backend\\Provider\\StoreBackendProvider"
  processor: "Pyz\\Glue\\Store\\Api\\Backend\\Processor\\StoreBackendProcessor"

  operations:
    - type: Get
    - type: GetCollection

  properties:
    idStore:
      type: integer
      writable: false
      identifier: true

    name:
      type: string
      description: "Store name"

    timezone:
      type: string
      description: "Store timezone"
```

**Step 2: Create CodeBucket variant**

`src/Pyz/Glue/Store/resources/api/backend/stores-EU.yml`

```yaml
resource:
  name: Stores
  shortName: Store
  description: "EU-specific store resource"

  # Same provider and processor as base
  provider: "Pyz\\Glue\\Store\\Api\\Backend\\Provider\\StoreBackendProvider"
  processor: "Pyz\\Glue\\Store\\Api\\Backend\\Processor\\StoreBackendProcessor"

  operations:
    - type: Get
    - type: GetCollection

  properties:
    idStore:
      type: integer
      writable: false
      identifier: true

    name:
      type: string
      description: "Store name"

    timezone:
      type: string
      description: "Store timezone"

    # EU-specific properties
    taxRate:
      type: number
      description: "EU tax rate"
      openapiContext:
        example: 19.0

    gdprContactEmail:
      type: string
      description: "GDPR contact email"
      openapiContext:
        example: "privacy@example.com"

    vatRegistrationNumber:
      type: string
      description: "VAT registration number"
```

**Step 3: Create validation schemas**

`src/Pyz/Glue/Store/resources/api/backend/stores-EU.validation.yml`

```yaml
post:
  taxRate:
    - NotBlank
    - Range:
        min: 0
        max: 100

  gdprContactEmail:
    - NotBlank
    - Email

  vatRegistrationNumber:
    - NotBlank
    - Regex:
        pattern: '/^[A-Z]{2}[0-9]{8,12}$/'
        message: "Invalid VAT format"
```

**Step 4: Generate resources**

```bash
docker/sdk cli glue api:generate backend
```

This generates:
- `src/Generated/Api/Backend/StoresBackendResource.php` (base)
- `src/Generated/Api/Backend/StoresEUBackendResource.php` (with `CODE_BUCKET = 'EU'`)

**Step 5: Implement Provider with CodeBucket awareness**

`src/Pyz/Glue/Store/Api/Backend/Provider/StoreBackendProvider.php`

```php
<?php

namespace Pyz\Glue\Store\Api\Backend\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Pyz\Glue\Store\Business\StoreFacadeInterface;

class StoreBackendProvider implements ProviderInterface
{
    public function __construct(
        protected StoreFacadeInterface $storeFacade,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if (isset($uriVariables['idStore'])) {
            return $this->getStore((int) $uriVariables['idStore'], $operation);
        }

        return $this->getStores($operation);
    }

    protected function getStore(int $idStore, Operation $operation): ?object
    {
        $storeTransfer = $this->storeFacade->findStoreById($idStore);

        if ($storeTransfer === null) {
            return null;
        }

        $resourceClass = $operation->getClass();
        $resource = new $resourceClass();
        $resource->fromArray($storeTransfer->toArray());

        // Add EU-specific data if this is an EU resource
        if (defined("$resourceClass::CODE_BUCKET") && $resourceClass::CODE_BUCKET === 'EU') {
            $resource->taxRate = $storeTransfer->getTaxRate();
            $resource->gdprContactEmail = $storeTransfer->getGdprContactEmail();
            $resource->vatRegistrationNumber = $storeTransfer->getVatRegistrationNumber();
        }

        return $resource;
    }

    protected function getStores(Operation $operation): array
    {
        $stores = $this->storeFacade->getAllStores();

        $resources = [];
        foreach ($stores as $storeTransfer) {
            $resourceClass = $operation->getClass();
            $resource = new $resourceClass();
            $resource->fromArray($storeTransfer->toArray());

            if (defined("$resourceClass::CODE_BUCKET") && $resourceClass::CODE_BUCKET === 'EU') {
                $resource->taxRate = $storeTransfer->getTaxRate();
                $resource->gdprContactEmail = $storeTransfer->getGdprContactEmail();
                $resource->vatRegistrationNumber = $storeTransfer->getVatRegistrationNumber();
            }

            $resources[] = $resource;
        }

        return $resources;
    }
}
```

## Schema layering with CodeBuckets

CodeBucket resources support multi-layer schema merging just like base resources.

### Example: Multi-layer CodeBucket resource

**Core layer** (vendor):

```yaml
# vendor/spryker/store/resources/api/backend/stores-EU.yml
resource:
  name: Stores
  properties:
    taxRate:
      type: number
```

**Feature layer**:

```yaml
# src/SprykerFeature/Store/resources/api/backend/stores-EU.yml
resource:
  name: Stores
  properties:
    gdprContactEmail:
      type: string
```

**Project layer**:

```yaml
# src/Pyz/Glue/Store/resources/api/backend/stores-EU.yml
resource:
  name: Stores
  properties:
    taxRate:
      required: true  # Override core
    companyVatId:
      type: string    # Project-specific
```

**Merged result** (StoresEUBackendResource):

```yaml
resource:
  name: Stores
  properties:
    taxRate:
      type: number
      required: true      # From project
    gdprContactEmail:
      type: string        # From feature
    companyVatId:
      type: string        # From project
```

## Fallback behavior

### Graceful degradation

When `APPLICATION_CODE_BUCKET` is set but no matching variant exists, the system falls back to the base resource:

```MARKDOWN
Scenario: APPLICATION_CODE_BUCKET = 'AT'
Available resources:
  - StoresBackendResource (base)
  - StoresEUBackendResource (EU variant)

Result: StoresBackendResource is used (graceful fallback)
No errors, system continues to work
```

### No CodeBucket set

When `APPLICATION_CODE_BUCKET` is not set:

```MARKDOWN
Available resources:
  - StoresBackendResource (base)
  - StoresEUBackendResource (EU variant)
  - StoresATBackendResource (AT variant)

Result: StoresBackendResource is used
All CodeBucket variants are excluded from resource collection
```

## Resource collection filtering

### CodeBucketResourceNameCollectionFactory

This decorator filters the resource collection at compile time to prevent conflicts between base and CodeBucket variants.

**When APPLICATION_CODE_BUCKET is not set:**
- Include all base resources (no CODE_BUCKET constant)
- Exclude all CodeBucket variants

**When APPLICATION_CODE_BUCKET is set (example: 'EU'):**
1. Group resources by base class name
2. For each group:
   - If EU variant exists → include ONLY the EU variant
   - If no EU variant exists → include base resource (fallback)
   - Exclude all non-matching CodeBucket variants

**Example filtering:**

```MARKDOWN
Available classes:
  - StoresBackendResource (base)
  - StoresEUBackendResource (EU)
  - StoresATBackendResource (AT)
  - CustomersBackendResource (base, no variants)

With APPLICATION_CODE_BUCKET = 'EU':
  ✓ StoresEUBackendResource (EU variant exists)
  ✗ StoresBackendResource (excluded, EU variant preferred)
  ✗ StoresATBackendResource (excluded, wrong CodeBucket)
  ✓ CustomersBackendResource (no variant, base used)

With APPLICATION_CODE_BUCKET = 'DE':
  ✓ StoresBackendResource (no DE variant, fallback to base)
  ✗ StoresEUBackendResource (excluded, wrong CodeBucket)
  ✗ StoresATBackendResource (excluded, wrong CodeBucket)
  ✓ CustomersBackendResource (no variant, base used)
```

### Benefits of filtering

- **OpenAPI Generation**: Only the correct variant appears in OpenAPI documentation
- **Route Registration**: Only the correct variant routes are registered
- **No Conflicts**: Base and CodeBucket variants never coexist in routing
- **Performance**: Filtering happens once and is cached

## Container compilation

### Single container for all CodeBuckets

API Platform compiles a single container that contains ALL resources (base and all CodeBucket variants). Runtime resolution selects the correct variant per request.

**At compile time:**
1. Discover all resource classes in `src/Generated/Api/{ApiType}/`
2. Build metadata for ALL resources (base + all CodeBucket variants)
3. Register routes for ALL resources (all map to same URLs)
4. Cache everything

**At runtime:**
1. CodeBucket decorators intercept resolution
2. Select correct resource based on `APPLICATION_CODE_BUCKET`
3. Only selected resource is used for that request
4. Different CodeBuckets served from same container

### Performance characteristics

- **One-time cost**: Container compilation happens once
- **No overhead**: Runtime resolution uses local cache per request
- **Scalability**: Supports hundreds of CodeBuckets without performance impact

## APPLICATION_CODE_BUCKET configuration

### Setting the CodeBucket value

The `APPLICATION_CODE_BUCKET` constant is typically set during application bootstrap based on domain resolution:

```php
// config/Shared/stores.php
$stores = [
    'DE' => [
        'contexts' => [
            'yves' => ['glue.de.spryker.local'],
            'glue' => ['glue.de.spryker.local'],
        ],
    ],
    'AT' => [
        'contexts' => [
            'yves' => ['glue.at.spryker.local'],
            'glue' => ['glue.at.spryker.local'],
        ],
    ],
    'EU' => [
        'contexts' => [
            'yves' => ['glue.eu.spryker.local'],
            'glue' => ['glue.eu.spryker.local'],
        ],
    ],
];
```

Spryker's `Environment::defineCodeBucket()` reads this configuration and sets the constant during bootstrap.

### Domain to CodeBucket mapping

| Domain | APPLICATION_CODE_BUCKET |
|--------|------------------------|
| `glue.eu.spryker.local` | `'EU'` |
| `glue.at.spryker.local` | `'AT'` |
| `glue.de.spryker.local` | `'DE'` |
| `glue.spryker.local` | Not set (uses base resources) |

## Debugging CodeBucket resources

### Verify CODE_BUCKET constant generation

After regenerating resources, verify the constant was added:

```bash
# Check EU resource has constant
grep "CODE_BUCKET" src/Generated/Api/Backend/StoresEUBackendResource.php
# Expected: public const string CODE_BUCKET = 'EU';

# Verify base resource has no constant
grep "CODE_BUCKET" src/Generated/Api/Backend/StoresBackendResource.php
# Expected: no match (empty output)
```

### Debug resource resolution

Use the debug command to inspect which resources are available:

```bash
# List all resources
docker/sdk cli glue api:debug --list

# Show specific resource
docker/sdk cli glue api:debug stores --api-type=backend

# Show merged schema
docker/sdk cli glue api:debug stores --api-type=backend --show-merged

# Show all contributing source files
docker/sdk cli glue api:debug stores --api-type=backend --show-sources
```

### Verify runtime resolution

Test different CodeBuckets by accessing different domains:

```bash
# Test EU CodeBucket
curl -X GET http://glue-backend.eu.spryker.local/stores
# Should include: taxRate, gdprContactEmail, vatRegistrationNumber

# Test AT CodeBucket (if no AT variant exists)
curl -X GET http://glue-backend.at.spryker.local/stores
# Should return base resource (fallback)

# Test base (no CodeBucket)
curl -X GET http://glue-backend.spryker.local/stores
# Should return base resource
```

## Best practices

### 1. Keep base resources complete

The base resource should contain all common properties that work across all CodeBuckets:

```yaml
# ✅ Good - Base is complete
# stores.yml (base)
properties:
  idStore:
    type: integer
  name:
    type: string
  timezone:
    type: string

# stores-EU.yml (extends base)
properties:
  idStore:
    type: integer
  name:
    type: string
  timezone:
    type: string
  taxRate:        # EU-specific addition
    type: number
```

### 2. Use CodeBuckets for true regional differences

Only create CodeBucket variants when there are genuine regional requirements:

```yaml
# ✅ Good use cases:
- EU GDPR compliance fields
- Region-specific tax calculations
- Country-specific validation rules
- Market-specific business logic

# ❌ Bad use cases:
- Language translations (use locales instead)
- Minor field variations (use base resource)
- Temporary feature flags (use feature toggles)
```

### 3. Share Provider and Processor logic

Use the same Provider and Processor classes for base and CodeBucket variants when possible:

```yaml
# Both use same implementation
resource:
  provider: "Pyz\\Glue\\Store\\Api\\Backend\\Provider\\StoreBackendProvider"
  processor: "Pyz\\Glue\\Store\\Api\\Backend\\Processor\\StoreBackendProcessor"
```

Detect the resource type inside the Provider using the `CODE_BUCKET` constant:

```php
$resourceClass = $operation->getClass();
if (defined("$resourceClass::CODE_BUCKET")) {
    $codeBucket = $resourceClass::CODE_BUCKET;
    // Apply CodeBucket-specific logic
}
```

### 4. Document CodeBucket-specific fields

Clearly document which fields are CodeBucket-specific in your schema descriptions:

```yaml
gdprContactEmail:
  type: string
  description: "GDPR contact email (EU-specific requirement for GDPR compliance)"
```

### 5. Test fallback behavior

Always test that your application works correctly when:
- CodeBucket is not set (uses base resource)
- CodeBucket is set but variant doesn't exist (falls back to base)
- CodeBucket variant exists (uses variant)

## Testing

CodeBucket resources can be tested using the standard API Platform testing infrastructure. The test environment automatically generates resources before tests execute.

For detailed testing guidance, see [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html).

## Troubleshooting

### Resource not found for CodeBucket

If you get a "Resource not found" error for a specific CodeBucket:

1. Verify the schema file naming: `{resource-name}-{CODE_BUCKET}.yml`
2. Regenerate resources: `docker/sdk cli glue api:generate backend`
3. Verify the CODE_BUCKET constant exists in the generated class
4. Check that `APPLICATION_CODE_BUCKET` matches your schema file suffix

### Wrong resource variant used

If the wrong variant is being used:

1. Verify `APPLICATION_CODE_BUCKET` is set correctly in your environment
2. Clear caches: `docker/sdk cli rm -rf data/cache/*`
3. Check that the resource class name follows the pattern: `{Name}{CodeBucket}{ApiType}Resource`
4. Verify the CODE_BUCKET constant value matches `APPLICATION_CODE_BUCKET`

For more troubleshooting guidance, see [API Platform Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html).

## Next steps

- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - Deep dive into schema syntax
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) - Define validation rules
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html) - Testing your resources
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues
