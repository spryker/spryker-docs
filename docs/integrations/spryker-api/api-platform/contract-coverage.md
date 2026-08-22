---
title: Prove API Platform contract coverage
description: Declare which API Platform operations and validation rules your tests cover, and let a CI gate fail the build on any gap.
last_updated: Aug 17, 2026
template: howto-guide-template
related:
  - title: Test API Platform resources
    link: docs/integrations/spryker-api/api-platform/testing.html
  - title: Resource schemas
    link: docs/integrations/spryker-api/api-platform/resource-schemas.html
  - title: Validation schemas
    link: docs/integrations/spryker-api/api-platform/validation-schemas.html
  - title: API Platform
    link: docs/integrations/spryker-api/api-platform/api-platform.html
---

Contract coverage turns "the tests pass" into "every operation and validation rule this resource declares has a test that asserts on it". You declare what a test covers with two attributes, and a CI gate diffs those declarations against the generated resource classes.

This gives you two things a green test run alone does not:

- A reviewer reading a test method sees the verb, the URL, and the validation rule it exercises, without reading the body.
- The build fails when a resource gains an operation or a validation rule that no test covers.

## Annotate a test

Declare the one operation the test asserts on. Do not declare the requests the arrange step makes. Import the attributes and write them as short names:

```php
#[CoversApiOperation('POST', '/wishlists')]
#[CoversApiValidation('wishlists', 'name', Rule::NOT_BLANK)]
public function testGivenABlankNameWhenPostWishlistThenItRespondsUnprocessableEntity(): void
```

`CoversApiOperation(verb, uriTemplate)` takes the OpenAPI `uriTemplate`, such as `/wishlists/{wishlistUuid}/wishlist-items`. Without a `status`, it covers the operation's success response. With one, it declares the error response the test asserts on:

```php
#[CoversApiOperation('GET', '/wishlists/{uuid}', status: Response::HTTP_NOT_FOUND)]
```

`CoversApiValidation(resource, attribute, rule)` takes the resource short name, the guarded attribute, and a `Rule` identifier such as `Rule::NOT_BLANK` or `Rule::LENGTH_MAX`. It binds to the `CoversApiOperation` on the same method, which names the operation the rule was exercised against. Never put it on a method that has no `CoversApiOperation`.

Both attributes are repeatable, but keep one asserted operation per test method.

## Validation coverage is per operation

Whether a constraint fires depends on the operation's validation groups. The truth set holds one entry per rule per input operation—`POST`, `PUT`, `PATCH`—whose groups intersect the constraint's groups. Both default to `Default`, mirroring Symfony.

For example, a wishlist name's `NotBlank` carries both the create and the update group, so `POST /wishlists` and `PATCH /wishlists/{uuid}` each need their own annotated test. A wishlist item's `sku` `NotBlank` carries only the create group, so it needs a `POST` test and no `PATCH` test.

## Responses come from the resource schema

The gate never invents an error response. Every status a resource schema declares under `openapiContext.responses` becomes one coverage item that a test must claim:

```yaml
- type: GetCollection
  uriTemplate: /abstract-products/{abstractProductSku}/abstract-product-image-sets
  description: 'Retrieve image sets of an abstract product'
  openapiContext:
      responses:
          200:
              description: 'Image sets of the abstract product returned.'
          404:
              description: 'No abstract product exists for the given SKU.'
```

An enforced operation that declares no responses at all is reported as a schema defect, naming the `.resource.yml` to fix. So declaring your responses is the first step of adopting a resource, not an afterthought.

Validation coverage stays separate from this. A declared `422` demands one test for the status, and every constraint active on the operation additionally demands its own test.

### Do not declare a response the router cannot reach

A provider that answers `400` for a missing path segment is unreachable on a nested `uriTemplate`. The router never matches such a template with an empty segment, so a segment-less call falls through to the collection operation instead. Declaring that `400` creates a coverage item no test can ever satisfy.

Given a provider that guards against a missing `{attributeKey}`, the operation at `/product-management-attributes/{attributeKey}` must not declare `400`—a key-less call lands on `/product-management-attributes` instead. The same holds for every operation nested under a parent identifier, such as `{abstractProductSku}` or `{concreteProductSku}`.

Declare only the statuses a client can actually observe.

### Operations that cannot be asserted on

An item `GET` with no provider—neither on the operation nor on the resource—is classified as non-servable. With nothing to read, it only mints IRIs and answers `200 null`, so no integration test can assert on it. The gate reports these separately and does not count them as gaps.

## Two guarantees

Declarations are verified, not claimed. The base test case records every operation a booted request actually matches, and fails the test when a declared operation was never dispatched. You cannot annotate an operation your test does not exercise.

In-scope resources have no gaps. The report diffs the generated `#[ApiResource]` classes against the collected annotations and fails the build on any uncovered operation, any uncovered validation rule, and any stale claim that points at something the schema no longer defines.

## Run the report

```bash
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue api:contract:coverage
```

The command prints covered, uncovered, and stale entries for operations and validation rules, lists non-servable operations, and exits non-zero when the gate fails. Add `-v` to list every covered entry.

Narrow it to what you are working on with `--module` or `-m`. Casing, separators, and a trailing plural are all ignored, so the module name and the resource short name both work:

```bash
vendor/bin/glue api:contract:coverage -m Wishlist                      # the wishlists resource
vendor/bin/glue api:contract:coverage -m WishlistItems                 # the wishlist-items resource
vendor/bin/glue api:contract:coverage -m wishlists -m wishlist-items   # both
```

Matching is exact once normalized, so `-m Wishlist` selects `wishlists` only and does not pull in `wishlist-items`. A filter naming no known resource fails the command and lists what is selectable, so a typo cannot quietly report on nothing.

Narrowing changes only what the run enforces. Scope drift is a property of the whole repository and is always checked against the full list.

### Prerequisites

The command is development-only, because it reads the coverage annotations off your test suites. It is registered only when development console commands are enabled:

```bash
DEVELOPMENT_CONSOLE_COMMANDS=1
```

It also needs the resources generated first:

```bash
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue api:generate
```

`api:generate` is a Glue console command, so use `vendor/bin/glue` and not `vendor/bin/console`.

The check itself is boot-free—it reflects generated classes and test attributes, and reads no database.

## In CI

The `Standard Validation` job runs the gate and writes the gaps to the run summary, so a failure is readable without expanding the step:

```bash
vendor/bin/glue api:contract:coverage --summary-out "$GITHUB_STEP_SUMMARY"
```

The suites themselves run in a separate job. For that side, see [Test API Platform resources](/docs/integrations/spryker-api/api-platform/testing.html).

## Adopt a resource

Coverage is enforced for the resources the gate's scope names. Adopting one means:

1. Declare the resource's real responses under `openapiContext.responses` in its `.resource.yml`.
2. Add the annotated tests that cover its servable operations and validation rules.
3. Add the resource to the enforced scope.

A drift gate protects step 3. When an annotated test references a resource outside the enforced scope, the build fails with an unscoped-resource error, so you cannot annotate a resource's tests and forget to enforce it.

Both resources and tests are discovered automatically, so adding a test never requires editing the tool.
