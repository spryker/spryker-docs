---
title: Frontend assets building and loading
originalLink: https://documentation.spryker.com/2021080/docs/frontend-assets-building-and-loading
redirect_from:
  - /2021080/docs/frontend-assets-building-and-loading
  - /2021080/docs/en/frontend-assets-building-and-loading
---

Spryker assets are split into critical and non-critical CSS chunks. Their main purpose is to provide loading of the critical CSS at the start of the page loading and load the non-critical CSS only after the full page is loaded.

The *critical CSS* includes all the components from the [ShopUi](https://github.com/spryker/spryker-shop-core/tree/master/Bundles/ShopUi) module as basic front-end building blocks for all pages and components from the Home page, Catalog page, and Product Detail page. These pages are considered landing pages and the most important pages from the search engine optimization perspective.

The *non-critical CSS* includes all other styles and service CSS classes called *utils*. The non-critical assets are not necessary for every page loading and can be loaded when the whole page has already been loaded.

To support the assets loading behavior as described above, most pages considered as not landing are loading both critical and non-critical assets into the `<head>` tag at the start of the page loading. The assets loading approach for the landing pages is described further in this article. 

## Page-critical-path layout
For the landing pages, there is the `page-critical-path` layout defining the assets loading behavior. It is an extension of the `page-blank` layout with the overwritten `nonCriticalStyles` and `styleLazyLoader` blocks. The `page-critical-path` contains a `style-loader` component before the closing tag of `<body>`. The `style-loader` component is responsible for loading the non-critical CSS only after the whole page is loaded.

The `page-critical-path` layout uses cookies to track whether it is the first session on the site. If it is the first session, the critical CSS and utils are loaded into the `<head>` tag at the start of the page loading. Only after the whole page is loaded, the `style-loader` component appends the non-critical CSS to the end of the `<head>` tag. Otherwise, the approach for the non-landing pages is used.

The main purpose of the page-critical-path layout is to use the CSS Lazy Load only for the landing pages. To enable the CSS Lazy Load for your project, see [Frontend CSS Lazy Load integration](https://documentation.spryker.com/docs/frontend-css-lazy-load).

## Building CSS and JS chunks
As mentioned above, all the Yves CSS are split into critical, non-critical, and utils chunks using the Webpack `MiniCssExtractPlugin` and are loaded separately to all pages. Due to the fact that the utils CSS is a part of the non-critical CSS, they are built separately **only** for the user's first session on the site if the pages use `page-critical-path` layout.

Building the JS chunks using a code-splitting Webpack feature allows splitting JS code into various bundles. It builds a smaller bundles size and allows you to control the resource load prioritization impact on a page load time. 

There are three general approaches to code splitting:

* Entry Points: manual split of code using entry configuration.
* Prevent Duplication: using the `SplitChunksPlugin` to dedupe and split chunks.
* Dynamic Imports: splitting code via inline function calls within modules.

The approaches are implemented with the `RuntimeChunkPlugin`, `SplitChunksPlugin` plugins, and by using the `WebpackChunkName`. The `RuntimeChunkPlugin` is needed for multiple entry points that are being used on a single HTML page. The `SplitChunksPlugin` allows extracting common dependencies into entirely new chunks. `WebpackChunkName` uses a component name as a chunk name. As a result, at first, Webpack builds a single runtime JS chunk and creates named chunks for all components on the page using the components' names as names for chunks.

## Splitting builds with ES5 and ES6
You can create a JS build in ES5 and ES6 modes and switch between them only if needed, for example, in case of using the old browsers that do not support ES6.

To achieve this, the front-end builder settings have the `buildVariantSettings` statement that includes building mode naming (legacy for ES5 and ESM for ES6) and boolean variable `isES6Module`. Also, the previous `ts-loader` has been changed to `babel-loader` and `isES6Module` variable is used to switch to ES6 building mode. For the `babel-loader`, a preset with plugins `@babel/preset-typescript`, `@babel/plugin-transform-runtime` and `@babel/plugin-proposal-class-properties` is used.

The command list for building fronted is extended with the new attributes module:esm and module:legacy. 

{% info_block infoBox %}

To create a frontend build in different ES5 and ES6 modes, use the list of commands from [Frontend-related commands](https://documentation.spryker.com/docs/console#frontend-related-commands). See the YVES section.

{% endinfo_block %}


### Polyfills

A polyfill is a code that is used to provide modern functionality for older browsers that do not natively support it. The polyfills are imported on the project level into the `src/Pyz/Yves/ShopUi/Theme/default/vendor.ts` file. In the Spryker front-end, the following polyfills are used:

* `core-js/promise` - includes polyfills for ECMAScript `Promises` up to 2019, they provide the ability to use promises for old browsers.
* `core-js/array` - provides an ability to use modern `Array`’s methods for the old browsers;
* `core-js/set` - includes all `Set`-object related features adapted to old browsers.
* `core-js/map` - includes all `Map`-object related features adapted to old browsers.
* `whatwg-fetch` - implements a subset of the standard Fetch specification, enough to make `fetch` a viable replacement for the most uses of `XMLHttpRequest` in the traditional web applications.
* `element-remove` - a polyfill for `Element.remove()` method compatible with the Internet Explorer 9 and higher.
* `classlist-polyfill` - a polyfill for classList and `DOMTokenList` that ensures full compliance for all the standard methods and properties of `Element.prototype.classList` for IE10-IE11 browsers; plus nearly compliant behavior for IE 6-9.
* `string.prototype.startswith` - a polyfill for the `String.prototype.startsWith` method in ECMAScript 6 that implements the es-shim API interface for ES3-supported environments.
* `date-input-polyfill` - provides support of `<input type="date">` without any dependencies in IE, Firefox, and OS X Safari.
* `intersection-observer` - a polyfill for the native `IntersectionObserver` API in the unsupported IE;
* `elementClosestPolyfill` - provides support of the `Element.closest()` for IE9 or higher.
* `webcomponentsjs/custom-elements-es5-adapter` - provides the ability to compile and serve ES6 classes in custom elements HTMLElement for browsers  that support only ES5-style classes.

## Cache-busting mechanism
The main idea of the cache-busting mechanism is to provide an ability to reset JS/CSS cache for a newly deployed version so that the new assets are delivered to the front-end applications. It is achieved by adding a hash to every asset path via an environment variable `SPRYKER_BUILD_HASH`  that allows resetting the browser cache instead of a namespace variable. The path of the resources on Yves is displayed with this hash folder `assets/SPRYKER_BUILD_HASH/default/css/yves_default.app.css`. If the project is set up via Docker, the assets folder is present in the Docker container in a production environment. Otherwise, if it is a development environment, the assets folder is in a public assets folder rather than a container.

## isNewFrontendBuildSupported and isCssLazyLoadSupported Twig variables
The page-blank layout has the  `isNewFrontendBuildSupported` and `isCssLazyLoadSupported`  Twig variables on the core level.  These variables are responsible for turning on/off the splitting builds with ES5 and ES6 and CSS Lazy loading. By default, these variables are set to `false` and overwritten to `true` on a project level to enable the mentioned features.

## Assets structure
All the Spryker assets are divided into .css, .js files, and images and are added to the `public/Yves/assets` folder after the frontend is built. The assets folder has the following structure:

* **current** - assets folder for the current namespace (`current` by default)

    * **default** - assets folder for the current theme in the namespace
        * **css** - folder for styles

            * `yves_default.critical.css` - styles loaded at the start of the page loading
            * `yves_default.non-critical.css` - styles loaded after full page loading
            * `yves_default.util.css` - service styles
            * `yves_default.app.css` - all the styles used for cases when CSS Lazy Load feature is turned off

        * **js** - folder for scripts

            * `yves_default.runtime.legacy.js` / `yves_default.runtime.js` -  scripts executed on runtime and compiled in ES5/ES6 modes
            * `yves_default.app.legacy.js` / `yves_default.app.js`  - compiled Spryker frontend application script in ES5/ES6 modes
            * `yves_default.vendor.legacy.js` / `yves_default.vendor.js` -  contains scripts of polyfills compiled in ES5/ES6 modes
            * named scripts of used web components compiled in both ES5 and ES6 modes

        * **images** - folder for the images

* **static** folder - static assets source folder

    * **images** - folder for the static images

Depending on the usage of the CSS Lazy Load feature and ES5 supporting mode,  the following variants of the scripts and styles loading in the `head` and `body` tags exist:

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
        {% raw %}{%{% endraw %} if isNewFrontendBuildSupported {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block esmHeadScripts {% raw %}%}{% endraw %}
                {# should not be executed in browsers that support ES6 modules #}
                <script nomodule type="application/javascript" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.runtime.legacy.js') {% raw %}}}{% endraw %}"></script>
                {# causes the code to be treated as a JavaScript module, serves browsers that support ES6 #}
                <script type="module" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.runtime.js') {% raw %}}}{% endraw %}" crossorigin="anonymous"></script>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block legacyHeadScripts {% raw %}%}{% endraw %}
                {# fallback for old frontend build system that support only ES6 #}
                <script src="{% raw %}{{{% endraw %} publicPath('js/yves_default.runtime.js') {% raw %}}}{% endraw %}"></script>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
...
</head>
```
`<body>`

* Split scripts are compiled in ES5 and ES6 modes (`isNewFrontendBuildSupported`) and loaded depending on whether the ES5 is supported or not. By default, only ES6 mode is supported. 
```html
<body>
...
    {% raw %}{%{% endraw %} block footerScripts {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} if isNewFrontendBuildSupported {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block esmFooterScripts {% raw %}%}{% endraw %}
                {# scripts slitted to ES5 and ES6 modes #}
                <script nomodule type="application/javascript" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.vendor.legacy.js') {% raw %}}}{% endraw %}"></script>
                <script nomodule type="application/javascript" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.app.legacy.js') {% raw %}}}{% endraw %}"></script>
                <script type="module" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.vendor.js') {% raw %}}}{% endraw %}" crossorigin="anonymous"></script>
                <script type="module" src="{% raw %}{{{% endraw %} publicPath('js/yves_default.app.js') {% raw %}}}{% endraw %}" crossorigin="anonymous"></script>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block legacyFooterScripts {% raw %}%}{% endraw %}
                {# fallback for old frontend build system that support only ES6 by default #}
                <script src="{% raw %}{{{% endraw %} publicPath('js/yves_default.es6-polyfill.js') {% raw %}}}{% endraw %}"></script>
                <script src="{% raw %}{{{% endraw %} publicPath('js/yves_default.vendor.js') {% raw %}}}{% endraw %}"></script>
                <script src="{% raw %}{{{% endraw %} publicPath('js/yves_default.app.js') {% raw %}}}{% endraw %}"></script>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %}- block styleLazyLoader {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock -{% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
...
</body>
```

