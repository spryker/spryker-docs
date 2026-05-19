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

### 1. Define the relationship on the parent resource

Add an `includes` section to the parent resource YAML — this is the single source of truth for the relationship. The child resource does not declare anything relationship-specific.

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

The child resource (`CustomersAddresses` in this example) only has to exist as a resource the generator can locate by `targetResource` name. No reverse declaration is required on the child YAML.

### 2. Regenerate container

```bash
docker/sdk testing -x GLUE_APPLICATION=GLUE_STOREFRONT glue cache:clear
```

### 3. Use relationships

```bash
# Single include
GET /customers/customer--35?include=addresses

# Multiple includes
GET /customers/customer--35?include=addresses,orders
```

## Configuration reference

### includes section

Declares what relationships this resource can include. `includes` lives only on the parent resource — there is no reverse declaration on the child.

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

**Resource existence:**
- Target resource must exist
- Referenced properties should exist

**Example error:**

```text
Validation Error in customers.resource.yml:
  - includes[0].targetResource: Resource "CustomersAddresses" referenced
    in includes does not exist.
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

2. **Confirm the relationship is declared on the parent.** The parent resource YAML must carry an `includes` entry whose `targetResource` exactly matches the child resource `name`. The child resource needs no reverse declaration — see the [Configuration reference](#configuration-reference).

3. **Inspect the compiled relationship registry.** API Platform exposes the merged configuration as a container parameter:

    ```bash
    docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue debug:container --parameter=api_platform.relationships
    ```

    The output lists every registered relationship keyed by `{parentResource}.{relationshipName}` (for example, `customers.addresses`). If your relationship is missing, the YAML was not picked up — re-check file location and run `api:generate`.

4. **Verify the child provider is registered.** The child resource needs a provider that API Platform can resolve:

    ```bash
    docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue debug:container | grep <ChildProviderClass>
    ```

### `relationships` block is present but `data` is empty

The relationship is wired up but no related resources come back.

1. **The child provider is returning `null` or `[]`.** Call the child provider directly (or hit its standalone collection endpoint with the same URI variable values) to confirm it returns data.
2. **URI variable mapping does not produce a value.** A property on the parent that resolves to `null` is omitted from the URI variables passed to the child — verify the mapped property is populated on every parent resource in the response. Use `api:debug <resource> --show-merged` to confirm the property is declared.
3. **The child filters too aggressively.** Inspect the child provider's filtering logic with the URI variable values produced by the mapping.

### Invalid include names are ignored

Unknown values in `?include=` (for example, a typo or a relationship the parent does not declare) are silently dropped — the response succeeds without that relationship and no error is raised. If a deployment appears to lose a relationship after a release, suspect a typo or a missing `includes:` entry on the parent resource before assuming a runtime failure.
