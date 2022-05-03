---
title: Braintree - Request workflow for Legacy Demoshop
description: This article describes the request flow for the Braintree module in the Spryker Legacy Demoshop.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/braintree-workflow-legacy-demoshop
originalArticleId: c004fb58-1e0e-413f-8586-9d0b99ce30fb
redirect_from:
  - /v2/docs/braintree-workflow-legacy-demoshop
  - /v2/docs/en/braintree-workflow-legacy-demoshop
related:
  - title: Braintree
    link: docs/scos/user/technology-partners/page.version/payment-partners/braintree.html
  - title: Braintree - Configuration for the Legacy Demoshop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/braintree-guides-for-the-legacy-demoshop/braintree-configuration-for-the-legacy-demoshop.html
  - title: Braintree - Performing Requests for the Legacy Demoshop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/braintree-guides-for-the-legacy-demoshop/braintree-performing-requests-for-the-legacy-demoshop.html
---

Both credit card and PayPal utilize the same request flow. It basically consists of the following requests:

* <b>Pre-check</b>: to check the user information in order to make sure that all the needed information is correct before doing the actual pre-authorization.
* <b>Authorize</b>: to perform a payment risk check which is a mandatory step before every payment. The payment is basically considered accepted when it is authorized.
* <b>Revert:</b> to cancel the authorization step which basically cancels the payment before capturing.
* Capture: to capture the payment and receive money from the buyer.
* <b>Refund</b>: to refund the buyer when returning products.
