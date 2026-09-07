---
title: Building the Merchant Portal frontend
description: This document provides details how to build the frontend part of the Merchant Portal.
template: concept-topic-template
last_updated: Sep 7, 2026
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/building-the-project.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/building-the-project.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/building-the-merchant-portal-frontend.html

related:
  - title: Frontend builder for the Merchant Portal
    link: docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-the-merchant-portal.html
  - title: Project structure
    link: docs/dg/dev/frontend-development/latest/marketplace/marketplace-frontend-project-and-module-structure.html
  - title: Setting up the Merchant Portal
    link: docs/dg/dev/frontend-development/latest/marketplace/set-up-the-merchant-portal.html
---

This document provides details about building the frontend part of the Merchant Portal.

Spryker uses [webpack](https://webpack.js.org/guides/getting-started/) to build frontend. At its core, webpack is a static module bundler for modern JavaScript applications. As webpack processes an application, it builds an internal dependency graph that maps every module that the project requires and generates one or more bundles.
- Starting from `spryker/zed-ui` 4.2.0, the builder and all its configuration ship inside the ZedUi module, in `vendor/spryker/zed-ui/src/Spryker/Zed/ZedUi/FrontendBuilder`. Projects that still keep a `frontend/merchant-portal` folder migrate as described in [Upgrade to the Merchant Portal frontend builder](/docs/dg/dev/upgrade-and-migrate/upgrade-to-the-merchant-portal-frontend-builder.html).
- `angular.json` stays at the project root, and `npm run mp:update:config` keeps the values that depend on where the core modules are installed in sync. See [Frontend builder for the Merchant Portal](/docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-the-merchant-portal.html).
- The built frontend assets (css, fonts, images, js) are in the `/public/MerchantPortal/assets` folder.

Modules for Merchant Portal are split into composer modules, and each module has its own application in the form of an Angular Module with Angular+Web Components.
Every module has an entry point called `entry.ts` that is collected during the build as webpack entries and included in the Merchant Portal build as a chunk.
Those chunk names are taken from the module name and then transformed into a `kebab-case`.

General structure of the frontend modules in the Spryker Marketplace can be found in the [Module structure](/docs/dg/dev/frontend-development/latest/marketplace/marketplace-frontend-project-and-module-structure.html#module-structure).

The frontend of the Merchant Portal is built using the following commands:

- default build

    ```bash
    npm run mp:build
    ```

- build in the watch mode

    ```bash
    npm run mp:build:watch
    ```

- production build

    ```bash
    npm run mp:build:production
    ```

In watch mode, an edited `.ts` or `.less` file reloads the open Back Office page. Twig templates are not watched, because Zed caches them server-side.

The tests, ESLint, and Stylelint of the Merchant Portal are run with `npm run mp:test`, `npm run mp:lint`, and `npm run mp:stylelint`. In a project, all three cover the project modules in `src/Pyz` only — core modules arrive in `vendor/` as installed code.
