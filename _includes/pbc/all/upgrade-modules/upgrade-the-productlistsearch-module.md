

## Upgrading from version 1.* to version 2.*

The main goal of `ProductListSearch` 2.x.x is to add support of Concrete Products search introduced in `ProductPageSearch` 3.x.x.

_Estimated migration time: ~1h_

To complete the migration, follow the steps below:

1. Update `spryker/product-page-search` ^3.2.0
2. Follow the steps from Upgrade the ProductPageSearch module.
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
