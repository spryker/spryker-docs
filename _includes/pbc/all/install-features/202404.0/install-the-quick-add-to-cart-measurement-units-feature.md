

## Install feature frontend

### Prerequisites

Install the required features:

| NAME | VERSION |
|---|---|
|Quick Order| {{page.version}} |
|Measurement units| {{page.version}} |

### 1) Set up behavior

#### Set up the additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|QuickOrderFormMeasurementUnitColumnPlugin|Adds the additional **Measuring Unit** column to a quick order table.|None|SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrder|

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrder\QuickOrderFormMeasurementUnitColumnPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormColumnPluginInterface[]
     */
				protected function getQuickOrderFormColumnPlugins(): array
				{
				return [
				    new QuickOrderFormMeasurementUnitColumnPlugin(),
				];
			}
		}
```

{% info_block warningBox "Verification" %}

Make the following checks at  `https://mysprykershop.com/quick-order`:<br> `QuickOrderFormMeasurementUnitColumnPlugin` adds the *Measuring Unit* column to the **Quick Add To Cart** page. Check if the column is displayed on the page.

{% endinfo_block %}

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|ProductConcreteTransferBaseMeasurementUnitExpanderPlugin|Expands the provided array of `ProductConcreteTransfers` with the base measurement unit information (if available) for the product.|None|Spryker\Client\ProductMeasurementUnitStorage\Plugin\QuickOrder|

**src/Pyz/Client/QuickOrder/QuickOrderDependencyProvider.php**

```php
<?php

namespace Pyz\Client\QuickOrder;

use Spryker\Client\ProductMeasurementUnitStorage\Plugin\QuickOrder\ProductConcreteTransferBaseMeasurementUnitExpanderPlugin;
use Spryker\Client\QuickOrder\QuickOrderDependencyProvider as SprykerQuickOrderDependencyProvider;

class QuickOrderDependencyProvider extends SprykerQuickOrderDependencyProvider
{
		/**
		 * @return \Spryker\Client\QuickOrderExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface[]
		 */
		protected function getProductConcreteExpanderPlugins(): array
		{
			return [
				new ProductConcreteTransferBaseMeasurementUnitExpanderPlugin(),
			];
		}
}
```

{% info_block warningBox "Verification" %}

Make the following checks at  `https://mysprykershop.com/quick-order`: `ProductConcreteTransferBaseMeasurementUnitExpanderPlugin` expands Product Concrete data for Product search on **Quick Add To Cart** page with measurement unit data. Provide an SKU with measurement unit data on the **Quick Add To Cart** page and verify that the default measurement unit data appears in the measurement unit column.

{% endinfo_block %}
