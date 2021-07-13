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
Every module has an entry point called `entry.ts` that will be collected during the build as webpack entries and included as a chunk in the Merchant Portal build.
Those chunk names are taken from the module name and then transformed to a `kebab-case`.
A general structure of every Frontend module in the Spryker Marketplace is available [here](/docs/marketplace/dev/front-end/project-structure.html#module-structure).
  
List the commands to build the Merchant Portal Frontend: 
- `npm run mp:build` - for build
- `npm run mp:build:watch` - for build in the watch mode
- `npm run mp:build:production` - for production build
