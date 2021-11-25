---
title: Migration guide - ProductOptionCartConnector
description: Use the guide to learn how to update the ProductOptionCartConnector module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-option-cart-connector
originalArticleId: 4a06f2aa-ca8c-4266-a8c0-b3ad6ff0a094
redirect_from:
  - /2021080/docs/mg-product-option-cart-connector
  - /2021080/docs/en/mg-product-option-cart-connector
  - /docs/mg-product-option-cart-connector
  - /docs/en/mg-product-option-cart-connector
  - /v1/docs/mg-product-option-cart-connector
  - /v1/docs/en/mg-product-option-cart-connector
  - /v2/docs/mg-product-option-cart-connector
  - /v2/docs/en/mg-product-option-cart-connector
  - /v3/docs/mg-product-option-cart-connector
  - /v3/docs/en/mg-product-option-cart-connector
  - /v4/docs/mg-product-option-cart-connector
  - /v4/docs/en/mg-product-option-cart-connector
  - /v5/docs/mg-product-option-cart-connector
  - /v5/docs/en/mg-product-option-cart-connector
  - /v6/docs/mg-product-option-cart-connector
  - /v6/docs/en/mg-product-option-cart-connector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productoptioncartconnector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productoptioncartconnector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productoptioncartconnector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productoptioncartconnector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productoptioncartconnector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productoptioncartconnector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productoptioncartconnector.html
related:
  - title: Migration guide - ProductOption
    link: docs/scos/dev/module-migration-guides/migration-guide-productoption.html
---

## Upgrading from Version 5.* to Version 7.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from Version 4.* to Version 5.*

1. Update `spryker/product-option` to at least version 6.0.0. See [Migration Guide - Product Option](/docs/scos/dev/module-migration-guides/migration-guide-productoption.html).
2. Install/Update `spryker/price` to at least version 5.0.0. You can find additional information to price module upgrade: here.
3. Update `spryker/product-option-cart-connector` to version 5.0.0.
4. Optionally add `ProductOptionValuePriceExistsCartPreCheckPlugin` to your `CartPreCheckPlugin` list to pre-check product option value price if it exists before switching currency.
Example of plugin registration:
```php
<?php
namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\ProductOptionValuePriceExistsCartPreCheckPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container)
    {
        return [
            ...
            new ProductOptionValuePriceExistsCartPreCheckPlugin(),
            ...
        ];
    }
}
```

5. `ProductOptionCartConnectorToProductOptionInterface` was renamed to `ProductOptionCartConnectorToProductOptionFacadeInterface`. If you have implemented this interface, amend your implementation to use the new name.
6. Additional changes were made to `ProductOptionValueExpander` and to its factory method. Amend your code if you have customized or extended this class.

<!-- Last review date: Nov 10, 2017 by Karoly Gerner -->
