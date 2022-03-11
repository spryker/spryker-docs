---
title: Heidelpay OMS workflow
last_updated: Nov 4, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/heidelpay-oms-workflow
originalArticleId: b9196cba-b79b-404e-b2f7-426d83e42fdc
redirect_from:
  - /v6/docs/heidelpay-oms-workflow
  - /v6/docs/en/heidelpay-oms-workflow
---

We use state machines for handling and managing orders and payments.
To use Heidelpay, [create a new OMS](/docs/scos/dev/back-end-development/data-manipulation/creating-an-order-management-system-spryker-commerce-os.html) which includes necessary Heildelpay payment methods. You can use the same state machines or build new ones. The state machine commands and conditions trigger Heidelpay facade calls in order to perform the needed requests to Heidelpay API.

Some examples of the basic and fully functional state machines for each payment method were already built: `vendor/spryker-eco/heidelpay/config/Zed/Oms`

* `HeidelpaySofort01.xml`
* `HeidelpayPaypalDebit01.xml`
* `HeidelpayIdeal01.xml`
* `HeidelpaySofort01.xml`
* `HeidelpayCreditCardSecureAuthorize01.xml`
