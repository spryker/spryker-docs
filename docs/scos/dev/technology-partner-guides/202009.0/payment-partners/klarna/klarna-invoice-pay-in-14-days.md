---
title: Klarna - Invoice Pay in 14 days
description: In this article, you will find invoice pay scenarios for the payment process with Klarna.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/klarna-invoice-pay-in-14-days
originalArticleId: ce3c1e61-18c2-4503-8233-e1ad215242e4
redirect_from:
  - /v6/docs/klarna-invoice-pay-in-14-days
  - /v6/docs/en/klarna-invoice-pay-in-14-days
related:
  - title: Klarna
    link: docs/scos/user/technology-partners/page.version/payment-partners/klarna.html
  - title: Klarna payment workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-payment-workflow.html
  - title: Klarna - Part Payment Flexible
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-part-payment-flexible.html
  - title: Klarna state machine commands and conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-state-machine-commands-and-conditions.html
---

## Payment Workflow Scenarios
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/invoice_paymentworkflow.png)

## Cancel Workflow Scenarios
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/invoice_cancelworkflow.png)

## Refund Workflow Scenarios
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_refundworkflow.png)

## Integrating Klarna Part Payment
The configuration to integrate Part payment using Klarna is:

`SHARED_SECRET`: shared token.

`EID`: the id of the merchant, received from Klarna.

`TEST_MODE`: `true` or `false`.

`KLARNA_INVOICE_MAIL_TYPE`: type for user notification. Possible values are:

`KlarnaConstants::KLARNA_INVOICE_TYPE_MAIL`

`KlarnaConstants::KLARNA_INVOICE_TYPE_EMAIL`

`KlarnaConstants::KLARNA_INVOICE_TYPE_NOMAIL`

`KLARNA_PCLASS_STORE_TYPE`: pClasses storage type. Could be `json`, `xml`, `sql`. Default type is `json`.

`KLARNA_PCLASS_STORE_URI`: URI for pClasses storage. Default `APPLICATION_ROOT_DIR . '/data/DE/pclasses.json`'.

`KLARNA_CHECKOUT_CONFIRMATION_URI`: checkout confirmation URI, `default value $domain . '/checkout/klarna/success`'.

`KLARNA_CHECKOUT_TERMS_URI`: checkout terms URI, default value `$domain`.

`KLARNA_CHECKOUT_PUSH_URI`: checkout push URI, default value `$domain . '/checkout/klarna/push'`.

`KLARNA_CHECKOUT_UR`I: checkout URI, default value `$domain`.

`KLARNA_PDF_URL_PATTERN`: pdf URL pattern, default value `https://online.testdrive.klarna.com/invoices/%s.pdf`.

You can copy over configuration to your config from the Klarna modules `config.dist.php` file.

## Perform Requests

In order to perform the needed requests, you can easily use the implemented [Klarna State Machine Commands and Conditions](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/klarna/klarna-state-machine-commands-and-conditions.html). The next section gives a summary of them.
