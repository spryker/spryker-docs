---
title: Switch to ARM architecture (M1 chip)
description: Learn how to switch Docker based projects to ARM architecture.
template: howto-guide-template
---

This document describes how to switch Docker based projects to ARM architecture. This lets you run Spryker projects on M1 based Apple devices.

To switch to ARM architecture, follow the steps:

## 1. Update Sass

1. In `package.json`, remove `node-sass` dependencies.
2. Add `sass` and `sass-loader` dependencies.

```json
...
"sass": "~1.32.13",
"sass-loader": "~10.2.0",
...
```

3. Update `@spryker/oryx-for-zed`:

```json
...
"@spryker/oryx-for-zed": "~2.11.5",
...
```

4. In `frontend/configs/development.js`, add configuration for `saas-loader`:
```js
loader: 'sass-loader',
options: {
   implementation: require('sass'),
}
```

5. Enter the Docker SDK CLI:

```bash
docker/sdk cli
```

6. Update `package-lock.json` and install dependencies based on your package manager:
    * npm:
    ```bash
    npm install
    ```
    * yarn:
    ```bash
    yarn install
    ```
7.
