---
title: Download and Structure
description: Here you will find out how to download external dependencies and where to place them, together with your own asset files.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/download-structure
originalArticleId: d3f609fa-66c9-4727-bbaa-5c532e6fd356
redirect_from:
  - /2021080/docs/download-structure
  - /2021080/docs/en/download-structure
  - /docs/download-structure
  - /docs/en/download-structure
  - /v6/docs/download-structure
  - /v6/docs/en/download-structure
  - /v5/docs/download-structure
  - /v5/docs/en/download-structure
  - /v4/docs/download-structure
  - /v4/docs/en/download-structure
  - /v3/docs/download-structure
  - /v3/docs/en/download-structure
  - /v2/docs/download-structure
  - /v2/docs/en/download-structure
  - /v1/docs/download-structure
  - /v1/docs/en/download-structure
---

Here you will find out how to download external dependencies and where to place them, together with your own asset files.

{% info_block warningBox %}

This page contains references to the following tools: [Webpack](https://webpack.js.org/), [Oryx](/docs/scos/dev/front-end-development/zed/oryx-builder-overview-and-setup.html) (Our frontend helper tool)and Oryx for Zed (Zed's frontend full automation tool). Make sure you are familiar with these tools before continuing.

{% endinfo_block %}

## Yves
Yves UI must be implemented on project level.

### Dependencies
You can use the package manager that you prefer, but we strongly recommend to use `npm` or `yarn`.

### Creating/extending Yves
Yves come with themes: they are basically UI dresses.
You can create a new theme by creating a folder under `@project/assets/Yves` and placing your assets there.

Change the `@project/package.json` manifest file to manage all external dependencies.

```
npm install --save jquery bootstrap font-awesome # add yves direct dependencies
npm install --save-dev sass-loader node-sass # add build dev dependencies
```

## Zed
Zed UI can be extended on a project level.

### Core Dependencies
Each module that implements a UI may have external dependencies. They are declared in the corrisponding `@core/<module-name>/assets/Zed/pakage.json` manifest file. **Do not change this file** as it’s part of a core module. If you want to add a new dependency to Zed, see the [Download External Dependencies](/docs/scos/dev/legacy-demoshop/{{page.version}}/download-and-structure.html#core-dependencies)  section.

To download the module dependencies, you can use the package manager that you prefer, but we strongly recommend to use `npm` or `yarn`.

They will be eventually stored under the `@core/<module-name>/assets/Zed/node_modules` folder.

### Extending Zed
Zed has one theme only.

You can extend the Zed UI by creating `@project/assets.zed` and place your assets in there. Use `oryx-for-zed` to include and manage your code.

{% info_block infoBox "Gui module as default UI provider:" %}
Gui module manages all the dependencies needed in Zed. It provides the base structure for every module that implements a UI, and Zed Antelope configuration. **Be sure you have it in your project, otherwise Zed UI will not be available**.
{% endinfo_block %}

### Download External Dependencies
The best way to download all the external dependencies is by using `./setup -i|-zed`:

```
cd /path/to/your/project-root
./setup -i
```

Otherwise, use `npm` or `yarn`:

```
cd /path/to/your/project-root
npm install
```

```
cd /path/to/gui/module
npm install
```

```
cd /path/to/another/module
npm install
```
