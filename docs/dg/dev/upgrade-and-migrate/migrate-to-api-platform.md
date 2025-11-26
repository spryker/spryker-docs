---
title: How to migrate to API Platform
description: This document describes how to migrate existing Glue REST API resources to API Platform.
last_updated: Nov 24, 2025
template: howto-guide-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
---

This document describes how to migrate existing Glue REST API resources to API Platform while maintaining backward compatibility.

## Overview

Migrating from Glue REST API to API Platform provides several benefits:

- **Schema-based development**: Define resources declaratively in YAML/XML instead of PHP code
- **Automatic OpenAPI documentation**: Interactive API docs generated from schemas
- **Reduced boilerplate**: No need for manual resource builders, mappers, and route definitions
- **Built-in validation**: Declarative validation rules with operation-specific constraints
- **Standardized pagination**: Consistent pagination across all resources
- **Better maintainability**: Clearer separation of concerns with providers and processors

The migration can be done gradually, resource by resource, without breaking existing API consumers.

## Prerequisites

Before migrating resources, ensure you have:

- Integrated API Platform as described in [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- Configured router plugins in correct order (see below)
- Tested that API Platform is working with at least one test resource

## Migration strategy

The migration follows a **gradual replacement** approach:

1. **Coexistence**: Both Glue REST API and API Platform run side by side
2. **Router priority**: Existing Glue endpoints are matched first, API Platform endpoints second
3. **Resource-by-resource**: Migrate one resource at a time, verify, then move to the next
4. **No breaking changes**: Existing API consumers continue to work during migration
5. **Final cleanup**: Remove Glue router only after all resources are migrated

### Router configuration order

The key to gradual migration is router plugin order. The `SymfonyRouterPlugin` must be placed **after** existing Glue router plugins:

`src/Pyz/Glue/Router/RouterDependencyProvider.php`

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Router;

use Spryker\Glue\GlueApplication\Plugin\Rest\GlueRouterPlugin;
use Spryker\Glue\Router\Plugin\Router\SymfonyRouterPlugin;
use Spryker\Glue\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\RouterExtension\Dependency\Plugin\RouterPluginInterface>
     */
    protected function getRouterPlugins(): array
    {
        return [
            new GlueRouterPlugin(),        // ← Existing Glue endpoints (checked first)
            new SymfonyRouterPlugin(),     // ← API Platform endpoints (checked second)
        ];
    }
}
```

{% info_block warningBox "Router order is critical" %}

If `SymfonyRouterPlugin` is placed before `GlueRouterPlugin`, API Platform routes may shadow existing Glue routes and break backward compatibility. Always place it **after** existing routers.

{% endinfo_block %}

With this configuration:
- Request comes in: `GET /customers`
- `GlueRouterPlugin` checks first: If Glue resource exists → use it
- `SymfonyRouterPlugin` checks second: If no Glue match → try API Platform
- Result: Existing endpoints continue working, new API Platform endpoints are available

## Migration process

### Step 1: Identify resources to migrate

List all existing Glue resources in your application:

Backend API resources are typically registered in:

`\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getResourcePlugins()`

Storefront API resources are typically registered in:

`\Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider::getResourceRoutePlugins()`

Create a migration checklist:

```bash
[ ] Customers resource
[ ] Products resource
[ ] Orders resource
[ ] Cart resource
[ ] Wishlist resource
...
```

{% info_block infoBox "Migration order recommendation" %}

Start with simpler, read-only resources (GET operations only) before migrating complex resources with write operations and business logic.

{% endinfo_block %}

### Step 2: Analyze existing Glue resource

Before migrating, understand the existing resource structure.

**Example: Existing Glue Customer Resource**

1. **Resource route plugin:**
   `src/Pyz/Glue/CustomersRestApi/Plugin/GlueApplication/CustomersResourceRoutePlugin.php`

2. **Resource class:**
   `src/Pyz/Glue/CustomersRestApi/Processor/Customer/CustomerReader.php`

3. **Attributes transfer:**
   `src/Generated/Shared/Transfer/RestCustomersAttributesTransfer.php`

4. **Operations supported:**
   - GET `/customers/{customerReference}` - Get single customer
   - GET `/customers` - Get customer collection
   - POST `/customers` - Create customer
   - PATCH `/customers/{customerReference}` - Update customer

### Step 3: Create API Platform schema

Create the equivalent API Platform schema for the resource.

**Map Glue concepts to API Platform:**

| Glue REST API | API Platform |
|---------------|--------------|
| Resource class | Provider class |
| Resource builder | Schema definition (YAML) |
| Attributes transfer | Resource class (auto-generated) |
| Reader | Provider |
| Writer | Processor |
| Resource route plugin | Operations in schema |
| Relationship plugins | Properties in schema |

**Create schema file:**

`src/Pyz/Zed/Customer/resources/api/backoffice/customers.yml`

```yaml
resource:
    name: Customers
    shortName: Customer
    description: "Customer resource for backoffice API"

    provider: "Pyz\\Zed\\Customer\\Api\\Backoffice\\Provider\\CustomerBackofficeProvider"
    processor: "Pyz\\Zed\\Customer\\Api\\Backoffice\\Processor\\CustomerBackofficeProcessor"

    paginationEnabled: true
    paginationItemsPerPage: 10

    operations:
        - type: Post
        - type: Get
        - type: GetCollection
        - type: Patch

    properties:
        customerReference:
            type: string
            description: "A unique reference for a customer."
            writable: false
            identifier: true

        email:
            type: string
            description: "The email address of the customer."
            openapiContext:
                example: "john.doe@example.com"

        firstName:
            type: string
            description: "The first name of the customer."
            openapiContext:
                example: "John"

        lastName:
            type: string
            description: "The last name of the customer."
            openapiContext:
                example: "Doe"

        # Map all properties from RestCustomersAttributesTransfer
