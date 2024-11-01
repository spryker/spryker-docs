---
title: Braintree
description: Braintree provides credit card and PayPal payment methods for Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/braintree
originalArticleId: 940c4c06-b484-4eba-b262-14c9c8ba1a58
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/braintree.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/braintree/braintree.html
related:
  - title: Installing and configuring Braintree
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/install-and-configure-braintree.html
  - title: Integrating Braintree
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/integrate-braintree.html
  - title: Braintree - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/braintree-performing-requests.html
  - title: Braintree - Request workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/braintree-request-workflow.html
---

[ABOUT BRAINTREE](https://www.braintreepayments.com/)

Braintree, a division of PayPal, is a company based in Chicago that specializes in mobile and web payment systems for ecommerce companies. Braintree emphasizes its easy integrations, multiple payment method options (including PayPal and Venmo), simple pricing, security, and support. Braintree provides its customers with a merchant account and a payment gateway, along with various features including recurring billing, credit card storage, support for mobile and international payments, and PCI compliance solutions.

Braintree provides two methods of payment:

* Credit Card
* PayPal

In order to integrate Braintree payments, a Braintree merchant account should be created and configuration data then could be obtained from Braintree.

There are two types of accounts for the integration:

1. test accounts
2. live accounts

Both accounts share the same configuration with different values. Braintree uses the idea of having merchants for handling different requests. Each merchant is defined by a merchant ID which will be given by Braintree.

We use state machines for handling and managing orders and payments. To integrate Braintree payments, a state machine for Braintree should be created.

A basic and fully functional state machine is already built (`BraintreePayPal01` and `BraintreeCreditCard01`). You can use the same state machine or build a new one. In case a new state machine has to be built, it is preferred to contact Braintree and confirm the new state machine design and functionality.

The state machine commands and conditions trigger Braintree facade calls in order to perform the needed requests to Braintree. For simplicity, the Braintree facade uses the same calls for both credit card and PayPal payments and automatically distinguishes between the payment methods from the payment entity.

### PCI Compliance

Because of PCI compliance reasons, credit card data is communicated to the third party through JS and AJAX calls (sensitive information stays browser side).

## Related Developer guides

* [Installing and configuring Braintree](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/braintree/install-and-configure-braintree.html)
* [Integrating Braintree](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/braintree/integrate-braintree.html)
* [Braintree - Request workflow](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/braintree/braintree-request-workflow.html)
* [Braintree - Performing requests](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/braintree/braintree-performing-requests.html)


---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>
