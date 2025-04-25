

This document describes how to install the Product Bundles + Cart feature.

## Prerequisites

Install the required features:

| NAME | EXPECTED DIRECTORY | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)|
| Product Bundles | {{page.version}} | [Install the Product Bundles feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-bundles-feature.html)|
| Cart | {{page.version}} | |


## Set up behavior

| PLUGIN                                   | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                            |
|------------------------------------------|--------------------------------------------------------------|---------------|------------------------------------------------------|
| ProductBundleItemCountQuantityPlugin     | Returns the combined quantity of all items in the cart.          |           | Spryker\Client\ProductBundle\Plugin\Cart             |
| SanitizeBundleItemsBeforeQuoteSavePlugin | Sanitizes quote bundle items when all items are removed from the cart. |           | Spryker\Zed\ProductBundle\Communication\Plugin\Quote |

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

Add several regular products and product bundles to cart. Make sure that the item counter of the cart widget shows the correct number–bundled items must not be counted as separate items.

{% endinfo_block %}

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\ProductBundle\Communication\Plugin\Quote\SanitizeBundleItemsBeforeQuoteSavePlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface>
     */
    protected function getQuoteUpdateBeforePlugins(): array
    {
        return [
            new SanitizeBundleItemsBeforeQuoteSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure bundle items are removed from the quote when all items are removed from the cart. Cart counter must show 0 items after all items are removed from the cart.

{% endinfo_block %}

## Alternative setup for handling large quantities of bundled products in the cart

When a bundle product is added to cart with a big number of items–for example, 100-200 items–users may experience a slowdown in cart operations or even get an internal server error because of insufficient memory.

To avoid this, you can use the following alternative plugins:

| PLUGIN                                                       | ALTERNATIVE FOR                         | NAMESPACE                                                     |
|--------------------------------------------------------------|-----------------------------------------|---------------------------------------------------------------|
| RefreshBundlesWithUnitedItemsCartOperationPostSavePlugin     | CartPostSaveUpdateBundlesPlugin         | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |
| UnfoldBundlesToUnitedItemsItemExpanderPlugin                 | ExpandBundleItemsPlugin                 | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |
| ReplaceBundlesWithUnitedItemsCartChangeRequestExpanderPlugin | RemoveBundleChangeRequestExpanderPlugin | Spryker\Client\ProductBundle\Plugin\Cart                      |
| ReplaceBundlesWithUnitedItemsCartChangeRequestExpandPlugin   | RemoveBundleChangeRequestExpanderPlugin | Spryker\Zed\ProductBundle\Communication\Plugin\PersistentCart |
| ExpandBundleItemsWithImagesPlugin                            |                                     | Spryker\Zed\ProductBundle\Communication\Plugin\Cart           |

### 1) Set up plugins

Remove the existing plugins and add the alternative ones:

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

* Do the following as a guest user:
  1. Add a product bundle to cart.
  2. Increase the bundle's quantity to a larger number—for example, 1,000 items.
  3. Decrease the quantity.
    Make sure that increase and decrease operations are performed without a significant delay and don't fail with an exception.  
  4. Repeat steps 1-3 as a registered user.

* Make sure that the images of bundled products are displayed correctly in cart.

{% endinfo_block %}

### 2) Adjust a non-splittable quantity threshold for bundled items

For orders with a large numbers of product bundles to be created successfully, the threshold for creating separate shipments out of bundled items needs to be not higher than 10. Lowering the threshold reduces the number of separate shipments in an order, decreasing the risk of insufficient memory errors during order creation.

You can set the threshold using the `SalesQuantityConfig::BUNDLED_ITEM_NONSPLIT_QUANTITY_THRESHOLD` constant in the `SalesQuantity` module config. When the threshold is reached, bundled items are kept together instead of being split into individual items, ensuring they are processed as a single shipment. Lowering the threshold reduces the number of separate shipments in an order, decreasing the risk of insufficient memory errors during order creation.

For details more details on, see [Install the Splittable Order Items feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-splittable-order-items-feature.html).






























