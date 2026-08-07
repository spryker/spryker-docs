---
title: Typed collections in the published contract
description: How object collections are published in the OpenAPI contract in API Platform, and the constraints on adopting them for an existing field.
last_updated: Jul 31, 2026
template: concept-topic-template
related:
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Relationships
    link: docs/dg/dev/architecture/api-platform/relationships.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
  - title: Serialization
    link: docs/dg/dev/architecture/api-platform/serialization.html
  - title: Troubleshooting
    link: docs/dg/dev/architecture/api-platform/troubleshooting.html
---

This document explains what an object collection publishes in the OpenAPI contract, and the constraints
that make typing an existing list field a deliberate decision.

For the schema syntax itself, see
[Object collections](/docs/dg/dev/architecture/api-platform/resource-schemas.html#object-collections).
This page covers what that syntax produces for API consumers and what to check before adopting it.

## What an object collection publishes

A `type: array` property whose `items` are a typed object publishes the element as a referenced
component schema, so the contract describes a single element as precisely as it describes a single
nested object.

Given this property on the `Products` resource:

```yaml
prices:
    type: array
    writable: false
    description: 'Prices per store and currency'
    items:
        type: object
        properties:
            grossAmount: { type: integer }
            currency:    { type: string }
```

the published contract references a generated element schema:

```json
"prices": {
    "type": "array",
    "description": "Prices per store and currency",
    "items": {
        "$ref": "#/components/schemas/ProductsPricesBackendObject"
    }
}
```

and registers that schema in the same document, so the reference always resolves:

```json
"ProductsPricesBackendObject": {
    "type": "object",
    "properties": {
        "grossAmount": { "type": "integer" },
        "currency": { "type": "string" }
    }
}
```

Without an `items` block, the same property publishes as a bare `"type": "array"` with no element
description. Consumers cannot see the element shape, and SDK generators produce an untyped collection.

{% info_block infoBox "Reference prefix" %}

The prefix depends on the document flavor. The OpenAPI document uses `#/components/schemas/`, while a
plain JSON Schema document uses `#/definitions/`. Both point at the same generated element schema.

{% endinfo_block %}

### How the element type reaches the contract

PHP has no generics, so the property itself stays a plain `array` and the element type travels in a
docblock on the generated resource class:

```php
/**
 * @var array<\Generated\Api\Backend\Products\ProductsPricesBackendObject>
 */
public array $prices = [];
```

API Platform reads that docblock through its property-metadata chain while building the schema, which is
what lets it emit the reference and register the element schema itself.

This matters when you are debugging: if the docblock is missing from the generated class, the contract
falls back to an untyped array. See
[Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html).

## Lists of scalars

A list of scalars needs no element class and produces no reference:

```yaml
skus:
    type: array
    items:
        type: string
```

The property stays a plain typed array. This is complete as it is — there is nothing further to declare.

## Edge cases and constraints

### A typed element is a closed shape

This is the most important constraint on this page.

Generated value objects copy only the fields you declare. Both `fromArray()` and `toArray()` iterate the
declared properties and nothing else. Adding an `items` block to a list that is already part of a
released response therefore **silently drops every payload key you did not declare** in
`items.properties`.

Nothing warns you. The response loses fields, and consumers relying on them break.

For a **new** field this never arises — declare `items` from the start and the shape is complete by
construction.

For an **existing** field, treat adoption as a backward-compatibility decision:

1. Capture a real response payload for the endpoint.
2. List the keys present on a single element of the list.
3. Compare them against the `items.properties` you intend to declare.
4. Add every missing key before adopting, or do not adopt yet.

{% info_block warningBox "Check the payload, not the transfer object" %}

Compare against a real response, not the transfer object behind it. A provider can add, rename, or omit
keys on the way out, so the transfer object is not a reliable description of what consumers receive.

{% endinfo_block %}

### `openapiContext.items` does not type anything

This is the most common mistake, because the two forms look almost identical in YAML.

An `items` block nested under `openapiContext` is documentation passthrough. It describes the element in
the OpenAPI document, but it generates no class and produces no reference:

```yaml
# Documentation only — no generated class, no typed reference
categories:
    type: array
    openapiContext:
        items:
            type: object
            properties:
                categoryKey: { type: string }
```

Only a sibling of `type: array` produces a typed element schema:

```yaml
# Typed — generates a class and publishes a reference
categories:
    type: array
    items:
        type: object
        properties:
            categoryKey: { type: string }
```

### Declaring both forms is rejected

A property must not declare both `items` and `openapiContext.items`. Schema validation rejects the
combination, because `openapiContext` is merged on top of the derived schema: the hand-written shape
would win and the typed element schema would be discarded without a trace.

Keep the `items` sibling and remove the `openapiContext.items` block.

### Relationship properties cannot declare `items`

A property that is a relationship target declared in `includes` must not also declare a sibling `items`
block. Schema validation rejects the combination.

Only one docblock is emitted per property, and a relationship property already receives one describing
its target resource. The two declarations compete for the same slot, so the ambiguity is rejected rather
than silently resolved. A property is either a relationship to another resource or an inline object
list — not both. See [Relationships](/docs/dg/dev/architecture/api-platform/relationships.html).

### Nested lists inside `openapiContext` stay hand-written

A list nested inside an `openapiContext` block is as hand-described as the block containing it. It never
becomes a typed reference, however it is declared, because nothing under `openapiContext` reaches the
generator.

### Providers can keep assigning raw arrays

Declaring `items` does not break a provider that assigns plain arrays instead of value objects. The
generated mapping code guards both directions: `toArray()` maps an element through its `toArray()` only
when the element is an instance of the generated class, and `fromArray()` hydrates an element only when
it is an array. Anything else passes through unchanged.

You can therefore improve a field's published contract without rewriting its provider at the same time.

### Nullable collections preserve null

A nullable typed collection preserves `null` rather than coercing it to an empty array. `toArray()`
returns `null` when the property is `null`, and `fromArray()` falls back to `null` instead of `[]` when
the key is absent or is not an array.

### Canonical objects behave slightly differently

When the element shape is shared across resources through a canonical object, the collection form and
the single form differ:

- A canonical **single** object is typed directly to the shared class.
- A canonical **collection** stays a plain `array` and names its element class through the docblock, for
  the same reason any collection does — PHP has no generics.

Both publish a reference to the same shared component schema. See
[Project-defined canonical nested objects](/docs/dg/dev/architecture/api-platform/resource-schemas.html#project-defined-canonical-nested-objects).

## Adoption status

No property in the code base declares a sibling `items` block on a resource yet. The capability is
available, and adoption happens per field so each one can be checked against a real payload first, as
described in [A typed element is a closed shape](#a-typed-element-is-a-closed-shape).

If you are looking for an existing example to copy, there is not one yet — use this page and
[Object collections](/docs/dg/dev/architecture/api-platform/resource-schemas.html#object-collections)
instead.
