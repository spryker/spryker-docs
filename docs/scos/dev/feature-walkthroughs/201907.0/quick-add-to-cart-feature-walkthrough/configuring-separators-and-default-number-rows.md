---
title: Configuring separators and default number of rows
description: Use the guide to configure separators and default number of rows
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-configure-separators-default-number-rows
originalArticleId: f3819f8e-18d5-402e-a62f-cb8bb18d6905
redirect_from:
  - /v3/docs/en/ht-configure-separators-default-number-rows
  - /v3/docs/ht-configure-separators-default-number-row
---

By default, spaces, semicolons, and comas are used as separators in the **Paste your order** form, and there are 8 rows in the [Quick Add to Cart](/docs/scos/user/features/{{page.version}}/configurable-product-feature-overview.html#configurable-product) form. You can redefine the separators for bulk products entry as well as change the number of rows displayed in `src/Pyz/SprykerShop/Yves/QuickOrderPage/QuickOrderPageConfig.php` respectively:

**src/Pyz/SprykerShop/Yves/QuickOrderPage/QuickOrderPageConfig.php**

```php
<?php
namespace SprykerShop\Yves\QuickOrderPage;

use \SprykerShop\Yves\QuickOrderPage\QuickOrderPageConfig as SprykerQuickOrderPageConfig;

class QuickOrderPageConfig extends SprykerQuickOrderPageConfig
{
	protected const TEXT_ORDER_ROW_SPLITTER_PATTERN = '/\r\n|\r|\n/';
	protected const TEXT_ORDER_SEPARATORS = [',', ';', ' '];
	protected const DEFAULT_DISPLAYED_ROW_COUNT = 8;

	/**
	 * @return string
	 */
	public function getTextOrderRowSplitterPattern(): string
	{
		return static::TEXT_ORDER_ROW_SPLITTER_PATTERN;
	}

	/**
	 * @return string[]
	 */
	public function getTextOrderSeparators(): array
	{
		return static::TEXT_ORDER_SEPARATORS;
	}

	/**
	 * @return int
	 */
	public function getDefaultDisplayedRowCount(): int
	{
		return static::DEFAULT_DISPLAYED_ROW_COUNT;
	}
}
```
