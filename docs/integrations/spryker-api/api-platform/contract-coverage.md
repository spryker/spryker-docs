---
title: Prove API Platform contract coverage
description: Declare which API Platform operations, validation rules, and response attributes your tests cover, and let a CI gate fail the build on any gap.
last_updated: Sep 23, 2026
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

Contract coverage turns "the tests pass" into "every operation, validation rule, and required response attribute this resource declares has a test that asserts on it". You declare what a test covers with three attributes, and a CI gate diffs those declarations against the generated resource classes:

- `CoversApiOperation`: the operation the test asserts on.
- `CoversApiValidation`: the validation rule the test exercises.
- `CoversApiRequiredResponseAttributes`: marks the test that asserts every required attribute of the operation's success response.

All three live in the `Spryker\ApiPlatform\Contract\Attribute` namespace.

This gives you two things a green test run alone does not:

- A reviewer reading a test method sees the verb, the URL, the validation rule it exercises, and whether it round-trips the response body, without reading the body.
- The build fails when a resource gains an operation, a validation rule, or a required response attribute that no test covers.

## Annotate a test

Declare the one operation the test asserts on. Do not declare the requests the arrange step makes. Import the attributes and write them as short names:

```php
#[CoversApiOperation('POST', '/wishlists')]
#[CoversApiValidation('wishlists', 'name', 'NotBlank')]
public function testGivenABlankNameWhenPostWishlistThenItRespondsUnprocessableEntity(): void
```

`CoversApiOperation(verb, uriTemplate)` takes the OpenAPI `uriTemplate`, such as `/wishlists/{wishlistUuid}/wishlist-items`. Without a `status`, it covers the operation's success response. With one, it declares the error response the test asserts on:

```php
#[CoversApiOperation('GET', '/wishlists/{uuid}', status: Response::HTTP_NOT_FOUND)]
```

`CoversApiValidation(resource, attribute, rule)` takes the resource short name, the guarded attribute, and the rule identifier. Add it only to tests that assert a `4xx` validation outcome. The rule identifier is the Symfony constraint's own short name, such as `'NotBlank'`, `'Email'`, or `'Type'`, so a constraint nobody has annotated before needs no registration. The few constraints that do not follow that default are cases of the `Rule` enum, such as `Rule::LENGTH_MIN` and `Rule::LENGTH_MAX` for the two bounds of `Length`.

`CoversApiValidation` binds to the `CoversApiOperation` on the same method, which names the operation the rule was exercised against. A method that carries `CoversApiValidation` without a `CoversApiOperation` fails the coverage collection.

`CoversApiOperation` and `CoversApiValidation` are repeatable, but keep one asserted operation per test method.

## Cover the response attributes

Every readable property of a resource is part of its success response contract. So every success operation needs exactly one test that asserts each required response attribute against the fixture that test created. Mark that test with `CoversApiRequiredResponseAttributes` next to a success `CoversApiOperation`:

```php
#[CoversApiOperation('GET', '/agent-customer-search')]
#[CoversApiRequiredResponseAttributes]
public function testGivenACustomerWithAllDeclaredRequiredAttributesWhenTheCollectionIsRequestedByEmailThenAllRequiredResponseAttributesAreReturned(): void
```

The attribute takes no arguments on purpose. The set of required attributes is read from the generated `#[ApiResource]` class at runtime, so a list in the test could only drift from the schema. Without a success `CoversApiOperation` on the same method, the coverage collection fails.

Assert through the helpers of the base test case, which record what they asserted:

```php
$this->assertResponseAttributes($response, [
    'customers[0].firstName' => $customerTransfer->getFirstName(),
    'pagination.numFound' => static::SINGLE_MATCH_COUNT,
]);
```

Compare against the values of the fixture the test created, never against seed data. For a value the server mints, such as a UUID or a timestamp, use `assertResponseAttributesPresent()` instead. When the test ends, it fails if a required attribute was never asserted.

What counts as a required response attribute:

- Every `readable` property, including required `items` fields and one level of nested object properties. A deeper object counts as a presence path.
- Not the identifier: it is `data.id` and lives in the JSON:API envelope, outside the `attributes` object.
- Not relationship links.

A property the server cannot always populate opts out in its `.resource.yml` with `responseOptional: true`:

```yaml
updatedAt:
    readable: true
    responseOptional: true
    description: 'Set once the wishlist was changed after creation.'
```

Name the marked test with the fixed Then-clause `…ThenAllRequiredResponseAttributesAreReturned`, so the contract test of every operation can be found with one search. The gate keys on the attribute, not on the name, so renaming a test never drops its coverage.

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

An enforced operation that declares no responses at all is reported as a `SCHEMA DEFECT`, naming the `.resource.yml` to fix. So declaring your responses is the first step of adopting a resource, not an afterthought.

Validation coverage stays separate from this. A declared `422` demands one test for the status, and every constraint active on the operation additionally demands its own test.

### Do not declare a response the router cannot reach

A provider that answers `400` for a missing path segment is unreachable on a nested `uriTemplate`. The router never matches such a template with an empty segment, so a segment-less call falls through to the collection operation instead. Declaring that `400` creates a coverage item no test can ever satisfy.

