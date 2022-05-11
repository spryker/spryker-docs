---
title: PayOne - Facade
description: This article includes facade methods provided by PayOne.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-facade
originalArticleId: 51e2f043-2b63-4984-9b06-06f312882fb3
redirect_from:
  - /2021080/docs/payone-facade
  - /2021080/docs/en/payone-facade
  - /docs/payone-facade
  - /docs/en/payone-facade
---

|FACEDE METHOD |PARAMETER | RETURN |DESCRIPTION |
| --- | --- | --- | --- |
| `saveOrder` (deprecated) | `QuoteTransfer`, `CheckoutResponseTransfer` | void | Saves the PayOne payment method data according to quote and checkout response transfer data. |
| `saveOrderPayment` | `QuoteTransfer`, `SaveOrderTransfer` | void | Saves the order payment method data according to quote and order data. |
| `authorizePayment` | `OrderTransfer` | `AuthorizationResponseContainer` | Performs the payment authorization request to PayOne API. |
| `preAuthorizePayment` | Order ID | `AuthorizationResponseContainer` | Performs payment the pre-authorization request to PayOne API. |
| `capturePayment` | `PayOneCaptureTransfer` | `CaptureResponseContainer` | Performs payment capture request to PayOne API. |
| `debitPayment` | Order ID | `DebitResponseContainer` | Performs the debit payment request to PayOne API. |
| `refundPayment` | `PayOneRefundTransfer` | `RefundResponseContainer` | Performs the refund payment request to PayOne API. |
| `creditCardCheck` | `PayOneCreditCardTransfer` | `CreditCardCheckResponseContainer` | Performs the creditcardcheck request to PayOne API (card number validation, expiration date check, etc). |
| `bankAccountCheck` | `PayOneBankAccountCheckTransfer` | `BankAccountCheckResponseContainer` | Performs the bankaccountcheck request to PayOne API. |
| `manageMandate` | `PayOneManageMandateTransfer` | `ManageMandateResponseContainer` | Performs the managemandate request to PayOne API (used to create SEPA mandate for Direct Debit payment). |
| `getFile` | `PayOneGetFileTransfer` | `GetFileResponseContainer` | Performs the getfile request to PayOne API (to download an existing SEPA mandate in PDF format). |
| `getInvoice` | `PayOneGetInvoiceTransfer` | `GetInvoiceResponseContainer` | Performs the getinvoice request to PayOne API (to download invoice in PDF format). |
| `processTransactionStatusUpdate` | `PayOneTransactionStatusUpdateTransfer` | `TransactionStatusResponse` | Saves transaction status update received from PayOne. |
| `isAuthorizationApproved` | `OrderTransfer` | bool | Checks if the authorization request to PayOne API received the "Approved" status in response. |
| `isAuthorizationRedirect` | `OrderTransfer` | bool | Checks if the authorization request to PayOne API received "Redirect" status in response. |
| `isAuthorizationError` | `OrderTransfer` | bool | Checks if the authorization request to PayOne API received the "Error" status in response. |
| `isPreauthorizationApproved` | `OrderTransfer` | bool | Checks if the pre-authorization request to PayOne API received the "Approved" status in response. |
| `isPreauthorizationRedirect` | `OrderTransfer` | bool | Checks if the pre-authorization request to PayOne API received "Redirect" status in response. |
| `isPreAuthorizationError` | `OrderTransfer` | bool | Checks if pre-authorization request to PayOne API received the "Error" status in response. |
| `isCaptureApproved` | `OrderTransfer` | bool | Checks if capture request to PayOne API received the "Approved" status in response. |
| `isCaptureError` | `OrderTransfer` | bool | Checks if capture request to PayOne API received the "Error" status in response. |
| `isRefundApproved` | `OrderTransfer` | bool | Checks if refund request to PayOne API received the "Approved" status in response. |
| `isRefundError` | `OrderTransfer` | bool | Checks if refund request to PayOne API received the "Error" status in response. |
| `isRefundPossible` | `OrderTransfer` | bool | Checks if payment process for certain order supports refund. |
| `isPaymentDataRequired` | `OrderTransfer` | bool | Checks if payment process for certain order requires bank account details. |
| `isPaymentNotificationAvailable` | Order ID, Order Item ID | bool | Checks if there are unprocessed transaction status updates from PayOne for a certain order. |
| `isPaymentPaid` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the "Paid" status and balance is zero or negative for a certain order. |
| `isPaymentOverpaid` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the "Paid" status, and the balance is negative for a certain order. |
| `isPaymentUnderpaid` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the "Underpaid" status for a certain order. |
| `isPaymentRefund` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the "Refund" status for a certain order. |
| `isPaymentAppointed` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the "Appointed" status for a certain order. |
| `isPaymentOther` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the status different from "Paid", "Underpaid" or "Appointed" for a certain order. |
| `isPaymentCapture` | Order ID, Order Item ID | bool | Checks if there is an unprocessed transaction status update from PayOne with the "Capture" status for a certain order. |
| `postSaveHook` (deprecated) | `QuoteTransfer`, `CheckoutResponseTransfer` | `CheckoutResponseTransfer` | Handles redirects and errors after an order is placed. |
| `orderPostSave` | `QuoteTransfer`, `CheckoutResponseTransfer` | `CheckoutResponseTransfer` | Handles redirects and errors after an order has been placed. Depending on the payment method, executes the authorization or pre-authorization API call. Updates `CheckoutResponseTransfer` with errors and redirects URL according to the API response. |
| `getPaymentLogs` | `ObjectCollection` | array of `PayOnePaymentLogTransfer` | Gets payment logs (both API and transaction status) for specific orders in chronological order. |
| `getPaymentDetail` | Order ID | `PaymentDetailTransfer` | Gets payment details for a specific order. |
| `updatePaymentDetail` | `PaymentDetailTransfer`, Order ID | void | Updates payment details for a specific order. |
| install | `MessengerInterface` | void | Installs module translations to project glossary. |
| `startPayPalExpressCheckout` | `PayOneStartPayPalExpressCheckoutRequestTransfer` | `PayOnePayPalExpressCheckoutGenericPaymentResponseTransfer` | Sends request to PayOne to start express checkout and get the work order ID which is used for further operations. |
| `getPayPalExpressCheckoutDetails` | `QuoteTransfer` | `PayOnePayPalExpressCheckoutGenericPaymentResponseTransfer` | Returns customer specific information retrieved from PayPal through PayOne (for example, email and shipping info). |
| `executeCheckoutPostSaveHook` (deprecated) | `QuoteTransfer` `CheckoutResponseTransfer` | `CheckoutResponseTransfer` | Depending on the payment method, executes the authorization or pre-authorization API call. Updates `CheckoutResponseTransfer` with errors and redirects URL according to the API response. |
