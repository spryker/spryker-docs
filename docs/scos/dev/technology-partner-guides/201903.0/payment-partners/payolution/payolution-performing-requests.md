---
title: Payolution - Performing Requests
description: This article includes the state machine commands and conditions provided by Payolution.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/payolution-requests
originalArticleId: 6ed0df44-f37c-4cec-8495-15d4063b4e01
redirect_from:
  - /v2/docs/payolution-requests
  - /v2/docs/en/payolution-requests
related:
  - title: Integrating the invoice paymnet method for Payolution
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/payolution/integrating-the-invoice-payment-method-for-payolution.html
  - title: Payolution request flow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/payolution/payolution-request-flow.html
  - title: Integrating the installment payment method for Payolution
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/payolution/integrating-the-installment-payment-method-for-payolution.html
  - title: Payolution
    link: docs/scos/user/technology-partners/page.version/payment-partners/payolution.html
  - title: Installing and configuring Payolution
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/payolution/installing-and-configuring-payolution.html
---

In order to perform the needed requests, you can easily use the implemented state machine commands and conditions. The next section gives a summary of them. You can also use the facade methods directly which, however, are invoked by the state machine.

## Payolution State Machine Commands and Conditions

### Commands

**PreAuthorize**

* Send order and customer data to Payolution
* Risk check performed by Payolution
* Response:
  - Success: Risk check passed
  - Declined: Request format error or risk check failed
* Plugin: `PreAuthorizePlugin`

**ReAuthorize**

* Send updated order data (e.g. new price)
* New risk check (taking into account the previous pre-authorization call)
* Response:
  - Success: Risk check passed and update accepted
  - Declined: Request format error, update not accepted (e.g. price too high), or risk check failed
* Plugin: `ReAuthorizePlugin`

**Revert**

* Revert a previous pre-authorization call
* Always reverts the complete pre-authorization
* Plugin: `RevertPlugin`

**Capture**

* Capture of previous (p)re-authorization call
* Response:
  - Success: Previous (p)re-authorization still valid and accepted
  - Declined: Previous (p)re- authorization expired, request format error, or internal error
* Plugin: `CapturePlugin`

**Refund**

* Refund previous captured amount
* Full and partial refunds possible
* Response:
  - Success: Refund possible and accepted
  - Declined: Previous capture to far in the past, request format error, or internal
* Plugin: `RefundPlugin`

## Conditions

| Name | Description | Plugin |
| --- | --- | --- |
| `IsPreAuthorizationApproved` | Checks transaction status log for successful pre-authorization response | `IsPreAuthorizationApprovedPlugin` |
| `IsReAuthorizationApproved` | Checks transaction status log for successful re-authorization response | `IsReAuthorizationApprovedPlugin` |
| `IsReversalApproved` | Checks transaction status log for successful reversal response | `IsReversalApprovedPlugin` |
| `IsCaptureApproved` | Checks transaction status log for successful capture response | `IsCaptureApprovedPlungin` |
| `IsRefundApproved` | Checks transaction status log for successful refund response | `IsRefundApprovedPlugin` |

## Payolution Facade

| Facade Method | Param | Return | Description |
| --- | --- | --- | --- |
| `saveOrderPayment` | `QuoteTransfer``CheckoutResponseTransfer` | void | Saves the payment for the coming order |
| `preCheckPayment` | `QuoteTransfer` | `PayolutionTransactionResponseTransfer` | Performs the Pre-check request |
| `preAuthorizePayment` | `OrderTransfer`int (Payment entity ID) | `PayolutionTransactionResponseTransfer` | Performs the Pre-authorization request |
| `reAuthorizePayment` | `OrderTransfer`int (Payment entity ID) | `PayolutionTransactionResponseTransfer` | Performs the Re-authorization request |
| `revertPayment` | `OrderTransfer`int (Payment entity ID) | `PayolutionTransactionResponseTransfer` | Performs the Revert request |
| `capturePayment` | `OrderTransfer`int (Payment entity ID) | `PayolutionTransactionResponseTransfer` | Performs the Capture request |
| `refundPayment` | `OrderTransfer`int (Payment entity ID) | `PayolutionTransactionResponseTransfer` | Performs the Refund request |
| `calculateInstallmentPayments` | `OrderTransfer` | `PayolutionCalculationResponseTransfer` | Calculates available installments for the payment |
| `isPreAuthorizationApproved` | `OrderTransfer` | bool | Checks if the Pre-authorization request is approved |
| `isReAuthorizationApproved` | `OrderTransfer` | bool | Checks if the Re-authorization request is approved |
| `isReversalApproved` | `OrderTransfer` | bool | Checks if the Revert request is approved |
| `isCaptureApproved` | `OrderTransfer` | bool | Checks if the Capture request is approved |
| `isRefundApproved` | `OrderTransfer` | bool | Checks if the Refund request is approved |

## Core Module Structure Diagram

The Payolution core module uses the following class and flow and structure.
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-core-bundle-structure.png) 
