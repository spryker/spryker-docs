---
title: An error during front end setup
description: Learn how to troubleshoot and resolve an error during front end setup with your Spryker local environment.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/an-error-during-front-end-setup
originalArticleId: 4bce6fdf-0686-44a7-8608-ae5f292cfdba
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/an-error-during-front-end-setup.html
related:
  - title: Demo data was imported incorrectly
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html
  - title: Docker daemon is not running
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html
  - title: docker-sync cannot start
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html
  - title: Error 403 No valid crumb was included in the request
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html
  - title: Node Sass does not yet support your current environment
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html
  - title: Setup of new indexes throws an exception
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html
  - title: Vendor folder synchronization error
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html
---

## Description

The `frontend:project:install-dependencies` command returns an error similar to the following:

```
-->  DEVELOPMENT MODE
Store: US | Environment: docker
Install Project dependencies
[info] npm
[info]  WARN prepare
[info]  removing existing node_modules/ before installation
[info]
> fsevents@1.2.11 install /data/node_modules/fsevents
> node-gyp rebuild
[info] gyp
[info]  ERR! find Python
gyp ERR! find Python
[info]  Python is not set from command line or npm configuration
gyp ERR!
[info] find Python Python is not set from environment variable PYTHON
gyp ERR!
[info]  find Python checking if "python" can be used
gyp ERR!
```

## Solution

1. In `deploy.*.yaml`, change the base PHP image:

```yaml
image:
    tag: spryker/php:7.3-alpine3.10
```

2. Fetch the changes and start the instance:

```bash
docker/sdk boot && docker/sdk up
```
