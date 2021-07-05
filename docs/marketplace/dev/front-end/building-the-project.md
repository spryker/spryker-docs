---
title: Building the project
description: This article provides details about the building up Merchant Portal.
template: concept-topic-template
---


This article provides details about the building up Merchant Portal.

## Overview
Spryker uses [webpack](https://webpack.js.org/guides/getting-started/) to build Frontend.
At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes application, 
it internally builds a dependency graph which maps every module that project needs and generates one or more bundles.
- All related configs are located in the `/frontend/merchant-portal` folder. 
- All builded Frontend stuff (css, fonts, images, js) are located in the `/public/Backoffice/assets` folder.

Merchant Portal is splited by composer modules and has it’s own pieces of application in the form of an Angular Module with Angular+Web Components.
A general structure of every Frontend module in the Spryker Marketplace:

- MODULE_NAME
  - src/Spryker/Zed/MODULE_NAME
    - Presentation - this is the namespace where the marketplace front-end-related files are located.
      - Components — all Angular files are located here.
        - entry.ts — registers all Angular NgModules via `registerNgModule` from `@mp/zed-ui/app/registry`
        - app—contains Angular components and services.
          - components.module.ts — an Angular NgModule with components, such as web components (extends `WebComponentsModule` from @spryker/web-components).
        - public-api — exports all public components / modules / services / types / tokens.
      - TWIG_FOLDER — a folder with twig view.
  - mp.public-api.ts — exports the public-api file.
  - package.json — adds `MODULE_NAME` specific packages.
  
List the commands to build the Merchant Portal Frontend: 
- `npm run mp:build` - for build
- `npm run mp:build:watch` - for build in the watch mode
- `npm run mp:build:production` - for production build
