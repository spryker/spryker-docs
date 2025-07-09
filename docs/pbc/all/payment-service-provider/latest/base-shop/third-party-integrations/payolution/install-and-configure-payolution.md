---
title: Installing and configuring Payolution
description: This article contains information on configuring the Payolution module for the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payolution-configuration
originalArticleId: 85e8b401-18c3-4cb3-8616-cd73c9c7817e
redirect_from:
  - /2021080/docs/payolution-configuration
  - /2021080/docs/en/payolution-configuration
  - /docs/payolution-configuration
  - /docs/en/payolution-configuration
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/payolution/installing-and-configuring-payolution.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/payolution/installing-and-configuring-payolution.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payolution/install-and-configure-payolution.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/payolution/installing-and-configuring-payolution.html
related:
  - title: Integrating Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-payolution.html
  - title: Payolution - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-performing-requests.html
  - title: Payolution request flow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-request-flow.html
  - title: Integrating the installment payment method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
  - title: Integrating the invoice paymnet method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html
---

To integrate Payolution into your project, first you need to install and configure the Payolution module. This topic describes how to do that.

## Installation

To install the Payolution module, run:

```bash
composer require spryker-eco/payolution
```

## Configuration

Refer to `config/config.dist.php` for example of module configuration.

To set up the initial Payolution configuration, use the credentials you received after registering your Payolution merchant account:

```php
$config[PayolutionConstants::TRANSACTION_GATEWAY_URL] = '';
$config[PayolutionConstants::CALCULATION_GATEWAY_URL] = '';
$config[PayolutionConstants::TRANSACTION_SECURITY_SENDER] = '';
$config[PayolutionConstants::TRANSACTION_USER_LOGIN] = '';
$config[PayolutionConstants::TRANSACTION_USER_PASSWORD] = '';
$config[PayolutionConstants::CALCULATION_SENDER] = '';
$config[PayolutionConstants::CALCULATION_USER_LOGIN] = '';
$config[PayolutionConstants::CALCULATION_USER_PASSWORD] = '';
$config[PayolutionConstants::TRANSACTION_CHANNEL_PRE_CHECK] = '';
$config[PayolutionConstants::TRANSACTION_CHANNEL_INVOICE] = '';
$config[PayolutionConstants::TRANSACTION_CHANNEL_INSTALLMENT] = '';
$config[PayolutionConstants::CALCULATION_CHANNEL] = '';
```

Next, specify modes and order limits:

```php
$config[PayolutionConstants::TRANSACTION_MODE] = 'CONNECTOR_TEST';
$config[PayolutionConstants::CALCULATION_MODE] = 'TEST';
$config[PayolutionConstants::MIN_ORDER_GRAND_TOTAL_INVOICE] = '500';
$config[PayolutionConstants::MAX_ORDER_GRAND_TOTAL_INVOICE] = '500000';
$config[PayolutionConstants::MIN_ORDER_GRAND_TOTAL_INSTALLMENT] = '500';
$config[PayolutionConstants::MAX_ORDER_GRAND_TOTAL_INSTALLMENT] = '500000';
 ```

### Checkout Configuration

To use Payolution in frontend, add Payolution payment method handlers and subform to `Pyz/Yves/Checkout/CheckoutDependencyProvider.php`

```php
 $container[static::PAYMENT_METHOD_HANDLER] = function () {
 $paymentHandlerPlugins = new StepHandlerPluginCollection();

 $paymentHandlerPlugins->add(new PayolutionHandlerPlugin(), PaymentTransfer::PAYOLUTION_INVOICE);
 $paymentHandlerPlugins->add(new PayolutionHandlerPlugin(), PaymentTransfer::PAYOLUTION_INSTALLMENT);

 return $paymentHandlerPlugins;
 };

 $container[static::PAYMENT_SUB_FORMS] = function () {
 $paymentSubFormPlugins = new SubFormPluginCollection();

 $paymentSubFormPlugins->add(new PayolutionInstallmentSubFormPlugin());
 $paymentSubFormPlugins->add(new PayolutionInvoiceSubFormPlugin());

 return $paymentSubFormPlugins;
 };
 ```

All subform and handler plugins are located in `SprykerEco\Yves\Payolution\Plugin\` namespace.

### OMS Configuration

Activate the following Payolution process:

```php
$config[OmsConstants::ACTIVE_PROCESSES][] ='PayolutionInstalmentPayment01',
$config[OmsConstants::ACTIVE_PROCESSES][] ='PayolutionInvoicePayment01',

 ```

Default implementation for commands and options should be added to `Pyz/Zed/Oms/OmsDependencyProvider.php`

Commands:

```php
$container->extend(OmsDependencyProvider::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
    $commandCollection
        ->add(new PreAuthorizePartialPlugin(), 'Payolution/PreAuthorize')
        ->add(new ReAuthorizePartialPlugin(), 'Payolution/ReAuthorize')
        ->add(new RevertPartialPlugin(), 'Payolution/Revert')
        ->add(new CapturePartialPlugin(), 'Payolution/Capture')
        ->add(new RefundPlugin(), 'Payolution/Refund');

    return $commandCollection;
});
```

Plugins `PreAuthorizePlugin`, `ReAuthorizePlugin`, `RevertPlugin`, `CapturePlugin` still can be used but they cannot execute partial operations

Conditions:

```php
$container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
    $conditionCollection
        ->add(new IsPreAuthorizationApprovedPlugin(), 'Payolution/IsPreAuthorizationApproved')
        ->add(new IsReAuthorizationApprovedPlugin(), 'Payolution/IsReAuthorizationApproved')
        ->add(new IsReversalApprovedPlugin(), 'Payolution/IsReversalApproved')
        ->add(new IsCaptureApprovedPlugin(), 'Payolution/IsCaptureApproved')
        ->add(new IsRefundApprovedPlugin(), 'Payolution/IsRefundApproved');

    return $conditionCollection;
});
```

All commands and conditions are located in `SprykerEco\Zed\Payolution\Communication\Plugin\Oms\` namespace.

### Payment Configuration

Default implementation for checkout payment plugins should be added to `Pyz/Zed/Payment/PaymentDependencyProvider.php`

```php
 $container->extend(static::CHECKOUT_PLUGINS, function (CheckoutPluginCollection $pluginCollection) {
 $pluginCollection
 ->add(new PayolutionPreCheckPlugin(), PayolutionConfig::PROVIDER_NAME, static::CHECKOUT_PRE_CHECK_PLUGINS)
 ->add(new PayolutionSaveOrderPlugin(), PayolutionConfig::PROVIDER_NAME, static::CHECKOUT_ORDER_SAVER_PLUGINS)
 ->add(new PayolutionPostCheckPlugin(), PayolutionConfig::PROVIDER_NAME, static::CHECKOUT_POST_SAVE_PLUGINS);

 return $pluginCollection;
 });
 ```

All payment plugins are located in `SprykerEco\Zed\Payolution\Communication\Plugin\Checkout\` namespace.
