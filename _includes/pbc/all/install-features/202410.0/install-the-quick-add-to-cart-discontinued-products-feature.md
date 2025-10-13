

## Install feature core

### Prerequisites

Install the required features:

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
- `ProductDiscontinuedItemValidatorPlugin`validates discontinued products.
- Provide the SKU of a discontinued product on the **Quick Add To Cart** page and verify that the error message is displayed and you are not allowed to work with this product.

{% endinfo_block %}
