---
title: Migration guide - FileManager
description: Use the guide to update versions to the newer ones of the FileManager module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
redirect_from:
- /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/upgrade-modules/upgrade-the-filemanager-module.html
- /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-filemanager-module.html
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `FileManager` module, we have added the support of the new `spryker/file-system` major version (`^2.0.0`).

*Estimated migration time: 5 minutes*

Upgrade the `FileManager` module to the new version:

```bash
composer require spryker/file-manager: "^2.0.0" --update-with-dependencies
```
