---
title: Migration guide - ProductSetPageSearch
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productsetpagesearch
originalArticleId: 21dee07e-945c-4458-a466-047ed864eb6c
redirect_from:
  - /2021080/docs/migration-guide-productsetpagesearch
  - /2021080/docs/en/migration-guide-productsetpagesearch
  - /docs/migration-guide-productsetpagesearch
  - /docs/en/migration-guide-productsetpagesearch
---

## Upgrading from version 1.3.* to version 1.4.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/module-migration-guides/migration-guide-search.html#upgrading-from-version-89-to-version-810).

{% endinfo_block %}

To upgrade the module, do the following:
1. Update the module with composer:
```bash
composer update spryker/product-set-page-search
```
2. Remove deprecated plugin usages (if any) from `Pyz\Zed\Search\SearchDependencyProvider`:
```php
Spryker\Zed\ProductSetPageSearch\Communication\Plugin\Search\ProductSetPageMapPlugin
```
