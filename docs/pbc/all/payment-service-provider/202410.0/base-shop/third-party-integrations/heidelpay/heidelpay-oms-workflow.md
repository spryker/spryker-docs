---
title: Heidelpay OMS workflow
description: Learn about the Heidelpay OMS workflow and how to create a new Spryker OMS with Heildelpay payment method in your Spryker Project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-oms-workflow
originalArticleId: 604f600e-3f95-4194-90ed-4b2f7e9fac26
redirect_from:
  - /2021080/docs/heidelpay-oms-workflow
  - /2021080/docs/en/heidelpay-oms-workflow
  - /docs/heidelpay-oms-workflow
  - /docs/en/heidelpay-oms-workflow
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/heidelpay-oms-workflow.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/heidelpay/heidelpay-oms-workflow.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/heidelpay/heidelpay-oms-workflow.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/heidelpay/heidelpay-oms-workflow.html
---

We use state machines for handling and managing orders and payments.
To use Heidelpay, [create a new OMS](/docs/dg/dev/backend-development/data-manipulation/set-up-an-order-management-system.html) which includes necessary Heildelpay payment methods. You can use the same state machines or build new ones. The state machine commands and conditions trigger Heidelpay facade calls in order to perform the needed requests to Heidelpay API.

Some examples of the basic and fully functional state machines for each payment method were already built: `vendor/spryker-eco/heidelpay/config/Zed/Oms`

* `HeidelpaySofort01.xml`
* `HeidelpayPaypalDebit01.xml`
* `HeidelpayIdeal01.xml`
* `HeidelpaySofort01.xml`
* `HeidelpayCreditCardSecureAuthorize01.xml`
