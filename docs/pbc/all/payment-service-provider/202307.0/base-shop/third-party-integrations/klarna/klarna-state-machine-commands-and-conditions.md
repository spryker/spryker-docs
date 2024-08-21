---
title: Klarna state machine commands and conditions
description: This article includes the state machine commands and conditions provided by Klarna.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/klarna-state-machine-commands-and-conditions
originalArticleId: 38a8ca62-b931-49c9-8764-fbfa47add05b
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202307.0/payment-partners/klarna/klarna-state-machine-commands-and-conditions.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/klarna/klarna-state-machine-commands-and-conditions.html
related:
  - title: Klarna - Invoice Pay in 14 days
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna-invoice-pay-in-14-days.html
  - title: Klarna
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna.html
  - title: Klarna - Part Payment Flexible
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna-part-payment-flexible.html
  - title: Klarna payment workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/klarna/klarna-payment-workflow.html
---

## Commands

**Check**

* Checks order Status
* Update order status
* Plugin: `CheckPlugin`

**Capture**

* Activates the reservation that corresponds to the given reference number
* Response:
  - Success: order activated
  - Declined: capture failed. Need to update order
* Plugin: `CapturePlugin`

**Update**

* Updates a reservation
* Response:
* Success: Reservation updated
* Declined: Some error occurred
* Plugin: `UpdatePlugin`

**Cancel**

* Cancels a reservation
* Plugin: `CancelPlugin`

**Refund**

* Performs a partial refund
* Response:
  - Success: Refund possible and accepted
  - Declined: Some error occurred
* Plugin: `RefundPlugin`

## Conditions

| NAME| DESCRIPTION | PLUGIN |
| --- | --- | --- |
| `IsOrderStatusApproved` | Checks if order payment status is pending accepted | `IsOrderStatusApprovedPlugin` |
| `IfHasCapture` | Checks if the capture response is successful | `IfHasCapturePlugin` |
| `IsOrderDenied` | Checks if order payment status is denied | `IsOrderDeniedPlugin` |

## KlarnaFacade

| FACADE METHOD | PARAMETER | RETURN | description |
| --- | --- | --- | --- |
| `saveOrderPayment` | `QuoteTransfer`, `CheckoutResponseTransfer` | void | Saves the payment for the submitted order |
| `reserveAmount` | `QuoteTransfer` | `KlarnaReserveAmountResponseTransfer` | Reserves the amount of the purchase |
| `updatePayment` | `QuoteTransfer` | `KlarnaReserveAmountResponseTransfer` | Update the reservation matching the given reservation number |
| `capturePayment` | `SpyPaymentKlarna`, `OrderTransfer` | array | Activate the reservation matching the given reservation number |
| `capturePartPayment` | array `$orderItems`, `SpyPaymentKlarna`, `OrderTransfer` | array | Activate the reservation matching the given reservation number |
| `refundPayment` | `SpyPaymentKlarna` | string | Performs a complete refund |
| `refundPartPayment` | array `$orderItems`, `SpyPaymentKlarna` | string | Performs a partial refund |
| `sendInvoiceByMail` | `SpyPaymentKlarna` | string | Sends an activated invoice to the customer via e-mail |
| `sendInvoiceByPost` | `SpyPaymentKlarna` | string | Requests a postal send-out of an activated invoice to a customer by Klarna |
| `getInstallments` | `QuoteTransfer` | `KlarnaInstallmentResponseTransfer` | Get available Part Payments |
| `getPaymentLogs` | `ObjectCollection $orders` | array | Return all payment logs for submitted orders |
| `getKlarnaCheckoutHtml` | `QuoteTransfer` | `KlarnaCheckoutTransfer` | Return checkout values |
| `getKlarnaSuccessHtml` | `KlarnaCheckoutTransfer` | `KlarnaCheckoutTransfer` | Return success values |
| `createCheckoutOrder` | `KlarnaCheckoutTransfer` | bool | Creates checkout order |
| `checkOrderStatus` | `SpyPaymentKlarna` | int | Return order status |
| `cancelOrder` | `SpyPaymentKlarna` | bool | Cancels payment |
| `getKlarnaPaymentById` | `int $salesOrderId` | array | Return order payment data |
| `getInvoicePdfUrl` | `int $salesOrderId` | string | Return pdf URL from config |
| `checkoutService` | `QuoteTransfer` | `KlarnaCheckoutServiceTransfer` | Perform a checkout service request |
| `getAddressUpdater` | `OrderTransfer` | `AddressUpdater` | Return `AddressUpdater` from the factory |
