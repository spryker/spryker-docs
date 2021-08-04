---
title: Heidelpay - Configuration for SCOS
originalLink: https://documentation.spryker.com/v6/docs/heidelpay-configuration-scos
redirect_from:
  - /v6/docs/heidelpay-configuration-scos
  - /v6/docs/en/heidelpay-configuration-scos
---

Base settings are located in `config/Shared/config_default.php`

|Configuration Key  |Type  |Description |
| --- | --- | --- |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_SECURITY_SENDER` | string | Security sender merchant config value, got from Heidelpay. |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_USER_LOGIN` | string | User login merchant config value, got from Heidelpay. |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_USER_PASSWORD` | string | User password merchant config value, got from Heidelpay. |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_CC_3D_SECURE` | string | Transaction channel for Credit Card payment method, got from Heidelpay |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_PAYPAL` | string | Transaction channel for Paypal payment method, got from Heidelpay |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_IDEAL` | string | Transaction channel for iDeal payment method, got from Heidelpay |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_SOFORT` | string | Transaction channel for Sofort payment method, got from Heidelpay |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_APPLICATION_SECRET` | string | Application secret for sign requests. |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_SANDBOX_REQUEST` | bool | Setting for switching the requests to sandbox mode. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FRAME_CUSTOM_CSS_URL` | string | URL Setting with custom styles for iframe. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FRAME_PREVENT_ASYNC_REDIRECT` | string | Settings required by Heidelpay. Has to be  "FALSE". |
|  `HeidelpayConstants::CONFIG_ENCRYPTION_KEY` | string | A key for encrypting Credit Card sensitive data. |
|  `HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY` | bool | Setting for enabling split payments. |

Store sensitive settings (DE, AT etc) can be found in `config/Shared/config_default_DE.php`

|Configuration Key  |Type  |Description |
| --- | --- | --- |
|  `HeidelpayConstants::CONFIG_HEIDELPAY_LANGUAGE_CODE` | string | Language code for iframe and so on, DE for example. |
|  `HeidelpayConstants::CONFIG_YVES_URL` | string | Must be the same as `ApplicationConstants::BASE_URL_YVES` |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUCCESS_URL` | string | URL to return after success submit payment data. In general Checkout Success page. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FAILED_URL` | string | URL to return after failure submit payment data. In general Checkout Payment page. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_IDEAL_AUTHORIZE_URL` | string | URL to return after success submit iDeal payment data. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_STEP_PATH` | string | Path to payment step. In general  `/checkout/payment` |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUMMARY_STEP_URL` | string | Summary step URL. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_ASYNC_RESPONSE_URL` | string | URL to receive async requests from Heidelpay. |
|  `HeidelpayConstants::CONFIG_YVES_CHECKOUT_REGISTRATION_SUCCESS_URL` | string | URL to finish success registration of Credit Card. |

Also, you have to add payment methods to [State Machine (OMS) configuration](https://documentation.spryker.com/v4/docs/heidelpay#building-a-state-machine-workflow-to-use-heidelpay-payment-methods):
```php
$config[OmsConstants::PROCESS_LOCATION] = [
 ...
 APPLICATION_ROOT_DIR . '/vendor/spryker-eco/heidelpay/config/Zed/Oms',
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'HeidelpaySofort01',
 'HeidelpayPaypalAuthorize01',
 'HeidelpayPaypalDebit01',
 'HeidelpayIdeal01',
 'HeidelpayCreditCardSecureAuthorize01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 HeidelpayConfig::PAYMENT_METHOD_CREDIT_CARD_SECURE => 'HeidelpayCreditCardSecureAuthorize01',
 HeidelpayConfig::PAYMENT_METHOD_SOFORT => 'HeidelpaySofort01',
 HeidelpayConfig::PAYMENT_METHOD_PAYPAL_AUTHORIZE => 'HeidelpayPaypalAuthorize01',
 HeidelpayConfig::PAYMENT_METHOD_PAYPAL_DEBIT => 'HeidelpayPaypalDebit01',
 HeidelpayConfig::PAYMENT_METHOD_IDEAL => 'HeidelpayIdeal01',
];
```

