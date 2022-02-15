---
title: Product + Cart feature integration
description: The guide walks you through the process of installing the Product and Cart features in your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-cart-feature-integration
originalArticleId: 5314b756-dcd4-467b-9777-114744b9d44f
redirect_from:
  - /2021080/docs/product-cart-feature-integration
  - /2021080/docs/en/product-cart-feature-integration
  - /docs/product-cart-feature-integration
  - /docs/en/product-cart-feature-integration
related:
  - title: Product image management
    link: docs/scos/user/features/page.version/product-feature-overview/product-images-overview.html
---

{% info_block errorBox %}
The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the **Product Image functionality**.

{% endinfo_block %}

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Cart | {{page.version}} |
| Product | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/product-image-cart-connector:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductImageCartConnector | vendor/spryker/product-image-cart-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following command to generate transfer objects:

```bash
console transfer:generate
```

### 3) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductImageCartPlugin | Expands `ItemsTransfers` from `CartChangeTransfer` with `ProductImages`. | None | Spryker\Zed\ProductImageCartConnector\Communication\Plugin |

<details open><summary markdown='span'>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

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

{% info_block warningBox “Verification” %}

Check cart product image expander plugins - make sure you can see images related to cart items in the cart page in Yves.

{% endinfo_block %}
