---
title: Frontend CSS Lazy Load integration
originalLink: https://documentation.spryker.com/v6/docs/frontend-css-lazy-load
redirect_from:
  - /v6/docs/frontend-css-lazy-load
  - /v6/docs/en/frontend-css-lazy-load
---

To be able to use the [FE CSS Lazy Load](https://documentation.spryker.com/docs/frontend-assets-building-and-loading#page-critical-path-layout) feature, do the following:
1. Update the `ShopUi` module to 1.44.0 version, and also update the spryker-shop/shop dependencies for the `CatalogPage`, `HomePage` and `ProductDetailPage` modules by running:
```bash
COMPOSER_MEMORY_LIMIT=-1 composer update spryker-shop/shop-application spryker-shop/shop-ui spryker-shop/catalog-page spryker-shop/home-page spryker-shop/product-detail-page --with-dependencies
```
2. Add `"@jsdevtools/file-path-filter": "~3.0.2"`, into the `package.json` file to the `devDependencies` section and run 
```Bash
npm install
```

3. Make the following adjustments to the `frontend/settings.js` file:

* Define `criticalPatterns`:
```js
...
// array of patterns for the critical components
const criticalPatterns = [
    '**/ShopUi/**',
    '**/CatalogPage/**',
    '**/HomePage/**',
    '**/ProductDetailPage/**'
];
...
```

* Add `criticalPatterns` to the returned settings object:
```js
...
// return settings
    return {
        name,
        namespaceConfig,
        theme,
        paths,
        urls,
        imageOptimizationOptions,
        criticalPatterns,
...   
```

* Extend the definition of the setting for the frontend builder with the following style entry point patterns for components `stylesEntryPoints`:
```js
...
// define settings for suite-frontend-builder finder
  find: {
      // entry point patterns (components)
      componentEntryPoints: {
          ...
      },

      // style  entry point patterns (components)
      stylesEntryPoints: {
          core: {
              // absolute dirs in which look for
              dirs: [
                  join(globalSettings.context, paths.core),
              ],
              // files/dirs patterns
              patterns: [`**/Theme/${namespaceConfig.defaultTheme}/**/style.scss`],
          },
          nonCore: {
              // absolute dirs in which look for
              dirs: [
                  join(globalSettings.context, paths.eco),
                  join(globalSettings.context, paths.project),
              ],
              // files/dirs patterns
              patterns: [
                  `**/Theme/${namespaceConfig.defaultTheme}/components/**/*.scss`,
                  `**/Theme/${namespaceConfig.defaultTheme}/templates/**/*.scss`,
                  `**/Theme/${namespaceConfig.defaultTheme}/views/**/*.scss`,
              ],
          },
      },
...
```
4. Update the `frontend/libs/finder.js` file with the following cod:

   4.1. Add `mergeEntryPoints` function:
```js
...
// merge entry points
const mergeEntryPoints = async files => Object.values(files.reduce((map, file) => {
        const dir = path.dirname(file);
        const name = path.basename(dir);
        const type = path.basename(path.dirname(dir));
        map[`${type}/${name}`] = file;
        return map;
    }, {}));
...
```

    4.2. Update `findEntryPoints` function using the `mergeEntryPoints` as described above: 
```js
...
// find entry points
const findEntryPoints = async settings => {
    const files = await find(settings.dirs, settings.patterns,  settings.fallbackPatterns, settings.globSettings);
    return mergeEntryPoints(files);
};
...
```

    4.3. Add the `findStyleEntryPoints` function:
 ```js
...
// find style entry points
const findStyleEntryPoints = async settings => {
    const coreFiles = await find(settings.core.dirs, settings.core.patterns,  [], settings.globSettings);
    const nonCoreFiles = await find(settings.nonCore.dirs, settings.nonCore.patterns,  [], settings.globSettings);
    const files = [...coreFiles, ...nonCoreFiles];
    return mergeEntryPoints(files);
};
...
```

    4.4. Pass the `findStyleEntryPoints` function to the exported module:
    
```js
...
module.exports = {
    findComponentEntryPoints,
    findStyleEntryPoints,
    findComponentStyles,
    findAppEntryPoint,
};
```
5. Adjust the `frontend/configs/development.js` file:

    5.1. Add the `filePathFilter` to the imported stuff at the top of the file:
```js
const filePathFilter = require("@jsdevtools/file-path-filter");
```

    5.2. Add the `findStyleEntryPoints` to the import from the Finder module:
```js
...
const { findComponentEntryPoints, findStyleEntryPoints, findComponentStyles, findAppEntryPoint } = require('../libs/finder');
...
```

    5.3. Add the new local variable `styleEntryPointsPromise` to the `getConfiguration` function:
```js
...
const styleEntryPointsPromise = findStyleEntryPoints(appSettings.find.stylesEntryPoints);
...
```

    5.4. Extend the destructuring assignment with the following changes:

From:
```js
const [componentEntryPoints, styles] = await Promise.all([componentEntryPointsPromise, stylesPromise]);
```
To:
```js
const [componentEntryPoints, styleEntryPoints, styles] = await Promise.all([componentEntryPointsPromise, styleEntryPointsPromise, stylesPromise]);
```

    5.5. Add new local variables `criticalEntryPoints` and `nonCriticalEntryPoints` to the `getConfiguration` function:
```js
...
const criticalEntryPoints = styleEntryPoints.filter(filePathFilter({
    include: appSettings.criticalPatterns,
}));

const nonCriticalEntryPoints = styleEntryPoints.filter(filePathFilter({
    exclude: appSettings.criticalPatterns,
}));
...
```

    5.6. Extend the `entry` section of the returned Webpack config object into the `getConfiguration` function with the new `critical`, `non-critical`, and `util` points:

```js
...
entry: {
    'vendor': vendorTs,
    'es6-polyfill': es6PolyfillTs,
    'app': [
        appTs,
        ...componentEntryPoints,
    ],
    'critical': [
        basicScss,
        ...criticalEntryPoints,
    ],
    'non-critical': [
        ...nonCriticalEntryPoints,
        utilScss,
    ],
    'util': utilScss,
},
...
```
6. Update `src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php` on the project level: 

 6.1. Add `LastVisitCookieEventDispatcherPlugin` to using section:
```js
...
use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\LastVisitCookieEventDispatcherPlugin;
...
```

    6.2. Add this plugin to the returned collection of the `getEventDispatcherPlugins` function:
```js
protected function getEventDispatcherPlugins(): array
{
    return [
        ...
        new LastVisitCookieEventDispatcherPlugin(),
        ...
    ];
}
```

7. Update the `page-blank.twig` layout on the project level in `src/Pyz/Yves/ShopUi/Theme/default/templates/page-blank/page-blank.twig` by adding the new `isCssLazyLoadSupported` twig variable: 
```html
{% raw %}{%{% endraw %} extends template('page-blank', '@SprykerShop:ShopUi') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block template {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set isNewFrontendBuildSupported = true {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set isCssLazyLoadSupported = true {% raw %}%}{% endraw %}

    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
{% info_block infoBox "Info" %}

Make sure your styles from `node_modules` included in `.scss` files (not in `index.ts`). For example:

`molecules/slick-carousel/slick-carousel.scss`:
```js
@import '~slick-carousel/slick/slick.scss';

@mixin shop-ui-slick-carousel($name: '.slick-carousel') {
...
```

{% endinfo_block %}
8. Run `npm run yves` to rebuild the frontend with the new settings.
