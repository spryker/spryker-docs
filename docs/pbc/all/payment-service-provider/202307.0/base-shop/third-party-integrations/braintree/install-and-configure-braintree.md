---
title: Installing and configuring Braintree
description: This article contains information on configuring the Braintree module for the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/braintree-configuration
originalArticleId: 50dfb6cf-d660-49f5-93cb-6bda88ca88f1
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/braintree/installing-and-configuring-braintree.html
  - /docs/scos/dev/technology-partner-guides/202307.0/payment-partners/braintree/installing-and-configuring-braintree.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/braintree/install-and-configure-braintree.html
related:
  - title: Integrating Braintree
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/integrate-braintree.html
  - title: Braintree - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/braintree-performing-requests.html
  - title: Braintree - Request workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/braintree-request-workflow.html
---

To configure Braintree module for Spryker Commerce OS (SCOS), do the following:

Add `spryker-eco/braintree` to your project:

```bash
composer require spryker-eco/braintree --update-with-dependencies
```

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

Add frontend dependencies to your project:

```bash
npm i braintree-web@^3.55 braintree-web-drop-in@^1.20 paypal-checkout@^4.0 jquery@~3.5
```

Build frontend changes:

```bash
console frontend:yves:build
```

For an example of module configuration, refer to `config/config.dist.php`.

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

// fake payment nonces can be used if there are some problems with generated ones. more information: https://developers.braintreepayments.com/reference/general/testing/php#nonce-fake-valid-issuing-bank-network-only-nonce
$config[BraintreeConstants::FAKE_PAYMENT_METHOD_NONCE] = 'fake-valid-mastercard-nonce';

// if generated one does not work (for example there are some problems with braintree/dropin library) it can be directly set here. Valid one can be retrieved from https://braintree-sample-merchant.herokuapp.com/client_token
$config[BraintreeConstants::FAKE_CLIENT_TOKEN] = '';
```

## Checkout Configuration

To use Braintree in frontend, Braintree payment method handlers and subforms must be added to `Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`.

```php
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Yves\Braintree\Plugin\BraintreeCreditCardSubFormPlugin;
use SprykerEco\Yves\Braintree\Plugin\BraintreeHandlerPlugin;
use SprykerEco\Yves\Braintree\Plugin\BraintreePayPalSubFormPlugin;
use Generated\Shared\Transfer\PaymentTransfer;

...


/**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
protected function addSubFormPluginCollection(Container $container): Container
{
    $container[self::PAYMENT_SUB_FORMS] = function () {
        $paymentSubFormPluginCollection = new SubFormPluginCollection();
        $paymentSubFormPluginCollection->add(new BraintreeCreditCardSubFormPlugin());
        $paymentSubFormPluginCollection->add(new BraintreePayPalSubFormPlugin());
        return $paymentSubFormPluginCollection;
    };

    return $container;
}

/**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
protected function addPaymentMethodHandlerPluginCollection(Container $container): Container
{
    $container[self::PAYMENT_METHOD_HANDLER] = function () {
        $paymentMethodHandlerCollection = new StepHandlerPluginCollection();
        $paymentMethodHandlerCollection->add(new BraintreeHandlerPlugin(), PaymentTransfer::BRAINTREE_CREDIT_CARD);
        $paymentMethodHandlerCollection->add(new BraintreeHandlerPlugin(), PaymentTransfer::BRAINTREE_PAY_PAL);
        return $paymentMethodHandlerCollection;
    };

    return $container;
}
```

All subform and handler plugins are located in `SprykerEco\Yves\Braintree\Plugin\` namespace.

## OMS Configuration

Activate the following Braintree process:
```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
    'BraintreePayPal01',
    'BraintreeCreditCard01',
    'BraintreeCreditCard01'
];


$config[OmsConstants::PROCESS_LOCATION] = [
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_VENDOR_DIR . '/spryker-eco/braintree/config/Zed/Oms',
];


$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    \SprykerEco\Shared\Braintree\BraintreeConfig::PAYMENT_METHOD_CREDIT_CARD => 'BraintreeCreditCard01',
    \SprykerEco\Shared\Braintree\BraintreeConfig::PAYMENT_METHOD_PAY_PAL => 'BraintreePayPal01',
];

```

Default implementation for commands and options must be added to `Pyz/Zed/Oms/OmsDependencyProvider.php`.

1. Commands:
```php
$container->extend(OmsDependencyProvider::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
    $commandCollection
        ->add(new AuthorizePlugin(), 'Braintree/Authorize')
        ->add(new RevertPlugin(), 'Braintree/Revert')
        ->add(new CapturePlugin(), 'Braintree/Capture')
        ->add(new RefundPlugin(), 'Braintree/Refund')
        ->add(new ItemsCapturePlugin(), 'Braintree/ItemsCapture')
        ->add(new OrderCapturePlugin(), 'Braintree/OrderCapture')
        ->add(new ItemsRefundPlugin(), 'Braintree/ItemsRefund')
        ->add(new OrderRefundPlugin(), 'Braintree/OrderRefund') return $commandCollection; });
```
Also, plugins to split the logic for payment methods were added to the new version of the Braintree module. These plugins don't provide partial operation for the supported payment methods.
You can use `ItemsCapture` and `ItemsRefund` plugins for Paypal payment methods and `OrderCapture` and `OrderRefund` for the Credit card payment method. `CapturePlugin` and `RefundPlugin` as well as relevevant facade methods are deprecated and will be removed with the next major relese.

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

Default implementation for the checkout payment plugins should be added to `Pyz/Zed/Checkout/CheckoutDependencyProvider.php`.

```php
protected function getCheckoutPreConditions(Container $container)
{
    return [
        ...
        new BraintreeCheckoutPreConditionPlugin(),
    ];
}

protected function getCheckoutOrderSavers(Container $container)
{
    return [
        ...
        new BraintreeCheckoutDoSaveOrderPlugin(),
    ];
}

protected function getCheckoutPostHooks(Container $container)
{
    return [
        ...
        new BraintreeCheckoutPostSavePlugin(),
    ];
}
```

All payment plugins are located in the `SprykerEco\Zed\Braintree\Communication\Plugin\Checkout\` namespace.
