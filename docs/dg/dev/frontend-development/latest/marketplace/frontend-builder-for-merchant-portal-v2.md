---
title: Frontend builder for the Merchant Portal v2
description: Learn about the Angular frontend builder that ships with the ZedUi module and builds the Merchant Portal assets for core and project modules.
keywords: ZedUi, zed-ui, frontend builder, Merchant Portal, Angular, webpack, jest, build, live reload
last_updated: Sep 9, 2026
template: howto-guide-template
related:
  - title: Building the Merchant Portal frontend
    link: docs/dg/dev/frontend-development/latest/marketplace/building-the-merchant-portal-frontend.html
  - title: Upgrade to frontend builder v2 for the Merchant Portal
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-merchant-portal.html
  - title: Extending the Merchant Portal frontend
    link: docs/dg/dev/frontend-development/latest/marketplace/extending-the-merchant-portal-frontend.html
---

The Merchant Portal frontend builder compiles the Angular application of the Merchant Portal: the entry points of all Merchant Portal modules, their styles, assets, and tests.

Starting from `spryker/zed-ui` version 4.3.0, the builder ships inside the ZedUi module and lives in `vendor/spryker/zed-ui/src/Spryker/Zed/ZedUi/FrontendBuilder/`. This generation is builder v2. The previous one was copied into every project as `frontend/merchant-portal/` and is gone: projects no longer carry Merchant Portal build tooling of their own.

For the upgrade steps, see [Upgrade to frontend builder v2 for the Merchant Portal](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-merchant-portal.html).

## Builder v2 at a glance

|  | Builder v1 (legacy) | Builder v2 |
| --- | --- | --- |
| Build tooling in your project | 11 files in `frontend/merchant-portal/`, owned and migrated by hand | 0 files — ships and updates with the ZedUi module |
| npm dependencies of Merchant Portal modules | a `package.json` per module, kept in sync by hand | one dependency set, declared by ZedUi |
| `angular.json` and the TypeScript configurations | edited by hand on every core change | reconciled by `npm run mp:update:config`, your own values kept |
| `@mp/*` path aliases | maintained by hand | generated from the module entry points |
| Angular | 20 | 22 — 20 still supported |
| TypeScript | 5 | 6 |
| Seeing a change in the browser | rebuild + manual page reload | reloaded automatically in watch mode |
| Sources that lint and tests report on | core and project alike | only what the repository owns |
| Switching between the monorepo and a project | different configuration | detected automatically, no configuration |

## What's new

### Ships with the ZedUi module

The build tooling every project used to carry in `frontend/merchant-portal/` is gone from the project tree. The builder is distributed inside the `spryker/zed-ui` composer package, so fixes and improvements arrive with a regular module update — the same way as any other Spryker code.

### One dependency set for every Merchant Portal module

Each Merchant Portal module used to declare its own npm dependencies, and every project pinned the build tooling a second time. ZedUi now declares the whole set — Angular, ng-zorro, `@spryker/*`, and the build-time packages — so the per-module `package.json` files are deleted and the project keeps only what ZedUi declares as peer dependencies. See [Dependencies that come with the module](#dependencies-that-come-with-the-module).

### Configuration reconciled in place, not overwritten

`angular.json` and the TypeScript configurations no longer have to be edited whenever a core module is added, moved, or removed. `npm run mp:update:config` — which `postinstall` runs for you — writes the values that depend on the installation layout and leaves every value you own untouched, including whatever `ng update` or `ng add` wrote. See [Generated configuration](#generated-configuration).

### Angular 22 and TypeScript 6

The builder runs on Angular 22 and TypeScript 6, and keeps accepting Angular and ng-zorro `>=20.3.0 <23.0.0`, so the builder can be adopted before the framework upgrade. See [Angular 20 projects](#angular-20-projects).

### Live reload in watch mode

`npm run mp:build:watch` reloads the open Back Office page after an edited `.ts` or `.less` file, without a dev server or any extra infrastructure. See [Live reload](#live-reload).

### Automatic source layout detection

Nothing configures the difference between the Spryker monorepo and a project: the builder detects the layout from a marker directory and resolves the core and project module paths from it. The same commands work in both. See [Source layout detection](#source-layout-detection).

### Lint and tests scoped to what the repository owns

`mp:lint`, `mp:stylelint`, and `mp:test` no longer report on installed code. In a project they cover the modules in `src/Pyz`; in the monorepo, where the core modules are sources of the repository, they cover those as well. See [What lint and tests cover](#what-lint-and-tests-cover).

### Errors that name the file and the next step

Every error the builder raises names the offending path, states the reason in plain language, and says what to do next. An undetectable source layout, for example, names both marker directories it looked for and tells you to run the command from the project root.

## Requirements

- Node.js 24.15.0 or later. Angular 22 accepts `^22.22.3 || ^24.15.0 || >=26.0.0`, so Node.js 25 is *not* supported even though it satisfies `>=24.15.0`.
- npm 10 or later.
- `spryker/zed-ui` 4.3.0 or later.

## Commands

The project runs the builder through the npm workspace named `mp-zed-ui`, and its `mp:*` scripts delegate to it. For the setup and what it does, see [npm workspaces for the frontend builders](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html).

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

For the mechanics of that split, see [Where the npm dependencies come from](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html#where-the-npm-dependencies-come-from).

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

## Angular 20 projects

ZedUi accepts Angular and ng-zorro `>=20.3.0 <23.0.0`, so a project that has not moved to Angular 22 keeps working. The `@spryker/*` packages declare their ranges as `^old || ^new` for the same reason.

{% info_block warningBox "Pin the @spryker/* packages on Angular 20" %}

npm does not backtrack on peer conflicts — it selects the highest version satisfying a range and then fails if the peers do not line up — so an unpinned install on Angular 20 can resolve the new major and abort with `ERESOLVE`. Pin each `@spryker/*` package to its old major explicitly. A blanket `^3` is **wrong**: `actions.confirmation`, `datasource.dependable`, `datasource.trigger`, `datasource.trigger.change`, `datasource.trigger.input`, and `table.column.button-action` are on the `^2.x` line.

{% endinfo_block %}
