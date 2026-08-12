---
title: Upgrade the ProductSearch module
description: Use the guide to learn how to update the ProductSearch module to a newer version.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-search
originalArticleId: 7baf769a-321d-4fee-a1fc-9a16b6a5f8a8
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productsearch.html
  - /docs/scos/dev/module-migration-guides/migration-guide-productsearch.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productsearch-module.html
related:
  - title: Upgrade the Product module
    link: docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-product-module.html
  - title: Upgrade the ProductSetGUI module
    link: docs/scos/dev/module-migration-guides/migration-guide-productsetgui.html
---
## Upgrading from version 3.* to version 4.*

1. Requires version ^4.0.0 of Product and ^5.0.0 of Search bundles.
2. `ProductSearchFacade::activateProductSearch()` and `ProductSearchFacade::deactivateProductSearch()` are not connected to `searchableProduct` anymore.
3. `ProductSearchFacade::saveProductSearchPreferences()` was removed. Added separated create, update and clean methods instead.
4. Added `spy_product_search_attribute` new database table for product attribute search filter handling. To get the database changes you'll need to run `vendor/bin/console propel:diff` to generate a propel migration file, then `vendor/bin/console propel:migrate` to apply it. Make sure before the second command that you checked and cleaned up the content of the migration file if necessary.
5. Along with the database changes you'll need to run `vendor/bin/console propel:model:build` to generate the necessary propel classes for the changes. After running that command you'll find some new classes in your project under `\Orm\Zed\ProductSearch\Persistence` namespace. It's important that you make sure that they are extending the base classes from the core, for example:

    - `Orm\Zed\ProductSearch\Persistence\SpyProductSearchAttribute` extends `Spryker\Zed\ProductSearch\Persistence\Propel\AbstractSpyProductSearchAttribute`
    - `Orm\Zed\ProductSearch\Persistence\SpyProductSearchAttributeMap` extends `Spryker\Zed\ProductSearch\Persistence\Propel\AbstractSpyProductSearchAttributeMap`

6. In order to activate the changes of the new product search and filter preferences Zed UIs, you'll need to register the `Spryker\Zed\ProductSearch\Communication\Plugin\ProductSearchConfigExtensionCollectorPlugin` in your `CollectorDependencyProvider` (under the `\Spryker\Zed\Collector\CollectorDependencyProvider::STORAGE_PLUGINS` key). This will make sure to write the search and filter preferences changes into key-value storage (Redis or Valkey) when the collectors run. To enable reading them you'll also need to register `Spryker\Zed\ProductSearch\Communication\Plugin\ProductSearchConfigExtensionCollectorPlugin` in `Pyz\Client\Search\SearchDependencyProvider::createSearchConfigExpanderPlugins()`.
