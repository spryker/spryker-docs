---
title: Oryx for Zed
originalLink: https://documentation.spryker.com/v4/docs/oryx-for-zed
redirect_from:
  - /v4/docs/oryx-for-zed
  - /v4/docs/en/oryx-for-zed
---

## Introduction

`oryx-for-zed` is an extension of Oryx that performs a full build for Spryker Zed UI applications. It also provides access to Zed settings and Zed webpack configuration, so you can extend/change the whole building process.

### Requirements

* `nodejs` version 6.x LTS
* `npm` version  >= 3.x or `yarn` version  >= 0.19.x

### Setup

You need to add `oryx-for-zed` to your `package.json`:
Open the terminal, go to your project root folder and type:

```bash
npm install @spryker/oryx-for-zed --save-dev
# or 
yarn add @spryker/oryx-for-zed --dev
```

{% info_block warningBox %}
oryx-for-zed comes with a peer dependency: `oryx` version  >= 1.x
{% endinfo_block %}

## Usage

Once installed, you can:

* call the builder directly from your scripts (simple builder)
* extend/change the settings/webpack configuration for your custom Zed build

### Simple builder

The following section describes how to run run oryx-for-zed.
To run run oryx-for-zed

Add the following script to your `package.json`:

```json
{
    "scripts": {
        "zed": "node ./node_modules/@spryker/oryx-for-zed/build"
    }
}

```
Open the terminal and type:

```
npm run build-zed
# or 
yarn run build-zed
```

### Extend/change settings

Settings are extended and changed by using the onyx-for-zed [API](https://documentation.spryker.com/v4/docs/oryx-for-zed#api).

The example below shows how to create a cuostm build:

**Step 1:** `build.js`
Create a `build.js` file in your project containing your custom settings and the logic needed to get the webpack configuration and run the builder:

```bash
const oryx = require('@spryker/oryx');
const oryxForZed = require('@spryker/oryx-for-zed');

const myCustomZedSettings = Object.assign({}, oryxForZed.settings, {
    // your own settings
});

oryxForZed.getConfiguration(myCustomZedSettings).then(configuration => oryx.build(configuration));

```

**Step 2:** `package.json` 
Add a script into your `package.json` pointing to `build.js`.

```json
{
    "scripts": {
        "build-zed": "node ./path/to/build"
    }
}
```
You will now be able to…

### Extend/change webpack configuration
`webpack` is customised by using the `onyx-for-zed` [API](https://documentation.spryker.com/v4/docs/oryx-for-zed#api). 
The example below shows how to create a custom build:

**Step 1:** `webpack.config.js`
Create a `webpack.config.js` file in your project containing your webpack custom configuration:

```
const oryxForZed = require('@spryker/oryx-for-zed');
async function myCustomZedConfiguration() {
    const oryxConfiguration = await oryxForZed.getConfiguration(oryxForZed.settings);

    return Object.assign({}, oryxConfiguration, {
        // your own configuration
    });
}
```

**Step 2:** `build.js`

Create a `build.js` file in your project containing your webpack configuration and the logic needed to run the builder:

```
const oryx = require('@spryker/oryx');
const myCustomZedConfiguration = require('./webpack.config.js');

myCustomZedConfiguration().then(configuration => oryx.build(configuration));
```

**Step 3**: `package.json`
Add a script into your `package.json` pointing to `build.js`.

```json
{
    "scripts": {
        "build-zed": "node ./path/to/build"
    }
}
```

## API
### Settings

```
oryxForZed.settings
```

Contains all the basic settings used in the webpack configuration. Go to the code for more details.

### getConfiguration()
oryxForZed.getConfiguration(settings)
Returns a promise with the default Zed webpack configuration, based on provided settings.

Go to the code for more details.

### CLI args
`oryx-for-zed`1 uses arguments to customise the build process.

You can pass them using the terminal:

```
npm run zed -- --arg
# or 
yarn run zed -- --arg
```

Or embed them into the script section in `package.json`:

```json
{
    "scripts": {
        "build-zed": "node ./node_modules/@spryker/oryx-for-zed/build --arg"
    }
}
```

Args list

* `--dev`: development mode; enable `webpack` watchers on the code
* `--prod`: production mode; enable assets optimisation/compression
* `--boost`: boost mode (experimental); build assets using eval source maps

If no arg is passed, development is activated but without watchers.
