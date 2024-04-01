---
title: Upgrade to Stylelint 16 and css-loader 6
description: Use the guide to update versions of the Stylelint and css-loader.
template: module-migration-guide-template
---

This document provides instructions for upgrading Styleling to v16 and css-loader to v6.

*Estimated migration time: 30m*

## Update configuration files

1. In `package.json`, update or add dependencies and engines and adjust commands:

```json
{
  "scripts": {
    "yves:stylelint": "node ./frontend/libs/stylelint.mjs",
    "yves:stylelint:fix": "node ./frontend/libs/stylelint.mjs --fix",
  },
  "devDependencies": {
        "css-loader": "~6.10.0",
        "css-minimizer-webpack-plugin": "~6.0.0",
        "@spryker/oryx-for-zed": "~3.4.2",
        "stylelint": "~16.2.1",
        "stylelint-config-standard-less": "~3.0.1",
        "stylelint-config-standard-scss": "^13.0.0",
  }
}
```

Update and install package dependencies:

```bash
rm -rf node_modules
npm install
```

2. In `package.json`, remove the dependency:

```json
    "optimize-css-assets-webpack-plugin": "x.x.x"
```

3. In `frontend/configs/development.js`, update the webpack config: add url `false` option for `css-loader`.

```js
....
    {
        loader: 'css-loader',
        options: {
            url: false,
            importLoaders: 1,
        },
    },
....
```

3. In `frontend/configs/production.js`, update the webpack config: replace `OptimizeCSSAssetsPlugin` to `CssMinimizerPlugin`.

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

{
  ....
    minimizer: [
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true },
                    },
                ],
            },
        }),
    ],
  ....
}
```

4. Rename `stylelint.js` into `stylelint.mjs` in `frontend/merchant-portal` folder and change inside file commonjs require's to es imports and drop `syntax` option.

```js
import commandLineParser from 'commander';
import stylelint from 'stylelint';
import { ROOT_DIR, ROOT_SPRYKER_PROJECT_DIR } from './mp-paths.js';

stylelint
    .lint({
        ...,
        /* syntax: 'less', */ <= Delete it
        ...,
    })
```

5. Rename `stylelint.js` into `stylelint.mjs` in `frontend/libs` folder and change inside file commonjs require's to es imports and drop adjust lint options option.

```js
import commandLineParser from 'commander';
import stylelint from 'stylelint';
import { globalSettings } from '../settings.js';

stylelint
    .lint({
        ...,
        configFile: `${globalSettings.context}/.stylelintrc.js`,
        /* syntax: 'scss', */ <= Delete it
        ...,
    })
```

6. Add in the root of the project `.stylelintrc.js` file with following content.

```js
module.exports = {
    extends: ['stylelint-config-standard-scss', '@spryker/frontend-config.stylelint/.stylelintrc.json'],
    rules: {
        'scss/at-mixin-argumentless-call-parentheses': null,
        'scss/no-global-function-names': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'scss/at-if-no-null': null,
        'scss/dollar-variable-pattern': null,
        'color-hex-length': 'long',
        'scss/dollar-variable-empty-line-before': null,
        'scss/at-import-partial-extension': null,
    },
};
```

7. In `.stylelintrc.mp.js` add additional config into extends option and disable multiple rules:

```json
module.exports = {
    ....,
    extends: ['stylelint-config-standard-less', ....],
    rules: {
        ....,
        'selector-class-pattern': null,
        'less/no-duplicate-variables': null,
        'less/color-no-invalid-hex': null,
    }
}
```