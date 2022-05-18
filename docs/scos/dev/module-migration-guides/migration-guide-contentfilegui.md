---
title: ContentFileGui
description: Use the guide to update versions to the newer ones of the ContentFileGui module.
template: module-migration-guide-template
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the `ContentFileGui` module, we have added support of new `spryker/file-manager` major version (`^2.0.0`).

*Estimated migration time: 5 minutes*

To upgrade to the new version of the module, do the following:

1. Upgrade the `ContentFileGui` module to the new version:

```bash
composer require spryker/content-file-gui: "^2.0.0" --update-with-dependencies
```
