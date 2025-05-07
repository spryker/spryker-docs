---
title: Payolution - Performing Requests
description: This article includes the state machine commands and conditions provided by Payolution.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payolution-requests
originalArticleId: d33f6bca-5f93-4761-ba90-2aeb9a5baa56
redirect_from:
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payolution/payolution-performing-requests.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/payolution/payolution-performing-requests.html
related:
  - title: Integrating the invoice paymnet method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html
  - title: Payolution request flow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-request-flow.html
  - title: Integrating the installment payment method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
  - title: Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution.html
  - title: Installing and configuring Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/install-and-configure-payolution.html
---

To perform the needed requests, you can easily use the implemented state machine commands and conditions. This article gives a summary of them. You can also use the facade methods directly, which, however, are invoked by the state machine.

## Payolution State Machine Commands

**PreAuthorize**

* Send order and customer data to Payolution
* Risk check performed by Payolution
* Response:
  * Success: Risk check passed
  * Declined: Request format error or risk check failed
* Plugin: `PreAuthorizePlugin`

**ReAuthorize**

* Send updated order data–for example, a new price
* New risk check (taking into account the previous pre-authorization call)
* Full and partial reauthorization possible.
* Response:
  * Success: Risk check passed and update accepted
  * Declined: Request format error, update not accepted, because–for example, price too high, or risk check failed
* Plugin: `ReAuthorizePlugin`

**Revert**

* Revert a previous pre-authorization call
* Always reverts the complete pre-authorization
* Full and partial revert possible.
* Plugin: `RevertPlugin`

**Capture**

* Capture of previous (p)re-authorization call
* Full and partial capture possible. Captured amount cannot exceed the authorized amount.
* Response:
  * Success: Previous (p)re-authorization still valid and accepted
  * Declined: Previous (p)re- authorization expired, request format error, or internal error
* Plugin: `CapturePlugin`

**Refund**

* Refund previously captured amount
* Full and partial refunds possible
* Response:
  * Success: Refund possible and accepted
  * Declined: Previous capture to far in the past, request format error, or internal
* Plugin: `RefundPlugin`

## Payolution State Machine Conditions

| NAME| DESCRIPTION | PLUGIN |
| --- | --- | --- |
| `IsPreAuthorizationApproved` | Checks transaction status log for successful pre-authorization response | `IsPreAuthorizationApprovedPlugin` |
| `IsReAuthorizationApproved` | Checks transaction status log for successful re-authorization response | `IsReAuthorizationApprovedPlugin` |
| `IsReversalApproved` | Checks transaction status log for successful reversal response | `IsReversalApprovedPlugin` |
| `IsCaptureApproved` | Checks transaction status log for successful capture response | `IsCaptureApprovedPlungin` |
| `IsRefundApproved` | Checks transaction status log for successful refund response | `IsRefundApprovedPlugin` |

## Payolution Facade

| FACADE METHOD | PARAMETER | RETURN | DESCRIPTION |
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

The Payolution core module uses the following class and flow and structure:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-core-bundle-structure.png)
