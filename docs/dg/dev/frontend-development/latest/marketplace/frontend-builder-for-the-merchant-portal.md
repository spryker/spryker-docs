---
title: Frontend builder for the Merchant Portal
description: Learn about the Angular frontend builder that ships with the ZedUi module and builds the Merchant Portal assets for core and project modules.
keywords: ZedUi, zed-ui, frontend builder, Merchant Portal, Angular, webpack, jest, build, live reload
last_updated: Sep 7, 2026
template: howto-guide-template
related:
  - title: Building the Merchant Portal frontend
    link: docs/dg/dev/frontend-development/latest/marketplace/building-the-merchant-portal-frontend.html
  - title: Upgrade to the Merchant Portal frontend builder
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-the-merchant-portal-frontend-builder.html
  - title: Extending the Merchant Portal frontend
    link: docs/dg/dev/frontend-development/latest/marketplace/extending-the-merchant-portal-frontend.html
---

The Merchant Portal frontend builder compiles the Angular application of the Merchant Portal: the entry points of all Merchant Portal modules, their styles, assets, and tests.

Starting from `spryker/zed-ui` version 4.3.0, the builder ships inside the ZedUi module and lives in `vendor/spryker/zed-ui/src/Spryker/Zed/ZedUi/FrontendBuilder/`. Projects no longer carry a `frontend/merchant-portal/` directory. For the upgrade steps, see [Upgrade to the Merchant Portal frontend builder](/docs/dg/dev/upgrade-and-migrate/upgrade-to-the-merchant-portal-frontend-builder.html).

## The builder at a glance

