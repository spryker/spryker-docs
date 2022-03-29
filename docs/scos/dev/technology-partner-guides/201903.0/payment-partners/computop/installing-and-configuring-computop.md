---
title: Installing and configuring Computop
last_updated: Nov 4, 2020
template: howto-guide-template
---

The [SprykerEco.Computop](https://github.com/spryker-eco/computop) bundle provides integration of the Computop industry partner with Spryker Commerce OS. It requires the [SprykerEco.ComputopApi](https://github.com/spryker-eco/computop-api) bundle that provides the REST Client for making API calls to the Computop Payment Provider.

The `SprykerEco.Computop` module includes the integrations:
* Checkout process - payment forms with all the necessary fields that are required to make payment requests, save order information and so on.
* OMS (Order Management System) - state machines, all necessary commands for making modification requests and conditions for changing order statuses accordingly.


The `SprykerEco.Computop` module provides the following payment methods:

* [Credit Card](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-credit-card-payment-method-for-computop.html)
* [Direct Debit](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-direct-debit-payment-method-for-computop.html)
* [EasyCredit](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-easy-credit-payment-method-for-computop.html)
* [iDeal](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html)
* [Paydirekt](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paydirekt-payment-method-for-computop.html)
* [PayNow](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paynow-payment-method-for-computop.html)
* [PayPal](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html)
* [SofortÜberweisung](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-sofort-payment-method-for-computop.html)

## Installing Computop


To install the payment provider, run:
```
composer require spryker-eco/computop
```

## Configuration
All the necessary configurations can be found in:
```
vendor/spryker-eco/computop/config/config.dist.php
```

| Configuration Key | Type | Description |
| --- | --- | --- |
| `$config[ComputopApiConstants::MERCHANT_ID]` | string | Computop merchant identifier. |
| `$config[ComputopApiConstants::BLOWFISH_PASSWORD]` | string | Password for blowfish hashing. |
| `$config[ComputopApiConstants::HMAC_PASSWORD]` | string | Password for hmac hashing. |
| `$config[ComputopConstants::PAYDIREKT_SHOP_KEY]` | string | Shop key for Paydirect payment method. |
| `$config[ComputopConstants::IDEAL_ISSUER_ID]`  | string  | Issuer ID for Ideal payment method.  |
| `$config[ComputopConstants::PAY_NOW_INIT_ACTION]`  | string  | Init API call endpoint for PayNow payment method.  |
| `$config[ComputopConstants::CREDIT_CARD_INIT_ACTION]`  |string | Init API call endpoint for Credit Card payment method.  |
| `$config[ComputopConstants::PAYPAL_INIT_ACTION]`  | string  | Init API call endpoint for PayPal payment method.  |
| `$config[ComputopConstants::DIRECT_DEBIT_INIT_ACTION]`  | string  | Init API call endpoint for Direct Debit payment method.  |
| `$config[ComputopConstants::SOFORT_INIT_ACTION]`  | string  | Init API call endpoint for Sofort payment method.  |
| `$config[ComputopConstants::PAYDIREKT_INIT_ACTION]`  |string   | Init API call endpoint for Paydirect payment method.  |
| `$config[ComputopConstants::IDEAL_INIT_ACTION]`  | string  | Init API call endpoint for Ideal payment method.  |
| `$config[ComputopConstants::EASY_CREDIT_INIT_ACTION]`  | string  | Init API call endpoint for Easy Credit payment method.  |
| `$config[ComputopApiConstants::EASY_CREDIT_STATUS_ACTION]`  | string  | Status API call endpoint for Easy Credit payment method.  |
| `$config[ComputopApiConstants::EASY_CREDIT_AUTHORIZE_ACTION]` | string  | Authorize API call endpoint for Easy Credit payment method.  |
| `$config[ComputopApiConstants::AUTHORIZE_ACTION]`  | string  | Authorize API call endpoint.  |
| `$config[ComputopApiConstants::CAPTURE_ACTION]`  | string  | Capture API call endpoint.  |
| `$config[ComputopApiConstants::REVERSE_ACTION]`  | string  | Reserve API call endpoint.  |
| `$config[ComputopApiConstants::INQUIRE_ACTION]`  | string  | Inquire API call endpoint.  |
| `$config[ComputopApiConstants::REFUND_ACTION]`  | string  | Refund API call endpoint.  |
| `$config[ComputopApiConstants::RESPONSE_MAC_REQUIRED]`  | array  | MAC is required for methods (to check MAC on response).  |
| `$config[ComputopConstants::CREDIT_CARD_TEMPLATE_ENABLED]`  | bool  | Is custom template enabled for Credit Card payment method.  |
| `$config[ComputopConstants::CREDIT_CARD_TX_TYPE]`  | string  | TX TYPE for Credit Card payment method (empty string).  |
| `$config[ComputopConstants::PAY_NOW_TX_TYPE]`  | string  | TX TYPE for PayNow payment method (empty string).  |
| `$config[ComputopConstants::PAY_PAL_TX_TYPE]`  | string  |  TX TYPE for PayPal payment method (Auth). |
| `$config[ComputopConstants::PAYMENT_METHODS_WITHOUT_ORDER_CALL]`  | array  | Array of payment methods without order call.  |
| `$config[ComputopApiConstants::PAYMENT_METHODS_CAPTURE_TYPES]`  | array  | Array with mapping payment methods and their capture types (MANUAL or AUTO).  |
| `$config[ComputopConstants::CRIF_ENABLED]`  | bool  | Is CRIF risk check enabled.  |
| `$config[ComputopApiConstants::CRIF_ACTION]`  | string  | CRIF API call endpoint.  |
| `$config[ComputopApiConstants::CRIF_PRODUCT_NAME]`  | string  | `QuickCheckConsumer` or <br> `CreditCheckConsumer` or <br> `QuickCheckBusiness`  or  <br>`CreditCheckBusiness`  or <br>`IdentCheckConsume`.  |
| `$config[ComputopApiConstants::CRIF_LEGAL_FORM]`  | string  | PERSON or COMPANY or UNKNOWN.  |
| `$config[ComputopConstants::CRIF_GREEN_AVAILABLE_PAYMENT_METHODS]`  | array  | List of payment methods available with green response code.  |
| `$config[ComputopConstants::CRIF_YELLOW_AVAILABLE_PAYMENT_METHODS] ` | array  | List of payment methods available with yellow response code.  |
| `$config[ComputopConstants::CRIF_RED_AVAILABLE_PAYMENT_METHODS]`  | array  | List of payment methods available with red response code.  |
