---
title: Relationships
description: Configure and use relationships in API Platform to include related resources.
last_updated: May 18, 2026
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

The default provider-based resolution maps URI variables from the parent resource to the child provider. When that is not enough — for example, the related data lives on the parent's `context` payload, is aggregated from several sources, or needs custom denormalization — declare a resolver class instead.

Reference the resolver in the parent's `includes` entry via `resolverClass`. When `resolverClass` is set, `uriVariableMappings` and `targetResource` are not used for routing; the resolver class is invoked directly with the parent resources and request context:

```yaml
# src/Spryker/OrdersRestApi/resources/api/storefront/orders.resource.yml
resource:
  name: Orders
  shortName: orders

  includes:
    - relationshipName: order-amendments
      targetResource: OrderAmendments
      resolverClass: Spryker\Glue\OrderAmendmentsRestApi\Api\Storefront\Relationship\OrderAmendmentsRelationshipResolver
```

The resolver class must implement `Spryker\ApiPlatform\Relationship\RelationshipResolverInterface`. In practice, extend `Spryker\ApiPlatform\Relationship\AbstractRelationshipResolver`, which gives you helpers for accessing the request, locale, store, and customer transfers:

```php
namespace Spryker\Glue\OrderAmendmentsRestApi\Api\Storefront\Relationship;

use Generated\Api\Storefront\OrderAmendmentsStorefrontResource;
use Spryker\ApiPlatform\Relationship\AbstractRelationshipResolver;
use Spryker\Service\Serializer\SerializerServiceInterface;

class OrderAmendmentsRelationshipResolver extends AbstractRelationshipResolver
{
    public function __construct(protected SerializerServiceInterface $serializer)
    {
    }

    /**
     * @return array<\Generated\Api\Storefront\OrderAmendmentsStorefrontResource>
     */
    protected function resolveRelationship(): array
    {
        $resources = [];

        foreach ($this->getParentResources() as $orderResource) {
            $contextData = $orderResource->context ?? null;
            $amendmentData = is_array($contextData) && isset($contextData['salesOrderAmendment'])
                ? $contextData['salesOrderAmendment']
                : null;

            if (!is_array($amendmentData) || $amendmentData === []) {
                continue;
            }

            $resources[] = $this->serializer->denormalize(
                $amendmentData,
                OrderAmendmentsStorefrontResource::class,
            );
        }

        return $resources;
    }
}
```

The `RelationshipConfigurationPass` compiler pass registers the class as an autowired public service automatically — no manual service definition is required. If the referenced class does not exist when the container compiles, the relationship is silently skipped and a compiler log entry is emitted.

Use a custom resolver when:

- The related data is already attached to the parent (for example, embedded in a transfer's `context` array) and a separate child provider would re-fetch it unnecessarily.
- The relationship aggregates data from several sources that no single provider exposes.
- The link from parent to child cannot be expressed as a simple property-to-URI-variable mapping.

## Performance

Relationships are resolved per parent resource. For a collection of N parent resources with an `?include=` request, the child provider is called N times — one call per parent — which can produce an N+1 query pattern if the child provider hits the database per call.

When you expect collection endpoints to be requested with `?include=`, optimize the child provider:

- **Batch internally**: have the child provider detect repeated single-key lookups and coalesce them into one underlying query. For example, accept a `customerReference` URI variable but maintain an in-request cache of previously fetched results.
- **Paginate the parent**: keep parent collection page sizes small (`paginationItemsPerPage`) so the per-include cost stays bounded.
- **Profile real traffic**: enable Doctrine query logging or use Blackfire/Xdebug to confirm the N+1 hypothesis before optimizing — sometimes the parent's own query dominates and the includes are negligible.

## Troubleshooting

### Relationships are not returned

The `?include=` parameter is silently ignored or returns no `relationships` block.

Run through the following checks in order:

1. **Clear the cache.** Relationship configuration is built into the compiled container; YAML changes do not take effect until the container is rebuilt.

    ```bash
    docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue cache:clear
    ```

2. **Confirm the parent declares the relationship.** Runtime resolution only reads `includes` on the parent — that declaration must be present and the names/`uriVariableMappings` must match what the request uses. A matching `includableIn` on the child is optional but recommended for discoverability; it does not affect runtime behavior. See the [Configuration reference](#configuration-reference).

3. **Inspect the compiled relationship registry.** API Platform exposes the merged configuration as a container parameter:

    ```bash
    docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue debug:container --parameter=api_platform.relationships
    ```

    The output lists every registered relationship keyed by `{parentResource}.{relationshipName}` (for example, `customers.addresses`). If your relationship is missing, the YAML was not picked up — re-check file location and run `api:generate`.

4. **Verify the child provider is registered.** The child resource needs a provider that API Platform can resolve:

    ```bash
    docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue debug:container | grep <ChildProviderClass>
    ```

### Validation error: bi-directional consistency

Resource generation fails with an error like:

```text
Validation Error in customers.resource.yml:
  - includes[0].targetResource: Resource "CustomersAddresses" declares includableIn
    for "Customers" but uses different relationshipName "customerAddresses"
    Expected: "addresses"
```

The parent's `includes[].relationshipName` and the child's `includableIn[].relationshipName` must be identical strings. The same applies to `uriVariableMappings` — every mapping declared on the parent must appear on the child with the same source/target names.

### `relationships` block is present but `data` is empty

The relationship is wired up but no related resources come back.

1. **The child provider is returning `null` or `[]`.** Call the child provider directly (or hit its standalone collection endpoint with the same URI variable values) to confirm it returns data.
2. **URI variable mapping does not produce a value.** A property on the parent that resolves to `null` is omitted from the URI variables passed to the child — verify the mapped property is populated on every parent resource in the response. Use `api:debug <resource> --show-merged` to confirm the property is declared.
3. **The child filters too aggressively.** Inspect the child provider's filtering logic with the URI variable values produced by the mapping.

### Invalid include names are ignored

Unknown values in `?include=` (for example, a typo or a relationship the parent does not declare) are silently dropped — the response succeeds without that relationship and no error is raised. If a deployment appears to lose a relationship after a release, suspect a typo or a missing `includableIn` in the child before assuming a runtime failure.
