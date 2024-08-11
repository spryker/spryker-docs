---
title: Integrate CSS lazy loading
description: This guide provides step-by-step instruction on how to use the frontend CSS lazy load feature.
last_updated: Aug 31, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/frontend-css-lazy-load
originalArticleId: 050361ae-ad26-41b9-8fe8-297f665ad93f
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-css-lazy-loading-for-the-front-end.html
  - /docs/scos/dev/technical-enhancements/frontend-css-lazy-load.html
---

To implement [CSS lazy loading for frontend](/docs/dg/dev/frontend-development/{{site.version}}/yves/frontend-assets-building-and-loading.html#page-critical-path-layout), do the following:

1. Update the `ShopUi` module to version 1.44.0, and  update the `spryker-shop/shop` dependencies for the `CatalogPage`, `HomePage`, and `ProductDetailPage` modules:

```bash
COMPOSER_MEMORY_LIMIT=-1 composer update spryker-shop/shop-application spryker-shop/shop-ui spryker-shop/catalog-page spryker-shop/home-page spryker-shop/product-detail-page --with-dependencies
```

2. Add `"@jsdevtools/file-path-filter": "~3.0.2"`, into the `package.json` file to the `devDependencies` section and run the following:

```bash
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

4. Update the `frontend/libs/finder.js` file with the following code:

    1. Add the `mergeEntryPoints` function:

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

    2. Update the `findEntryPoints` function using the `mergeEntryPoints` as described in the previous step:

    ```js
    ...
    // find entry points
    const findEntryPoints = async settings => {
        const files = await find(settings.dirs, settings.patterns,  settings.fallbackPatterns, settings.globSettings);
        return mergeEntryPoints(files);
    };
    ...
    ```

    3. Add the `findStyleEntryPoints` function:

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

    4. Pass the `findStyleEntryPoints` function to the exported module:

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

    1. Add the `filePathFilter` to the imported stuff at the top of the file:

    ```js
    const filePathFilter = require("@jsdevtools/file-path-filter");
    ```

    2. Add `findStyleEntryPoints` to the import from the `Finder` module:

    ```js
    ...
    const { findComponentEntryPoints, findStyleEntryPoints, findComponentStyles, findAppEntryPoint } = require('../libs/finder');
    ...
    ```

    3. Add the new local variable `styleEntryPointsPromise` to the `getConfiguration` function:

    ```js
    ...
    const styleEntryPointsPromise = findStyleEntryPoints(appSettings.find.stylesEntryPoints);
    ...
    ```

    4. Extend the destructuring assignment with the following changes:

    From:

    ```js
    const [componentEntryPoints, styles] = await Promise.all([componentEntryPointsPromise, stylesPromise]);
    ```
    To:

    ```js
    const [componentEntryPoints, styleEntryPoints, styles] = await Promise.all([componentEntryPointsPromise, styleEntryPointsPromise, stylesPromise]);
    ```

    5. Add new local variables `criticalEntryPoints` and `nonCriticalEntryPoints` to the `getConfiguration` function:

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

    6. Extend the `entry` section of the returned Webpack config object into the `getConfiguration` function with the new `critical`, `non-critical`, and `util` points:

    ```js
    ...
    entry: {
        'vendor': vendorTs,
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

    1. Add `LastVisitCookieEventDispatcherPlugin` to using section:

    ```js
    ...
    use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\LastVisitCookieEventDispatcherPlugin;
    ...
    ```

    2. Add this plugin to the returned collection of the `getEventDispatcherPlugins` function:

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

```twig
{% raw %}{%{% endraw %} extends template('page-blank', '@SprykerShop:ShopUi') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block template {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set isCssLazyLoadSupported = true {% raw %}%}{% endraw %}

    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block infoBox "Info" %}

Make sure your styles from `node_modules` are included in `.scss` files (not in `index.ts`). For example:

`molecules/slick-carousel/slick-carousel.scss`:

```js
@import '~slick-carousel/slick/slick.scss';

@mixin shop-ui-slick-carousel($name: '.slick-carousel') {
...
```

{% endinfo_block %}

8. Rebuild the frontend with the new settings:
```bash
npm run yves
```
