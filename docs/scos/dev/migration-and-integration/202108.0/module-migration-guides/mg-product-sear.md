---
title: Migration Guide - ProductSearch
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-search
redirect_from:
  - /2021080/docs/mg-product-search
  - /2021080/docs/en/mg-product-search
---

## Upgrading from Version 3.* to Version 4.*

1. Requires version ^4.0.0 of Product and ^5.0.0 of Search bundles.
2. `ProductSearchFacade::activateProductSearch()` and `ProductSearchFacade::deactivateProductSearch()` are not connected to `searchableProduct` anymore.
3. `ProductSearchFacade::saveProductSearchPreferences()` was removed. Added separated create, update and clean methods instead.
4. Added `spy_product_search_attribute` new database table for product attribute search filter handling. To get the database changes you’ll need to run `vendor/bin/console propel:diff` to generate a propel migration file, then `vendor/bin/console propel:migrate` to apply it. Make sure before the second command that you checked and cleaned up the content of the migration file if necessary.
5. Along with the database changes you’ll need to run `vendor/bin/console propel:model:build` to generate the necessary propel classes for the changes. After running that command you’ll find some new classes in your project under `\Orm\Zed\ProductSearch\Persistence` namespace. It’s important that you make sure that they are extending the base classes from the core, i.e.
    1. `Orm\Zed\ProductSearch\Persistence\SpyProductSearchAttribute` extends `Spryker\Zed\ProductSearch\Persistence\Propel\AbstractSpyProductSearchAttribute`,
    2. `Orm\Zed\ProductSearch\Persistence\SpyProductSearchAttributeMap` extends `Spryker\Zed\ProductSearch\Persistence\Propel\AbstractSpyProductSearchAttributeMap`.
6. In order to activate the changes of the new product search and filter preferences Zed UIs, you’ll need to register the `Spryker\Zed\ProductSearch\Communication\Plugin\ProductSearchConfigExtensionCollectorPlugin` in your `CollectorDependencyProvider` (under the `\Spryker\Zed\Collector\CollectorDependencyProvider::STORAGE_PLUGINS` key). This will make sure to write the search and filter preferences changes into redis when the collectors run. To enable reading them you’ll also need to register `Spryker\Zed\ProductSearch\Communication\Plugin\ProductSearchConfigExtensionCollectorPlugin` in `Pyz\Client\Search\SearchDependencyProvider::createSearchConfigExpanderPlugins()`.
