---
title: CrefoPay
template: concept-topic-template
---

`SprykerEco.CrefoPay` [spryker-eco/crefo-pay](https://github.com/spryker-eco/crefo-pay) module provides integration of Spryker e-commerce system with the CrefoPay technology partner. It requires `SprykerEco.CrefoPayApi` [spryker-eco/crefo-pay-api](https://github.com/spryker-eco/crefo-pay-api) module that provides the REST Client for making API calls to CrefoPay Payment Provider.

The `SprykerEco.CrefoPay` module includes integration with:

* **Checkout process** - payment forms with all necessary fields that are required to make a payment request, save order information and so on.
* **OMS (Order Management System)** - state machines, all necessary commands for making modification requests and conditions for changing order statuses accordingly.

The `SprykerEco.CrefoPay` module provides the following payment methods:

* [Bill](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [Cash on Delivery](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [Credit Card](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [Card with 3D secure](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [Direct Debit](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [PayPal](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [Cash in advance](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
* [SofortÜberweisung](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/crefopay/crefopay-payment-methods.html)
