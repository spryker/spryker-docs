---
title: Migration Guide - CategoryPageSearch
originalLink: https://documentation.spryker.com/v5/docs/migration-guide-categorypagesearch
redirect_from:
  - /v5/docs/migration-guide-categorypagesearch
  - /v5/docs/en/migration-guide-categorypagesearch
---

## Upgrading from Version 1.4.* to Version 1.5.*
{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](https://documentation.spryker.com/docs/en/search-migration-concept). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](https://documentation.spryker.com/docs/en/mg-search#upgrading-from-version-8-9---to-version-8-10--). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Update the modules with composer:
```Bash
composer update spryker/category-page-search
```
2. Remove deprecated plugin usages listed below (in case it is used) from `Pyz\Zed\Search\SearchDependencyProvider`:
```Bash
Spryker\Zed\CategoryPageSearch\Communication\Plugin\Search\CategoryNodeDataPageMapBuilder
```
