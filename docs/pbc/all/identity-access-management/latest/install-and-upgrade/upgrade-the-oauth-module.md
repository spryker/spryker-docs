---
title: Upgrade the Oauth module
description: Learn how to migrate and update to a newer version of Oauth module from an older one in your Spryker project.
last_updated: Aug 6, 2026
template: module-migration-guide-template
redirect_from:
  - /docs/scos/dev/module-migration-guides/migration-guide-oauth.html
  - /docs/pbc/all/identity-access-management/202204.0/install-and-upgrade/upgrade-the-oauth-module.html
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `Oauth` module, we have added the support of the new `league/oauth2-server` major version (`^8.0.0`).

*Estimated migration time: 5 minutes*

Upgrade the `Oauth` module to the new version:

```bash
composer require spryker/oauth: "^2.0.0" --update-with-dependencies
```
