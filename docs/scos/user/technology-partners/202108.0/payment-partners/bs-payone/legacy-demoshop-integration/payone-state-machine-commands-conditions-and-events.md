---
title: PayOne - State Machine Commands, Conditions and Events
description: This article includes the state machine commands and conditions provided by Payone.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-state-machine-cmd-cond-evnt
originalArticleId: 807aa919-3bf4-44c1-8a0b-60305df0434b
redirect_from:
  - /2021080/docs/payone-state-machine-cmd-cond-evnt
  - /2021080/docs/en/payone-state-machine-cmd-cond-evnt
  - /docs/payone-state-machine-cmd-cond-evnt
  - /docs/en/payone-state-machine-cmd-cond-evnt
related:
  - title: PayOne - Authorization and Preauthorization Capture Flows
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Cash on Delivery
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Direct Debit Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html
  - title: PayOne - Security Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html
---

| OPERATION | TYPE | DESCRIPTION |
| --- | --- | --- |
| `Payone/PreAuthorize` | command | PreAuthorize allows blocking money without capturing it directly. Possible responses are Approved, Redirect (in case of 3d secure for Credit Card, also for all Online Transfer and EWallet payments) and Error. Payment data is verified and stored. The amount is reserved on the customers account. |
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
