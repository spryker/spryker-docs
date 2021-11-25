---
title: Migration guide - ProductBundle
description: Use the guide to migrate to a new version of the ProductBundle module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-bundle
originalArticleId: a54d33c4-7fdf-4687-85b3-ae4378e5a76a
redirect_from:
  - /2021080/docs/mg-product-bundle
  - /2021080/docs/en/mg-product-bundle
  - /docs/mg-product-bundle
  - /docs/en/mg-product-bundle
  - /v1/docs/mg-product-bundle
  - /v1/docs/en/mg-product-bundle
  - /v2/docs/mg-product-bundle
  - /v2/docs/en/mg-product-bundle
  - /v3/docs/mg-product-bundle
  - /v3/docs/en/mg-product-bundle
  - /v4/docs/mg-product-bundle
  - /v4/docs/en/mg-product-bundle
  - /v5/docs/mg-product-bundle
  - /v5/docs/en/mg-product-bundle
  - /v6/docs/mg-product-bundle
  - /v6/docs/en/mg-product-bundle
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productbundle.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productbundle.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productbundle.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productbundle.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productbundle.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productbundle.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productbundle.html
related:
  - title: Migration guide - Price
    link: docs/scos/dev/module-migration-guides/migration-guide-price.html
  - title: Migration guide - Product
    link: docs/scos/dev/module-migration-guides/migration-guide-product.html
---

## Upgrading from Version 6.* to Version 7.0.0

In this new version of the **ProductBundle** module, we have added support of decimal stock. You can find more details about the changes on the [ProductBundle module](https://github.com/spryker/product-bundle/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ProductBundle** module to the new version:

```bash
composer require spryker/product-bundle: "^7.0.0" --update-with-dependencies
```
2. Update the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```
3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from Version 4.* to Version 6.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from Version 3.* to Version 4.*

In version 4 we have added support for multi-currency. First, make sure that you [migrated the Price module](/docs/scos/dev/module-migration-guides/migration-guide-price.html). If you extended `ProductBundleCartExpander`, then you have to adapt some code because we changed the way the price is selected for added bundle products, check the core changes and adapt accordingly. We have also added a new plugin to handle a cart reload event.

You will also need to add the `\Spryker\Zed\ProductBundle\Communication\Plugin\Cart\CartBundleItemsPreReloadPlugin` plugin to `\Pyz\Zed\Cart\CartDependencyProvider::getPreReloadPlugins()`. This ensures that bundle items are correctly updated when the currency is changed and cart reload is invoked.

## Upgrading from Version 2.* to Version 3.*

In version 3, the calculator plugin has been changed together with the new calculator version.

The `ProductBundlePriceAggregatorPlugin` has been moved to the `SalesAggregator` module, so you may need to change the  `\Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductBundlePriceAggregatorPlugin`namespace if you still want to use it.
`aggregator. ProductBundlePriceCalculation` does not have sales aggregator logic anymore. This class has been adapted to the new calculator concept. However, if you want to use the old one, use it from `\Spryker\Zed\SalesAggregator\Business\Model\OrderAmountAggregator\ProductBundlePrices`.
