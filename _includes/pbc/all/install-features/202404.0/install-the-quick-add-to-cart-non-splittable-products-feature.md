

## Install feature core

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME | VERSION |
|---|---|
|Quick Add To Cart| {{page.version}} |
|Non-splittable Products| {{page.version}} |

### 1) Set up behavior

#### Set up the additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|ProductQuantityItemValidatorPlugin|Checks if the provided product quantity has quantity restrictions and provided quantity fits them, if no - adds an error message.|None|Spryker\Client\ProductQuantityStorage\Plugin\QuickOrder|

**src/Pyz/Client/QuickOrder/QuickOrderDependencyProvider.php**

```php
<?php

namespace Pyz\Client\QuickOrder;

use Spryker\Client\ProductQuantityStorage\Plugin\QuickOrder\ProductQuantityItemValidatorPlugin;
use Spryker\Client\QuickOrder\QuickOrderDependencyProvider as SprykerQuickOrderDependencyProvider;

class QuickOrderDependencyProvider extends SprykerQuickOrderDependencyProvider
{
	/**
	* @return \Spryker\Client\QuickOrderExtension\Dependency\Plugin\ItemValidatorPluginInterface[]
	*/
	protected function getQuickOrderBuildItemValidatorPlugins(): array
	{
		return [
			new ProductQuantityItemValidatorPlugin(),
		];
	}
}		
```

{% info_block warningBox "Verification" %}

Make the following checks at `https://mysprykershop.com/quick-order`:<br>`ProductQuantityItemValidatorPlugin`takes care about quantities restrictions. Provide an SKU with quantity restrictions on the **Quick Add To Cart** page and verify if quantity gets automatically adjusted according to the quantity restrictions.

{% endinfo_block %}
