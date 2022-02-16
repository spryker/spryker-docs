---
title: Quick Add to Cart + Packaging Units feature integration
description: Quick Add to Cart + Packaging Units allow buying products in different packaging units. This guide describes how to integrate this feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/quick-order-packaging-units-feature-integration
originalArticleId: 8667c827-6af6-4db7-af01-f10f763b4d83
redirect_from:
  - /2021080/docs/quick-order-packaging-units-feature-integration
  - /2021080/docs/en/quick-order-packaging-units-feature-integration
  - /docs/quick-order-packaging-units-feature-integration
  - /docs/en/quick-order-packaging-units-feature-integration
---

## Install feature frontend

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
|---|---|
|Quick Order| {{page.version}} |
|Packaging Units| {{page.version}} |

### 1) Set up behavior

#### Set up the additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|QuickOrderItemDefaultPackagingUnitExpanderPlugin|Expands `ItemTransfer` with packaging unit data if available.|None|SprykerShop\Yves\ProductPackagingUnitWidget\Plugin\QuickOrder|

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\ProductPackagingUnitWidget\Plugin\QuickOrder\QuickOrderItemDefaultPackagingUnitExpanderPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
	/**
	* @return \SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface[]
	*/
	protected function getQuickOrderItemTransferExpanderPlugins(): array
	{
		return [
			new QuickOrderItemDefaultPackagingUnitExpanderPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make the following checks at `https://mysprykershop.com/quick-order`: `QuickOrderItemDefaultPackagingUnitExpanderPlugin` sets default configuration for a product with packaging units:
* Select a product with packaging units on the **Quick Add To Cart** page and add it to the cart.
* Check `ItemTransfer` in Cart if it has `amount`, `amountSalesUnit`, `amountLeadProduct`, and `productPackagingUnit` properties set.

{% endinfo_block %}
