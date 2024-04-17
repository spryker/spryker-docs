---
title: Marketplace frontend project and module structure
description: This document provides details about the structure of the frontend project in the Spryker Marketplace.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/project-structure.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/project-structure.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/project-structure.html

related:
  - title: Building the project
    link: docs/dg/dev/frontend-development/page.version/marketplace/building-the-merchant-portal-frontend.html
---

This document explains the structure of the frontend project in the Spryker Marketplace.

## Alias

Use the alias `@mp/spryker-module-name` with the proper Spryker module name to import vendor Angular components, modules or services into .js files, for example, `import { registerNgModule } from '@mp/zed-ui'`.

## Module structure

Below you can find a general structure of every frontend module in the Spryker Marketplace:

- MODULE_NAME
    - src/Spryker/Zed/MODULE_NAME
        - Presentation—this is the namespace where the marketplace frontend-related files are located.
            - Components—all Angular files are located here.
                - entry.ts—registers all Angular NgModules via `registerNgModule` from `@mp/zed-ui/app/registry`
                - app—contains Angular components and services.
                    - components.module.ts—an Angular NgModule with components, such as web components (extends `CustomElementModule` from `@spryker/web-components`).
                - public-api—exports all public components / modules / services / types / tokens.
            - TWIG_FOLDER—a folder with twig view.
    - mp.public-api.ts—exports the public-api file.
    - package.json—adds `MODULE_NAME` specific packages.

## Main entry points

The following entry points are needed for the Angular config to build the frontend project.

- ZedUi (Project)
    - Presentation
        - Components
            - app
                - app.module.ts—a module with the default configuration modules and bootstrap for the web-components.
            - assets—all assets are located here.
            - environment—this folder contains the base configuration file, `environment.ts`.
            - index.html—entry for html file in the `angular.json` (not used for Spryker needs, exists for configuration only).
            - main.ts—compiles the web-app and bootstraps the `AppModule` to run in the browser.
            - polyfills.ts—used to provide modern functionality for older browsers that do not natively support it.
            - styles.less—extends global styles.
