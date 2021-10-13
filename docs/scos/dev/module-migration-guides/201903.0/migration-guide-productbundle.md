---
title: Migration Guide - Product Bundle
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/mg-product-bundle
originalArticleId: 00241217-6a9b-4d73-9496-ff0271485b4b
redirect_from:
  - /v2/docs/mg-product-bundle
  - /v2/docs/en/mg-product-bundle
related:
  - title: Migration Guide - Price
    link: docs/scos/dev/module-migration-guides/201811.0/migration-guide-price.html
  - title: Migration Guide - Product
    link: docs/scos/dev/module-migration-guides/201811.0/migration-guide-product.html
---

## Upgrading from Version 4.* to Version 5.0.0
{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.
{% endinfo_block %}

## Upgrading from Version 3.* to Version 4.*

In version 4 we have added support for multi-currency. First, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). If you extended `ProductBundleCartExpander`, then you have to adapt some code because we changed how price is selected for added bundle products, check that core changes and adapt accordingly. We have also added a new plugin to handle cart reload event.

You will also need to add `\Spryker\Zed\ProductBundle\Communication\Plugin\Cart\CartBundleItemsPreReloadPlugin` plugin to `\Pyz\Zed\Cart\CartDependencyProvider::getPreReloadPlugins()`, this ensures that bundle items are correctly updated when currency is changed and cart reload is invoked.

## Upgrading from Version 2.* to Version 3.*

In version 3 the calculator plugin has been changed together with the new calculator version.

The `ProductBundlePriceAggregatorPlugin` has been moved to the `SalesAggregator` module, so you may need to change the namespace `\Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductBundlePriceAggregatorPlugin` if you still want to use it.
`aggregator. ProductBundlePriceCalculation` - does not have sales aggregator logic anymore. This class has been adapted to the new calculator concept, if you want to use the old one, use it from `\Spryker\Zed\SalesAggregator\Business\Model\OrderAmountAggregator\ProductBundlePrices`.
 
<!--Last review date: Nov 23, 2017 by Aurimas Ličkus -->
