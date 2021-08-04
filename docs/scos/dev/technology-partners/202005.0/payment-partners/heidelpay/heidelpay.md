---
title: Heidelpay
originalLink: https://documentation.spryker.com/v5/docs/heidelpay
redirect_from:
  - /v5/docs/heidelpay
  - /v5/docs/en/heidelpay
---

## Partner Information

[ABOUT HEIDELPAY](https://www.heidelpay.de/) 
Heidelpay is an internationally operating payment institution, authorized and regulated by the Federal Financial Supervisory Authority. The Full-Service Payment Provider covers the entire range of services connected to international electronic payment processing. For more than 13 years the company has been successfully realizing projects of online and stationary retailers and currently serves more than 16.000 customers in many different industrial sectors worldwide. 

## Integrating Heidelpay

To integrate Hidelpay in your project, follow these steps:

1. [Install](https://documentation.spryker.com/docs/en/heidelpay-installation) Heidelpay
2. [Integrate](https://documentation.spryker.com/docs/en/heidelpay-integration) Heidelpay into your Legacy Demoshop project or [integrate](https://documentation.spryker.com/docs/en/heidelpay-integration-scos)  Heidelpay into your Spryker Commerce OS project
3. Configure selected payment methods:

  - Paypal ([Paypal Authorize](https://documentation.spryker.com/docs/en/heidelpay-authorize),[Payal Debit](https://documentation.spryker.com/docs/en/heidelpay-paypal-debit))
  - [Credit Card](https://documentation.spryker.com/docs/en/heidelpay-credit-card)
  - [iDeal](https://documentation.spryker.com/docs/en/hedelpay-ideal)
  - [Easy Credit](https://documentation.spryker.com/docs/en/heidelpay-easy-credit)
  - [Sofort](https://documentation.spryker.com/docs/en/heidelay-sofort)
  - [Direct Debit](https://documentation.spryker.com/docs/en/heidelpay-direct-debit)
  - [Invoice Secured B2C](https://documentation.spryker.com/docs/en/heidelpay-invoice-secured-b2c)

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
