


This document describes how to integrate the Cart + Non-splittable Products feature into a Spryker project.

## Install feature core

Follow the steps below to install the Cart + Non-splittable Products feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
| --- | --- | --- |
| Cart | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|
| Non-splittable Products |{{page.version}} | [Install the Cart + Non-splittable Products feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-product-bundles-feature.html) |

### 1) Adjust concrete product quantity

Add the following plugins to your project:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CartChangeTransferQuantityNormalizerPlugin | The plugin is responsible for adjusting concrete products quantity and adding notification messages about that. | The `ProductQuantity` and `ProductQuantityStorage` modules should be installed. | Spryker\Zed\ProductQuantity\Communication\Plugin\Cart |

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

Once you are done with this step, add any product with the quantity restrictions (Min Qty, Max Qty, Qty Interval to the cart and try choosing its quantity outside the min-max range or such a quantity that does not correspond to Qty Interval. Then, make sure the chosen quantity has been adjusted according to its restriction and the corresponding message has been displayed.

{% endinfo_block %}
