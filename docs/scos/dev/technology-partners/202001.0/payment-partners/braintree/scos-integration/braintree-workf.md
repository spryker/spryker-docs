---
title: Braintree - Workflow for SCOS
originalLink: https://documentation.spryker.com/v4/docs/braintree-workflow
redirect_from:
  - /v4/docs/braintree-workflow
  - /v4/docs/en/braintree-workflow
---

Both credit card and PayPal utilize the same request flow in

* <b>Pre-check</b>: to check the user information to make sure that all the needed information is correct before doing the actual pre-authorization.
* <b>Authorize</b>: to perform a payment risk check which is a mandatory step before every payment. The payment is considered accepted when it is authorized.
* <b>Revert</b>: to cancel the authorization step which cancels the payment before capturing.
* <b>Capture</b>: to capture the payment and receive money from the buyer.
* <b>Refund</b>: to refund the buyer when returning products.

