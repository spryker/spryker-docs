---
title: Quick Add to Cart + Discontinued Products feature integration
description: Quick Add to Cart + Discontinued Products allow showing products in cart as discontinued. This guide describes how to integrate the feature into the project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/quick-add-to-cart-discontinued-products-feature-integration
originalArticleId: 9a383479-cd7b-4b57-993c-e0f707cdb015
redirect_from:
  - /2021080/docs/quick-add-to-cart-discontinued-products-feature-integration
  - /2021080/docs/en/quick-add-to-cart-discontinued-products-feature-integration
  - /docs/quick-add-to-cart-discontinued-products-feature-integration
  - /docs/en/quick-add-to-cart-discontinued-products-feature-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
|Quick Add To Cart  | {{page.version}}  |
|Discontinued Products  | {{page.version}} |

### 1) Set up behavior

#### Set up the additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductDiscontinuedItemValidatorPlugin |Checks if the provided product SKU is discontinued, if yes - adds an error message.  | None | Spryker\Client\ProductDiscontinuedStorage\Plugin\QuickOrder |

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
* `ProductDiscontinuedItemValidatorPlugin`validates discontinued products. 
* Provide the SKU of a discontinued product on the **Quick Add To Cart** page and verify that the error message is displayed and you are not allowed to work with this product.
  
{% endinfo_block %}
