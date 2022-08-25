---
title: Cart integration
description: The guide describes the process of integrating the Cart feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/cart-integration
originalArticleId: baf4c073-efd0-4c8c-9fb5-9259fa8f2a6b
redirect_from:
  - /2021080/docs/cart-integration
  - /2021080/docs/en/cart-integration
  - /docs/cart-integration
  - /docs/en/cart-integration
---

{% info_block infoBox %}

This article describes how to add product variants and product images to an existing cart.
{% endinfo_block %}

## Prerequisites:

Before starting make sure you are familiar with the concept of Spryker Super Attributes.

## UI Changes:

Cart now supports changing cart items by modifying their attributes. If we have a wrong T-Shirt size in the cart we will be able to change it.

Cart now also supports product images out of the box.
![cart_product_images](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/feature-integration-guides/cart-integration.md/cart_product_images.png)

Based on the super attributes, you can select the needed product variant in cart.
![product_super_attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/feature-integration-guides/cart-integration.md/product_super_attributes.png)

## Installation

### Item images in cart

To support  images in a cart,  install the optional module `ProductImageCartConnector` by running:

```bash
composer require spryker/product-image-cart-connector
```

This module will provide the `ProductImageCartPlugin` that you will have to register later in your shop `CartDependencyProvider` like in a snippet below:

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

Make sure the `ExpandBundleItemsWithImagesPlugin` is registered after the `ExpandBundleItemsPlugin` plugin.

{% endinfo_block %}

### Price validation
Spryker provides the `PriceCartConnector` module for this purpose.
To install the `PriceCartConnector` module, run:

```bash
composer require spryker/price-cart-connector
```

This module will provide the `CartItemPricePreCheckPlugin` that you will have to register later in your shop `CartDependencyProvider` like in a snippet below:

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

In case it has `false` value, while attempting to add the product with zero price to the cart, you will get the next message: "Price in selected currency not found for product with sku '%sku%'. Please change the currency or remove product from order."

#### Cart variants

Spryker provides the `CartVariant` module for this purpose.
To install the `CartVariant` module, run:

```bash
composer require spryker/cart-variant
```

### AttributeMapCollector
To support the mapping between attributes and availability, we need to collect additional data in our attribute map collector. You can do that by adding a single line with `SpyProductTableMap::COL_SKU` to the `getConreteProducts` function.

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

The `filterConcreteProductIds` function was changed to the following:

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
