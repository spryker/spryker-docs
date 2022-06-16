---
title: Product Bundles + Cart feature integration
description: This guide provides step-by-step instructions on integrating Product Bundles + Cart feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-cart-feature-integration
originalArticleId: f069a875-5736-4134-a2c9-34a54b2dfdd0
redirect_from:
  - /2021080/docs/product-bundles-cart-feature-integration
  - /2021080/docs/en/product-bundles-cart-feature-integration
  - /docs/product-bundles-cart-feature-integration
  - /docs/en/product-bundles-cart-feature-integration
  - /docs/scos/dev/feature-integration-guides/201811.0/product-bundles-cart-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201903.0/product-bundles-cart-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201907.0/product-bundles-cart-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202005.0/product-bundles-cart-feature-integration.html
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Product Bundles | {{page.version}} |
| Cart | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Set up behavior


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductBundleItemCountQuantityPlugin | Returns combined quantity of all items in cart. | None | Spryker\Client\ProductBundle\Plugin\Cart |

**src/Pyz/Client/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Cart;

use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\ProductBundle\Plugin\Cart\ProductBundleItemCountQuantityPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Client\Cart\Dependency\Plugin\ItemCountPluginInterface
     */
    protected function getItemCountPlugin(): ItemCountPluginInterface
    {
        return new ProductBundleItemCountQuantityPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Add several regular products and product bundles to cart.
Make sure that item counter at cart widget shows correct number (bundled items should not be counted as separate items).

{% endinfo_block %}

## Alternative setup for handling large quantities of bundled products in cart

When a bundle product is added to cart with a large quantity, 100-200 items for example, users may 
experience a slow-down in cart operations handling or even may get server internal error due to insufficient memory.

To avoid that, an alternative set of plugins was implemented.

| PLUGIN                                                       | ALTERNATIVE FOR                         | NAMESPACE                                                     |
|--------------------------------------------------------------|-----------------------------------------|---------------------------------------------------------------|
| RefreshBundlesWithUnitedItemsCartOperationPostSavePlugin     | CartPostSaveUpdateBundlesPlugin         | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |
| UnfoldBundlesToUnitedItemsItemExpanderPlugin                 | ExpandBundleItemsPlugin                 | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |
| ReplaceBundlesWithUnitedItemsCartChangeRequestExpanderPlugin | RemoveBundleChangeRequestExpanderPlugin | Spryker\Client\ProductBundle\Plugin\Cart                      |
| ReplaceBundlesWithUnitedItemsCartChangeRequestExpandPlugin   | RemoveBundleChangeRequestExpanderPlugin | Spryker\Zed\ProductBundle\Communication\Plugin\PersistentCart |

### 1) Setup new plugins

In order to use this alternative solution, all old plugins have to be removed, and new ones should be connected instead. 

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\RefreshBundlesWithUnitedItemsCartOperationPostSavePlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\UnfoldBundlesToUnitedItemsItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            // new ExpandBundleItemsPlugin(),
            new UnfoldBundlesToUnitedItemsItemExpanderPlugin(),
        ];
    }
    
    protected function getPostSavePlugins(Container $container): array
    {
        return [
            // new CartPostSaveUpdateBundlesPlugin(),
            new RefreshBundlesWithUnitedItemsCartOperationPostSavePlugin(),
        ];
    }
}
```

**src/Pyz/Client/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Cart;

use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\ProductBundle\Plugin\Cart\ReplaceBundlesWithUnitedItemsCartChangeRequestExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    protected function getRemoveItemsRequestExpanderPlugins(): array
    {
        return [
            // new RemoveBundleChangeRequestExpanderPlugin(),
            new ReplaceBundlesWithUnitedItemsCartChangeRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php***

```php
<?php

namespace Pyz\Zed\PersistentCart;

use Spryker\Zed\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Zed\ProductBundle\Communication\Plugin\PersistentCart\ReplaceBundlesWithUnitedItemsCartChangeRequestExpandPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    protected function getRemoveItemsRequestExpanderPlugins(): array
    {
        return [
            // new RemoveBundleChangeRequestExpanderPlugin(),
            new ReplaceBundlesWithUnitedItemsCartChangeRequestExpandPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Add a product bundle to cart, try to increase its quantity to a large amount, i.e. 1000 items. Then try to decrease the 
quantity. Make sure that increase and decrease operations are performed without a significant delay and do not fail 
with an exception.  

Perform this verification both as anonymous and a logged-in user.  

{% endinfo_block %}

### 2) Adjust non-splittable quantity threshold for bundled items in `SalesQuantity` module config

To be able to create an order successfully with a large amount
of bundle products in cart, `SalesQuantityConfig::BUNDLED_ITEM_NONSPLIT_QUANTITY_THRESHOLD` constant
in `SalesQuantity` module config also need to be set to some reasonable amount, 10 for example.
This constant controls the bundle quantity threshold, which when reached keeps bundled items from 
splitting into individual items and adds them into the order as a single shipment. The lower the threshold,
the less amount of separate shipments are created in an order, which decreases potential probability of 
insufficient memory errors during order creation process.

For details, see the [The Splittable Order Items feature integration guide](/docs/scos/dev/feature-integration-guides/{{page.version}}/splittable-order-items-feature-integration.html).
