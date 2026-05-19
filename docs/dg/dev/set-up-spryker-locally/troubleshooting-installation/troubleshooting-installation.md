---
title: Troubleshooting installation
description: Learn how you can troubleshoot issues that occur during installing Spryker to a local environment.
last_updated: Jun 16, 2023
template: troubleshooting-guide-template
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/troubleshooting-installation.html
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/troubleshooting-installation.html

---

This section describes common issues and solutions related to installing Spryker locally.

## Clear application cache

If you encounter compilation errors during installation or after setup, clear the cache for the affected application.

**Clear cache for Zed:**

```bash
docker/sdk cli vendor/bin/console cache:clear
```

**Clear cache for Glue API:**

```bash
docker/sdk cli vendor/bin/glue cache:clear
```

**Clear cache for Glue Storefront API:**

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue cache:clear
```

**Clear cache for Glue Backend API:**

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND vendor/bin/glue cache:clear
```

These commands clear the compiled container cache and resolve most cache-related installation issues.

## Topics

- [Clear application cache](#clear-application-cache)
- [An error during front end setup](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html)
- [Demo data was imported incorrectly](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html)
- [Docker daemon is not running](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html)
- [docker-sync cannot start](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html)
- [Error 403 No valid crumb was included in the request](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html)
- [Node Sass does not yet support your current environment](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html)
- [Setup of new indexes throws an exception](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html)
- [Unable to bring up Mutagen Compose sidecar service](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/unable-to-bring-up-mutagen-compose-sidecar-service.html)
- [Vendor folder synchronization error](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html)
