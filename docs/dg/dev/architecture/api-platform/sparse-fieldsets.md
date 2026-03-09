---
title: Sparse fieldsets
description: Use sparse fieldsets to request only specific resource attributes from API Platform endpoints.
last_updated: Feb 27, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Relationships
    link: docs/dg/dev/architecture/api-platform/relationships.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
---

Sparse fieldsets let API consumers request only the attributes they need from a resource. This reduces response payload size, improves performance, and follows the [JSON:API sparse fieldsets specification](https://jsonapi.org/format/#fetching-sparse-fieldsets).

## Query syntax

Use the `fields` query parameter with the resource type as the key and a comma-separated list of attribute names as the value:

```text
?fields[RESOURCE_TYPE]=attribute1,attribute2
```

The resource type corresponds to the `shortName` of the API Platform resource (in kebab-case for JSON:API).

## Examples

### Request specific attributes

To retrieve only the `name` and `locale` attributes from the `stores` resource:

```text
GET /stores?fields[stores]=name,locale
Accept: application/vnd.api+json
```

Response:

```json
{
  "data": [
    {
      "id": "1",
      "type": "stores",
      "attributes": {
        "name": "DE",
        "locale": "de_DE"
      }
    }
  ]
}
```

Without sparse fieldsets, the same request returns all attributes defined on the resource.

### Combine with relationships

Sparse fieldsets work together with the `include` parameter. You can filter attributes on both the main resource and included relationships:

```text
GET /customers/customer--1?include=addresses&fields[customers]=email,firstName&fields[customers-addresses]=city,zipCode
Accept: application/vnd.api+json
```

Response:

```json
{
  "data": {
    "id": "customer--1",
    "type": "customers",
    "attributes": {
      "email": "john@example.com",
      "firstName": "John"
    },
    "relationships": {
      "addresses": {
        "data": [
          { "type": "customers-addresses", "id": "1" }
        ]
      }
    }
  },
  "included": [
    {
      "id": "1",
      "type": "customers-addresses",
      "attributes": {
        "city": "Berlin",
        "zipCode": "10115"
      }
    }
  ]
}
```

### Combine with pagination

Sparse fieldsets work with paginated collections:

```text
GET /customers?fields[customers]=email&page=1&itemsPerPage=5
Accept: application/vnd.api+json
```

## How it works

Sparse fieldsets are enabled globally for all API Platform resources. The processing chain works as follows:

1. **Request parsing**: The `JsonApiProvider` parses `fields[]` query parameters and stores them as `_api_filter_property` on the request.
2. **Filter invocation**: The `SerializerFilterContextBuilder` reads the operation's registered filters and invokes each one.
3. **Property filtering**: The `PropertyFilter` reads `_api_filter_property` and sets `AbstractNormalizer::ATTRIBUTES` on the serializer context.
4. **Serialization**: The Symfony serializer only includes the listed attributes in the response.

No changes to providers, processors, or resource schemas are required. Sparse fieldsets work automatically for all resources.

## Notes

- If no `fields` parameter is provided, all attributes are returned as usual.
- The `id` and `type` fields in JSON:API responses are always included regardless of the `fields` parameter.
- Requesting a nonexistent attribute name silently excludes it from the response without causing an error.
