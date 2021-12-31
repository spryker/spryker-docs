---
title: RatePay state machine commands and conditions
description: This article includes the state machine commands and conditions provided by Ratepay.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-state-machine
originalArticleId: 25cb68aa-9d2c-42d2-8ae3-bd8f3ea572f3
redirect_from:
  - /2021080/docs/ratepay-state-machine
  - /2021080/docs/en/ratepay-state-machine
  - /docs/ratepay-state-machine
  - /docs/en/ratepay-state-machine
  - /docs/scos/dev/technology-partner-guides/202108.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
related:
  - title: RatePay - Facade
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay - Prepayment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Invoice
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay - Installment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Direct Debit
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
---



## ConfirmDelivery command

* Send delivery confirmation data to RatePAY
* Response:
  - Success: Delivery confirmed
  - Declined: Request format error or delivery confirmation error
* Plugin: `ConfirmDeliveryPlugin`

## ConfirmPayment command

* Send payment confirmation data to RatePAY
* Response:
  - Success: Payment confirmed
  - Declined: Request format error or payment confirmation error
* Plugin: `ConfirmPaymentPlugin`

## CancelPayment command

* Send order items cancellation data to RatePAY
* Response:
  - Success: Order items canceled successfully
  - Declined: Request format error or order items cancellation error
* Plugin: `CancelPaymentPlugin`

## RefundPayment command

* Send refund order items data to RatePAY
* Response:
  - Success: Order items refunded successfully
  - Declined: Request format error or order items refund error
* Plugin: `RefundPaymentPlugin`

## Conditions

| NAME| DESCRIPTION | PLUGIN |
| --- | --- | --- |
| `IsRefunded` | Checks transaction status for successful order items refund response | `IsRefundedPlugin` |
| `IsPaymentConfirmed` | Checks transaction status for successful order items payment response | `IsPaymentConfirmedPlugin` |
| `IsDeliveryConfirmed` | Checks transaction status for successful order items delivery response | `IsDeliveryConfirmedPlugin` |
| `IsCancellationConfirmed` | Checks transaction status for successful order items cancellation response | `IsCancellationConfirmedPlugin` |