```

**Create validation schema:**

`src/Pyz/Zed/Customer/resources/api/backoffice/customers.validation.yml`

```yaml
post:
    email:
        - NotBlank:
            message: "Email is required"
        - Email:
            message: "Invalid email format"

    firstName:
        - NotBlank:
            message: "First name is required"

    lastName:
        - NotBlank:
            message: "Last name is required"

patch:
    email:
        - Optional:
            constraints:
                - Email
```

### Step 4: Implement Provider

Create the Provider to handle read operations, reusing existing business logic:

`src/Pyz/Zed/Customer/Api/Backoffice/Provider/CustomerBackofficeProvider.php`

```php
<?php

namespace Pyz\Zed\Customer\Api\Backoffice\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\TraversablePaginator;
use ApiPlatform\State\ProviderInterface;
use Generated\Api\Backoffice\CustomersBackofficeResource;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface;

class CustomerBackofficeProvider implements ProviderInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if (isset($uriVariables['customerReference'])) {
            return $this->getCustomer($uriVariables['customerReference']);
        }

        return $this->getCustomers($context);
    }

    private function getCustomer(string $customerReference): ?CustomersBackofficeResource
    {
        // Reuse existing Glue logic
        $customerTransfer = $this->customerFacade->findCustomerByReference($customerReference);

        if ($customerTransfer === null) {
            return null;
        }

        // Map transfer to API Platform resource
        $resource = new CustomersBackofficeResource();
        $resource->fromArray($customerTransfer->toArray());

        return $resource;
    }

    private function getCustomers(array $context): TraversablePaginator
    {
        $filters = $context['filters'] ?? [];
        $page = (int) ($filters['page'] ?? 1);
        $itemsPerPage = (int) ($filters['itemsPerPage'] ?? 10);

        // Reuse existing facade method
        $customerCollection = $this->customerFacade->getCustomerCollection($page, $itemsPerPage);

        $resources = [];
        foreach ($customerCollection->getCustomers() as $customerTransfer) {
            $resource = new CustomersBackofficeResource();
            $resource->fromArray($customerTransfer->toArray());
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

{% info_block infoBox "Reuse existing business logic" %}

The Provider and Processor should primarily call existing Facade methods. This ensures consistency and reduces duplication of business logic.

{% endinfo_block %}

### Step 5: Implement Processor

Create the Processor to handle write operations:

`src/Pyz/Zed/Customer/Api/Backoffice/Processor/CustomerBackofficeProcessor.php`

```php
<?php

namespace Pyz\Zed\Customer\Api\Backoffice\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use Generated\Api\Backoffice\CustomersBackofficeResource;
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface;

class CustomerBackofficeProcessor implements ProcessorInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($operation instanceof Post) {
            return $this->createCustomer($data);
        }

        if ($operation instanceof Patch) {
            return $this->updateCustomer($data, $uriVariables['customerReference']);
        }

        return null;
    }

    private function createCustomer(CustomersBackofficeResource $resource): CustomersBackofficeResource
    {
        $customerTransfer = new CustomerTransfer();
        $customerTransfer->fromArray($resource->toArray(), true);

        // Reuse existing facade method
        $customerResponseTransfer = $this->customerFacade->addCustomer($customerTransfer);

        $result = new CustomersBackofficeResource();
        $result->fromArray($customerResponseTransfer->getCustomerTransfer()->toArray());

        return $result;
    }

    private function updateCustomer(CustomersBackofficeResource $resource, string $customerReference): CustomersBackofficeResource
    {
        $customerTransfer = new CustomerTransfer();
        $customerTransfer->fromArray($resource->toArray(), true);
        $customerTransfer->setCustomerReference($customerReference);

        // Reuse existing facade method
        $customerResponseTransfer = $this->customerFacade->updateCustomer($customerTransfer);

        $result = new CustomersBackofficeResource();
        $result->fromArray($customerResponseTransfer->getCustomerTransfer()->toArray());

        return $result;
    }
}
```

### Step 6: Generate API Platform resource

Generate the backoffice resource class from the schema:

```bash
console api:generate

# Verify generation
ls -la src/Generated/Api/Backoffice/CustomersBackofficeResource.php
```

Generate the storefront resource class from the schema:

```bash
glue api:generate backoffice
```

### Step 7: Test the API Platform endpoint

Test that the new endpoint works correctly:

```bash
# Test single resource
curl -X GET http://backoffice.eu.spryker.local/customers/DE--1

# Test collection
curl -X GET http://backoffice.eu.spryker.local/customers?page=1&itemsPerPage=10

# Test create
curl -X POST http://backoffice.eu.spryker.local/customers \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"John","lastName":"Doe"}'

# Test update
curl -X PATCH http://backoffice.eu.spryker.local/customers/DE--1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane"}'
```

Verify:
- ✅ Responses match expected format
- ✅ Validation rules work correctly
- ✅ Error handling is appropriate
- ✅ Pagination works for collections
- ✅ OpenAPI documentation is generated at root URL `/`

### Step 8: Run existing Glue API tests

Ensure backward compatibility by running existing tests:

```bash
# Run Glue API tests
vendor/bin/codecept run -c tests/PyzTest/Glue/CustomersRestApi

# Or specific test
vendor/bin/codecept run -c tests/PyzTest/Glue/CustomersRestApi/RestApi/CustomerRestApiCest
```

All existing tests should still pass because:
- `GlueRouterPlugin` is checked first
- Existing Glue endpoints still work
- No breaking changes to consumers

### Step 9: Remove Glue resource files

Once the API Platform endpoint is working and tested, remove the old Glue files:

```bash
# Remove resource route plugin
rm src/Pyz/Glue/CustomersRestApi/Plugin/GlueApplication/CustomersResourceRoutePlugin.php

# Remove processor classes
rm -rf src/Pyz/Glue/CustomersRestApi/Processor/

# Update dependency provider to remove plugin registration
```

**Update GlueApplicationDependencyProvider:**

`src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`

```php
protected function getResourceRoutePlugins(): array
{
    return [
        // new CustomersResourceRoutePlugin(), // ← Remove this line
        new ProductsResourceRoutePlugin(),
        new OrdersResourceRoutePlugin(),
        // ... keep other plugins
    ];
}
```

### Step 10: Verify migration

After removing Glue resource files:

```bash
# Clear caches
console cache:clear

# Test that API Platform endpoint still works
curl -X GET http://backoffice.eu.spryker.local/customers/DE--1

# Verify OpenAPI docs include the resource
curl http://backoffice.eu.spryker.local/docs.json | jq '.paths'

# Check the interactive documentation at root URL
# Visit: http://backoffice.eu.spryker.local/
```

### Step 11: Repeat for remaining resources

Repeat steps 2-10 for each resource in your migration checklist:

```bash
[✓] Customers resource     ← Migrated
[ ] Products resource      ← Next
[ ] Orders resource
[ ] Cart resource
[ ] Wishlist resource
...
```

## Final cleanup

Once **all** Glue resources are migrated to API-Platform:

### 1. Remove GlueRouterPlugin

`src/Pyz/Glue/Router/RouterDependencyProvider.php`

```php
protected function getRouterPlugins(): array
{
    return [
        // new GlueRouterPlugin(), // ← Remove - no longer needed
        new SymfonyRouterPlugin(),
    ];
}
```

### 2. Remove empty Glue modules

```bash
# Remove modules that no longer have resources
rm -rf src/Pyz/Glue/CustomersRestApi/
rm -rf src/Pyz/Glue/ProductsRestApi/
# ... etc
```

### 3. Update composer dependencies

If you're no longer using Glue-specific packages:

```bash
# Review and remove unused Glue packages
composer remove spryker/customers-rest-api
composer remove spryker/products-rest-api
# etc...
```

### 4. Clean-up tests

Update or remove Glue-specific test files:

```bash
# Convert tests to API Platform format or remove
rm -rf tests/PyzTest/Glue/CustomersRestApi/
```

### 5. Update documentation

Update internal API documentation to reference new endpoints:

- OpenAPI documentation: `http://backoffice.eu.spryker.local/` (root URL)
- OpenAPI JSON spec: `http://backoffice.eu.spryker.local/docs.json`
- Update Postman collections
- Update integration documentation for partners

## Migration comparison

### Before: Glue REST API

```bash
Request: GET /customers/DE--1
    ↓
GlueRouterPlugin
    ↓
CustomersResourceRoutePlugin
    ↓
CustomerReaderInterface
    ↓
CustomerFacade
    ↓
RestResourceBuilder
    ↓
Response: RestCustomersAttributesTransfer
```

### After: API Platform

```bash
Request: GET /customers/DE--1
    ↓
SymfonyRouterPlugin
    ↓
API Platform Router
    ↓
CustomerBackofficeProvider
    ↓
CustomerFacade (same!)
    ↓
CustomersBackofficeResource
    ↓
Response: JSON (auto-serialized)
```

## Key differences

| Aspect | Glue REST API | API Platform |
|--------|--------------|--------------|
| **Definition** | PHP classes & plugins | YAML schemas |
| **Routing** | ResourceRoutePlugin | Schema operations |
| **Reading data** | Reader classes | Provider classes |
| **Writing data** | Writer classes | Processor classes |
| **Validation** | Manual in reader/writer | Declarative in validation schema |
| **Documentation** | Separate OpenAPI schema | Auto-generated from schema |
| **Response building** | Manual RestResourceBuilder | Auto-serialization |
| **Relationships** | Relationship plugins | Schema properties |
| **File count** | ~10-15 files per resource | ~3-5 files per resource |

## Troubleshooting migration

### Both old and new endpoints respond

**Symptom:** Both Glue and API Platform endpoints return responses.

**Cause:** Different URLs are being used. Check if they're actually the same:

```bash
# Glue endpoint
GET /customers/DE--1

# API Platform endpoint
GET /customers/DE--1

# Check URL prefixes in configuration
```

**Solution:** Ensure URLs match exactly. API Platform resources use `shortName` for URL generation.

### API Platform endpoint returns 404 during migration

**Symptom:** After creating schema and generating resource, endpoint returns 404.

**Possible causes:**

1. Router order is wrong (SymfonyRouterPlugin before GlueRouterPlugin)
2. Cache not cleared
3. Resource not generated

**Solution:**

```bash
# Check router order in RouterDependencyProvider
# Should be: GlueRouterPlugin, then SymfonyRouterPlugin

# Clear caches
console cache:clear

# Regenerate resources
console|glue api:generate backoffice --force

# Verify generated file exists
ls -la src/Generated/Api/Backoffice/CustomersBackofficeResource.php
```

### Different response format between Glue and API Platform

**Symptom:** API Platform returns different JSON structure than Glue.

**Cause:** Glue uses JSON:API format, API Platform uses JSON-LD by default which is configurable and depending on your needs you can migrate to JSON-LD as well or stay with the JSON API format. API-Platform covers this possibility for you

**Solution:**

This is expected. You have three options:

1. **Accept the difference** (recommended): Update API consumers to handle both formats during migration
2. **Configure API Platform format**: Customize serialization to match the Glue format
3. **Use content negotiation**: Support both formats based on `Accept` header

### Business logic differs between implementations

**Symptom:** API Platform endpoint behaves differently than a Glue endpoint.

**Cause:** Provider/Processor uses different facade methods or has different logic.

**Solution:**

Review and ensure both use the same facade methods:

```php
// Glue Reader
$customerReader->readCustomer($customerReference);
    ↓ calls
$this->customerFacade->findCustomerByReference($customerReference);

// API Platform Provider
$this->customerFacade->findCustomerByReference($customerReference); // ← Same method!
```

## Best practices

### 1. Migrate in small batches

Don't try to migrate all resources at once. Migrate in small batches for example:

```bash
Sprint 1: Customers, Products (read-only)
Sprint 2: Orders, Cart
Sprint 3: Wishlist, Checkout
```

### 2. Keep business logic in facades

Don't duplicate business logic in Providers/Processors:

```php
// ❌ Bad: Logic in Provider
private function getCustomer(string $reference): ?CustomersBackofficeResource
{
    $customer = $this->repository->findByReference($reference);
    // ... business logic here
}

// ✅ Good: Delegate to Facade
private function getCustomer(string $reference): ?CustomersBackofficeResource
{
    $customerTransfer = $this->customerFacade->findCustomerByReference($reference);
    return $this->mapToResource($customerTransfer);
}
```

### 3. Use toArray/fromArray for mapping

Leverage generated `toArray()` and `fromArray()` methods:

```php
// Easy mapping between Transfer and Resource
$resource = new CustomersBackofficeResource();
$resource->fromArray($customerTransfer->toArray());
```

### 4. Test thoroughly before removing Glue code

- Run all existing tests
- Perform manual testing
- Check with API consumers
- Monitor production traffic

### 5. Document breaking changes

If response formats differ, document changes for API consumers:

```markdown
## Migration Notice: Customers API

The `/customers` endpoint is being migrated to API-Platform.

### Changes:
- Response format: JSON:API → JSON-LD
- Date format: unix timestamp → ISO 8601
- Error format: JSON:API errors → RFC 7807 Problem Details

### Timeline:
- Old endpoint: Supported until 2026-12-31
- New endpoint: Available now
- Deprecation: Old endpoint will return deprecation headers starting 2026-09-01
```

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Architecture overview
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Schema reference
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues
