---
title: Braintree - Performing Requests
description: This article contains information on the state machine commands and conditions for the Braintree module in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/braintree-performing-requests
originalArticleId: 866b7c18-891a-45db-bc3d-8ac04b89ee80
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/braintree/braintree-performing-requests.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/braintree/braintree-performing-requests.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/braintree/braintree-performing-requests.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/braintree/braintree-performing-requests.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/braintree/braintree-performing-requests.html
related:
  - title: Installing and configuring Braintree
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/install-and-configure-braintree.html
  - title: Integrating Braintree
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/integrate-braintree.html
  - title: Braintree - Request workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/braintree/braintree-request-workflow.html
---

In order to perform the necessary requests in the project based on Spryker Commerce OS or SCOS, you can easily use the implemented state machine commands and conditions. The next section gives a summary of them. You can also use the facade methods directly which, however, are invoked by the state machine.

## Braintree State Machine Commands

**Authorize**

- Authorize the payment by validating the given payment data
- Response:
  - Success: Payment Details accepted
  - Declined: Request format error, payment details not accepted
- Plugin: `AuthorizePlugin`

**Revert**

- Revert a previous pre-authorization call
- Always reverts the complete pre-check or authorization
- Plugin: `RevertPlugin`

**Capture**

- Capture of previous (p)re-authorization call Response:
  - Success: Previous (p)re-authorization still valid and accepted
  - Declined: Previous (p)re- authorization expired, request format error, or internal error
- Plugin: `CapturePlugin`

**Refund**

- Refund previous captured amount
- Full and partial refunds possible
- Response:
  - Success: Refund possible and accepted
  - Declined: Previous capture to far in the past, request format error, or internal
- Plugin: `RefundPlugin`

## Braintree State Machine Conditions

| NAME  | DESCRIPTION  | PLUGIN  |
| --- | --- | --- |
|  `IsAuthorizationApproved` | Checks transaction status log for successful authorization response |  `IsAuthorizationApprovedPlugin` |
|  `IsReversalApproved` | Checks transaction status log for successful reversal response |  `IsReversalApprovedPlugin` |
|  `IsCaptureApproved` | Checks transaction status log for successful capture response |  `IsCaptureApprovedPlungin` |
|  `IsRefundApproved` | Checks transaction status log for successful refund response |  `IsRefundApprovedPlugin` |

## Braintree Facade

| FACADE METHOD | PARAMETER | RETURN | DESCRIPTION |
| --- | --- | --- | --- |
|  `saveOrderPayment` | `QuoteTransfer``CheckoutResponseTransfer` | void | Saves order payment method data according to quote and checkout response transfer data. |
|  `preCheckPayment` |  `QuoteTransfer` |  `BraintreeTransactionResponseTransfer` | Sends pre-authorize payment request to Braintree gateway to retrieve transaction data. Checks that form data matches transaction response data. |
|  `authorizePayment` |  `TransactionMetaTransfer` |  `BraintreeTransactionResponseTransfer` | Processes payment confirmation request to Braintree gateway. |
|  `capturePayment` |  `TransactionMetaTransfer` |  `BraintreeTransactionResponseTransfer` | Processes capture payment request to Braintree gateway. |
|  `revertPayment` |  `TransactionMetaTransfer` |  `BraintreeTransactionResponseTransfer` | Processes cancel payment request to Braintree gateway. |
|  `refundPayment` | `SpySalesOrderItem[]``SpySalesOrder` |  `BraintreeTransactionResponseTransfer` | Calculate `RefundTransfer` for given `$salesOrderItems` and `$salesOrderEntity`.Processes refund request to Braintree gateway by calculated `RefundTransfer`. |
|  `isAuthorizationApproved` |  `OrderTransfer` | bool | Checks if pre-authorization API request got success response from Braintree gateway. |
|  `isReversalApproved` |  `OrderTransfer` | bool | Checks if cancel API request got success response from Braintree gateway. |
|  `isCaptureApproved` |  `OrderTransfer` | bool | Checks if capture API request got success response from Braintree gateway. |
|  `isRefundApproved` |  `OrderTransfer` | bool | Checks if refund API request got success response from Braintree gateway. |
|  `postSaveHook` | `OrderTransfer``CheckoutResponseTransfer` |  `CheckoutResponseTransfer` | Execute post-save hook. |
