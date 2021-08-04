---
title: Adyen - Installation and Configuration
originalLink: https://documentation.spryker.com/v2/docs/adyen-configuration
redirect_from:
  - /v2/docs/adyen-configuration
  - /v2/docs/en/adyen-configuration
---

To integrate Adyen into your project, first you need to install and configure the Adyen module. This topic describes how to do that.

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

To complete the payment modification requests (cancel, capture, refund), it's necessary to [configure notification on Adyen](https://docs.adyen.com/developers/notifications/set-up-notifications) merchant backend side.

You can get more information form [Adyen documentation](https://docs.adyen.com/developers).

The link to accept notifications from Adyen looks like http://www.de.your-project.com/adyen/notification.

## Adyen Configuration

You can get your credentials by following the [instruction](https://docs.adyen.com/developers/checkout/api-integration#beforeyoubegin).

You can get JS SDK url and generate your origin key by following this [instruction](https://docs.adyen.com/developers/checkout/api-integration#encryptcreditcarddetails) from.
