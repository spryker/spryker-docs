---
title: Installing and configuring CrefoPay
description: This article provides instructions on the installation and configuration of the CrefoPay module for the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-configuration
originalArticleId: a45ce001-36a2-42a5-b9b8-7258b4b0af97
redirect_from:
  - /2021080/docs/crefopay-configuration
  - /2021080/docs/en/crefopay-configuration
  - /docs/crefopay-configuration
  - /docs/en/crefopay-configuration
  - /docs/scos/user/technology-partners/201907.0/payment-partners/crefopay/installing-and-configuring-crefopay.html
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/installing-and-configuring-crefopay.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/installing-and-configuring-crefopay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/install-and-configure-crefopay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/installing-and-configuring-crefopay.html
related:
  - title: Integrating CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/integrate-crefopay.html
  - title: CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay.html
  - title: CrefoPay payment methods
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html
  - title: CrefoPay capture and refund Processes
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-capture-and-refund-processes.html
  - title: CrefoPay—Enabling B2B payments
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-enable-b2b-payments.html
  - title: CrefoPay callbacks
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-callbacks.html
  - title: CrefoPay notifications
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-notifications.html
---

This document describes how to install and configure CrefoPay.


## Installation

To install the CrefoPay module, run:

```bash
composer require spryker-eco/crefo-pay
```

## General Configuration

The table below describes all general configuration keys and their values.
All necessary configurations can be found in `vendor/spryker-eco/crefo-pay/config/config.dist.php`.

|CONFIGURATION KEY | TYPE  |  DESCRIPTION|
| --- | --- | --- |
| `$config [CrefoPayConstants::MERCHANT_ID]`| int | Merchant ID assigned by CrefoPay. |
|`$config [CrefoPayConstants::STORE_ID]` |string  |Store ID of the merchant assigned by CrefoPay as a merchant can have more than one store.|
| `$config [CrefoPayConstants::REFUND_DESCRIPTION]` | string | Description to be shown to the end user on the refund.|
| `$config [CrefoPayConstants::SECURE_FIELDS_API_ENDPOINT]`| string | Secure fields API endpoint.|
|`$config [CrefoPayConstants::IS_BUSINESS_TO_BUSINESS]`|bool  | Set true in case of b2b model. |
| `$config [CrefoPayConstants::CAPTURE_EXPENSES_SEPARATELY]`|bool  | If set true, allows capturing expenses in different transactions. |
| `$config [CrefoPayConstants::REFUND_EXPENSES_WITH_LAST_ITEM]`|bool|If set true, allows refunding expenses when the last item is refunded. |
|` $config [CrefoPayConstants::SECURE_FIELDS_PLACEHOLDERS] ` | array  | Placeholders for CC payment method fields (account name, card number, cvv).  |
| `$config [CrefoPayApiConstants::CREATE_TRANSACTION_API_ENDPOINT]`  | string  | Create Transaction API endpoint.  |
| `$config [CrefoPayApiConstants::RESERVE_API_ENDPOINT]` | string  |  Reserve API endpoint. |
| `$config [CrefoPayApiConstants::CAPTURE_API_ENDPOINT]`  | string  |  Capture API endpoint. |
| `$config [CrefoPayApiConstants::CANCEL_API_ENDPOINT]`  | string  | Cancel API endpoint.  |
|`$config [CrefoPayApiConstants::REFUND_API_ENDPOINT]`  | string  | Refund API endpoint.  |
| `$config [CrefoPayApiConstants::FINISH_API_ENDPOINT]`  | string  | Finish API endpoint.  |
| `$config [CrefoPayApiConstants::PRIVATE_KEY]` | string  | Integration private key. Provided by CrefoPay.  |
| `$config [CrefoPayApiConstants::PUBLIC_KEY]`  | string  | Integration public key. Provided by CrefoPay.  |

### Specific Configuration

Add necessary payment methods to State Machine (OMS) configuration in inconfig_default.php:

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

See [CrefoPay payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html) for more information on the payment methods provided by CrefoPay.

## Next steps

Once you are done with the installation and configuration of the CrefoPay module, [integrate CrefoPay into your project](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/crefopay/integrate-crefopay.html).
