---
title: Adyen
description: Integrate Adyen into the Spryker Commerce OS to accept e-commerce, mobile, and point-of-sale payments.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/adyen
originalArticleId: 0d0cbb43-1cdd-47b8-86a1-a963cef8a788
redirect_from:
  - /2021080/docs/adyen
  - /2021080/docs/en/adyen
  - /docs/adyen
  - /docs/en/adyen
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

* [Credit Card](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#credit-card)
* [Direct Debit](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.htmll#direct-debit-sepa-direct-debit)
* [Klarna Invoice](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#klarna-invoice)
* [Prepayment](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#prepayment-bank-transfer-iban)
* [Sofort](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#sofort)
* [PayPal](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#paypal)
* [iDeal](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#ideal)
* [AliPay](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#alipay)
* [WeChatPay](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen/adyen-provided-payment-methods.html#wechatpay)

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>

