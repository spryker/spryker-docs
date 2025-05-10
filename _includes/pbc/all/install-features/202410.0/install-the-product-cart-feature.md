

{% info_block errorBox %}
The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the **Product Image functionality**.

{% endinfo_block %}

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Cart | {{page.version}} |
| Product | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-image-cart-connector:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductImageCartConnector | vendor/spryker/product-image-cart-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

### 3) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductImageCartPlugin | Expands `ItemsTransfers` from `CartChangeTransfer` with `ProductImages`. | None | Spryker\Zed\ProductImageCartConnector\Communication\Plugin |

<details><summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ProductImageCartConnector\Communication\Plugin\ProductImageCartPlugin;
use Spryker\Zed\Kernel\Container;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
	/**
	* @param \Spryker\Zed\Kernel\Container $container
	*
	* @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
	*/
	protected function getExpanderPlugins(Container $container)
	{
		return [
			new ProductImageCartPlugin(),
		];
	}
}
```
</details>

{% info_block warningBox "Verification" %}

Check cart product image expander plugins - make sure you can see images related to cart items in the cart page in Yves.

{% endinfo_block %}
