---
title: CrefoPay - Installation and Configuration
originalLink: https://documentation.spryker.com/v3/docs/crefopay-configuration
redirect_from:
  - /v3/docs/crefopay-configuration
  - /v3/docs/en/crefopay-configuration
---

To integrate CrefoPay into your project, first you need to install and configure the CrefoPay module. This topic describes how to do that.

## Installation
To install the CrefoPay module, run:
```
composer require spryker-eco/crefo-pay
```

## Configuration
### General Configuration
You can find all necessary configurations in `vendor/spryker-eco/crefo-pay/config/config.dist.php`.

The table below describes all general configuration keys and their values.
All necessary configurations can be found in `vendor/spryker-eco/crefo-pay/config/config.dist.php`.

|Configuration Key	 |Type  |  Description|
| --- | --- | --- |
| `$config [CrefoPayConstants::MERCHANT_ID]`| int | Merchant ID assigned by CrefoPay. |
|` $config [CrefoPayConstants::STORE_ID]` |string  |Store ID of the merchant assigned by CrefoPay as a merchant can have more than one store.|
| `$config [CrefoPayConstants::REFUND_DESCRIPTION]` | string | Description to be shown to the end user on the refund.|
| `$config [CrefoPayConstants::SECURE_FIELDS_API_ENDPOINT] `| string | Secure fields API endpoint.|
|`$config [CrefoPayConstants::IS_BUSINESS_TO_BUSINESS] `|bool  | Set true in case of b2b model. |
| `$config [CrefoPayConstants::CAPTURE_EXPENSES_SEPARATELY] `|bool  | If set true, allows capturing expenses in different transactions. |
| `$config [CrefoPayConstants::REFUND_EXPENSES_WITH_LAST_ITEM]`|bool|If set true, allows refunding expenses when the last item is refunded. |
|` $config [CrefoPayConstants::SECURE_FIELDS_PLACEHOLDERS] ` | array  | Placeholders for CC payment method fields (account name, card number, cvv).  |
| `$config [CrefoPayApiConstants::CREATE_TRANSACTION_API_ENDPOINT]`  | string  | Create Transaction API endpoint.  |
| `$config [CrefoPayApiConstants::RESERVE_API_ENDPOINT] ` | string  |  Reserve API endpoint. |
| `$config [CrefoPayApiConstants::CAPTURE_API_ENDPOINT]`  | string  |  Capture API endpoint. |
| `$config [CrefoPayApiConstants::CANCEL_API_ENDPOINT]`  | string  | Cancel API endpoint.  |
|`$config [CrefoPayApiConstants::REFUND_API_ENDPOINT]`  | string  | Refund API endpoint.  |
| `$config [CrefoPayApiConstants::FINISH_API_ENDPOINT]`  | string  | Finish API endpoint.  |
| `$config [CrefoPayApiConstants::PRIVATE_KEY] ` | string  | Integration private key. Provided by CrefoPay.  |
| `$config [CrefoPayApiConstants::PUBLIC_KEY]`  | string  | Integration public key. Provided by CrefoPay.  |
### Specific Configuration
Add necessary payment methods to State Machine (OMS) configuration in the following file:
<details open>
<summary>inconfig_default.php</summary>

```php
$config[OmsConstants::PROCESS_LOCATION] = [
    ...
    APPLICATION_ROOT_DIR . '/vendor/spryker-eco/crefo-pay/config/Zed/Oms',
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'CrefoPayBill01',
    'CrefoPayCashOnDelivery01',
    'CrefoPayDirectDebit01',
    'CrefoPayPayPal01',
    'CrefoPayPrepaid01',
    'CrefoPaySofort01',
    'CrefoPayCreditCard01',
    'CrefoPayCreditCard3D01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_BILL => 'CrefoPayBill01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_CASH_ON_DELIVERY => 'CrefoPayCashOnDelivery01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_DIRECT_DEBIT => 'CrefoPayDirectDebit01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_PAY_PAL => 'CrefoPayPayPal01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_PREPAID => 'CrefoPayPrepaid01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_SOFORT => 'CrefoPaySofort01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_CREDIT_CARD => 'CrefoPayCreditCard01',
    CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_CREDIT_CARD_3D => 'CrefoPayCreditCard3D01',
];
```
<br>
</details>

See [CrefoPay - Provided Payment Methods](https://docs.demo-spryker.com/v4/docs/crefopay-provided-payment-methods) for more information on the payment methods provided by CrefoPay.

## What's next?
Once you are done with the installation and configuration of the CrefoPay module, [integrate CrefoPay into your project](/docs/scos/dev/technology-partners/202001.0/payment-partners/crefopay/crefopay-integr).
