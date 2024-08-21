---
title: Frontend assets building and loading
description: Spryker assets are split into critical and non-critical CSS chunks. Their main purpose is to provide loading of the critical CSS at the start of the page loading and load the non-critical CSS only after the full page is loaded.
last_updated: Aug 31, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/frontend-assets-building-and-loading
originalArticleId: d9f739fa-6b6a-45d7-8d3e-4ba793809910
redirect_from:
  - /2021080/docs/frontend-assets-building-and-loading
  - /2021080/docs/en/frontend-assets-building-and-loading
  - /docs/frontend-assets-building-and-loading
  - /docs/en/frontend-assets-building-and-loading
  - /v6/docs/frontend-assets-building-and-loading
  - /v6/docs/en/frontend-assets-building-and-loading
  - /docs/scos/dev/front-end-development/yves/frontend-assets-building-and-loading.html
  - /docs/scos/dev/front-end-development/202307.0/yves/frontend-assets-building-and-loading.html

---

Spryker assets are split into critical and non-critical CSS chunks. Their main purpose is to provide loading of the critical CSS at the start of the page loading and load the non-critical CSS only after the full page is loaded.

The *critical CSS* includes all the components from the [`ShopUi`](https://github.com/spryker/spryker-shop-core/tree/master/Bundles/ShopUi) module as basic frontend building blocks for all pages and components from the **Home**, **Catalog**,  **Product Detail** pages. These pages are considered landing pages and the most important pages from the search engine optimization perspective.

The *non-critical CSS* includes all other styles and service CSS classes called *utils*. The non-critical assets are not necessary for every page loading and can be loaded when the whole page has already been loaded.

To support the assets loading behavior as described above, most pages considered as not landing are loading both critical and non-critical assets into the `<head>` tag at the start of the page loading. The assets loading approach for the landing pages is described further in this document.

## Page-critical-path layout

For the landing pages, there is the `page-critical-path` layout defining the asset's loading behavior. It is an extension of the `page-blank` layout with the overwritten `nonCriticalStyles` and `styleLazyLoader` blocks. The `page-critical-path` contains a `style-loader` component before the closing tag of `<body>`. The `style-loader` component is responsible for loading the non-critical CSS only after the whole page is loaded.

The `page-critical-path` layout uses cookies to track whether it is the first session on the site. If it is the first session, the critical CSS and utils are loaded into the `<head>` tag at the start of the page loading. Only after the whole page is loaded, the `style-loader` component appends the non-critical CSS to the end of the `<head>` tag. Otherwise, the approach for the non-landing pages is used.

The main purpose of the page-critical-path layout is to use the CSS Lazy Load only for the landing pages. To enable the CSS Lazy Load for your project, see [Frontend CSS Lazy Load integration](/docs/dg/dev/integrate-and-configure/integrate-css-lazy-loading.html).

## Building CSS and JS chunks

As mentioned above, all the Yves CSS are split into critical, non-critical, and utils chunks using the Webpack `MiniCssExtractPlugin` and are loaded separately to all pages. Because the utils CSS is a part of the non-critical CSS, they are built separately *only* for the user's first session on the site if the pages use the `page-critical-path` layout.

Building the JS chunks using a code-splitting Webpack feature lets you split JS code into various bundles. It builds a smaller bundle size and lets you control the resource load prioritization impact on a page load time.

There are three general approaches to code splitting:
* Entry Points: manual split of code using entry configuration.
* Prevent Duplication: using the `SplitChunksPlugin` to dedupe and split chunks.
* Dynamic Imports: splitting code by inline function calls within modules.

The approaches are implemented with the `RuntimeChunkPlugin`, `SplitChunksPlugin` plugins, and by using the `WebpackChunkName`. The `RuntimeChunkPlugin` is needed for multiple entry points that are being used on a single HTML page. The `SplitChunksPlugin` lets you extract common dependencies into entirely new chunks. `WebpackChunkName` uses a component name as a chunk name. As a result, at first, Webpack builds a single runtime JS chunk and creates named chunks for all components on the page using the components' names as names for chunks.


### Polyfills

A *polyfill* is a code that is used to provide modern functionality for older browsers that do not natively support it. The polyfills are imported on the project level into the `src/Pyz/Yves/ShopUi/Theme/default/vendor.ts` file.

## Cache-busting mechanism

The main idea of the *cache-busting mechanism* is to provide an ability to reset JS/CSS cache for a newly deployed version so that the new assets are delivered to the frontend applications. It is achieved by adding a hash to every asset path using an environment variable `SPRYKER_BUILD_HASH` that lets you reset the browser cache instead of a namespace variable. The path of the resources on Yves is displayed with this hash folder `assets/SPRYKER_BUILD_HASH/default/css/yves_default.app.css`. If the project is set up by Docker, the `assets` folder is present in the Docker container in a production environment. Otherwise, if it is a development environment, the `assets` folder is in a public `assets` folder rather than a container.

## `isCssLazyLoadSupported` Twig variable

The page-blank layout has the `isCssLazyLoadSupported` Twig variable on the core level. This variable is responsible for turning on and off the CSS Lazy loading. By default, this variable is set to `false` and overwritten to `true` on a project level to enable the mentioned feature.

## Assets structure

All the Spryker assets are divided into CSS, JS files, and images and are added to the `public/Yves/assets` folder after the frontend is built. The `assets` folder has the following structure:

* `current`: assets folder for the current namespace (`current` by default).
  * `default`: assets folder for the current theme in the namespace.
    * `css`: folder for styles.
      * `yves_default.critical.css`: styles loaded at the start of the page loading.
      * `yves_default.non-critical.css`: styles loaded after full page loading.
      * `yves_default.util.css`: service styles.
      * `yves_default.app.css`: all the styles used for cases when CSS Lazy Load feature is turned off.
    * `js`: folder for scripts.
      * `yves_default.runtime.js`: scripts executed on runtime and compiled in ES6 modes.
      * `yves_default.app.js`: compiled Spryker Frontend application script in ES6 modes.
      * `yves_default.vendor.js`: contains scripts of polyfills compiled in ES6 modes.
      * Named scripts of used web components compiled in ES6 modes.
    * `images`: folder for the images.
* `static`: static assets source folder.
    * `images`: folder for the static images.

Depending on the usage of scripts and *CSS Lazy Load* feature, the following variants are loading in the `head` and `body` tags exist:

`<head>`
```html
<head>
...
    {% raw %}{%{% endraw %} block headStyles {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} if isCssLazyLoadSupported {% raw %}%}{% endraw %}
            {# styles loaded at the start of the page loading #}
            <link rel="stylesheet" href="{% raw %}{{{% endraw %} publicPath('css/yves_default.critical.css') {% raw %}}}{% endraw %}">

            {% raw %}{%{% endraw %} block nonCriticalStyles {% raw %}%}{% endraw %}
                {# styles loaded after full page loading #}
                <link rel="stylesheet" href="{% raw %}{{{% endraw %} publicPath('css/yves_default.non-critical.css') {% raw %}}}{% endraw %}">
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
            {# all the styles used for cases when CSS Lazy Load feature is turn off #}
            <link rel="stylesheet" href="{% raw %}{{{% endraw %} publicPath('css/yves_default.app.css') {% raw %}}}{% endraw %}">
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block headScripts {% raw %}%}{% endraw %}
        <script type="module" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.runtime.js') {% raw %}}}{% endraw %}" crossorigin="anonymous"></script>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
...
</head>
```

`<body>`
```html
<body>
...
    {% raw %}{%{% endraw %} block footerScripts {% raw %}%}{% endraw %}
        <script type="module" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.vendor.js') {% raw %}}}{% endraw %}" crossorigin="anonymous"></script>
        <script type="module" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.app.js') {% raw %}}}{% endraw %}" crossorigin="anonymous"></script>

        {% raw %}{%{% endraw %}- block styleLazyLoader {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock -{% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
...
</body>
```
