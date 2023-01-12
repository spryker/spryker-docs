---
title: "HowTo: Create a custom discount calculator"
description: This HowTo guide explains how to introduce a new discount calculation logic.
last_updated: Jan 11, 2023
template: howto-guide-template
related:
  - title: Integrate the Promotions & Discounts Glue API
    link: docs/pbc/all/discount-management/202212.0/install-and-upgrade/integrate-the-promotions-and-discounts-glue-api.html
  - title: Discount Promotion feature integration
    link: docs/scos/dev/feature-integration-guides/202005.0/discount-promotion-feature-integration.html
---

This guide explains how to introduce a new discount calculation logic.

To introduce a new discount calculation logic—for example, to implement a custom rounding logic—follow these steps:

1. Implement your version of the calculator, that is, `SpecialDiscountCalculatorPlugin`, implementing a plugin with the interface `\Spryker\Zed\Discount\Dependency\Plugin\DiscountCalculatorPluginInterface`.
We have at least two existing calculators to use as an example implementation—for example, [PercentagePlugin](https://github.com/spryker/discount/blob/master/src/Spryker/Zed/Discount/Communication/Plugin/Calculator/PercentagePlugin.php) and [FixedPlugin](https://github.com/spryker/discount/blob/master/src/Spryker/Zed/Discount/Communication/Plugin/Calculator/FixedPlugin.php)

2. In `\Pyz\Zed\Discount\DiscountDependencyProvider`, create a new constant—or example:
```
    public const PLUGIN_CALCULATOR_CUSTOM = 'PLUGIN_CALCULATOR_CUSTOM';
```

3. Override the `\Spryker\Zed\Discount\DiscountDependencyProvider::getAvailableCalculatorPlugins` method on the project level and add your plugin—for example:

```php
    public function getAvailableCalculatorPlugins(): array
    {
    	$plugins = parent::getAvailableCalculatorPlugins();
	$plugins[static::PLUGIN_CALCULATOR_CUSTOM] = new SpecialDiscountCalculatorPlugin();
	
	return $plugins;
    }

```

4. Create new discounts with the PLUGIN_CALCULATOR_CUSTOM calculator. This also works from Zed.
