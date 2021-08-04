---
title: PayOne - Facade
originalLink: https://documentation.spryker.com/v5/docs/payone-facade
redirect_from:
  - /v5/docs/payone-facade
  - /v5/docs/en/payone-facade
---

|Facade Method |Param |Return |Description |
| --- | --- | --- | --- |
| `saveOrder` | `QuoteTransfer`, `CheckoutResponseTransfer` | void | Saves Payone payment method data according to quote and checkout response transfer data. |
| `authorizePayment` | `OrderTransfer` | `AuthorizationResponseContainer` | Performs payment authorization request to Payone API. |
| `preAuthorizePayment` | Order Id | `AuthorizationResponseContainer` | Performs payment pre-authorization request to Payone API. |
| `capturePayment` | `PayoneCaptureTransfer` | `CaptureResponseContainer` | Performs payment capture request to Payone API. |
| `debitPayment` | Order Id | `DebitResponseContainer` | Performs the debit payment request to Payone API. |
| `refundPayment` | `PayoneRefundTransfer` | `RefundResponseContainer` | Performs the refund payment request to Payone API. |
| `creditCardCheck` | `PayoneCreditCardTransfer` | `CreditCardCheckResponseContainer` | Performs creditcardcheck request to Payone API (card number validation, expiration date check, etc). |
| `bankAccountCheck` | `PayoneBankAccountCheckTransfer` | `BankAccountCheckResponseContainer` | Performs bankaccountcheck request to Payone API. |
| `manageMandate` | `PayoneManageMandateTransfer` | `ManageMandateResponseContainer` | Performs managemandate request to Payone API (used to create SEPA mandate for Direct Debit payment). |
| `getFile` | `PayoneGetFileTransfer` | `GetFileResponseContainer` | Performs getfile request to Payone API (to download existing SEPA mandate in PDF format). |
| `getInvoice` | `PayoneGetInvoiceTransfer` | `GetInvoiceResponseContainer` | Performs getinvoice request to Payone API (to download invoice in PDF format). |
| `processTransactionStatusUpdate` | `PayoneTransactionStatusUpdateTransfer` | `TransactionStatusResponse` | Saves transaction status update received from Payone. |
| `isAuthorizationApproved` | `OrderTransfer` | bool | Checks if authorization request to Payone API got "Approved" status in response. |
| `isAuthorizationRedirect` | `OrderTransfer` | bool | Checks if authorization request to Payone API got "Redirect" status in response. |
| `isAuthorizationError` | `OrderTransfer` | bool | Checks if authorization request to Payone API got "Error" status in response. |
| `isPreauthorizationApproved` | `OrderTransfer` | bool | Checks if pre-authorization request to Payone API got "Approved" status in response. |
| `isPreauthorizationRedirect` | `OrderTransfer` | bool | Checks if pre-authorization request to Payone API got "Redirect" status in response. |
| `isPreAuthorizationError` | `OrderTransfer` | bool | Checks if pre-authorization request to Payone API got "Error" status in response. |
| `isCaptureApproved` | `OrderTransfer` | bool | Checks if capture request to Payone API got "Approved" status in response. |
| `isCaptureError` | `OrderTransfer` | bool | Checks if capture request to Payone API got "Error" status in response. |
| `isRefundApproved` | `OrderTransfer` | bool | Checks if refund request to Payone API got "Approved" status in response. |
| `isRefundError` | `OrderTransfer` | bool | Checks if refund request to Payone API got "Error" status in response. |
| `isRefundPossible` | `OrderTransfer` | bool | Checks if payment process for certain order supports refund. |
| `isPaymentDataRequired` | `OrderTransfer` | bool | Checks if payment process for certain order requires bank account details. |
| `isPaymentNotificationAvailable` | Order Id, Order Item Id | bool | Checks if there are unprocessed transaction status updates from Payone for a certain order. |
| `isPaymentPaid` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with "Paid" status and balance is zero or negative for a certain order. |
| `isPaymentOverpaid` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with paid status and balance is negative for a certain order. |
| `isPaymentUnderpaid` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with "Underpaid" status for a certain order. |
| `isPaymentRefund` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with "Refund" status for a certain order. |
| `isPaymentAppointed` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with "Appointed" status for a certain order. |
| `isPaymentOther` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with status different from "Paid", "Underpaid" or "Appointed" for a certain order. |
| `isPaymentCapture` | Order Id, Order Item Id | bool | Checks if there is an unprocessed transaction status update from Payone with "Capture" status for a certain order. |
| `postSaveHook` | `QuoteTransfer`, `CheckoutResponseTransfer` | `CheckoutResponseTransfer` | Handles redirects and errors after order placement. |
| `getPaymentLogs` | `ObjectCollection` | array of `PayonePaymentLogTransfer` | Gets payment logs (both api and transaction status) for specific orders in chronological order. |
| `getPaymentDetail` | Order Id | `PaymentDetailTransfer` | Gets payment details for a specific order. |
| `updatePaymentDetail` | `PaymentDetailTransfer`, Order Id | void | Updates payment details for a specific order. |
| install | `MessengerInterface` | void | Installs module translations to project glossary. |
| `startPaypalExpressCheckout` | `PayoneStartPaypalExpressCheckoutRequestTransfer` | `PayonePaypalExpressCheckoutGenericPaymentResponseTransfer` | Sends request to payone in order to start express checkout and get the workorderid which is used for further operations. |
| `getPaypalExpressCheckoutDetails` | `QuoteTransfer` | `PayonePaypalExpressCheckoutGenericPaymentResponseTransfer` | Returns customer specific information retrieved from paypal through payone (e.g. email and shipping info). |
