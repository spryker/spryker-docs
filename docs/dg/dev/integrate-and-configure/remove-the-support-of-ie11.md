---
title: Remove the support of IE11
last_updated: Aug 31, 2022
description: This document shows how to remove the support of IE11 in your Spryker based project.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/front-end-development/migration-guide-remove-support-of-ie11.html
  - /docs/scos/dev/front-end-development/202311.0/migration-guide-remove-support-of-ie11.html

---

This document provides instructions for removing support of IE11 in your Spryker project.

## Overview

Microsoft stopped the support of IE11 in June 2022. So it must be removed in Spryker.

*Estimated migration time: 1h*

## Update modules

Update module versions:

```bash
composer update spryker/zed-ui spryker-shop/shop-ui
```

## Update configuration files

Update the following configuration files:

### Update `.browserslistrc`

Remove IE11 usage:
```text
IE 11
```

### Update `frontend/configs/development.js`

1. Remove the `buildVariantSettings` variable declaration and usage:
```js
const { buildVariantSettings } = require('../settings');
...
const { buildVariant, isES6Module } = buildVariantSettings;
```

2. Remove the `es6PolyfillTs` variable declaration and usage:
```js
const es6PolyfillTs = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './es6-polyfill.ts');
...
'es6-polyfill': es6PolyfillTs,
```

3. Remove browsers support as specified in the `.browserslistrc` file:
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
// must be
plugins: [require('autoprefixer')],
```

{% info_block warningBox %}

Remove the `autoprefixer` import at the top of the file.

{% endinfo_block %}


4. Set the `esmodules` property to `true` instead of using the `isES6Module` variable:
```js
esmodules: isES6Module,
// must be
esmodules: true,
```

5. Replace usage for the following conditions:
```js
filename: isES6Module ? `./js/${appSettings.name}.[name].js` : `./js/${appSettings.name}.[name].${buildVariant}.js`,
// must be
filename: `./js/${appSettings.name}.[name].js`,
```

```js
...(!isES6Module ? ['@babel/plugin-transform-runtime'] : []),
// must be
['@babel/plugin-transform-runtime'],
```

```js
...(isES6Module ? getAssetsConfig(appSettings) : []),
// must be
...getAssetsConfig(appSettings),
```

6. Adjust `watchLifecycleEventNames` to use only the `yves:watch` lifecycle event:
```js
const watchLifecycleEventNames = ['yves:watch:esm', 'yves:watch:legacy'];
// must be
const watchLifecycleEventNames = ['yves:watch'];
```

### Update `frontend/libs/command-line-parser.js`

Remove the `build determined module version` message:
```js
.option('-m, --module <module>', 'build determined module version', globalSettings.buildVariants)
```

### Update `frontend/libs/compiler.js`

1. Remove import of the `buildVariantSettings` variable:
```js
const { buildVariantSettings } = require('../settings');
```

2. Remove the console command from the config section:
```js
const buildVariant = buildVariantSettings.buildVariant;

console.log(`${config.namespace} (${config.theme}) building ${buildVariant} modules for ${config.webpack.mode}...`);
```

### Update `frontend/settings.js`

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

### Update `src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`

Remove all IE11-related polyfills from `vendor.ts`.

{% info_block infoBox %}

The `es6-polyfill.ts` file was removed because all polyfills were specified in `vendor.ts`.

{% endinfo_block %}

## Update templates

1. In `src/Pyz/Yves/ShopUi/Theme/default/templates/page-blank/page-blank.twig`, remove the `isNewFrontendBuildSupported` variable from the `template` block:

```twig
{%- raw -%}
{% block template %}
    {% set isNewFrontendBuildSupported = true %}

    ...
{% endblock %}
{% endraw %}
```

2. Create the `src/Pyz/Zed/ZedUi/Presentation/Layout/layout.twig` template with the following content:

```twig
{%- raw -%}
{% extends '@Spryker:ZedUi/Layout/layout.twig' %}

{% block template %}
    {% set importConfig = importConfig | merge({ isDifferentialMode: false }) %}

    {{ parent() }}
{% endblock %}
{% endraw %}
```

## Update `package.json`

1. Update YVES build commands to the following:
```json
"yves": "node ./frontend/build development",
"yves:watch": "node ./frontend/build development-watch",
"yves:production": "node ./frontend/build production",
```

2. Remove IE11-related dependencies:
```json
"@webcomponents/custom-elements",
"@webcomponents/webcomponents-platform",
"@webcomponents/webcomponentsjs",
"classlist-polyfill",
"date-input-polyfill",
"element-closest",
"element-remove",
"intersection-observer",
"string.prototype.startswith",
"whatwg-fetch",
```

3. Update the `autoprefixer` dependency:
```json
"autoprefixer": "~9.8.8",
```

## Install and build using Docker

1. Install dependencies:
```bash
docker/sdk cli npm i
```

2. Build the project assets:
```bash
docker/sdk up --assets
```

## Install and build locally

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
