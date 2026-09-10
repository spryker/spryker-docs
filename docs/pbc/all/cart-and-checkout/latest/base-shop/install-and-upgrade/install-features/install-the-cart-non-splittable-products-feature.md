---
title: Install the Cart + Non-splittable Products feature
description: The guide describes the process of installing the Cart and Non-splittable Products features into your project
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/cart-non-splittable-products-feature-integration
originalArticleId: 13a5637e-1c2a-44d7-96fe-a05aeb187872
redirect_from:
  - /2021080/docs/cart-non-splittable-products-feature-integration
  - /2021080/docs/en/cart-non-splittable-products-feature-integration
  - /docs/cart-non-splittable-products-feature-integration
  - /docs/en/cart-non-splittable-products-feature-integration
  - /docs/scos/dev/feature-integration-guides/202311.0/cart-non-splittable-products-feature-integration.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/install-and-upgrade/install-features/install-the-cart-non-splittable-products-feature.html
---
This document describes how to install the Cart + Non-splittable Products feature.

## Install feature core

Follow the steps below to install the Cart + Non-splittable Products feature core.

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Cart | {{page.release_tag}} |
| Non-splittable Products | {{page.release_tag}} |

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
