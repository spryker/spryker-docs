---
title: Klarna state machine commands and conditions
description: This article includes the state machine commands and conditions provided by Klarna.
last_updated: Jan 20, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/klarna-state-machine-commands-and-conditions
originalArticleId: 3afbf280-80e0-4a32-92d9-34ab333179ab
redirect_from:
  - /v2/docs/klarna-state-machine-commands-and-conditions
  - /v2/docs/en/klarna-state-machine-commands-and-conditions
related:
  - title: Klarna - Invoice Pay in 14 days
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-invoice-pay-in-14-days.html
  - title: Klarna
    link: docs/scos/user/technology-partners/page.version/payment-partners/klarna.html
  - title: Klarna - Part Payment Flexible
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-part-payment-flexible.html
  - title: Klarna payment workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/klarna/klarna-payment-workflow.html
---

## Commands

<b>Check</b>

* Checks order Status
* Update order status
* Plugin: `CheckPlugin`

<b>Capture</b>

* Activates the reservation that corresponds to the given reference number
* Response:
  - Success: order activated
  - Declined: capture failed. Need to update order
* Plugin: `CapturePlugin`

<b>Update</b>

* Updates a reservation
* Response:
* Success: Reservation updated
* Declined: Some error occurred
* Plugin: `UpdatePlugin`

<b>Cancel</b>

* Cancels a reservation
* Plugin: `CancelPlugin`

<b>Refund</b>

* Performs a partial refund
* Response:
  - Success: Refund possible and accepted
  - Declined: Some error occurred
* Plugin: `RefundPlugin`

## Conditions

| Name | Description | Plugin |
| --- | --- | --- |
| `IsOrderStatusApproved` | Checks if order payment status is pending accepted | `IsOrderStatusApprovedPlugin` |
| `IfHasCapture` | Checks if the capture response is successful | `IfHasCapturePlugin` |
| `IsOrderDenied` | Checks if order payment status is denied | `IsOrderDeniedPlugin` |

## KlarnaFacade

| Facade Method | Param | Return | Description |
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

