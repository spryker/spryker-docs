---
title: HowTo - Allow Zed CSS/JS on a project
originalLink: https://documentation.spryker.com/v6/docs/howto-allow-zed-cssjs-on-a-project
redirect_from:
  - /v6/docs/howto-allow-zed-cssjs-on-a-project
  - /v6/docs/en/howto-allow-zed-cssjs-on-a-project
---

To allow Zed CSS/JS on a project level, do the following:

1. Create `frontend/zed-build.js` on the project with the following content:

```
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
```
"zed": "node ./frontend/zed-build",
"zed:watch": "node ./frontend/zed-build --dev",
"zed:production": "node ./frontend/zed-build --prod",
```
Matching path is configured with line `path.resolve('./src/Pyz')`, and the file names are configured with line patterns: `['**/Zed/**/*.entry.js'],`.
Example of the project file location:  `Pyz\Zed\Product\assets\js\main.entry.js` .
 {% info_block warningBox %}

Do not remove pattern `'**/Zed/**/*.entry.js'`, as this would break Core assets build process and might lead to non-functional Zed.

{% endinfo_block %}
