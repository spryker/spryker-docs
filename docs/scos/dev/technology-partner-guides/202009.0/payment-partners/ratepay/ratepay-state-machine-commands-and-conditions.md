---
title: RatePay - State Machine Commands and Conditions
description: This article includes the state machine commands and conditions provided by Ratepay.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/ratepay-state-machine
originalArticleId: 0ec44222-0470-4ba7-9981-d721be5c09b9
redirect_from:
  - /v6/docs/ratepay-state-machine
  - /v6/docs/en/ratepay-state-machine
  - /docs/scos/user/technology-partners/202009.0/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html
related:
  - title: RatePay facade methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-invoice-payment-method-for-ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-workflow.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-direct-debit-payment-method-for-ratepay.html
---

## Commands

### ConfirmDelivery

* Send delivery confirmation data to RatePAY
* Response:
  - Success: Delivery confirmed
  - Declined: Request format error or delivery confirmation error
* Plugin: `ConfirmDeliveryPlugin`

### ConfirmPayment

* Send payment confirmation data to RatePAY
* Response:
  - Success: Payment confirmed
  - Declined: Request format error or payment confirmation error
* Plugin: `ConfirmPaymentPlugin`

### CancelPayment

* Send order items cancellation data to RatePAY
* Response:
  - Success: Order items canceled successfully
  - Declined: Request format error or order items cancellation error
* Plugin: `CancelPaymentPlugin`

### RefundPayment

* Send refund order items data to RatePAY
* Response:
  - Success: Order items refunded successfully
  - Declined: Request format error or order items refund error
* Plugin: `RefundPaymentPlugin`

## Conditions

| Name | Description | Plugin |
| --- | --- | --- |
| `IsRefunded` | Checks transaction status for successful order items refund response | `IsRefundedPlugin` |
| `IsPaymentConfirmed` | Checks transaction status for successful order items payment response | `IsPaymentConfirmedPlugin` |
| `IsDeliveryConfirmed` | Checks transaction status for successful order items delivery response | `IsDeliveryConfirmedPlugin` |
| `IsCancellationConfirmed` | Checks transaction status for successful order items cancellation response | `IsCancellationConfirmedPlugin` |
