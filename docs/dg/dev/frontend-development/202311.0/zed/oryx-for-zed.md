---
title: Oryx for Zed
description: oryx-for-zed is a tool that performs a full build for Spryker Zed UI applications.
last_updated: May 15, 2023
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/oryx-for-zed
originalArticleId: 7bb2b280-f309-4bd4-b7cd-d5c30b345cc0
redirect_from:
  - /docs/scos/dev/front-end-development/202311.0/zed/oryx-for-zed.html
  - /docs/scos/dev/front-end-development/zed/oryx-for-zed.html
---


`oryx-for-zed` is a tool that performs a full build for Spryker Zed UI applications. It also provides access to Zed settings and Zed Webpack configuration, so you can extend and change the whole building process.

{% info_block warningBox "Oryx framework" %}

`Oryx` and `oryx-for-zed` should not be confused with the [Oryx frontend framework](/docs/dg/dev/frontend-development/{{page.version}}/oryx/oryx.html) that is used to create composable frontend applications.

{% endinfo_block %}

## Requirements

- [Node.js](https://nodejs.org/en/download/package-manager): minimum version is 18.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/): minimum version is 9.

{% info_block infoBox "Note" %}

`oryx-for-zed` starting from `2.13.0` version requires `spryker/chart` module version `1.4.0` or higher.

{% endinfo_block %}

## Setup

You need to add `oryx-for-zed` to your `package.json`. Open the terminal, go to your project root folder, and type:

```bash
npm install @spryker/oryx-for-zed --save-dev
```

## Usage

Once installed, you can do the following actions:

- Call the builder directly from your scripts (simple builder).
- Extend or change the settings and Webpack configuration for your custom Zed build.

## Simple builder

To run `oryx-for-zed`, follow the steps:

1. Add the following script to your `package.json`:

```json
{
  "scripts": {
    "build-zed": "node ./node_modules/@spryker/oryx-for-zed/build"
  }
}
```

2. Open the terminal and type:

```bash
npm run build-zed
```

## Extend or change the settings

Settings are extended and changed by using the `oryx-for-zed` [API](/docs/dg/dev/frontend-development/{{page.version}}/zed/oryx-for-zed.html#api).

The following example shows how to create a custom build:

1. In your project containing your custom settings and the logic needed to get the Webpack configuration, create a `build.js` file and run the builder:

```js
const oryxForZed = require("@spryker/oryx-for-zed");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");

const mergeWithStrategy = mergeWithCustomize({
  customizeObject: customizeObject({
    plugins: "prepend",
  }),
});

const myCustomZedSettings = mergeWithStrategy(oryxForZed.settings, {
  // your own settings
});

oryxForZed
  .getConfiguration(myCustomZedSettings)
  .then((configuration) =>
    oryxForZed.build(configuration, oryxForZed.copyAssets)
  )
  .catch((error) =>
    console.error("An error occurred while creating configuration", error)
  );
```

2. Add a script into your `package.json` pointing to `build.js`:

```json
{
  "scripts": {
    "build-zed": "node ./path/to/build"
  }
}
```

You will now be able to…

## Extend and change the Webpack configuration

`webpack` is customized by using the `oryx-for-zed` [API](/docs/dg/dev/frontend-development/{{page.version}}/zed/oryx-for-zed.html#api).

The following example shows how to create a custom build:

1. In your project containing your Webpack custom configuration, create a `webpack.config.js` file:

```js
const oryxForZed = require("@spryker/oryx-for-zed");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");

const mergeWithStrategy = mergeWithCustomize({
  customizeObject: customizeObject({
    plugins: "prepend",
  }),
});

async function myCustomZedConfiguration() {
  const oryxConfiguration = await oryxForZed.getConfiguration(
    oryxForZed.settings
  );

  return mergeWithStrategy(oryxConfiguration, {
    // your own configuration
  });
}
```

2. In your project containing your Webpack configuration and the logic needed to run the builder, create a `build.js` file:

```js
const oryxForZed = require("@spryker/oryx-for-zed");
const myCustomZedConfiguration = require("./webpack.config.js");

myCustomZedConfiguration()
  .then((configuration) =>
    oryxForZed.build(configuration, oryxForZed.copyAssets)
  )
  .catch((error) =>
    console.error("An error occurred while creating configuration", error)
  );
```

3. Add a script into your `package.json` pointing to `build.js`:

```json
{
  "scripts": {
    "build-zed": "node ./path/to/build"
  }
}
```

## API

This section describes API settings.

### Settings

```js
oryxForZed.settings;
```

Contains all the basic settings used in the Webpack configuration. Go to the code for more details.

### getConfiguration()

```js
oryxForZed.getConfiguration(settings);
```

Returns a promise with the default Zed Webpack configuration, based on provided settings.
Go to the code for more details.

### build()

```js
oryxForZed.build(configuration, callback);
```

Builds assets using `webpack` and prints a formatted terminal output. This function is just a wrapper for `webpack(configuration, callback)`:

- `configuration {object}`: Webpack configuration file.
- `callback(error, stats) {function} [optional]`: Function called once Webpack build task is completed.

### copyAssets()

```js
oryxForZed.copyAssets();
```

Copies public assets to `Zed` folder for backward compatibility only.

### CLI args

`oryx-for-zed` uses arguments to customize the build process.
You can pass them using the terminal:

```bash
npm run zed -- --arg
```

Or embed them into the script section in `package.json`:

```json
{
  "scripts": {
    "build-zed": "node ./node_modules/@spryker/oryx-for-zed/build --arg"
  }
}
```

### Args list

- `--dev`: Development mode; enable `webpack` watchers on the code
- `--prod`: Production mode; enable assets optimization/compression
- `--boost`: Boost mode (experimental); build assets using eval source maps

If no arg is passed, development is activated but without watchers.
