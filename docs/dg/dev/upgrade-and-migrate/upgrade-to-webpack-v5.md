---
title: Upgrade to Webpack v5
description: Use the guide to update versions of the Webpack to Version 5 and related modules for your Spryker projects.
last_updated: Jan 12, 2023
template: module-migration-guide-template
redirect_from:
  - /docs/scos/dev/front-end-development/migration-guide-upgrade-to-webpack-v5.html
  - /docs/scos/dev/front-end-development/202311.0/migration-guide-upgrade-to-webpack-v5.html

---

## Upgrading Webpack from version 4.* to version 5.*

This document provides instructions for upgrading Webpack to version 5 in your Spryker project.

## Overview

The Webpack v5 was released two years ago.
To unblock future upgrades of other dependencies, we need to migrate as well.

*Estimated migration time: 1h*

## 1) Update dependencies

1. In `package.json`, update the following dependencies to the new version:

```json
{
    "clean-webpack-plugin": "~4.0.0",
    "compression-webpack-plugin": "~10.0.0",
    "copy-webpack-plugin": "~11.0.0",
    "mini-css-extract-plugin": "~2.7.2",
    "optimize-css-assets-webpack-plugin": "~6.0.1",
    "postcss": "~8.4.20",
    "terser-webpack-plugin": "~5.3.6",
    "webpack": "~5.74.0",
    "webpack-merge": "~5.8.0"
}
```

   - If Merchant Portal is used:

        ```json
        {
            "@types/webpack": "~5.28.0"
        }
        ```

2. Update and install package dependencies:

```bash
rm -rf node_modules
npm install
```

{% info_block warningBox "Verification" %}

Ensure that the `package-lock.json` file and the `node_modules` folder have been updated.

{% endinfo_block %}

## 2) Update configuration files

To update configuration files, make the following changes:

1. Adjust `frontend/configs/development-watch.js`:

```js
const merge = require('webpack-merge');
// must be
const { merge } = require('webpack-merge');
```

2. In `frontend/configs/development.js`, do the following:
   - Rename the `jsonpFunction` property to the `chunkLoadingGlobal` of the `output` object.
   - Rename the `vendors` property to the `defaultVendors` of the `cacheGroups` object.

3. In `frontend/configs/production.js`, make the following changes:

```js
const merge = require('webpack-merge');
// must be
const { mergeWithCustomize, customizeObject } = require('webpack-merge');
```

```js
const mergeWithStrategy = merge.smartStrategy({
    plugins: 'prepend',
});
// must be
const mergeWithStrategy = mergeWithCustomize({
    customizeObject: customizeObject({
        plugins: 'prepend',
    })
});
```

```js
plugins: [
    new CompressionPlugin({
        filename: '[path].gz[query]',
    }),

    new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$|\.css$|\.svg$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
]
// must be
plugins: [
    new CompressionPlugin({
        filename: '[path][base].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
    }),
]
```

In the `new TerserPlugin({ ... })` minimizer plugin, remove the `cache` property.

4. In `frontend/libs/assets-configurator.js`, make the following changes:

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// must be
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
```

```js
const getCopyConfig = (appSettings) =>
    Object.values(appSettings.paths.assets).reduce((copyConfig, assetsPath) => {
        if (fs.existsSync(assetsPath)) {
            copyConfig.push({
                from: assetsPath,
                to: '.',
                ignore: ['*.gitkeep'],
            });
        }

        return copyConfig;
    }, []);
// must be
const getCopyConfig = (appSettings) =>
    Object.values(appSettings.paths.assets).reduce((copyConfig, assetsPath) => {
        if (fs.existsSync(assetsPath)) {
            copyConfig.push({
                from: assetsPath,
                to: '.',
                context: appSettings.context,
                globOptions: {
                    dot: true,
                    ignore: ['**/.gitkeep'],
                },
                noErrorOnMissing: true,
            });
        }

        return copyConfig;
    }, []);
```

```js
const getCopyStaticConfig = (appSettings) => {
    const staticAssetsPath = appSettings.paths.assets.staticAssets;

    if (fs.existsSync(staticAssetsPath)) {
        return [
            {
                from: staticAssetsPath,
                to: appSettings.paths.publicStatic,
            },
        ];
    }

    return [];
};
// must be
const getCopyStaticConfig = (appSettings) => {
    const staticAssetsPath = appSettings.paths.assets.staticAssets;

    if (fs.existsSync(staticAssetsPath)) {
        return [
            {
                from: staticAssetsPath,
                to: appSettings.paths.publicStatic,
                context: appSettings.context,
            },
        ];
    }

    return [];
};
```

```js
const getAssetsConfig = (appSettings) => [
    new CleanWebpackPlugin(
        [
            appSettings.paths.public,
            appSettings.paths.publicStatic,
        ],
        {
            root: appSettings.context,
            verbose: true,
            beforeEmit: true,
        }
    ),

    new CopyWebpackPlugin(getCopyConfig(appSettings), {
        context: appSettings.context,
    }),

    new CopyWebpackPlugin(getCopyStaticConfig(appSettings), {
        context: appSettings.context,
    }),
];
// must be
const getAssetsConfig = (appSettings) => [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            appSettings.paths.public,
            appSettings.paths.publicStatic,
        ],
        verbose: true,
    }),

    new CopyPlugin({
        patterns: getCopyConfig(appSettings),
    }),

    new CopyPlugin({
        patterns: getCopyStaticConfig(appSettings),
    }),
];
```

## 3) Build assets

Check correct builds for all layers `Yves`, `Zed`, and `MP` (if Merchant Portal is used), including `watch` and `production` modes:

1. `Yves`:

```bash
npm run yves
npm run yves:production
npm run yves:watch
```

2. `Zed`:

```bash
npm run zed
npm run zed:production
npm run zed:watch
   ```

3. `MP` (If Merchant Portal is used):

```bash
npm run mp:build
npm run mp:build:production
npm run mp:build:watch
```

{% info_block infoBox "Note" %}

For more information, see the official [Webpack Migration guide](https://webpack.js.org/migrate/5/).

{% endinfo_block %}
