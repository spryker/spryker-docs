---
title: Migration Guide - Product Bundle
originalLink: https://documentation.spryker.com/v2/docs/mg-product-bundle
redirect_from:
  - /v2/docs/mg-product-bundle
  - /v2/docs/en/mg-product-bundle
---

## Upgrading from Version 4.* to Version 5.0.0
{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 3.* to Version 4.*

In version 4 we have added support for multi-currency. First, make sure that you [migrated the Price module](/docs/scos/dev/migration-and-integration/201903.0/module-migration-guides/mg-price). If you extended `ProductBundleCartExpander`, then you have to adapt some code because we changed how price is selected for added bundle products, check that core changes and adapt accordingly. We have also added a new plugin to handle cart reload event.

You will also need to add `\Spryker\Zed\ProductBundle\Communication\Plugin\Cart\CartBundleItemsPreReloadPlugin` plugin to `\Pyz\Zed\Cart\CartDependencyProvider::getPreReloadPlugins()`, this ensures that bundle items are correctly updated when currency is changed and cart reload is invoked.

## Upgrading from Version 2.* to Version 3.*

In version 3 the calculator plugin has been changed together with the new calculator version.

The `ProductBundlePriceAggregatorPlugin` has been moved to the `SalesAggregator` module, so you may need to change the namespace `\Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductBundlePriceAggregatorPlugin` if you still want to use it.
`aggregator. ProductBundlePriceCalculation` - does not have sales aggregator logic anymore. This class has been adapted to the new calculator concept, if you want to use the old one, use it from `\Spryker\Zed\SalesAggregator\Business\Model\OrderAmountAggregator\ProductBundlePrices`.
 
<!--Last review date: Nov 23, 2017 by Aurimas Ličkus -->
