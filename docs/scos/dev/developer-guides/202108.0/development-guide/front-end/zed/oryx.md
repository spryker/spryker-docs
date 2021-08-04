---
title: Oryx Builder Overview and Setup
originalLink: https://documentation.spryker.com/2021080/docs/oryx
redirect_from:
  - /2021080/docs/oryx
  - /2021080/docs/en/oryx
---

Oryx is the Spryker projects frontend helper. The purpose of Oryx is to simplify the asset building process, giving developers the freedom to choose and configure the preprocessors for the frontend.

Oryx relies on webpack 2.

{% info_block warningBox "Oryx for Zed" %}
If you're looking for Oryx Zed dedicated solution, see [Oryx for Zed](https://documentation.spryker.com/docs/oryx-for-zed
{% endinfo_block %}.)

### Requirements

Before installing Oryx, make sure that you have the following:

* nodejs version 6.x LTS
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
Oryx comes with a peer dependency - webpack version >= 2.x (needed when you build assets using Oryx api
{% endinfo_block %})

## Usage

Once installed, Oryx can be used to enrich your webpack configuration and to programmatically execute webpack (with a formatted terminal output).

The following example shows a basic Oryx integration with `webpack`.

### webpack.config.js

Use Oryx to find Spryker Yves core entry points and add them to your configuration. The following `entrySettings` constant defines where to search for them (`dirs`), which patterns to adopt to spot them (`patterns`), the description to log in the terminal (description) and how to name the entry points (`defineName(path)`).

To configure Oryx to look for your own entry points, change the settings accordingly or add them directly as you always do with webpack. As the "find entry points" function is working an asyncronous mode, it is necessary to create an asyncronous configuration function which would resolve the entry points promises (see example below).

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

This file contains the programmatic call to webpack using the `oryx.build()` function. Oryx will take care of printing a minimal log in the terminal console.

```
const oryx = require('@spryker/oryx');
const getConfiguration = require('./webpack.config.js');

getConfiguration()
    .then(configuration => oryx.build(configuration))
    .catch(error => console.error('An error occurred while creating configuration', error));
```

### package.json

Add a script into your `package.json` pointing to `build.js`.

```javascript
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
 
```
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

```
oryx.build(configuration, [callback])
```

Build the assets using `webpack` and print a formatted terminal output. This functon is just a wrapper for `webpack(configuration, callback)`:

* `configuration {object}`: webpack configuration file
* `callback(error, stats) {function} [optional]`: function called once webpack build task is completed

```bash
oryx.build(configuration, (error, stats) => {
    // add youre code here
});

```

{% info_block warningBox %}
For more control over the process feel free to use the webpack one.
{% endinfo_block %}

### build.loadCompiler()

```
oryx.build.loadCompiler(webpack, webpackVersion)
```

Load the compiler instance used for build.

* `webpack {object}`: webpack instance object
* `webpackVersion {string}`: webpack instance object version number

{% info_block warningBox %}
It is useful to load the compiler when oryx is a dependecy in a module where it's mandatory to execute the build API using the webpack version specified in that module's package.json.
{% endinfo_block %}

```
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
