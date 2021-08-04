---
title: Braintree - Configuration for the Legacy Demoshop
originalLink: https://documentation.spryker.com/v2/docs/braintree-configuration-legacy-demoshop
redirect_from:
  - /v2/docs/braintree-configuration-legacy-demoshop
  - /v2/docs/en/braintree-configuration-legacy-demoshop
---

Add `spryker-eco/braintree` to your project by running `composer require spryker-eco/braintree`.

Please refer to `config/config.dist.php` for an example of module configuration.

To setup the initial Braintree configuration, use the credentials you received after registering your Braintree merchant account:
```php
// the mode of the transaction, either development, integration, sandbox, production, qa (required)
$config[BraintreeConstants::ENVIRONMENT] = '';

// the id of the merchant used (required)
$config[BraintreeConstants::MERCHANT_ID] = '';

// the public key given by the defined merchant account (required)
$config[BraintreeConstants::PUBLIC_KEY] = '';

// the private key given by the defined merchant account (required)
$config[BraintreeConstants::PRIVATE_KEY] = '';

// merchant account id specifying the currency (Marketplace master merchant is used by default)
$config[BraintreeConstants::ACCOUNT_ID] = '';

// merchant account unique identifier (Marketplace master merchant is used by default)
$config[BraintreeConstants::ACCOUNT_UNIQUE_IDENTIFIER] = '';

// defaults to false
$config[BraintreeConstants::IS_VAULTED] = true;

// defaults to false
$config[BraintreeConstants::IS_3D_SECURE] = true;
```

## Checkout Configuration

To use Braintree in frontend, Braintree payment method handlers and subforms should be added to `Pyz/Yves/Checkout/CheckoutDependencyProvider.php`.
```php
$container[CheckoutDependencyProvider::PAYMENT_METHOD_HANDLER] = function () {
 $paymentHandlerPlugins = new StepHandlerPluginCollection();

 $paymentHandlerPlugins->add(new BraintreeHandlerPlugin(), PaymentTransfer::BRAINTREE_CREDIT_CARD);
 $paymentHandlerPlugins->add(new BraintreeHandlerPlugin(), PaymentTransfer::BRAINTREE_PAY_PAL);

 return $paymentHandlerPlugins;
 };

$container[CheckoutDependencyProvider::PAYMENT_SUB_FORMS] = function () {
 $paymentSubFormPlugins = new SubFormPluginCollection();

 $paymentSubFormPlugins->add(new BraintreeCreditCardSubFormPlugin());
 $paymentSubFormPlugins->add(new BraintreePayPalSubFormPlugin());

 return $paymentSubFormPlugins;
 };
 ```

All subform and handler plugins are located in `SprykerEco\Yves\Braintree\Plugin\` namespace.

## OMS Configuration

Activate the following Braintree process:
```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
 'BraintreePayPal01',
 'BraintreeCreditCard01',
];``````php$config[OmsConstants::PROCESS_LOCATION] = [
 OmsConfig::DEFAULT_PROCESS_LOCATION,
 APPLICATION_VENDOR_DIR . '/spryker-eco/braintree/config/Zed/Oms',
];``````php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 \SprykerEco\Shared\Braintree\BraintreeConfig::PAYMENT_METHOD_CREDIT_CARD => 'BraintreeCreditCard01',
 \SprykerEco\Shared\Braintree\BraintreeConfig::PAYMENT_METHOD_PAY_PAL => 'BraintreePayPal01',
];
```

Default implementation for commands and options should be added to `Pyz/Zed/Oms/OmsDependencyProvider.php`

1. Commands:
```php
 $container->extend(OmsDependencyProvider::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
    $commandCollection
        ->add(new AuthorizePlugin(), 'Braintree/Authorize')
        ->add(new RevertPlugin(), 'Braintree/Revert')
        ->add(new CapturePlugin(), 'Braintree/Capture')
        ->add(new RefundPlugin(), 'Braintree/Refund');

    return $commandCollection;
});
```
2. Conditions:
```php
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
    $conditionCollection
        ->add(new IsAuthorizationApprovedPlugin(), 'Braintree/IsAuthorizationApproved')
        ->add(new IsReversalApprovedPlugin(), 'Braintree/IsReversalApproved')
        ->add(new IsCaptureApprovedPlugin(), 'Braintree/IsCaptureApproved')
        ->add(new IsRefundApprovedPlugin(), 'Braintree/IsRefundApproved');

    return $conditionCollection;
});
```

All commands and conditions are located in `SprykerEco\Zed\Braintree\Communication\Plugin\Oms\` namespace.

## Payment Configuration

Default implementation for checkout payment plugins should be added to `Pyz/Zed/Payment/PaymentDependencyProvider.php`
```php
$container->extend(PaymentDependencyProvider::CHECKOUT_PLUGINS, function (CheckoutPluginCollection $pluginCollection) {
 $pluginCollection
 ->add(new BraintreePreCheckPlugin(), BraintreeConfig::PROVIDER_NAME, PaymentDependencyProvider::CHECKOUT_PRE_CHECK_PLUGINS)
 ->add(new BraintreeSaveOrderPlugin(), BraintreeConfig::PROVIDER_NAME, PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS)
 ->add(new BraintreePostSavePlugin(), BraintreeConfig::PROVIDER_NAME, PaymentDependencyProvider::CHECKOUT_POST_SAVE_PLUGINS);

 return $pluginCollection;
 });
 ```

All payment plugins are located in `SprykerEco\Zed\Braintree\Communication\Plugin\Checkout\` namespace.
