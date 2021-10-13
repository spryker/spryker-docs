---
title: Heidelpay
description: Heidelpay is an internationally operating payment institution, authorized and regulated by the Federal Financial Supervisory Authority.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/heidelpay
originalArticleId: e600bc5f-1777-4d33-96d1-0c5877aea1d4
redirect_from:
  - /v5/docs/heidelpay
  - /v5/docs/en/heidelpay
related:
  - title: Heidelpay - Integration into SCOS
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/scos-integration/heidelpay-integration-into-scos.html
  - title: Heidelpay - Credit Card Secure
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-credit-card-secure.html
  - title: Heidelpay - Configuration for SCOS
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html
  - title: Heidelpay - Direct Debit
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-direct-debit.html
  - title: Heidelpay - Paypal Authorize
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-paypal-authorize.html
  - title: Heidelpay - Installation
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-installation.html
  - title: Heidelpay - Workflow for Errors
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/technical-details-and-howtos/heidelpay-workflow-for-errors.html
  - title: Heidelpay - Split-payment Marketplace
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-split-payment-marketplace.html
  - title: Heidelpay - Easy Credit
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-easy-credit.html
---

## Partner Information

[ABOUT HEIDELPAY](https://www.heidelpay.de/) 
Heidelpay is an internationally operating payment institution, authorized and regulated by the Federal Financial Supervisory Authority. The Full-Service Payment Provider covers the entire range of services connected to international electronic payment processing. For more than 13 years the company has been successfully realizing projects of online and stationary retailers and currently serves more than 16.000 customers in many different industrial sectors worldwide. 

## Integrating Heidelpay

To integrate Hidelpay in your project, follow these steps:

1. [Install](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-installation.html) Heidelpay
2. [Integrate](https://documentation.spryker.com/v5/docs/en/heidelpay-integration) Heidelpay into your Legacy Demoshop project or [integrate](https://documentation.spryker.com/v5/docs/en/heidelpay-integration-scos)  Heidelpay into your Spryker Commerce OS project
3. Configure selected payment methods:

  - Paypal ([Paypal Authorize](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-paypal-authorize.html),[Payal Debit](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-paypal-debit-workflow.html))
  - [Credit Card](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-credit-card-secure.html)
  - [iDeal](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-ideal.html)
  - [Easy Credit](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-easy-credit.html)
  - [Sofort](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-sofort-online-transfer.html)
  - [Direct Debit](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-direct-debit.html)
  - [Invoice Secured B2C](/docs/scos/dev/technology-partners/202005.0/payment-partners/heidelpay/heidelpay-invoice-secured-b2c.html)

4. Build your own workflow (create a new OMS which will use Hidelpay). See the section below for more information.

## Building a State Machine Workflow to Use Heidelpay Payment Methods

We use state machines for handling and managing orders and payments.
To use Heidelpay, [create a new OMS](http://documentation.spryker.com/v4/docs/oms-state-machine) which includes necessary Heildelpay payment methods. You can use the same state machines or build new ones. The state machine commands and conditions trigger Heidelpay facade calls in order to perform the needed requests to Heidelpay API.

Some examples of the basic and fully functional state machines for each payment method were already built: `vendor/spryker-eco/heidelpay/config/Zed/Oms`

* `HeidelpaySofort01.xml`
* `HeidelpayPaypalDebit01.xml`
* `HeidelpayIdeal01.xml`
* `HeidelpaySofort01.xml`
* `HeidelpayCreditCardSecureAuthorize01.xml`
---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>
