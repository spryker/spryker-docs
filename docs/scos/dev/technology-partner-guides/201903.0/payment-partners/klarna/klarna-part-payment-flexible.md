---
title: Klarna - Part Payment Flexible
description: In this article, you will find part payment flexible scenarios for the payment process with Klarna.
last_updated: Jul 31, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/klarna-part-payment-flexible
originalArticleId: fe4eae1a-f356-4856-93d3-c88c5a7dcf1d
redirect_from:
  - /v2/docs/klarna-part-payment-flexible
  - /v2/docs/en/klarna-part-payment-flexible
related:
  - title: Klarna
    link: docs/scos/user/technology-partners/page.version/payment-partners/klarna.html
  - title: Klarna payment workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-payment-workflow.html
  - title: Klarna - Invoice Pay in 14 days
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-invoice-pay-in-14-days.html
  - title: Klarna state machine commands and conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-state-machine-commands-and-conditions.html
---

## Payment Workflow Scenarios
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_paymentworkflow.png)

## Cancel Workflow Scenarios
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_cancelworkflow.png)

## Refund Workflow Scenarios
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_refundworkflow.png)

## Integrating Klarna Part Payment
The configuration to integrate `Part Payment` using Klarna is:

* `SHARED_SECRET`: shared token
* `EID`: the id of the merchant, received from Klarna.
* `TEST_MODE`: `true ` or `false`.
* `KLARNA_INVOICE_MAIL_TYPE`: type of the user notifications. Possible values are:
  - `KlarnaConstants::KLARNA_INVOICE_TYPE_MAIL`
  - `KlarnaConstants::KLARNA_INVOICE_TYPE_EMAIL`
  - `KlarnaConstants::KLARNA_INVOICE_TYPE_NOMAIL`
* `KLARNA_PCLASS_STORE_TYPE`: pClasses storage type. Could be `json`, `xml`, `sql`. Default type is `json`.
* `KLARNA_PCLASS_STORE_URI`: URI for pClasses storage. Default `APPLICATION_ROOT_DIR . '/data/DE/pclasses.json'`.
* `KLARNA_CHECKOUT_CONFIRMATION_URI`: checkout confirmation URI, default value `$domain . '/checkout/klarna/success`'.
* `KLARNA_CHECKOUT_TERMS_URI`: checkout terms URI, default value `$domain`.
* `KLARNA_CHECKOUT_PUSH_URI`: checkout push URI, default value `$domain . '/checkout/klarna/push'`.
* `KLARNA_CHECKOUT_URI`: checkout URI, default value `$domain`.
* `KLARNA_PDF_URL_PATTERN:` pdf URL pattern, default value `https://online.testdrive.klarna.com/invoices/%s.pdf`.
* `NL_PART_PAYMENT_LIMIT`: maximum allowed limit for part payment in the Netherlands (in cents).

You can copy over configuration to your config file from the Klarna bundles `config.dist.php` file.

## Perform Requests
In order to perform the needed requests, you can easily use the implemented [Klarna State Machine Commands and Conditions](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/klarna/klarna-state-machine-commands-and-conditions.html). The next section gives you a summary of them.
