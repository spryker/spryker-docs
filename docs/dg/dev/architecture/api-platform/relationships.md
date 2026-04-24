---
title: Relationships
description: Configure and use relationships in API Platform to include related resources.
last_updated: Apr 7, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
---

The API Platform relationship system enables resources to include related resources via the `?include=` query parameter in JSON:API format.

## Quick start

### 1. Define relationships in parent resource

Add an `includes` section to your parent resource YAML:

```yaml
# src/Spryker/Customer/resources/api/storefront/customers.resource.yml
resource:
  name: Customers
  shortName: customers

  includes:
    - relationshipName: addresses
      targetResource: CustomersAddresses
      uriVariableMappings:
        customerReference: customerReference
```

### 2. Define reverse relationship in child resource

Add an `includableIn` section to your child resource YAML:

```yaml
# src/Spryker/Customer/resources/api/storefront/customers-addresses.resource.yml
resource:
  name: CustomersAddresses
  shortName: customers-addresses

  includableIn:
    - resource: Customers
      relationshipName: addresses
      uriVariableMappings:
        customerReference: customerReference
```

Both declarations must match for validation to pass.

### 3. Regenerate container

```bash
docker/sdk testing -x GLUE_APPLICATION=GLUE_STOREFRONT glue cache:clear
```

### 4. Use relationships

```bash
# Single include
GET /customers/customer--35?include=addresses

# Multiple includes
GET /customers/customer--35?include=addresses,orders
```

## Configuration reference

### includes section

Declares what relationships this resource can include.

**Required properties:**
- `relationshipName`: Name used in `?include=` parameter (for example, `addresses`)
- `targetResource`: Name of the resource to include (for example, `CustomersAddresses`)

