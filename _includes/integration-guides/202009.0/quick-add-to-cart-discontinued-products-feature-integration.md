---
title: Quick Add to Cart + Discontinued Products feature integration
description: This guide describes how to integrate the Quick Add to Cart + Discontinued Products feature into the project.
last_updated: Aug 27, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/quick-add-to-cart-discontinued-products-feature-integration
originalArticleId: 1fb4aa00-a84e-4f8d-a290-c84c708f8075
redirect_from:
  - /v6/docs/quick-add-to-cart-discontinued-products-feature-integration
  - /v6/docs/en/quick-add-to-cart-discontinued-products-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

|  Name|Version  |
| --- | --- |
|Quick Add To Cart  |master  |
|Discontinued Products  |  master|

### 1) Set up Behavior
#### Set up the Additional Functionality
Enable the following behaviors by registering the plugins:

|Plugin  |  Specification|  Prerequisites| Namespace |
| --- | --- | --- | --- |
| `ProductDiscontinuedItemValidatorPlugin` |Checks if the provided product SKU is discontinued, if yes - adds an error message.  | None | `Spryker\Client\ProductDiscontinuedStorage\Plugin\QuickOrder` |

**src/Pyz/Client/QuickOrder/QuickOrderDependencyProvider.php**

```php
 <?php
 
namespace Pyz\Client\QuickOrder;
 
use Spryker\Client\ProductDiscontinuedStorage\Plugin\QuickOrder\ProductDiscontinuedItemValidatorPlugin;
use Spryker\Client\QuickOrder\QuickOrderDependencyProvider as SprykerQuickOrderDependencyProvider;
 
class QuickOrderDependencyProvider extends SprykerQuickOrderDependencyProvider
{
	/**
	* @return \Spryker\Client\QuickOrderExtension\Dependency\Plugin\ItemValidatorPluginInterface[]
	*/
	protected function getQuickOrderBuildItemValidatorPlugins(): array
	{
		return [
			new ProductDiscontinuedItemValidatorPlugin(),
		];
	}
    }
```

{% info_block warningBox "Verification" %}

Make the following checks at `https://mysprykershop.com/quick-order`:

- `ProductDiscontinuedItemValidatorPlugin`validates discontinued products. Provide the SKU of a discontinued product on the **Quick Add To Cart** page and verify that the error message is displayed and you are not allowed to work with this product.
  
{% endinfo_block %}
