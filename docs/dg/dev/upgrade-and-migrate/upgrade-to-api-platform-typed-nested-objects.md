---
title: Upgrade API Platform resources to typed nested objects
description: How to update your project to the typed nested object schema DSL, which modules must move together, and how to recognize a partial update.
last_updated: Jul 13, 2026
template: howto-guide-template
related:
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
---

This document describes how to upgrade a project to the typed nested objects update of the API Platform stack. The update changes how structured JSON objects inside API resources — cart and order `totals`, cart-item `calculations`, checkout `customer` and address objects, `pagination`, and similar — are declared, generated, validated, and serialized.

After the upgrade, a `type: object` property with nested `properties:` generates a dedicated PHP value-object class (for example, `Generated\Api\Storefront\Carts\CartsTotalsStorefrontObject`) instead of an untyped array, and the OpenAPI document publishes a full field-by-field schema for it. The JSON on the wire stays the same for read endpoints; several write endpoints gain stricter, more precise validation. For the concept documentation, see [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html).

{% info_block errorBox "Update all listed modules together" %}

The modules in this release reference each other's new behavior at runtime. To stop a project from updating only part of the set, `spryker/api-platform` and every consumer module now declare composer `conflict` constraints against the previous minors: composer refuses a partial update instead of installing a broken combination (see [Troubleshooting a partial update](#troubleshooting-a-partial-update) for what a bypassed conflict looks like). Update every listed module in one composer run.

{% endinfo_block %}

## Prerequisites

- API Platform is integrated as described in [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).
- Your project consumes one or more of the modules listed in the next section on their API Platform (schema-based) endpoints.

## 1. Update the modules — in one composer run

The two platform modules are hard prerequisites for every other module in the list:

| Module | Minimum version | Why it must move |
|---|---|---|
| `spryker/api-platform` | `1.23.0` | Parses the new YAML DSL (`type: object` + nested `properties`, `items`, `objectName`, `synthesizeMissingFieldsWhenEmpty`) and generates the companion value-object classes. Older versions silently strip the new keys and generate broken `?object` properties. |
| `spryker/serializer` | `1.1.0` | Hydrates nested typed objects on the response path (`ReflectionExtractor`-backed denormalization) and reduces `Decimal` value objects to scalars. Older versions throw on every response that carries a typed nested object. |

Consumer modules shipping the new schema DSL (update every one of these that your project has installed):

`spryker/agent-auth-rest-api`, `spryker/availability-notifications-rest-api`, `spryker/carts-rest-api`, `spryker/catalog-search-rest-api`, `spryker/checkout-rest-api`, `spryker/cms-pages-rest-api`, `spryker/configurable-bundle-carts-rest-api`, `spryker/discounts-rest-api`, `spryker/merchants-rest-api`, `spryker/orders-rest-api`, `spryker/payments-rest-api`, `spryker/product-availabilities-rest-api`, `spryker/product-bundle-carts-rest-api`, `spryker/product-configuration-shopping-lists-rest-api`, `spryker/product-configuration-wishlists-rest-api`, `spryker/product-measurement-units-rest-api`, `spryker/product-options-rest-api`, `spryker/product-reviews-rest-api`, `spryker/quote-request-agents-rest-api`, `spryker/quote-requests-rest-api`, `spryker/sales-returns-rest-api`, `spryker/shipments-rest-api`, `spryker/store-context`, `spryker/wishlists-rest-api`, `spryker-feature/self-service-portal`

Run the update as a single command so composer resolves the set together, for example:

```bash
composer update spryker/api-platform spryker/serializer \
  spryker/carts-rest-api spryker/checkout-rest-api spryker/orders-rest-api \
  spryker/discounts-rest-api spryker/product-options-rest-api \
  # ...every module from the list that is installed in your project
  --with-dependencies
```

