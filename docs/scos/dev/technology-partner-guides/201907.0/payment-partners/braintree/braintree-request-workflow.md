---
title: Braintree - Request workflow
description: This article describes the request flow for the Braintree module in the Spryker Commerce OS.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/braintree-workflow
originalArticleId: 16bdc0c3-670f-4536-ab24-1ab6abb65998
redirect_from:
  - /v3/docs/braintree-workflow
  - /v3/docs/en/braintree-workflow
related:
  - title: Braintree
    link: docs/scos/user/technology-partners/page.version/payment-partners/braintree.html
  - title: Braintree - Performing Requests
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/braintree-performing-requests.html
  - title: Installing and configuring Braintree
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/braintree/installing-and-configuring-braintree.html
---

Both credit card and PayPal utilize the same request flow in

* <b>Pre-check</b>: to check the user information to make sure that all the needed information is correct before doing the actual pre-authorization.
* <b>Authorize</b>: to perform a payment risk check which is a mandatory step before every payment. The payment is considered accepted when it is authorized.
* <b>Revert</b>: to cancel the authorization step which cancels the payment before capturing.
* <b>Capture</b>: to capture the payment and receive money from the buyer.
* <b>Refund</b>: to refund the buyer when returning products.

