---
title: Afterpay - Installation and Configuration
originalLink: https://documentation.spryker.com/v2/docs/afterpay-installation-and-configuration
redirect_from:
  - /v2/docs/afterpay-installation-and-configuration
  - /v2/docs/en/afterpay-installation-and-configuration
---

The following guide describes how to install and configure AfterPay in your project.

## Installation

To install AfterPay, run the command in the console:
```php
composer require spryker-eco/after-pay
```

## Configuration

To set up the AfterPay initial configuration, use the credentials you received from your AfterPay account.

The `API_ENDPOINT_BASE_URL` parameter should be a link: you should get it from AfterPay. For test integration, you can use [https://sandbox.afterpay.io/api/v3/version](https://sandbox.afterpay.io/api/v3/version)

You should also get `API_CREDENTIALS_AUTH_KEY` and `PAYMENT_INVOICE_CHANNEL_ID` from your AfterPay account.

You can use different Checkout Services; to select one, set up `$config[AfterPayConstants::AFTERPAY_AUTHORIZE_WORKFLOW]`:

* One-Step Authorization → `AFTERPAY_AUTHORIZE_WORKFLOW_ONE_STEP`
* Two-Step Authorization → `AFTERPAY_AUTHORIZE_WORKFLOW_TWO_STEPS`

If you want to use Two-Step Authorization, in the Pyz layer, create the `Pyz\Yves\CheckoutPage\Process\Steps\PaymentStep.php` class and extend `SprykerShop\Yves\CheckoutPage\Process\Steps\PaymentStep.php` if `Pyz\Yves\CheckoutPage\Process\Steps\PaymentStep.php` does not exist. After that, you use `AfterPayClient`, call `getAvailablePaymentMethods()`, and handle the request for your specific logic.

Add the new code to `config/Shared/config_default.php`:
```php
...
use SprykerEco\Shared\AfterPay\AfterPayConfig;
use SprykerEco\Shared\AfterPay\AfterPayConstants;
...

...
// ---------- AfterPay
$config[AfterPayConstants::API_ENDPOINT_BASE_URL] = 'https://sandboxapi.horizonafs.com/eCommerceServicesWebApi/api/v3/';
$config[AfterPayConstants::API_CREDENTIALS_AUTH_KEY] = 'your api key';
$config[AfterPayConstants::PAYMENT_INVOICE_CHANNEL_ID] = 'your invoice channel id';
$config[AfterPayConstants::AFTERPAY_YVES_AUTHORIZE_PAYMENT_FAILED_URL] = 'http://www.de.afterpay.local/en/checkout/payment';
$config[AfterPayConstants::AFTERPAY_AUTHORIZE_WORKFLOW] = AfterPayConfig::AFTERPAY_AUTHORIZE_WORKFLOW_ONE_STEP;
$config[AfterPayConstants::AFTERPAY_RISK_CHECK_CONFIGURATION] = [
 AfterPayConfig::PAYMENT_METHOD_INVOICE => AfterPayConfig::RISK_CHECK_METHOD_INVOICE,
];
...
```

Replace this line in `config/Shared/config_default.php`:
```php
$ENVIRONMENT_PREFIX = '';
```

with this:
```php
$ENVIRONMENT_PREFIX = 'AfterPay-local';
```

Add a new item to the config array `$config[OmsConstants::PROCESS_LOCATION]` in `config/Shared/config_default.php`:

```php
$config[OmsConstants::PROCESS_LOCATION] = [
 OmsConfig::DEFAULT_PROCESS_LOCATION,
 $config[KernelConstants::SPRYKER_ROOT] . '/DummyPayment/config/Zed/Oms',
 APPLICATION_ROOT_DIR . '/vendor/spryker-eco/after-pay/config/Zed/Oms',
];
```

Add a new item to the config array `$config[OmsConstants::ACTIVE_PROCESSES]` in `config/Shared/config_default.php`:

```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
 'DummyPayment01',
 'AfterPayInvoice01',
];
```

Add a new item to the config array `$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING]` in `config/Shared/config_default.php`:

```php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'DummyPayment01',
 DummyPaymentConfig::PAYMENT_METHOD_CREDIT_CARD => 'DummyPayment01',
 AfterPayConfig::PAYMENT_METHOD_INVOICE => 'AfterPayInvoice01',
];
```

Add these lines to `data/import/glossary.csv`:

```php
checkout.payment.provider.afterPay,AfterPay,en_US
checkout.payment.provider.afterPay,AfterPay,de_DE
```

## Installation

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
<details open>
 <summary>Click to expand the code sample</summary>

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
<br>
</details>

In the `src/Pyz/Zed/Oms/OmsDependencyProvider.php` in `provideBusinessLayerDependencies()` method replace

```php
$container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
 $commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
 $commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
 return $commandCollection;
});
```

with:
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

