---
title: Braintree - Performing Requests
description: This document contains information about the state machine commands and conditions for the Braintree module in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/braintree-performing-requests
originalArticleId: 866b7c18-891a-45db-bc3d-8ac04b89ee80
redirect_from:
  - /2021080/docs/braintree-performing-requests
  - /2021080/docs/en/braintree-performing-requests
  - /docs/braintree-performing-requests
  - /docs/en/braintree-performing-requests
  - /docs/scos/user/technology-partners/202108.0/payment-partners/braintree/braintree-technical-details-and-howtos/braintree-performing-requests.html
related:
  - title: Installing and configuring Braintree
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/installing-and-configuring-braintree.html
  - title: Integrating Braintree
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/integrating-braintree.html
  - title: Braintree - Request workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/braintree-request-workflow.html
---

To perform the necessary requests in the project based on Spryker Commerce OS or SCOS, you can use the implemented state machine commands and conditions. The following section gives a summary of them. You can also use the facade methods directly, which are invoked by the state machine.

## Braintree state machine commands

*Authorize*

* Authorize the payment by validating the given payment data
* Response:
  - Success: Payment details accepted
  - Declined: Request format error, payment details not accepted
* Plugin: `AuthorizePlugin`

*Revert*

* Revert a previous pre-authorization call
* Always reverts the complete pre-check or authorization
* Plugin: `RevertPlugin`

*Capture*

* The capture of the previous (p)reauthorization call response:
  - Success: Previous (p)reauthorization still valid and accepted
  - Declined: Previous (p)reauthorization expired, request format error, or internal error
* Plugin: `CapturePlugin`

*Refund*

* Refund previous captured amount
* Full and partial refunds possible
* Response:
  - Success: Refund possible and accepted
  - Declined: Previous capture to far in the past, request format error, or internal
* Plugin: `RefundPlugin`

## Braintree state machine conditions

| NAME  | DESCRIPTION  | PLUGIN  |
| --- | --- | --- |
|  `IsAuthorizationApproved` | Checks transaction status log for successful authorization response |  `IsAuthorizationApprovedPlugin` |
|  `IsReversalApproved` | Checks transaction status log for successful reversal response |  `IsReversalApprovedPlugin` |
|  `IsCaptureApproved` | Checks transaction status log for successful capture response |  `IsCaptureApprovedPlungin` |
|  `IsRefundApproved` | Checks transaction status log for successful refund response |  `IsRefundApprovedPlugin` |

## Braintree facade

| FACADE METHOD | PARAMETER | RETURN | DESCRIPTION |
| --- | --- | --- | --- |
|  `saveOrderPayment` | `QuoteTransfer``CheckoutResponseTransfer` | void | Saves order payment method data according to quote and checkout response transfer data. |
|  `preCheckPayment` |  `QuoteTransfer` |  `BraintreeTransactionResponseTransfer` | Sends the preauthorize payment request to the Braintree gateway to retrieve transaction data. Checks that form data matches transaction response data. *This method is deprecated*: use `isQuotePaymentValid()` instead. |
|  `isQuotePaymentValid` |  `QuoteTransfer` |  `BraintreeTransactionResponseTransfer` | Checks that quote has required data to perform a Braintree payment transaction. |
|  `authorizePayment` |  `TransactionMetaTransfer` |  `BraintreeTransactionResponseTransfer` | Processes payment confirmation request to Braintree gateway. |
|  `capturePayment` |  `TransactionMetaTransfer` |  `BraintreeTransactionResponseTransfer` | Processes capture payment request to Braintree gateway. |
|  `revertPayment` |  `TransactionMetaTransfer` |  `BraintreeTransactionResponseTransfer` | Processes cancel payment request to Braintree gateway. |
|  `refundPayment` | `SpySalesOrderItem[]``SpySalesOrder` |  `BraintreeTransactionResponseTransfer` | Calculate `RefundTransfer` for given `$salesOrderItems` and `$salesOrderEntity`.Processes refund request to Braintree gateway by calculated `RefundTransfer`. |
|  `isAuthorizationApproved` |  `OrderTransfer` | bool | Checks if pre-authorization API request got success response from Braintree gateway. |
|  `isReversalApproved` |  `OrderTransfer` | bool | Checks if cancel API request got success response from Braintree gateway. |
|  `isCaptureApproved` |  `OrderTransfer` | bool | Checks if capture API request got success response from Braintree gateway. |
|  `isRefundApproved` |  `OrderTransfer` | bool | Checks if refund API request got success response from Braintree gateway. |
|  `postSaveHook` | `OrderTransfer``CheckoutResponseTransfer` |  `CheckoutResponseTransfer` | Executes the post-save hook. *This method is deprecated*: use `executeCheckoutPostSaveHook()` instead. |
|  `executeCheckoutPostSaveHook` | `OrderTransfer``CheckoutResponseTransfer` |  `CheckoutResponseTransfer` | Executes the Braintree payment transaction after saving an order. |
