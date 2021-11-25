---
title: Migration guide - MerchantRelationshipProductListGui
description: This guide provides migration steps to upgrade  MerchantRelationshipProductListGui to the newer major version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-merchantrelationshipproductlistgui
originalArticleId: 4aa4e522-7751-4929-9565-39208907e75c
redirect_from:
  - /2021080/docs/migration-guide-merchantrelationshipproductlistgui
  - /2021080/docs/en/migration-guide-merchantrelationshipproductlistgui
  - /docs/migration-guide-merchantrelationshipproductlistgui
  - /docs/en/migration-guide-merchantrelationshipproductlistgui
  - /v4/docs/migration-guide-merchantrelationshipproductlistgui
  - /v4/docs/en/migration-guide-merchantrelationshipproductlistgui
  - /v5/docs/migration-guide-merchantrelationshipproductlistgui
  - /v5/docs/en/migration-guide-merchantrelationshipproductlistgui
  - /v6/docs/migration-guide-merchantrelationshipproductlistgui
  - /v6/docs/en/migration-guide-merchantrelationshipproductlistgui
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-merchantrelationshipproductlistgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-merchantrelationshipproductlistgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-merchantrelationshipproductlistgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-merchantrelationshipproductlistgui.html
related:
  - title: Migration guide - ProductListGui
    link: docs/scos/dev/module-migration-guides/migration-guide-productlistgui.html
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
