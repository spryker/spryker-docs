---
title: Oauth
description: Use the guide to update versions to the newer ones of the Oauth module.
template: module-migration-guide-template
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `Oauth` module, we have added support of new `league/oauth2-server` major version (`^8.0.0`).

*Estimated migration time: 5 minutes*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Oauth` module to the new version:

```bash
composer require spryker/oauth: "^2.0.0" --update-with-dependencies
```
