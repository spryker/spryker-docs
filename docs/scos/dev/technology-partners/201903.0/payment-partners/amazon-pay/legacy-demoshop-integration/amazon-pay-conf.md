---
title: Amazon Pay - Configuration for the Legacy Demoshop
originalLink: https://documentation.spryker.com/v2/docs/amazon-pay-configuration-demoshop
redirect_from:
  - /v2/docs/amazon-pay-configuration-demoshop
  - /v2/docs/en/amazon-pay-configuration-demoshop
---

{% info_block infoBox "Note" %}
 Please refer to `config/Shared/config.dist.php` for the module configuration example.
{% endinfo_block %}

To set up the Amazon Pay initial configuration, use the credentials you received after completing the registration as an Amazon seller:
```php
$config[AmazonPayConstants::WIDGET_SCRIPT_PATH] = 'https://static-eu.payments-amazon.com/OffAmazonPayments/eur/lpa/js/Widgets.js';
$config[AmazonPayConstants::WIDGET_SCRIPT_PATH_SANDBOX] = 'https://static-eu.payments-amazon.com/OffAmazonPayments/eur/sandbox/lpa/js/Widgets.js';
$config[AmazonPayConstants::CLIENT_ID] = '';
$config[AmazonPayConstants::CLIENT_SECRET] = '';
$config[AmazonPayConstants::SELLER_ID] = '';
$config[AmazonPayConstants::ACCESS_KEY_ID] = '';
$config[AmazonPayConstants::SECRET_ACCESS_KEY] = '';
```

In case an order is being rejected by Amazon, the module will do a redirect. The default recommendation is to redirect to cart. You need to configure this:
```php
$config[AmazonPayConstants::PAYMENT_REJECT_ROUTE] = 'cart';
```

Next, specify your country and shop:
```php
$config[AmazonPayConstants::REGION] = 'DE';
$config[AmazonPayConstants::STORE_NAME] = 'The Shop';
```

For development purposes, sandbox mode must be enabled:
```php
$config[AmazonPayConstants::SANDBOX] = true;
```

The `ERROR_REPORT_LEVEL` parameter is used for internal purposes and specifies the log verbosity level.

There are three options:

1. Log all API responses.
2. Log errors only.
3. Disable logging.

```php
$config[AmazonPayConstants::ERROR_REPORT_LEVEL] = TransactionLogger::REPORT_LEVEL_ERRORS_ONLY;
```

To configure look-and-feel of Amazon Pay button, you can use the following config values:
```php
$config[AmazonPayConstants::WIDGET_BUTTON_TYPE] = AmazonPayConfig::WIDGET_BUTTON_TYPE_FULL;
$config[AmazonPayConstants::WIDGET_BUTTON_SIZE] = AmazonPayConfig::WIDGET_BUTTON_SIZE_MEDIUM;
$config[AmazonPayConstants::WIDGET_BUTTON_COLOR] = AmazonPayConfig::WIDGET_BUTTON_COLOR_DARK_GRAY;
```

