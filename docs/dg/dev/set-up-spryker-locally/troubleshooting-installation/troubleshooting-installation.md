---
title: Troubleshooting installation
description: Troubleshoot installation issues.
last_updated: Jun 16, 2023
template: troubleshooting-guide-template
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/troubleshooting-installation.html
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/troubleshooting-installation.html

---

This section describes common issues and solutions related to installing Spryker locally.

<details>
<summary>unable to bring up Mutagen Compose sidecar service: Error response from daemon: network  is ambiguous (X matches found based on ID prefix)</summary>
The issue appears in Mutagen v0.18. In order to fix it, you need to downgrade Mutagen to v0.17. To do this, run the following commands:
```
brew unlink mutagen && brew unlink mutagen-compose && brew install mutagen-io/mutagen/mutagen@0.17 mutagen-io/mutagen/mutagen-compose@0.17
```
</details>

## More Troubleshooting Guides

Troubleshooting [Docker installation](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html):
* [An error during front end setup](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html)
* [Demo data was imported incorrectly](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html)
* [Docker daemon is not running](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html)
* [docker-sync cannot start](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html)
* [Error 403 No valid crumb was included in the request](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html)
* [Node Sass does not yet support your current environment](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html)
* [Setup of new indexes throws an exception](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html)
* [Vendor folder synchronization error](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html)