Given a provider that guards against a missing `{attributeKey}`, the operation at `/product-management-attributes/{attributeKey}` must not declare `400`—a key-less call lands on `/product-management-attributes` instead. The same holds for every operation nested under a parent identifier, such as `{abstractProductSku}` or `{concreteProductSku}`.

Declare only the statuses a client can actually observe.

### Operations that cannot be asserted on

An item `GET` with no provider—neither on the operation nor on the resource—is classified as non-servable. With nothing to read, it only mints IRIs and answers `200 null`, so no integration test can assert on it. The gate reports these separately and does not count them as gaps.

An operation the resource schema marks with `internal: true` is unreachable on purpose. The gate reports it as internal and does not count it as a gap either.

## Guarantees

Declarations are verified, not claimed. The base test case records every operation a booted request actually matches, and fails the test when a declared operation was never dispatched. It also records every response attribute the assertion helpers read, and fails a `CoversApiRequiredResponseAttributes` test that left a required one unasserted. You cannot annotate an operation your test does not exercise, nor claim a response contract it does not assert.

Every response has a valid JSON:API envelope. The base test case checks every response a test produced for the `type` and the `self` link of each resource object, and for a non-empty `id` on each one whose resource declares an identifier. A resource that marks no property with `identifier: true`, such as an action endpoint or a singleton, may answer without an `id`.

Enforced resources have no gaps. The report diffs the generated `#[ApiResource]` classes against the collected annotations and fails the build on any uncovered operation, validation rule, or required response attribute, and on any stale claim that points at something the schema no longer defines.

## Run the report

```bash
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue api:contract:coverage
```

The command measures the API type of the application it runs in, so `GLUE_APPLICATION` selects the gate: `GLUE_STOREFRONT` checks the generated Storefront resources against the `StorefrontApi` suites, and `GLUE_BACKEND` checks the generated Backend resources against the `BackendApi` suites.

The command prints one counter line each for operations, validation rules, and response attributes, followed by the uncovered and stale entries, the non-servable and internal operations, and any schema defects. It exits non-zero when the gate fails. Add `-v` to list every covered entry.

Narrow it to what you are working on with `--module` or `-m`. Casing, separators, and a trailing plural are all ignored, so the module name and the resource short name both work:

```bash
vendor/bin/glue api:contract:coverage -m Wishlist                      # the wishlists resource
vendor/bin/glue api:contract:coverage -m WishlistItems                 # the wishlist-items resource
vendor/bin/glue api:contract:coverage -m wishlists -m wishlist-items   # both
```

Matching is exact once normalized, so `-m Wishlist` selects `wishlists` only and does not pull in `wishlist-items`. A filter naming no known resource fails the command and lists what is selectable, so a typo cannot quietly report on nothing.

Narrowing changes only what the run enforces. Stale claims are still measured against every generated resource.

### Prerequisites

The command is development-only, because it reads the coverage annotations off your test suites. Each application registers it in its `config/Glue*/packages/spryker_api_platform.php`, and only when development console commands are enabled:

```bash
DEVELOPMENT_CONSOLE_COMMANDS=1
```

It also needs the resources of the measured API type generated first:

```bash
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue api:generate
GLUE_APPLICATION=GLUE_BACKEND vendor/bin/glue api:generate
```

`api:generate` is a Glue console command, so use `vendor/bin/glue` and not `vendor/bin/console`.

The check itself is boot-free—it reflects generated classes and test attributes, and reads no database.

## In CI

The `API Platform Tests` job runs the gate once per API type, right after it generates the resources, and writes the gaps to the run summary, so a failure is readable without expanding the step:

```yaml
- name: Validate API Platform contract coverage (Storefront)
  env:
      GLUE_APPLICATION: GLUE_STOREFRONT
  run: vendor/bin/glue api:contract:coverage --summary-out "$GITHUB_STEP_SUMMARY"

- name: Validate API Platform contract coverage (Backend)
  env:
      GLUE_APPLICATION: GLUE_BACKEND
  run: vendor/bin/glue api:contract:coverage --summary-out "$GITHUB_STEP_SUMMARY"
```

For running the suites themselves, see [Test API Platform resources](/docs/integrations/spryker-api/api-platform/testing.html).

## Scope

Both resources and tests are discovered automatically, so adding a test never requires editing the tool. Coverage is enforced for every generated resource of the measured API type. A project takes a resource out of the gate by naming it in the application's own `config/Glue*/packages/spryker_api_platform.php`:

```php
$sprykerApiPlatform->contractCoverageExcludedResources(['some-resource']);
```

Each application compiles its own container, so the Storefront and Backend lists are independent. A short name both API types share, such as `customers`, can be enforced in one and excluded in the other. A name that matches no generated resource fails the gate, so an exclusion cannot outlive the resource it was written for.

The exclusion covers all three dimensions: excluding a resource drops its operations, validation rules, and response attributes from the gate together.

## Adopt a resource

Adopting an excluded resource means:

1. Declare the resource's real responses under `openapiContext.responses` in its `.resource.yml`.
2. Add the annotated tests that cover its servable operations, validation rules, and required response attributes.
3. Remove the resource from `contractCoverageExcludedResources()`.

Check the resource on its own while you work, then run the gate unfiltered to prove the adoption left nothing else uncovered:

```bash
vendor/bin/glue api:contract:coverage -m <resource>
vendor/bin/glue api:contract:coverage
```
