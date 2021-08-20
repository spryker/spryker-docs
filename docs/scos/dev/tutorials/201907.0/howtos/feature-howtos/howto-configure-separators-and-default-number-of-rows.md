---
title: HowTo - Configure Separators and Default Number of Rows
originalLink: https://documentation.spryker.com/v3/docs/ht-configure-separators-default-number-rows
originalArticleId: f3819f8e-18d5-402e-a62f-cb8bb18d6905
redirect_from:
  - /v3/docs/ht-configure-separators-default-number-rows
  - /v3/docs/en/ht-configure-separators-default-number-rows
---

By default, spaces, semicolons and comas are used as separators in **Paste your order** form and there are 8 rows in the [Quick Order](https://documentation.spryker.com/v3/docs/quick-add-to-cart-feature-overview) form. You can redefine the separators for bulk products entry as well as change the number of rows displayed in `src/Pyz/SprykerShop/Yves/QuickOrderPage/QuickOrderPageConfig.php` respectively:

<details open>   <summary>src/Pyz/SprykerShop/Yves/QuickOrderPage/QuickOrderPageConfig.php</summary>
    
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

</br>
</details>
