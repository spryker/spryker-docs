---
title: Upgrade to Stylelint 16 and css-loader 6
description: Learn how you can upgrade to version 16 of Stylelint and upgrade to version 6 of css-loader for your spryker projects.
template: module-migration-guide-template
---

This document describes how to upgrade Styleling to v16 and css-loader to v6.

*Estimated migration time: 30m*

To upgrade Styleling to v16 and css-loader to v6, update configuration files:

1. In `package.json`, do the following:
   - Update or add dependencies and engines.
   - Adjust the commands.

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

3. In `frontend/configs/development.js`, update the webpack config: add the URL `false` option for `css-loader`:

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

4. In `frontend/configs/production.js`, update the webpack config by replacing `OptimizeCSSAssetsPlugin` with `CssMinimizerPlugin`:

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

5. In the `frontend/merchant-portal` folder, do the following:
   - Rename `stylelint.js` to `stylelint.mjs`.
   - In the file, change `commonjs require's` to `ES imports`.
   - Drop the `syntax` option.

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

6. In the `frontend/libs` folder, do the following:
   - Rename `stylelint.js` to `stylelint.mjs`.
   - In the file, change `commonjs require's` to `ES imports`.
   - Drop the `adjust lint options` option.

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

7. Add the `.stylelintrc.js` file with the following content to the root of the project:

```js
module.exports = {
    extends: ['stylelint-config-standard-scss', '@spryker/frontend-config.stylelint/.stylelintrc.json'],
    rules: {
        'scss/at-mixin-argumentless-call-parentheses': null,
        'scss/no-global-function-names': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'scss/at-if-no-null': null,
        'scss/dollar-variable-pattern': null,
        'color-hex-length': null,
        'scss/dollar-variable-empty-line-before': null,
        'scss/at-import-partial-extension': null,
        'selector-class-pattern': null,
        'scss/at-rule-conditional-no-parentheses': null,
        'scss/double-slash-comment-empty-line-before': null,
        'scss/operator-no-unspaced': null,
    },
};
```

8. In `.stylelintrc.mp.js`, add additional config to the `extends` option and disable multiple rules:

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
