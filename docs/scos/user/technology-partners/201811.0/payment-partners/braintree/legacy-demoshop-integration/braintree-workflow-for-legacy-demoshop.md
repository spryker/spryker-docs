---
title: Braintree - Workflow for Legacy Demoshop
description: This article describes the request flow for the Braintree module in the Spryker Legacy Demoshop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/braintree-workflow-legacy-demoshop
originalArticleId: 4844884b-6bbe-4036-bb2d-77815bd30c9a
redirect_from:
  - /v1/docs/braintree-workflow-legacy-demoshop
  - /v1/docs/en/braintree-workflow-legacy-demoshop
---

Both credit card and PayPal utilize the same request flow. It basically consists of the following requests:

* <b>Pre-check</b>: to check the user information in order to make sure that all the needed information is correct before doing the actual pre-authorization.
* <b>Authorize</b>: to perform a payment risk check which is a mandatory step before every payment. The payment is basically considered accepted when it is authorized.
* <b>Revert:</b> to cancel the authorization step which basically cancels the payment before capturing.
* Capture: to capture the payment and receive money from the buyer.
* <b>Refund</b>: to refund the buyer when returning products.
