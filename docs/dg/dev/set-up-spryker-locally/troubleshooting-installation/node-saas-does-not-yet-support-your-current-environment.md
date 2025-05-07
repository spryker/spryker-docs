---
title: Node Sass does not yet support your current environment
description: Learn how to troubleshoot and resolve the issue of unsupported Sass within your Spryker local environment.
last_updated: May 4, 2022
template: troubleshooting-guide-template
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/node-saas-does-not-yet-support-your-current-environment.html
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html

related:
  - title: An error during front end setups
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html
  - title: Demo data was imported incorrectly
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html
  - title: Docker daemon is not running
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html
  - title: docker-sync cannot start
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html
  - title: Error 403 No valid crumb was included in the request
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html
  - title: Setup of new indexes throws an exception
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html
  - title: Vendor folder synchronization error
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html
---

You get the error: `Node Sass does not yet support your current environment: Linux Unsupported architecture (arm64) with Node.js`.

## Solution

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
