---
title: Installing and configuring Adyen
description: Install and configure Adyen module to work in the Spryker Commerce OS.
last_updated: Jan 31, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/adyen-configuration
originalArticleId: ff6765b6-058f-44a6-85d0-9d1270b7910d
redirect_from:
  - /v1/docs/adyen-configuration
  - /v1/docs/en/adyen-configuration
related:
  - title: Payment Integration - Adyen
    link: docs/scos/user/technology-partners/page.version/payment-partners/adyen.html
  - title: Integrating Adyen
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/adyen/integrating-adyen.html
  - title: Integrating Adyen payment methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/adyen/integrating-adyen-payment-methods.html
  - title: Enabling filtering of payment methods for Ayden
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/adyen/enabling-filtering-of-payment-methods-for-adyen.html
---

To integrate Adyen into your project, first you need to install and configure the Adyen module. This topic describes how to do that.

## Integration overview

The `spryker-eco/adyen` module provides integration of Spryker e-commerce system with Adyen technology partner. It requires the `SprykerEco.AdyenApi` `spryker-eco/adyen-api` module that provides the REST Client for making API calls to the Adyen Payment Provider.

The `SprykerEco.Adyen` module includes integration with:

* Checkout process - payment forms with all necessary fields that are required to make payment request, save order information and so on.
* OMS (Order Management System) - state machines, all necessary commands for making modification requests and conditions for changing orders status accordingly.

