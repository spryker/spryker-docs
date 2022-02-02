---
title: Quick Add to Cart + Measurement Units feature integration
description: Quick Add to Cart + Measurement Units allow selling products by any unit of measure with a click. This guide describes how to integrate this feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/quick-order-measurement-units-feature-integration
originalArticleId: d6363b3c-4989-4a7e-b223-cc1607fe6dd2
redirect_from:
  - /2021080/docs/quick-order-measurement-units-feature-integration
  - /2021080/docs/en/quick-order-measurement-units-feature-integration
  - /docs/quick-order-measurement-units-feature-integration
  - /docs/en/quick-order-measurement-units-feature-integration
---

## Install feature frontend

### Prerequisites

To start feature integration, overview and install the necessary features:

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
