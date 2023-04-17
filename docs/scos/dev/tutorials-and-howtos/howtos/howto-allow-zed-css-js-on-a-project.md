---
title: "HowTo: Allow Zed CSS/JS on a project"
description: Learn how you can allow Zed CSS/JS on a project level.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-allow-zed-cssjs-on-a-project
originalArticleId: 4dfc4173-0022-496f-97bb-e01a99e70757
redirect_from:
  - /2021080/docs/howto-allow-zed-cssjs-on-a-project
  - /2021080/docs/en/howto-allow-zed-cssjs-on-a-project
  - /docs/howto-allow-zed-cssjs-on-a-project
  - /docs/en/howto-allow-zed-cssjs-on-a-project
  - /v6/docs/howto-allow-zed-cssjs-on-a-project
  - /v6/docs/en/howto-allow-zed-cssjs-on-a-project
---

To allow Zed CSS/JS on a project level, follow these steps:

1. On the project level, create `frontend/zed-build.js` the following content:

```js
const oryx = require('@spryker/oryx');
const api = require('@spryker/oryx-for-zed/lib');
const path = require('path');

const settings = Object.assign({}, api.settings, {
    entry: {
        dirs: [
            path.resolve('./vendor/spryker'),
            path.resolve('./vendor/spryker-eco'),
            path.resolve('./src/Pyz')
        ],
        patterns: ['**/Zed/**/*.entry.js'],
        description: 'looking for entry points...',
        defineName: p => path.basename(p, '.entry.js')
    },
});

api.getConfiguration(settings)
.then(configuration => oryx.build(configuration))
.catch(error => console.error('An error occurred while creating configuration', error));
```

2. In `package.json`, update lines related to Zed to use this config:

```json
"zed": "node ./frontend/zed-build",
"zed:watch": "node ./frontend/zed-build --dev",
"zed:production": "node ./frontend/zed-build --prod",
```

The matching path is configured with the `path.resolve('./src/Pyz')` line; and the file names are configured with line patterns: `['**/Zed/**/*.entry.js'],`.

An example of the project file location:  `Pyz\Zed\Product\assets\js\main.entry.js`.

{% info_block warningBox %}

Do not remove pattern `/Zed/**/*.entry.js` because this breaks the Core assets build process and might lead to non-functional Zed.

{% endinfo_block %}
