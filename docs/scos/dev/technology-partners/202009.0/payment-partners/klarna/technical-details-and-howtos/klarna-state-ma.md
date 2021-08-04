---
title: Klarna - State Machine Commands and Conditions
originalLink: https://documentation.spryker.com/v6/docs/klarna-state-machine-commands-and-conditions
redirect_from:
  - /v6/docs/klarna-state-machine-commands-and-conditions
  - /v6/docs/en/klarna-state-machine-commands-and-conditions
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
