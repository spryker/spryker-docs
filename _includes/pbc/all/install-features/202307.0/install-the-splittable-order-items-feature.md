

This document describes how to install the [Splittable Order Items](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/splittable-order-items-overview.html) feature.

## Install feature core

Follow the steps below to install feature core.

### Prerequisites

Install the required features:

| NAME         | EXPECTED DIRECTORY | INSTALLATION GUIDE                                                                                                                    |
|--------------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product      | {{page.version}}   | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)           |
| Cart         | {{page.version}}   | [Cart feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                 |
| Checkout     | {{page.version}}   | [Install the Checkout feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/checkout-feature-integration.html)         |

### Install feature

The Splittable Order Items feature is shipped with following modules:

| MODULE | DESCRIPTION |
| --- | --- |
| [DiscountExtension](https://github.com/spryker/discount-extension) | Provides extension plugins for the `Discount` module. |
| [SalesQuantity](https://github.com/spryker/sales-quantity)| Provides support in handling and configuring quantity for sales orders and items. |

To install the Splittable Order Items feature, follow the steps below:

1. Install necessary modules using Composer:

```bash
composer require spryker/discount-extension:"^1.0.0" spryker/sales-quantity:"^3.4.0" --update-with-dependencies
```

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
```

3. Add a plugin to Zed `CartDependencyProvider`:


| MODULE | PLUGIN | DESCRIPTION | METHOD IN DEPENDENCY PROVIDER |
| --- | --- | --- | --- |
| Cart | IsQuantitySplittableItemExpanderPlugin | Adds a new `isQuantitySplittable` attribute for products | `getExpanderPlugins` |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
...
use Spryker\Zed\SalesQuantity\Communication\Plugin\Cart\IsQuantitySplittableItemExpanderPlugin;
...
protected function getExpanderPlugins(Container $container)
    {
        return [
            ...
            new IsQuantitySplittableItemExpanderPlugin(),
            ...
        ];
    }
```

4. Add a plugin to Zed `SalesDependencyProvider`:


| MODULE | PLUGIN | DESCRIPTION | METHOD IN DEPENDENCY PROVIDER |
| --- | --- | --- | --- |
| Sales | NonSplittableItemTransformerStrategyPlugin | Defines the order item's breakdown strategy for cart items depending on if the product is splittable or nonsplittable. | `getItemTransformerStrategyPlugins` |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
...
use Spryker\Zed\Sales\Communication\Plugin\SalesExtension\SingleQuantityBasedItemTransformerStrategyPlugin;
...
use Spryker\Zed\SalesQuantity\Communication\Plugin\SalesExtension\NonSplittableItemTransformerStrategyPlugin;
...   
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\ItemTransformerStrategyPluginInterface[]
     */
    public function getItemTransformerStrategyPlugins(): array
    {
        return [
        ...    
			new NonSplittableItemTransformerStrategyPlugin(),
        ...    
        ];
    }
```

5. You can set quantity threshold for an order item to be considered nonsplittable by adjusting the following config:

**src/Pyz/Zed/SalesQuantity/SalesQuantityConfig.php**

```php

namespace Pyz\Zed\SalesQuantity;

use Spryker\Zed\SalesQuantity\SalesQuantityConfig as SprykerSalesQuantityConfig;

class SalesQuantityConfig extends SprykerSalesQuantityConfig
{
    /**
     * @var int|null
     */
    protected const ITEM_NONSPLIT_QUANTITY_THRESHOLD = 10;

    /**
     * @var int|null
     */
    protected const BUNDLED_ITEM_NONSPLIT_QUANTITY_THRESHOLD = 10;
}

```

Change `SalesQuantityConfig::ITEM_NONSPLIT_QUANTITY_THRESHOLD` to set the threshold for regular items and `SalesQuantityConfig::BUNDLED_ITEM_NONSPLIT_QUANTITY_THRESHOLD` for items in a bundle.
If order item quantity equals or is higher than the threshold, the item is considered non-splittable.
Using `null` deactivates the threshold.

The threshold does not affect order items with `isQuantitySplittable` set to `false`.
Such items are considered non-splittable regardless of the threshold.  


6. Add plugins to Zed `DiscountDependencyProvider`:


| MODULE | PLUGIN | DESCRIPTION | METHOD IN DEPENDENCY PROVIDER |
| --- | --- | --- | --- |
| `Discount` |`NonSplittableDiscountableItemTransformerStrategyPlugin and`  | Defines discountable item transformation strategy for splittable and non-splittable items to adjust the discount calculation item breakdown according to the corresponding order item breakdown. | `getDiscountableItemTransformerStrategyPlugins` |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
...
use Spryker\Zed\Discount\Communication\Plugin\DiscountExtension\SingleQuantityBasedDiscountableItemTransformerStrategyPlugin;
...
use Spryker\Zed\SalesQuantity\Communication\Plugin\DiscountExtension\NonSplittableDiscountableItemTransformerStrategyPlugin;
...
    /**
     * @return \Spryker\Zed\DiscountExtension\Dependency\Plugin\DiscountableItemTransformerStrategyPluginInterface[]
     */
    protected function getDiscountableItemTransformerStrategyPlugins(): array
    {
        return [
            new NonSplittableDiscountableItemTransformerStrategyPlugin(),
            ...
        ];
    }
```
