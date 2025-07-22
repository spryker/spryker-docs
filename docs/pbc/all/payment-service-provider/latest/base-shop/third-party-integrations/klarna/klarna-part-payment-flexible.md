---
title: Klarna - Part Payment Flexible
description: In this article, you will find part payment flexible scenarios for the payment process with Klarna.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/klarna-part-payment-flexible
originalArticleId: 78f05644-f9b7-4f56-9fc2-19f5d8d2a66e
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/klarna/klarna-part-payment-flexible.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/klarna/klarna-part-payment-flexible.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/klarna/klarna-part-payment-flexible.html
related:
  - title: Klarna
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna.html
  - title: Klarna payment workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna-payment-workflow.html
  - title: Klarna - Invoice Pay in 14 days
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna-invoice-pay-in-14-days.html
  - title: Klarna state machine commands and conditions
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna-state-machine-commands-and-conditions.html
---

## Payment Workflow Scenarios

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_paymentworkflow.png)

## Cancel Workflow Scenarios

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_cancelworkflow.png)

## Refund Workflow Scenarios

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Klarna/flexible_refundworkflow.png)

## Integrating Klarna Part Payment

The configuration to integrate `Part Payment` using Klarna is:

- `SHARED_SECRET`: shared token
- `EID`: the id of the merchant, received from Klarna.
- `TEST_MODE`: `true` or `false`.
- `KLARNA_INVOICE_MAIL_TYPE`: type of the user notifications. Possible values are:
  - `KlarnaConstants::KLARNA_INVOICE_TYPE_MAIL`
  - `KlarnaConstants::KLARNA_INVOICE_TYPE_EMAIL`
  - `KlarnaConstants::KLARNA_INVOICE_TYPE_NOMAIL`
- `KLARNA_PCLASS_STORE_TYPE`: pClasses storage type. Could be `json`, `xml`, `sql`. Default type is `json`.
- `KLARNA_PCLASS_STORE_URI`: URI for pClasses storage. Default `APPLICATION_ROOT_DIR . '/data/DE/pclasses.json'`.
- `KLARNA_CHECKOUT_CONFIRMATION_URI`: checkout confirmation URI, default value `$domain . '/checkout/klarna/success`'.
- `KLARNA_CHECKOUT_TERMS_URI`: checkout terms URI, default value `$domain`.
- `KLARNA_CHECKOUT_PUSH_URI`: checkout push URI, default value `$domain . '/checkout/klarna/push'`.
- `KLARNA_CHECKOUT_URI`: checkout URI, default value `$domain`.
- `KLARNA_PDF_URL_PATTERN:` pdf URL pattern, default value `https://online.testdrive.klarna.com/invoices/%s.pdf`.
- `NL_PART_PAYMENT_LIMIT`: maximum allowed limit for part payment in the Netherlands (in cents).

You can copy over configuration to your config file from the Klarna bundles `config.dist.php` file.

## Perform Requests

In order to perform the needed requests, you can easily use the implemented [Klarna State Machine Commands and Conditions](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/klarna/klarna-state-machine-commands-and-conditions.html). The next section gives you a summary of them.
