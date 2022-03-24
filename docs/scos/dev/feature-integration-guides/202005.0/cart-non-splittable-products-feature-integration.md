---
title: Cart- Non-splittable Products feature integration
description: The guide describes the process of installing the Cart and Non-Splittable Products features into your project
last_updated: Apr 24, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/cart-non-splittable-products-feature-integration
originalArticleId: 332cfb32-c125-49f5-9112-ef2fe60df7b9
redirect_from:
  - /v5/docs/cart-non-splittable-products-feature-integration
  - /v5/docs/en/cart-non-splittable-products-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | {{page.version}} |
| Non-splittable Products |{{page.version}} |

### 1) Set up Behavior
#### Adjust Concrete Product Quantity
Add the following plugins to your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CartChangeTransferQuantityNormalizerPlugin` | The plugin is responsible for adjusting concrete products quantity and adding notification messages about that. | The `ProductQuantity` and `ProductQuantityStorage` modules should be installed. | `Spryker\Zed\ProductQuantity\Communication\Plugin\Cart` |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Cart;
 
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\CartChangeTransferQuantityNormalizerPlugin;
 
class CartDependencyProvider extends SprykerCartDependencyProvider
{
	/**
	 * @param \Spryker\Zed\Kernel\Container $container
	 *
	 * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartChangeTransferNormalizerPluginInterface[]
	 */
	protected function getCartBeforePreCheckNormalizerPlugins(Container $container): array
	{
		return [
			new CartChangeTransferQuantityNormalizerPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}
Once you are done with this step, add any Product with the quantity restrictions (Min Qty, Max Qty, Qty Interval
{% endinfo_block %} to the Cart and try choosing its quantity outside the min-max range or such a quantity that does not correspond to Qty Interval. Then make sure the quantity you have chosen has been adjusted according to its restriction, and the corresponding message has been displayed.)
