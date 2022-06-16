---
title: Splittable Order Items feature integration
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/splittable-order-items-integration
originalArticleId: ea499c83-900d-4788-bcaf-c7981220b441
redirect_from:
  - /v3/docs/splittable-order-items-integration
  - /v3/docs/en/splittable-order-items-integration
---

The Splittable Order Items feature is shipped with following modules:

| Module | Description |
| --- | --- |
| [DiscountExtension](https://github.com/spryker/spryker/tree/master/Bundles/DiscountExtension) | Provides extension plugins for the `Discount` module. |
| [SalesQuantity](https://github.com/spryker/spryker/tree/master/Bundles/SalesQuantity)| Provides support in handling and configuring quantity for sales orders and items. |

To install the Merchants and Merchant relations feature, follows the steps below:

1. Install necessary modules using composer
Update existing and install the required modules:

```bash
composer update "spryker/*" "spryker-shop/*"
```

```bash
composer require spryker/discount-extension:"^1.0.0" spryker/sales-quantity:"^1.0.0" --update-with-dependencies
```

2. Run the commands:

```bash
console transfer:generate
console propel:install
```

3. Add a plugin to Zed `CartDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| `Cart` | `IsQuantitySplittableItemExpanderPlugin` | Adds a new `isQuantitySplittable` attribute for products | `getExpanderPlugins` |

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


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| `Sales` | `NonSplittableItemTransformerStrategyPlugin` | Defines order item breakdown strategy for cart items depending on if the product is splittable or non-splittable. | `getItemTransformerStrategyPlugins` |

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

5. You can set quantity threshold for an order item to be considered non-splittable by adjusting the following config:

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

Change `SalesQuantityConfig::ITEM_NONSPLIT_QUANTITY_THRESHOLD` to set the threshold for regular items 
and `SalesQuantityConfig::BUNDLED_ITEM_NONSPLIT_QUANTITY_THRESHOLD` for items in a bundle.
If order item quantity equals or is higher than the threshold, the item is considered non-splittable. 
Using `null` deactivates the threshold.

The threshold does not affect order items with `isQuantitySplittable` set to `false`. 
Such items are considered non-splittable regardless of the threshold.  


6. Add plugins to Zed `DiscountDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
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
