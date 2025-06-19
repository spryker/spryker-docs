

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