According to Amazon Pay restrictions, a module can run either on a `localhost` domain or via HTTPS. If it is not possible to use `localhost`, HTTPS connection should be configured. For testing purposes, register a test account in the [Amazon Pay dashboard](https://pay.amazon.com/us).

## OMS Configuration

Activate the following processes. If you plan to use only one process, drop the other one.
```php
$config[OmsConstants::PROCESS_LOCATION][] = APPLICATION_ROOT_DIR . '/vendor/spryker-eco/amazon-pay/config/Zed/Oms';
$config[OmsConstants::ACTIVE_PROCESSES][] = 'AmazonPayPaymentAsync01';
$config[OmsConstants::ACTIVE_PROCESSES][] = 'AmazonPayPaymentSync01';
```

Default implementation for commands and options should be added to `Pyz/Zed/Oms/OmsDependencyProvider.php`

1. Commands:
```php
$container->extend(OmsDependencyProvider::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
$commandCollection
	->add(new CancelOrderCommandPlugin(), 'AmazonPay/CancelOrder')
	->add(new CloseOrderCommandPlugin(), 'AmazonPay/CloseOrder')
	->add(new RefundOrderCommandPlugin(), 'AmazonPay/RefundOrder')
	->add(new ReauthorizeExpiredOrderCommandPlugin(), 'AmazonPay/ReauthorizeExpiredOrder')
	->add(new CaptureCommandPlugin(), 'AmazonPay/Capture')
	->add(new UpdateSuspendedOrderCommandPlugin(), 'AmazonPay/UpdateSuspendedOrder')
	->add(new UpdateAuthorizationStatusCommandPlugin(), 'AmazonPay/UpdateAuthorizationStatus')
	->add(new UpdateCaptureStatusCommandPlugin(), 'AmazonPay/UpdateCaptureStatus')
	->add(new UpdateRefundStatusCommandPlugin(), 'AmazonPay/UpdateRefundStatus');

return $commandCollection;
} );
```
2. Conditions:
```php
$container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
 $conditionCollection
        ->add(new IsClosedConditionPlugin(), 'AmazonPay/IsClosed')
        ->add(new IsCloseAllowedConditionPlugin(), 'AmazonPay/IsCloseAllowed')

        ->add(new IsCancelledConditionPlugin(), 'AmazonPay/IsCancelled')
        ->add(new IsCancelNotAllowedConditionPlugin(), 'AmazonPay/IsCancelNotAllowed')
        ->add(new IsCancelledOrderConditionPlugin(), 'AmazonPay/IsOrderCancelled')

        ->add(new IsOpenConditionPlugin(), 'AmazonPay/IsAuthOpen')
        ->add(new IsDeclinedConditionPlugin(), 'AmazonPay/IsAuthDeclined')
        ->add(new IsPendingConditionPlugin(), 'AmazonPay/IsAuthPending')
        ->add(new IsSuspendedConditionPlugin(), 'AmazonPay/IsAuthSuspended')
        ->add(new IsAuthExpiredConditionPlugin(), 'AmazonPay/IsAuthExpired')
        ->add(new IsClosedConditionPlugin(), 'AmazonPay/IsAuthClosed')
        ->add(new IsAuthTransactionTimedOutConditionPlugin(), 'AmazonPay/IsAuthTransactionTimedOut')
        ->add(new IsSuspendedConditionPlugin(), 'AmazonPay/IsPaymentMethodChanged')

        ->add(new IsCompletedConditionPlugin(), 'AmazonPay/IsCaptureCompleted')
        ->add(new IsDeclinedConditionPlugin(), 'AmazonPay/IsCaptureDeclined')
        ->add(new IsPendingConditionPlugin(), 'AmazonPay/IsCapturePending')

        ->add(new IsCompletedConditionPlugin(), 'AmazonPay/IsRefundCompleted')
        ->add(new IsDeclinedConditionPlugin(), 'AmazonPay/IsRefundDeclined')
        ->add(new IsPendingConditionPlugin(), 'AmazonPay/IsRefundPending');

    return $conditionCollection;
});
```

All default commands and conditions are stored in `SprykerEco\Zed\AmazonPay\Communication\Plugin\Oms\` namespace.

## IPN Configuration

In order to allow everyone to send push notifications, please extend `config_default.XXX.php` for desired environments:
```php
$config[AclConstants::ACL_USER_RULE_WHITELIST][] = [
 'bundle' => 'amazonpay',
 'controller' => 'ipn',
 'action' => 'endpoint',
 'type' => 'allow',
];
```

Depending on your SSL configuration, you may have to extend as well:
```php
$config[ApplicationConstants::ZED_SSL_EXCLUDED][] = 'amazonpay/ipn/endpoint';
$config[ApplicationConstants::YVES_SSL_EXCLUDED]['aie'] = '/amazonpay/ipn/endpoint';
```

## Yves Controllers

In order to enable processing of AmazonPay commands on frontend, please add `AmazonPayControllerProvider` to `YvesBootstrap`:
```php
/**
 * @param bool|null $isSsl
 *
 * @return \Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider[]
 */
protected function getControllerProviderStack($isSsl)
{
 return [
 ...
 new AmazonPayControllerProvider($isSsl),
 ];
}
```

## Checkout Integration

AmazonPay expects that order is not placed in some cases. For example, it happens when Synchronos mode is on, and payment cannot be processed.

In order to handle this,  extend `SuccessStep` in your project. For example:
```php
/**
 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return bool
 */
public function postCondition(AbstractTransfer $quoteTransfer)
{
 if ($quoteTransfer->getAmazonpayPayment() === null) {
 return true;
 }

 if ($quoteTransfer->getAmazonpayPayment()->getOrderReferenceId() === null) {
 return false;
 }

 return true;
}
```
