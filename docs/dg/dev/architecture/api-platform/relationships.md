---
title: Relationships
description: Configure and use relationships in API Platform to include related resources.
last_updated: Feb 5, 2026
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
- `relationshipName`: Name used in `?include=` parameter (e.g., `addresses`)
- `targetResource`: Name of the resource to include (e.g., `CustomersAddresses`)

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

```
Validation Error in customers.resource.yml:
  - includes[0].targetResource: Resource "CustomersAddresses" declares
    includableIn for "Customers" but uses different relationshipName
    "customerAddresses". Expected: "addresses"
```

## Response format

**Request:**
```
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
