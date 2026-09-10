---
title: Upgrade the ContentFileWidget module
description: Use the guide to update versions to the newer ones of the ContentFileWidget module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
redirect_from:
  - /docs/scos/dev/module-migration-guides/migration-guide-contentfilewidget.html
  - /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/upgrade-modules/upgrade-the-contentfilewidget-module.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentfilewidget-module.html
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `ContentFileWidget` module, we have added the support of the new `spryker-shop/file-manager-widget` and `spryker/file-manager-storage` major versions (`^2.0.0`).

*Estimated migration time: 5 minutes*

Upgrade the `ContentFileWidget` module to the new version:

```bash
composer require spryker-shop/content-file-widget: "^2.0.0" --update-with-dependencies
```
