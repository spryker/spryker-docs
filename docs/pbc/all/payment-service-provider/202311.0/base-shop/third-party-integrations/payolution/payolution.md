---
title: Payolution
description: Provide invoice, installment, monthly invoice, and direct debit solutions by integrating Payolution into the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payolution
originalArticleId: 4d4f59ce-7e96-42af-a61d-c23df33d1205
redirect_from:
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payolution/payolution.html
related:
  - title: Installing and configuring Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/install-and-configure-payolution.html
  - title: Integrating Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-payolution.html
  - title: Payolution - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-performing-requests.html
  - title: Payolution request flow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-request-flow.html
  - title: Integrating the installment payment method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
  - title: Integrating the invoice paymnet method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html
---

## Partner Information

[ABOUT PAYOLUTION](https://www.payolution.com/)

Payolution offers white label solutions for the payment options — invoice, instalment, monthly invoice, and direct debit — available in Austria, Germany, Switzerland, the Netherlands, and the United Kingdom. As a mid-sized merchant or a global brand, you will benefit from Payolution's expertise in a seamless omni-channel integration of these payment options. Payolution offers a 100% payment guarantee — they pay you regardless when or if your customer pays you. Payolution's white label approach focuses on you as a merchant, your brand, your conversion and a fair customer support.

Payolution provides two methods of payment:
* Invoice
* Installment

In order to integrate Payolution payments, a Payolution merchant account should be created and configuration data then could be obtained from Payolution. There are two types of accounts for the integration: test and live. Both accounts share the same configuration with different values. Payolution uses the idea of having channels for handling different requests. Each channel is specified by a channel ID which will be given by Payolution.

We use state machines for handling and managing orders and payments. To integrate Payolution payments, a state machine for Payolution should be created. A basic and fully functional state machine is already built (`PayolutionPayment01`). You can use the same state machine or build a new one. In case a new state machine has to be built, it is preferred to contact Payolution and confirm the new state machine design and functionality.

The state machine commands and conditions trigger Payolution facade calls in order to perform the needed requests to Payolution. For simplicity, the Payolution facade uses the same calls for both invoice and installment payments and distinguishes the payment method automatically from the payment entity.

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>
