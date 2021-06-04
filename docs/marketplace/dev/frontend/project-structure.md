---
title: { Meta name }
description: { Meta description }
template: concept-topic-template
---

# Project structure

<!---Concept topics explain background information and provide context-specific knowledge on a particular topic. The goal of a concept article is to help readers understand a task or a feature. Make sure you create separate pages for major topics.
-->

## Alias

To import vendor angular component/module/service to js file use `@mp/spryker-module-name` alias with proper spryker module name. e.g i`mport { registerNgModule } from '@mp/zed-ui'`;

## Module Structure

- MODULE_NAME
  - src/Spryker/Zed/MODULE_NAME
    - Presentation - This is the namespace where the marketplace front-end-related files are located
      - Components - All Angular files here
        - entry.ts - Registers all Angular NgModules via registerNgModule from @mp/zed-ui/app/registry
        - app - Angular components and services
          - components.module.ts - Angular NgModule with components, such as web components (extends CustomElementModule from @spryker/web-components)
        - public-api - Exports all public components/modules/services/types/tokens
      - TWIG_FOLDER - Folder with twig view
  - mp.public-api.ts - Exports public-api file
  - package.json - Adds MODULE_NAME specific packages

## Main Entry Points

- ZedUi (Project)
  - Presentation
    - Components
      - app
        - app.module.ts - module with the default configuration modules and bootstrap for the web-components
      - assets - all assets can be located here
      - environment - folder contains the base configuration file, environment.ts
      - index.html - entry for html file in the angular.json (not used for spryker needs, exists for config only)
      - main.ts - compiles the web-app and bootstraps the AppModule to run in the browser
      - polyfills.ts - used to provide modern functionality for older browsers that do not natively support it
      - styles.less - extends global styles
