---
title: Migrate to API Platform
description: This document describes how to migrate existing Glue API resources to API Platform.
last_updated: Jul 31, 2026
template: howto-guide-template
related:
  - title: Integrate API Platform
    link: docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html
  - title: API Platform
    link: docs/integrations/spryker-api/api-platform/api-platform.html
  - title: Implement an API Platform resource
    link: docs/integrations/spryker-api/api-platform/enablement.html
redirect_from:
  - /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html
---

{% info_block infoBox "Start here for batch migration" %}

If you're migrating multiple modules in one go (the default), follow the [API Platform migration overview](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/migrate-to-api-platform-overview.html) first — it covers the shop-baseline upgrade, project-config checklist, and batch cleanup. This document is the per-module deep dive referenced from that overview.

{% endinfo_block %}

This document describes how to migrate existing Glue API resources to API Platform while maintaining backward compatibility.

## Overview

Migrating from Glue API to API Platform provides several benefits:

- **Schema-based development**: Define resources declaratively in YAML instead of PHP code
- **Automatic OpenAPI documentation**: Interactive API docs generated from schemas
- **Reduced boilerplate**: No need for manual resource builders, mappers, and route definitions
- **Built-in validation**: Declarative validation rules with operation-specific constraints
- **Standardized pagination**: Consistent pagination across all resources
- **Better maintainability**: Clearer separation of concerns with providers and processors

The recommended default is **batch migration** — migrating a group of related modules together, as described in the [API Platform migration overview](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/migrate-to-api-platform-overview.html). The per-resource steps below are the mechanics you apply to each resource *within* a batch; none of it breaks existing API consumers.

## Prerequisites

Before migrating resources, ensure you have:

- Integrated API Platform as described in [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html)
- Configured router plugins in correct order (see below)
- Tested that API Platform is working with at least one test resource

## Migration strategy and router setup

This guide covers the mechanics of migrating a single resource. The overall strategy (batch migration is the default), the router-plugin ordering, and how routing flips between Glue and API Platform are owned by the [API Platform migration overview](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/migrate-to-api-platform-overview.html) — read it first. The steps below are what you apply to each resource within a batch.

## Migration process

### Step 1: Identify resources to migrate

List all existing Glue resources in your application:

Storefront API resources are typically registered in:

- `\Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider::getResourceRoutePlugins()` (legacy Glue application)
- `\Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider::getResourcePlugins()`

Backend API resources are typically registered in:

`\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getResourcePlugins()`

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

| Glue API | API Platform |
|---------------|--------------|
| Resource class | Provider class |
| Resource builder | Schema definition (YAML) |
| Attributes transfer | Resource class (auto-generated) |
| Reader | Provider |
| Writer | Processor |
| Resource route plugin | Operations in schema |
| Relationship plugins | Properties in schema |

**Create schema file:**

`src/Pyz/Glue/CustomersRestApi/resources/api/storefront/customers.resource.yml`

{% info_block warningBox %}

Schema files live in the Glue module directory of the layer—`src/Pyz/Glue/{Module}/resources/api/{api-type}/`—and the file name must end with `.resource.yml`. Files with any other suffix are not discovered by the generator. The `shortName` value is the URL segment of the resource, so it must match the existing Glue endpoint exactly, including case—`customers` for `/customers`.

{% endinfo_block %}

```yaml
resource:
    name: Customers
    shortName: customers
    description: "Customer resource for the Storefront API"

    provider: Pyz\Glue\CustomersRestApi\Api\Storefront\Provider\CustomersStorefrontProvider
    processor: Pyz\Glue\CustomersRestApi\Api\Storefront\Processor\CustomersStorefrontProcessor

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
                example: "john.doe@acme.com"

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

`src/Pyz/Glue/CustomersRestApi/resources/api/storefront/customers.validation.yml`

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

Create the Provider to handle read operations, reusing existing business logic.

{% info_block infoBox "Reuse existing business logic" %}

The Provider should primarily call existing Client methods (Storefront API) or Facade methods (Backend API). This ensures consistency and reduces duplication of business logic.

{% endinfo_block %}

Extend the Spryker base class for your API type—`AbstractStorefrontProvider` or `AbstractBackendProvider` (`Spryker\ApiPlatform\State\Provider`). The base class dispatches `provide()` to `provideItem()` or `provideCollection()` based on the operation and gives you access to `$this->uriVariables`, the current request, and the store and locale context.

`src/Pyz/Glue/CustomersRestApi/Api/Storefront/Provider/CustomersStorefrontProvider.php`

```php
<?php

