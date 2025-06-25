

This document describes how to install the Cart + Non-splittable Products feature.

## Install feature core

Follow the steps below to install the Cart + Non-splittable Products feature core.

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Cart | 202507.0 |
| Non-splittable Products |{{page.version}} |

### 1) Adjust concrete product quantity

Add the following plugins to your project:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CartChangeTransferQuantityNormalizerPlugin | The plugin is responsible for adjusting concrete products quantity and adding notification messages about that. | The `ProductQuantity` and `ProductQuantityStorage` modules must be installed. | Spryker\Zed\ProductQuantity\Communication\Plugin\Cart |

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

Once you are done with this step, add any product with the quantity restrictions (Min Qty, Max Qty, Qty Interval to the cart and try choosing its quantity outside the min-max range or such a quantity that does not correspond to Qty Interval. Then make sure the quantity you have chosen has been adjusted according to its restriction, and the corresponding message has been displayed.)

{% endinfo_block %}
