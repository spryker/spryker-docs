---
title: Product + Cart Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/product-cart-feature-integration
redirect_from:
  - /v5/docs/product-cart-feature-integration
  - /v5/docs/en/product-cart-feature-integration
---

{% info_block errorBox "The following Feature Integration guide expects the basic feature to be in place. The current Feature Integration guide only adds the **Product Image functionality**.)

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 201907.0 |
| Product | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/product-image-cart-connector:"^1.1.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
    
Make sure that the following modules have been installed:
    
| Module | Expected Directory |
| --- | --- |
| `ProductImageCartConnector` | `vendor/spryker/product-image-cart-connector` |
</div></section>

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

<details open>
<summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>
    
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
<br>
</details>

@(Warning" %}
Verification
{% endinfo_block %}(Check cart product image expander plugins - make sure you can see images related to cart items in the cart page in Yves. )
