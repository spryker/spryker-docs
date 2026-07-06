---
title: Resource Schemas
description: Understanding API Platform resource schema definitions in Spryker.
last_updated: Jun 26, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Relationships
    link: docs/dg/dev/architecture/api-platform/relationships.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
  - title: CodeBucket Support
    link: docs/dg/dev/architecture/api-platform/code-buckets.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: API Platform Testing
    link: docs/dg/dev/architecture/api-platform/testing.html
  - title: Security
    link: docs/dg/dev/architecture/api-platform/security.html
  - title: Native API Platform Resources
    link: docs/dg/dev/architecture/api-platform/native-api-platform-resources.html
---

This document explains how to define API Platform resource schemas in Spryker.

## Schema file structure

API Platform uses YAML files to define resource schemas. Resource schemas describe the structure, operations, and behavior of your API resources.

### Schema location

Resource schemas must be placed in the `resources/api/{api-type}/` directory within your module:

```MARKDOWN
src/
├── Spryker/
│   └── {Module}/
│       └── resources/
│           └── api/
│               ├── storefront/
│               │   └── resource-name.resource.yml
│               └── backend/
│                   └── resource-name.resource.yml
├── SprykerFeature/
│   └── {Feature}/
│       └── resources/
│           └── api/
│               └── backend/
│                   └── resource-name.resource.yml
└── Pyz/
    └── Glue/
        └── {Module}/
            └── resources/
                └── api/
                    └── backend/
                        └── resource-name.resource.yml
```

## CodeBucket resources

API Platform supports CodeBucket-specific resource variants that are resolved at runtime based on the `APPLICATION_CODE_BUCKET` environment constant. This enables Code Bucket-specific API resources without requiring separate container compilations.

### CodeBucket schema file naming

Resource schemas follow the pattern: `{resource-name}.resource.yml`
Validation schemas follow the pattern: `{resource-name}.validation.yml`

CodeBuckets are specified inside the schema files, not in the filename.

```MARKDOWN
src/Pyz/Glue/StoresApi/resources/api/backend/
├── stores.resource.yml              # Resource schema (CodeBucket variants defined inside)
└── stores.validation.yml            # Validation schema (CodeBucket variants defined inside)
```

### Generated class naming

The generator creates classes following the pattern: `{ResourceName}{CodeBucket}{ApiType}Resource`

| Schema File | CodeBucket (defined in file) | Generated Class | CODE_BUCKET Constant |
|-------------|------------------------------|----------------|---------------------|
| `stores.resource.yml` | None (base) | `StoresBackendResource` | Not present (base resource) |
| `stores.resource.yml` | EU | `StoresEUBackendResource` | `'EU'` |
| `stores.resource.yml` | AT | `StoresATBackendResource` | `'AT'` |

### How CodeBucket resolution works

1. **Schema definition**: Define CodeBucket variants inside schema files using `codeBucket: EU`
2. **Constant generation**: Generator adds `public const string CODE_BUCKET = 'EU';` to variant classes
3. **Runtime resolution**: System reads `APPLICATION_CODE_BUCKET` and selects matching resource class
4. **Graceful fallback**: If no matching variant exists, base resource is used

### URL consistency

All CodeBucket variants share the same URL path, with the Code Bucket defined in the domain:

- EU variant: `glue-backend.eu.spryker.local/stores` → `StoresEUBackendResource`
- AT variant: `glue-backend.at.spryker.local/stores` → `StoresATBackendResource`
- DE variant: `glue-backend.de.spryker.local/stores` → `StoresBackendResource` (or `StoresDEBackendResource` if variant exists)

The URL path is identical (`/stores`), but the Code Bucket in the domain determines which resource variant is used. Only properties, validations, and business logic differ between variants.

### When to use CodeBucket resources

Use CodeBucket variants when you need:
- Code Bucket-specific properties (EU GDPR fields, tax rates)
- Code Bucket-specific validation rules
- Country-specific business logic
- Feature variations per Code Bucket

For a comprehensive guide including implementation examples, see [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html).

## Resource schema syntax

### Minimal example

```yaml
resource:
  name: Products
  shortName: products
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

{% info_block infoBox "shortName convention" %}

`shortName` is the JSON:API `type` field for the resource and is used as the public URL segment. Use **lowercase kebab-case**, plural for noun-style resources (`products`, `addresses`, `abstract-product-prices`) and singular for action-style endpoints (`catalog-search`, `cart-reorder`). Multi-word names are always hyphenated. This matches every shipped resource in the platform.

{% endinfo_block %}

### Complete example with all options

```yaml
# yaml-language-server: $schema=../../../../../vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json

