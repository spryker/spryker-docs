---
title: Upgrade to frontend builder v2 for the Merchant Portal
description: Learn how to move your project from the Merchant Portal build tooling in the frontend directory to the builder shipped with the ZedUi module, and how to update Angular and TypeScript along the way.
keywords: ZedUi, zed-ui, frontend builder, Merchant Portal, migration, upgrade, Angular, TypeScript, webpack
last_updated: Sep 9, 2026
template: concept-topic-template
related:
  - title: Frontend builder for the Merchant Portal v2
    link: docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-merchant-portal-v2.html
  - title: Building the Merchant Portal frontend
    link: docs/dg/dev/frontend-development/latest/marketplace/building-the-merchant-portal-frontend.html
---

This document provides instructions for moving a project from the Merchant Portal build tooling in its `frontend/merchant-portal/` directory — builder v1 — to builder v2, which ships inside the ZedUi module.

For an overview of the builder, see [Frontend builder for the Merchant Portal v2](/docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-merchant-portal-v2.html).

*Estimated migration time: 1h*

## Prerequisites

- Node.js 24.15.0 or later, npm 10 or later.
- `spryker/zed-ui` 4.3.0 or later, together with the Merchant Portal modules that allow it.
- Angular 22, or Angular 20 with the `@spryker/*` packages pinned — see [Staying on Angular 20](#staying-on-angular-20).

{% info_block warningBox "Node.js 25 is not supported" %}

Angular 22 accepts `^22.22.3 || ^24.15.0 || >=26.0.0`. Node.js 25 satisfies a `>=24.15.0` range but is not supported.

{% endinfo_block %}

## 1) Update composer packages

ZedUi 4.3.0 declares the whole npm dependency set of the Merchant Portal, and the modules that no longer declare npm dependencies themselves require it. Update ZedUi together with the Merchant Portal modules:

```bash
composer require spryker/zed-ui:"^4.3.0" --no-update
composer update spryker/zed-ui "spryker/*-merchant-portal-gui" spryker/gui-table --with-dependencies
```

Updating `spryker/zed-ui` on its own fails or leaves the project in a broken state: the locked Merchant Portal modules constrain ZedUi to an older minor, and composer does not update packages that are not listed in the update command.

## 2) Update Node.js and npm versions

1. In all `deploy.*.yml` files used by the frontend, set the versions:

```yaml
image:
    ...
    node:
        version: 24
        npm: 10
```

2. If the project has an `.nvmrc` file, update it:

```text
24
```

## 3) Update `package.json`

1. Update the engines:

```json
"engines": {
    "node": ">=24.15.0",
    "npm": ">=10.0.0"
}
```

2. Declare the ZedUi module as an npm workspace, so that npm installs the builder's dependencies:

```json
"workspaces": [
    "vendor/spryker/zed-ui"
]
```

For what this does and how it changes the commands, see [npm workspaces for the frontend builders](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html).

3. Point the `mp:*` scripts at the `mp-zed-ui` workspace, which is the ZedUi module:

```json
"scripts": {
    "mp:build": "npm run build -w mp-zed-ui --",
    "mp:build:watch": "npm run build:watch -w mp-zed-ui --",
    "mp:build:production": "npm run build:production -w mp-zed-ui --",
    "mp:test": "npm run test -w mp-zed-ui --",
    "mp:lint": "npm run lint -w mp-zed-ui --",
    "mp:stylelint": "npm run stylelint -w mp-zed-ui --",
    "mp:update:config": "npm run update:config -w mp-zed-ui --",
    "postinstall": "npm run update:config -w mp-zed-ui"
}
```

4. Remove the Merchant Portal dependencies that ZedUi declares now, and keep the ones it declares as peer dependencies. A duplicate declaration in the project pins a second version of the same package, which is how two Angular or two ng-zorro copies end up in one build.

`vendor/spryker/zed-ui/package.json` is the source of truth. Its `dependencies` and `devDependencies` — Angular, ng-zorro, `@spryker/*`, the Angular builders and CLI, `jest-preset-angular` — come with the module and go from your `package.json`. Its `peerDependencies` stay with the project: in ZedUi 4.3.0 they are `@jest/globals`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `stylelint`, `ts-jest`, `typescript`, and `webpack`.

See [Where the npm dependencies come from](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html#where-the-npm-dependencies-come-from) for how to check what an installed package comes from.

## 4) Delete the project build tooling

1. Delete `frontend/merchant-portal/` in full. Every file in it now lives inside the ZedUi module:

```text
frontend/merchant-portal/entry-points.js
frontend/merchant-portal/html-transform.js
frontend/merchant-portal/jest.config.ts
frontend/merchant-portal/jest.preset.js
frontend/merchant-portal/mp-paths.js
frontend/merchant-portal/stylelint.mjs
frontend/merchant-portal/test-setup.ts
frontend/merchant-portal/tsconfig.spec.json
frontend/merchant-portal/update-config-paths.js
frontend/merchant-portal/utils.js
frontend/merchant-portal/webpack.config.ts
```

There is no shim: nothing in the project may keep pointing at these files. `angular.json` is repointed at the module in the next step.

2. Delete the per-module `package.json` files under your own Merchant Portal modules in `src/Pyz/Zed/*/Presentation/Components/`. ZedUi owns the dependency set, and npm workspace hoisting resolves it.

3. If the project keeps its own Merchant Portal `jest.config.*`, `test-setup.ts`, or `stylelint` runner outside `frontend/merchant-portal/`, delete those too — the packaged ones are used through `angular.json`.

{% info_block infoBox "There is no automatic migration command" %}

The migration is the steps in this document. ZedUi ships no project migration tool, and nothing in the module rewrites the project tree for you — apart from `mp:update:config`, which reconciles `angular.json` and the TypeScript configurations described below.

{% endinfo_block %}

## 5) Generate the configuration

Run the reconciliation:

```bash
npm run mp:update:config
```

It repoints `angular.json` at the module: the builder entry points, the Jest configuration, `outputPath` and `baseHref`, the core asset roots and the core stylesheet, and `test.options.zoneless: false`. Your `index`, `main`, `polyfills`, budgets, and optimization settings are left alone. The three `tsconfig.mp*.json` files are written inside the builder directory, unless the project already keeps a file of that name in its root.

Keep `angular.json` at the project root — the Angular CLI locates it only by walking up from the working directory — and commit it. For the full ownership split, see [Generated configuration](/docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-merchant-portal-v2.html#generated-configuration).

`postinstall` runs the same command, so a plain `npm install` keeps the configuration current afterwards.

## 6) Update TypeScript

The builder requires TypeScript 6. In the project's `tsconfig.base.json`:

1. Set `moduleResolution` to `bundler`.
2. Remove `baseUrl`.
3. Prefix every `paths` value with `./`, including the catch-all entry:

```json
"compilerOptions": {
    "moduleResolution": "bundler",
    "paths": {
        "*": ["./*"]
    },
    "strict": false
}
```

4. Set `"strict": false` explicitly if the project relies on it — TypeScript 6 defaults it to `true`.

Without the `./` prefixes, the compiler fails with `TS5090: Non-relative paths are not allowed when 'baseUrl' is not set`.

The `paths` in the three `tsconfig.mp*.json` files are generated, so you never edit those by hand.

## 7) Install and build

```bash
npm install
npm run mp:build
```

Then verify the rest of the toolchain:

```bash
npm run mp:test
npm run mp:lint
npm run mp:stylelint
```

In a project, all three cover `src/Pyz` only: the core modules arrive in `vendor/` and are not the project's to report on.

Finally, check the Merchant Portal in the browser at `$[local_domain]/security-merchant-portal-gui/login`.

## Staying on Angular 20

ZedUi accepts Angular and ng-zorro `>=20.3.0 <23.0.0`, and the `@spryker/*` packages declare their ranges as `^old || ^new`, so the builder can be adopted before the Angular upgrade.

npm does not backtrack on peer conflicts — it selects the highest version satisfying a range and then fails if the peers do not line up — so an unpinned install on Angular 20 can resolve the new major and abort with `ERESOLVE`. Pin each `@spryker/*` package to its old major explicitly. A blanket `^3` is **wrong**: `actions.confirmation`, `datasource.dependable`, `datasource.trigger`, `datasource.trigger.change`, `datasource.trigger.input`, and `table.column.button-action` are on the `^2.x` line.

## Post-upgrade notes

- `npm run mp:build:watch` now reloads the open Back Office page after a `.ts` or `.less` change. Twig templates are not watched, because Zed caches them server-side.
- A core module added to or removed from the project changes the generated `@mp/*` aliases and `include` globs. `postinstall` regenerates them; commit the result together with the composer update.
- Project-level lint configuration lives at the project root: `eslint.config.mp.mjs` and `.stylelintrc.mp.js`. Without them, the configurations shipped in ZedUi are used.
