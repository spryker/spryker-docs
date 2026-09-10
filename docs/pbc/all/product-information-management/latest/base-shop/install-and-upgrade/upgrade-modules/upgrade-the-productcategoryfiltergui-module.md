---
title: Upgrade the ProductCategoryFilterGui module
description: Learn how to upgrade from an older version to a newer one of the product category filter GUI module within your Spryker based project.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productcategoryfiltergui
originalArticleId: e44c11a0-7aa0-4d52-88bb-ad5b5065aaf2
redirect_from:
  - /docs/migration-guide-productcategoryfiltergui
  - /docs/en/migration-guide-productcategoryfiltergui
  - /upcoming-release/docs/migration-guide-productcategoryfiltergui
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productcategoryfiltergui.html
  - /docs/scos/dev/module-migration-guides/migration-guide-productcategoryfiltergui.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productcategoryfiltergui-module.html
---

This document describes how to upgrade the `ProductCategoryFilterGui` module.

## Upgrading from version 1.* to 2.*

In the version `2.*` of the `ProductCategoryFilterGui` module, we adjusted `CategoryTreeController::indexAction()` to remove fill-up of the deprecated `categoryTree` view parameter.

*Estimated migration time: 15 minutes.*

To upgrade the `ProductCategoryFilterGui` module from version `1.*` to `2.*`:

1. Update the `ProductCategoryFilterGui` module to version 2.0.0:

```bash
composer require spryker/product-category-filter-gui:"^2.0.0" --update-with-dependencies
```

2. Generate transfer objects:

```bash
console transfer:generate
```

3. Update the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Ensure that `https://mysprykershop.com/product-category-filter-gui` displays a category tree.

{% endinfo_block %}
