---
title: Switch to ARM architecture (M1 chip)
description: Learn how to switch Docker based projects to ARM architecture.
template: howto-guide-template
redirect_from:
- /docs/scos/dev/technical-enhancement-integration-guides/switch-to-arm-architecture-m1-chip.html
last_updated: Jun 22, 2023

---

This document explains how to install Spryker in Docker on a device with an ARM chip using demo shops versions 202108.0 or earlier.

The steps below should be followed after you have completed the *Clone a Demo Shop and the Docker SDK* section in the installation guides for [development](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-development-mode-on-macos-and-linux.html#clone-a-demo-shop-and-the-docker-sdk) and [demo](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-demo-mode-on-macos-and-linux.html#clone-a-demo-shop-and-the-docker-sdk) modes.

To switch to ARM architecture, follow the steps:

## Update Sass

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

4. In `frontend/configs/development.js`, add the implementation of `options` for `saas-loader`:
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


## Update RabbitMQ and Jenkins services

In the deploy file, update RabbitMQ and Jenkins to [ARM supporting versions](https://github.com/spryker/docker-sdk#supported-services). Example:

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


## Enable Jenkins CSRF protection


1. In the deploy file, enable the usage of the CSRF variable:

```yaml
...
services:
  scheduler:
    csrf-protection-enabled: true
...
```    

2. In the config file, enable Jenkins CSRF protection by defining the CSRF variable:

```php
...
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_CSRF_ENABLED => (bool)getenv('SPRYKER_JENKINS_CSRF_PROTECTION_ENABLED'),
    ],
];
...
```

Once done, you can proceed with *Configure and start the instance* section of the installation guides.
