

This document describes how to install the Product Bundles + Cart feature.

## Install feature core

Follow the steps below to install feature core.

### Prerequisites

Install the required features:

| NAME | EXPECTED DIRECTORY | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)|
| Product Bundles | {{page.version}} | [Install the Product Bundles feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-bundles-feature.html)|
| Cart | {{page.version}} | |


### Set up behavior

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductBundleItemCountQuantityPlugin | Returns combined quantity of all items in the cart. | None | Spryker\Client\ProductBundle\Plugin\Cart |

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

Add several regular products and product bundles to the cart.
Make sure that the item counter of the cart widget shows the correct number—bundled items must not be counted as separate items.

{% endinfo_block %}

## Alternative setup for handling large quantities of bundled products in the cart

When a bundle product is added to the cart with a large quantity (for example, 100-200 items), users may
experience a slow-down in the cart operations handling or even may get an internal server error because of insufficient memory.

To avoid a slow-down in the cart operations and internal server errors, an alternative set of plugins has been
implemented:

| PLUGIN                                                       | ALTERNATIVE FOR                         | NAMESPACE                                                     |
|--------------------------------------------------------------|-----------------------------------------|---------------------------------------------------------------|
| RefreshBundlesWithUnitedItemsCartOperationPostSavePlugin     | CartPostSaveUpdateBundlesPlugin         | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |
| UnfoldBundlesToUnitedItemsItemExpanderPlugin                 | ExpandBundleItemsPlugin                 | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |
| ReplaceBundlesWithUnitedItemsCartChangeRequestExpanderPlugin | RemoveBundleChangeRequestExpanderPlugin | Spryker\Client\ProductBundle\Plugin\Cart                      |
| ReplaceBundlesWithUnitedItemsCartChangeRequestExpandPlugin   | RemoveBundleChangeRequestExpanderPlugin | Spryker\Zed\ProductBundle\Communication\Plugin\PersistentCart |
| ExpandBundleItemsWithImagesPlugin                            | None                                    | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |

### 1) Set up new plugins

To use this alternative solution, all old plugins must be removed and new ones connected instead.

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\RefreshBundlesWithUnitedItemsCartOperationPostSavePlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\UnfoldBundlesToUnitedItemsItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            // new ExpandBundleItemsPlugin(),
            new ExpandBundleItemsWithImagesPlugin()
            new UnfoldBundlesToUnitedItemsItemExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface>
     */
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
    /**
     * @return array<\Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface>
     */
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
    /**
     * @return array<\Spryker\Zed\PersistentCartExtension\Dependency\Plugin\CartChangeRequestExpandPluginInterface>
     */
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

Add a product bundle to the cart and increase its quantity to a larger number—for example, 1,000 items. Then, decrease the quantity.
Make sure that increase and decrease operations are performed without a significant delay and do not fail, with an exception.  

Perform this verification both as an anonymous and logged-in user.
Make sure that bundled products have an images that are displayed correctly in the cart.

{% endinfo_block %}

### 2) Adjust a non-splittable quantity threshold for bundled items in the `SalesQuantity` module config.

To create an order successfully with a large number of product bundles in the cart, the `SalesQuantityConfig::BUNDLED_ITEM_NONSPLIT_QUANTITY_THRESHOLD` constant in the `SalesQuantity` module config must be also set to a lower number—for example, 10.
This constant controls the bundle quantity threshold. When the threshold is reached, it keeps bundled items from splitting into individual items and adds them to the order as a single shipment.
The lower the threshold, the fewer number of separate shipments are created in an order, which decreases the potential probability of insufficient memory errors during the order creation process.

For details, see [Install the Splittable Order Items feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-splittable-order-items-feature.html).