namespace Pyz\Glue\CustomersRestApi\Api\Storefront\Provider;

use Generated\Api\Storefront\CustomersStorefrontResource;
use Spryker\ApiPlatform\State\Provider\AbstractStorefrontProvider;
use Spryker\Client\Customer\CustomerClientInterface;

class CustomersStorefrontProvider extends AbstractStorefrontProvider
{
    public function __construct(
        protected CustomerClientInterface $customerClient,
    ) {
    }

    protected function provideItem(): ?CustomersStorefrontResource
    {
        $customerReference = $this->uriVariables['customerReference'] ?? null;

        if ($customerReference === null) {
            return null;
        }

        // Reuse the module's existing Client call
        $customerTransfer = $this->customerClient->findCustomerByReference($customerReference);

        if ($customerTransfer === null) {
            return null;
        }

        // Map the transfer to the generated API Platform resource
        $resource = new CustomersStorefrontResource();
        $resource->fromArray($customerTransfer->toArray());

        return $resource;
    }

    /**
     * @return array<\Generated\Api\Storefront\CustomersStorefrontResource>
     */
    protected function provideCollection(): array
    {
        // Resolve the collection through the Client and map each transfer
        // to a resource the same way as in provideItem(). Pagination is
        // handled by API Platform based on the schema's pagination settings.
        return $this->mapCustomerCollection();
    }
}
```

### Step 5: Implement Processor

Create the Processor to handle write operations.

{% info_block infoBox "Reuse existing business logic" %}

The Processor should primarily call existing Client methods (Storefront API) or Facade methods (Backend API). This ensures consistency and reduces duplication of business logic.

{% endinfo_block %}

Extend the Spryker base class for your API type—`AbstractStorefrontProcessor` or `AbstractBackendProcessor` (`Spryker\ApiPlatform\State\Processor`). The base class dispatches `process()` to `processPost()`, `processPatch()`, or `processDelete()` based on the operation.

`src/Pyz/Glue/CustomersRestApi/Api/Storefront/Processor/CustomersStorefrontProcessor.php`

```php
<?php

namespace Pyz\Glue\CustomersRestApi\Api\Storefront\Processor;

use Generated\Api\Storefront\CustomersStorefrontResource;
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\ApiPlatform\State\Processor\AbstractStorefrontProcessor;
use Spryker\Client\Customer\CustomerClientInterface;

class CustomersStorefrontProcessor extends AbstractStorefrontProcessor
{
    public function __construct(
        protected CustomerClientInterface $customerClient,
    ) {
    }

    protected function processPost(mixed $data): CustomersStorefrontResource
    {
        /** @var \Generated\Api\Storefront\CustomersStorefrontResource $data */
        $customerTransfer = (new CustomerTransfer())->fromArray($data->toArray(), true);

        // Reuse the module's existing Client call
        $customerResponseTransfer = $this->customerClient->registerCustomer($customerTransfer);

        $resource = new CustomersStorefrontResource();
        $resource->fromArray($customerResponseTransfer->getCustomerTransfer()->toArray());

        return $resource;
    }

    protected function processPatch(mixed $data): CustomersStorefrontResource
    {
        /** @var \Generated\Api\Storefront\CustomersStorefrontResource $data */
        $customerTransfer = (new CustomerTransfer())->fromArray($data->toArray(), true);
        // For item operations, API Platform populates the identifier property from the URL
        $customerTransfer->setCustomerReference($data->customerReference);

        $customerResponseTransfer = $this->customerClient->updateCustomer($customerTransfer);

        $resource = new CustomersStorefrontResource();
        $resource->fromArray($customerResponseTransfer->getCustomerTransfer()->toArray());

        return $resource;
    }
}
```

### Step 6: Generate API Platform resource

Generate the resource class from the schema:

```bash
docker/sdk cli glue api:generate

# Verify generation
ls -la src/Generated/Api/Storefront/CustomersStorefrontResource.php
```

For Backend API resources, run the command in the GlueBackend application context: `docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate`.

### Step 7: Verify the generated resource

At this point, requests to `/customers` are still served by Glue—the Glue router is checked first, and the resource route plugin is still registered. The switch happens in the next step. Verify the resource is discovered and valid before switching:

```bash
# List all discovered resources
docker/sdk cli glue api:debug --list

