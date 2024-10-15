

## Upgrading from version 5.* to version 7.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 4.* to version 5.*

1. Update `spryker/product-option` to at least version 6.0.0. See [Upgrade the ProductOption module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoption-module.html).
2. Install/Update `spryker/price` to at least version 5.0.0. You can find additional information to price module upgrade: here.
3. Update `spryker/product-option-cart-connector` to version 5.0.0.
4. Optionally add `ProductOptionValuePriceExistsCartPreCheckPlugin` to your `CartPreCheckPlugin` list to pre-check product option value price if it exists before switching currency.


**Example of plugin registration**

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
