---
title: Migration guide - Remove support of IE11
description: Use this guide to migrate the project from Yarn to NPM v8.
template: concept-topic-template
---

This document provides instructions for removing support of IE11 in your Spryker project.

## Overview

Microsoft dropped the support of IE11 in June 2022. So it has to be removed in Spryker.

*Estimated migration time: 1h*

## Update modules

Run the next command to update module versions:
```bash
composer update spryker/zed-ui spryker-shop/shop-ui
```

## Update configuration files

`.browserslistrc`:

Remove IE11 usage:
```text
IE 11
```

`frontend/configs/development.js`: 

1. Remove `buildVariantSettings` variable declaration and usage:
```js
const { buildVariantSettings } = require('../settings');
...
const { buildVariant, isES6Module } = buildVariantSettings;
```

2. Remove `es6PolyfillTs` variable declaration and usage:
```js
const es6PolyfillTs = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './es6-polyfill.ts');
...
'es6-polyfill': es6PolyfillTs,
```

3. Remove browsers support as it specified in the `.browserslistrc` file:
```js
browsers: [
    '> 1%',
    'ie >= 11',
],
```

```js
plugins: [
    autoprefixer({
        'browsers': ['> 1%', 'last 2 versions']
    })
]
// should be
plugins: [require('autoprefixer')],
```

4. Set `esmodules` property to `true` instead of using `isES6Module` variable:
```js
esmodules: isES6Module,
// should be 
esmodules: true,
```

5. Replace usage for the next conditions:
```js
filename: isES6Module ? `./js/${appSettings.name}.[name].js` : `./js/${appSettings.name}.[name].${buildVariant}.js`,
// should be 
filename: `./js/${appSettings.name}.[name].js`,
```

```js
...(!isES6Module ? ['@babel/plugin-transform-runtime'] : []),
// should be
['@babel/plugin-transform-runtime'],
```

```js
...(isES6Module ? getAssetsConfig(appSettings) : []),
// should be
...getAssetsConfig(appSettings),
```

6. Adjust `watchLifecycleEventNames` to use only `yves:watch` lifecycle event: 
```js
const watchLifecycleEventNames = ['yves:watch:esm', 'yves:watch:legacy'];
// should be
const watchLifecycleEventNames = ['yves:watch'];
```

`frontend/libs/command-line-parser.js`:

Remove `build determined module version` message: 
```js
.option('-m, --module <module>', 'build determined module version', globalSettings.buildVariants)
```

`frontend/libs/compiler.js`:

1. Remove import of `buildVariantSettings` variable:
```js
const { buildVariantSettings } = require('../settings');
```

2. Remove console command from the config section:
```js
const buildVariant = buildVariantSettings.buildVariant;

console.log(`${config.namespace} (${config.theme}) building ${buildVariant} modules for ${config.webpack.mode}...`);
```

`frontend/settings.js`:

1. Remove build variants:
```js
buildVariants: {
    esm: 'esm',
    legacy: 'legacy',
},
```

```js
const buildVariantArray = process.argv.filter(argv => argv.includes('module'));
const buildVariant = buildVariantArray.length ? buildVariantArray[0].replace('module:', '') : '';

const buildVariantSettings = {
    buildVariant,
    isES6Module: buildVariant === globalSettings.buildVariants.esm,
};
```

2. Remove `buildVariantSettings` variable export:
```js
module.exports = {
    ...,
    buildVariantSettings,
};
```

`src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`: 

Remove all IE11 related polyfills from the `vendor.ts`.

{% info_block infoBox %}

`es6-polyfill.ts` file was removed because all polyfills were specified in the `vendor.ts`.

{% endinfo_block %}

## Update templates

`src/Pyz/Yves/ShopUi/Theme/default/templates/page-blank/page-blank.twig`:

Remove `isNewFrontendBuildSupported` variable from the `template` block:
```twig
{%- raw -%}
{% block template %}
    {% set isNewFrontendBuildSupported = true %}

    ...
{% endblock %}
{% endraw %}
```

`src/Pyz/Zed/ZedUi/Presentation/Layout/layout.twig`:

Create `layout.twig` template with the next content:
```twig
{%- raw -%}
{% extends '@Spryker:ZedUi/Layout/layout.twig' %}

{% block template %}
    {% set importConfig = importConfig | merge({ isDifferentialMode: false }) %}

    {{ parent() }}
{% endblock %}
{% endraw %}
```

## Update package.json

`package.json`:

1. Update YVES build commands to: 
```json
"yves": "node ./frontend/build development",
"yves:watch": "node ./frontend/build development-watch",
"yves:production": "node ./frontend/build production",
```

2. Remove IE11 related dependencies:
```json
"classlist-polyfill",
"date-input-polyfill",
"element-closest",
"element-remove",
"intersection-observer",
"string.prototype.startswith",
"whatwg-fetch",
```

3. Update `autoprefixer` dependency:
```json
"autoprefixer": "~9.8.8",
```

## Install and build

### Via Docker

1. Install dependencies:
```bash
docker/sdk cli npm i 
```

2. Build the project assets:
```bash
docker/sdk up --assets 
```

### Locally

1. Install dependencies:
```bash
npm install 
```

2. Build the project assets:
```bash
npm run yves
npm run zed
npm run mp:build
```