|  | Project-owned tooling (legacy) | Builder in ZedUi |
| --- | --- | --- |
| Build tooling in your project | 11 files in `frontend/merchant-portal/`, migrated by hand | 0 files — ships and updates with the ZedUi module |
| npm dependencies of Merchant Portal modules | a `package.json` per module, kept in sync by hand | one dependency set, declared by ZedUi |
| `angular.json` and the TypeScript configurations | edited by hand on every core change | reconciled by `npm run mp:update:config`, your own values kept |
| Angular | 20 | 22 (20 still supported) |
| TypeScript | 5 | 6 |
| Seeing a change in the browser | rebuild + manual page reload | reloaded automatically in watch mode |
| Where lint and tests look | core and project alike | only what the repository owns — see [What lint and tests cover](#what-lint-and-tests-cover) |
| Builder language | TypeScript compiled by ts-node/webpack | TypeScript (`.mts`) executed by Node.js type stripping, 0 build steps |

## Requirements

- Node.js 24.15.0 or later. Angular 22 accepts `^22.22.3 || ^24.15.0 || >=26.0.0`, so Node.js 25 is *not* supported even though it satisfies `>=24.15.0`.
- npm 10 or later.
- `spryker/zed-ui` 4.3.0 or later.

## Commands

The project runs the builder through the npm workspace named `mp-zed-ui`, and its `mp:*` scripts delegate to it. For the setup and what it does, see [npm workspaces for the frontend builders](/docs/dg/dev/frontend-development/npm-workspaces-for-frontend-builders.html).

All commands are run from the project root:

| Command | What it does |
| --- | --- |
| `npm run mp:build` | Development build |
| `npm run mp:build:watch` | Development build in watch mode, with live reload |
| `npm run mp:build:production` | Production build |
| `npm run mp:test` | Jest test suite of the Merchant Portal modules |
| `npm run mp:lint` | ESLint over the Merchant Portal TypeScript and templates |
| `npm run mp:stylelint` | Stylelint over the Merchant Portal Less files |
| `npm run mp:update:config` | Reconciles `angular.json` and the TypeScript configurations; `postinstall` runs it for you |

`mp:stylelint` takes two options: `-f` fixes what is fixable, and `-p <path>` runs over a single file or glob, resolved from the project root:

```bash
npm run mp:stylelint -- -f
npm run mp:stylelint -- -p 'src/Pyz/Zed/FooGui/Presentation/Components/**/*.less'
```

The built assets are written to `public/MerchantPortal/assets/js`.

## Dependencies that come with the module

ZedUi declares the whole npm dependency set of the Merchant Portal, so neither the project nor its Merchant Portal modules declare any of it. `vendor/spryker/zed-ui/package.json` is the source of truth: what it lists in `dependencies` and `devDependencies` comes with the module, and what it lists in `peerDependencies` is what your project provides. In ZedUi 4.3.0, the peer dependencies are `@jest/globals`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `stylelint`, `ts-jest`, `typescript`, and `webpack`.

For the mechanics of that split, see [Where the npm dependencies come from](/docs/dg/dev/frontend-development/npm-workspaces-for-frontend-builders.html#where-the-npm-dependencies-come-from).

## Source layout detection

The builder resolves every path from the project root, which it finds by walking up from the working directory until it sees `package-lock.json`. It then detects the layout from a marker directory:

| Layout | Marker | Core modules | Project modules |
| --- | --- | --- | --- |
| Project | `vendor/spryker` | `vendor/spryker` | `src/Pyz/Zed` |
| Spryker monorepo | `src/Spryker` | `src/Spryker` | `src/Pyz/*/src/Pyz/Zed` |

Nothing has to be configured for this: the same commands work in both layouts, and the detected layout decides which modules are built, linted, and tested.

## What lint and tests cover

`mp:lint`, `mp:stylelint`, and `mp:test` report on the modules the running repository owns:

- In a project, the core modules arrive in `vendor/`. They are installed code, not the project's to report on, so only `src/Pyz` is covered.
- In the Spryker monorepo, the core modules are sources of the repository, so they are covered together with the project modules.

Project-level lint configuration is picked up from the project root when present: `eslint.config.mp.mjs` replaces the packaged ESLint configuration, and `.stylelintrc.mp.js` replaces the packaged Stylelint configuration. Without them, the configurations shipped in the module are used.

## Live reload

`npm run mp:build:watch` writes a build manifest next to the bundles and injects a small polling client, so an edited `.ts` or `.less` file reloads the open Back Office page. Production and plain development builds contain neither the client nor the manifest.

Twig templates are *not* watched: Zed caches them server-side, so a browser reload alone would not show the change.

## Module entry points and path aliases

Every Merchant Portal module has an `entry.ts` in `Presentation/Components/`, which the builder collects as a webpack entry, and an `mp.public-api.ts` in the module root, which is what other modules import. The builder generates a `@mp/<module>` path alias per module out of these, plus `@mp/polyfills` for the polyfills file — so a module imports its neighbours as `@mp/zed-ui` or `@mp/gui-table` rather than by path.

## Date adapter

`DefaultMerchantPortalConfigModule` registers the ng-zorro date adapter, which ng-zorro 22 no longer provides implicitly. A project that imports this module needs no date adapter provider of its own — if your `AppModule` still calls `provideNzDateFnsAdapter()` from an earlier version, remove it.

## Angular 20 projects

ZedUi accepts Angular and ng-zorro `>=20.3.0 <23.0.0`, so a project that has not moved to Angular 22 keeps working. The `@spryker/*` packages declare their ranges as `^old || ^new` for the same reason.

{% info_block warningBox "Pin the @spryker/* packages on Angular 20" %}

npm does not backtrack on peer conflicts — it selects the highest version satisfying a range and then fails if the peers do not line up — so an unpinned install on Angular 20 can resolve the new major and abort with `ERESOLVE`. Pin each `@spryker/*` package to its old major explicitly. A blanket `^3` is **wrong**: `actions.confirmation`, `datasource.dependable`, `datasource.trigger`, `datasource.trigger.change`, `datasource.trigger.input`, and `table.column.button-action` are on the `^2.x` line.

{% endinfo_block %}
