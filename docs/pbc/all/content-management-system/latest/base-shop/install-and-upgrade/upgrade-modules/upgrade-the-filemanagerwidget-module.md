---
title: Migration guide - FileManagerWidget
description: Use the guide to update versions to the newer ones of the FileManagerWidget module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
redirect_from:
- /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/upgrade-modules/upgrade-the-filemanagerwidget-module.html
- /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-filemanagerwidget-module.html
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `FileManagerWidget` module, we have added support of new `spryker/file-manager` and `spryker/file-manager-storage` major versions (`^2.0.0`).

*Estimated migration time: 5 minutes*

Upgrade the `FileManagerWidget` module to the new version:

```bash
composer require spryker-shop/file-manager-widget: "^2.0.0" --update-with-dependencies
```
