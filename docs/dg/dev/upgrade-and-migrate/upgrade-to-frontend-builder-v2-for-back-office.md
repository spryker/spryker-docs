---
title: Upgrade to frontend builder v2 for the Back Office
description: Learn how to move your project from the oryx-for-zed npm package to the Back Office frontend builder shipped with the Gui module.
keywords: Gui, spryker-zed-gui, frontend builder, Back Office, Zed, oryx-for-zed, migration, upgrade, webpack, TypeScript
last_updated: Sep 28, 2026
template: concept-topic-template
related:
  - title: Frontend builder for the Back Office v2
    link: docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html
  - title: npm workspaces for the frontend builders
    link: docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html
  - title: Oryx for Zed (deprecated)
    link: docs/dg/dev/frontend-development/latest/zed/oryx-for-zed.html
---

This document provides instructions for moving a project from the `@spryker/oryx-for-zed` npm package — builder v1 — to builder v2, which ships inside the Gui module.

For an overview of the builder, see [Frontend builder for the Back Office v2](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html).

*Estimated migration time: 1h*

## Prerequisites

- Node.js 24.15.0 or later, npm 10 or later.
- `spryker/gui` 5.8.0 or later, together with the Back Office modules that allow it.

## 1) Update composer packages

Gui 5.8.0 ships the builder and the npm dependency set of the Back Office, and the Back Office modules released with it widen their `spryker/gui` constraint to allow it — see [Back Office modules released with builder v2](#back-office-modules-released-with-builder-v2). Update Gui together with the modules that depend on it:

```bash
composer require spryker/gui:"^5.8.0" --no-update
composer update spryker/gui "spryker/*" "spryker-feature/*" --with-dependencies
```

Updating `spryker/gui` on its own fails or leaves the project in a broken state: the locked Back Office modules constrain Gui to an older minor, and composer does not update packages that are not listed in the update command.

{% info_block infoBox "The composer update and the builder switch can be shipped separately" %}

The Back Office modules released with builder v2 keep the entry point files and names the legacy builder relies on, so after this step the project still builds with `@spryker/oryx-for-zed`. You can ship the package update first and switch to builder v2 in a follow-up — the intermediate state builds and runs.

{% endinfo_block %}

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

2. Declare the `assets/Zed` directory of the Gui module as an npm workspace, so that npm installs the builder's dependencies:

```json
"workspaces": [
    "vendor/spryker/gui/assets/Zed"
]
```

For what this does and how it changes the commands, see [npm workspaces for the frontend builders](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html).

3. Replace the `zed:*` scripts so they delegate to the `spryker-zed-gui` workspace, add the lint scripts, and add the configuration generation to `postinstall`:

```json
"scripts": {
    "zed": "npm run build -w spryker-zed-gui --",
    "zed:watch": "npm run build:watch -w spryker-zed-gui --",
    "zed:production": "npm run build:production -w spryker-zed-gui --",
    "zed:lint": "npm run lint -w spryker-zed-gui --",
    "zed:stylelint": "npm run stylelint -w spryker-zed-gui --",
    "postinstall": "npm run update:config -w spryker-zed-gui"
}
```

If `postinstall` already runs the configuration generation of another builder, chain them:

```json
"postinstall": "npm run update:config -w mp-zed-ui && npm run update:config -w spryker-zed-gui"
```

4. Remove the legacy builder:

```json
"@spryker/oryx-for-zed": "~3.6.1"
```

5. Remove the Back Office build dependencies the project declared for the legacy builder. Gui declares the whole toolchain in `vendor/spryker/gui/assets/Zed/package.json` and has no peer dependencies, so a copy in the project pins a second version of the same package. Everything below is installed automatically through the `spryker-zed-gui` workspace and goes from your `package.json`:

- Toolchain: `@babel/core`, `@babel/plugin-transform-class-properties`, `@babel/plugin-transform-runtime`, `@babel/preset-env`, `@babel/preset-typescript`, `@babel/runtime`, `@jest/globals`, `@types/jquery`, `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `autoprefixer`, `babel-loader`, `chokidar`, `commander`, `copy-webpack-plugin`, `css-loader`, `css-minimizer-webpack-plugin`, `eslint`, `fast-glob`, `imports-loader`, `jest`, `jest-environment-jsdom`, `mini-css-extract-plugin`, `postcss`, `postcss-loader`, `postcss-selector-parser`, `resolve-url-loader`, `sass-embedded`, `sass-loader`, `stylelint`, `stylelint-config-standard-scss`, `terser-webpack-plugin`, `ts-jest`, `typescript`, `webpack`, `webpack-merge`.
- Runtime libraries of the Back Office: `@fortawesome/fontawesome-free`, `@popperjs/core`, `@spryker/nestable`, `autonumeric`, `bootstrap`, `codemirror`, `datatables.net` and its `-bs5`, `-buttons`, `-buttons-bs5`, `-responsive`, `-responsive-bs5`, `-select`, `-select-bs5` packages, `dompurify`, `flatpickr`, `highlight.js`, `jquery`, `jquery-migrate`, `jquery-ui`, `jstree`, `marked`, `pace`, `select2`, `summernote`, `sweetalert2`.

Keep a package only if another builder in the project still declares it as a peer dependency. See [What you can remove from your package.json](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html#what-you-can-remove-from-your-packagejson).

## 4) Delete the project build script

If the project extended the legacy builder as described in [Overriding Webpack, JS, SCSS for ZED on the project level](/docs/dg/dev/frontend-development/latest/zed/overriding-webpack-js-scss-for-zed-on-the-project-level.html), delete `frontend/zed/build.js` and any webpack configuration next to it. Each thing it did has a replacement:

| In `frontend/zed/build.js` | In builder v2 |
| --- | --- |
| `entry.dirs` with `src/Pyz/Zed`, so that project entry points are found | nothing — `src/Pyz/Zed` is scanned by default |
| `resolveModules.dirs`, so that project npm packages resolve | nothing — every `assets/Zed/node_modules` directory in the scanned roots is added to the resolution |
| `resolve.alias` entries for core modules | nothing — a `@zed/<module>/*` alias is generated per module; a hand-written alias goes into `compilerOptions.paths` of a `tsconfig.zed.json` kept in the project root, which the generation reconciles in place |
| any other webpack customization | `frontend/backoffice.settings.mts` — see [Project-level builder settings](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html#project-level-builder-settings) |

The builder has no webpack configuration hook: the settings file overrides the source roots, the output directories, and the type checking switch, and everything else is fixed.

{% info_block infoBox "There is no automatic migration command" %}

The migration is the steps in this document. Gui ships no project migration tool, and nothing in the module rewrites the project tree for you — apart from the configuration generation described in the next step.

{% endinfo_block %}

## 5) Generate the configuration

Run the generation:

```bash
npm run update:config -w spryker-zed-gui
```

It writes `tsconfig.defaults.json`, `tsconfig.zed.json`, and `tsconfig.zed.lint.json` into the builder directory, and creates the project root `tsconfig.json` as a solution file if the project has none. A root `tsconfig.json` that is a complete configuration of your own is left unchanged; its `compilerOptions` override the builder defaults. For the full ownership split, see [Generated configuration](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html#generated-configuration).

`postinstall` runs the same command, so a plain `npm install` keeps the configuration current afterwards. The generated files are gitignored in the Gui module and regenerated on every install, so there is nothing to commit.

## 6) Fix Sass deprecations in project stylesheets

The legacy builder logged Sass deprecation warnings; builder v2 fails the build on a warning in a stylesheet the project owns. Run a build and fix what it reports:

- `@import 'partial'` of your own partial becomes `@use 'partial'`.
- `@import '~package/file.css'` becomes `@use 'package/file.css' as *`, or a `require('package/file.css')` in the entry point.
- A global color function becomes its `sass:color` equivalent: `darken($color, 8%)` becomes `color.adjust($color, $lightness: -8%)` after `@use 'sass:color'`.

Warnings from installed packages and from the Inspinia theme do not fail the build; they are printed as one summary line. See [Stylesheets](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html#stylesheets).

## 7) Install and build

```bash
npm install
npm run zed
```

Then verify the rest of the toolchain:

```bash
npm run zed:lint
npm run zed:stylelint
```

In a project, both cover `src/Pyz/Zed` only: the core modules arrive in `vendor/` and are not the project's to report on. `zed:lint` reports that type checking is off — it is off by default in a project, see [TypeScript](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html#typescript).

Finally, check the Back Office in the browser. Every entry point still produces `js/<name>.js` and `css/<name>.css` under the same names, so the templates need no change. The only new files are the hashed chunks under `js/chunks/` and `css/chunks/`.

## Back Office modules released with builder v2

The Back Office modules were released together with the builder — `spryker/gui` as a minor version, all the others as patch versions that allow Gui 5.8 in their constraints. The update command in [step 1](#1-update-composer-packages) picks them up automatically.

The patch releases change no behavior of their own: the entry point files keep their names, so the modules still build with the legacy builder as well. Some of them additionally carry lint fixes and the `@use` conversion of their stylesheets, which is what removes the Sass deprecation warnings from the core modules under builder v2.

<details><summary>Module versions released with builder v2</summary>

| Module | Version |
| --- | --- |
| `spryker-feature/order-experience-management` | `^2.1.1` |
| `spryker-feature/product-experience-management` | `^4.1.2` |
| `spryker-feature/purchasing-control` | `^1.4.1` |
| `spryker-feature/self-service-portal` | `^20.17.2` |
| `spryker/acl` | `^3.28.1` |
| `spryker/agent-gui` | `^2.1.1` |
| `spryker/ai-foundation` | `^0.9.1` |
| `spryker/analytics-gui` | `^1.2.1` |
| `spryker/api-key-gui` | `^2.3.1` |
| `spryker/app-catalog-gui` | `^1.4.3` |
| `spryker/availability-gui` | `^7.3.1` |
| `spryker/category-gui` | `^2.9.1` |
| `spryker/category-image-gui` | `^1.10.1` |
| `spryker/cms` | `^7.22.1` |
| `spryker/cms-block-category-connector` | `^2.12.1` |
| `spryker/cms-block-gui` | `^2.18.1` |
| `spryker/cms-block-product-connector` | `^1.8.1` |
| `spryker/cms-content-widget` | `^1.13.1` |
| `spryker/cms-gui` | `^5.21.1` |
| `spryker/cms-slot-block-gui` | `^1.7.1` |
| `spryker/cms-slot-block-product-category-gui` | `^1.4.1` |
| `spryker/cms-slot-gui` | `^1.5.1` |
| `spryker/collector` | `^6.13.1` |
| `spryker/comment-gui` | `^1.2.1` |
| `spryker/comment-sales-connector` | `^1.5.2` |
| `spryker/company-business-unit-gui` | `^2.16.1` |
| `spryker/company-gui` | `^1.10.1` |
| `spryker/company-role-gui` | `^1.13.1` |
| `spryker/company-supplier-gui` | `^1.6.1` |
| `spryker/company-unit-address-gui` | `^1.7.1` |
| `spryker/company-unit-address-label` | `^1.6.1` |
| `spryker/company-user-gui` | `^1.16.1` |
| `spryker/configurable-bundle-gui` | `^2.2.1` |
| `spryker/configuration` | `^1.4.1` |
| `spryker/content-file-gui` | `^2.5.1` |
| `spryker/content-gui` | `^3.2.1` |
| `spryker/content-navigation-gui` | `^1.2.1` |
| `spryker/content-product-gui` | `^1.7.1` |
| `spryker/content-product-set-gui` | `^1.6.1` |
| `spryker/country` | `^4.9.1` |
| `spryker/country-gui` | `^1.3.1` |
| `spryker/currency-gui` | `^1.3.1` |
| `spryker/customer` | `^7.87.2` |
| `spryker/customer-group` | `^2.14.1` |
| `spryker/customer-note-gui` | `^1.4.1` |
| `spryker/customer-user-connector-gui` | `^2.2.1` |
| `spryker/dashboard` | `^1.4.1` |
| `spryker/data-import-merchant-portal-gui` | `^2.4.1` |
| `spryker/dataset` | `^1.8.1` |
| `spryker/development` | `^3.55.1` |
| `spryker/discount` | `^9.56.1` |
| `spryker/discount-promotion` | `^4.16.1` |
| `spryker/dynamic-entity-gui` | `^1.6.2` |
| `spryker/falcon-ui` | `^0.1.3` |
| `spryker/file-manager-gui` | `^3.2.1` |
| `spryker/gift-card-balance` | `^1.7.1` |
| `spryker/glossary` | `^3.22.2` |
| `spryker/gui` | `^5.8.0` |
| `spryker/locale-gui` | `^2.2.1` |
| `spryker/manual-order-entry-gui` | `^0.9.9` |
| `spryker/merchant-agent-gui` | `^2.1.1` |
| `spryker/merchant-commission-gui` | `^2.1.1` |
| `spryker/merchant-gui` | `^4.2.1` |
| `spryker/merchant-product-offer-gui` | `^2.1.1` |
| `spryker/merchant-profile-gui` | `^1.5.1` |
| `spryker/merchant-profile-merchant-portal-gui` | `^4.4.1` |
| `spryker/merchant-registration-request` | `^1.3.1` |
| `spryker/merchant-relation-request-gui` | `^2.1.1` |
| `spryker/merchant-relationship-gui` | `^1.14.1` |
| `spryker/merchant-relationship-product-list-gui` | `^2.5.1` |
| `spryker/merchant-relationship-sales-order-threshold-gui` | `^1.11.2` |
| `spryker/merchant-sales-order-merchant-user-gui` | `^2.3.1` |
| `spryker/merchant-sales-return-merchant-user-gui` | `^2.2.1` |
| `spryker/merchant-stock-gui` | `^1.2.1` |
| `spryker/merchant-user-gui` | `^1.8.1` |
| `spryker/money-gui` | `^1.4.1` |
| `spryker/multi-factor-auth` | `^2.8.1` |
| `spryker/navigation-gui` | `^3.5.1` |
| `spryker/oms` | `^11.54.6` |
| `spryker/order-custom-reference-gui` | `^1.2.1` |
| `spryker/payment-gui` | `^2.1.1` |
| `spryker/price-product-merchant-relationship-gui` | `^1.5.1` |
| `spryker/price-product-merchant-relationship-merchant-portal-gui` | `^3.1.1` |
| `spryker/price-product-offer-gui` | `^2.1.1` |
| `spryker/price-product-schedule-gui` | `^3.5.1` |
| `spryker/price-product-volume-gui` | `^3.6.1` |
| `spryker/product-alternative-gui` | `^2.1.1` |
| `spryker/product-approval-gui` | `^2.1.2` |
| `spryker/product-attribute-gui` | `^2.5.1` |
| `spryker/product-barcode-gui` | `^1.5.1` |
| `spryker/product-category` | `^4.36.1` |
| `spryker/product-category-filter-gui` | `^3.2.1` |
| `spryker/product-label-gui` | `^4.4.1` |
| `spryker/product-list-gui` | `^3.2.1` |
| `spryker/product-management` | `^0.20.20` |
| `spryker/product-measurement-unit-gui` | `^1.2.1` |
| `spryker/product-merchant-portal-gui` | `^5.5.1` |
| `spryker/product-offer-gui` | `^2.2.1` |
| `spryker/product-offer-service-point` | `^1.3.1` |
| `spryker/product-offer-service-point-gui` | `^2.1.1` |
| `spryker/product-offer-shipment-type-gui` | `^2.1.1` |
| `spryker/product-offer-validity-gui` | `^2.1.1` |
| `spryker/product-option` | `^8.29.1` |
| `spryker/product-relation-gui` | `^2.2.1` |
| `spryker/product-review-gui` | `^1.9.1` |
| `spryker/product-search` | `^5.29.1` |
| `spryker/product-set-gui` | `^3.3.1` |
| `spryker/queue` | `^1.30.1` |
| `spryker/refund` | `^5.16.2` |
| `spryker/sales` | `^11.85.2` |
| `spryker/sales-order-threshold-gui` | `^2.2.2` |
| `spryker/sales-reclamation-gui` | `^2.2.1` |
| `spryker/sales-return-gui` | `^2.3.2` |
| `spryker/sales-service-point-gui` | `^1.2.1` |
| `spryker/search` | `^8.29.2` |
| `spryker/search-elasticsearch-gui` | `^2.1.1` |
| `spryker/security-gui` | `^2.10.1` |
| `spryker/service-point` | `^1.3.1` |
| `spryker/shipment` | `^8.28.2` |
| `spryker/shipment-gui` | `^3.5.1` |
| `spryker/state-machine` | `^2.27.2` |
| `spryker/state-machine-visualizer` | `^0.1.3` |
| `spryker/stock-gui` | `^3.1.1` |
| `spryker/storage` | `^3.25.2` |
| `spryker/storage-gui` | `^2.1.1` |
| `spryker/store` | `^1.41.1` |
| `spryker/store-context-gui` | `^2.2.1` |
| `spryker/store-gui` | `^2.1.3` |
| `spryker/symfony-scheduler` | `^1.4.1` |
| `spryker/tax` | `^5.21.1` |
| `spryker/user` | `^3.35.1` |
| `spryker/user-locale-gui` | `^1.3.1` |
| `spryker/user-merchant-portal-gui` | `^4.4.2` |
| `spryker/warehouse-user-gui` | `^2.2.1` |
| `spryker/workflow` | `^0.3.1` |

</details>

## Behavior changes

- **Code loaded on demand is no longer in the shared bundle.** The legacy builder merged every library loaded with `import()` into `spryker-zed-gui-commons.js`, so it was present on every page whether the page needed it or not. Builder v2 emits such code as separate chunks fetched on first use. Project code that relied on one of these libraries being available synchronously on every page has to import it explicitly.
- **`animate.css` and `metismenu` are gone** from the Gui runtime dependencies; nothing in the Back Office imported them. If your project does, declare them in your own `package.json`.
- **Runtime libraries moved to newer versions**: jQuery 3.7, jQuery Migrate 3.6, Select2 4.1, AutoNumeric 4.10, and marked 18. Select2 4.1 changes its generated markup — the clear button of a select with `allowClear` is a `<button class="select2-selection__clear">` element — so end-to-end tests that select buttons inside a Select2 container may need narrower selectors.
- **Sass deprecations in project stylesheets fail the build** — see [step 6](#6-fix-sass-deprecations-in-project-stylesheets).

## Post-upgrade notes

- **Live reload.** `npm run zed:watch` now reloads the open Back Office page after a `.js`, `.ts`, `.scss`, or `.twig` change; a CSS-only change is applied without a reload. No extra setup is needed. Set `SPRYKER_FRONTEND_RELOAD=0` to turn it off. A Twig change shows up after the reload only when `ApplicationConstants::ENABLE_APPLICATION_DEBUG` is on, which is the default in a Docker SDK development environment; otherwise run `docker/sdk console twig:cache:warmer` — see [Live reload](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html#live-reload).
- **TypeScript.** Back Office modules can ship `.entry.ts` and `.ts` files. To type-check the project's own TypeScript, set `typecheck: true` in `frontend/backoffice.settings.mts`.
- **Lint scope.** `npm run zed:lint` and `npm run zed:stylelint` report on `src/Pyz/Zed` only. Project-level lint configuration lives at the project root: `eslint.config.backoffice.mjs` and `stylelint.config.backoffice.mjs`. Without them, the configurations shipped in Gui are used.
- **A core module added to or removed from the project** changes the generated `@zed/*` aliases and `include` globs. `postinstall` regenerates them on the next `npm install`.
