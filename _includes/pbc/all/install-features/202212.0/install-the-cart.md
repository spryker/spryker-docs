

{% info_block infoBox %}

This document describes how to add product variants, product images, and price validation for a cart's items to an existing cart.

{% endinfo_block %}

## Prerequisites

Read the concept of Spryker [super attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html#super-attributes).

## UI changes

The cart now supports changing cart items by modifying their attributes. If you have the wrong t-shirt size in the cart, you can change it.

The cart supports product images out of the box.

![cart_product_images](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/feature-integration-guides/cart-integration.md/cart_product_images.png)

Based on the super attributes, you can select the needed product variant in the cart.

![product_super_attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/feature-integration-guides/cart-integration.md/product_super_attributes.png)

## Add item images

To support images in a cart, install the optional module `ProductImageCartConnector`:

```bash
composer require spryker/product-image-cart-connector
```

This module provides `ProductImageCartPlugin`, which you must register later in your shop's `CartDependencyProvider` as follows:

```php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
 */
protected function getExpanderPlugins(Container $container)
{
    return [
        // your existing plugins ...
        new ProductImageCartPlugin(),
    ];
}
```

If your shop uses product bundles, register `ExpandBundleItemsWithImagesPlugin` in your shop's `CartDependencyProvider` as follows:

```php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
 */
protected function getExpanderPlugins(Container $container)
{
    return [
	  //your existing plugins
        new ExpandBundleItemsWithImagesPlugin(),
        ];
}
```

{% info_block warningBox "Verification" %}

Make sure `ExpandBundleItemsWithImagesPlugin` is registered after the `ExpandBundleItemsPlugin` plugin.

{% endinfo_block %}

### Add price validation

Spryker provides the `PriceCartConnector` module for this purpose.

Install the `PriceCartConnector` module:

```bash
composer require spryker/price-cart-connector
```

This module provides the `CartItemPricePreCheckPlugin`, which you must register later in your shop `CartDependencyProvider` as follows:

```php
/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
*/
protected function getCartPreCheckPlugins(Container $container): array
{
    return [
        // your existing plugins ...
        new CartItemPricePreCheckPlugin(),
    ];
}
```

Adjust the configuration constant to allow or prevent adding products with zero price:

**src/Pyz/Zed/PriceCartConnector/PriceCartConnectorConfig.php**
```php
<?php
namespace Pyz\Zed\PriceCartConnector;
use Spryker\Zed\PriceCartConnector\PriceCartConnectorConfig as SprykerPriceCartConnectorConfig;

class PriceCartConnectorConfig extends SprykerPriceCartConnectorConfig
{
    protected const IS_ZERO_PRICE_ENABLED_FOR_CART_ACTIONS = false;
}
```

If it has the `false` value, while attempting to add the product with zero price to the cart, you get the following message: "Price in selected currency not found for product with sku '%sku%'. Please change the currency or remove product from order."

#### Install cart variants

Spryker provides the `CartVariant` module for this purpose.

Install the `CartVariant` module:

```bash
composer require spryker/cart-variant
```

### Update attribute map collector

To support the mapping between attributes and availability, you need to collect additional data in your attribute map collector. You can do that by adding the `SpyProductTableMap::COL_SKU` line to the `getConreteProducts` function.

The full function is as follows:

```php
/**
 * @param int $idProductAbstract
 *
 * @return \Orm\Zed\Product\Persistence\SpyProduct[]|\Propel\Runtime\Collection\ObjectCollection
 */
protected function getConcreteProducts($idProductAbstract)
{
    return SpyProductQuery::create()
        ->select([
            SpyProductTableMap::COL_ID_PRODUCT,
            SpyProductTableMap::COL_ATTRIBUTES,
            SpyProductTableMap::COL_SKU,
        ])
        ->withColumn(SpyProductLocalizedAttributesTableMap::COL_ATTRIBUTES, 'localized_attributes')
        ->useSpyProductLocalizedAttributesQuery()
            ->filterByFkLocale($this->locale->getIdLocale())
        ->endUse()
        ->filterByFkProductAbstract($idProductAbstract)
        ->filterByIsActive(true)
        ->find()
        ->toArray(null, false, TableMap::TYPE_CAMELNAME);
}
```

The `filterConcreteProductIds` function changes to the following:

```php
/**
 * @param array $concreteProducts
 *
 * @return array
 */
protected function filterConcreteProductIds(array $concreteProducts)
{
    $concreteProductIds = array_map(function ($product) {
        return $product[SpyProductTableMap::COL_ID_PRODUCT];
    }, $concreteProducts);
    foreach ($concreteProducts as $product) {
        $concreteProductIds[$product[SpyProductTableMap::COL_SKU]] = $product[SpyProductTableMap::COL_ID_PRODUCT];
    }
    asort($concreteProductIds);
    return $concreteProductIds;
}
```
