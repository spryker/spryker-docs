---
title: Vendor folder synchronization error
description: Learn how to fix the vendor folder synchronization error
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/vendor-folder-synchronization-error
originalArticleId: 375db95b-7144-4fb0-ac97-2ebec018f9d2
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/vendor-folder-synchronization-error.html
related:
  - title: An error during front end setups
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html
  - title: Demo data was imported incorrectly
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html
  - title: Docker daemon is not running
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html
  - title: docker-sync cannot start
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html
  - title: Error 403 No valid crumb was included in the request
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html
  - title: Node Sass does not yet support your current environment
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html
  - title: Setup of new indexes throws an exception
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html
---

You get an error similar to `vendor/bin/console: not found`.

## Solution

Re-build basic images, assets, and codebase:

```bash
docker/sdk up --build --assets
```
