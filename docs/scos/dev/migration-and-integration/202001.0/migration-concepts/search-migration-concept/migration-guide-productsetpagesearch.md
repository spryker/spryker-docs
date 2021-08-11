---
title: Migration Guide - ProductSetPageSearch
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-productsetpagesearch
redirect_from:
  - /v4/docs/migration-guide-productsetpagesearch
  - /v4/docs/en/migration-guide-productsetpagesearch
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide-search.html). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Update the module with composer:
```Bash
composer update spryker/product-set-page-search
```
2. Remove deprecated plugin usages (if any) from `Pyz\Zed\Search\SearchDependencyProvider`:
```PHP
Spryker\Zed\ProductSetPageSearch\Communication\Plugin\Search\ProductSetPageMapPlugin
```
