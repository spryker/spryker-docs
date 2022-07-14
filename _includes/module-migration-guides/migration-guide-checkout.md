---
title: Migration guide - Checkout
description: Use the guide to update versions to the newer ones of the Checkout module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-checkout
originalArticleId: 1b63d6ca-1a92-4a54-998f-4230719c8dd0
redirect_from:
  - /2021080/docs/mg-checkout
  - /2021080/docs/en/mg-checkout
  - /docs/mg-checkout
  - /docs/en/mg-checkout
  - /v1/docs/mg-checkout
  - /v1/docs/en/mg-checkout
  - /v2/docs/mg-checkout
  - /v2/docs/en/mg-checkout
  - /v3/docs/mg-checkout
  - /v3/docs/en/mg-checkout
  - /v4/docs/mg-checkout
  - /v4/docs/en/mg-checkout
  - /v5/docs/mg-checkout
  - /v5/docs/en/mg-checkout
  - /v6/docs/mg-checkout
  - /v6/docs/en/mg-checkout
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-checkout.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-checkout.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-checkout.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-checkout.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-checkout.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-checkout.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-checkout.html
related:
  - title: Checkout
    link: docs/scos/user/features/page.version/checkout-feature-overview/checkout-feature-overview.html
---

## Upgrading from Version 4.* to Version 6.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from Version 3.* to Version 4.*

If you extended `\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreConditionInterface`: find those plugins and make sure they return boolean. Important: you can return `true` even if a plugin adds errors to the checkout response.            Replace the interface with `Spryker\Zed\Checkout\Dependency\Plugin\PlaceOrder\CheckoutPreConditionInterface`.

If you extended `\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface`: find those plugins and make sure they work with only one param `QuoteTransfer $quoteTransfer` in `preSave` function. Replace the interface to `Spryker\Zed\Checkout\Dependency\Plugin\PlaceOrder\CheckoutPreSaveHookInterface`
OMS run is not optional anymore. Order placement process will trigger the OMS run after an order is saved, and before post save hooks run. Please find and remove usages of `\Spryker\Zed\Oms\Communication\Plugin\Checkout\OmsPostSaveHookPlugin` and any customer OMS trigger implementation.

### Migrate to the New Saved Plugins:
Replace `\Spryker\Zed\ProductOption\Communication\Plugin\ProductOptionOrderSaverPlugin` with `\Spryker\Zed\ProductOption\Communication\Plugin\Checkout\ProductOptionOrderSaverPlugin`
Replace `\Spryker\Zed\ProductBundle\Communication\Plugin\Sales\ProductBundleOrderSaverPlugin` with `\Spryker\Zed\ProductBundle\Communication\Plugin\Checkout\ProductBundleOrderSaverPlugin`
Replace `\Spryker\Zed\Shipment\Communication\Plugin\OrderShipmentSavePlugin` with `\Spryker\Zed\Shipment\Communication\Plugin\Checkout\OrderShipmentSavePlugin`
Replace `\Spryker\Zed\Discount\Communication\Plugin\Sales\DiscountOrderSavePlugin` with `\Spryker\Zed\Discount\Communication\Plugin\Checkout\DiscountOrderSavePlugin`
Replace `\Spryker\Zed\Customer\Communication\Plugin\OrderCustomerSavePlugin` with `\Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerOrderSavePlugin`
Replace `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentSaverPlugin` with `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentOrderSaverPlugin`
Replace `\Spryker\Zed\Sales\Communication\Plugin\SalesOrderSaverPlugin` with `\Spryker\Zed\Sales\Communication\Plugin\Checkout\SalesOrderSaverPlugin`
Replace `\Spryker\Zed\SalesProductConnector\Communication\Plugin\ItemMetadataSaverPlugin` with `\Spryker\Zed\SalesProductConnector\Communication\Plugin\Checkout\ItemMetadataSaverPlugin`

<!-- Last review date: Nov 7, 2017-- by Denis Turkov -->
