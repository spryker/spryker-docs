---
title: Integrate JQuery into Atomic Frontend
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-integrate-jquery
originalArticleId: 8cd14f0a-a0e9-4036-b90b-a1ac4e5f3560
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/integrating-jquery-into-atomic-frontend.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/integrating-jquery-into-atomic-frontend.html
related:
  - title: Atomic Frontend - general overview
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/atomic-frontend.html
  - title: Customizing Spryker Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/customizing-spryker-frontend.html
  - title: Integrating React into Atomic Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/integrate-react-into-atomic-frontend.html
---

This guide aims to illustrate how to use *JQuery* and any *JQuery* plugin inside Spryker components.

To do so, we will show how to integrate a plugin called *jquery-countdown.*

## Setup

### Install JQuery and jquery-countdown plugin

First of all, you need to add *JQuery* and *jquery-countdown* as dependencies to the project. To do so, from the root folder, type in the terminal:

```php
npm install jquery jquery-countdown --save
```

`./package.json` file gets updated as follows:

```php
"dependencies": {
  ...
  "jquery": "~3.3.1",
  "jquery-countdown": "~2.2.0",
  ...
}
```

### Update webpack configuration

JQuery is generally used (and extended in plugins) as global. To allow that,  add the following lines to the plugin section of the webpack development configuration. Open `./frontend/configs/development.js` and add the following:

```php
plugins: [
  ...
  new webpack.ProvidePlugin({
    // jquery global
    $: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }),
  ...
]
```

`ProvidePlugin` will inject JQuery as a global variable into the DOM, allowing any plugin/usage to rely on `$`,  `window.jQuery` or `window.$` variables.

### Add JQuery declaration for Typescript (optional)

If you're using Typescript, you need to tell it how to resolve the "$" symbol, or the transpiling will fail. In order to do so, you can use 2 approaches:

1. add `declare const $: any;` at the very beginning of every file that uses JQuery.
2. create the file `./src/Pyz/Yves/ShopUi/Theme/default/global.d.ts` and add the line `declare const $: any;`.

{% info_block infoBox %}

This approach is a permanent solution and you won't need to declare JQuery anywhere else as the global definition file will be used to recognize the "$" symbol in the whole application.

{% endinfo_block %}

### Add JQuery to vendor.ts

To be sure that JQuery will be included into the final output, add the following line to `./src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`:

```php
import 'jquery';
```

By doing this, we make Webpack know to place JQuery source code into the vendor chunk and require it from there whenever needed.

### Add jquery-countdown to vendor.ts (optional)

If you want to serve *jquery-countdown* as global and simply use it in every component you need, add the following line to `./src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`:

```php
import 'jquery-countdown';
```

{% info_block infoBox %}

If you want to include the plugin as a local resource used only by certain specific components, ignore this step.

{% endinfo_block %}

## Configure application

The main integration step is to be implemented in `./src/Pyz/Yves/ShopUi/Theme/default/app.ts`. This file defines the entry point for the whole Atomic Frontend, therefore it needs to be updated in order to properly integrate with *JQuery*. The main reason is that JQuery needs some time to load itself in the DOM; every plugin or code that uses it must wait for `document.ready` event before doing anything.

Same goes for this component: In order to safely have JQuery available in the component, you need to be sure that the `mountCallback` (or `readyCallback` which is deprecated now) is called after the `document.ready` event.

To do so, add one of the following code chunks to `./src/Pyz/Yves/ShopUi/Theme/default/app.ts`.

**ShopUi module configuration version 1.9 or earlier:**

```php
import { mount } from 'ShopUi/app';
import { LogLevel, log, info, error, config as setLogConfig } from 'ShopUi/app/logger';
import { get as config, set as setConfig, defaultConfig, Config } from 'ShopUi/app/config';

function fireReadyEvent(): void {
    const readyEvent = new CustomEvent(config().events.ready);
    document.dispatchEvent(readyEvent);
}

function fireErrorEvent(err: Error): void {
    const errorEvent = new CustomEvent(config().events.error, { detail: err });
    document.dispatchEvent(errorEvent);
}

async function onDocumentReady(): Promise<void> {
    log('DOM ready');

    try {
        await mount();
        fireReadyEvent();
        log('application ready');
    } catch (err) {
        fireErrorEvent(err);
        error('application error\n', err);
    }
}

setConfig(defaultConfig);
setLogConfig(config().log.level, config().log.prefix);
info('mode:', config().isProduction ? 'PRODUCTION,' : 'DEVELOPMENT,', 'log-level:', LogLevel[config().log.level]);

$(() => onDocumentReady());
```

**ShopUi module configuration version 1.10 or later:**

```php
import { setup, mount } from 'ShopUi/app';
import { log, error } from 'ShopUi/app/logger';

setup();

$(async () => {
    try {
        await mount();
        log('application ready');
    } catch (err) {
        error('application error\n', err);
    }
});
```

## Usage

### Add jquery-countdown to the component (optional)

{% info_block infoBox %}

If you already added the plugin to `vendor.ts` as a global resource, ignore this step.

{% endinfo_block %}

If you want to serve *jquery-countdown* as a local plugin used only in the current component, add the following line to the specific `component-name.ts file`:

```php
import 'jquery-countdown';
```

### Use the plugin

At this point, you can start using the *jquery-countdownplugin* in the necessary components. The following code is used to load the plugin:

```php
$('.any-target-selector').countdown('2100/01/01', function (event: any) {
				$(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
		});
```

{% info_block errorBox %}

Make sure that it's invoked inside/after `mountCallback (readyCallback` can be used as well, but it's now deprecated).

{% endinfo_block %}
