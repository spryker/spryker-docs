---
title: RatePay state machine commands and conditions
description: This article includes the state machine commands and conditions provided by Ratepay.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-state-machine
originalArticleId: 25cb68aa-9d2c-42d2-8ae3-bd8f3ea572f3
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html
related:
  - title: RatePay facade methods
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/disable-address-updates-from-the-backend-application-for-ratepay.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-invoice-payment-method-for-ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-payment-workflow.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-direct-debit-payment-method-for-ratepay.html
---



## ConfirmDelivery command

- Send delivery confirmation data to RatePAY
- Response:
  - Success: Delivery confirmed
  - Declined: Request format error or delivery confirmation error
- Plugin: `ConfirmDeliveryPlugin`

## ConfirmPayment command

- Send payment confirmation data to RatePAY
- Response:
  - Success: Payment confirmed
  - Declined: Request format error or payment confirmation error
- Plugin: `ConfirmPaymentPlugin`

## CancelPayment command

- Send order items cancellation data to RatePAY
- Response:
  - Success: Order items canceled successfully
  - Declined: Request format error or order items cancellation error
- Plugin: `CancelPaymentPlugin`

## RefundPayment command

- Send refund order items data to RatePAY
- Response:
  - Success: Order items refunded successfully
  - Declined: Request format error or order items refund error
- Plugin: `RefundPaymentPlugin`

## Conditions

| NAME| DESCRIPTION | PLUGIN |
| --- | --- | --- |
| `IsRefunded` | Checks transaction status for successful order items refund response | `IsRefundedPlugin` |
| `IsPaymentConfirmed` | Checks transaction status for successful order items payment response | `IsPaymentConfirmedPlugin` |
| `IsDeliveryConfirmed` | Checks transaction status for successful order items delivery response | `IsDeliveryConfirmedPlugin` |
| `IsCancellationConfirmed` | Checks transaction status for successful order items cancellation response | `IsCancellationConfirmedPlugin` |
