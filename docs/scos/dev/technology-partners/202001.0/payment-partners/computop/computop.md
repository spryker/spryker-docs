---
title: Computop
originalLink: https://documentation.spryker.com/v4/docs/computop
redirect_from:
  - /v4/docs/computop
  - /v4/docs/en/computop
---

## Partner Information

 [ABOUT COMPUTOP](https://www.computop.com/de/) 
Computop is a leading international Payment Service Provider that enables merchants and white label customers to process global multichannel payments. Computop’s state of the art and wholly owned payment platform Computop Paygate offers seamless solutions for mobile, online and in store payment transactions. All transactions processed by Computop Paygate are secure as our platform is PCI certified.

Computop offers a global payment management solution that is connected to over 350 payment methods and acquirer connections worldwide, customizable fraud prevention, tokenization and other value added services like currency conversion and debt management that result in secure transaction processing and higher conversion rates.

Paygate is scalable and favoured by merchants in the travel, gaming, gambling, digital, hospitality, and the retail industry. Prebuilt payment and fraud management integration cartridges or modules are available for leading ERP and shop system solutions including demandware, hybris, intershop, Magento, and IBM Websphere.

Founded in 1997, Computop is a global player for the 21st century. Headquartered in Bamberg, Germany, the company has sales operations in New York, London, and Shanghai. Computop is trusted by the largest global brands worldwide including Samsung, The Otto Group, C&A, Fossil, Metro Cash & Carry, and Swarovski.

## General Information
We integrate with a wide range of payment methods that can be configured according to your needs and convenience. Payment method flows are configured using state machines.

The `SprykerEco.Computop` `spryker-eco/computop` bundle provides integration Spryker e-commerce system with Computop industry partner. It requires the `SprykerEco.ComputopApi` `spryker-eco/computop-api` bundle that provides the REST Client for making API calls to the Computop Payment Provider.

The `SprykerEco.Computop` module includes integration with:

* Checkout process - payment forms with all necessary fields that are required to make payment request, save order information and so on.
* OMS (Order Management System) - state machines, all necessary commands for making modification requests and conditions for changing orders status accordingly.

The `SprykerEco.Computop` module provides the following payment methods:

* [Credit Card](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-credit)
* [Direct Debit](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-direct)
* [EasyCredit](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-easy-c)
* [iDeal](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-ideal)
* [Paydirekt](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-paydir)
* [PayNow](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-paynow)
* [PayPal](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-paypal)
* [SofortÜberweisung](/docs/scos/dev/technology-partners/202001.0/payment-partners/computop/computop-sofort)

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

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>
