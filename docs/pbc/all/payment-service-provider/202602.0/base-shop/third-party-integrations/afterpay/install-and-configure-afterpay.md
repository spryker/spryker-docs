---
title: Installing and configuring Afterpay
description: Learn how to install and configure AfterPay into Spryker Cloud Commerce OS projects
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/afterpay-installation-and-configuration
originalArticleId: 487c14bc-6f1e-4d86-abaa-3bbf5891e55c
redirect_from:
  - /2021080/docs/afterpay-installation-and-configuration
  - /2021080/docs/en/afterpay-installation-and-configuration
  - /docs/afterpay-installation-and-configuration
  - /docs/en/afterpay-installation-and-configuration
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/afterpay/installing-and-configuring-afterpay.html
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/afterpay/install-and-configure-afterpay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/afterpay/install-and-configure-afterpay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/afterpay/installing-and-configuring-afterpay.html
related:
  - title: Afterpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/afterpay/afterpay.html
---

{% info_block errorBox %}

Currently, AfterPay does not work correctly with [gift cards](/docs/pbc/all/gift-cards/latest/gift-cards.html) AfterPay. We will update the document after resolving the conflict.

{% endinfo_block %}

This document describes how to install and configure AfterPay.

## Installing Afterpay

To install AfterPay, install the AfterPay module:

```bash
composer require spryker-eco/after-pay
```

## Configuring Afterpay

To set up the AfterPay initial configuration, use the credentials you received from your AfterPay account.

The `API_ENDPOINT_BASE_URL` parameter should be a link: you should get it from AfterPay. For test integration, you can use `https://sandbox.afterpay.io/api/v3/version`

You should also get `API_CREDENTIALS_AUTH_KEY` and `PAYMENT_INVOICE_CHANNEL_ID` from your AfterPay account.

You can use different Checkout Services; to select one, set up `$config[AfterPayConstants::AFTERPAY_AUTHORIZE_WORKFLOW]`:
- One-Step Authorization → `AFTERPAY_AUTHORIZE_WORKFLOW_ONE_STEP`
- Two-Step Authorization → `AFTERPAY_AUTHORIZE_WORKFLOW_TWO_STEPS`

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
