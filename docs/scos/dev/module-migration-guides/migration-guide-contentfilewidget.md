---
title: ContentFileWidget
description: Use the guide to update versions to the newer ones of the ContentFileWidget module.
last_updated: May 20, 2022
template: module-migration-guide-template
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `ContentFileWidget` module, we have added the support of the new `spryker-shop/file-manager-widget` and `spryker/file-manager-storage` major versions (`^2.0.0`).

*Estimated migration time: 5 minutes*

To upgrade to the new version of the module, upgrade the `ContentFileWidget` module to the new version:

```bash
composer require spryker-shop/content-file-widget: "^2.0.0" --update-with-dependencies
```
