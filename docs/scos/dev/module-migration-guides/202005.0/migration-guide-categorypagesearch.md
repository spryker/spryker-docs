---
title: Migration Guide - CategoryPageSearch
originalLink: https://documentation.spryker.com/v5/docs/migration-guide-categorypagesearch
originalArticleId: 1a3c0593-1aac-48cb-ad9c-9df11a7e59c2
redirect_from:
  - /v5/docs/migration-guide-categorypagesearch
  - /v5/docs/en/migration-guide-categorypagesearch
---

## Upgrading from Version 1.4.* to Version 1.5.*
{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202005.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-search.html#upgrading-from-version-8-9---to-version-8-10--). 

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
