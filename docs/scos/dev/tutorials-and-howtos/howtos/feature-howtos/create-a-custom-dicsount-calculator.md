---
title: "HowTo: Create a custom dicsount calculator"
last_updated: Jan 11, 2023
template: howto-guide-template
originalLink: https://documentation.spryker.com/2022120/docs/create-a-custom-dicsount-calculator
originalArticleId: d8eb9816-18d8-4da0-b856-1d3989a07933
related:
  - title: Integrate the Promotions & Discounts Glue API
    link: /docs/pbc/all/discount-management/202212.0/install-and-upgrade/integrate-the-promotions-and-discounts-glue-api.html
  - title: Discount Promotion feature integration
    link https://documentation.spryker.com/v5/docs/discount-promotion-feature-integration
---

Whenever you want to introduce a new discount calculation logic, for example implementing a custom rounding logic, please follow these steps:

1. Implement your version of the calculator, i.e. SpecialDiscountCalculatorPlugin, implementing a plugin with an interface \Spryker\Zed\Discount\Dependency\Plugin\DiscountCalculatorPluginInterface .
We have at least 2 existing calculators to use as an example implementation, i.e. [PercentagePlugin](https://github.com/spryker/discount/blob/master/src/Spryker/Zed/Discount/Communication/Plugin/Calculator/PercentagePlugin.php) and [FixedPlugin](https://github.com/spryker/discount/blob/master/src/Spryker/Zed/Discount/Communication/Plugin/Calculator/FixedPlugin.php)

2. Create a new constant in \Pyz\Zed\Discount\DiscountDependencyProvider, for example
```
    public const PLUGIN_CALCULATOR_CUSTOM = 'PLUGIN_CALCULATOR_CUSTOM';
```

3. Override method \Spryker\Zed\Discount\DiscountDependencyProvider::getAvailableCalculatorPlugins on the project level and add your plugin, for example like this:

```php
    public function getAvailableCalculatorPlugins(): array
    {
    	$plugins = parent::getAvailableCalculatorPlugins();
	$plugins[static::PLUGIN_CALCULATOR_CUSTOM] = new SpecialDiscountCalculatorPlugin();
	
	return $plugins;
    }

```

4. Create new discounts with calculator PLUGIN_CALCULATOR_CUSTOM. This also works from Zed.
