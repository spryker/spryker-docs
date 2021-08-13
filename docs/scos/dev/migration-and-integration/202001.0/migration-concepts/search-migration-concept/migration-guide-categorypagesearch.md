---
title: Migration Guide - CategoryPageSearch
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-categorypagesearch
originalArticleId: 36fa8e9a-ce6e-4f08-8fce-3c175d7b5252
redirect_from:
  - /v4/docs/migration-guide-categorypagesearch
  - /v4/docs/en/migration-guide-categorypagesearch
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide-search.html). 

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