# Inspect the merged schema of the resource
docker/sdk cli glue api:debug customers --api-type=storefront --show-merged

# Validate all schemas without generating
docker/sdk cli glue api:generate --validate-only
```

### Step 8: Switch routing to API Platform

{% info_block warningBox "Plugin removal is the migration switch" %}

The actual switch from Glue REST to API Platform for this module is removing its `*ResourceRoutePlugin` from the project-level dependency provider (shown below). The optional `excludedPathFragments` setting in `spryker_api_platform.php` controls schema generation only — it does not flip routing. The `spryker/<module>-rest-api` composer package may stay installed; it simply no longer serves routes once the plugin is unregistered.

{% endinfo_block %}

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

Clear caches after unregistering the plugin:

```bash
console cache:clear
```

### Step 9: Test the API Platform endpoint

With the route plugin unregistered, the Glue router no longer matches the URL, and the request falls through to API Platform. Test that the endpoint works correctly. Customer endpoints are protected, so retrieve an access token first:

```bash
# Get an access token
curl -X POST https://glue.mysprykershop.com/access-tokens \
  -H "Content-Type: application/vnd.api+json" \
  -d '{"data":{"type":"access-tokens","attributes":{"username":"sonia.wagner@acme.com","password":"Change123$"}}}'

# Test single resource
curl -X GET https://glue.mysprykershop.com/customers/DE--21 \
  -H "Accept: application/vnd.api+json" \
  -H "Authorization: Bearer {access_token}"

# Test collection
curl -X GET "https://glue.mysprykershop.com/customers?page=1&itemsPerPage=10" \
  -H "Accept: application/vnd.api+json" \
  -H "Authorization: Bearer {access_token}"

# Test update
curl -X PATCH https://glue.mysprykershop.com/customers/DE--21 \
  -H "Content-Type: application/vnd.api+json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{"data":{"type":"customers","attributes":{"firstName":"Jane"}}}'
```

Verify:
- ✅ Responses match the previous Glue responses—the format is intentionally identical
- ✅ Validation rules work correctly
- ✅ Error handling is appropriate
- ✅ Pagination works for collections
- ✅ OpenAPI documentation is generated at the root URL `/` (development environments)

### Step 10: Run existing Glue API tests

Ensure backward compatibility by running the existing tests against the now API Platform-served endpoints:

```bash
# Run Glue API tests
vendor/bin/codecept run -c tests/PyzTest/Glue/CustomersRestApi

# Or specific test
vendor/bin/codecept run -c tests/PyzTest/Glue/CustomersRestApi/RestApi/CustomerRestApiCest
```

All existing tests should still pass because the external contract does not change: API Platform serves the same URLs with intentionally identical JSON:API responses, headers, and error envelopes.

### Step 11: Clean up the old Glue files

Once the tests pass, remove the now-unused Glue files:

```bash
# Remove resource route plugin
rm src/Pyz/Glue/CustomersRestApi/Plugin/GlueApplication/CustomersResourceRoutePlugin.php

# Remove processor classes
rm -rf src/Pyz/Glue/CustomersRestApi/Processor/
```

### Step 12: Verify migration

After removing the Glue resource files:

```bash
# Clear caches
console cache:clear

# Test that the API Platform endpoint still works
curl -X GET https://glue.mysprykershop.com/customers/DE--21 \
  -H "Accept: application/vnd.api+json" \
  -H "Authorization: Bearer {access_token}"

# Verify OpenAPI docs include the resource (development environments)
curl https://glue.mysprykershop.com/docs.json | jq '.paths'

# Check the interactive documentation at the root URL
# Visit: https://glue.mysprykershop.com/
```

### Step 13: Repeat for remaining resources

Repeat steps 2-12 for each resource in your migration checklist:

```bash
[✓] Customers resource     ← Migrated
[ ] Products resource      ← Next
[ ] Orders resource
[ ] Cart resource
[ ] Wishlist resource
...
```

## Migration comparison

### Before: Glue API

```bash
Request: GET /customers/DE--21
    ↓
GlueRouterPlugin
    ↓
CustomersResourceRoutePlugin
    ↓
CustomerReaderInterface
    ↓
CustomerClient
    ↓
