---
title: Migration guide - ProductRelationCollector
description: Use the guide to learn how to update the ProductRelationCollector module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-relation-collector
originalArticleId: 2b97c2a3-14c3-41f1-8a7f-743019bf6bb6
redirect_from:
  - /2021080/docs/mg-product-relation-collector
  - /2021080/docs/en/mg-product-relation-collector
  - /docs/mg-product-relation-collector
  - /docs/en/mg-product-relation-collector
  - /v1/docs/mg-product-relation-collector
  - /v1/docs/en/mg-product-relation-collector
  - /v2/docs/mg-product-relation-collector
  - /v2/docs/en/mg-product-relation-collector
  - /v3/docs/mg-product-relation-collector
  - /v3/docs/en/mg-product-relation-collector
  - /v4/docs/mg-product-relation-collector
  - /v4/docs/en/mg-product-relation-collector
  - /v5/docs/mg-product-relation-collector
  - /v5/docs/en/mg-product-relation-collector
  - /v6/docs/mg-product-relation-collector
  - /v6s/docs/en/mg-product-relation-collector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productrelationcollector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productrelationcollector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productrelationcollector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productrelationcollector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productrelationcollector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productrelationcollector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productrelationcollector.html
---

## Upgrading from version 1.* to version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/migration-guide-price.html). We have changed collector dependency to use `PriceProduct` module instead of price, please update your code accordingly if you overwrote the core.

<!--
* [Learn more about Products in multi-store environment](/docs/scos/dev/feature-integration-guides/{{site.version}}/multi-store-products-feature-integration.html)-->

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
