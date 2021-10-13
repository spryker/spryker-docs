---
title: Migration Guide - CategoryPageSearch
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-categorypagesearch
originalArticleId: ec9b2290-a057-47fd-bcfa-2fb4ed6b5377
redirect_from:
  - /v6/docs/migration-guide-categorypagesearch
  - /v6/docs/en/migration-guide-categorypagesearch
---

## Upgrading from Version 1.4.* to Version 1.5.*
{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-search.html#upgrading-from-version-8-9---to-version-8-10--). 

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