If composer reports a conflict such as `spryker/carts-rest-api ... conflicts with spryker/api-platform <1.23.0`, you are trying to move a consumer module without moving `spryker/api-platform` (or `spryker/serializer`) to the new minor. Add the platform modules to the same `composer update` command rather than working around the constraint — a project that vendors or aliases past the conflict will hit the runtime symptoms in [Troubleshooting a partial update](#troubleshooting-a-partial-update).

{% info_block warningBox "The cart-items field set moves together" %}

This release moves cart-item field ownership between modules: `spryker/carts-rest-api` no longer declares the cross-domain fields (`salesUnit`, `productOptions`, `configuredBundle`, and others) and no longer passes `calculations` through as a free-shape map. The discount and product-option parts of `calculations` are now contributed by `spryker/discounts-rest-api` and `spryker/product-options-rest-api`.

If you update `spryker/carts-rest-api` without also updating `spryker/discounts-rest-api`, `spryker/product-options-rest-api`, `spryker/configurable-bundle-carts-rest-api`, and `spryker/product-measurement-units-rest-api`, the discount and product-option aggregation fields (`unitDiscountAmountAggregation`, `sumDiscountAmountAggregation`, `unitDiscountAmountFullAggregation`, `sumDiscountAmountFullAggregation`, `unitProductOptionPriceAggregation`, `sumProductOptionPriceAggregation`) disappear from `cart-items` and `guest-cart-items` responses **silently** — no error is raised.

{% endinfo_block %}

## 2. Regenerate API classes and warm the cache

```bash
vendor/bin/glue api:generate
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue cache:clear
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue cache:warmup
```

Repeat the cache commands with `GLUE_APPLICATION=GLUE_BACKEND` if you consume backend API resources (for example, the stores resource). In a Docker-based environment, restart the Glue containers afterwards so OPcache picks up the regenerated classes.

## 3. Adjust project-level schema contributions

If your project ships its own `*.resource.yml` fragments that add fields to any of the affected objects (for example, extra fields on cart `totals` or cart-item `calculations`), convert them to the typed form. The schema merger only deep-merges nested object fields when **both** contributors declare `type: object` with `properties:`. A project fragment that still declares the property as `type: map` or `type: array` now **fails generation with an error** that names the property and both source files, instead of silently replacing the core module's typed declaration.

Before (fails generation — do not keep this):

```yaml
calculations:
    type: map
```

After (merges your fields into the shared typed object):

```yaml
calculations:
    type: object
    properties:
        myProjectField:
            type: integer
            description: 'Project-specific aggregation.'
```

If you genuinely intend to re-shape a core property wholesale (for example, collapse a typed object back into a map), set `replace: true` on your overriding declaration to opt out of the guard.

## 4. Adjust project code that reads these properties as arrays

Resource properties migrated to typed objects are no longer arrays. Custom providers, processors, relationship resolvers, mappers, and tests that do array access on them must switch to the typed accessors:

```php
// Before
$grandTotal = $resource->totals['grandTotal'];

// After
$grandTotal = $resource->totals?->getGrandTotal();
// or, where an array is genuinely needed:
$totals = $resource->totals?->toArray();
```

The generated value objects also provide `fromArray()` for constructing them from transfer data.

## 5. Review custom validation for writable objects

Validation you authored as an `Assert\Collection` against a writable object property (for example, checkout `billingAddress` rules in a project `checkout-data.validation.yml`) keeps working: the generator automatically lifts the `Collection.fields` constraints onto the generated value-object class and replaces the property constraint with an `#[Assert\Valid]` cascade.

Note the `allowMissingFields: true` semantics on value objects: an absent field denormalizes to `null`, so lifted `NotBlank` constraints gain `allowNull: true` and `NotNull` constraints are dropped — absent passes, present-but-empty still fails. See [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) for details.

## 6. Regenerate API clients

The OpenAPI document now publishes named component schemas for the nested objects instead of opaque `object` types. If you generate typed API clients (frontend SDKs, contract tests) from the OpenAPI document, regenerate them after the upgrade.

## Behavioral changes to expect after a complete upgrade

These apply even when every module is updated correctly:

- **Empty required objects are rejected with per-field errors.** Submitting `{}` for a required object (for example, a checkout address) now returns a `422` listing each missing field, instead of the previous behavior.
- **Closed field sets on typed objects.** Objects migrated from `map`/`mixed` to `type: object` serialize only their declared fields. Undeclared keys that previously leaked through the free-shape passthrough no longer appear in responses. If your storefront relied on such a key, contribute it explicitly via a project schema fragment (step 3).
- **Pagination attributes are stripped of `null` noise.** Non-first collection items and single-item responses no longer carry a `pagination` attribute filled with `null` values.
- **Shipment address normalization.** Empty-string address fields in checkout-data shipments and order-shipments responses are now returned as `null`.

## Troubleshooting a partial update

Composer refuses a straightforward partial update, but a project that vendored, aliased, or otherwise bypassed the `conflict` constraints can still end up on a mismatched set. All of these ship a green `glue api:generate`; the failures appear only on live requests.

| Symptom | Cause | Fix |
|---|---|---|
| `500` on `GET /carts`, `/guest-carts`, `/customers-carts` with `Failed to denormalize attribute "totals" ... Expected argument of type "?object", "array" given` | A consumer module was updated but `spryker/api-platform` was not — the old generator typed the property as bare `?object` and dropped the nested schema | Update `spryker/api-platform` and `spryker/serializer`, regenerate, warm cache |
| `500` with `Error: Class "Generated\Api\Storefront\...\...StorefrontObject" not found` on collection endpoints (returns, orders, merchants, CMS pages, product reviews, search) | Same — the companion value-object classes are only emitted by the new generator | Same as above |
| `400`/`422` on `POST /checkout`, `/checkout-data`, `/payments` for every request carrying `customer`, `billingAddress`, `shippingAddress`, or `payment` | Same skew on the write path — the request is rejected during denormalization before your processor runs | Same as above |
| `500` with `Expected argument of type "Generated\Api\Storefront\...StorefrontObject or null", "array" given at property path "totals"` | `spryker/api-platform` is new but `spryker/serializer` is old — response hydration cannot recurse into typed nested objects | Update `spryker/serializer` |
| Discount / product-option aggregation fields missing from `cart-items.calculations` (no error) | `spryker/carts-rest-api` updated without `spryker/discounts-rest-api` / `spryker/product-options-rest-api` | Update the domain modules |
| Core fields missing from a typed object your project extends | A project `*.resource.yml` fragment still declares the property as `type: map`/`array` and replaces the typed core declaration | Convert the fragment to `type: object` with `properties:` (step 3) |