The `SprykerEco.Adyen` module provides the following payment methods:
* [Credit Card](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#credit-card)
* [Direct Debit](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#direct-debit-sepa-direct-debit)
* [Klarna Invoice](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#klarna-invoice)
* [Prepayment](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#prepayment-bank-transfer-iban)
* [Sofort](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#sofort)
* [PayPal](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#paypal)
* [iDeal](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#ideal)
* [AliPay](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#alipay)
* [WeChatPay](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/adyen/integrating-adyen-payment-methods.html#wechatpay)

## Installation
To install the Adyen module, run
```
composer require spryker-eco/adyen
```

## Configuration
### General Configuration

You can find all necessary configurations in `vendor/spryker-eco/adyen/config/config.dist.php`.
The table below describes all general configuration keys and their values.

|Configuration Key|Type|Description|
| --- | --- | --- |
| `AdyenConstants::MERCHANT_ACCOUNT` | string | Name of merchant account |
| `AdyenConstants::REQUEST_CHANNEL` | string | Name of channel communication with Adyen, has to be "Web" |
| `AdyenConstants::SDK_CHECKOUT_SECURED_FIELDS_URL` | string | JS SDK URL to encrypt Credit Card secure fields |
| `AdyenConstants::SDK_CHECKOUT_ORIGIN_KEY` | string | Origin key of JS SDK that generated based on project base URL |
| `AdyenConstants::SOFORT_RETURN_URL` | string | URL to return customer after pay on Sofort: `http://mysprykershop.com/adyen/callback/redirect-sofort` |
| `AdyenConstants::CREDIT_CARD_3D_RETURN_URL` | string | URL to return customer after passing 3D secure: `http://mysprykershop.com/adyen/callback/redirect-credit-card-3` |
| `AdyenConstants::IDEAL_RETURN_URL` | string | URL to return customer after pay on iDeal: `http://mysprykershop.com/adyen/callback/redirect-ideal` |
| `AdyenConstants::PAY_PAL_RETURN_URL` | string | URL to return customer after pay on PayPal: `http://mysprykershop.com/adyen/callback/redirect-paypal` |
| `AdyenConstants::ALI_PAY_RETURN_URL` | string | URL to return customer after pay on AliPay: `http://mysprykershop.com/adyen/callback/redirect-alipay` |
| `AdyenConstants::WE_CHAT_PAY_RETURN_URL` | string | URL to return customer after pay on WeChatPay: `http://mysprykershop.com/adyen/callback/redirect-wechatpay` |
| `AdyenConstants::CREDIT_CARD_3D_SECURE_ENABLED` | bool | Is 3D secure enabled for Credit Card payments |
| `AdyenConstants::MULTIPLE_PARTIAL_CAPTURE_ENABLED` | bool | Is multiple capture enabled. Default false |
| `AdyenConstants::SOCIAL_SECURITY_NUMBER_COUNTRIES_MANDATORY` | array | List of countries with SSN mandatory |
| `AdyenConstants::IDEAL_ISSUERS_LIST` | array | List of iDeal issuers |
| `AdyenApiConstants::API_KEY` | string | API key, provided by Adyen |
| `AdyenApiConstants::GET_PAYMENT_METHODS_ACTION_URL` | string | URL for get available payment methods API call |
| `AdyenApiConstants::MAKE_PAYMENT_ACTION_URL` | string | URL for make payment API call |
|` AdyenApiConstants::PAYMENTS_DETAILS_ACTION_URL` | string | URL for payment details API call |
| `AdyenApiConstants::AUTHORIZE_ACTION_URL` | string | URL for authorize API call |
| `AdyenApiConstants::AUTHORIZE_3D_ACTION_URL` | string | URL for authorize 3D API call |
| `AdyenApiConstants::CAPTURE_ACTION_URL` | string | URL for capture API call |
| `AdyenApiConstants::CANCEL_ACTION_URL` | string | URL for cancel API call |
| `AdyenApiConstants::REFUND_ACTION_URL` | string | URL for refund API call |
| `AdyenApiConstants::CANCEL_OR_REFUND_ACTION_URL` | string | URL for cancel or refund API call (when it's not possible to know is payment already captured) |
| `AdyenApiConstants::TECHNICAL_CANCEL_ACTION_URL` | string | URL for technical cancel API call |
| `AdyenApiConstants::ADJUST_AUTHORIZATION_ACTION_URL` | string | URL for adjust authorized amount API call |

### Specific Configuration
Also, you have to add payment methods to State Machine (OMS) configuration:

```php
 $config[OmsConstants::PROCESS_LOCATION] = [
 ...
 APPLICATION_ROOT_DIR . '/vendor/spryker-eco/adyen/config/Zed/Oms',
 ];
 $config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'AdyenCreditCard01',
 'AdyenSofort01',
 'AdyenDirectDebit01',
 'AdyenKlarnaInvoice01',
 'AdyenPrepayment01',
 'AdyenIdeal01',
 'AdyenPayPal01',
 'AdyenAliPay01',
 'AdyenWeChatPay01',
 ];
 $config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 AdyenConfig::ADYEN_CREDIT_CARD => 'AdyenCreditCard01',
 AdyenConfig::ADYEN_SOFORT => 'AdyenSofort01',
 AdyenConfig::ADYEN_DIRECT_DEBIT => 'AdyenDirectDebit01',
 AdyenConfig::ADYEN_KLARNA_INVOICE => 'AdyenKlarnaInvoice01',
 AdyenConfig::ADYEN_PREPAYMENT => 'AdyenPrepayment01',
 AdyenConfig::ADYEN_IDEAL => 'AdyenIdeal01',
 AdyenConfig::ADYEN_PAY_PAL => 'AdyenPayPal01',
 AdyenConfig::ADYEN_ALI_PAY => 'AdyenAliPay01',
 AdyenConfig::ADYEN_WE_CHAT_PAY => 'AdyenWeChatPay01',
 ];
 ```

## Notifications

To complete the payment modification requests (cancel, capture, refund), it's necessary to [configure notification on Adyen](https://docs.adyen.com/platforms/configure-notifications) merchant backend side.

You can get more information form [Adyen documentation](https://docs.adyen.com/developers).

The link to accept notifications from Adyen looks like https://mysprykershop.com/adyen/notification.

## Adyen Configuration

You can get your credentials by following the [instruction](https://docs.adyen.com/online-payments/classic-integrations/api-integration-ecommerce).

You can get JS SDK url and generate your origin key by following this [instruction](https://docs.adyen.com/online-payments/classic-integrations/api-integration-ecommerce) from.
