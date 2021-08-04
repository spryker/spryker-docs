---
title: Making the Legacy Demoshop Compatible with the Atomic Frontend
originalLink: https://documentation.spryker.com/v6/docs/demoshop-with-atomic-frontend
redirect_from:
  - /v6/docs/demoshop-with-atomic-frontend
  - /v6/docs/en/demoshop-with-atomic-frontend
---

The following guide will help migrating an existing Demoshop project to Atomic Frontend.
1. Update `assets/Yves/default/app/index.js`
Append the following lines to the end of the file:

```js
var app = require('ShopUi/app');
app.bootstrap();
```

2. Update `assets/Yves/default/vendor.entry.js`
Remove the following lines:

```js
// es6 promise fix (webpack 2)
require('es6-promise/auto');
```

Line to add:

```js
require('@webcomponents/webcomponentsjs/webcomponents-bundle');
```

3. Update `package.json` by replacing the following sections with the lines specified below:

**scripts**

```js
"scripts": {
    "yves": "node ./assets/Yves/default/build/build development",
	"yves:watch": "node ./assets/Yves/default/build/build development-watch",
	"yves:production": "node ./assets/Yves/default/build/build production",
	"zed": "node ./node_modules/@spryker/oryx-for-zed/build",
	"zed:dev": "node ./node_modules/@spryker/oryx-for-zed/build --dev",
	"zed:prod": "node ./node_modules/@spryker/oryx-for-zed/build --prod"
}
```
    
**engines**
    
```php
"engines": {
    "node": ">=8.9.0",
    "npm": ">=5.6.0"
}
```
    
**dependencies**
    
```php
"dependencies": {
    "@webcomponents/webcomponentsjs": "~2.0.2",
    "core-js": "~2.5.7",
    "font-awesome": "~4.7.0",
    "foundation-sites": "~6.3.1",
    "jquery": "~3.2.0",
    "slick-carousel": "~1.6.0",
    "lodash": "~4.17.2",
    "motion-ui": "~1.2.2",
    "jquery-bar-rating": "^1.2.2"
}
```
    
**devDependencies**
    
```php
"devDependencies": {
    "@spryker/oryx-for-zed": "^2.1.0",
    "autoprefixer": "~8.6.2",
    "clean-webpack-plugin": "~0.1.19",
    "copy-webpack-plugin": "~4.5.1",
    "css-loader": "~0.28.10",
    "fast-glob": "~2.2.2",
    "file-loader": "~1.1.11",
    "mini-css-extract-plugin": "~0.4.0",
    "node-sass": "~4.9.0",
    "optimize-css-assets-webpack-plugin": "~4.0.2",
    "postcss-loader": "~2.1.5",
    "sass-loader": "~7.0.3",
    "sass-resources-loader": "~1.3.3",
    "ts-loader": "~4.4.1",
    "typescript": "~2.9.1",
    "uglifyjs-webpack-plugin": "~1.2.4",
    "webpack": "~4.12.0",
    "webpack-merge": "~4.1.3"
}
```

4. Update `src/Pyz/Yves/Application/Theme/default/layout/layout.twig`.
Add <script src="/assets/default/js/runtime.js"></script> to <head>:
    
```html
<!-- add here -->
<link rel="stylesheet" href="/assets/default/css/vendor.css" />
<link rel="stylesheet" href="/assets/default/css/app.css" />
```    
    
Add <script src="/assets/default/js/es6-polyfill.js"></script> at the very bottom of the page skeleton, before `app.js` and `vendor.js`:

```js
<!-- add here -->
<script src="/assets/default/js/vendor.js"></script>
<script src="/assets/default/js/app.js"></script>
```

5. Delete the `assets/Yves/default/build/` folder.
6. Download the [Migration Package](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/migration-Package.zip), unpack it and copy to your project following the folder structure of the package.
7. Replace 

```php
// define relative urls to site host (/)
const urls = {
   // assets base url
   assets: '/assets'
};
```

with

```php
// define relative urls to site host (/)
const urls = {
     // assets base url
     assets: '/assets/default'
};
```

8. Run the installation script

```php
install -s frontend
console cache:empty-all
```
