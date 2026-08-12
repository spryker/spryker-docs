---
title: Cypress boilerplate naming conventions
description: Learn the naming conventions used in the Cypress boilerplate project for files, folders, and code.
last_updated: Aug 6, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Cypress boilerplate project structure
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/project-structure.html
  - title: Test writing conventions
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/test-writing-conventions.html
---

Consistent naming conventions keep the Cypress boilerplate codebase clean and readable.

## General rules

- **Use descriptive and meaningful names**: names should be self-explanatory and describe the purpose or function of the variable, function, or file.
- **Use camelCase for variables and functions**: start with a lowercase letter and capitalize each subsequent word, for example, `myVariable` or `getUserName`.
- **Use PascalCase for classes, constructors, and types**: start with an uppercase letter and capitalize each subsequent word, for example, `UserService`, `OrderProcessor`, or `CustomerFixture`.
- **Use kebab-case for file and folder names**: use lowercase letters separated by hyphens, for example, `user-service.ts` or `order-processor.ts`.
- **Avoid abbreviations**: use full words to avoid confusion, for example, `authentication` instead of `auth`.

## File and folder naming

### Configuration files

Root configuration files include the following:

- `.envs/.env.ci`
- `.envs/.env.local`
- `.gitignore`
- `.prettierignore`
- `.prettierrc.json`
- `cypress.config.ts`
- `eslint.config.js`
- `package.json`
- `tsconfig.json`

Environment files are named `.envs/.env.[environment]` and are selected at runtime with `--env environment=[environment]`. The supported names are `ci`, `local`, `testing`, `staging`, and `production`. Create `.envs/.env.[environment]` files only for the environments you actually run against. If a name is not in that list, Cypress fails at startup with an explicit error.

You can also add an optional `.env` file in the project root for values that must not be committed. It is loaded before the `.envs/` file and takes precedence over it.

### Cypress tests

End-to-end tests are located in `cypress/e2e/[application]/[feature]/`, following the pattern `[application]-[test].cy.ts`, for example:

- `cypress/e2e/storefront/checkout/storefront-checkout.cy.ts`
- `cypress/e2e/backoffice/orders/backoffice-process-order.cy.ts`
- `cypress/e2e/merchant-portal/orders/merchant-portal-process-merchant-order.cy.ts`
- `cypress/e2e/glue/access-tokens/glue-access-token.cy.ts`

`[application]` is one of `storefront`, `backoffice`, `merchant-portal`, or `glue`.

### Fixture files

{% info_block warningBox "Fixture file names are derived, not configured" %}

A spec's fixture files are found by their path and name only—nothing is registered anywhere. If a name does not match exactly, the file is silently skipped: no error is raised at load time, but the spec fails later with `Cannot read properties of undefined`, which does not point at the real cause.

{% endinfo_block %}

Each spec can own a pair of fixture files. Their location and names are derived from the spec's own path:

| Part | Rule |
| --- | --- |
| Folder | The spec's path relative to `cypress/e2e/`, recreated under `cypress/fixtures/` |
| Dynamic fixture | `dynamic-[spec-name].json` |
| Static fixture | `static-[spec-name].json` |

`[spec-name]` is the spec's file name without the `.cy.ts` extension.

For `cypress/e2e/storefront/cart/storefront-cart-smoke.cy.ts`, the two files must be:

```text
cypress/fixtures/storefront/cart/dynamic-storefront-cart-smoke.json
cypress/fixtures/storefront/cart/static-storefront-cart-smoke.json
```

Both files are optional—a spec can have one, both, or neither. A dynamic fixture file is a DynamicFixtures API payload describing data that is created in the shop before the spec runs; its result lands in `Cypress.env('dynamicFixtures')`. A static fixture file holds values that come from project configuration rather than data created at runtime; its result lands in `Cypress.env('staticFixtures')`. Specs read both through `getFixtures()`.

When renaming a spec, rename its fixture files in the same commit. Moving a spec to another folder means moving its fixture files to the matching folder as well.

Fixture data shared by specs in different applications goes in `cypress/fixtures/shared/`, following the pattern `[data-type]-data.json`, for example, `checkout-data.json`. Use this only for data that several applications genuinely need; per-spec data belongs in the derived files above.

### Fixture types

Fixture types are located in `cypress/support/types/`. Each application has its own subfolder with interfaces of its own—what its fixture files produce is typed here:

| Path | Contents |
| --- | --- |
| `types/[application]/[feature].ts` | `[Feature]DynamicFixtures` and `[Feature]StaticFixtures` interfaces |
| `types/[application]/index.ts` | Barrel file that specs import the application's fixture types from |
| `types/shared/[entity].ts` | Entity types used by more than one application |

Entity type files are named after the entity in kebab-case, for example, `customer.ts` or `price-product.ts`, and export a PascalCase interface with the `Fixture` suffix, for example, `CustomerFixture` or `PriceProductFixture`.

An entity used by only one application is placed in that application's own `types/[application]/` folder instead of `types/shared/`, so everything in `types/shared/` is genuinely shared.

### Support files

Support files are located in `cypress/support/`, organized into subfolders by functionality: `api-helper`, `cy-commands`, `fixture-helper`, `glue-endpoints`, `page-objects`, `scenarios`, and `types`. Files follow the pattern `[feature]-[description].ts`, for example, `oms-transition-commands.ts`, `carts-commands.ts`, or `glue-carts-scenarios.ts`.

`cypress/support/e2e.ts` and `cypress/support/index.d.ts` are the only files at the root of `cypress/support/`.

### Page objects

Page object files are located in `cypress/support/page-objects/[application]/[section]/`, following the pattern `[application]-[section]-[page].ts`, for example, `storefront-cart-page.ts`, `backoffice-order-list-page.ts`, or `storefront-cart-flyout.ts`.

### Scenarios

Scenario files are located in `cypress/support/scenarios/[application]/`, following the pattern `[application]-[feature]-scenarios.ts`, for example, `glue-carts-scenarios.ts` or `storefront-cart-scenarios.ts`.

### Cypress commands

Cypress command files are located in `cypress/support/`, following the pattern `[feature]-commands.ts`, for example, `cart-commands.ts` or `utility-commands.ts`.

### Glue endpoints

- **Glue endpoint files**: located in `cypress/support/glue-endpoints/[resource]/`, following the pattern `[endpoint-name].ts`, for example, `access-tokens.ts`, `carts-items.ts`.
- **Glue endpoint response schemas**: located next to the endpoint they describe, following the pattern `[endpoint-name]-response.ts`, for example, `access-tokens-response.ts`.

### Helper files

Helper files are located in a subfolder named after the helper, following the pattern `[name]/[name].ts`, for example, `api-helper/api-helper.ts` or `fixture-helper/fixture-helper.ts`.

## Code naming

- **Variables**: use camelCase, for example, `userName` or `orderId`.
- **Functions**: use camelCase, for example, `getUserName` or `processOrder`.
- **Classes**: use PascalCase, for example, `UserService` or `OrderProcessor`.
- **Fixture interfaces**: use PascalCase with a `Fixture` suffix for entity fixtures, for example, `CustomerFixture`; and `[Feature]DynamicFixtures` / `[Feature]StaticFixtures` for per-spec fixture shapes, for example, `CheckoutDynamicFixtures`.
