---
title: Unable to bring up Mutagen Compose sidecar service
description: Learn how to fix the Mutagen Compose sidecar service error
last_updated: Nov 24, 2024
template: troubleshooting-guide-template
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

Error: `unable to bring up Mutagen Compose sidecar service: Error response from daemon: network  is ambiguous (X matches found based on ID prefix)`

The issue appears in Mutagen v0.18.

To fix it, downgrade Mutagen to v0.17:

```bash
brew unlink mutagen && brew unlink mutagen-compose && brew install mutagen-io/mutagen/mutagen@0.17 mutagen-io/mutagen/mutagen-compose@0.17
```
