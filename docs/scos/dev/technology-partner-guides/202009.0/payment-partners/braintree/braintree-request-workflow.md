---
title: Braintree - Request workflow
description: This article describes the request flow for the Braintree module in the Spryker Commerce OS.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/braintree-workflow
originalArticleId: 01e0bd69-5d0f-47bc-a163-ebc814adc5c9
redirect_from:
  - /v6/docs/braintree-workflow
  - /v6/docs/en/braintree-workflow
related:
  - title: Installing and configuring Braintree
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/installing-and-configuring-braintree.html
  - title: Integrating Braintree
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/integrating-braintree.html
  - title: Braintree - Performing Requests
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/braintree-performing-requests.html
---

Both credit card and PayPal utilize the same request flow in

* <b>Pre-check</b>: to check the user information to make sure that all the needed information is correct before doing the actual pre-authorization.
* <b>Authorize</b>: to perform a payment risk check which is a mandatory step before every payment. The payment is considered accepted when it is authorized.
* <b>Revert</b>: to cancel the authorization step which cancels the payment before capturing.
* <b>Capture</b>: to capture the payment and receive money from the buyer.
* <b>Refund</b>: to refund the buyer when returning products.

