---
title: Adyen
description: Integrate Adyen into the Spryker Commerce OS to accept e-commerce, mobile, and point-of-sale payments.
originalLink: https://documentation.spryker.com/v6/docs/adyen
originalArticleId: b6832ce9-25d6-48fb-b7d2-c7ba5d2ea0a4
redirect_from:
  - /v6/docs/adyen
  - /v6/docs/en/adyen
---

## Partner Information

[ABOUT ADYEN](https://www.adyen.com/) 
 Adyen is a global payment company that allows businesses to accept e-commerce, mobile, and point-of-sale payments. Adyen has more than 3,500 customers and is listed on the stock exchange Euronext. Adyen offers merchants online services for accepting electronic payments by payment methods including credit cards, bank based payments such as debit cards, bank transfer, and real-time bank transfers based on online banking. Adyen's online payment platform connects to payment methods across the world. Payment methods include international credit cards, local cash-based methods, such as Boleto in Brazil, and Internet banking methods, such as iDEAL in the Netherlands. The technology platform acts as a payment gateway, payment service provider and offers risk management and local acquiring. At the present time, Adyen only accepts European companies that generate over 50% of their revenue from the European continent.

## General Information

The `spryker-eco/adyen` module provides integration of Spryker e-commerce system with Adyen technology partner. It requires the `SprykerEco.AdyenApi` `spryker-eco/adyen-api` module that provides the REST Client for making API calls to the Adyen Payment Provider.

The `SprykerEco.Adyen` module includes integration with:

* Checkout process - payment forms with all necessary fields that are required to make payment request, save order information and so on.
* OMS (Order Management System) - state machines, all necessary commands for making modification requests and conditions for changing orders status accordingly.

The `SprykerEco.Adyen` module provides the following payment methods:

* [Credit Card](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#credit-card)
* [Direct Debit](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#direct-debit--sepa-direct-debit-)
* [Klarna Invoice](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#klarna-invoice)
* [Prepayment](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#prepayment--bank-transfer-iban-)
* [Sofort](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#sofort)
* [PayPal](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#paypal)
* [iDeal](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#ideal)
* [AliPay](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#alipay)
* [WeChatPay](/docs/scos/dev/technology-partners/202009.0/payment-partners/adyen/adyen-provided-payment-methods.html#wechatpay)

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>