**Optional properties:**
- `uriVariableMappings`: Maps properties from parent to child provider URI variables
- `resolverClass`: Fully qualified class name of a custom relationship resolver (see [Custom relationship resolvers](#custom-relationship-resolvers))
- `autoInclude`: When `true`, this relationship is automatically included without requiring `?include=` (see [Auto-include](#auto-include))

**Example:**

```yaml
includes:
  - relationshipName: addresses
    targetResource: CustomersAddresses
    uriVariableMappings:
      customerReference: customerReference
```

### includableIn section

Declares where this resource can be included.

**Required properties:**
- `resource`: Name of the parent resource
- `relationshipName`: Must match parent's includes declaration

**Optional properties:**
- `uriVariableMappings`: Must match parent's includes declaration

**Example:**

```yaml
includableIn:
  - resource: Customers
    relationshipName: addresses
    uriVariableMappings:
      customerReference: customerReference
```

## URI variable mapping

URI variable mapping passes context from parent resource to child provider.

**Example flow:**

1. Parent resource (Customer) has property `customerReference = 'DE--123'`
2. Configuration maps `customerReference: customerReference`
3. Child provider receives `['customerReference' => 'DE--123']` in URI variables
4. Child provider uses this to filter results

**Multiple mappings:**

```yaml
uriVariableMappings:
  customerReference: customerReference
  storeId: storeId
  locale: locale
```

## Auto-generated properties

When you define an `includes` relationship, the corresponding property is automatically generated with these defaults:

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| `type` | `array` | Relationships are collections |
| `writable` | `false` | Relationships are read-only |
| `readable` | `true` | Must be readable for responses |
| `required` | `false` | Relationships are optional |
| `description` | `"Related {targetResource} resources"` | Auto-generated description |

You can override defaults by manually defining the property:

```yaml
properties:
  addresses:
    type: array
    writable: false
    readable: true
    required: false
    description: "Customer billing and shipping addresses"
```

## Validation

The system validates relationships during code generation:

**Bi-directional consistency:**
- Parent's `includes` must match child's `includableIn`
- Relationship names must match
- URI variable mappings must match

**Resource existence:**
- Target resource must exist
- Referenced properties should exist

**Example error:**

```text
Validation Error in customers.resource.yml:
  - includes[0].targetResource: Resource "CustomersAddresses" declares
    includableIn for "Customers" but uses different relationshipName
    "customerAddresses". Expected: "addresses"
```

## Response format

**Request:**

```http
GET /customers/customer--35?include=addresses
```

**Response:**

```json
{
  "data": {
    "type": "customers",
    "id": "customer--35",
    "attributes": {
      "email": "john@example.com",
      "firstName": "John"
    },
    "relationships": {
      "addresses": {
        "data": [
          {"type": "addresses", "id": "addr-123"},
          {"type": "addresses", "id": "addr-456"}
        ]
      }
    }
  },
  "included": [
    {
      "type": "addresses",
      "id": "addr-123",
      "attributes": {
        "address1": "123 Test St",
        "city": "Test City"
      }
    },
    {
      "type": "addresses",
      "id": "addr-456",
      "attributes": {
        "address1": "456 Other St",
        "city": "Other City"
      }
    }
  ]
}
```

## How it works

1. **RelationshipProviderDecorator** wraps all providers automatically
2. Parses `?include=` parameter from request
3. **ApiPlatformRelationshipResolver** loads relationships via container configuration
4. Maps URI variables from parent to child
5. Calls child provider with mapped variables
6. **JsonApiRelationshipNormalizer** builds JSON:API response with `relationships` and `included` sections

Providers require no code changes - the system works automatically through decoration.

## Custom relationship resolvers

For relationships that require complex data fetching logic beyond simple URI variable mapping, use a custom resolver class.

### When to use resolverClass

Use `resolverClass` instead of `uriVariableMappings` when:
- The relationship requires custom data extraction or aggregation
- Related data cannot be fetched with a simple provider call
- You need access to request context (locale, store, customer) for business logic
- Data must be extracted from nested or computed properties on the parent resource

### Configuration

```yaml
includes:
  - relationshipName: merchants
    resolverClass: Spryker\Glue\Merchant\Api\Storefront\Relationship\OrderMerchantsRelationshipResolver
    targetResource: merchants
```

When `resolverClass` is specified, the system skips the standard URI variable mapping and delegates relationship resolution to the resolver class. The `targetResource` is optional and used for type discovery in the JSON:API response.

### Implementation

Extend `AbstractRelationshipResolver` and implement the `resolveRelationship()` method:

```php
<?php

namespace Spryker\Glue\Merchant\Api\Storefront\Relationship;

use Spryker\ApiPlatform\Relationship\AbstractRelationshipResolver;
use Spryker\Zed\Merchant\Business\MerchantFacadeInterface;

class OrderMerchantsRelationshipResolver extends AbstractRelationshipResolver
{
    public function __construct(
        private MerchantFacadeInterface $merchantFacade,
    ) {
    }

    /**
     * @return array<object>
     */
    protected function resolveRelationship(): array
    {
        $merchantReferences = [];
        foreach ($this->getParentResources() as $parentResource) {
            $merchantReferences[] = $parentResource->getMerchantReference();
        }

        return $this->merchantFacade->getMerchantsByReferences(
            array_unique(array_filter($merchantReferences)),
        );
    }
}
```

`AbstractRelationshipResolver` provides the following helpers:

| Method | Purpose |
|--------|---------|
| `getParentResources()` | Access the parent resource objects |
| `getRequest()` | Access the Symfony Request |
| `getLocale()` | Get the current locale |
| `getStore()` | Get the current store |
| `getCustomer()` | Get the authenticated customer |
| `getCustomerReference()` | Get the authenticated customer reference |

Resolver classes are automatically registered and autowired by the container.

## Per-item relationship resolvers

Standard resolvers return a flat list of related resources that applies to all parent resources. Per-item resolvers return related resources scoped to each individual parent, which is necessary for one-to-one or parent-scoped relationships in collection responses.

### When to use per-item resolvers

Use `PerItemRelationshipResolverInterface` when each parent resource has its own specific set of related resources. For example:
- Each company user references a different customer
- Each order has different order items
- Each cart has different cart items

### Implementation

Implement `PerItemRelationshipResolverInterface` and return related resources keyed by parent identifier:

```php
<?php

namespace Spryker\Glue\CompanyUser\Api\Storefront\Relationship;

use Spryker\ApiPlatform\Relationship\AbstractRelationshipResolver;
use Spryker\ApiPlatform\Relationship\PerItemRelationshipResolverInterface;

class CompanyUserCustomersRelationshipResolver extends AbstractRelationshipResolver implements PerItemRelationshipResolverInterface
{
    /**
     * @return array<object>
     */
    protected function resolveRelationship(): array
    {
        return array_merge(...array_values($this->resolvePerItem($this->getParentResources(), [])));
    }

    /**
     * @return array<string, array<object>>
     */
    public function resolvePerItem(array $parentResources, array $context): array
    {
        $result = [];
        foreach ($parentResources as $parentResource) {
            $parentId = (string) $parentResource->getCompanyUserUuid();
            $customer = $this->findCustomerForCompanyUser($parentResource);

            if ($customer !== null) {
                $result[$parentId] = [$customer];
            }
        }

        return $result;
    }
}
```

The `resolvePerItem()` method returns an associative array where:
- Keys are parent resource identifiers (as strings)
- Values are arrays of related resource objects for that specific parent

## Nested and flat includes

The relationship system supports both nested and flat include syntax for backward compatibility with the legacy Glue REST API.

### Nested includes

Specify the full path through the relationship chain using dot notation:

```text
GET /orders?include=items.concrete-products
```

This resolves `items` as a relationship of `orders`, then `concrete-products` as a relationship of `items`.

### Flat includes

Flat includes list all desired relationships without specifying the nesting path:

```text
GET /orders?include=items,concrete-products
```

If `concrete-products` is not a direct relationship of `orders` but is a relationship of `items`, the system automatically discovers the correct resolution path. This ensures backward compatibility with the legacy Glue REST API.

### Auto-include

Relationships configured with `autoInclude: true` are automatically resolved without requiring a `?include=` parameter:

```yaml
includes:
  - relationshipName: items
    targetResource: OrderItems
    autoInclude: true
    uriVariableMappings:
      orderReference: orderReference
```

When a resource with auto-include relationships is included in a response (either as a main resource or as an included resource), its auto-include relationships are transitively resolved.
