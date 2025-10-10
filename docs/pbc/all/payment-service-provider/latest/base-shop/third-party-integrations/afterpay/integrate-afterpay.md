---
title: Integrating AfterPay
description: Learn how you can integrate AfterPay into your Spryker Cloud Commerce OS project
last_updated: Jun 16, 2021
template: howto-guide-template
related:
  - title: Afterpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/afterpay/afterpay.html
redirect_from:
- /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/afterpay/integrating-afterpay.html
- /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/afterpay/integrating-afterpay.html
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/afterpay/integrate-afterpay.html
- /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/afterpay/integrating-afterpay.html
- /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/afterpay/integrate-afterpay.html
---

To integrate AfterPay, do the following:

In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`, add a new plugin to `getCheckoutOrderSavers()`:

```php
...
use SprykerEco\Zed\AfterPay\Communication\Plugin\Checkout\AfterPaySaveOrderPlugin;
...

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
 */
 protected function getCheckoutOrderSavers(Container $container)
 {
 /** @var \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[] $plugins */
 $plugins = [
 ...
 new AfterPaySaveOrderPlugin(),
 ];
 ```

In `src/Pyz/Zed/Oms/OmsDependencyProvider.php`, add:

**Code sample**

 ```php
 ...
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandCollection;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionCollection;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Command\AuthorizePlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Command\CancelPlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Command\CapturePlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Command\RefundPlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Condition\IsAuthorizationCompletedPlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Condition\IsCancellationCompletedPlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Condition\IsCaptureCompletedPlugin;
use SprykerEco\Zed\AfterPay\Communication\Plugin\Oms\Condition\IsRefundCompletedPlugin;
...

...
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
 protected function addCommandPlugins(Container $container): Container
 {
 $container[self::COMMAND_PLUGINS] = function () {
 $commandCollection = new CommandCollection();
 $commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
 $commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
 $commandCollection->add(new AuthorizePlugin(), 'AfterPay/Authorize');
 $commandCollection->add(new CancelPlugin(), 'AfterPay/Cancel');
 $commandCollection->add(new CapturePlugin(), 'AfterPay/Capture');
 $commandCollection->add(new RefundPlugin(), 'AfterPay/Refund');
 return $commandCollection;
 };
 return $container;
 }
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
 protected function addConditionPlugins(Container $container): Container
 {
 $container[self::CONDITION_PLUGINS] = function () {
 $conditionCollection = new ConditionCollection();
 $conditionCollection->add(new IsAuthorizationCompletedPlugin(), 'AfterPay/IsAuthorizationCompleted');
 $conditionCollection->add(new IsCancellationCompletedPlugin(), 'AfterPay/IsCancellationCompleted');
 $conditionCollection->add(new IsCaptureCompletedPlugin(), 'AfterPay/IsCaptureCompleted');
 $conditionCollection->add(new IsRefundCompletedPlugin(), 'AfterPay/IsRefundCompleted');
 return $conditionCollection;
 };
 return $container;
 }
 ```

In the `src/Pyz/Zed/Oms/OmsDependencyProvider.php` in `provideBusinessLayerDependencies()` method replace this:

```php
$container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
 $commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
 $commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
 return $commandCollection;
});
```

with this:

```php
$container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
 $commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
 $commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
 $commandCollection->add(new AuthorizePlugin(), 'AfterPay/Authorize');
 $commandCollection->add(new CancelPlugin(), 'AfterPay/Cancel');
 $commandCollection->add(new CapturePlugin(), 'AfterPay/Capture');
 $commandCollection->add(new RefundPlugin(), 'AfterPay/Refund');
 return $commandCollection;
});

$container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
 $conditionCollection->add(new IsAuthorizationCompletedPlugin(), 'AfterPay/IsAuthorizationCompleted');
 $conditionCollection->add(new IsCancellationCompletedPlugin(), 'AfterPay/IsCancellationCompleted');
 $conditionCollection->add(new IsCaptureCompletedPlugin(), 'AfterPay/IsCaptureCompleted');
 $conditionCollection->add(new IsRefundCompletedPlugin(), 'AfterPay/IsRefundCompleted');
 return $conditionCollection;
});
```
