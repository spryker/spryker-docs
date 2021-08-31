---
title: Build and Optimization
description: We use Webpack and Oryx for transpiling/building the assets and to optimize the resulting output.
originalLink: https://documentation.spryker.com/2021080/docs/build-optimization
originalArticleId: fddbda3d-9fa6-41a2-adde-968a03a1c6b4
redirect_from:
  - /2021080/docs/build-optimization
  - /2021080/docs/en/build-optimization
  - /docs/build-optimization
  - /docs/en/build-optimization
---

We use [Webpack](https://webpack.js.org/) and [Oryx](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html) for transpiling/building the assets and to optimize the resulting output.

For more on **Webpack** build process and requirements see:

* [Key Concepts](https://webpack.js.org/concepts/)
* [Getting started](https://webpack.js.org/guides/get-started/)
    * Using a Configuration
* [Configuration Details](https://webpack.js.org/configuration/)

Learn more about Spryker **Oryx** frontend helper:

* [Oryx documentation](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html) 
* [Oryx for Zed documentation](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html-for-zed)

## Automatic loading for Webpack Entry Points
 [Oryx's globbing system](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html#find--), enables Webpack to automatically find and load entry points. 

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

To add or change entry points in Zed, [extend the Oryx for Zed Webpack configuration](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html-for-zed#extend-change-settings).

For more about Zed assets management:

* [Oryx globbing system](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html#find--) 
* [Oryx for Zed API](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/front-end/zed/oryx-builder-overview-and-setup.html-for-zed#api)
