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

The builder is an npm workspace named `mp-zed-ui`, so the project declares the module as a workspace and its `mp:*` scripts delegate to it:

```json
"workspaces": [
    "vendor/spryker/zed-ui"
],
"scripts": {
    "mp:build": "npm run build -w mp-zed-ui --"
}
```

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

ZedUi declares the whole npm dependency set of the Merchant Portal, so the project and its Merchant Portal modules declare none of it. To see what that set is, open `vendor/spryker/zed-ui/package.json`:

| Section | Who installs it | What it means for your project |
| --- | --- | --- |
| `dependencies` | ZedUi | Angular, ng-zorro, `@spryker/*`, rxjs, zone.js and the rest of the runtime. Remove them from your `package.json`. |
| `devDependencies` | ZedUi | The Angular builders, the Angular CLI, `jest-preset-angular`, `fast-glob` and the other build-time packages. Remove them from your `package.json`. |
| `peerDependencies` | your project | The packages ZedUi expects the project to provide. Keep these. |

At the time of ZedUi 4.3.0, the peer dependencies are `@jest/globals`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `stylelint`, `ts-jest`, `typescript`, and `webpack`. Read the file rather than this list when you migrate — it is the source of truth for the version ranges.

To check where an installed package comes from, run `npm ls <package>` in the project root: a package provided by ZedUi is listed under `mp-zed-ui`.

## Generated configuration

`angular.json`, `tsconfig.mp.json`, `tsconfig.mp.spec.json`, and `tsconfig.mp.lint.json` contain values that depend on where the core modules are installed — `vendor/spryker/zed-ui` in a project, `src/Spryker/ZedUi` in the Spryker monorepo — so ZedUi cannot ship them ready-made. `npm run mp:update:config` generates those values instead.

`angular.json` stays at the project root, because the Angular CLI finds it by walking up from the working directory. The three `tsconfig.mp*.json` files are written inside the builder directory, unless the project already keeps a file of that name in its root — in that case the reconciliation works on that file and writes no second copy.

In the `tsconfig.mp*.json` files:

| Value | Owner |
| --- | --- |
| `compilerOptions.paths` (`@mp/*`) | generated — added, repointed, and removed as core modules come and go |
| `include`, `files` | generated — the core and project globs, and the test setup file |
| everything else (`compilerOptions`, `angularCompilerOptions`, `exclude`, `extends`) | yours |

In `angular.json`, inside the `merchant-portal` project:

| Value | Owner |
| --- | --- |
| `build.options.customWebpackConfig.path`, `build.options.indexTransform` | generated — the builder entry points |
| `build.options.outputPath`, `build.options.baseHref` | generated from the builder settings |
| `build.options.tsConfig`, `test.options.tsConfig`, `test.options.config` | generated — the files above, and the packaged Jest configuration |
| `build.options.assets` entries rooted at the core directory, and the core entry of `build.options.styles` | generated — your own entries are kept |
| `test.options.zoneless` | generated as `false`; `@angular-builders/jest` 22 defaults it to `true`, which runs the suite without zone.js change detection |
| everything else — `index`, `main`, `polyfills`, `fileReplacements`, `budgets`, optimization flags, your assets and styles | yours |

Because the reconciliation happens in place rather than as a rewrite, whatever `ng update` or `ng add` writes into `angular.json` survives it. A value the builder *does* generate belongs to it, so a hand edit is corrected on the next run.

Your Merchant Portal project in `angular.json` has to be named `merchant-portal`, unless it is the only project in the file.

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
