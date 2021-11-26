---
title: Migration guide - ProductRelation
description: Use the guide to learn how to update the ProductRelation module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productrelation
originalArticleId: 7e947ff1-adde-438d-8814-d1b41072f63f
redirect_from:
  - /2021080/docs/migration-guide-productrelation
  - /2021080/docs/en/migration-guide-productrelation
  - /docs/migration-guide-productrelation
  - /docs/en/migration-guide-productrelation
  - /v1/docs/mg-product-relation
  - /v1/docs/en/mg-product-relation
  - /v2/docs/mg-product-relation
  - /v2/docs/en/mg-product-relation
  - /v3/docs/mg-product-relation
  - /v3/docs/en/mg-product-relation
  - /v4/docs/mg-product-relation
  - /v4/docs/en/mg-product-relation
  - /v5/docs/migration-guide-productrelation
  - /v5/docs/en/migration-guide-productrelation
  - /v6/docs/migration-guide-productrelation
  - /v6/docs/en/migration-guide-productrelation
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-product-relation.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-product-relation.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-product-relation.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productrelation.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productrelation.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productrelation.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productrelation.html
---

## Upgrading from version 2.* to 3.0.0

From version 2.* we have added the possibility to assign product relations to stores.

**To upgrade to the new version of the module, do the following:**

1. Upgrade the ProductRelation module to the new version:
```bash
composer require spryker/product-relation:"^3.0.0" --update-with-dependencies
```

2. Prepare a database entity schema for each store in the system:
```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```


3. Run the database migration:
```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 30 minutes.*


## Upgrading from version 1.* to version 2.*

In version 2 we have added multi-currency support. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/migration-guide-price.html). We have changed Zed table to use `PriceProductFacade` for retrieving product prices. We have also changed `\Spryker\Client\ProductRelation\Storage\ProductRelationStorage` to resolve ProductRelation prices based on the selected currency, price mode combination. If you modified this class in project or extended it, you may want adapt to core version.


