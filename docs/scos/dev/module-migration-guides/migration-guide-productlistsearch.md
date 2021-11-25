---
title: Migration guide - ProductListSearch
description: Use the guide to learn how to update the ProductListSearch module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-list-search
originalArticleId: 0d7bbb99-551f-4225-bbaf-c3c35c40bfba
redirect_from:
  - /2021080/docs/mg-product-list-search
  - /2021080/docs/en/mg-product-list-search
  - /docs/mg-product-list-search
  - /docs/en/mg-product-list-search
  - /v1/docs/mg-product-list-search
  - /v1/docs/en/mg-product-list-search
  - /v2/docs/mg-product-list-search
  - /v2/docs/en/mg-product-list-search
  - /v3/docs/mg-product-list-search
  - /v3/docs/en/mg-product-list-search
  - /v4/docs/mg-product-list-search
  - /v4/docs/en/mg-product-list-search
  - /v5/docs/mg-product-list-search
  - /v5/docs/en/mg-product-list-search
  - /v6/docs/mg-product-list-search
  - /v6/docs/en/mg-product-list-search
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productlistsearch.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productlistsearch.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productlistsearch.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productlistsearch.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productlistsearch.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productlistsearch.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productlistsearch.html
---

## Upgrading from Version 1.* to Version 2.*

The main goal of `ProductListSearch` 2.x.x is to add support of Concrete Products search introduced in `ProductPageSearch` 3.x.x.
To complete the migration, follow the steps below:

1. Update `spryker/product-page-search` ^3.2.0
2. Follow the steps from Migration guide - ProductPageSearch.
3. Update `spryker/product-list-search` to ^2.0.0
4. Generate transfers:
`vendor/bin/console transfer:generate`
5. Enable plugins in `\Pyz\Zed\ProductPageSearch\ProductPageSearchDependencyProvider`.

```php
<?php
/**
 * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageMapExpanderPluginInterface[]
 */
protected function getConcreteProductPageMapExpanderPlugins(): array
{
	return [
		new ProductConcreteProductListPageMapExpanderPlugin(),
	];
}

/**
 * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageDataExpanderPluginInterface[]
 */
protected function getProductConcretePageDataExpanderPlugins(): array
{
	return [
		new ProductConcreteProductListPageDataExpanderPlugin(),
	];
}
```

_Estimated migration time: ~1h_

<!-- Last review date: Mar 13, 2019 by Stanislav Matveyev, Oksana Karasyova -->
