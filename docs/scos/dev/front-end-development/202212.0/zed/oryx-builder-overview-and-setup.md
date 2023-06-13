---
title: Oryx builder overview and setup
description: Oryx is the Spryker projects frontend helper. The purpose of Oryx is to simplify the asset building process, giving developers the freedom to choose and configure the preprocessors for the frontend.
last_updated: Apr 3, 2023
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/oryx
originalArticleId: 466d3f47-f666-4e78-9a16-65afb3d615b7
redirect_from:
  - /2021080/docs/oryx
  - /2021080/docs/en/oryx
  - /docs/oryx
  - /docs/en/oryx
  - /v6/docs/oryx
  - /v6/docs/en/oryx
  - /v5/docs/oryx
  - /v5/docs/en/oryx
  - /v4/docs/oryx
  - /v4/docs/en/oryx
  - /v3/docs/oryx
  - /v3/docs/en/oryx
  - /v2/docs/oryx
  - /v2/docs/en/oryx
  - /v1/docs/oryx
  - /v1/docs/en/oryx
  - /docs/scos/dev/front-end-development/zed/oryx-builder-overview-and-setup.html
related:
  - title: Oryx for Zed
    link: docs/scos/dev/front-end-development/page.version/zed/oryx-for-zed.html
---

{% info_block warningBox "No longer supported" %}

This package is no longer supported. All functionality has been moved to [Oryx for Zed](/docs/scos/dev/front-end-development/{{page.version}}/zed/oryx-for-zed.html) starting from **2.13.0** version.

{% endinfo_block %}

Oryx is the Spryker projects frontend helper. The purpose of Oryx is to simplify the asset building process, giving developers the freedom to choose and configure the preprocessors for the frontend.

Oryx relies on Webpack 2.

{% info_block warningBox "Oryx for Zed" %}

If you're looking for Oryx Zed dedicated solution, see [Oryx for Zed](/docs/scos/dev/front-end-development/{{page.version}}/zed/oryx-for-zed.html).

{% endinfo_block %}

### Requirements

Before installing Oryx, make sure that you have the following:

* Node.js version 6.x LTS
* npm version >= 3.x or yarn version >= 0.19.x

### Setup

To install and setup Oryx, you need to add it to your project’s root folder `package.json`.

**To add Oryx to your package.json:**

Open the terminal, go to your project root folder and type:

```
npm install @spryker/oryx --save-dev
# or
yarn add @spryker/oryx --dev
```

{% info_block warningBox %}

Oryx comes with a peer dependency - Webpack version >= 2.x (needed when you build assets using Oryx api).

{% endinfo_block %}

## Usage

Once installed, Oryx can be used to enrich your Webpack configuration and to programmatically execute Webpack (with a formatted terminal output).

The following example shows a basic Oryx integration with `webpack`.

### webpack.config.js

Use Oryx to find Spryker Yves core entry points and add them to your configuration. The following `entrySettings` constant defines where to search for them (`dirs`), which patterns to adopt to spot them (`patterns`), the description to log in the terminal (description) and how to name the entry points (`defineName(path)`).

To configure Oryx to look for your own entry points, change the settings accordingly or add them directly as you always do with Webpack. As the "find entry points" function is working an asynchronous mode, it is necessary to create an asynchronous configuration function which would resolve the entry points promises (see example below).

```
const oryx = require('@spryker/oryx');

const entrySettings = {
    dirs: [path.resolve('vendor/spryker')],
    patterns: ['**/Yves/**/*.entry.js'],
    description: 'looking for entry points...',
    defineName: fullPath => path.basename(fullPath, '.entry.js')
}

async function getConfiguration() {
    const entryPaths = await oryx.find(settings.entry, {
        // your project entry points go here
        'app': './path/to/app',
        'commons': './path/to/commons'
  });

    const webpackConfiguration = {
        // ...
        entry: entryPaths,
        // ...
    }

    return webpackConfiguration;
}

module.exports = getConfiguration;
```

### build.js

This file contains the programmatic call to Webpack using the `oryx.build()` function. Oryx will take care of printing a minimal log in the terminal console.

```js
const oryx = require('@spryker/oryx');
const getConfiguration = require('./webpack.config.js');

getConfiguration()
    .then(configuration => oryx.build(configuration))
    .catch(error => console.error('An error occurred while creating configuration', error));
```

### package.json

Add a script into your `package.json` pointing to `build.js`.

```js
{
    "scripts": {
        "yves": "node ./path/to/yves/frontend/build"
    }
}
```

You can now run your script directly from the terminal console.

```
npm run yves
# or
yarn run yves
```

## API

### find()

```js
oryx.find(settings, [initial])
```

Performs a glob search in the provided directories, using the provided patterns and returns all the matching paths as an object {name-path}, or as an array (path array). oryx.find() works in the asynchronous mode and returns a promise.

* `settings {object}`:
    * `dirs {array[string]}`: directories in which to search
    * `patterns {array[string]}`: glob patterns to apply to the search
    * `glob {object} [optional]`: glob system configuration (for the available options, click here)
    * `description {string} [optional]`: text to log in terminal
    * `defineName(path) {function} [optional]`: define the name in returned {name-path} object
* `initial {object|array}`: initial value

If `initial` is an object (or `undefined`, `null`), the `find` will return an extended {name-path} object:

* name: filename (or `defineName(path)` returned value)
* path: matching absolute path

If `initial` is an array, the find function will return an extended array of matching absolute paths. In this case, `defineName(path)` function won’t be called.

**Example**: Yves entry default configuration

```bash
const entrySettings = {
    dirs: [path.resolve('vendor/spryker')],
    patterns: ['**/Yves/**/*.entry.js'],
    glob: {},
    description: 'looking for entry points...',
    defineName: fullPath => path.basename(fullPath, '.entry.js')
}
```

### build()

```js
oryx.build(configuration, [callback])
```

Build the assets using `webpack` and print a formatted terminal output. This function is just a wrapper for `webpack(configuration, callback)`:

* `configuration {object}`: Webpack configuration file
* `callback(error, stats) {function} [optional]`: function called once Webpack build task is completed

```bash
oryx.build(configuration, (error, stats) => {
    // add youre code here
});

```

{% info_block warningBox %}

For more control over the process feel free to use the Webpack one.

{% endinfo_block %}

### build.loadCompiler()

```js
oryx.build.loadCompiler(webpack, webpackVersion)
```

Load the compiler instance used for build.

* `webpack {object}`: Webpack instance object
* `webpackVersion {string}`: Webpack instance object version number

{% info_block warningBox %}

It is useful to load the compiler when oryx is a dependency in a module where it's mandatory to execute the build API using the Webpack version specified in that module's `package.json`.

{% endinfo_block %}

```js
const oryx = require('@spryker/oryx');
const webpack = require('webpack');
const webpackVersion = require('webpack/package').version;

oryx.build.loadCompiler(webpack, webpackVersion);
```

### log functions

* `log.info()`: print an info message
* `log.task()`: print a task message
* `log.step()`: print a step message
* `log.done()`: print a done message
* `log.error()`: print an error message
* `log.debug()`: print a debug message

To print debug messages, set `process.env.DEBUG variable` to `true`. Assuming you have a yves script in your `package.json`, you can type in terminal:

```
DEBUG=true npm run yves
# or
DEBUG=true yarn run yves
```
