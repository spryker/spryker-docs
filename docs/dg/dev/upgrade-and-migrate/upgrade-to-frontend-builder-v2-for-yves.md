---
title: Upgrade to frontend builder v2 for Yves
description: Learn how to upgrade your Spryker project from the legacy frontend builder in the frontend directory to the frontend builder v2 shipped with the ShopUi module.
keywords: ShopUi, shop-ui, frontend builder, Yves, migration, upgrade, webpack, build
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: Frontend builder for Yves v2
    link: docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves-v2.html
  - title: Frontend builder for Yves (deprecated)
    link: docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves.html
---

This document provides instructions for upgrading from the legacy Yves frontend builder, located in the project's `frontend/` directory, to frontend builder v2, which ships inside the ShopUi module.

For an overview of the new builder and its features, see [Frontend builder for Yves v2](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves-v2.html).

*Estimated migration time: 1h*

## Prerequisites

Frontend builder v2 is executed by Node.js directly as TypeScript, so it requires:

- Node.js 24 or later
- npm 10 or later
- `spryker-shop/shop-ui` version 2.0.0 or later

## 1) Update composer packages

ShopUi 2.0.0 is a new major version, and most Yves modules constrain ShopUi to `^1.x`, so they must be updated together with it. Each of them has a release that allows ShopUi 2—see [Storefront modules released with builder v2](#storefront-modules-released-with-builder-v2).

1. Several feature packages constrain ShopUi and moved to semantic versioning. If your project requires them, update their constraints in `composer.json`:

```json
"spryker-feature/ai-commerce": "^0.7.8",
"spryker-feature/buy-box": "^1.4.0",
"spryker-feature/purchasing-control": "^1.2.0",
"spryker-feature/self-service-portal": "^20.12.0",
```

{% info_block warningBox "spryker-feature/spryker-core" %}

All `spryker-feature/spryker-core` releases up to and including 202606.0 constrain ShopUi to `^1.109.0`. ShopUi 2 support ships with the next `spryker-feature/spryker-core` release; this migration requires updating the package to that release.

{% endinfo_block %}

2. Require ShopUi 2 and update it together with all modules that depend on it:

```bash
composer require spryker-shop/shop-ui:"^2.0.0" --no-update
composer update spryker-shop/shop-ui "spryker-shop/*" "spryker-feature/*" --with-dependencies
```

Running `composer require spryker-shop/shop-ui:"^2.0.0"` on its own fails: the locked module versions constrain ShopUi to `^1.x`, and composer doesn't update packages that aren't listed in the update command. The wildcard arguments put every Spryker storefront and feature package into the update set, so composer can pick the releases that allow ShopUi 2.

Packages that moved to semantic versioning are reported as downgrades—for example, `spryker-feature/purchasing-control (202606.0 => 1.2.0)`. This is expected: the semver releases continue the date-based release lines.

{% info_block infoBox "The composer update and the builder switch can be shipped separately" %}

ShopUi 2 keeps the `Theme/default` structure the legacy builder relies on (`styles/basic.scss`, `util.scss`, `app/`, `components/`), so after this step the project still builds with the legacy builder. You can ship the package update first and switch to builder v2 in a follow-up—the intermediate state builds and runs. Until the switch, expect a large number of Sass deprecation warnings coming from the updated module styles; builder v2 resolves them together with the new entry-point contract.

{% endinfo_block %}

## 2) Update Node.js and npm versions

1. In all `deploy.*.yml` files used by the frontend, set the Node.js and npm versions:

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
    "node": ">=24.14.0",
    "npm": ">=10.0.0"
}
```

2. Replace the `yves:*` scripts so they point at the builder inside the ShopUi module:

```json
"scripts": {
    "yves": "node ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/build.mts development",
    "yves:watch": "node ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/build.mts development-watch",
    "yves:production": "node ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/build.mts production",
    "yves:stylelint": "node ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/libs/lint/stylelint.mts"
}
```

3. Remove the scripts that no longer exist:

```json
"yves:help": "node ./frontend/libs/command-line-parser --help",
"yves:stylelint:fix": "node ./frontend/libs/stylelint.mjs --fix",
"yves:lint:fix": "..."
```

The parameter overview previously provided by `yves:help` is now available via `npm run yves -- --help`.

4. Update the dependencies:

- Replace `sass` with `sass-embedded`:

```json
"sass-embedded": "~1.97.0"
```

- Add `chokidar` (used by the watch mode's Twig watcher):

```json
"chokidar": "~4.0.3"
```

- Update the versions:

```json
"compression-webpack-plugin": "~12.0.0",
"postcss": "~8.5.18"
```

- Remove the dependencies that the new builder doesn't need:

```json
"sass": "x.x.x",
"terser-webpack-plugin": "x.x.x"
```

## 4) Remove the legacy builder from the `frontend/` directory

Delete the legacy builder code:

```bash
rm -rf frontend/build.js frontend/configs frontend/libs frontend/settings.js
```

Keep the following directories—they are project content, not builder code:

- `frontend/assets/`—project asset sources (images, fonts, icons)
- `frontend/static/`—static public files
- `frontend/merchant-portal/`—Merchant Portal build tooling (unrelated to the Yves builder)

## 5) Migrate custom builder settings

If your project never modified `frontend/settings.js` or `frontend/configs/*`, skip this step—the new builder works with zero configuration.

If the project registered custom namespaces or paths in `frontend/settings.js`, recreate them in the new override file `frontend/yves.settings.mts`:

```ts
// frontend/yves.settings.mts
import { defineConfig } from '../vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/settings.mts';

export default defineConfig({
    paths: {
        sources: {
            newNamespace: './PATH_TO_YOUR_FOLDER',
        },
    },
});
```

Unlike v1, a single `sources` entry is enough—there are no separate `dirs` arrays to keep in sync. For the full list of supported overrides (`paths.sources`, `paths.iconSprite`, `buildHooks`), see [Frontend builder for Yves v2](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves-v2.html#project-level-builder-settings).

{% info_block warningBox "Webpack config customizations" %}

Direct webpack config customizations from `frontend/configs/development.js` or `frontend/configs/production.js` have no direct equivalent: the webpack configuration is owned by the builder. Most common customizations are covered by `defineConfig()` overrides and build hooks; review any remaining ones case by case.

{% endinfo_block %}

## 6) Verify `tsconfig.yves.json`

The builder reads component path aliases from `tsconfig.yves.json` and requires the `ShopUi` alias to locate the core shared stylesheet. Make sure it's present:

```json
"paths": {
    "ShopUi/*": ["./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/*"]
}
```

## 7) Install and build

1. Regenerate `package-lock.json` and install dependencies:

```bash
docker/sdk cli rm -rf node_modules package-lock.json
docker/sdk cli npm install
```

2. Build the Yves frontend:

```bash
docker/sdk cli npm run yves
```

3. Verify the build:

- The build output starts with a `Source layout: project (modules in vendor/)` line.
- Assets are generated into `public/Yves/assets/<namespace>/<theme>/` as before.
- The storefront renders with the expected styles.

## Minimum changes to legacy project styles

Migrating the project styles to the Sass module system is **not** part of this upgrade. Project component files keep working in the legacy form—the builder injects the shared context (settings, helpers, and cross-component mixins) into every component file at compile time, so they need no `@use` rules of their own. Files that emit CSS at the top level compile with a legacy style rescue warning and stay in the bundles.

One legacy pattern fails to compile and must be adjusted: a shared helper mixin that reads a variable defined in the consuming component file.

```scss
// styles/helpers/_product-shared.scss
@mixin product-shared() {
    width: rem($image-size);
}

// components/molecules/my-product/my-product.scss
$image-size: 76;

@include product-shared();
```

The v1 builder prepended all styles into one global scope, so the mixin picked such a variable up dynamically at include time. Builder v2 loads the shared stylesheet as a Sass module, and a module mixin resolves variables lexically—in the stylesheet that defines the mixin—so the build fails with `Undefined variable` pointing at the mixin body.

Pass the value as a mixin parameter with a default instead:

```scss
// styles/helpers/_product-shared.scss
@mixin product-shared($image-size: 76) {
    width: rem($image-size);
}

// components/molecules/my-product/my-product.scss
@include product-shared();
```

Alternatively, move the variable declaration into the shared closure (for example, a `styles/settings/` partial), where the mixin body can see it.

## Optional: remove the Sass `@import` deprecation warnings

Most of the remaining deprecation warnings come from `@import` rules in the project `styles/` layer. The biggest source is the project `shared.scss` wrapper: it is loaded into every compiled component, so each of its `@import` lines warns once per compilation. To remove the warnings, we recommend migrating the project `styles/` layer from `@import` to the Sass module system—`@use` and `@forward`, supported since Dart Sass 1.23.0 (the `sass-embedded` version required by the builder includes it). Component files stay untouched: the builder injects the shared context into them, so only the `styles/` layer migrates.

The format—the wrapper forwards the core shared stylesheet and the project partials:

```scss
// src/Pyz/Yves/ShopUi/Theme/default/styles/shared.scss
@use 'settings/color' as setting-color;

@forward '~ShopUi/styles/shared' with (
    $setting-color-main: setting-color.$setting-color-main,
    $setting-color-alt: setting-color.$setting-color-alt
);

@forward 'settings/color' hide $setting-color-main, $setting-color-alt;
@forward 'helpers/my-helper';
```

```scss
// src/Pyz/Yves/ShopUi/Theme/default/styles/helpers/_my-helper.scss
@use '../settings/color' as *;

@mixin helper-my-helper {
    color: $setting-color-main;
}
```

Two rules make the migration safe:

- **Project overrides of core settings move into the `with (...)` configuration** of the core forward, and the same names are hidden from the project partial's forward. Forwarding two modules that define the same member is an error, and hiding the core member instead of configuring it would silently disconnect the project value from the core helpers that read it—the core `!default` settings exist exactly for this configuration.
- **Every partial declares its own `@use` dependencies.** In a module, a mixin resolves variables and helper mixins lexically—in the stylesheet that defines it—so a partial that references settings or other helpers must load them itself.

{% info_block warningBox "Tooling that loads the wrapper with @import" %}

A stylesheet that contains `@use` cannot be loaded with `@import`. If any custom tooling (for example, a Storybook Sass pipeline) prepends `@import "<path to shared.scss>"`, change it to `@use "<path to shared.scss>" as *;` placed before any other injected rules.

{% endinfo_block %}

## Storefront modules released with builder v2

The storefront modules were released together with the builder—`spryker-shop/shop-ui` as a major version, all the others as minor versions that allow ShopUi 2 in their constraints. The update command in [step 1](#1-update-composer-packages) picks them up automatically.

Modules that ship component styles received updated styles: base declarations are emitted before nested rules (the Sass `mixed-decls` fix), component styles follow the new entry-point contract, and component mixins expose [base hooks](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html#extend-base-styles-with-a-base-hook). Updating them:

- removes the Sass `mixed-decls` deprecation warnings coming from the modules' styles;
- removes the legacy style rescue warnings for components written against the old builder contract;
- makes base hooks available in the modules' components.

The remaining modules only widen their ShopUi constraint.

<details><summary>Module versions released with builder v2</summary>

| Module | Minimum version |
| --- | --- |
| `spryker-shop/shop-ui` | `^2.0.0` |
| `spryker/multi-factor-auth` | `^2.6.0` |
| `spryker-feature/ai-commerce` | `^0.7.8` |
| `spryker-feature/buy-box` | `^1.4.0` |
| `spryker-feature/order-experience-management` | `^0.2.0` |
| `spryker-feature/purchasing-control` | `^1.2.0` |
| `spryker-feature/self-service-portal` | `^20.12.0` |
| `spryker-shop/agent-page` | `^1.25.0` |
| `spryker-shop/agent-widget` | `^1.4.0` |
| `spryker-shop/availability-widget` | `^1.5.0` |
| `spryker-shop/barcode-widget` | `^1.1.0` |
| `spryker-shop/business-on-behalf-widget` | `^1.3.0` |
| `spryker-shop/calculation-page` | `^1.4.0` |
| `spryker-shop/cart-note-widget` | `^1.7.0` |
| `spryker-shop/cart-page` | `^3.60.0` |
| `spryker-shop/cart-reorder-page` | `^1.2.0` |
| `spryker-shop/catalog-page` | `^1.37.0` |
| `spryker-shop/category-image-storage-widget` | `^1.1.0` |
| `spryker-shop/category-widget` | `^1.6.0` |
| `spryker-shop/checkout-page` | `^3.43.0` |
| `spryker-shop/checkout-widget` | `^1.5.0` |
| `spryker-shop/click-and-collect-page-example` | `^0.4.0` |
| `spryker-shop/cms-block-widget` | `^2.5.0` |
| `spryker-shop/cms-page` | `^1.9.0` |
| `spryker-shop/cms-search-page` | `^1.6.0` |
| `spryker-shop/comment-widget` | `^1.5.0` |
| `spryker-shop/company-page` | `^2.37.0` |
| `spryker-shop/company-user-agent-widget` | `^1.2.0` |
| `spryker-shop/company-user-invitation-page` | `^2.6.0` |
| `spryker-shop/company-widget` | `^1.11.0` |
| `spryker-shop/configurable-bundle-note-widget` | `^1.2.0` |
| `spryker-shop/configurable-bundle-page` | `^1.5.0` |
| `spryker-shop/configurable-bundle-widget` | `^1.10.0` |
| `spryker-shop/content-navigation-widget` | `^1.7.0` |
| `spryker-shop/content-product-widget` | `^1.5.0` |
| `spryker-shop/currency-widget` | `^1.7.0` |
| `spryker-shop/customer-page` | `^2.83.0` |
| `spryker-shop/customer-reorder-widget` | `^6.18.0` |
| `spryker-shop/date-time-configurator-page-example` | `^0.8.0` |
| `spryker-shop/discount-promotion-widget` | `^3.8.0` |
| `spryker-shop/discount-widget` | `^1.10.0` |
| `spryker-shop/error-page` | `^1.12.0` |
| `spryker-shop/file-manager-widget` | `^2.2.0` |
| `spryker-shop/gift-card-widget` | `^1.3.0` |
| `spryker-shop/home-page` | `^1.3.0` |
| `spryker-shop/language-switcher-widget` | `^1.9.0` |
| `spryker-shop/merchant-product-offer-widget` | `^2.9.0` |
| `spryker-shop/merchant-product-widget` | `^1.8.0` |
| `spryker-shop/merchant-profile-widget` | `^1.3.0` |
| `spryker-shop/merchant-registration-request-page` | `^1.1.0` |
| `spryker-shop/merchant-relation-request-page` | `^1.3.0` |
| `spryker-shop/merchant-relation-request-widget` | `^1.1.0` |
| `spryker-shop/merchant-relationship-page` | `^1.1.0` |
| `spryker-shop/merchant-relationship-widget` | `^1.1.0` |
| `spryker-shop/merchant-sales-return-widget` | `^1.2.0` |
| `spryker-shop/merchant-search-widget` | `^1.1.0` |
| `spryker-shop/merchant-switcher-widget` | `^0.9.0` |
| `spryker-shop/merchant-widget` | `^1.6.0` |
| `spryker-shop/money-widget` | `^1.8.0` |
| `spryker-shop/multi-cart-page` | `^2.9.0` |
| `spryker-shop/multi-cart-widget` | `^1.11.0` |
| `spryker-shop/newsletter-page` | `^1.3.0` |
| `spryker-shop/newsletter-widget` | `^1.9.0` |
| `spryker-shop/order-cancel-widget` | `^1.2.0` |
| `spryker-shop/order-custom-reference-widget` | `^1.2.0` |
| `spryker-shop/payment-app-widget` | `^1.4.0` |
| `spryker-shop/persistent-cart-share-widget` | `^1.4.0` |
| `spryker-shop/price-product-volume-widget` | `^1.10.0` |
| `spryker-shop/price-widget` | `^1.5.0` |
| `spryker-shop/product-alternative-widget` | `^1.7.0` |
| `spryker-shop/product-barcode-widget` | `^1.2.0` |
| `spryker-shop/product-bundle-widget` | `^1.9.0` |
| `spryker-shop/product-category-widget` | `^1.10.0` |
| `spryker-shop/product-comparison-page` | `^1.1.0` |
| `spryker-shop/product-comparison-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-cart-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-shopping-list-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-wishlist-widget` | `^1.1.0` |
| `spryker-shop/product-detail-page` | `^3.33.0` |
| `spryker-shop/product-group-widget` | `^1.13.0` |
| `spryker-shop/product-image-widget` | `^1.1.0` |
| `spryker-shop/product-label-widget` | `^1.7.0` |
| `spryker-shop/product-measurement-unit-widget` | `^1.5.0` |
| `spryker-shop/product-new-page` | `^1.5.0` |
| `spryker-shop/product-offer-service-point-availability-widget` | `^1.3.0` |
| `spryker-shop/product-option-widget` | `^1.6.0` |
| `spryker-shop/product-packaging-unit-widget` | `^1.9.0` |
| `spryker-shop/product-relation-widget` | `^1.5.0` |
| `spryker-shop/product-replacement-for-widget` | `^1.8.0` |
| `spryker-shop/product-review-widget` | `^1.20.0` |
| `spryker-shop/product-search-widget` | `^3.8.0` |
| `spryker-shop/product-set-detail-page` | `^1.12.0` |
| `spryker-shop/product-set-list-page` | `^1.3.0` |
| `spryker-shop/product-set-widget` | `^1.11.0` |
| `spryker-shop/product-widget` | `^1.7.0` |
| `spryker-shop/quick-order-page` | `^4.15.0` |
| `spryker-shop/quote-approval-widget` | `^1.6.0` |
| `spryker-shop/quote-request-agent-page` | `^3.6.0` |
| `spryker-shop/quote-request-agent-widget` | `^2.7.0` |
| `spryker-shop/quote-request-page` | `^3.7.0` |
| `spryker-shop/quote-request-widget` | `^2.6.0` |
| `spryker-shop/sales-configurable-bundle-widget` | `^1.7.0` |
| `spryker-shop/sales-order-amendment-widget` | `^1.2.0` |
| `spryker-shop/sales-order-threshold-widget` | `^1.2.0` |
| `spryker-shop/sales-product-bundle-widget` | `^1.3.0` |
| `spryker-shop/sales-product-configuration-widget` | `^1.2.0` |
| `spryker-shop/sales-return-page` | `^1.12.0` |
| `spryker-shop/sales-service-point-widget` | `^1.3.0` |
| `spryker-shop/service-point-widget` | `^1.8.0` |
| `spryker-shop/shared-cart-page` | `^2.6.0` |
| `spryker-shop/shared-cart-widget` | `^1.8.0` |
| `spryker-shop/shipment-type-widget` | `^1.6.0` |
| `spryker-shop/shopping-list-note-widget` | `^1.2.0` |
| `spryker-shop/shopping-list-page` | `^1.11.0` |
| `spryker-shop/shopping-list-widget` | `^1.7.0` |
| `spryker-shop/tabs-widget` | `^1.1.0` |
| `spryker-shop/traceable-event-widget` | `^1.3.0` |
| `spryker-shop/wishlist-page` | `^1.15.0` |
| `spryker-shop/wishlist-widget` | `^1.4.0` |

</details>

## Post-upgrade notes

- **Sass deprecation warnings are no longer silenced.** The v1 builder suppressed warnings from dependencies; builder v2 shows them and points at the real file. Fix them in your project code instead of suppressing—they become hard errors in future Sass versions. See the base hook mechanism in [Extending components](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html#extend-base-styles-with-a-base-hook) for the recommended way to extend core component base styles without triggering the `mixed-decls` deprecation.
- **Legacy style rescue.** Component SCSS files that emit CSS at the top level without being imported from a component entry point are still compiled, with a warning naming the file. Migrate such components by importing their styles from the component's `index.ts`.
- **Live reload.** `npm run yves:watch` now includes live reload: CSS changes are applied without a page reload, and JavaScript and Twig changes trigger a full reload that preserves scroll position and form state. No extra setup is needed.
