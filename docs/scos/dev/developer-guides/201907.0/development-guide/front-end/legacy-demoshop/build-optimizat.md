---
title: Build and Optimization
originalLink: https://documentation.spryker.com/v3/docs/build-optimization
redirect_from:
  - /v3/docs/build-optimization
  - /v3/docs/en/build-optimization
---

We use [Webpack](https://webpack.js.org/) and [Oryx](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/zed/oryx) for transpiling/building the assets and to optimize the resulting output.

For more on **Webpack** build process and requirements see:

* [Key Concepts](https://webpack.js.org/concepts/)
* [Getting started](https://webpack.js.org/guides/get-started/)
    * Using a Configuration
* [Configuration Details](https://webpack.js.org/configuration/)

Learn more about Spryker **Oryx** frontend helper:

* [Oryx documentation](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/zed/oryx) 
* [Oryx for Zed documentation](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/zed/oryx-for-zed)

## Automatic loading for Webpack Entry Points
 [Oryx's globbing system](https://documentation.spryker.com/v4/docs/oryx#find--), enables Webpack to automatically find and load entry points. 

### Yves
On a project level, you can pass your own entry points directly in the Webpack configuration. We recommend also using `theoryx.find()` API to import any Yves related code. This way, you will get every frontend feature developed in the core (i.e. payments method UI).

```php
const settings = {
    entry: {
        dirs: [path.resolve('vendor/spryker')],
        patterns: ['**/Yves/**/*.entry.js'],
        defineName: p => path.basename(p, '.entry.js'),
        description: 'looking for entry points...'
    }
};

const webpackConfiguration = {
    // ...
    entry: oryx.find(settings.entry, {
        'your-entry-name': '/path/to/your/entry/point.js'
    }),
    // ...
};
```

`**/Yves/**/*.entry.js` is the default pattern for Yves automatic inclusion: every filename endings with `.entry.js` and contained in a parent folder called Yves will be included by webpack into the build process.

### Zed
Zed frontend is fully managed by Oryx for Zed. It relies on the  `oryx.find()` API to automatically globb the entry point files across the project. 

To add or change entry points in Zed, [extend the Oryx for Zed Webpack configuration](https://documentation.spryker.com/v4/docs/oryx-for-zed#extend-change-settings).

For more about Zed assets management:

* [Oryx globbing system](https://documentation.spryker.com/v4/docs/oryx#find--) 
* [Oryx for Zed API](https://documentation.spryker.com/v4/docs/oryx-for-zed#api)
