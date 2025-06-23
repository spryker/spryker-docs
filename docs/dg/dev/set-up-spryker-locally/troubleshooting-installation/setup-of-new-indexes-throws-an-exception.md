---
title: Setup of new indexes throws an exception
description: Learn how to troubleshoot and resolve when setup of new indexes throws an exception within your Spryker local environment.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/setup-of-new-indexes-throws-an-exception
originalArticleId: bd5c483b-b968-46ce-9995-a293a74a8269
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-docker-installation/setup-of-new-indexes-throws-an-exception.html
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/setup-of-new-indexes-throws-an-exception.html
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html
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
  - title: Node Sass does not yet support your current environment
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html
  - title: Vendor folder synchronization error
    link: docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html
---

## Description

Running the command `setup-search-create-sources [vendor/bin/console search:setup:sources]` returns the exception:

```bash
Elastica\Exception\Connection\HttpException - Exception: Couldn't resolve host
in /data/vendor/ruflin/elastica/lib/Elastica/Transport/Http.php (190)
```

## Solution

Increase RAM for Docker usage.
