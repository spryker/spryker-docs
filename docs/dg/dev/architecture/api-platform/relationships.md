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
- `uriVariableMappings`: Maps properties from parent to child provider URI variables.
- `resolverClass`: Fully qualified class name of a custom relationship resolver — see [Custom relationship resolvers](#custom-relationship-resolvers). When set, `uriVariableMappings` is ignored.
- `autoInclude`: Resolve this relationship automatically for every response of the parent type, even when the client did not request it. `autoIncludeMaxDepth` and `autoIncludeMinDepth` bound where in the response graph the auto-include applies.
- `uriTemplate`: Explicit URI template for the relationship link in the JSON:API response. Auto-generated from `targetResource` if not set.

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

## Custom relationship resolvers

Use a custom resolver when the related resource lives on a transfer property of the parent (so no extra provider call is needed), when each parent has its own distinct related resources, or when you need DI access to clients or plugins that the provider path cannot offer. For straightforward foreign-key style relationships, prefer `uriVariableMappings` plus the child provider — it is simpler and benefits from request-scoped caching automatically.

### YAML configuration

Reference the resolver class on the parent's `includes` entry:

```yaml
includes:
  - relationshipName: vouchers
    targetResource: Vouchers
    resolverClass: Spryker\Glue\CartCodesRestApi\Api\Storefront\Relationship\CartsVouchersRelationshipResolver
```

`targetResource` is still required — it determines the JSON:API `type` field of the related resources. `uriVariableMappings` is ignored when `resolverClass` is set; the resolver is fully responsible for producing the related resources.

### Interfaces

Resolvers implement one of two interfaces from `Spryker\ApiPlatform\Relationship`:

| Interface | Method | Returns | Use when |
|-----------|--------|---------|----------|
| `RelationshipResolverInterface` | `resolve(array $parentResources, array $context): array<object>` | A flat list of related resources, attached to all parents in the response. | The set of related resources is the same for every parent, or there is only one parent. |
| `PerItemRelationshipResolverInterface` (extends the above) | `resolvePerItem(array $parentResources, array $context): array<string, array<object>>` | A map of `parentIdentifier => relatedResources`. The framework deduplicates by IRI before attaching, so a resource referenced from multiple parents appears once in `included`. | Each parent has its own distinct related resources, for example each `company-user` row has a different `customer`, `company`, and `business-unit`. |

### Base class

`Spryker\ApiPlatform\Relationship\AbstractRelationshipResolver` provides a starting point with request-scoped helpers — use it when implementing `RelationshipResolverInterface`:

| Helper | Returns |
|--------|---------|
| `getParentResources()` | The parent resources passed to `resolve()`. |
| `getRequest()` / `hasRequest()` | The current Symfony `Request`. |
| `getLocale()` / `hasLocale()` | `LocaleTransfer` from request attributes. |
| `getStore()` / `hasStore()` | `StoreTransfer` from request attributes. |
| `getCustomer()` / `hasCustomer()` | `CustomerTransfer` from request attributes. |
| `getCustomerReference()` | Shortcut for `getCustomer()->getCustomerReferenceOrFail()`. |

Subclasses implement `resolveRelationship(): array<object>`.

### Worked example: basic resolver

This resolver expands a transfer property (`voucherDiscounts`) on a parent `Carts` resource into a list of `Vouchers` storefront resources. The parent already carries the data, so no extra provider call is needed.

```php
<?php

namespace Spryker\Glue\CartCodesRestApi\Api\Storefront\Relationship;

use Generated\Api\Storefront\VouchersStorefrontResource;
use Generated\Shared\Transfer\DiscountTransfer;
use Spryker\ApiPlatform\Relationship\AbstractRelationshipResolver;
use Spryker\Service\Serializer\SerializerServiceInterface;

class CartsVouchersRelationshipResolver extends AbstractRelationshipResolver
{
    public function __construct(protected SerializerServiceInterface $serializer)
    {
    }

    /**
     * @return array<VouchersStorefrontResource>
     */
    protected function resolveRelationship(): array
    {
        $resources = [];

        foreach ($this->getParentResources() as $parent) {
            foreach ($parent->voucherDiscounts ?? [] as $discountTransfer) {
                if (!$discountTransfer instanceof DiscountTransfer) {
                    continue;
                }

                $resources[] = $this->serializer->denormalize(
                    $discountTransfer->toArray(),
                    VouchersStorefrontResource::class,
                );
            }
        }

        return $resources;
    }
}
```

### Worked example: per-item resolver

This resolver fetches a different `CompanyUsers` resource per parent. The framework attaches each parent's record only to that parent and deduplicates the `included` block by IRI.

```php
<?php

namespace Spryker\Glue\CompanyUsersRestApi\Api\Storefront\Relationship;

use Generated\Api\Storefront\CompanyUsersStorefrontResource;
use Generated\Shared\Transfer\CompanyUserTransfer;
use Spryker\ApiPlatform\Relationship\PerItemRelationshipResolverInterface;
use Spryker\Client\CompanyUser\CompanyUserClientInterface;
use Spryker\Service\Serializer\SerializerServiceInterface;

class CompanyUsersRelationshipResolver implements PerItemRelationshipResolverInterface
{
    public function __construct(
        protected CompanyUserClientInterface $companyUserClient,
        protected SerializerServiceInterface $serializer,
    ) {
    }

    /**
     * @return array<CompanyUsersStorefrontResource>
     */
    public function resolve(array $parentResources, array $context): array
    {
        $all = [];

        foreach ($this->resolvePerItem($parentResources, $context) as $resources) {
            $all = array_merge($all, $resources);
        }

        return $all;
    }

    /**
     * @return array<string, array<CompanyUsersStorefrontResource>>
     */
    public function resolvePerItem(array $parentResources, array $context): array
    {
        $result = [];

        foreach ($parentResources as $parent) {
            $uuid = $parent->companyUserUuid ?? null;

            if ($uuid === null) {
                continue;
            }

            $transfer = $this->companyUserClient->findCompanyUserByUuid($uuid);

            $result[$uuid] = $transfer instanceof CompanyUserTransfer
                ? [$this->serializer->denormalize($transfer->toArray(), CompanyUsersStorefrontResource::class)]
                : [];
        }

        return $result;
    }
}
```

### Dependency injection

The compiler pass registers each `resolverClass` automatically as a public, autowired, autoconfigured service. You do not need to declare the resolver in `services.yaml`.

- Typed constructor parameters are autowired — for example, `SerializerServiceInterface` or any `*ClientInterface`.
- Inject plugin stacks from a DependencyProvider via the `#[Plugins]` attribute on a constructor parameter:

  ```php
  use Spryker\Service\Container\Attributes\Plugins;

  public function __construct(
      #[Plugins(dependencyProviderMethod: 'getDiscountMapperPlugins')]
      protected array $discountMapperPlugins = [],
  ) {
  }
  ```

{% info_block warningBox "Glue collaborators" %}

Glue resolvers may inject Client interfaces (`*ClientInterface`) only. They must not inject Zed facade interfaces (`*FacadeInterface`); cross the Glue/Zed boundary via a client.

{% endinfo_block %}

### Resolution semantics

- **Caching:** the framework calls the resolver once per unique parent-resource set per request. The cache key combines the resolver class with the parent object identity hashes.
- **Per-item deduplication:** `PerItemRelationshipResolverInterface` results are deduplicated by IRI before being attached, so a resource referenced from multiple parents appears once in `included`.
- **`?include=` flattening:** nested includes are auto-expanded. `?include=addresses.country` resolves both `addresses` and `addresses.country` without each having to be listed explicitly.
- **Auto-include:** add `autoInclude: true` on the parent's `includes` entry to resolve the relationship for every response of that parent type, even when the client did not request it. Use `autoIncludeMaxDepth` and `autoIncludeMinDepth` to scope where in the response graph the auto-include applies. This is the mechanism used to fold `concrete-products` automatically under `bundled-products`:

  ```yaml
  includes:
    - relationshipName: concrete-products
      targetResource: ConcreteProducts
      uriTemplate: /concrete-products/{sku}
      uriVariableMappings:
        sku: sku
      autoInclude: true
  ```

### Failure modes

- **Class is not autoloadable.** `RelationshipConfigurationPass` writes a container log warning and silently drops the relationship. Run `composer dump-autoload` and check that the PSR-4 namespace matches the file path.
- **Class does not implement the interface.** The dispatcher returns an empty list with no error. Confirm the class implements `RelationshipResolverInterface` (or `PerItemRelationshipResolverInterface`).
- **Resolver throws.** The exception is not caught by the dispatcher — wrap external calls inside the resolver and return `[]` on expected absence rather than letting the exception bubble through.

For tests, treat the resolver as a regular autowired service: unit-test by constructing it directly with stubs, or integration-test the full include path through Codeception API tests. See [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html).

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

Relationship configuration is checked in two places, with different behaviour.

**Structural validation (`RelationshipValidationRule`, during code generation).** Checks that each `includes` entry is an array, that `relationshipName` and `targetResource` are present and string-typed, and that `uriVariableMappings` (if set) is an array. Failures surface as warnings on the generator output.

```text
Warning: includes[0] is missing required field "targetResource" in src/Spryker/Customer/resources/api/storefront/customers.resource.yml
```

**Resource resolution (`RelationshipConfigurationPass`, during container compile).** Resolves each include to a target resource provider — or to a `resolverClass` when one is set. There is no resource-existence error here: an unknown `targetResource`, or a `resolverClass` that is not autoloadable, causes the relationship to be **silently dropped** from the registry. The resolver-class case writes a container log entry; the missing-target case does not.

If a relationship returns nothing at runtime and no warning was emitted by the generator, suspect a silent drop: confirm `targetResource` matches the target resource's `name` or `shortName`, and that the target's schema file lives in a scanned source directory.

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

1. **RelationshipProviderDecorator** wraps all providers automatically.
2. Parses `?include=` parameter from request.
3. **ApiPlatformRelationshipResolver** loads relationships via container configuration.
4. **Dispatch:** for relationships configured with `resolverClass`, the resolver is fetched from the container and `resolve()` (or `resolvePerItem()`) is called with the parent resources and request context. Otherwise URI variables are mapped from the parent and passed to the child provider.
5. **JsonApiRelationshipNormalizer** builds the JSON:API response with `relationships` and `included` sections.

Providers require no code changes — the system works automatically through decoration.

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

### Custom resolver is not invoked

The relationship is configured with `resolverClass` but the resolver does not run and no related resources appear.

1. **Confirm the class is autoloadable.** Run `composer dump-autoload` and verify the PSR-4 namespace matches the file path. When the class cannot be loaded, `RelationshipConfigurationPass` writes a container log warning and silently drops the relationship from the registry.
2. **Inspect the compiled relationship registry.** A resolver-backed relationship shows `resolver_class` in the merged configuration:

    ```bash
    docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue debug:container --parameter=api_platform.relationships
    ```

    If the entry is missing or has no `resolver_class`, the include was dropped during container compilation.
3. **Verify the interface is implemented.** The dispatcher calls `resolve()` only when the class implements `RelationshipResolverInterface` (or `PerItemRelationshipResolverInterface`). A class that does not implement either interface returns an empty list with no error.
4. **Check for exceptions inside the resolver.** Throws bubble out of the dispatcher — wrap external calls inside the resolver and return `[]` on expected absence rather than letting the exception propagate.
