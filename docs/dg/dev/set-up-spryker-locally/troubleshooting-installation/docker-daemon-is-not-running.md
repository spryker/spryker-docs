---
title: Docker daemon is not running
description: Learn how to fix the issue when the Docker daemon is not running
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-daemon-is-not-running
originalArticleId: 3e6be679-774f-46f8-8287-39256d5ebe6f
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/docker-daemon-is-not-running.html
related:
  - title: An error during front end setups
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html
  - title: Demo data was imported incorrectly
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html
  - title: docker-sync cannot start
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html
  - title: Error 403 No valid crumb was included in the request
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html
  - title: Node Sass does not yet support your current environment
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html
  - title: Setup of new indexes throws an exception
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html
  - title: Vendor folder synchronization error
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html
---

## Description

Running the `docker/sdk up` console command might return a similar error:

```
Error response from daemon: Bad response from Docker engine
```

## Solution

1. Make sure Docker daemon is running.
2. Run docker/sdk up again.
