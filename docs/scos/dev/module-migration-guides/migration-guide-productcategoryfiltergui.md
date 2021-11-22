---
title: Migration guide - ProductCategoryFilterGui
description: Learn how to update the ProductCategoryFilterGui module.
last_updated: Jun 18, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productcategoryfiltergui
originalArticleId: e44c11a0-7aa0-4d52-88bb-ad5b5065aaf2
redirect_from:
  - /2021080/docs/migration-guide-productcategoryfiltergui
  - /2021080/docs/en/migration-guide-productcategoryfiltergui
  - /docs/migration-guide-productcategoryfiltergui
  - /docs/en/migration-guide-productcategoryfiltergui
  - /upcoming-release/docs/migration-guide-productcategoryfiltergui
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productcategoryfiltergui.html
---

This document describes how to upgrade the `ProductCategoryFilterGui` module.

## Upgrading from version 1.* to 2.*

_Estimated migration time: 15 minutes._ 

In the version `2.*` of the `ProductCategoryFilterGui` module, we adjusted `CategoryTreeController::indexAction()` to remove fill-up of the deprecated `categoryTree` view parameter.

To upgrade the `ProductCategoryFilterGui` module from version `1.*` to `2.*`:

1.  Update the `ProductCategoryFilterGui` module to version 2.0.0:
```bash
composer require spryker/product-category-filter-gui:"^2.0.0" --update-with-dependencies
```

2.  Generate transfer objects:
```bash
console transfer:generate
```
3.  Update navigation cache:
```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Ensure that `https://mysprykershop.com/product-category-filter-gui` displays a category tree.

{% endinfo_block %}
