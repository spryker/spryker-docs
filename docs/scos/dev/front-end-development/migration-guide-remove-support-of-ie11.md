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

1. Remove import of `es6-polyfill` file: 
```js
'es6-polyfill': es6PolyfillTs,
```

2. Remove browsers support as it specified in the `.browserslistrc` file:
```js
browsers: [
    '> 1%',
    'ie >= 11',
],
```

3. Remove `isES6Module` usage from conditions, like: 
```js
isES6Module ? `./js/${appSettings.name}.[name].js` : `./js/${appSettings.name}.[name].${buildVariant}.js`,
    
...

...(!isES6Module ? ['@babel/plugin-transform-runtime'] : []),
    
...

...(isES6Module ? getAssetsConfig(appSettings) : []),
```

`frontend/libs/command-line-parser.js`:

Remove `build determined module version` message: 
```js
.option('-m, --module <module>', 'build determined module version', globalSettings.buildVariants)
```

`frontend/libs/compiler.js`:

Remove console command from the config section:
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
"classlist-polyfill": "~1.2.0",
"date-input-polyfill": "~2.14.0",
"element-closest": "~3.0.0",
"element-remove": "~1.0.4",
"intersection-observer": "~0.10.0",
"string.prototype.startswith": "~0.2.0",
"whatwg-fetch": "~3.4.0",
```

3. Update `autoprefixer` dependency:
```json
"autoprefixer": "~9.8.8",
```

## Install and build

1. Install dependencies:
```bash
npm install 
```

2. Build the project:
```bash
npm run yves
npm run zed
npm run mp:build
```
