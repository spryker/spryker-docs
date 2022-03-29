---
title: Product + Cart feature integration
description: The guide walks you through the process of installing the Product and Cart features in your project.
last_updated: Dec 24, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/product-cart-feature-integration
originalArticleId: 9eae3383-d6ce-447c-a7d2-231e50bb477d
redirect_from:
  - /v4/docs/product-cart-feature-integration
  - /v4/docs/en/product-cart-feature-integration
---

{% info_block errorBox “Attention!” %}
The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the **Product Image functionality**.

{% endinfo_block %}

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 202001.0 |
| Product | 202001.0 |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/product-image-cart-connector:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}
    
Make sure that the following modules have been installed:
    
| Module | Expected Directory |
| --- | --- |
| `ProductImageCartConnector` | `vendor/spryker/product-image-cart-connector` |

{% endinfo_block %}

### 2) Set up Transfer Objects

Run the following command to generate transfer objects:

```bash
console transfer:generate
```

### 3) Set up Behavior

Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductImageCartPlugin` | Expands `ItemsTransfers` from `CartChangeTransfer` with `ProductImages`. | None | `Spryker\Zed\ProductImageCartConnector\Communication\Plugin` |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**
    
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

{% info_block warningBox “Verification” %}

Check cart product image expander plugins - make sure you can see images related to cart items in the cart page in Yves. 

{% endinfo_block %}