RestResourceBuilder
    ↓
Response: JSON:API
```

### After: API Platform

```bash
Request: GET /customers/DE--21
    ↓
SymfonyFrameworkRouterPlugin
    ↓
API Platform Router
    ↓
CustomersStorefrontProvider
    ↓
CustomerClient (same!)
    ↓
CustomersStorefrontResource
    ↓
Response: JSON:API (auto-serialized, identical format)
```

## Key differences

| Aspect | Glue API | API Platform |
|--------|----------|--------------|
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

1. The schema file is not discovered—the file name must end with `.resource.yml`
2. The module is listed in `excludedPathFragments` in `spryker_api_platform.php`, so its schemas are hidden from the generator
3. Resource not generated
4. Cache not cleared

**Solution:**

```bash
# Check that the resource is discovered
docker/sdk cli glue api:debug --list

# Regenerate resources
docker/sdk cli glue api:generate

# Verify the generated file exists
ls -la src/Generated/Api/Storefront/CustomersStorefrontResource.php

# Clear caches
console cache:clear
```

### Requests without an `Accept` header behave differently

**Symptom:** A client that omits the `Accept` header (or sends `*/*`) receives `406 Not Acceptable` or a response in an unexpected format after migration.

**Cause:** This is the one client-visible behavior difference between the infrastructures. Legacy Glue REST accepted such requests and answered with `application/vnd.api+json`; API Platform's content negotiation does not by default.

**Solution:** Use `spryker/api-platform` **1.15.0** or later, which restores the legacy fallback. For details, see [Requests without an Accept header](/docs/integrations/spryker-api/api-platform/troubleshooting.html#requests-without-an-accept-header-are-rejected-or-return-the-wrong-format).

Apart from this, the response format is intentionally identical between Glue and API Platform: JSON:API with Glue-compatible error codes. If you observe other differences, verify that your Provider maps the same fields as the legacy resource did.

### Business logic differs between implementations

**Symptom:** API Platform endpoint behaves differently than a Glue endpoint.

**Cause:** Provider/Processor uses different facade methods or has different logic.

**Solution:**

Review and ensure both use the same facade methods:

```php
// Glue Reader
$customerReader->readCustomer($customerReference);
    ↓ calls
$this->customerClient->findCustomerByReference($customerReference);

// API Platform Provider
$this->customerClient->findCustomerByReference($customerReference); // ← Same method!
```

## Best practices

### 1. Keep batches small

Batch migration is the default (see the [migration overview](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/migrate-to-api-platform-overview.html)), but keep each batch small and ship it before starting the next — don't try to migrate every resource in one go. For example:

```bash
Sprint 1: Customers, Products (read-only)
Sprint 2: Orders, Cart
Sprint 3: Wishlist, Checkout
```

### 2. Keep business logic behind Clients and Facades

Don't duplicate business logic in Providers/Processors:

```php
// ❌ Bad: Logic in Provider
private function getCustomer(string $reference): ?CustomersStorefrontResource
{
    $customer = $this->repository->findByReference($reference);
    // ... business logic here
}

// ✅ Good: Delegate to the Client (Storefront) or Facade (Backend)
private function getCustomer(string $reference): ?CustomersStorefrontResource
{
    $customerTransfer = $this->customerClient->findCustomerByReference($reference);
    return $this->mapToResource($customerTransfer);
}
```

### 3. Use toArray/fromArray for mapping

Leverage generated `toArray()` and `fromArray()` methods:

```php
// Easy mapping between Transfer and Resource
$resource = new CustomersBackendResource();
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
## Migration Notice: {Resource} API

The `/{resource}` endpoint is being migrated to API-Platform.

### Changes:
- Date format: unix timestamp → ISO 8601
- Removed field: `{deprecatedField}`

### Timeline:
- Old endpoint: Supported until 2026-12-31
- New endpoint: Available now
- Deprecation: Old endpoint will return deprecation headers starting 2026-09-01
```

## Next steps

- [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html) - Architecture overview
- [Implement an API Platform resource](/docs/integrations/spryker-api/api-platform/enablement.html) - Creating resources
- [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html) - Resource schemas
- [Validation schemas](/docs/integrations/spryker-api/api-platform/validation-schemas.html) - Validation schemas
- [Troubleshooting](/docs/integrations/spryker-api/api-platform/troubleshooting.html) - Common issues
