---
title: Upgrade to frontend builder v2 for Yves
description: Learn how to upgrade your Spryker project from the legacy frontend builder in the frontend directory to the frontend builder v2 shipped with the ShopUi module.
last_updated: Jul 29, 2026
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

Update the ShopUi module to version 2.0.0 or later:

```bash
composer require spryker-shop/shop-ui:"^2.0.0" --update-with-dependencies
```

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

## Optional: update storefront modules to base-hook versions

Along with the builder, the storefront modules received updated styles: base declarations are emitted before nested rules (the Sass `mixed-decls` fix), component styles follow the new entry-point contract, and component mixins expose [base hooks](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html#extend-base-styles-with-a-base-hook).

{% info_block infoBox "These updates are optional" %}

The builder compiles older module versions as is—nothing breaks if you skip this step. Updating the modules only:

- removes the Sass `mixed-decls` deprecation warnings coming from the modules' styles;
- removes the legacy style rescue warnings for components written against the old builder contract;
- makes base hooks available in the modules' components.

Except for `spryker-shop/shop-ui`, all of these are regular minor updates. Update the modules you actually customize first; the rest can follow with your normal module update cadence.

{% endinfo_block %}

<details><summary>Module versions with base hooks and updated styles</summary>

| Module | Minimum version |
| --- | --- |
| `spryker-shop/shop-ui` | `^2.0.0` |
| `spryker-shop/agent-widget` | `^1.4.0` |
| `spryker-shop/cart-page` | `^3.60.0` |
| `spryker-shop/catalog-page` | `^1.37.0` |
| `spryker-shop/checkout-page` | `^3.43.0` |
| `spryker-shop/cms-search-page` | `^1.6.0` |
| `spryker-shop/comment-widget` | `^1.5.0` |
| `spryker-shop/company-page` | `^2.37.0` |
| `spryker-shop/company-user-agent-widget` | `^1.2.0` |
| `spryker-shop/configurable-bundle-note-widget` | `^1.2.0` |
| `spryker-shop/configurable-bundle-page` | `^1.5.0` |
| `spryker-shop/configurable-bundle-widget` | `^1.10.0` |
| `spryker-shop/customer-page` | `^2.83.0` |
| `spryker-shop/file-manager-widget` | `^2.2.0` |
| `spryker-shop/merchant-product-offer-widget` | `^2.9.0` |
| `spryker-shop/merchant-relation-request-page` | `^1.3.0` |
| `spryker-shop/payment-app-widget` | `^1.4.0` |
| `spryker-shop/persistent-cart-share-widget` | `^1.4.0` |
| `spryker-shop/price-product-volume-widget` | `^1.10.0` |
| `spryker-shop/product-bundle-widget` | `^1.9.0` |
| `spryker-shop/product-comparison-page` | `^1.1.0` |
| `spryker-shop/product-detail-page` | `^3.32.0` |
| `spryker-shop/product-group-widget` | `^1.13.0` |
| `spryker-shop/product-label-widget` | `^1.7.0` |
| `spryker-shop/product-offer-service-point-availability-widget` | `^1.3.0` |
| `spryker-shop/product-option-widget` | `^1.6.0` |
| `spryker-shop/product-packaging-unit-widget` | `^1.9.0` |
| `spryker-shop/product-review-widget` | `^1.20.0` |
| `spryker-shop/product-search-widget` | `^3.8.0` |
| `spryker-shop/quick-order-page` | `^4.15.0` |
| `spryker-shop/quote-request-agent-widget` | `^2.7.0` |
| `spryker-shop/sales-configurable-bundle-widget` | `^1.7.0` |
| `spryker-shop/service-point-widget` | `^1.8.0` |
| `spryker-shop/shopping-list-page` | `^1.11.0` |
| `spryker-shop/shopping-list-widget` | `^1.7.0` |
| `spryker-shop/tabs-widget` | `^1.1.0` |
| `spryker-shop/wishlist-widget` | `^1.4.0` |
| `spryker-feature/ai-commerce` | `^0.8.0` |
| `spryker-feature/order-experience-management` | `^0.2.0` |
| `spryker-feature/self-service-portal` | `^20.10.0` |

</details>

## Post-upgrade notes

- **Sass deprecation warnings are no longer silenced.** The v1 builder suppressed warnings from dependencies; builder v2 shows them and points at the real file. Fix them in your project code instead of suppressing—they become hard errors in future Sass versions. See the base hook mechanism in [Extending components](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html#extend-base-styles-with-a-base-hook) for the recommended way to extend core component base styles without triggering the `mixed-decls` deprecation.
- **Legacy style rescue.** Component SCSS files that emit CSS at the top level without being imported from a component entry point are still compiled, with a warning naming the file. Migrate such components by importing their styles from the component's `index.ts`.
- **Live reload.** `npm run yves:watch` now includes live reload: CSS changes are applied without a page reload, and JavaScript and Twig changes trigger a full reload that preserves scroll position and form state. No extra setup is needed.
