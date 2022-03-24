---
title: Building the project
description: This document provides details how to build the frontend part of the Merchant Portal.
template: concept-topic-template
---

This document provides details how to build the front-end part of the Merchant Portal.

## Overview
Spryker uses [webpack](https://webpack.js.org/guides/getting-started/) to build front-end.
At its core, webpack is a static module bundler for modern JavaScript applications. As webpack processes an application, it builds an internal dependency graph that maps every module that the project requires and generates one or more bundles.
- All related configs are located in the `/frontend/merchant-portal` folder. 
- The built-in front-end stuff (css, fonts, images, js) is in the `/public/Backoffice/assets` folder.

Modules for Merchant Portal are split into composer modules, and each module has its own application in the form of an Angular Module with Angular+Web Components.
Every module has an entry point called `entry.ts` that is collected during the build as webpack entries and included in the Merchant Portal build as a chunk.
Those chunk names are taken from the module name and then transformed into a `kebab-case`.

General structure of the front-end modules in the Spryker Marketplace can be found in the [Module structure](/docs/marketplace/dev/front-end/project-structure.html#module-structure).

The front-end of the Merchant Portal is built using the following commands:

- default build
    ```bash
    yarn mp:build
    ```
 
- build in the watch mode
    ```bash
    yarn mp:build:watch
    ```

- production build
    ```bash
    yarn mp:build:production
    ```