resource:
  # Resource identification
  name: Customers                    # Internal name (used for schema merging)
  shortName: customers               # URL name (becomes /customers); JSON:API type field
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

  # JSON:API `included` array ordering — see "Sort priority for included resources"
  includedSortPriority: 0

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

  # Relationships — see Relationships article for full reference
  includes:
    - relationshipName: addresses
      targetResource: CustomersAddresses
      uriVariableMappings:
        customerReference: customerReference

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
| `array` | `array` | `["a", "b"]` | Lists of values |
| `object` | `object` | `{"key": "value"}` | Strictly typed nested objects — generates a typed companion class. See [Typed nested objects](#typed-nested-objects). A project can also share one shape across resources with a [canonical nested object](#project-defined-canonical-nested-objects). |
| `map` | `array` | `{"key": "value"}` | Free-shape associative payloads documented via `openapiContext`. Stored as PHP `array` and rendered as `type: object` in the OpenAPI specification. |
| `mixed` | `mixed` | any | Use only when the payload genuinely has no fixed shape and cannot be described via `openapiContext`. |

Use `map` when the payload is a structured JSON object whose schema you want to describe via
`openapiContext` rather than a strongly typed PHP class. This is the recommended type whenever a
request or response body is a JSON object with a known shape but no dedicated class — it
keeps the property typed as a simple `array` in PHP while still producing rich OpenAPI metadata
and a working "Try Out" body in Swagger UI. See
[Documenting nested properties for OpenAPI and Swagger UI](#documenting-nested-properties-for-openapi-and-swagger-ui)
for the full pattern.

When you do want a strongly typed class for the payload — so PHP enforces the field set and the
OpenAPI document publishes a named component schema — use `type: object` with nested
`properties:` instead. See [Typed nested objects](#typed-nested-objects).

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

Makes property mandatory (use validation schemas for detailed rules):

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

## Typed nested objects

A property declared as `type: object` with its own nested `properties:` block generates a
dedicated, strongly typed companion class — not an untyped array. The generator emits one PHP
class per nested object, types the parent property to that class, and publishes a full
field-by-field schema in the OpenAPI document. The serializer hydrates the nested object from the
same JSON payload, so the response on the wire is identical to the array-based form it replaces.

This is the strongly typed counterpart to the `map` pattern described in
[Documenting nested properties for OpenAPI and Swagger UI](#documenting-nested-properties-for-openapi-and-swagger-ui):
`map` documents a nested object while keeping it a plain PHP `array`; `type: object` promotes it
to a real class whose shape is enforced by PHP's type system.

### Why use it

- **Type safety in PHP.** The parent property is typed to the generated class (for example,
  `?CartsTotalsStorefrontResource`) instead of `array`, so providers and processors get IDE
  autocompletion and the language enforces the field set.
- **Precise OpenAPI schema.** Each sub-field carries its own `type`, `description`, and `example`,
  so the OpenAPI document and Swagger UI render the object as a named component schema instead of
  an opaque `object`.
- **No runtime contract change.** Because the serializer denormalizes the typed object from the
  same keys, migrating a property from `array`/`map` to `type: object` leaves the JSON response
  unchanged — only the generated PHP and the published schema improve.

### When to use which type

| Use | When |
|-----|------|
| `type: object` (with `properties`) | The payload has a **stable, known shape** you want enforced as a PHP class — for example, cart and order `totals`, or a quote-request `customer`. |
| `type: map` (with `openapiContext`) | The shape is known and worth documenting, but you do **not** want a dedicated PHP class — for example, payloads aggregated from several transfer objects, or PSP-specific responses. See [Documenting nested properties for OpenAPI and Swagger UI](#documenting-nested-properties-for-openapi-and-swagger-ui). |
| `type: mixed` | The payload genuinely has **no fixed shape** and cannot be described via `openapiContext`. |

### How to declare it

Give the property `type: object` and nest its fields under `properties:`. Sub-fields accept the
same attributes as top-level properties (`type`, `description`, `openapiContext`, `nullable`,
`serializedName`, `serializedPath`):

```yaml
totals:
    type: object
    readable: true
    writable: false
    required: false
    description: 'Calculated cart totals in cents.'
    properties:
        subtotal:
            type: integer
            description: 'Items × prices before any discount/tax.'
            openapiContext: { example: 16058 }
        grandTotal:
            type: integer
            description: 'What the customer pays.'
            openapiContext: { example: 14601 }
        priceToPay:
            type: integer
            description: 'Grand total adjusted for any pre-paid amount (e.g. gift cards).'
            openapiContext: { example: 14601 }
```

### Generated output

For a `Carts` resource with the `totals` property above, the generator:

1. Types the property on the resource class:

   ```php
   public ?CartsTotalsStorefrontResource $totals = null;
   ```

2. Writes a companion class next to the resource in the `Generated\Api\{ApiType}\` namespace. The
   class is `final`, carries **no** `#[ApiResource]` attribute — it is an embedded value object,
   not a routed resource — and exposes the typed sub-fields plus their accessors:

   ```php
   namespace Generated\Api\Storefront;

   use ApiPlatform\Metadata\ApiProperty;

   final class CartsTotalsStorefrontResource
   {
       #[ApiProperty(description: 'Items × prices before any discount/tax.', openapiContext: ['example' => 16058])]
       public ?int $subtotal = null;

       #[ApiProperty(description: 'What the customer pays.', openapiContext: ['example' => 14601])]
       public ?int $grandTotal = null;

       #[ApiProperty(description: 'Grand total adjusted for any pre-paid amount (e.g. gift cards).', openapiContext: ['example' => 14601])]
       public ?int $priceToPay = null;

       // Getters, setters, toArray(), fromArray() …
   }
   ```

The companion class name is `{ResourceName}{PropertyPath}{ApiType}Resource` — the resource's
normalized name, the capitalized property path, the API type, and the `Resource` suffix. So
`Carts` + `totals` on the storefront API becomes `CartsTotalsStorefrontResource`; a checkout
`billingAddress` becomes `CheckoutBillingAddressStorefrontResource`.

{% info_block infoBox "Imports in companion classes" %}

Companion classes import only the attributes they actually use (`ApiProperty`, `SerializedName`,
`SerializedPath`). An attribute referenced without its `use` statement would resolve to a
non-existent class in the `Generated` namespace and break attribute reflection at runtime, so the
generator never emits an unused import.

{% endinfo_block %}

### Nested objects within objects

Objects can nest to any depth. Each level generates its own class, named by concatenating the
property path onto the resource name. For example:

```yaml
totals:
    type: object
    properties:
        tax:
            type: object
            properties:
                amount:
                    type: integer
```

on the storefront `Carts` resource generates a `CartsTotalsStorefrontResource` class with
`public ?CartsTotalsTaxStorefrontResource $tax = null;`, plus a separate
`CartsTotalsTaxStorefrontResource` class with `public ?int $amount = null;`. A deeper path simply
keeps concatenating — an agent quote-request resource's `shownVersion.cartTotals` object becomes
`AgentQuoteRequestsShownVersionCartTotalsStorefrontResource`.

### Object collections

A `type: array` property whose `items:` are themselves a typed object (`type: object` with nested
`properties:`) generates a value-object class for the element type. The class is named after the
**pluralized** field segment — `{ResourceName}{PluralField}{ApiType}Resource` — and the parent
property stays a PHP `array` carrying a `@var array<…>` docblock so the serializer denormalizes
each element into the generated class:

```yaml
# carts.resource.yml — a list of typed customer objects
customer:
    type: array
    items:
        type: object
        properties:
            firstName: { type: string }
            email:     { type: string }
```

On the storefront `Carts` resource this generates `CartsCustomersStorefrontResource` (the field
`customer` pluralized to `Customers`) as the element type, and types the property as
`array<\Generated\Api\Storefront\CartsCustomersStorefrontResource>`.

### Per-resource validation lifting

Each typed nested object gets its **own** value-object class, so validation you authored the
array-shaped way — an `Assert\Collection` on the object property in the resource's
`{resource-name}.validation.yml` — would reject the denormalized object value with a 422
(`This value should be of type array`). The generator resolves this automatically: for a writable
object property it **lifts** the `Collection.fields` constraints off the property and onto the
matching fields of that resource's value object, and emits a plain `#[Assert\Valid]` cascade
(carrying the operation groups) on the property instead of the `Collection`.

You keep authoring validation exactly as before — write the `Collection` against the object
property:

```yaml
# checkout-data.validation.yml
post:
    customer:
        - Optional:
              constraints:
                  - Collection:
                        allowExtraFields: true
                        fields:
                            email:
                                - NotBlank: { message: 'Email is invalid.' }
                                - Email:    { message: 'Email is invalid.' }
```

The lifted constraints are re-grouped through the resource's own operation groups (so this
`checkout-data` `customer.email` rule stays in the `checkout-data:create` group) and attached to
the value object's `email` field; the `customer` property itself carries only `#[Assert\Valid]`.
Each resource's value object is validated independently — there is **no** cross-resource union,
because every resource has its own value-object class. A property whose object is not writable, or
a plain list property that is not a typed object collection, keeps its array-shaped `Collection` —
only writable typed-object properties are lifted.

#### `allowMissingFields`

A `Collection` with `allowMissingFields: true` (for example, a checkout `billingAddress` referenced
only by id) tolerates absent keys. On a value object an absent field denormalizes to `null`, so the
generator relaxes presence constraints when lifting: each `NotBlank` gains `allowNull: true` and
each `NotNull` is dropped — an absent field passes, a present-but-empty one still fails.

### Cross-module field contribution

Because each resource owns its value-object class, a nested object's fields can still be
contributed from several modules — this is how you keep the dependency direction correct, with
each field declared in its owning module. Multiple modules ship a same-named `*.resource.yml`
fragment for the same resource, and the schema merger **deep-merges nested object `properties`**
(and `items.properties` for collections) rather than letting a later fragment's nested block
replace an earlier one.

For example, both `DiscountsRestApi` and `ProductOptionsRestApi` add fields to the cart-items
`calculations` object:

```yaml
# DiscountsRestApi — cart-items.resource.yml
resource:
    name: CartItems
    properties:
        calculations:
            type: object
            properties:
                discountTotal: { type: integer }

# ProductOptionsRestApi — cart-items.resource.yml
resource:
    name: CartItems
    properties:
        calculations:
            type: object
            properties:
                productOptionTotal: { type: integer }
```

The merged `calculations` object carries **both** `discountTotal` and `productOptionTotal`, and a
single `CartItemsCalculationsStorefrontResource` value object is generated for it. This deep merge —
not a shared class — is how identically-named objects accumulate fields across modules while each
resource keeps its own independent request/response shape.

## Project-defined canonical nested objects

[Typed nested objects](#typed-nested-objects) generate one value-object class **per resource
property**: a `billingAddress` on the checkout resource and a `shippingAddress` on the order
resource each get their own independent class, even when both describe the same real-world shape.
That keeps each resource self-contained, but it also means the same address shape is authored and
maintained in several places.

A **canonical nested object** lets a project define that shared shape **once** and have it flow
into every resource property that opts in. All the opting-in properties then collapse onto a single
generated class — `Generated\Api\{ApiType}\{Object}` (for example, `Generated\Api\Storefront\Address`) —
instead of a per-resource companion class.

This is a pure project opt-in. With no canonical object files present, generation is byte-for-byte
identical to the default per-resource behavior described above — nothing changes until a project
adds its first `*.object.yml`.

### File location and naming

Canonical objects live in a **dedicated, reserved subdirectory literally named `objects/`** inside the per-`apiType` resource directory. The directory name is always `objects` — it is never named after a resource or module. This is distinct from resource definition files, which live directly in the `apiType` directory:

```text
resources/api/storefront/
├── checkout.resource.yml          # a resource definition
├── checkout.validation.yml        # its validation
└── objects/                       # reserved dir — canonical objects only
    ├── address.object.yml
    └── address.object.validation.yml
```

Only `*.object.yml` and `*.object.validation.yml` files belong in `objects/`. Resource files (`*.resource.yml`) are placed directly in the per-`apiType` directory, never inside `objects/`.

The `<dashed-name>.<kind>.yml` naming pattern is the same for both file types — only the kind word differs. `address.object.yml` is the canonical-object analog of `checkout.resource.yml`, and `address.object.validation.yml` is the analog of `checkout.validation.yml`. The `object` versus `resource` word identifies the artifact kind, not a different naming scheme.

Full path patterns:

```text
resources/api/<apiType>/objects/<dashed-name>.object.yml
resources/api/<apiType>/objects/<dashed-name>.object.validation.yml   # optional, see Validation
```

For example, on the storefront API:

```text
src/Pyz/resources/api/storefront/objects/address.object.yml
src/Pyz/resources/api/storefront/objects/address.object.validation.yml
```

The file name uses a dashed (kebab-case) object name, while `object.name` **inside** the file is
CamelCase. The CamelCase `object.name` is the contract: it must exactly match the `objectName:`
join tag declared on the resource properties that want this shape (see [The `objectName` join
tag](#the-objectname-join-tag)).

### Central directory

A project may keep canonical object files in one central location instead of (or in addition to) the per-module `objects/` directories. Both locations are scanned simultaneously.

Configure the central directory via the Symfony bundle config node `spryker_api_platform.canonical_object_search_directories`, keyed by API type. Relative paths resolve against the project root; `%kernel.project_dir%` is also supported:

```yaml
# config/packages/spryker_api_platform.yaml
spryker_api_platform:
    canonical_object_search_directories:
        storefront:
            - '%kernel.project_dir%/config/api/objects/storefront'
```

The same `*.object.yml` / `*.object.validation.yml` naming rules apply. Files in a central directory are always treated as the **project** layer, so they participate in the standard `project > feature > core` merge precedence.

Defining the same `objectName` more than once within the same layer — for example, one module file and one central-directory file both at project layer — is a fail-loud error: generation aborts with an `ApiSchemaGenerationException` naming both source files. The same name across different layers is fine — that is the normal override.

### File format

The file contains a single top-level `object:` key:

```yaml
# address.object.yml
object:
    name: Address                                   # CamelCase; matches `objectName: Address` on resource properties
    properties:
        salutation: { type: string, description: 'Address salutation.', example: 'Mr' }
        firstName:  { type: string, description: 'First name.', example: 'Jane' }
        lastName:   { type: string, description: 'Last name.', example: 'Doe' }
        address1:   { type: string, description: 'Street name.', example: 'Julie-Wolfthorn-Straße' }
        zipCode:    { type: string, description: 'ZIP / postal code.', example: '10115' }
        city:       { type: string, description: 'City.', example: 'Berlin' }
```

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `object.name` | string | Yes | CamelCase object name. Matched against `objectName:` join tag on every resource property that references this object. |
| `object.properties` | map | Yes | Field definitions. Each field uses the **same syntax as a resource property** — `type`, `description`, `validation`, `example`, and so on. |
| `object.extends` | string | No | CamelCase name of another canonical object whose resolved fields are inherited first. See [Composition](#composition-with-extends-and-omit). |
| `object.omit` | string[] | No | Names of inherited fields to drop from the `extends` base before this object's own properties are applied. |

### Composition with `extends` and `omit`

An object can inherit another canonical object's fields with `extends`, then trim and extend them.
This avoids re-declaring a shared shape when one variant is a near-copy of another — for example, a
read-only address snapshot derived from a writable address:

```yaml
# address-snapshot.object.yml
object:
    name: AddressSnapshot
    extends: Address                                # inherit all Address fields first
    omit: [id, idCompanyBusinessUnitAddress]        # drop the write-only identifiers
    properties:
        country: { type: string, description: 'Country name.', example: 'Germany' }   # add a read-only field
```

Fields resolve in this order, with later steps winning:

1. The fields inherited from `extends`.
2. Any field named in `omit` is removed.
3. This object's own `properties` are applied — a field redeclared here overrides the inherited one.

An `extends` cycle (for example, two objects that extend each other) is rejected at generation time
with an `ApiSchemaGenerationException`.

### The `objectName` join tag

A resource property opts into a canonical object by declaring `type: object` together with an
`objectName:` tag whose value equals the canonical `object.name`:

```yaml
# checkout.resource.yml
properties:
    billingAddress:
        type: object
        objectName: Address       # joins this property to the canonical Address object
        readable: false
        writable: true
        properties:
            zipCode: { type: string }
```

The `objectName` tag is dormant on its own: if no `address.object.yml` exists, the property's
inline `properties:` block is generated exactly as a normal [typed nested
object](#typed-nested-objects). When a canonical file for `Address` **is** present, the tag
activates and:

- The property's inline `properties:` are **replaced** by the canonical object's resolved shape.
- The mount attributes — `readable`, `writable`, `required`, `nullable` — stay on the referencing
  property. They describe how this property is mounted on this resource and are **not** owned by
  the canonical object, so the same canonical shape can be writable on one resource and read-only
  on another.
- A single shared `Generated\Api\{ApiType}\{Object}` class is emitted for the canonical object. No
  per-property companion class is generated for that property; every property tagged with the same
  `objectName` is typed to the one shared class.

{% info_block infoBox "Shared class versus per-resource class" %}

Without `objectName`, each `type: object` property generates its own per-resource value-object
class (for example, `CheckoutBillingAddressStorefrontResource`). With `objectName: Address`, all
matching properties across all resources instead share the single `Generated\Api\Storefront\Address`
class. Use a canonical object when several resources genuinely share one shape and you want them to
stay in lockstep; keep the inline form when each resource's shape is independent.

{% endinfo_block %}

### Validation

Field-level validation for a canonical object is authored in a parallel
`<dashed-name>.object.validation.yml` file, using the same format as a resource
[validation schema](/docs/dg/dev/architecture/api-platform/validation-schemas.html):

```yaml
# address.object.validation.yml
zipCode:
    - NotBlank: { message: 'ZIP code is required.' }
firstName:
    - NotBlank: { message: 'First name is required.' }
```

These constraints are lifted onto the generated canonical class. Every resource property that
references the object through `objectName` then carries an `Assert\Valid` cascade to that class, so
the canonical field rules are enforced wherever the object is used — you author the object's
validation once, in one place.

### Layer precedence

Canonical objects follow the same layer rules as resource schemas. The layer is detected from the
file path — a `/Pyz/` path is a project file, a `/SprykerFeature/` path is a feature file, and
anything else is core. Same-named objects merge by `object.name` with the precedence:

```text
project > feature > core
```

Because the merge is by `objectName`, a project can add a single field to a feature-layer canonical
object without redefining the whole object. Core ships no canonical object files today; the
mechanism is available to the project, feature, and core layers, and in practice projects are the
primary users.

## Documenting nested properties for OpenAPI and Swagger UI

Many endpoints accept or return structured JSON payloads — for example, a payment initialization
request that takes `payment`, `quote`, and `customer` sub-objects. Without explicit metadata,
those payloads appear as opaque `object` entries in the OpenAPI document, which means:

- The generated OpenAPI specification does not describe the child fields, their types, or which
  ones are required.
- The Swagger UI "Try Out" button shows an empty request body, forcing consumers to read code or
  external documentation to discover the expected shape.

The `map` property type combined with nested `openapiContext` entries closes both gaps.

### When to use this pattern

Use this pattern when the request or response body is a structured JSON object whose schema you
want to publish through OpenAPI, but you do not want to introduce a dedicated typed PHP class
for it. Typical cases are:

- Request payloads that aggregate fields from multiple transfer objects (for example, payment
  selection plus quote context).
- PSP- or provider-specific response payloads whose shape varies by configuration.

For payloads with a stable, strongly typed shape, prefer `type: object` so the generated PHP
class enforces the structure at the language level.

### Pattern

Combine `type: map` on the property with the following entries inside `openapiContext`:

| Entry | Purpose |
|-------|---------|
| `properties` | Declares each child field with its own `type`, `description`, `format`, and `example`. Used by Swagger UI to render the field-by-field schema. |
| `required` | Lists the child fields that must be present on a request. Drives the "required" markers in Swagger UI and the OpenAPI specification. |
| `example` | A complete sample payload. This is the value Swagger UI prefills into the "Try Out" body, so consumers can execute the request immediately. |

When the property is a `map`, the generator merges `'type' => 'object'` into the emitted
`openapiContext`, so the property appears as an object — with the documented schema — in the
OpenAPI document while staying as a plain PHP `array` in the generated resource class.

### Worked example

The following extract is taken from
`src/Spryker/PaymentsRestApi/resources/api/storefront/payments.resource.yml`. It shows three
common shapes: a flat request object (`payment`), a request object with nested object children
(`quote`), and a response-only object whose contents vary at runtime (`preOrderPaymentData`).

```yaml
properties:
    payment:
        type: map
        writable: true
        readable: false
        required: true
        description: 'Payment selection for the pre-order initialization'
        openapiContext:
            required: ['paymentProviderName', 'paymentMethodName', 'amount']
            properties:
                paymentProviderName:
                    type: string
                    example: 'DummyPayment'
                paymentMethodName:
                    type: string
                    example: 'Invoice'
                amount:
                    type: integer
                    description: 'Amount in minor units (cents)'
                    example: 9999
            example:
                paymentProviderName: 'DummyPayment'
                paymentMethodName: 'Invoice'
                amount: 9999

    quote:
        type: map
        writable: true
        readable: false
        required: true
        description: 'Quote context required to initialize the payment'
        openapiContext:
            required: ['customer', 'billingAddress', 'currency']
            properties:
                customer:
                    type: object
                    required: ['firstName', 'lastName', 'email']
                    properties:
                        firstName: { type: string, example: 'Sonia' }
                        lastName: { type: string, example: 'Wagner' }
                        email: { type: string, format: email, example: 'sonia@acme.com' }
                billingAddress:
                    type: object
                    required: ['iso2Code']
                    properties:
                        iso2Code: { type: string, example: 'DE' }
                currency:
                    type: object
                    required: ['code']
                    properties:
                        code: { type: string, example: 'EUR' }
            example:
                customer:
                    firstName: 'Sonia'
                    lastName: 'Wagner'
                    email: 'sonia@acme.com'
                billingAddress:
                    iso2Code: 'DE'
                currency:
                    code: 'EUR'

    preOrderPaymentData:
        type: map
        writable: false
        readable: true
        required: false
        description: 'PSP-specific response payload returned by the payment provider'
        openapiContext:
            example:
                transactionId: 'tx_abc123'
                redirectUrl: 'https://psp.example.com/pay/tx_abc123'
```

### Read-only versus write-only payloads

- **Write-only request payloads** (`writable: true`, `readable: false`) should declare
  `properties`, `required`, and `example`. The first two drive request validation and the
  generated OpenAPI schema; `example` makes the Swagger UI "Try Out" body usable without
  edits.
- **Read-only response payloads** (`writable: false`, `readable: true`) only need
  `openapiContext.example` when the response shape is dynamic. If the response shape is fixed,
  prefer declaring `properties` (and optionally `required`) so consumers see the full schema.

### Validation note

`openapiContext.required` controls only the OpenAPI documentation. If a request field must be
enforced at runtime, add the matching constraint to the resource's validation schema — see
[Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html).

## Automatic JSON:API request body examples

For JSON:API endpoints (`application/vnd.api+json`), the generator automatically wraps property-level examples in the JSON:API envelope (`data.type` + `data.attributes`) when it builds the OpenAPI request body. You define examples once per property; the generator assembles the envelope for every write operation.

Given:

```yaml
resource:
  name: Customers
  shortName: customers   # becomes the JSON:API "type" field

  properties:
    email:
      type: string
      writable: true
      openapiContext:
        example: "john@example.com"
    firstName:
      type: string
      writable: true
      openapiContext:
        example: "John"
    idCustomer:
      type: integer
      writable: false      # excluded from request body example
      openapiContext:
        example: 42
```

…the generated OpenAPI request body for `POST`, `PATCH`, and `PUT` operations is:

```json
{
  "data": {
    "type": "customers",
    "attributes": {
      "email": "john@example.com",
      "firstName": "John"
    }
  }
}
```

Rules the generator applies:

- The `shortName` value becomes the `type` field.
- Only **writable** properties are included — anything marked `writable: false` is filtered out (so identifiers and timestamps do not appear in the request example).
- Properties without an `openapiContext.example` are omitted from the example body.
- If no writable property has an example, no `requestBody` example is emitted at all — the operation appears without a prefilled "Try Out" body.

If you need a custom request body example that does not match this shape, override it at the operation level — see [Operations](#operations).

## Operations

Define which HTTP operations are available for the resource:

```yaml
operations:
  - type: Get                      # GET /customers/{id}
  - type: GetCollection            # GET /customers
  - type: Post                     # POST /customers
  - type: Put                      # PUT /customers/{id}
  - type: Patch                    # PATCH /customers/{id}
  - type: Delete                   # DELETE /customers/{id}
```

The operation names map to HTTP methods:
- `post` → POST (create)
- `get` → GET (single resource)
- `getCollection` → GET (collection)
- `put` → PUT (replace)
- `patch` → PATCH (update)
- `delete` → DELETE (remove)

## Pagination

API Platform provides built-in pagination for collection endpoints (`GetCollection`). You can configure pagination behavior per resource using YAML schema options.

### Pagination options

| Option | Type | Description |
|--------|------|-------------|
| `paginationEnabled` | `boolean` | Enables or disables pagination for this resource. When `false`, `GetCollection` returns all results without pagination. Default: inherits from global configuration. |
| `paginationItemsPerPage` | `integer` | Number of items returned per page. Overrides the global default. |
| `paginationMaximumItemsPerPage` | `integer` | Maximum number of items a client can request per page via `itemsPerPage` query parameter. Prevents clients from requesting excessively large pages. |
| `paginationClientEnabled` | `boolean` | Allows clients to enable or disable pagination via the `pagination` query parameter (for example, `?pagination=false`). |
| `paginationClientItemsPerPage` | `boolean` | Allows clients to set the number of items per page via the `itemsPerPage` query parameter (for example, `?itemsPerPage=50`). |

The global default for `paginationItemsPerPage` is defined in the project's `api_platform.php` configuration file. To override it for a specific resource, set `paginationItemsPerPage` in the resource schema.

### Minimal pagination example

```yaml
resource:
  name: Products
  shortName: products

  paginationEnabled: true
  paginationItemsPerPage: 10

  operations:
    - type: GetCollection
```

### Full pagination example

```yaml
resource:
  name: Products
  shortName: products

  paginationEnabled: true
  paginationItemsPerPage: 20
  paginationMaximumItemsPerPage: 100
  paginationClientEnabled: true
  paginationClientItemsPerPage: true

  operations:
    - type: GetCollection
    - type: Get
```

With this configuration, clients can use the following query parameters:

```bash
# Default pagination (20 items per page)
GET /products

# Navigate to page 3
GET /products?page=3

# Request 50 items per page (up to maximum of 100)
GET /products?itemsPerPage=50

# Disable pagination to get all results
GET /products?pagination=false
```

### Generated output

The pagination options are rendered as named parameters in the `#[ApiResource]` attribute:

```php
#[ApiResource(
    operations: [new GetCollection(), new Get()],
    shortName: 'products',
    provider: ProductsBackendProvider::class,
    paginationItemsPerPage: 20,
    paginationEnabled: true,
    paginationMaximumItemsPerPage: 100,
    paginationClientEnabled: true,
    paginationClientItemsPerPage: true
)]
```

### Provider requirements

For pagination to work, your Provider must return a `TraversablePaginator` instance for collection operations:

```php
use ApiPlatform\State\Pagination\TraversablePaginator;

return new TraversablePaginator(
    new \ArrayObject($resources),
    $currentPage,
    $itemsPerPage,
    $totalItems
);
```

If `paginationEnabled` is `true` but the Provider returns a plain array, API Platform wraps the result in a `PartialPaginatorInterface`, which may not include total count or page metadata.

### Global pagination defaults

Global pagination defaults can be configured in the application configuration file. Per-resource settings override the global defaults. See [API Platform Configuration](/docs/dg/dev/architecture/api-platform/configuration.html) for details.

## Relationships

Define relationships between resources to enable including related resources via the `?include=` query parameter.

### includes section

Declares what relationships this resource can include. `includes` is declared once on the parent resource — the child resource does not need a reverse declaration.

```yaml
includes:
  - relationshipName: addresses
    targetResource: CustomersAddresses
    uriVariableMappings:
      customerReference: customerReference
```

**Entry fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `relationshipName` | Yes | Name used in the `?include=` parameter and as the JSON:API relationship key. |
| `targetResource` | Yes | The `name` of the included resource as declared in its `resource.yml` (for example, `CustomersAddresses`). Also determines the JSON:API `type` field of the related resources. |
| `uriVariableMappings` | Conditional | Maps properties from the parent resource to the URI variables of the included resource. Required when the included resource is routed by URI variables. Format: `parentProperty: childUriVariable`. Ignored when `resolverClass` is set. |
| `uriTemplate` | Optional | Explicit URI template for the included resource when it has multiple operations and the relationship must target a specific path (for example, `/abstract-products/{abstractProductSku}/abstract-product-prices`). |
| `resolverClass` | Optional | Fully qualified class name of a relationship resolver. Use when the relationship cannot be expressed via URI variables — the resolver receives the parent resources and the request context, and returns the related resources directly. When `resolverClass` is set, `uriVariableMappings` and `uriTemplate` are not used for routing. See [Custom relationship resolvers](/docs/dg/dev/architecture/api-platform/relationships.html#custom-relationship-resolvers). |
| `autoInclude` | Optional | Resolve this relationship for every response of the parent type, even when the client did not request it via `?include=`. Use `autoIncludeMaxDepth` and `autoIncludeMinDepth` to bound where in the response graph the auto-include applies. |

#### URI-variable mapping example

For relationships routed by sub-resource URLs, map parent properties to child URI variables:

```yaml
includes:
  - relationshipName: abstract-product-prices
    targetResource: AbstractProductPrices
    uriTemplate: /abstract-products/{abstractProductSku}/abstract-product-prices
    uriVariableMappings:
      sku: abstractProductSku
```

#### Resolver-based example

For relationships whose targets cannot be derived from URI variables (for example, derived from order state or aggregated across multiple sources), reference a resolver class:

```yaml
includes:
  - relationshipName: order-shipments
    targetResource: OrderShipments
    resolverClass: Spryker\Glue\ShipmentsRestApi\Api\Storefront\Relationship\OrderShipmentsRelationshipResolver
```

**Further reading:** [Relationships](/docs/dg/dev/architecture/api-platform/relationships.html) — full reference for declaring, resolving, and troubleshooting relationships between API Platform resources, including provider-based and resolver-based dispatch, response shape, validation, and worked examples.

## Sort priority for included resources

The JSON:API response wraps related resources in an `included` array. By default, API Platform sorts that array alphabetically by resource `type`. Use `includedSortPriority` on a resource to override where its entries appear relative to other types.

### How it works

| Rule | Behavior |
|------|----------|
| Default | Every resource has an implicit priority of `0`. |
| Higher priority | Entries appear **later** in the `included` array. |
| Equal priority | Entries are sorted alphabetically by `type`. |

The priority is read from the resource's own `.resource.yml` and applied globally to every response that surfaces that type in `included`.

### Syntax

```yaml
resource:
  name: CartItems
  shortName: items

  includedSortPriority: 100
```

The generator passes the value through to the generated `#[ApiResource]` attribute via `extraProperties`:

```php
#[ApiResource(
    shortName: 'items',
    extraProperties: ['includedSortPriority' => 100],
    // ...
)]
```

### When to set a custom priority

Set `includedSortPriority` higher than `0` when a resource must appear after its nested children in the `included` array. The typical case is cart-item-like resources whose `?include=` chain resolves to abstract or concrete products: keeping the parent items last preserves the ordering of the legacy REST API and matches the order most clients expect when iterating the `included` array.

The following resources ship with `includedSortPriority: 100`:

- `items`
- `guest-cart-items`
- `bundle-items`
- `configurable-bundle-template-image-sets`

All other shipped resources rely on the default of `0`. Override the priority on project-level resources only when you need to enforce a specific ordering in `included`.

{% info_block infoBox "Sort priority is not a guarantee of stable ordering across versions" %}

`includedSortPriority` is a hint for the sort algorithm, not a JSON:API contract. Clients should still address resources by `type` and `id` rather than by index in the `included` array.

{% endinfo_block %}

## Resource generation process

### Generation workflow

The resource generation process is organized into distinct phases, each producing result objects for comprehensive error tracking and reporting:

```MARKDOWN
1. Preparation Phase
   ↓
2. Schema Parsing Phase → ParseResult
   - Load validation schemas
   - Parse validation rules
   - Load resource schemas
   - Parse resource definitions
   ↓
3. Schema Merging Phase → MergeResult
   - Merge schemas (Core → Feature → Project)
   - Track contributing source files
   ↓
4. Validation Phase → ValidationResult
   - Validate merged schemas
   - Apply validation rules
   ↓
5. Code Generation Phase
   - Generate PHP resource classes
   - Write files to output directory
   ↓
6. Cache Update
```

### Result objects

Each phase produces result objects that encapsulate both successful outcomes and failures:

- **ParseResult**: Contains grouped schemas and tracks failed validation files and schema files that could not be parsed
- **MergeResult**: Contains successfully merged schemas and tracks resources that failed to merge
- **ValidationResult**: Contains validated schemas and tracks resources that failed validation with detailed error messages

This structured approach ensures that errors in one resource do not block the generation of other valid resources, and provides clear feedback about what succeeded and what failed.

### Multi-layer schema merging

Spryker automatically merges schemas from multiple layers:

**Core layer** (lowest priority):

**vendor/spryker/customer/resources/api/backend/customer.resource.yml**

```yaml
resource:
  name: Customers
  properties:
    email:
      type: string
    firstName:
      type: string
```

**Feature layer** (medium priority):

**src/SprykerFeature/CRM/resources/api/backend/customer.resource.yml**

```yaml
resource:
  name: Customers
  properties:
    phone:
      type: string      # Added property
```

**Project layer** (highest priority):

**src/Pyz/Glue/Customer/resources/api/backend/customer.resource.yml**

```yaml
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
    shortName: 'customers',
    provider: CustomerBackendProvider::class,
    processor: CustomerBackendProcessor::class,
    paginationItemsPerPage: 10,
    paginationEnabled: true,
    paginationMaximumItemsPerPage: 100,
    paginationClientEnabled: true,
    paginationClientItemsPerPage: true
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

    public ?bool $isActive = true;

    // Getters, setters, toArray(), fromArray() methods...
}
```

## Debugging schemas

### Debug commands

```bash
# List all resources
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug --list

# Show specific resource
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug customers --api-type=backend

# Show merged schema
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug customers --api-type=backend --show-merged

# Show contributing source files
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug customers --api-type=backend --show-sources

# Validate schemas without generating
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --validate-only
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

### Custom URL paths

Operations support `uriTemplate` and `uriVariables` to define custom URL paths, including sub-resource URLs like `/customers/{customerReference}/addresses`.

#### Sub-resource with full CRUD

Define a child resource with nested URLs by adding `uriTemplate` and `uriVariables` to each operation:

**customers-addresses.resource.yml**

```yaml
resource:
  name: CustomersAddresses
  shortName: customers-addresses

  operations:
    - type: GetCollection
      uriTemplate: '/customers/{customerReference}/addresses'
      uriVariables:
        customerReference:
          toProperty: 'customer'
          fromClass: CustomersStorefrontResource

    - type: Get
      uriTemplate: '/customers/{customerReference}/addresses/{uuid}'
      uriVariables:
        customerReference:
          toProperty: 'customer'
          fromClass: CustomersStorefrontResource
        uuid:
          fromClass: CustomersAddressesStorefrontResource

    - type: Post
      uriTemplate: '/customers/{customerReference}/addresses'
      uriVariables:
        customerReference:
          toProperty: 'customer'
          fromClass: CustomersStorefrontResource
```

**`uriVariables` properties:**
- `fromClass`: The generated resource class the variable originates from
- `toProperty`: The property on the current resource that links to the parent resource

#### Action-style sub-resource

For single-action endpoints nested under a parent resource:

**customers-confirm-registration.resource.yml**

```yaml
resource:
  name: CustomersConfirmRegistration
  shortName: customers-confirm-registration

  operations:
    - type: Post
      uriTemplate: /customers/{customerReference}/confirm-registration
```

For more details on `uriTemplate`, `uriVariables`, and sub-resource patterns, see the [API Platform sub-resources documentation](https://api-platform.com/docs/core/subresources/).

### Security expressions

Security expressions protect resources and operations using [Symfony's ExpressionLanguage](https://symfony.com/doc/current/security/expressions.html). They require the SecurityBundle to be configured. See [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html) for setup instructions.

{% info_block infoBox "Where roles come from" %}

Roles like `ROLE_CUSTOMER` in security expressions come from OAuth scopes that are automatically mapped to Symfony roles. The mapping convention is as follows: a scope name is uppercased and prefixed with `ROLE_`. For example, the `customer` scope becomes `ROLE_CUSTOMER`.

Scopes are provided by scope provider plugins registered in `OauthDependencyProvider::getScopeProviderPlugins()`. The following table lists the out-of-the-box scope provider plugins and the scopes they provide:

| Plugin | Scopes |
|--------|--------|
| `CustomerOauthScopeProviderPlugin` | `customer` |
| `CompanyUserOauthScopeProviderPlugin` | `company_user` |
| `AgentOauthScopeProviderPlugin` | `agent` |
| `CustomerImpersonationOauthScopeProviderPlugin` | `customer_impersonation`, `customer` |
| `UserOauthScopeProviderPlugin` | `user`, plus UserType sub-plugins |
| `WarehouseOauthScopeProviderPlugin` | `warehouse` |

For details on how the mapping works, see [Security — Roles and OAuth scope mapping](/docs/dg/dev/architecture/api-platform/security.html). For instructions on setting up scopes, see [Integrate the authorization scopes](/docs/integrations/spryker-glue-api/backend-api/integrate-backend-api/integrate-the-authorization-scopes.html).

{% endinfo_block %}

Three types of security expressions are supported:

| Expression | Evaluated | Use case | When to use |
|-----------|-----------|----------|-------------|
| `security` | Before the request is processed | Check user roles or authentication status | For role or authentication checks that do not depend on the request body. |
| `securityPostDenormalize` | After the request body is deserialized | Check authorization based on submitted data | When authorization depends on the deserialized resource `object`, for example, to verify the user owns the resource being modified. |
| `securityPostValidation` | After validation passes | Check authorization based on validated data | When authorization depends on validated data, for example, to verify a value is within the user's authorized limit after validation confirms the data is structurally correct. |

#### Resource-level security

Applies to all operations on the resource:

```yaml
resource:
  name: Customers
  shortName: customers
  security: "is_granted('ROLE_USER')"
```

#### Operation-level security

Applies to a specific operation, overriding resource-level security:

```yaml
resource:
  name: Customers
  shortName: customers

  operations:
    - type: Post
      # No security — public registration

    - type: Get
      security: "is_granted('ROLE_USER')"

    - type: Patch
      security: "is_granted('ROLE_USER')"
```

#### Post-denormalize security

Evaluated after the request body has been deserialized. The `object` variable contains the resource instance:

```yaml
resource:
  name: Orders
  shortName: orders
  security: "is_granted('ROLE_USER')"
  securityPostDenormalize: "is_granted('EDIT', object)"
```

{% info_block infoBox "Custom voter attributes" %}

`EDIT` in the example is a **custom voter attribute** — it is an application-defined string, not a built-in Symfony or Spryker constant. For `is_granted('EDIT', object)` to work, you must register a custom Symfony [Voter](https://symfony.com/doc/current/security/voters.html) that supports the `EDIT` attribute and implements the authorization logic, for example, checking that the authenticated user owns the resource.

Use `securityPostDenormalize` when the authorization decision depends on the **submitted request data** (the deserialized `object`), such as verifying resource ownership.

{% endinfo_block %}

#### Post-validation security

Evaluated after validation has passed:

```yaml
resource:
  name: Payments
  shortName: payments
  securityPostValidation: "is_granted('PROCESS', object)"
```

{% info_block infoBox "Custom voter attributes" %}

`PROCESS` in the example is a **custom voter attribute** — it is an application-defined string, not a built-in Symfony or Spryker constant. For `is_granted('PROCESS', object)` to work, you must register a custom Symfony [Voter](https://symfony.com/doc/current/security/voters.html) that supports the `PROCESS` attribute.

Use `securityPostValidation` when the authorization decision depends on **validated data**, for example, to verify a payment amount is within the user's authorized limit after validation confirms the data is structurally correct.

{% endinfo_block %}

For detailed information about the authentication flow, role mapping, and accessing the authenticated user in providers, see [Security](/docs/dg/dev/architecture/api-platform/security.html).

## Generation commands

### Basic generation

```bash
# Generate all configured API types
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate

# Generate specific API type
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate backend
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue api:generate storefront

# Generate with options
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --dry-run           # Preview without writing
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --validate-only     # Only validate schemas
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate --resource=customers  # Generate single resource
```

### Output

```bash
Generating API resources for ApiType: backend

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
- `map`
- `mixed`

### Provider/Processor validation

- Provider/Processor classes must exist
- Classes must implement correct interfaces
- Namespaces must be valid PHP namespaces

## Best practices

### 1. Use semantic naming

```yaml
# ✅ Good
resource:
  name: Customers              # PascalCase plural — used for schema merging
  shortName: customers         # lowercase kebab-case plural — JSON:API type + URL segment

# ✅ Good — multi-word
resource:
  name: AbstractProductPrices
  shortName: abstract-product-prices

# ❌ Bad — wrong shortName casing/form
resource:
  name: Customers
  shortName: Customer          # Should be lowercase plural

# ❌ Bad — abbreviated, unclear
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

### 3. Leverage schema merging

Core — define base properties:

**src/Spryker/Customer/resources/api/backend/customer.resource.yml**

```yaml
resource:
  name: Customers
  properties:
    email:
      type: string
```

Project — only override what is needed:

**src/Pyz/Glue/Customer/resources/api/backend/customer.resource.yml**

```yaml
resource:
  name: Customers
  properties:
    email:
      required: true  # ← Only the difference
```

### 4. Use readable/writable correctly

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
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) - Define validation rules
- [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html) - Code Bucket-specific resources
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html) - Writing and running tests
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues
- [API Platform Documentation](https://api-platform.com/docs/) - Official API Platform docs
