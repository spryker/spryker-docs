---
title: Development
originalLink: https://documentation.spryker.com/v1/docs/development-for-legacy-demoshop
redirect_from:
  - /v1/docs/development-for-legacy-demoshop
  - /v1/docs/en/development-for-legacy-demoshop
---

Development refers to writing your own assets, consuming external dependencies and linking resources to make them work together.

Essentially, the code you’re going to produce can be html, css and javascript (in any of their forms: jade, sass, less, coffescript, ecma 6, react js, etc.).

## CommonJS
We decided to adopt **CommonJS** as the default development specification for `javascript` files. You can read more about it in the [CommonJS](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailcommonjs) documentation.

While it’s mandatory for Zed, we recommend to adopt it also for Yves.

The code below is a CommonJS module example:

```php
'use strict';

// dependencies
var externalDep = require('external-module');
var localDep = require('./local/module');

// module internal variables
var privateVariable = 'I am private';

// module internal function
function privateFunction(){
    // implemetation
}

// module.exports exposes its content ouside the module
// making it accessible for other modules
module.export = {
    publicProperty: 'Hello Spryker',
    publicFunction: function(){
        // implementation
    }
};
```

With this approach, you can directly include every module (external/local) that you need, and expose publicly only the functions and the properties you want to. Each module has its own scope, so nothing goes global.

As far as this approach has been designed to use javascript on server side (node.js), commands like `require`, `module` or `export` are reserved words not naturally available in browsers’ vanilla javascript. To use them, you need to add a library or a pre-compiling tool capable of interpreting them.

For this reason, we rely on [Oryx](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/zed/oryx).
