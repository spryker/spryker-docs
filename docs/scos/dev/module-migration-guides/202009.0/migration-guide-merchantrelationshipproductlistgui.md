---
title: Migration Guide - MerchantRelationshipProductListGui
description: This guide provides migration steps to upgrade  MerchantRelationshipProductListGui to the newer major version.
last_updated: Aug 27, 2020
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-merchantrelationshipproductlistgui
originalArticleId: 3bbfa15b-81be-43b6-acd7-e08a4b3e916c
redirect_from:
  - /v6/docs/migration-guide-merchantrelationshipproductlistgui
  - /v6/docs/en/migration-guide-merchantrelationshipproductlistgui
related:
  - title: Migration Guide - ProductListGui
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-productlistgui.html
---

## Upgrading from Version 1.* to Version 2.0.0
The main point of the `MerchantRelationshipProductListGui` v2.0.0 is the following: exclusive ownership for product lists was removed from the merchant relations.

So, `MerchantRelationshipProductListGui` currently provides plugins to extend the `ProductListGui` module with information about domain entities that use Product Lists (Merchant Relationships).

Here is the change list for the `MerchantRelationshipProductListGui` v2.0.0:
* Added `spryker/util-text` module to dependencies.
* Added `spryker/merchant-relationship-product-list` module to dependencies.
* Introduced `ProductListMerchantRelationshipEditFormExpanderPlugin` and `ProductListMerchantRelationshipCreateFormExpanderPlugin` form expander plugins for the `MerchantRelationshipGui` module.
* Introduced `MerchantRelationshipProductListUsedByTableExpanderPlugin` and `MerchantRelationListProductListTopButtonsExpanderPlugin` expander plugins for the `ProductListGui` module.
* Added Zed translations for form elements and labels.
* Deprecated `MerchantRelationshipProductListOwnerTypeFormExpanderPlugin`.
* Deprecated `MerchantRelationshipTableExpanderPlugin`.

**To upgrade to the new version of the module, do the following:**

1. Update the `MerchantRelationshipProductListGui` module version and its dependencies by running the following command:
```bash
composer require spryker/merchant-relationship-product-list-gui:"^2.0.0" --update-with-dependencies
```
2. Update transfer objects:
```bash 
console transfer:generate
```
3. Generate translator cache by running the following command to get the latest Zed translations:
```bash
console translator:generate-cache
```

*Estimated migration time: 1hour*
