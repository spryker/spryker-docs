---
title: CrefoPay
template: concept-topic-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/crefopay.html
---

`SprykerEco.CrefoPay` [spryker-eco/crefo-pay](https://github.com/spryker-eco/crefo-pay) module provides integration of Spryker e-commerce system with the CrefoPay technology partner. It requires `SprykerEco.CrefoPayApi` [spryker-eco/crefo-pay-api](https://github.com/spryker-eco/crefo-pay-api) module that provides the REST Client for making API calls to CrefoPay Payment Provider.

The `SprykerEco.CrefoPay` module includes integration with:

* **Checkout process** - payment forms with all necessary fields that are required to make a payment request, save order information and so on.
* **OMS (Order Management System)** - state machines, all necessary commands for making modification requests and conditions for changing order statuses accordingly.

The `SprykerEco.CrefoPay` module provides the following payment methods:

* [Bill](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#bill)
* [Cash on Delivery](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#cash-on-delivery)
* [Credit Card](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#credit-card)
* [Card with 3D secure](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#credit-card-with-3d-secure)
* [Direct Debit](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#direct-debit)
* [PayPal](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#paypal)
* [Cash in advance](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#cash-in-advance)
* [SofortÜberweisung](/docs/pbc/all/payment-service-provider/{{page.version}}/third-party-integrations/crefopay/crefopay-payment-methods.html#sofortberweisung)
