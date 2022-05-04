---
title: Switch to ARM architecture (M1 chip)
description: Learn how to switch Docker based projects to ARM architecture.
template: howto-guide-template
---

This document describes how to switch Docker based projects to ARM architecture. This lets you run Spryker projects on M1 based Apple devices.

To switch to ARM architecture, follow the steps:

## 1. Update Sass

Replace x86 based Sass with an ARM based one:

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
7. Rebuild Yves:

```bash
npm run yves
```

8. Rebuild Zed

```bash
npm run zed
```

## 2. Update RabbitMQ and Jenkins services

In the Deploy file, update RabbitMQ and Jenkins to [ARM supporting versions](https://github.com/spryker/docker-sdk#supported-services). Example:

```yaml
services:
...
    broker:
        engine: rabbitmq
        version: '3.9'
        api:
            username: 'spryker'
            password: 'secret'
        endpoints:
            queue.spryker.local:
            localhost:5672:
                protocol: tcp
...
        scheduler:
        engine: jenkins
        version: '2.324'
        endpoints:
            scheduler.spryker.local:
...
```


## 3. Enabled Jenkins CSRF protection
