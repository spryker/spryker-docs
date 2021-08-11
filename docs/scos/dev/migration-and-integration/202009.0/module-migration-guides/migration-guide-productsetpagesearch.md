---
title: Migration Guide - ProductSetPageSearch
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-productsetpagesearch
redirect_from:
  - /v6/docs/migration-guide-productsetpagesearch
  - /v6/docs/en/migration-guide-productsetpagesearch
---

## Upgrading from Version 1.3.* to Version 1.4.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](https://documentation.spryker.com/docs/search-migration-concept). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](https://documentation.spryker.com/docs/mg-search#upgrading-from-version-8-9---to-version-8-10--). 

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
