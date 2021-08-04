---
title: PayOne - State Machine Commands, Conditions and Events
originalLink: https://documentation.spryker.com/v1/docs/payone-state-machine-cmd-cond-evnt
redirect_from:
  - /v1/docs/payone-state-machine-cmd-cond-evnt
  - /v1/docs/en/payone-state-machine-cmd-cond-evnt
---

| Operation | Type | Description |
| --- | --- | --- |
| `Payone/PreAuthorize` | command | PreAuthorize allows to block money without capturing it directly. Possible responses are Approved, Redirect (in case of 3d secure for Credit Card, also for all Online Transfer and EWallet payments) and Error. Payment data is verified and stored. The amount is reserved on the customers account. |
| `Payone/PreAuthorizationIsApprovedPlugin` | condition | Checks if the preauthorization was successful |
| `Payone/PreAuthorizationIsErrorPlugin` | condition | Checks if the preauthorization had an error |
| `Payone/PreAuthorizationIsRedirectPlugin` | condition | Checks if the preauthorization send a redirect |
| cancel redirect | event | This event is issued if cancel redirect url was engaged. This could be used in project state machine to re-activate voucher codes or perform similiar actions |
| `Payone/PaymentIsAppointed` | condition | Checks if pre-authorization succeeded |
| `RedirectResponseAppointed` | event | A RedirectResponse event is triggered if a redirect related response message was sent |
| `Payone/Capture` | command | Capture allows to capture money that has been blocked with a preauthorize command. The card is now charged using the reserved amount. |
| `Payone/CaptureWithSettlement` | command | Used for PrePayment method. |
| `Payone/CaptureIsApprovedPlugin` | condition | Checks if the capture was approved |
| `Payone/PaymentIsCapture` | condition | Checks if capture succeeded |
| `Payone/Authorize` | command | Payment data is verified. Account is charged immediately. Possible responses are Approved, Redirect (in case of 3d secure for Credit Card, also for all Online Transfer and EWallet payments) and Error. Authorize allows to capture money immediately. |
| `Payone/AuthorizationIsApprovedPlugin` | condition | Checks if the authorization was successful |
| `Payone/AuthorizationIsErrorPlugin` | condition | Checks if the authorization had an error |
| `Payone/AuthorizationIsRedirectPlugin` | condition | Checks if the authorization send a redirect |
| Payone/PaymentIsPaid | condition | Checks if payment was paid in full |
| `Payone/PaymentIsUnderPaid` | condition | Checks if payment was made but with balance that is not settled |
| `Payone/PaymentIsOverpaid` | condition | Checks if total paid amount exceeds initial one |
| `PaymentNotificationReceived` | event | A `PaymentNotificationReceived` event is triggered successful processing of incoming payment status update notification |
| `Payone/Refund` | command | Refund allows to return money (in case of goods returns e.g.) |
| `Payone/RefundIsApprovedPlugin` | condition | `RefundIsApprovedPlugin` checks if the refund was approved |
| `Payone/RefundIsPossiblePlugin` | condition | `RefundIsPossiblePlugin` checks if IBAN/BIC is available in payment details |
| `Payone/PaymentIsRefund` | condition | Checks if refund suceeded |
| `Payone/Cancel` | command | Cancels pre-authorized amount. Could be called instead of Capture on order cancellation. |

